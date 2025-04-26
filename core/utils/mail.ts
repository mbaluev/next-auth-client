import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: `onboarding@${process.env.RESEND_DOMAIN}`,
    to: email,
    subject: 'two factor code',
    html: `<p>your two factor code: ${token}</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.APP_URL}/auth/new-password?token=${token}`;
  await resend.emails.send({
    from: `onboarding@${process.env.RESEND_DOMAIN}`,
    to: email,
    subject: 'reset your password',
    html: `<p>click <a href=${confirmLink}>here<a/> to reset password.</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.APP_URL}/auth/new-verification?token=${token}`;
  await resend.emails.send({
    from: `onboarding@${process.env.RESEND_DOMAIN}`,
    to: email,
    subject: 'confirm your email',
    html: `<p>click <a href=${confirmLink}>here<a/> to confirm email.</p>`,
  });
};
