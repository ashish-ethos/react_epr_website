import React, { useState, useEffect, useCallback } from "react";
import CookieConsent from "react-cookie-consent";
import { X, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { Switch } from "antd";

// Constants
const GA_ID = "G-4H7354HQ3Z"; 
const ADSENSE_ID = "ca-pub-4057278569652193"; 

const CONSENT_COOKIE_NAME = "userConsent";
const ANALYTICS_KEY = "analyticsConsent";

// Small helpers
const isBrowser = typeof window !== "undefined" && typeof document !== "undefined";
const CookieBanner = () => {
  // State
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [consentPreferences, setConsentPreferences] = useState({
    analytics: false,
  });

  const [expandedSections, setExpandedSections] = useState({
    essential: false,
    analytics: false,
  });

  const adsEnabled = consentPreferences.analytics;
  // Initialization: read cookie + localStorage on first mount
  useEffect(() => {
    if (!isBrowser) return;

    console.log("[COOKIE] Initializing cookie banner");
    // Check if user has already made a choice
    const consentCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${CONSENT_COOKIE_NAME}=`));

    if (!consentCookie) {
      // First visit: show banner
      setShowBanner(true);
      console.log("[COOKIE] No consent cookie found, showing banner");
    }
    // Restore analytics preference from localStorage
    const savedAnalytics = window.localStorage.getItem(ANALYTICS_KEY);
    if (savedAnalytics !== null) {
      const parsed = JSON.parse(savedAnalytics);
      setConsentPreferences({ analytics: parsed });
      console.log("[COOKIE] Restored analytics from localStorage:", parsed);
    }
  }, []);

  // React to analytics preference changes (load/unload GA + AdSense)
  useEffect(() => {
    if (!isBrowser) return;

    console.log("[COOKIE] Analytics preference changed:", adsEnabled);
    applyAdConsent(adsEnabled);
  }, [adsEnabled]);

  // Cookie + localStorage helpers
  const setConsentCookie = useCallback((value) => {
    if (!isBrowser) return;

    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);

    document.cookie = `${CONSENT_COOKIE_NAME}=${value}; expires=${expires.toUTCString()}; path=/`;
    console.log("[COOKIE] Set userConsent cookie to:", value);

    // Once user has decided, we can hide the banner
    setShowBanner(false);
  }, []);

  const persistAnalyticsPreference = useCallback((value) => {
    if (!isBrowser) return;

    window.localStorage.setItem(ANALYTICS_KEY, JSON.stringify(value));
    console.log("[COOKIE] Saved analytics preference to localStorage:", value);
  }, []);

  // High-level handlers (Accept / Reject)
  const applyPreferencesAndClose = useCallback(
    (prefs) => {
      setConsentPreferences(prefs);
      persistAnalyticsPreference(prefs.analytics);
      setConsentCookie(prefs.analytics ? "true" : "false");
      setShowModal(false);
    },
    [persistAnalyticsPreference, setConsentCookie]
  );

  const handleAccept = () => {
    console.log("[COOKIE] handleAccept (banner) called");
    applyPreferencesAndClose({ analytics: true });
  };

  const handleReject = () => {
    console.log("[COOKIE] handleReject (banner) called");
    applyPreferencesAndClose({ analytics: false });
  };

  // Modal handlers
  const handleConfirmChoices = () => {
    console.log("[COOKIE] handleConfirmChoices called with:", consentPreferences);
    applyPreferencesAndClose(consentPreferences);
  };

  const handleAcceptAllInModal = () => {
    console.log("[COOKIE] handleAcceptAllInModal called");
    applyPreferencesAndClose({ analytics: true });
  };

  const handleRejectAllInModal = () => {
    console.log("[COOKIE] handleRejectAllInModal called");
    applyPreferencesAndClose({ analytics: false });
  };

  const togglePreference = (key, checked) => {
    console.log(`[COOKIE] togglePreference: ${key} =`, checked);

    const newPrefs = { ...consentPreferences, [key]: checked };
    setConsentPreferences(newPrefs);
    persistAnalyticsPreference(newPrefs.analytics);
  };

  const toggleSection = (key) => {
    console.log("[COOKIE] toggleSection:", key);
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePlusClick = (e, key) => {
    e.stopPropagation();
    toggleSection(key);
  };

  // Consent → load / unload scripts
  const applyAdConsent = (enabled) => {
    console.log(
      "[COOKIE] applyAdConsent:",
      enabled ? "ENABLED (load GA + AdSense)" : "DISABLED (unload)"
    );

    if (!isBrowser) return;

    if (enabled) {
      loadMarketingAds();
    } else {
      unloadMarketingAds();
    }

    // Optional event for other components
    window.dispatchEvent(
      new CustomEvent("adConsentChange", { detail: { enabled } })
    );
  };

  const loadMarketingAds = () => {
    if (!isBrowser) return;

    console.log("[COOKIE] loadMarketingAds called");

    // Avoid re-loading if already done
    if (document.getElementById("marketing-ads-loaded")) {
      console.log("[COOKIE] Marketing scripts already loaded, skipping");
      return;
    }

    // ---- 1. Google Analytics 4 ------------------------------------------------
    if (!window.gtag && GA_ID) {
      console.log("[COOKIE] Loading GA4 script with ID:", GA_ID);

      const script = document.createElement("script");
      script.id = "gtag-script";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      document.head.appendChild(script);

      const configScript = document.createElement("script");
      configScript.id = "gtag-config";
      configScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_ID}');
      `;
      document.head.appendChild(configScript);

      console.log("[COOKIE] GA4 script + config appended");
    } else {
      console.log("[COOKIE] Skipping GA4 load: gtag already defined or GA_ID missing");
    }

    // ---- 2. Google AdSense ----------------------------------------------------
    const adSlots = document.querySelectorAll(".ad-placeholder");
    console.log("[COOKIE] Found ad slots:", adSlots.length);

    if (ADSENSE_ID && adSlots.length > 0) {
      if (!document.getElementById("adsense-script")) {
        console.log("[COOKIE] Loading AdSense script with ID:", ADSENSE_ID);

        const adsenseScript = document.createElement("script");
        adsenseScript.id = "adsense-script";
        adsenseScript.async = true;
        adsenseScript.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`;
        adsenseScript.crossOrigin = "anonymous";
        document.head.appendChild(adsenseScript);
      }

      adSlots.forEach((slot, index) => {
        // Let AdSense populate the slot
        // eslint-disable-next-line no-unused-expressions
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        console.log(`[COOKIE] Requested AdSense fill for slot ${index}`);
      });
    } else {
      console.log(
        "[COOKIE] Skipping AdSense: no ADSENSE_ID or no .ad-placeholder found"
      );
    }

    // Mark that we already loaded marketing scripts once
    const flag = document.createElement("script");
    flag.id = "marketing-ads-loaded";
    flag.type = "text/plain";
    document.head.appendChild(flag);
    console.log("[COOKIE] Marked marketing scripts as loaded");
  };

  const unloadMarketingAds = () => {
    if (!isBrowser) return;

    console.log("[COOKIE] unloadMarketingAds called");

    // Remove injected scripts
    ["gtag-script", "gtag-config", "adsense-script"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.remove();
        console.log("[COOKIE] Removed script:", id);
      }
    });

    // Reset GA globals
    window.gtag = undefined;
    if (window.dataLayer) window.dataLayer.length = 0;
    console.log("[COOKIE] Reset gtag + dataLayer");

    // Optionally reset adsbygoogle
    // window.adsbygoogle = [];

    // Hide ad slots
    document.querySelectorAll(".ad-placeholder").forEach((slot) => {
      slot.innerHTML = "";
      slot.style.display = "none";
      console.log("[COOKIE] Hid ad slot");
    });

    // Basic GA cookie cleanup
    document.cookie =
      "_ga=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    console.log("[COOKIE] Cleared _ga cookie");
  };

  // Render
  if (!showBanner && !showModal) return null;

  return (
    <>
      {/* Bottom banner */}
      {showBanner && (
        <CookieConsent
          location="bottom"
          buttonText=""
          cookieName={CONSENT_COOKIE_NAME}
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
            {/* Close Button (Reject) */}
            <button
              onClick={handleReject}
              className="
                mobile-cookie-close
                absolute top-1 right-1 sm:top-[-20px] sm:right-[-20px]
                text-[#c2c6cb] hover:text-white 
                text-lg sm:text-xl 
                w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center
                rounded-full hover:text-[#ff000] transition-all duration-300
                z-10
              "
              aria-label="Close cookie banner"
            >
              <X className="w-4 h-4 sm:w-4 sm:h-4" />
            </button>

            {/* Text */}
            <div className="flex-1 flex items-center justify-center sm:justify-start order-2 sm:order-1 mobile-cookie-text w-full sm:w-auto px-1 sm:px-0">
              <p className="text-center tracking-normal fontFamily-Content sm:text-left m-0 leading-tight sm:leading-normal break-words max-w-full">
                Ethos Pro Realtors and its affiliated entities use cookies and
                similar technologies to perform essential online functions, such
                as authentication and security. We also use analytics and
                targeting / advertising cookies. Please choose your
                preferences. For detailed information, please visit our Privacy
                Policy{" "}
                <Link
                  to="/privacy-policy"
                  className="text-[#c08830] hover:text-[#e0a84f] fontFamily-Content underline underline-offset-1 sm:underline-offset-2"
                >
                  Learn more
                </Link>
                .
              </p>
            </div>

            {/* Buttons */}
            <div className="flex sm:flex-row justify-center sm:justify-end order-1 sm:order-2 pb-1 sm:pb-0 px-1 sm:px-0 w-full sm:w-auto gap-2 sm:gap-2">
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

      {/* Settings modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black bg-opacity-50">
          <div className="bg-black rounded-lg w-full max-w-sm sm:max-w-md md:max-w-xl h-[90vh] max-h-[90vh] overflow-y-auto custom-scrollbar border border-gray-700">
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-gray-600">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg sm:text-xl font-semibold text-[#c2c6cb]">
                  Manage Your Cookie Settings
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setShowBanner(true);
                  }}
                  className="text-gray-400 hover:text-gray-300 hover:text-red-500 transition-all duration-300"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
              <p className="text-xs sm:text-sm text-[#c2c6cb] leading-relaxed">
                Ethos Pro Realtors and third-party services use cookies to store
                or retrieve information from your device. Essential cookies
                maintain website core functionality, while analytics and
                advertising cookies help us improve our services and show
                relevant ads. You can change your preferences at any time.
              </p>
              <p className="text-xs sm:text-sm text-[#c2c6cb] mt-2">
                For more information, please visit{" "}
                <Link
                  to="/privacy-policy"
                  className="text-[#c08830] hover:underline"
                >
                  Ethos Pro Realtors Privacy Policy - Section 5 “Cookies and
                  similar technologies”
                </Link>
                .
              </p>
            </div>

            {/* Preferences body */}
            <div className="p-2 sm:p-4">
              <h3 className="text-base sm:text-lg font-medium text-[#c2c6cb] mb-4">
                Manage Consent Preferences
              </h3>

              {/* Essential cookies */}
              <div className="border border-gray-600 rounded-md mb-3 overflow-hidden">
                <div
                  className="flex items-center justify-between p-3 sm:p-4 cursor-pointer bg-gray-800 hover:bg-gray-700"
                  onClick={() => toggleSection("essential")}
                >
                  <div className="flex items-center flex-1">
                    <button
                      onClick={(e) => handlePlusClick(e, "essential")}
                      className="p-0 border-none bg-transparent cursor-pointer mr-2"
                    >
                      {expandedSections.essential ? (
                        <Minus className="w-4 h-4 text-[#c2c6cb]" />
                      ) : (
                        <Plus className="w-4 h-4 text-[#c2c6cb]" />
                      )}
                    </button>
                    <h4 className="font-medium text-[#c2c6cb] text-sm sm:text-base">
                      Essential Cookies
                    </h4>
                  </div>
                  <span className="flex items-center text-green-400 font-medium text-xs sm:text-sm ml-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                    Always Active
                  </span>
                </div>
                {expandedSections.essential && (
                  <div className="p-3 sm:p-4 bg-gray-900">
                    <p className="text-xs sm:text-sm text-[#c2c6cb] leading-relaxed">
                      Essential cookies are required for core site features
                      (security, network management, accessibility). You may
                      disable these via your browser settings, but some parts of
                      the site may not work properly.{" "}
                      <Link
                        to="/privacy-policy"
                        className="text-[#c08830] hover:underline text-xs"
                      >
                        Check cookies details
                      </Link>
                    </p>
                  </div>
                )}
              </div>

              {/* Analytics / Ads cookies */}
              <div className="border border-gray-600 rounded-md mb-3 overflow-hidden">
                <div
                  className="flex items-center justify-between p-3 sm:p-4 cursor-pointer bg-gray-800 hover:bg-gray-700"
                  onClick={() => toggleSection("analytics")}
                >
                  <div className="flex items-center flex-1">
                    <button
                      onClick={(e) => handlePlusClick(e, "analytics")}
                      className="p-0 border-none bg-transparent cursor-pointer mr-2"
                    >
                      {expandedSections.analytics ? (
                        <Minus className="w-4 h-4 text-[#c2c6cb]" />
                      ) : (
                        <Plus className="w-4 h-4 text-[#c2c6cb]" />
                      )}
                    </button>
                    <h4 className="font-medium text-[#c2c6cb] text-sm sm:text-base">
                      Analytics / Targeting and Advertising Cookies
                    </h4>
                  </div>
                  <div onClick={(e) => e.stopPropagation()} className="ml-2">
                    <Switch
                      checked={consentPreferences.analytics}
                      onChange={(checked) =>
                        togglePreference("analytics", checked)
                      }
                      size="small"
                      className="ml-0"
                    />
                  </div>
                </div>
                {expandedSections.analytics && (
                  <div className="p-3 sm:p-4 bg-gray-900">
                    <p className="text-xs sm:text-sm text-[#c2c6cb] leading-relaxed">
                      Analytics cookies allow us to measure visits and user
                      flows (Google Analytics). Targeting and advertising
                      cookies (such as Google AdSense) help us show more
                      relevant ads and measure campaign performance. For more
                      information, please visit{" "}
                      <Link
                        to="/privacy-policy"
                        className="text-[#c08830] hover:underline text-xs"
                      >
                        Ethos Pro Realtors Privacy Policy - Chapter 5.1.2 in
                        “Cookies and similar technologies”
                      </Link>
                      .
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Modal footer buttons */}
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
