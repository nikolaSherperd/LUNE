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
      "/": "LUNE — African Aerospace Industry",
      "/systems": "Mission Foundry & Platforms — LUNE",
      "/infrastructure": "Assembly, Cleanroom & Test Infrastructure — LUNE",
      "/missions": "Orbital Flight Manifest & Heritage — LUNE",
      "/research": "Research & Deep Technology — LUNE",
      "/about": "Ecosystem, Industrial Thesis & PAUSN — LUNE",
      "/mission": "Ecosystem, Industrial Thesis & PAUSN — LUNE",
      "/contact": "Contact & Mission Inquiries — LUNE",
    };
    const routeDescriptions: Record<string, string> = {
      "/": "LUNE is an African aerospace and space-systems company building the industrial foundation for an African space civilization.",
      "/systems": "Modular CubeSat and SmallSat platform architecture, standardized subsystem dossiers, and mechanical interface specifications.",
      "/infrastructure": "Cleanroom integration, thermal vacuum testing, dynamic vibration analysis, and additive metallurgy in Abuja.",
      "/missions": "Orbital flight manifest, scheduled commercial and sovereign satellite deployments, and telemetry station operations.",
      "/research": "Deep aerospace R&D spanning radiation-tolerant avionics, RF spectrum intelligence, and aerospike propulsion simulation.",
      "/about": "The LUNE industrial thesis, PAUSN Pan-African University Space Network, and native aerospace talent cultivation.",
      "/mission": "The LUNE industrial thesis, PAUSN Pan-African University Space Network, and native aerospace talent cultivation.",
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
            (location.pathname === "/mission" && item.path === "/about"),
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
                <span className="rail-tooltip">Overview</span>
              </div>
              <div className="rail-btn-wrap">
                <button
                  className={`rail-btn ${activeRailIndex === "02" ? "active" : ""}`}
                  onClick={() => scrollToSection("capability")}
                  aria-label="Capability & Outcomes"
                >
                  02
                </button>
                <span className="rail-tooltip">Capability</span>
              </div>
              <div className="rail-btn-wrap">
                <button
                  className={`rail-btn ${activeRailIndex === "03" ? "active" : ""}`}
                  onClick={() => scrollToSection("foundry")}
                  aria-label="The Mission Foundry"
                >
                  03
                </button>
                <span className="rail-tooltip">Foundry</span>
              </div>
              <div className="rail-btn-wrap">
                <button
                  className={`rail-btn ${activeRailIndex === "04" ? "active" : ""}`}
                  onClick={() => scrollToSection("products")}
                  aria-label="Foundry Products"
                >
                  04
                </button>
                <span className="rail-tooltip">Products</span>
              </div>
              <div className="rail-btn-wrap">
                <button
                  className={`rail-btn ${activeRailIndex === "05" ? "active" : ""}`}
                  onClick={() => scrollToSection("news")}
                  aria-label="News & Manifest"
                >
                  05
                </button>
                <span className="rail-tooltip">Manifest</span>
              </div>
              <span className="rail-active">{activeRailIndex}</span>
            </>
          ) : (
            <>
              <div className="rail-btn-wrap">
                <Link to="/" className="rail-btn" aria-label="Overview">
                  01
                </Link>
                <span className="rail-tooltip">Overview</span>
              </div>
              <div className="rail-btn-wrap">
                <Link
                  to="/systems"
                  className={`rail-btn ${location.pathname === "/systems" ? "active" : ""}`}
                  aria-label="Platforms"
                >
                  02
                </Link>
                <span className="rail-tooltip">Platforms</span>
              </div>
              <div className="rail-btn-wrap">
                <Link
                  to="/infrastructure"
                  className={`rail-btn ${location.pathname === "/infrastructure" ? "active" : ""}`}
                  aria-label="Infrastructure"
                >
                  03
                </Link>
                <span className="rail-tooltip">Infrastructure</span>
              </div>
              <div className="rail-btn-wrap">
                <Link
                  to="/missions"
                  className={`rail-btn ${location.pathname === "/missions" ? "active" : ""}`}
                  aria-label="Missions"
                >
                  04
                </Link>
                <span className="rail-tooltip">Missions</span>
              </div>
              <div className="rail-btn-wrap">
                <Link
                  to="/about"
                  className={`rail-btn ${location.pathname === "/about" || location.pathname === "/mission" ? "active" : ""}`}
                  aria-label="Ecosystem"
                >
                  05
                </Link>
                <span className="rail-tooltip">Ecosystem</span>
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
