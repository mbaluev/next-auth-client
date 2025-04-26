import { useCurrentUser } from '@/core/auth/hooks/use-current-user';
import { WidgetUserInfo } from '@/components/auth/widget-user-info';
import { MonitorSmartphone } from 'lucide-react';
import { WidgetProps } from '@/components/layout/widget';

export const WidgetClient = (props: WidgetProps) => {
  const user = useCurrentUser();
  return (
    <WidgetUserInfo {...props} user={user} icon={<MonitorSmartphone />} label="client component" />
  );
};
