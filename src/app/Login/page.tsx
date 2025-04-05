"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { FaSpinner } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { FaSignInAlt } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    setDarkMode(storedDarkMode === "1");
  }, [])

const handleLogin = async () => {
  if (!email || !password || !role) {
    toast.error("Please fill in all fields.");
    return;
  }

  setLoading(true);
  try {
    const response = await axios.post(
      "https://donix-org-aman.onrender.com/login",
      { email, password, role },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Include cookies and credentials
      }
    );

    const data = response.data;

    Cookies.set("token", data.token, {
      expires: 7,
      path: "/",
      sameSite: "strict",
    });
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("role", JSON.stringify(role));
    toast.success("Login successful!");

    if (role === "user") {
      window.location.href = "/dashboard";
    } else if (role === "hospital") {
      window.location.href = "/hospitalDashboard";
    } else if (role === "admin") {
      window.location.href = "/AdminDashboard";
    }
  } catch (error) {
    console.error("Error during login:", error);
    const errorMessage =
      error.response?.data?.error || "An error occurred. Please try again.";
    toast.error(`Login failed: ${errorMessage}`);
  } finally {
    setLoading(false);
  }
};
  return (
    <div
      className={`min-h-screen flex justify-center items-center p-4 md:p-8 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div
        className={`max-w-lg w-full mx-auto p-6 shadow-2xl rounded-xl border mt-10 transition-colors duration-300 ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"
        }`}
      >
        <h2
          className={`text-2xl sm:text-3xl font-bold w-full flex items-center justify-center gap-3 mb-6 ${
            darkMode ? "text-blue-300" : "text-blue-700"
          }`}
        >
          <FaSignInAlt className="text-3xl" /> Login
        </h2>
        
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              placeholder="Enter your password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="hospital">Hospital</option>
            </select>
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={handleLogin}
              disabled={loading}
              className="w-full px-6 py-3 text-lg font-semibold flex justify-center items-center gap-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? <FaSpinner className="animate-spin" /> : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
