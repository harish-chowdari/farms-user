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
                <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16 text-center">
                    <div className="text-4xl sm:text-6xl mb-4">🛒</div>
                    <h2 className="text-xl sm:text-2xl font-semibold mb-4">Your cart is empty</h2>
                    <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">Add some fresh produce to get started!</p>
                    <button onClick={() => navigate(ROUTES.HOME)} className="bg-green-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm sm:text-base">
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
                    <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Shopping Cart</h1>
                    
                    <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                                <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Cart Items ({cartItems.length})</h2>
                                
                                <div className="space-y-4 sm:space-y-6">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex flex-col sm:flex-row sm:items-center border-b pb-4 sm:pb-6 last:border-b-0 space-y-3 sm:space-y-0">
                                            {/* Product Image and Info */}
                                            <div className="flex items-start sm:items-center sm:mr-4">
                                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-lg flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                                                    <img 
                                                        src={item.image} 
                                                        alt={item.name}
                                                        className="w-full h-full object-cover rounded-lg"
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                            e.target.nextSibling.style.display = 'flex';
                                                        }}
                                                    />
                                                    <div className="text-2xl sm:text-3xl hidden items-center justify-center w-full h-full">
                                                        🥕
                                                    </div>
                                                </div>
                                                
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-semibold text-base sm:text-lg truncate">{item.name}</h3>
                                                    <p className="text-gray-600 text-xs sm:text-sm">by {item.farmer}</p>
                                                    <p className="text-green-600 text-xs sm:text-sm">{item.category}</p>
                                                    <p className="text-gray-500 text-xs sm:text-sm">{item.weight}{item.unit} • {item.freshness}</p>
                                                    <div className="flex items-center mt-1 sm:mt-2">
                                                        <span className="text-base sm:text-lg font-bold text-green-600">₹{item.price}/{item.unit}</span>
                                                        <span className="text-xs sm:text-sm text-gray-500 line-through ml-2">₹{item.originalPrice}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* Quantity Controls and Price - Mobile Layout */}
                                            <div className="flex items-center justify-between sm:justify-end sm:space-x-4 w-full sm:w-auto">
                                                <div className="flex items-center border rounded-lg">
                                                    <button 
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-2 hover:bg-gray-100 rounded-l-lg disabled:opacity-50"
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                                                    </button>
                                                    <span className="px-3 sm:px-4 py-2 font-semibold text-sm sm:text-base">{item.quantity}</span>
                                                    <button 
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-2 hover:bg-gray-100 rounded-r-lg"
                                                    >
                                                        <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                                                    </button>
                                                </div>
                                                
                                                <div className="text-right">
                                                    <div className="font-bold text-lg">₹{item.price * item.quantity}</div>
                                                </div>
                                                
                                                <button 
                                                    onClick={() => removeItem(item.id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Promo Code */}
                            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                                <h3 className="text-lg font-semibold mb-4">Have a Promo Code?</h3>
                                <div className="flex gap-3">
                                    <input 
                                        type="text"
                                        value={promoCode}
                                        onChange={(e) => setPromoCode(e.target.value)}
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        placeholder="Enter promo code (try: FRESH10)"
                                    />
                                    <button 
                                        onClick={applyPromoCode}
                                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        Apply
                                    </button>
                                </div>
                                {isPromoApplied && (
                                    <div className="mt-3 text-green-600 flex items-center">
                                        <Tag className="h-4 w-4 mr-2" />
                                        Promo code applied! You saved 10%
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="bg-white rounded-lg shadow-md p-6 h-fit">
                            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                            
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal}</span>
                                </div>
                                <div className="flex justify-between text-green-600">
                                    <span>You Save</span>
                                    <span>₹{savings}</span>
                                </div>
                                {isPromoApplied && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Promo Discount</span>
                                        <span>-₹{promoDiscount.toFixed(0)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span>Delivery Fee</span>
                                    <span>{deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}</span>
                                </div>
                                <div className="border-t pt-3">
                                    <div className="flex justify-between font-bold text-lg">
                                        <span>Total</span>
                                        <span>₹{total.toFixed(0)}</span>
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={() => setShowCheckout(true)}
                                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors mb-4"
                            >
                                Proceed to Checkout
                            </button>

                            <div className="space-y-3 text-sm text-gray-600">
                                <div className="flex items-center">
                                    <Truck className="h-4 w-4 mr-2" />
                                    <span>Free delivery on orders above ₹500</span>
                                </div>
                                <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-2" />
                                    <span>Same day delivery available</span>
                                </div>
                                <div className="flex items-center">
                                    <Shield className="h-4 w-4 mr-2" />
                                    <span>100% quality guaranteed</span>
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