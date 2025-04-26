'use server';

import { getVerificationTokenByToken } from '@/core/auth/data/verification-token';
import { getUserByEmail } from '@/core/auth/data/user';
import { db } from '@/core/utils/db';

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) {
    return { error: 'token does not exist' };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: 'token has expired' };
  }

  const existingUser = await getUserByEmail(existingToken.email as string);
  if (!existingUser) {
    return { error: 'email does not exist' };
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: 'email verified' };
};
