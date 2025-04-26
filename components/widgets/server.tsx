import { WidgetUserInfo } from '@/components/auth/widget-user-info';
import { currentUser } from '@/core/auth/lib/current-user';
import { Server } from 'lucide-react';

export const WidgetServer = async () => {
  const user = await currentUser();
  return <WidgetUserInfo user={user} icon={<Server />} label="server component" />;
};
