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
    )
}
