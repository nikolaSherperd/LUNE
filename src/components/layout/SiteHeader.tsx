import React, { useState } from "react";
import { ArrowRight, ChevronDown, Menu, Search, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { brandAssets, navigationItems } from "../../data";

export interface SiteHeaderProps {
  isScrolled: boolean;
  onOpenSearch: () => void;
  onOpenContact: () => void;
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SiteHeader({
  isScrolled,
  onOpenSearch,
  onOpenContact,
  mobileOpen,
  setMobileOpen,
}: SiteHeaderProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

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
            <div
              key={item.path}
              className={`nav-dd ${openDropdown === item.path ? "open" : ""}`}
              onMouseEnter={() => item.children && setOpenDropdown(item.path)}
              onMouseLeave={() => item.children && setOpenDropdown(null)}
            >
              {item.children ? (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `nav-link nav-dd-toggle ${isActive ? "active" : ""}`
                  }
                  onClick={(e) => {
                    if (window.innerWidth <= 768) {
                      e.preventDefault();
                      setOpenDropdown((prev) => (prev === item.path ? null : item.path));
                    }
                  }}
                >
                  <span>{item.label}</span>
                  <ChevronDown className="chev" size={10} />
                </NavLink>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  <span>{item.label}</span>
                </NavLink>
              )}

              {item.children && (
                <div className="dd-menu">
                  {item.children.map((child) => (
                    <Link
                      key={child.code}
                      to={child.path}
                      onClick={() => {
                        setOpenDropdown(null);
                        setMobileOpen(false);
                      }}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            className="nav-cta btn-magnetic"
            onClick={onOpenContact}
            aria-label="Contact Us"
          >
            <span>Contact Us</span>
            <ArrowRight size={12} />
          </button>
          <button
            className="nav-search-btn"
            onClick={onOpenSearch}
            aria-label="Search telemetry (Cmd+K)"
            title="Search telemetry (Cmd+K)"
          >
            <Search size={14} strokeWidth={1.75} />
            <span className="nav-search-label">Search</span>
            <kbd className="nav-search-kbd">⌘K</kbd>
          </button>
          <button
            className="mobile-menu-button icon-button"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
