// src/components/ScrollToTop.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
const pathnamesToScroll = [
  "/home",
  "/location",
  "/projects",
  "/projects/residential",
  "/projects/commercial",
  "/premiumproperties/",
  // "/about",
  "/blog",
  "/contact",
  "/privacy-policy",
  "/terms&conditions",
  "/f&qs",
  "/disclaimer",
];

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const isPresent = pathnamesToScroll.some((path) => pathname.startsWith(path));
    if (isPresent) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [pathname]);

  return null;
}
