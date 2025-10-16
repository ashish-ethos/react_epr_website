import React, { useState, useEffect } from "react";
import { Row, Col, Card, Tag } from "antd";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import { DownOutlined } from "@ant-design/icons";
// import video
import backgroundVideo from "../../assets/images/home/banner_video.mp4";
import posterImage from "../../assets/images/home/main_background.jpg"; 
import "./Hero.css";
import CustomInput from "../ui/Input";
import CustomSelect from "../ui/Select";
import CustomButton from "../ui/Button";

const Hero = ({ onSearchChange }) => {
  const [searchText, setSearchText] = useState("");
  const [propertyType, setPropertyType] = useState([]);
  const [selectedCity, setSelectedCity] = useState([]);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false); // lazy load video

  const screens = useBreakpoint();

  useEffect(() => {
    // Load video after first paint
    const timer = setTimeout(() => setIsVideoLoaded(true), 500); // delay 0.5s
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    onSearchChange({ search: value });
  };

  const handleTypeSelect = (value) => {
    setPropertyType(value);
    onSearchChange({ type: value });
  };

  const handleCitySelect = (value) => {
    setSelectedCity(value);
    onSearchChange({ city: value });
  };

  const propertyTypeOptions = [
    { value: "food-court", label: "Food Court", group: "Commercial" },
    { value: "office", label: "Office", group: "Commercial" },
    { value: "plot-commercial", label: "Plot", group: "Commercial" },
    { value: "shop", label: "Shop", group: "Commercial" },
    { value: "villa-commercial", label: "Villa", group: "Commercial" },
    { value: "apartment", label: "Apartment", group: "Residential" },
    { value: "penthouse", label: "Penthouse", group: "Residential" },
    { value: "plot-residential", label: "Plot", group: "Residential" },
    { value: "studio", label: "Studio", group: "Residential" },
    { value: "villa-residential", label: "Villa", group: "Residential" },
  ];

  const cityOptions = [
    "gurgaon",
    "delhi",
    "noida",
    "mumbai",
    "bangalore",
    "chennai",
    "pune",
  ];

  const tagRender = (props) => {
    const { label, closable, onClose } = props;
    return (
      <Tag closable={closable} onClose={onClose} className="hero-tag">
        {label}
      </Tag>
    );
  };

  const propertyMinWidth =
    propertyType.length > 0 ? Math.min(propertyType.length * 70 + 60, 400) : 150;
  const cityMinWidth =
    selectedCity.length > 0 ? Math.min(selectedCity.length * 70 + 60, 400) : 150;

  return (
    <section
      className="relative w-full h-[60vh] overflow-hidden parallax hero-section"
      id="home"
    >
      <div className="absolute inset-0 h-full">
        {/* Always show poster image for faster LCP */}
        <img
          src={posterImage}
          alt="Hero background"
          className="w-full h-full object-cover brightness-90"
        />

        {/* Lazy load video */}
        {isVideoLoaded && (
          <video
            src={backgroundVideo}
            className="w-full h-full object-cover brightness-90 absolute top-0 left-0"
            autoPlay
            loop
            muted
            playsInline
            preload="none"
          />
        )}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-[#c08830] text-center hero-content">
        <h1 className="text-4xl font-[Montserrat] sm:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight text-gradient animate-fade-in-slide-up hero-section-title">
          Ethos Pro Realtors
        </h1>
        <p className="mobile-hero-content text-base bg-[#1a1a1ad4] py-0 px-4 rounded-sm font-[sans-serif] sm:text-lg lg:text-xl mb-10 max-w-3xl text-[#c08830] leading-relaxed animate-fade-in-delayed">
          YOUR PROPERTY, OUR PRIORITY
        </p>

        <Card className="hero-section-card w-full max-w-6xl mx-auto bg-gradient-to-r from-gray-800 to-gray-600 shadow-2xl rounded-2xl p-6 sm:p-0 animate-scale-in">
          <Row
            gutter={[8, 8]}
            align="middle"
            justify="center"
            wrap
            className="p-4 hero-card-all"
          >
            <Col
              xs={24}
              sm={12}
              md={undefined}
              style={screens.md ? { flex: "0 0 200px" } : {}}
            >
              <CustomInput
                size="large"
                placeholder="Search"
                value={searchText}
                onChange={handleSearch}
                className="w-full rounded-lg border-gray-600 hover:border-[#c08830] transition-colors bg-gray-700 text-[#c08830]"
              />
            </Col>

            <Col
              xs={24}
              sm={12}
              md={undefined}
              style={screens.md ? { flex: "0 0 auto" } : {}}
            >
              <CustomSelect
                size="large"
                className="hero-select"
                style={{
                  width: "auto",
                  height: 40,
                  minWidth: propertyMinWidth,
                  maxWidth: 400,
                  transition: "min-width 0.3s ease",
                }}
                placeholder="Property Type"
                suffixIcon={<DownOutlined />}
                onChange={handleTypeSelect}
                styles={{ popup: { root: { width: 200 } } }}
                optionFilterProp="label"
                showSearch
                mode="multiple"
                value={propertyType}
                tagRender={tagRender}
                allowClear
              >
                <CustomSelect.OptGroup label="Commercial">
                  {propertyTypeOptions
                    .filter((opt) => opt.group === "Commercial")
                    .map((opt) => (
                      <CustomSelect.Option key={opt.value} value={opt.value}>
                        {opt.label}
                      </CustomSelect.Option>
                    ))}
                </CustomSelect.OptGroup>
                <CustomSelect.OptGroup label="Residential">
                  {propertyTypeOptions
                    .filter((opt) => opt.group === "Residential")
                    .map((opt) => (
                      <CustomSelect.Option key={opt.value} value={opt.value}>
                        {opt.label}
                      </CustomSelect.Option>
                    ))}
                </CustomSelect.OptGroup>
              </CustomSelect>
            </Col>

            <Col
              xs={24}
              sm={12}
              md={undefined}
              style={screens.md ? { flex: "0 0 auto" } : {}}
            >
              <CustomSelect
                size="large"
                className="hero-select"
                style={{
                  width: "auto",
                  height: 40,
                  minWidth: cityMinWidth,
                  maxWidth: 400,
                  transition: "min-width 0.3s ease",
                }}
                placeholder="Select City"
                onChange={handleCitySelect}
                styles={{ popup: { root: { width: 200 } } }}
                options={cityOptions.map((city) => ({
                  value: city,
                  label: city.charAt(0).toUpperCase() + city.slice(1),
                }))}
                mode="multiple"
                value={selectedCity}
                tagRender={tagRender}
                allowClear
              />
            </Col>

            <Col
              xs={24}
              sm={12}
              md={undefined}
              style={screens.md ? { flex: "0 0 150px" } : {}}
            >
              <CustomButton
                type="primary"
                size="large"
                className="w-full rounded-lg property-card-action-button transition-all duration-300"
                style={{ height: 40 }}
              >
                Search
              </CustomButton>
            </Col>
          </Row>
        </Card>
      </div>
    </section>
  );
};

export default Hero;
