import React from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { brandAssets, navigationItems } from "../../data";

export interface SiteHeaderProps {
  isScrolled: boolean;
  onOpenSearch?: () => void;
  onOpenContact: () => void;
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SiteHeader({
  isScrolled,
  onOpenContact,
  mobileOpen,
  setMobileOpen,
}: SiteHeaderProps) {
  return (
    <header className="site-header" role="banner">
      <nav
        className={`site-nav ${isScrolled ? "scrolled" : ""}`}
        id="siteNav"
        aria-label="Primary"
      >
        <Link className="wordmark" to="/" aria-label="LUNE Aerospace">
          <img
            className="wordmark-logo"
            src={brandAssets.wordmark}
            alt="LUNE"
          />
        </Link>

        <div className="nav-links">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            className="nav-cta"
            onClick={onOpenContact}
            aria-label="Get in Touch"
          >
            <span>Get in Touch</span>
            <ArrowRight size={13} />
          </button>

          <button
            className="mobile-menu-button icon-button"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
