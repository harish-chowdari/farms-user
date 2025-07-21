import React from 'react';
import { Minus, Plus, Trash2, Truck, Shield, Clock, Tag } from 'lucide-react';
import ROUTES from '../../../navigations/routes';
import { useNavigate } from 'react-router-dom';

const Cart = ({ 
    cartItems, 
    updateQuantity, 
    removeItem, 
    promoCode, 
    setPromoCode, 
    applyPromoCode, 
    isPromoApplied,
    subtotal,
    savings,
    promoDiscount,
    deliveryFee,
    total,
    setShowCheckout
}) => {

    const navigate = useNavigate();

    return (
        <>
            {cartItems.length === 0 ? (
                <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 lg:py-16 text-center">
                    <div className="text-4xl sm:text-5xl lg:text-6xl mb-4">🛒</div>
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4">Your cart is empty</h2>
                    <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base max-w-md mx-auto">Add some fresh produce to get started!</p>
                    <button 
                        onClick={() => navigate(ROUTES.HOME)} 
                        className="bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm sm:text-base w-full sm:w-auto max-w-xs"
                    >
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <div className="min-h-screen bg-gray-50">
                    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
                        {/* Header */}
                        <div className="mb-4 sm:mb-6">
                            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Shopping Cart</h1>
                            <p className="text-sm text-gray-600 mt-1">{cartItems.length} item{cartItems.length > 1 ? 's' : ''} in your cart</p>
                        </div>
                        
                        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
                            {/* Cart Items - Mobile First, Desktop 2/3 width */}
                            <div className="lg:col-span-8">
                                <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                    <div className="p-4 sm:p-6 border-b border-gray-100">
                                        <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">
                                            Cart Items ({cartItems.length})
                                        </h2>
                                    </div>
                                    
                                    <div className="divide-y divide-gray-100">
                                        {cartItems.map((item) => (
                                            <div key={item.id} className="p-4 sm:p-6">
                                                <div className="flex gap-3 sm:gap-4">
                                                    {/* Product Image */}
                                                    <div className="flex-shrink-0">
                                                        <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gray-100 rounded-lg overflow-hidden">
                                                            <img 
                                                                src={item.image} 
                                                                alt={item.name}
                                                                className="w-full h-full object-cover"
                                                                onError={(e) => {
                                                                    e.target.style.display = 'none';
                                                                    e.target.nextSibling.style.display = 'flex';
                                                                }}
                                                            />
                                                            <div className="text-2xl sm:text-3xl hidden items-center justify-center w-full h-full bg-gray-100">
                                                                🥕
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Product Info */}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4">
                                                            <div className="flex-1 min-w-0">
                                                                <h3 className="font-semibold text-sm sm:text-base lg:text-lg text-gray-900 line-clamp-2">
                                                                    {item.name}
                                                                </h3>
                                                                <div className="mt-1 space-y-1">
                                                                    <p className="text-xs sm:text-sm text-gray-600">by {item.farmer}</p>
                                                                    <p className="text-xs sm:text-sm text-green-600 font-medium">{item.category}</p>
                                                                    <p className="text-xs sm:text-sm text-gray-500">
                                                                        {item.weight}{item.unit} • {item.freshness}
                                                                    </p>
                                                                </div>
                                                                
                                                                {/* Price - Mobile */}
                                                                <div className="flex items-center gap-2 mt-2">
                                                                    <span className="text-base sm:text-lg font-bold text-green-600">
                                                                        ₹{item.price}/{item.unit}
                                                                    </span>
                                                                    <span className="text-xs sm:text-sm text-gray-500 line-through">
                                                                        ₹{item.originalPrice}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        {/* Quantity and Total - Mobile Optimized */}
                                                        <div className="flex items-center justify-between mt-4 sm:mt-6">
                                                            {/* Quantity Controls */}
                                                            <div className="flex items-center">
                                                                <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                                                                    <button 
                                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                        className="p-2 sm:p-2.5 hover:bg-gray-100 rounded-l-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                                        disabled={item.quantity <= 1}
                                                                    >
                                                                        <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                                                                    </button>
                                                                    <div className="px-3 sm:px-4 py-2 sm:py-2.5 font-semibold text-sm sm:text-base min-w-[3rem] text-center bg-white">
                                                                        {item.quantity}
                                                                    </div>
                                                                    <button 
                                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                        className="p-2 sm:p-2.5 hover:bg-gray-100 rounded-r-lg transition-colors"
                                                                    >
                                                                        <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="text-right">
                                                                <div className="font-bold text-base sm:text-lg text-gray-900">
                                                                    ₹{(item.price * item.quantity).toFixed(0)}
                                                                </div>
                                                            </div>
                                                            {/* Item Total and Remove */}
                                                            <div className="flex items-center gap-3 sm:gap-4">
                                                                
                                                                <button 
                                                                    onClick={() => removeItem(item.id)}
                                                                    className="p-2 sm:p-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                                    aria-label="Remove item"
                                                                >
                                                                    <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Promo Code Section */}
                                <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 mt-4 sm:mt-6 p-4 sm:p-6">
                                    <h3 className="text-base sm:text-lg font-semibold mb-4 text-gray-900">Have a Promo Code?</h3>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <input 
                                            type="text"
                                            value={promoCode}
                                            onChange={(e) => setPromoCode(e.target.value)}
                                            className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base"
                                            placeholder="Enter promo code (try: FRESH10)"
                                        />
                                        <button 
                                            onClick={applyPromoCode}
                                            className="bg-green-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold text-sm sm:text-base w-full sm:w-auto whitespace-nowrap"
                                        >
                                            Apply Code
                                        </button>
                                    </div>
                                    {isPromoApplied && (
                                        <div className="mt-3 sm:mt-4 text-green-600 flex items-center bg-green-50 p-3 rounded-lg">
                                            <Tag className="h-4 w-4 mr-2 flex-shrink-0" />
                                            <span className="text-sm sm:text-base font-medium">Promo code applied! You saved 10%</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Order Summary - Sticky on Desktop */}
                            <div className="lg:col-span-4">
                                <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 lg:sticky lg:top-4">
                                    <div className="p-4 sm:p-6">
                                        <h2 className="text-lg sm:text-xl font-semibold mb-6 text-gray-900">Order Summary</h2>
                                        
                                        <div className="space-y-4 mb-6">
                                            <div className="flex justify-between text-sm sm:text-base">
                                                <span className="text-gray-600">Subtotal</span>
                                                <span className="font-medium">₹{subtotal}</span>
                                            </div>
                                            <div className="flex justify-between text-green-600 text-sm sm:text-base">
                                                <span>You Save</span>
                                                <span className="font-medium">₹{savings}</span>
                                            </div>
                                            {isPromoApplied && (
                                                <div className="flex justify-between text-green-600 text-sm sm:text-base">
                                                    <span>Promo Discount</span>
                                                    <span className="font-medium">-₹{promoDiscount.toFixed(0)}</span>
                                                </div>
                                            )}
                                            <div className="flex justify-between text-sm sm:text-base">
                                                <span className="text-gray-600">Delivery Fee</span>
                                                <span className="font-medium">{deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}</span>
                                            </div>
                                            <div className="border-t border-gray-200 pt-4">
                                                <div className="flex justify-between font-bold text-lg sm:text-xl">
                                                    <span className="text-gray-900">Total</span>
                                                    <span className="text-green-600">₹{total.toFixed(0)}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <button 
                                            onClick={() => setShowCheckout(true)}
                                            className="w-full bg-green-600 text-white py-3 sm:py-3.5 rounded-lg font-semibold hover:bg-green-700 active:bg-green-800 transition-colors mb-6 text-sm sm:text-base"
                                        >
                                            Proceed to Checkout
                                        </button>

                                        {/* Benefits */}
                                        <div className="space-y-3 text-xs sm:text-sm text-gray-600">
                                            <div className="flex items-center">
                                                <Truck className="h-4 w-4 mr-3 flex-shrink-0 text-green-600" />
                                                <span>Free delivery on orders above ₹500</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Clock className="h-4 w-4 mr-3 flex-shrink-0 text-green-600" />
                                                <span>Same day delivery available</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Shield className="h-4 w-4 mr-3 flex-shrink-0 text-green-600" />
                                                <span>100% quality guaranteed</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Cart;