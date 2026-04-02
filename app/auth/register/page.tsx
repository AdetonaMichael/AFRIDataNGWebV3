'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ArrowRight,
  ArrowLeft,
  Lock,
  Mail,
  Phone,
  Sparkles,
  User,
  Eye,
  EyeOff,
  CheckCircle2,
  Gift,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';
import { Card } from '@/components/shared/Card';
import { registerSchema, type RegisterSchema } from '@/utils/validation.utils';
import Image from 'next/image';
import { icon } from '../../../public';

// ─── Constants ────────────────────────────────────────────────────────────────
const STEPS = [
  { id: 1, label: 'Personal', fields: ['name', 'email'] as const,                        description: 'Tell us who you are'  },
  { id: 2, label: 'Contact',  fields: ['phone'] as const,                                description: 'How can we reach you' },
  { id: 3, label: 'Security', fields: ['password', 'password_confirmation'] as const,    description: 'Secure your account'  },
];

// Unsplash CDN — finance / mobile-money themed
const SLIDES = [
  {
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80&auto=format&fit=crop',
    tag: 'Instant Transfers',
    headline: 'Send money in seconds, not hours.',
  },
  {
    img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=900&q=80&auto=format&fit=crop',
    tag: 'Bill Payments',
    headline: 'Electricity, cable & data — all in one place.',
  },
  {
    img: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=900&q=80&auto=format&fit=crop',
    tag: 'Smart Wallet',
    headline: 'Your balance, always in your pocket.',
  },
  {
    img: 'https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?w=900&q=80&auto=format&fit=crop',
    tag: 'Airtime & Data',
    headline: 'Top up any network instantly, 24/7.',
  },
];

// ─── Left Carousel ────────────────────────────────────────────────────────────
function LeftCarousel() {
  const [active, setActive] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
      setAnimKey((k) => k + 1);
    }, 4000);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const goTo = (i: number) => {
    setActive(i);
    setAnimKey((k) => k + 1);
    startTimer();
  };

  const slide = SLIDES[active];

  return (
    <div className="relative w-full h-full min-h-screen overflow-hidden">
      {/* Background images – crossfade */}
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === active ? 1 : 0, zIndex: i === active ? 1 : 0 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.img} alt={s.headline} className="w-full h-full object-cover scale-105" />
        </div>
      ))}

      {/* Layered gradient overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#060818]/95 via-[#060818]/50 to-[#060818]/25" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#060818]/30 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between p-8 xl:p-12">

        {/* Top — logo + badge */}
        <div className="flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <Image src={icon} alt="AFRIDataNG" width={32} height={32} className="rounded-lg" />
            <span className="text-base font-bold tracking-tight text-white group-hover:text-white/80 transition-colors">
              AFRIDataNG
            </span>
          </Link>
        
        </div>

        {/* Bottom — slide content */}
        <div>
          {/* Tag */}
          <div
            key={`tag-${animKey}`}
            className="mb-3 opacity-0"
            style={{ animation: 'fadeUp 0.5s 0.05s ease forwards' }}
          >
        
          </div>

          {/* Headline */}
          <h2
            key={`h-${animKey}`}
            className="text-[1.75rem] xl:text-4xl font-extrabold text-white leading-tight mb-5 max-w-xs opacity-0"
            style={{ animation: 'fadeUp 0.55s 0.15s ease forwards' }}
          >
            {slide.headline}
          </h2>

          {/* Stats */}
          <div
            key={`s-${animKey}`}
            className="flex items-center gap-5 mb-7 opacity-0"
            style={{ animation: 'fadeUp 0.55s 0.25s ease forwards' }}
          >
            {[
              { v: '500K+', l: 'Users' },
              { v: '₦2B+',  l: 'Processed' },
              { v: '24/7',  l: 'Support' },
            ].map((item) => (
              <div key={item.l} className="flex flex-col">
                <span className="text-lg font-extrabold text-white leading-none">{item.v}</span>
                <span className="text-[10px] text-white/40 font-medium mt-0.5">{item.l}</span>
              </div>
            ))}
          </div>

          {/* Dot navigation */}
          <div className="flex items-center gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-400 ${
                  i === active ? 'w-7 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Step Indicator ───────────────────────────────────────────────────────────
function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center mb-8">
      {STEPS.map((step, idx) => {
        const done   = current > step.id;
        const active = current === step.id;
        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                done   ? 'bg-[#4a5ff7] text-white'
                : active ? 'bg-[#4a5ff7] text-white ring-4 ring-[#eef0fe]'
                : 'bg-gray-100 text-gray-400 border border-gray-200'
              }`}>
                {done ? <CheckCircle2 size={14} /> : step.id}
              </div>
              <span className={`text-[10px] font-semibold mt-1.5 whitespace-nowrap transition-colors duration-300 ${
                active ? 'text-[#4a5ff7]' : done ? 'text-[#0a0a0a]' : 'text-gray-400'
              }`}>
                {step.label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div className={`h-[2px] w-12 sm:w-16 mx-1 mb-5 rounded-full transition-all duration-500 ${
                current > step.id ? 'bg-[#4a5ff7]' : 'bg-gray-200'
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Password Input ───────────────────────────────────────────────────────────
function PasswordInput({
  label, placeholder, helperText, error, registration,
}: {
  label: string;
  placeholder: string;
  helperText?: string;
  error?: string;
  registration: any;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-semibold text-[#0a0a0a]">{label}</label>
      <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <Lock size={16} />
        </div>
        <input
          {...registration}
          type={visible ? 'text' : 'password'}
          placeholder={placeholder}
          className={`w-full pl-10 pr-11 py-3 text-sm rounded-lg border bg-white text-[#0a0a0a] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4a5ff7] focus:border-transparent transition-all duration-200 ${
            error ? 'border-red-400 focus:ring-red-400' : 'border-gray-200'
          }`}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#4a5ff7] transition-colors"
          tabIndex={-1}
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {helperText && !error && <p className="text-xs text-gray-400 leading-5">{helperText}</p>}
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function RegisterPage() {
  const { register: registerUser, isLoading } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
  });

  const stepFields: Record<number, (keyof RegisterSchema)[]> = {
    1: ['name', 'email'],
    2: ['phone'],
    3: ['password', 'password_confirmation'],
  };

  const handleNext = async () => {
    const valid = await trigger(stepFields[currentStep]);
    if (valid) setCurrentStep((s) => Math.min(s + 1, STEPS.length));
  };

  const handleBack = () => setCurrentStep((s) => Math.max(s - 1, 1));

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
        * { font-family: 'Plus Jakarta Sans', sans-serif; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(14px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .step-animate { animation: fadeSlideIn 0.28s ease forwards; }
      `}</style>

      <div className="min-h-screen grid lg:grid-cols-2">

        {/* Left — Carousel */}
        <section className="hidden lg:block relative overflow-hidden">
          <LeftCarousel />
        </section>

        {/* Right — Form */}
        <section className="flex items-center justify-center px-4 py-8 sm:px-6 lg:px-10 bg-[#fafafa]">
          <div className="w-full max-w-md">

            {/* Mobile logo */}
            <div className="mb-8 lg:hidden">
              <Link href="/" className="inline-flex items-center gap-2">
                <div className="w-8 h-8 bg-[#4a5ff7] rounded-md flex items-center justify-center">
                  <span className="text-sm font-bold text-white">A</span>
                </div>
                <span className="text-lg font-bold tracking-tight text-[#0a0a0a]">AFRIDataNG</span>
              </Link>
            </div>

            <Card className="w-full border border-gray-200 shadow-[0_10px_40px_rgba(0,0,0,0.06)] rounded-2xl bg-white p-6 sm:p-8">

              {/* Header */}
              <div className="mb-6">
               
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0a0a0a] mb-1">
                  Create Account
                </h2>
                <p className="text-sm text-[#999]">
                  Step {currentStep} of {STEPS.length} — {STEPS[currentStep - 1].description}
                </p>
              </div>

              <StepIndicator current={currentStep} />

              <form onSubmit={handleSubmit(onSubmit)}>

                {/* Step 1 — Personal */}
                {currentStep === 1 && (
                  <div className="space-y-5 step-animate">
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
                  </div>
                )}

                {/* Step 2 — Contact */}
                {currentStep === 2 && (
                  <div className="space-y-5 step-animate">
                    <Input
                      label="Phone Number"
                      type="tel"
                      placeholder="+234XXXXXXXXXX"
                      icon={<Phone size={18} />}
                      helperText="Use international format, e.g. +2348012345678"
                      error={errors.phone?.message}
                      {...register('phone')}
                    />

                    {/* Referral code */}
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-2 text-sm font-semibold text-[#0a0a0a]">
                        Referral Code
                        <span className="text-[10px] font-medium text-gray-400 bg-gray-100 border border-gray-200 px-1.5 py-0.5 rounded">
                          Optional
                        </span>
                      </label>
                      <div className="relative">
                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                          <Gift size={16} />
                        </div>
                        <input
                          {...register('referral_code')}
                          type="text"
                          placeholder="e.g. AFRI-XXXXX"
                          autoComplete="off"
                          spellCheck={false}
                          className="w-full pl-10 pr-4 py-3 text-sm rounded-lg border border-gray-200 bg-white text-[#0a0a0a] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4a5ff7] focus:border-transparent transition-all duration-200 uppercase tracking-wider"
                        />
                      </div>
                      <p className="text-xs text-gray-400 leading-5">
                        Enter a friend's referral code to unlock a welcome bonus.
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 3 — Security */}
                {currentStep === 3 && (
                  <div className="space-y-5 step-animate">
                    <PasswordInput
                      label="Password"
                      placeholder="••••••••"
                      helperText="Min. 8 characters — uppercase, lowercase, number & symbol"
                      error={errors.password?.message}
                      registration={register('password')}
                    />
                    <PasswordInput
                      label="Confirm Password"
                      placeholder="••••••••"
                      error={errors.password_confirmation?.message}
                      registration={register('password_confirmation')}
                    />
                    <label className="flex items-start gap-3 text-sm text-[#666] cursor-pointer pt-1">
                      <input
                        type="checkbox"
                        required
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-[#4a5ff7] focus:ring-[#4a5ff7] flex-shrink-0"
                      />
                      <span className="leading-6">
                        I agree to the{' '}
                        <Link href="/terms" className="font-medium text-[#4a5ff7] hover:underline">
                          Terms of Service
                        </Link>{' '}
                        and platform policies.
                      </span>
                    </label>
                  </div>
                )}

                {/* Navigation */}
                <div className={`mt-7 flex gap-3 ${currentStep > 1 ? '' : 'flex-col'}`}>
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex items-center justify-center gap-2 h-12 px-5 rounded-lg border border-gray-200 text-sm font-semibold text-[#555] hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                    >
                      <ArrowLeft size={15} />
                      Back
                    </button>
                  )}

                  {currentStep < STEPS.length ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex-1 flex items-center justify-center gap-2 h-12 rounded-lg bg-[#4a5ff7] hover:bg-[#3a4fe0] text-white text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      Continue
                      <ArrowRight size={15} />
                    </button>
                  ) : (
                    <Button
                      type="submit"
                      fullWidth
                      isLoading={isLoading}
                      className="flex-1 h-12 rounded-lg bg-[#4a5ff7] hover:bg-[#3a4fe0] text-white font-semibold"
                    >
                      <span className="inline-flex items-center justify-center gap-2">
                        Create Account
                        <ArrowRight size={15} />
                      </span>
                    </Button>
                  )}
                </div>
              </form>

              <div className="mt-6 border-t border-gray-100 pt-5 text-center">
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