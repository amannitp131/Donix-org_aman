"use client";

import React, { useState, useEffect, useRef } from "react";
import { IoArrowBack } from "react-icons/io5";
import { FaFilter, FaTimes, FaHospital, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import Image from "next/image";


interface Hospital {
  _id: string;
  hospitalName: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  contactNumber: string;
  email: string;
  website: string;
  authorisedPersonName: string;
  authorisedPersonDesignation: string;
}

const Page = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    setDarkMode(storedDarkMode === "1");

    const fetchHospitals = async () => {
      try {
        const response = await fetch("http://localhost:10000/allHospitals");
        if (!response.ok) {
          throw new Error("Failed to fetch hospitals");
        }
        const data = await response.json();
        setHospitals(data);
        setFilteredHospitals(data); // Set filteredHospitals to the fetched data
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  const filterByArea = (area: string) => {
    setFilteredHospitals(
      hospitals.filter((hospital: Hospital) => hospital.city === area)
    );
    setShowDropdown(false);
  };

  const resetFilters = () => {
    setFilteredHospitals(hospitals);
    setShowDropdown(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading hospitals...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  // Extract unique cities dynamically for the dropdown
  const uniqueCities = [...new Set(hospitals.map((hospital: Hospital) => hospital.city))];

  return (
    <div
      className={`min-h-screen flex justify-center items-center p-4 md:p-8 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div style={{ width: "100%" }}>
        {/* Header Section */}
        <div ref={headerRef} className="flex justify-between items-center mb-5">
          <div className="flex flex-col items-center justify-center h-full px-4 sm:px-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center relative mb-4 lg:ml-90 sm:ml-30">
              List of Certified Hospitals
              <span className="absolute top-full left-1/2 transform -translate-x-1/2 w-3/4 sm:w-4/5 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded mt-2"></span>
            </h1>
          </div>

          <button
            onClick={() => {
              if (filteredHospitals.length < hospitals.length) {
                resetFilters();
              } else {
                setShowDropdown(!showDropdown);
              }
            }}
            className="text-blue-500 text-2xl"
          >
            {filteredHospitals.length < hospitals.length ? (
              <FaTimes />
            ) : (
              <FaFilter />
            )}
          </button>
        </div>

        {/* Dropdown Menu */}
        {showDropdown && (
          <div
            className={`absolute top-16 right-5 border rounded-lg shadow-lg z-10 w-48 ${
              darkMode
                ? "bg-black text-white border-gray-700"
                : "bg-white text-gray-900 border-gray-300"
            }`}
          >
            <ul className="p-2">
              <li
                onClick={resetFilters}
                className="p-2 cursor-pointer flex items-center hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <IoArrowBack className="w-6 h-6 mr-2" />
                Reset Filters
              </li>
              {uniqueCities.map((city) => (
                <li
                  key={city}
                  onClick={() => filterByArea(city)}
                  className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {city}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Hospital Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredHospitals.map((hospital: Hospital) => (
            <div
              key={hospital._id}
              className={`border rounded-lg shadow-lg p-4 flex flex-col justify-between ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              }`}
            >
              {/* Hospital Image */}
              <Image
  src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAwZzRQ7tsDjsz2-eE_Dw6b9A9uO5sGxQxHA&s"}
  alt={hospital.hospitalName}
  width={600}
  height={200}
  className="h-40 w-full object-cover rounded-t-lg"
/>
              <div className="mt-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <FaHospital className="text-blue-500 mr-2" />
                  {hospital.hospitalName}
                </h3>
                <p className="text-sm flex items-center mt-2">
                  <FaMapMarkerAlt className="text-red-500 mr-2" />
                  {hospital.city}, {hospital.state}, {hospital.country}
                </p>
                <p className="text-sm flex items-center mt-2">
                  <FaStar className="text-yellow-500 mr-2" />
                  Pincode: {hospital.pincode}
                </p>
                <p className="text-sm flex items-center mt-2">
                  Contact: {hospital.contactNumber}
                </p>
                <p className="text-sm flex items-center mt-2">
                  Email: {hospital.email}
                </p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <a
                  href={hospital.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 font-bold"
                >
                  Visit Website
                </a>
                <a
                  href="#"
                  className="text-blue-500 font-bold"
                  onClick={() =>
                    alert(
                      `Contact ${hospital.authorisedPersonName} (${hospital.authorisedPersonDesignation})`
                    )
                  }
                >
                  Contact Person
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;