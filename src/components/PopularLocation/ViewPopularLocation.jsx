import React, { useState, useEffect } from 'react';
import ContactForm from "../../pages/Contact/ContactForm";
import { X, Star } from 'lucide-react';
import './PopularLocation.css';

const ViewPopularLocation = ({ isOpen, onClose, location }) => {
    const [showContact, setShowContact] = useState(false);
    const [contactType, setContactType] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsLoading(true);
            const timer = setTimeout(() => setIsLoading(false), 1500);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    if (isLoading || !location) {
        return (
            <LoadingModal onClose={onClose} showContact={showContact} contactType={contactType} />
        );
    }

    const handleOpenContact = (type) => {
        setContactType(type);
        setShowContact(true);
    };

    const handleCloseContact = () => {
        setShowContact(false);
        setContactType('');
    };

    return (
        <>
            <div className="advanced-modal-overlay" onClick={onClose}>
                <div className="advanced-modal" onClick={(e) => e.stopPropagation()}>
                    <button className="modal-close-btn" onClick={onClose}>
                        <X />
                    </button>

                    <div className="modal-scroll-container">
                        <div className="modal-hero-section">
                            {location.image && (
                                <img
                                    src={location.image}
                                    alt={location.name}
                                    className="modal-hero-image"
                                />
                            )}
                            <div className="modal-hero-overlay"></div>
                            <div className="modal-hero-content">
                                <h2 className="modal-title">{location.name}</h2>
                                <div className="modal-subtitle-row">
                                    <div className="rating-badge">
                                        <Star className='w-4 h-4' /> {location.rating}
                                    </div>
                                    <div className="price-badge">
                                        {location.price}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-body">
                            <div className="info-grid">
                                <div className="info-card">
                                    <div className="section-header">Overview</div>
                                    <p className="description-text">{location.description}</p>
                                </div>
                            </div>

                            <div className="info-grid details-options-grid">
                                <div className="info-card">
                                    <div className="section-header">Details</div>
                                    <div className="flex flex-wrap gap-3 mt-4">
                                        <div className="flex flex-col justify-center bg-[#222] border border-[#333] rounded-lg p-2  flex-1">
                                            <span className="text-sm text-gray-400">Type</span>
                                            <span className="text-sm font-semibold text-[#c2c6cb]">
                                                {location.type}
                                            </span>
                                        </div>

                                        <div className="flex flex-col justify-center bg-[#222] border border-[#333] rounded-lg p-2 flex-1">
                                            <span className="text-sm text-gray-400">Size</span>
                                            <span className="text-sm font-semibold text-[#c2c6cb]">
                                                {location.size}
                                            </span>
                                        </div>

                                        <div className="flex flex-col justify-center bg-[#222] border border-[#333] rounded-lg p-2 flex-1">
                                            <span className="text-sm text-gray-400">Views</span>
                                            <span className="text-sm font-semibold text-[#c2c6cb]">
                                                {location.views}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {location.options && (
                                    <div className="info-card">
                                        <div className="section-header">Available Options</div>
                                        <div className="tags-container">
                                            {location.options.map((opt, idx) => (
                                                <span key={idx} className="tag-chip">{opt}</span>
                                            ))}
                                        </div>


                                    </div>

                                )}

                                <div className='info-card '>
                                    <div className="facilities-header">Facilities</div>
                                    <div className="facilities-grid">
                                        {location.facilities && location.facilities.length > 0 ? (
                                            <ul className="facilities-list">
                                                {location.facilities.map((facility, idx) => (
                                                    <li key={idx} className="facility-item bg-[#333] border-1 shadow-sm p-2 rounded-md ">{facility}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p>No facilities available</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {location.addressMap && (
                                <div className="info-card">
                                    <div className="section-header">Location</div>
                                    <div
                                        className="map-container"
                                        dangerouslySetInnerHTML={{ __html: location.addressMap }}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="action-bar">
                            <button
                                className="action-button action-button-primary"
                                onClick={() => handleOpenContact('enquire')}
                            >
                                Enquire Now
                            </button>
                            <button
                                className="action-button action-button-secondary"
                                onClick={() => handleOpenContact('download')}
                            >
                                Download Brochure
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showContact && (
                <div className="contact-modal-overlay" onClick={handleCloseContact}>
                    <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="contact-modal-close" onClick={handleCloseContact}>
                            <X />
                        </button>
                        <div className="contact-modal-header">
                            <h3 className="contact-modal-title">
                                {contactType === 'enquire' ? 'Enquire Now' : 'Download Brochure'}
                            </h3>
                            <p className="contact-modal-subtitle">
                                Fill in your details to {contactType === 'enquire' ? 'get in touch' : 'receive the brochure'}
                            </p>
                        </div>
                        <div className="contact-modal-body custom-scrollbar">
                            <ContactForm
                                onSubmit={() => {
                                    handleCloseContact();
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

const LoadingModal = ({ onClose, showContact, contactType }) => (
    <>
        <div className="advanced-modal-overlay" onClick={onClose}>
            <div className="advanced-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-close-btn h-6 w-6 bg-[#444] rounded-full"></div> 

                <div className="modal-scroll-container">
                    {/* Hero Section Skeleton */}
                    <div className="modal-hero-section">
                        <div className="modal-hero-image h-64 bg-[#444] rounded"></div> 
                        <div className="modal-hero-overlay"></div>
                        <div className="modal-hero-content">
                            <div className="h-8 w-80 bg-[#444] rounded mb-2"></div> 
                            <div className="flex gap-4">
                                <div className="h-6 w-16 bg-[#444] rounded flex items-center justify-center"></div> 
                                <div className="h-6 w-24 bg-[#444] rounded flex items-center justify-center"></div> 
                            </div>
                        </div>
                    </div>

                    {/* Body Skeleton */}
                    <div className="modal-body">
                        {/* Overview Card */}
                        <div className="info-grid">
                            <div className="info-card">
                                <div className="h-5 w-24 bg-[#444] rounded mb-3"></div> 
                                <div className="space-y-2">
                                    {Array.from({ length: 4 }).map((_, i) => (  
                                        <div key={i} className="h-4 w-full bg-[#444] rounded"></div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Details and Options Grid */}
                        <div className="info-grid details-options-grid">
                            {/* Details Card */}
                            <div className="info-card">
                                <div className="h-5 w-20 bg-[#444] rounded mb-4"></div> 
                                <div className="flex flex-wrap gap-3">
                                    {Array.from({ length: 3 }).map((_, i) => (  
                                        <div key={i} className="flex flex-col justify-center bg-[#222] border border-[#333] rounded-lg p-2 flex-1">
                                            <div className="h-3 w-12 bg-[#444] rounded mb-1"></div> 
                                            <div className="h-4 w-16 bg-[#444] rounded"></div> 
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Options Card */}
                            <div className="info-card">
                                <div className="h-5 w-32 bg-[#444] rounded mb-4"></div> 
                                <div className="flex flex-wrap gap-2">
                                    {Array.from({ length: 5 }).map((_, i) => (  // 5 tag chips
                                        <div key={i} className="h-6 w-16 bg-[#444] rounded-full"></div>
                                    ))}
                                </div>
                            </div>

                            {/* Facilities Card */}
                            <div className="info-card">
                                <div className="h-5 w-24 bg-[#444] rounded mb-4"></div> 
                                <ul className="facilities-list space-y-2">
                                    {Array.from({ length: 8 }).map((_, i) => (  
                                        <li key={i} className="facility-item bg-[#333] border border-[#333] shadow-sm p-2 rounded-md">
                                            <div className="h-4 w-32 bg-[#444] rounded"></div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Location Map Card */}
                        <div className="info-card">
                            <div className="h-5 w-20 bg-[#444] rounded mb-4"></div> 
                            <div className="map-container h-64 bg-[#444] rounded"></div> 
                        </div>
                    </div>

                    {/* Action Bar Skeleton */}
                    <div className="action-bar flex gap-4 justify-center">
                        <div className="h-12 w-32 bg-[#444] rounded-lg"></div> 
                        <div className="h-12 w-40 bg-[#444] rounded-lg"></div> 
                    </div>
                </div>
            </div>
        </div>

        {showContact && (
            <div className="contact-modal-overlay" onClick={() => {}}>
                <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
                    <div className="contact-modal-close h-6 w-6 bg-[#444] rounded-full"></div> 
                    <div className="contact-modal-header">
                        <div className="h-6 w-32 bg-[#444] rounded mb-2"></div> 
                        <div className="h-4 w-64 bg-[#444] rounded"></div>
                    </div>
                    <div className="contact-modal-body custom-scrollbar space-y-4 p-4">
                        {/* Form fields placeholders */}
                        {Array.from({ length: 5 }).map((_, i) => ( 
                            <div key={i} className="h-10 w-full bg-[#444] rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        )}
    </>
);

export default ViewPopularLocation;