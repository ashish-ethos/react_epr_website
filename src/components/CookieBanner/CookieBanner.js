import React, { useState, useEffect } from "react";
import CookieConsent from "react-cookie-consent";
import { X, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { Switch } from "antd";

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
  const adsEnabled = consentPreferences.analytics;

  // First: Load preferences on mount only
  useEffect(() => {
    console.log("[DEBUG] Initial load: Checking consent and loading prefs"); // Debug
    const consent = document.cookie
      .split("; ")
      .find((row) => row.startsWith("userConsent="));
    if (!consent) {
      setShowBanner(true);
      console.log("[DEBUG] No userConsent cookie - showing banner"); // Debug
    }

    // Load saved preferences from localStorage
    const savedAnalytics = localStorage.getItem("analyticsConsent");
    const savedYoutube = localStorage.getItem("youtubeConsent");
    if (savedAnalytics !== null) {
      const parsed = JSON.parse(savedAnalytics);
      setConsentPreferences((prev) => ({
        ...prev,
        analytics: parsed,
      }));
      console.log("[DEBUG] Loaded analytics from localStorage:", parsed); // Debug
    }
    if (savedYoutube !== null) {
      const parsed = JSON.parse(savedYoutube);
      setConsentPreferences((prev) => ({
        ...prev,
        youtube: parsed,
      }));
      console.log("[DEBUG] Loaded youtube from localStorage:", parsed); // Debug
    }
  }, []); // Empty deps: Runs once

  // Second: Apply consent when adsEnabled changes (e.g., on toggle)
  useEffect(() => {
    console.log("[DEBUG] adsEnabled changed to:", adsEnabled); // Debug
    applyAdConsent(adsEnabled);
  }, [adsEnabled]); // Deps: Only re-runs on toggle/load

  const setConsentCookie = (value) => {
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    document.cookie = `userConsent=${value}; expires=${expires.toUTCString()}; path=/`;
    setShowBanner(false);
    console.log("[DEBUG] Set userConsent cookie to:", value); // Debug
  };

  const handleAccept = () => {
    console.log("[DEBUG] handleAccept called"); // Debug
    setConsentCookie("true");
    const allTrue = { analytics: true, youtube: true };
    setConsentPreferences(allTrue);
    localStorage.setItem("analyticsConsent", JSON.stringify(true));
    localStorage.setItem("youtubeConsent", JSON.stringify(true));
    console.log("[DEBUG] Accept: Set all prefs to true, saved to localStorage"); // Debug
  };

  const handleReject = () => {
    console.log("[DEBUG] handleReject called"); // Debug
    setConsentCookie("false");
    const allFalse = { analytics: false, youtube: false };
    setConsentPreferences(allFalse);
    localStorage.setItem("analyticsConsent", JSON.stringify(false));
    localStorage.setItem("youtubeConsent", JSON.stringify(false));
    console.log(
      "[DEBUG] Reject: Set all prefs to false, saved to localStorage"
    ); // Debug
  };

  const handleConfirmChoices = () => {
    console.log(
      "[DEBUG] handleConfirmChoices called, prefs:",
      consentPreferences
    ); // Debug
    // Save preferences
    localStorage.setItem(
      "analyticsConsent",
      JSON.stringify(consentPreferences.analytics)
    );
    localStorage.setItem(
      "youtubeConsent",
      JSON.stringify(consentPreferences.youtube)
    );
    setShowModal(false);
    // Optionally set overall consent based on choices
    setConsentCookie(
      consentPreferences.analytics || consentPreferences.youtube
        ? "true"
        : "false"
    );
  };

  const handleAcceptAllInModal = () => {
    console.log("[DEBUG] handleAcceptAllInModal called"); // Debug
    const allTrue = { analytics: true, youtube: true };
    setConsentPreferences(allTrue);
    handleConfirmChoices();
  };

  const handleRejectAllInModal = () => {
    console.log("[DEBUG] handleRejectAllInModal called"); // Debug
    const allFalse = { analytics: false, youtube: false };
    setConsentPreferences(allFalse);
    handleConfirmChoices();
  };

  const togglePreference = (key, checked) => {
    console.log(`[DEBUG] togglePreference called: ${key}=${checked}`); // Debug
    const newPrefs = { ...consentPreferences, [key]: checked };
    setConsentPreferences(newPrefs);
    localStorage.setItem(`${key}Consent`, JSON.stringify(checked)); // Save immediately
    console.log(
      `[DEBUG] Updated state to:`,
      newPrefs,
      `and saved to localStorage`
    ); // Debug
    if (key === "analytics") {
      applyAdConsent(checked);
    }
    if (key === "youtube") {
      applyYouTubeConsent(checked);
    }
  };

  const toggleSection = (key) => {
    console.log(`[DEBUG] toggleSection: ${key}`); // Debug
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePlusClick = (e, key) => {
    e.stopPropagation();
    toggleSection(key);
  };

  // Helper: Apply consent to ads (load/unload based on enabled)
  const applyAdConsent = (enabled) => {
    console.log(
      `[DEBUG] applyAdConsent called with: ${enabled ? "enabled" : "disabled"}`
    ); // Debug

    if (enabled) {
      loadMarketingAds();
    } else {
      unloadMarketingAds();
    }

    // Optional: Dispatch event for other components to listen
    window.dispatchEvent(
      new CustomEvent("adConsentChange", { detail: { enabled } })
    );
    console.log("[DEBUG] Dispatched adConsentChange event"); // Debug
  };

  // Load ad scripts and trackers
  const loadMarketingAds = () => {
    console.log("[DEBUG] loadMarketingAds called"); // Debug
    // Prevent duplicates
    if (document.getElementById("marketing-ads-loaded")) {
      console.log("[DEBUG] Ads already loaded - skipping"); // Debug
      return;
    }

    // 1. Google Analytics (for analytics + ad targeting)
    // Replace 'G-XXXXXXXXXX' with your actual GA Measurement ID
    const GA_ID = "G-XXXXXXXXXX"; // TODO: Replace with your GA ID
    if (!window.gtag && GA_ID !== "G-XXXXXXXXXX") {
      console.log("[DEBUG] Loading GA script with ID:", GA_ID); // Debug
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
      console.log("[DEBUG] GA script and config appended"); // Debug
    } else {
      console.log("[DEBUG] Skipping GA: window.gtag exists or ID not set"); // Debug
    }

    // 2. Facebook Pixel (for ad retargeting)
    // Replace 'XXXXXXXXXX' with your actual FB Pixel ID
    const FB_PIXEL_ID = "XXXXXXXXXX"; // TODO: Replace with your FB Pixel ID
    if (!window.fbq && FB_PIXEL_ID !== "XXXXXXXXXX") {
      console.log("[DEBUG] Loading FB Pixel with ID:", FB_PIXEL_ID); // Debug
      /* global fbq */
      /* eslint-disable-next-line */
      !(function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod
            ? n.callMethod.apply(n, arguments)
            : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = "2.0";
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(
        window,
        document,
        "script",
        "https://connect.facebook.net/en_US/fbevents.js"
      );
      fbq("init", FB_PIXEL_ID);
      fbq("track", "PageView");
      console.log("[DEBUG] FB Pixel loaded and tracked PageView"); // Debug
    } else {
      console.log("[DEBUG] Skipping FB: window.fbq exists or ID not set"); // Debug
    }

    // 3. Custom Ad Slots (e.g., Google AdSense banners)
    // Replace 'ca-pub-XXXXXXXXXXXXXXXX' with your actual AdSense Publisher ID
    const ADSENSE_ID = "ca-pub-XXXXXXXXXXXXXXXX"; // TODO: Replace with your AdSense ID
    const adSlots = document.querySelectorAll(".ad-placeholder"); // Assume your ad divs have this class
    console.log(`[DEBUG] Found ${adSlots.length} ad slots`); // Debug
    adSlots.forEach((slot, index) => {
      if (
        !document.getElementById("adsense-script") &&
        ADSENSE_ID !== "ca-pub-XXXXXXXXXXXXXXXX"
      ) {
        console.log(`[DEBUG] Loading AdSense script with ID:`, ADSENSE_ID); // Debug
        const adsenseScript = document.createElement("script");
        adsenseScript.id = "adsense-script";
        adsenseScript.async = true;
        adsenseScript.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`;
        document.head.appendChild(adsenseScript);
      }
      // eslint-disable-next-line no-unused-expressions
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      console.log(`[DEBUG] Pushed AdSense for slot ${index}`); // Debug
    });

    // Mark as loaded (hidden script flag)
    const flag = document.createElement("script");
    flag.id = "marketing-ads-loaded";
    flag.type = "text/plain";
    document.head.appendChild(flag);
    console.log("[DEBUG] Marked ads as loaded"); // Debug
  };

  // Unload ads (remove trackers)
  const unloadMarketingAds = () => {
    console.log("[DEBUG] unloadMarketingAds called"); // Debug
    // Remove scripts
    ["gtag-script", "gtag-config", "fb-pixel-script", "adsense-script"].forEach(
      (id) => {
        const el = document.getElementById(id);
        if (el) {
          el.remove();
          console.log(`[DEBUG] Removed script: ${id}`); // Debug
        }
      }
    );

    // Reset globals
    window.gtag = undefined;
    window.fbq = undefined;
    if (window.dataLayer) window.dataLayer.length = 0;
    console.log("[DEBUG] Reset globals (gtag, fbq, dataLayer)"); // Debug

    // Hide ad slots
    document.querySelectorAll(".ad-placeholder").forEach((slot) => {
      slot.innerHTML = ""; // Or add a "disabled" message
      slot.style.display = "none";
      console.log("[DEBUG] Hid ad slot"); // Debug
    });

    // Clear related cookies (e.g., Google opt-out)
    document.cookie = "_ga=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    console.log("[DEBUG] Cleared _ga cookie"); // Debug
    // Add more for FB, etc., if needed
  };

  // Optional: YouTube consent helper
  const applyYouTubeConsent = (enabled) => {
    console.log(
      `[DEBUG] applyYouTubeConsent called with: ${
        enabled ? "enabled" : "disabled"
      }`
    ); // Debug
    const embeds = document.querySelectorAll(".youtube-placeholder");
    console.log(`[DEBUG] Found ${embeds.length} YouTube placeholders`); // Debug
    embeds.forEach((el) => {
      if (enabled) {
        const videoId = el.dataset.videoId;
        el.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
        console.log(`[DEBUG] Loaded YouTube iframe for ID: ${videoId}`); // Debug
      } else {
        el.innerHTML = "<p>Enable cookies to load video.</p>";
        console.log("[DEBUG] Unloaded YouTube placeholder"); // Debug
      }
    });
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
                Ethos Pro Realtors and its affiliated entities use cookies and
                similar technologies to perform essential online functions, such
                as authentication and security. You may disable these by
                changing your cookie settings through your browser, but this may
                affect how this website functions. Also, Ethos Pro Realtors uses
                some analytics, targeting/advertising, and video-embedded
                cookies provided by Ethos Pro Realtors or third parties. Please
                click a button here to choose your preference for these types of
                cookies. You can also configure cookie settings by clicking
                “Cookie Settings” at the footer of Ethos Pro Realtors websites
                or accessing your browser settings at any time. For detailed
                information, please visit the Ethos Pro Realtors Privacy Policy.{" "}
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
                <h2 className="text-lg sm:text-xl font-semibold text-[#c2c6cb]">
                  Manage Your Cookie Settings
                </h2>
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
                Ethos Pro Realtors and third-party services use small text files
                called cookies and similar technologies to store or retrieve
                information from your device. Essential cookies maintain website
                core functionality, while Non-Essential cookies personalize your
                experience. You can choose to block some types for privacy
                reasons, but this may impact your website experience.
              </p>
              <p className="text-xs sm:text-sm text-[#c2c6cb] mt-2">
                For more information, please visit{" "}
                <Link
                  to="/privacy-policy"
                  className="text-[#c08830] hover:underline"
                >
                  Ethos Pro Realtors Privacy Policy - Section 5 in “Cookies and
                  similar technologies”
                </Link>
                .
              </p>
            </div>

            {/* Consent Preferences */}
            <div className="p-2 sm:p-4">
              <h3 className="text-base sm:text-lg font-medium text-[#c2c6cb] mb-4">
                Manage Consent Preferences
              </h3>

              {/* Essential Cookies */}
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
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Always Active
                  </span>
                </div>
                {expandedSections.essential && (
                  <div className="p-3 sm:p-4 bg-gray-900">
                    <p className="text-xs sm:text-sm text-[#c2c6cb] leading-relaxed">
                      Essential cookies are needed to ensure our websites and
                      services work correctly, so they are enabled in the Cookie
                      Settings. They can store things like your language
                      preferences, sign-up and authentication data, and remember
                      your choices in forms. They also help us to enhance your
                      security when purchasing online, and allow us to provide a
                      more stable browsing experience. You may disable essential
                      cookies via your browser's cookie settings, but this might
                      affect how the website works.{" "}
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

              {/* Analytics / Targeting and Advertising Cookies */}
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
                      We use analytics cookies to count the number and length of
                      your visit in Ethos Pro Realtors products and services as
                      well as which part or features you visit the most as well.
                      This data helps us analyze the performance and operation
                      of Ethos Pro Realtors products and services to improve
                      performance and develop new features, functions and
                      services. Besides, we adopt targeting and advertising
                      cookies to collect data about your use in Ethos Pro
                      Realtors products and services and identify your
                      interests, such as the advertisings you have viewed. Such
                      cookies are also used to limit the number of times you see
                      an advertisement as well as help measure the effectiveness
                      of the advertising campaigns. For more information on
                      cookies adopted by Ethos Pro Realtors, please visit{" "}
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

              {/* YouTube Cookies */}
              <div className="border border-gray-600 rounded-md mb-3 overflow-hidden">
                <div
                  className="flex items-center justify-between p-3 sm:p-4 cursor-pointer bg-gray-800 hover:bg-gray-700"
                  onClick={() => toggleSection("youtube")}
                >
                  <div className="flex items-center flex-1">
                    <button
                      onClick={(e) => handlePlusClick(e, "youtube")}
                      className="p-0 border-none bg-transparent cursor-pointer mr-2"
                    >
                      {expandedSections.youtube ? (
                        <Minus className="w-4 h-4 text-[#c2c6cb]" />
                      ) : (
                        <Plus className="w-4 h-4 text-[#c2c6cb]" />
                      )}
                    </button>
                    <h4 className="font-medium text-[#c2c6cb] text-sm sm:text-base">
                      YouTube Cookies
                    </h4>
                  </div>
                  <div onClick={(e) => e.stopPropagation()} className="ml-2">
                    <Switch
                      checked={consentPreferences.youtube}
                      onChange={(checked) =>
                        togglePreference("youtube", checked)
                      }
                      size="small"
                      className="ml-0"
                    />
                  </div>
                </div>
                {expandedSections.youtube && (
                  <div className="p-3 sm:p-4 bg-gray-900">
                    <p className="text-xs sm:text-sm text-[#c2c6cb] leading-relaxed">
                      We embed videos from YouTube channels into our websites.
                      In embedded videos, Google Inc. may set YouTube cookies to
                      track your views and personalize the YouTube browsing
                      experience. For more information on cookies adopted by
                      Ethos Pro Realtors, please visit{" "}
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
