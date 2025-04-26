'use client';

import { LayoutDashboard } from 'lucide-react';
import {
  Widget,
  WidgetContent,
  WidgetHeader,
  WidgetTitle,
  WidgetIcon,
  WidgetProps,
} from '@/components/layout/widget';

export const WidgetEmpty = (props: WidgetProps) => {
  return (
    <Widget variant="background" {...props}>
      <WidgetHeader variant="padding">
        <WidgetIcon>
          <LayoutDashboard />
        </WidgetIcon>
        <WidgetTitle>empty</WidgetTitle>
      </WidgetHeader>
      <WidgetContent variant="padding">...</WidgetContent>
    </Widget>
  );
};
