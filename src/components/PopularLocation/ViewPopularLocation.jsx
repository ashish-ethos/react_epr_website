import React, { useState } from 'react';
import ContactForm from "../../pages/Contact/ContactForm";
import { X, Star } from 'lucide-react';
import './PopularLocation.css';
const ViewPopularLocation = ({ isOpen, onClose, location }) => {
    const [showContact, setShowContact] = useState(false);
    const [contactType, setContactType] = useState('');

    if (!isOpen || !location) return null;

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
                                    <div className="stats-grid">
                                        <div className="stat-item">
                                            <span className="stat-label">Type</span>
                                            <span className="stat-value">{location.type}</span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-label">Size</span>
                                            <span className="stat-value">{location.size}</span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-label">Views</span>
                                            <span className="stat-value">{location.views}</span>
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

                                        <div className="facilities-header">Facilities</div>
                                        <div className="facilities-grid">
                                            {location.facilities && location.facilities.length > 0 ? (
                                                <ul className="facilities-list">
                                                    {location.facilities.map((facility, idx) => (
                                                        <li key={idx} className="facility-item">{facility}</li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p>No facilities available</p>
                                            )}
                                        </div>
                                    </div>
                                )}
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

export default ViewPopularLocation;