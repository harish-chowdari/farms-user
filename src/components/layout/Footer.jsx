import React from 'react';
import { MapPin, Phone, Heart } from 'lucide-react';

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-800 to-green-900 text-white mt-12">
      <div className="px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 flex items-center justify-center">
                <svg viewBox="0 0 120 120" className="w-8 h-8">
                  <circle cx="60" cy="60" r="50" fill="url(#greenGradientFooter)" stroke="#22c55e" strokeWidth="2"/>
                  <g transform="translate(60, 60)">
                    <path d="M0,-35 L0,-25" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round"/>
                    <path d="M25,-25 L18,-18" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round"/>
                    <path d="M35,0 L25,0" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round"/>
                    <path d="M25,25 L18,18" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round"/>
                    <path d="M0,35 L0,25" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round"/>
                    <path d="M-25,25 L-18,18" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round"/>
                    <path d="M-35,0 L-25,0" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round"/>
                    <path d="M-25,-25 L-18,-18" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round"/>
                  </g>
                  <circle cx="60" cy="45" r="12" fill="#fbbf24"/>
                  <g transform="translate(60, 70)">
                    <rect x="-1" y="0" width="2" height="25" fill="#16a34a"/>
                    <path d="M-1,10 Q-15,5 -18,15 Q-15,20 -1,15 Z" fill="#22c55e"/>
                    <path d="M1,10 Q15,5 18,15 Q15,20 1,15 Z" fill="#22c55e"/>
                    <path d="M-1,5 Q-8,0 -10,8 Q-8,12 -1,10 Q6,12 8,8 Q6,0 -1,5 Z" fill="#16a34a"/>
                  </g>
                  <ellipse cx="60" cy="95" rx="25" ry="8" fill="#92400e" opacity="0.6"/>
                  <defs>
                    <linearGradient id="greenGradientFooter" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#dcfce7" stopOpacity="1" />
                      <stop offset="100%" stopColor="#bbf7d0" stopOpacity="1" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold">Sunotal Farms</h3>
                <p className="text-sm opacity-90">Admin Dashboard</p>
              </div>
            </div>
            <p className="text-green-100 mb-4">
              Connecting farms to families with fresh, natural, and sustainable produce. 
              From our fields to your table, we ensure quality and freshness in every delivery.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Bengaluru, Karnataka</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+91 98765 43210</span>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a href="#" className="block text-green-100 hover:text-white transition-colors">Dashboard</a>
              <a href="#" className="block text-green-100 hover:text-white transition-colors">Products</a>
              <a href="#" className="block text-green-100 hover:text-white transition-colors">Orders</a>
              <a href="#" className="block text-green-100 hover:text-white transition-colors">Customers</a>
              <a href="#" className="block text-green-100 hover:text-white transition-colors">Farmers</a>
            </div>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <div className="space-y-2">
              <a href="#" className="block text-green-100 hover:text-white transition-colors">Help Center</a>
              <a href="#" className="block text-green-100 hover:text-white transition-colors">Contact Us</a>
              <a href="#" className="block text-green-100 hover:text-white transition-colors">Documentation</a>
              <a href="#" className="block text-green-100 hover:text-white transition-colors">System Status</a>
            </div>
          </div>
        </div>
        
        <hr className="border-green-700 my-6" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-green-100 text-sm">
            © 2024 Sunotal Farms. All rights reserved. | Fresh • Natural • Farm to Table
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-green-100 text-sm">Made with</span>
            <Heart className="w-4 h-4 text-red-400" />
            <span className="text-green-100 text-sm">for farmers and families</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;