"use client";

import React, { useEffect, useRef } from "react";
import { CheckCircle, Search, Shield, Settings } from "lucide-react";
import gsap from "gsap";

interface WhyChooseDonixProps {
  darkMode: boolean;
}

const WhyChooseDonix: React.FC<WhyChooseDonixProps> = ({ darkMode }) => {
  const containerRef = useRef<HTMLDivElement>(null); // Ref for the main container
  const featuresRef = useRef<(HTMLDivElement | null)[]>([]); // Fixed: Array of divs, allowing null

  const features = [
    {
      title: "Instant Registration",
      description: "Easy signup for donors & recipients",
      icon: <CheckCircle size={24} className={`${darkMode ? "text-blue-400" : "text-blue-600"}`} />,
    },
    {
      title: "AI-Based Matching",
      description: "Smart organ-donor compatibility system",
      icon: <Settings size={24} className={`${darkMode ? "text-blue-400" : "text-blue-600"}`} />,
    },
    {
      title: "Real-Time Organ Availability",
      description: "Dynamic database with search filters",
      icon: <Search size={24} className={`${darkMode ? "text-blue-400" : "text-blue-600"}`} />,
    },
    {
      title: "Secure & Ethical",
      description: "Verified, legal, and transparent processes",
      icon: <Shield size={24} className={`${darkMode ? "text-blue-400" : "text-blue-600"}`} />,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              featuresRef.current.filter((el) => el !== null),
              { opacity: 0, y: 50 },
              {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
              }
            );
          }
        });
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`p-8 rounded-2xl max-w-xl mx-auto transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <h2
        className={`text-4xl font-extrabold mb-8 text-center tracking-wide ${
          darkMode ? "text-blue-400" : "text-blue-400"
        }`}
      >
        Why Choose Donix?
      </h2>
      <div className="space-y-4">
        {features.map((feature, index) => (
          <div
            key={index}
            ref={(el) => {
              featuresRef.current[index] = el; 
            }}
            className={`flex items-center gap-4 p-4 rounded-xl transition-colors duration-300 cursor-pointer ${
              darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {feature.icon}
            <div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseDonix;
