"use client";

import React, { useRef, useEffect, useState } from "react";

const items = [
  { id: 1, name: "Save the Children", color: "#FF5733", icon: "fa-hand-holding-heart", description: "An NGO dedicated to improving the lives of children through education, healthcare, and protection." },
  { id: 2, name: "World Wildlife Fund", color: "#4CAF50", icon: "fa-paw", description: "Focused on wildlife conservation and reducing the impact of human activities on the environment." },
  { id: 3, name: "Doctors Without Borders", color: "#2196F3", icon: "fa-user-md", description: "Provides medical aid to people affected by conflict, epidemics, and disasters." },
  { id: 4, name: "Greenpeace", color: "#8BC34A", icon: "fa-leaf", description: "An environmental NGO working to combat climate change and promote renewable energy." },
  { id: 5, name: "Red Cross", color: "#F44336", icon: "fa-first-aid", description: "Provides emergency assistance, disaster relief, and education in communities worldwide." },
  { id: 6, name: "Habitat for Humanity", color: "#FF9800", icon: "fa-home", description: "Helps build affordable housing for families in need." },
  { id: 7, name: "Charity: Water", color: "#03A9F4", icon: "fa-tint", description: "Brings clean and safe drinking water to people in developing countries." },
];

export default function ResponsiveCardSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState(3); // Number of visible cards
  const [startIndex, setStartIndex] = useState(0); 
  const [darkMode, setDarkMode] = useState(false);
  const cardWidth = 250; // Fixed card width
  const gap = 20; // Gap between card

  // Adjust the number of visible cards based on screen width
  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    setDarkMode(storedDarkMode === "1");
    const updateVisibleCards = () => {
      const containerWidth = scrollRef.current?.offsetWidth || window.innerWidth;
      setVisibleCards(Math.floor(containerWidth / (cardWidth + gap)));
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);

    return () => {
      window.removeEventListener("resize", updateVisibleCards);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (direction === "right" && startIndex + visibleCards < items.length) {
      setStartIndex(startIndex + 1);
    } else if (direction === "left" && startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div className={`p-6 w-screen h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
  {/* Heading Section */}
  <div
    className={`sticky top-0 z-10 text-center mb-6 ${
      darkMode ? "bg-gray-900" : "bg-white"
    }`}
  >
    <h1 className="text-3xl font-bold">
      NGO Associated
    </h1>
    <div
      className={`w-24 h-1 mx-auto mt-2 rounded ${
        darkMode ? "bg-blue-300" : "bg-blue-500"
      }`}
    ></div>
  </div>

  {/* Scrollable List Section */}
  <div className="relative flex items-center overflow-hidden">
    {/* Left Scroll Button */}
    <button
      onClick={() => scroll("left")}
      disabled={startIndex === 0}
      className={`absolute left-2 rounded-full w-10 h-10 flex items-center justify-center text-lg z-10 ${
        startIndex === 0
          ? "opacity-50 cursor-not-allowed"
          : darkMode
          ? "bg-blue-300 text-gray-900 hover:bg-blue-400"
          : "bg-blue-500 text-white hover:bg-blue-600"
      }`}
    >
      ❮
    </button>

    {/* Scrollable List */}
    <div
  ref={scrollRef}
  className="flex gap-5 overflow-hidden w-full transition-transform duration-500"
  style={{
    transform: `translateX(-${startIndex * (cardWidth + gap)}px)`,
  }}
>
  {items.map((item) => (
    <div
      key={item.id}
      className={`w-[250px] p-6 text-center rounded-lg shadow-md flex-shrink-0 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <i
        className={`fa-brands ${item.icon}`}
        style={{ fontSize: "2rem", marginBottom: "8px", color: item.color }}
      ></i>
      <div className="text-lg font-semibold mb-2">{item.name}</div>
      <div className="text-sm">{item.description}</div>
    </div>
  ))}
</div>

    {/* Right Scroll Button */}
    <button
      onClick={() => scroll("right")}
      disabled={startIndex + visibleCards >= items.length}
      className={`absolute right-2 rounded-full w-10 h-10 flex items-center justify-center text-lg z-10 ${
        startIndex + visibleCards >= items.length
          ? "opacity-50 cursor-not-allowed"
          : darkMode
          ? "bg-blue-300 text-gray-900 hover:bg-blue-400"
          : "bg-blue-500 text-white hover:bg-blue-600"
      }`}
    >
      ❯
    </button>
  </div>
</div>
  );
}