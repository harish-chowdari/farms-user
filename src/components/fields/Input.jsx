import React, { useState } from 'react'

export default function Input({ 
    label, 
    name, 
    type = 'text', 
    placeholder, 
    isErrorRequired = true,
    isFieldRequired = false,
    tailwindClasses = 'p-lg', 
    formik 
}) {
    const [isFocused, setIsFocused] = useState(false)

    const showError = formik.touched[name] && formik.errors[name]
    const borderClass = showError
        ? 'border-red-500'
        : isFocused
            ? 'border-blue-500'
            : 'border-gray-300'

    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}{isFieldRequired && <span className='text-red-600'>*</span>}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={formik.values[name]}
                onChange={formik.handleChange}
                onBlur={(e) => {
                    formik.handleBlur(e)
                    setIsFocused(false)
                }}
                onFocus={() => setIsFocused(true)}
                className={`w-full px-3 py-2 border rounded-md outline-none ${tailwindClasses} ${borderClass}`}
                autoComplete="off"
            />
            {isErrorRequired && (
                <div className="min-h-[1.25rem] mt-0">
                    {showError && (
                        <p className="text-xs text-red-600">
                            {formik.errors[name]}
                        </p>
                    )}
                </div>
            )}
        </div>
    )
}
