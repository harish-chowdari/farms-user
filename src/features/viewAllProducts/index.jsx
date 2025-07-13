import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Heart, Menu, X, MapPin, Phone, Bell, Star, Grid, List, SlidersHorizontal } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import NewsLetter from '../../components/layout/NewsLetter';
import ProductCard from '../../components/featureComponents/ProductCard';
import PrimaryLoader from '../../components/loaders/PrimaryLoader';
// Import your API function
import { getAllProducts } from '../../services/api'; // Adjust path as needed

export default function index() {
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [cartCount] = useState(3);
    const [wishlistCount] = useState(5);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [sortBy, setSortBy] = useState('name');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [priceRange, setPriceRange] = useState([0, 500]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
    const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await getAllProducts();
                console.log(response?.data);
                
                // Set products from API response
                setProducts(response?.data || []);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Failed to load products. Please try again.');
                // Optionally set empty array or keep existing products
                setProducts([]);
            } finally {
                setIsLoading(false);
            }
        } 

        fetchProducts();
    }, []);

    // Generate categories dynamically from API products
    const categories = [
        { id: 'all', name: 'All Products', count: products?.length || 0 },
        { id: 'fruits', name: 'Fresh Fruits', count: products?.filter(p => p?.category === 'fruits')?.length || 0 },
        { id: 'vegetables', name: 'Vegetables', count: products?.filter(p => p?.category === 'vegetables')?.length || 0 },
        { id: 'dairy', name: 'Dairy Products', count: products?.filter(p => p?.category === 'dairy')?.length || 0 },
        { id: 'organic', name: 'Organic Only', count: products?.filter(p => p?.tag === 'Organic')?.length || 0 }
    ];

    // Filter and sort products from API data
    const filteredProducts = products?.filter(product => {
        const matchesCategory = selectedCategory === 'all' || 
            product?.category === selectedCategory || 
            (selectedCategory === 'organic' && product?.tag === 'Organic');
        const matchesPrice = (product?.price || 0) >= priceRange[0] && (product?.price || 0) <= priceRange[1];
        const matchesSearch = product?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
            product?.farmer?.toLowerCase()?.includes(searchTerm?.toLowerCase());
        return matchesCategory && matchesPrice && matchesSearch;
    }) || [];

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return (a?.price || 0) - (b?.price || 0);
            case 'price-high':
                return (b?.price || 0) - (a?.price || 0);
            case 'rating':
                return (b?.rating || 0) - (a?.rating || 0);
            case 'name':
            default:
                return (a?.name || '').localeCompare(b?.name || '');
        }
    });

    // Pagination
    const totalPages = Math.ceil((sortedProducts?.length || 0) / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const currentProducts = sortedProducts?.slice(startIndex, startIndex + productsPerPage) || [];

    // Update max price range based on API products
    const maxPrice = products?.length > 0 ? Math.max(...products?.map(p => p?.price || 0)) : 500;

    return (
        <div className="min-h-screen bg-gray-50">
            <PrimaryLoader isLoading={isLoading} />
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
                                        {categories?.map(category => (
                                            <label key={category?.id} className="flex items-center cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="category"
                                                    value={category?.id}
                                                    checked={selectedCategory === category?.id}
                                                    onChange={(e) => setSelectedCategory(e?.target?.value)}
                                                    className="mr-2 text-green-600"
                                                />
                                                <span className="text-sm">{category?.name}</span>
                                                <span className="ml-auto text-xs text-gray-500">({category?.count || 0})</span>
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
                                            max={maxPrice}
                                            value={priceRange?.[1] || 0}
                                            onChange={(e) => setPriceRange([priceRange?.[0] || 0, parseInt(e?.target?.value || '0')])}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                        />
                                    </div>
                                </div>

                                {/* Search */}
                                <div>
                                    <h4 className="font-medium mb-3">Search</h4>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                        <input
                                            type="text"
                                            placeholder="Search products..."
                                            value={searchTerm || ''}
                                            onChange={(e) => setSearchTerm(e?.target?.value || '')}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                    </div>
                                </div>

                                {/* Clear Filters */}
                                <button
                                    onClick={() => {
                                        setSelectedCategory('all');
                                        setPriceRange([0, maxPrice]);
                                        setSearchTerm('');
                                        setCurrentPage(1);
                                    }}
                                    className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Products Section */}
                    <div className="lg:w-3/4 h-[76vh] overflow-y-auto py-3 px-2 bg-white">
                        {/* Controls */}
                        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div className="flex items-center space-x-4 w-full">
                                    <div className="flex items-center space-x-2 w-full">
                                        <span className="text-sm text-gray-600 text-nowrap">Sort by:</span>
                                        <select
                                            value={sortBy || 'name'}
                                            onChange={(e) => setSortBy(e?.target?.value || 'name')}
                                            className="border border-gray-300 md:flex-none flex-1 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                        >
                                            <option value="name">Name</option>
                                            <option value="price-low">Price: Low to High</option>
                                            <option value="price-high">Price: High to Low</option>
                                            <option value="rating">Rating</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                                {error}
                                <button 
                                    onClick={() => window.location.reload()}
                                    className="ml-4 underline hover:no-underline"
                                >
                                    Retry
                                </button>
                            </div>
                        )}

                        {/* Products Grid */}
                        {products.length > 0 ? (
                            <div className={`grid md:gap-6 gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4`}>
                                {products?.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : !isLoading ? (
                            <div className="text-center py-16">
                                <div className="text-6xl mb-4">🔍</div>
                                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                                <p className="text-gray-600">Try adjusting your filters or search terms</p>
                            </div>
                        ) : null}

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