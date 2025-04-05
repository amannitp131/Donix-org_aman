"use client";
import React, { useEffect, useState } from "react";

// Defining a TypeScript interface for each blog
interface Blog {
  _id: string;
  title: string;
  description: string;
  donationLink: string;
  imageUrl: string;
  isFeatured?: boolean;
}

const Page: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]); 
  const [error, setError] = useState<string | null>(null); 
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    // Retrieve darkMode value from localStorage
    const storedDarkMode = localStorage.getItem("darkMode");
    setDarkMode(storedDarkMode === "1");

    // Set dark mode on the body
    if (storedDarkMode === "1") {
      document.body.setAttribute("data-theme", "dark");
    } else {
      document.body.removeAttribute("data-theme");
    }

    // Fetch blogs from the backend
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:10000/getAllBlogs");
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch blogs.");
        }
        const data = await response.json();
        setBlogs(data.articles); // Set blogs to the fetched articles
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      }finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  
  if (loading) {
    return <p>Loading blogs...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div
  className={`campaign_page min-h-screen py-10 ${
    darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-900"
  }`}
>
  <div className="content max-w-7xl mx-auto px-6">
  <h1
      className={`text-4xl font-extrabold text-center mb-10 ${
        darkMode
          ? "text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-500"
          : "text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500"
      }`}
    >
      Explore Our Blogs
    </h1>
  
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogs.map((blog, index) => (
        <li
          key={index}
          className={`member relative rounded-lg shadow-lg transition-transform transform hover:scale-105 p-6 ${
            darkMode
              ? "bg-gradient-to-br from-gray-800 to-gray-900 hover:shadow-2xl"
              : "bg-gradient-to-br from-gray-100 to-gray-200 hover:shadow-2xl"
          }`}
        >
          {/* Thumbnail */}
          <div
            className={`thumb relative w-full h-40 rounded-lg overflow-hidden shadow-md ${
              darkMode ? "bg-gray-700" : "bg-gray-300"
            }`}
          >
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-full object-cover transition-transform transform hover:scale-110"
            />
          </div>

          {/* Description */}
          <div className="description mt-4">
            <h3
              className={`text-lg font-bold ${
                darkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              {blog.title}
            </h3>
            <p
              className={`text-sm mt-2 ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {blog.description}
            </p>
            <a
              href={blog.donationLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-block mt-4 px-4 py-2 font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 ${
                darkMode
                  ? "bg-gradient-to-r from-gray-700 to-gray-900 text-gray-200 hover:shadow-lg"
                  : "bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:shadow-lg"
              }`}
            >
              Learn More
            </a>
          </div>

          {/* 3D Effect */}
          <div
            className={`absolute inset-0 rounded-lg transition-opacity ${
              darkMode
                ? "bg-gradient-to-br from-gray-700 to-gray-900 opacity-0 hover:opacity-20"
                : "bg-gradient-to-br from-purple-500 to-indigo-500 opacity-0 hover:opacity-20"
            }`}
          ></div>
        </li>
      ))}
    </ul>
  </div>
</div>
  );
};

export default Page;