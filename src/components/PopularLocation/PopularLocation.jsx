import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { MapPin, Heart, Bed, Ruler } from 'lucide-react';
import { Select, Input, Form, Button, ConfigProvider, Empty } from 'antd';
import { theme } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
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

const PropertyCard = ({ property, onPropertyClick }) => {
    // Derive BHK from type or size, fallback to '3' as example
    const bhk = property.type.toLowerCase().includes('3bhk') ? '3' : '3';
    const possession = 'Jul 2029';
    const address = property.location.split(',')[0];

    const handleClick = () => {
        onPropertyClick(property);
    };

    return (
        <div className="property-card bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-gray-700 cursor-pointer" onClick={handleClick}>
            <div className="relative">
                <span className="type-tag absolute top-2 left-2 bg-[#c08830] text-white px-2 py-1 rounded text-sm font-medium">
                    {property.type.includes('Residential') ? 'Apartments' : property.type}
                </span>
                <Heart className="absolute top-2 right-2 text-gray-400 hover:text-red-500 cursor-pointer w-5 h-5" fill="none" stroke="currentColor" />
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
                        <label className="block text-gray-400 text-xs mb-1">Starting Price</label>
                        <span className="font-bold text-lg">{property.price}</span>
                    </div>
                    <div>
                        <label className="block text-gray-400 text-xs mb-1">Possession</label>
                        <span className="text-[#c08830] font-medium">{possession}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PopularLocation = () => {
    const [selected, setSelected] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const { locationName } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [form] = Form.useForm();
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);

    const formValues = Form.useWatch([], form);

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

    useEffect(() => {
        const currentLoc = locations.find(l => l.slug === locationName);
        if (!currentLoc) return;

        let filtered = properties.filter(prop =>
            prop.location.toLowerCase().includes(currentLoc.name.toLowerCase())
        );

        // Apply search filter if present
        if (searchTerm.trim()) {
            filtered = filtered.filter(prop =>
                prop.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
            );
        }

        // Apply property type filter
        if (formValues?.propertyType && formValues.propertyType !== 'all') {
            filtered = filtered.filter(p =>
                p.type.toLowerCase().includes(formValues.propertyType)
            );
        }

        // Apply BHK filter
        if (formValues?.bhk && formValues.bhk !== 'all') {
            filtered = filtered.filter(p =>
                p.type.toLowerCase().includes(formValues.bhk)
            );
        }

        // Apply construction filter (assuming prop.status is 'under' or 'ready')
        if (formValues?.construction && formValues.construction !== 'all') {
            filtered = filtered.filter(p =>
                p.status === formValues.construction
            );
        }

        // Apply features filter (assuming prop.features is an array)
        if (formValues?.features && formValues.features !== 'all') {
            filtered = filtered.filter(p =>
                p.features?.includes(formValues.features)
            );
        }

        // Apply price filter
        if (formValues?.price && formValues.price !== 'all') {
            filtered = filtered.filter(p => {
                const priceStr = p.price.replace(/[^\d.]/g, '');
                const priceNum = parseFloat(priceStr);
                const unitMultiplier = p.price.toLowerCase().includes('cr') ? 100 : 1;
                const priceInLakhs = priceNum * unitMultiplier;

                switch (formValues.price) {
                    case '50l-1cr':
                        return priceInLakhs >= 50 && priceInLakhs <= 100;
                    case '1cr-2cr':
                        return priceInLakhs >= 100 && priceInLakhs <= 200;
                    case '2crplus':
                        return priceInLakhs > 200;
                    default:
                        return true;
                }
            });
        }

        setFilteredProperties(filtered);
    }, [locationName, searchTerm, formValues]);

    useEffect(() => {
        const propSlug = searchParams.get('property');
        if (propSlug) {
            const prop = properties.find(p =>
                p.name.toLowerCase().replace(/\s+/g, '-') === propSlug
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
    }, [searchParams]);

    const handleLocationClick = (loc) => {
        setSelected(loc.name);
        navigate(`/popular-location/${loc.slug}`);
    };

    const handlePropertyClick = (property) => {
        const propSlug = property.name.toLowerCase().replace(/\s+/g, '-');
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
        setSearchTerm('');
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
                            <span className="text-sm text-[#c2c6cb]">Showing {filteredProperties.length} properties in {currentLocation.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button type="text" size="small" icon="⋮" />
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
                                    placeholder="Search projects..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            {/* Form for filters */}
                            <Form
                                form={form}
                                layout="vertical"
                                initialValues={{
                                    propertyType: 'all',
                                    bhk: 'all',
                                    construction: 'all',
                                    features: 'all',
                                    price: 'all'
                                }}
                            >
                                {/* Property Types */}
                                <Form.Item name="propertyType" label={<label className="block text-sm font-medium text-gray-300 mb-2">Property Types</label>}>
                                    <Select options={propertyTypeOptions} placeholder="Select Property" style={{ width: '100%' }} />
                                </Form.Item>

                                {/* BHK */}
                                <Form.Item name="bhk" label={<label className="block text-sm font-medium text-gray-300 mb-2">BHK</label>}>
                                    <Select options={bhkOptions} placeholder="Select BHK" style={{ width: '100%' }} />
                                </Form.Item>

                                {/* Stages of Construction */}
                                <Form.Item name="construction" label={<label className="block text-sm font-medium text-gray-300 mb-2">Stages of Construction</label>}>
                                    <Select options={constructionOptions} placeholder="Select Construction" style={{ width: '100%' }} />
                                </Form.Item>

                                {/* Features */}
                                <Form.Item name="features" label={<label className="block text-sm font-medium text-gray-300 mb-2">Features</label>}>
                                    <Select options={featuresOptions} placeholder="Select Features" style={{ width: '100%' }} />
                                </Form.Item>

                                {/* Price Range */}
                                <Form.Item name="price" label={<label className="block text-sm font-medium text-gray-300 mb-2">Price Range</label>}>
                                    <Select options={priceOptions} placeholder="Select Price" style={{ width: '100%' }} />
                                </Form.Item>

                                {/* Buttons */}
                                <Form.Item>
                                    <div className="flex gap-2">
                                        <Button
                                            block
                                            onClick={clearFilters}
                                            style={{ backgroundColor: 'transparent', borderColor: '#c2c6cb', color: '#c2c6cb' }}
                                        >
                                            Clear All
                                        </Button>
                                    </div>
                                </Form.Item>
                            </Form>
                        </div>

                        {/* Center: Results Area */}
                        <div className="bg-black rounded-lg p-6 col-span-1 lg:col-span-1 space-y-6 overflow-y-auto max-h-[80vh] custom-scrollbar">
                            {filteredProperties.length > 0 ? (
                                filteredProperties.map((property) => (
                                    <PropertyCard key={property.id} property={property} onPropertyClick={handlePropertyClick} />
                                ))
                            ) : (
                                <Empty
                                    description={
                                        <div className="text-center">
                                            <h3 className="text-xl font-semibold text-[#c2c6cb] mb-2">No Result Found</h3>
                                            <p className="text-[#c2c6cb]">Try refining your search criteria or start a new search.</p>
                                        </div>
                                    }
                                />
                            )}
                        </div>

                        {/* Right: Interest Form */}
                        <div className="bg-black rounded-lg shadow-md p-6 col-span-1">
                            <div className="px-4 py-2">
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