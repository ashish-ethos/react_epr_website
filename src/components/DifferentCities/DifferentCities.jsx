import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "antd";
import { Building2 } from "lucide-react";
import { RiBuilding2Line, RiMapPin2Line, RiLineChartLine, RiArrowRightLine } from "react-icons/ri";
import AdvancedPropertySearch from './AdvancedPropertySearch';
import { allProjectPropertyDetails } from "../../data/propertyDetailsData";

function DifferentCities() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [open, setOpen] = useState(false);
  const [size] = useState("large");
  const navigate = useNavigate();
  const location = useLocation();

  // Dynamic location state
  const [countryId, setCountryId] = useState([]);
  const [stateId, setStateId] = useState([]);
  const [cityId, setCityId] = useState([]);

  // Filter state
  const [area, setArea] = useState([]);
  const [status, setStatus] = useState([]);
  const [type, setType] = useState([]);
  const [bedrooms, setBedrooms] = useState([]);
  const [bathrooms, setBathrooms] = useState([]);
  const [minArea, setMinArea] = useState(0);
  const [maxArea, setMaxArea] = useState(10000);
  const [label, setLabel] = useState([]);
  const [yearBuilt, setYearBuilt] = useState([]);
  const [priceRange, setPriceRange] = useState([1000000, 1000000000]);

  const properties = allProjectPropertyDetails.map((property) => {
    // Determine the type for routing (residential or commercial)
    const propertyType = property.type.toLowerCase();
    const propertyCategory = property.category.toLowerCase();
    let routeType = "residential";
    if (
      propertyType.includes("commercial") ||
      propertyCategory.includes("investment")
    ) {
      routeType = "commercial";
    } else if (
      propertyType.includes("apartment") ||
      propertyType.includes("residential") ||
      propertyType.includes("villa") ||
      propertyType.includes("studio")
    ) {
      routeType = "residential";
    }

    return {
      id: property.id,
      name: property.name,
      location: property.location,
      area: property.location.split(",")[0].trim(), 
      areaValue: parseInt(property.sqft) || 0, 
      type: routeType, 
      price: property.price,
      priceValue: property.price.includes("On Request")
        ? 0
        : parseFloat(property.price.replace(/[^0-9.]/g, "")) * (property.price.includes("Cr") ? 10000000 : 100000),
      status: property.status[0],
      featured: property.featured,
      label: property.featured ? "featured" : null,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      yearBuilt: 2020, 
      image: property.image,
      countryId: 101, 
      stateId: property.location.includes("Haryana") ? 4030 : property.location.includes("Uttar Pradesh") ? 4031 : 4047,
      cityId: property.location.includes("Gurgram") ? 57510 : property.location.includes("Noida") ? 57511 : 57650,
    };
  });

  // Featured cities data
  const featuredCities = [
  { name: "Mumbai", growth: "+18%", icon: <Building2 className="w-5 h-5 text-gray-400" /> },
  { name: "Gurgaon", growth: "+22%", icon: <Building2 className="w-5 h-5 text-gray-400" /> },
  { name: "Bangalore", growth: "+15%", icon: <Building2 className="w-5 h-5 text-gray-400" /> },
  { name: "Delhi", growth: "+20%", icon: <Building2 className="w-5 h-5 text-gray-400" /> },
];

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const showDrawer = () => {
    navigate("/location");
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    navigate(-1);
  };

  useEffect(() => {
    if (location.pathname === "/location") {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [location.pathname]);

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  const handleClearFilters = () => {
    setCountryId([]);
    setStateId([]);
    setCityId([]);
    setArea([]);
    setStatus([]);
    setType([]);
    setBedrooms([]);
    setBathrooms([]);
    setMinArea(0);
    setMaxArea(10000);
    setLabel([]);
    setYearBuilt([]);
    setPriceRange([1000000, 1000000000]);
  };

  return (
    <div className="relative h-auto overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black py-4 sm:py-8" id="different-cities">
      <style>
        {`
          
        `}
      </style>

      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-yellow-600/10 to-amber-600/10 animate-pulse"></div>
        <div
          className="absolute w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 rounded-full blur-3xl transition-all duration-1000"
          style={{
            left: `${mousePosition.x / 10}px`,
            top: `${mousePosition.y / 10}px`,
          }}
        ></div>
        <div className="absolute bottom-0 right-0 w-80 sm:w-[600px] h-80 sm:h-[600px] bg-gradient-to-l from-amber-500/10 to-yellow-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-24 sm:h-32 bg-gradient-to-t from-black/30 to-transparent">
        <div className="absolute bottom-0 left-0 w-full h-16 sm:h-20 bg-gradient-to-r from-transparent via-yellow-400/5 to-transparent"></div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 sm:w-2 h-1 sm:h-2 bg-yellow-400/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 h-auto py-4 sm:py-8 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-full sm:max-w-5xl mx-auto text-center">
          <div className={`inline-flex items-center gap-2 mb-6 sm:mb-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="w-8 sm:w-12 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
            <RiBuilding2Line className="text-yellow-400 animate-pulse" size={16} sm={20} />
            <div className="w-8 sm:w-12 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
          </div>

          <h1 className={`text-3xl sm:text-5xl lg:text-7xl font-black mb-6 sm:mb-8 transition-all duration-1200 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="mobile-title-text bg-gradient-to-r font-[Montserrat] from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent animate-pulse">
              Popular Places
            </span>
            <br />
            <span className="mobile-title-text bg-gradient-to-r font-[Montserrat] from-yellow-400 via-amber-300 to-white bg-clip-text text-transparent">
              to Invest
            </span>
          </h1>

          <div className={`max-w-full sm:max-w-4xl mx-auto mb-8 sm:mb-12 transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 sm:p-8 shadow-2xl border border-yellow-400/20">
              <p className="mobile-subtitle-text text-sm sm:text-lg text-gray-200 leading-relaxed font-light">
                Discover premium real estate opportunities with
                <span className="text-yellow-400 font-medium"> Ethos Pro Realtors</span>.
                Whether you're seeking a
                <span className="text-yellow-400 font-medium"> luxury residence </span>
                or a
                <span className="text-yellow-400 font-medium"> prime commercial investment</span>,
                our expertise guides you to the most sought-after locations in India's top cities.
              </p>
            </div>
          </div>

          <div className={`mb-8 sm:mb-12 transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              {featuredCities.map((city, index) => (
                <div
                  key={city.name}
                  className="group bg-black/20 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-yellow-400/20 hover:bg-black/30 hover:border-yellow-400/40 transition-all duration-300 hover:scale-105 hover:shadow-xl w-full sm:w-auto"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-xl sm:text-2xl">{city.icon}</span>
                    <div>
                      <div className="text-white font-semibold text-xs sm:text-sm">{city.name}</div>
                      <div className="flex items-center gap-1 text-yellow-400 text-[10px] sm:text-xs">
                        <RiLineChartLine size={10} sm={12} />
                        {city.growth}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-800 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <button
              onClick={showDrawer}
              className="explore-properties-mobile group relative inline-flex items-center cursor-pointer gap-3 sm:gap-4 px-8 sm:px-12 py-3 sm:py-4 bg-transparent border-2 border-yellow-300 text-gray-300 font-bold text-sm sm:text-lg rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[inset_0_0_12px_rgba(255,255,255,0.1),0_0_20px_rgba(234,179,8,0.4)] hover:border-yellow-400"
            >
              <span className="absolute left-[-75%] top-0 w-[50%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent rotate-12 group-hover:animate-[shine_1.2s_ease-in-out_forwards] pointer-events-none"></span>
              <div className="relative z-10 flex items-center gap-3 sm:gap-4 text-gray-100 group-hover:text-yellow-100 transition-colors duration-300">
                <RiMapPin2Line className="group-hover:scale-125 group-hover:text-yellow-300 transition-transform duration-300" size={16} sm={20} />
                <span className="tracking-wide cursor-pointer group-hover:text-yellow-200 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-300">
                  Explore Properties by Cities
                </span>
                <RiArrowRightLine className="group-hover:translate-x-2 group-hover:rotate-12 text-yellow-300 transition-all duration-300" size={16} sm={20} />
              </div>
              <div className="absolute inset-0 rounded-2xl pointer-events-none ring-0 group-hover:ring-2 ring-yellow-400/50 transition duration-500"></div>
            </button>
          </div>
        </div>
      </div>

      <AdvancedPropertySearch
        open={open}
        onClose={onClose}
        countryId={countryId}
        setCountryId={setCountryId}
        stateId={stateId}
        setStateId={setStateId}
        cityId={cityId}
        setCityId={setCityId}
        area={area}
        setArea={setArea}
        status={status}
        setStatus={setStatus}
        type={type}
        setType={setType}
        bedrooms={bedrooms}
        setBedrooms={setBedrooms}
        bathrooms={bathrooms}
        setBathrooms={setBathrooms}
        minArea={minArea}
        setMinArea={setMinArea}
        maxArea={maxArea}
        setMaxArea={setMaxArea}
        label={label}
        setLabel={setLabel}
        yearBuilt={yearBuilt}
        setYearBuilt={setYearBuilt}
        priceRange={priceRange}
        handlePriceChange={handlePriceChange}
        handleClearFilters={handleClearFilters}
        properties={properties}
      />
    </div>
  );
}

export default DifferentCities;