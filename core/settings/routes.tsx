import { ReactNode } from 'react';

const EMPTY_PATH = '#';
const IS_PATH = (path?: string) => path !== EMPTY_PATH;

type TRouteDTO = {
  name: string;
  path: string;
  label?: string;
  icon?: ReactNode;
};

const ROUTES: Record<string, TRouteDTO> = {
  HOME: { name: 'home', label: 'home', path: '/' },
  PROFILE: { name: 'profile', label: 'profile', path: '/profile' },
  DASHBOARD: { name: 'dashboard', label: 'dashboard', path: '/dashboard' },
  SAMPLES: { name: 'samples', label: 'samples', path: EMPTY_PATH },
  SAMPLE_CLIENT: { name: 'sample-client', label: 'client', path: '/client' },
  SAMPLE_SERVER: { name: 'sample-server', label: 'server', path: '/server' },
};

export { IS_PATH, ROUTES };
export type { TRouteDTO };
