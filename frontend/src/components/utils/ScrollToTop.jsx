// src/components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to the top when the route changes
    window.scrollTo({
      top: 0,
      behavior: "smooth", // optional: remove "smooth" if you want instant jump
    });
  }, [pathname]);

  return null; // This component doesn't render anything
}
