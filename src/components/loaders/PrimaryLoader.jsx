
import React from 'react';

export default function PrimaryLoader({ isLoading = true, message = "Loading..." }) {
    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
            <div className="text-lg font-bold text-green-700 mb-8">
                🌾 Sunotal Farms
            </div>

            {/* Main loader */}
            <div className="relative w-16 h-16 mb-6">
                <div 
                    className="w-full h-full border-4 border-green-200 border-t-green-600 rounded-full"
                    style={{ animation: 'spin 1s linear infinite' }}
                ></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg">🥕</div>
            </div>

            {/* Loading text */}
            <div className="text-green-700 font-medium mb-4">
                {message}
            </div>

            {/* Animated dots */}
            <div className="flex space-x-1">
                <div 
                    className="w-2 h-2 bg-green-600 rounded-full"
                    style={{ animation: 'bounce 1.4s ease-in-out infinite' }}
                ></div>
                <div 
                    className="w-2 h-2 bg-green-600 rounded-full"
                    style={{ animation: 'bounce 1.4s ease-in-out infinite 0.2s' }}
                ></div>
                <div 
                    className="w-2 h-2 bg-green-600 rounded-full"
                    style={{ animation: 'bounce 1.4s ease-in-out infinite 0.4s' }}
                ></div>
            </div>

            <style jsx>{`
                @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
                }

                @keyframes bounce {
                0%, 80%, 100% { 
                    transform: scale(0); 
                    opacity: 0.5;
                }
                40% { 
                    transform: scale(1); 
                    opacity: 1;
                }
                }
            `}</style>
        </div>
  );
}
