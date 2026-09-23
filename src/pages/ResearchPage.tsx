import React, { useEffect, useState } from "react";
import { ArrowRight, BookOpen, FileCode, FileText } from "lucide-react";
import { useLocation } from "react-router-dom";
import { InteriorPageHero, SectionLabel, SpaceXFooter } from "../components/layout";
import { ResearchArchive } from "../components/ResearchArchive";
import { engineeringLogsData, images, technicalNotesData } from "../data";

export interface ResearchPageProps {
  onOpenContact: () => void;
}

type ResearchTab = "papers" | "technical-notes" | "engineering-logs";

export default function ResearchPage({ onOpenContact }: ResearchPageProps) {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<ResearchTab>("papers");

  // Sync tab with URL hash
  useEffect(() => {
    const hash = location.hash.replace("#", "") as ResearchTab;
    if (["papers", "technical-notes", "engineering-logs"].includes(hash)) {
      setActiveTab(hash);
    }
  }, [location.hash]);

  const tabs: { id: ResearchTab; label: string; code: string; icon: React.ComponentType<{ size: number }> }[] = [
    { id: "papers", label: "Papers", code: "03.1", icon: BookOpen },
    { id: "technical-notes", label: "Technical Notes", code: "03.2", icon: FileText },
    { id: "engineering-logs", label: "Engineering Logs", code: "03.3", icon: FileCode },
  ];

  return (
    <>
      <InteriorPageHero
        number="03"
        label="RESEARCH & DEEP TECHNOLOGY"
        title={
          <>
            AEROSPACE
            <br />
            RESEARCH &amp;
            <br />
            <em>MONOGRAPHS.</em>
          </>
        }
        description="Open peer-reviewed academic papers from the Pan-African University Space Network (PAUSN), practical engineering memoranda, and empirical qualification test logs from our Abuja testing facilities."
        image={images.manufacturing}
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
      {/* TAB 1: PAPERS (PAUSN Monograph Archive)                              */}
      {/* -------------------------------------------------------------------- */}
      {activeTab === "papers" && (
        <section className="section-pad" id="papers" data-reveal>
          <SectionLabel
            number="03.1"
            label="TECHNICAL PAPERS & MONOGRAPHS"
            detail="PAUSN ACADEMIC ARCHIVE"
          />
          <div style={{ marginTop: "20px", marginBottom: "28px" }}>
            <h2 className="display-title">
              PAUSN TECHNICAL
              <br />
              ARCHIVE.
            </h2>
            <p className="body-copy">
              Search and filter peer-reviewed academic publications and technical monographs
              authored across the Pan-African University Space Network consortium.
              Includes direct in-browser abstract briefings and 1-click BibTeX citation copying.
            </p>
          </div>
          <ResearchArchive />
        </section>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* TAB 2: TECHNICAL NOTES                                               */}
      {/* -------------------------------------------------------------------- */}
      {activeTab === "technical-notes" && (
        <section className="section-pad" id="technical-notes" data-reveal>
          <SectionLabel
            number="03.2"
            label="TECHNICAL NOTES"
            detail="PRACTICAL ENGINEERING MEMORANDA"
          />
          <div style={{ marginTop: "20px" }}>
            <h2 className="display-title">
              ENGINEERING
              <br />
              MEMORANDA.
            </h2>
            <p className="body-copy">
              Focused design notes, link budget calculations, radiation single-event upset mitigation,
              and thermal balance methodologies produced by LUNE flight systems engineers.
            </p>
          </div>

          <div className="ia-card-grid" style={{ marginTop: "36px" }}>
            {technicalNotesData.map((tn) => (
              <article key={tn.id} className="ia-feature-card">
                <div className="ia-card-header">
                  <span className="ia-badge">{tn.code}</span>
                  <span className="ia-badge">{tn.category}</span>
                </div>

                <div>
                  <span style={{ fontSize: "11px", color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
                    {tn.leadAuthor} • {tn.date}
                  </span>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, margin: "6px 0 0" }}>
                    {tn.title}
                  </h3>
                </div>

                <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.6 }}>
                  {tn.summary}
                </p>

                <div>
                  <span className="micro-label" style={{ marginBottom: "8px", display: "block" }}>
                    KEY ENGINEERING FINDINGS
                  </span>
                  <ul className="facility-specs-list">
                    {tn.keyFindings.map((finding, idx) => (
                      <li key={idx}>{finding}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginTop: "auto", paddingTop: "12px" }}>
                  <button
                    className="arrow-link"
                    onClick={onOpenContact}
                  >
                    <span>Request Unredacted Memorandum</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* TAB 3: ENGINEERING LOGS                                              */}
      {/* -------------------------------------------------------------------- */}
      {activeTab === "engineering-logs" && (
        <section className="section-pad" id="engineering-logs" data-reveal>
          <SectionLabel
            number="03.3"
            label="ENGINEERING LOGS"
            detail="TEST RIG TELEMETRY & RECORDS"
          />
          <div style={{ marginTop: "20px" }}>
            <h2 className="display-title">
              QUALIFICATION
              <br />
              TEST LOGS.
            </h2>
            <p className="body-copy">
              Certified test run records from LUNE's environmental simulation chambers in Abuja,
              documenting vacuum bakeouts, electrodynamic vibration sweeps, and RF anechoic chamber patterns.
            </p>
          </div>

          <div className="ia-card-grid" style={{ marginTop: "36px" }}>
            {engineeringLogsData.map((log) => (
              <article key={log.id} className="ia-feature-card">
                <div className="ia-card-header">
                  <span className="ia-badge">{log.code} // {log.date}</span>
                  <span className="ia-badge green">{log.status}</span>
                </div>

                <div>
                  <span style={{ fontSize: "11px", color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
                    {log.facility} • {log.operator}
                  </span>
                  <h3 style={{ fontSize: "17px", fontWeight: 700, margin: "6px 0 0" }}>
                    {log.title}
                  </h3>
                </div>

                {/* Telemetry points table */}
                <div style={{ background: "rgba(0, 0, 0, 0.3)", borderRadius: "4px", padding: "12px" }}>
                  <span className="micro-label" style={{ marginBottom: "8px", display: "block" }}>
                    RECORDED SENSOR TELEMETRY
                  </span>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {log.telemetryPoints.map((pt, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "11px",
                          fontFamily: "var(--font-mono)",
                          borderBottom: "1px solid var(--line-soft)",
                          paddingBottom: "4px",
                        }}
                      >
                        <span style={{ color: "var(--muted)" }}>{pt.parameter}</span>
                        <span style={{ color: "#fff" }}>{pt.measured}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <p style={{ fontSize: "12px", color: "var(--muted)", fontStyle: "italic", margin: 0 }}>
                  "{log.notes}"
                </p>

                <div style={{ marginTop: "auto", paddingTop: "12px" }}>
                  <button
                    className="arrow-link"
                    onClick={onOpenContact}
                  >
                    <span>Request Full Telemetry Dataset</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <SpaceXFooter onOpenContact={onOpenContact} />
    </>
  );
}
