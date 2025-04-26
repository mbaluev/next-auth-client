import { ReactNode } from 'react';
import { MasterFullHeight } from '@/components/layout/master';

const ProtectedLayout = ({ children }: { children: ReactNode }) => {
  return <MasterFullHeight>{children}</MasterFullHeight>;
};

export default ProtectedLayout;
