import React, { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

import { getCartByUserId } from '../../services/api';

export default function ProductCard({product}) {
    const navigate = useNavigate();
    const userId = '686fbc3fddb3fa12336d0a16';
    
    const [quantity, setQuantity] = useState(1);
    const [isInCart, setIsInCart] = useState(false);
    const [showAddedToCart, setShowAddedToCart] = useState(false);
    const [showRemovedFromCart, setShowRemovedFromCart] = useState(false);

    const [isLoading, setIsLoading] = React.useState(false);

    // Calculate discount percentage
    const calculateDiscountPercentage = (originalPrice, discountPrice) => {
        if (!originalPrice || !discountPrice || originalPrice <= discountPrice) return 0;
        return Math.round(((originalPrice - discountPrice) / originalPrice) * 100);
    };

    useEffect(() => {
        const getCartDetails = async () => {
            try {
                setIsLoading(true);
                const cartRes = await getCartByUserId(userId);
                const cartItems = cartRes || [];
                const cartItem = cartItems?.find(item => item.productId === product?._id);
                if (cartItem) {
                    setQuantity(cartItem?.quantity);
                    setIsInCart(true);
                } else {
                    setIsInCart(false);
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            } finally {
                setIsLoading(false);
            }
        }

        getCartDetails();
    }, [])

    const handleAddToCart = async() => {
        try {
            setIsLoading(true);
            const res = await addProductToCart( userId, quantity, product?._id);
            setIsInCart(true);
            setShowAddedToCart(true);
            setTimeout(() => {
                setShowAddedToCart(false);
            }, 3000);
        } catch (error) {
            console.error('Error adding product to cart:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleRemoveFromCart = async() => {
        try {
            setIsLoading(true);
            const res = await removeProductFromCart(userId, product?._id);
            setIsInCart(false);
            setQuantity(1); 
            setShowRemovedFromCart(true);
            setTimeout(() => {
                setShowRemovedFromCart(false);
            }, 3000);
        } catch (error) {
            console.error('Error removing product from cart:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleQuantityChange = async(action) => {
        try {
            if (action === CART_ACTIONS.INCREMENT) {
                setIsLoading(true);
                const res = await increaseQuantity(userId, product?._id);
                setQuantity(prev => prev + 1);
            } else if (action === CART_ACTIONS.DECREMENT && quantity > 1) {
                setIsLoading(true);
                const res = await decreaseQuantity(userId, product?._id);
                setQuantity(prev => prev - 1);
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const discountPercentage = calculateDiscountPercentage(product.price, product.discountPrice);

    return (
        <div key={product.id} className="bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative border-b border-b-gray-300">
                <img  
                    onClick={() => navigate(`/product-details/${product?._id}`)} 
                    src={product?.productImage[0]} alt={product.name} 
                    className="h-48 cursor-pointer flex items-center object-contain justify-center text-6xl" 
                />
                {discountPercentage > 0 && (
                    <div className="absolute top-0 left-0 z-10">
                        <div className="relative">
                            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 font-bold text-xs shadow-lg">
                                {discountPercentage}% OFF
                            </div>
                            {/* <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[15px] border-l-red-600 opacity-40 border-r-[15px] border-r-transparent border-t-[8px] border-t-red-600"></div> */}
                        </div>
                    </div>
                )}
                <button className="absolute top-2 right-2 bg-white p-2 rounded-full hover:bg-gray-100">
                    <Heart className="h-4 w-4" />
                </button>
            </div>
            <div className="p-4 pt-2">
                <h3 className="font-semibold text-lg mb-1">{product?.productName}</h3>
                {/* <p className="text-sm text-gray-600 mb-2">by {product?.farmer || 'Harish (Farmer)'}</p> */}
                {/* <div className="flex items-center mb-2">
                    <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500 ml-2">({product.reviews || '10'} reviews)</span>
                </div> */}
                <span className='text-sm text-black font-normal'>{product?.weight} {product?.weightUnit}</span>
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-lg font-bold text-green-600">₹{product.discountPrice} </span>
                        <span className="text-sm text-gray-500 line-through ml-2">₹{product.price} </span>
                    </div>
                    <button className="bg-green-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-green-700">
                        Add
                    </button>
                </div>
            </div>
        </div>
    )
}