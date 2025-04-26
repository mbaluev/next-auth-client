'use client';

import { useIsAuth } from '@/core/auth/hooks/use-is-auth';
import { Logo } from '@/components/layout/logo';
import { ButtonLogin } from '@/components/auth/button-login';
import { Button } from '@/components/ui/button';
import { Dot } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getUserByEmail } from '@/core/auth/data/user';
import { User } from '@prisma/client';

export default function Home() {
  const auth = useIsAuth();

  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    getUserByEmail('mbaluev.dev@gmail.com').then((data) => {
      setUser(data);
    });
  }, []);

  return (
    <div className="space-y-10 text-center">
      <div className="text-6xl flex gap-8 flex-row flex-wrap items-center justify-center">
        <Logo />
        <h1 className="text-6xl font-semibold">{process.env.APP_NAME}</h1>
      </div>
      <div className="flex gap-1 flex-col items-center text-lg text-muted-foreground">
        <p>authentication service</p>
        <div className="flex gap-2 flex-wrap justify-center">
          <p>next.js</p>
          <Dot />
          <p>tailwind</p>
          <Dot />
          <p>lucide icons</p>
        </div>
        <div className="flex gap-2 flex-wrap items-center">
          <p>layouts</p>
          <Dot />
          <p>sidebar</p>
        </div>
        <p>d3.js charts</p>
      </div>
      {!auth && (
        <div className="flex gap-6 justify-center">
          <ButtonLogin mode="redirect" asChild>
            <Button variant="default" size="lg">
              sign in
            </Button>
          </ButtonLogin>
          <ButtonLogin mode="modal" asChild>
            <Button variant="outline" size="lg">
              sign in dialog
            </Button>
          </ButtonLogin>
        </div>
      )}
      <div>{process.env.DATABASE_URL}</div>
      <div className="break-words">{user ? JSON.stringify(user) : '-'}</div>
    </div>
  );
}
