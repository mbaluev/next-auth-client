import { Input, InputProps } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/core/utils/cn';
import { Eye, EyeOff } from 'lucide-react';
import { forwardRef, useState } from 'react';

const InputPassword = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { ...inputProps } = props;

  const [visible, setVisible] = useState<boolean>(false);
  const handleVisible = (e: any) => {
    e.preventDefault();
    setVisible(!visible);
  };

  return (
    <div className="relative">
      <Input
        {...inputProps}
        ref={ref}
        type={visible ? 'text' : 'password'}
        className={cn('relative pr-9', inputProps.className)}
      />
      <Button size="adornment" variant="ghost" onClick={handleVisible}>
        {visible ? <Eye /> : <EyeOff />}
      </Button>
    </div>
  );
});

InputPassword.displayName = 'InputPassword';
export { InputPassword };
