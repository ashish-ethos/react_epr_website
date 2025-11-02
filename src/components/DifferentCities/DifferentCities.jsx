import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Building2 } from "lucide-react";
import { RiBuilding2Line, RiMapPin2Line, RiLineChartLine, RiArrowRightLine } from "react-icons/ri";
import AdvancedPropertySearch from './AdvancedPropertySearch';
import { properties } from "../../data/propertiesData";
import Gurgaon from "../../assets/images/about/gurgaon.webp";
import Mumbai from "../../assets/images/about/bombay.jpg";
import Delhi from "../../assets/images/about/delhi.webp";
import Bangalore from "../../assets/images/about/bangalore.jpeg";

function DifferentCities() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Filter states
  const [countryId, setCountryId] = useState([]);
  const [stateId, setStateId] = useState([]);
  const [cityId, setCityId] = useState([]);
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

  // Map properties to expected structure
  const mappedProperties = useMemo(() => properties.map((property) => {
    const propertyType = property.type.toLowerCase();
    const propertyCategory = property.category.toLowerCase();
    let routeType = "residential";
    if (propertyType.includes("commercial") || propertyType.includes("shop") || propertyType.includes("office") || propertyCategory.includes("investment")) {
      routeType = "commercial";
    } else if (propertyType.includes("apartment") || propertyType.includes("residential") || propertyType.includes("villa") || propertyType.includes("studio")) {
      routeType = "residential";
    }

    let areaValue = 0;
    const sizeMatch = property.size.match(/(\d+(?:\.\d+)?)/g);
    if (sizeMatch && sizeMatch.length > 0) {
      areaValue = parseInt(sizeMatch[0]) || 0;
    } else if (property.size.includes("On Request")) {
      areaValue = 0;
    }

    let priceValue = 0;
    if (!property.price.includes("On Request") && !property.price.includes("Request")) {
      const priceNum = parseFloat(property.price.replace(/[^0-9.]/g, ""));
      if (!isNaN(priceNum)) {
        priceValue = priceNum * (property.price.includes("Cr") ? 10000000 : 100000);
      }
    }

    let normalizedStatus = "Available";
    if (property.status && property.status.length > 0) {
      const firstStatus = property.status[0];
      normalizedStatus = firstStatus
        .replace("FOR SALE", "For Sale")
        .replace("FOR RENT", "For Rent")
        .replace("NEW LAUNCH", "New Launch")
        .replace("HOT OFFER", "Hot Offer");
    } else if (property.options && property.options.includes("SOLD OUT")) {
      normalizedStatus = "Sold";
    }

    const featured = (property.options || []).some(opt => 
      opt.includes("HOT OFFER") || opt.includes("FEATURED") || opt.includes("LUXURY")
    );

    const bedsMin = property.bedrooms ? property.bedrooms.min : 0;
    const bedsMax = property.bedrooms ? property.bedrooms.max : 0;
    const bedsRange = bedsMin > 0
      ? (bedsMin === bedsMax ? `${bedsMin} Bed${bedsMin !== 1 ? 's' : ''}` : `${bedsMin}-${bedsMax} Beds`)
      : 'On Request';

    const bathsMin = property.bathrooms ? property.bathrooms.min : 0;
    const bathsMax = property.bathrooms ? property.bathrooms.max : 0;
    const bathsRange = bathsMin > 0
      ? (bathsMin === bathsMax ? `${bathsMin} Bath${bathsMin !== 1 ? 's' : ''}` : `${bathsMin}-${bathsMax} Baths`)
      : 'On Request';

    let yearBuiltYears = (property.yearBuilt || []).map(y => parseInt(y));
    if (yearBuiltYears.length === 0) yearBuiltYears = [2020];
    const yearBuiltMax = Math.max(...yearBuiltYears);
    const yearBuiltList = property.yearBuilt || [];

    let sectorArea = property.location.split(",")[0].trim();
    const sectorMatch = property.location.match(/Sector (\d+)/i);
    if (sectorMatch) {
      sectorArea = `Sector ${sectorMatch[1]}, Gurgaon`;
    }

    let stateIdValue = 4030; // Default Haryana
    let cityIdValue = 57510; // Default Gurgaon
    const locLower = property.location.toLowerCase();
    if (locLower.includes("uttar pradesh") || locLower.includes("noida")) {
      stateIdValue = 4031;
      cityIdValue = 57511;
    } else if (locLower.includes("delhi")) {
      stateIdValue = 4047;
      cityIdValue = 57650;
    } else if (locLower.includes("uttarakhand")) {
      stateIdValue = 4001; // Uttarakhand
      cityIdValue = 60001; // Nainital approx
    }

    return {
      ...property,
      id: property.id,
      name: property.name,
      location: property.location,
      area: sectorArea,
      areaValue: areaValue,
      type: routeType,
      price: property.price,
      priceValue: priceValue,
      status: normalizedStatus,
      featured: featured,
      label: featured ? "featured" : null,
      bedroomsMin: bedsMin,
      bedroomsMax: bedsMax,
      bedsRange: bedsRange,
      bathroomsMin: bathsMin,
      bathroomsMax: bathsMax,
      bathsRange: bathsRange,
      yearBuilt: yearBuiltMax,
      yearBuiltList: yearBuiltList,
      size: property.size,
      image: property.image,
      countryId: 101,
      stateId: stateIdValue,
      cityId: cityIdValue,
      bedrooms: bedsRange,
      bathrooms: bathsRange,
    };
  }), [properties]);

  const featuredCities = [
    { name: "Mumbai", growth: "+18%", icon: <Building2 className="w-5 h-5 text-gray-400" />, image: Mumbai },
    { name: "Gurgaon", growth: "+22%", icon: <Building2 className="w-5 h-5 text-gray-400" />, image: Gurgaon },
    { name: "Bangalore", growth: "+15%", icon: <Building2 className="w-5 h-5 text-gray-400" />, image: Bangalore },
    { name: "Delhi", growth: "+20%", icon: <Building2 className="w-5 h-5 text-gray-400" />, image: Delhi },
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
      <div className="relative z-10 h-auto py-4 sm:py-0 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-full sm:max-w-5xl mx-auto text-center">
          <div className={`inline-flex items-center gap-2 mb-6 sm:mb-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="w-8 sm:w-12 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
            <RiBuilding2Line className="text-yellow-400 animate-pulse" size={16} />
            <div className="w-8 sm:w-12 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
          </div>
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-black mb-6 sm:mb-8 transition-all duration-1200 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
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
                  onClick={showDrawer}
                  className="group bg-black/20 backdrop-blur-sm rounded-xl p-2 cursor-pointer border border-yellow-400/20
               hover:bg-black/30 hover:border-yellow-400/40 transition-all duration-300 hover:scale-105
               hover:shadow-xl w-full sm:w-[230px]"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="w-full h-28 sm:h-32 rounded-lg overflow-hidden mb-3">
                    <img
                      src={city.image}
                      alt={city.name}
                      className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-all duration-500"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-semibold text-sm sm:text-base">{city.name}</div>
                      <div className="flex items-center gap-1 text-yellow-400 text-xs sm:text-sm">
                        <RiLineChartLine /> {city.growth}
                      </div>
                    </div>
                    <div className="text-yellow-400 text-xl">{city.icon}</div>
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
                <RiMapPin2Line className="group-hover:scale-125 group-hover:text-yellow-300 transition-transform duration-300" size={16} />
                <span className="tracking-wide cursor-pointer group-hover:text-yellow-200 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-300">
                  Explore Properties by Cities
                </span>
                <RiArrowRightLine className="group-hover:translate-x-2 group-hover:rotate-12 text-yellow-300 transition-all duration-300" size={16} />
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
        properties={mappedProperties}
      />
    </div>
  );
}

export default DifferentCities;