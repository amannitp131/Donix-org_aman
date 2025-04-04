"use client";
import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import "../../global.css";

// Define the data type structure
type Data = {
  [key: string]: string[];
};

interface HeroProps {
  darkMode: boolean;
}

const data: Data = {
  "For Admin": [
    "Collaboration with Medical Experts & Organizations → Partner with healthcare professionals for medical guidance & support.",
    "Automated Donor-Recipient Matching → Utilize AI to find the most suitable matches based on health parameters.",
    "Real-Time Monitoring & Updates → Track donation processes and keep records updated.",
    "Manage User Roles & Access → Ensure data integrity and access control.",
    "Post-Donation Health Tracking → Monitor donors' well-being after donation.",
  ],
  "For Donors": [
    "Register as a Donor → Fill out personal and health information securely.",
    "AI Health Monitoring → Receive regular updates and health tracking reports.",
    "Eligibility Assessment → Check your eligibility based on medical conditions.",
  ],
  "For Recipients": [
    "Register as a Recipient → Provide necessary information and medical records.",
    "Real-Time Match Notifications → Get instant alerts when a match is found.",
    "Post-Transplant Care → Follow-up health tracking and guidance.",
  ],
  "For HospitalNGO": [
    "Collaboration Platform → Connect with other hospitals and NGOs.",
    "Organ Transport Tracking → Monitor transportation of donated organs.",
  ],
  "For BlogsWriting": [
    "Share Your Story → Inspire others by sharing your experience.",
    "Medical Insights & News → Stay updated with medical research and news.",
  ],
};

const HowItWorks: React.FC<HeroProps> = ({ darkMode }) => {
  // Define types for state
  const [activeRole, setActiveRole] = useState<string>("For Admin");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Auto-slide every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === data[activeRole].length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(interval); // Cleanup interval to prevent multiple timers
  }, [activeRole]); // Restart when role changes

  const handleRoleChange = (role: string) => {
    setActiveRole(role);
    setCurrentIndex(0);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data[activeRole].length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === data[activeRole].length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate sidebar buttons
            gsap.fromTo(
              ".sidebar-button",
              { opacity: 0, x: -50 },
              {
                opacity: 1,
                x: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
              }
            );

            // Animate carousel content
            gsap.fromTo(
              ".carousel-content",
              { opacity: 0, y: 50 },
              {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
              }
            );
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% of the container is visible
    );

    const container = document.querySelector(".how-it-works-container");
    if (container) {
      observer.observe(container);
    }

    return () => {
      if (container) {
        observer.unobserve(container);
      }
    };
  }, []);

  return (
    <div
      className={`how-it-works-container p-8 mt-20 rounded-2xl max-w-5xl mx-auto transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } glassmorphism`}
    >
      <h2
        className={`text-4xl font-extrabold mb-8 text-center tracking-wide ${
          darkMode ? "text-white" : "text-black"
        }`}
      >
        How It Works?
      </h2>
      <div className="flex gap-4">
        {/* Sidebar */}
        <div className="flex flex-col space-y-2">
          {Object.keys(data).map((role) => (
            <button
              key={role}
              onClick={() => handleRoleChange(role)}
              className={`sidebar-button flex items-center gap-2 px-4 font-semibold py-2 rounded-lg transition duration-300 ${
                activeRole === role
                  ? "bg-blue-600 text-white"
                  : darkMode
                  ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              }`}
            >
              <FaUsers />
              <span className="hidden md:inline">{role}</span>
            </button>
          ))}
        </div>

        {/* Carousel */}
        <div
          className={`carousel-content flex flex-col items-center p-6 rounded-2xl relative transition-all duration-500 shadow-lg w-full max-w-[500px] min-h-[300px] md:max-w-[600px] lg:max-w-[700px] ${
            darkMode ? "bg-gray-800 text-white" : "bg-gray-50 text-gray-900"
          }`}
        >
          {/* Carousel Content */}
          <div className="flex-1 text-center mx-6 relative w-full">
            <div
              className={`p-6 rounded-xl shadow-md transition-all duration-500 w-full min-h-[200px] flex items-center justify-center text-xl font-semibold ${
                darkMode
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-gray-100 text-black hover:bg-gray-200"
              }`}
            >
              {data[activeRole][currentIndex]}
            </div>
          </div>

          {/* Navigation Arrows (Mobile) */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 md:hidden">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full shadow-md bg-gray-200 hover:bg-gray-300 text-gray-700"
            >
              <FaChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-full shadow-md bg-gray-200 hover:bg-gray-300 text-gray-700"
            >
              <FaChevronRight size={20} />
            </button>
          </div>

          {/* Navigation Arrows (Desktop) */}
          <div className="hidden md:flex items-center justify-between w-full px-4 mt-6">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full shadow-md bg-gray-200 hover:bg-gray-300 text-gray-700"
            >
              <FaChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-full shadow-md bg-gray-200 hover:bg-gray-300 text-gray-700"
            >
              <FaChevronRight size={24} />
            </button>
          </div>

          {/* Dots Navigation */}
          <div className="flex items-center justify-center mt-4 space-x-2">
            {data[activeRole].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "bg-blue-600"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
