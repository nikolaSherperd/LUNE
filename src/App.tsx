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
  JournalItem,
  ResearchItem,
  SystemItem,
  brandAssets,
  images,
  journalItems,
  navigationItems,
  researchItems,
  systems,
} from "./data";

function useReveal() {
  const location = useLocation();
  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    const timer = setTimeout(() => {
      const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
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
          threshold: 0.08,
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
    }, 40);

    return () => {
      clearTimeout(timer);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [location.pathname]);
}

interface LayoutProps {
  children: React.ReactNode;
  onOpenSearch: () => void;
  activeSection: string;
}

function Layout({ children, onOpenSearch, activeSection }: LayoutProps) {
  useReveal();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Dynamic route titles
  useEffect(() => {
    const routeTitles: Record<string, string> = {
      "/": "LUNE — African Aerospace Industry",
      "/mission": "Vision & Mission — LUNE",
      "/systems": "Space Systems & Capabilities — LUNE",
      "/research": "Research & Deep Technology — LUNE",
      "/about": "Ecosystem & PAUSN — LUNE",
      "/contact": "Contact & Telemetry Dispatch — LUNE",
    };
    document.title = routeTitles[location.pathname] || "LUNE — African Aerospace Industry";
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
        navigationItems.findIndex((item) => item.path === location.pathname) + 1,
      ).padStart(2, "0");

  return (
    <div className="site-shell">
      <aside className="side-rail" aria-label="Primary">
        <Link className="rail-mark" to="/" aria-label="Lune home">
          <img className="rail-emblem" src={brandAssets.emblem} alt="LUNE emblem" />
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
                title="North Star"
              >
                01
              </button>
              <button
                className={`rail-btn ${activeRailIndex === "02" ? "active" : ""}`}
                onClick={() => scrollToSection("systems")}
                title="Capabilities"
              >
                02
              </button>
              <button
                className={`rail-btn ${activeRailIndex === "04" ? "active" : ""}`}
                onClick={() => scrollToSection("research")}
                title="Research"
              >
                04
              </button>
              <span className="rail-active">{activeRailIndex}</span>
            </>
          ) : (
            <>
              <span>01</span>
              <span>02</span>
              <span className="rail-active">{activeRailIndex || "01"}</span>
            </>
          )}
        </div>
      </aside>

      <header className="top-nav">
        <Link className="wordmark" to="/" aria-label="Lune">
          <img className="wordmark-logo" src={brandAssets.wordmark} alt="LUNE" />
        </Link>

        <nav className="desktop-nav">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
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
      </header>

      {mobileOpen && (
        <div className="mobile-menu">
          {navigationItems.map((item, index) => (
            <NavLink key={item.path} to={item.path} className="mobile-link">
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item.label}
              <ArrowRight size={14} />
            </NavLink>
          ))}
        </div>
      )}

      <main className="main-canvas">{children}</main>
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

function Hero() {
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
          A Nigerian-founded deep-technology company building progressively
          toward an integrated African space and aerospace industrial capability.
        </p>
        <div data-reveal data-reveal-delay="4">
          <Link className="text-link" to="/mission">
            EXPLORE THE VISION <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <StatusStrip />
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
        <SectionLabel number="02" label="CAPABILITY STACK" detail="BUILD PROGRESSIVELY" />
        <div className="intro-copy" data-reveal>
          <p className="display-title">
            CAPABILITY
            <br />
            COMPOUNDS.
          </p>
          <p className="body-copy">
            LUNE begins with achievable space-system capability and uses each
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
      <SectionLabel number="03" label="ENTRY POINT" detail="CUBESATS" />
      <div className="featured-frame" data-reveal="media">
        <img
          src={images.platform}
          alt="CubeSat spacecraft representing LUNE's practical entry point into space hardware"
        />
        <div className="featured-overlay" />

        {/* Interactive Spacecraft Hotspots telemetry */}
        <SpacecraftHotspots />

        <div className="featured-title" data-reveal data-reveal-delay="1">
          <span className="micro-label">CUBESAT → SMALL SATELLITE → SPACECRAFT</span>
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
              style={{ background: "transparent", border: 0, padding: 0, cursor: "pointer" }}
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

function ResearchSection({
  onSelectResearch,
}: {
  onSelectResearch: (research: ResearchItem) => void;
}) {
  return (
    <section className="research section-pad" id="research">
      <div className="research-head">
        <SectionLabel number="04" label="RESEARCH" detail="THE LONG HORIZON" />
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
      <SectionLabel number="06" label="DEVELOPMENT PHILOSOPHY" detail="CAPABILITY BEFORE COMPLEXITY" />
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

function Journal({
  onSelectStage,
}: {
  onSelectStage: (stage: JournalItem) => void;
}) {
  return (
    <section className="journal section-pad" id="journal">
      <div className="journal-head">
        <SectionLabel number="07" label="ROADMAP" detail="THE DEVELOPMENT PATH" />
      </div>
      <div className="journal-grid">
        {journalItems.slice(0, 3).map((item, idx) => (
          <article
            className="journal-item"
            key={item.title}
            data-reveal
            data-reveal-delay={String(idx + 1)}
            onClick={() => onSelectStage(item)}
            title="Inspect roadmap deliverables"
          >
            <div>
              <span className="micro-label">{item.category}</span>
              <h3>{item.title}</h3>
            </div>
            {item.image && (
              <img src={item.image} alt={item.title} />
            )}
            <div className="journal-foot">
              <span>{item.date}</span>
              <ArrowRight size={15} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact({ onOpenContact }: { onOpenContact: () => void }) {
  return (
    <section className="contact section-pad" id="contact">
      <div className="contact-inner" data-reveal>
        <SectionLabel number="08" label="CONTACT" detail="RESEARCH / ENGINEERING / PARTNERSHIPS" />
        <h2>
          BUILD
          <br />
          CAPABILITY
          <br />
          <em>TOGETHER.</em>
        </h2>
        <p>
          For research, engineering, manufacturing and ecosystem partnerships.
        </p>
        <button
          className="text-link"
          onClick={onOpenContact}
          style={{ background: "transparent", border: 0, padding: 0, cursor: "pointer" }}
        >
          CONTACT LUNE <ArrowRight size={14} />
        </button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer section-pad">
      <div className="footer-top">
        <Link className="footer-logo" to="/">
          LUNE
        </Link>
        <div className="footer-location">
          <span>NIGERIA</span>
          <span>AFRICA</span>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-links">
          {navigationItems.map((item) => (
            <Link key={item.path} to={item.path}>
              {item.label}
            </Link>
          ))}
        </div>
        <span>© 2026 LUNE</span>
      </div>
    </footer>
  );
}

function Home({
  onSelectSystem,
  onSelectResearch,
  onSelectStage,
  onOpenContact,
}: HomeProps) {
  return (
    <>
      <Hero />
      <SystemsSection onSelectSystem={onSelectSystem} />
      <FeaturedSystem onSelectSystem={onSelectSystem} />
      <ResearchSection onSelectResearch={onSelectResearch} />
      <Ecosystem />
      <AboutSection />
      <Journal onSelectStage={onSelectStage} />
      <Contact onOpenContact={onOpenContact} />
      <Footer />
    </>
  );
}

function InteriorPage({
  number,
  label,
  title,
  description,
  image,
  onOpenContact,
  children,
}: {
  number: string;
  label: string;
  title: React.ReactNode;
  description: string;
  image: string;
  onOpenContact: () => void;
  children?: React.ReactNode;
}) {
  return (
    <>
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
      {children}
      <Contact onOpenContact={onOpenContact} />
      <Footer />
    </>
  );
}

function MissionPage({ onOpenContact }: { onOpenContact: () => void }) {
  return (
    <InteriorPage
      number="01"
      label="VISION"
      title={
        <>
          BUILDING AN
          <br />
          AFRICAN AEROSPACE
          <br />
          <em>INDUSTRY.</em>
        </>
      }
      description="LUNE is a Nigerian-founded deep-technology company building progressively toward an indigenous African space and aerospace industrial capability."
      image={images.hero}
      onOpenContact={onOpenContact}
    >
      <section className="prose-section section-pad">
        <SectionLabel number="01A" label="INDUSTRIAL THESIS" />
        <div className="prose-grid" data-reveal>
          <h2>TECHNOLOGICAL SOVEREIGNTY, BUILT PROGRESSIVELY.</h2>
          <p>
            Build locally wherever practical and use international partnerships
            where they accelerate development. The objective is not isolation:
            it is progressively increasing capability across engineering,
            manufacturing and operations.
          </p>
        </div>
      </section>
    </InteriorPage>
  );
}

function SystemsPage({
  onSelectSystem,
  onOpenContact,
}: {
  onSelectSystem: (system: SystemItem) => void;
  onOpenContact: () => void;
}) {
  return (
    <InteriorPage
      number="02"
      label="CAPABILITIES"
      title={
        <>
          FROM CUBESATS
          <br />
          TO INTEGRATED
          <br />
          <em>INFRASTRUCTURE.</em>
        </>
      }
      description="The LUNE stack spans AI, secure hardware, embedded systems, spacecraft, manufacturing, operations and—over time—propulsion, launch and reuse."
      image={images.platform}
      onOpenContact={onOpenContact}
    >
      <SystemsSection onSelectSystem={onSelectSystem} />
      <FeaturedSystem onSelectSystem={onSelectSystem} />
    </InteriorPage>
  );
}

function ResearchPage({
  onSelectResearch,
  onOpenContact,
}: {
  onSelectResearch: (research: ResearchItem) => void;
  onOpenContact: () => void;
}) {
  return (
    <InteriorPage
      number="03"
      label="RESEARCH"
      title={
        <>
          ENGINEERING
          <br />
          THE
          <br />
          <em>UNKNOWN.</em>
        </>
      }
      description="R&D spans spacecraft architecture, avionics, RF, software, embedded systems, AI, manufacturing, materials and, later, propulsion and launch systems."
      image={images.manufacturing}
      onOpenContact={onOpenContact}
    >
      <ResearchSection onSelectResearch={onSelectResearch} />
    </InteriorPage>
  );
}

function AboutPage({ onOpenContact }: { onOpenContact: () => void }) {
  return (
    <InteriorPage
      number="04"
      label="ECOSYSTEM"
      title={
        <>
          EDUCATION.
          <br />
          <em>RESEARCH.</em>
          <br />
          INDUSTRY.
        </>
      }
      description="PAUSN and LUNE are intended to connect African universities, researchers and talent with an industrial pathway to engineered products and operational systems."
      image={images.systems}
      onOpenContact={onOpenContact}
    >
      <AboutSection />
      <Ecosystem />
    </InteriorPage>
  );
}

function ContactPage({ onOpenContact }: { onOpenContact: () => void }) {
  return (
    <InteriorPage
      number="05"
      label="CONTACT"
      title={
        <>
          BUILD THE
          <br />
          NEXT
          <br />
          <em>LAYER.</em>
        </>
      }
      description="Collaborate on research, engineering, manufacturing, space systems and the industrial ecosystem required to operate them."
      image={images.hero}
      onOpenContact={onOpenContact}
    >
      <section className="contact-detail section-pad">
        <div
          className="contact-detail-box"
          data-reveal
          data-reveal-delay="1"
          onClick={onOpenContact}
          style={{ cursor: "pointer" }}
        >
          <span className="micro-label">DISPATCH TERMINAL / INQUIRIES</span>
          <span style={{ color: "var(--accent)", fontSize: "16px", fontWeight: 500 }}>
            Open Transmission Terminal →
          </span>
        </div>
        <div className="contact-detail-box" data-reveal data-reveal-delay="2">
          <span className="micro-label">LOCATION</span>
          <span>ABUJA / NIGERIA</span>
        </div>
      </section>
    </InteriorPage>
  );
}

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
      { id: "systems", num: "02" },
      { id: "featured", num: "03" },
      { id: "research", num: "04" },
      { id: "ecosystem", num: "05" },
      { id: "about", num: "06" },
      { id: "journal", num: "07" },
      { id: "contact", num: "08" },
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
          path="/mission"
          element={<MissionPage onOpenContact={() => setContactOpen(true)} />}
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
