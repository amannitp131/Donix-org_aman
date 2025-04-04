"use client";
import React, { useState, useEffect } from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { HiMenu } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import {
  format,
  startOfMonth,
  endOfMonth,
  addDays,
  isSameDay,
  getMonth,
  subMonths,
  addMonths,
  getDay,
} from "date-fns";

interface Event {
  date: Date;
  title: string;
}

const CalendarPage: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const eventList: Event[] = [
    { date: new Date(2025, 1, 5), title: "February Event 1" },
    { date: new Date(2025, 1, 14), title: "Valentine's Day" },
    { date: new Date(2025, 2, 5), title: "March Event 1" },
    { date: new Date(2025, 2, 10), title: "March Event 2" },
    { date: new Date(2025, 3, 15), title: "April Event 1" },
    { date: new Date(2025, 3, 20), title: "April Event 2" },
  ];

  const filteredEvents = eventList.filter(
    (event) => getMonth(event.date) === getMonth(currentMonth)
  );

  useEffect(() => {
    // Retrieve darkMode value from localStorage
    const storedDarkMode = localStorage.getItem("darkMode");
    setDarkMode(storedDarkMode === "1");
  }, []);

  return (
    <div
      className={`min-h-screen p-6 flex flex-col md:flex-row gap-8 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Toggler Button for Small Screens */}
      <button
        className="md:hidden p-3 text-gray-700 dark:text-gray-300 focus:outline-none"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? (
          <IoMdClose className="text-2xl text-red-500" />
        ) : (
          <HiMenu className="text-2xl text-gray-700 dark:text-gray-300" />
        )}
      </button>

      {/* Left Dashboard */}
      <div
        className={`w-full md:w-1/4 p-6 shadow-lg rounded-lg h-fit ${
          isMenuOpen ? "block" : "hidden"
        } md:block sticky top-6 ${
          darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900"
        }`}
      >
        <h3 className="text-lg font-bold mb-4">Month Dashboard</h3>
        <ul className="space-y-4">
          {filteredEvents.map((event, index) => (
            <li
              key={index}
              className={`p-3 rounded-lg ${
                darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"
              }`}
            >
              <div className="font-bold">{format(event.date, "MMMM d, yyyy")}</div>
              <div className="text-sm">{event.title}</div>
            </li>
          ))}
        </ul>
      </div>

      {/* Calendar Section */}
      <div className="w-full md:w-3/4 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className={`px-4 py-2 rounded-lg ${
              darkMode
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                : "bg-gray-900 text-white hover:bg-gray-700"
            }`}
          >
            <GoArrowLeft />
          </button>
          <h2 className="text-xl md:text-2xl font-bold">{format(currentMonth, "MMMM yyyy")}</h2>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className={`px-4 py-2 rounded-lg ${
              darkMode
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                : "bg-gray-900 text-white hover:bg-gray-700"
            }`}
          >
            <GoArrowRight />
          </button>
        </div>
        <div className="grid grid-cols-7 text-center font-bold text-sm md:text-lg mb-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-gray-700">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2 md:gap-4">
          {Array.from({ length: getDay(startOfMonth(currentMonth)) }, (_, i) => (
            <div key={`empty-${i}`} className="p-4 md:p-6"></div>
          ))}
          {Array.from({ length: endOfMonth(currentMonth).getDate() }, (_, i) => {
            const day = addDays(startOfMonth(currentMonth), i);
            const dayEvents = eventList.filter((event) => isSameDay(event.date, day));
            return (
              <div
                key={i}
                className={`p-4 md:p-6 text-center rounded-lg transition duration-300 cursor-pointer items-center justify-center ${
                  isSameDay(day, selectedDate)
                    ? darkMode
                      ? "bg-blue-900"
                      : "bg-blue-100"
                    : darkMode
                    ? "hover:bg-gray-700"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => setSelectedDate(day)}
              >
                <div className="text-sm  md:text-lg font-bold">{format(day, "d")}</div>
                {dayEvents.length > 0 && (
                  <div className="text-xs md:text-sm text-blue-500 font-medium sm:block hidden">
                    {dayEvents[0].title}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;