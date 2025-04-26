'use client';

import { WidgetWrapper } from '@/components/auth/widget-wrapper';
import { AlertError } from '@/components/ui/alert';

export const WidgetError = () => {
  return (
    <WidgetWrapper
      headerLabel="authentication service"
      backButtonLabel="back to login"
      backButtonHref="/auth/login"
    >
      <AlertError message="oops! something went wrong" />
    </WidgetWrapper>
  );
};
