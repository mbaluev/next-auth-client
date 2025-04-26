import { useCurrentUser } from '@/core/auth/hooks/use-current-user';
import { WidgetUserInfo } from '@/components/auth/widget-user-info';
import { User } from 'lucide-react';
import { WidgetProps } from '@/components/layout/widget';

export const WidgetProfile = (props: WidgetProps) => {
  const user = useCurrentUser();
  return <WidgetUserInfo {...props} user={user} icon={<User />} label="profile" />;
};
