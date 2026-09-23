import React from "react";
import { ArrowRight, Cpu, Layers, Orbit, Radio, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionLabel, SpaceXFooter } from "../components/layout";
import { StatusStrip } from "../components/StatusStrip";
import {
  JournalItem,
  ResearchItem,
  SystemItem,
  aboutData,
  continuousCycle,
  images,
  metricsData,
  projectsData,
  systems,
  technologyData,
  trustedPartners,
} from "../data";

export interface HomeProps {
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

/* -------------------------------------------------------------------------- */
/* Trusted Partners Strip                                                     */
/* -------------------------------------------------------------------------- */
function TrustedLeadersStrip() {
  return (
    <div className="itemgrid--logos" style={{ padding: "32px 0 16px" }}>
      <p className="logos-label" data-reveal>
        Collaborating with sovereign space agencies, university consortia & commercial operators across Africa
      </p>
      <div className="logos-grid">
        {trustedPartners.slice(0, 6).map((partner, idx) => (
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
  );
}

/* -------------------------------------------------------------------------- */
/* 01 / North Star Hero Section                                               */
/* -------------------------------------------------------------------------- */
function Hero({ onOpenContact }: { onOpenContact: () => void }) {
  return (
    <section className="hero section-pad" id="hero">
      <div className="hero-media-wrap" data-reveal="media">
        <img
          className="hero-media"
          src={images.hero}
          alt="LUNE launch vehicle and orbital infrastructure"
        />
        <div className="hero-vignette" />
        <div className="hero-grain" />
      </div>

      <div className="hero-index">
        <SectionLabel
          number="01"
          label="NORTH STAR"
          detail="AFRICAN SPACE ECONOMY"
        />
      </div>

      <div className="hero-copy">
        <p className="eyebrow" data-reveal data-reveal-delay="1">
          LUNE / PAN-AFRICAN AEROSPACE & SPACE-SYSTEMS
        </p>
        <h1 data-reveal data-reveal-delay="2">
          THE INDUSTRIAL
          <br />
          FOUNDATION FOR AN
          <br />
          <em>AFRICAN SPACE ECONOMY.</em>
        </h1>
        <p className="hero-description" data-reveal data-reveal-delay="3">
          The satellite is the beginning. The real objective is enduring capability.
          LUNE is establishing the industrial foundation for an African space
          civilization through standardized modular spacecraft, flight avionics,
          and sovereign integration.
        </p>
        <div
          data-reveal
          data-reveal-delay="4"
          style={{
            display: "flex",
            gap: "14px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Link className="btn-cta btn-magnetic" to="/systems">
            <span>Explore Systems</span>
            <ArrowRight size={14} />
          </Link>
          <Link className="btn-outline btn-magnetic" to="/projects">
            <span>Flight Projects</span>
          </Link>
          <button
            className="btn-outline btn-magnetic"
            onClick={onOpenContact}
            style={{ color: "var(--accent)" }}
          >
            <span>Dispatch RFQ</span>
          </button>
        </div>
      </div>

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
      <MetricsStrip />
      <TrustedLeadersStrip />
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 02 / Systems Architecture Section                                          */
/* -------------------------------------------------------------------------- */
function SystemsOverviewSection({
  onSelectSystem,
}: {
  onSelectSystem: (system: SystemItem) => void;
}) {
  const systemIcons = [Layers, Cpu, Orbit, Wrench];

  return (
    <section className="section-pad" id="systems">
      <div className="section-intro">
        <SectionLabel
          number="02"
          label="SYSTEMS ARCHITECTURE"
          detail="STANDARDIZED FOUNDATION"
        />
        <div className="intro-copy" data-reveal>
          <p className="display-title">
            FOUR CORE
            <br />
            SYSTEMS.
          </p>
          <p className="body-copy">
            Instead of building every satellite as a completely unique machine,
            LUNE creates a common technological foundation — standardized systems
            that can be assembled, tested, upgraded, and produced at industrial scale.
          </p>
        </div>
      </div>

      <div className="ia-card-grid" style={{ marginTop: "32px" }}>
        {systems.map((sys, idx) => {
          const Icon = systemIcons[idx % systemIcons.length];
          return (
            <div
              key={sys.id}
              className="ia-feature-card bottom-to-top"
              data-reveal
              data-reveal-delay={String((idx % 3) + 1)}
            >
              <div className="ia-card-header">
                <span className="ia-badge">SYSTEM /{sys.number}</span>
                <span className="ia-badge green">{sys.detail.readinessLevel}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Icon size={20} color="var(--accent)" />
                <h3 style={{ fontSize: "18px", fontWeight: 700, margin: 0 }}>
                  {sys.title}
                </h3>
              </div>
              <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.6 }}>
                {sys.description}
              </p>
              <div style={{ marginTop: "auto", paddingTop: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Link className="arrow-link" to={`/systems#${sys.id}`}>
                  <span>Inspect Architecture</span>
                  <ArrowRight size={12} />
                </Link>
                <button
                  onClick={() => onSelectSystem(sys)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "var(--text-dim)",
                    fontSize: "11px",
                    fontFamily: "var(--font-mono)",
                    cursor: "pointer",
                    textTransform: "uppercase",
                  }}
                >
                  Quick Dossier
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: "36px" }} data-reveal>
        <Link className="btn-outline btn-magnetic" to="/systems">
          <span>Explore All Platform Specifications & Calculators</span>
          <ArrowRight size={13} />
        </Link>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 03 / Projects & Heritage Section                                           */
/* -------------------------------------------------------------------------- */
function ProjectsHighlightSection() {
  const featuredProjects = projectsData.slice(0, 3);

  return (
    <section className="section-pad" id="projects">
      <div className="section-intro">
        <SectionLabel
          number="03"
          label="PROJECTS & HERITAGE"
          detail="ORBITAL MANIFEST"
        />
        <div className="intro-copy" data-reveal>
          <p className="display-title">
            FLIGHT PROJECTS
            <br />
            & OPERATIONS.
          </p>
          <p className="body-copy">
            From the LUNE-1 pathfinder and multi-gateway ground tracking to
            university payload flights, track active missions establishing
            African orbital capability.
          </p>
        </div>
      </div>

      <div className="ia-card-grid" style={{ marginTop: "32px" }}>
        {featuredProjects.map((prj, idx) => (
          <article
            key={prj.id}
            className="ia-feature-card bottom-to-top"
            data-reveal
            data-reveal-delay={String((idx % 3) + 1)}
          >
            <div className="ia-card-header">
              <span className="ia-badge">{prj.code} // {prj.category.toUpperCase()}</span>
              <span className="ia-badge blue">{prj.statusBadge}</span>
            </div>
            <div>
              <h3 style={{ fontSize: "17px", fontWeight: 700, margin: "0 0 6px" }}>
                {prj.name}
              </h3>
              <span style={{ fontSize: "12px", color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
                {prj.headline}
              </span>
            </div>
            <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.6 }}>
              {prj.overview}
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "8px",
                padding: "10px",
                background: "rgba(0, 0, 0, 0.25)",
                borderRadius: "4px",
                margin: "8px 0",
              }}
            >
              {prj.metrics.slice(0, 2).map((m, i) => (
                <div key={i}>
                  <div style={{ fontSize: "9px", color: "var(--muted)", fontFamily: "var(--font-mono)" }}>
                    {m.label}
                  </div>
                  <div style={{ fontSize: "12px", color: "#fff", fontWeight: 600 }}>
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "auto" }}>
              <Link className="arrow-link" to={`/projects#${prj.category}`}>
                <span>View Full Flight Ledger</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div style={{ marginTop: "36px" }} data-reveal>
        <Link className="btn-outline btn-magnetic" to="/projects">
          <span>View All Active, Research & Completed Projects</span>
          <ArrowRight size={13} />
        </Link>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 04 / Research & Technology Section                                         */
/* -------------------------------------------------------------------------- */
function ResearchTechSection() {
  return (
    <section className="section-pad" id="research-tech">
      <div className="section-intro">
        <SectionLabel
          number="04"
          label="RESEARCH & TECHNOLOGY"
          detail="DEEP TECH & PAPERS"
        />
        <div className="intro-copy" data-reveal>
          <p className="display-title">
            DEEP AEROSPACE
            <br />
            TECHNOLOGY.
          </p>
          <p className="body-copy">
            Horizontal capabilities connecting flight silicon, onboard neural
            inference, S/X-Band ground links, and open peer-reviewed PAUSN
            consortium monographs.
          </p>
        </div>
      </div>

      <div className="ia-card-grid" style={{ marginTop: "32px" }}>
        {technologyData.map((tech, idx) => (
          <div
            key={tech.id}
            className="ia-feature-card bottom-to-top"
            data-reveal
            data-reveal-delay={String((idx % 4) + 1)}
          >
            <div className="ia-card-header">
              <span className="ia-badge">{tech.eyebrow}</span>
              <span className="ia-badge">{tech.id.toUpperCase()}</span>
            </div>
            <h3 style={{ fontSize: "17px", fontWeight: 700, margin: 0 }}>
              {tech.title}
            </h3>
            <span style={{ fontSize: "12px", color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
              {tech.tagline}
            </span>
            <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.6 }}>
              {tech.leadCopy}
            </p>
            <div style={{ marginTop: "auto" }}>
              <Link className="arrow-link" to={`/technology#${tech.id}`}>
                <span>Explore Technical Architecture</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "36px",
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
        data-reveal
      >
        <Link className="btn-outline btn-magnetic" to="/technology">
          <span>Inspect Technology Pillars</span>
          <ArrowRight size={13} />
        </Link>
        <Link className="arrow-link" to="/research">
          <span>Search PAUSN Technical Paper Archive with BibTeX</span>
          <ArrowRight size={13} />
        </Link>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 05 / About & Continuous Cycle Ecosystem Section                            */
/* -------------------------------------------------------------------------- */
function EcosystemAboutSection({ onOpenContact }: { onOpenContact: () => void }) {
  return (
    <section className="section-pad" id="ecosystem">
      <div className="section-intro">
        <SectionLabel
          number="05"
          label="THE HUMAN ENGINE"
          detail="LUNE + PAUSN SYMBIOSIS"
        />
        <div className="intro-copy" data-reveal>
          <p className="display-title">
            LUNE BUILDS MACHINES.
            <br />
            PAUSN BUILDS PEOPLE.
          </p>
          <p className="body-copy">
            Building spacecraft requires more than a factory. Africa must not
            perpetually import an aerospace workforce, but cultivate native
            engineers through hands-on satellite missions and research.
          </p>
        </div>
      </div>

      <div className="cycle-chain-wrap" data-reveal style={{ marginTop: "32px" }}>
        <div className="cycle-grid-cards">
          {continuousCycle.map((item, idx) => (
            <div
              key={item.step}
              className="cycle-card bottom-to-top"
              data-reveal
              data-reveal-delay={String((idx % 3) + 1)}
            >
              <div className="cycle-card-header">
                <span className="cycle-step-num">{item.step} // CYCLE</span>
                <span className="cycle-sub">{item.sub}</span>
              </div>
              <h4 className="cycle-title">{item.title}</h4>
              <p className="cycle-desc">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sovereign Mission Procurement / RFQ Dispatch Box */}
      <div
        className="contact-detail-box bottom-to-top"
        data-reveal
        style={{
          marginTop: "48px",
          background: "rgba(14, 16, 21, 0.8)",
          border: "1px solid var(--accent-soft)",
          padding: "36px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <span className="micro-label" style={{ color: "var(--accent)" }}>
              SOVEREIGN PROCUREMENT & PAYLOAD MANIFEST
            </span>
            <h3 style={{ fontSize: "22px", margin: "6px 0 0" }}>
              Initiate Commercial or Academic Mission Planning
            </h3>
          </div>
          <button className="btn-cta btn-magnetic" onClick={onOpenContact}>
            <span>Dispatch Inquiry</span>
            <ArrowRight size={13} />
          </button>
        </div>
        <p style={{ fontSize: "14px", color: "var(--text-dim)", maxWidth: "800px", lineHeight: 1.6 }}>
          Whether you represent a national space agency procuring sovereign Earth observation capacity,
          a commercial constellation operator booking modular buses, or a university joining the PAUSN academic consortium —
          reach out to our flight integration team in Abuja.
        </p>
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", marginTop: "8px" }}>
          <Link className="arrow-link" to="/about">
            <span>The LUNE Manifesto & Team</span>
            <ArrowRight size={12} />
          </Link>
          <Link className="arrow-link" to="/journal">
            <span>Read Engineering Logs & Field Notes</span>
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Home Page Component                                                        */
/* -------------------------------------------------------------------------- */
export default function Home({
  onSelectSystem,
  onSelectResearch,
  onSelectStage,
  onOpenContact,
}: HomeProps) {
  return (
    <>
      <Hero onOpenContact={onOpenContact} />
      <SystemsOverviewSection onSelectSystem={onSelectSystem} />
      <ProjectsHighlightSection />
      <ResearchTechSection />
      <EcosystemAboutSection onOpenContact={onOpenContact} />
      <SpaceXFooter onOpenContact={onOpenContact} />
    </>
  );
}
