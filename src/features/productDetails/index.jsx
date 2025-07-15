import React, { useEffect, useState } from 'react';
import { User, Heart, X, Star, Truck, Shield, Plus, Minus, Share2, MessageCircle, Award, CheckCircle, ShoppingCart, Clock, Zap, Leaf } from 'lucide-react';
import Header from '../../components/layout/Header';
import NewsLetter from '../../components/layout/NewsLetter';
import Footer from '../../components/layout/Footer';
import { getProduct } from './services/api';
import { useParams } from 'react-router-dom';
import PrimaryLoader from '../../components/loaders/PrimaryLoader';
import { addProductToCart, decreaseQuantity, getCartByUserId, increaseQuantity, removeProductFromCart } from '../../services/api';
import { CART_ACTIONS } from '../../config/constants';

const ProductDetailsPage = () => {
    const { productId } = useParams();
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
                console.log(cartItems);
                const cartItem = cartItems?.find(item => item.productId === productId);
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

        getProductDetails();
    }, [productId])

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

    const handleWishlist = () => {
        setIsWishlisted(!isWishlisted);
    };

    const mockReviews = [
        {
            id: 1,
            user: "Priya Sharma",
            rating: 5,
            date: "2 days ago",
            comment: "Excellent quality! Very fresh and good value for money.",
            helpful: 12,
            verified: true
        },
        {
            id: 2,
            user: "Amit Patel",
            rating: 4,
            date: "1 week ago",
            comment: "Good quality organic vegetables. Delivery was on time. Will order again.",
            helpful: 8,
            verified: true
        },
        {
            id: 3,
            user: "Sneha Reddy",
            rating: 5,
            date: "2 weeks ago",
            comment: "Best organic vegetables I've ever bought online. Highly recommended!",
            helpful: 15,
            verified: true
        }
    ];

    const mockFarmer = {
        name: "Rajesh Kumar",
        location: "Karnataka, India",
        experience: "15 years",
        rating: 4.8,
        image: "👨‍🌾"
    };

    const mockNutrition = {
        calories: "33 kcal",
        carbs: "7g",
        fiber: "3.2g",
        sugar: "1.5g",
        protein: "1.9g",
        fat: "0.2g"
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
                                    { isInCart && (
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
                            <nav className="flex">
                                {[
                                    { key: 'description', label: 'Description' },
                                    { key: 'nutrition', label: 'Nutrition' },
                                    { key: 'reviews', label: 'Reviews (24)' },
                                    { key: 'farmer', label: 'Farmer Story' }
                                ].map((tab) => (
                                    <button
                                        key={tab.key}
                                        onClick={() => setActiveTab(tab.key)}
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
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-gray-700 text-lg leading-relaxed mb-6">{product?.description}</p>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div>
                                            <h4 className="text-lg font-semibold mb-4 text-gray-900">Product Specifications</h4>
                                            <div className="space-y-3">
                                                <div className="flex justify-between py-2 border-b border-gray-100">
                                                    <span className="text-gray-600">Weight</span>
                                                    <span className="font-medium">{product?.weight} {product?.weightUnit}</span>
                                                </div>
                                                <div className="flex justify-between py-2 border-b border-gray-100">
                                                    <span className="text-gray-600">Category</span>
                                                    <span className="font-medium">{product?.category}</span>
                                                </div>
                                                <div className="flex justify-between py-2 border-b border-gray-100">
                                                    <span className="text-gray-600">Freshness</span>
                                                    <span className="font-medium">{product?.freshness}</span>
                                                </div>
                                                {product?.origin && (
                                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                                        <span className="text-gray-600">Origin</span>
                                                        <span className="font-medium">{product?.origin}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold mb-4 text-gray-900">Certifications</h4>
                                            <div className="space-y-3">
                                                <div className="flex items-center p-3 bg-green-50 rounded-lg">
                                                    <Award className="h-5 w-5 text-green-600 mr-3" />
                                                    <span className="text-green-800 font-medium">Organic Certified</span>
                                                </div>
                                                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                                                    <Shield className="h-5 w-5 text-blue-600 mr-3" />
                                                    <span className="text-blue-800 font-medium">Quality Assured</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'nutrition' && (
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="text-lg font-semibold mb-6 text-gray-900">Nutrition Facts</h4>
                                        <div className="bg-gray-50 rounded-lg p-6">
                                            <div className="text-sm text-gray-600 mb-4">Per 100g serving</div>
                                            <div className="space-y-3">
                                                {Object.entries(mockNutrition).map(([key, value]) => (
                                                    <div key={key} className="flex justify-between py-2 border-b border-gray-200 last:border-b-0">
                                                        <span className="capitalize text-gray-700">{key}</span>
                                                        <span className="font-semibold text-gray-900">{value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold mb-6 text-gray-900">Health Benefits</h4>
                                        <div className="space-y-3">
                                            {[
                                                'Rich in antioxidants',
                                                'Good source of dietary fiber',
                                                'Supports digestive health',
                                                'May aid in weight management',
                                                'Helps regulate blood sugar'
                                            ].map((benefit, index) => (
                                                <div key={index} className="flex items-center p-3 bg-green-50 rounded-lg">
                                                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                                                    <span className="text-green-800">{benefit}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'reviews' && (
                                <div>
                                    <div className="flex items-center justify-between mb-8">
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-900">Customer Reviews</h4>
                                            <div className="flex items-center mt-2">
                                                <div className="flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className={`h-4 w-4 ${i < 4 ? 'text-amber-400 fill-current' : 'text-gray-300'}`} />
                                                    ))}
                                                </div>
                                                <span className="ml-2 text-sm text-gray-600">4.0 out of 5 stars</span>
                                            </div>
                                        </div>
                                        <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-medium transition-colors">
                                            Write a Review
                                        </button>
                                    </div>
                                    
                                    <div className="space-y-6">
                                        {mockReviews?.map((review) => (
                                            <div key={review?.id} className="bg-gray-50 rounded-lg p-6">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                                            <User className="h-5 w-5 text-green-600" />
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-gray-900">{review?.user}</div>
                                                            <div className="text-sm text-gray-500">{review?.date}</div>
                                                        </div>
                                                        {review?.verified && (
                                                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                                                                Verified Purchase
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} className={`h-4 w-4 ${i < (review?.rating || 0) ? 'text-amber-400 fill-current' : 'text-gray-300'}`} />
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-gray-700 mb-4">{review?.comment}</p>
                                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                    <button className="flex items-center space-x-1 hover:text-green-600 transition-colors">
                                                        <span>👍 Helpful ({review?.helpful})</span>
                                                    </button>
                                                    <button className="flex items-center space-x-1 hover:text-green-600 transition-colors">
                                                        <MessageCircle className="h-4 w-4" />
                                                        <span>Reply</span>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'farmer' && (
                                <div className="max-w-4xl">
                                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 mb-8">
                                        <div className="flex items-center space-x-6 mb-6">
                                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-4xl">
                                                {mockFarmer?.image}
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{mockFarmer?.name}</h3>
                                                <p className="text-gray-600 text-lg">{mockFarmer?.location}</p>
                                                <p className="text-green-700 font-medium">{mockFarmer?.experience} farming experience</p>
                                                <div className="flex items-center mt-2">
                                                    <Star className="h-5 w-5 text-amber-400 fill-current" />
                                                    <span className="ml-1 text-lg font-semibold">{mockFarmer?.rating}</span>
                                                    <span className="ml-1 text-gray-600">Farmer Rating</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="prose prose-lg max-w-none">
                                        <p className="text-gray-700 mb-6 leading-relaxed">
                                            {mockFarmer?.name} has been growing organic vegetables for over {mockFarmer?.experience}. 
                                            Located in the beautiful state of {mockFarmer?.location}, his farm uses traditional 
                                            farming methods combined with modern organic practices to produce the highest quality vegetables.
                                        </p>
                                        <p className="text-gray-700 leading-relaxed">
                                            All products from this farm are certified organic and grown without the use of chemical 
                                            pesticides or synthetic fertilizers. The farm follows sustainable farming practices that 
                                            are good for both the environment and your health.
                                        </p>
                                    </div>
                                </div>
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