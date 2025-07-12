import React from 'react';
import { MapPin, Phone, Heart } from 'lucide-react';

// Footer Component
const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-12">
                <div className="max-w-7xl mx-auto px-4">
                  <div className="grid md:grid-cols-4 gap-8">
                    <div>
                      <h3 className="text-xl font-bold mb-4">🌾 Sunotal Farms</h3>
                      <p className="text-gray-300 mb-4">Fresh, organic produce delivered from local farms to your doorstep.</p>
                      <div className="flex space-x-4">
                        <span className="text-2xl">📧</span>
                        <span className="text-2xl">📱</span>
                        <span className="text-2xl">🐦</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-4">Quick Links</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li><a href="#" className="hover:text-white">About Us</a></li>
                        <li><a href="#" className="hover:text-white">Shop</a></li>
                        <li><a href="#" className="hover:text-white">Blog</a></li>
                        <li><a href="#" className="hover:text-white">Contact</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-4">Customer Service</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li><a href="#" className="hover:text-white">My Account</a></li>
                        <li><a href="#" className="hover:text-white">Order Tracking</a></li>
                        <li><a href="#" className="hover:text-white">Help & Support</a></li>
                        <li><a href="#" className="hover:text-white">Returns</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-4">Contact Info</h4>
                      <div className="text-gray-300 space-y-2">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2" />
                          <span>+91 98765 43210</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>Bangalore, Karnataka</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; 2025 Sunotal Farms. All rights reserved.</p>
                  </div>
                </div>
              </footer>
    );
};

export default Footer;