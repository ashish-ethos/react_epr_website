import React, { useState, useEffect } from "react";
import {
  useNavigate,
  useParams,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import { MapPin, Heart, Bed, Ruler } from "lucide-react";
import { Select, Input, Form, Button, ConfigProvider, Empty } from "antd";
import { theme } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ArrowLeft } from "lucide-react";
import "./PopularLocation.css";
import ContactForm from "../../pages/Contact/ContactForm";
import CustomButton from "../ui/Button";
import ViewPopularLocation from "./ViewPopularLocation";
import { properties } from "../../data/propertiesData";

const locations = [
  { name: "Dwarka Expressway", slug: "dwarka-expressway" },
  { name: "Golf Course Extension Road", slug: "golf-course-extension-road" },
  { name: "New Gurgaon", slug: "new-gurgaon" },
  { name: "Sohna Road", slug: "sohna-road" },
  { name: "Southern Peripheral Road", slug: "southern-peripheral-road" },
];

const locationKeywords = {
  "dwarka-expressway": [
    "dwarka",
    "expressway",
    "sector 102",
    "sector 103",
    "sector 106",
    "sector 109",
    "sector 113",
    "bajghera",
    "panwala khusropur",
    "chauma",
  ],
  "golf-course-extension-road": [
    "golf course extension",
    "golf course",
    "sector 65",
    "sector 66",
    "badshahpur",
  ],
  "new-gurgaon": [
    "new gurgaon",
    "sector 80",
    "sector 81",
    "sector 82",
    "sector 83",
    "sector 84",
    "sector 85",
    "sector 86",
    "sector 87",
    "sector 88",
    "sector 89",
    "sector 90",
    "sector 91",
    "sector 92",
    "sector 93",
    "sector 94",
    "sector 95",
    "naurangpur",
    "wazirpur",
    "gopalpur",
    "harsaru",
    "dhunela",
    "sikandarpur badha",
  ],
  "sohna-road": [
    "sohna",
    "sohna road",
    "sector 48",
    "sector 49",
    "sector 33",
    "sector 35",
    "revenue estate sohn",
    "dhunela",
  ],
  "southern-peripheral-road": [
    "southern peripheral",
    "spr",
    "peripheral road",
    "sector 70",
    "sector 71",
    "sector 72",
    "sector 73",
    "sector 74",
    "sector 75",
    "sector 76",
    "sector 77",
    "sector 78",
    "sector 79",
    "ghata",
  ],
};

// Derive unique options from data
const getPropertyTypeOptions = () => {
  const types = [...new Set(properties.map((p) => p.type))].filter(
    (t) => t && t.trim()
  );
  return [
    { value: "all", label: "All" },
    ...types.map((t) => ({ value: t.toLowerCase(), label: t })),
  ];
};

const getBHKOptions = () => [
  { value: "all", label: "All" },
  { value: "2bhk", label: "2 BHK" },
  { value: "3bhk", label: "3 BHK" },
  { value: "4bhk", label: "4 BHK" },
  { value: "5bhk", label: "5+ BHK" }, // Extended based on data
];

const getConstructionOptions = () => {
  const statuses = [
    ...new Set(
      properties
        .flatMap((p) => (Array.isArray(p.status) ? p.status : [p.status]))
        .filter((s) => s)
    ),
  ];
  const uniqueStatuses = [...new Set(statuses.map((s) => s.toLowerCase()))];
  return [
    { value: "all", label: "All" },
    { value: "under-construction", label: "Under Construction" }, // Map to new launch/hot offer
    { value: "ready-to-move", label: "Ready to Move" }, // Map to sold out/for sale ready
    ...uniqueStatuses
      .slice(0, 5)
      .map((s) => ({ value: s, label: s.toUpperCase() })), // Top unique
  ];
};

const getFeaturesOptions = () => {
  const allFacilities = [
    ...new Set(properties.flatMap((p) => p.facilities || [])),
  ].filter((f) => f && f.trim());
  return [
    { value: "all", label: "All" },
    ...allFacilities
      .slice(0, 10)
      .map((f) => ({ value: f.toLowerCase(), label: f })), // Top 10
  ];
};

const getPriceOptions = () => [
  { value: "all", label: "All" },
  { value: "below-50l", label: "Below ₹50L" },
  { value: "50l-1cr", label: "₹50L - ₹1Cr" },
  { value: "1cr-2cr", label: "₹1Cr - ₹2Cr" },
  { value: "2cr-5cr", label: "₹2Cr - ₹5Cr" },
  { value: "5crplus", label: "₹5Cr+" },
];

const PropertyCard = ({ property, onPropertyClick }) => {
  // Improved BHK derivation: check type or size
  const getBHK = (type, size) => {
    if (
      type.toLowerCase().includes("2bhk") ||
      (size && parseInt(size.match(/(\d+)/)?.[1] || 0) < 1500)
    )
      return "2";
    if (
      type.toLowerCase().includes("3bhk") ||
      (size && parseInt(size.match(/(\d+)/)?.[1] || 0) < 2500)
    )
      return "3";
    return "4+";
  };
  const bhk = getBHK(property.type, property.size);
  const possession = property.status?.includes("Ready")
    ? "Ready to Move"
    : "Jul 2029"; // Improved
  const address = property.location.split(",")[0];

  const handleClick = () => {
    onPropertyClick(property);
  };

  return (
    <div
      className="property-card bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-gray-700 cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative">
        <span className="type-tag absolute top-2 left-2 bg-[#c08830] text-white px-2 py-1 rounded text-sm font-medium">
          {property.type.includes("Residential")
            ? "Residential"
            : property.type}
        </span>
        <Heart
          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 cursor-pointer w-5 h-5"
          fill="none"
          stroke="currentColor"
        />
        <h3 className="project-name absolute bottom-2 left-2 right-2 text-white font-bold text-lg bg-black bg-opacity-50 px-2 py-1 rounded">
          {property.name}
        </h3>
        <div className="location absolute bottom-2 right-2 flex items-center bg-black bg-opacity-50 text-white px-2 py-1 rounded">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-xs">{address}</span>
        </div>
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-4 text-[#c2c6cb]">
        <p className="address text-sm mb-2">{property.location}</p>
        <div className="specs flex justify-between mb-3">
          <div className="flex items-center text-xs">
            <Bed className="w-4 h-4 mr-1 text-[#c08830]" />
            <span>{bhk} BHK</span>
          </div>
          <div className="flex items-center text-xs">
            <Ruler className="w-4 h-4 mr-1 text-[#c08830]" />
            <span>{property.size}</span>
          </div>
        </div>
        <div className="price-section grid grid-cols-2 gap-4 text-sm ">
          <div>
            <label className="block text-gray-400 text-xs mb-1">
              Starting Price
            </label>
            <span className="font-bold text-lg">{property.price}</span>
          </div>
          <div>
            <label className="block text-gray-400 text-xs mb-1">Status</label>
            <span className="text-[#c08830] font-medium">{possession}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const PopularLocation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { locationName } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [form] = Form.useForm();
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [propertyTypeOptions, setPropertyTypeOptions] = useState([]);
  const [constructionOptions, setConstructionOptions] = useState([]);
  const [featuresOptions, setFeaturesOptions] = useState([]);

  const formValues = Form.useWatch([], form);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  useEffect(() => {
    // Derive dynamic options from data
    setPropertyTypeOptions(getPropertyTypeOptions());
    setConstructionOptions(getConstructionOptions());
    setFeaturesOptions(getFeaturesOptions());
  }, [properties]);

  useEffect(() => {
    if (locationName) {
      const loc = locations.find((l) => l.slug === locationName);
      if (loc) {
        setSelected(loc.name);
      }
    } else {
      setSelected(null);
    }
  }, [locationName]);

  useEffect(() => {
    const currentLoc = locations.find((l) => l.slug === locationName);
    if (!currentLoc) return;

    let filtered = properties.filter((prop) => {
      const locLower = prop.location.toLowerCase();
      const keywords = locationKeywords[currentLoc.slug] || [
        currentLoc.name.toLowerCase(),
      ];
      return keywords.some((kw) => locLower.includes(kw.toLowerCase()));
    });

    // Apply search filter if present
    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (prop) =>
          prop.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
          prop.location.toLowerCase().includes(searchTerm.toLowerCase().trim())
      );
    }

    // Apply property type filter
    if (formValues?.propertyType && formValues.propertyType !== "all") {
      filtered = filtered.filter((p) =>
        p.type.toLowerCase().includes(formValues.propertyType)
      );
    }

    // Apply BHK filter (using size approximation)
    if (formValues?.bhk && formValues.bhk !== "all") {
      filtered = filtered.filter((p) => {
        const sizeMatch = p.size.match(/(\d+(?:\.\d+)?)/);
        const sizeNum = sizeMatch ? parseFloat(sizeMatch[1]) : 0;
        const bhkNum = formValues.bhk.replace("bhk", "");
        switch (bhkNum) {
          case "2":
            return sizeNum >= 800 && sizeNum < 1400;
          case "3":
            return sizeNum >= 1400 && sizeNum < 2200;
          case "4":
            return sizeNum >= 2200 && sizeNum < 3000;
          case "5":
            return sizeNum >= 3000;
          default:
            return true;
        }
      });
    }

    // Apply construction filter
    if (formValues?.construction && formValues.construction !== "all") {
      filtered = filtered.filter((p) => {
        if (Array.isArray(p.status)) {
          const statusLower = p.status.map((s) => s.toLowerCase());
          if (formValues.construction === "under-construction") {
            return statusLower.some(
              (s) => s.includes("new launch") || s.includes("hot offer")
            );
          } else if (formValues.construction === "ready-to-move") {
            return statusLower.some(
              (s) => s.includes("sold out") || s.includes("for sale")
            );
          } else {
            return statusLower.includes(formValues.construction);
          }
        }
        return p.status?.toLowerCase() === formValues.construction;
      });
    }

    // Apply features filter
    if (formValues?.features && formValues.features !== "all") {
      filtered = filtered.filter((p) =>
        p.facilities?.some((fac) =>
          fac.toLowerCase().includes(formValues.features)
        )
      );
    }

    // Apply price filter (improved parsing)
    if (formValues?.price && formValues.price !== "all") {
      filtered = filtered.filter((p) => {
        const priceMatch = p.price.match(/₹\s*([\d.]+)\s*(L|Cr)/i);
        if (!priceMatch) return false;
        const priceNum = parseFloat(priceMatch[1]);
        const unit = priceMatch[2].toLowerCase();
        const priceInCr = unit === "cr" ? priceNum : priceNum / 100;

        switch (formValues.price) {
          case "below-50l":
            return priceInCr < 0.5;
          case "50l-1cr":
            return priceInCr >= 0.5 && priceInCr <= 1;
          case "1cr-2cr":
            return priceInCr > 1 && priceInCr <= 2;
          case "2cr-5cr":
            return priceInCr > 2 && priceInCr <= 5;
          case "5crplus":
            return priceInCr > 5;
          default:
            return true;
        }
      });
    }

    // Sort by relevance (e.g., price low to high if no sort specified)
    filtered.sort((a, b) => {
      const priceA = parseFloat(a.price.match(/₹\s*([\d.]+)/)?.[1] || 0);
      const priceB = parseFloat(b.price.match(/₹\s*([\d.]+)/)?.[1] || 0);
      return priceA - priceB;
    });

    setFilteredProperties(filtered);
  }, [locationName, searchTerm, formValues, properties]);

  useEffect(() => {
    const propSlug = searchParams.get("property");
    if (propSlug) {
      const prop = properties.find(
        (p) => p.name.toLowerCase().replace(/\s+/g, "-") === propSlug
      );
      if (prop) {
        setSelectedProperty(prop);
        setIsModalOpen(true);
      } else {
        setSearchParams({});
      }
    } else {
      setIsModalOpen(false);
      setSelectedProperty(null);
    }
  }, [searchParams, properties]);

  const handleLocationClick = (loc) => {
    setSelected(loc.name);
    navigate(`/popular-location/${loc.slug}`);
  };

  const handlePropertyClick = (property) => {
    const propSlug = property.name.toLowerCase().replace(/\s+/g, "-");
    setSelectedProperty(property);
    setIsModalOpen(true);
    setSearchParams({ property: propSlug });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProperty(null);
    setSearchParams({});
  };

  const clearFilters = () => {
    form.resetFields();
    setSearchTerm("");
  };

  const LoadingSkeleton = ({ locationName }) => (
    <section className="popular-location-section animate-pulse">
      {/* Common Header for Both Views */}
      <div className="mb-6">
        <div className="h-8 w-64 bg-[#444] rounded mb-2"></div> {/* Title */}
        <div className="h-1 w-32 bg-gradient-to-r from-transparent via-[#c99913] to-transparent rounded-full"></div>{" "}
        {/* Underline */}
        <div className="h-4 w-80 bg-[#444] rounded mt-2"></div>{" "}
        {/* Description */}
      </div>

      {locationName ? (
        // Properties View Skeleton
        <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
          <section className="properties-section py-8 px-4 bg-[#181A1B]">
            <div className="max-w-7xl mx-auto">
              {/* Back Button Placeholder */}
              <div className="h-8 w-20 bg-[#444] rounded mb-4"></div>

              {/* Header */}
              <div className="mb-6">
                <div className="h-6 w-96 bg-[#444] rounded mb-2"></div>{" "}
                {/* Subtitle */}
                <div className="h-4 w-80 bg-[#444] rounded"></div>{" "}
                {/* Description */}
              </div>

              {/* Stats and Actions */}
              <div className="flex justify-between items-center mb-8">
                <div className="h-4 w-48 bg-[#444] rounded"></div>{" "}
                {/* Showing X properties */}
                <div className="h-6 w-8 bg-[#444] rounded"></div>{" "}
                {/* Menu button */}
              </div>

              {/* Main Content: Three-column Layout */}
              <div className="custom-grid">
                {/* Left: Filters Sidebar */}
                <div className="bg-black rounded-lg shadow-md p-6">
                  {/* Search Bar */}
                  <div className="relative mb-3">
                    <div className="h-10 w-full bg-[#444] rounded flex items-center px-3"></div>{" "}
                    {/* Input */}
                  </div>

                  {/* Form Filters */}
                  <div className="space-y-4">
                    {Array.from({ length: 5 }).map(
                      (
                        _,
                        i // 5 filters: type, bhk, construction, features, price
                      ) => (
                        <div key={i}>
                          <div className="h-4 w-32 bg-[#444] rounded mb-2"></div>{" "}
                          {/* Label */}
                          <div className="h-10 w-full bg-[#444] rounded"></div>{" "}
                          {/* Select */}
                        </div>
                      )
                    )}
                    {/* Clear Button */}
                    <div className="h-10 w-full bg-[#444] rounded border border-[#c2c6cb]"></div>
                  </div>
                </div>

                {/* Center: Results Area - 6 Property Cards */}
                <div className="bg-black rounded-lg p-6 col-span-1 lg:col-span-1 space-y-6 overflow-y-auto max-h-[80vh] custom-scrollbar">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={index}
                      className="property-card bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-gray-700"
                    >
                      {/* Image + Overlays */}
                      <div className="relative h-48 bg-[#444] rounded-t-lg">
                        <div className="absolute top-2 left-2 h-5 w-20 bg-[#444] rounded"></div>{" "}
                        {/* Type tag */}
                        <div className="absolute top-2 right-2 h-5 w-5 bg-[#444] rounded-full"></div>{" "}
                        {/* Heart */}
                        <div className="absolute bottom-2 left-2 right-2 h-6 w-3/4 bg-black bg-opacity-50 rounded px-2 py-1"></div>{" "}
                        {/* Name */}
                        <div className="absolute bottom-2 right-2 h-6 w-24 bg-black bg-opacity-50 rounded flex items-center px-2 py-1"></div>{" "}
                        {/* Location */}
                      </div>
                      {/* Content */}
                      <div className="p-4">
                        <div className="h-3 w-full bg-[#444] rounded mb-2"></div>{" "}
                        {/* Address */}
                        <div className="flex justify-between mb-3">
                          <div className="h-4 w-12 bg-[#444] rounded flex items-center"></div>{" "}
                          {/* BHK */}
                          <div className="h-4 w-16 bg-[#444] rounded flex items-center"></div>{" "}
                          {/* Size */}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="h-3 w-20 bg-[#444] rounded mb-1"></div>{" "}
                            {/* Label */}
                            <div className="h-5 w-16 bg-[#444] rounded"></div>{" "}
                            {/* Price */}
                          </div>
                          <div>
                            <div className="h-3 w-20 bg-[#444] rounded mb-1"></div>{" "}
                            {/* Label */}
                            <div className="h-4 w-20 bg-[#444] rounded"></div>{" "}
                            {/* Status */}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right: Interest Form */}
                <div className="bg-black rounded-lg shadow-md p-6 col-span-1">
                  <div className="px-4 py-2">
                    <div className="h-6 w-48 bg-[#444] rounded mb-4 mx-auto"></div>{" "}
                    {/* Header */}
                    {/* Pulsing Contact Form Placeholders - Mimic form fields */}
                    <div className="space-y-3">
                      {Array.from({ length: 5 }).map(
                        (
                          _,
                          i // Typical form: name, email, phone, message, submit
                        ) => (
                          <div
                            key={i}
                            className="h-10 w-full bg-[#444] rounded"
                          ></div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ConfigProvider>
      ) : (
        // Locations List View Skeleton
        <div className="locations-grid">
          {Array.from({ length: locations.length }).map((_, index) => (
            <div
              key={index}
              className="location-button bg-gray-900 rounded border border-gray-700 p-4 cursor-pointer"
            >
              <div className="location-icon-wrapper">
                <div className="location-icon h-6 w-6 bg-[#444] rounded-full mx-auto"></div>{" "}
                {/* Icon */}
              </div>
              <div className="location-name h-4 w-32 bg-[#444] rounded mt-2 mx-auto"></div>{" "}
              {/* Name */}
            </div>
          ))}
        </div>
      )}
    </section>
  );

  if (!locationName) {
    // Show the locations list
    return isLoading ? (
      <LoadingSkeleton locationName={locationName} />
    ) : (
      <section className="popular-location-section">
        {location.pathname === "/popular-location" && (
          <div className="w-full justify-start items-start">
            <CustomButton
              type="text"
              onClick={() => navigate("/")}
              className="flex items-center text-[#c2c6cb] hover:text-white mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Home
            </CustomButton>
          </div>
        )}

        <h2 className="mobile-title-text text-3xl font-[Montserrat] sm:text-4xl md:text-5xl font-medium mb-3 sm:mb-4 bg-gradient-to-r from-[#c2c6cb] via-[#c99913] to-[#c2c6cb] bg-clip-text text-transparent">
          Popular Location
        </h2>
        <div className="h-1 bg-gradient-to-r from-transparent via-[#c99913] to-transparent rounded-full animate-pulse w-full">
          {" "}
        </div>
        <p className="popular-location-description mobile-subtitle-text text-[#c2c6cb] text-md mt-1">
          Explore prime locations and key real estate destinations in Gurgaon
        </p>
        <div className="locations-grid">
          {locations.map((loc) => (
            <button
              key={loc.name}
              onClick={() => handleLocationClick(loc)}
              className={`location-button ${
                selected === loc.name ? "selected" : ""
              }`}
            >
              <span className="location-icon-wrapper">
                <MapPin className="location-icon" />
              </span>
              <span className="location-name">{loc.name}</span>
            </button>
          ))}
        </div>
      </section>
    );
  }

  // Show the properties layout for the selected location
  const currentLocation = locations.find((l) => l.slug === locationName);
  if (!currentLocation) {
    return <div>Location not found</div>;
  }

  return isLoading ? (
    <LoadingSkeleton locationName={locationName} />
  ) : (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <section className="properties-section py-8 px-4 bg-[#181A1B]">
        <div className="max-w-7xl mx-auto">
          <CustomButton
            type="text"
            onClick={() => navigate("/popular-location")}
            className=" flex items-center text-[#c2c6cb] hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 inline-block" /> Back
          </CustomButton>

          {/* Header */}
          <div className="mb-6 mobile-header-section">
            <h1 className="text-3xl font-bold text-[#c2c6cb] mb-2 mobile-popular-location-title">
              Properties for Sale in {currentLocation.name}, Gurgaon
            </h1>
            <p className="text-[#c2c6cb] mobile-popular-location-subtitle">
              Explore premium properties for sale in {currentLocation.name},
              Gurgaon with excellent amenities and excellent connectivity.
            </p>
          </div>

          {/* Stats and Actions */}
          <div className="flex justify-between items-center mb-8 mobile-stats-actions-section">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-[#c2c6cb]">
                Showing {filteredProperties.length} properties in{" "}
                {currentLocation.name}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Button type="text" size="small" icon={<span>⋮</span>} />
            </div>
          </div>

          {/* Main Content: Three-column Layout */}
          <div className="custom-grid">
            {/* Left: Filters Sidebar */}
            <div className="bg-black rounded-lg shadow-md p-6">
              {/* Search Bar */}
              <div className="relative mb-3">
                <Input
                  prefix={<SearchOutlined className="text-gray-500" />}
                  allowClear
                  placeholder="Search projects or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Form for filters */}
              <Form
                form={form}
                layout="vertical"
                initialValues={{
                  propertyType: "all",
                  bhk: "all",
                  construction: "all",
                  features: "all",
                  price: "all",
                }}
              >
                {/* Property Types */}
                <Form.Item
                  name="propertyType"
                  label={
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Property Types
                    </label>
                  }
                >
                  <Select
                    options={propertyTypeOptions}
                    placeholder="Select Type"
                    style={{ width: "100%" }}
                  />
                </Form.Item>

                {/* BHK */}
                <Form.Item
                  name="bhk"
                  label={
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      BHK Configuration
                    </label>
                  }
                >
                  <Select
                    options={getBHKOptions()}
                    placeholder="Select BHK"
                    style={{ width: "100%" }}
                  />
                </Form.Item>

                {/* Stages of Construction */}
                <Form.Item
                  name="construction"
                  label={
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Construction Status
                    </label>
                  }
                >
                  <Select
                    options={constructionOptions}
                    placeholder="Select Status"
                    style={{ width: "100%" }}
                  />
                </Form.Item>

                {/* Features */}
                <Form.Item
                  name="features"
                  label={
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Amenities
                    </label>
                  }
                >
                  <Select
                    options={featuresOptions}
                    placeholder="Select Amenity"
                    style={{ width: "100%" }}
                  />
                </Form.Item>

                {/* Price Range */}
                <Form.Item
                  name="price"
                  label={
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Price Range
                    </label>
                  }
                >
                  <Select
                    options={getPriceOptions()}
                    placeholder="Select Price"
                    style={{ width: "100%" }}
                  />
                </Form.Item>

                {/* Buttons */}
                <Form.Item>
                  <div className="flex gap-2">
                    <Button
                      block
                      onClick={clearFilters}
                      style={{
                        backgroundColor: "transparent",
                        borderColor: "#c2c6cb",
                        color: "#c2c6cb",
                      }}
                    >
                      Clear All
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </div>

            {/* Center: Results Area */}
            <div className="bg-black rounded-lg p-6 col-span-1 lg:col-span-1 space-y-6 overflow-y-auto max-h-[80vh] custom-scrollbar mobile-results-area">
              {filteredProperties.length > 0 ? (
                filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onPropertyClick={handlePropertyClick}
                  />
                ))
              ) : (
                <Empty
                  description={
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-[#c2c6cb] mb-2">
                        No Result Found
                      </h3>
                      <p className="text-[#c2c6cb]">
                        Try refining your search criteria or start a new search.
                      </p>
                    </div>
                  }
                />
              )}
            </div>

            {/* Right: Interest Form */}
            <div className="bg-black rounded-lg shadow-md p-6 col-span-1 mobile-results-area">
              <div className="px-4 py-2 mobile-results-area">
                <h3 className="text-lg font-semibold text-[#c2c6cb] m-2 text-center">
                  Interested in {currentLocation.name} Properties?
                </h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
        <ViewPopularLocation
          isOpen={isModalOpen}
          onClose={handleModalClose}
          location={selectedProperty}
        />
      </section>
    </ConfigProvider>
  );
};

export default PopularLocation;
