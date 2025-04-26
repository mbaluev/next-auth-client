'use client';

import { ReactNode } from 'react';
import { ButtonsSocial } from '@/components/auth/buttons-social';
import { ButtonBack } from '@/components/auth/button-back';
import { Widget, WidgetContent, WidgetHeader, WidgetProps } from '@/components/layout/widget';
import { WidgetHeaderContent } from '@/components/auth/widget-header-content';

interface WidgetWrapperProps extends WidgetProps {
  children?: ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
  loading?: boolean;
}

export const WidgetWrapper = (props: WidgetWrapperProps) => {
  const { children, headerLabel, backButtonLabel, backButtonHref, showSocial, loading, ..._props } =
    props;
  return (
    <Widget variant="space" className="z-[10]" {..._props}>
      <WidgetHeader>
        <WidgetHeaderContent loading={loading} label={headerLabel} />
      </WidgetHeader>
      <WidgetContent>
        <div className="space-y-6">
          {children}
          {showSocial && <ButtonsSocial />}
          <ButtonBack href={backButtonHref} label={backButtonLabel} />
        </div>
      </WidgetContent>
    </Widget>
  );
};
