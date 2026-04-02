'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';
import { Card } from '@/components/shared/Card';
import { loginSchema, type LoginSchema } from '@/utils/validation.utils';
import Image from 'next/image';
import { icon } from '../../../public';

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    await login(data);
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
                Welcome back to your
                <br />
                <span className="text-[#a9b7ff]">digital utility hub.</span>
              </h1>

              <p className="text-base leading-8 text-[#9ca3af] max-w-md">
                Sign in to continue buying airtime, data, electricity, TV subscriptions,
                and more from one clean, reliable dashboard.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-3 max-w-md">
                {[
                  { label: 'Fast checkout', value: '< 5s average' },
                  { label: 'Platform uptime', value: '99.9%' },
                  { label: 'Supported networks', value: 'All major NG' },
                  { label: 'Security', value: 'Protected access' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3"
                  >
                    <div className="text-[11px] text-[#9ca3af] mb-1 font-medium">
                      {item.label}
                    </div>
                    <div className="text-sm font-semibold text-white">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-sm text-[#6b7280]">
              Trusted by thousands of users across Nigeria.
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
                

                <h2 className="text-3xl font-extrabold tracking-tight text-[#0a0a0a] mb-2">
                  Welcome Back
                </h2>
                <p className="text-sm sm:text-base text-[#666] leading-7">
                  Sign in to your AFRIDataNG account and continue where you left off.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="you@example.com"
                  icon={<Mail size={18} />}
                  error={errors.email?.message}
                  {...register('email')}
                />

                {/* Password Input with Visibility Toggle */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-[#0a0a0a]">Password</label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      <Lock size={16} />
                    </div>
                    <input
                      {...register('password')}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className={`w-full pl-10 pr-11 py-3 text-sm rounded-lg border bg-white text-[#0a0a0a] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#aab9f8] focus:border-transparent transition-all duration-200 ${
                        errors.password?.message ? 'border-red-400 focus:ring-red-400' : 'border-gray-200'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#aab9f8] transition-colors"
                      tabIndex={-1}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.password?.message && (
                    <p className="text-xs text-red-500 font-medium">{errors.password.message}</p>
                  )}
                </div>

                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <label className="inline-flex items-center gap-2 text-sm text-[#666] cursor-pointer">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-[#4a5ff7] focus:ring-[#4a5ff7]"
                      {...register('remember_me')}
                    />
                    <span>Remember me</span>
                  </label>

                  <Link
                    href="/auth/forgot-password"
                    className="text-sm font-medium text-[#4a5ff7] hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  fullWidth
                  isLoading={isLoading}
                  className="mt-2 h-12 rounded-lg bg-[#4a5ff7] hover:bg-[#3a4fe0] text-white font-semibold"
                >
                  <span className="inline-flex items-center justify-center gap-2">
                    Sign In
                    <ArrowRight size={16} />
                  </span>
                </Button>
              </form>

              <div className="mt-6 border-t border-gray-100 pt-6 text-center">
                <p className="text-sm text-[#666]">
                  Don&apos;t have an account?{' '}
                  <Link
                    href="/auth/register"
                    className="font-semibold text-[#0a0a0a] hover:text-[#4a5ff7] transition-colors"
                  >
                    Create one
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