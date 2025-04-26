'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Dot } from 'lucide-react';
import { ROUTES } from '@/core/settings/routes';

export const Footer = () => {
  return (
    <footer className="flex flex-wrap gap-x-2 gap-y-2 p-4 z-[8] justify-start md:justify-center">
      <Button variant="link" className="px-0 py-0 h-auto" asChild>
        <Link href={ROUTES.HOME.path}>{`© 2024 ${process.env.APP_NAME}`}</Link>
      </Button>
      <Dot className="text-primary" />
      <Button variant="link" className="px-0 py-0 h-auto" asChild>
        <Link href="#">privacy policy</Link>
      </Button>
      <Dot className="text-primary" />
      <Button variant="link" className="px-0 py-0 h-auto" asChild>
        <Link href="#">terms & conditions</Link>
      </Button>
    </footer>
  );
};
