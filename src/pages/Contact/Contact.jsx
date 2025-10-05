import React from 'react';
import {
    Phone,
    Mail,
    MapPinned,
    Facebook,
    Instagram,
    Linkedin,
    Twitter,
    Youtube,
    MapPin,
} from 'lucide-react';
import ContactImg from '../../assets/images/about/contact_background.png';
import ContactMobileImg from '../../assets/images/about/contact_mobile.png'
import ContactForm from './ContactForm';

const Contact = () => {
    const handleSubmitSuccess = () => {
    };

    return (
        <div className="bg-[#333]">
            {/* Hero Section */}
            <div
                className="mobile-contact-image relative h-[400px] w-full bg-cover bg-center flex items-center justify-end pr-10"
                style={{
                    backgroundImage: `url(${window.innerWidth < 640 ? ContactMobileImg : ContactImg})`
                }}
            >
                <div className="absolute inset-0 bg-[#333]/40 z-0" />
            </div>


            {/* Main Section */}
            <div className="container mx-auto px-4 py-10 main-contact-section laptop-mode-screen">
                <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto main-section-contact-grid">
                    {/* Left Column: Form + Map */}
                    <div className="space-y-8 mobile-conatiner-width">
                        {/* Contact Form */}
                        <ContactForm onSubmitSuccess={handleSubmitSuccess} />

                        {/* Map Card below form */}
                        <div className="bg-[#444]/70 rounded-xl shadow-xl overflow-hidden max-w-4xl mx-auto mt-12 border border-[#ffffff38]">
                            <div className="bg-transparent flex items-center gap-1 p-2 px-4">
                                <MapPinned className="text-[#c2c6cb]" />
                                <h2 className="text-xl font-bold text-[#c2c6cb] font-[Inter]">Our Location</h2>
                            </div>

                            <div className="h-[400px] w-full">
                                <iframe
                                    title="Ethos Pro Realtors Location"
                                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d28074.83633459234!2d77.07113600000001!3d28.408557!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x68566b8719439e4d%3A0xb5f46970417c7d6d!2sEthos%20Pro%20Realtors!5e0!3m2!1sen!2sus!4v1754567678927!5m2!1sen!2sus"
                                    width="100%"
                                    height="100%"
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="border-0"
                                ></iframe>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Contact Cards, Office, Social */}
                    <div className="space-y-8 right-column-contact">
                        {/* Contact Info Cards */}
                        <div className="bg-[#333] rounded-3xl shadow-xl p-8 relative overflow-hidden contact-info-cards border border-[#ffffff38]">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#c2c6cb]/20 to-transparent rounded-full -mr-10 -mt-10"></div>
                            <h2 className="text-2xl font-bold text-[#c2c6cb] mb-6">For Inquiries Contact:</h2>
                            <div className="space-y-6">
                                <div className="bg-gradient-to-r from-[#333]/50 to-[#444]/50 p-6 rounded-2xl border border-[#ffffff38]">
                                    <h3 className="font-semibold text-[#c2c6cb] text-lg mb-1">Satya Mandal</h3>
                                    <p className="text-[#c2c6cb]/80 text-sm mb-4">(Sr. Sales Manager)</p>
                                    <div className="space-y-3">
                                        <div className="flex items-center">
                                            <Phone className="w-4 h-4 text-[#c2c6cb] mr-3" />
                                            <span className="text-[#c2c6cb]">+91 99103 18013</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Mail className="w-4 h-4 text-[#c2c6cb] mr-3" />
                                            <span className="text-[#c2c6cb]">satya@ethosprorealtors.com</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gradient-to-r from-[#333]/50 to-[#444]/50 p-6 rounded-2xl border border-[#ffffff38]">
                                    <h3 className="font-semibold text-[#c2c6cb] text-lg mb-1">Avantika</h3>
                                    <p className="text-[#c2c6cb]/80 text-sm mb-4">(Investment Advisor)</p>
                                    <div className="space-y-3">
                                        <div className="flex items-center">
                                            <Phone className="w-4 h-4 text-[#c2c6cb] mr-3" />
                                            <span className="text-[#c2c6cb]">+91 81300 16627</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Mail className="w-4 h-4 text-[#c2c6cb] mr-3" />
                                            <span className="text-[#c2c6cb]">avantika@ethosprorealtors.com</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Office Location */}
                        <div className="bg-[#444]/70 rounded-3xl shadow-xl p-8 border border-[#ffffff38]">
                            <h2 className="text-2xl font-bold text-[#c2c6cb] mb-6">Visit Our Office</h2>
                            <div className="bg-gradient-to-r from-[#333]/50 to-[#444]/50 p-6 rounded-2xl border border-[#ffffff38]">
                                <div className="flex items-start">
                                    <MapPin className="w-5 h-5 text-[#c2c6cb] mr-3 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-[#c2c6cb] mb-2">Suncity Success Tower</h3>
                                        <p className="text-[#c2c6cb] leading-relaxed">
                                            Unit No 507, 5th Floor, Tower-A, Sector 65,<br />
                                            Gurugram, Haryana 122001
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="bg-[#444]/70 rounded-3xl shadow-xl p-8 border border-[#ffffff38]">
                            <h2 className="text-2xl font-bold text-[#c2c6cb] mb-6">Follow Us On</h2>
                            <div className="flex space-x-4">
                                <a
                                    href="https://www.facebook.com/ethosprorealtors/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 bg-[#c2c6cb]/20 hover:bg-[#c2c6cb]/40 text-[#c2c6cb] rounded-full flex items-center justify-center transition transform hover:scale-110 border border-[#ffffff38]"
                                >
                                    <Facebook className="w-5 h-5" />
                                </a>
                                <a
                                    href="https://www.instagram.com/ethosprorealtors/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 bg-[#c2c6cb]/20 hover:bg-[#c2c6cb]/40 text-[#c2c6cb] rounded-full flex items-center justify-center transition transform hover:scale-110 border border-[#ffffff38]"
                                >
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a
                                    href="https://in.linkedin.com/company/ethos-pro-realtors"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 bg-[#c2c6cb]/20 hover:bg-[#c2c6cb]/40 text-[#c2c6cb] rounded-full flex items-center justify-center transition transform hover:scale-110 border border-[#ffffff38]"
                                >
                                    <Linkedin className="w-5 h-5" />
                                </a>
                                <a
                                    href="https://twitter.com/ethosprorealtors"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 bg-[#c2c6cb]/20 hover:bg-[#c2c6cb]/40 text-[#c2c6cb] rounded-full flex items-center justify-center transition transform hover:scale-110 border border-[#ffffff38]"
                                >
                                    <Twitter className="w-5 h-5" />
                                </a>
                                <a
                                    href="https://www.youtube.com/@ethosprorealtors"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 bg-[#c2c6cb]/20 hover:bg-[#c2c6cb]/40 text-[#c2c6cb] rounded-full flex items-center justify-center transition transform hover:scale-110 border border-[#ffffff38]"
                                >
                                    <Youtube className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;