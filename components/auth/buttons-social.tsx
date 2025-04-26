'use client';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { DEFAULT_LOGIN_REDIRECT } from '@/core/auth/routes';
import { useSearchParams } from 'next/navigation';

export const ButtonsSocial = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const onClick = async (provider: 'google' | 'github') => {
    const callbackUri = new URL(callbackUrl || DEFAULT_LOGIN_REDIRECT, window.location.href).href;
    await signIn(provider, { callbackUrl: callbackUri });
  };
  return (
    <div className="flex items-center w-full gap-x-6">
      <Button className="w-full" variant="outline" onClick={() => onClick('google')}>
        <FcGoogle className="h-8 w-8" />
      </Button>
      <Button className="w-full" variant="outline" onClick={() => onClick('github')}>
        <FaGithub className="h-8 w-8" />
      </Button>
    </div>
  );
};
