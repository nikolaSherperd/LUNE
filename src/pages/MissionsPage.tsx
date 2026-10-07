import React, { useState } from "react";
import { ArrowRight, CheckCircle2, Globe2, Radio, Satellite, ShieldCheck } from "lucide-react";
import { SpaceXFooter } from "../components/layout";
import { images, projectsData } from "../data";

export interface MissionsPageProps {
  onOpenContact: () => void;
}

type MissionFilter = "all" | "active" | "research" | "completed";

export default function MissionsPage({ onOpenContact }: MissionsPageProps) {
  const [filter, setFilter] = useState<MissionFilter>("all");

  const groundStations = [
    {
      code: "ABJ-01",
      name: "Abuja Telemetry Gateway (HQ)",
      location: "Abuja, Nigeria (9.0765° N, 7.3986° E)",
      bands: "S-Band Uplink & X-Band Downlink (100 Mbps)",
      role: "Primary flight command center, mission control & satellite bus checkout",
    },
    {
      code: "NBO-02",
      name: "Nairobi Earth Station",
      location: "Nairobi, Kenya (1.2921° S, 36.8219° E)",
      bands: "S-Band TT&C (Telemetry, Tracking & Command)",
      role: "Equatorial pass coverage and real-time constellation telemetry relay",
    },
    {
      code: "CPT-03",
      name: "Cape Town Ground Gateway",
      location: "Cape Town, South Africa (33.9249° S, 18.4241° E)",
      bands: "X-Band & Ka-Band High-Rate Science Downlink",
      role: "Southern hemisphere high-bandwidth payload data reception",
    },
    {
      code: "CAI-04",
      name: "Cairo Telemetry Node",
      location: "Cairo, Egypt (30.0444° N, 31.2357° E)",
      bands: "UHF / S-Band Transceiver Node",
      role: "Northern continental coverage and trans-Mediterranean pass relay",
    },
  ];

  const filteredProjects =
    filter === "all"
      ? projectsData
      : projectsData.filter((p) => p.category === filter);

  return (
    <div className="missions-page">
      {/* -------------------------------------------------------------------- */}
      {/* PAGE HERO                                                            */}
      {/* -------------------------------------------------------------------- */}
      <section className="page-hero-clean">
        <div className="page-hero-media">
          <img
            src={images.hero}
            alt="Orbital flight missions and ground tracking"
            className="page-hero-img"
          />
          <div className="page-hero-vignette" />
        </div>

        <div className="site-container page-hero-container">
          <div className="page-hero-content" data-reveal>
            <span className="section-kicker">ORBITAL OPERATIONS</span>
            <h1 className="page-hero-title">
              MISSIONS &amp;
              <br />
              <span className="accent-text">GROUND NETWORK.</span>
            </h1>
            <p className="page-hero-lead">
              Tracking sovereign orbital flight pathfinders, automated ground tracking gateways,
              and qualification milestones establishing African space heritage.
            </p>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 01 / PAN-AFRICAN GROUND STATION NETWORK                              */}
      {/* -------------------------------------------------------------------- */}
      <section className="editorial-section">
        <div className="site-container">
          <div className="section-header-clean" data-reveal>
            <span className="section-kicker">INFRASTRUCTURE NETWORK</span>
            <h2 className="section-title-clean">
              PAN-AFRICAN GROUND TRACKING.
            </h2>
            <p className="section-lead-clean">
              Continuous low-latency satellite tracking and automated telemetry downlink
              across four strategic gateways covering the African continent.
            </p>
          </div>

          <div className="ground-station-grid">
            {groundStations.map((station) => (
              <div key={station.code} className="ground-station-card" data-reveal>
                <div className="ground-station-lead">
                  <div className="ground-station-header">
                    <span className="tag-pill">{station.code}</span>
                    <span className="tag-pill accent">OPERATIONAL</span>
                  </div>
                  <h3 className="ground-station-title">{station.name}</h3>
                  <span className="ground-station-loc">{station.location}</span>
                </div>
                <p className="ground-station-role">{station.role}</p>
                <div className="ground-station-bands">
                  <span className="band-label">Frequencies</span>
                  <span className="band-val">{station.bands}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 02 / FLIGHT MANIFEST & PROJECTS                                      */}
      {/* -------------------------------------------------------------------- */}
      <section className="editorial-section dark-alt">
        <div className="site-container">
          <div className="section-header-clean" data-reveal>
            <span className="section-kicker">FLIGHT MANIFEST</span>
            <h2 className="section-title-clean">
              ORBITAL MANIFEST &amp; HERITAGE.
            </h2>
            <p className="section-lead-clean">
              Explore pathfinder satellites, collaborative university payloads,
              and environmental qualification milestones.
            </p>
          </div>

          {/* Featured Pathfinder Spacecraft Visual */}
          <div className="platform-visual-bar" data-reveal style={{ marginBottom: "36px" }}>
            <div className="platform-visual-media">
              <img
                src={images.hero}
                alt="LUNE Pathfinder-1 orbital satellite in flight"
                className="platform-visual-img"
              />
              <span className="platform-visual-tag">LUNE-PATHFINDER-1 // 520 KM SSO</span>
            </div>
            <div className="platform-visual-details">
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <span className="tag-pill accent">Coming soon...</span>
                <span className="tag-pill">ORBITAL FLIGHT PATHFINDER</span>
              </div>
              <h3 className="platform-visual-title">Pathfinder-1 Demonstration Mission</h3>
              <p className="platform-visual-desc">
                In-orbit flight validation of the standardized 3U platform and lockstep flight avionics.
                Currently downlinking multispectral telemetry to PAUSN ground stations across Abuja and Nairobi.
              </p>
              <div className="platform-visual-specs-row">
                <div>
                  <span className="lbl">Orbit Altitude</span>
                  <span className="val">520 km SSO</span>
                </div>
                <div>
                  <span className="lbl">Inclination</span>
                  <span className="val">97.4° Polar</span>
                </div>
                <div>
                  <span className="lbl">Telemetry Link</span>
                  <span className="val">S-Band (2.2 GHz)</span>
                </div>
                <div>
                  <span className="lbl">Mission Clock</span>
                  <span className="val">MET +412 Days</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="clean-tabs-nav" style={{ marginBottom: "36px" }}>
            <button
              className={`clean-tab-pill ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              <span>All Missions</span>
            </button>
            <button
              className={`clean-tab-pill ${filter === "active" ? "active" : ""}`}
              onClick={() => setFilter("active")}
            >
              <span>Active Flights</span>
            </button>
            <button
              className={`clean-tab-pill ${filter === "research" ? "active" : ""}`}
              onClick={() => setFilter("research")}
            >
              <span>Research &amp; Payloads</span>
            </button>
            <button
              className={`clean-tab-pill ${filter === "completed" ? "active" : ""}`}
              onClick={() => setFilter("completed")}
            >
              <span>Flight Heritage</span>
            </button>
          </div>

          <div className="missions-cards-grid">
            {filteredProjects.map((prj) => (
              <div key={prj.id} className="mission-card" data-reveal>
                <div className="mission-card-lead">
                  <div className="mission-card-header">
                    {prj.category.toLowerCase() !== "completed" && (
                      <span className="tag-pill">{prj.category.toUpperCase()}</span>
                    )}
                    {prj.statusBadge.toLowerCase() !== "completed" && (
                      <span className="tag-pill accent">{prj.statusBadge}</span>
                    )}
                  </div>
                  <h3 className="mission-card-title">{prj.name}</h3>
                  <span className="mission-card-headline">{prj.headline}</span>
                </div>
                <p className="mission-card-desc">{prj.overview}</p>

                <div className="mission-card-stats">
                  {prj.metrics.slice(0, 2).map((m, i) => (
                    <div key={i}>
                      <span className="stat-label">{m.label}</span>
                      <span className="stat-val">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* CTA BANNER                                                           */}
      {/* -------------------------------------------------------------------- */}
      <section className="cta-banner-section">
        <div className="site-container">
          <div className="cta-banner-clean" data-reveal>
            <div className="cta-banner-left">
              <span className="section-kicker">GROUND NETWORK ACCESS</span>
              <h3 className="cta-banner-heading">
                Need tracking passes for your satellite?
              </h3>
              <p className="cta-banner-description">
                Commercial and institutional operators can schedule automated S/X-Band
                telemetry passes across our Pan-African ground network.
              </p>
            </div>
            <div className="cta-banner-right">
              <button className="btn-cta" onClick={onOpenContact}>
                <span>Book Ground Passes</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <SpaceXFooter onOpenContact={onOpenContact} />
    </div>
  );
}
