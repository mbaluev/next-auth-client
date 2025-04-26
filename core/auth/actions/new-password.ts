'use server';

import * as z from 'zod';
import { newPasswordSchema } from '@/core/auth/schemas';
import { getPasswordResetTokenByToken } from '@/core/auth/data/password-reset-token';
import { getUserByEmail } from '@/core/auth/data/user';
import bcrypt from 'bcryptjs';
import { db } from '@/core/utils/db';

export const newPassword = async (values: z.infer<typeof newPasswordSchema>, token: string) => {
  if (!token) {
    return { error: 'missing token' };
  }

  const validatedFields = newPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'invalid fields' };
  }

  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return { error: 'invalid token' };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: 'token has expired' };
  }

  const existingUser = await getUserByEmail(existingToken.email as string);
  if (!existingUser) {
    return { error: 'email does not exist' };
  }

  const { password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await db.passwordResetToken.delete({ where: { id: existingToken.id } });

  return { success: 'password updated successfully' };
};
