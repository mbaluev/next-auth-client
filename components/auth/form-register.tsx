'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { WidgetWrapper } from '@/components/auth/widget-wrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/core/auth/schemas';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { AlertSuccess, AlertError } from '@/components/ui/alert';
import { useState, useTransition } from 'react';
import { register } from '@/core/auth/actions/register';
import { InputPassword } from '@/components/ui/input-password';

export const FormRegister = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    setError(undefined);
    setSuccess(undefined);
    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <WidgetWrapper
      loading={isPending}
      headerLabel="create an account"
      backButtonLabel="already have an account?"
      backButtonHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="enter name"
                      autoComplete="new-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            create an account
          </Button>
        </form>
      </Form>
    </WidgetWrapper>
  );
};
