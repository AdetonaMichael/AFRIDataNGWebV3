'use client';

import { Gift } from 'lucide-react';

export default function ReferralPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-[#f7f8ff]">
            <Gift className="h-12 w-12 text-[#a9b7ff]" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Coming Soon</h1>
        <p className="text-lg text-gray-600">
          Our enhanced referral program is under development. Get ready to earn more by sharing your unique referral link with friends and family.
        </p>
      </div>
    </div>
  );
}