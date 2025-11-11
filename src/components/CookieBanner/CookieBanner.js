import React, { useState, useEffect } from "react";
import CookieConsent from "react-cookie-consent";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = document.cookie.split("; ").find((row) => row.startsWith("userConsent="));
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const setConsentCookie = (value) => {
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    document.cookie = `userConsent=${value}; expires=${expires.toUTCString()}; path=/`;
    setShowBanner(false);
  };

  const handleAccept = () => setConsentCookie("true");
  const handleReject = () => setConsentCookie("false");

  if (!showBanner) return null;

  return (
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
      <div className="relative w-full h-auto min-h-[70px] sm:min-h-[45px] flex flex-col sm:flex-row sm:items-center justify-center sm:justify-between gap-0 sm:gap-2 mobile-cookie-banner pr-0 sm:pr-8">
        
        {/* Close Button (X) */}
        <button
          onClick={handleReject}
          className="
            mobile-cookie-close
            absolute top-1 right-1 sm:top-[-20px] sm:right-[-20px]
            text-[#c2c6cb] hover:text-white 
            text-lg sm:text-xl 
            w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center
            rounded-full hover:bg-gray-700 transition-all duration-300
            z-10
          "
          aria-label="Close cookie banner"
        >
          <X className="w-4 h-4 sm:w-4 sm:h-4" />
        </button>
        
        {/* Cookie Text */}
        <div className="flex-1 flex items-center justify-center sm:justify-start order-2 sm:order-1 mobile-cookie-text w-full sm:w-auto px-1 sm:px-0">
          <p className="text-center tracking-normal fontFamily-Content sm:text-left m-0 leading-tight sm:leading-normal break-words max-w-full">
            We use cookies to enhance your experience. By continuing to visit this site, you agree to our use of cookies.{" "}
            <Link
              to="/privacy-policy"
              className="text-[#c08830] hover:text-[#e0a84f] fontFamily-Content underline underline-offset-1 sm:underline-offset-2"
            >
              Learn more
            </Link>.
          </p>
        </div>
        
        {/* Buttons */}
        <div className="flex justify-center sm:justify-end order-1 sm:order-2 pb-1 sm:pb-0 px-1 sm:px-0 w-full sm:w-auto gap-2">
          
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
            "
          >
            Reject
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
            "
          >
            I Understand
          </button>

        </div>
      </div>
    </CookieConsent>
  );
};

export default CookieBanner;
