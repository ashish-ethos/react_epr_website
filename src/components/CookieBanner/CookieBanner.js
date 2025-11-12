import React, { useState, useEffect } from "react";
import CookieConsent from "react-cookie-consent";
import { X, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { Switch } from 'antd';

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [consentPreferences, setConsentPreferences] = useState({
    analytics: false,
    youtube: false,
  });
  const [expandedSections, setExpandedSections] = useState({
    essential: false,
    analytics: false,
    youtube: false,
  });

  useEffect(() => {
    const consent = document.cookie.split("; ").find((row) => row.startsWith("userConsent="));
    if (!consent) {
      setShowBanner(true);
    }

    // Load saved preferences from cookies/localStorage if needed
    const savedAnalytics = localStorage.getItem("analyticsConsent");
    const savedYoutube = localStorage.getItem("youtubeConsent");
    if (savedAnalytics !== null) setConsentPreferences((prev) => ({ ...prev, analytics: JSON.parse(savedAnalytics) }));
    if (savedYoutube !== null) setConsentPreferences((prev) => ({ ...prev, youtube: JSON.parse(savedYoutube) }));
  }, []);

  const setConsentCookie = (value) => {
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    document.cookie = `userConsent=${value}; expires=${expires.toUTCString()}; path=/`;
    setShowBanner(false);
  };

  const handleAccept = () => {
    setConsentCookie("true");
    // Optionally set all preferences to true
    setConsentPreferences({ analytics: true, youtube: true });
    localStorage.setItem("analyticsConsent", "true");
    localStorage.setItem("youtubeConsent", "true");
  };

  const handleReject = () => {
    setConsentCookie("false");
    setConsentPreferences({ analytics: false, youtube: false });
    localStorage.setItem("analyticsConsent", "false");
    localStorage.setItem("youtubeConsent", "false");
  };

  const handleConfirmChoices = () => {
    // Save preferences
    localStorage.setItem("analyticsConsent", JSON.stringify(consentPreferences.analytics));
    localStorage.setItem("youtubeConsent", JSON.stringify(consentPreferences.youtube));
    setShowModal(false);
    // Optionally set overall consent based on choices
    setConsentCookie(consentPreferences.analytics || consentPreferences.youtube ? "true" : "false");
  };

  const handleAcceptAllInModal = () => {
    setConsentPreferences({ analytics: true, youtube: true });
    handleConfirmChoices();
  };

  const handleRejectAllInModal = () => {
    setConsentPreferences({ analytics: false, youtube: false });
    handleConfirmChoices();
  };

  const togglePreference = (key, checked) => {
    setConsentPreferences((prev) => ({ ...prev, [key]: checked }));
  };

  const toggleSection = (key) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePlusClick = (e, key) => {
    e.stopPropagation();
    toggleSection(key);
  };

  if (!showBanner && !showModal) return null;

  return (
    <>
      {showBanner && (
        <CookieConsent
          location="bottom"
          buttonText=""
          cookieName="userConsent"
          containerClasses="
            cookie-banner-container
            bg-black text-[#c2c6cb] text-[12px] sm:text-sm
            px-0 sm:px-3 py-0 sm:py-2
            border-t border-gray-700 shadow-lg
            w-full fixed bottom-0 left-0 right-0 z-50
          "
          buttonClasses="hidden"
          buttonWrapperClasses="hidden"
          contentClasses="w-full relative"
          expires={365}
          overlayClasses="hidden"
        >
          <div className="relative w-full cookies-main-section h-auto min-h-[70px] sm:min-h-[45px] flex flex-col sm:flex-row sm:items-center justify-center sm:justify-between gap-0 sm:gap-2 mobile-cookie-banner pr-0 sm:pr-8">
            
            {/* Close Button (X) */}
            <button
              onClick={handleReject}
              className="
                mobile-cookie-close
                absolute top-1 right-1 sm:top-[-20px] sm:right-[-20px]
                text-[#c2c6cb] hover:text-white 
                text-lg sm:text-xl 
                w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center
                rounded-full  hover:border-[#ff000] hover:text-[#ff000] transition-all duration-300
                z-10
              "
              aria-label="Close cookie banner"
            >
              <X className="w-4 h-4 sm:w-4 sm:h-4" />
            </button>
            
            {/* Cookie Text */}
            <div className="flex-1 flex items-center justify-center sm:justify-start order-2 sm:order-1 mobile-cookie-text w-full sm:w-auto px-1 sm:px-0">
              <p className="text-center tracking-normal fontFamily-Content sm:text-left m-0 leading-tight sm:leading-normal break-words max-w-full">
                Ethos Pro Realtors and its affiliated entities use cookies and similar technologies to perform essential online functions, such as authentication and security. You may disable these by changing your cookie settings through your browser, but this may affect how this website functions. Also, Ethos Pro Realtors uses some analytics, targeting/advertising, and video-embedded cookies provided by Ethos Pro Realtors or third parties. Please click a button here to choose your preference for these types of cookies. You can also configure cookie settings by clicking “Cookie Settings” at the footer of Ethos Pro Realtors websites or accessing your browser settings at any time. For detailed information, please visit the Ethos Pro Realtors Privacy Policy.{" "}
                <Link
                  to="/privacy-policy"
                  className="text-[#c08830] hover:text-[#e0a84f] fontFamily-Content underline underline-offset-1 sm:underline-offset-2"
                >
                  Learn more
                </Link>.
              </p>
            </div>
            
            {/* Buttons */}
            <div className="flex  sm:flex-row justify-center sm:justify-end order-1 sm:order-2 pb-1 sm:pb-0 px-1 sm:px-0 w-full sm:w-auto gap-2 sm:gap-2">
              <button 
                onClick={() => {
                  setShowBanner(false);
                  setShowModal(true);
                }}
                className="bg-[#c08830] hover:bg-[#a87528] text-white font-semibold text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2 rounded-sm transition-all duration-300 whitespace-nowrap shadow-md fontFamily-Content items-center w-full sm:w-auto"
              >
                Cookie Settings
              </button>
              <button
                onClick={handleReject}
                className="
                  bg-gray-600 hover:bg-gray-700
                  text-white font-semibold 
                  text-xs sm:text-sm
                  px-3 sm:px-4 py-1.5 sm:py-2
                  rounded-sm transition-all duration-300
                  whitespace-nowrap
                  shadow-md fontFamily-Content
                  w-full sm:w-auto
                "
              >
                Reject All
              </button>

              <button
                onClick={handleAccept}
                className="
                  bg-[#c08830] hover:bg-[#a87528]
                  text-white font-semibold 
                  text-xs sm:text-sm
                  px-3 sm:px-4 py-1.5 sm:py-2
                  rounded-sm transition-all duration-300
                  whitespace-nowrap
                  shadow-md fontFamily-Content
                  w-full sm:w-auto
                "
              >
                Accept All
              </button>
            </div>
          </div>
        </CookieConsent>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black bg-opacity-50">
          <div className="bg-black rounded-lg w-full max-w-sm sm:max-w-md md:max-w-xl h-[90vh] max-h-[90vh] overflow-y-auto custom-scrollbar border border-gray-700">
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-gray-600">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg sm:text-xl font-semibold text-[#c2c6cb]">Manage Your Cookie Settings</h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setShowBanner(true);
                  }}
                  className="text-gray-400 hover:text-gray-300 hover:border-red-500 hover:text-red-500 transition-all duration-300"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
              <p className="text-xs sm:text-sm text-[#c2c6cb] leading-relaxed">
                Ethos Pro Realtors and third-party services use small text files called cookies and similar technologies to store or retrieve information from your device. Essential cookies maintain website core functionality, while Non-Essential cookies personalize your experience. You can choose to block some types for privacy reasons, but this may impact your website experience.
              </p>
              <p className="text-xs sm:text-sm text-[#c2c6cb] mt-2">
                For more information, please visit <Link to="/privacy-policy" className="text-[#c08830] hover:underline">Ethos Pro Realtors Privacy Policy - Section 5 in “Cookies and similar technologies”</Link>.
              </p>
            </div>

            {/* Consent Preferences */}
            <div className="p-2 sm:p-4">
              <h3 className="text-base sm:text-lg font-medium text-[#c2c6cb] mb-4">Manage Consent Preferences</h3>
              
              {/* Essential Cookies */}
              <div className="border border-gray-600 rounded-md mb-3 overflow-hidden">
                <div 
                  className="flex items-center justify-between p-3 sm:p-4 cursor-pointer bg-gray-800 hover:bg-gray-700"
                  onClick={() => toggleSection('essential')}
                >
                  <div className="flex items-center flex-1">
                    <button 
                      onClick={(e) => handlePlusClick(e, 'essential')}
                      className="p-0 border-none bg-transparent cursor-pointer mr-2"
                    >
                      {expandedSections.essential ? <Minus className="w-4 h-4 text-[#c2c6cb]" /> : <Plus className="w-4 h-4 text-[#c2c6cb]" />}
                    </button>
                    <h4 className="font-medium text-[#c2c6cb] text-sm sm:text-base">Essential Cookies</h4>
                  </div>
                  <span className="flex items-center text-green-400 font-medium text-xs sm:text-sm ml-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Always Active
                  </span>
                </div>
                {expandedSections.essential && (
                  <div className="p-3 sm:p-4 bg-gray-900">
                    <p className="text-xs sm:text-sm text-[#c2c6cb] leading-relaxed">
                      Essential cookies are needed to ensure our websites and services work correctly, so they are enabled in the Cookie Settings. They can store things like your language preferences, sign-up and authentication data, and remember your choices in forms. They also help us to enhance your security when purchasing online, and allow us to provide a more stable browsing experience. You may disable essential cookies via your browser's cookie settings, but this might affect how the website works.{" "}
                      <Link to="/privacy-policy" className="text-[#c08830] hover:underline text-xs">Check cookies details</Link>
                    </p>
                  </div>
                )}
              </div>

              {/* Analytics / Targeting and Advertising Cookies */}
              <div className="border border-gray-600 rounded-md mb-3 overflow-hidden">
                <div 
                  className="flex items-center justify-between p-3 sm:p-4 cursor-pointer bg-gray-800 hover:bg-gray-700"
                  onClick={() => toggleSection('analytics')}
                >
                  <div className="flex items-center flex-1">
                    <button 
                      onClick={(e) => handlePlusClick(e, 'analytics')}
                      className="p-0 border-none bg-transparent cursor-pointer mr-2"
                    >
                      {expandedSections.analytics ? <Minus className="w-4 h-4 text-[#c2c6cb]" /> : <Plus className="w-4 h-4 text-[#c2c6cb]" />}
                    </button>
                    <h4 className="font-medium text-[#c2c6cb] text-sm sm:text-base">Analytics / Targeting and Advertising Cookies</h4>
                  </div>
                  <div onClick={(e) => e.stopPropagation()} className="ml-2">
                    <Switch
                      checked={consentPreferences.analytics}
                      onChange={(checked) => togglePreference("analytics", checked)}
                      size="small"
                      className="ml-0"
                    />
                  </div>
                </div>
                {expandedSections.analytics && (
                  <div className="p-3 sm:p-4 bg-gray-900">
                    <p className="text-xs sm:text-sm text-[#c2c6cb] leading-relaxed">
                      We use analytics cookies to count the number and length of your visit in Ethos Pro Realtors products and services as well as which part or features you visit the most as well. This data helps us analyze the performance and operation of Ethos Pro Realtors products and services to improve performance and develop new features, functions and services. Besides, we adopt targeting and advertising cookies to collect data about your use in Ethos Pro Realtors products and services and identify your interests, such as the advertisings you have viewed. Such cookies are also used to limit the number of times you see an advertisement as well as help measure the effectiveness of the advertising campaigns. For more information on cookies adopted by Ethos Pro Realtors, please visit{" "}
                      <Link to="/privacy-policy" className="text-[#c08830] hover:underline text-xs">Ethos Pro Realtors Privacy Policy - Chapter 5.1.2 in “Cookies and similar technologies”</Link>.
                    </p>
                  </div>
                )}
              </div>

              {/* YouTube Cookies */}
              <div className="border border-gray-600 rounded-md mb-3 overflow-hidden">
                <div 
                  className="flex items-center justify-between p-3 sm:p-4 cursor-pointer bg-gray-800 hover:bg-gray-700"
                  onClick={() => toggleSection('youtube')}
                >
                  <div className="flex items-center flex-1">
                    <button 
                      onClick={(e) => handlePlusClick(e, 'youtube')}
                      className="p-0 border-none bg-transparent cursor-pointer mr-2"
                    >
                      {expandedSections.youtube ? <Minus className="w-4 h-4 text-[#c2c6cb]" /> : <Plus className="w-4 h-4 text-[#c2c6cb]" />}
                    </button>
                    <h4 className="font-medium text-[#c2c6cb] text-sm sm:text-base">YouTube Cookies</h4>
                  </div>
                  <div onClick={(e) => e.stopPropagation()} className="ml-2">
                    <Switch
                      checked={consentPreferences.youtube}
                      onChange={(checked) => togglePreference("youtube", checked)}
                      size="small"
                      className="ml-0"
                    />
                  </div>
                </div>
                {expandedSections.youtube && (
                  <div className="p-3 sm:p-4 bg-gray-900">
                    <p className="text-xs sm:text-sm text-[#c2c6cb] leading-relaxed">
                      We embed videos from YouTube channels into our websites. In embedded videos, Google Inc. may set YouTube cookies to track your views and personalize the YouTube browsing experience. For more information on cookies adopted by Ethos Pro Realtors, please visit{" "}
                      <Link to="/privacy-policy" className="text-[#c08830] hover:underline text-xs">Ethos Pro Realtors Privacy Policy - Chapter 5.1.2 in “Cookies and similar technologies”</Link>.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="p-4 sm:p-6 bg-gray-800 flex flex-col sm:flex-row justify-end gap-2 sm:space-x-3 sm:gap-0">
              <button
                onClick={handleRejectAllInModal}
                className="px-3 py-2 text-xs sm:text-sm font-medium text-[#c2c6cb] bg-gray-700 border border-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c08830] w-full sm:w-auto"
              >
                Reject All
              </button>
              <button
                onClick={handleAcceptAllInModal}
                className="px-3 py-2 text-xs sm:text-sm font-medium text-white bg-[#c08830] border border-transparent rounded-md hover:bg-[#a87528] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c08830] w-full sm:w-auto"
              >
                Accept All
              </button>
              <button
                onClick={handleConfirmChoices}
                className="px-3 py-2 text-xs sm:text-sm font-medium text-white bg-[#c08830] border border-transparent rounded-md hover:bg-[#a87528] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c08830] w-full sm:w-auto"
              >
                Confirm My Choices
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default CookieBanner;