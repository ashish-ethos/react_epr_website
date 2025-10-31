// ExploreProperties.js
import React, { useState, useEffect, useMemo } from 'react';
import { Heart, MapPin, Ruler, Eye, Star, X, Share2, Printer } from 'lucide-react';
import { FiPhone } from "react-icons/fi";
import { Pagination, Empty } from 'antd';
import { MdOutlineEmail, MdOutlineWhatsapp } from "react-icons/md";
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    EmailShareButton,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    WhatsappIcon,
    EmailIcon
} from 'react-share';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import { properties } from '../../data/propertiesData';

import CustomButton from '../ui/Button';
import './ExploreProperties.css';
import CustomInput from '../ui/Input';
import ContactForm from '../../pages/Contact/ContactForm';

const ExploreProperties = ({ filters = {} }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeTab, setActiveTab] = useState(() => searchParams.get('tab') || 'all');
    const [isLoading, setIsLoading] = useState(true);
    const [favorites, setFavorites] = useState(new Set());
    const [currentPage, setCurrentPage] = useState(1);
    const [shareCounts, setShareCounts] = useState(() => {
        const saved = localStorage.getItem('shareCounts');
        return saved ? JSON.parse(saved) : {};
    });
    const navigate = useNavigate();
    const { propertyName } = useParams();

    const PAGE_SIZE = 6;

    const tabs = [
        { key: 'all', label: 'All Properties', count: properties.length },
        { key: 'residential', label: 'Residential', count: properties.filter(p => p.type.toLowerCase().includes('residential')).length },
        { key: 'commercial', label: 'Commercial', count: properties.filter(p => p.type.toLowerCase().includes('commercial')).length },
        { key: 'villa', label: 'Villa', count: properties.filter(p => p.type.toLowerCase().includes('villa')).length },
        { key: 'office', label: 'Office', count: properties.filter(p => p.type.toLowerCase().includes('office')).length },
        { key: 'studio', label: 'Studio', count: properties.filter(p => p.type.toLowerCase().includes('studio')).length },
        { key: 'plot', label: 'Plot', count: properties.filter(p => p.type.toLowerCase().includes('plot')).length },
    ];

    const normalizedFilters = useMemo(() => {
        const f = filters || {};
        return {
            search: f.search ? String(f.search).trim().toLowerCase() : '',
            type: f.type ? String(f.type).trim().toLowerCase() : '',
            city: f.city ? String(f.city).trim().toLowerCase() : '',
        };
    }, [filters]);

    const handleTabChange = (tabKey) => {
        setActiveTab(tabKey);
        setSearchParams({ tab: tabKey });
    };

    const getCombinedFiltered = () => {
        let list = properties.slice();
        list = list.map(p => ({
            ...p,
            _type: p.type ? String(p.type).trim().toLowerCase() : '',
            _name: p.name ? String(p.name).toLowerCase() : '',
            _location: p.location ? String(p.location).toLowerCase() : '',
            _price: p.price ? String(p.price).toLowerCase() : '',
        }));

        if (activeTab && activeTab !== 'all') {
            const tabKey = activeTab.toLowerCase();
            list = list.filter(p => p._type.includes(tabKey));
        }

        const { search, type, city } = normalizedFilters;
        if (type) {
            const t = type.toLowerCase();
            list = list.filter(p => p._type.includes(t) || p._name.includes(t) || p._location.includes(t));
        }
        if (city) {
            const c = city.toLowerCase();
            list = list.filter(p => p._location.toLowerCase().includes(c));
        }
        if (search) {
            const s = search.toLowerCase();
            list = list.filter(p =>
                p._name.includes(s) ||
                p._location.includes(s) ||
                p._type.includes(s) ||
                p._price.includes(s)
            );
        }
        return list;
    };

    const filteredProperties = useMemo(getCombinedFiltered, [activeTab, filters]);

    const toggleFavorite = (id) => {
        setFavorites(prev => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(id)) {
                newFavorites.delete(id);
            } else {
                newFavorites.add(id);
            }
            return newFavorites;
        });
    };

    const getOptionColor = (option) => {
        switch (option) {
            case 'HOT OFFER':
                return 'bg-gradient-to-r from-amber-800/50 to-amber-700/50 text-amber-200 border border-[#ffffff38]';
            case 'LUXURY':
                return 'bg-gradient-to-r from-yellow-800/50 to-yellow-700/50 text-yellow-200 border border-[#ffffff38]';
            case 'PREMIUM':
                return 'bg-gradient-to-r from-yellow-700/50 to-amber-700/50 text-amber-200 border border-[#ffffff38]';
            case 'FOR SALE':
                return 'bg-gradient-to-r from-gray-800/50 to-amber-700/50 text-gray-200 border border-[#ffffff38]';
            case 'FOR RENT':
                return 'bg-gradient-to-r from-amber-700/50 to-gray-800/50 text-gray-200 border border-[#ffffff38]';
            case 'SOLD OUT':
                return 'bg-gradient-to-r from-gray-800/50 to-red-700/50 text-red-200 border border-[#ffffff38]';
            case 'FEATURED':
                return 'bg-gradient-to-r from-blue-800/50 to-blue-700/50 text-blue-200 border border-[#ffffff38]';
            default:
                return 'bg-gray-800 text-gray-200 border border-[#ffffff38]';
        }
    };

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1500);
        setCurrentPage(1);
    }, [activeTab, filters]);

    useEffect(() => {
        localStorage.setItem('shareCounts', JSON.stringify(shareCounts));
    }, [shareCounts]);

    // Clamp currentPage to valid range to prevent NaN issues
    useEffect(() => {
        const totalPages = Math.ceil(filteredProperties.length / PAGE_SIZE);
        if (currentPage > totalPages || currentPage < 1 || isNaN(currentPage)) {
            setCurrentPage(Math.max(1, totalPages));
        }
    }, [filteredProperties.length, currentPage, PAGE_SIZE]);

    const paginatedProperties = useMemo(() => {
        const totalPages = Math.ceil(filteredProperties.length / PAGE_SIZE);
        const effectivePage = Math.max(1, Math.min(currentPage, totalPages));
        const start = (effectivePage - 1) * PAGE_SIZE;
        const end = start + PAGE_SIZE;
        return filteredProperties.slice(start, end);
    }, [filteredProperties, currentPage, PAGE_SIZE]);

    const PropertyModal = ({ property, onClose }) => {
        const [contactForm, setContactForm] = useState({
            fullName: '',
            phone: '',
            email: '',
            message: '',
        });

        const [tourForm, setTourForm] = useState({
            tourType: '',
            tourDate: null,
            tourTime: null,
            tourName: '',
            tourPhone: '',
            tourEmail: '',
            tourMessage: '',
        });

        const [isShareOpen, setIsShareOpen] = useState(false);
        const [isPrinting, setIsPrinting] = useState(false);

        const handleContactChange = (e) => {
            const { name, value } = e.target;
            setContactForm((prev) => ({ ...prev, [name]: value }));
        };

        const handleTourChange = (e) => {
            const { name, value } = e.target;
            setTourForm((prev) => ({ ...prev, [name]: value }));
        };

        const handleTimeChange = (time) => {
            setTourForm((prev) => ({ ...prev, tourTime: time }));
        };

        const handleDateChange = (date) => {
            setTourForm((prev) => ({ ...prev, tourDate: date }));
        };

        const handleTourSubmit = (e) => {
            e.preventDefault();
            // Add your submission logic here
        };

        const toggleSharePopup = () => {
            setIsShareOpen((prev) => !prev);
        };

        const incrementShareCount = () => {
            setShareCounts(prev => {
                const newCounts = {
                    ...prev,
                    [property.id]: (prev[property.id] || 0) + 1
                };
                localStorage.setItem('shareCounts', JSON.stringify(newCounts));
                return newCounts;
            });
        };

        const handlePrint = async () => {
            if (isPrinting) return;
            setIsPrinting(true);

            try {
                const img = new Image();
                img.crossOrigin = 'Anonymous';
                img.src = property.image;
                await new Promise((resolve, reject) => {
                    img.onload = resolve;
                    img.onerror = () => reject(new Error('Failed to load image'));
                });

                const tempContainer = document.createElement('div');
                tempContainer.style.position = 'absolute';
                tempContainer.style.left = '-9999px';
                tempContainer.style.width = '800px';
                tempContainer.style.padding = '20px';
                tempContainer.style.background = '#333';
                tempContainer.style.color = '#c2c6cb';
                tempContainer.style.fontFamily = 'Arial, sans-serif';

                tempContainer.innerHTML = `
          <div style="margin-bottom: 20px;">
            <img src="${property.image}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 10px;" />
          </div>
          <h2 style="font-size: 24px; font-weight: bold; color: #c2c6cb; margin-bottom: 10px;">${property.name}</h2>
          <p style="font-size: 18px; color: #c99913; font-weight: bold; margin-bottom: 10px;">${property.price}</p>
          <p style="font-size: 14px; color: #c2c6cb; margin-bottom: 10px;">
            <strong>Location:</strong> ${property.location}
          </p>
          <p style="font-size: 14px; color: #c2c6cb; margin-bottom: 10px;">
            <strong>Size:</strong> ${property.size}
          </p>
          <p style="font-size: 14px; color: #c2c6cb; margin-bottom: 10px;">
            <strong>Features:</strong> ${property.options.join(', ')}
          </p>
          <p style="font-size: 14px; color: #c2c6cb;">
            <strong>Description:</strong> ${property.description}
          </p>
        `;

                document.body.appendChild(tempContainer);

                const canvas = await html2canvas(tempContainer, {
                    scale: 2,
                    useCORS: true,
                    logging: false,
                    windowWidth: 800,
                    windowHeight: tempContainer.scrollHeight,
                    scrollX: 0,
                    scrollY: 0,
                });

                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
                const imgProps = pdf.getImageProperties(imgData);
                const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

                let position = 0;
                while (position < imgHeight) {
                    if (position > 0) pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 0, -position, pdfWidth, imgHeight);
                    position += pdfHeight;
                }

                pdf.save(`${property.name.replace(/\s+/g, '_')}.pdf`);
                document.body.removeChild(tempContainer);
            } catch (error) {
                console.error('Error generating PDF:', error.message);
                alert('Failed to generate PDF. Please ensure images are loaded and try again.');
            } finally {
                setIsPrinting(false);
            }
        };

        const shareUrl = window.location.href;
        const shareTitle = `${property.name} - ${property.type}`;
        const shareText = `${property.description} Check out this property at ${property.location}!`;

        return (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-2 sm:p-4">
                <div
                    className="modal-content bg-[#333] rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto shadow-2xl transform animate-in fade-in zoom-in duration-300 relative"
                    style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#c99913 #333'
                    }}
                >
                    <button
                        onClick={onClose}
                        className="absolute cursor-pointer top-4 right-4 z-10 bg-[#333]/90 backdrop-blur-sm hover:border-red-500 hover:border-1 text-[#c2c6cb] hover:text-red-500 p-2 rounded-full transition-all duration-200 hover:scale-110 shadow-lg"
                        style={{ zIndex: 1000 }}
                    >
                        <X size={24} />
                    </button>

                    <div className="relative">
                        <div className="relative h-48 sm:h-64 md:h-72 overflow-hidden">
                            <img
                                src={property.image}
                                alt={property.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-gray-900/40" />

                            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                                {property.options.map((option, idx) => (
                                    <span
                                        key={option + idx}
                                        className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md ${getOptionColor(option)} shadow-lg`}
                                    >
                                        {option}
                                    </span>
                                ))}
                            </div>

                            <div className="absolute bottom-4 flex items-center w-full justify-between px-4 space-x-3 mobile-share-section">
                                <div className='bottom-left-image-stats flex items-center space-x-3'>
                                    <div className="flex items-center space-x-1 bg-[#333]/80 backdrop-blur-md rounded-full px-3 py-1">
                                        <Eye className="w-4 h-4 text-[#c2c6cb]" />
                                        <span className="text-sm font-medium text-[#c2c6cb]">{property.views.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center space-x-1 bg-[#333]/80 backdrop-blur-md rounded-full px-3 py-1">
                                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                        <span className="text-sm font-medium text-[#c2c6cb]">{property.rating}</span>
                                    </div>
                                </div>

                                <div className="bottom-right-image-stats flex items-center space-x-3">
                                    <div onClick={toggleSharePopup} className="cursor-pointer flex items-center space-x-1 bg-[#333]/80 backdrop-blur-md rounded-full px-3 py-1 hover:bg-[#444]/80 transition-all">
                                        <Share2 className="text-[#c2c6cb] w-4 h-4" />
                                    </div>
                                    <div className={`
                    flex items-center gap-1 px-3 py-0.5 rounded-full
                    ${(shareCounts[property.id] || 0) > 0 ? 'bg-gradient-to-r from-amber-700/50 to-amber-600/50 text-amber-200' : 'bg-[#333] text-[#c2c6cb]'}
                    text-sm font-medium fontFamily-Content
                    transition-all duration-300 hover:shadow-sm border border-[#ffffff38]
                  `}>
                                        <span>{shareCounts[property.id] || 0} {(shareCounts[property.id] || 0) === 1 ? 'Shares' : 'Share'}</span>
                                    </div>
                                    <div onClick={handlePrint} className="cursor-pointer flex items-center space-x-1 bg-[#333]/80 backdrop-blur-md rounded-full px-3 py-1 hover:bg-[#444]/80 transition-all">
                                        <Printer className={`text-[#c2c6cb] w-4 h-4 ${isPrinting ? 'animate-pulse' : ''}`} />
                                        {isPrinting && <span className="text-xs text-[#c2c6cb]">Generating...</span>}
                                    </div>
                                </div>
                            </div>

                            {isShareOpen && (
                                <div className="absolute top-16 right-4 bg-[#333] rounded-lg shadow-xl p-2 z-50 w-48 border border-[#ffffff38] mobile-sharepopup">
                                    <button
                                        onClick={toggleSharePopup}
                                        className="absolute top-2 right-2 text-[#c2c6cb] cursor-pointer hover:text-red-500 transition-all"
                                    >
                                        <X size={16} />
                                    </button>
                                    <div className="flex flex-col gap-2 mt-4">
                                        <FacebookShareButton url={shareUrl} quote={shareText} title={shareTitle} onClick={incrementShareCount}>
                                            <div className="flex items-center space-x-2 text-[#c2c6cb] hover:text-blue-400 cursor-pointer">
                                                <FacebookIcon size={24} round />
                                                <span className="text-xs font-[Montserrat] ml-2">Facebook</span>
                                            </div>
                                        </FacebookShareButton>
                                        <TwitterShareButton url={shareUrl} title={shareText} onClick={incrementShareCount}>
                                            <div className="flex items-center space-x-1 text-[#c2c6cb] hover:text-blue-300 cursor-pointer">
                                                <TwitterIcon size={24} round />
                                                <span className="text-xs font-[Montserrat] ml-2">X</span>
                                            </div>
                                        </TwitterShareButton>
                                        <LinkedinShareButton url={shareUrl} title={shareTitle} summary={shareText} onClick={incrementShareCount}>
                                            <div className="flex items-center space-x-1 text-[#c2c6cb] hover:text-blue-500 cursor-pointer">
                                                <LinkedinIcon size={24} round />
                                                <span className="text-xs font-[Montserrat] ml-2">LinkedIn</span>
                                            </div>
                                        </LinkedinShareButton>
                                        <WhatsappShareButton url={shareUrl} title={shareText} onClick={incrementShareCount}>
                                            <div className="flex items-center space-x-1 text-[#c2c6cb] hover:text-green-400 cursor-pointer">
                                                <WhatsappIcon size={24} round />
                                                <span className="text-xs font-[Montserrat] ml-2">WhatsApp</span>
                                            </div>
                                        </WhatsappShareButton>
                                        <EmailShareButton url={shareUrl} subject={shareTitle} body={shareText} onClick={incrementShareCount}>
                                            <div className="flex items-center space-x-1 text-[#c2c6cb] hover:text-gray-300 cursor-pointer">
                                                <EmailIcon size={24} round />
                                                <span className="text-xs font-[Montserrat] ml-2">Email</span>
                                            </div>
                                        </EmailShareButton>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="p-4 sm:p-6">
                        <div className="mb-4">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <h2 className="text-xl fontFamily-Content sm:text-2xl md:text-3xl font-bold text-[#c2c6cb] mb-2 leading-tight">
                                        {property.name}
                                    </h2>
                                    <div className="inline-block">
                                        <span className="bg-gradient-to-r from-amber-700/50 to-amber-600/50 text-amber-200 px-3 py-1 rounded-full text-sm font-semibold border border-[#ffffff38]">
                                            {property.type}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right ml-3">
                                    <p className="mobile-text-price text-xl fontFamily-Content sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
                                        {property.price}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-4">
                                <div className="bg-[#333] rounded-xl p-4 border border-[#ffffff38]">
                                    <h3 className="text-base font-semibold text-[#c2c6cb] mb-2 flex items-center">
                                        <MapPin className="w-4 h-4 text-amber-400 mr-2 fontFamily-Content" />
                                        Location
                                    </h3>
                                    <p className="text-[#c2c6cb] text-sm leading-relaxed fontFamily-bebas">{property.location}</p>
                                </div>
                                <div className="bg-[#333] rounded-xl p-4 border border-[#ffffff38]">
                                    <h3 className="text-base font-semibold text-[#c2c6cb] mb-2 flex items-center">
                                        <Ruler className="w-4 h-4 fontFamily-Content text-amber-400 mr-2" />
                                        Size
                                    </h3>
                                    <p className="text-[#c2c6cb] text-lg font-medium fontFamily-Content">{property.size}</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="bg-[#333] rounded-xl p-4 border border-[#ffffff38]">
                                    <h3 className="text-base font-semibold text-[#c2c6cb] fontFamily-Content mb-2">Description</h3>
                                    <p className="text-[#c2c6cb] text-sm leading-relaxed fontFamily-bebas">{property.description}</p>
                                </div>
                                <div className="get-in-touch-section border border-[#ffffff38] p-2 sm:p-3 rounded-xl shadow-md">
                                    <h3 className="text-base font-semibold text-[#c2c6cb] mb-3 fontFamily-bebas">Get in Touch</h3>
                                    <div className="flex flex-col sm:flex-row gap-3 tablet-contact-buttons">
                                        <CustomButton
                                            onClick={() => window.location.href = 'tel:+918744964496'}
                                            className="flex-1 bg-[#333] hover:bg-[#444] text-[#c2c6cb] font-semibold py-3 px-4 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg flex items-center justify-center group border border-[#ffffff38]"
                                        >
                                            <FiPhone className="w-4 h-4 group-hover:animate-pulse fontFamily-bebas" />
                                            <span>Call Now</span>
                                        </CustomButton>
                                        <CustomButton
                                            onClick={() => window.open('https://wa.me/918744964496', '_blank', 'noopener,noreferrer')}
                                            className="flex-1 bg-[#333] hover:bg-[#444] text-[#c2c6cb] font-semibold py-3 px-4 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg flex items-center justify-center group border border-[#ffffff38]"
                                        >
                                            <MdOutlineWhatsapp className="w-4 h-4 group-hover:animate-pulse" />
                                            <span>WhatsApp</span>
                                        </CustomButton>
                                        <CustomButton
                                            onClick={() => window.location.href = 'mailto:info@ethosprorealtors.com'}
                                            className="flex-1 bg-[#333] hover:bg-[#444] text-[#c2c6cb] font-semibold py-3 px-4 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg flex items-center justify-center group border border-[#ffffff38]"
                                        >
                                            <MdOutlineEmail className="w-4 h-4 group-hover:animate-pulse" />
                                            <span>Email</span>
                                        </CustomButton>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="contact-section-property-modal mt-6 flex flex-col sm:flex-row">
                            <div className="left-side  rounded-xl shadow-md h-full sm:mr-6 sm:w-1/2">
                                <ContactForm className="h-full" />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const PropertyCard = ({ property, index }) => {
        const isFavorite = favorites.has(property.id);

        const handleDetailsClick = () => {
            const formattedName = property.name.toLowerCase().replace(/\s+/g, '-');
            navigate(`/property/${formattedName}`, { state: { property } });
        };

        return (
            <div
                className="parent"
                style={{
                    animationDelay: `${index * 100}ms`,
                    animation: isLoading ? 'none' : 'slideInUp 0.6s ease-out forwards'
                }}
                id="explore-properties"
            >
                <div className="explore-card relative bg-[#333] rounded-2xl shadow-lg overflow-hidden group border border-[#ffffff38]">
                    <div className="relative overflow-hidden h-64 sm:h-56">
                        <img
                            src={property.image}
                            alt={property.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <CustomButton
                            onClick={() => toggleFavorite(property.id)}
                            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${isFavorite
                                ? 'bg-gradient-to-r from-amber-700 to-amber-600 text-[#c2c6cb] scale-110'
                                : 'bg-[#333]/80 text-[#c2c6cb] hover:bg-gradient-to-r hover:from-amber-700 hover:to-amber-600'
                                } border border-[#ffffff38]`}
                        >
                            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                        </CustomButton>
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1 sm:gap-2">
                            {property.options.map((option, idx) => (
                                <span
                                    key={option + idx}
                                    className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold ${getOptionColor(option)} transform transition-all duration-300`}
                                    style={{ animationDelay: `${idx * 100}ms` }}
                                >
                                    {option}
                                </span>
                            ))}
                        </div>
                        <div className="absolute bottom-3 left-3 flex items-center space-x-3 text-[#c2c6cb] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="flex items-center space-x-1 bg-[#333]/80 rounded-full px-2 py-1">
                                <Eye className="w-3 h-3" />
                                <span className="text-[10px] sm:text-xs">{property.views}</span>
                            </div>
                            <div className="flex items-center space-x-1 bg-[#333]/80 rounded-full px-2 py-1">
                                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                <span className="text-[10px] sm:text-xs cursor-pointer">{property.rating}</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 sm:p-6">
                        <div className="mb-2 sm:mb-3">
                            <h3 className="text-base sm:text-lg font-[Montserrat] font-bold text-amber-400 mb-1 group-hover:text-amber-400 transition-colors duration-300 line-clamp-1">
                                {property.name}
                            </h3>
                            <p className="text-xs sm:text-sm text-[#c2c6cb] uppercase tracking-wide font-medium line-clamp-1">
                                {property.type}
                            </p>
                        </div>
                        <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                            <div className="flex items-start space-x-2 text-[#c2c6cb]">
                                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mt-0.5 text-amber-400" />
                                <p className="text-xs sm:text-sm leading-relaxed line-clamp-2 font-[sans-serif]">{property.location}</p>
                            </div>
                            <div className="flex items-center space-x-2 text-[#c2c6cb]">
                                <Ruler className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400" />
                                <p className="text-xs sm:text-sm">{property.size}</p>
                            </div>
                        </div>
                        <div className="mb-3 sm:mb-4">
                            <p className="text-base sm:text-xl font-bold text-amber-400 line-clamp-1">{property.price}</p>
                        </div>
                        <div className="flex space-x-1 sm:space-x-2">
                            {[
                                {
                                    icon: FiPhone,
                                    label: 'Call',
                                    href: 'tel:+918744964496',
                                    target: '_blank',
                                },
                                {
                                    icon: MdOutlineWhatsapp,
                                    label: 'WhatsApp',
                                    href: 'https://wa.me/+918744964496',
                                    target: '_blank',
                                },
                            ].map((action, idx) => (
                                <CustomButton
                                    key={action.label + idx}
                                    className="property-card-action-button bg-[#333] text-[#c2c6cb] hover:bg-[#444] border border-[#ffffff38]"
                                    style={{ transitionDelay: `${idx * 50}ms` }}
                                    href={action.href}
                                    target={action.target}
                                    rel={action.href ? 'noopener noreferrer' : undefined}
                                >
                                    <action.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span className="sm:text-sm font-medium">{action.label}</span>
                                </CustomButton>
                            ))}
                            <div>
                                <CustomButton
                                    className="property-card-action-button bg-[#333] text-[#c2c6cb] hover:bg-[#444] border border-[#ffffff38]"
                                    onClick={handleDetailsClick}
                                >
                                    Details
                                </CustomButton>
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gray-900 via-gray-800 to-[#c99913] blur-xl opacity-20" />
                    </div>
                </div>
            </div>
        );
    };

    const LoadingSkeleton = () => (
        <div className="parent">
            <div className="explore-card bg-[#333] rounded-2xl shadow-lg overflow-hidden animate-pulse border border-[#ffffff38]">
                <div className="h-64 sm:h-56 bg-[#444]" />
                <div className="p-4 sm:p-6">
                    <div className="h-4 bg-[#444] rounded mb-2" />
                    <div className="h-3 bg-[#444] rounded mb-4 w-3/4" />
                    <div className="h-3 bg-[#444] rounded mb-2" />
                    <div className="h-3 bg-[#444] rounded mb-4 w-1/2" />
                    <div className="flex space-x-1 sm:space-x-2">
                        <div className="flex-1 h-8 bg-[#444] rounded" />
                        <div className="flex-1 h-8 bg-[#444] rounded" />
                        <div className="flex-1 h-8 bg-[#444] rounded" />
                    </div>
                </div>
            </div>
        </div>
    );

    const NoResults = () => (
        <div className="text-center py-8 sm:py-12 px-4 bg-[#333]/80 backdrop-blur-sm rounded-2xl shadow-lg max-w-full sm:max-w-2xl mx-auto animate-fadeIn border border-[#ffffff38]">
            <Empty description={
                <h2 className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-[#c2c6cb] via-[#c99913] to-[#c2c6cb] bg-clip-text text-transparent mb-2 sm:mb-3">
                    No Properties Found
                </h2>
            } />
            <p className="text-[#c2c6cb] text-sm sm:text-lg font-[Inter] max-w-full sm:max-w-md mx-auto">
                There are no properties available for the selected category. Try another category or check back later.
            </p>
            <div className="mt-4 sm:mt-6">
                <CustomButton
                    className="px-4 sm:px-6 py-2 sm:py-3 cursor-pointer rounded-xl font-semibold text-[#c2c6cb] bg-[#333] hover:bg-[#444] border border-[#ffffff38] hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base"
                    onClick={() => handleTabChange('all')}
                >
                    View All Properties
                </CustomButton>
            </div>
        </div>
    );

    const selectedProperty = propertyName
        ? properties.find(p => p.name.toLowerCase().replace(/\s+/g, '-') === propertyName)
        : null;

    const handleCloseModal = () => {
        navigate(-1, { replace: true });
    };

    const totalPages = Math.ceil(filteredProperties.length / PAGE_SIZE);
    const effectiveCurrentPage = Math.max(1, Math.min(currentPage, totalPages || 1));

    return (
        <div className="min-h-screen bg-[#2d2d2d] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-full sm:max-w-7xl mx-auto mb-8 sm:mb-12 text-center">
                <h1 className="mobile-title-text text-3xl font-[Montserrat] sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4 bg-gradient-to-r from-[#c2c6cb] via-[#c99913] to-[#c2c6cb] bg-clip-text text-transparent animate-pulse">
                    Explore Premium Properties
                </h1>
                <div className="h-1 bg-gradient-to-r from-transparent via-[#c99913] to-transparent rounded-full animate-pulse"></div>
                <p className="mobile-subtitle-text text-[#c2c6cb] text-sm font-[sans-serif] sm:text-lg max-w-full sm:max-w-2xl mx-auto mt-2 font-[Inter] explore-properties-maincontent">
                    Discover a diverse collection of premium properties, from luxurious residences to high-end commercial spaces.
                    Browse through the latest listings, featuring stunning architecture, prime locations,
                    and exceptional investment opportunities. Discover the perfect investment or dream residence with ease.
                </p>
            </div>

            <div className="max-w-full sm:max-w-7xl mx-auto mb-8 sm:mb-12">
                <div className="flex bg-[#333] mobile-tab-container overflow-x-auto sm:flex-wrap justify-start sm:justify-center gap-2 sm:gap-4 p-2 bg-[#333]/80 backdrop-blur-sm rounded-2xl shadow-lg scrollbar-hidden border border-[#ffffff38]">
                    {tabs.map((tab) => (
                        <CustomButton
                            key={tab.key}
                            style={{ backgroundColor: 'transparent', position: 'relative' }}
                            onClick={() => handleTabChange(tab.key)}
                            className={`px-4 sm:px-6 py-2 sm:py-3 font-semibold transition-all cursor-pointer duration-300 transform hover:scale-105 text-sm sm:text-base whitespace-nowrap border border-[#ffffff38] ${activeTab === tab.key
                                ? 'gradient-border-active text-[#c99913] font-bold bg-[#444] shadow-xl scale-105'
                                : 'text-[#c2c6cb] hover:gradient-border-active hover:text-[#c99913] bg-[#333]'
                                }`}
                        >
                            {tab.label}
                            <span
                                className={`ml-1 sm:ml-2 px-1 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px]  sm:text-xs ${activeTab === tab.key
                                    ? 'bg-[#c99913]/50 text-[#c99913] font-medium'
                                    : 'bg-[#444] text-[#c2c6cb] border-1'
                                    }`}
                            >
                                {tab.count}
                            </span>
                        </CustomButton>
                    ))}
                </div>
            </div>

            <div className="max-w-full sm:max-w-7xl mx-auto">
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <LoadingSkeleton key={index} />
                        ))}
                    </div>
                ) : filteredProperties.length === 0 ? (
                    <NoResults />
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
                            {paginatedProperties.map((property, index) => (
                                <PropertyCard key={property.id} property={property} index={index} />
                            ))}
                        </div>
                        <div className="flex justify-center mt-8">
                            <Pagination
                                current={effectiveCurrentPage}
                                total={filteredProperties.length}
                                showTotal={(total, range) => {
                                    const start = range[0] || 0;
                                    const end = range[1] || 0;
                                    return `${start}-${end} of ${total} properties`;
                                }}
                                pageSize={PAGE_SIZE}
                                showSizeChanger={false}
                                onChange={setCurrentPage}
                            />
                        </div>
                    </>
                )}
            </div>

            {selectedProperty && (
                <PropertyModal property={selectedProperty} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default ExploreProperties;