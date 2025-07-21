import { Star } from 'lucide-react'
import React from 'react'

export default function Farmer() {

    const mockFarmer = {
        name: 'John Doe',
        location: 'New York',
        experience: '10 years',
        rating: '4.5'
    }

    return (
        <div className="max-w-4xl">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 mb-8">
                <div className="flex items-center space-x-6 mb-6">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-4xl">
                        {mockFarmer?.image}
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{mockFarmer?.name}</h3>
                        <p className="text-gray-600 text-lg">{mockFarmer?.location}</p>
                        <p className="text-green-700 font-medium">{mockFarmer?.experience} farming experience</p>
                        <div className="flex items-center mt-2">
                            <Star className="h-5 w-5 text-amber-400 fill-current" />
                            <span className="ml-1 text-lg font-semibold">{mockFarmer?.rating}</span>
                            <span className="ml-1 text-gray-600">Farmer Rating</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 mb-6 leading-relaxed">
                    {mockFarmer?.name} has been growing organic vegetables for over {mockFarmer?.experience}. 
                    Located in the beautiful state of {mockFarmer?.location}, his farm uses traditional 
                    farming methods combined with modern organic practices to produce the highest quality vegetables.
                </p>
                <p className="text-gray-700 leading-relaxed">
                    All products from this farm are certified organic and grown without the use of chemical 
                    pesticides or synthetic fertilizers. The farm follows sustainable farming practices that 
                    are good for both the environment and your health.
                </p>
            </div>
        </div>
    )
}
