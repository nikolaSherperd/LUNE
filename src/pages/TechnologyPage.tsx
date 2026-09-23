import React, { useEffect, useState } from "react";
import { ArrowRight, Brain, Cpu, Orbit, Radio } from "lucide-react";
import { useLocation } from "react-router-dom";
import { InteriorPageHero, SectionLabel, SpaceXFooter } from "../components/layout";
import { images, technologyData } from "../data";

export interface TechnologyPageProps {
  onOpenContact: () => void;
}

type TechTab = "embedded" | "ai" | "communications" | "control";

export default function TechnologyPage({ onOpenContact }: TechnologyPageProps) {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<TechTab>("embedded");

  // Sync tab with URL hash
  useEffect(() => {
    const hash = location.hash.replace("#", "") as TechTab;
    if (["embedded", "ai", "communications", "control"].includes(hash)) {
      setActiveTab(hash);
    }
  }, [location.hash]);

  const tabs: { id: TechTab; label: string; code: string; icon: React.ComponentType<{ size: number }> }[] = [
    { id: "embedded", label: "Embedded", code: "04.1", icon: Cpu },
    { id: "ai", label: "AI", code: "04.2", icon: Brain },
    { id: "communications", label: "Communications", code: "04.3", icon: Radio },
    { id: "control", label: "Control", code: "04.4", icon: Orbit },
  ];

  const currentPillar = technologyData.find((t) => t.id === activeTab) || technologyData[0];

  return (
    <>
      <InteriorPageHero
        number="04"
        label="CORE TECHNOLOGY"
        title={
          <>
            HORIZONTAL
            <br />
            TECHNOLOGY
            <br />
            <em>STACK.</em>
          </>
        }
        description="The foundational computing, neural inference, radio frequency links, and precision control algorithms powering LUNE modular spacecraft buses and ground station infrastructure."
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

      {/* Main Technology Pillar Presentation */}
      <section className="section-pad" id={currentPillar.id} data-reveal>
        <SectionLabel
          number={
            activeTab === "embedded"
              ? "04.1"
              : activeTab === "ai"
              ? "04.2"
              : activeTab === "communications"
              ? "04.3"
              : "04.4"
          }
          label={currentPillar.eyebrow}
          detail={currentPillar.title}
        />

        <div style={{ marginTop: "20px" }}>
          <h2 className="display-title">{currentPillar.title}.</h2>
          <span
            style={{
              fontSize: "14px",
              color: "var(--accent)",
              fontFamily: "var(--font-mono)",
              display: "block",
              marginTop: "8px",
            }}
          >
            {currentPillar.tagline}
          </span>
          <p className="body-copy" style={{ marginTop: "16px" }}>
            {currentPillar.leadCopy}
          </p>
        </div>

        {/* Technical Specification Matrix */}
        <div style={{ marginTop: "36px" }}>
          <span className="micro-label" style={{ marginBottom: "12px", display: "block" }}>
            PERFORMANCE &amp; QUALIFICATION PARAMETERS
          </span>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "16px",
            }}
          >
            {currentPillar.specs.map((spec, idx) => (
              <div
                key={idx}
                style={{
                  background: "rgba(14, 16, 21, 0.65)",
                  border: "1px solid var(--line)",
                  borderRadius: "6px",
                  padding: "18px",
                }}
              >
                <div style={{ fontSize: "11px", color: "var(--muted)", fontFamily: "var(--font-mono)" }}>
                  {spec.label}
                </div>
                <div style={{ fontSize: "15px", color: "#fff", fontWeight: 600, marginTop: "6px" }}>
                  {spec.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Architectural Pillars Cards */}
        <div style={{ marginTop: "40px" }}>
          <span className="micro-label" style={{ marginBottom: "16px", display: "block" }}>
            ARCHITECTURAL SUBSYSTEMS &amp; DESIGN TENETS
          </span>
          <div className="ia-card-grid">
            {currentPillar.architecturePoints.map((point, idx) => (
              <div key={idx} className="ia-feature-card">
                <span className="ia-badge">PILLAR /0{idx + 1}</span>
                <h3 style={{ fontSize: "18px", margin: 0 }}>{point.title}</h3>
                <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.6 }}>
                  {point.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Prompt */}
        <div
          className="contact-detail-box"
          style={{
            marginTop: "48px",
            border: "1px solid var(--accent-soft)",
            padding: "32px",
          }}
        >
          <span className="micro-label" style={{ color: "var(--accent)" }}>
            TECHNOLOGY LICENSING &amp; AVIONICS INTEGRATION
          </span>
          <h4 style={{ margin: "6px 0 10px", fontSize: "20px" }}>
            Integrate LUNE {currentPillar.title} into Your Spacecraft
          </h4>
          <p style={{ fontSize: "13px", color: "var(--muted)", maxWidth: "700px" }}>
            Our flight software, neural inference acceleration stacks, and avionics boards can be
            licensed or integrated directly onto third-party spacecraft and launch systems.
          </p>
          <button
            className="btn-cta btn-magnetic"
            onClick={onOpenContact}
            style={{ marginTop: "16px" }}
          >
            <span>Request Avionics ICD &amp; Integration Specs</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </section>

      <SpaceXFooter onOpenContact={onOpenContact} />
    </>
  );
}
