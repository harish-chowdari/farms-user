import React, { useState } from 'react';
import { Package, Truck, CheckCircle, Clock, XCircle, Search, Filter, Eye, MapPin, Star, ArrowRight } from 'lucide-react';
import Header from '../../components/layout/Header';

const UserOrdersPanel = () => {
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Professional order data with product images
    const [orders] = useState([
        {
        id: 'SF-2025-001',
        date: '2025-07-15',
        status: 'delivered',
        total: 485.75,
        deliveryTime: '25 mins',
        rating: 4.8,
        items: [
            { 
            name: 'Organic Roma Tomatoes', 
            quantity: 5, 
            unit: 'kg', 
            price: 125.00,
            image: 'https://images.unsplash.com/photo-1546470427-e13b89c9bf90?w=150&h=150&fit=crop&crop=center'
            },
            { 
            name: 'Premium Butter Lettuce', 
            quantity: 8, 
            unit: 'heads', 
            price: 160.00,
            image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=150&h=150&fit=crop&crop=center'
            },
            { 
            name: 'Organic Dutch Carrots', 
            quantity: 3, 
            unit: 'kg', 
            price: 95.75,
            image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=150&h=150&fit=crop&crop=center'
            },
            { 
            name: 'Rainbow Bell Peppers', 
            quantity: 2, 
            unit: 'kg', 
            price: 105.00,
            image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=150&h=150&fit=crop&crop=center'
            }
        ],
        deliveryAddress: 'Green Valley Residences, Tower A, Apt 501, Sector 21',
        trackingNumber: 'SF789123456',
        deliveryPartner: 'FreshExpress',
        orderProgress: [
            { status: 'Order Placed', time: '2:45 PM', completed: true },
            { status: 'Preparing', time: '2:50 PM', completed: true },
            { status: 'Out for Delivery', time: '3:05 PM', completed: true },
            { status: 'Delivered', time: '3:10 PM', completed: true }
        ]
        },
        {
        id: 'SF-2025-002',
        date: '2025-07-17',
        status: 'shipped',
        total: 342.25,
        deliveryTime: '18 mins',
        rating: null,
        items: [
            { 
            name: 'Baby Spinach Leaves', 
            quantity: 2, 
            unit: 'kg', 
            price: 85.00,
            image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=150&h=150&fit=crop&crop=center'
            },
            { 
            name: 'Fresh Herb Collection', 
            quantity: 4, 
            unit: 'bunches', 
            price: 120.00,
            image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=150&h=150&fit=crop&crop=center'
            },
            { 
            name: 'Organic Baby Potatoes', 
            quantity: 3, 
            unit: 'kg', 
            price: 137.25,
            image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=150&h=150&fit=crop&crop=center'
            }
        ],
        deliveryAddress: 'Eco Gardens, Villa 12B, Green Park Extension',
        trackingNumber: 'SF456789123',
        deliveryPartner: 'QuickFarm',
        orderProgress: [
            { status: 'Order Placed', time: '1:20 PM', completed: true },
            { status: 'Preparing', time: '1:25 PM', completed: true },
            { status: 'Out for Delivery', time: '1:35 PM', completed: true },
            { status: 'Delivered', time: '', completed: false }
        ]
        },
        {
        id: 'SF-2025-003',
        date: '2025-07-18',
        status: 'processing',
        total: 628.50,
        deliveryTime: '22 mins',
        rating: null,
        items: [
            { 
            name: 'English Cucumber', 
            quantity: 4, 
            unit: 'pieces', 
            price: 120.00,
            image: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=150&h=150&fit=crop&crop=center'
            },
            { 
            name: 'Fresh Broccoli Crowns', 
            quantity: 5, 
            unit: 'heads', 
            price: 175.00,
            image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=150&h=150&fit=crop&crop=center'
            },
            { 
            name: 'Red Pearl Onions', 
            quantity: 3, 
            unit: 'kg', 
            price: 158.50,
            image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=150&h=150&fit=crop&crop=center'
            },
            { 
            name: 'Sweet Corn (Premium)', 
            quantity: 6, 
            unit: 'ears', 
            price: 175.00,
            image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=150&h=150&fit=crop&crop=center'
            }
        ],
        deliveryAddress: 'Urban Heights, Block C, Flat 301, New Town',
        orderProgress: [
            { status: 'Order Placed', time: '4:15 PM', completed: true },
            { status: 'Preparing', time: '4:20 PM', completed: true },
            { status: 'Out for Delivery', time: '', completed: false },
            { status: 'Delivered', time: '', completed: false }
        ]
        },
        {
        id: 'SF-2025-004',
        date: '2025-07-19',
        status: 'pending',
        total: 189.75,
        deliveryTime: '15 mins',
        rating: null,
        items: [
            { 
            name: 'Cherry Tomatoes', 
            quantity: 2, 
            unit: 'baskets', 
            price: 95.00,
            image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=150&h=150&fit=crop&crop=center'
            },
            { 
            name: 'Fresh Basil Plants', 
            quantity: 3, 
            unit: 'pots', 
            price: 94.75,
            image: 'https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=150&h=150&fit=crop&crop=center'
            }
        ],
        deliveryAddress: 'Sunset Apartments, Wing B, 4th Floor, Riverside',
        orderProgress: [
            { status: 'Order Placed', time: '11:30 AM', completed: true },
            { status: 'Preparing', time: '', completed: false },
            { status: 'Out for Delivery', time: '', completed: false },
            { status: 'Delivered', time: '', completed: false }
        ]
        }
    ]);

    const getStatusIcon = (status) => {
        switch (status) {
        case 'delivered': return <CheckCircle className="w-5 h-5 text-emerald-500" />;
        case 'shipped': return <Truck className="w-5 h-5 text-blue-500" />;
        case 'processing': return <Clock className="w-5 h-5 text-amber-500" />;
        case 'pending': return <Package className="w-5 h-5 text-slate-500" />;
        case 'cancelled': return <XCircle className="w-5 h-5 text-red-500" />;
        default: return <Package className="w-5 h-5 text-slate-500" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
        case 'delivered': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
        case 'shipped': return 'bg-blue-50 text-blue-700 border-blue-200';
        case 'processing': return 'bg-amber-50 text-amber-700 border-amber-200';
        case 'pending': return 'bg-slate-50 text-slate-700 border-slate-200';
        case 'cancelled': return 'bg-red-50 text-red-700 border-red-200';
        default: return 'bg-slate-50 text-slate-700 border-slate-200';
        }
    };

    const filteredOrders = orders.filter(order => {
        const matchesFilter = selectedFilter === 'all' || order.status === selectedFilter;
        const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesFilter && matchesSearch;
    });

    const OrderModal = ({ order, onClose }) => {
        if (!order) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="p-8 border-b border-slate-100">
                <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-3xl font-bold text-slate-800">Order Details</h2>
                    <div className="flex items-center gap-4 mt-3">
                    <span className="text-xl font-semibold text-slate-600">#{order.id}</span>
                    <div className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </div>
                    {order.rating && (
                        <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-yellow-700">{order.rating}</span>
                        </div>
                    )}
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="text-slate-400 hover:text-slate-600 text-3xl font-light leading-none"
                >
                    ×
                </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-8">
                {/* Order Summary */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                    <h3 className="text-xl font-semibold text-slate-800 mb-4">Order Summary</h3>
                    <div className="grid grid-cols-2 gap-6">
                    <div>
                        <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Order Date</p>
                        <p className="text-lg font-semibold text-slate-800 mt-1">
                        {new Date(order.date).toLocaleDateString('en-US', { 
                            day: 'numeric', 
                            month: 'long', 
                            year: 'numeric' 
                        })}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Delivery Time</p>
                        <p className="text-lg font-semibold text-emerald-600 mt-1">{order.deliveryTime}</p>
                    </div>
                    {order.trackingNumber && (
                        <>
                        <div>
                            <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Tracking ID</p>
                            <p className="text-lg font-mono font-semibold text-blue-600 mt-1">{order.trackingNumber}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Delivery Partner</p>
                            <p className="text-lg font-semibold text-slate-800 mt-1">{order.deliveryPartner}</p>
                        </div>
                        </>
                    )}
                    </div>
                </div>
                
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Total Amount</h3>
                    <p className="text-3xl font-bold text-emerald-600">₹{order.total.toFixed(2)}</p>
                    <p className="text-sm text-slate-600 mt-2">{order.items.length} items</p>
                </div>
                </div>

                {/* Delivery Address */}
                <div className="mb-8">
                <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-emerald-600" />
                    Delivery Address
                </h3>
                <div className="bg-slate-50 rounded-xl p-4">
                    <p className="text-slate-700 font-medium">{order.deliveryAddress}</p>
                </div>
                </div>

                {/* Order Progress */}
                {order.orderProgress && (
                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-slate-800 mb-4">Order Progress</h3>
                    <div className="space-y-4">
                    {order.orderProgress.map((step, index) => (
                        <div key={index} className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            step.completed ? 'bg-emerald-500' : 'bg-slate-200'
                        }`}>
                            {step.completed ? (
                            <CheckCircle className="w-5 h-5 text-white" />
                            ) : (
                            <div className="w-3 h-3 rounded-full bg-white"></div>
                            )}
                        </div>
                        <div className="flex-1">
                            <p className={`font-medium ${step.completed ? 'text-slate-800' : 'text-slate-400'}`}>
                            {step.status}
                            </p>
                            {step.time && (
                            <p className="text-sm text-slate-500">{step.time}</p>
                            )}
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
                )}

                {/* Order Items */}
                <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Order Items</h3>
                <div className="space-y-4">
                    {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-xl hover:shadow-md transition-shadow">
                        <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                        <h4 className="font-semibold text-slate-800">{item.name}</h4>
                        <p className="text-sm text-slate-600">{item.quantity} {item.unit}</p>
                        </div>
                        <p className="text-lg font-bold text-emerald-600">₹{item.price.toFixed(2)}</p>
                    </div>
                    ))}
                </div>
                </div>
            </div>
            </div>
        </div>
    );
  };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <Header />
            <div className="max-w-7xl mx-auto p-6">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

                <div className="p-8 border-b border-slate-100">
                    <div className="flex flex-col lg:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                        type="text"
                        placeholder="Search orders by ID or product name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg bg-slate-50"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <Filter className="w-5 h-5 text-slate-600" />
                        <select
                        value={selectedFilter}
                        onChange={(e) => setSelectedFilter(e.target.value)}
                        className="px-6 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg bg-slate-50 min-w-[160px]"
                        >
                        <option value="all">All Orders</option>
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                    </div>
                </div>

                {/* Orders List */}
                <div className="p-8">
                    {filteredOrders.length === 0 ? (
                    <div className="text-center py-16">
                        <Package className="w-24 h-24 text-slate-300 mx-auto mb-6" />
                        <h3 className="text-2xl font-semibold text-slate-600 mb-3">No Orders Found</h3>
                        <p className="text-slate-500 text-lg">No orders match your current search or filter criteria.</p>
                    </div>
                    ) : (
                    <div className="space-y-6">
                        {filteredOrders.map((order) => (
                        <div key={order.id} className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:border-emerald-200">
                            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                            <div className="flex-1">
                                {/* Order Header */}
                                <div className="flex items-center gap-4 mb-6">
                                {getStatusIcon(order.status)}
                                <h3 className="text-2xl font-bold text-slate-800">#{order.id}</h3>
                                <div className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(order.status)}`}>
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </div>
                                {order.rating && (
                                    <div className="flex items-center gap-2 bg-yellow-50 px-3 py-2 rounded-full">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm font-semibold text-yellow-700">{order.rating}</span>
                                    </div>
                                )}
                                </div>

                                {/* Order Info */}
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                                <div>
                                    <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Order Date</p>
                                    <p className="text-base font-semibold text-slate-800 mt-1">
                                    {new Date(order.date).toLocaleDateString()}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Items</p>
                                    <p className="text-base font-semibold text-slate-800 mt-1">{order.items.length} products</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Delivery Time</p>
                                    <p className="text-base font-semibold text-emerald-600 mt-1">{order.deliveryTime}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Total</p>
                                    <p className="text-2xl font-bold text-emerald-600 mt-1">₹{order.total.toFixed(2)}</p>
                                </div>
                                </div>

                                {/* Product Images */}
                                <div className="mb-4">
                                <p className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-3">Order Items</p>
                                <div className="flex items-center gap-3 flex-wrap">
                                    {order.items.slice(0, 4).map((item, index) => (
                                    <div key={index} className="relative group">
                                        <img 
                                        src={item.image} 
                                        alt={item.name}
                                        className="w-16 h-16 rounded-xl object-cover border-2 border-slate-200 group-hover:border-emerald-300 transition-colors"
                                        />
                                        <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                                        {item.quantity}
                                        </div>
                                    </div>
                                    ))}
                                    {order.items.length > 4 && (
                                    <div className="w-16 h-16 rounded-xl bg-slate-100 border-2 border-slate-200 flex items-center justify-center">
                                        <span className="text-sm font-semibold text-slate-600">+{order.items.length - 4}</span>
                                    </div>
                                    )}
                                </div>
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="xl:ml-6">
                                <button
                                onClick={() => setSelectedOrder(order)}
                                className="flex items-center gap-3 px-8 py-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl group"
                                >
                                <Eye className="w-5 h-5" />
                                View Details
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                            </div>
                        </div>
                        ))}
                    </div>
                    )}
                </div>
                </div>
            </div>

        <OrderModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
        </div>
    );
};

export default UserOrdersPanel;