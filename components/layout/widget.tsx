import * as React from 'react';
import { cn } from '@/core/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';

const widgetVariants = cva('flex flex-col flex-grow max-h-full rounded-lg overflow-hidden', {
  variants: {
    variant: {
      default: '',
      space: 'space-y-6',
      border: 'border shadow-sm',
      background: 'bg-sidebar text-sidebar-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
interface WidgetProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof widgetVariants> {}
const Widget = React.forwardRef<HTMLDivElement, WidgetProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(widgetVariants({ variant, className }))}
      data-type="widget"
      {...props}
    />
  )
);
Widget.displayName = 'Widget';

const widgetHeaderVariants = cva('flex flex-0 flex-wrap gap-2 justify-between', {
  variants: {
    variant: {
      default: '',
      padding: 'p-4',
      background: 'p-4 bg-sidebar',
      border: 'p-4 border-b',
      'background-border': 'p-4 bg-sidebar border-b',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
interface WidgetHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof widgetHeaderVariants> {}
const WidgetHeader = React.forwardRef<HTMLDivElement, WidgetHeaderProps>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} className={cn(widgetHeaderVariants({ variant, className }))} {...props} />
  )
);
WidgetHeader.displayName = 'WidgetHeader';

const WidgetIcon = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex-0 p-2', className)} {...props} />
  )
);
WidgetIcon.displayName = 'WidgetIcon';

const WidgetTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn('flex-1 pt-2', className)} {...props} />
));
WidgetTitle.displayName = 'WidgetTitle';

const WidgetButtons = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex-0 flex flex-wrap gap-4', className)} {...props} />
  )
);
WidgetButtons.displayName = 'WidgetButtons';

const widgetContentVariants = cva('flex-1', {
  variants: {
    variant: {
      default: '',
      padding: 'p-6',
      background: 'p-6 bg-sidebar',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
interface WidgetContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof widgetContentVariants> {}
const WidgetContent = React.forwardRef<HTMLDivElement, WidgetContentProps>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} className={cn(widgetContentVariants({ variant, className }))} {...props} />
  )
);
WidgetContent.displayName = 'WidgetContent';

export { Widget, WidgetHeader, WidgetIcon, WidgetTitle, WidgetContent, WidgetButtons };
export type { WidgetProps };
