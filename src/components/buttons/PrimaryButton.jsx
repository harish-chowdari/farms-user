import React from 'react';


export default function PrimaryButton({
    children, 
    label, // New prop for button text
    type = 'button', 
    onClick, 
    disabled = false, 
    variant = 'primary', 
    size = 'md',
    icon,
    loading = false,
    className = '',
    ...props 
}) {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl';
    
    const variantClasses = {
        primary: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 focus:ring-blue-500/50 shadow-blue-500/25',
        secondary: 'bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800 focus:ring-gray-500/50 shadow-gray-500/25',
        danger: 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 focus:ring-red-500/50 shadow-red-500/25',
        success: 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 focus:ring-green-500/50 shadow-green-500/25',
        outline: 'border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 focus:ring-gray-500/50 shadow-gray-500/10',
        ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500/50',
        gradient: 'bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 focus:ring-purple-500/50 shadow-purple-500/25'
    };
    
    const sizeClasses = {
        sm: 'px-4 py-2 text-sm gap-2',
        md: 'px-6 py-3 text-sm gap-2',
        lg: 'px-8 py-4 text-base gap-3',
        xl: 'px-10 py-5 text-lg gap-3'
    };
    
    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
    
    // Use label prop if provided, otherwise fall back to children
    const buttonText = label || children;
    
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`${classes} cursor-pointer`}
            {...props}
        >
            {loading && (
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            {icon && !loading && (
                <span className="flex items-center">
                    {icon}
                </span>
            )}
            {buttonText}
        </button>
    );
}