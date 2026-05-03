'use client';

import { BarChart3 } from 'lucide-react';

export default function AdminReportsPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-[#f7f8ff]">
            <BarChart3 className="h-12 w-12 text-[#a9b7ff]" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Coming Soon</h1>
        <p className="text-lg text-gray-600">
          Advanced reporting features are currently under development. Stay tuned for comprehensive analytics and report generation capabilities.
        </p>
      </div>
    </div>
  );
}
