import React from 'react'

export default function TextArea({ 
    label, 
    name, 
    placeholder, 
    tailwindClasses='p-lg',
    rows = 4, 
    formik 
}) {
    const showError = formik.touched[name] && formik.errors[name]

    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <textarea
                id={name}
                name={name}
                rows={rows}
                placeholder={placeholder}
                value={formik.values[name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${tailwindClasses} ${
                    showError ? 'border-red-500' : 'border-gray-300'
                }`}
                autoComplete='off'
            />
            <div className="min-h-[1.25rem] mt-1">
                {showError && <p className="text-sm text-red-600">{(formik?.touched[`${name}`] && formik?.errors[`${name}`])}</p>}
            </div>
        </div>
    )
}
