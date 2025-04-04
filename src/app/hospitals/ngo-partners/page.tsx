"use client";

import React, { useRef, useEffect, useState } from "react";
import "./cards.css";

const items = [
  { id: 1, name: "Codepen", color: "#0D6EFD", icon: "fa-codepen", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, impedit?" },
  { id: 2, name: "HTML 5", color: "#6710F5", icon: "fa-html5", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
  { id: 3, name: "CSS 3", color: "#6F42C1", icon: "fa-css3", description: "Lorem ipsum dolor sit." },
  { id: 4, name: "Javascript", color: "#D63384", icon: "fa-js", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor laboriosam odio alias." },
  { id: 5, name: "Github", color: "#DC3545", icon: "fa-github", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
  { id: 6, name: "React", color: "#61DAFB", icon: "fa-react", description: "A JavaScript library for building user interfaces." },
  { id: 7, name: "Node.js", color: "#68A063", icon: "fa-node", description: "JavaScript runtime built on Chrome's V8 engine." },
];

export default function ResponsiveCardSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState(3); // Number of visible cards
  const [startIndex, setStartIndex] = useState(0); // Current start index for visible cards
  const cardWidth = 250; // Fixed card width
  const gap = 20; // Gap between cards

  // Adjust the number of visible cards based on screen width
  useEffect(() => {
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
    <div style={{ padding: "20px" }}>
      {/* Heading Section */}
      <div
        style={{
          position: "sticky",
          top: "0",
          background: "#fff",
          zIndex: 10,
          padding: "10px 0",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#333" }}>NGO Associated</h1>
        <div
          style={{
            width: "180px", // Horizontal line width
            height: "3px", // Horizontal line height
            backgroundColor: "#007BFF",
            margin: "8px auto 0", // Center the line below the heading
            borderRadius: "4px",
          }}
        ></div>
      </div>

      {/* Scrollable List Section */}
      <div style={{ display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
        {/* Left Scroll Button */}
        <button
          onClick={() => scroll("left")}
          disabled={startIndex === 0}
          style={{
            position: "absolute",
            left: "10px",
            background: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            cursor: "pointer",
            fontSize: "1.5rem",
            zIndex: 1,
          }}
        >
          ❮
        </button>

        {/* Scrollable List */}
        <div
          ref={scrollRef}
          style={{
            display: "flex",
            gap: `${gap}px`,
            overflow: "hidden",
            width: "100%",
            transition: "transform 0.5s ease-in-out",
            transform: `translateX(-${startIndex * (cardWidth + gap)}px)`, // Dynamically shift the container
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                width: `${cardWidth}px`,
                background: "#fff",
                padding: "20px",
                textAlign: "center",
                borderRadius: "10px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                flexShrink: 0, // Prevent shrinking of cards
              }}
            >
              <i
                className={`fa-brands ${item.icon}`}
                style={{ fontSize: "2rem", marginBottom: "8px", color: item.color }}
              ></i>
              <div style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "8px" }}>{item.name}</div>
              <div
                style={{
                  fontSize: "0.875rem",
                  color: "#666",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  wordWrap: "break-word",
                  maxHeight: "80px",
                }}
              >
                {item.description}
              </div>
            </div>
          ))}
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={() => scroll("right")}
          disabled={startIndex + visibleCards >= items.length}
          style={{
            position: "absolute",
            right: "10px",
            background: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            cursor: "pointer",
            fontSize: "1.5rem",
            zIndex: 1,
          }}
        >
          ❯
        </button>
      </div>
    </div>
  );
}