'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { WidgetWrapper } from '@/components/auth/widget-wrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/core/auth/schemas';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { AlertSuccess, AlertError } from '@/components/ui/alert';
import { login } from '@/core/auth/actions/login';
import { Fragment, useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { InputPassword } from '@/components/ui/input-password';
import Link from 'next/link';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS } from 'input-otp';

export const FormLogin = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const isAuthError = searchParams.get('error') === 'OAuthAccountNotLinked';
  const urlError = isAuthError ? 'email already in use with different provider' : '';

  const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setError(undefined);
    setSuccess(undefined);
    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data?.error);
          }
          if (data?.success) {
            form.reset();
            setSuccess(data?.success);
          }
          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError('something went wrong'));
    });
  };

  return (
    <WidgetWrapper
      loading={isPending}
      headerLabel="welcome back"
      backButtonLabel="don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6">
            {showTwoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center gap-y-4 space-y-0">
                    <FormControl>
                      <InputOTP
                        {...field}
                        disabled={isPending}
                        maxLength={6}
                        pattern={REGEXP_ONLY_DIGITS}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>check your email</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!showTwoFactor && (
              <Fragment>
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
                <Button variant="link" className="px-0 py-0 h-auto" asChild>
                  <Link href="/auth/reset">forgot password?</Link>
                </Button>
              </Fragment>
            )}
          </div>
          <AlertError message={error || urlError} />
          <AlertSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            {showTwoFactor ? 'confirm code' : 'login'}
          </Button>
        </form>
      </Form>
    </WidgetWrapper>
  );
};
