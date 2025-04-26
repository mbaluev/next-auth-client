import { db } from '@/core/utils/db';

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    return await db.twoFactorConfirmation.findUnique({ where: { userId } });
  } catch (err) {
    return null;
  }
};
