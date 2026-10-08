import React from "react";
import { ArrowRight, Cpu, Layers, Orbit, Radio, Shield, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { SpaceXFooter } from "../components/layout";
import { SpacecraftHotspots } from "../components/SpacecraftHotspots";
import { images, trustedPartners } from "../data";

export interface HomeProps {
  onSelectSystem?: (system: any) => void;
  onSelectResearch?: (research: any) => void;
  onSelectStage?: (stage: any) => void;
  onOpenContact: () => void;
}

export default function Home({ onOpenContact }: HomeProps) {
  return (
    <div className="home-page">
      {/* -------------------------------------------------------------------- */}
      {/* 01 / HERO SECTION (Cinematic, full-width, editorial)                 */}
      {/* -------------------------------------------------------------------- */}
      <section className="hero-clean" id="hero">
        <div className="hero-clean-media">
          <img
            src={images.hero}
            alt="LUNE launch vehicle and orbital spacecraft"
            className="hero-clean-img"
          />
          <div className="hero-clean-vignette" />
        </div>

        <div className="hero-clean-container">
          <div className="hero-clean-content" data-reveal>
            <div className="hero-badge">
              <span>PAN-AFRICAN AEROSPACE &amp; SPACE SYSTEMS</span>
            </div>

            <h1 className="hero-clean-headline">
              THE INDUSTRIAL
              <br />
              FOUNDATION FOR AN
              <br />
              <span className="accent-text">AFRICAN SPACE ECONOMY.</span>
            </h1>

            <p className="hero-clean-lead">
              Standardized modular spacecraft, radiation-hardened flight avionics,
              and sovereign integration facilities in Abuja. Built to turn Africa
              from a consumer of foreign satellite capacity into an enduring aerospace civilization.
            </p>

            <div className="hero-clean-actions">
              <Link className="btn-cta" to="/platforms">
                <span>Explore Platforms</span>
                <ArrowRight size={14} />
              </Link>
              <button
                className="btn-outline"
                onClick={onOpenContact}
              >
                <span>Get in Touch</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* METRICS BAND (Clean, refined, un-vibecoded)                          */}
      {/* -------------------------------------------------------------------- */}
      <section className="metrics-band">
        <div className="site-container">
          <div className="metrics-cards-grid" data-reveal>
            <div className="metric-card">
              <span className="metric-card-val">150 kg</span>
              <span className="metric-card-label">SmallSat Payload Class</span>
              <p className="metric-card-sub">Modular bus capacity for high-revisit orbital missions</p>
            </div>

            <div className="metric-card">
              <span className="metric-card-val">400 MHz</span>
              <span className="metric-card-label">Lockstep Flight Avionics</span>
              <p className="metric-card-sub">Radiation-tolerant ARM Cortex-M7 dual-core OBC</p>
            </div>

            <div className="metric-card">
              <span className="metric-card-val">ISO 7</span>
              <span className="metric-card-label">Cleanroom Integration</span>
              <p className="metric-card-sub">Thermal vacuum (TVAC) &amp; 20 kN vibration testing in Abuja</p>
            </div>

            <div className="metric-card">
              <span className="metric-card-val">4 Nodes</span>
              <span className="metric-card-label">Ground Station Network</span>
              <p className="metric-card-sub">Telemetry gateways in Abuja, Nairobi, Cape Town, and Cairo</p>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* PARTNERS TICKER / RECOGNITION                                        */}
      {/* -------------------------------------------------------------------- */}
      <section className="partners-clean-section">
        <div className="site-container">
          <p className="partners-clean-label">
            Collaborating with sovereign space agencies, university consortia, and commercial operators across Africa
          </p>
        </div>

        <div className="partners-marquee-wrapper" aria-label="Collaborating Organizations">
          <div className="partners-marquee-track">
            <div className="partners-marquee-group">
              {trustedPartners.map((partner) => (
                <div key={`p1-${partner.id}`} className="partner-marquee-card">
                  <div className="partner-logo-box">
                    <img
                      src={partner.logo}
                      alt={`${partner.acronym} logo`}
                      className="partner-logo-img"
                      loading="lazy"
                    />
                  </div>
                  <div className="partner-info-box">
                    <span className="partner-info-acronym">{partner.acronym}</span>
                    <span className="partner-info-name">{partner.name}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="partners-marquee-group" aria-hidden="true">
              {trustedPartners.map((partner) => (
                <div key={`p2-${partner.id}`} className="partner-marquee-card">
                  <div className="partner-logo-box">
                    <img
                      src={partner.logo}
                      alt={`${partner.acronym} logo`}
                      className="partner-logo-img"
                      loading="lazy"
                    />
                  </div>
                  <div className="partner-info-box">
                    <span className="partner-info-acronym">{partner.acronym}</span>
                    <span className="partner-info-name">{partner.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 02 / HARDWARE & PLATFORMS PILLARS                                    */}
      {/* -------------------------------------------------------------------- */}
      <section className="editorial-section" id="platforms">
        <div className="site-container">
          <div className="section-header-clean" data-reveal>
            <span className="section-kicker">STANDARDIZED HARDWARE</span>
            <h2 className="section-title-clean">
              CORE AEROSPACE SYSTEMS.
            </h2>
            <p className="section-lead-clean">
              Instead of building satellites as one-off bespoke machines, LUNE produces
              standardized, pre-qualified modular spacecraft platforms and flight avionics
              designed for repeatable orbital missions.
            </p>
          </div>

          <div className="platforms-cards-grid">
            {/* Card 1: Spacecraft Buses */}
            <div className="platform-card" data-reveal>
              <div className="platform-card-img-wrap">
                <img
                  src={images.platform}
                  alt="Modular spacecraft bus"
                  className="platform-card-img"
                />
              </div>
              <div className="platform-card-body">
                <div className="platform-card-main">
                  <div className="platform-card-meta">
                    <span className="tag-pill">MODULAR BUSES</span>
                    <span className="tag-pill accent">3U — 150KG</span>
                  </div>
                  <h3 className="platform-card-title">Modular Spacecraft Platforms</h3>
                  <p className="platform-card-text">
                    Standardized 3U, 6U, 12U CubeSat platforms and 150kg SmallSat buses
                    engineered with modular mechanical interfaces, scalable power rails,
                    and sub-arcminute 3-axis pointing accuracy.
                  </p>
                </div>
                <div className="platform-card-side">
                  <div className="platform-card-specs">
                    <div className="spec-row">
                      <span className="spec-label">Payload Mass</span>
                      <span className="spec-val">Up to 85 kg</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">Orbit Lifetime</span>
                      <span className="spec-val">5 to 7 Years (LEO)</span>
                    </div>
                  </div>
                  <Link to="/platforms" className="clean-arrow-link">
                    <span>Explore Bus Specifications</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 2: Flight Avionics */}
            <div className="platform-card" data-reveal>
              <div className="platform-card-img-wrap">
                <img
                  src={images.satellite}
                  alt="Radiation-hardened flight avionics"
                  className="platform-card-img"
                />
              </div>
              <div className="platform-card-body">
                <div className="platform-card-main">
                  <div className="platform-card-meta">
                    <span className="tag-pill">FLIGHT SILICON</span>
                    <span className="tag-pill accent">RAD-TOLERANT</span>
                  </div>
                  <h3 className="platform-card-title">Hardened Avionics &amp; EPS</h3>
                  <p className="platform-card-text">
                    Dual-lockstep ARM Cortex-M7 flight computers, multi-channel electrical
                    power distribution with MPPT charge balancing, SpaceWire payload links,
                    and deterministic real-time flight software.
                  </p>
                </div>
                <div className="platform-card-side">
                  <div className="platform-card-specs">
                    <div className="spec-row">
                      <span className="spec-label">Compute Core</span>
                      <span className="spec-val">Dual Lockstep M7 @ 400 MHz</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">Regulated Rails</span>
                      <span className="spec-val">28V, 12V, 5V, 3.3V</span>
                    </div>
                  </div>
                  <Link to="/platforms" className="clean-arrow-link">
                    <span>Inspect Avionics Architecture</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 3: Test & Integration Facilities */}
            <div className="platform-card" data-reveal>
              <div className="platform-card-img-wrap">
                <img
                  src={images.manufacturing}
                  alt="Abuja cleanroom and environmental test labs"
                  className="platform-card-img"
                />
              </div>
              <div className="platform-card-body">
                <div className="platform-card-main">
                  <div className="platform-card-meta">
                    <span className="tag-pill">INFRASTRUCTURE</span>
                    <span className="tag-pill accent">ABUJA CAMPUS</span>
                  </div>
                  <h3 className="platform-card-title">Sovereign Integration &amp; Test Labs</h3>
                  <p className="platform-card-text">
                    Indigenous ISO Class 7 cleanrooms, thermal vacuum chambers (TVAC),
                    and 20 kN electrodynamic vibration shakers in Abuja — qualifying
                    every subsystem to NASA GEVS and ECSS standards before launch.
                  </p>
                </div>
                <div className="platform-card-side">
                  <div className="platform-card-specs">
                    <div className="spec-row">
                      <span className="spec-label">Cleanroom</span>
                      <span className="spec-val">ISO 14644-1 Class 7</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">Vibration Force</span>
                      <span className="spec-val">20 kN Sine &amp; Random</span>
                    </div>
                  </div>
                  <Link to="/platforms" className="clean-arrow-link">
                    <span>Tour Abuja Test Facilities</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 02B / SPACECRAFT PLATFORM SHOWCASE (High-Clarity Hardware Visual)    */}
      {/* -------------------------------------------------------------------- */}
      <section className="spacecraft-showcase-section" id="spacecraft-showcase">
        <div className="site-container">
          <div className="section-header-clean" data-reveal>
            <span className="section-kicker">ORBITAL HARDWARE ARCHITECTURE</span>
            <h2 className="section-title-clean">
              STANDARDIZED MODULAR BUS.
            </h2>
            <p className="section-lead-clean">
              High-resolution view of the LUNE 3U–150kg modular satellite platform in orbital configuration.
              Equipped with dual deployable GaAs solar arrays, Star Tracker autonomous ADCS, and modular payload bay.
            </p>
          </div>

          <div className="spacecraft-showcase-frame" data-reveal>
            <div className="spacecraft-showcase-img-wrap">
              <img
                src={images.platform}
                alt="LUNE modular CubeSat and SmallSat spacecraft bus in orbital flight"
                className="spacecraft-showcase-img"
              />
              <div className="spacecraft-showcase-overlay" />
              <SpacecraftHotspots />
            </div>

            <div className="spacecraft-showcase-bar">
              <div className="showcase-bar-spec">
                <span className="spec-sub">PLATFORM CLASS</span>
                <strong>LUNE-BUS-150 / 3U TO 150KG</strong>
              </div>
              <div className="showcase-bar-spec">
                <span className="spec-sub">POINTING CAPABILITY</span>
                <strong>&lt; 0.05° 3-AXIS REACTION WHEELS</strong>
              </div>
              <div className="showcase-bar-spec">
                <span className="spec-sub">QUALIFICATION</span>
                <strong>NASA GEVS &amp; ECSS COMPLIANT</strong>
              </div>
              <div className="showcase-bar-action">
                <Link to="/platforms" className="clean-arrow-link" style={{ margin: 0 }}>
                  <span>Explore Bus Dossier</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 03 / FEATURED MISSIONS & FLIGHT HERITAGE                             */}
      {/* -------------------------------------------------------------------- */}
      <section className="editorial-section dark-alt" id="missions">
        <div className="site-container">
          <div className="section-header-clean" data-reveal>
            <span className="section-kicker">FLIGHT OPERATIONS</span>
            <h2 className="section-title-clean">
              MISSIONS &amp; HERITAGE.
            </h2>
            <p className="section-lead-clean">
              Track sovereign orbital flight pathfinders, automated ground station
              infrastructure, and academic consortium missions establishing African orbital capability.
            </p>
          </div>

          <div className="missions-cards-grid">
            <div className="mission-card" data-reveal>
              <div className="mission-card-lead">
                <div className="mission-card-header">
                  <span className="tag-pill">MISSION 01</span>
                  <span className="tag-pill accent">Coming soon...</span>
                </div>
                <h3 className="mission-card-title">LUNE-1 Orbital Technology Pathfinder</h3>
              </div>
              <p className="mission-card-desc">
                First-flight in-orbit demonstration validating our proprietary lockstep avionics,
                S/X-band telemetry link, and magnetic detumbling control systems in sun-synchronous orbit.
              </p>
              <div className="mission-card-stats">
                <div>
                  <span className="stat-label">Orbit</span>
                  <span className="stat-val">500 km SSO</span>
                </div>
                <div>
                  <span className="stat-label">Payload</span>
                  <span className="stat-val">Avionics &amp; EO Sensor</span>
                </div>
              </div>
            </div>

            <div className="mission-card" data-reveal>
              <div className="mission-card-lead">
                <div className="mission-card-header">
                  <span className="tag-pill">NETWORK</span>
                  <span className="tag-pill accent">Coming soon...</span>
                </div>
                <h3 className="mission-card-title">Pan-African Ground Station Gateway</h3>
              </div>
              <p className="mission-card-desc">
                Automated multi-station tracking network connecting primary telemetry hubs
                in Abuja, Nairobi, Cape Town, and Cairo for continuous low-latency command and downlink.
              </p>
              <div className="mission-card-stats">
                <div>
                  <span className="stat-label">Bands</span>
                  <span className="stat-val">S-Band &amp; X-Band</span>
                </div>
                <div>
                  <span className="stat-label">Daily Passes</span>
                  <span className="stat-val">14 Passes Across Africa</span>
                </div>
              </div>
            </div>

            <div className="mission-card" data-reveal>
              <div className="mission-card-lead">
                <div className="mission-card-header">
                  <span className="tag-pill">EDUCATION</span>
                  <span className="tag-pill accent">PAUSN CONSORTIUM</span>
                </div>
                <h3 className="mission-card-title">PAUSN-1 Collaborative University Bus</h3>
              </div>
              <p className="mission-card-desc">
                Joint university student payload mission providing native African engineering
                students with hands-on orbital integration, environmental screening, and mission operations.
              </p>
              <div className="mission-card-stats">
                <div>
                  <span className="stat-label">Partners</span>
                  <span className="stat-val">8 University Nodes</span>
                </div>
                <div>
                  <span className="stat-label">Cadence</span>
                  <span className="stat-val">Annual Flight Slot</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "40px", textAlign: "center" }} data-reveal>
            <Link to="/missions" className="btn-outline">
              <span>View All Missions &amp; Ground Network</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 04 / THE HUMAN ENGINE (LUNE + PAUSN)                                 */}
      {/* -------------------------------------------------------------------- */}
      <section className="editorial-section" id="about">
        <div className="site-container">
          <div className="vision-banner" data-reveal>
            <div className="vision-banner-content">
              <span className="section-kicker">THE HUMAN ENGINE</span>
              <h2 className="vision-banner-title">
                WE BUILD THE TALENT.
                <br />
                <span className="accent-text">WE BUILD THE MACHINES.</span>
              </h2>
              <p className="vision-banner-text">
                Spacecraft cannot thrive on imported talent alone. To create an enduring space
                civilization, Africa must cultivate native aerospace engineers through hands-on
                flight programs, research fellowships, and indigenous manufacturing infrastructure.
              </p>
              <div className="vision-banner-actions">
                <Link to="/about" className="btn-cta">
                  <span>Read The LUNE Manifesto</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 05 / COMMERCIAL & SOVEREIGN INQUIRY BANNER                           */}
      {/* -------------------------------------------------------------------- */}
      <section className="cta-banner-section">
        <div className="site-container">
          <div className="cta-banner-clean" data-reveal>
            <div className="cta-banner-left">
              <span className="section-kicker">MISSION PLANNING</span>
              <h3 className="cta-banner-heading">
                Ready to deploy orbital capacity?
              </h3>
              <p className="cta-banner-description">
                Whether you represent a national space agency procuring sovereign Earth observation
                capability, a commercial operator booking modular buses, or an academic research node —
                connect directly with our flight integration team in Abuja.
              </p>
            </div>
            <div className="cta-banner-right">
              <button className="btn-cta" onClick={onOpenContact}>
                <span>Initiate Inquiry</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SpaceX Minimalist Footer */}
      <SpaceXFooter onOpenContact={onOpenContact} />
    </div>
  );
}
