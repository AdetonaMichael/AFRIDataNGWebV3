'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ArrowRight,
  Lock,
  Mail,
  Phone,
  Sparkles,
  User,
} from 'lucide-react';

import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';
import { Card } from '@/components/shared/Card';
import { registerSchema, type RegisterSchema } from '@/utils/validation.utils';

export default function RegisterPage() {
  const { register: registerUser, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    await registerUser(data);
  };

  return (
    <div
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      className="min-h-screen bg-white text-[#0a0a0a]"
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        * {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
      `}</style>

      <div className="min-h-screen grid lg:grid-cols-2">
        <section className="hidden lg:flex bg-white border-r border-gray-100">
          <div className="flex flex-col justify-between p-10 xl:p-14 w-full">
            <div>
              <Link href="/" className="inline-flex items-center gap-2">
                <div className="w-8 h-8 bg-[#4a5ff7] rounded-md flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-white">A</span>
                </div>
                <span className="text-lg font-bold tracking-tight text-[#0a0a0a]">AFRIDataNG</span>
              </Link>
            </div>

            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 bg-[#eef0fe] text-[#4a5ff7] text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full border border-[#c7ccfb] mb-5">
                <Sparkles size={14} />
                Get started
              </span>

              <h1 className="text-4xl xl:text-5xl font-extrabold leading-tight tracking-tight text-[#0a0a0a] mb-5">
                Create your account
                <br />
                in just a few minutes.
              </h1>

              <p className="text-base leading-8 text-[#666] max-w-lg">
                Join AFRIDataNG and start managing airtime, data bundles, electricity,
                TV subscriptions, and more from one fast, modern platform.
              </p>

              <div className="mt-10 space-y-4">
                {[
                  'Fast wallet funding with instant confirmation',
                  'Reliable service delivery across major networks',
                  'Clean dashboard built for speed and simplicity',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-1 h-2.5 w-2.5 rounded-full bg-[#4a5ff7]" />
                    <p className="text-sm text-[#555] leading-7">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { value: '500K+', label: 'Users' },
                { value: '₦2B+', label: 'Processed' },
                { value: '24/7', label: 'Availability' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-gray-200 bg-[#fafafa] px-4 py-4"
                >
                  <div className="text-xl font-extrabold tracking-tight text-[#0a0a0a]">
                    {item.value}
                  </div>
                  <div className="text-xs text-[#888] font-medium mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center px-4 py-8 sm:px-6 lg:px-10 bg-[#fafafa]">
          <div className="w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <Link href="/" className="inline-flex items-center gap-2">
                <div className="w-8 h-8 bg-[#4a5ff7] rounded-md flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-white">A</span>
                </div>
                <span className="text-lg font-bold tracking-tight text-[#0a0a0a]">AFRIDataNG</span>
              </Link>
            </div>

            <Card className="w-full border border-gray-200 shadow-[0_10px_40px_rgba(0,0,0,0.06)] rounded-2xl bg-white p-6 sm:p-8">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 bg-[#eef0fe] text-[#4a5ff7] text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full border border-[#c7ccfb] mb-4">
                  <Sparkles size={14} />
                  New Account
                </div>

                <h2 className="text-3xl font-extrabold tracking-tight text-[#0a0a0a] mb-2">
                  Create Account
                </h2>
                <p className="text-sm sm:text-base text-[#666] leading-7">
                  Set up your AFRIDataNG account and start transacting in minutes.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <Input
                  label="Full Name"
                  type="text"
                  placeholder="John Doe"
                  icon={<User size={18} />}
                  error={errors.name?.message}
                  {...register('name')}
                />

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="you@example.com"
                  icon={<Mail size={18} />}
                  error={errors.email?.message}
                  {...register('email')}
                />

                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="+234XXXXXXXXXX"
                  icon={<Phone size={18} />}
                  helperText="Use international format, e.g. +2348012345678"
                  error={errors.phone?.message}
                  {...register('phone')}
                />

                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  icon={<Lock size={18} />}
                  helperText="At least 8 characters with uppercase, lowercase, number, and symbol"
                  error={errors.password?.message}
                  {...register('password')}
                />

                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="••••••••"
                  icon={<Lock size={18} />}
                  error={errors.password_confirmation?.message}
                  {...register('password_confirmation')}
                />

                <label className="flex items-start gap-3 text-sm text-[#666] cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-[#4a5ff7] focus:ring-[#4a5ff7]"
                  />
                  <span className="leading-6">
                    I agree to the{' '}
                    <Link href="/terms" className="font-medium text-[#4a5ff7] hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and acknowledge the platform policies.
                  </span>
                </label>

                <Button
                  type="submit"
                  fullWidth
                  isLoading={isLoading}
                  className="mt-2 h-12 rounded-lg bg-[#4a5ff7] hover:bg-[#3a4fe0] text-white font-semibold"
                >
                  <span className="inline-flex items-center justify-center gap-2">
                    Create Account
                    <ArrowRight size={16} />
                  </span>
                </Button>
              </form>

              <div className="mt-6 border-t border-gray-100 pt-6 text-center">
                <p className="text-sm text-[#666]">
                  Already have an account?{' '}
                  <Link
                    href="/auth/login"
                    className="font-semibold text-[#0a0a0a] hover:text-[#4a5ff7] transition-colors"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}