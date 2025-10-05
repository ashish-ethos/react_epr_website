import React, { useState, useEffect, useMemo } from 'react';
import { Heart, MapPin, Ruler, Eye, Star, X, Share2, Printer } from 'lucide-react';
import { FiPhone } from "react-icons/fi";
import { DatePicker, TimePicker } from 'antd';
import { MdOutlineEmail, MdOutlineWhatsapp } from "react-icons/md";
import { useNavigate, useParams } from 'react-router-dom';
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
import AIPLAutography from "../../assets/images/exploreproperties/aipl-autograph.jpg";
import AriaMall from "../../assets/images/exploreproperties/aria-mall.jpg";
import Omaxstate from "../../assets/images/exploreproperties/omaxstate.webp";
import M3Mantalya from "../../assets/images/exploreproperties/m3m_antalya.avif";
import EmeraldHills from "../../assets/images/exploreproperties/emerald-hills.jpg";
import WorldTrade from "../../assets/images/exploreproperties/worldtrader-center.jpg";
import CentralPark from "../../assets/images/exploreproperties/central-park.jpg";
import M3MMansion from "../../assets/images/exploreproperties/m3m-mansion.jpg";
import Krisumi from "../../assets/images/exploreproperties/krisumi-waterfall.jpg";
import Tulip from "../../assets/images/exploreproperties/tulip-monsella.jpg";
import SmartWorld from "../../assets/images/exploreproperties/smartworld-dxp.jpg";
import AIPLBusinessClub from "../../assets/images/exploreproperties/aipl-business.jpg";
import Cygnett from "../../assets/images/exploreproperties/cygnett-retreat.jpg";
import Sobha from "../../assets/images/exploreproperties/sobha-international.webp";
import Elan from "../../assets/images/exploreproperties/Elan-The-Mark_img.webp";
import PionerUrban from "../../assets/images/exploreproperties/pioneer_urban.jpg";
import ElanThePersidential from "../../assets/images/exploreproperties/Elan-The-Presidential.jpg";
import Trinity from "../../assets/images/exploreproperties/Trinity-Sky-Palazzos.jpg";

import CustomButton from '../ui/Button';
import './ExploreProperties.css';
import CustomInput from '../ui/Input';
import ContactForm from '../../pages/Contact/ContactForm';

const ExploreProperties = ({ filters = {} }) => {
    const [activeTab, setActiveTab] = useState('all');
    const [isLoading, setIsLoading] = useState(true);
    const [favorites, setFavorites] = useState(new Set());
    const [visibleProperties, setVisibleProperties] = useState(6);
    const [showAll, setShowAll] = useState(false);
    const [shareCounts, setShareCounts] = useState(() => {
        const saved = localStorage.getItem('shareCounts');
        return saved ? JSON.parse(saved) : {};
    });
    const navigate = useNavigate();
    const { propertyName } = useParams();

    const properties = [
        {
            id: '1',
            type: 'Shop/Commercial',
            name: 'Airia Mall',
            location: 'Airia Mall, Sector 68, Gurgaon, Haryana, India',
            size: '300 - 8000 Sq Ft',
            price: '₹2.5 Cr - ₹8.5 Cr',
            image: AriaMall,
            options: ['FOR RENT', 'FOR SALE', 'HOT OFFER'],
            rating: 4.8,
            views: 1200,
            description: 'Airia Mall offers premium commercial spaces in the heart of Gurgaon, ideal for retail and business ventures.'
        },
        {
            id: '2',
            type: 'Office/Commercial',
            name: 'AIPL Business Club',
            location: 'AIPL Business Club, Sector 62, Gurgaon, Haryana, India',
            size: '500 - 5000 Sq Ft',
            price: '₹1.8 Cr - ₹6.2 Cr',
            image: AIPLAutography,
            options: ['FOR RENT', 'FOR SALE'],
            rating: 4.6,
            views: 890,
            description: 'AIPL Business Club provides state-of-the-art office spaces with modern amenities in a prime location.'
        },
        {
            id: '3',
            type: 'Shop/Commercial',
            name: 'The Omaxe State',
            location: 'The Omaxe State, Sector 19B, Dwarka, Delhi, India',
            size: '50 - 10000 Sq Ft',
            price: '₹50 L - ₹12 Cr',
            image: Omaxstate,
            options: ['FOR RENT', 'FOR SALE'],
            rating: 4.5,
            views: 2100,
            description: 'The Omaxe State is a vibrant commercial hub in Dwarka, offering diverse retail and office spaces.'
        },
        {
            id: '4',
            type: 'Residential',
            name: 'M3M Antalya Hills',
            location: 'M3M Antalya Hills, Sector 79, Gurugram, Haryana, India',
            size: '1138 – 1642 Sq Ft',
            price: '₹1.15 Cr – ₹1.62 Cr',
            image: M3Mantalya,
            options: ['FOR RENT', 'FOR SALE', 'HOT OFFER'],
            rating: 4.7,
            views: 1200,
            description: 'M3M Antalya Hills offers luxurious residential living with scenic views and modern amenities.'
        },
        {
            id: '5',
            type: 'Villa',
            name: 'Emerald Hills Villa',
            location: 'Emerald Hills, Sector 65, Gurgaon, Haryana, India',
            size: '2500 - 5000 Sq Ft',
            price: '₹3.5 Cr - ₹8 Cr',
            image: EmeraldHills,
            options: ['FOR SALE', 'LUXURY'],
            rating: 4.9,
            views: 950,
            description: 'Emerald Hills Villas provide exclusive, spacious living with premium facilities in Gurgaon.'
        },
        {
            id: '6',
            type: 'Office/Studio',
            name: 'World Trade Center',
            location: 'WTC, Sector 16, Noida, UP, India',
            size: '800 - 4000 Sq Ft',
            price: '₹80 L - ₹5 Cr',
            image: WorldTrade,
            options: ['FOR RENT', 'FOR SALE'],
            rating: 4.4,
            views: 1350,
            description: 'World Trade Center in Noida offers premium office spaces with global business connectivity.'
        },
        {
            id: '7',
            type: 'Residential',
            name: 'M3M Antalya Hills',
            location: 'M3M Antalya Hills, Sector 79, Gurugram, Haryana, India',
            size: '1138 – 1642 Sq Ft',
            price: '₹1.15 Cr – ₹1.62 Cr',
            image: M3Mantalya,
            options: ['FOR RENT', 'FOR SALE', 'HOT OFFER'],
            rating: 4.7,
            views: 1200,
            description: 'M3M Antalya Hills offers luxurious residential living with scenic views and modern amenities.'
        },
        {
            id: '8',
            type: 'Residential',
            name: 'Central Park Flower Valley The Room',
            location: 'The Room, Central Park II, Sector 48, Gurugram, Haryana, India',
            size: 'NA',
            price: '₹85 L – ₹1.45 Cr',
            image: CentralPark,
            options: ['FOR RENT', 'FOR SALE'],
            rating: 4.5,
            views: 970,
            description: 'Central Park Flower Valley offers elegant residential spaces with lush surroundings.'
        },
        {
            id: '9',
            type: 'Residential',
            name: 'M3M Mansion Sector 113, Gurgaon',
            location: 'M3M Mansion, Sector 113, Bajghera, Gurugram, Haryana, India',
            size: '1638 – 6695 Sq Ft',
            price: '₹1.8 Cr – ₹8.2 Cr',
            image: M3MMansion,
            options: ['FOR RENT', 'FOR SALE', 'HOT OFFER'],
            rating: 4.9,
            views: 2400,
            description: 'M3M Mansion offers ultra-luxury residences with top-tier amenities in Sector 113.'
        },
        {
            id: '10',
            type: 'Residential/Studio/Apartment',
            name: 'Krisumi Waterfall Residences',
            location: 'Krisumi Waterfall Residences, Sector 36A, Gurugram, Haryana, India',
            size: '1448 – 6569 Sq Ft',
            price: '₹1.25 Cr – ₹6.5 Cr',
            image: Krisumi,
            options: ['FEATURED', 'FOR RENT', 'FOR SALE', 'HOT OFFER'],
            rating: 4.6,
            views: 1870,
            description: 'Krisumi Waterfall Residences blend Japanese design with modern luxury in Gurugram.'
        },
        {
            id: '11',
            type: 'Residential/Apartment',
            name: 'Tulip Monsella',
            location: 'Tulip Monsella, Sector 53, Gurugram, Haryana, India',
            size: '1368 – 4503 Sq Ft',
            price: '₹3.75 Cr – ₹9 Cr',
            image: Tulip,
            options: ['FOR RENT', 'FOR SALE'],
            rating: 4.8,
            views: 1650,
            description: 'Tulip Monsella offers premium residences with sophisticated design in Sector 53.'
        },
        {
            id: '12',
            type: 'Residential/Apartment',
            name: 'Smartworld One DXP',
            location: 'Smartworld ONE DXP, Sector 113, Bajghera, Gurugram, Haryana, India',
            size: '2450 – 3203 Sq Ft',
            price: '₹2.95 Cr – ₹5 Cr',
            image: SmartWorld,
            options: ['FOR RENT', 'FOR SALE', 'HOT OFFER'],
            rating: 4.6,
            views: 2100,
            description: 'Smartworld One DXP provides modern residential living with smart home features.'
        },
        {
            id: '13',
            type: 'Commercial',
            name: 'Reach Airia Mall',
            location: 'Airia Mall, Sector 68, Gurugram, Haryana, India',
            size: '300 – 8000 Sq Ft',
            price: '₹ Price on Request',
            image: AriaMall,
            options: ['FOR RENT', 'FOR SALE', 'HOT OFFER'],
            rating: 4.7,
            views: 1700,
            description: 'Reach Airia Mall is a prime commercial destination with versatile retail spaces.'
        },
        {
            id: '14',
            type: 'Commercial',
            name: 'AIPL Business Club',
            location: 'AIPL Business Club, Sector 62, Gurugram, Haryana, India',
            size: '500 – 20000 Sq Ft',
            price: '₹ Price on Request',
            image: AIPLBusinessClub,
            options: ['FOR RENT', 'FOR SALE'],
            rating: 4.6,
            views: 1500,
            description: 'AIPL Business Club offers premium office spaces with cutting-edge facilities.'
        },
        {
            id: '15',
            type: 'Commercial',
            name: 'The Omaxe State',
            location: 'The Omaxe State, Sector 198, Sector 24 Dwarka, Dwarka, Delhi, India',
            size: '50 – 10000 Sq Ft',
            price: '₹ Price on Request',
            image: Omaxstate,
            options: ['FOR RENT', 'FOR SALE', 'HOT OFFER'],
            rating: 4.8,
            views: 2100,
            description: 'The Omaxe State is a bustling commercial complex in Dwarka with diverse offerings.'
        },
        {
            id: '16',
            type: 'Commercial',
            name: 'AIPL Joy Street',
            location: 'AIPL Joy Street, Badshahpur, Sector 66, Gurugram, Haryana, India',
            size: '300 – 8000 Sq Ft',
            price: '₹ Price on Request',
            image: AIPLAutography,
            options: ['FOR RENT', 'FOR SALE'],
            rating: 4.5,
            views: 1400,
            description: 'AIPL Joy Street combines retail and leisure in a vibrant commercial setting.'
        },
        {
            id: '17',
            type: 'Commercial/Villa',
            name: 'Cygnett Retreat',
            location: 'Pahadi Kothi, Bagar Road, Pangot, Uttarakhand, India',
            size: '800 Sq Ft',
            price: '₹ Price on Request',
            image: Cygnett,
            options: ['FOR RENT', 'FOR SALE', 'HOT OFFER'],
            rating: 4.9,
            views: 1300,
            description: 'Cygnett Retreat offers unique commercial spaces in the serene hills of Uttarakhand.'
        },
        {
            id: '18',
            type: 'Commercial',
            name: 'M3M IFC',
            location: 'M3M IFC, Golf Course Extension Road, Badshahpur, Sector 66, Gurugram, Haryana, India',
            size: '500 – 18000 Sq Ft',
            price: '₹ Price on Request',
            image: M3MMansion,
            options: ['FOR RENT', 'FOR SALE', 'HOT OFFER'],
            rating: 4.7,
            views: 1900,
            description: 'M3M IFC is a prestigious commercial complex with world-class office spaces.'
        },
        {
            id: '19',
            type: 'Villa',
            name: 'Cygnett Retreat',
            location: 'Pahadi Kothi, Bagar Road, Pangot, Uttarakhand, India',
            size: '800 Sq Ft',
            price: '₹ Price on Request',
            image: Cygnett,
            options: ['FOR RENT', 'FOR SALE', 'HOT OFFER'],
            rating: 4.9,
            views: 1300,
            description: 'Cygnett Retreat villas offer tranquil living in the scenic hills of Uttarakhand.'
        },
        {
            id: '20',
            type: 'Villa',
            name: 'Sobha International City',
            location: 'Sobha International City, Dwarka Expressway, Sector 109, Gurugram, Haryana, India',
            size: '3153 – 7330 Sq Ft',
            price: '₹ Price on Request',
            image: Sobha,
            options: ['FOR RENT', 'FOR SALE', 'HOT OFFER'],
            rating: 4.8,
            views: 1650,
            description: 'Sobha International City offers luxurious villas with global design standards.'
        },
        {
            id: '21',
            type: 'Office',
            name: 'AIPL Business Club',
            location: 'AIPL Business Club, Sector 62, Gurugram, Haryana, India',
            size: 'Size on Request',
            price: '₹ Price on Request',
            image: AIPLBusinessClub,
            options: ['FOR RENT', 'FOR SALE'],
            rating: 4.7,
            views: 980,
            description: 'AIPL Business Club provides flexible office spaces in a prime Gurgaon location.'
        },
        {
            id: '22',
            type: 'Office',
            name: 'M3M IFC',
            location: 'M3M IFC, Golf Course Extension Road, Badshahpur, Sector 66, Gurugram, Haryana, India',
            size: '500 – 18000 Sq Ft',
            price: '₹ Price on Request',
            image: M3MMansion,
            options: ['FOR RENT', 'FOR SALE', 'HOT OFFER'],
            rating: 4.9,
            views: 1200,
            description: 'M3M IFC offers modern office spaces with premium amenities in Gurgaon.'
        },
        {
            id: '23',
            type: 'Office/Food Court/Commercial/Shop',
            name: 'AIPL Autograph',
            location: 'AIPL Autograph Corporate Office Space, Sector 66, Gurugram, Haryana, India',
            size: 'Size on Request',
            price: '₹ Price on Request',
            image: AIPLAutography,
            options: ['FOR RENT', 'FOR SALE', 'HOT OFFER'],
            rating: 4.8,
            views: 1400,
            description: 'AIPL Autograph provides sophisticated corporate office spaces in Sector 66.'
        },
        {
            id: '24',
            type: 'Shop/Commercial',
            name: 'Elan The Mark',
            location: 'Elan The Mark, Block R, New Palam Vihar Phase 1, Sector 106, Gurugram, Pawala Khasrupur, Haryana, India',
            size: 'Size on Request',
            price: '₹ Price on Request',
            image: Elan,
            options: ['FOR RENT', 'FOR SALE', 'HOT OFFER'],
            rating: 4.8,
            views: 1400,
            description: 'Elan The Mark provides vibrant commercial spaces in Sector 106.'
        },
        {
            id: '25',
            type: 'Apartment/Residential',
            name: 'Elan The Presidential',
            location: 'Elan The Presidential, Northern Peripheral Road, Panwala Khusropur, Sector 106, Gurugram, Haryana, India',
            size: 'Size on Request',
            price: '₹ Price on Request',
            image: ElanThePersidential,
            options: ['FOR RENT', 'FOR SALE', 'HOT OFFER'],
            rating: 4.8,
            views: 1400,
            description: 'Elan The Presidential offers luxurious residential apartments in Sector 106.'
        },
        {
            id: '26',
            type: 'Apartment/Residential',
            name: 'Trinity Sky Palazzos',
            location: 'Trinity Sky Palazzos, On, Northern Peripheral Road, Sector 88B, Gurugram, Haryana, India',
            size: 'Size on Request',
            price: '₹ Price on Request',
            image: Trinity,
            options: ['FOR RENT', 'FOR SALE', 'HOT OFFER'],
            rating: 4.8,
            views: 1400,
            description: 'Trinity Sky Palazzos provides premium residential living in Sector 88B.'
        },
        {
            id: '27',
            type: 'Apartment/Residential',
            name: 'Pioneer Urban Presidia',
            location: 'Pioneer Presidia, Sector 62, Gurugram, Ghata, Haryana, India',
            size: 'Size on Request',
            price: '₹ Price on Request',
            image: PionerUrban,
            options: ['FOR RENT', 'FOR SALE', 'HOT OFFER'],
            rating: 4.8,
            views: 1400,
            description: 'Pioneer Urban Presidia provides premium residential living in Sector 62.'
        }
    ];

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
            default:
                return 'bg-gray-800 text-gray-200 border border-[#ffffff38]';
        }
    };

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1500);
        setVisibleProperties(6);
    }, [activeTab]);

    useEffect(() => {
        localStorage.setItem('shareCounts', JSON.stringify(shareCounts));
    }, [shareCounts]);

    const handleViewMore = () => {
        setVisibleProperties(filteredProperties.length);
        setShowAll(true);
    };

    const handleViewLess = () => {
        setVisibleProperties(6);
        setShowAll(false);
    };

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
                                <div className="absolute top-16 right-4 bg-[#333] rounded-lg shadow-xl p-2 z-50 w-48 border border-[#ffffff38]">
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
                                    <div className="flex flex-col sm:flex-row gap-3">
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
                            <div className="right-side border border-[#ffffff38] p-4 sm:p-6 rounded-xl shadow-md sm:w-1/2">
                                <h3 className="text-lg font-semibold text-[#c2c6cb] mb-4 fontFamily-bebas">Schedule a Tour</h3>
                                <form className="space-y-4" onSubmit={handleTourSubmit}>
                                    <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                                        <div className="w-full sm:w-1/2">
                                            <label className="block text-sm font-medium text-[#c2c6cb] mb-1" htmlFor="tourDate">
                                                Date
                                            </label>
                                            <DatePicker
                                                id="tourDate"
                                                name="tourDate"
                                                className="w-full"
                                                style={{
                                                    padding: '8px',
                                                    borderRadius: '8px',
                                                    border: '1px solid #ffffff38',
                                                    background: '#333',
                                                    color: '#c2c6cb'
                                                }}
                                                placeholder="Select date"
                                                value={tourForm.tourDate}
                                                onChange={handleDateChange}
                                            />
                                        </div>
                                        <div className="w-full sm:w-1/2">
                                            <label className="block text-sm font-medium text-[#c2c6cb] mb-1" htmlFor="tourTime">
                                                Time
                                            </label>
                                            <TimePicker
                                                id="tourTime"
                                                name="tourTime"
                                                use12Hours
                                                format="h:mm:ss A"
                                                className="w-full"
                                                style={{
                                                    padding: '8px',
                                                    borderRadius: '8px',
                                                    border: '1px solid #ffffff38',
                                                    background: '#333',
                                                    color: '#c2c6cb'
                                                }}
                                                placeholder="Select time"
                                                value={tourForm.tourTime}
                                                onChange={handleTimeChange}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#c2c6cb] mb-1" htmlFor="tourName">
                                            Name
                                        </label>
                                        <CustomInput
                                            type="text"
                                            id="tourName"
                                            name="tourName"
                                            className="w-full px-3 py-2 border border-[#ffffff38] rounded-lg bg-[#333] text-[#c2c6cb]"
                                            placeholder="Enter your name"
                                            value={tourForm.tourName}
                                            onChange={handleTourChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#c2c6cb] mb-1" htmlFor="tourPhone">
                                            Phone
                                        </label>
                                        <CustomInput
                                            type="tel"
                                            id="tourPhone"
                                            name="tourPhone"
                                            className="w-full px-3 py-2 border border-[#ffffff38] rounded-lg bg-[#333] text-[#c2c6cb]"
                                            placeholder="Enter your phone number"
                                            value={tourForm.tourPhone}
                                            onChange={handleTourChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#c2c6cb] mb-1" htmlFor="tourEmail">
                                            Email
                                        </label>
                                        <CustomInput
                                            type="email"
                                            id="tourEmail"
                                            name="tourEmail"
                                            className="w-full px-3 py-2 border border-[#ffffff38] rounded-lg bg-[#333] text-[#c2c6cb]"
                                            placeholder="Enter your email address"
                                            value={tourForm.tourEmail}
                                            onChange={handleTourChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#c2c6cb] mb-1" htmlFor="tourMessage">
                                            Message
                                        </label>
                                        <textarea
                                            id="tourMessage"
                                            name="tourMessage"
                                            rows={3}
                                            className="w-full px-3 py-2 border border-[#ffffff38] rounded-lg bg-[#333] text-[#c2c6cb] text-area-contact"
                                            placeholder="Type your message"
                                            value={tourForm.tourMessage}
                                            onChange={handleTourChange}
                                        />
                                    </div>
                                    <div className="w-full flex justify-center items-center">
                                        <CustomButton
                                            type="submit"
                                            className="w-auto text-[#c2c6cb] font-semibold py-3 px-4 property-card-action-button rounded-xl bg-[#333] hover:bg-[#444] border border-[#ffffff38]"
                                        >
                                            Schedule Tour
                                        </CustomButton>
                                    </div>
                                </form>
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
            <h2 className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-[#c2c6cb] via-[#c99913] to-[#c2c6cb] bg-clip-text text-transparent mb-2 sm:mb-3">
                No Properties Found
            </h2>
            <p className="text-[#c2c6cb] text-sm sm:text-lg font-[Inter] max-w-full sm:max-w-md mx-auto">
                There are no properties available for the selected category. Try another category or check back later.
            </p>
            <div className="mt-4 sm:mt-6">
                <CustomButton
                    className="px-4 sm:px-6 py-2 sm:py-3 cursor-pointer rounded-xl font-semibold text-[#c2c6cb] bg-[#333] hover:bg-[#444] border border-[#ffffff38] hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base"
                    onClick={() => setActiveTab('all')}
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

    return (
        <div className="min-h-screen bg-[#2d2d2d] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-full sm:max-w-7xl mx-auto mb-8 sm:mb-12 text-center">
                <h1 className="mobile-title-text text-3xl font-[Montserrat] sm:text-5xl md:text-6xl font-black mb-3 sm:mb-4 bg-gradient-to-r from-[#c2c6cb] via-[#c99913] to-[#c2c6cb] bg-clip-text text-transparent animate-pulse">
                    Explore Premium Properties
                </h1>
                <div className="h-1 bg-gradient-to-r from-transparent via-[#c99913] to-transparent rounded-full animate-pulse"></div>
                <p className="mobile-subtitle-text text-[#c2c6cb] text-sm font-[sans-serif] sm:text-lg max-w-full sm:max-w-2xl mx-auto mt-2 font-[Inter]">
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
                            onClick={() => setActiveTab(tab.key)}
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
                            {filteredProperties.slice(0, visibleProperties).map((property, index) => (
                                <PropertyCard key={property.id} property={property} index={index} />
                            ))}
                        </div>
                        {filteredProperties.length > 6 && (
                            <div className="text-center flex items-center w-full justify-center mt-8">
                                {!showAll ? (
                                    <CustomButton
                                        className="px-6 py-3 flex items-center rounded-xl w-auto cursor-pointer property-card-action-button bg-[#333] text-[#c2c6cb] hover:bg-[#444] border border-[#ffffff38]"
                                        onClick={handleViewMore}
                                    >
                                        View More
                                    </CustomButton>
                                ) : (
                                    <CustomButton
                                        className="px-6 py-3 rounded-xl cursor-pointer property-card-action-button bg-[#333] text-[#c2c6cb] hover:bg-[#444] border border-[#ffffff38]"
                                        onClick={handleViewLess}
                                    >
                                        View Less
                                    </CustomButton>
                                )}
                            </div>
                        )}
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