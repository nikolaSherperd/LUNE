import React, { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ChevronDown,
  Menu,
  Search,
  X,
} from "lucide-react";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { CommandPalette } from "./components/CommandPalette";
import { ContactModal } from "./components/ContactModal";
import { ResearchModal } from "./components/ResearchModal";
import { RoadmapModal } from "./components/RoadmapModal";
import { SpacecraftHotspots } from "./components/SpacecraftHotspots";
import { StatusStrip } from "./components/StatusStrip";
import { SystemDrawer } from "./components/SystemDrawer";
import {
  FacilityItem,
  FoundryPillar,
  FoundryProduct,
  JournalItem,
  MetricItem,
  MissionManifestItem,
  NewsArticle,
  OfferingItem,
  PartnerItem,
  PlatformSpecRow,
  ResearchItem,
  SectorItem,
  SystemItem,
  brandAssets,
  facilitySpecs,
  foundryOfferings,
  foundryPillars,
  foundryProducts,
  images,
  journalItems,
  metricsData,
  missionsManifest,
  navigationItems,
  newsArticles,
  operationalSectors,
  platformSpecTable,
  researchItems,
  systems,
  trustedPartners,
} from "./data";

function useReveal() {
  const location = useLocation();
  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    const timer = setTimeout(() => {
      const items = document.querySelectorAll<HTMLElement>("[data-reveal], .bottom-to-top");
      if (!("IntersectionObserver" in window)) {
        items.forEach((el) => el.classList.add("is-visible"));
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer?.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.06,
          rootMargin: "0px 0px -40px 0px",
        },
      );

      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight - 30 && rect.bottom > 0) {
          item.classList.add("is-visible");
        } else {
          item.classList.remove("is-visible");
          observer?.observe(item);
        }
      });

      // Numerical count-up observer matching Muon Space
      const statTitles = document.querySelectorAll<HTMLElement>("[data-count-target]");
      if (statTitles.length) {
        const numObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const target = parseFloat(entry.target.getAttribute("data-count-target") || "0");
                const suffix = entry.target.getAttribute("data-count-suffix") || "";
                let startTime: number | null = null;
                const duration = 1200;
                const animate = (time: number) => {
                  if (!startTime) startTime = time;
                  const progress = Math.min((time - startTime) / duration, 1);
                  const eased = 1 - Math.pow(1 - progress, 3);
                  const val = Math.round(target * eased);
                  entry.target.textContent = val + suffix;
                  if (progress < 1) requestAnimationFrame(animate);
                };
                requestAnimationFrame(animate);
                numObserver.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.2 }
        );
        statTitles.forEach((st) => numObserver.observe(st));
      }

      // Magnetic button physics matching Muon Space
      const magneticBtns = document.querySelectorAll<HTMLElement>(".btn-magnetic");
      magneticBtns.forEach((btn) => {
        const onMove = (e: MouseEvent) => {
          const rect = btn.getBoundingClientRect();
          const x = 0.16 * (e.clientX - rect.left - rect.width / 2);
          const y = 0.16 * (e.clientY - rect.top - rect.height / 2);
          btn.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
        };
        const onLeave = () => {
          btn.style.transform = "";
        };
        btn.addEventListener("mousemove", onMove);
        btn.addEventListener("mouseleave", onLeave);
      });
    }, 40);

    // Progressive word highlight scroll handler for .text-reveal
    const handleScrollText = () => {
      const textBlock = document.querySelector<HTMLElement>(".text-reveal");
      if (textBlock) {
        const innerH = window.innerHeight;
        const rect = textBlock.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (0.85 * innerH - rect.top) / (0.55 * innerH)));
        const words = textBlock.querySelectorAll<HTMLElement>(".rw");
        const total = words.length || 1;
        const step = 1.4 / total;
        words.forEach((w, idx) => {
          const wordProg = (progress - idx / total) / step;
          const op = Math.max(0.18, Math.min(1, wordProg));
          w.style.opacity = op.toFixed(3);
        });
      }
    };
    window.addEventListener("scroll", handleScrollText, { passive: true });
    handleScrollText();

    return () => {
      clearTimeout(timer);
      if (observer) {
        observer.disconnect();
      }
      window.removeEventListener("scroll", handleScrollText);
    };
  }, [location.pathname]);
}

function SiteHeader({
  isScrolled,
  onOpenSearch,
  onOpenContact,
  mobileOpen,
  setMobileOpen,
}: {
  isScrolled: boolean;
  onOpenSearch: () => void;
  onOpenContact: () => void;
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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
            className="icon-button"
            onClick={onOpenSearch}
            aria-label="Search telemetry (Cmd+K)"
            title="Search telemetry (Cmd+K)"
          >
            <Search size={15} strokeWidth={1.5} />
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

function BackToTopButton({ show }: { show: boolean }) {
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

interface LayoutProps {
  children: React.ReactNode;
  onOpenSearch: () => void;
  onOpenContact: () => void;
  activeSection: string;
}

function Layout({
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
    document.title =
      routeTitles[location.pathname] || "LUNE — African Aerospace Industry";
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
              <button
                className={`rail-btn ${activeRailIndex === "01" ? "active" : ""}`}
                onClick={() => scrollToSection("hero")}
                title="North Star / Overview"
              >
                01
              </button>
              <button
                className={`rail-btn ${activeRailIndex === "02" ? "active" : ""}`}
                onClick={() => scrollToSection("capability")}
                title="Capability & Outcomes"
              >
                02
              </button>
              <button
                className={`rail-btn ${activeRailIndex === "03" ? "active" : ""}`}
                onClick={() => scrollToSection("foundry")}
                title="The Mission Foundry"
              >
                03
              </button>
              <button
                className={`rail-btn ${activeRailIndex === "04" ? "active" : ""}`}
                onClick={() => scrollToSection("products")}
                title="Foundry Products"
              >
                04
              </button>
              <button
                className={`rail-btn ${activeRailIndex === "05" ? "active" : ""}`}
                onClick={() => scrollToSection("news")}
                title="News & Manifest"
              >
                05
              </button>
              <span className="rail-active">{activeRailIndex}</span>
            </>
          ) : (
            <>
              <Link to="/" className="rail-btn" title="Overview">
                01
              </Link>
              <Link
                to="/systems"
                className={`rail-btn ${location.pathname === "/systems" ? "active" : ""}`}
                title="Platforms"
              >
                02
              </Link>
              <Link
                to="/infrastructure"
                className={`rail-btn ${location.pathname === "/infrastructure" ? "active" : ""}`}
                title="Infrastructure"
              >
                03
              </Link>
              <Link
                to="/missions"
                className={`rail-btn ${location.pathname === "/missions" ? "active" : ""}`}
                title="Missions"
              >
                04
              </Link>
              <Link
                to="/about"
                className={`rail-btn ${location.pathname === "/about" || location.pathname === "/mission" ? "active" : ""}`}
                title="Ecosystem"
              >
                05
              </Link>
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

function SectionLabel({
  number,
  label,
  detail,
}: {
  number: string;
  label: string;
  detail?: string;
}) {
  return (
    <div className="section-label" data-reveal>
      <div className="label-top">
        <span>/{number}</span>
        <span>{label}</span>
      </div>
      <span className="label-rule" />
      {detail && <span className="label-detail">{detail}</span>}
    </div>
  );
}

interface HomeProps {
  onSelectSystem: (system: SystemItem) => void;
  onSelectResearch: (research: ResearchItem) => void;
  onSelectStage: (stage: JournalItem) => void;
  onOpenContact: () => void;
}

/* -------------------------------------------------------------------------- */
/* Proof & Metrics Strip                                                      */
/* -------------------------------------------------------------------------- */
function MetricsStrip() {
  return (
    <div className="metrics-strip" data-reveal>
      <div className="metrics-grid">
        {metricsData.map((m) => (
          <div key={m.id} className="metric-cell">
            <div className="metric-top">
              <span className="metric-num-label">/{m.number}</span>
              <span className="domain-pill">{m.unit}</span>
            </div>
            <div className="metric-value-wrap">
              <span className="metric-val">{m.value}</span>
              <span className="metric-unit">{m.unit}</span>
            </div>
            <span className="metric-label-title">{m.label}</span>
            <p className="metric-detail">{m.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Hero({ onOpenContact }: { onOpenContact: () => void }) {
  return (
    <section className="hero section-pad" id="hero">
      <div className="hero-media-wrap" data-reveal="media">
        <img
          className="hero-media"
          src={images.hero}
          alt="Launch vehicle rising through a dark sky, representing LUNE's long-term launch ambition"
        />
        <div className="hero-vignette" />
        <div className="hero-grain" />
      </div>

      <div className="hero-index">
        <SectionLabel
          number="01"
          label="NORTH STAR"
          detail="AFRICAN AEROSPACE INDUSTRY"
        />
      </div>

      <div className="hero-copy">
        <p className="eyebrow" data-reveal data-reveal-delay="1">
          LUNE / NIGERIA / DEEP TECHNOLOGY
        </p>
        <h1 data-reveal data-reveal-delay="2">
          BUILDING
          <br />
          AFRICA'S
          <br />
          <em>AEROSPACE INDUSTRY.</em>
        </h1>
        <p className="hero-description" data-reveal data-reveal-delay="3">
          A Nigerian-founded deep-technology aerospace company building
          progressively toward an integrated African space and small-satellite
          industrial capability.
        </p>
        <div
          data-reveal
          data-reveal-delay="4"
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Link className="btn-cta btn-magnetic" to="/systems">
            <span>Explore Mission Foundry</span>
            <ArrowRight size={14} />
          </Link>
          <button className="btn-outline btn-magnetic" onClick={onOpenContact}>
            <span>Contact Us</span>
          </button>
        </div>
      </div>

      {/* Muon Space Scroll Cue with Animated Bouncing Arrow */}
      <div className="vh-cue is-visible">
        <div className="vh-cap">
          <div className="vh-arr">
            <svg viewBox="0 0 14 20" fill="none" stroke="currentColor">
              <path
                d="M7 2v16M2 13l5 5 5-5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <span className="vh-txt">SCROLL</span>
      </div>

      <StatusStrip />
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Muon Space Section 2: Social Proof Partner Strip                           */
/* -------------------------------------------------------------------------- */
function TrustedLeadersStrip() {
  return (
    <section className="itemgrid--logos section-pad" id="partners">
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 clamp(20px, 4vw, 48px)" }}>
        <p className="logos-label" data-reveal>
          Trusted by sovereign leaders, space agencies & commercial operators across Africa
        </p>
        <div className="logos-grid">
          {trustedPartners.map((partner, idx) => (
            <div
              key={partner.id}
              className="logo-cell bottom-to-top"
              data-reveal
              data-reveal-delay={String((idx % 6) + 1)}
            >
              <span className="logo-acronym">{partner.acronym}</span>
              <span className="logo-cat">{partner.category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Muon Space Section 3: Proof & Stats Row with Count-Up Animations           */
/* -------------------------------------------------------------------------- */
function StatsRow() {
  return (
    <section className="stats-row" id="stats">
      <div className="stats-col bottom-to-top" data-reveal data-reveal-delay="1">
        <span className="stat-num" data-count-target="11">
          11
        </span>
        <div className="stat-content">
          Successful satellites & subsystems launched to date
        </div>
      </div>
      <div className="stats-col bottom-to-top" data-reveal data-reveal-delay="2">
        <span className="stat-num" data-count-target="6">
          6
        </span>
        <div className="stat-content">
          Unique sovereign & commercial orbital missions
        </div>
      </div>
      <div className="stats-col bottom-to-top" data-reveal data-reveal-delay="3">
        <span className="stat-num" data-count-target="148" data-count-suffix="k">
          148k
        </span>
        <div className="stat-content">
          Sq ft of manufacturing, cleanroom & test facilities
        </div>
      </div>
      <div className="stats-col bottom-to-top" data-reveal data-reveal-delay="4">
        <span className="stat-num" data-count-target="500" data-count-suffix="+">
          500+
        </span>
        <div className="stat-content">
          Annual satellite assembly, integration & test capacity
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Muon Space Section 4: Capability & Outcomes with Text Reveal & Glowing Line */
/* -------------------------------------------------------------------------- */
function CapabilityOutcomesSection({
  onOpenContact,
}: {
  onOpenContact: () => void;
}) {
  return (
    <section className="capability-section section-pad" id="capability">
      <SectionLabel
        number="02"
        label="CAPABILITY"
        detail="OUTCOMES-FOCUSED CONSTELLATIONS"
      />

      <div className="text-reveal" data-reveal>
        <p>
          <span className="rw">We</span>{" "}
          <span className="rw">do</span>{" "}
          <span className="rw">more</span>{" "}
          <span className="rw">than</span>{" "}
          <span className="rw">build</span>{" "}
          <span className="rw">satellites</span>{" "}
          <span className="rw">–</span>{" "}
          <span className="muted">
            <span className="rw">we</span>{" "}
            <span className="rw">forge</span>{" "}
            <span className="rw">high-performance</span>{" "}
            <span className="rw">constellations</span>{" "}
            <span className="rw">solving</span>{" "}
            <span className="rw">specific</span>{" "}
            <span className="rw">customer</span>{" "}
            <span className="rw">needs.</span>
          </span>
        </p>
      </div>

      <div className="line-h" />

      <div className="outcomes-box bottom-to-top" data-reveal>
        <div className="outcomes-left">
          <span className="eyebrow" style={{ color: "var(--accent)" }}>
            INTEGRATED SYSTEM
          </span>
          <h2 className="shc-h2">
            LUNE delivers
            <br />
            outcomes,
            <br />
            not widgets
          </h2>
        </div>

        <div className="outcomes-right">
          <p className="outcomes-text">
            <strong>
              It’s not enough to build a bus, or launch a sensor, or move bits
              around. <em>Impact requires action.</em>
            </strong>
          </p>
          <div className="line-h" style={{ margin: "16px 0" }} />
          <p className="outcomes-text">
            <strong>
              We design, deploy, and operate <em>customer-optimized constellations</em>{" "}
              that power sovereign action and industrial capability.
            </strong>
          </p>

          <div
            style={{
              display: "flex",
              gap: "14px",
              marginTop: "20px",
              flexWrap: "wrap",
            }}
          >
            <button className="btn-cta btn-magnetic" onClick={onOpenContact}>
              <span>Contact Us</span>
              <ArrowRight size={13} />
            </button>
            <Link className="btn-outline btn-magnetic" to="/systems">
              <span>Explore Mission Foundry</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Muon Space Section 5: The Mission Foundry Split Section                     */
/* -------------------------------------------------------------------------- */
function FoundrySplitSection() {
  return (
    <section className="split-section section-pad" id="foundry">
      <div className="split-media bottom-to-top" data-reveal>
        <img
          src={images.cleanroom}
          alt="Cleanroom technician working with satellite hardware in high-precision laboratory"
        />
      </div>

      <div className="split-body bottom-to-top" data-reveal data-reveal-delay="2">
        <SectionLabel
          number="03"
          label="THE MISSION FOUNDRY"
          detail="INTEGRATED PLATFORM"
        />
        <h2 className="split-headline">
          LUNE forges constellations from proven building blocks, sovereign
          infrastructure, and aerospace expertise to solve Africa’s hardest
          challenges.
        </h2>
        <div>
          <Link className="arrow-link" to="/systems">
            <span>About the Foundry</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Muon Space Section 6: Six Foundry Pillars Grid                             */
/* -------------------------------------------------------------------------- */
function SixPillarsSection() {
  return (
    <section className="pillars-section section-pad" id="pillars">
      <div className="section-intro">
        <SectionLabel
          number="03A"
          label="OUR PILLARS"
          detail="ARCHITECTURAL FOUNDATION"
        />
        <div className="intro-copy" data-reveal>
          <p className="display-title">
            SIX FOUNDRY
            <br />
            PILLARS.
          </p>
          <p className="body-copy">
            The modular, field-tested architectural building blocks we forge
            complete satellite constellations from.
          </p>
        </div>
      </div>

      <div className="pillars-grid">
        {foundryPillars.map((pillar, idx) => (
          <div
            key={pillar.id}
            className="pillar-card bottom-to-top"
            data-reveal
            data-reveal-delay={String((idx % 3) + 1)}
          >
            <div>
              <span className="pillar-num">{pillar.number} // FOUNDRY</span>
              <h4>{pillar.title}</h4>
            </div>
            <p>{pillar.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Muon Space Section 7: What the Foundry is Built On (Products Grid)         */
/* -------------------------------------------------------------------------- */
function WhatFoundryIsBuiltOnSection() {
  return (
    <section className="section-products section-pad" id="products">
      <div className="section-intro">
        <SectionLabel
          number="03B"
          label="PRODUCTS"
          detail="INTEGRATED MISSION STACK"
        />
        <div className="intro-copy" data-reveal>
          <p className="display-title">
            WHAT THE FOUNDRY
            <br />
            IS BUILT ON.
          </p>
          <p className="body-copy">
            Spacecraft, payloads, operations, global connectivity, and data
            delivery — purpose-built to work as one integrated system. Less
            risk, higher performance, faster timelines.
          </p>
          <div style={{ marginTop: "16px" }}>
            <Link className="arrow-link" to="/systems">
              <span>Learn More</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      <div className="product-cards">
        {foundryProducts.map((prod, idx) => (
          <Link
            key={prod.id}
            to={prod.link}
            className="prod-card bottom-to-top"
            data-reveal
            data-reveal-delay={String((idx % 3) + 1)}
          >
            <div className="prod-card-media">
              <img src={prod.image} alt={prod.title} />
            </div>
            <div className="prod-card-body">
              <h3 className="prod-card-title">{prod.title}</h3>
              <p className="prod-card-desc">{prod.subtitle || prod.description}</p>
              <span className="prod-card-link">
                <span>Explore Platform</span>
                <ArrowRight size={12} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Muon Space Section 8: News & Latest Missions Grid                          */
/* -------------------------------------------------------------------------- */
function NewsAndMissionsSection() {
  return (
    <section className="news-section section-pad" id="news">
      <div className="line-h" style={{ marginBottom: "64px" }} />
      <div className="section-intro">
        <SectionLabel
          number="04"
          label="NEWS & INSIGHTS"
          detail="MISSION IMPACT"
        />
        <div className="intro-copy" data-reveal>
          <p className="display-title">
            OUR LATEST MISSIONS
            <br />
            DELIVERING IMPACT.
          </p>
          <p className="body-copy">
            Discover our recent milestones, flight software qualifications, and
            sovereign space infrastructure developments.
          </p>
        </div>
      </div>

      <div className="news-grid">
        {newsArticles.map((article, idx) => (
          <article
            key={article.id}
            className="news-card bottom-to-top"
            data-reveal
            data-reveal-delay={String((idx % 3) + 1)}
          >
            <div className="news-media">
              <img src={article.image} alt={article.title} />
            </div>
            <div className="news-body">
              <div className="news-meta">
                <span className="news-tag">{article.category}</span>
                <span className="news-date">{article.date}</span>
              </div>
              <h4 className="news-title">{article.title}</h4>
              <p className="news-excerpt">{article.excerpt}</p>
              <Link
                className="arrow-link"
                to={article.link}
                style={{ marginTop: "auto" }}
              >
                <span>Read More</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div style={{ marginTop: "36px" }} data-reveal>
        <Link className="btn-outline btn-magnetic" to="/missions">
          <span>Read the Latest</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Customer Personas & Operational Sectors                                    */
/* -------------------------------------------------------------------------- */
function SectorsSection({ onOpenContact }: { onOpenContact: () => void }) {
  return (
    <section className="sectors-section section-pad" id="sectors">
      <div className="section-intro">
        <SectionLabel
          number="01B"
          label="OPERATIONAL SECTORS"
          detail="TARGET AUDIENCES"
        />
        <div className="intro-copy" data-reveal>
          <p className="display-title">
            MISSION-DRIVEN
            <br />
            ARCHITECTURE.
          </p>
          <p className="body-copy">
            LUNE develops small satellites, hardened avionics, and manufacturing
            capacity tailored specifically for commercial operators, civil Earth
            observation, sovereign defense, and academic research.
          </p>
        </div>
      </div>

      <div className="sectors-grid">
        {operationalSectors.map((sector) => (
          <article key={sector.id} className="sector-card" data-reveal>
            <div className="sector-meta">
              <span className="sector-number">SECTOR /{sector.number}</span>
              <span className="domain-pill">{sector.id.toUpperCase()}</span>
            </div>
            <div>
              <h3 className="sector-title">{sector.title}</h3>
              <span className="sector-subtitle">{sector.subtitle}</span>
            </div>
            <p className="sector-desc">{sector.description}</p>
            <ul className="sector-deliverables">
              {sector.deliverables.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <button className="sector-cta" onClick={onOpenContact}>
              {sector.engagementPath} <ArrowRight size={13} />
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function SystemsSection({
  onSelectSystem,
}: {
  onSelectSystem: (system: SystemItem) => void;
}) {
  return (
    <section className="systems-section section-pad" id="systems">
      <div className="section-intro">
        <SectionLabel
          number="02"
          label="CAPABILITY STACK"
          detail="BUILD PROGRESSIVELY"
        />
        <div className="intro-copy" data-reveal>
          <p className="display-title">
            CAPABILITY
            <br />
            COMPOUNDS.
          </p>
          <p className="body-copy">
            LUNE begins with achievable small-satellite capability and uses each
            generation of knowledge, hardware and operations as the foundation
            for the next.
          </p>
        </div>
      </div>

      <div className="system-grid">
        {systems.map((system, idx) => (
          <article
            className="system-entry"
            key={system.number}
            data-reveal
            data-reveal-delay={String((idx % 4) + 1)}
            onClick={() => onSelectSystem(system)}
            title={`Inspect ${system.title} dossier`}
          >
            <div className="system-image-wrap">
              <img src={system.image} alt={system.title} />
              <span className="image-index">{system.number}</span>
            </div>
            <div className="system-meta">
              <span>{system.number}</span>
              <h3>{system.title}</h3>
            </div>
            <p>{system.description}</p>
            <span className="entry-arrow">
              <ArrowDownRight size={15} />
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}

function FeaturedSystem({
  onSelectSystem,
}: {
  onSelectSystem?: (system: SystemItem) => void;
}) {
  return (
    <section className="featured section-pad" id="featured">
      <SectionLabel number="02A" label="ENTRY POINT" detail="CUBESATS" />
      <div className="featured-frame" data-reveal="media">
        <img
          src={images.platform}
          alt="CubeSat spacecraft representing LUNE's practical entry point into space hardware"
        />
        <div className="featured-overlay" />

        {/* Interactive Spacecraft Hotspots telemetry */}
        <SpacecraftHotspots />

        <div className="featured-title" data-reveal data-reveal-delay="1">
          <span className="micro-label">
            CUBESAT → SMALL SATELLITE → SPACECRAFT
          </span>
          <h2>
            START
            <br />
            WITH SPACE SYSTEMS
          </h2>
        </div>
        <div className="featured-specs" data-reveal data-reveal-delay="2">
          <div>
            <span className="micro-label">STATUS</span>
            <strong>EARLY PRACTICAL PLATFORM</strong>
          </div>
          <div>
            <span className="micro-label">DOMAIN</span>
            <strong>ENGINEERING + OPERATIONS</strong>
          </div>
          {onSelectSystem ? (
            <button
              className="text-link"
              onClick={() => onSelectSystem(systems[0])}
              style={{
                background: "transparent",
                border: 0,
                padding: 0,
                cursor: "pointer",
              }}
            >
              EXPLORE DOSSIER <ArrowRight size={14} />
            </button>
          ) : (
            <Link className="text-link" to="/systems">
              EXPLORE CAPABILITIES <ArrowRight size={14} />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* The LUNE Foundry / Commercial Solutions                                    */
/* -------------------------------------------------------------------------- */
function FoundrySection({ onOpenContact }: { onOpenContact: () => void }) {
  return (
    <section className="foundry-section section-pad" id="solutions">
      <div className="section-intro">
        <SectionLabel
          number="02B"
          label="THE LUNE FOUNDRY"
          detail="COMMERCIAL SOLUTIONS"
        />
        <div className="intro-copy" data-reveal>
          <p className="display-title">
            DELIVERING
            <br />
            OUTCOMES.
          </p>
          <p className="body-copy">
            From standardized CubeSat bus platforms to hosted sensor
            integration, cleanroom qualification, and automated telemetry
            downlink.
          </p>
        </div>
      </div>

      <div className="offerings-grid">
        {foundryOfferings.map((offering) => (
          <article key={offering.id} className="offering-card" data-reveal>
            <div className="flex items-center justify-between">
              <span className="offering-code">{offering.code}</span>
              <span className="domain-pill">COMMERCIAL</span>
            </div>
            <div>
              <h3 className="offering-title">{offering.title}</h3>
              <span className="offering-tagline">{offering.tagline}</span>
            </div>
            <p className="offering-desc">{offering.description}</p>
            <ul className="offering-caps">
              {offering.capabilities.map((cap, i) => (
                <li key={i}>{cap}</li>
              ))}
            </ul>
            <button
              className="text-link"
              onClick={onOpenContact}
              style={{
                background: "transparent",
                border: 0,
                padding: "8px 0",
                cursor: "pointer",
                marginTop: "auto",
              }}
            >
              INQUIRE ON {offering.code} <ArrowRight size={13} />
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Physical Infrastructure & Testing Preview                                  */
/* -------------------------------------------------------------------------- */
function InfrastructureHomeSection() {
  return (
    <section className="infrastructure-home section-pad" id="infrastructure">
      <div className="section-intro">
        <SectionLabel
          number="03"
          label="INFRASTRUCTURE"
          detail="ABUJA FACILITY / QUALIFICATION"
        />
        <div className="intro-copy" data-reveal>
          <p className="display-title">
            SOVEREIGN
            <br />
            TEST RIGS.
          </p>
          <p className="body-copy">
            Cleanroom satellite integration, vacuum thermal cycling, multi-axis
            dynamic vibration, and additive aerospace metallurgy under one roof
            in Abuja.
          </p>
        </div>
      </div>

      <div className="facility-grid">
        {facilitySpecs.slice(0, 2).map((fac) => (
          <article key={fac.id} className="facility-card" data-reveal>
            <div className="flex items-center justify-between">
              <span className="facility-code">{fac.code}</span>
              <span className="domain-pill">QUALIFIED</span>
            </div>
            <div>
              <h3 className="facility-name">{fac.name}</h3>
              <span className="facility-class">{fac.classification}</span>
            </div>
            <p className="facility-desc">{fac.description}</p>
            <ul className="facility-specs-list">
              {fac.specs.map((spec, i) => (
                <li key={i}>{spec}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div style={{ marginTop: "28px" }} data-reveal>
        <Link className="text-link" to="/infrastructure">
          VIEW COMPLETE FACILITY SPECIFICATIONS & TEST REGIMES{" "}
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Orbital Missions Manifest & Flight Logs                                    */
/* -------------------------------------------------------------------------- */
function MissionsManifestSection({
  onSelectStage,
  onOpenContact,
}: {
  onSelectStage: (stage: JournalItem) => void;
  onOpenContact: () => void;
}) {
  return (
    <section className="manifest-section section-pad" id="missions">
      <div className="section-intro">
        <SectionLabel
          number="04"
          label="MISSIONS"
          detail="ORBITAL MANIFEST & HERITAGE"
        />
        <div className="intro-copy" data-reveal>
          <p className="display-title">
            FLIGHT
            <br />
            MANIFEST.
          </p>
          <p className="body-copy">
            Scheduled flights, active pathfinders, and mission profiles
            establishing sovereign orbital operations across Africa.
          </p>
        </div>
      </div>

      <div className="manifest-grid">
        {missionsManifest.map((mission) => (
          <article key={mission.id} className="manifest-card" data-reveal>
            <div className="manifest-header">
              <div>
                <span className="manifest-desig">
                  {mission.designation} // MANIFEST
                </span>
                <h3 className="manifest-name">{mission.name}</h3>
              </div>
              <span className={`manifest-badge ${mission.statusType}`}>
                <span className="status-beacon" />
                {mission.status}
              </span>
            </div>

            <p className="manifest-summary">{mission.summary}</p>

            <div className="manifest-specs">
              {mission.keySpecs.map((spec, idx) => (
                <div key={idx} className="manifest-spec-item">
                  <span className="manifest-spec-label">{spec.label}</span>
                  <span className="manifest-spec-value">{spec.value}</span>
                </div>
              ))}
            </div>

            <div
              className="flex items-center justify-between"
              style={{ marginTop: "auto", paddingTop: "8px" }}
            >
              <span className="micro-label">
                WINDOW: {mission.launchWindow}
              </span>
              <button
                className="text-link"
                onClick={onOpenContact}
                style={{
                  background: "transparent",
                  border: 0,
                  padding: 0,
                  cursor: "pointer",
                }}
              >
                PAYLOAD INQUIRY <ArrowRight size={13} />
              </button>
            </div>
          </article>
        ))}
      </div>

      <div
        style={{
          marginTop: "32px",
          display: "flex",
          gap: "28px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
        data-reveal
      >
        <Link className="text-link" to="/missions">
          EXPLORE COMPLETE MISSION LOG & GROUND TRACKING{" "}
          <ArrowRight size={14} />
        </Link>
        <button
          className="text-link"
          onClick={() => onSelectStage(journalItems[0])}
          style={{
            background: "transparent",
            border: 0,
            padding: 0,
            cursor: "pointer",
          }}
        >
          INSPECT INDUSTRIAL ROADMAP <ArrowRight size={14} />
        </button>
      </div>
    </section>
  );
}

function ResearchSection({
  onSelectResearch,
}: {
  onSelectResearch: (research: ResearchItem) => void;
}) {
  return (
    <section className="research section-pad" id="research">
      <div className="research-head">
        <SectionLabel number="04B" label="RESEARCH" detail="THE LONG HORIZON" />
        <div data-reveal>
          <h2 className="display-title">
            RESEARCH FOR
            <br />
            THE NEXT LAYER.
          </h2>
        </div>
      </div>

      <div className="research-index">
        {researchItems.map((item, idx) => (
          <article
            className="research-row"
            key={item.number}
            data-reveal
            data-reveal-delay={String((idx % 4) + 1)}
            onClick={() => onSelectResearch(item)}
            title={`View research briefing: ${item.title}`}
          >
            <span className="row-number">{item.number}</span>
            <div className="row-title">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
            <span className="row-meta">{item.meta}</span>
            <ArrowRight className="row-arrow" size={17} />
          </article>
        ))}
      </div>
    </section>
  );
}

function Ecosystem() {
  return (
    <section className="ecosystem section-pad" id="ecosystem">
      <div className="eco-aside">
        <SectionLabel number="05" label="ECOSYSTEM" detail="NIGERIA / AFRICA" />
      </div>
      <div className="eco-content">
        <p className="display-title" data-reveal>
          KNOWLEDGE INTO
          <br />
          INDUSTRY.
        </p>
        <div className="eco-grid">
          <p className="body-copy" data-reveal data-reveal-delay="1">
            LUNE connects education, research, engineering, manufacturing and
            commercialization into a continuous pipeline for increasingly
            capable African space systems.
          </p>
          <div className="eco-mark" data-reveal data-reveal-delay="2">
            <span className="micro-label">ECOSYSTEM INITIATIVE</span>
            <strong>PAUSN</strong>
            <span>Pan-African University Space Network</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="about section-pad" id="about">
      <SectionLabel
        number="05B"
        label="DEVELOPMENT PHILOSOPHY"
        detail="CAPABILITY BEFORE COMPLEXITY"
      />
      <div className="about-statement" data-reveal>
        <h2>
          DO NOT BUILD
          <br />
          THE ENTIRE STACK
          <br />
          <em>AT ONCE.</em>
        </h2>
        <p>
          Learn. Build. Operate. Integrate. Then develop propulsion, launch
          and reusable systems as the industrial base, safety discipline and
          mission economics justify them.
        </p>
      </div>
    </section>
  );
}

function Contact({ onOpenContact }: { onOpenContact: () => void }) {
  return (
    <section className="contact section-pad" id="contact">
      <div className="contact-inner" data-reveal>
        <SectionLabel
          number="06"
          label="CONTACT"
          detail="RESEARCH / ENGINEERING / PARTNERSHIPS"
        />
        <h2>
          BUILD
          <br />
          CAPABILITY
          <br />
          <em>TOGETHER.</em>
        </h2>
        <p>
          For commercial satellite bus procurement, hosted payload integration,
          environmental testing facility booking, and PAUSN academic programs.
        </p>
        <button
          className="text-link"
          onClick={onOpenContact}
          style={{
            background: "transparent",
            border: 0,
            padding: 0,
            cursor: "pointer",
          }}
        >
          ESTABLISH TELEMETRY CONTACT <ArrowRight size={14} />
        </button>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Muon Space Section 9: Prefooter Call-To-Action Banner                      */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/* SpaceX-Style Minimalist Footer                                              */
/* -------------------------------------------------------------------------- */
function SpaceXFooter({ onOpenContact }: { onOpenContact?: () => void }) {
  return (
    <footer className="spacex-footer" role="contentinfo">
      <div className="spacex-footer-inner">
        <span className="spacex-footer-copy">LUNE © 2026</span>
        <ul className="spacex-footer-links">
          <li>
            <Link to="/systems">PLATFORMS</Link>
          </li>
          <li>
            <Link to="/infrastructure">INFRASTRUCTURE</Link>
          </li>
          <li>
            <Link to="/missions">MISSIONS</Link>
          </li>
          <li>
            <Link to="/research">RESEARCH</Link>
          </li>
          <li>
            <Link to="/about">ABOUT</Link>
          </li>
          <li>
            <Link to="/about#careers">CAREERS</Link>
          </li>
          <li>
            <Link to="/about#privacy">PRIVACY POLICY</Link>
          </li>
          <li>
            {onOpenContact ? (
              <button type="button" onClick={onOpenContact}>
                CONTACT
              </button>
            ) : (
              <Link to="/contact">CONTACT</Link>
            )}
          </li>
        </ul>
      </div>
    </footer>
  );
}

function SiteFooter({ onOpenContact }: { onOpenContact?: () => void }) {
  return <SpaceXFooter onOpenContact={onOpenContact} />;
}

function Footer({ onOpenContact }: { onOpenContact?: () => void }) {
  return <SpaceXFooter onOpenContact={onOpenContact} />;
}

function Home({
  onSelectSystem,
  onSelectResearch,
  onSelectStage,
  onOpenContact,
}: HomeProps) {
  return (
    <>
      <Hero onOpenContact={onOpenContact} />
      <TrustedLeadersStrip />
      <StatsRow />
      <CapabilityOutcomesSection onOpenContact={onOpenContact} />
      <FoundrySplitSection />
      <SixPillarsSection />
      <WhatFoundryIsBuiltOnSection />
      <NewsAndMissionsSection />
      <FeaturedSystem onSelectSystem={onSelectSystem} />
      <SectorsSection onOpenContact={onOpenContact} />
      <InfrastructureHomeSection />
      <MissionsManifestSection
        onSelectStage={onSelectStage}
        onOpenContact={onOpenContact}
      />
      <ResearchSection onSelectResearch={onSelectResearch} />
      <Ecosystem />
      <AboutSection />
      <SpaceXFooter onOpenContact={onOpenContact} />
    </>
  );
}

function InteriorPageHero({
  number,
  label,
  title,
  description,
  image,
}: {
  number: string;
  label: string;
  title: React.ReactNode;
  description: string;
  image: string;
}) {
  return (
    <section className="interior-hero section-pad">
      <div className="interior-copy" data-reveal>
        <SectionLabel number={number} label={label} detail="LUNE / NIGERIA" />
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div className="interior-image" data-reveal="media">
        <img src={image} alt={label} />
        <div className="hero-vignette" />
      </div>
    </section>
  );
}

/* Dedicated Platforms & Systems Page */
function SystemsPage({
  onSelectSystem,
  onOpenContact,
}: {
  onSelectSystem: (system: SystemItem) => void;
  onOpenContact: () => void;
}) {
  return (
    <>
      <InteriorPageHero
        number="01"
        label="PLATFORMS & SYSTEMS"
        title={
          <>
            FROM CUBESATS
            <br />
            TO INTEGRATED
            <br />
            <em>INFRASTRUCTURE.</em>
          </>
        }
        description="Modular, flight-ready CubeSat (3U, 6U, 12U) and 150kg SmallSat platforms engineered for sovereign communications, Earth observation, and responsive manufacturing."
        image={images.platform}
      />

      {/* Technical Specifications Matrix */}
      <section className="section-pad" id="specs">
        <SectionLabel
          number="01A"
          label="SPECIFICATIONS MATRIX"
          detail="BUS COMPARISON"
        />
        <div data-reveal style={{ marginTop: "20px" }}>
          <h2 className="display-title">
            PLATFORM
            <br />
            PARAMETERS.
          </h2>
          <p className="body-copy">
            Detailed performance parameters across LUNE standard satellite bus
            form factors.
          </p>
        </div>

        <div className="spec-matrix-wrap" data-reveal>
          <table className="spec-matrix">
            <thead>
              <tr>
                <th>Parameter</th>
                <th>3U CubeSat Class</th>
                <th>6U / 12U CubeSat Class</th>
                <th>150kg SmallSat Platform</th>
              </tr>
            </thead>
            <tbody>
              {platformSpecTable.map((row, i) => (
                <tr key={i}>
                  <td className="spec-param">{row.parameter}</td>
                  <td>{row.cubesat3U}</td>
                  <td>{row.cubesat6U12U}</td>
                  <td style={{ color: "var(--accent)" }}>{row.smallsat150kg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Subsystem Dossiers */}
      <SystemsSection onSelectSystem={onSelectSystem} />
      <FeaturedSystem onSelectSystem={onSelectSystem} />

      {/* Downloadable / Inquiry Payload User Guide */}
      <section className="section-pad">
        <div
          className="contact-detail-box"
          data-reveal
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            border: "1px solid var(--accent)",
            background: "rgba(154,138,90,0.06)",
          }}
        >
          <span className="micro-label">
            PAYLOAD USER'S GUIDE (PUG) // VERSION 2.4
          </span>
          <h3 style={{ fontSize: "20px", margin: 0 }}>
            Ready to integrate a sensor, instrument, or optical payload?
          </h3>
          <p style={{ fontSize: "13px", color: "var(--muted)", margin: 0 }}>
            Request mechanical interface control documents (ICD), power budget
            worksheets, and SpaceWire telemetry protocols.
          </p>
          <button
            className="header-cta-btn"
            onClick={onOpenContact}
            style={{ alignSelf: "flex-start", marginTop: "8px" }}
          >
            REQUEST PAYLOAD USER'S GUIDE <ArrowRight size={12} />
          </button>
        </div>
      </section>

      <SpaceXFooter onOpenContact={onOpenContact} />
    </>
  );
}

/* Dedicated Physical Infrastructure Page */
function InfrastructurePage({
  onOpenContact,
}: {
  onOpenContact: () => void;
}) {
  return (
    <>
      <InteriorPageHero
        number="02"
        label="PHYSICAL INFRASTRUCTURE"
        title={
          <>
            SOVEREIGN
            <br />
            INTEGRATION
            <br />
            <em>& TEST LABS.</em>
          </>
        }
        description="LUNE is building indigenous aerospace infrastructure in Abuja: ISO Class 7 cleanrooms, vacuum thermal cycling, 20 kN shaker tables, and laser powder-bed metallurgy."
        image={images.manufacturing}
      />

      <section className="section-pad" id="overview">
        <SectionLabel
          number="02A"
          label="FACILITIES"
          detail="ABUJA INTEGRATION CAMPUS"
        />
        <div data-reveal style={{ marginTop: "20px" }}>
          <h2 className="display-title">
            QUALIFIED BEFORE
            <br />
            INSERTION.
          </h2>
          <p className="body-copy">
            Every satellite bus, avionics bay, and rocket component undergoes
            rigorous qualification matching ECSS and NASA GEVS environmental test
            standards before orbital deployment.
          </p>
        </div>

        <div className="facility-grid">
          {facilitySpecs.map((fac) => (
            <article key={fac.id} className="facility-card" data-reveal>
              <div className="flex items-center justify-between">
                <span className="facility-code">{fac.code}</span>
                <span className="domain-pill">OPERATIONAL</span>
              </div>
              <div>
                <h3 className="facility-name">{fac.name}</h3>
                <span className="facility-class">{fac.classification}</span>
              </div>
              <p className="facility-desc">{fac.description}</p>
              <ul className="facility-specs-list">
                {fac.specs.map((spec, i) => (
                  <li key={i}>{spec}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section-pad">
        <SectionLabel
          number="02B"
          label="CONTRACT QUALIFICATION"
          detail="FACILITY ACCESS"
        />
        <div
          className="contact-detail-box"
          data-reveal
          style={{ marginTop: "24px" }}
        >
          <span className="micro-label">THIRD-PARTY ENVIRONMENTAL TESTING</span>
          <p style={{ fontSize: "13px", color: "#a8a8a2" }}>
            Commercial aerospace companies, defense organizations, and
            university research labs can book testing time on LUNE's TVAC
            chamber and vibration shaker in Abuja.
          </p>
          <button
            className="text-link"
            onClick={onOpenContact}
            style={{
              background: "transparent",
              border: 0,
              padding: 0,
              cursor: "pointer",
            }}
          >
            SCHEDULE FACILITY INSPECTION / BOOKING <ArrowRight size={14} />
          </button>
        </div>
      </section>

      <SpaceXFooter onOpenContact={onOpenContact} />
    </>
  );
}

/* Dedicated Missions & Flight Log Page */
function MissionsPage({
  onSelectStage,
  onOpenContact,
}: {
  onSelectStage: (stage: JournalItem) => void;
  onOpenContact: () => void;
}) {
  return (
    <>
      <InteriorPageHero
        number="03"
        label="ORBITAL MISSIONS"
        title={
          <>
            ORBITAL
            <br />
            FLIGHT
            <br />
            <em>MANIFEST.</em>
          </>
        }
        description="Track LUNE's active flight pathfinders, scheduled satellite deployments, and telemetry station operations establishing African orbital heritage."
        image={images.darkRocket}
      />

      <section className="section-pad" id="manifest">
        <SectionLabel
          number="03A"
          label="SCHEDULED MANIFEST"
          detail="FLIGHT SCHEDULE"
        />
        <div data-reveal style={{ marginTop: "20px" }}>
          <h2 className="display-title">
            SCHEDULED
            <br />
            MISSIONS.
          </h2>
        </div>

        <div className="manifest-grid">
          {missionsManifest.map((mission) => (
            <article key={mission.id} className="manifest-card" data-reveal>
              <div className="manifest-header">
                <div>
                  <span className="manifest-desig">
                    {mission.designation} // MANIFEST
                  </span>
                  <h3 className="manifest-name">{mission.name}</h3>
                </div>
                <span className={`manifest-badge ${mission.statusType}`}>
                  <span className="status-beacon" />
                  {mission.status}
                </span>
              </div>

              <p className="manifest-summary">{mission.summary}</p>

              <div className="manifest-specs">
                {mission.keySpecs.map((spec, idx) => (
                  <div key={idx} className="manifest-spec-item">
                    <span className="manifest-spec-label">{spec.label}</span>
                    <span className="manifest-spec-value">{spec.value}</span>
                  </div>
                ))}
              </div>

              <div
                className="flex items-center justify-between"
                style={{ marginTop: "auto", paddingTop: "8px" }}
              >
                <span className="micro-label">
                  WINDOW: {mission.launchWindow}
                </span>
                <button
                  className="text-link"
                  onClick={onOpenContact}
                  style={{
                    background: "transparent",
                    border: 0,
                    padding: 0,
                    cursor: "pointer",
                  }}
                >
                  RESERVE PAYLOAD SLOT <ArrowRight size={13} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Industrial Roadmap Stages */}
      <section className="section-pad" id="roadmap">
        <SectionLabel
          number="03B"
          label="INDUSTRIAL ROADMAP"
          detail="LONG-TERM EVOLUTION"
        />
        <div data-reveal style={{ marginTop: "20px" }}>
          <h2 className="display-title">
            SEQUENTIAL
            <br />
            CAPABILITY.
          </h2>
          <p className="body-copy">
            The sequential stages through which LUNE expands from CubeSat
            operations to dedicated sovereign launch capability.
          </p>
        </div>

        <div className="journal-grid" style={{ marginTop: "32px" }}>
          {journalItems.map((item, idx) => (
            <article
              className="journal-item"
              key={item.id}
              data-reveal
              data-reveal-delay={String((idx % 3) + 1)}
              onClick={() => onSelectStage(item)}
              title="Inspect roadmap deliverables"
            >
              <div>
                <span className="micro-label">{item.category}</span>
                <h3>{item.title}</h3>
              </div>
              <div className="journal-foot">
                <span>{item.timeline}</span>
                <span className="domain-pill">{item.status}</span>
                <ArrowRight size={15} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <SpaceXFooter onOpenContact={onOpenContact} />
    </>
  );
}

/* Dedicated Research Page */
function ResearchPage({
  onSelectResearch,
  onOpenContact,
}: {
  onSelectResearch: (research: ResearchItem) => void;
  onOpenContact: () => void;
}) {
  return (
    <>
      <InteriorPageHero
        number="04"
        label="RESEARCH & DEEP TECHNOLOGY"
        title={
          <>
            ENGINEERING
            <br />
            THE
            <br />
            <em>UNKNOWN.</em>
          </>
        }
        description="R&D spans spacecraft bus architecture, radiation-tolerant avionics, RF spectrum sensing, onboard neuromorphic inference, and advanced aerospike propulsion simulation."
        image={images.manufacturing}
      />
      <ResearchSection onSelectResearch={onSelectResearch} />
      <SpaceXFooter onOpenContact={onOpenContact} />
    </>
  );
}

/* Dedicated Ecosystem & Industrial Thesis Page */
function AboutPage({ onOpenContact }: { onOpenContact: () => void }) {
  return (
    <>
      <InteriorPageHero
        number="05"
        label="ECOSYSTEM & THESIS"
        title={
          <>
            EDUCATION.
            <br />
            <em>RESEARCH.</em>
            <br />
            INDUSTRY.
          </>
        }
        description="PAUSN and LUNE connect African universities, researchers, and talent into an industrial pathway for engineered flight hardware and sovereign space operations."
        image={images.systems}
      />

      <section className="prose-section section-pad" id="thesis">
        <SectionLabel number="05A" label="INDUSTRIAL THESIS" />
        <div className="prose-grid" data-reveal>
          <h2>TECHNOLOGICAL SOVEREIGNTY, BUILT PROGRESSIVELY.</h2>
          <p>
            Build locally wherever practical and use international partnerships
            where they accelerate development. The objective is not isolation:
            it is progressively increasing sovereign African capability across
            engineering, manufacturing and operations.
          </p>
        </div>
      </section>

      <Ecosystem />
      <AboutSection />

      {/* Careers Callout */}
      <section className="section-pad">
        <div
          className="contact-detail-box"
          data-reveal
          style={{
            border: "1px solid var(--line)",
            background: "rgba(17,18,18,0.8)",
          }}
        >
          <span className="micro-label">TALENT & FELLOWSHIPS</span>
          <h3 style={{ fontSize: "20px", margin: "8px 0" }}>
            Build the next aerospace layer with LUNE.
          </h3>
          <p style={{ fontSize: "13px", color: "var(--muted)", margin: "0 0 16px" }}>
            We recruit flight software engineers, RF avionics specialists,
            cleanroom integration technicians, and PAUSN university fellows in
            Abuja.
          </p>
          <button
            className="text-link"
            onClick={onOpenContact}
            style={{
              background: "transparent",
              border: 0,
              padding: 0,
              cursor: "pointer",
            }}
          >
            APPLY FOR ENGINEERING ROLES <ArrowRight size={14} />
          </button>
        </div>
      </section>

      <SpaceXFooter onOpenContact={onOpenContact} />
    </>
  );
}

/* Dedicated Contact Page */
function ContactPage({ onOpenContact }: { onOpenContact: () => void }) {
  return (
    <>
      <InteriorPageHero
        number="06"
        label="COMMUNICATIONS & INQUIRIES"
        title={
          <>
            BUILD THE
            <br />
            NEXT
            <br />
            <em>LAYER.</em>
          </>
        }
        description="Collaborate on small-satellite platform procurement, hosted sensor integration, cleanroom testing facilities, or PAUSN university consortium research."
        image={images.hero}
      />

      <section className="contact-detail section-pad">
        <div
          className="contact-detail-box"
          data-reveal
          data-reveal-delay="1"
          onClick={onOpenContact}
          style={{ cursor: "pointer", border: "1px solid var(--accent)" }}
        >
          <span className="micro-label">PRIMARY DISPATCH // INQUIRIES</span>
          <span
            style={{
              color: "var(--accent)",
              fontSize: "16px",
              fontWeight: 550,
            }}
          >
            Open Transmission Terminal →
          </span>
          <p style={{ fontSize: "12px", color: "var(--muted)", margin: "8px 0 0" }}>
            Direct encrypted inquiry channel for RFQs, testing bookings, and
            PAUSN academic agreements.
          </p>
        </div>

        <div className="contact-detail-box" data-reveal data-reveal-delay="2">
          <span className="micro-label">PRIMARY HEADQUARTERS</span>
          <span style={{ fontSize: "16px", fontWeight: 550, color: "var(--text)" }}>
            ABUJA / NIGERIA
          </span>
          <p style={{ fontSize: "12px", color: "var(--muted)", margin: "8px 0 0" }}>
            Cleanroom Integration Bay & Testing Campus, Federal Capital
            Territory.
          </p>
        </div>
      </section>

      <SpaceXFooter onOpenContact={onOpenContact} />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* ROOT APPLICATION COMPONENT                                                 */
/* -------------------------------------------------------------------------- */
function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [activeSystem, setActiveSystem] = useState<SystemItem | null>(null);
  const [activeResearch, setActiveResearch] = useState<ResearchItem | null>(null);
  const [activeStage, setActiveStage] = useState<JournalItem | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("01");

  // Global Lenis smooth momentum scroll instance
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    (window as any).__lenis = lenis;

    return () => {
      lenis.destroy();
      delete (window as any).__lenis;
    };
  }, []);

  // Global Cmd+K / Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Homepage scrollspy section tracker
  useEffect(() => {
    const sectionIds = [
      { id: "hero", num: "01" },
      { id: "capability", num: "02" },
      { id: "foundry", num: "03" },
      { id: "products", num: "04" },
      { id: "news", num: "05" },
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i].num);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Layout
      onOpenSearch={() => setPaletteOpen(true)}
      onOpenContact={() => setContactOpen(true)}
      activeSection={activeSection}
    >
      <Routes>
        <Route
          path="/"
          element={
            <Home
              onSelectSystem={setActiveSystem}
              onSelectResearch={setActiveResearch}
              onSelectStage={setActiveStage}
              onOpenContact={() => setContactOpen(true)}
            />
          }
        />
        <Route
          path="/systems"
          element={
            <SystemsPage
              onSelectSystem={setActiveSystem}
              onOpenContact={() => setContactOpen(true)}
            />
          }
        />
        <Route
          path="/infrastructure"
          element={
            <InfrastructurePage
              onOpenContact={() => setContactOpen(true)}
            />
          }
        />
        <Route
          path="/missions"
          element={
            <MissionsPage
              onSelectStage={setActiveStage}
              onOpenContact={() => setContactOpen(true)}
            />
          }
        />
        <Route
          path="/research"
          element={
            <ResearchPage
              onSelectResearch={setActiveResearch}
              onOpenContact={() => setContactOpen(true)}
            />
          }
        />
        <Route
          path="/about"
          element={<AboutPage onOpenContact={() => setContactOpen(true)} />}
        />
        <Route
          path="/mission"
          element={<AboutPage onOpenContact={() => setContactOpen(true)} />}
        />
        <Route
          path="/contact"
          element={<ContactPage onOpenContact={() => setContactOpen(true)} />}
        />
        <Route
          path="*"
          element={
            <Home
              onSelectSystem={setActiveSystem}
              onSelectResearch={setActiveResearch}
              onSelectStage={setActiveStage}
              onOpenContact={() => setContactOpen(true)}
            />
          }
        />
      </Routes>

      {/* Global Interactive Modals and Drawers */}
      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onSelectSystem={setActiveSystem}
        onSelectResearch={setActiveResearch}
        onSelectStage={setActiveStage}
      />

      <SystemDrawer
        system={activeSystem}
        onClose={() => setActiveSystem(null)}
        onSelectSystem={setActiveSystem}
      />

      <ResearchModal
        research={activeResearch}
        onClose={() => setActiveResearch(null)}
        onSelectResearch={setActiveResearch}
      />

      <RoadmapModal
        initialStage={activeStage}
        onClose={() => setActiveStage(null)}
      />

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </Layout>
  );
}

export default App;
