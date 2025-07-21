import React, { useEffect, useState } from 'react';
import { Minus, Plus, Trash2, ArrowLeft, Truck, Shield, Clock, Tag, CreditCard, MapPin, User, Phone, Mail } from 'lucide-react';
import Header from '../../components/layout/Header';
import { decreaseQuantity, getCartByUserId, increaseQuantity, removeProductFromCart } from '../../services/api';
import PrimaryLoader from '../../components/loaders/PrimaryLoader';
import { CART_ACTIONS } from '../../config/constants';
import axiosInstance from '../../services/axios';
import Checkout from './components/Checkout';
import Cart from './components/Cart';

export default function MobileResponsiveCart() {
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
        addressLine: '',
        city: '',
        state: '',
        pincode: '',
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

    const handlePlaceOrder = async () => {
        if (!orderForm.fullName || !orderForm.phone || !orderForm.addressLine || !orderForm.city || !orderForm.state || !orderForm.pincode) {
            alert('Please fill in all required fields');
            return;
        }

        try {
            setOrderLoading(true);

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
                deliveryAddress: {
                    addressLine: orderForm.addressLine,
                    city: orderForm.city,
                    state: orderForm.state,
                    pincode: orderForm.pincode,
                    country: orderForm.country
                },
                paymentMethod: orderForm.paymentMethod,
                shippingPrice: deliveryFee,
                totalPrice: total,
                isPaid: orderForm.paymentMethod === 'Cash on Delivery' ? false : true,
                paidAt: orderForm.paymentMethod === 'Cash on Delivery' ? null : new Date()
            };

            const result = await createOrder(orderData);
            
            setCartItems([]);
            alert('Order placed successfully! Order ID: ' + result._id);
            setShowCheckout(false);
            setOrderForm({
                fullName: '',
                phone: '',
                addressLine: '',
                city: '',
                state: '',
                pincode: '',
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

                <Checkout
                    cartItems={cartItems}
                    subtotal={subtotal}
                    savings={savings}
                    promoDiscount={promoDiscount}
                    isPromoApplied={isPromoApplied}
                    deliveryFee={deliveryFee}
                    total={total}
                    orderForm={orderForm}
                    handleInputChange={handleInputChange}
                    handlePlaceOrder={handlePlaceOrder}
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <PrimaryLoader isLoading={isLoading} />
            <Cart
                cartItems={cartItems}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
                promoCode={promoCode}
                setPromoCode={setPromoCode}
                applyPromoCode={applyPromoCode}
                isPromoApplied={isPromoApplied}
                subtotal={subtotal}
                savings={savings}
                promoDiscount={promoDiscount}
                deliveryFee={deliveryFee}
                total={total}
                setShowCheckout={setShowCheckout}
            />
        </div>
    );
}