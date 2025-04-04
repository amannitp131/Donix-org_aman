
"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // For extracting query parameters
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SendOtpPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email"); // Extract email from query parameters
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Retrieve darkMode value from localStorage
    const storedDarkMode = localStorage.getItem("darkMode");
    setDarkMode(storedDarkMode === "1");

    if (!email) {
      toast.error("Email is missing. Redirecting...");
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    }
  }, [email]);

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/send-otp", { email });
      toast.success(response.data.message || "OTP sent successfully to your email!");
    } catch (error) {
      // Type guard to check if the error is an Axios error
      if (axios.isAxiosError(error)) {
        console.error("Error sending OTP:", error.response?.data || error.message);
        toast.error(error.response?.data?.error || "Failed to send OTP. Please try again.");
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/verify-otp", { email, otp });
      toast.success(response.data.message || "OTP verified successfully!");
      // Redirect to the next page after successful verification
      setTimeout(() => {
        window.location.href = "/Login"; // Replace with your desired page
      }, 2000);
    } catch (error) {
      // Typecast the error to AxiosError or handle it as a generic error
      if (axios.isAxiosError(error)) {
        console.error("Error verifying OTP:", error.response?.data || error.message);
        toast.error(error.response?.data?.error || "Failed to verify OTP. Please try again.");
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex justify-center items-center p-4 md:p-8 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <ToastContainer theme={darkMode ? "dark" : "light"} />
      <div
        className={`max-w-md w-full p-6 rounded-lg shadow-md transition-colors duration-300 ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"
        }`}
      >
        <h1
          className={`text-2xl font-bold text-center mb-4 ${
            darkMode ? "text-blue-300" : "text-blue-700"
          }`}
        >
          Verify OTP
        </h1>
        <p className="text-center text-gray-600 mb-6">
          We sent an OTP to your email: <strong>{email}</strong>
        </p>
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div>
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className={`w-full p-3 border rounded-lg shadow-sm focus:ring-2 transition-all ${
                darkMode
                  ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-500 hover:border-blue-400"
                  : "bg-white text-gray-900 border-gray-300 focus:ring-blue-500 hover:border-blue-600"
              }`}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 font-semibold rounded-lg transition-all ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : darkMode
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={handleSendOtp}
            disabled={loading}
            className={`text-blue-500 hover:underline ${
              loading ? "cursor-not-allowed text-gray-400" : ""
            }`}
          >
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
}