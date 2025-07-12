import React, { useState } from 'react';
import { Minus, Plus, Trash2, ShoppingCart, ArrowLeft, Truck, Shield, Clock, Tag, CreditCard, MapPin, User, Phone, Mail } from 'lucide-react';
import Header from '../../components/layout/Header';

export default function index() {
  const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "Organic Apples",
            price: 120,
            originalPrice: 150,
            image: "🍎",
            farmer: "Rajesh Kumar",
            quantity: 2,
            unit: "kg",
            category: "Fresh Fruits"
        },
        {
            id: 2,
            name: "Farm Fresh Tomatoes",
            price: 40,
            originalPrice: 50,
            image: "🍅",
            farmer: "Priya Sharma",
            quantity: 1,
            unit: "kg",
            category: "Vegetables"
        },
        {
            id: 3,
            name: "Pure Milk",
            price: 60,
            originalPrice: 70,
            image: "🥛",
            farmer: "Green Valley Dairy",
            quantity: 3,
            unit: "L",
            category: "Dairy"
        }
    ]);

    const [promoCode, setPromoCode] = useState('');
    const [isPromoApplied, setIsPromoApplied] = useState(false);
    const [showCheckout, setShowCheckout] = useState(false);

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity === 0) {
            removeItem(id);
        } else {
            setCartItems(cartItems.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            ));
        }
    };

    const removeItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const applyPromoCode = () => {
        if (promoCode.toLowerCase() === 'fresh10') {
            setIsPromoApplied(true);
        }
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const originalTotal = cartItems.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
    const savings = originalTotal - subtotal;
    const promoDiscount = isPromoApplied ? subtotal * 0.1 : 0;
    const deliveryFee = subtotal >= 500 ? 0 : 50;
    const total = subtotal - promoDiscount + deliveryFee;

    if (showCheckout) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />

                <div className="max-w-4xl mx-auto px-4 py-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Checkout Form */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-6">Delivery Information</h2>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <input type="text" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Enter your full name" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <input type="tel" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Enter your phone number" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <input type="email" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Enter your email" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Delivery Address</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <textarea className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent h-20 resize-none" placeholder="Enter your complete delivery address"></textarea>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Delivery Time</label>
                                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                                        <option>Same Day (6-8 PM)</option>
                                        <option>Next Day (8-10 AM)</option>
                                        <option>Next Day (10-12 PM)</option>
                                        <option>Next Day (2-4 PM)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t">
                                <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                                <div className="space-y-3">
                                    <label className="flex items-center">
                                        <input type="radio" name="payment" className="mr-3" defaultChecked />
                                        <CreditCard className="h-4 w-4 mr-2" />
                                        <span>Credit/Debit Card</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="radio" name="payment" className="mr-3" />
                                        <span className="mr-2">💳</span>
                                        <span>UPI Payment</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="radio" name="payment" className="mr-3" />
                                        <span className="mr-2">💵</span>
                                        <span>Cash on Delivery</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="bg-white p-6 rounded-lg shadow-md h-fit">
                            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                            
                            <div className="space-y-3 mb-4">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <span className="text-2xl mr-3">{item.image}</span>
                                            <div>
                                                <div className="font-medium">{item.name}</div>
                                                <div className="text-sm text-gray-600">{item.quantity} {item.unit}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-medium">₹{item.price * item.quantity}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t pt-4 space-y-2">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal}</span>
                                </div>
                                {isPromoApplied && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Promo Discount (10%)</span>
                                        <span>-₹{promoDiscount.toFixed(0)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span>Delivery Fee</span>
                                    <span>{deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                                    <span>Total</span>
                                    <span>₹{total.toFixed(0)}</span>
                                </div>
                            </div>

                            <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors mt-6">
                                Place Order
                            </button>

                            <div className="mt-4 text-center text-sm text-gray-600">
                                <Shield className="h-4 w-4 inline mr-1" />
                                Secure payment with SSL encryption
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            {cartItems.length === 0 ? (
                <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                    <div className="text-6xl mb-4">🛒</div>
                    <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
                    <p className="text-gray-600 mb-8">Add some fresh produce to get started!</p>
                    <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="md:col-span-2">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-semibold mb-6">Cart Items ({cartItems.length})</h2>
                                
                                <div className="space-y-6">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex items-center border-b pb-6 last:border-b-0">
                                            <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-3xl mr-4">
                                                {item.image}
                                            </div>
                                            
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-lg">{item.name}</h3>
                                                <p className="text-gray-600 text-sm">by {item.farmer}</p>
                                                <p className="text-green-600 text-sm">{item.category}</p>
                                                <div className="flex items-center mt-2">
                                                    <span className="text-lg font-bold text-green-600">₹{item.price}/{item.unit}</span>
                                                    <span className="text-sm text-gray-500 line-through ml-2">₹{item.originalPrice}</span>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center space-x-4">
                                                <div className="flex items-center border rounded-lg">
                                                    <button 
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-2 hover:bg-gray-100 rounded-l-lg"
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </button>
                                                    <span className="px-4 py-2 font-semibold">{item.quantity}</span>
                                                    <button 
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-2 hover:bg-gray-100 rounded-r-lg"
                                                    >
                                                        <Plus className="h-4 w-4" />
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
        </div>
    );
}
