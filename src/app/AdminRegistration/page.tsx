"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FaEye, FaEyeSlash, FaUserShield } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function AdminRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "SuperAdmin",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Retrieve darkMode value from localStorage
    const storedDarkMode = localStorage.getItem("darkMode");
    setDarkMode(storedDarkMode === "1");
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhoneNumber = (phone: string) => /^\d{10}$/.test(phone);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email address.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone Number is required.";
    } else if (!validatePhoneNumber(formData.phone)) {
      newErrors.phone = "Phone Number must be 10 digits.";
    }
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (!formData.password.trim()) newErrors.password = "Password is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      const { name, email, password, phone, address, role } = formData;
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/register/sign-up`,
        { name, email, password, phone, address, role }
      );

      toast.success(
        "Registered successfully. Please check your email for verification. Also check your spam folder."
      );
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        role: "SuperAdmin",
      });
    } catch (error) {
      // Use AxiosError type for the error object
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Registration failed! Please try again later.");
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }

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
          <FaUserShield className="text-3xl" /> Admin Registration
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <input
            type="text"
            name="name"
            autoComplete="off"
            placeholder="Full Name *"
            value={formData.name}
            onChange={handleChange}
            required
            className={`w-full p-2 sm:p-3 border rounded-lg shadow-sm focus:ring-2 transition-all ${
              darkMode
                ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-500 hover:border-blue-400"
                : "bg-white text-gray-900 border-gray-300 focus:ring-blue-500 hover:border-blue-600"
            }`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          {/* Email Address */}
          <input
            type="email"
            name="email"
            placeholder="Email Address *"
            autoComplete="off"
            value={formData.email}
            onChange={handleChange}
            required
            className={`w-full p-2 sm:p-3 border rounded-lg shadow-sm focus:ring-2 transition-all ${
              darkMode
                ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-500 hover:border-blue-400"
                : "bg-white text-gray-900 border-gray-300 focus:ring-blue-500 hover:border-blue-600"
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          {/* Phone Number */}
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number *"
            value={formData.phone}
            onChange={handleChange}
            autoComplete="off"
            required
            className={`w-full p-2 sm:p-3 border rounded-lg shadow-sm focus:ring-2 transition-all ${
              darkMode
                ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-500 hover:border-blue-400"
                : "bg-white text-gray-900 border-gray-300 focus:ring-blue-500 hover:border-blue-600"
            }`}
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

          {/* Address */}
          <input
            type="text"
            name="address"
            placeholder="Address *"
            autoComplete="off"
            value={formData.address}
            onChange={handleChange}
            required
            className={`w-full p-2 sm:p-3 border rounded-lg shadow-sm focus:ring-2 transition-all ${
              darkMode
                ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-500 hover:border-blue-400"
                : "bg-white text-gray-900 border-gray-300 focus:ring-blue-500 hover:border-blue-600"
            }`}
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="off"
              placeholder="Password *"
              value={formData.password}
              onChange={handleChange}
              required
              className={`w-full p-2 sm:p-3 border rounded-lg shadow-sm focus:ring-2 transition-all ${
                darkMode
                  ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-500 hover:border-blue-400"
                  : "bg-white text-gray-900 border-gray-300 focus:ring-blue-500 hover:border-blue-600"
              }`}
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-black dark:text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          {/* Submit Button */}
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
              "Register"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}