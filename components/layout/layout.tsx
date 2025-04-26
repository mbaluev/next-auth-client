'use client';

import { ReactNode } from 'react';
import { Footer } from '@/components/layout/footer';
import { SidebarProvider, Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider collapsed>
      <Sidebar />
      <div className="flex-grow flex flex-col">
        <Header />
        <main className="flex flex-grow">{children}</main>
        <Footer />
      </div>
    </SidebarProvider>
  );
};
