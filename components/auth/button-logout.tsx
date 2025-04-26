'use client';

import { ReactNode } from 'react';
import { logout } from '@/core/auth/actions/logout';
import { signOut } from 'next-auth/react';

interface LogoutButtonProps {
  children?: ReactNode;
}

export const ButtonLogout = ({ children }: LogoutButtonProps) => {
  const onClick = async () => {
    await logout();
    await signOut();
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
