import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center space-x-4">
            <i className="fa fa-map-marker text-blue-500 text-2xl"></i>
            <div>
              <h4 className="font-bold">Find us</h4>
              <span>National Institute of Technology, Patna</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <i className="fa fa-phone text-blue-500 text-2xl"></i>
            <div>
              <h4 className="font-bold">Call us</h4>
              <span>123456789</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <i className="fa fa-envelope-open text-blue-500 text-2xl"></i>
            <div>
              <h4 className="font-bold">Mail us</h4>
              <span>mail@info.com</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div>
            <div className="mb-4">
              <Image
                src="https://i.postimg.cc/8kdzwwx4/pngwing-com.png"
                alt="logo"
                className="h-20"
              />
            </div>
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-blue-500">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="text-blue-500">
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a href="#" className="text-blue-500">
                <i className="fa-brands fa-google"></i>
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-4">Useful Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-500">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  About us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  Expert Team
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  Latest News
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Subscribe</h3>
            <p className="text-sm mb-4">
              Don’t miss to subscribe to our new feeds, kindly fill the form
              below.
            </p>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Email Address"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 dark:bg-gray-800 py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-center md:text-left">
            Copyright &copy; 2018, All Right Reserved Mithila
          </p>
          <ul className="flex space-x-4 mt-4 md:mt-0">
            <li>
              <a href="#" className="hover:text-blue-500">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Terms
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Privacy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
