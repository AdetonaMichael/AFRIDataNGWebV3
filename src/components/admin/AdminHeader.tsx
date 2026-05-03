'use client';

import React from 'react';

interface AdminHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
  };
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  title,
  description,
  action,
}) => {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 flex-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h1>
        {description && (
          <p className="mt-1 text-xs sm:text-sm text-gray-500">{description}</p>
        )}
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className={`w-full sm:w-auto px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
            action.variant === 'secondary'
              ? 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              : 'bg-[#a9b7ff] text-[#0a0a0a] hover:bg-[#9da9ff]'
          }`}
        >
          {action.label}
        </button>
      )}
    </div>
  );
};
