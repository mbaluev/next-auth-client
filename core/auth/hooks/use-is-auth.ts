import { useSession } from 'next-auth/react';

export const useIsAuth = () => {
  const session = useSession();
  return !!session.data?.user;
};
