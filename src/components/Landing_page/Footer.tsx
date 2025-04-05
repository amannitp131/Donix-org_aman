import React, { useState } from "react";
import Image from "next/image";
import {
  FaFacebook,
  FaTwitter,
  FaGoogle,
  FaTelegramPlane,
} from "react-icons/fa";
import { PiBuildingOffice } from "react-icons/pi";
import { MdOutlineWifiCalling3 } from "react-icons/md";
import { IoIosMail } from "react-icons/io";

interface FooterProps {
  darkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);

    try {
      const response = await fetch("http://localhost:5000/sendMail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmail: email, msg: message }),
      });

      const data = await response.json();
      if (response.ok) {
        setStatus({ success: true, message: data.message });
        setEmail("");
        setMessage("");
      } else {
        setStatus({
          success: false,
          message: data.error || "Failed to send email",
        });
      }
    } catch {
      setStatus({
        success: false,
        message: "An error occurred. Please try again.",
      });
    }
  };

  const textColor = darkMode ? "text-gray-400" : "text-gray-600";
  const inputClass = `flex-1 px-4 py-2 border rounded-md focus:outline-none ${
    darkMode
      ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500"
      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-orange-500"
  }`;

  return (
    <section id="contact">
      <footer
        className={`w-full py-10 px-4 ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          {/* Contact Information */}
          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 ${
              darkMode ? "border-gray-700" : "border-gray-300"
            } border-b`}
          >
            <div className="flex items-center space-x-4">
              <PiBuildingOffice className="text-orange-500 text-2xl" />
              <div>
                <h4 className="text-lg font-semibold">Find us</h4>
                <span className={textColor}>
                  National Institute of Technology, Patna
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <MdOutlineWifiCalling3 className="text-orange-500 text-2xl" />
              <div>
                <h4 className="text-lg font-semibold">Call us</h4>
                <span className={textColor}>123456789</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <IoIosMail className="text-orange-500 text-2xl" />
              <div>
                <h4 className="text-lg font-semibold">Mail us</h4>
                <span className={textColor}>soulBearers@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
            {/* Logo and About */}
            <div>
              <div className="mb-4">
                <Image
                  src="/footer.jpeg"
                  alt="Logo"
                  width={150}
                  height={75}
                  unoptimized
                />
              </div>
              <p className={textColor}>
  We are here to revolutionizing organ donation by connecting donors and recipients seamlessly. And create a platform that fosters awareness, simplifies the donation process, and ensures transparency. 
 
</p>
              <div className="mt-4 flex space-x-4">
                <a
                  href="#"
                  aria-label="Facebook"
                  className={`${textColor} hover:text-orange-500`}
                >
                  <FaFacebook />
                </a>
                <a
                  href="#"
                  aria-label="Twitter"
                  className={`${textColor} hover:text-orange-500`}
                >
                  <FaTwitter />
                </a>
                <a
                  href="#"
                  aria-label="Google"
                  className={`${textColor} hover:text-orange-500`}
                >
                  <FaGoogle />
                </a>
              </div>
            </div>

            {/* Useful Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
              <ul className="space-y-2">
                {[
                  "Home",
                  "Services",
                  "Contact",
                  "About us",
                  "Expert Team",
                  "Latest News",
                ].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className={`${textColor} hover:text-orange-500`}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Subscribe */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
              <p className={textColor}>
                Don’t miss to subscribe to our new feeds, kindly fill the form
                below.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mt-4">
                {/* Email Input */}
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={inputClass}
                />

                {/* Message Input */}
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className={inputClass}
                ></textarea>

                {/* Submit Button */}
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center"
                  type="submit"
                  aria-label="Send Message"
                >
                  <FaTelegramPlane />
                </button>
                {status && (
                  <p
                    className={`text-sm ${
                      status.success ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {status.message}
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Copyright */}
          <div
            className={`flex flex-col md:flex-row justify-between items-center text-sm border-t pt-4 ${
              darkMode
                ? "border-gray-700 text-gray-400"
                : "border-gray-300 text-gray-600"
            }`}
          >
            <p>© 2025, All Rights Reserved Soul Bearers</p>
            <div className="flex space-x-4">
              {["Home", "Terms", "Privacy", "Policy", "Contact"].map((item) => (
                <a key={item} href="#" className="hover:text-orange-500">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Footer;