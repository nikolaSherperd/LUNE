import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { brandAssets, navigationItems } from "../../data";
import { useReveal } from "../../hooks/useReveal";
import { SiteHeader } from "./SiteHeader";
import { BackToTopButton } from "./BackToTopButton";

export interface LayoutProps {
  children: React.ReactNode;
  onOpenSearch: () => void;
  onOpenContact: () => void;
  activeSection: string;
}

export function Layout({
  children,
  onOpenSearch,
  onOpenContact,
  activeSection,
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
      setIsScrolled(top > 80);
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
      "/systems": "Systems Architecture & Modular Platforms — LUNE",
      "/projects": "Flight Projects & Ground Station Manifest — LUNE",
      "/missions": "Flight Projects & Ground Station Manifest — LUNE",
      "/research": "Research, Papers & Engineering Logs — LUNE",
      "/technology": "Horizontal Technology Stack & Avionics — LUNE",
      "/about": "Mission, Philosophy & Consortium — LUNE",
      "/mission": "Mission, Philosophy & Consortium — LUNE",
      "/journal": "Engineering Journal & Field Notes — LUNE",
      "/infrastructure": "Assembly, Cleanroom & Test Infrastructure — LUNE",
      "/contact": "Contact & Mission Inquiries — LUNE",
    };
    const routeDescriptions: Record<string, string> = {
      "/": "LUNE is an African aerospace and space-systems company building the industrial foundation for an African space civilization.",
      "/systems": "Modular Spacecraft Platforms, Radiation-Tolerant Avionics, Autonomous ADCS, and Sovereign Manufacturing in Abuja.",
      "/projects": "Active orbital pathfinders, Pan-African Ground Station Gateway Network, collaborative university missions, and flight qualification heritage.",
      "/missions": "Active orbital pathfinders, Pan-African Ground Station Gateway Network, collaborative university missions, and flight qualification heritage.",
      "/research": "Searchable PAUSN peer-reviewed monographs, BibTeX citation exporter, practical engineering memoranda, and environmental test logs.",
      "/technology": "Horizontal capabilities spanning radiation-hardened embedded silicon, orbital neural inference (Edge NPU), communications, and ADCS.",
      "/about": "The LUNE industrial thesis, 'capability before complexity', PAUSN university consortium, and native aerospace talent cultivation.",
      "/mission": "The LUNE industrial thesis, 'capability before complexity', PAUSN university consortium, and native aerospace talent cultivation.",
      "/journal": "Dispatches, TVAC thermal balance experiments, dynamic vibration screening, and African ground station installations.",
      "/infrastructure": "Cleanroom integration, thermal vacuum testing, dynamic vibration analysis, and additive metallurgy in Abuja.",
      "/contact": "Dispatch direct commercial satellite inquiries, hosted payload bookings, and PAUSN academic collaboration requests.",
    };
    document.title =
      routeTitles[location.pathname] || "LUNE — African Aerospace Industry";
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute("content", routeDescriptions[location.pathname] || routeDescriptions["/"]);
    }
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
    if ((window as any).__lenis) {
      (window as any).__lenis.scrollTo(0, { immediate: true });
    }
  }, [location.pathname]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(el, { offset: -30 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
      setMobileOpen(false);
    }
  };

  // Resolve rail number
  const isHome = location.pathname === "/";
  const activeRailIndex = isHome
    ? activeSection
    : String(
        navigationItems.findIndex(
          (item) =>
            item.path === location.pathname ||
            (location.pathname === "/mission" && item.path === "/about") ||
            (location.pathname === "/missions" && item.path === "/projects")
        ) + 1,
      ).padStart(2, "0");

  return (
    <div className="site-shell">
      {/* Website Background Layer */}
      <div className="site-bg" aria-hidden="true">
        <div className="site-bg-image" />
        <div className="site-bg-overlay" />
      </div>

      <aside className="side-rail" aria-label="Primary">
        <Link className="rail-mark" to="/" aria-label="Lune home">
          <img
            className="rail-emblem"
            src={brandAssets.emblem}
            alt="LUNE emblem"
          />
        </Link>

        <div className="rail-mid">
          <span className="rail-line" />
          <span className="rail-code">NG</span>
        </div>

        <div className="rail-bottom">
          {isHome ? (
            <>
              <div className="rail-btn-wrap">
                <button
                  className={`rail-btn ${activeRailIndex === "01" ? "active" : ""}`}
                  onClick={() => scrollToSection("hero")}
                  aria-label="North Star / Overview"
                >
                  01
                </button>
                <span className="rail-tooltip">North Star</span>
              </div>
              <div className="rail-btn-wrap">
                <button
                  className={`rail-btn ${activeRailIndex === "02" ? "active" : ""}`}
                  onClick={() => scrollToSection("systems")}
                  aria-label="Systems Architecture"
                >
                  02
                </button>
                <span className="rail-tooltip">Systems</span>
              </div>
              <div className="rail-btn-wrap">
                <button
                  className={`rail-btn ${activeRailIndex === "03" ? "active" : ""}`}
                  onClick={() => scrollToSection("projects")}
                  aria-label="Projects & Operations"
                >
                  03
                </button>
                <span className="rail-tooltip">Projects</span>
              </div>
              <div className="rail-btn-wrap">
                <button
                  className={`rail-btn ${activeRailIndex === "04" ? "active" : ""}`}
                  onClick={() => scrollToSection("research-tech")}
                  aria-label="Research & Technology"
                >
                  04
                </button>
                <span className="rail-tooltip">Research & Tech</span>
              </div>
              <div className="rail-btn-wrap">
                <button
                  className={`rail-btn ${activeRailIndex === "05" ? "active" : ""}`}
                  onClick={() => scrollToSection("ecosystem")}
                  aria-label="Ecosystem & Mission"
                >
                  05
                </button>
                <span className="rail-tooltip">Human Engine</span>
              </div>
              <span className="rail-active">{activeRailIndex}</span>
            </>
          ) : (
            <>
              <div className="rail-btn-wrap">
                <Link
                  to="/systems"
                  className={`rail-btn ${location.pathname === "/systems" ? "active" : ""}`}
                  aria-label="Systems"
                >
                  01
                </Link>
                <span className="rail-tooltip">Systems</span>
              </div>
              <div className="rail-btn-wrap">
                <Link
                  to="/projects"
                  className={`rail-btn ${location.pathname === "/projects" || location.pathname === "/missions" ? "active" : ""}`}
                  aria-label="Projects"
                >
                  02
                </Link>
                <span className="rail-tooltip">Projects</span>
              </div>
              <div className="rail-btn-wrap">
                <Link
                  to="/research"
                  className={`rail-btn ${location.pathname === "/research" ? "active" : ""}`}
                  aria-label="Research"
                >
                  03
                </Link>
                <span className="rail-tooltip">Research</span>
              </div>
              <div className="rail-btn-wrap">
                <Link
                  to="/technology"
                  className={`rail-btn ${location.pathname === "/technology" ? "active" : ""}`}
                  aria-label="Technology"
                >
                  04
                </Link>
                <span className="rail-tooltip">Technology</span>
              </div>
              <div className="rail-btn-wrap">
                <Link
                  to="/about"
                  className={`rail-btn ${location.pathname === "/about" || location.pathname === "/mission" ? "active" : ""}`}
                  aria-label="About"
                >
                  05
                </Link>
                <span className="rail-tooltip">About</span>
              </div>
              <div className="rail-btn-wrap">
                <Link
                  to="/journal"
                  className={`rail-btn ${location.pathname === "/journal" ? "active" : ""}`}
                  aria-label="Journal"
                >
                  06
                </Link>
                <span className="rail-tooltip">Journal</span>
              </div>
              <span className="rail-active">{activeRailIndex || "01"}</span>
            </>
          )}
        </div>
      </aside>

      <SiteHeader
        isScrolled={isScrolled}
        onOpenSearch={onOpenSearch}
        onOpenContact={onOpenContact}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {mobileOpen && (
        <div className="mobile-menu">
          {navigationItems.map((item, index) => (
            <div
              key={item.path}
              style={{ borderBottom: "1px solid var(--line-soft)" }}
            >
              <NavLink
                to={item.path}
                className="mobile-link"
                style={{ borderBottom: "none" }}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item.label}
                <ArrowRight size={14} />
              </NavLink>
              {item.children && (
                <div
                  style={{
                    padding: "0 0 16px 36px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {item.children.map((child) => (
                    <Link
                      key={child.code}
                      to={child.path}
                      onClick={() => {
                        setMobileOpen(false);
                      }}
                      style={{
                        fontSize: "12px",
                        color: "var(--muted)",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span
                        style={{ color: "var(--accent)", fontSize: "9px" }}
                      >
                        {child.code}
                      </span>
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <main className="main-canvas">{children}</main>

      <BackToTopButton show={showBackToTop} />
    </div>
  );
}
