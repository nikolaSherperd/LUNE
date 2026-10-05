import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { navigationItems } from "../../data";
import { useReveal } from "../../hooks/useReveal";
import { SiteHeader } from "./SiteHeader";
import { BackToTopButton } from "./BackToTopButton";

export interface LayoutProps {
  children: React.ReactNode;
  onOpenSearch?: () => void;
  onOpenContact: () => void;
  activeSection?: string;
}

export function Layout({
  children,
  onOpenSearch,
  onOpenContact,
}: LayoutProps) {
  useReveal();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Scroll listener for sticky header and back-to-top
  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY;
      setIsScrolled(top > 40);
      setShowBackToTop(top > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Dynamic route titles
  useEffect(() => {
    const routeTitles: Record<string, string> = {
      "/": "LUNE — Industrial Foundation for an African Space Economy",
      "/platforms": "Modular Spacecraft Platforms & Flight Avionics — LUNE",
      "/systems": "Modular Spacecraft Platforms & Flight Avionics — LUNE",
      "/technology": "Modular Spacecraft Platforms & Flight Avionics — LUNE",
      "/infrastructure": "Modular Spacecraft Platforms & Flight Avionics — LUNE",
      "/missions": "Orbital Missions & Ground Station Network — LUNE",
      "/projects": "Orbital Missions & Ground Station Network — LUNE",
      "/about": "Mission, Consortium & Engineering Team — LUNE",
      "/mission": "Mission, Consortium & Engineering Team — LUNE",
      "/contact": "Dispatch Transmission & Mission Inquiries — LUNE",
    };
    const routeDescriptions: Record<string, string> = {
      "/": "LUNE is an African aerospace company building standardized modular spacecraft, flight avionics, and sovereign integration facilities in Abuja.",
      "/platforms": "Modular Spacecraft Platforms (3U to 150kg), Radiation-Tolerant Avionics, Autonomous ADCS, and ISO 7 Cleanroom Integration in Abuja.",
      "/missions": "Active orbital flight pathfinders, Pan-African Ground Station Gateway Network, and flight qualification milestones.",
      "/about": "The LUNE industrial thesis, PAUSN university consortium, and native aerospace engineering talent cultivation.",
      "/contact": "Dispatch direct commercial satellite inquiries, hosted payload bookings, and PAUSN academic collaboration requests.",
    };
    document.title =
      routeTitles[location.pathname] || "LUNE — African Aerospace Industry";
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute(
        "content",
        routeDescriptions[location.pathname] || routeDescriptions["/"]
      );
    }
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
    if ((window as any).__lenis) {
      (window as any).__lenis.scrollTo(0, { immediate: true });
    }
  }, [location.pathname]);

  return (
    <div className="site-shell">
      {/* Website Background Layer */}
      <div className="site-bg" aria-hidden="true">
        <div className="site-bg-image" />
        <div className="site-bg-overlay" />
      </div>

      <SiteHeader
        isScrolled={isScrolled}
        onOpenSearch={onOpenSearch}
        onOpenContact={onOpenContact}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {mobileOpen && (
        <div className="mobile-menu" role="dialog" aria-modal="true">
          <div className="mobile-menu-inner">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className="mobile-link"
                onClick={() => setMobileOpen(false)}
              >
                <span>{item.label}</span>
                <ArrowRight size={16} />
              </NavLink>
            ))}
            <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <button
                className="btn-cta"
                style={{ width: "100%", justifyContent: "center" }}
                onClick={() => {
                  setMobileOpen(false);
                  onOpenContact();
                }}
              >
                <span>Get in Touch</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="main-canvas">{children}</main>

      <BackToTopButton show={showBackToTop} />
    </div>
  );
}
