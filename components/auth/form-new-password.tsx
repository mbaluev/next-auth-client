'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { WidgetWrapper } from '@/components/auth/widget-wrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import { newPasswordSchema } from '@/core/auth/schemas';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { AlertSuccess, AlertError } from '@/components/ui/alert';
import { useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { newPassword } from '@/core/auth/actions/new-password';
import { InputPassword } from '@/components/ui/input-password';

export const FormNewPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') as string;

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof newPasswordSchema>) => {
    setError(undefined);
    setSuccess(undefined);
    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <WidgetWrapper
      loading={isPending}
      headerLabel="enter a new password"
      backButtonLabel="back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormControl>
                    <InputPassword
                      {...field}
                      disabled={isPending}
                      placeholder="enter password"
                      autoComplete="new-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <AlertError message={error} />
          <AlertSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            reset password
          </Button>
        </form>
      </Form>
    </WidgetWrapper>
  );
};
