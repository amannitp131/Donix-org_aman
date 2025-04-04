"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import heroImage from "../../../public/hero_image.png";
import Link from "next/link";
import gsap from "gsap";

interface HeroProps {
  darkMode: boolean;
}

const Hero: React.FC<HeroProps> = ({ darkMode }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { duration: 1.5, ease: "power3.out" },
      });

      // Animate the image
      timeline.from(imageRef.current, {
        opacity: 0,
        x: -100,
      });

      // Animate the text
      timeline.from(
        textRef.current,
        {
          opacity: 0,
          y: 50,
          stagger: 0.2, // Stagger animation for child elements
        },
        "-=0.5" // Overlap with the previous animation
      );

      // Animate the buttons
      timeline.from(
        buttonsRef.current,
        {
          opacity: 0,
          scale: 0.8,
          stagger: 0.2,
        },
        "-=0.5"
      );
    }, sectionRef);

    // Cleanup animations when the component unmounts
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className={`flex flex-col md:flex-row items-center justify-between h-screen px-6 md:px-20 transition-all duration-500 ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        {/* Left Image */}
        <div
          ref={imageRef}
          className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0"
        >
          <div className="relative w-80 md:w-96 lg:w-[500px] h-auto">
            <Image
              src={heroImage}
              alt="Hero Image"
              className="rounded-lg"
              width={500}
              height={900}
            />
            <div
              className={`absolute -top-4 -left-4 w-16 h-16 bg-blue-400 rounded-full animate-pulse opacity-70 ${
                darkMode ? "block" : "hidden"
              }`}
            ></div>
            <div
              className={`absolute -bottom-6 -right-6 w-24 h-24 bg-pink-400 rounded-full opacity-50 blur-lg ${
                darkMode ? "block" : "hidden"
              }`}
            ></div>
          </div>
        </div>

        {/* Right Content */}
        <div
          ref={textRef}
          className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Welcome to <span className="text-blue-500">Donix</span>
          </h1>
          <p
            className={`text-lg ${
              darkMode ? "text-white" : "text-black-300"
            }`}
          >
            Discover the power of modern technology and innovation. Join us to
            explore endless possibilities.
          </p>
          <div
            ref={buttonsRef}
            className="flex flex-col md:flex-row gap-4 mt-4"
          >
            <button className="px-6 py-3 text-lg font-semibold bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 transition-all duration-300 cursor-pointer">
              Available organs
            </button>
            <Link href="/Login">

              <button className="px-6 py-3 text-lg font-semibold bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-lg shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300">
                Login


              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;