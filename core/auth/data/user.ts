import { db } from '@/core/utils/db';

export const getUserByEmail = async (email: string) => {
  if (!email) return null;
  try {
    return await db.user.findUnique({ where: { email } });
  } catch (err) {
    return null;
  }
};

export const getUserById = async (id: string) => {
  if (!id) return null;
  try {
    return await db.user.findUnique({ where: { id } });
  } catch (err) {
    return null;
  }
};
