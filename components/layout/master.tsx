import { ComponentProps } from 'react';
import { cn } from '@/core/utils/cn';

type MasterProps = ComponentProps<'div'>;
const MasterDefault = (props: MasterProps) => {
  const { children, className, ..._props } = props;
  return (
    <section className={cn('flex flex-grow items-start px-4', className)} {..._props}>
      {children}
    </section>
  );
};

const MasterFullHeight = (props: MasterProps) => {
  const { children, className, ..._props } = props;
  return (
    <section className={cn('flex flex-grow px-4', className)} {..._props}>
      {children}
    </section>
  );
};

const MasterCenter = (props: MasterProps) => {
  const { children, className, ..._props } = props;
  return (
    <section
      className={cn('flex flex-grow justify-center items-center px-4', className)}
      {..._props}
    >
      <div className="w-[min(350px,100%)] h-fit">{children}</div>
    </section>
  );
};

export { MasterDefault, MasterFullHeight, MasterCenter };
