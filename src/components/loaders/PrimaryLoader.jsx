
import React from 'react';

export default function PrimaryLoader({ isLoading = true, message = "Loading..." }) {
    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="text-center">
                {/* Professional Loader */}
                <div className="relative w-16 h-16 mx-auto mb-4">
                    {/* Outer ring */}
                    <div className="absolute inset-0 border-4 border-blue-100/20 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
                    
                    {/* Inner ring */}
                    <div className="absolute inset-2 border-2 border-transparent border-t-emerald-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                    
                    {/* Center dot */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        {/* <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div> */}
                    </div>
                </div>

                {/* Loading Text */}
                <div className="space-y-2">
                    {/* <h3 className="text-lg font-semibold text-white">Admin</h3> */}
                    <p className="text-blue-200 text-sm">{message}</p>
                    
                    {/* Progress dots */}
                    <div className="flex justify-center space-x-1 mt-3">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
