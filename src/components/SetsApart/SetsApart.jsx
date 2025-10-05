import React, { useState, useEffect } from "react";
import "./SetsApart.css";

const stats = [
  { value: "2+", label: "Years of Experience", numericValue: 2 },
  { value: "2,000+", label: "Happy Clients", numericValue: 2000 },
  { value: "40+", label: "Affiliate Partners", numericValue: 40 },
  { value: "1,200+", label: "Properties Sold", numericValue: 1200 },
];

const StatCard = ({ value, label, delay, numericValue }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
          animateCounter();
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById(`stat-card-${numericValue}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [numericValue, isInView]);

  const animateCounter = () => {
    let start = 0;
    const end = numericValue;
    const duration = 2;
    const incrementTime = (duration * 1000) / end;

    setTimeout(() => {
      const counter = setInterval(() => {
        start += Math.ceil(end / (duration * 1000 / incrementTime));
        if (start >= end) {
          setDisplayValue(value);
          clearInterval(counter);
        } else {
          setDisplayValue(
            start >= 1000
              ? `${Math.floor(start / 1000)},${(start % 1000).toString().padStart(3, "0")}+`
              : `${start}+`
          );
        }
      }, incrementTime);
    }, delay * 1000);
  };

  return (
    <div
      id={`stat-card-${numericValue}`}
      className=" mobile-card-setaspart group relative bg-[#333] border border-[#ffffff38] rounded-2xl p-8 sm:p-4 hover:border-[#c99913] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-black/40 overflow-hidden"
      style={{
        animation: `slideUp 0.8s ease-out forwards ${delay}s`,
        opacity: 0,
        transform: 'translateY(30px)'
      }}
    >
      {/* Card shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c99913]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
      
      {/* Top corner accent */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#c99913]/30 group-hover:border-[#c99913] transition-colors duration-300"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#c99913]/30 group-hover:border-[#c99913] transition-colors duration-300"></div>
      
      <div className="relative text-center">
        <h3 className="text-4xl md:text-5xl font-black text-[#c2c6cb] group-hover:text-[#c99913] transition-colors duration-300 mb-3 tracking-tight">
          {displayValue}
        </h3>
        <p className="text-[#c2c6cb]/70 group-hover:text-[#c2c6cb] text-sm font-medium tracking-wide leading-relaxed">
          {label}
        </p>
      </div>
      
      {/* Bottom accent line */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c99913] to-[#c99913] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-center"></div> */}
      
      {/* Side accent dot */}
      <div className="absolute top-4 left-4 w-2 h-2 bg-[#ffffff38] rounded-full group-hover:bg-[#c99913] group-hover:scale-125 transition-all duration-300"></div>
    </div>
  );
};

const SetsApart = () => {
  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-[#333] to-gray-800 py-10 px-4" id="sets-apart">
      
      {/* Clean Square Grid Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(201, 153, 19, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(201, 153, 19, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Floating Square Boxes - More Visible */}
        <div className="absolute top-20 left-20 w-16 h-16 border-2 border-[#c99913]/40 bg-[#c99913]/5 rotate-45 animate-float-slow shadow-lg"></div>
        <div className="absolute top-40 right-32 w-12 h-12 border-2 border-[#c99913]/50 bg-[#c99913]/8 rotate-12 animate-float-medium shadow-md"></div>
        <div className="absolute bottom-32 left-40 w-20 h-20 border-2 border-[#c99913]/35 bg-[#c99913]/4 -rotate-12 animate-float-slow shadow-lg"></div>
        <div className="absolute bottom-20 right-20 w-14 h-14 border-2 border-[#c99913]/45 bg-[#c99913]/6 rotate-45 animate-float-fast shadow-md"></div>
        <div className="absolute top-1/2 left-1/4 w-10 h-10 border-2 border-[#c99913]/40 bg-[#c99913]/7 rotate-90 animate-float-medium shadow-sm"></div>
        <div className="absolute top-1/3 right-1/3 w-18 h-18 border-2 border-[#c99913]/30 bg-[#c99913]/5 -rotate-45 animate-float-slow shadow-md"></div>
        <div className="absolute top-60 left-1/2 w-8 h-8 border-2 border-[#c99913]/50 bg-[#c99913]/8 rotate-180 animate-float-fast shadow-sm"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 border-2 border-[#c99913]/35 bg-[#c99913]/6 rotate-75 animate-float-medium shadow-md"></div>
      </div>

      {/* Header Section */}
      <div className="relative z-10 max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-[#c2c6cb] via-[#c99913] to-[#c2c6cb] bg-clip-text text-transparent">
          What Sets Us Apart
        </h2>
        <div className="h-1 bg-gradient-to-r from-transparent via-[#c99913] to-transparent rounded-full max-w-md mx-auto"></div>
      </div>

      {/* Stats Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {stats.map((item, index) => (
          <StatCard
            key={index}
            value={item.value}
            label={item.label}
            numericValue={item.numericValue}
            delay={index * 0.2}
          />
        ))}
      </div>

      
    </div>
  );
};

export default SetsApart;