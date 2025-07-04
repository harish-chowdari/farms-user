import React from 'react'

export default function Select({ 
    label, 
    name, 
    tailwindClasses='p-lg',
    options = [], 
    placeholder = 'Select an option', 
    formik 
}) {
    const showError = formik.touched[name] && formik.errors[name]

    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <select
                id={name}
                name={name}
                value={formik.values[name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${tailwindClasses} ${
                    showError ? 'border-red-500' : 'border-gray-300'
                }`}
            >
                <option value="" disabled>{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
            <div className="min-h-[1.25rem] mt-1">
                {showError && <p className="text-sm text-red-600">(formik?.touched[`${name}`] && formik?.errors[`${name}`])</p>}
            </div>
        </div>
    )
}
