'use client';

import { Suspense } from 'react';
import { VerifyEmailForm } from './VerifyEmailForm';

export default function VerifyEmailPage() {
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
        <Suspense fallback={<div className="hidden lg:flex bg-[#fafafa]" />}>
          <VerifyEmailForm />
        </Suspense>
      </div>
    </div>
  );
}