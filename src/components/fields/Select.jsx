import React, { useState } from 'react'

export default function Select({ 
	label, 
	name, 
	isErrorRequired = true,
    isFieldRequired = false,
	tailwindClasses = 'p-lg',
	options = [], 
	placeholder = 'Select an option', 
	formik,
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
			<label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-[1px]">
				{label}{isFieldRequired && <span className='text-red-600'>*</span>}
			</label>
			<select
				id={name}
				name={name}
				value={formik.values[name]}
				onChange={formik.handleChange}
				onBlur={(e) => {
					formik.handleBlur(e)
					setIsFocused(false)
				}}
				onFocus={() => setIsFocused(true)}
				className={`w-full px-3 py-2 border rounded-md outline-none ${tailwindClasses} ${borderClass}`}
			>
				<option value="" disabled>{placeholder}</option>
				{options.map((option) => (
					<option key={option.value} value={option.value}>{option.label}</option>
				))}
			</select>
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
