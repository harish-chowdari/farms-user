import React, { useEffect, useState } from 'react';
import { Minus, Plus, Trash2, ArrowLeft, Truck, Shield, Clock, Tag, CreditCard, MapPin, User, Phone, Mail } from 'lucide-react';
import Header from '../../components/layout/Header';
import { decreaseQuantity, getCartByUserId, increaseQuantity, removeProductFromCart } from '../../services/api';
import PrimaryLoader from '../../components/loaders/PrimaryLoader';
import { CART_ACTIONS } from '../../config/constants';
import axiosInstance from '../../services/axios';

export default function index() {
    const userId = '686fbc3fddb3fa12336d0a16';

    const [cartItems, setCartItems] = useState([]);
    const [promoCode, setPromoCode] = useState('');
    const [isPromoApplied, setIsPromoApplied] = useState(false);
    const [showCheckout, setShowCheckout] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [orderLoading, setOrderLoading] = useState(false);
    
    // Checkout form state
    const [orderForm, setOrderForm] = useState({
        fullName: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'India',
        deliveryTime: 'Same Day (6-8 PM)',
        paymentMethod: 'Credit/Debit Card'
    });

    useEffect(() => {
        const fetchCart = async () => {
            try {
                setIsLoading(true);
                const res = await getCartByUserId(userId);
                
                const transformedCartItems = res.map(item => ({
                    id: item.product._id,
                    name: item.product.productName,
                    price: item.product.discountPrice,
                    originalPrice: item.product.price,
                    quantity: item.quantity,
                    image: item.product.productImage[0] || '🥕',
                    category: item.product.category,
                    farmer: item.product.brand || item.product.origin,
                    unit: item.product.weightUnit,
                    weight: item.product.weight,
                    freshness: item.product.freshness,
                    expiryDate: item.product.expiryDate
                }));
                
                setCartItems(transformedCartItems);
            } catch (error) {
                console.error('Error fetching cart:', error);
                setCartItems([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCart();
    }, []);

    const handleRemoveFromCart = async (productId) => {
        try {
            setIsLoading(true);
            await removeProductFromCart(userId, productId);
            
            // Update local state
            setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
            
            // Optional: Show success message
            console.log('Product removed from cart successfully');
        } catch (error) {
            console.error('Error removing product from cart:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleQuantityChange = async (productId, action) => {
        try {
            setIsLoading(true);
            
            if (action === CART_ACTIONS.INCREMENT) {
                await increaseQuantity(userId, productId);
                setCartItems(prevItems => 
                    prevItems.map(item => 
                        item.id === productId 
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                );
            } else if (action === CART_ACTIONS.DECREMENT) {
                const currentItem = cartItems.find(item => item.id === productId);
                if (currentItem && currentItem.quantity > 1) {
                    await decreaseQuantity(userId, productId);
                    setCartItems(prevItems => 
                        prevItems.map(item => 
                            item.id === productId 
                                ? { ...item, quantity: item.quantity - 1 }
                                : item
                        )
                    );
                }
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const applyPromoCode = () => {
        if (promoCode.toLowerCase() === 'fresh10') {
            setIsPromoApplied(true);
        }
    };

    // Helper function to update quantity (for the UI buttons)
    const updateQuantity = (productId, newQuantity) => {
        const currentItem = cartItems.find(item => item.id === productId);
        if (!currentItem) return;

        if (newQuantity > currentItem.quantity) {
            handleQuantityChange(productId, CART_ACTIONS.INCREMENT);
        } else if (newQuantity < currentItem.quantity && newQuantity > 0) {
            handleQuantityChange(productId, CART_ACTIONS.DECREMENT);
        }
    };

    // Helper function to remove item (for the UI button)
    const removeItem = (productId) => {
        handleRemoveFromCart(productId);
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrderForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Create order API call
    const createOrder = async (orderData) => {
        try {
            const response = axiosInstance.post('/api/orders/add-order', orderData);
            const result = await response;
            return result;
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    };

    // Handle order placement
    const handlePlaceOrder = async () => {
        // Validate form
        if (!orderForm.fullName || !orderForm.phone || !orderForm.email || !orderForm.address || !orderForm.city || !orderForm.state || !orderForm.postalCode) {
            alert('Please fill in all required fields');
            return;
        }

        try {
            setOrderLoading(true);

            // Prepare order data according to your schema
            const orderData = {
                userId: userId,
                orderItems: cartItems.map(item => ({
                    productId: item.id,
                    productName: item.name,
                    productImage: item.image,
                    price: item.originalPrice,
                    discountPrice: item.price,
                    weight: item.weight,
                    weightUnit: item.unit,
                    quantity: item.quantity
                })),
                shippingAddress: {
                    address: orderForm.address,
                    city: orderForm.city,
                    state: orderForm.state,
                    postalCode: orderForm.postalCode,
                    country: orderForm.country
                },
                paymentMethod: orderForm.paymentMethod,
                shippingPrice: deliveryFee,
                totalPrice: total,
                isPaid: orderForm.paymentMethod === 'Cash on Delivery' ? false : true,
                paidAt: orderForm.paymentMethod === 'Cash on Delivery' ? null : new Date()
            };

            // Create the order
            const result = await createOrder(orderData);
            
            // Clear cart after successful order
            // You might want to call a clear cart API here
            setCartItems([]);
            
            // Show success message
            alert('Order placed successfully! Order ID: ' + result._id);
            
            // Reset form and go back to cart view
            setShowCheckout(false);
            setOrderForm({
                fullName: '',
                phone: '',
                email: '',
                address: '',
                city: '',
                state: '',
                postalCode: '',
                country: 'India',
                deliveryTime: 'Same Day (6-8 PM)',
                paymentMethod: 'Credit/Debit Card'
            });
            
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order. Please try again.');
        } finally {
            setOrderLoading(false);
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
                <PrimaryLoader isLoading={isLoading || orderLoading} />

                <div className="max-w-4xl mx-auto px-4 py-8">
                    <div className="flex items-center mb-6">
                        <button 
                            onClick={() => setShowCheckout(false)}
                            className="flex items-center text-gray-600 hover:text-gray-800 mr-4"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Cart
                        </button>
                        <h1 className="text-2xl font-bold">Checkout</h1>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Checkout Form */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-6">Delivery Information</h2>
                            
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
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
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
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                                            placeholder="Enter your phone number"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Email Address *</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <input 
                                            type="email" 
                                            name="email"
                                            value={orderForm.email}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Delivery Address *</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <textarea 
                                            name="address"
                                            value={orderForm.address}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent h-20 resize-none" 
                                            placeholder="Enter your complete delivery address"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">City *</label>
                                        <input 
                                            type="text" 
                                            name="city"
                                            value={orderForm.city}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
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
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                                            placeholder="Enter state"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Postal Code *</label>
                                        <input 
                                            type="text" 
                                            name="postalCode"
                                            value={orderForm.postalCode}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
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
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    >
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
                                        <input 
                                            type="radio" 
                                            name="paymentMethod" 
                                            value="Credit/Debit Card"
                                            checked={orderForm.paymentMethod === 'Credit/Debit Card'}
                                            onChange={handleInputChange}
                                            className="mr-3" 
                                        />
                                        <CreditCard className="h-4 w-4 mr-2" />
                                        <span>Credit/Debit Card</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input 
                                            type="radio" 
                                            name="paymentMethod" 
                                            value="UPI Payment"
                                            checked={orderForm.paymentMethod === 'UPI Payment'}
                                            onChange={handleInputChange}
                                            className="mr-3" 
                                        />
                                        <span className="mr-2">💳</span>
                                        <span>UPI Payment</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input 
                                            type="radio" 
                                            name="paymentMethod" 
                                            value="Cash on Delivery"
                                            checked={orderForm.paymentMethod === 'Cash on Delivery'}
                                            onChange={handleInputChange}
                                            className="mr-3" 
                                        />
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
                                            <img 
                                                src={item.image} 
                                                alt={item.name}
                                                className="w-8 h-8 rounded object-cover mr-3"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'block';
                                                }}
                                            />
                                            <span className="text-2xl mr-3" style={{display: 'none'}}>🥕</span>
                                            <div>
                                                <div className="font-medium">{item.name}</div>
                                                <div className="text-sm text-gray-600">{item.quantity} × {item.weight}{item.unit}</div>
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

                            <button 
                                onClick={handlePlaceOrder}
                                disabled={orderLoading}
                                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors mt-6 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {orderLoading ? 'Placing Order...' : 'Place Order'}
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
            <PrimaryLoader isLoading={isLoading} />

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
                    <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="md:col-span-2">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-semibold mb-6">Cart Items ({cartItems.length})</h2>
                                
                                <div className="space-y-6">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex items-center border-b pb-6 last:border-b-0">
                                            <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                                                <img 
                                                    src={item.image} 
                                                    alt={item.name}
                                                    className="w-full h-full object-cover rounded-lg"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'flex';
                                                    }}
                                                />
                                                <div className="text-3xl hidden items-center justify-center w-full h-full">
                                                    🥕
                                                </div>
                                            </div>
                                            
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-lg">{item.name}</h3>
                                                <p className="text-gray-600 text-sm">by {item.farmer}</p>
                                                <p className="text-green-600 text-sm">{item.category}</p>
                                                <p className="text-gray-500 text-sm">{item.weight}{item.unit} • {item.freshness}</p>
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
                                                        disabled={item.quantity <= 1}
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