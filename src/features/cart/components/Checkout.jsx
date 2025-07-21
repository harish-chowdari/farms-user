import React from 'react';
import { ArrowLeft, Shield, User, Phone, Mail, MapPin, CreditCard } from 'lucide-react';

const Checkout = ({ 
    cartItems,
    orderForm,
    handleInputChange,
    handlePlaceOrder,
    orderLoading,
    subtotal,
    promoDiscount,
    isPromoApplied,
    deliveryFee,
    total
}) => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
            <div className="flex items-center mb-4 sm:mb-6">
                <button 
                    onClick={() => setShowCheckout(false)}
                    className="flex items-center text-gray-600 hover:text-gray-800 mr-4 text-sm sm:text-base"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Cart
                </button>
                <h1 className="text-xl sm:text-2xl font-bold">Checkout</h1>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                {/* Checkout Form */}
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md order-2 lg:order-1">
                    <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Delivery Information</h2>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Full Name *</label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <input 
                                    type="text" 
                                    name="fullName"
                                    value={orderForm.fullName}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Phone Number *</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <input 
                                    type="tel" 
                                    name="phone"
                                    value={orderForm.phone}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                                    placeholder="Enter your phone number"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Delivery Address *</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <textarea 
                                    name="addressLine"
                                    value={orderForm.addressLine}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent h-20 resize-none" 
                                    placeholder="Enter your complete delivery address"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">City *</label>
                                <input 
                                    type="text" 
                                    name="city"
                                    value={orderForm.city}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                                    placeholder="Enter city"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">State *</label>
                                <input 
                                    type="text" 
                                    name="state"
                                    value={orderForm.state}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                                    placeholder="Enter state"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Postal Code *</label>
                                <input 
                                    type="text" 
                                    name="pincode"
                                    value={orderForm.pincode}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                                    placeholder="Enter postal code"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Country</label>
                                <input 
                                    type="text" 
                                    name="country"
                                    value={orderForm.country}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                                    placeholder="Enter country"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Delivery Time</label>
                            <select 
                                name="deliveryTime"
                                value={orderForm.deliveryTime}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            >
                                <option>Same Day (6-8 PM)</option>
                                <option>Next Day (8-10 AM)</option>
                                <option>Next Day (10-12 PM)</option>
                                <option>Next Day (2-4 PM)</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t">
                        <h3 className="text-base sm:text-lg font-semibold mb-4">Payment Method</h3>
                        <div className="space-y-3">
                            <label className="flex items-center cursor-pointer">
                                <input 
                                    type="radio" 
                                    name="paymentMethod" 
                                    value="Credit/Debit Card"
                                    checked={orderForm.paymentMethod === 'Credit/Debit Card'}
                                    onChange={handleInputChange}
                                    className="mr-3" 
                                />
                                <CreditCard className="h-4 w-4 mr-2" />
                                <span className="text-sm sm:text-base">Credit/Debit Card</span>
                            </label>
                            <label className="flex items-center cursor-pointer">
                                <input 
                                    type="radio" 
                                    name="paymentMethod" 
                                    value="UPI Payment"
                                    checked={orderForm.paymentMethod === 'UPI Payment'}
                                    onChange={handleInputChange}
                                    className="mr-3" 
                                />
                                <span className="mr-2">💳</span>
                                <span className="text-sm sm:text-base">UPI Payment</span>
                            </label>
                            <label className="flex items-center cursor-pointer">
                                <input 
                                    type="radio" 
                                    name="paymentMethod" 
                                    value="Cash on Delivery"
                                    checked={orderForm.paymentMethod === 'Cash on Delivery'}
                                    onChange={handleInputChange}
                                    className="mr-3" 
                                />
                                <span className="mr-2">💵</span>
                                <span className="text-sm sm:text-base">Cash on Delivery</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Order Summary - Mobile Sticky */}
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md order-1 lg:order-2 lg:sticky lg:top-4 lg:h-fit">
                    <h2 className="text-lg sm:text-xl font-semibold mb-4">Order Summary</h2>
                    
                    <div className="space-y-3 mb-4 max-h-40 sm:max-h-60 overflow-y-auto">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex justify-between items-center">
                                <div className="flex items-center flex-1 min-w-0">
                                    <img 
                                        src={item.image} 
                                        alt={item.name}
                                        className="w-8 h-8 rounded object-cover mr-3 flex-shrink-0"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'block';
                                        }}
                                    />
                                    <span className="text-2xl mr-3 flex-shrink-0" style={{display: 'none'}}>🥕</span>
                                    <div className="min-w-0 flex-1">
                                        <div className="font-medium text-sm sm:text-base truncate">{item.name}</div>
                                        <div className="text-xs sm:text-sm text-gray-600">{item.quantity} × {item.weight}{item.unit}</div>
                                    </div>
                                </div>
                                <div className="text-right ml-2 flex-shrink-0">
                                    <div className="font-medium text-sm sm:text-base">₹{item.price * item.quantity}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t pt-4 space-y-2">
                        <div className="flex justify-between text-sm sm:text-base">
                            <span>Subtotal</span>
                            <span>₹{subtotal}</span>
                        </div>
                        {isPromoApplied && (
                            <div className="flex justify-between text-green-600 text-sm sm:text-base">
                                <span>Promo Discount (10%)</span>
                                <span>-₹{promoDiscount.toFixed(0)}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-sm sm:text-base">
                            <span>Delivery Fee</span>
                            <span>{deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}</span>
                        </div>
                        <div className="flex justify-between font-bold text-base sm:text-lg pt-2 border-t">
                            <span>Total</span>
                            <span>₹{total.toFixed(0)}</span>
                        </div>
                    </div>

                    <button 
                        onClick={handlePlaceOrder}
                        disabled={orderLoading}
                        className="w-full bg-green-600 text-white py-3 sm:py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors mt-4 sm:mt-6 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm sm:text-base"
                    >
                        {orderLoading ? 'Placing Order...' : 'Place Order'}
                    </button>

                    <div className="mt-4 text-center text-xs sm:text-sm text-gray-600">
                        <Shield className="h-4 w-4 inline mr-1" />
                        Secure payment with SSL encryption
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;