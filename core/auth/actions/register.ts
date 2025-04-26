'use server';

import * as z from 'zod';
import bcrypt from 'bcryptjs';
import { db } from '@/core/utils/db';
import { registerSchema } from '@/core/auth/schemas';
import { getUserByEmail } from '@/core/auth/data/user';
import { generateVerificationToken } from '@/core/utils/tokens';
import { sendVerificationEmail } from '@/core/utils/mail';

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'invalid fields' };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: 'email already in use' };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email as string, verificationToken.token as string);

  return { success: 'confirmation email send' };
};
