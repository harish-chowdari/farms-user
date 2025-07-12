import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Heart, Menu, X, MapPin, Phone, Bell, Star, Truck, Shield, Leaf, Clock, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { useNavigate } from 'react-router-dom';
import NewsLetter from '../../components/layout/NewsLetter';

const SunotalHomePage = () => {
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [cartCount] = useState(3);
    const [wishlistCount] = useState(5);
    const [currentSlide, setCurrentSlide] = useState(0);

    const navigate = useNavigate();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

    // Sample data
    const heroSlides = [
        {
        title: "Fresh from Farm to Your Table",
        subtitle: "Premium organic produce delivered daily",
        image: "🌾",
        cta: "Shop Now",
        bg: "bg-gradient-to-r from-green-600 to-green-800"
        },
        {
        title: "Seasonal Harvest Special",
        subtitle: "Get 25% off on fresh seasonal fruits",
        image: "🍎",
        cta: "Explore Deals",
        bg: "bg-gradient-to-r from-orange-600 to-red-600"
        },
        {
        title: "Farm Fresh Vegetables",
        subtitle: "Handpicked daily from local farms",
        image: "🥬",
        cta: "Order Today",
        bg: "bg-gradient-to-r from-green-700 to-emerald-700"
        }
    ];

    const categories = [
        { name: "Fresh Fruits", icon: "🍎", count: "50+ Items", color: "bg-red-50 hover:bg-red-100" },
        { name: "Vegetables", icon: "🥕", count: "80+ Items", color: "bg-orange-50 hover:bg-orange-100" },
        { name: "Dairy Products", icon: "🥛", count: "30+ Items", color: "bg-blue-50 hover:bg-blue-100" },
        { name: "Organic", icon: "🌱", count: "40+ Items", color: "bg-green-50 hover:bg-green-100" },
        { name: "Herbs & Spices", icon: "🌿", count: "25+ Items", color: "bg-emerald-50 hover:bg-emerald-100" },
        { name: "Grains & Pulses", icon: "🌾", count: "35+ Items", color: "bg-yellow-50 hover:bg-yellow-100" }
    ];

    const featuredProducts = [
        {
        id: 1,
        name: "Organic Apples",
        price: "₹120/kg",
        originalPrice: "₹150/kg",
        image: "🍎",
        farmer: "Rajesh Kumar",
        rating: 4.8,
        reviews: 124,
        tag: "Fresh"
        },
        {
        id: 2,
        name: "Farm Fresh Tomatoes",
        price: "₹40/kg",
        originalPrice: "₹50/kg",
        image: "🍅",
        farmer: "Priya Sharma",
        rating: 4.9,
        reviews: 98,
        tag: "Local"
        },
        {
        id: 3,
        name: "Pure Milk",
        price: "₹60/L",
        originalPrice: "₹70/L",
        image: "🥛",
        farmer: "Green Valley Dairy",
        rating: 4.7,
        reviews: 156,
        tag: "Premium"
        },
        {
        id: 4,
        name: "Organic Spinach",
        price: "₹30/bunch",
        originalPrice: "₹40/bunch",
        image: "🥬",
        farmer: "Amit Patel",
        rating: 4.6,
        reviews: 87,
        tag: "Organic"
        }
    ];

    const testimonials = [
        {
        name: "Priya Mehta",
        location: "Bangalore",
        rating: 5,
        comment: "Amazing quality fruits and vegetables! Always fresh and delivered on time.",
        image: "👩"
        },
        {
        name: "Rohit Singh",
        location: "Mumbai",
        rating: 5,
        comment: "Best online grocery platform. Love the farmer stories and organic produce.",
        image: "👨"
        },
        {
        name: "Anita Sharma",
        location: "Delhi",
        rating: 4,
        comment: "Great variety and excellent customer service. Highly recommended!",
        image: "👩"
        }
    ];

    // Auto-slide functionality
    useEffect(() => {
        const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <section className="relative h-96 md:h-[500px] overflow-hidden">
                <div className="absolute inset-0 transition-all duration-1000 ease-in-out">
                    <div className={`${heroSlides[currentSlide].bg} h-full flex items-center justify-center text-white`}>
                        <div className="max-w-4xl mx-auto px-4 text-center">
                            <div className="text-6xl md:text-8xl mb-4">{heroSlides[currentSlide].image}</div>
                            <h1 className="text-4xl md:text-6xl font-bold mb-4">{heroSlides[currentSlide].title}</h1>
                            <p className="text-xl md:text-2xl mb-8">{heroSlides[currentSlide].subtitle}</p>
                            <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                                {heroSlides[currentSlide].cta}
                            </button>
                        </div>
                    </div>
                </div>
                
                <button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full">
                    <ChevronLeft className="h-6 w-6 text-white" />
                </button>
                <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full">
                    <ChevronRight className="h-6 w-6 text-white" />
                </button>

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {heroSlides.map((_, index) => (
                        <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-white/50'}`}
                        />
                    ))}
                </div>
            </section>

            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Truck className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="font-semibold text-lg mb-2">Free Delivery</h3>
                            <p className="text-gray-600">Free delivery on orders above ₹500</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Shield className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="font-semibold text-lg mb-2">Quality Assured</h3>
                            <p className="text-gray-600">100% fresh & quality guaranteed</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Leaf className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="font-semibold text-lg mb-2">Farm Fresh</h3>
                            <p className="text-gray-600">Direct from local farmers</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Clock className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="font-semibold text-lg mb-2">Same Day</h3>
                            <p className="text-gray-600">Order before 6 PM for same day delivery</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {categories.map((category, index) => (
                        <div key={index} className={`${category.color} p-6 rounded-lg text-center cursor-pointer transition-all hover:scale-105`}>
                            <div className="text-4xl mb-3">{category.icon}</div>
                            <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                            <p className="text-sm text-gray-600">{category.count}</p>
                        </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center mb-12">
                        <h2 className="text-3xl font-bold">Featured Products</h2>
                        <button onClick={() => navigate('/products')} className="text-green-600 cursor-pointer hover:text-green-700 font-medium flex items-center">
                            View All <ArrowRight className="ml-1 h-4 w-4" />
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredProducts.map((product) => (
                        <div onClick={() => navigate(`/product-details/${product.id}`)} key={product.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="relative">
                                <div className="h-48 bg-gray-100 flex items-center justify-center text-6xl">
                                    {product.image}
                                </div>
                                <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
                                    {product.tag}
                                </span>
                                <button className="absolute top-2 right-2 bg-white p-2 rounded-full hover:bg-gray-100">
                                    <Heart className="h-4 w-4" />
                                </button>
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                                <p className="text-sm text-gray-600 mb-2">by {product.farmer}</p>
                                <div className="flex items-center mb-2">
                                    <div className="flex items-center">
                                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                        <span className="ml-1 text-sm">{product.rating}</span>
                                    </div>
                                    <span className="text-sm text-gray-500 ml-2">({product.reviews} reviews)</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-lg font-bold text-green-600">{product.price}</span>
                                        <span className="text-sm text-gray-500 line-through ml-2">{product.originalPrice}</span>
                                    </div>
                                    <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 bg-green-50">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex items-center mb-4">
                                <div className="text-3xl mr-3">{testimonial.image}</div>
                                <div>
                                    <h4 className="font-semibold">{testimonial.name}</h4>
                                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                                </div>
                            </div>
                            <div className="flex mb-3">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                                ))}
                            </div>
                            <p className="text-gray-700">{testimonial.comment}</p>
                        </div>
                        ))}
                    </div>
                </div>
            </section>

            <NewsLetter />

            <Footer />
        </div>
    );
};

export default SunotalHomePage;