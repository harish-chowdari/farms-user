import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X, MapPin, Phone, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import {logo} from '../../assets/index';
import ROUTES from '../../navigations/routes';


const Header = () => {

    const navigate = useNavigate();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [cartCount] = useState(3); 
    const [wishlistCount] = useState(5);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

    return (
        <header className="bg-white shadow-lg sticky top-0 z-50">
            {/* Top Info Bar */}
            <div className="bg-green-600 text-white text-sm py-2 px-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                            <Phone className="w-4 h-4" />
                            <span className="hidden sm:inline">+91 98765 43210</span>
                            <span className="sm:hidden">+91 98765 43210</span>
                        </div>
                        <div className="hidden sm:flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>Free delivery in Vijayawada</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4 sm:hidden" />
                        <span className="sm:hidden text-xs">Vijayawada</span>
                        <span className="hidden md:block">Fresh from Farm to Your Table 🌱</span>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div onClick={() => navigate('/')} className="text-2xl flex gap-1 items-center cursor-pointer font-bold text-green-600">
                                <img className='w-10 h-10' src={logo} /> 
                                <p className="hidden md:block">Sunotal Farms</p>
                            </div>
                        </div>
                    </div>

                    {/* Search Bar - Desktop and Mobile */}
                    <div className="flex flex-1 max-w-lg mx-4 md:mx-8">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Search fresh produce..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
                            />
                            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                    </div>

                    {/* Desktop Action Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        {/* Notifications */}
                        <button className="relative p-2 cursor-pointer text-gray-700 hover:text-green-600">
                            <Bell className="h-6 w-6" />
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                2
                            </span>
                        </button>

                        {/* Cart */}
                        <button onClick={() => navigate('/cart')} className="relative p-2 cursor-pointer text-gray-700 hover:text-green-600">
                            <ShoppingCart className="h-6 w-6" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {cartCount}
                                </span>
                            )}
                        </button>

                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button
                                onClick={toggleProfile}
                                className={`flex items-center space-x-1 cursor-pointer p-2 text-gray-700 hover:text-green-600 ${isProfileOpen ? 'text-green-600' : ''}`}
                            >
                                <User className="h-6 w-6" />
                                <span className="text-sm">John Doe</span>
                            </button>
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                                    <p className="block cursor-pointer px-4 py-2 text-gray-700 hover:bg-green-50">
                                        Profile
                                    </p>
                                    <p onClick={() => navigate(ROUTES.ORDERS)} className="block cursor-pointer px-4 py-2 text-gray-700 hover:bg-green-50">
                                        Orders
                                    </p>
                                    <p onClick={() => navigate(ROUTES.ADDRESS)} className="block cursor-pointer px-4 py-2 text-gray-700 hover:bg-green-50">
                                        Address
                                    </p>
                                    <hr className="my-1" />
                                    <p onClick={() => navigate('/login')} className="block cursor-pointer px-4 py-2 text-red-600 hover:bg-red-50">
                                        Logout
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden p-2 text-gray-700 hover:text-green-600"
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <div className="px-4 py-2">
                        {/* User Info */}
                        <div className="flex cursor-pointer items-center space-x-3 py-3 border-b border-gray-200">
                            <div className="bg-green-100 p-2 rounded-full">
                                <User className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <div className="font-medium text-gray-900">John Doe</div>
                                <div className="text-sm text-gray-500">john.doe@email.com</div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="py-3 border-t border-gray-200 space-y-2">
                            <button className="flex cursor-pointer items-center justify-between w-full py-2 text-gray-700 hover:text-green-600">
                                <span className="flex items-center space-x-2">
                                    <Bell className="h-5 w-5" />
                                    <span>Notifications</span>
                                </span>
                                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">2</span>
                            </button>
                            
                            <button className="flex cursor-pointer items-center justify-between w-full py-2 text-gray-700 hover:text-green-600">
                                <span className="flex items-center space-x-2">
                                    <ShoppingCart className="h-5 w-5" />
                                    <span>Cart</span>
                                </span>
                                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{cartCount}</span>
                            </button>
                        </div>

                        {/* Profile Links */}
                        <div className="py-3 border-t border-gray-200 space-y-2">
                            <p className="block cursor-pointer py-2 text-gray-700 hover:text-green-600">
                                Profile
                            </p>
                            <p onClick={() => navigate(ROUTES.ORDERS)} className="block cursor-pointer py-2 text-gray-700 hover:text-green-600">
                                Orders
                            </p>
                            <p onClick={() => navigate(ROUTES.ADDRESS)} className="block cursor-pointer py-2 text-gray-700 hover:text-green-600">
                                Address
                            </p>
                            <p onClick={() => navigate('/login')} className="block cursor-pointer py-2 text-red-600 hover:text-red-700">
                                Logout
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;