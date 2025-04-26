'use server';

import * as z from 'zod';
import { db } from '@/core/utils/db';
import { settingsSchema } from '@/core/auth/schemas';
import { getUserByEmail, getUserById } from '@/core/auth/data/user';
import { currentUser } from '@/core/auth/lib/current-user';
import { generateVerificationToken } from '@/core/utils/tokens';
import { sendVerificationEmail } from '@/core/utils/mail';
import bcrypt from 'bcryptjs';

export const settings = async (values: z.infer<typeof settingsSchema>) => {
  const user = await currentUser();
  if (!user) return { error: 'unauthorized' };

  const dbUser = await getUserById(user.id as string);
  if (!dbUser) return { error: 'unauthorized' };

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);
    if (existingUser && existingUser.id !== user.id) {
      return { error: 'email already in use' };
    }
    const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(
      verificationToken.email as string,
      verificationToken.token as string
    );
    return { success: 'verification email sent' };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(values.password, dbUser.password);
    if (!passwordsMatch) {
      return { error: 'invalid password' };
    }
    values.password = await bcrypt.hash(values.newPassword, 10);
    values.newPassword = undefined;
  }

  await db.user.update({ where: { id: dbUser.id }, data: { ...values } });

  return { success: 'settings updated' };
};
