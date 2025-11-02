import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Drawer,
  Typography,
  Slider,
  InputNumber,
  Pagination,
  Card,
  Row,
  Col,
  Space,
  Tag,
  Radio,
  Tooltip,
  Divider,
  Collapse,
  List,
  Empty,
} from "antd";
import {
  FaFilter,
  FaEye,
  FaHeart,
  FaTh,
  FaList
} from "react-icons/fa";
import { Bed, Bath, Star, House, LandPlot, MapPinHouse, CalendarDays, Search, Ruler } from 'lucide-react';
import CustomInput from "../ui/Input";
import CustomSelect from "../ui/Select";
import CustomButton from "../ui/Button";
import "./AdvancedPropertySearch.css";
import { useNavigate, useLocation } from "react-router-dom";

const { Title, Text } = Typography;

// Custom options for CustomSelect
const areaOptions = [
  { value: "All Areas", label: "All Areas" },
  { value: "Gurgaon", label: "Gurgaon" },
  { value: "Marine Drive, Mumbai", label: "Marine Drive, Mumbai" },
  { value: "Electronic City, Bangalore", label: "Electronic City, Bangalore" },
];
const typeOptions = [
  { value: "Apartment", label: "Apartment" },
  { value: "Villa", label: "Villa" },
  { value: "Penthouse", label: "Penthouse" },
  { value: "Residential", label: "Residential" },
  { value: "Commercial", label: "Commercial" },
];
const statusOptions = [
  { value: "For Sale", label: "For Sale" },
  { value: "For Rent", label: "For Rent" },
  { value: "Hot Offer", label: "Hot Offer" },
  { value: "New Launch", label: "New Launch" },
  { value: "Ready to Move", label: "Ready to Move" },
  { value: "Sold", label: "Sold" },
  { value: "Available", label: "Available" },
];
const bedroomOptions = [
  { value: "Any", label: "Any" },
  { value: "1", label: "1 Bedroom" },
  { value: "2", label: "2 Bedrooms" },
  { value: "3", label: "3 Bedrooms" },
  { value: "4+", label: "4+ Bedrooms" },
];
const bathroomOptions = [
  { value: "Any", label: "Any" },
  { value: "1", label: "1 Bathroom" },
  { value: "2", label: "2 Bathrooms" },
  { value: "3", label: "3 Bathrooms" },
  { value: "4+", label: "4+ Bathrooms" },
];
const labelOptions = [
  { value: "Any", label: "Any" },
  { value: "featured", label: "Featured" },
  { value: "hot", label: "Hot" },
  { value: "new", label: "New" },
];
const countryOptions = [{ value: "101", label: "India" }];
const stateOptions = [{ value: "4030", label: "Haryana" }];
const cityOptions = [
  { value: "56798", label: "Gurgaon" },
  { value: "110001", label: "Delhi" },
  { value: "201301", label: "Noida" },
  { value: "400001", label: "Mumbai" },
  { value: "560001", label: "Bangalore" },
  { value: "600001", label: "Chennai" },
  { value: "411001", label: "Pune" },
];

// Mock properties (fallback)
const mockProperties = [
  {
    id: 1,
    name: "Luxury Penthouse with City View",
    location: "Sector 54, Gurgaon",
    area: "Sector 54, Gurgaon",
    price: 85000000,
    priceValue: 85000000,
    type: "Penthouse",
    status: "For Sale",
    bedrooms: "4 Beds",
    bathrooms: "3 Baths",
    bedsRange: "4 Beds",
    bathsRange: "3 Baths",
    bedroomsMin: 4,
    bedroomsMax: 4,
    bathroomsMin: 3,
    bathroomsMax: 3,
    yearBuilt: 2022,
    yearBuiltList: ["2022"],
    label: "featured",
    featured: true,
    countryId: 101,
    stateId: 4030,
    cityId: "56798",
    size: "2500 Sq Ft",
  },
];

// Gurgaon sectors
const gurgaonSectors = [
  "Sector 54, Gurgaon",
  "Sector 66, Gurgaon",
  "Sector 48, Gurgaon",
  "Sector 62, Gurgaon",
  "Sector 79, Gurgaon",
  "Sector 63, Gurgaon",
  "Sector 68, Gurgaon",
  "Sector 106, Gurgaon",
  "Sector 70, Gurgaon",
  "Sector 65, Gurgaon",
  "Sector 109, Gurgaon",
];

const AdvancedPropertySearch = ({
  open,
  onClose,
  countryId = [],
  setCountryId,
  stateId = [],
  setStateId,
  cityId = [],
  setCityId,
  area = [],
  setArea,
  status = [],
  setStatus,
  type = [],
  setType,
  bedrooms = [],
  setBedrooms,
  bathrooms = [],
  setBathrooms,
  minArea = 0,
  setMinArea,
  maxArea = 10000,
  setMaxArea,
  label = [],
  setLabel,
  yearBuilt = [],
  setYearBuilt,
  priceRange = [1000000, 1000000000],
  handlePriceChange,
  properties = [],
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("price-low");
  const [showFilters, setShowFilters] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [favoriteProperties, setFavoriteProperties] = useState(new Set());
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [filteredProperties, setFilteredProperties] = useState(properties.length > 0 ? properties : mockProperties);
  const [displayProperties, setDisplayProperties] = useState(properties.length > 0 ? properties : mockProperties);
  const pageSize = 9;
  const navigate = useNavigate();
  const routerLocation = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);
  const currentYear = new Date().getFullYear();

  // Debounce search query
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(searchQuery), 250);
    return () => clearTimeout(t);
  }, [searchQuery]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update displayProperties when props change
  useEffect(() => {
    const newDisplay = properties.length > 0 ? properties : mockProperties;
    setDisplayProperties(newDisplay);
    // Reset filtered to display on props change
    setFilteredProperties(newDisplay);
  }, [properties]);

  // Optimized filter function using useCallback
  const applyFilters = useCallback((propsToFilter, currentFilters) => {
    const {
      searchQuery: query,
      countryId: cId,
      stateId: sId,
      cityId: ctyId,
      area: a,
      status: st,
      type: t,
      bedrooms: b,
      bathrooms: ba,
      label: l,
      yearBuilt: yb,
      minArea: minA,
      maxArea: maxA,
      priceRange: pr,
      sortBy: sb
    } = currentFilters;

    return propsToFilter
      .filter((property) => {
        // Search match
        const matchesSearch = !query ||
          property.name?.toLowerCase().includes(query.toLowerCase()) ||
          property.location?.toLowerCase().includes(query.toLowerCase());

        // Location matches
        const matchesCountry = cId.length === 0 || cId.includes(property.countryId?.toString());
        const matchesState = sId.length === 0 || sId.includes(property.stateId?.toString());
        const matchesCity = ctyId.length === 0 || ctyId.includes(property.cityId?.toString());
        const matchesArea = a.length === 0 ||
          a.includes("All Areas") ||
          (a.includes("Gurgaon") && gurgaonSectors.some(sector => property.area?.includes(sector))) ||
          a.includes(property.area);

        // Basic matches
        const matchesStatus = st.length === 0 || st.includes(property.status);
        const matchesType = t.length === 0 || t.includes(property.type);

        // Bedrooms match
        const propMinBeds = property.bedroomsMin || 0;
        const propMaxBeds = property.bedroomsMax || 0;
        const matchesBedrooms = b.length === 0 ||
          b.includes("Any") ||
          b.some((bed) => {
            if (bed === "4+") return propMaxBeds >= 4;
            const bedNum = Number(bed);
            return !isNaN(bedNum) && propMinBeds <= bedNum && propMaxBeds >= bedNum;
          });

        // Bathrooms match
        const propMinBaths = property.bathroomsMin || 0;
        const propMaxBaths = property.bathroomsMax || 0;
        const matchesBathrooms = ba.length === 0 ||
          ba.includes("Any") ||
          ba.some((bath) => {
            if (bath === "4+") return propMaxBaths >= 4;
            const bathNum = Number(bath);
            return !isNaN(bathNum) && propMinBaths <= bathNum && propMaxBaths >= bathNum;
          });

        // Label match
        const matchesLabel = l.length === 0 ||
          l.includes("Any") ||
          l.includes(property.label);

        // Year built match
        const propYears = Array.isArray(property.yearBuiltList)
          ? property.yearBuiltList.map(y => y.toString())
          : [property.yearBuilt?.toString() || '2020'];
        const matchesYearBuilt = yb.length === 0 ||
          yb.some((y) => propYears.includes(y));

        // Area range match (allow 0 for On Request)
        const effectiveMinArea = Math.min(minA, maxA);
        const effectiveMaxArea = Math.max(minA, maxA);
        const matchesAreaRange = property.areaValue === 0 ||
          (property.areaValue >= effectiveMinArea && property.areaValue <= effectiveMaxArea);

        // Price range match (allow 0/null for On Request)
        const matchesPriceRange = property.priceValue === null ||
          property.priceValue === 0 ||
          (property.priceValue >= pr[0] && property.priceValue <= pr[1]);

        return matchesSearch &&
          matchesCountry &&
          matchesState &&
          matchesCity &&
          matchesArea &&
          matchesStatus &&
          matchesType &&
          matchesBedrooms &&
          matchesBathrooms &&
          matchesLabel &&
          matchesYearBuilt &&
          matchesAreaRange &&
          matchesPriceRange;
      })
      .sort((a, b) => {
        switch (sb) {
          case "price-low":
            return (a.priceValue || 0) - (b.priceValue || 0);
          case "price-high":
            return (b.priceValue || 0) - (a.priceValue || 0);
          case "area-large":
            return (b.areaValue || 0) - (a.areaValue || 0);
          case "area-small":
            return (a.areaValue || 0) - (b.areaValue || 0);
          case "newest":
            return (b.yearBuilt || 0) - (a.yearBuilt || 0);
          default:
            return 0;
        }
      });
  }, []);

  // Apply filters only on submit
  const onApply = useCallback(() => {
    const currentFilters = {
      searchQuery: debouncedQuery,
      countryId,
      stateId,
      cityId,
      area,
      status,
      type,
      bedrooms,
      bathrooms,
      label,
      yearBuilt,
      minArea,
      maxArea,
      priceRange,
      sortBy,
    };
    const updatedProperties = applyFilters(displayProperties, currentFilters);
    setFilteredProperties(updatedProperties);
    setCurrentPage(1);
  }, [debouncedQuery, countryId, stateId, cityId, area, status, type, bedrooms, bathrooms, label, yearBuilt, minArea, maxArea, priceRange, sortBy, displayProperties, applyFilters]);

  // Handle sort change - apply immediately since it's UI
  const handleSortChange = useCallback((value) => {
    setSortBy(value);
    // Re-apply filters with new sort
    const currentFilters = {
      searchQuery: debouncedQuery,
      countryId,
      stateId,
      cityId,
      area,
      status,
      type,
      bedrooms,
      bathrooms,
      label,
      yearBuilt,
      minArea,
      maxArea,
      priceRange,
      sortBy: value,
    };
    const updatedProperties = applyFilters(displayProperties, currentFilters);
    setFilteredProperties(updatedProperties);
    setCurrentPage(1);
  }, [debouncedQuery, countryId, stateId, cityId, area, status, type, bedrooms, bathrooms, label, yearBuilt, minArea, maxArea, priceRange, displayProperties, applyFilters]);

  // Paginated properties
  const paginatedProperties = useMemo(() =>
    filteredProperties.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    ),
    [filteredProperties, currentPage, pageSize]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleFavorite = (propertyId) => {
    const newFavorites = new Set(favoriteProperties);
    if (newFavorites.has(propertyId)) {
      newFavorites.delete(propertyId);
    } else {
      newFavorites.add(propertyId);
    }
    setFavoriteProperties(newFavorites);
  };

  const handleClearFilters = useCallback(() => {
    setCountryId([]);
    setStateId([]);
    setCityId([]);
    setArea([]);
    setStatus([]);
    setType([]);
    setBedrooms([]);
    setBathrooms([]);
    setLabel([]);
    setYearBuilt([]);
    setMinArea(0);
    setMaxArea(10000);
    handlePriceChange([1000000, 1000000000]);
    setSearchQuery("");
    setDebouncedQuery("");
    setSortBy("price-low");
    setFilteredProperties(displayProperties);
    setCurrentPage(1);
  }, [displayProperties, handlePriceChange]);

  const handlePriceChangeWrapper = (value) => {
    let [min, max] = value;
    if (min > max) {
      [min, max] = [max, min];
    }
    handlePriceChange([min, max]);
  };

  // No auto-apply on filter change - only page reset if needed, but since apply is manual, no useEffect for filters

  const getStatusColor = (status) => {
    switch (status) {
      case "For Sale":
        return "green";
      case "For Rent":
        return "blue";
      case "Hot Offer":
        return "red";
      default:
        return "purple";
    }
  };

  const removeFilterValue = useCallback((filterKey, value) => {
    switch (filterKey) {
      case "area":
        setArea(prev => prev.filter((a) => a !== value));
        break;
      case "type":
        setType(prev => prev.filter((t) => t !== value));
        break;
      case "status":
        setStatus(prev => prev.filter((s) => s !== value));
        break;
      case "bedrooms":
        setBedrooms(prev => prev.filter((b) => b !== value));
        break;
      case "bathrooms":
        setBathrooms(prev => prev.filter((b) => b !== value));
        break;
      case "label":
        setLabel(prev => prev.filter((l) => l !== value));
        break;
      case "yearBuilt":
        setYearBuilt(prev => prev.filter((y) => y !== value));
        break;
      case "countryId":
        setCountryId(prev => prev.filter((c) => c !== value));
        break;
      case "stateId":
        setStateId(prev => prev.filter((s) => s !== value));
        break;
      case "cityId":
        setCityId(prev => prev.filter((c) => c !== value));
        break;
      default:
        break;
    }
  }, []);

  // Active chips
  const activeChips = useMemo(() => {
    const chips = [];
    area.forEach((a) => a && chips.push({ key: `area:${a}`, label: a, filterKey: "area" }));
    type.forEach((t) => t && chips.push({ key: `type:${t}`, label: t, filterKey: "type" }));
    status.forEach((s) => s && chips.push({ key: `status:${s}`, label: s, filterKey: "status" }));
    bedrooms.forEach((b) => b && chips.push({ key: `bed:${b}`, label: b, filterKey: "bedrooms" }));
    bathrooms.forEach((b) => b && chips.push({ key: `bath:${b}`, label: b, filterKey: "bathrooms" }));
    label.forEach((l) => l && chips.push({ key: `label:${l}`, label: l, filterKey: "label" }));
    yearBuilt.forEach((y) => y && chips.push({ key: `year:${y}`, label: y, filterKey: "yearBuilt" }));
    countryId.forEach((c) => c && chips.push({ key: `country:${c}`, label: `Country:${c}`, filterKey: "countryId" }));
    stateId.forEach((s) => s && chips.push({ key: `state:${s}`, label: `State:${s}`, filterKey: "stateId" }));
    cityId.forEach((c) => c && chips.push({ key: `city:${c}`, label: `City:${c}`, filterKey: "cityId" }));
    return chips;
  }, [area, type, status, bedrooms, bathrooms, label, yearBuilt, countryId, stateId, cityId]);

  const yearOptions = useMemo(() =>
    Array.from({ length: 126 }, (_, i) => currentYear - i).map((year) => ({
      value: year.toString(),
      label: year.toString(),
    })),
    [currentYear]);

  const getFormattedArea = useCallback((property) => {
    const sizeStr = property.size?.trim();
    if (!sizeStr || sizeStr.includes("On Request") || sizeStr.includes("Request")) {
      return "On Request";
    }
    const rangeMatch = sizeStr.match(/(\d+(?:\.\d+)?)\s*[-–]\s*(\d+(?:\.\d+)?)\s*(Sq Ft|sqft|Sqft)/i);
    if (rangeMatch) {
      const min = parseInt(rangeMatch[1]).toLocaleString();
      const max = parseInt(rangeMatch[2]).toLocaleString();
      const unit = rangeMatch[3]?.toUpperCase() || "Sq Ft";
      return `${min} - ${max} ${unit}`;
    }
    const singleMatch = sizeStr.match(/(\d+(?:\.\d+)?)\s*(Sq Ft|sqft|Sqft)/i);
    if (singleMatch) {
      const value = parseInt(singleMatch[1]).toLocaleString();
      const unit = singleMatch[2]?.toUpperCase() || "Sq Ft";
      return `${value} ${unit}`;
    }
    return "On Request";
  }, []);

  const getFormattedPrice = useCallback((property) => {
    let priceStr = property.price?.replace(/\*/g, '').trim();
    if (!priceStr) return "On Request";
    const requestVariants = ["On Request", "₹On Request", "₹ On Request", "Price on Request", "₹ Price on Request"];
    if (requestVariants.some(variant => priceStr.includes(variant))) return "On Request";
    if (priceStr.includes(" - ") || priceStr.includes("-")) {
      priceStr = priceStr.replace(/\s*[-–]\s*/g, ' - ').replace(/₹\s*/g, '₹');
      return priceStr;
    }
    let rawPrice = property.priceValue;
    if (!rawPrice || rawPrice === 0) {
      const numMatch = priceStr.match(/[\d.]+/);
      if (numMatch) {
        const num = parseFloat(numMatch[0]);
        if (priceStr.toLowerCase().includes("cr") || priceStr.toLowerCase().includes("crore")) {
          rawPrice = num * 10000000;
        } else if (priceStr.toLowerCase().includes("l") || priceStr.toLowerCase().includes("lakh")) {
          rawPrice = num * 100000;
        } else {
          rawPrice = num;
        }
      }
    }
    if (!rawPrice || isNaN(rawPrice) || rawPrice === 0) return "On Request";
    const crores = rawPrice / 10000000;
    if (crores < 1) {
      const lakhs = rawPrice / 100000;
      return `₹${Math.round(lakhs)} L`;
    } else {
      return `₹${Math.round(crores)} Cr`;
    }
  }, []);

  const handleNavigate = useCallback((property) => {
    const propertyName = property.name
      .toLowerCase()
      .replace(/\s+/g, "-");
    const routeType = property.type.toLowerCase() === "commercial" ? "commercial" : "residential";
    navigate(`/projects/${routeType}/${propertyName}`, {
      state: {
        from: routerLocation.pathname,
        property: property
      },
    });
  }, [routerLocation.pathname, navigate]);

  return (
    <Drawer
      title={
        <div className="advanced-title">
          <Space className="advanced-property-title">
            <Title level={4} className="m-0 advanced-text font-[Inter]">
              Advanced Property Search
            </Title>
            <Text type="secondary" className="text-[#c2c6cb]">
              {filteredProperties.length} properties found
            </Text>
          </Space>
          <Space className="property-button-section">
            <CustomButton
              className="property-card-action-button"
              icon={<FaFilter className="text-[#c2c6cb]" />}
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </CustomButton>
            <CustomButton
              type="danger"
              onClick={handleClearFilters}
              className="cancelButton"
            >
              Clear All
            </CustomButton>
          </Space>
        </div>
      }
      placement="right"
      onClose={onClose}
      open={open}
      width="95%"
      className="advanced-property-drawer"
    >
      <div className="noactive-main">
        {showFilters && (
          <div className="filters-panel custom-scrollbar">
            <div className="filters-panel-contain">
              <Space
                direction="vertical"
                size="small"
                className="filters-space"
              >
                <CustomInput
                  prefix={<Search className="text-[#c2c6cb]" />}
                  placeholder="Search by name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <div className="chips-container">
                  {activeChips.length === 0 ? (
                    <Text type="secondary" className="text-[#c2c6cb]">No active filters</Text>
                  ) : (
                    activeChips.slice(0, 6).map((chip) => (
                      <Tag
                        key={chip.key}
                        closable
                        onClose={() => removeFilterValue(chip.filterKey, chip.label)}
                        className="chip-tag"
                      >
                        {chip.label}
                      </Tag>
                    ))
                  )}
                </div>
                <Divider className="filters-divider" />
              </Space>
            </div>
            <Collapse defaultActiveKey={isMobile ? [] : ["basic", "advanced"]} ghost items={[
              {
                key: "basic",
                label: <b className="text-[#c2c6cb]">Basic Filters</b>,
                children: (
                  <Space direction="vertical" size="middle" className="filters-space">
                    <div>
                      <span className="filter-label flex items-center text-[#c2c6cb]">
                        <MapPinHouse className="filter-icon text-[#c2c6cb]" />
                        Location
                      </span>
                      <CustomSelect
                        mode="multiple"
                        placeholder="Select Areas"
                        value={area}
                        onChange={setArea}
                        className="filter-select"
                        allowClear
                        showSearch
                        options={areaOptions}
                      />
                    </div>
                    <div>
                      <span className="filter-label flex items-center text-[#c2c6cb]">
                        <House className="filter-icon text-[#c2c6cb]" />
                        Property Type
                      </span>
                      <CustomSelect
                        mode="multiple"
                        placeholder="Select Types"
                        value={type}
                        onChange={setType}
                        className="filter-select"
                        allowClear
                        showSearch
                        options={typeOptions}
                      />
                    </div>
                    <div>
                      <span className="filter-label flex items-center text-[#c2c6cb]">
                        <Star className="filter-icon text-[#c2c6cb]" />
                        Status
                      </span>
                      <CustomSelect
                        mode="multiple"
                        placeholder="Select Status"
                        value={status}
                        onChange={setStatus}
                        className="filter-select"
                        allowClear
                        showSearch
                        options={statusOptions}
                      />
                    </div>
                    <div>
                      <span className="filter-label flex items-center text-[#c2c6cb]">
                        <Bed className="filter-icon text-[#c2c6cb]" />
                        Bedrooms
                      </span>
                      <CustomSelect
                        mode="multiple"
                        placeholder="Select Bedrooms"
                        value={bedrooms}
                        onChange={setBedrooms}
                        className="filter-select"
                        allowClear
                        showSearch
                        options={bedroomOptions}
                      />
                    </div>
                    <div>
                      <span className="filter-label flex items-center text-[#c2c6cb]">
                        <Bath className="filter-icon text-[#c2c6cb]" />
                        Bathrooms
                      </span>
                      <CustomSelect
                        mode="multiple"
                        placeholder="Select Bathrooms"
                        value={bathrooms}
                        onChange={setBathrooms}
                        className="filter-select"
                        allowClear
                        showSearch
                        options={bathroomOptions}
                      />
                    </div>
                  </Space>
                ),
                className: "fontFamily-bebas",
              },
              {
                key: "advanced",
                label: <b className="text-[#c2c6cb]">Advanced Filters</b>,
                children: (
                  <Space direction="vertical" size="middle" className="filters-space">
                    <div>
                      <Slider
                        range
                        min={1000000}
                        max={1000000000}
                        step={1000000}
                        value={priceRange}
                        onChange={handlePriceChangeWrapper}
                        onAfterChange={handlePriceChangeWrapper}
                        tooltip={{
                          formatter: (value) => {
                            const crores = value / 10000000;
                            return Number.isInteger(crores)
                              ? `₹${crores} Cr`
                              : `₹${crores.toFixed(1)} Cr`;
                          },
                        }}
                        className="price-slider"
                      />
                      <Space className="price-inputs">
                        <InputNumber
                          value={priceRange[0]}
                          onChange={(value) =>
                            handlePriceChange([value || 1000000, priceRange[1]])
                          }
                          formatter={(value) => {
                            const crores = value / 10000000;
                            return Number.isInteger(crores)
                              ? `₹${crores} Cr`
                              : `₹${crores.toFixed(1)} Cr`;
                          }}
                          parser={(value) =>
                            parseFloat(value.replace(/[^0-9.]/g, "")) * 10000000
                          }
                          className="price-input"
                        />
                        <InputNumber
                          value={priceRange[1]}
                          onChange={(value) =>
                            handlePriceChange([priceRange[0], value || 1000000000])
                          }
                          formatter={(value) => {
                            const crores = value / 10000000;
                            return Number.isInteger(crores)
                              ? `₹${crores} Cr`
                              : `₹${crores.toFixed(1)} Cr`;
                          }}
                          parser={(value) =>
                            parseFloat(value.replace(/[^0-9.]/g, "")) * 10000000
                          }
                          className="price-input"
                        />
                      </Space>
                    </div>
                    <div>
                      <span className="filter-label flex items-center text-[#c2c6cb]">
                        <LandPlot className="filter-icon text-[#c2c6cb]" />
                        Area Range (Sq Ft)
                      </span>
                      <Space className="area-inputs">
                        <InputNumber
                          placeholder="Min"
                          value={minArea}
                          onChange={(value) => setMinArea(value || 0)}
                          className="area-input"
                        />
                        <InputNumber
                          placeholder="Max"
                          value={maxArea}
                          onChange={(value) => setMaxArea(value || 10000)}
                          className="area-input"
                        />
                      </Space>
                    </div>
                    <div>
                      <span className="filter-label flex items-center text-[#c2c6cb]">
                        <CalendarDays className="filter-icon text-[#c2c6cb]" />
                        Year Built
                      </span>
                      <CustomSelect
                        mode="multiple"
                        placeholder="Select Years"
                        value={yearBuilt}
                        onChange={setYearBuilt}
                        className="filter-select"
                        allowClear
                        showSearch
                        options={yearOptions}
                      />
                    </div>
                    <div>
                      <span className="filter-label flex items-center text-[#c2c6cb]">
                        <Star className="filter-icon text-[#c2c6cb]" />
                        Labels
                      </span>
                      <CustomSelect
                        mode="multiple"
                        placeholder="Select Labels"
                        value={label}
                        onChange={setLabel}
                        className="filter-select"
                        allowClear
                        showSearch
                        options={labelOptions}
                      />
                    </div>
                    <div>
                      <span className="filter-label flex items-center text-[#c2c6cb]">
                        <MapPinHouse className="filter-icon text-[#c2c6cb]" />
                        Country
                      </span>
                      <CustomSelect
                        mode="multiple"
                        placeholder="Select Countries"
                        value={countryId}
                        onChange={setCountryId}
                        className="filter-select"
                        allowClear
                        showSearch
                        options={countryOptions}
                      />
                    </div>
                    <div>
                      <span className="filter-label flex items-center text-[#c2c6cb]">
                        <MapPinHouse className="filter-icon text-[#c2c6cb]" />
                        State
                      </span>
                      <CustomSelect
                        mode="multiple"
                        placeholder="Select States"
                        value={stateId}
                        onChange={setStateId}
                        className="filter-select"
                        allowClear
                        showSearch
                        options={stateOptions}
                      />
                    </div>
                    <div>
                      <span className="filter-label flex items-center text-[#c2c6cb]">
                        <MapPinHouse className="filter-icon text-[#c2c6cb]" />
                        City
                      </span>
                      <CustomSelect
                        mode="multiple"
                        placeholder="Select Cities"
                        value={cityId}
                        onChange={setCityId}
                        className="filter-select"
                        allowClear
                        showSearch
                        options={cityOptions}
                      />
                    </div>
                  </Space>
                ),
                className: "fontFamily-bebas",
              },
            ]} />
            <div className="filters-footer">
              <Space className="filters-footer-buttons">
                <CustomButton
                  onClick={handleClearFilters}
                  className="property-card-action-button"
                >
                  Reset
                </CustomButton>
                <CustomButton
                  type="primary"
                  onClick={onApply}
                  className="property-card-action-button"
                >
                  Apply
                </CustomButton>
              </Space>
            </div>
          </div>
        )}
        <div className="properties-container custom-scrollbar">
          <div className="properties-header">
            <div className="view-mode-container">
              <div className="radio-group-container">
                <Radio.Group
                  value={viewMode}
                  onChange={(e) => setViewMode(e.target.value)}
                  buttonStyle="solid"
                  className="view-mode-radio"
                >
                  <Radio.Button value="grid" className="radio-button">
                    <FaTh className="text-[#c2c6cb]" />
                  </Radio.Button>
                  <Radio.Button value="list" className="radio-button">
                    <FaList className="text-[#c2c6cb]" />
                  </Radio.Button>
                </Radio.Group>
              </div>
            </div>
          </div>
          {/* {activeChips.length > 0 && (
            <div className="chips-container">
              {activeChips.map((chip) => (
                <Tag
                  key={chip.key}
                  closable
                  onClose={() => removeFilterValue(chip.filterKey, chip.label)}
                  className="chip-tag"
                >
                  {chip.label}
                </Tag>
              ))}
            </div>
          )} */}
          {filteredProperties.length > 0 ? (
            <>
              {viewMode === "grid" ? (
                <Row gutter={[20, 20]}>
                  {paginatedProperties.map((property) => (
                    <Col xs={24} sm={12} lg={8} key={property.id}>
                      <Card
                        hoverable
                        styles={{ body: { padding: 18 } }}
                        className="property-card"
                        cover={
                          <div className="card-image-container">
                            <img
                              alt={property.name}
                              src={property.image}
                              className="card-image"
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.transform = "scale(1.08)")
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.transform = "scale(1)")
                              }
                            />
                            <div className="card-tags m-0 p-0">
                              {property.featured && (
                                <Tag className="featured-tag">Featured</Tag>
                              )}
                              <Tag
                                className={`status-tag m-0 p-1 flex justify-center items-center ${property.status
                                  .toLowerCase()
                                  .replace(" ", "-")}`}
                              >
                                {property.status}
                              </Tag>
                            </div>
                            <div className="card-actions">
                              <Tooltip title="Favorite">
                                <div
                                  onClick={() => toggleFavorite(property.id)}
                                  className="action-button advanced-section-action"
                                >
                                  <FaHeart
                                    className={
                                      favoriteProperties.has(property.id)
                                        ? "favorite-icon active"
                                        : "favorite-icon"
                                    }
                                  />
                                </div>
                              </Tooltip>
                              <Tooltip title="View">
                                <div className="action-button advanced-section-action" onClick={() => handleNavigate(property)}>
                                  <FaEye />
                                </div>
                              </Tooltip>
                            </div>
                            <div className="card-footer">
                              <div className="card-footer-content">
                                <div className="card-price"> {getFormattedPrice(property)} </div>
                                <div className="card-area flex items-center justify-end "><span><Ruler className="mr-1 w-5 h-5" /> </span> {getFormattedArea(property)}</div>
                              </div>
                            </div>
                          </div>
                        }
                      >
                        <Card.Meta
                          title={
                            <Tooltip title={property.name} placement="top">
                              <div className="card-title">{property.name}</div>
                            </Tooltip>
                          }
                          description={
                            <div className="card-description p-2">
                              <div className="card-location">
                                <MapPinHouse className="location-icon" />{" "}
                                {property.location}
                              </div>
                              <div className="card-details">
                                <div className="card-details-content">
                                  <Text className="card-detail-item">
                                    <Bed className="text-[#c2c6cb]" /> {property.bedsRange || '0 Beds'}
                                  </Text>
                                  <Text className="card-detail-item">
                                    <Bath className="text-[#c2c6cb]" /> {property.bathsRange || '0 Baths'}
                                  </Text>
                                  <Tag color="default" className="capitalize bg-[#444] property-advanced">{property.type}</Tag>
                                </div>
                                <CustomButton
                                  type="primary"
                                  className="property-card-action-button"
                                  onClick={() => handleNavigate(property)}
                                >
                                  View Details
                                </CustomButton>
                              </div>
                            </div>
                          }
                        />
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <List
                  className="flex flex-col gap-1"
                  itemLayout="vertical"
                  dataSource={paginatedProperties}
                  renderItem={(property) => (
                    <List.Item
                      actions={[
                        <CustomButton
                          type="primary"
                          key="view"
                          className="property-card-action-button"
                          onClick={() => handleNavigate(property)}
                        >
                          View Details
                        </CustomButton>,
                      ]}
                      extra={
                        <img
                          width={340}
                          alt={property.name}
                          src={property.image}
                          className="cehcek"
                        />
                      }
                    >
                      <List.Item.Meta
                        title={
                          <div className="list-title">{property.name}</div>
                        }
                        description={
                          <div className="checked">
                            <Text className="location-list flex gap-1">
                              <MapPinHouse className="text-[#c2c6cb]" />
                              <p className="m-0 p-0">{property.location}</p>
                            </Text>
                            <div className="list-details">
                              <div className="list-details-content flex items-center justify-center flex-col text-[#c2c6cb]">
                                <Bed className="text-[#c2c6cb]" />
                                <p>{property.bedsRange || property.bedrooms || '0 Beds'}</p>
                              </div>
                              <div className="list-details-content flex items-center justify-center flex-col text-[#c2c6cb]">
                                <Bath className="text-[#c2c6cb]" />
                                <p>{property.bathsRange || property.bathrooms || '0 Baths'}</p>
                              </div>
                              <div className="list-details-content flex items-center justify-center flex-col text-[#c2c6cb]">
                                <LandPlot className="text-[#c2c6cb]" />
                                <p>{getFormattedArea(property)}</p>
                              </div>
                              <div className="list-details-content flex items-center justify-center flex-col text-[#c2c6cb]">
                                <CalendarDays className="text-[#c2c6cb]" />
                                <p>{property.yearBuilt || 2020} Year</p>
                              </div>
                            </div>
                            <div className="list-tags">
                              <Tag color="default" className="capitalize property-advanced">{property.type}</Tag>
                              <Tag color={getStatusColor(property.status)} className="for-list-tag">
                                {property.status}
                              </Tag>
                            </div>
                            <div className="listmode-price py-1"> {getFormattedPrice(property)} </div>
                            <div className="listmode-area">
                              <Ruler />
                              <p>{getFormattedArea(property)}</p>
                            </div>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              )}
              <div className="pagination-container">
                <Pagination
                  current={currentPage}
                  total={filteredProperties.length}
                  pageSize={pageSize}
                  onChange={handlePageChange}
                />
              </div>
            </>
          ) : (
            <div className="no-properties">
              <Empty description={
                <Title level={3} className="text-[#c2c6cb]">No Properties Found</Title>
              } />
              <Text className="text-[#c2c6cb]">
                We couldn't find any properties matching your search criteria.
                Try adjusting your filters or search terms.
              </Text>
              <div className="no-properties-button">
                <CustomButton
                  type="primary"
                  onClick={handleClearFilters}
                  className="cancelButton"
                >
                  Clear All Filters
                </CustomButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </Drawer>
  );
};

export default AdvancedPropertySearch;