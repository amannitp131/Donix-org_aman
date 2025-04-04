"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Landing_page/Navbar";
import Hero from "@/components/Landing_page/hero";
import FAQ from "@/components/Landing_page/Faq";
import Footer from "@/components/Landing_page/Footer";
import HowItWorks from "@/components/Landing_page/HowItWorks";
import WhyChooseDonix from "@/components/Landing_page/Whychoosedonix";
import ChatBot from "@/components/Common/Chatbot";

const Home: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true); // Default to dark mode

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedDarkMode = localStorage.getItem("darkMode");
      if (storedDarkMode !== null) {
        setDarkMode(storedDarkMode === "1");
      } else {
        localStorage.setItem("darkMode", "1"); // Set default value
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("darkMode", darkMode ? "1" : "0");
      document.documentElement.classList.toggle("dark", darkMode);
    }
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Hero darkMode={darkMode} />
      <WhyChooseDonix darkMode={darkMode} />
      <HowItWorks darkMode={darkMode} />
      <FAQ darkMode={darkMode} />
      <Footer darkMode={darkMode} />
      <ChatBot />
    </div>
  );
};

export default Home;
