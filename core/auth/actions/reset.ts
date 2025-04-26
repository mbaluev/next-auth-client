'use server';

import * as z from 'zod';
import { resetSchema } from '@/core/auth/schemas';
import { getUserByEmail } from '@/core/auth/data/user';
import { generatePasswordResetToken } from '@/core/utils/tokens';
import { sendPasswordResetEmail } from '@/core/utils/mail';

export const reset = async (values: z.infer<typeof resetSchema>) => {
  const validatedFields = resetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'invalid email' };
  }

  const { email } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { error: 'email not found' };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email as string,
    passwordResetToken.token as string
  );

  return { success: 'reset email send' };
};
