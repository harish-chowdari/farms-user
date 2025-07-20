import React, { useState } from 'react';
import { MapPin, Edit3, Trash2, Home, Building, Users } from 'lucide-react';
import Header from '../../components/layout/Header';

export default function AddressPage() {
	const [address, setAddress] = useState(null); 
	const [showForm, setShowForm] = useState(false);
	const [formData, setFormData] = useState({
		type: 'home',
		title: '',
		phone: '',
		address: '',
		area: '',
		city: 'Vijayawada',
		pincode: '',
		state: 'Andhra Pradesh'
	});

	const addressTypes = [
		{ value: 'home', label: 'Home', icon: Home },
		{ value: 'work', label: 'Work', icon: Building },
		{ value: 'other', label: 'Other', icon: Users }
	];

	const handleInputChange = (field, value) => {
		setFormData(prev => ({ ...prev, [field]: value }));
	};

	const handleSubmit = () => {
		if (!formData.phone || !formData.address || !formData.area || !formData.pincode) {
			alert('Please fill in all required fields');
			return;
		}
		
		setAddress({ ...formData, id: Date.now() });
		setFormData({
			type: 'home',
			title: '',
			phone: '',
			address: '',
			area: '',
			city: 'Bengaluru',
			pincode: '',
			state: 'Karnataka'
		});
		setShowForm(false);
	};

	const handleEdit = () => {
		setFormData(address);
		setShowForm(true);
	};

	const handleDelete = () => {
		setAddress(null);
		setShowForm(false);
	};

	const getTypeIcon = (type) => {
		const typeData = addressTypes.find(t => t.value === type);
		const IconComponent = typeData?.icon || Home;
		return <IconComponent className="w-4 h-4" />;
	};

	const shouldShowForm = !address || showForm;

	return (
		<div className="min-h-screen bg-gray-50">
			<Header />
			<div className="bg-green-600 text-white p-4">
				<div className="max-w-4xl mx-auto">
					<h1 className="text-xl font-bold flex items-center gap-2">
						<MapPin className="w-5 h-5" />
						Delivery Address
					</h1>
					<p className="text-green-100 text-sm mt-1">Manage your delivery location for fresh farm produce</p>
				</div>
			</div>

			<div className="max-w-4xl mx-auto p-4">
				{shouldShowForm && (
					<div className="bg-white rounded-lg shadow-lg p-6 mb-6 border border-gray-200">
						<div className="flex items-center justify-between mb-4">
							<h2 className="text-lg font-semibold text-gray-800">
								{address ? 'Edit Address' : 'Add Your Address'}
							</h2>
							{address && (
								<button
									onClick={() => {
										setShowForm(false);
										setFormData({
											type: 'home',
											title: '',
											phone: '',
											address: '',
											area: '',
											city: 'Bengaluru',
											pincode: '',
											state: 'Karnataka'
										});
									}}
									className="text-gray-500 hover:text-gray-700"
								>
									✕
								</button>
							)}
						</div>

						<div className="space-y-4">
							<div className="grid grid-cols-3 gap-3">
								{addressTypes.map(type => {
									const IconComponent = type.icon;
									return (
										<label
											key={type.value}
											className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
												formData.type === type.value
													? 'border-green-500 bg-green-50 text-green-700'
													: 'border-gray-200 hover:border-gray-300'
											}`}
										>
											<input
												type="radio"
												name="type"
												value={type.value}
												checked={formData.type === type.value}
												onChange={(e) => handleInputChange('type', e.target.value)}
												className="sr-only"
											/>
											<IconComponent className="w-4 h-4" />
											{type.label}
										</label>
									);
								})}
							</div>

							{/* Custom Title */}
							<input
								type="text"
								placeholder="Address title (e.g., Home, Office)"
								value={formData.title}
								onChange={(e) => handleInputChange('title', e.target.value)}
								className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
							/>

							{/* Phone Number */}
							<input
								type="tel"
								placeholder="Phone Number *"
								value={formData.phone}
								onChange={(e) => handleInputChange('phone', e.target.value)}
								className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
								required
							/>

							{/* Address Details */}
							<textarea
								placeholder="House/Flat/Office No, Building Name, Street *"
								value={formData.address}
								onChange={(e) => handleInputChange('address', e.target.value)}
								className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 h-20 resize-none"
								required
							/>

							<div className="grid md:grid-cols-2 gap-4">
								<input
									type="text"
									placeholder="Area/Locality *"
									value={formData.area}
									onChange={(e) => handleInputChange('area', e.target.value)}
									className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
									required
								/>
								<input
									type="text"
									placeholder="Pincode *"
									value={formData.pincode}
									onChange={(e) => handleInputChange('pincode', e.target.value)}
									className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
									required
								/>
							</div>

							<div className="grid md:grid-cols-2 gap-4">
								<input
									type="text"
									placeholder="City"
									value={formData.city}
									onChange={(e) => handleInputChange('city', e.target.value)}
									className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
								/>
								<input
									type="text"
									placeholder="State"
									value={formData.state}
									onChange={(e) => handleInputChange('state', e.target.value)}
									className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
								/>
							</div>

							<div className="flex gap-3 pt-2">
								<button
									onClick={handleSubmit}
									className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
								>
									{address ? 'Update Address' : 'Save Address'}
								</button>
								{address && (
									<button
										type="button"
										onClick={() => setShowForm(false)}
										className="px-6 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors"
									>
										Cancel
									</button>
								)}
							</div>
						</div>
					</div>
				)}

				{/* Address Display - Show when address exists and not editing */}
				{address && !showForm && (
					<div className="rounded-lg shadow-sm p-5 border-2 border-green-500 bg-green-50">
						<div className="flex items-start justify-between">
							<div className="flex-1">
								<div className="flex items-center gap-2 mb-2">
									{getTypeIcon(address.type)}
									<span className="font-semibold text-gray-800">{address.title || address.type}</span>
									<span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
										Default
									</span>
								</div>
								
								<div className="text-gray-700 mb-1">
									<span className="font-medium">{address.phone}</span>
								</div>
								
								<div className="text-gray-600 text-sm leading-relaxed">
									{address.address}<br />
									{address.area}, {address.city}, {address.state} - {address.pincode}
								</div>
							</div>

							<div className="flex gap-2 ml-4">
								<button
									onClick={handleEdit}
									className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
									title="Edit Address"
								>
									<Edit3 className="w-4 h-4" />
								</button>
								<button
									onClick={handleDelete}
									className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
									title="Delete Address"
								>
									<Trash2 className="w-4 h-4" />
								</button>
							</div>
						</div>
					</div>
				)}

				{/* No Address State */}
				{!address && !showForm && (
					<div className="text-center py-12">
						<MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
						<h3 className="text-lg font-medium text-gray-500 mb-2">No address saved</h3>
						<p className="text-gray-400">Add your delivery address to get started with orders</p>
					</div>
				)}
			</div>
		</div>
	);
}