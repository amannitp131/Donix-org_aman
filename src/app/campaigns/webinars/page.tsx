"use client";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import axios from "axios";

interface Webinar {
  _id: string;
  title: string;
  date: string;
  description: string;
  link: string;
  image?: string;
}

export default function WebinarPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ensure this runs only on the client side
    if (typeof window !== "undefined") {
      const storedDarkMode = localStorage.getItem("darkMode") === "1";
      setDarkMode(storedDarkMode);
    }

    // Fetch verified webinars from the backend
    const fetchWebinars = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getVerifiedWebinar");
        setWebinars(response.data.verifiedWebinar || []);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch webinars:", error);
        setLoading(false);
      }
    };

    fetchWebinars();
  }, []);

  // Filter webinars based on selected month
  const filteredWebinars = webinars.filter((webinar) => {
    const webinarDate = new Date(webinar.date);
    return (
      webinarDate.getFullYear() === selectedMonth.getFullYear() &&
      webinarDate.getMonth() === selectedMonth.getMonth()
    );
  });

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
        Loading...
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      {/* Page Header */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold">Upcoming Webinars</h1>
        <p className="text-gray-500 mt-2">Join us to learn more about organ donation and transplantation.</p>
      </header>

      {/* Month Selector */}
      <div className="flex justify-center items-center gap-4 mb-8">
        <label
          className={`text-lg font-semibold ${darkMode ? "text-gray-300" : "text-gray-700"}`}
        >
          Select Month:
        </label>
        <DatePicker
          selected={selectedMonth}
          onChange={(date: Date | null) => {
            if (date) {
              setSelectedMonth(date);
            }
          }}
          dateFormat="MMMM yyyy"
          showMonthYearPicker
          className={`p-3 rounded-lg border shadow-sm transition-all duration-300 focus:outline-none ${
            darkMode
              ? "bg-gray-800 text-gray-200 border-gray-600 focus:ring-2 focus:ring-blue-500"
              : "bg-white text-gray-900 border-gray-300 focus:ring-2 focus:ring-blue-400"
          }`}
        />
      </div>

      {/* Webinar List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredWebinars.length > 0 ? (
          filteredWebinars.map((webinar) => (
            <div
              key={webinar._id}
              className={`webinar-card p-6 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 ${
                darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900"
              }`}
            >
              {/* Image Section */}
              <div className="h-48 mb-4 overflow-hidden rounded-lg">
                {1 ? (
                  <Image
                    src={"https://plus.unsplash.com/premium_photo-1661682777553-d620975e42c8?w=600&auto=format&fit=crop&q=60"}
                    alt={webinar.title}
                    layout="responsive"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div
                    className={`w-full h-full flex items-center justify-center rounded-lg ${
                      darkMode ? "bg-gray-700" : "bg-gray-200"
                    }`}
                  >
                    <span className="text-sm text-gray-500">No Image Available</span>
                  </div>
                )}
              </div>

              {/* Webinar Details */}
              <h2 className="text-2xl font-bold mb-2">{webinar.title}</h2>
              <p className="text-sm text-gray-500 mb-4">{new Date(webinar.date).toDateString()}</p>
              <p className="text-sm mb-6">{webinar.description}</p>
              <a
                href={webinar.link}
                className={`inline-block px-6 py-3 rounded-lg font-semibold text-center shadow-md transition duration-300 ${
                  darkMode ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Join Now
              </a>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No webinars available for this month.</p>
        )}
      </div>
    </div>
  );
}