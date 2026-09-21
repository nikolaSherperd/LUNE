import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionLabel, SpaceXFooter } from "../components/layout";
import { StatusStrip } from "../components/StatusStrip";
import {
  AboutSection,
  Ecosystem,
  FeaturedSystem,
  ResearchSection,
} from "../components/sections";
import {
  JournalItem,
  ResearchItem,
  SystemItem,
  facilitySpecs,
  foundryOfferings,
  foundryPillars,
  foundryProducts,
  images,
  journalItems,
  metricsData,
  missionsManifest,
  newsArticles,
  operationalSectors,
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
          The satellite is the beginning. The rocket is a milestone. The real
          objective is capability. LUNE is building toward something much
          larger than satellites or rockets — laying the foundations of an
          African space-industrial civilization.
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
            <span>Modular Spacecraft Platforms</span>
            <ArrowRight size={14} />
          </Link>
          <Link className="btn-outline btn-magnetic" to="/about">
            <span>The PAUSN Ecosystem</span>
          </Link>
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
/* Social Proof Partner Strip                                                 */
/* -------------------------------------------------------------------------- */
function TrustedLeadersStrip() {
  return (
    <section className="itemgrid--logos section-pad" id="partners">
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 48px)",
        }}
      >
        <p className="logos-label" data-reveal>
          Trusted by sovereign leaders, space agencies & commercial operators
          across Africa
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
/* Proof & Stats Row with Count-Up Animations                                  */
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
        <span
          className="stat-num"
          data-count-target="148"
          data-count-suffix="k"
        >
          148k
        </span>
        <div className="stat-content">
          Sq ft of manufacturing, cleanroom & test facilities
        </div>
      </div>
      <div className="stats-col bottom-to-top" data-reveal data-reveal-delay="4">
        <span
          className="stat-num"
          data-count-target="500"
          data-count-suffix="+"
        >
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
/* Capability & Outcomes with Text Reveal & Glowing Line                       */
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
        detail="MODULAR PLATFORMS & SCALE"
      />

      <div className="text-reveal" data-reveal>
        <p>
          <span className="rw">We</span>{" "}
          <span className="rw">are</span>{" "}
          <span className="rw">moving</span>{" "}
          <span className="rw">beyond</span>{" "}
          <span className="rw">conventional</span>{" "}
          <span className="rw">CubeSats</span>{" "}
          <span className="rw">–</span>{" "}
          <span className="muted">
            <span className="rw">toward</span>{" "}
            <span className="rw">modular</span>{" "}
            <span className="rw">spacecraft</span>{" "}
            <span className="rw">configured,</span>{" "}
            <span className="rw">upgraded,</span>{" "}
            <span className="rw">and</span>{" "}
            <span className="rw">produced</span>{" "}
            <span className="rw">at</span>{" "}
            <span className="rw">scale.</span>
          </span>
        </p>
      </div>

      <div className="line-h" />

      <div className="outcomes-box bottom-to-top" data-reveal>
        <div className="outcomes-left">
          <span className="eyebrow" style={{ color: "var(--accent)" }}>
            THE SYMBIOTIC ECOSYSTEM
          </span>
          <h2 className="shc-h2">
            LUNE builds
            <br />
            the machines.
            <br />
            PAUSN builds
            <br />
            the people.
          </h2>
        </div>

        <div className="outcomes-right">
          <p className="outcomes-text">
            <strong>
              Instead of building every satellite as a completely unique
              machine, LUNE creates a common technological foundation —
              standardized systems that can be assembled, tested, upgraded, and
              reused.
            </strong>
          </p>
          <div className="line-h" style={{ margin: "16px 0" }} />
          <p className="outcomes-text">
            <strong>
              Building spacecraft requires more than a factory. Through the{" "}
              <em>Pan-African University Space Network (PAUSN)</em> and the
              Space Academy, we connect African students, engineers, and
              researchers with real hardware missions — because Africa must not
              import an aerospace workforce, but build one.
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
            <Link className="btn-cta btn-magnetic" to="/systems">
              <span>Modular Platforms</span>
              <ArrowRight size={13} />
            </Link>
            <Link className="btn-outline btn-magnetic" to="/about">
              <span>The PAUSN Network</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* The Mission Foundry Split Section                                          */
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
          label="A COMMON TECHNOLOGICAL FOUNDATION"
          detail="MODULAR SPACECRAFT ARCHITECTURE"
        />
        <h2 className="split-headline">
          Instead of building every satellite as a completely unique machine,
          LUNE creates a common technological foundation — standardized systems
          that can be assembled, tested, upgraded, and produced at scale.
        </h2>
        <div>
          <Link className="arrow-link" to="/systems">
            <span>Explore Spacecraft Platforms</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Six Foundry Pillars Grid                                                   */
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
/* What the Foundry is Built On (Products Grid)                               */
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
/* News & Latest Missions Grid                                                */
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

export default function Home({
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
