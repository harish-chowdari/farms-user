import React from 'react'

export default function NewsLetter() {
    return (
        <section className="py-16 bg-green-600 text-white">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
                <p className="text-xl mb-8">Get health tips, farmer stories, and seasonal produce updates</p>
                <div className="flex flex-col md:flex-row max-w-md mx-auto gap-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 px-4 py-3 bg-white rounded-lg text-gray-900 focus:outline-none"
                    />
                    <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
                        Subscribe
                    </button>
                </div>
            </div>
        </section>
    )
}
