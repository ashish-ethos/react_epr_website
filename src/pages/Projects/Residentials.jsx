import React, { useState, useMemo, useEffect } from "react";
import { Input, Typography, Pagination, Empty, Slider } from "antd";
import {
  FilterOutlined,
  DownOutlined,
  SearchOutlined as SearchIcon,
} from "@ant-design/icons";
import {
  Grid,
  List,
  MapPinHouse,
  LandPlot,
  Heart,
  Share2,
  Star,
  X,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  ExternalLink,
} from "lucide-react";
import ViewDetailsDrawer from "./ViewDetailsDrawer";
import { properties } from "../../data/propertiesData";
import { BsWhatsapp } from "react-icons/bs";
import "./Project.css";
import CustomButton from "../../components/ui/Button";
import CustomSelect from "../../components/ui/Select";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const { Search } = Input;
const { Option } = CustomSelect;
const { Text } = Typography;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error in Residentials:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center py-8 text-red-500">
          Something went wrong. Refresh the page.
        </div>
      );
    }
    return this.props.children;
  }
}

const formatPrice = (val) => {
  return val < 1 ? `${Math.round(val * 100)} L` : `${val} Cr`;
};

const parseSinglePrice = (str) => {
  if (!str) return null;
  const clean = str.replace(/[₹*]/g, "").trim().toLowerCase();
  const match = clean.match(/(\d+(?:\.\d+)?)\s*(cr|crore|l|lakh|lakhs)/i);
  if (match) {
    let num = parseFloat(match[1]);
    const unit = match[2].toLowerCase();
    if (unit.startsWith("l") || unit.startsWith("lakh")) {
      num = num / 100; // Convert lakhs to crores
    }
    return num;
  }
  const numMatch = clean.match(/(\d+(?:\.\d+)?)/);
  if (numMatch) {
    return parseFloat(numMatch[1]); // Assume crores if no unit specified
  }
  return null;
};

const parsePriceRange = (priceStr) => {
  if (
    !priceStr ||
    priceStr.includes("On Request") ||
    priceStr.includes("Price on Request")
  ) {
    return { min: null, max: null };
  }
  let clean = priceStr.replace(/[*]/g, "").trim();
  clean = clean.replace(/[–—–—\-]/g, "-");
  const parts = clean
    .split("-")
    .map((p) => p.trim())
    .filter((p) => p);
  if (parts.length === 1) {
    const val = parseSinglePrice(parts[0]);
    return { min: val, max: val };
  } else if (parts.length >= 2) {
    const minVal = parseSinglePrice(parts[0]);
    const maxVal = parseSinglePrice(parts[1]);
    return { min: minVal, max: maxVal };
  }
  return { min: null, max: null };
};

const parseSizeRange = (sizeStr) => {
  if (!sizeStr || sizeStr.includes("On Request")) {
    return { min: null, max: null };
  }
  const clean = sizeStr.replace(/[––—]/g, "-").replace(/[^\d-]/g, "");
  const parts = clean.split("-").map((num) => parseInt(num) || 0);
  if (parts.length === 1) {
    return { min: parts[0], max: parts[0] };
  }
  return { min: parts[0], max: parts[1] || parts[0] };
};

const Residentials = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [filters, setFilters] = useState({
    priceMin: null,
    priceMax: null,
    sizeMin: null,
    sizeMax: null,
    propertyType: "",
    category: "",
    status: "",
    bedrooms: [],
    bathrooms: [],
    yearBuilt: [],
  });
  const [pendingFilters, setPendingFilters] = useState(filters);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [likedProperties, setLikedProperties] = useState([]);
  const [showLikedOnly, setShowLikedOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();
  const location = useLocation();
  const { propertyName } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

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

  useEffect(() => {
    if (!propertyName) {
      const params = new URLSearchParams(location.search);
      const page = parseInt(params.get("page"), 10) || 1;
      setCurrentPage(page);
    }
  }, [location.search, propertyName]);

  useEffect(() => {
    if (!propertyName) {
      navigate(`/properties-type/residential?page=${currentPage}`, { replace: true });
    }
  }, [currentPage, propertyName, navigate]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters, sortBy, showLikedOnly]);

  useEffect(() => {
    const savedViewMode = localStorage.getItem("residentialViewMode");
    if (savedViewMode) {
      setViewMode(savedViewMode);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("residentialViewMode", viewMode);
  }, [viewMode]);

  useEffect(() => {
    return () => {
      localStorage.removeItem("residentialViewMode");
    };
  }, []);
  useEffect(() => {
    if (showFilters) {
      setPendingFilters(filters);
    }
  }, [showFilters, filters]);

  const toggleLike = (propertyId) => {
    setLikedProperties((prev) =>
      prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const filteredProperties = useMemo(() => {
    let filtered = properties.filter((property) => {
      const typeLower = property.type?.toLowerCase() || "";
      const isResidential =
        typeLower.includes("residential") ||
        typeLower.includes("apartment") ||
        typeLower.includes("villa") ||
        typeLower.includes("studio");
      const matchesSearch =
        property.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType =
        !filters.propertyType ||
        property.type
          ?.toLowerCase()
          .includes(filters.propertyType.toLowerCase());
      const priceRangeProp = parsePriceRange(property.price);
      const matchesPriceRange =
        priceRangeProp.min === null ||
        priceRangeProp.max === null ||
        ((!filters.priceMin || priceRangeProp.max >= filters.priceMin) &&
          (!filters.priceMax || priceRangeProp.min <= filters.priceMax));
      const sizeRangeProp = parseSizeRange(property.size);
      const matchesSizeRange =
        sizeRangeProp.min === null ||
        sizeRangeProp.max === null ||
        ((!filters.sizeMin || sizeRangeProp.max >= filters.sizeMin) &&
          (!filters.sizeMax || sizeRangeProp.min <= filters.sizeMax));
      const matchesCategory =
        !filters.category || property.category === filters.category;
      const matchesStatus =
        !filters.status ||
        (property.status || property.options || []).includes(filters.status);
      const matchesBedrooms =
        filters.bedrooms.length === 0 ||
        filters.bedrooms.some(
          (b) =>
            property.bedrooms &&
            Number(b) >= property.bedrooms.min &&
            Number(b) <= property.bedrooms.max
        );
      const matchesBathrooms =
        filters.bathrooms.length === 0 ||
        filters.bathrooms.some(
          (b) =>
            property.bathrooms &&
            Number(b) >= property.bathrooms.min &&
            Number(b) <= property.bathrooms.max
        );
      const matchesYearBuilt =
        filters.yearBuilt.length === 0 ||
        filters.yearBuilt.some((y) => property.yearBuilt?.includes(y));
      return (
        isResidential &&
        matchesSearch &&
        matchesType &&
        matchesPriceRange &&
        matchesSizeRange &&
        matchesCategory &&
        matchesStatus &&
        matchesBedrooms &&
        matchesBathrooms &&
        matchesYearBuilt
      );
    });

    if (showLikedOnly) {
      filtered = filtered.filter((property) =>
        likedProperties.includes(property.id)
      );
    }

    switch (sortBy) {
      case "price_low":
        return filtered.sort((a, b) => {
          const priceA = parsePriceRange(a.price).min || Infinity;
          const priceB = parsePriceRange(b.price).min || Infinity;
          return priceA - priceB;
        });
      case "price_high":
        return filtered.sort((a, b) => {
          const priceA = parsePriceRange(a.price).max || -Infinity;
          const priceB = parsePriceRange(b.price).max || -Infinity;
          return priceB - priceA;
        });
      case "rating":
        return filtered.sort((a, b) => b.rating - a.rating);
      case "sqft":
        return filtered.sort((a, b) => {
          const sqftA = parseSizeRange(a.size).min || -Infinity;
          const sqftB = parseSizeRange(b.size).min || -Infinity;
          return sqftB - sqftA;
        });
      default:
        return filtered.sort((a, b) => (b.featured || 0) - (a.featured || 0));
    }
  }, [searchTerm, filters, sortBy, likedProperties, showLikedOnly]);

  const displayedProperties = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleViewDetails = (property) => {
    setSelectedProperty(property);
    setDrawerOpen(true);
    const propertyNameSlug = property.name.toLowerCase().replace(/\s+/g, "-");
    navigate(`/properties-type/residential/${propertyNameSlug}`, {
      state: { from: location.pathname + location.search },
    });
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedProperty(null);
    navigate(-1);
  };

  const GridPropertyCard = ({ property, isLiked, onToggleLike }) => {
    const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);

    const shareUrl = encodeURIComponent(
      window.location.origin +
        `/properties-type/residential/${property.name
          .toLowerCase()
          .replace(/\s+/g, "-")}`
    );
    const shareTitle = encodeURIComponent(property.name);

    const socialMediaLinks = [
      {
        name: "Facebook",
        icon: Facebook,
        color: "text-[#1877F2]",
        url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&display=popup&ref=plugin&src=share_button`,
      },
      {
        name: "Instagram",
        icon: Instagram,
        color: "text-[#E4405F]",
        url: `https://www.instagram.com/ethosprorealtors/`,
      },
      {
        name: "LinkedIn",
        icon: Linkedin,
        color: "text-[#0A66C2]",
        url: `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}&source=Ethos%20Pro%20Realtors`,
      },
      {
        name: "X",
        icon: Twitter,
        color: "text-[#000]",
        url: `https://x.com/intent/post?url=${shareUrl}&text=${shareTitle}&via=ethosprorealtor`,
      },
      {
        name: "WhatsApp",
        icon: BsWhatsapp,
        color: "text-[#25D366]",
        url: `https://api.whatsapp.com/send?phone=918744964496&text=${shareTitle}%20${shareUrl}`,
      },
    ];

    const handleShareClick = (e) => {
      e.stopPropagation();
      setIsSharePopupOpen(true);
    };

    const handleClosePopup = (e) => {
      e.stopPropagation();
      setIsSharePopupOpen(false);
    };

    const handleSocialShare = (e, url) => {
      e.stopPropagation();
      window.open(url, "_blank", "noopener,noreferrer");
      setIsSharePopupOpen(false);
    };

    return (
      <div className="bg-[#444] rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-[#ffffff38] group">
        <div className="relative overflow-hidden">
          {property.image ? (
            <img
              src={property.image}
              alt={property.name}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-xl"
            />
          ) : (
            <div className="w-full h-64 bg-[#333] flex items-center justify-center rounded-t-xl">
              <Text type="secondary" className="text-[#c2c6cb]">
                No Image Available
              </Text>
            </div>
          )}
          <div className="project-status-mobile absolute top-4 left-4 flex flex-wrap gap-2">
            {(property.status || property.options || []).map((status) => (
              <span
                key={status}
                className={`px-3 py-1 text-xs font-semibold bg-[#06060670] rounded-full border border-[#ffffff38] text-[#c2c6cb]`}
              >
                {status}
              </span>
            ))}
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              className="p-2 bg-[#333]/90 rounded-full hover:bg-[#444] transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onToggleLike(property.id);
              }}
            >
              <Heart
                size={16}
                className={
                  isLiked
                    ? "text-red-500 fill-red-500"
                    : "text-[#c2c6cb] hover:text-red-500"
                }
              />
            </button>
            <button
              onClick={handleShareClick}
              className="p-2 bg-[#333]/90 cursor-pointer rounded-full hover:bg-[#444] transition-colors"
            >
              <Share2 size={16} className="text-[#c2c6cb]" />
            </button>
          </div>
          {isSharePopupOpen && (
            <div className="absolute top-12 right-4 bg-[#444] rounded-lg shadow-xl w-40 z-50 border border-[#ffffff38]">
              <div className="flex justify-between items-center px-2 py-1">
                <h4 className="text-xs font-semibold text-[#c2c6cb]">
                  Share Property
                </h4>
                <button
                  onClick={handleClosePopup}
                  className="p-1 hover:bg-[#333] rounded-full cursor-pointer transition-colors"
                >
                  <X size={16} className="text-[#c2c6cb] cursor-pointer" />
                </button>
              </div>
              <div className="flex flex-col mb-1 gap-1">
                {socialMediaLinks.map((platform) => (
                  <button
                    key={platform.name}
                    onClick={(e) => handleSocialShare(e, platform.url)}
                    className="flex items-center gap-2 p-1 px-2 hover:bg-[#333] rounded-lg transition-colors"
                  >
                    <platform.icon size={16} className={platform.color} />
                    <span className="text-xs text-[#c2c6cb] font-[Inter] ml-2">
                      {platform.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
          {property.featured && (
            <div className="absolute bottom-4 left-4">
              <span className="bg-gradient-to-r from-[#c2c6cb]/60 to-[#444]/80 text-[#000] px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 border border-[#ffffff38]">
                <Star size={12} fill="currentColor" />
                Featured
              </span>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-bold text-[#c2c6cb] mb-1">
                {property.name}
              </h3>
              <p className="text-[#c2c6cb]/80 flex items-center gap-1">
                <MapPinHouse className="text-[#c2c6cb]" />
                {property.location}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <Star size={14} className="text-[#c2c6cb] fill-current" />
              <span className="text-sm font-semibold text-[#c2c6cb]">
                {property.rating}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4 mb-4 text-sm text-[#c2c6cb]/80 mobile-project-type">
            <span className="flex items-center gap-1 text-[16px]">
              <LandPlot className="text-[#c2c6cb]" />
              {property.size || "N/A"}
            </span>
          </div>
          <div className="flex items-center justify-between mb-4  mobile-resdientail-title">
            <div>
              <div className="text-2xl font-bold text-[#c2c6cb]">
                {property.price}
              </div>
              <div className="text-sm text-[#c2c6cb]/80">
                {property.pricePerSqft || "On Request"}/sq ft
              </div>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-xs font-semibold bg-[#333]/50 text-[#c2c6cb] border border-[#ffffff38] mobile-property-type `}
            >
              {property.category ? property.category.replace("_", " ") : "N/A"}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            {(property.amenities || []).slice(0, 3).map((amenity) => (
              <span
                key={amenity}
                className="px-2 py-1 bg-[#333]/50 text-[#c2c6cb]/80 rounded-lg text-xs border border-[#ffffff38]"
              >
                {amenity}
              </span>
            ))}
            {(property.amenities || []).length > 3 && (
              <span className="px-2 py-1 bg-[#333]/50 text-[#c2c6cb]/80 rounded-lg text-xs border border-[#ffffff38]">
                +{(property.amenities || []).length - 3} more
              </span>
            )}
          </div>
          <div className="flex justify-center mt-2">
            <div className="inline-block rounded-[12px] p-[2px]">
              <CustomButton
                onClick={() => handleViewDetails(property)}
                className="bg-[#444] text-[#c2c6cb] px-5 py-2 rounded-[10px] cursor-pointer font-semibold flex items-center justify-center gap-2 hover:shadow-md transition-all duration-200"
              >
                View Details <ExternalLink size={18} />
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ListPropertyCard = ({ property, isLiked, onToggleLike }) => {
    const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);

    const shareUrl = encodeURIComponent(
      window.location.origin +
        `/properties-type/residential/${property.name
          .toLowerCase()
          .replace(/\s+/g, "-")}`
    );
    const shareTitle = encodeURIComponent(property.name);

    const socialMediaLinks = [
      {
        name: "Facebook",
        icon: Facebook,
        color: "text-[#1877F2]",
        url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&display=popup&ref=plugin&src=share_button`,
      },
      {
        name: "Instagram",
        icon: Instagram,
        color: "text-[#E4405F]",
        url: `https://www.instagram.com/ethosprorealtors/`,
      },
      {
        name: "LinkedIn",
        icon: Linkedin,
        color: "text-[#0A66C2]",
        url: `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}&source=Ethos%20Pro%20Realtors`,
      },
      {
        name: "X",
        icon: Twitter,
        color: "text-[#000]",
        url: `https://x.com/intent/post?url=${shareUrl}&text=${shareTitle}&via=ethosprorealtor`,
      },
      {
        name: "WhatsApp",
        icon: BsWhatsapp,
        color: "text-[#25D366]",
        url: `https://api.whatsapp.com/send?phone=918744964496&text=${shareTitle}%20${shareUrl}`,
      },
    ];

    const handleShareClick = (e) => {
      e.stopPropagation();
      setIsSharePopupOpen(true);
    };

    const handleClosePopup = (e) => {
      e.stopPropagation();
      setIsSharePopupOpen(false);
    };

    const handleSocialShare = (e, url) => {
      e.stopPropagation();
      window.open(url, "_blank", "noopener,noreferrer");
      setIsSharePopupOpen(false);
    };

    return (
      <div className="bg-[#444] rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-[#ffffff38] flex flex-col md:flex-row items-start">
        <div className="relative w-full md:w-1/3 overflow-hidden aspect-[4/3]">
          {property.image ? (
            <img
              src={property.image}
              alt={property.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-[#333] flex items-center justify-center">
              <Text type="secondary" className="text-[#c2c6cb]">
                No Image Available
              </Text>
            </div>
          )}
          <div className="absolute top-2 left-2 flex flex-wrap gap-2">
            {(property.status || property.options || []).map((status) => (
              <span
                key={status}
                className="px-2 py-1 text-xs font-semibold rounded-full bg-[#333]/50 text-[#c2c6cb] border border-[#ffffff38]"
              >
                {status}
              </span>
            ))}
          </div>
          {property.featured && (
            <div className="absolute bottom-2 left-2 flex justify-between w-full px-4">
              <span className="bg-gradient-to-r from-[#c2c6cb]/40 to-[#444]/40 text-[#c2c6cb] px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 border border-[#ffffffde]">
                <Star size={12} fill="currentColor" />
                Featured
              </span>
              <div className="relative flex gap-2">
                <button
                  className="p-2 bg-[#333]/50 cursor-pointer rounded-full hover:bg-[#444]/50 transition-colors border border-[#ffffffde]"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleLike(property.id);
                  }}
                >
                  <Heart
                    size={16}
                    className={
                      isLiked ? "text-red-500 fill-red-500" : "text-[#c2c6cb]"
                    }
                  />
                </button>
                <button
                  onClick={handleShareClick}
                  className="p-2 bg-[#333]/50 rounded-full cursor-pointer hover:bg-[#444]/50 transition-colors border border-[#ffffffde]"
                >
                  <Share2 size={16} className="text-[#c2c6cb]" />
                </button>
                {isSharePopupOpen && (
                  <div className="absolute right-0 bottom-full mt-2 bg-[#444] rounded-lg shadow-xl w-40 z-50 border border-[#ffffff38]">
                    <div className="flex justify-between items-center px-2 py-1">
                      <h4 className="text-xs font-semibold text-[#c2c6cb]">
                        Share Property
                      </h4>
                      <button
                        onClick={handleClosePopup}
                        className="p-1 hover:bg-[#333] rounded-full cursor-pointer transition-colors"
                      >
                        <X
                          size={16}
                          className="text-[#c2c6cb] cursor-pointer"
                        />
                      </button>
                    </div>
                    <div className="flex flex-col gap-1 p-2">
                      {socialMediaLinks.map((platform) => (
                        <button
                          key={platform.name}
                          onClick={(e) => handleSocialShare(e, platform.url)}
                          className="flex items-center gap-2 p-1 px-2 hover:bg-[#333] rounded-lg transition-colors"
                        >
                          <platform.icon size={16} className={platform.color} />
                          <span className="text-xs text-[#c2c6cb]">
                            {platform.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="p-4 md:p-6 w-full md:w-2/3">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-[#c2c6cb] mb-1">
                {property.name}
              </h3>
              <p className="text-[#c2c6cb]/80 text-sm flex items-center gap-1">
                <MapPinHouse className="text-[#c2c6cb]" /> {property.location}
              </p>
            </div>
            <div className="flex items-center gap-1 mt-2 md:mt-0">
              <Star size={14} className="text-[#c2c6cb] fill-current" />
              <span className="text-sm font-semibold text-[#c2c6cb]">
                {property.rating}
              </span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4 text-sm text-[#c2c6cb]/80 mobile-icons-bbl">
            <span className="flex items-center gap-1">
              <LandPlot className="text-[#c2c6cb]" /> {property.size || "N/A"}
            </span>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 mobile-project-type">
            <div>
              <div className="text-lg md:text-xl font-bold text-[#c2c6cb]">
                {property.price}
              </div>
              <div className="text-sm text-[#c2c6cb]/80">
                {property.pricePerSqft || "On Request"}/sq ft
              </div>
            </div>
            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-[#333]/50 text-[#c2c6cb] border border-[#ffffff38]">
              {property.category ? property.category.replace("_", " ") : "N/A"}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {(property.amenities || []).slice(0, 3).map((amenity) => (
              <span
                key={amenity}
                className="px-2 py-1 bg-[#333]/50 text-[#c2c6cb]/80 rounded-lg text-xs border border-[#ffffff38]"
              >
                {amenity}
              </span>
            ))}
            {(property.amenities || []).length > 3 && (
              <span className="px-2 py-1 bg-[#333]/50 text-[#c2c6cb]/80 rounded-lg text-xs border border-[#ffffff38]">
                +{(property.amenities || []).length - 3} more
              </span>
            )}
          </div>
          <div className="flex justify-between items-center">
            <div className="p-[2px] rounded-[12px]">
              <CustomButton
                onClick={() => handleViewDetails(property)}
                className="bg-[#444] text-[#c2c6cb] px-5 py-2 rounded-[10px] cursor-pointer font-semibold flex items-center justify-center gap-2 hover:shadow-md transition-all duration-200"
              >
                View Details <ExternalLink size={18} />
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const filterSort = (optionA, optionB) => {
    const labelA = optionA?.label?.toLowerCase() || "";
    const labelB = optionB?.label?.toLowerCase() || "";
    return labelA.localeCompare(labelB);
  };

  const LoadingSkeleton = () => (
    <div className="min-h-screen bg-[#333]">
      {/* Top Bar Skeleton */}
      <div className="bg-[#333] border-b border-t border-[#ffffff38] top-0 z-50 animate-pulse">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-2">
              <div className="h-8 w-48 bg-[#444] rounded"></div>
              <div className="h-4 w-32 bg-[#444] rounded"></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex bg-[#333]/50 rounded-lg border border-[#ffffff38]">
                <div className="h-8 w-8 bg-[#444] rounded-l-lg"></div>
                <div className="h-8 w-8 bg-[#444] rounded-r-lg"></div>
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-4 w-full justify-between">
            <div className="w-full h-12 bg-[#444] rounded-lg"></div>
            <div className="flex flex-wrap gap-3 w-full justify-end">
              <div className="h-12 w-24 bg-[#444] rounded-lg"></div>
              <div className="h-12 w-32 bg-[#444] rounded-lg"></div>
              <div className="h-12 w-28 bg-[#444] rounded-lg"></div>
            </div>
          </div>
          <div className="mt-4 p-4 bg-[#333]/50 rounded-xl border border-[#ffffff38]">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-12 bg-[#444] rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="max-w-7xl mx-auto px-6 py-8 mobile-project-container laptop-mode-screen">
        <div className="mb-6">
          <div className="h-8 w-64 bg-[#444] rounded"></div>
        </div>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-[#444] rounded-xl shadow-sm h-96 border border-[#ffffff38] overflow-hidden"
            >
              {/* Image Placeholder */}
              <div className="relative h-64 bg-[#555] rounded-t-xl"></div>
              {/* Status Tags */}
              <div className="absolute top-4 left-4 flex gap-2">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-5 w-16 bg-[#555] rounded-full"
                  ></div>
                ))}
              </div>
              {/* Right Icons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <div className="h-8 w-8 bg-[#555] rounded-full"></div>
                <div className="h-8 w-8 bg-[#555] rounded-full"></div>
              </div>
              {/* Content */}
              <div className="p-4 space-y-3">
                <div className="space-y-1">
                  <div className="h-5 w-48 bg-[#555] rounded"></div>
                  <div className="h-4 w-32 bg-[#555] rounded flex items-center gap-1"></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-3 w-12 bg-[#555] rounded flex items-center gap-1"></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="h-6 w-20 bg-[#555] rounded"></div>
                    <div className="h-3 w-24 bg-[#555] rounded"></div>
                  </div>
                  <div className="h-5 w-16 bg-[#555] rounded-full"></div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-5 w-12 bg-[#555] rounded-lg"
                    ></div>
                  ))}
                </div>
                <div className="h-10 w-full bg-[#555] rounded-[10px]"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-2 w-2 bg-[#444] rounded-full"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return isLoading ? (
    <LoadingSkeleton />
  ) : (
    <div className="min-h-screen bg-[#333] ">
      <div className="bg-[#333] border-b border-t border-[#ffffff38] top-0 z-50">
        <Helmet>
          {/* Page Title */}
          <title>
            Residential Properties in Gurugram | Luxury Flats & Villas – Ethos
            Pro Realtors
          </title>

          {/* Meta Description */}
          <meta
            name="description"
            content="Explore premium residential properties in Gurugram including luxury apartments, villas, and ultra-luxury homes. Verified projects by Ethos Pro Realtors."
          />

          {/* Keywords */}
          <meta
            name="keywords"
            content="residential properties gurugram, luxury flats gurgaon, villas in gurugram, residential projects ncr, ethos pro realtors residential"
          />

          <meta name="robots" content="index, follow" />

          {/* Canonical URL */}
          <link
            rel="canonical"
            href="https://www.ethosprorealtors.com/properties-type/residential"
          />

          {/* Open Graph */}
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="Residential Properties in Gurugram | Ethos Pro Realtors"
          />
          <meta
            property="og:description"
            content="Discover luxury residential apartments, villas, and premium homes in Gurugram curated by Ethos Pro Realtors."
          />
          <meta
            property="og:url"
            content="https://www.ethosprorealtors.com/properties-type/residential"
          />
          <meta
            property="og:image"
            content="https://www.ethosprorealtors.com/assets/residential-og.jpg"
          />

          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Residential Properties in Gurugram"
          />
          <meta
            name="twitter:description"
            content="Browse premium residential real estate projects in Gurugram with Ethos Pro Realtors."
          />
          <meta
            name="twitter:image"
            content="https://www.ethosprorealtors.com/assets/residential-og.jpg"
          />

          {/* Schema */}
          <script type="application/ld+json">
            {`
              {
                "@context": "https://schema.org",
                "@type": "CollectionPage",
                "name": "Residential Properties in Gurugram",
                "url": "https://www.ethosprorealtors.com/projects/residential",
                "description": "Luxury residential apartments, villas and homes in Gurugram by Ethos Pro Realtors.",
                "publisher": {
                  "@type": "Organization",
                  "name": "Ethos Pro Realtors",
                  "url": "https://www.ethosprorealtors.com"
                }
              }
              `}
          </script>
        </Helmet>

        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4  mobile-project-title">
            <div>
              <h1 className="mobile-title-project-text text-3xl font-bold text-[#c2c6cb]">
                Residential Properties
              </h1>
              <p className="text-[#c2c6cb]/80 mt-1">
                {filteredProperties.length} properties available
              </p>
            </div>
            <div className="flex items-center gap-3 ">
              <div className="flex bg-[#333]/50 rounded-lg  border border-[#ffffff38]">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg cursor-pointer transition-colors ${
                    viewMode === "grid"
                      ? "bg-[#444] shadow-sm"
                      : "hover:bg-[#444]"
                  }`}
                >
                  <Grid size={20} className="text-[#c2c6cb]" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg cursor-pointer transition-colors ${
                    viewMode === "list"
                      ? "bg-[#444] shadow-sm"
                      : "hover:bg-[#444]"
                  }`}
                >
                  <List size={20} className="text-[#c2c6cb]" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-4 w-full justify-between">
            <div className="w-full">
              <Search
                placeholder="Search by property name or location..."
                enterButton="Search"
                size="large"
                onSearch={(value) => setSearchTerm(value)}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  background: "#444",
                  color: "#c2c6cb",
                  borderColor: "#ffffff38",
                }}
                className="custom-search"
              />
            </div>
            <div className="flex flex-wrap gap-3 w-full justify-end mobile-open-filter">
              <CustomButton
                onClick={() => setShowFilters(!showFilters)}
                size="large"
                className="bg-[#444] text-[#c2c6cb] border-[#ffffff38] hover:bg-[#555]"
              >
                <FilterOutlined />
                Filters
                <DownOutlined
                  style={{
                    marginLeft: "8px",
                    transition: "transform 0.3s",
                    transform: showFilters ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </CustomButton>
              <CustomSelect
                popupMatchSelectWidth={true}
                onOpenChange={(open) => {
                  /* Handle if needed */
                }}
                value={sortBy}
                onChange={(value) => setSortBy(value)}
                size="large"
                style={{
                  width: 150,
                  background: "#444",
                  color: "#c2c6cb",
                  borderColor: "#ffffff38",
                }}
                className="custom-select"
              >
                <Option value="featured">Featured First</Option>
                <Option value="price_low">Price: Low to High</Option>
                <Option value="price_high">Price: High to Low</Option>
                <Option value="rating">Highest Rated</Option>
                <Option value="sqft">Largest First</Option>
              </CustomSelect>
              <CustomButton
                onClick={() => setShowLikedOnly(!showLikedOnly)}
                size="large"
                className="bg-[#444] text-[#c2c6cb] border-[#ffffff38] hover:bg-[#555]"
                icon={
                  <Heart
                    size={16}
                    className={
                      showLikedOnly ? "text-red-500" : "text-[#c2c6cb]"
                    }
                  />
                }
              >
                {showLikedOnly ? "Show All" : "Show Liked"} (
                {likedProperties.length})
              </CustomButton>
            </div>
          </div>
          {showFilters && (
            <div className="mt-6 py-4 px-6 bg-gradient-to-br from-[#1e1e1e] to-[#2a2a2a] rounded-3xl border border-[#ffffff15] shadow-2xl mobile-filter-box">
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* PRICE RANGE */}
                <div className="lg:col-span-1 ">
                  <label className="text-sm font-semibold text-white/90 block">
                    Price Range
                  </label>

                  <div className="relative py-2 ">
                    {/* Slider Track */}
                    <div className="relative h-1 bg-[#333] rounded-full">
                      {/* Active Track */}
                      <div
                        className="absolute h-full bg-gradient-to-r from-[#f1cb63] to-[#ecf65c] rounded-full"
                        style={{
                          left: `${
                            (((pendingFilters.priceMin ?? 0.1) - 0.1) /
                              (50 - 0.1)) *
                            100
                          }%`,
                          right: `${
                            100 -
                            (((pendingFilters.priceMax ?? 50) - 0.1) /
                              (50 - 0.1)) *
                              100
                          }%`,
                        }}
                      />

                      {/* Min Handle */}
                      <input
                        type="range"
                        min={0.1}
                        max={50}
                        step={0.1}
                        value={pendingFilters.priceMin ?? 0.1}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          if (value < (pendingFilters.priceMax ?? 50)) {
                            setPendingFilters({
                              ...pendingFilters,
                              priceMin: value === 0.1 ? null : value,
                            });
                          }
                        }}
                        className="absolute w-full h-1 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-[#6366f1] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-xl [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-[#6366f1] [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-xl [&::-moz-range-thumb]:border-0"
                        style={{ zIndex: 3 }}
                      />

                      {/* Max Handle */}
                      <input
                        type="range"
                        min={0.1}
                        max={50}
                        step={0.1}
                        value={pendingFilters.priceMax ?? 50}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          if (value > (pendingFilters.priceMin ?? 0.1)) {
                            setPendingFilters({
                              ...pendingFilters,
                              priceMax: value === 50 ? null : value,
                            });
                          }
                        }}
                        className="absolute w-full h-1 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-[#8b5cf6] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-xl [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-[#8b5cf6] [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-xl [&::-moz-range-thumb]:border-0"
                        style={{ zIndex: 4 }}
                      />
                    </div>

                    {/* Marks */}
                    <div className="flex justify-between mt-3 text-xs text-[#666] font-medium">
                      <span>10L</span>
                      <span>1Cr</span>
                      <span>5Cr</span>
                      <span>10Cr</span>
                      <span>20Cr</span>
                      <span>50Cr</span>
                    </div>
                  </div>

                  {/* Price Display */}
                  <div className="text-center text-base font-bold text-white bg-[#6366f1]/10 py-1 px-6 rounded-xl border border-[#6366f1]/30">
                    {pendingFilters.priceMin == null
                      ? "10L"
                      : formatPrice(pendingFilters.priceMin)}{" "}
                    -{" "}
                    {pendingFilters.priceMax == null
                      ? "50Cr"
                      : formatPrice(pendingFilters.priceMax)}
                  </div>
                </div>

                {/* SIZE RANGE */}
                <div>
                  <label className="text-sm font-semibold text-white/90 block mb-2">
                    Size Range (Sq Ft)
                  </label>
                  <div className="flex gap-3">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={pendingFilters.sizeMin || ""}
                      onChange={(e) =>
                        setPendingFilters({
                          ...pendingFilters,
                          sizeMin: e.target.value
                            ? parseInt(e.target.value)
                            : null,
                        })
                      }
                      className="flex-1 bg-[#1a1a1a] text-white border-2 border-[#333] hover:border-[#6366f1] focus:border-[#6366f1] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#6366f1]/20 transition-all text-sm"
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={pendingFilters.sizeMax || ""}
                      onChange={(e) =>
                        setPendingFilters({
                          ...pendingFilters,
                          sizeMax: e.target.value
                            ? parseInt(e.target.value)
                            : null,
                        })
                      }
                      className="flex-1 bg-[#1a1a1a] text-white border-2 border-[#333] hover:border-[#6366f1] focus:border-[#6366f1] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#6366f1]/20 transition-all text-sm"
                    />
                  </div>
                </div>

                {/* BEDROOMS */}
                <div>
                  <label className="text-sm font-semibold text-white/90 block mb-2">
                    Bedrooms
                  </label>
                  <CustomSelect
                    mode="multiple"
                    allowClear
                    placeholder="Any"
                    value={pendingFilters.bedrooms}
                    onChange={(value) =>
                      setPendingFilters({ ...pendingFilters, bedrooms: value })
                    }
                    size="large"
                    className="w-full custom-select"
                    style={{ background: "#1a1a1a", color: "white" }}
                    dropdownStyle={{
                      background: "#1a1a1a",
                      borderColor: "#333",
                    }}
                    options={Array.from({ length: 10 }, (_, i) => ({
                      value: `${i + 1}`,
                      label: `${i + 1}`,
                    }))}
                  />
                </div>

                {/* BATHROOMS */}
                <div>
                  <label className="text-sm font-semibold text-white/90 block mb-2">
                    Bathrooms
                  </label>
                  <CustomSelect
                    mode="multiple"
                    allowClear
                    placeholder="Any"
                    value={pendingFilters.bathrooms}
                    onChange={(value) =>
                      setPendingFilters({ ...pendingFilters, bathrooms: value })
                    }
                    size="large"
                    className="w-full custom-select"
                    style={{ background: "#1a1a1a", color: "white" }}
                    dropdownStyle={{
                      background: "#1a1a1a",
                      borderColor: "#333",
                    }}
                    options={Array.from({ length: 10 }, (_, i) => ({
                      value: `${i + 1}`,
                      label: `${i + 1}`,
                    }))}
                  />
                </div>

                {/* YEAR BUILT */}
                <div>
                  <label className="text-sm font-semibold text-white/90 block mb-2">
                    Year Built
                  </label>
                  <CustomSelect
                    mode="multiple"
                    allowClear
                    placeholder="Any"
                    value={pendingFilters.yearBuilt}
                    onChange={(value) =>
                      setPendingFilters({ ...pendingFilters, yearBuilt: value })
                    }
                    size="large"
                    className="w-full custom-select"
                    style={{ background: "#1a1a1a", color: "white" }}
                    dropdownStyle={{
                      background: "#1a1a1a",
                      borderColor: "#333",
                    }}
                    options={[
                      { value: "2021", label: "2021" },
                      { value: "2022", label: "2022" },
                      { value: "2023", label: "2023" },
                      { value: "2024", label: "2024" },
                      { value: "2025", label: "2025" },
                    ]}
                  />
                </div>

                {/* STATUS */}
                <div>
                  <label className="text-sm font-semibold text-white/90 block mb-4">
                    Status
                  </label>
                  <CustomSelect
                    value={pendingFilters.status}
                    onChange={(value) =>
                      setPendingFilters({ ...pendingFilters, status: value })
                    }
                    placeholder="Any Status"
                    size="large"
                    className="w-full custom-select"
                    style={{ background: "#1a1a1a", color: "white" }}
                    dropdownStyle={{
                      background: "#1a1a1a",
                      borderColor: "#333",
                    }}
                    options={[
                      { value: "", label: "Any Status" },
                      { value: "FOR SALE", label: "For Sale" },
                      { value: "FOR RENT", label: "For Rent" },
                      { value: "NEW LAUNCH", label: "New Launch" },
                      { value: "HOT OFFER", label: "Hot Offer" },
                    ]}
                  />
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex justify-end gap-4 mt-6 pt-4 border-t border-[#ffffff08] mobile-filter-buttons">
                <button
                  onClick={() => {
                    const reset = {
                      priceMin: null,
                      priceMax: null,
                      sizeMin: null,
                      sizeMax: null,
                      status: "",
                      bedrooms: [],
                      bathrooms: [],
                      yearBuilt: [],
                    };
                    setPendingFilters(reset);
                    setFilters(reset);
                  }}
                  className="px-8 py-1 cancelButton rounded-md max-w-[200px] font-semibold text-sm transition-all"
                >
                  Clear Filters
                </button>
                <CustomButton
                  onClick={() => {
                    setFilters(pendingFilters);
                    setCurrentPage(1);
                    setShowFilters(false);
                  }}
                  className="px-10 py-3 text-white font-bold rounded-xl shadow-lg transition-all"
                >
                  Apply Filters
                </CustomButton>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-8 mobile-project-container laptop-mode-screen">
        {filteredProperties.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-[#c2c6cb]/80 mb-4">
              <SearchIcon size={64} className="mx-auto" />
            </div>
            <Empty
              description={
                <h3 className="text-xl font-semibold text-[#c2c6cb] mb-2">
                  No properties found
                </h3>
              }
            />
            <p className="text-[#c2c6cb]/80">
              Try adjusting your search criteria or filters
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#c2c6cb]">
                All Residential Properties
              </h2>
            </div>
            <ErrorBoundary>
              <div
                className={`grid gap-8 ${
                  viewMode === "grid"
                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                }`}
              >
                {displayedProperties.map((property) => (
                  <div key={property.id}>
                    {viewMode === "grid" ? (
                      <GridPropertyCard
                        property={property}
                        isLiked={likedProperties.includes(property.id)}
                        onToggleLike={toggleLike}
                      />
                    ) : (
                      <ListPropertyCard
                        property={property}
                        isLiked={likedProperties.includes(property.id)}
                        onToggleLike={toggleLike}
                      />
                    )}
                  </div>
                ))}
              </div>
            </ErrorBoundary>
            <div className="mt-8 flex justify-center">
              <Pagination
                current={currentPage}
                total={filteredProperties.length}
                pageSize={itemsPerPage}
                onChange={(page) => setCurrentPage(page)}
                showSizeChanger={false}
                className="custom-pagination"
              />
            </div>
          </>
        )}
      </div>
      <ViewDetailsDrawer
        open={drawerOpen}
        onClose={handleCloseDrawer}
        project={selectedProperty}
        isLiked={
          selectedProperty
            ? likedProperties.includes(selectedProperty.id)
            : false
        }
        onToggleLike={toggleLike}
      />
    </div>
  );
};

export default Residentials;
