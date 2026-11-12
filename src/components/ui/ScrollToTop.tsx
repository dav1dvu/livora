"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Cuộn lên đầu trang"
      className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-brand-charcoal/80 hover:bg-brand-charcoal text-white shadow-xl backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-rose cursor-pointer"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}

