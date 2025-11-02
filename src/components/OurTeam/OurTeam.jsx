import React, { useState, useEffect } from 'react';
import { Drawer, Tag, Divider } from 'antd';
import { UserOutlined, PhoneOutlined, MailOutlined, StarFilled, CloseOutlined } from '@ant-design/icons';
import MohitSharma from "../../assets/images/home/Mohit-Sharma.png";
import ArunGodara from "../../assets/images/home/Arun-Godara.png";
import Satya from "../../assets/images/home/Satya.jpg";
import DeepakBhati from "../../assets/images/home/Deepak-Bhati-150x150.png";
import Prerna from "../../assets/images/home/Prerna-150x150.jpg";
import Avantika from "../../assets/images/home/Avantika-150x150.jpg";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { Modal } from "antd";
import {
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaWhatsapp
} from 'react-icons/fa6';
import { useParams, useNavigate, useLocation } from "react-router-dom";
import './OurTeam.css';
import CustomButton from '../ui/Button';
import ContactForm from '../../pages/Contact/ContactForm';

const teamMembers = [
  {
    id: 1,
    name: "Mohit Sharma",
    position: "Managing Director",
    image: MohitSharma,
    experience: "10+ Years",
    bio: "Visionary leader with years in real estate industry, driving innovation and growth. Leading the company towards new heights with strategic vision and exceptional leadership skills.",
    skills: ["Leadership", "Strategic Planning", "Business Development", "Team Management", "Market Expansion"],
    projects: "500+ Properties",
    phone: "+91 8744964496",
    email: "mohit.sharma@ethosprorealtors.com",
    rating: 5.0,
    achievements: ["Industry Leader 2023", "Visionary Award", "Growth Champion", "Leadership Excellence"],
    specializations: ["Strategic Planning", "Business Development", "Team Leadership"],
    socialIcons: [
      { icon: "FaFacebookF", link: "https://www.facebook.com/ethosprorealtors/" },
      { icon: "FaXTwitter", link: "https://x.com/ethosprorealtor" },
      { icon: "FaLinkedinIn", link: "https://www.linkedin.com/company/ethos-pro-realtors/" },
      { icon: "FaWhatsapp", link: "https://wa.me/918744964496" },
      { icon: "FaInstagram", link: "https://www.instagram.com/ethosprorealtors/" }
    ]
  },
  {
    id: 2,
    name: "Arun Godara",
    position: "Director",
    image: ArunGodara,
    bio: "Visionary leader with 10+ Years in real estate industry, driving innovation and growth. Leading the company towards new heights with strategic vision and exceptional leadership skills.",
    skills: ["Leadership", "Strategic Planning", "Business Development", "Team Management", "Market Expansion"],
    experience: "10+ Years",
    projects: "500+ Properties",
    phone: "+91 8744964496",
    email: "arun.godara@ethosprorealtors.com",
    rating: 5.0,
    achievements: ["Industry Leader 2023", "Visionary Award", "Growth Champion", "Leadership Excellence"],
    specializations: ["Strategic Planning", "Business Development", "Team Leadership"],
    socialIcons: [
      { icon: "FaFacebookF", link: "https://www.facebook.com/ethosprorealtors/" },
      { icon: "FaXTwitter", link: "https://x.com/ethosprorealtor" },
      { icon: "FaLinkedinIn", link: "https://www.linkedin.com/company/ethos-pro-realtors/" },
      { icon: "FaWhatsapp", link: "https://wa.me/918744964496" },
      { icon: "FaInstagram", link: "https://www.instagram.com/ethosprorealtors/" }
    ]
  },
  {
    id: 3,
    name: "Satya Mandal",
    position: "Sr. Sales Manager",
    image: Satya,
    bio: "Visionary leader with 8+ Years in real estate industry, driving innovation and growth. Leading the company towards new heights with strategic vision and exceptional leadership skills.",
    skills: ["Leadership", "Strategic Planning", "Business Development", "Team Management", "Market Expansion"],
    experience: "8+ Years",
    projects: "500+ Properties",
    phone: "+91 8744964496",
    email: "satya.mandal@ethosprorealtors.com",
    rating: 5.0,
    achievements: ["Industry Leader 2023", "Visionary Award", "Growth Champion", "Leadership Excellence"],
    specializations: ["Strategic Planning", "Business Development", "Team Leadership"],
    socialIcons: [
      { icon: "FaFacebookF", link: "https://www.facebook.com/ethosprorealtors/" },
      { icon: "FaXTwitter", link: "https://x.com/ethosprorealtor" },
      { icon: "FaLinkedinIn", link: "https://www.linkedin.com/company/ethos-pro-realtors/" },
      { icon: "FaWhatsapp", link: "https://wa.me/918744964496" },
      { icon: "FaInstagram", link: "https://www.instagram.com/ethosprorealtors/" }
    ]
  },
  {
    id: 4,
    name: "Deepak Bhati",
    position: "Sr. Sales Expert",
    image: DeepakBhati,
    bio: "Expert in luxury property sales with 7+ years of experience in premium real estate markets. Specializes in high-end residential and commercial properties with a focus on client satisfaction and long-term relationships.",
    skills: ["Luxury Sales", "Client Relations", "Market Analysis", "Property Valuation", "Negotiation"],
    experience: "7+ Years",
    projects: "250+ Properties",
    phone: "+91 8744964496",
    email: "deepak.bhati@ethosprorealtors.com",
    rating: 4.9,
    achievements: ["Top Performer 2023", "Client Choice Award", "Luxury Sales Expert"],
    specializations: ["Residential", "Commercial", "Luxury Properties"],
    socialIcons: [
      { icon: "FaFacebookF", link: "https://www.facebook.com/ethosprorealtors/" },
      { icon: "FaXTwitter", link: "https://x.com/ethosprorealtor" },
      { icon: "FaLinkedinIn", link: "https://www.linkedin.com/company/ethos-pro-realtors/" },
      { icon: "FaWhatsapp", link: "https://wa.me/918744964496" },
      { icon: "FaInstagram", link: "https://www.instagram.com/ethosprorealtors/" }
    ]
  },
  {
    id: 5,
    name: "Prerna Kapuria",
    position: "Sr. Sales Expert",
    image: Prerna,
    bio: "Specialized in residential properties and investment consulting with exceptional client satisfaction. Known for her analytical approach and ability to match clients with their perfect properties.",
    skills: ["Residential Sales", "Investment Advice", "Negotiation", "Market Research", "Client Management"],
    experience: "6+ Years",
    projects: "180+ Properties",
    phone: "+91 8744964496",
    email: "prerna.kapuria@ethosprorealtors.com",
    rating: 4.8,
    achievements: ["Rising Star 2023", "Customer Satisfaction Award", "Investment Specialist"],
    specializations: ["Residential", "Investment Properties", "First-time Buyers"],
    socialIcons: [
      { icon: "FaFacebookF", link: "https://www.facebook.com/ethosprorealtors/" },
      { icon: "FaXTwitter", link: "https://x.com/ethosprorealtor" },
      { icon: "FaLinkedinIn", link: "https://www.linkedin.com/company/ethos-pro-realtors/" },
      { icon: "FaWhatsapp", link: "https://wa.me/918744964496" },
      { icon: "FaInstagram", link: "https://www.instagram.com/ethosprorealtors/" }
    ]
  },
  {
    id: 6,
    name: "Avantika Kapuria",
    position: "Sr. Sales Expert",
    image: Avantika,
    bio: "Commercial real estate specialist with proven track record in corporate deals. Expert in analyzing market trends and providing strategic advice for commercial investments.",
    skills: ["Commercial Sales", "Property Valuation", "Market Research", "Corporate Deals", "Strategic Planning"],
    experience: "6+ Years",
    projects: "120+ Properties",
    phone: "+91 8744964496",
    email: "avantika.kapuria@ethosprorealtors.com",
    rating: 4.9,
    achievements: ["Commercial Expert 2023", "Deal Maker Award", "Market Analyst"],
    specializations: ["Commercial", "Office Spaces", "Retail Properties"],
    socialIcons: [
      { icon: "FaFacebookF", link: "https://www.facebook.com/ethosprorealtors/" },
      { icon: "FaXTwitter", link: "https://x.com/ethosprorealtor" },
      { icon: "FaLinkedinIn", link: "https://www.linkedin.com/company/ethos-pro-realtors/" },
      { icon: "FaWhatsapp", link: "https://wa.me/918744964496" },
      { icon: "FaInstagram", link: "https://www.instagram.com/ethosprorealtors/" }
    ]
  },
];

const TeamCard = ({ member, index, isVisible, onViewProfile }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`group relative w-full h-[420px] perspective-1000 transform transition-all duration-700 flex-shrink-0 mobile-screen-teamcard`}
      style={{ transitionDelay: `${index * 200}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative w-full h-full transform-style-preserve-3d transition-transform duration-700 ${isFlipped ? 'rotate-y-180' : ''}`}
      >
        {/* FRONT SIDE */}
        <div className="main-card-profile absolute inset-0 w-full h-full backface-hidden">
          <div className="relative w-full h-full bg-[#444] rounded-3xl shadow-xl overflow-hidden border border-[#ffffff38] transition-all duration-500">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#333] via-[#444] to-[#c2c6cb]"></div>
            <div className="relative h-56 overflow-hidden">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-contain transition-all duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#333]/70 via-transparent to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#444]/10 to-[#c2c6cb]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className={`absolute top-4 right-4 space-y-2 transform transition-all duration-500 ${isHovered ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
                <div className="bg-[#333]/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-[#c2c6cb] shadow-lg">
                  {member.experience}
                </div>
                <div className="bg-gradient-to-r from-[#c2c6cb] to-[#444] text-[#333] px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                  {member.projects}
                </div>
              </div>
              <button
                onClick={() => setIsFlipped(!isFlipped)}
                className={`absolute cursor-pointer bottom-4 right-4 w-10 h-10 bg-[#333]/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transform transition-all duration-500 hover:scale-110 hover:bg-[#444] hover:text-[#c2c6cb] ${isHovered ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}`}
              >
                <FaArrowRightArrowLeft />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="text-center space-y-2">
                <h3 className="text-xl font-black  bg-gradient-to-r from-[#c2c6cb] via-[#c99913] to-[#c2c6cb] bg-clip-text text-transparent">
                  {member.name}
                </h3>
                <p className="text-[#c2c6cb] font-bold text-sm uppercase tracking-wider">
                  {member.position}
                </p>
              </div>
              <CustomButton
                onClick={() => onViewProfile(member)}
                className="w-full py-2.5 cursor-pointer gradient-border font-bold rounded-xl"
              >
                <span className="flex items-center justify-center gap-2 text-sm">
                  <UserOutlined />
                  View Full Profile
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </CustomButton>
            </div>
          </div>
        </div>
        {/* BACK SIDE */}
        <div className="main-card-profile absolute inset-0 w-full h-full backface-hidden rotate-y-180">
          <div className="w-full h-full bg-gradient-to-br from-[#444] to-[#333] rounded-3xl shadow-xl border border-[#ffffff38] flex flex-col">
            <div className="flex-1 overflow-y-auto p-4">
              <h3 className="text-lg font-bold mb-1 bg-gradient-to-r from-[#c2c6cb] via-[#c99913] to-[#c2c6cb] bg-clip-text text-transparent ">
                {member.name}
              </h3>
              <p className="text-[#c2c6cb] font-semibold text-sm mb-2">
                {member.position}
              </p>
              <p className="text-[#c2c6cb] text-sm leading-relaxed mb-4">
                {member.bio}
              </p>
              <h4 className="text-[#c2c6cb] font-bold text-sm uppercase tracking-wide mb-2">Expertise</h4>
              <div className="flex flex-wrap gap-2">
                {member.skills.slice(0, 3).map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1 bg-gradient-to-r from-[#c2c6cb]/20 to-[#444]/20 border border-[#ffffff38] text-[#c2c6cb] text-xs rounded-full font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-4">
              <CustomButton
                onClick={() => setIsFlipped(false)}
                className="w-full py-3 cursor-pointer gradient-border font-bold rounded-xl"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Profile
                </span>
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileDrawer = ({ member, visible, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const customCloseIcon = <CloseOutlined className="text-red-500" />;
  if (!member) return null;

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <Drawer
      title={null}
      placement="right"
      onClose={onClose}
      open={visible}
      width={450}
      styles={{
        body: { padding: 0 },
        header: { display: 'none' }
      }}
      className='custom-scrollbar '
    >
      <div className="h-full bg-gradient-to-br from-[#444] to-[#333]">
        <div className="relative h-48 overflow-hidden">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-contain bg-[#333]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#333]/70 to-transparent"></div>
          <div className="absolute inset-0 flex items-end p-6 border-b border-[#c2c6cb]">
            <div className="text-[#c2c6cb]">
              <h2 className="text-2xl font-black mb-1 fontFamily-bebas">{member.name}</h2>
              <p className="text-[#c2c6cb] font-semibold fontFamily-bebas">{member.position}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute cursor-pointer top-4 right-4 w-9 h-9 bg-[#333]/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-[#ffffffd9] text-[#c2c6cb] hover:text-red-500 hover:border-red-500"
          >
            <CloseOutlined className="text-[#c2c6cb]" />
          </button>
        </div>
        <div className="p-6 space-y-6 bg-[#333]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <StarFilled
                    key={i}
                    className={`text-sm ${i < Math.floor(member.rating) ? 'text-[#c2c6cb] rating-icons' : 'text-[#444]'}`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-[#c2c6cb]">{member.rating}</span>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-[#c2c6cb] fontFamily-bebas">{member.projects}</div>
              <div className="text-xs text-[#c2c6cb] fontFamily-bebas">Projects Completed</div>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-[#c2c6cb] uppercase tracking-wide text-sm fontFamily-Content">Contact Information</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-[#c2c6cb]">
                <PhoneOutlined className="text-[#c2c6cb]" />
                <span className="text-sm">{member.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-[#c2c6cb]">
                <MailOutlined className="text-[#c2c6cb]" />
                <span className="text-sm fontFamily-bebas">{member.email}</span>
              </div>
            </div>
          </div>
          <Divider className="bg-[#ffffff38]" />
          <div className="space-y-3">
            <h3 className="font-bold text-[#c2c6cb] uppercase tracking-wide text-sm fontFamily-Content">About</h3>
            <p className="text-[#c2c6cb] leading-relaxed text-sm break-words">
              {member.bio}
            </p>
          </div>
          <Divider className="bg-[#ffffff38]" />
          <div className="space-y-3">
            <h3 className="font-bold text-[#c2c6cb] uppercase tracking-wide text-sm fontFamily-Content">Skills & Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {member.skills.map((skill, index) => (
                <Tag
                  key={index}
                  className="border-[#ffffff38] text-[#c2c6cb] bg-[#333] font-medium"
                >
                  {skill}
                </Tag>
              ))}
            </div>
          </div>
          <Divider className="bg-[#ffffff38]" />
          <div className="space-y-3">
            <h3 className="font-bold text-[#c2c6cb] uppercase tracking-wide text-sm fontFamily-Content">Achievements</h3>
            <div className="flex flex-wrap gap-2">
              {member.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#c2c6cb] rounded-full"></div>
                  <span className="text-sm text-[#c2c6cb]">{achievement}</span>
                </div>
              ))}
            </div>
          </div>
          <Divider className="bg-[#ffffff38]" />
          <div className="space-y-2">
            <h3 className="font-bold text-[#c2c6cb] uppercase tracking-wide text-sm fontFamily-Content">Specializations</h3>
            <div className="flex flex-wrap gap-2">
              {member.specializations.map((spec, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-[#c2c6cb]/10 to-[#444]/10 px-3 py-1 rounded-lg border border-[#ffffff38]"
                >
                  <span className="text-sm font-medium text-[#c2c6cb]">{spec}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center items-center">
            <CustomButton
              onClick={handleOpenModal}
              className="w-auto py-3 gradient-border font-bold rounded-xl"
            >
              <span className="flex items-center justify-center gap-2">
                <PhoneOutlined />
                Contact {member.name.split(" ")[0]}
              </span>
            </CustomButton>
            <Modal
              open={isModalOpen}
              onCancel={handleCloseModal}
              footer={null}
              centered
              closeIcon={customCloseIcon}
              className="rounded-2xl bg-[#333]"
            >
              <ContactForm onClose={handleCloseModal} />
            </Modal>
          </div>
          <div className="w-full items-center justify-center flex flex-col">
            <h3 className="font-bold text-[#c2c6cb] uppercase tracking-wide text-sm mb-2 fontFamily-bebas">
              Follow on Social Media
            </h3>
            <div className="flex items-center gap-3">
              {member.socialIcons &&
                member.socialIcons.map((icon, index) => {
                  const IconComponent = {
                    FaFacebookF,
                    FaXTwitter,
                    FaLinkedinIn,
                    FaInstagram,
                    FaWhatsapp,
                  }[icon.icon];
                  const iconColors = {
                    FaFacebookF: "text-[#1877F2] hover:text-[#c2c6cb]",
                    FaXTwitter: "text-[#000] hover:text-[#c2c6cb]",
                    FaLinkedinIn: "text-[#0A66C2] hover:text-[#c2c6cb]",
                    FaInstagram: "text-[#E4405F] hover:text-[#c2c6cb]",
                    FaWhatsapp: "text-[#25D366] hover:text-[#c2c6cb]",
                  };
                  return IconComponent ? (
                    <a
                      key={index}
                      href={icon.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors duration-300"
                    >
                      <IconComponent className={`text-xl ${iconColors[icon.icon]}`} />
                    </a>
                  ) : null;
                })}
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

const OurTeam = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1);
  const totalCards = teamMembers.length;
  const maxIndex = Math.max(0, totalCards - visibleCards);
  const { name } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const updateVisibleCards = () => {
      let vc;
      if (window.innerWidth >= 1024) {
        vc = 4;
      } else if (window.innerWidth >= 768) {
        vc = 2;
      } else {
        vc = 1;
      }
      setVisibleCards(vc);
      const newMax = Math.max(0, totalCards - vc);
      setCurrentIndex((prev) => Math.min(prev, newMax));
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    if (name) {
      const member = teamMembers.find(
        (m) => m.name.toLowerCase().replace(/\s+/g, "-") === name.toLowerCase()
      );
      if (member) {
        setSelectedMember(member);
        setDrawerVisible(true);
      }
    }
    return () => clearTimeout(timer);
  }, [name]);

  const handleViewProfile = (member) => {
    const nameSlug = member.name.toLowerCase().replace(/\s+/g, "-");
    const basePath = location.pathname.includes('/about') ? '/about' : '/team';
    navigate(`${basePath}/${nameSlug}`);
  };

  const handleCloseDrawer = () => {
    setDrawerVisible(false);
    setTimeout(() => {
      setSelectedMember(null);
      const basePath = location.pathname.includes('/about') ? '/about' : '/';
      navigate(basePath);
    }, 300);
  };

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="main-bg py-10 px-4 relative overflow-hidden" id="our-team">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-6 our-team-text">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h3 className="text-3xl mobile-title-text font-[Montserrat] sm:text-xl md:text-5xl font-black mb-3 sm:mb-4 bg-gradient-to-r from-[#c2c6cb] via-[#c99913] to-[#c2c6cb] bg-clip-text text-transparent animate-pulse">
              Meet Our Team
            </h3>
            <div className="h-1 bg-gradient-to-r from-transparent via-[#c99913] to-transparent rounded-full animate-pulse"></div>
            <p className="text-xl mt-2 mobile-subtitle-text font-bebas md:text-2xl text-[#c2c6cb] font-light max-w-4xl mx-auto leading-relaxed whychoose-subtitle">
              "Your Real Estate Experts, Ready to Serve"
            </p>
          </div>
        </div>
        <div className="overflow-hidden py-4">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` }}
          >
            {teamMembers.map((member, index) => (
              <div key={member.id} className="w-full md:w-1/2 lg:w-1/4 flex-shrink-0 px-4 teamcard-mobile" >
                <TeamCard
                  member={member}
                  index={index}
                  isVisible={isVisible}
                  onViewProfile={handleViewProfile}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={`mt-4 flex justify-center gap-4 transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <CustomButton
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`px-4 py-1.5 gradient-border cursor-pointer font-bold rounded-xl ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Prev
            </span>
          </CustomButton>
          <CustomButton
            onClick={handleNext}
            disabled={currentIndex === maxIndex}
            className={`px-4 py-1.5 gradient-border cursor-pointer font-bold rounded-xl ${currentIndex === maxIndex ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span className="flex items-center gap-2">
              Next
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </CustomButton>
        </div>
      </div>
      <ProfileDrawer
        member={selectedMember}
        visible={drawerVisible}
        onClose={handleCloseDrawer}
      />
    </div>
  );
};

export default OurTeam;