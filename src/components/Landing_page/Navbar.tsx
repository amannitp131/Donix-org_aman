"use client";
import React, { useState, useEffect, useRef } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { FaUserEdit, FaBuilding, FaLightbulb } from "react-icons/fa";
import { FiChevronsDown, FiChevronsUp } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

const menuItems = [
  {
    title: "Register",
    icon: <FaUserEdit />,
    links: [
      // { name: "Admin", path: "/AdminRegistration" },
      { name: "User Registration", path: "/UserRegistration" },
      { name: "Hospital & NGO Registration", path: "/HospitalRegistration" },
    ],
  },
  {
    title: "Hospitals & Partners",
    icon: <FaBuilding />,
    links: [
      { name: "Verified Hospitals", path: "/hospitals/verified" },
      { name: "NGO & Partner List", path: "/hospitals/ngo-partners" },
      { name: "Government Agencies", path: "/hospitals/government" },
    ],
  },
  {
    title: "Awareness Campaigns",
    icon: <FaLightbulb />,
    links: [
      { name: "Upcoming Webinars", path: "/campaigns/webinars" },
      // { name: "Organ Donation Events", path: "/campaigns/events" },
      { name: "Awareness Articles", path: "/campaigns/articles" },
    ],
  },
];

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement[]>([]);
  const collapseTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Load dark mode preference from localStorage
    const storedMode = localStorage.getItem("darkMode") === "1";
    setDarkMode(storedMode);
     document.documentElement.classList.toggle("dark", storedMode);
  }, [setDarkMode]);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    // GSAP Animations with context
    const ctx = gsap.context(() => {
      gsap.from(logoRef.current, {
        opacity: 0,
        y: -20,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(menuRef.current, {
        opacity: 0,
        y: -20,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, navbarRef);

    // Cleanup animations when the component unmounts
    return () => ctx.revert();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", newMode ? "1" : "0");
      document.documentElement.classList.toggle("dark", newMode);
      return newMode;
    });
  };

  const toggleMenu = (menuTitle: string) => {
    setActiveMenu(activeMenu === menuTitle ? null : menuTitle);
  };

  const handleMouseEnter = (menuTitle: string) => {
    if (collapseTimeout.current) {
      clearTimeout(collapseTimeout.current);
    }
    setHoveredMenu(menuTitle);
  };

  const handleMouseLeave = () => {
    collapseTimeout.current = setTimeout(() => {
      setHoveredMenu(null);
    }, 500); // 0.5 second delay
  };

  return (
    <nav
      ref={navbarRef}
      className={`fixed top-0 left-0 w-full z-50 transition duration-300 shadow-lg ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <div className="container flex items-center justify-between p-4 mx-auto">
        {/* Logo */}
        <div ref={logoRef} className="flex items-center gap-4">
          <Image
            src={darkMode ? "/dark_logo.png" : "/Light_logo.png"}
            alt="Logo"
            width={100}
            height={48}
            className="h-12 w-auto"
          />
        </div>

        {/* Menu Items */}
        <div className="flex items-center gap-4 md:gap-8">
          {menuItems.map((menu, index) => (
            <div
              key={menu.title}
              ref={(el) => {
                if (el) menuRef.current[index] = el;
              }}
              className="relative group"
              onMouseEnter={() => handleMouseEnter(menu.title)}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => toggleMenu(menu.title)}
                className="flex items-center gap-2 hover:text-blue-500 dark:hover:text-blue-300 cursor-pointer"
              >
                {menu.icon}
                <span className="hidden md:inline-flex">{menu.title}</span>
                {hoveredMenu === menu.title || activeMenu === menu.title ? (
                  <FiChevronsUp />
                ) : (
                  <FiChevronsDown />
                )}
              </button>
              {/* Dropdown Menu */}
              <div
                className={`absolute right-0 mt-2 shadow-lg rounded-lg p-2 min-w-[200px] ${
                  darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
                } ${
                  hoveredMenu === menu.title || activeMenu === menu.title
                    ? "block"
                    : "hidden"
                }`}
              >
                {menu.links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    className={`block px-4 py-2 rounded cursor-pointer ${
                      darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
                    }`}
                    onClick={() => setActiveMenu(null)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="text-2xl focus:outline-none hover:text-blue-500 dark:hover:text-blue-300 transition duration-300"
        >
          {darkMode ? <MdLightMode /> : <MdDarkMode />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;