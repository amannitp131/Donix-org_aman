import React, { useEffect, useState } from "react";

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({ visitors: 0, users: 0, hospitals: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector(".stats-section");
      const rect = section.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isVisible) {
      let start = 0;
      const duration = 2000; // 2 seconds
      const interval = 10; // Update every 10ms
      const steps = duration / interval;

      const incrementVisitors = Math.ceil(1234567 / steps);
      const incrementUsers = Math.ceil(567890 / steps);
      const incrementHospitals = Math.ceil(1234 / steps);

      const intervalId = setInterval(() => {
        setCounts((prev) => {
          const newCounts = {
            visitors: Math.min(prev.visitors + incrementVisitors, 1234567),
            users: Math.min(prev.users + incrementUsers, 567890),
            hospitals: Math.min(prev.hospitals + incrementHospitals, 1234),
          };

          if (
            newCounts.visitors === 1234567 &&
            newCounts.users === 567890 &&
            newCounts.hospitals === 1234
          ) {
            clearInterval(intervalId);
          }

          return newCounts;
        });
      }, interval);
    }
  }, [isVisible]);

  return (
    <section className="relative h-[60vh] flex items-center justify-center bg-transparent stats-section">
    {/* Background Image */}
    <div className="absolute inset-0 bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_b4oPA3vPwVNnrVXjmrDiklGKqHzzgoFwHA&s')] bg-cover bg-center filter blur-sm z"></div>
    
    {/* Overlay */}
    <div className="absolute inset-0 bg-opacity-30 flex items-center justify-center">
      <div className="flex gap-10 z-10 flex-nowrap justify-center">
        {/* Total Visitors */}
        <div className="bg-white bg-opacity-20 rounded-xl backdrop-blur-md p-5 text-center text-black shadow-lg transition-transform duration-300 flex-1 max-w-[300px] hover:translate-y-[-10px] hover:shadow-2xl">
          <h3 className="text-2xl mb-2">Total Visitors</h3>
          <p className="text-xl font-bold">{counts.visitors.toLocaleString()}</p>
        </div>
  
        {/* Total Users */}
        <div className="bg-white bg-opacity-20 rounded-xl backdrop-blur-md p-5 text-center text-black shadow-lg transition-transform duration-300 flex-1 max-w-[300px] hover:translate-y-[-10px] hover:shadow-2xl">
          <h3 className="text-2xl mb-2">Total Users</h3>
          <p className="text-xl font-bold">{counts.users.toLocaleString()}</p>
        </div>
  
        {/* Total Hospitals Registered */}
        <div className="bg-white bg-opacity-20 rounded-xl backdrop-blur-md p-5 text-center text-black shadow-lg transition-transform duration-300 flex-1 max-w-[300px] hover:translate-y-[-10px] hover:shadow-2xl">
          <h3 className="text-2xl mb-2">Total Hospitals Registered</h3>
          <p className="text-xl font-bold">{counts.hospitals.toLocaleString()}</p>
        </div>
      </div>
    </div>
  </section>
  );
};

export default StatsSection;