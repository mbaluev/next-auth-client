'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { FormLogin } from '@/components/auth/form-login';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogToolbar,
  DialogTrigger,
} from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface LoginButtonProps {
  children?: ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
}

export const ButtonLogin = ({ children, mode = 'redirect', asChild }: LoginButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push('/auth/login');
  };

  if (mode === 'modal') {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className="max-w-lg" close>
          <VisuallyHidden>
            <DialogHeader>
              <DialogToolbar title="login to application" />
              <DialogDescription>welcome back</DialogDescription>
            </DialogHeader>
          </VisuallyHidden>
          <FormLogin />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
