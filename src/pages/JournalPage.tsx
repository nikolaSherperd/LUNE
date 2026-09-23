import React, { useEffect, useState } from "react";
import { ArrowRight, BookOpen, Compass, FlaskConical, MapPin, Newspaper, Tag } from "lucide-react";
import { useLocation } from "react-router-dom";
import { InteriorPageHero, SectionLabel, SpaceXFooter } from "../components/layout";
import { images, journalEntriesData } from "../data";

export interface JournalPageProps {
  onOpenContact: () => void;
}

type JournalTab = "updates" | "experiments" | "field-notes";

export default function JournalPage({ onOpenContact }: JournalPageProps) {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<JournalTab>("updates");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Sync tab with URL hash
  useEffect(() => {
    const hash = location.hash.replace("#", "") as JournalTab;
    if (["updates", "experiments", "field-notes"].includes(hash)) {
      setActiveTab(hash);
    }
  }, [location.hash]);

  const tabs: { id: JournalTab; label: string; code: string; icon: React.ComponentType<{ size: number }> }[] = [
    { id: "updates", label: "Updates", code: "06.1", icon: Newspaper },
    { id: "experiments", label: "Experiments", code: "06.2", icon: FlaskConical },
    { id: "field-notes", label: "Field Notes", code: "06.3", icon: Compass },
  ];

  const filteredEntries = journalEntriesData.filter((e) => e.category === activeTab);

  return (
    <>
      <InteriorPageHero
        number="06"
        label="ENGINEERING JOURNAL"
        title={
          <>
            DISPATCHES,
            <br />
            TESTS &amp;
            <br />
            <em>FIELD NOTES.</em>
          </>
        }
        description="Public field logs, empirical qualification test records, vacuum chamber balance experiments, and operational ground station deployments across Africa."
        image={images.hero}
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

      {/* Journal Entries List */}
      <section className="section-pad" id="journal-entries" data-reveal>
        <SectionLabel
          number={activeTab === "updates" ? "06.1" : activeTab === "experiments" ? "06.2" : "06.3"}
          label={activeTab === "updates" ? "PROGRAM DISPATCHES" : activeTab === "experiments" ? "EMPIRICAL EXPERIMENTS" : "EXPEDITION NOTES"}
          detail={`${activeTab.toUpperCase()} LOG`}
        />

        <div style={{ marginTop: "20px" }}>
          <h2 className="display-title">
            {activeTab === "updates" ? "PROGRAM UPDATES." : activeTab === "experiments" ? "TEST EXPERIMENTS." : "FIELD DISPATCHES."}
          </h2>
          <p className="body-copy">
            {activeTab === "updates"
              ? "Official milestone announcements, facility capital expansions, and sovereign partner agreements."
              : activeTab === "experiments"
              ? "Rigorous thermal vacuum balance testing, multi-axis shaker sweeps, and autonomous ADCS test cell logs."
              : "On-the-ground station antenna deployments, spectrum surveys, and launch campaign field reports."}
          </p>
        </div>

        <div className="ia-card-grid" style={{ marginTop: "36px" }}>
          {filteredEntries.map((entry) => {
            const isExpanded = expandedId === entry.id;
            return (
              <article key={entry.id} className="ia-feature-card">
                <div className="ia-card-header">
                  <span className="ia-badge">{entry.code}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "var(--muted)", fontFamily: "var(--font-mono)" }}>
                    <MapPin size={11} color="var(--accent)" />
                    <span>{entry.location}</span>
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: "11px", color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
                    {entry.date}
                  </span>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, margin: "6px 0 0" }}>
                    {entry.title}
                  </h3>
                </div>

                <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.6 }}>
                  {entry.excerpt}
                </p>

                {isExpanded && (
                  <div
                    style={{
                      background: "rgba(0, 0, 0, 0.35)",
                      borderRadius: "6px",
                      padding: "16px",
                      fontSize: "13px",
                      color: "var(--text-dim)",
                      lineHeight: 1.65,
                      borderLeft: "2px solid var(--accent)",
                    }}
                  >
                    {entry.body}
                  </div>
                )}

                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "auto" }}>
                  {entry.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: "10px",
                        fontFamily: "var(--font-mono)",
                        color: "var(--muted)",
                        background: "rgba(255, 255, 255, 0.04)",
                        padding: "2px 8px",
                        borderRadius: "3px",
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div style={{ paddingTop: "12px" }}>
                  <button
                    className="arrow-link"
                    onClick={() => setExpandedId(isExpanded ? null : entry.id)}
                  >
                    <span>{isExpanded ? "Collapse Full Log" : "Read Full Dispatch"}</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <SpaceXFooter onOpenContact={onOpenContact} />
    </>
  );
}
