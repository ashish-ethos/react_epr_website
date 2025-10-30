
import React, { useState, useEffect } from "react";
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
import { Bed, Bath, Star, House, LandPlot, MapPinHouse, CalendarDays, Search } from 'lucide-react';

import CustomInput from "../ui/Input";
import CustomSelect from "../ui/Select";
import CustomButton from "../ui/Button";
import "./AdvancedPropertySearch.css";
import { useNavigate, useLocation } from "react-router-dom";

const { Title, Text } = Typography;

// Custom options for CustomSelect
const areaOptions = [
  { value: "All Areas", label: "All Areas" },
  { value: " Gurgaon", label: "Gurgaon" },
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
    bedrooms: 4,
    bathrooms: 3,
    areaValue: 2500,
    yearBuilt: 2022,
    label: "featured",
    featured: true,
    countryId: 101,
    stateId: 4030,
    cityId: "56798",
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
  const location = useLocation();
  const displayProperties = properties.length > 0 ? properties : mockProperties;
  const [filteredProperties, setFilteredProperties] = useState(displayProperties);
  const pageSize = 9;
  const navigate = useNavigate();
  const isMobile =  window.innerWidth < 800;
  

  const currentYear = new Date().getFullYear();

  // Debounce search query for better UX
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(searchQuery), 250);
    return () => clearTimeout(t);
  }, [searchQuery]);

  

  const formatPrice = (price, priceValue) => {
    const rawPrice = price ?? priceValue;
    if (!rawPrice || isNaN(Number(rawPrice))) return "On Request";
    return `₹${(Number(rawPrice) / 10000000).toFixed(1)} Cr`;
  };

  const getFormattedPrice = (property) => {
    let rawPrice = property.priceValue ?? 0;

    if (typeof rawPrice === "string") {
      rawPrice = rawPrice.replace(/[^0-9.]/g, "");
    }

    const numPrice = parseFloat(rawPrice);

    if (!numPrice || isNaN(numPrice)) {
      return "On Request";
    }

    let crores = numPrice / 10000000;

    if (Number.isInteger(crores)) {
      return `${crores} Cr`;
    }

    return `${crores.toFixed(1)} Cr`;
  };

  const onApply = () => {
    const updatedProperties = displayProperties
      .filter((property) => {
        const matchesSearch =
          !debouncedQuery ||
          property.name?.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          property.location?.toLowerCase().includes(debouncedQuery.toLowerCase());

        const matchesCountry =
          countryId.length === 0 ||
          countryId.includes(property.countryId?.toString());
        const matchesState =
          stateId.length === 0 ||
          stateId.includes(property.stateId?.toString());
        const matchesCity =
          cityId.length === 0 || cityId.includes(property.cityId?.toString());
        const matchesArea =
          area.length === 0 ||
          area.includes("All Areas") ||
          (area.includes("Gurgaon") &&
            gurgaonSectors.includes(property.area)) ||
          area.includes(property.area);
        const matchesStatus =
          status.length === 0 || status.includes(property.status);
        const matchesType = type.length === 0 || type.includes(property.type);
        const matchesBedrooms =
          bedrooms.length === 0 ||
          bedrooms.includes("Any") ||
          bedrooms.some((bed) => {
            if (!property.bedrooms) return false;
            if (bed.includes("+")) {
              const min = Number(bed.replace("+", ""));
              return property.bedrooms >= min;
            }
            if (bed.includes("-")) {
              const [min, max] = bed.split("-").map(Number);
              return property.bedrooms >= min && property.bedrooms <= max;
            }
            return property.bedrooms.toString() === bed;
          });
        const matchesBathrooms =
          bathrooms.length === 0 ||
          bathrooms.includes("Any") ||
          bathrooms.some((bath) => {
            if (!property.bathrooms) return false;
            if (bath.includes("+")) {
              const min = Number(bath.replace("+", ""));
              return property.bathrooms >= min;
            }
            if (bath.includes("-")) {
              const [min, max] = bath.split("-").map(Number);
              return property.bathrooms >= min && property.bathrooms <= max;
            }
            return property.bathrooms.toString() === bath;
          });
        const matchesLabel =
          label.length === 0 ||
          label.includes("Any") ||
          label.includes(property.label);
        const matchesYearBuilt =
          yearBuilt.length === 0 ||
          yearBuilt.includes(property.yearBuilt?.toString());
        const effectiveMinArea = minArea <= maxArea ? minArea : maxArea;
        const effectiveMaxArea = minArea <= maxArea ? maxArea : minArea;
        const matchesAreaRange =
          property.areaValue >= effectiveMinArea &&
          property.areaValue <= effectiveMaxArea;
        const matchesPriceRange =
          property.priceValue === null ||
          property.priceValue === 0 ||
          (property.priceValue >= priceRange[0] &&
            property.priceValue <= priceRange[1]);

        return (
          matchesSearch &&
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
          matchesPriceRange
        );
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "price-low":
            return a.priceValue - b.priceValue;
          case "price-high":
            return b.priceValue - a.priceValue;
          case "area-large":
            return b.areaValue - a.areaValue;
          case "area-small":
            return a.areaValue - b.areaValue;
          case "newest":
            return b.yearBuilt - a.yearBuilt;
          default:
            return 0;
        }
      });
    setFilteredProperties(updatedProperties);
  };

  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

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

  // Clear all filters
  const handleClearFilters = () => {
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
    setCurrentPage(1);
    setSearchQuery("");
    setFilteredProperties(displayProperties);
  };

  const handlePriceChangeWrapper = (value) => {
    let [min, max] = value;
    if (min > max) {
      [min, max] = [max, min];
    }
    handlePriceChange([min, max]);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [
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
    debouncedQuery,
  ]);

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

  // Helpers to remove specific filter items
  const removeFilterValue = (filterKey, value) => {
    switch (filterKey) {
      case "area":
        setArea(area.filter((a) => a !== value));
        break;
      case "type":
        setType(type.filter((t) => t !== value));
        break;
      case "status":
        setStatus(status.filter((s) => s !== value));
        break;
      case "bedrooms":
        setBedrooms(bedrooms.filter((b) => b !== value));
        break;
      case "bathrooms":
        setBathrooms(bathrooms.filter((b) => b !== value));
        break;
      case "label":
        setLabel(label.filter((l) => l !== value));
        break;
      case "yearBuilt":
        setYearBuilt(yearBuilt.filter((y) => y !== value));
        break;
      case "countryId":
        setCountryId(countryId.filter((c) => c !== value));
        break;
      case "stateId":
        setStateId(stateId.filter((s) => s !== value));
        break;
      case "cityId":
        setCityId(cityId.filter((c) => c !== value));
        break;
      default:
        break;
    }
  };

  const activeChips = [];
  area.forEach(
    (a) =>
      a && activeChips.push({ key: `area:${a}`, label: a, filterKey: "area" })
  );
  type.forEach(
    (t) =>
      t && activeChips.push({ key: `type:${t}`, label: t, filterKey: "type" })
  );
  status.forEach(
    (s) =>
      s &&
      activeChips.push({ key: `status:${s}`, label: s, filterKey: "status" })
  );
  bedrooms.forEach(
    (b) =>
      b &&
      activeChips.push({ key: `bed:${b}`, label: b, filterKey: "bedrooms" })
  );
  bathrooms.forEach(
    (b) =>
      b &&
      activeChips.push({ key: `bath:${b}`, label: b, filterKey: "bathrooms" })
  );
  label.forEach(
    (l) =>
      l && activeChips.push({ key: `label:${l}`, label: l, filterKey: "label" })
  );
  yearBuilt.forEach(
    (y) =>
      y &&
      activeChips.push({ key: `year:${y}`, label: y, filterKey: "yearBuilt" })
  );
  countryId.forEach(
    (c) =>
      c &&
      activeChips.push({
        key: `country:${c}`,
        label: `Country:${c}`,
        filterKey: "countryId",
      })
  );
  stateId.forEach(
    (s) =>
      s &&
      activeChips.push({
        key: `state:${s}`,
        label: `State:${s}`,
        filterKey: "stateId",
      })
  );
  cityId.forEach(
    (c) =>
      c &&
      activeChips.push({
        key: `city:${c}`,
        label: `City:${c}`,
        filterKey: "cityId",
      })
  );

  // Year options for CustomSelect
  const yearOptions = Array.from(
    { length: 126 },
    (_, i) => currentYear - i
  ).map((year) => ({
    value: year.toString(),
    label: year.toString(),
  }));

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
                        onClose={() =>
                          removeFilterValue(chip.filterKey, chip.label)
                        }
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
                        onChange={(value) => {
                          const [min, max] = value;
                          handlePriceChange([Math.min(min, max), Math.max(min, max)]);
                        }}
                        onAfterChange={(value) => {
                          const [min, max] = value;
                          handlePriceChange([Math.min(min, max), Math.max(min, max)]);
                        }}
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

          {activeChips.length > 0 && (
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
          )}

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
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.transform = "translateY(-8px)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.transform = "translateY(0)")
                        }
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
                                className={`status-tag m-0 p-0 flex justify-center items-center ${property.status
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
                                <div className="action-button advanced-section-action">
                                  <FaEye
                                    onClick={() => {
                                      const propertyName = property.name
                                        .toLowerCase()
                                        .replace(/\s+/g, "-");
                                      const routeType =
                                        property.type.toLowerCase() === "commercial"
                                          ? "commercial"
                                          : "residential";
                                      navigate(`/projects/${routeType}/${propertyName}`, {
                                        state: { from: location.pathname },
                                      });
                                    }}
                                  />
                                </div>
                              </Tooltip>
                            </div>
                            <div className="card-footer">
                              <div className="card-footer-content">
                                <div className="card-price">₹ {getFormattedPrice(property)} </div>
                                <div className="card-area">{property.areaValue} sq ft</div>
                              </div>
                            </div>
                          </div>
                        }
                      >
                        <Card.Meta
                          title={
                            <div className="card-title">{property.name}</div>
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
                                    <Bed className="text-[#c2c6cb]" /> {property.bedrooms} Beds
                                  </Text>
                                  <Text className="card-detail-item">
                                    <Bath className="text-[#c2c6cb]" /> {property.bathrooms} Baths
                                  </Text>
                                  <Tag color="default" className="capitalize bg-[#444] property-advanced">{property.type} </Tag>
                                </div>
                                <CustomButton
                                  type="primary"
                                  className="property-card-action-button"
                                  onClick={() => {
                                    const propertyName = property.name
                                      .toLowerCase()
                                      .replace(/\s+/g, "-");
                                    const routeType =
                                      property.type.toLowerCase() === "commercial"
                                        ? "commercial"
                                        : "residential";
                                    navigate(`/projects/${routeType}/${propertyName}`, {
                                      state: { from: location.pathname },
                                    });
                                  }}
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
                          onClick={() => {
                            const propertyName = property.name
                              .toLowerCase()
                              .replace(/\s+/g, "-");
                            const routeType =
                              property.type.toLowerCase() === "commercial"
                                ? "commercial"
                                : "residential";
                            navigate(`/projects/${routeType}/${propertyName}`, {
                              state: { from: location.pathname },
                            });
                          }}
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
                                <p>{property.bedrooms} Beds</p>
                              </div>
                              <div className="list-details-content flex items-center justify-center flex-col text-[#c2c6cb]">
                                <Bath className="text-[#c2c6cb]" />
                                <p>{property.bathrooms} Baths</p>
                              </div>
                              <div className="list-details-content flex items-center justify-center flex-col text-[#c2c6cb]">
                                <LandPlot className="text-[#c2c6cb]" />
                                <p>{property.areaValue} sq ft</p>
                              </div>
                              <div className="list-details-content flex items-center justify-center flex-col text-[#c2c6cb]">
                                <CalendarDays className="text-[#c2c6cb]" />
                                <p>{property.yearBuilt} Year</p>
                              </div>
                            </div>
                            <div className="list-tags">
                              <Tag color="default" className="capitalize property-advanced">{property.type}</Tag>
                              <Tag color={getStatusColor(property.status)} className="for-list-tag">
                                {property.status}
                              </Tag>
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