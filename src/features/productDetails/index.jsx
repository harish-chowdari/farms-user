import React, { useState } from 'react';
import { User, Heart, X, Star, Truck, Shield, Plus, Minus, Share2, MessageCircle, Award, CheckCircle } from 'lucide-react';
import Header from '../../components/layout/Header';
import NewsLetter from '../../components/layout/NewsLetter';
import Footer from '../../components/layout/Footer';

const ProductDetailsPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [cartCount, setCartCount] = useState(3);
    const [wishlistCount, setWishlistCount] = useState(5);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [activeTab, setActiveTab] = useState('description');
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [showAddedToCart, setShowAddedToCart] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

    // Product data
    const product = {
        id: 1,
        name: "Organic Red Apples",
        price: 120,
        originalPrice: 150,
        unit: "kg",
        images: ["🍎", "🍏", "🔴", "📦"], // Emojis representing different views
        farmer: {
        name: "Harish",
        location: "Andhra Pradesh",
        experience: "15 years",
        rating: 4.8,
        image: "👨‍🌾"
        },
        description: "Premium quality organic red apples, handpicked from the orchards of Andhra Pradesh. These apples are grown without any chemical pesticides or fertilizers, ensuring you get the purest and most nutritious fruit.",
        features: [
        "100% Organic certified",
        "No chemical pesticides",
        "Rich in vitamins and fiber",
        "Freshly harvested",
        "Naturally sweet and crisp"
        ],
        nutritionInfo: {
        calories: "52 per 100g",
        carbs: "14g",
        fiber: "2.4g",
        sugar: "10g",
        protein: "0.3g",
        fat: "0.2g"
        },
        availability: "In Stock",
        deliveryInfo: {
        freeDelivery: true,
        minOrder: 500,
        deliveryTime: "Same day delivery",
        packaging: "Eco-friendly packaging"
        },
        rating: 4.8,
        totalReviews: 234,
        weight: "1 kg",
        shelfLife: "7-10 days",
        storageInstructions: "Store in refrigerator for best freshness"
    };

    const reviews = [
        {
        id: 1,
        user: "Priya Sharma",
        rating: 5,
        date: "2 days ago",
        comment: "Excellent quality apples! Very fresh and sweet. The packaging was also great.",
        helpful: 12,
        verified: true
        },
        {
        id: 2,
        user: "Amit Patel",
        rating: 4,
        date: "1 week ago",
        comment: "Good quality organic apples. Delivery was on time. Will order again.",
        helpful: 8,
        verified: true
        },
        {
        id: 3,
        user: "Sneha Reddy",
        rating: 5,
        date: "2 weeks ago",
        comment: "Best organic apples I've ever bought online. Highly recommended!",
        helpful: 15,
        verified: true
        }
    ];

    const relatedProducts = [
        {
        id: 2,
        name: "Organic Bananas",
        price: 60,
        originalPrice: 80,
        image: "🍌",
        rating: 4.6,
        farmer: "Green Valley Farms"
        },
        {
        id: 3,
        name: "Fresh Oranges",
        price: 100,
        originalPrice: 120,
        image: "🍊",
        rating: 4.7,
        farmer: "Citrus Orchards"
        },
        {
        id: 4,
        name: "Organic Grapes",
        price: 180,
        originalPrice: 220,
        image: "🍇",
        rating: 4.5,
        farmer: "Vineyard Farms"
        },
        {
        id: 5,
        name: "Fresh Pomegranates",
        price: 250,
        originalPrice: 300,
        image: "🍎",
        rating: 4.8,
        farmer: "Ruby Farms"
        }
    ];

    const handleQuantityChange = (type) => {
        if (type === 'increment') {
        setQuantity(prev => prev + 1);
        } else if (type === 'decrement' && quantity > 1) {
        setQuantity(prev => prev - 1);
        }
    };

    const handleAddToCart = () => {
        setCartCount(prev => prev + quantity);
        setShowAddedToCart(true);
        setTimeout(() => setShowAddedToCart(false), 2000);
    };

    const handleWishlist = () => {
        setIsWishlisted(!isWishlisted);
        if (!isWishlisted) {
        setWishlistCount(prev => prev + 1);
        } else {
        setWishlistCount(prev => prev - 1);
        }
    };

    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

    return (
        <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <Header />

        {/* Breadcrumb */}
        <div className="bg-white py-3 border-b">
            <div className="max-w-7xl mx-auto px-4">
            <nav className="text-sm text-gray-600">
                <a href="#" className="hover:text-green-600">Home</a>
                <span className="mx-2">/</span>
                <a href="#" className="hover:text-green-600">Shop</a>
                <span className="mx-2">/</span>
                <a href="#" className="hover:text-green-600">Fruits</a>
                <span className="mx-2">/</span>
                <span className="text-gray-900">{product.name}</span>
            </nav>
            </div>
        </div>

        {/* Product Details */}
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
                <div className="bg-white rounded-lg p-8 shadow-md">
                <div className="text-center text-9xl mb-4">
                    {product.images[selectedImage]}
                </div>
                {product.availability === 'In Stock' && (
                    <div className="text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        In Stock
                    </span>
                    </div>
                )}
                </div>
                
                {/* Image Thumbnails */}
                <div className="flex space-x-2 justify-center">
                {product.images.map((image, index) => (
                    <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-16 h-16 rounded-lg border-2 flex items-center justify-center text-2xl ${
                        selectedImage === index ? 'border-green-600 bg-green-50' : 'border-gray-200 bg-white'
                    }`}
                    >
                    {image}
                    </button>
                ))}
                </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
                <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center">
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                        {product.rating} ({product.totalReviews} reviews)
                    </span>
                    </div>
                </div>
                </div>

                {/* Pricing */}
                <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-green-600">₹{product.price}</span>
                <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                    {discount}% OFF
                </span>
                <span className="text-gray-600">per {product.unit}</span>
                </div>

                {/* Farmer Info */}
                <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">From the Farmer</h3>
                <div className="flex items-center space-x-3">
                    <div className="text-3xl">{product.farmer.image}</div>
                    <div>
                    <div className="font-medium">{product.farmer.name}</div>
                    <div className="text-sm text-gray-600">{product.farmer.location}</div>
                    <div className="text-sm text-gray-600">{product.farmer.experience} farming experience</div>
                    </div>
                    <div className="ml-auto">
                    <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm">{product.farmer.rating}</span>
                    </div>
                    </div>
                </div>
                </div>

                {/* Product Features */}
                <div>
                <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
                <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        {feature}
                    </li>
                    ))}
                </ul>
                </div>

                {/* Quantity and Actions */}
                <div className="space-y-4">
                <div className="flex items-center space-x-4">
                    <span className="font-medium">Quantity:</span>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                        onClick={() => handleQuantityChange('decrement')}
                        className="p-2 hover:bg-gray-100"
                        disabled={quantity <= 1}
                    >
                        <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <button
                        onClick={() => handleQuantityChange('increment')}
                        className="p-2 hover:bg-gray-100"
                    >
                        <Plus className="h-4 w-4" />
                    </button>
                    </div>
                    <span className="text-gray-600">kg</span>
                </div>

                <div className="flex items-center space-x-4">
                    <span className="font-medium">Total: ₹{product.price * quantity}</span>
                    {product.deliveryInfo.freeDelivery && (
                    <span className="text-green-600 text-sm">Free Delivery</span>
                    )}
                </div>

                <div className="flex space-x-4">
                    <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 font-medium transition-colors"
                    >
                    Add to Cart
                    </button>
                    <button
                    onClick={handleWishlist}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                        isWishlisted 
                        ? 'border-red-500 bg-red-50 text-red-600' 
                        : 'border-gray-300 hover:border-red-500 hover:text-red-600'
                    }`}
                    >
                    <Heart className={`h-6 w-6 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>
                    <button className="p-3 rounded-lg border-2 border-gray-300 hover:border-green-500 hover:text-green-600">
                    <Share2 className="h-6 w-6" />
                    </button>
                </div>
                </div>

                {/* Delivery Info */}
                <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Delivery Information</h3>
                <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                    <Truck className="h-4 w-4 text-blue-600 mr-2" />
                    <span>{product.deliveryInfo.deliveryTime}</span>
                    </div>
                    <div className="flex items-center">
                    <Shield className="h-4 w-4 text-blue-600 mr-2" />
                    <span>{product.deliveryInfo.packaging}</span>
                    </div>
                    <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Free delivery on orders above ₹{product.deliveryInfo.minOrder}</span>
                    </div>
                </div>
                </div>
            </div>
            </div>

            {/* Product Details Tabs */}
            <div className="mt-16">
            <div className="border-b border-gray-200">
                <nav className="flex space-x-8">
                {['description', 'nutrition', 'reviews', 'farmer'].map((tab) => (
                    <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab
                        ? 'border-green-600 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                    >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
                </nav>
            </div>

            <div className="mt-8">
                {activeTab === 'description' && (
                <div className="prose max-w-none">
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-semibold mb-2">Product Details</h4>
                        <ul className="space-y-1 text-gray-700">
                        <li><strong>Weight:</strong> {product.weight}</li>
                        <li><strong>Shelf Life:</strong> {product.shelfLife}</li>
                        <li><strong>Storage:</strong> {product.storageInstructions}</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Certifications</h4>
                        <div className="flex items-center space-x-2">
                        <Award className="h-5 w-5 text-green-600" />
                        <span className="text-gray-700">Organic Certified</span>
                        </div>
                    </div>
                    </div>
                </div>
                )}

                {activeTab === 'nutrition' && (
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                    <h4 className="font-semibold mb-4">Nutrition Facts</h4>
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="space-y-2">
                        <div className="flex justify-between py-2 border-b">
                            <span>Calories</span>
                            <span className="font-medium">{product.nutritionInfo.calories}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                            <span>Carbohydrates</span>
                            <span className="font-medium">{product.nutritionInfo.carbs}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                            <span>Fiber</span>
                            <span className="font-medium">{product.nutritionInfo.fiber}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                            <span>Sugar</span>
                            <span className="font-medium">{product.nutritionInfo.sugar}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                            <span>Protein</span>
                            <span className="font-medium">{product.nutritionInfo.protein}</span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span>Fat</span>
                            <span className="font-medium">{product.nutritionInfo.fat}</span>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div>
                    <h4 className="font-semibold mb-4">Health Benefits</h4>
                    <ul className="space-y-2 text-gray-700">
                        <li>• Rich in antioxidants</li>
                        <li>• Good source of dietary fiber</li>
                        <li>• Supports heart health</li>
                        <li>• May aid in weight management</li>
                        <li>• Helps regulate blood sugar</li>
                    </ul>
                    </div>
                </div>
                )}

                {activeTab === 'reviews' && (
                <div>
                    <div className="flex items-center justify-between mb-6">
                    <h4 className="font-semibold">Customer Reviews</h4>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                        Write a Review
                    </button>
                    </div>
                    
                    <div className="space-y-6">
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                <User className="h-5 w-5 text-gray-600" />
                            </div>
                            <div>
                                <div className="font-medium">{review.user}</div>
                                <div className="text-sm text-gray-500">{review.date}</div>
                            </div>
                            {review.verified && (
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                                Verified Purchase
                                </span>
                            )}
                            </div>
                            <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                            ))}
                            </div>
                        </div>
                        <p className="text-gray-700 mb-3">{review.comment}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <button className="flex items-center space-x-1 hover:text-green-600">
                            <span>👍 Helpful ({review.helpful})</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-green-600">
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
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center space-x-4 mb-6">
                    <div className="text-6xl">{product.farmer.image}</div>
                    <div>
                        <h3 className="text-2xl font-bold">{product.farmer.name}</h3>
                        <p className="text-gray-600">{product.farmer.location}</p>
                        <p className="text-gray-600">{product.farmer.experience} farming experience</p>
                        <div className="flex items-center mt-2">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm">{product.farmer.rating} Farmer Rating</span>
                        </div>
                    </div>
                    </div>
                    <div className="prose max-w-none">
                    <p className="text-gray-700 mb-4">
                        {product.farmer.name} has been growing organic fruits for over {product.farmer.experience}. 
                        Located in the beautiful hills of {product.farmer.location}, his farm uses traditional 
                        farming methods combined with modern organic practices to produce the highest quality fruits.
                    </p>
                    <p className="text-gray-700">
                        All products from this farm are certified organic and grown without the use of chemical 
                        pesticides or synthetic fertilizers. The farm follows sustainable farming practices that 
                        are good for both the environment and your health.
                    </p>
                    </div>
                </div>
                )}
            </div>
            </div>

            {/* Related Products */}
            <div className="mt-16">
                <h2 className="text-2xl font-bold mb-8">Related Products</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {relatedProducts.map((relatedProduct) => (
                    <div key={relatedProduct.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="h-48 bg-gray-100 flex items-center justify-center text-6xl">
                            {relatedProduct.image}
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-lg mb-1">{relatedProduct.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">by {relatedProduct.farmer}</p>
                            <div className="flex items-center mb-2">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="ml-1 text-sm">{relatedProduct.rating}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-lg font-bold text-green-600">₹{relatedProduct.price}</span>
                                    <span className="text-sm text-gray-500 line-through ml-2">₹{relatedProduct.originalPrice}</span>
                                </div>
                                <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
        <NewsLetter />
        <Footer />

        {/* Success Message */}
        {showAddedToCart && (
            <div className="fixed top-20 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50">
                <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5" />
                    <span>Added to cart successfully!</span>
                </div>
            </div>
        )}
        
        </div>
    );
};

export default ProductDetailsPage;