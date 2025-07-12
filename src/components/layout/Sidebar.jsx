import React, { useState, useEffect } from "react";
import { Home, Menu, Package, ShoppingCart, Sprout, X, ChevronRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import ROUTES from "../../navigations/routes";

export default function Sidebar({ isOpen, sidebarItems = [], sidebarHeading = "Dashboard", onClose }) {
   
    const [activeItem, setActiveItem] = useState('');
    const [hoveredItem, setHoveredItem] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const defaultSidebarItems = [
        { id: 'add product', label: 'Add Product', icon: Home, navigateTo: ROUTES.ADD_PRODUCT },
        { id: 'view products', label: 'View Products', icon: Package, navigateTo: ROUTES.VIEW_PRODUCTS },
        { id: 'orders', label: 'Order Management', icon: ShoppingCart, navigateTo: '/product-management/orders' },
    ];

    const items = sidebarItems.length > 0 ? sidebarItems : defaultSidebarItems;

    // Set active item based on current route
    useEffect(() => {
        const currentItem = items.find(item => item.navigateTo === location.pathname);
        if (currentItem) {
            setActiveItem(currentItem.id);
        }
    }, [location.pathname, items]);

    const handleItemClick = (item) => {
        // Set active item immediately
        setActiveItem(item.id);
        
        // Then navigate
        if (item.navigateTo) {
            navigate(item.navigateTo);
        }
    };

    return (
        <>
            {/* Backdrop for mobile */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm z-5 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed left-0 top-16 h-[calc(100vh-4rem)] z-10
                transition-all duration-500 ease-out flex flex-col
                ${isOpen ? 'w-[260px]' : 'w-16'}
                bg-gradient-to-br from-white via-green-50/50 to-emerald-50/80
                backdrop-blur-xl border-r border-green-200/60
                shadow-2xl shadow-green-900/10
            `}>
                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br bg-white via-transparent pointer-events-none" />
                
                {/* Header Section */}
                <div className="relative flex items-center justify-between p-2 pb-1 border-b border-green-200/50 bg-white/50 backdrop-blur-sm">
                    {isOpen && (
                        <div className="mr-2 flex-1">
                            <h2 className="text-lg text-nowrap font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                                {sidebarHeading}
                            </h2>
                            {/* <div className="w-12 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 mt-1 rounded-full" /> */}
                        </div>
                    )}
                    <button
                        onClick={onClose}
                        className={`
                            relative p-2.5 rounded-xl transition-all duration-300 group
                            ${isOpen ? 'hover:bg-green-100' : 'hover:bg-green-100/80'}
                            hover:shadow-lg hover:shadow-green-200/50
                            active:scale-95 transform
                        `}
                    >
                        <div className="absolute cursor-pointer flex items-center justify-center inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {isOpen ? (
                            <X className="w-5 h-5 cursor-pointer text-green-600 relative z-10 transition-transform duration-300 group-hover:rotate-90" />
                        ) : (
                            <Menu className="w-5 h-5 cursor-pointer text-green-600 relative z-10 transition-transform duration-300 group-hover:scale-110" />
                        )}
                    </button>
                </div>
                
                {/* Navigation */}
                <nav className="flex-1 px-3 py-2 space-y-4 overflow-y-auto">
                    {items.map((item, index) => {
                        const Icon = item.icon;
                        const isActive = activeItem === item.id;
                        const isHovered = hoveredItem === item.id;
                        
                        return (
                            <button
                                key={item.id}
                                onClick={() => handleItemClick(item)}
                                onMouseEnter={() => setHoveredItem(item.id)}
                                onMouseLeave={() => setHoveredItem(null)}
                                className={`
                                    w-full flex items-center rounded-2xl transition-all duration-300 relative group overflow-hidden
                                    ${isOpen ? 'space-x-4 px-4 py-2' : 'justify-center p-3.5'}
                                    ${isActive 
                                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md shadow-green-500/30 transform' 
                                        : 'text-green-700 cursor-pointer hover:bg-white/70 hover:shadow-md hover:shadow-green-200/50'
                                    }
                                    transform transition-transform duration-200
                                `}
                                style={{
                                    animationDelay: `${index * 100}ms`
                                }}
                            >
                                {/* Background gradient for hover effect */}
                                <div className={`
                                    absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 opacity-0 transition-opacity duration-300
                                    ${isHovered && !isActive ? 'opacity-100' : ''}
                                `} />
                                
                                {/* Active indicator */}
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
                                )}
                                
                                {/* Icon container */}
                                <div className={`
                                    relative z-10 p-2 rounded-xl transition-all duration-300
                                    ${isActive 
                                        ? 'bg-white/20 shadow-lg' 
                                        : isHovered 
                                            ? 'bg-green-100/80 scale-110' 
                                            : 'bg-transparent'
                                    }
                                `}>
                                    <Icon className="w-5 h-5 flex-shrink-0 transition-transform duration-300" />
                                </div>
                                
                                {isOpen && (
                                    <div className="flex-1 relative z-10">
                                        <span className="font-semibold text-sm tracking-wide">{item.label}</span>
                                    </div>
                                )}
                                
                                {/* Chevron indicator for active item */}
                                {isOpen && isActive && (
                                    <ChevronRight className="w-4 h-4 text-white/80 animate-pulse" />
                                )}
                                
                                {/* Tooltip for collapsed state */}
                                {!isOpen && (
                                    <div className="absolute left-full ml-3 px-3 py-2 bg-gray-900/95 text-white text-sm rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-50 shadow-xl backdrop-blur-sm">
                                        {item.label}
                                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900/95 rotate-45" />
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </nav>
                
                {/* Footer - Only visible when sidebar is open */}
                {isOpen && (
                    <div className="p-4 border-t border-green-200/50 bg-white/30 backdrop-blur-sm">
                        <div className="relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 rounded-2xl shadow-xl shadow-green-600/30">
                            {/* Animated background pattern */}
                            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 animate-pulse" />
                            
                            {/* Content */}
                            <div className="relative z-10 flex items-center space-x-3">
                                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                                    <Sprout className="w-6 h-6 animate-bounce" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-nowrap tracking-wide">Fresh & Natural</p>
                                    <p className="text-xs opacity-90 font-medium text-nowrap">Freshness delivered</p>
                                </div>
                            </div>
                            
                            {/* Decorative elements */}
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-white/10 rounded-full blur-sm" />
                            <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-white/10 rounded-full blur-sm" />
                        </div>
                    </div>
                )}
            </aside>
        </>
    );
}