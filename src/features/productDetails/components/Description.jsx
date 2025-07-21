import { Award, Shield } from 'lucide-react'
import React from 'react'

export default function Description({product}) {
    return (
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
            </div>
        </div>
    )
}
