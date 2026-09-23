import React, { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Clock, Globe2, Radio } from "lucide-react";
import { useLocation } from "react-router-dom";
import { InteriorPageHero, SectionLabel, SpaceXFooter } from "../components/layout";
import { OrbitalTracker } from "../components/OrbitalTracker";
import { images, projectsData } from "../data";

export interface ProjectsPageProps {
  onOpenContact: () => void;
}

type ProjectTab = "active" | "research" | "completed";

export default function ProjectsPage({ onOpenContact }: ProjectsPageProps) {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<ProjectTab>("active");

  // Sync tab with URL hash
  useEffect(() => {
    const hash = location.hash.replace("#", "") as ProjectTab;
    if (["active", "research", "completed"].includes(hash)) {
      setActiveTab(hash);
    }
  }, [location.hash]);

  const tabs: { id: ProjectTab; label: string; code: string; icon: React.ComponentType<{ size: number }> }[] = [
    { id: "active", label: "Active", code: "02.1", icon: Radio },
    { id: "research", label: "Research", code: "02.2", icon: Globe2 },
    { id: "completed", label: "Completed", code: "02.3", icon: CheckCircle2 },
  ];

  const filteredProjects = projectsData.filter((p) => p.category === activeTab);

  return (
    <>
      <InteriorPageHero
        number="02"
        label="PROJECTS & OPERATIONS"
        title={
          <>
            ORBITAL
            <br />
            PROJECTS &amp;
            <br />
            <em>HERITAGE.</em>
          </>
        }
        description="Explore active orbital flight pathfinders, automated ground station gateways, collaborative university payloads, and space qualification milestones establishing sovereign African capability."
        image={images.platform}
      />

      {/* Sticky IA Sub-Navigation Bar */}
      <div className="ia-subnav-wrap">
        <div className="ia-subnav-container">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                className={`ia-tab-btn ${isActive ? "active" : ""}`}
                onClick={() => {
                  setActiveTab(tab.id);
                  window.history.replaceState(null, "", `#${tab.id}`);
                }}
              >
                <Icon size={13} />
                <span>{tab.label}</span>
                <span className="ia-tab-code">{tab.code}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Real-time Tracking Canvas (Prominently featured when Active is selected) */}
      {activeTab === "active" && (
        <section className="section-pad" id="orbital-tracking" style={{ paddingBottom: "24px" }}>
          <SectionLabel
            number="02.1A"
            label="TELEMETRY RADAR"
            detail="PAN-AFRICAN GATEWAY NETWORK"
          />
          <div style={{ marginTop: "24px" }}>
            <OrbitalTracker />
          </div>
        </section>
      )}

      {/* Project Cards Section */}
      <section className="section-pad" id="projects-list">
        <SectionLabel
          number={activeTab === "active" ? "02.1B" : activeTab === "research" ? "02.2" : "02.3"}
          label={activeTab === "active" ? "ACTIVE MANIFEST" : activeTab === "research" ? "RESEARCH MISSIONS" : "COMPLETED HERITAGE"}
          detail={`${activeTab.toUpperCase()} LEDGER`}
        />
        <div style={{ marginTop: "20px" }}>
          <h2 className="display-title">
            {activeTab === "active" ? "ACTIVE MISSIONS." : activeTab === "research" ? "ADVANCED PROGRAMS." : "FLIGHT QUALIFIED."}
          </h2>
          <p className="body-copy">
            {activeTab === "active"
              ? "Operational flight pathfinders and active telemetry infrastructure currently in integration or orbit."
              : activeTab === "research"
              ? "Next-generation Earth observation, quantum-safe cryptographic communications, and swarm payloads."
              : "Rigorous hardware-in-the-loop and thermal vacuum qualification series with proven flight heritage."}
          </p>
        </div>

        <div className="ia-card-grid" style={{ marginTop: "36px" }}>
          {filteredProjects.map((prj) => (
            <article key={prj.id} className="ia-feature-card">
              <div className="ia-card-header">
                <span className="ia-badge">{prj.code} // {prj.formFactor}</span>
                <span className={`ia-badge ${activeTab === "completed" ? "green" : "blue"}`}>
                  {prj.statusBadge}
                </span>
              </div>

              <div>
                <h3 style={{ fontSize: "19px", fontWeight: 700, margin: "0 0 6px" }}>
                  {prj.name}
                </h3>
                <span style={{ fontSize: "12px", color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
                  {prj.headline}
                </span>
              </div>

              <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.6 }}>
                {prj.overview}
              </p>

              {prj.orbit && (
                <div style={{ fontSize: "11px", color: "var(--text-dim)", fontFamily: "var(--font-mono)", display: "flex", alignItems: "center", gap: "6px" }}>
                  <Clock size={12} color="var(--accent)" />
                  <span>Orbit: {prj.orbit}</span>
                </div>
              )}

              {/* Key Metrics Strip */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
                  gap: "10px",
                  padding: "12px",
                  background: "rgba(0, 0, 0, 0.3)",
                  borderRadius: "4px",
                  margin: "8px 0",
                }}
              >
                {prj.metrics.map((m, idx) => (
                  <div key={idx}>
                    <div style={{ fontSize: "9px", color: "var(--muted)", fontFamily: "var(--font-mono)" }}>
                      {m.label}
                    </div>
                    <div style={{ fontSize: "13px", color: "#fff", fontWeight: 600 }}>
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Deliverables / Verification list */}
              <div>
                <span className="micro-label" style={{ marginBottom: "8px", display: "block" }}>
                  DELIVERABLES &amp; VERIFICATIONS
                </span>
                <ul className="facility-specs-list">
                  {prj.deliverables.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: "auto", paddingTop: "12px" }}>
                <button
                  className="arrow-link"
                  onClick={onOpenContact}
                >
                  <span>Request Mission Briefing</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Sovereign Mission Procurement Box */}
      <section className="section-pad" style={{ paddingTop: "0" }}>
        <div
          className="contact-detail-box"
          style={{
            border: "1px solid var(--accent-soft)",
            padding: "32px",
          }}
        >
          <span className="micro-label" style={{ color: "var(--accent)" }}>
            ORBITAL CAPACITY ALLOCATION
          </span>
          <h4 style={{ margin: "6px 0 10px", fontSize: "20px" }}>
            Book Payload Slots or Ground Station Passes
          </h4>
          <p style={{ fontSize: "13px", color: "var(--muted)", maxWidth: "700px" }}>
            Commercial operators, space agencies, and PAUSN academic institutions can inquire about
            scheduled rideshare capacity on upcoming LUNE smallsat flights.
          </p>
          <button
            className="btn-cta btn-magnetic"
            onClick={onOpenContact}
            style={{ marginTop: "16px" }}
          >
            <span>Inquire on Mission Manifest</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </section>

      <SpaceXFooter onOpenContact={onOpenContact} />
    </>
  );
}
