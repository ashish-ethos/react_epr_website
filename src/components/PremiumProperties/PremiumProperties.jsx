import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import DLFCamellias from "../../assets/images/premiumproperties/dlfthecamilias.jpg";
import ElanTheEmperor from "../../assets/images/premiumproperties/Elan-The-Emperor.jpg";
import KrisumiWaterfall from "../../assets/images/premiumproperties/krisumiwaterfall.jpg";
import M3Mmansion from "../../assets/images/premiumproperties/m3mmansion.jpg";
import DLFTheCrest from "../../assets/images/premiumproperties/dlfthecrest.jpg";
import GodrejAristocrat from "../../assets/images/exploreproperties/godrej.webp";

import { Drawer } from "antd";
import "./PremiumProperties.css";
import { useNavigate, useParams } from "react-router-dom";
import CardPropertiesDetails from "./CardPropertiesDetails";
import CustomButton from "../ui/Button";

function PremiumProperties() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [visibleCards, setVisibleCards] = useState(1);
  const [cardWidth, setCardWidth] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const navigate = useNavigate();
  const { propertyName } = useParams();
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const carouselRef = useRef(null);

  const gapPx = 32; // Equivalent to Tailwind gap-8 (2rem assuming 16px root font)

  const properties = [
    {
      id: 1,
      name: "Godrej Aristocrat",
      price: "₹ On Request",
      size: "On Request",
      image: GodrejAristocrat,
      location: {
        full: "Sector 49, Gurugram, Haryana, India",
        googleMap: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.6347789904416!2d77.06961287601024!3d28.400096994596865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d226f68d5844d%3A0xd0bf0c398f09d05e!2sTrump%20Tower!5e0!3m2!1sen!2sin!4v1754211194888!5m2!1sen!2sin" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
        city: "Gurugram",
        state: "Haryana",
        area: "Sector 49",
        country: "India",
      },
      area: "3200 - 4400 Sq Ft",
      type: "APARTMENT, RESIDENTIAL",
      rating: 4.8,
      views: 1245,
      category: "Luxury",
      featured: true,
      amenities: ["Swimming Pool", "Gym", "Garden", "Security"],
      updatedOn: "June 19, 2025",
    },
    {
      id: 2,
      name: "Elan The Emperor",
      price: "₹ On Request",
      size: "On Request",
      image: ElanTheEmperor,
      location: {
        full: "Sector 106, Gurgaon, Haryana, India",
        googleMap: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.8583016451093!2d76.96048497549424!3d28.453687575762938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d172183284b4b%3A0x4f6044467bfd59d0!2sElan%20Emperor%20Sector%20106!5e0!3m2!1sen!2sin!4v1755067222749!5m2!1sen!2sin" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
        city: "Gurugram",
        state: "Haryana",
        area: "Dwarka Expressway",
        country: "India",
      },
      area: "3200 - 4304 Sq Ft",
      type: "APARTMENT, RESIDENTIAL",
      rating: 4.9,
      views: 2156,
      category: "Luxury",
      featured: true,
      amenities: ["Rooftop Pool", "Spa", "Gym", "Parking"],
      updatedOn: "June 20, 2025",
    },
    {
      id: 3,
      name: "Krisumi Waterfall Residences",
      price: "₹ On Request",
      size: "On Request",
      image: KrisumiWaterfall,
      location: {
        full: "Sector 36A, Gurgaon, Haryana, India",
        googleMap: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.073284680496!2d76.97086207549293!3d28.417045475783006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d3daba8918f95%3A0x5c81fa76593240e6!2sKrisumi%20Waterfall%20Residences%20Gurgaon!5e0!3m2!1sen!2sin!4v1755067374762!5m2!1sen!2sin" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
        city: "Gurugram",
        state: "Haryana",
        area: "Dwarka Expressway",
        country: "India",
      },
      area: "1648 - 6569 Sq Ft",
      type: "APARTMENT, STUDIO, RESIDENTIAL",
      rating: 4.7,
      views: 892,
      category: "Luxury",
      featured: false,
      amenities: ["Waterfall View", "Balcony", "Garden", "Clubhouse"],
      updatedOn: "June 21, 2025",
    },
    {
      id: 4,
      name: "DLF The Camellias",
      price: "₹ On Request",
      size: "On Request",
      image: DLFCamellias,
      location: {
        full: "DLF The Camellias, Sector 42, Gurugram, Haryana, India",
        googleMap: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.283605141076!2d77.09514467549176!3d28.50169797574425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDMwJzA2LjEiTiA3N8KwMDUnNDIuNSJF!5e0!3m2!1sen!2sin!4v1755066872168!5m2!1sen!2sin" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
        address: "Golf Course Road, Sector 42",
        city: "Gurugram",
        state: "Haryana",
        zip: "122009",
        area: "Golf Course Road",
        country: "India",
      },
      area: "7196 - 16000 Sq Ft",
      type: "APARTMENT, RESIDENTIAL",
      rating: 5.0,
      views: 3421,
      category: "Luxury",
      featured: true,
      amenities: ["Private Elevator", "Terrace", "Butler Service", "Wine Cellar"],
      updatedOn: "June 20, 2025",
      units: "429",
      towers: "9",
      openArea: "70%",
      structure: "G + 21/38",
      configurations: "4, 5, 6 BHK Apartments",
    },
    {
      id: 5,
      name: "M3M Mansion Sector 113",
      price: "₹ On Request",
      size: "On Request",
      image: M3Mmansion,
      location: {
        full: "M3M Mansion, Sector 113, Gururgam, Haryana, India",
        address: "M3M Mansion, Northern Peripheral Road, Sector 113, Bajghera, Gurugram",
        city: "Gurugram",
        state: "Haryana",
        zip: "122017",
        area: "Dwarka Expressway",
        country: "India",
        googleMap: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.58548173569!2d77.02305912601354!3d28.522116639085294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1b89af3e9f25%3A0x933e8ef98fc61271!2sM3M%20MANSION!5e0!3m2!1sen!2sin!4v1755071944004!5m2!1sen!2sin" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
      },
      area: "1638 - 6695 Sq Ft",
      type: "APARTMENT, RESIDENTIAL",
      rating: 4.6,
      views: 1687,
      category: "Luxury",
      featured: false,
      amenities: ["City View", "Fitness Center", "Playground", "Shopping"],
      updatedOn: "June 28, 2025",
      units: "967",
      towers: "8",
      structure: "G+32 Floors",
      configurations: "2, 3, 4, 5 BHK Apartments & Penthouse",
    },
    {
      id: 6,
      name: "DLF The Crest",
      price: "₹ On Request",
      size: "On Request",
      image: DLFTheCrest,
      location: {
        full: "DLF Phase 5, Sector 54, Gurgram, Haryana, India",
        googleMap: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.58548173569!2d77.02305912601354!3d28.522116639085294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1b89af3e9f25%3A0x933e8ef98fc61271!2sDLF%20The%20Crest!5e0!3m2!1sen!2sin!4v1755071944004!5m2!2sen!2sin" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
        city: "Gurugram",
        state: "Haryana",
        country: "India",
        area: "Golf Course Road",
        
      },
      area: "2246 - 6221 Sq Ft",
      type: "APARTMENT, RESIDENTIAL",
      rating: 4.8,
      views: 2934,
      category: "Luxury",
      featured: true,
      amenities: ["Park View", "Yoga Studio", "Library", "Cafe"],
      updatedOn: "June 20, 2025",
    },
  ];

  const getVisibleCards = () => {
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  useEffect(() => {
    const handleVcResize = () => setVisibleCards(getVisibleCards());
    window.addEventListener("resize", handleVcResize);
    handleVcResize();
    return () => window.removeEventListener("resize", handleVcResize);
  }, []);

  useEffect(() => {
    const handleDimResize = () => {
      if (carouselRef.current) {
        const cw = carouselRef.current.offsetWidth;
        const effectiveVisible = Math.min(visibleCards, properties.length);
        if (effectiveVisible > 0) {
          const numGapsInView = Math.max(0, effectiveVisible - 1);
          const adjust = gapPx * numGapsInView;
          const newCardW = (cw - adjust) / effectiveVisible;
          setCardWidth(newCardW);
          setCurrentIndex(0);
        }
      }
    };
    handleDimResize();
    window.addEventListener("resize", handleDimResize);
    return () => window.removeEventListener("resize", handleDimResize);
  }, [visibleCards]);

  useEffect(() => {
    if (propertyName) {
      const property = properties.find(
        (p) => p.name.toLowerCase().replace(/\s+/g, "-") === propertyName
      );
      if (property) {
        setSelectedProperty(property);
        setDrawerOpen(true);
      }
    } else {
      setDrawerOpen(false);
      setSelectedProperty(null);
    }
  }, [propertyName]);

  const openDetails = (property) => {
    const slug = property.name.toLowerCase().replace(/\s+/g, "-");
    navigate(`/premiumproperties/${slug}`);
    setDrawerOpen(true);
  };

  const effectiveVisible = Math.min(visibleCards, properties.length);
  const maxIndexValue = Math.max(0, properties.length - effectiveVisible);
  const slideWidth = cardWidth + gapPx;
  const totalInnerWidth = properties.length * cardWidth + (properties.length - 1) * gapPx;
  const translateX = -currentIndex * slideWidth;
  const isFullView = maxIndexValue === 0;

  const nextProperty = () => {
    if (currentIndex < maxIndexValue) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevProperty = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Touch event handlers for swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) { 
      if (diff > 0) {
        nextProperty();
      } else {
        prevProperty();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      className="premium-properties-main h-full bg-gradient-to-br from-gray-900 to-gray-800 py-16 px-4 relative overflow-hidden laptop-mode-screen"
      id="premium-properties"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-gray-900/20 to-gray-800/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-gray-800/20 to-gray-700/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-gray-900/10 to-gray-800/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10 mobile-premium-section">
          <h1 className="mobile-title-text text-5xl md:text-6xl font-[Montserrat] font-black mb-4 bg-gradient-to-r from-[#c2c6cb] via-[#c99913] to-[#c2c6cb] bg-clip-text text-transparent animate-pulse">
            Top Handpicked Deals
          </h1>
          <p className="mobile-subtitle-text text-xl font-bebas text-[#c2c6cb] font-medium mt-6 font-light max-w-2xl mx-auto">
            Premium Properties at the Best Prices!
          </p>
        </div>

        {/* Navigation Buttons - Only show if not full view */}
        {!isFullView && (
          <>
            <button
              onClick={prevProperty}
              disabled={currentIndex === 0}
              className="absolute cursor-pointer left-4 top-1/2 transform -translate-y-1/2 z-30 p-4 rounded-full bg-[#333]/90 text-[#c2c6cb] shadow-xl hover:scale-110 hover:bg-[#444] transition-all border border-[#ffffff38] permium-properties-right disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextProperty}
              disabled={currentIndex >= maxIndexValue}
              className="absolute cursor-pointer right-4 top-1/2 transform -translate-y-1/2 z-30 p-4 rounded-full bg-[#333]/90 text-[#c2c6cb] shadow-xl hover:scale-110 hover:bg-[#444] transition-all border border-[#ffffff38] permium-properties-right disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Carousel */}
        <div
          className="overflow-hidden py-4"
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-700 ease-out gap-8 main-carousel"
            style={{
              width: `${totalInnerWidth}px`,
              transform: `translateX(${translateX}px)`,
            }}
          >
            {properties.map((property) => (
              <div
                key={property.id}
                className={`carousel-card relative flex-shrink-0 transition-all duration-700 ${hoveredCard === property.id ? "scale-105 z-20" : "scale-100"}`}
                style={{ width: `${cardWidth}px` }}
                onMouseEnter={() => setHoveredCard(property.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`group relative bg-[#333] rounded-3xl shadow-xl overflow-hidden border border-[#ffffff38] transition-all ${hoveredCard === property.id ? "-translate-y-4" : ""}`}>
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.name}
                      className={`w-full h-64 object-cover transition-transform ${hoveredCard === property.id ? "scale-110" : "scale-100"}`}
                    />
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {property.featured && (
                        <span className="px-3 py-1 bg-[#333] text-[#c99913] text-xs font-bold rounded-full shadow-lg animate-pulse border border-[#ffffff38]">
                          FEATURED
                        </span>
                      )}
                      <span className="px-3 text-center py-1 bg-[#333] text-[#c99913] text-xs font-bold rounded-full shadow-lg border border-[#ffffff38]">
                        {property.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4 content-mobile-price">
                      <span className="text-2xl font-bold fontFamily-bebas text-[#c99913]">{property.price}</span>
                      <div className="text-sm text-[#c2c6cb] bg-[#444] px-2 py-1 rounded border border-[#ffffff38] border-dashed"> Plot Size : {property.size}</div>
                    </div>
                    <h3 className="text-xl font-medium fontFamily-bebas text-[#c2c6cb] mb-2">{property.name}</h3>
                    <div className="flex items-start gap-2 mb-3">
                      <MapPin size={16} className="text-[#c99913] mt-1" />
                      <p className="text-sm text-[#c2c6cb]">{`${property.location.city}, ${property.location.area}, ${property.location.state}, ${property.location.country}`}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {property.amenities.slice(0, 3).map((a, i) => (
                        <span key={i} className="px-2 py-1 bg-[#444] text-[#c2c6cb] text-xs rounded-full border border-[#ffffff38]">
                          {a}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-end details-mobile">
                      <CustomButton
                        onClick={() => openDetails(property)}
                        className="px-4 py-1 font-semibold rounded-xl cursor-pointer bg-[#333] text-[#c2c6cb] hover:bg-[#444] border border-[#ffffff38]"
                        style={{
                          borderImage: "linear-gradient(to right, #333, #474236, #c99913) 1",
                          borderWidth: "2px",
                          borderStyle: "solid",
                        }}
                      >
                        Details
                      </CustomButton>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Drawer */}
      <Drawer
        title={<span className="text-xl font-bold text-[#c2c6cb]">Property Details</span>}
        placement="right"
        width={window.innerWidth < 640 ? "100%" : 1000}
        onClose={() => navigate("/")}
        open={drawerOpen}
        styles={{
          header: { background: "#1b1b1b", borderBottom: "1px solid #ffffff38", color: "#c2c6cb" },
          body: { background: "#333", padding: 0 },
          mask: { background: "rgba(17, 24, 39, 0.5)" },
        }}
        className=" scrollbars-thin overflow-y-scroll "
       
      >
        <CardPropertiesDetails property={selectedProperty} />
      </Drawer>
    </div>
  );
}

export default PremiumProperties;