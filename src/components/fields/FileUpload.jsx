import React, { useEffect } from 'react'
import { Camera, Upload, X } from 'lucide-react'

const FileUpload = ({ formik, uploadedImages, setUploadedImages }) => {
	useEffect(() => {
		if (formik.values.productImage?.length > 0) {
			const previews = formik.values.productImage.map((item) =>
				typeof item === 'string' ? item : URL.createObjectURL(item)
			)
			setUploadedImages(previews)
		}
	}, [formik.values.productImage, setUploadedImages])

	const handleImageUpload = (e) => {
		const files = Array.from(e.target.files)

		const previews = files.map((file) => URL.createObjectURL(file))
		setUploadedImages((prev) => [...prev, ...previews])

		formik.setFieldValue('productImage', [
			...(formik.values.productImage || []),
			...files
		])
	}

	const removeImage = (index) => {
		const newImages = uploadedImages.filter((_, i) => i !== index)
		setUploadedImages(newImages)

		const newFiles = formik.values.productImage.filter((_, i) => i !== index)
		formik.setFieldValue('productImage', newFiles)
	}

	return (
		<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
			<div className="flex items-center gap-3 mb-6">
				<div className="p-2 bg-green-100 rounded-lg">
					<Camera className="w-5 h-5 text-green-600" />
				</div>
				<h2 className="text-xl font-semibold text-gray-800">Product Images</h2>
			</div>

			<div className="space-y-4">
				<div className="flex items-center justify-center w-full">
					<label
						htmlFor="image-upload"
						className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
					>
						<div className="flex flex-col items-center justify-center pt-5 pb-6">
							<Upload className="w-8 h-8 mb-4 text-gray-500" />
							<p className="mb-2 text-sm text-gray-500">
								<span className="font-semibold">Click to upload</span> or drag and drop
							</p>
							<p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
						</div>
						<input
							id="image-upload"
							type="file"
							className="hidden"
							multiple
							accept="image/*"
							onChange={handleImageUpload}
						/>
					</label>
				</div>

				{uploadedImages.length > 0 && (
					<div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
						{uploadedImages.map((image, index) => (
							<div key={index} className="relative group">
								<img
									src={image}
									alt={`Product ${index + 1}`}
									className="w-full h-24 object-cover rounded-lg border border-gray-200"
								/>
								<button
									type="button"
									onClick={() => removeImage(index)}
									className="absolute cursor-pointer -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
								>
									<X className="w-4 h-4" />
								</button>
							</div>
						))}
					</div>
				)}

				{formik.touched.productImage && formik.errors.productImage && (
					<p className="mt-1 text-sm text-red-600">{formik.errors.productImage}</p>
				)}
			</div>
		</div>
	)
}

export default FileUpload
