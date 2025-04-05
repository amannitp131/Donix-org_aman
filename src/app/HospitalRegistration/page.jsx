"use client";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FaUserShield } from "react-icons/fa";
import axios from "axios";
import { LiaHospitalSolid } from "react-icons/lia";

export default function UserRegistrationForm() {
  const [formData, setFormData] = useState({
    hospitalName: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    contactNumber: "",
    email: "",
    website: "",
    authorisedPersonName: "",
    authorisedPersonDesignation: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Retrieve darkMode value from localStorage
    const storedDarkMode = localStorage.getItem("darkMode");
    setDarkMode(storedDarkMode === "1");
  }, []);

  // Validation functions
  const validatePhoneNumber = (phoneNumber) => /^\d{10}$/.test(phoneNumber);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  
    // Validate fields on change
    let error = "";
    if (name === "contactNumber") {
      error = validatePhoneNumber(value) ? "" : "Contact Number must be 10 digits.";
    } else if (name === "email") {
      error = validateEmail(value) ? "" : "Invalid email address.";
    } else if (!value.trim()) {
      error = `${name.replace(/([A-Z])/g, " $1")} is required.`;
    }
  
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate all fields before submission
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]?.trim()) {
        newErrors[key] = `${key.replace(/([A-Z])/g, " $1")} is required.`;
      }
    });

    if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email address.";
    }
    if (!validatePhoneNumber(formData.contactNumber)) {
      newErrors.contactNumber = "Contact Number must be 10 digits.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      // Register the user
      const response = await axios.post(
        "http://localhost:10000/hospitalRegistration",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response.data);
      toast.success(response.data.message);

      // Clear the form data
      setFormData({
        hospitalName: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
        contactNumber: "",
        email: "",
        website: "",
        authorisedPersonName: "",
        authorisedPersonDesignation: "",
        password: "",
      });
      window.location.href = "/Login";
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      toast.error(
        error.response?.data?.message || "Registration failed. Please try again."
      );
    }
   // Redirect to home page on failure
   setTimeout(() => {
    window.location.href = "/";
  }, 3000); 
    setLoading(false);
  };

  return (
    <div
      className={`min-h-screen flex justify-center items-center p-4 md:p-8 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <ToastContainer theme={darkMode ? "dark" : "light"} />
      <div
        className={`max-w-2xl w-full mx-auto p-6 shadow-2xl rounded-xl border mt-10 transition-colors duration-300 ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"
        }`}
      >
        <h2
          className={`text-2xl sm:text-3xl font-bold w-full flex items-center justify-center gap-3 mb-6 ${
            darkMode ? "text-blue-300" : "text-blue-700"
          }`}
        >
          <LiaHospitalSolid className="text-3xl" /> Hospital Registration
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {Object.keys(formData).map((key) => (
            <div key={key}>
              <input
                type={key === "password" ? "password" : "text"}
                name={key}
                placeholder={`${key.replace(/([A-Z])/g, " $1")} *`}
                value={formData[key]}
                onChange={handleChange}
                className={`w-full p-2 sm:p-3 border rounded-lg shadow-sm focus:ring-2 transition-all ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-500 hover:border-blue-400"
                    : "bg-white text-gray-900 border-gray-300 focus:ring-blue-500 hover:border-blue-600"
                }`}
              />
              {errors[key] && (
                <p className="text-red-500 text-sm mt-1">{errors[key]}</p>
              )}
            </div>
          ))}
          <button
            type="submit"
            disabled={loading}
            className={`w-full h-[44px] sm:h-[48px] p-2 sm:p-3 font-semibold rounded-lg transition-all cursor-pointer flex justify-center items-center ${
              darkMode
                ? "bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-70"
                : "bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-70"
            }`}
          >
            {loading ? (
              <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Register Hospital"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}