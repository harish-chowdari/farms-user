
import React from 'react';

export default function PrimaryLoader({ isLoading = true, message = "Loading..." }) {
    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-50">
            <div className="relative mb-1">
                <div className="w-12 h-12 border-4 border-gray-200 border-t-indigo-500 rounded-full animate-spin"></div>
            </div>

            <div className="text-gray-700 font-medium text-lg">
                {message}
            </div>
        </div>
  );
}
