import { Heart } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function ProductCard({product}) {
    const navigate = useNavigate();
    // Calculate discount percentage
    const calculateDiscountPercentage = (originalPrice, discountPrice) => {
        if (!originalPrice || !discountPrice || originalPrice <= discountPrice) return 0;
        return Math.round(((originalPrice - discountPrice) / originalPrice) * 100);
    };

    const discountPercentage = calculateDiscountPercentage(product.price, product.discountPrice);

    return (
        <div onClick={() => navigate(`/product-details/${product?._id}`)} key={product.id} className="bg-white shadow-md cursor-pointer border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
                <img src={product?.productImage[0]} alt={product.name} className="h-48 flex items-center object-contain justify-center text-6xl" />
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
            <div className="p-4">
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
                    <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                        Add
                    </button>
                </div>
            </div>
        </div>
    )
}