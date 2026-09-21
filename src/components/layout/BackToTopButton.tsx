import React from "react";
import { ChevronDown } from "lucide-react";

export function BackToTopButton({ show }: { show: boolean }) {
  const scrollToTop = () => {
    if ((window as any).__lenis) {
      (window as any).__lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      className={`back-to-top ${show ? "is-visible" : ""}`}
      onClick={scrollToTop}
      aria-label="Back to top"
      type="button"
    >
      <ChevronDown size={18} style={{ transform: "rotate(180deg)" }} />
    </button>
  );
}
