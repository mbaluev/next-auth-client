import { WidgetWrapper } from '@/components/auth/widget-wrapper';
import { AlertError } from '@/components/ui/alert';
import { MasterCenter } from '@/components/layout/master';

export default function NotFound() {
  return (
    <MasterCenter>
      <WidgetWrapper
        headerLabel="authentication service"
        backButtonLabel="back home"
        backButtonHref="/"
      >
        <AlertError message="page not found" />
      </WidgetWrapper>
    </MasterCenter>
  );
}
