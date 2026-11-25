"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 420);
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
      type="button"
      onClick={scrollToTop}
      aria-label="Cuộn lên đầu trang"
      /* taste-skill-ignore: floating back-to-top action button */
      className="fixed bottom-5 right-5 z-40 w-11 h-11 inline-flex items-center justify-center rounded-full bg-[#241818] hover:bg-[#3A2828] text-white shadow-xl transition-[transform,background-color] duration-200 hover:-translate-y-0.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-rose cursor-pointer"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
