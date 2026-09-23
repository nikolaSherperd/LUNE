import React, { useEffect, useState } from "react";
import { ArrowRight, Compass, HeartHandshake, Users } from "lucide-react";
import { useLocation } from "react-router-dom";
import { InteriorPageHero, SectionLabel, SpaceXFooter } from "../components/layout";
import { aboutData, continuousCycle, images, journalItems } from "../data";

export interface AboutPageProps {
  onOpenContact: () => void;
}

type AboutTab = "mission" | "philosophy" | "team";

export default function AboutPage({ onOpenContact }: AboutPageProps) {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<AboutTab>("mission");

  // Sync tab with URL hash
  useEffect(() => {
    const hash = location.hash.replace("#", "") as AboutTab;
    if (["mission", "philosophy", "team"].includes(hash)) {
      setActiveTab(hash);
    }
  }, [location.hash]);

  const tabs: { id: AboutTab; label: string; code: string; icon: React.ComponentType<{ size: number }> }[] = [
    { id: "mission", label: "Mission", code: "05.1", icon: Compass },
    { id: "philosophy", label: "Philosophy", code: "05.2", icon: HeartHandshake },
    { id: "team", label: "Team", code: "05.3", icon: Users },
  ];

  return (
    <>
      <InteriorPageHero
        number="05"
        label="THE INDUSTRIAL FOUNDATION"
        title={
          <>
            AN AFRICAN
            <br />
            SPACE
            <br />
            <em>CIVILIZATION.</em>
          </>
        }
        description="LUNE is building the technological, physical, and human foundations of an African space-industrial civilization through modular spacecraft platforms, sovereign avionics, and cleanroom manufacturing."
        image={images.systems}
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

      {/* -------------------------------------------------------------------- */}
      {/* TAB 1: MISSION                                                       */}
      {/* -------------------------------------------------------------------- */}
      {activeTab === "mission" && (
        <section className="section-pad" id="mission" data-reveal>
          <SectionLabel
            number="05.1"
            label="THE LUNE MISSION"
            detail="FOUNDATIONAL OBJECTIVES"
          />
          <div style={{ marginTop: "20px" }}>
            <h2 className="display-title">
              THE INDUSTRIAL
              <br />
              NORTH STAR.
            </h2>
            <p className="body-copy">
              {aboutData.mission.statement}
            </p>
          </div>

          <div className="ia-card-grid" style={{ marginTop: "36px" }}>
            {aboutData.mission.pillars.map((pillar, idx) => (
              <div key={idx} className="ia-feature-card">
                <span className="ia-badge">OBJECTIVE /0{idx + 1}</span>
                <h3 style={{ fontSize: "19px", margin: 0 }}>{pillar.title}</h3>
                <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.6 }}>
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

          {/* Sequential 8-Stage Progression Roadmap */}
          <div style={{ marginTop: "64px" }}>
            <span className="micro-label" style={{ marginBottom: "16px", display: "block" }}>
              THE 8-STAGE INDUSTRIAL PROGRESSION
            </span>
            <div className="ia-card-grid">
              {journalItems.map((stage) => (
                <div key={stage.id} className="ia-feature-card">
                  <div className="ia-card-header">
                    <span className="ia-badge">{stage.category}</span>
                    <span className={`ia-badge ${stage.status === "Operational" ? "green" : "blue"}`}>
                      {stage.status}
                    </span>
                  </div>
                  <h4 style={{ fontSize: "16px", margin: 0 }}>{stage.title}</h4>
                  <ul className="facility-specs-list" style={{ marginTop: "auto" }}>
                    {stage.deliverables.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* TAB 2: PHILOSOPHY                                                    */}
      {/* -------------------------------------------------------------------- */}
      {activeTab === "philosophy" && (
        <section className="section-pad" id="philosophy" data-reveal>
          <SectionLabel
            number="05.2"
            label="LUNE PHILOSOPHY"
            detail="CAPABILITY BEFORE COMPLEXITY"
          />
          <div style={{ marginTop: "20px" }}>
            <h2 className="display-title">
              HOW WE THINK
              <br />
              ABOUT SPACE.
            </h2>
            <p className="body-copy">
              Our engineering philosophy is forged from the reality of industrial development:
              we do not chase cosmetic milestones; we systematically build enduring sovereign capability.
            </p>
          </div>

          {/* Core Tenets */}
          <div className="ia-card-grid" style={{ marginTop: "36px" }}>
            {aboutData.philosophy.coreTenets.map((tenet, idx) => (
              <div key={idx} className="ia-feature-card">
                <span className="ia-badge">TENET /0{idx + 1}</span>
                <h3 style={{ fontSize: "18px", margin: 0 }}>{tenet.title}</h3>
                <blockquote
                  style={{
                    fontSize: "14px",
                    fontStyle: "italic",
                    color: "var(--accent)",
                    borderLeft: "2px solid var(--accent)",
                    paddingLeft: "12px",
                    margin: 0,
                  }}
                >
                  "{tenet.quote}"
                </blockquote>
                <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.6 }}>
                  {tenet.detail}
                </p>
              </div>
            ))}
          </div>

          {/* The Continuous Cycle */}
          <div style={{ marginTop: "64px" }}>
            <span className="micro-label" style={{ marginBottom: "16px", display: "block" }}>
              THE 6-STEP CONTINUOUS SYMBIOSIS CYCLE
            </span>
            <div className="cycle-chain-wrap">
              <div className="cycle-grid-cards">
                {continuousCycle.map((item, idx) => (
                  <div key={item.step} className="cycle-card">
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
          </div>
        </section>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* TAB 3: TEAM & CONSORTIUM                                             */}
      {/* -------------------------------------------------------------------- */}
      {activeTab === "team" && (
        <section className="section-pad" id="team" data-reveal>
          <SectionLabel
            number="05.3"
            label="PEOPLE & CONSORTIUM"
            detail="ENGINEERS & UNIVERSITIES"
          />
          <div style={{ marginTop: "20px" }}>
            <h2 className="display-title">
              NATIVE AEROSPACE
              <br />
              LEADERSHIP.
            </h2>
            <p className="body-copy">
              A multidisciplinary engineering core based in Abuja, surrounded by the
              Pan-African University Space Network (PAUSN) faculty nodes and research fellows.
            </p>
          </div>

          {/* Leadership Core */}
          <div className="ia-card-grid" style={{ marginTop: "36px" }}>
            {aboutData.team.leaders.map((lead, idx) => (
              <div key={idx} className="ia-feature-card">
                <span className="ia-badge">{lead.category}</span>
                <h3 style={{ fontSize: "18px", margin: 0 }}>{lead.name}</h3>
                <span style={{ fontSize: "12px", color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
                  {lead.role}
                </span>
                <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.6 }}>
                  {lead.bio}
                </p>
              </div>
            ))}
          </div>

          {/* PAUSN Academic Consortium Nodes */}
          <div style={{ marginTop: "56px" }}>
            <span className="micro-label" style={{ marginBottom: "16px", display: "block" }}>
              PAUSN UNIVERSITY CONSORTIUM NODES
            </span>
            <div className="ia-card-grid">
              {aboutData.team.academicNodes.map((node, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "rgba(14, 16, 21, 0.65)",
                    border: "1px solid var(--line)",
                    borderRadius: "6px",
                    padding: "20px",
                  }}
                >
                  <span className="ia-badge">{node.country}</span>
                  <h4 style={{ fontSize: "16px", margin: "8px 0 4px" }}>{node.institution}</h4>
                  <p style={{ fontSize: "12px", color: "var(--muted)", margin: 0 }}>
                    Specialty: {node.specialty}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Careers & Fellowship Box */}
          <div
            className="contact-detail-box"
            style={{
              marginTop: "48px",
              border: "1px solid var(--accent-soft)",
              padding: "32px",
            }}
          >
            <span className="micro-label" style={{ color: "var(--accent)" }}>
              LUNE / PAUSN SPACE ACADEMY &amp; CAREERS
            </span>
            <h4 style={{ margin: "6px 0 10px", fontSize: "20px" }}>
              Join the Team Building Africa's Space Foundation
            </h4>
            <p style={{ fontSize: "13px", color: "var(--muted)", maxWidth: "700px" }}>
              We are recruiting aerospace systems engineers, flight software developers, RF payload
              specialists, and PAUSN graduate research fellows in Abuja.
            </p>
            <button
              className="btn-cta btn-magnetic"
              onClick={onOpenContact}
              style={{ marginTop: "16px" }}
            >
              <span>Submit Engineering Dossier / Fellowship Application</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </section>
      )}

      <SpaceXFooter onOpenContact={onOpenContact} />
    </>
  );
}
