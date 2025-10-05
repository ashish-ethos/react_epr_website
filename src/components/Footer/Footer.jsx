import React, { useState, useEffect, useRef } from "react";
import { MapPin, Phone, Mail, ArrowRight, Facebook, Instagram, Linkedin, Youtube, Send, Sparkles, Building, Users, Award, TrendingUp, ChevronUp } from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";
import { Link } from "react-router-dom";
import logotab from "../../assets/images/logo/ethos_logo.png";
import "../OurTeam/OurTeam.css";
import { FaXTwitter } from "react-icons/fa6";
import CustomButton from "../ui/Button";
import CustomInput from "../ui/Input";

function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeSection, setActiveSection] = useState(0);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Real-time clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-cycling sections
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleNewsletterSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail("");
      // Trigger success animation
    }, 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const stats = [
    { icon: Building, value: "500+", label: "Properties Sold", color: "" },
    { icon: Users, value: "1000+", label: "Happy Clients", color: "" },
    { icon: Award, value: "15+", label: "Awards Won", color: "" },
    { icon: TrendingUp, value: "98%", label: "Success Rate", color: "" }
  ];

  return (
    <footer
      ref={footerRef}
      className="relative bg-black text-white overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
          linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #0a0a0a 100%)
        `
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400 rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}

        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(16, 185, 129, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(16, 185, 129, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.05}px)`
            }}
          />
        </div>

        {/* Geometric Shapes */}
        <div className="absolute top-20 right-20 w-32 h-32 border border-emerald-500/20 rotate-45 animate-spin" style={{ animationDuration: '20s' }} />
        <div className="absolute bottom-40 left-10 w-24 h-24 border border-blue-500/20 rounded-full animate-pulse" />
      </div>

      {/* Hero Newsletter Section */}
      <div className="relative border-b border-gray-800/50">
        <div className="absolute inset-0 bg-gradient-to-r from-[#444]/20 via-[#333]/20 to-[#c2c6cb]/10 animate-gradient-x" />

        <div className="relative container mx-auto px-4 sm:px-6 py-10 sm:py-20 ">
          <div className="max-w-5xl mx-auto text-center">
            {/* Live Clock */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
              <div className="w-2 h-2 bg-[#c99913] rounded-full animate-pulse" />
              <span className="text-sm font-mono">
                {currentTime.toLocaleTimeString()} • Gurugram, India
              </span>
            </div>

            <h2 className="text-5xl md:text-7xl font-black mb-6 relative">
              <span className=" font-[Montserrat] text-gradient animate-gradient-x">
                Ethos Pro Realtors
              </span>
              {/* <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-orange-400 to-yellow-400 rounded-lg blur opacity-20 animate-pulse" /> */}
            </h2>

            <p className="text-xl mobile-subtitle-text text-gray-300 mb-6 max-w-2xl font-bebas mx-auto leading-relaxed">
              Get exclusive property deals, market insights, and investment opportunities delivered to your inbox
            </p>

            {/* Advanced Newsletter Form */}
            <div className="max-w-xl mx-auto relative">
              <div className="flex items-center bg-[#080808] p-2 rounded">
                <CustomInput
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email for exclusive deals..."
                  className="flex-1 px-3 py-1.5  text-gray-200 placeholder-gray-500 text-sm  focus:outline-none rounded-none"
                />
                <CustomButton
                  onClick={handleNewsletterSubmit}
                  disabled={isSubmitting}
                  className="px-3 py-1.5 h-[34px] bg-gray-600 text-gray-300 rounded-none flex items-center gap-1 hover:bg-gray-500 transition-colors duration-200"
                >
                  {isSubmitting ? (
                    <div className="w-3 h-3 border-2 border-gray-400/30 border-t-gray-200 rounded-none animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </CustomButton>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-8 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <span>No spam, ever</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full" />
                  <span>100% privacy guaranteed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-400 rounded-full" />
                  <span>5K+ subscribers</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative py-16 border-b border-gray-800/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const isActive = activeSection === index;
              return (
                <div
                  key={index}
                  className={`text-center transform transition-all duration-500 ${isActive ? 'scale-110' : 'scale-100'
                    } ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#555] mb-4 transform transition-all duration-300 hover:scale-110 hover:rotate-12 border-2 border-[#c08830]">
                    <Icon className="w-8 h-8 text-[#c2c6cb]" />
                  </div>
                  <div className="text-4xl font-black mb-2 text-[#c2c6cb]">
                    {stat.value}
                  </div>
                  <div className="text-[#c2c6cb] font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative container mx-auto px-6 py-10 sm:py-16 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Company Section - Enhanced */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-6 group w-full mobile-logo-footer">
                <div className="  flex items-center justify-center ">
                  <img src={logotab} alt="Logo" className=" w-40 items-center" />
                </div>
                {/* <h3 className="text-3xl font-[Montserrat] font-black text-gradient text-transparent transition-all duration-300 group-hover:brightness-110">
                  Ethos Pro Realtors
                </h3> */}
              </div>


              <p className="text-gray-300  leading-relaxed font-bebas text-sm mb-6">
                Your property, Our Priority. As trusted channel partners with top builders, we're dedicated to connecting you with the finest properties that meet your goals.
              </p>

              {/* Achievement Badges */}
              <div className="flex flex-wrap gap-3 mb-8">
                {["Top Rated", "Verified", "Trusted Partner", "Award Winner"].map((badge, index) => (
                  <span
                    key={badge}
                    className="px-3 py-1 bg-[#555] border border-[#c08830] rounded-full text-sm font-medium text-[#c2c6cb] animate-pulse"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Social Media Icons */}
            <div>
              <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#c08830] fontFamily-bebas" />
                Follow Us
              </h4>
              <div className="flex flex-wrap gap-4">
                {[
                  {
                    icon: Facebook,
                    baseColor: "from-blue-500/20 to-blue-600/20",
                    hoverColor: "hover:from-blue-500 hover:to-blue-600",
                    shadowColor: "hover:shadow-blue-500/50",
                    label: "Facebook",
                    link: "https://www.facebook.com/ethosprorealtors/"
                  },
                  {
                    icon: Instagram,
                    baseColor: "from-pink-500/20 to-purple-600/20",
                    hoverColor: "hover:from-pink-500 hover:to-purple-600",
                    shadowColor: "hover:shadow-pink-500/50",
                    label: "Instagram",
                    link: "https://www.instagram.com/ethosprorealtors/"
                  },

                  {
                    icon: Linkedin,
                    baseColor: "from-blue-600/20 to-blue-800/20",
                    hoverColor: "hover:from-blue-600 hover:to-blue-800",
                    shadowColor: "hover:shadow-blue-600/50",
                    label: "LinkedIn",
                    link: "https://in.linkedin.com/company/ethos-pro-realtors"
                  },
                  {
                    icon: Youtube,
                    baseColor: "from-red-500/20 to-red-700/20",
                    hoverColor: "hover:from-red-500 hover:to-red-700",
                    shadowColor: "hover:shadow-red-500/50",
                    label: "YouTube",
                    link: "https://www.youtube.com/@ethosprorealtors"
                  },
                  {
                    icon: FaXTwitter,
                    baseColor: "from-gray-700/20 to-gray-900/20",
                    hoverColor: "hover:from-gray-700 hover:to-gray-900",
                    shadowColor: "hover:shadow-gray-700/50",
                    label: "Twitter",
                    link: "https://x.com/ethosprorealtor"
                  }
                ].map(({ icon: Icon, baseColor, hoverColor, shadowColor, label, link }) => (
                  <a
                    key={label}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative w-14 h-14 bg-gradient-to-r ${baseColor} ${hoverColor} backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover:border-white/40 transition-all duration-500 transform hover:scale-125 hover:-translate-y-2 ${shadowColor} hover:shadow-xl group overflow-hidden`}
                    aria-label={label}
                  >
                    {/* Rotating ring effect */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-0 group-hover:opacity-100 group-hover:animate-spin transition-opacity duration-300" style={{ animationDuration: '3s' }} />

                    {/* Pulsing background */}
                    <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300" />

                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-2xl" />

                    <Icon className="w-6 h-6 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" />

                    {/* Floating particles on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-white rounded-full animate-ping"
                          style={{
                            top: `${25 + Math.random() * 50}%`,
                            left: `${25 + Math.random() * 50}%`,
                            animationDelay: `${i * 200}ms`,
                            animationDuration: '1s'
                          }}
                        />
                      ))}
                    </div>
                  </a>
                ))}
              </div>

            </div>
          </div>

          {/* Navigation Sections */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-bold fontFamily-bebas mb-6 relative">
                Quick Links
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-transparent via-[#c99913] to-transparent" />
              </h4>
              <ul className="space-y-4 fontFamily-bebas">
                {[
                  { to: "/", label: "Home" },
                  { to: "/projects", label: "Projects" },
                  { to: "/projects/residential", label: "Residential" },
                  { to: "/projects/commercial", label: "Commercial" },
                  { to: "/about", label: "About" },
                  { to: "/blog", label: "Blog" },
                  { to: "/contact", label: "Contact" },
                  { to: "/disclaimer", label: "Disclaimer" },

                ].map((item, idx) => (
                  <li key={idx}>
                    <Link
                      to={item.to}
                      className="group flex items-center text-gray-400 hover:text-[#c08830] transition-all duration-300"
                    >
                      {/* Arrow */}
                      <ArrowRight className="w-4 h-4 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#c08830]" />

                      {/* Label + underline wrapper */}
                      <span className="relative inline-block">
                        {item.label}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-transparent via-[#c99913] to-transparent group-hover:w-full transition-all duration-300"></span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>


          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xl font-bold mb-6 fontFamily-bebas relative">
              Get In Touch
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-transparent via-[#c99913] to-transparent" />
            </h4>

            <div className="space-y-6">
              {[
                {
                  icon: MapPin,
                  title: "Visit Our Office",
                  content: "Suncity Success Tower, Unit No 507, 5th Floor, Tower-A, Sector 65, Gurugram, Haryana 122001",
                  action: "Get Directions",
                  color: "from-blue-500 to-purple-500",
                  onClick: () => window.open(
                    "https://maps.app.goo.gl/pby4c3XhmavmSy9ZA",
                    "_blank"
                  )
                },
                {
                  icon: Phone,
                  title: "Call Us Now",
                  content: "+91 8744964496",
                  action: "Call Now",
                  color: "from-emerald-500 to-teal-500",
                  onClick: () => window.open("tel:+918744964496", "_self")
                },
                {
                  icon: Mail,
                  title: "Email Us",
                  content: "info@ethosprorealtors.com",
                  action: "Send Email",
                  color: "from-orange-500 to-red-500",
                  onClick: () => window.open("mailto:info@ethosprorealtors.com", "_self")
                }
              ].map(({ icon: Icon, title, content, action, color, onClick }) => (
                <div key={title} className="group relative">
                  <div className="p-4 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-[#c08830] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-white mb-1 fontFamily-bebas">{title}</h5>
                        <p className="text-gray-400 text-sm mb-2 fontFamily-bebas">{content}</p>
                        <button
                          className="text-[#c08830] cursor-pointer text-sm font-medium hover:text-emerald-300 transition-colors"
                          onClick={onClick}
                          type="button"
                        >
                          {action} →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Enhanced */}
      <div className="relative border-t border-gray-800/50 bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex flex-col sm:flex-row items-center text-center gap-4 text-sm text-gray-400 footer-bottom-links">
              <p className="fontFamily-bebas">© {new Date().getFullYear()} Ethos Pro Realtors. All Rights Reserved.</p>
              <div className="flex items-center gap-4">
                <Link to="/privacy-policy" className="hover:text-[#c08830] transition-colors">Privacy Policy</Link>
                <span>•</span>
                <Link to="/terms&conditions" className="hover:text-[#c08830] transition-colors">Terms</Link>
                <span>•</span>
                <Link to="/f&qs" className="hover:text-[#c08830] transition-colors">F&Q</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50 items-center">
        {/* Scroll to Top */}
        <button
          onClick={scrollToTop}
          className="w-12 h-12 bg-gradient-to-r cursor-pointer from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 opacity-80 hover:opacity-100"
        >
          <ChevronUp className="w-5 h-5 text-white" />
        </button>

        {/* Chat Button */}
        <a href="https://wa.me/+918744964496?text=Hello!%20I'm%20interested%20in%20properties." target="_blank" rel="noopener noreferrer">
          <button className="relative w-14 h-14 bg-gradient-to-r cursor-pointer from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 rounded-full shadow-xl hover:shadow-2xl hover:shadow-emerald-500/25 flex items-center justify-center transition-all duration-300 transform hover:scale-110 group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform rotate-45 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <BsWhatsapp className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300 relative z-10" />
            <div className="absolute top-2 right-3 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center z-20">
              <span className="text-xs text-white font-bold">3</span>
            </div>
            <div className="absolute top-2 right-3 w-4 h-4 bg-red-500 rounded-full animate-ping" />
          </button>
        </a>
      </div>
    </footer>
  );
}

export default Footer;