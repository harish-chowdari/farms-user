import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Heart, Menu, X, MapPin, Phone, Bell, Star, Grid, List, SlidersHorizontal } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import NewsLetter from '../../components/layout/NewsLetter';

export default function index() {
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [cartCount] = useState(3);
    const [wishlistCount] = useState(5);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [viewMode, setViewMode] = useState('grid');
    const [sortBy, setSortBy] = useState('name');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [priceRange, setPriceRange] = useState([0, 500]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
    const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

    // All products data
    const allProducts = [
        {
        id: 1,
        name: "Organic Apples",
        price: 120,
        originalPrice: 150,
        image: "🍎",
        farmer: "Rajesh Kumar",
        rating: 4.8,
        reviews: 124,
        tag: "Fresh",
        category: "fruits",
        inStock: true,
        unit: "kg"
        },
        {
        id: 2,
        name: "Farm Fresh Tomatoes",
        price: 40,
        originalPrice: 50,
        image: "🍅",
        farmer: "Priya Sharma",
        rating: 4.9,
        reviews: 98,
        tag: "Local",
        category: "vegetables",
        inStock: true,
        unit: "kg"
        },
        {
        id: 3,
        name: "Pure Milk",
        price: 60,
        originalPrice: 70,
        image: "🥛",
        farmer: "Green Valley Dairy",
        rating: 4.7,
        reviews: 156,
        tag: "Premium",
        category: "dairy",
        inStock: true,
        unit: "L"
        },
        {
        id: 4,
        name: "Organic Spinach",
        price: 30,
        originalPrice: 40,
        image: "🥬",
        farmer: "Amit Patel",
        rating: 4.6,
        reviews: 87,
        tag: "Organic",
        category: "vegetables",
        inStock: true,
        unit: "bunch"
        },
        {
        id: 5,
        name: "Fresh Bananas",
        price: 80,
        originalPrice: 100,
        image: "🍌",
        farmer: "Kerala Farms",
        rating: 4.5,
        reviews: 203,
        tag: "Sweet",
        category: "fruits",
        inStock: true,
        unit: "dozen"
        },
        {
        id: 6,
        name: "Organic Carrots",
        price: 60,
        originalPrice: 80,
        image: "🥕",
        farmer: "Organic Valley",
        rating: 4.7,
        reviews: 145,
        tag: "Organic",
        category: "vegetables",
        inStock: true,
        unit: "kg"
        },
        {
        id: 7,
        name: "Farm Eggs",
        price: 120,
        originalPrice: 140,
        image: "🥚",
        farmer: "Happy Hens Farm",
        rating: 4.8,
        reviews: 167,
        tag: "Free Range",
        category: "dairy",
        inStock: true,
        unit: "dozen"
        },
        {
        id: 8,
        name: "Fresh Oranges",
        price: 100,
        originalPrice: 120,
        image: "🍊",
        farmer: "Citrus Groves",
        rating: 4.6,
        reviews: 89,
        tag: "Juicy",
        category: "fruits",
        inStock: true,
        unit: "kg"
        },
        {
        id: 9,
        name: "Organic Broccoli",
        price: 80,
        originalPrice: 100,
        image: "🥦",
        farmer: "Green Fields",
        rating: 4.4,
        reviews: 76,
        tag: "Organic",
        category: "vegetables",
        inStock: true,
        unit: "piece"
        },
        {
        id: 10,
        name: "Fresh Grapes",
        price: 160,
        originalPrice: 200,
        image: "🍇",
        farmer: "Vineyard Fresh",
        rating: 4.9,
        reviews: 134,
        tag: "Premium",
        category: "fruits",
        inStock: true,
        unit: "kg"
        },
        {
        id: 11,
        name: "Organic Potatoes",
        price: 35,
        originalPrice: 45,
        image: "🥔",
        farmer: "Mountain Farms",
        rating: 4.3,
        reviews: 198,
        tag: "Organic",
        category: "vegetables",
        inStock: true,
        unit: "kg"
        },
        {
        id: 12,
        name: "Fresh Cheese",
        price: 250,
        originalPrice: 300,
        image: "🧀",
        farmer: "Artisan Dairy",
        rating: 4.8,
        reviews: 92,
        tag: "Artisan",
        category: "dairy",
        inStock: true,
        unit: "pack"
        },
        {
        id: 13,
        name: "Organic Cucumbers",
        price: 45,
        originalPrice: 55,
        image: "🥒",
        farmer: "Fresh Gardens",
        rating: 4.5,
        reviews: 113,
        tag: "Crisp",
        category: "vegetables",
        inStock: true,
        unit: "kg"
        },
        {
        id: 14,
        name: "Sweet Mangoes",
        price: 180,
        originalPrice: 220,
        image: "🥭",
        farmer: "Tropical Farms",
        rating: 4.9,
        reviews: 256,
        tag: "Seasonal",
        category: "fruits",
        inStock: true,
        unit: "kg"
        },
        {
        id: 15,
        name: "Fresh Yogurt",
        price: 80,
        originalPrice: 100,
        image: "🍦",
        farmer: "Pure Dairy",
        rating: 4.6,
        reviews: 178,
        tag: "Probiotic",
        category: "dairy",
        inStock: true,
        unit: "cup"
        },
        {
        id: 16,
        name: "Organic Lettuce",
        price: 50,
        originalPrice: 65,
        image: "🥬",
        farmer: "Leafy Greens Co",
        rating: 4.4,
        reviews: 67,
        tag: "Crisp",
        category: "vegetables",
        inStock: false,
        unit: "head"
        }
    ];

    const categories = [
        { id: 'all', name: 'All Products', count: allProducts.length },
        { id: 'fruits', name: 'Fresh Fruits', count: allProducts.filter(p => p.category === 'fruits').length },
        { id: 'vegetables', name: 'Vegetables', count: allProducts.filter(p => p.category === 'vegetables').length },
        { id: 'dairy', name: 'Dairy Products', count: allProducts.filter(p => p.category === 'dairy').length },
        { id: 'organic', name: 'Organic Only', count: allProducts.filter(p => p.tag === 'Organic').length }
    ];

    // Filter and sort products
    const filteredProducts = allProducts.filter(product => {
        const matchesCategory = selectedCategory === 'all' || 
        product.category === selectedCategory || 
        (selectedCategory === 'organic' && product.tag === 'Organic');
        const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.farmer.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesPrice && matchesSearch;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
        case 'price-low':
            return a.price - b.price;
        case 'price-high':
            return b.price - a.price;
        case 'rating':
            return b.rating - a.rating;
        case 'name':
        default:
            return a.name.localeCompare(b.name);
        }
    });

    // Pagination
    const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const currentProducts = sortedProducts.slice(startIndex, startIndex + productsPerPage);

    return (
        <div className="min-h-screen bg-gray-50">

        <Header />
        <div className="max-w-7xl mx-auto px-4 md:py-8 py-4">
            <div className="flex flex-col lg:flex-row lg:gap-8 gap-4">
            {/* Sidebar Filters */}
            <div className="lg:w-1/4">
                <div className="bg-white rounded-lg shadow-md md:p-6 p-2 sticky top-24">
                <div className="flex items-center justify-between">
                    <h3 className="md:text-lg text-base font-semibold">Filters</h3>
                    <button 
                    onClick={toggleFilter}
                    className="lg:hidden p-2 text-gray-500 hover:text-green-600"
                    >
                    <SlidersHorizontal className="h-5 w-5" />
                    </button>
                </div>

                <div className={`space-y-6 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
                    {/* Categories */}
                    <div>
                    <h4 className="font-medium mb-3">Categories</h4>
                    <div className="space-y-2">
                        {categories.map(category => (
                        <label key={category.id} className="flex items-center cursor-pointer">
                            <input
                            type="radio"
                            name="category"
                            value={category.id}
                            checked={selectedCategory === category.id}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="mr-2 text-green-600"
                            />
                            <span className="text-sm">{category.name}</span>
                            <span className="ml-auto text-xs text-gray-500">({category.count})</span>
                        </label>
                        ))}
                    </div>
                    </div>

                    {/* Price Range */}
                    <div>
                    <h4 className="font-medium mb-3">Price Range</h4>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-600">
                        <span>₹{priceRange[0]}</span>
                        <span>₹{priceRange[1]}</span>
                        </div>
                        <input
                        type="range"
                        min="0"
                        max="500"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                    </div>

                    {/* Clear Filters */}
                    <button
                    onClick={() => {
                        setSelectedCategory('all');
                        setPriceRange([0, 500]);
                        setSearchTerm('');
                    }}
                    className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                    Clear Filters
                    </button>
                </div>
                </div>
            </div>

            {/* Products Section */}
            <div className="lg:w-3/4">
                {/* Controls */}
                <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Sort by:</span>
                        <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                        <option value="name">Name</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Rating</option>
                        </select>
                    </div>
                    
                    <div className="flex border border-gray-300 rounded">
                        <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 ${viewMode === 'grid' ? 'bg-green-600 text-white' : 'text-gray-600'}`}
                        >
                        <Grid className="h-4 w-4" />
                        </button>
                        <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 ${viewMode === 'list' ? 'bg-green-600 text-white' : 'text-gray-600'}`}
                        >
                        <List className="h-4 w-4" />
                        </button>
                    </div>
                    </div>
                </div>
                </div>

                {/* Products Grid */}
                {currentProducts.length > 0 ? (
                <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                    {currentProducts.map((product) => (
                    <div key={product.id} className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow ${viewMode === 'list' ? 'flex' : ''}`}>
                        <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
                        <div className={`bg-gray-100 flex items-center justify-center ${viewMode === 'list' ? 'h-48' : 'h-48'} text-6xl`}>
                            {product.image}
                        </div>
                        <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
                            {product.tag}
                        </span>
                        <button className="absolute top-2 right-2 bg-white p-2 rounded-full hover:bg-gray-100">
                            <Heart className="h-4 w-4" />
                        </button>
                        {!product.inStock && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <span className="text-white font-semibold">Out of Stock</span>
                            </div>
                        )}
                        </div>
                        
                        <div className="p-4 flex-1">
                        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">by {product.farmer}</p>
                        <div className="flex items-center mb-3">
                            <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="ml-1 text-sm">{product.rating}</span>
                            </div>
                            <span className="text-sm text-gray-500 ml-2">({product.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                            <span className="text-lg font-bold text-green-600">₹{product.price}/{product.unit}</span>
                            <span className="text-sm text-gray-500 line-through ml-2">₹{product.originalPrice}</span>
                            </div>
                            <button 
                            disabled={!product.inStock}
                            className={`px-4 py-2 rounded transition-colors ${
                                product.inStock 
                                ? 'bg-green-600 text-white hover:bg-green-700' 
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                            >
                            Add
                            </button>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
                ) : (
                <div className="text-center py-16">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold mb-2">No products found</h3>
                    <p className="text-gray-600">Try adjusting your filters or search terms</p>
                </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                    <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 text-sm font-medium rounded-md ${
                            currentPage === page
                            ? 'bg-green-600 text-white'
                            : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                        }`}
                        >
                        {page}
                        </button>
                    ))}
                    
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                    >
                        Next
                    </button>
                    </div>
                </div>
                )}
            </div>
            </div>
        </div>

        {/* Newsletter */}
        <NewsLetter />

        {/* Footer */}
        <Footer />
        </div>
    );
}
