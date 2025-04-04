'use client';

import React from 'react';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white w-full py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-gray-700 pb-8">
          <div className="flex items-center space-x-4">
            <i className="fa fa-map-marker text-orange-500 text-2xl"></i>
            <div>
              <h4 className="text-lg font-semibold">Find us</h4>
              <span className="text-gray-400">National Institute of Technology, Patna</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <i className="fa fa-phone text-orange-500 text-2xl"></i>
            <div>
              <h4 className="text-lg font-semibold">Call us</h4>
              <span className="text-gray-400">123456789</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <i className="fa fa-envelope-open text-orange-500 text-2xl"></i>
            <div>
              <h4 className="text-lg font-semibold">Mail us</h4>
              <span className="text-gray-400">mail@info.com</span>
            </div>
          </div>
        </div>
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
          {/* Logo and About */}
          <div>
            <div className="mb-4">
              <Image
                src="https://i.postimg.cc/8kdzwwx4/pngwing-com.png"
                alt="Logo"
                width={150}
                height={75}
              />
            </div>
            <p className="text-gray-400 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-orange-500"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="text-gray-400 hover:text-orange-500"><i className="fa-brands fa-twitter"></i></a>
              <a href="#" className="text-gray-400 hover:text-orange-500"><i className="fa-brands fa-google"></i></a>
            </div>
          </div>
          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-orange-500">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500">Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500">About us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500">Expert Team</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500">Latest News</a></li>
            </ul>
          </div>
          {/* Subscribe */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
            <p className="text-gray-400 text-sm mb-4">Don’t miss to subscribe to our new feeds, kindly fill the form below.</p>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Email Address"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:border-orange-500"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Send</button>
            </div>
          </div>
        </div>
        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm border-t border-gray-700 pt-4">
          <p>© 2018, All Rights Reserved Mithila</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-orange-500">Home</a>
            <a href="#" className="hover:text-orange-500">Terms</a>
            <a href="#" className="hover:text-orange-500">Privacy</a>
            <a href="#" className="hover:text-orange-500">Policy</a>
            <a href="#" className="hover:text-orange-500">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
