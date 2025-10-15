import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MapPin, ChevronDown } from 'lucide-react';
import { Select, Input, Form, Button, ConfigProvider, Empty, Card } from 'antd';
import { theme } from 'antd';
import { SearchOutlined, CloseOutlined, DownOutlined } from '@ant-design/icons';
import "./PopularLocation.css";
import ContactForm from "../../pages/Contact/ContactForm";
import CustomButton from "../ui/Button";

const locations = [
    { name: "Dwarka Expressway", slug: "dwarka-expressway" },
    { name: "Golf Course Extension Road", slug: "golf-course-extension-road" },
    { name: "New Gurgaon", slug: "new-gurgaon" },
    { name: "Sohna Road", slug: "sohna-road" },
    { name: "Southern Peripheral Road", slug: "southern-peripheral-road" },
];

const propertyTypeOptions = [
    { value: 'all', label: 'All' },
    { value: 'apartments', label: 'Apartments' },
    { value: 'villas', label: 'Villas' },
];

const bhkOptions = [
    { value: 'all', label: 'All' },
    { value: '2bhk', label: '2 BHK' },
    { value: '3bhk', label: '3 BHK' },
    { value: '4bhk', label: '4 BHK' },
];

const constructionOptions = [
    { value: 'all', label: 'All' },
    { value: 'under', label: 'Under Construction' },
    { value: 'ready', label: 'Ready to Move' },
];

const featuresOptions = [
    { value: 'all', label: 'All' },
    { value: 'pool', label: 'Pool' },
    { value: 'gym', label: 'Gym' },
    { value: 'parking', label: 'Parking' },
];

const priceOptions = [
    { value: 'all', label: 'All' },
    { value: '50l-1cr', label: '₹50L - ₹1Cr' },
    { value: '1cr-2cr', label: '₹1Cr - ₹2Cr' },
    { value: '2crplus', label: '₹2Cr+' },
];

const interestPropertyOptions = [
    { value: 'apartments', label: 'Apartments' },
    { value: 'villas', label: 'Villas' },
    { value: 'penthouses', label: 'Penthouses' },
];

const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
];

const PopularLocation = () => {
    const [selected, setSelected] = useState(null);
    const navigate = useNavigate();
    const { locationName } = useParams();
    const [form] = Form.useForm();

    useEffect(() => {
        if (locationName) {
            const loc = locations.find(l => l.slug === locationName);
            if (loc) {
                setSelected(loc.name);
            }
        } else {
            setSelected(null);
        }
    }, [locationName]);

    const handleLocationClick = (loc) => {
        setSelected(loc.name);
        navigate(`/popular-location/${loc.slug}`);
    };

    const onFinish = (values) => {
        console.log('Form submitted:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    if (!locationName) {
        // Show the locations list
        return (
            <section className="popular-location-section">
                <h2 className="mobile-title-text text-3xl font-[Montserrat] sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4 bg-gradient-to-r from-[#c2c6cb] via-[#c99913] to-[#c2c6cb] bg-clip-text text-transparent">
                    Popular Location
                </h2>
                <p className="popular-location-description mobile-subtitle-text text-[#c2c6cb] text-md">
                    Explore prime locations and key real estate destinations in Gurgaon
                </p>
                <div className="locations-grid">
                    {locations.map((loc) => (
                        <button
                            key={loc.name}
                            onClick={() => handleLocationClick(loc)}
                            className={`location-button ${selected === loc.name ? 'selected' : ''}`}
                        >
                            <span className="location-icon-wrapper">
                                <MapPin className="location-icon" />
                            </span>
                            <span className="location-name">
                                {loc.name}
                            </span>
                        </button>
                    ))}
                </div>
            </section>
        );
    }

    // Show the properties layout for the selected location
    const currentLocation = locations.find(l => l.slug === locationName);
    if (!currentLocation) {
        return <div>Location not found</div>;
    }

    return (
        <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
            <section className="properties-section py-8 px-4 bg-[#181A1B]">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-[#c2c6cb] mb-2">
                            Properties for Sale in {currentLocation.name}, Gurgaon
                        </h1>
                        <p className="text-[#c2c6cb]">
                            Explore premium properties for sale in {currentLocation.name}, Gurgaon with excellent amenities and excellent connectivity.
                        </p>
                    </div>

                    {/* Stats and Actions */}
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-[#c2c6cb]">Showing 0 properties in Gurgaon</span>

                        </div>
                        <div className="flex items-center space-x-2">
                            <Button type="text" size="small" icon="⋮" />
                        </div>
                    </div>

                    {/* Main Content: Three-column Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left: Filters Sidebar */}
                        <div className="bg-black rounded-lg shadow-md p-6">
                            <div className="space-y-6">
                                {/* Search Bar */}
                                <div className="relative">
                                    <Input
                                        prefix={<SearchOutlined className="text-gray-500" />}
                                        suffix={<CloseOutlined className="text-gray-500" />}
                                        placeholder="Search locations"
                                        value={`${currentLocation.name}, Gurgaon`}
                                        readOnly
                                        className="pr-10"
                                    />
                                </div>

                                {/* Property Types */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Property Types</label>
                                    <Select options={propertyTypeOptions} style={{ width: '100%' }} placeholder="Select Property" />
                                </div>

                                {/* BHK */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">BHK</label>
                                    <Select options={bhkOptions} style={{ width: '100%' }} placeholder="Select BHK" />
                                </div>

                                {/* Stages of Construction */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Stages of Construction</label>
                                    <Select options={constructionOptions} style={{ width: '100%' }} placeholder="Select Construction" />
                                </div>

                                {/* Features */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Features</label>
                                    <Select options={featuresOptions} style={{ width: '100%' }} placeholder="Select Features" />
                                </div>

                                {/* Price Range */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Price Range</label>
                                    <Select options={priceOptions} style={{ width: '100%' }} placeholder="Select Price" />
                                </div>

                                {/* Clear All */}
                                <CustomButton block>Clear All</CustomButton>
                            </div>
                        </div>

                        {/* Center: Results Area / Detail Card */}
                        <div className="bg-black rounded-lg p-6 col-span-1 lg:col-span-1">
                            <Empty
                                description={
                                    <div className="text-center">
                                        <h3 className="text-xl font-semibold text-[#c2c6cb] mb-2">No Result Found</h3>
                                        <p className="text-[#c2c6cb]">Try refining your search criteria or start a new search.</p>
                                    </div>
                                }
                            />
                        </div>

                        {/* Right: Interest Form */}
                        <div className="bg-black rounded-lg shadow-md p-6 col-span-1">
                            <Card className="px-4 py-2">
                                <h3 className="text-lg font-semibold text-[#c2c6cb] m-2 text-center">
                                    Interested in {currentLocation.name} Properties?
                                </h3>
                                <ContactForm />
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </ConfigProvider>
    );
};

export default PopularLocation;