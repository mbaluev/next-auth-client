import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/core/utils/cn';
import { Check, Info, OctagonX, TriangleAlert } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';

const alertVariants = cva('relative flex space-x-4 w-full rounded-md border-2 px-4 py-3', {
  variants: {
    variant: {
      default: 'bg-background text-foreground',
      destructive:
        'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
      success: 'border-success/50 text-success dark:border-success [&>svg]:text-success',
      info: 'border-primary/50 text-primary dark:border-primary [&>svg]:text-primary',
      warning: 'border-warning/50 text-warning dark:border-warning [&>svg]:text-warning',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
));
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn('mb-1 font-medium leading-none tracking-tight', className)}
      {...props}
    />
  )
);
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('[&_p]:leading-relaxed', className)} {...props} />
));
AlertDescription.displayName = 'AlertDescription';

// variants

interface AlertProps {
  message?: string;
  loading?: boolean;
}

const AlertSuccess = ({ message, loading }: AlertProps) => {
  if (!message) return null;
  return (
    <Alert variant="success">
      {loading ? <Spinner /> : <Check />}
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

const AlertInfo = ({ message, loading }: AlertProps) => {
  if (!message) return null;
  return (
    <Alert variant="info">
      {loading ? <Spinner /> : <Info />}
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

const AlertWarning = ({ message, loading }: AlertProps) => {
  if (!message) return null;
  return (
    <Alert variant="warning">
      {loading ? <Spinner /> : <TriangleAlert />}
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

const AlertError = ({ message, loading }: AlertProps) => {
  if (!message) return null;
  return (
    <Alert variant="destructive">
      {loading ? <Spinner /> : <OctagonX />}
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export { Alert, AlertTitle, AlertDescription, AlertError, AlertInfo, AlertSuccess, AlertWarning };
