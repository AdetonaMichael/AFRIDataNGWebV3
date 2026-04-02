'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Mail, Lock, AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';
import { Card } from '@/components/shared/Card';
import { Spinner } from '@/components/shared/Spinner';
import { AuthProtected } from '@/components/AuthProtected';
import { useAlert } from '@/hooks/useAlert';
import { usePasswordValidation } from '@/hooks/usePasswordValidation';
import { authService } from '@/services/auth.service';
import Image from 'next/image';
import { icon } from '../../../public';

// Validation schemas
const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits').regex(/^\d+$/, 'OTP must contain only numbers'),
});

const passwordSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords do not match',
    path: ['password_confirmation'],
  });

type EmailFormData = z.infer<typeof emailSchema>;
type OTPFormData = z.infer<typeof otpSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

function ForgotPasswordPageContent() {
  const router = useRouter();
  const { success: showSuccess, error: showError, warning: showWarning } = useAlert();
  const { getPasswordStrength, requirements, validatePassword, isPasswordValid } = usePasswordValidation();

  // Helper alert function - memoized to prevent recreation on every render
  const showAlert = useCallback(
    ({ type, message }: { type: 'success' | 'error' | 'warning'; message: string }) => {
      if (type === 'success') showSuccess(message);
      else if (type === 'error') showError(message);
      else if (type === 'warning') showWarning(message);
    },
    [showSuccess, showError, showWarning]
  );

  // Step state
  const [currentStep, setCurrentStep] = useState<'email' | 'otp' | 'password' | 'success'>(
    'email'
  );
  const [email, setEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [resendCountdown, setResendCountdown] = useState(0);
  const [otpCountdown, setOtpCountdown] = useState(600); // 10 minutes
  const [otpExpiredAlertShown, setOtpExpiredAlertShown] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState<any>({ level: 'weak', score: 0 });
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  // Step 1: Email form
  const emailForm = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  // Step 2: OTP form
  const otpForm = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
  });

  // Step 3: Password form
  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  // Resend countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCountdown > 0) {
      timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  // OTP countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (currentStep === 'otp' && otpCountdown > 0) {
      timer = setTimeout(() => setOtpCountdown(otpCountdown - 1), 1000);
    } else if (otpCountdown === 0 && currentStep === 'otp' && !otpExpiredAlertShown) {
      setOtpExpiredAlertShown(true);
      showAlert({
        type: 'error',
        message: 'OTP has expired. Please request a new one.',
      });
    }
    return () => clearTimeout(timer);
  }, [currentStep, otpCountdown, otpExpiredAlertShown, showAlert]);

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Step 1: Handle email submission
  const handleEmailSubmit = async (data: EmailFormData) => {
    try {
      emailForm.clearErrors();
      const response = await authService.forgotPassword(data);

      if (response.success) {
        setEmail(data.email);
        setOtpCountdown(600);
        setOtpExpiredAlertShown(false);
        setCurrentStep('otp');
        setResendCountdown(60);
        showAlert({
          type: 'success',
          message: 'OTP sent successfully. Check your email.',
        });
      } else {
        showAlert({
          type: 'error',
          message: response.message || 'Failed to send OTP',
        });
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || 'An error occurred while sending OTP';
      if (error?.response?.status === 429) {
        setResendCountdown(60);
        showAlert({
          type: 'warning',
          message: 'Please wait 60 seconds before requesting again',
        });
      } else {
        showAlert({
          type: 'error',
          message: errorMessage,
        });
      }
    }
  };

  // Step 2: Handle OTP submission
  const handleOtpSubmit = async (data: OTPFormData) => {
    try {
      otpForm.clearErrors();
      const response = await authService.verifyPasswordResetOtp({
        email,
        otp: data.otp,
      });

      if (response.success && response.data?.reset_token) {
        setResetToken(response.data.reset_token);
        setCurrentStep('password');
        showAlert({
          type: 'success',
          message: 'OTP verified successfully',
        });
      } else {
        showAlert({
          type: 'error',
          message: response.message || 'OTP verification failed',
        });
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || 'An error occurred while verifying OTP';
      showAlert({
        type: 'error',
        message: errorMessage,
      });
    }
  };

  // Step 3: Handle password reset - UPDATED to use state values directly
  const handlePasswordSubmit = async () => {
    try {
      setIsResettingPassword(true);

      if (!isPasswordValid()) {
        showAlert({
          type: 'error',
          message: 'Password does not meet all requirements',
        });
        setIsResettingPassword(false);
        return;
      }

      if (password !== confirmPassword) {
        showAlert({
          type: 'error',
          message: 'Passwords do not match',
        });
        setIsResettingPassword(false);
        return;
      }

      const response = await authService.resetPassword({
        email,
        reset_token: resetToken,
        password: password,
        password_confirmation: confirmPassword,
      });

      if (response.success) {
        setCurrentStep('success');
        showAlert({
          type: 'success',
          message: 'Password reset successfully',
        });

        setTimeout(() => {
          router.push('/auth/login');
        }, 2000);
      } else {
        showAlert({
          type: 'error',
          message: response.message || 'Failed to reset password',
        });
        setIsResettingPassword(false);
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || 'An error occurred while resetting password';
      if (error?.response?.status === 400 && errorMessage.includes('expired')) {
        setCurrentStep('email');
        showAlert({
          type: 'error',
          message: 'Session expired. Please start over',
        });
      } else {
        showAlert({
          type: 'error',
          message: errorMessage,
        });
      }
      setIsResettingPassword(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCountdown > 0) return;

    try {
      const response = await authService.forgotPassword({ email });
      if (response.success) {
        setOtpCountdown(600);
        setOtpExpiredAlertShown(false);
        setResendCountdown(60);
        showAlert({
          type: 'success',
          message: 'OTP resent successfully',
        });
      }
    } catch (error: any) {
      showAlert({
        type: 'error',
        message: 'Failed to resend OTP',
      });
    }
  };

  // Handle password input change
  const handlePasswordChange = useCallback((value: string) => {
    setPassword(value);
    // getPasswordStrength calls validatePassword internally, so we don't need to call it separately
    setPasswordStrength(getPasswordStrength(value));
  }, [getPasswordStrength]);

  if (currentStep === 'success') {
    return (
      <div className="min-h-screen bg-white text-[#0a0a0a]">
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
          * {
            font-family: 'Plus Jakarta Sans', sans-serif;
          }
        `}</style>

        <div className="min-h-screen grid lg:grid-cols-2">
          <section className="hidden lg:flex bg-[#0a0a0a] relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#4a5ff7] rounded-full opacity-[0.08]" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#a9b7ff] rounded-full opacity-[0.06]" />

            <div className="relative z-10 flex flex-col justify-between p-10 xl:p-14 w-full">
              <div>
                <Link href="/" className="inline-flex items-center gap-2">
                  <Image src={icon} alt="AFRIDataNG Logo" width={32} height={32} />
                  <span className="text-lg font-bold tracking-tight text-white">AFRIDataNG</span>
                </Link>
              </div>

              <div className="max-w-lg">
                <h1 className="text-4xl xl:text-5xl font-extrabold leading-tight tracking-tight text-white mb-5">
                  Your security
                  <br />
                  <span className="text-[#a9b7ff]">matters to us</span>
                </h1>

                <p className="text-base leading-8 text-[#9ca3af] max-w-md">
                  We've successfully reset your password. Your account is now secure with
                  your new credentials.
                </p>
              </div>
            </div>
          </section>

          <section className="flex items-center justify-center px-4 py-8 sm:px-6 lg:px-10 bg-[#fafafa]">
            <div className="w-full max-w-md">
              <div className="text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#f0fdf4] mb-5">
                  <CheckCircle2 className="h-9 w-9 text-[#16a34a]" />
                </div>

                <h2 className="text-2xl font-bold tracking-tight text-[#111827] mb-2">
                  Password Reset Successful
                </h2>

                <p className="text-sm text-[#6b7280] mb-8">
                  Your password has been changed successfully. All your sessions have been
                  logged out for security. Please log in with your new password.
                </p>

                <Link href="/auth/login">
                  <Button className="w-full rounded-[12px] bg-[#4a5ff7] text-white hover:bg-[#3a4fd7]">
                    Continue to Login
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#0a0a0a]">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        * {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
      `}</style>

      <div className="min-h-screen grid lg:grid-cols-2">
        {/* Left section - Hero (hidden on mobile) */}
        <section className="hidden lg:flex bg-[#0a0a0a] relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#4a5ff7] rounded-full opacity-[0.08]" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#a9b7ff] rounded-full opacity-[0.06]" />

          <div className="relative z-10 flex flex-col justify-between p-10 xl:p-14 w-full">
            <div>
              <Link href="/" className="inline-flex items-center gap-2">
                <Image src={icon} alt="AFRIDataNG Logo" width={32} height={32} />
                <span className="text-lg font-bold tracking-tight text-white">AFRIDataNG</span>
              </Link>
            </div>

            <div className="max-w-lg">
              <h1 className="text-4xl xl:text-5xl font-extrabold leading-tight tracking-tight text-white mb-5">
                Regain access to
                <br />
                <span className="text-[#a9b7ff]">your account safely</span>
              </h1>

              <p className="text-base leading-8 text-[#9ca3af] max-w-md">
                We'll guide you through a quick verification process to reset your password
                and secure your account.
              </p>

              <div className="mt-10 space-y-3">
                {[
                  'No sensitive data shared',
                  'Industry-standard encryption',
                  'Instant verification via email',
                  'Complete control of your security',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-[#9ca3af]">
                    <div className="h-2 w-2 rounded-full bg-[#4a5ff7]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="text-sm text-[#6b7280]">
              Your account security is our priority.
            </div>
          </div>
        </section>

        {/* Right section - Form */}
        <section className="flex items-center justify-center px-4 py-8 sm:px-6 lg:px-10 bg-[#fafafa]">
          <div className="w-full max-w-md">
            {/* Mobile header */}
            <div className="mb-8 lg:hidden flex items-center gap-3">
              <Link
                href="/auth/login"
                className="p-2 hover:bg-[#f1f5f9] rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-[#4a5ff7]" />
              </Link>
              <h1 className="text-2xl font-bold text-[#111827]">Reset Password</h1>
            </div>

            {/* Desktop header */}
            <div className="mb-8 hidden lg:block">
              <h2 className="text-2xl font-bold tracking-tight text-[#111827]">
                {currentStep === 'email' && 'Forgot Your Password?'}
                {currentStep === 'otp' && 'Verify Your Email'}
                {currentStep === 'password' && 'Create New Password'}
              </h2>
              <p className="mt-2 text-sm text-[#6b7280]">
                {currentStep === 'email' &&
                  "Enter your email address and we'll send you a verification code."}
                {currentStep === 'otp' &&
                  'We sent a 6-digit code to your email. Enter it below.'}
                {currentStep === 'password' &&
                  'Choose a strong password that meets all requirements.'}
              </p>
            </div>

            {/* Step indicator */}
            <div className="mb-8 flex gap-2">
              {(['email', 'otp', 'password'] as const).map((step, index) => (
                <div
                  key={step}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    ['email', 'otp', 'password'].indexOf(currentStep) >= index
                      ? 'bg-[#4a5ff7]'
                      : 'bg-[#e5e7eb]'
                  }`}
                />
              ))}
            </div>

            {/* Step 1: Email */}
            {currentStep === 'email' && (
              <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-[#111827] mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9ca3af]" />
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className={`w-full rounded-[12px] border pl-12 pr-4 py-3 text-sm outline-none transition-all ${
                        emailForm.formState.errors.email
                          ? 'border-[#dc2626] bg-[#fef2f2] text-[#111827]'
                          : 'border-[#e5e7eb] bg-white text-[#111827] focus:border-[#4a5ff7] focus:ring-1 focus:ring-[#4a5ff7]'
                      }`}
                      {...emailForm.register('email')}
                    />
                  </div>
                  {emailForm.formState.errors.email && (
                    <p className="mt-2 flex items-center gap-2 text-sm text-[#dc2626]">
                      <AlertCircle className="h-4 w-4" />
                      {emailForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={emailForm.formState.isSubmitting}
                  className="w-full rounded-[12px] bg-[#4a5ff7] text-white hover:bg-[#3a4fd7] py-3 font-semibold"
                >
                  {emailForm.formState.isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Spinner className="h-4 w-4" />
                      Sending...
                    </span>
                  ) : (
                    'Send Reset Code'
                  )}
                </Button>

                <div className="text-center">
                  <p className="text-sm text-[#6b7280]">
                    Remember your password?{' '}
                    <Link href="/auth/login" className="font-semibold text-[#4a5ff7] hover:underline">
                      Login here
                    </Link>
                  </p>
                </div>
              </form>
            )}

            {/* Step 2: OTP */}
            {currentStep === 'otp' && (
              <form onSubmit={otpForm.handleSubmit(handleOtpSubmit)} className="space-y-6">
                <div className="rounded-[16px] border border-[#4a5ff7]/10 bg-[#4a5ff7]/5 p-4 mb-6">
                  <p className="text-sm text-[#111827]">
                    Code sent to{' '}
                    <span className="font-semibold text-[#4a5ff7]">{email}</span>
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="otp"
                      className="block text-sm font-semibold text-[#111827]"
                    >
                      Verification Code
                    </label>
                    <span className="text-xs font-medium text-[#9ca3af]">
                      Expires in {formatCountdown(otpCountdown)}
                    </span>
                  </div>

                  <input
                    id="otp"
                    type="text"
                    inputMode="numeric"
                    placeholder="000000"
                    maxLength={6}
                    className={`w-full rounded-[12px] border px-4 py-3 text-center text-2xl font-semibold tracking-widest outline-none transition-all ${
                      otpForm.formState.errors.otp
                        ? 'border-[#dc2626] bg-[#fef2f2] text-[#111827]'
                        : 'border-[#e5e7eb] bg-white text-[#111827] focus:border-[#4a5ff7] focus:ring-1 focus:ring-[#4a5ff7]'
                    } ${otpCountdown === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={otpCountdown === 0}
                    {...otpForm.register('otp')}
                  />

                  {otpForm.formState.errors.otp && (
                    <p className="mt-2 flex items-center gap-2 text-sm text-[#dc2626]">
                      <AlertCircle className="h-4 w-4" />
                      {otpForm.formState.errors.otp.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={otpForm.formState.isSubmitting || otpCountdown === 0}
                  className="w-full rounded-[12px] bg-[#4a5ff7] text-white hover:bg-[#3a4fd7] py-3 font-semibold disabled:opacity-50"
                >
                  {otpForm.formState.isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Spinner className="h-4 w-4" />
                      Verifying...
                    </span>
                  ) : (
                    'Verify Code'
                  )}
                </Button>

                <div className="text-center">
                  <p className="text-sm text-[#6b7280] mb-3">Didn't receive the code?</p>
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={resendCountdown > 0}
                    className={`text-sm font-semibold transition-colors ${
                      resendCountdown > 0
                        ? 'text-[#9ca3af] cursor-not-allowed'
                        : 'text-[#4a5ff7] hover:underline'
                    }`}
                  >
                    {resendCountdown > 0
                      ? `Resend in ${resendCountdown}s`
                      : 'Resend Code'}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep('email');
                    emailForm.reset();
                  }}
                  className="w-full text-sm font-semibold text-[#4a5ff7] hover:underline"
                >
                  Use a different email
                </button>
              </form>
            )}

            {/* Step 3: Password Reset */}
            {currentStep === 'password' && (
              <form onSubmit={(e) => { e.preventDefault(); handlePasswordSubmit(); }} className="space-y-6">
                {/* Password input */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-[#111827] mb-2"
                  >
                    New Password
                  </label>

                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9ca3af]" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
                      className={`w-full rounded-[12px] border pl-12 pr-12 py-3 text-sm outline-none transition-all ${
                        passwordForm.formState.errors.password
                          ? 'border-[#dc2626] bg-[#fef2f2] text-[#111827]'
                          : 'border-[#e5e7eb] bg-white text-[#111827] focus:border-[#4a5ff7] focus:ring-1 focus:ring-[#4a5ff7]'
                      }`}
                      value={password}
                      onChange={(e) => handlePasswordChange(e.target.value)}
                      onBlur={() => passwordForm.trigger('password')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#6b7280]"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  {passwordForm.formState.errors.password && (
                    <p className="mt-2 flex items-center gap-2 text-sm text-[#dc2626]">
                      <AlertCircle className="h-4 w-4" />
                      {passwordForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                {/* Password strength indicator */}
                {password && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-medium uppercase tracking-wide text-[#6b7280]">
                        Password Strength
                      </label>
                      <span
                        className="text-xs font-semibold"
                        style={{ color: passwordStrength?.level ? '#4a5ff7' : '#6b7280' }}
                      >
                        {passwordStrength?.level?.charAt(0).toUpperCase() +
                          passwordStrength?.level?.slice(1)}
                      </span>
                    </div>

                    <div className="h-1.5 w-full rounded-full bg-[#e5e7eb] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${(passwordStrength.score / 5) * 100}%`,
                          backgroundColor:
                            passwordStrength.level === 'weak'
                              ? '#dc2626'
                              : passwordStrength.level === 'medium'
                                ? '#f59e0b'
                                : '#16a34a',
                        }}
                      />
                    </div>

                    {/* Requirements checklist */}
                    <div className="space-y-2 mt-4 bg-[#f9fafb] rounded-[12px] p-4">
                      {[
                        { label: 'At least 8 characters', key: 'minLength' },
                        { label: 'Contains uppercase letter (A-Z)', key: 'hasUppercase' },
                        { label: 'Contains lowercase letter (a-z)', key: 'hasLowercase' },
                        { label: 'Contains number (0-9)', key: 'hasNumber' },
                        { label: 'Contains symbol (!@#$%^&*)', key: 'hasSymbol' },
                      ].map(({ label, key }) => (
                        <div
                          key={key}
                          className="flex items-center gap-2 text-xs sm:text-sm"
                        >
                          <div
                            className={`flex-shrink-0 h-4 w-4 rounded-full flex items-center justify-center transition-colors ${
                              requirements[key as keyof typeof requirements]
                                ? 'bg-[#16a34a]'
                                : 'bg-[#e5e7eb]'
                            }`}
                          >
                            {requirements[key as keyof typeof requirements] && (
                              <CheckCircle2 className="h-3 w-3 text-white" />
                            )}
                          </div>
                          <span
                            className={
                              requirements[key as keyof typeof requirements]
                                ? 'text-[#111827]'
                                : 'text-[#6b7280]'
                            }
                          >
                            {label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Confirm password */}
                <div>
                  <label
                    htmlFor="password_confirmation"
                    className="block text-sm font-semibold text-[#111827] mb-2"
                  >
                    Confirm Password
                  </label>

                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9ca3af]" />
                    <input
                      id="password_confirmation"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Re-enter your password"
                      className={`w-full rounded-[12px] border pl-12 pr-4 py-3 text-sm outline-none transition-all ${
                        passwordForm.formState.errors.password_confirmation
                          ? 'border-[#dc2626] bg-[#fef2f2]'
                          : confirmPassword && password !== confirmPassword
                            ? 'border-[#f59e0b] bg-[#fffbeb]'
                            : confirmPassword && password === confirmPassword
                              ? 'border-[#16a34a] bg-[#f0fdf4]'
                              : 'border-[#e5e7eb] bg-white focus:border-[#4a5ff7] focus:ring-1 focus:ring-[#4a5ff7]'
                      }`}
                      value={confirmPassword}
                      onInput={(e) => setConfirmPassword((e.target as HTMLInputElement).value)}
                      {...passwordForm.register('password_confirmation', {
                        onChange: () => {},
                      })}
                    />
                  </div>

                  {confirmPassword && password !== confirmPassword && (
                    <p className="mt-2 flex items-center gap-2 text-sm text-[#f59e0b]">
                      <AlertCircle className="h-4 w-4" />
                      Passwords don't match
                    </p>
                  )}

                  {confirmPassword && password === confirmPassword && (
                    <p className="mt-2 flex items-center gap-2 text-sm text-[#16a34a]">
                      <CheckCircle2 className="h-4 w-4" />
                      Passwords match
                    </p>
                  )}

                  {passwordForm.formState.errors.password_confirmation && (
                    <p className="mt-2 flex items-center gap-2 text-sm text-[#dc2626]">
                      <AlertCircle className="h-4 w-4" />
                      {passwordForm.formState.errors.password_confirmation.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={
                    isResettingPassword ||
                    !isPasswordValid() ||
                    password !== confirmPassword
                  }
                  className="w-full rounded-[12px] bg-[#4a5ff7] text-white hover:bg-[#3a4fd7] py-3 font-semibold disabled:opacity-50"
                >
                  {isResettingPassword ? (
                    <span className="flex items-center gap-2">
                      <Spinner className="h-4 w-4" />
                      Resetting...
                    </span>
                  ) : (
                    'Reset Password'
                  )}
                </Button>

                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep('email');
                    emailForm.reset();
                  }}
                  className="w-full text-sm font-semibold text-[#4a5ff7] hover:underline"
                >
                  Start over
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <AuthProtected requireAuth={false}>
      <ForgotPasswordPageContent />
    </AuthProtected>
  );
}
