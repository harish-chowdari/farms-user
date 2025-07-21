import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { User, Heart, X, Star, Truck, Shield, Plus, Minus, Share2, MessageCircle, Award, CheckCircle, ShoppingCart, Clock, Zap, Leaf } from 'lucide-react';

import PrimaryLoader from '../../components/loaders/PrimaryLoader';
import NewsLetter from '../../components/layout/NewsLetter';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Description from './components/Description';
// import Reviews from './components/Reviews';

import { addProductToCart, decreaseQuantity, getCartByUserId, increaseQuantity, removeProductFromCart } from '../../services/api';
import { getProduct, getReviews } from './services/api';
import { CART_ACTIONS } from '../../config/constants';
import Farmer from './components/Farmer';
import Reviews from './components/Reviews';

const ProductDetailsPage = () => {

    const { productId } = useParams();

    const [reviews, setReviews] = useState([]);

    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [activeTab, setActiveTab] = useState('description');
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [showAddedToCart, setShowAddedToCart] = useState(false);
    const [showRemovedFromCart, setShowRemovedFromCart] = useState(false);
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isInCart, setIsInCart] = useState(false);

    const userId = '686fbc3fddb3fa12336d0a16'

    useEffect(() => {
        const getProductDetails = async () => {
            try {
                setIsLoading(true);
                const response = await getProduct(productId);
                setProduct(response);

                const cartRes = await getCartByUserId(userId);
                const cartItems = cartRes || [];
                console.log('Cart items:', cartItems);
                
                // Updated to handle the new cart structure
                const cartItem = cartItems?.find(item => item.product._id === productId);
                if (cartItem) {
                    setQuantity(cartItem.quantity);
                    setIsInCart(true);
                } else {
                    setQuantity(1);
                    setIsInCart(false);
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            } finally {
                setIsLoading(false);
            }
        }

        getProductDetails();
    }, [productId])


    const handleAddToCart = async() => {
        try {
            setIsLoading(true);
            const res = await addProductToCart(userId, quantity, product?._id);
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

    const handleWishlist = () => {
        setIsWishlisted(!isWishlisted);
    };

    const mockFarmer = {
        name: "Rajesh Kumar",
        location: "Karnataka, India",
        experience: "15 years",
        rating: 4.8,
        image: "👨‍🌾"
    };

    const discount = product?.discountPrice ? Math.round(((product?.price - product?.discountPrice) / product?.price) * 100) : 0;
    const finalPrice = product?.discountPrice || product?.price;
    const isInStock = product?.quantity > 0;

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center py-4 text-sm">
                        <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">Home</a>
                        <span className="mx-2 text-gray-300">/</span>
                        <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">Fresh Produce</a>
                        <span className="mx-2 text-gray-300">/</span>
                        <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">{product?.category}</a>
                        <span className="mx-2 text-gray-300">/</span>
                        <span className="text-gray-900 font-medium">{product?.productName}</span>
                    </nav>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <PrimaryLoader isLoading={isLoading} />
                <div className="grid lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-7">
                        <div className="sticky top-6">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="relative h-[500px] bg-gradient-to-br from-gray-50 to-gray-100">
                                    <div className="absolute inset-0 flex items-center justify-center p-8">
                                        <img 
                                            src={product?.productImage?.[selectedImage]} 
                                            alt={product?.productName || 'Product'}
                                            className="max-w-full max-h-full object-contain drop-shadow-lg"
                                        />
                                    </div>
                                    {!isInStock && (
                                        <div className="absolute top-4 right-4">
                                            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                                                <X className="w-3 h-3 mr-1" />
                                                Out of Stock
                                            </div>
                                        </div>
                                    )}
                                    {discount > 0 && (
                                        <div className="absolute top-4 left-4">
                                            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                                -{discount}%
                                            </div>
                                        </div>
                                    )}
                                </div>
                                
                                {product?.productImage?.length > 1 && (
                                    <div className="p-4 bg-white border-t border-gray-100">
                                        <div className="flex space-x-3 overflow-x-auto pb-2">
                                            {product?.productImage?.map((image, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setSelectedImage(index)}
                                                    className={`flex-shrink-0 w-20 h-20 rounded-xl border-2 overflow-hidden transition-all duration-200 ${
                                                        selectedImage === index 
                                                        ? 'border-green-500 shadow-lg ring-2 ring-green-100' 
                                                        : 'border-gray-200 hover:border-gray-300'
                                                    }`}
                                                >
                                                    <img 
                                                        src={image} 
                                                        alt={`${product?.productName} ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-5">
                        <div className="space-y-6">
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        <Leaf className="w-3 h-3 mr-1" />
                                        Organic
                                    </span>
                                    <button
                                        onClick={handleWishlist}
                                        className={`p-2 rounded-full cursor-pointer transition-all duration-200 ${
                                            isWishlisted 
                                            ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                                            : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-red-500'
                                        }`}
                                    >
                                        <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                                    </button>
                                </div>
                                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">{product?.productName}</h1>
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="flex items-center">
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`h-4 w-4 ${i < 4 ? 'text-amber-400 fill-current' : 'text-gray-300'}`} />
                                            ))}
                                        </div>
                                        <span className="ml-2 text-sm text-gray-600">4.0</span>
                                        <span className="ml-1 text-sm text-gray-400">(24 reviews)</span>
                                    </div>
                                    <div className="h-4 w-px bg-gray-300"></div>
                                    <div className="flex items-center text-sm text-green-600">
                                        <Zap className="w-4 h-4 mr-1" />
                                        {product?.freshness}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-baseline space-x-3 mb-4">
                                    <span className="text-3xl font-bold text-gray-900">₹{finalPrice}</span>
                                    {product?.discountPrice && (
                                        <span className="text-lg text-gray-500 line-through">₹{product?.price}</span>
                                    )}
                                    <span className="text-gray-600">/ {product?.weightUnit}</span>
                                </div>
                                
                                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-6">
                                    <div className="flex items-center">
                                        <Clock className="w-4 h-4 mr-1" />
                                        <span>Same day delivery</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Truck className="w-4 h-4 mr-1" />
                                        <span>Free shipping</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {/* Show quantity selector only if item is in cart */}
                                    {isInCart && (
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-gray-900">Quantity</span>
                                            <div className="flex items-center">
                                                <button
                                                    onClick={() => handleQuantityChange(CART_ACTIONS.DECREMENT)}
                                                    className="w-10 h-10 rounded-lg cursor-pointer border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                    disabled={quantity <= 1}
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </button>
                                                <span className="mx-4 text-lg font-semibold min-w-[2rem] text-center">{quantity}</span>
                                                <button
                                                    onClick={() => handleQuantityChange(CART_ACTIONS.INCREMENT)}
                                                    className="w-10 h-10 rounded-lg cursor-pointer border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                    disabled={quantity >= product?.quantity}
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Show quantity selector when not in cart */}
                                    {!isInCart && (
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-gray-900">Quantity</span>
                                            <div className="flex items-center">
                                                <button
                                                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                                    className="w-10 h-10 rounded-lg cursor-pointer border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                    disabled={quantity <= 1}
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </button>
                                                <span className="mx-4 text-lg font-semibold min-w-[2rem] text-center">{quantity}</span>
                                                <button
                                                    onClick={() => setQuantity(prev => Math.min(product?.quantity || 1, prev + 1))}
                                                    className="w-10 h-10 rounded-lg cursor-pointer border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                    disabled={quantity >= product?.quantity}
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between py-2 border-t border-gray-100">
                                        <span className="font-semibold text-gray-900">Total</span>
                                        <span className="text-2xl font-bold text-gray-900">₹{(finalPrice * quantity).toFixed(2)}</span>
                                    </div>

                                    <div className="flex space-x-3">
                                        {isInCart ? (
                                            <button
                                                onClick={handleRemoveFromCart}
                                                className="flex-1 bg-red-600 cursor-pointer text-white py-4 px-6 rounded-xl font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center"
                                            >
                                                <X className="w-5 h-5 mr-2" />
                                                Remove from Cart
                                            </button>
                                        ) : (
                                            <button
                                                onClick={handleAddToCart}
                                                className="flex-1 bg-green-600 cursor-pointer text-white py-4 px-6 rounded-xl font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
                                                disabled={!isInStock}
                                            >
                                                <ShoppingCart className="w-5 h-5 mr-2" />
                                                {isInStock ? 'Add to Cart' : 'Out of Stock'}
                                            </button>
                                        )}
                                        <button className="p-4 rounded-xl border border-gray-300 hover:border-gray-400 transition-colors">
                                            <Share2 className="h-5 w-5 text-gray-600" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                                <h3 className="font-semibold text-green-900 mb-3 flex items-center">
                                    <span className="text-2xl mr-2">🌱</span>
                                    Farm Fresh Guarantee
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center text-sm text-green-800">
                                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                                        <span>100% organic and pesticide-free</span>
                                    </div>
                                    <div className="flex items-center text-sm text-green-800">
                                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                                        <span>Harvested within 24 hours</span>
                                    </div>
                                    <div className="flex items-center text-sm text-green-800">
                                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                                        <span>Certified by local organic board</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                <h3 className="font-semibold text-gray-900 mb-4">From the Farm</h3>
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-xl">
                                        {mockFarmer?.image}
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-medium text-gray-900">{mockFarmer?.name}</div>
                                        <div className="text-sm text-gray-600">{mockFarmer?.location}</div>
                                        <div className="text-sm text-gray-500">{mockFarmer?.experience} experience</div>
                                    </div>
                                    <div className="flex items-center">
                                        <Star className="h-4 w-4 text-amber-400 fill-current" />
                                        <span className="ml-1 text-sm font-medium">{mockFarmer?.rating}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="border-b border-gray-200">
                            <nav className="flex overflow-x-auto">
                                {[
                                    { key: 'description', label: 'Description' },
                                    { key: 'reviews', label: 'Reviews (24)' },
                                    { key: 'farmer', label: 'Farmer Story' }
                                ].map((tab) => (
                                    <button
                                        key={tab.key}
                                        onClick={() => {
                                            setActiveTab(tab.key)
                                        }}
                                        className={`px-6 py-4 font-medium text-sm transition-colors relative ${
                                            activeTab === tab.key
                                            ? 'text-green-600 bg-green-50 border-b-2 border-green-600'
                                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        <div className="p-8">
                            {activeTab === 'description' && (
                                <Description product={product} />
                            )}

                            {activeTab === 'reviews' && (
                                <Reviews activeTab={activeTab} productId={productId} reviews={reviews} />
                            )}

                            {activeTab === 'farmer' && (
                                <Farmer />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
            <NewsLetter />
            <Footer />

            {showAddedToCart && (
                <div className="fixed top-24 right-6 bg-white border border-green-200 text-green-800 px-6 py-4 rounded-xl shadow-lg z-50 animate-in slide-in-from-right">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                            <div className="font-medium">Added to cart!</div>
                            <div className="text-sm text-gray-600">Item ready for checkout</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetailsPage;