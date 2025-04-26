'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { WidgetWrapper } from '@/components/auth/widget-wrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetSchema } from '@/core/auth/schemas';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { AlertSuccess, AlertError } from '@/components/ui/alert';
import { useState, useTransition } from 'react';
import { reset } from '@/core/auth/actions/reset';

export const FormReset = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof resetSchema>) => {
    setError(undefined);
    setSuccess(undefined);
    startTransition(() => {
      reset(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <WidgetWrapper
      loading={isPending}
      headerLabel="forgot your password?"
      backButtonLabel="back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="enter email"
                      type="email"
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
            send reset email
          </Button>
        </form>
      </Form>
    </WidgetWrapper>
  );
};
