
"use client"
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { HiMenu } from "react-icons/hi";
import { format } from "date-fns";
import DatePicker from "react-datepicker"; // Import DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker styles
import Navbar from "@/components/Landing_page/Navbar";
import Image from "next/image";

const organDonationEvents = [
  {
    date: "2025-04-05",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK2dg3ecW4CDGPHyFnhJeTy0vr0nX6_9mMhg&s",
    title: "Organ Donation Awareness Drive",
    description: "Join us in New York for an awareness drive about organ donation.",
  },
  {
    date: "2025-04-12",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1oLHT36NYwYkPeke2_UQB1Cusecw28J9jEQ&s",
    title: "Organ Donation Workshop",
    description: "A workshop in Los Angeles to educate people about organ donation.",
  },
  {
    date: "2025-04-20",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAPsL7Bf7uBCLUFgmWn_XBErAzttPVFR_-QQ&s",
    title: "Global Organ Donation Summit",
    description: "A global summit in London to discuss organ donation initiatives.",
  },
];

const Page = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(organDonationEvents[0]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Current date
  const eventRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof window !== "undefined") {
        nextEvent();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextEvent = () => {
    gsap.to(eventRef.current, {
      x: -100,
      opacity: 0,
      duration: 0.4,
      onComplete: () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % organDonationEvents.length);
        setSelectedEvent(organDonationEvents[(currentIndex + 1) % organDonationEvents.length]);
        gsap.fromTo(eventRef.current, { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4 });
      },
    });
  };

  const prevEvent = () => {
    gsap.to(eventRef.current, {
      x: 100,
      opacity: 0,
      duration: 0.4,
      onComplete: () => {
        setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? organDonationEvents.length - 1 : prevIndex - 1
        );
        setSelectedEvent(
          organDonationEvents[currentIndex === 0 ? organDonationEvents.length - 1 : currentIndex - 1]
        );
        gsap.fromTo(eventRef.current, { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4 });
      },
    });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);

    // Find the event closest to the selected date
    const closestEvent = organDonationEvents.find(
      (event) => format(new Date(event.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );

    if (closestEvent) {
      setSelectedEvent(closestEvent);
      setCurrentIndex(organDonationEvents.indexOf(closestEvent));
    }
  };

  return (
    <>
      <Navbar />
      <div
        className={`flex items-center justify-center min-h-screen transition-all duration-300 ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        {/* Sidebar (Event Calendar) */}
        <div
          className={`${
            sidebarOpen ? "w-1/4 p-6" : "w-0 p-0"
          } sm:w-1/4 h-screen ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"} shadow-lg transition-all duration-300 overflow-hidden`}
        >
          {/* Sidebar Toggle Button (Only on small screens) */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute top-4 left-4 text-white text-2xl sm:hidden"
          >
            <HiMenu />
          </button>

          {/* Calendar Content */}
          {sidebarOpen && (
            <>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-semibold sm:text-lg">
                  📅 {format(selectedDate, "MMMM yyyy")}
                </h3>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  className={`p-2 rounded-lg ${
                    darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-900"
                  }`}
                />
              </div>
              <ul className="space-y-4">
                {organDonationEvents.map((event, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setSelectedEvent(event);
                      setCurrentIndex(index);
                    }}
                    className={`p-3 rounded-lg cursor-pointer text-sm sm:text-base ${
                      selectedEvent.date === event.date
                        ? "bg-blue-500 text-white"
                        : darkMode
                        ? "bg-gray-700 hover:bg-gray-600"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {format(new Date(event.date), "MM/dd")}
                    <span className="hidden sm:inline"> - {event.title}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* Main Content */}
        <div className="w-3/4 flex flex-col items-center justify-center">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="absolute top-4 right-4 px-4 py-2 text-sm rounded-full transition-all duration-300"
            style={{
              background: darkMode ? "#fff" : "#333",
              color: darkMode ? "#333" : "#fff",
            }}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          <h2 className="text-3xl font-bold mb-6">Upcoming Organ Donation Events</h2>

          {/* Event Display */}
          <div className="relative w-96 h-96">
            <div
              ref={eventRef}
              className={`absolute inset-0 transition-all duration-300 p-4 rounded-xl shadow-lg ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <Image
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-48 object-cover rounded-lg transition-transform duration-300 transform hover:scale-105"
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold">{selectedEvent.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{selectedEvent.description}</p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevEvent}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600"
            >
              <FiChevronLeft size={24} />
            </button>

            <button
              onClick={nextEvent}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600"
            >
              <FiChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;