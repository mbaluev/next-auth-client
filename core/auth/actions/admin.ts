'use server';

import { currentRole } from '@/core/auth/lib/current-role';
import { UserRole } from '@prisma/client';

export const admin = async () => {
  const role = await currentRole();

  if (role === UserRole.ADMIN) {
    return { success: 'allowed server action' };
  }

  return { error: 'forbidden server action' };
};
