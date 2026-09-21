import React from "react";
import { ArrowRight } from "lucide-react";
import { InteriorPageHero, SectionLabel, SpaceXFooter } from "../components/layout";
import { OrbitalTracker } from "../components/OrbitalTracker";
import { JournalItem, images, journalItems, missionsManifest } from "../data";

export interface MissionsPageProps {
  onSelectStage: (stage: JournalItem) => void;
  onOpenContact: () => void;
}

export default function MissionsPage({
  onSelectStage,
  onOpenContact,
}: MissionsPageProps) {
  return (
    <>
      <InteriorPageHero
        number="03"
        label="ORBITAL MISSIONS"
        title={
          <>
            ORBITAL
            <br />
            FLIGHT
            <br />
            <em>MANIFEST.</em>
          </>
        }
        description="Track LUNE's active flight pathfinders, scheduled satellite deployments, and telemetry station operations establishing African orbital heritage."
        image={images.darkRocket}
      />

      {/* Real-Time Orbital Telemetry & Ground Track Canvas */}
      <section className="section-pad" id="orbital-telemetry" style={{ paddingBottom: "24px" }}>
        <SectionLabel
          number="03A"
          label="REAL-TIME TELEMETRY TRACKER"
          detail="SGP4 GROUND TRACK & S-BAND LINK"
        />
        <div style={{ marginTop: "24px" }}>
          <OrbitalTracker />
        </div>
      </section>

      {/* Scheduled Manifest */}
      <section className="section-pad" id="manifest">
        <SectionLabel
          number="03B"
          label="SCHEDULED MANIFEST"
          detail="FLIGHT SCHEDULE"
        />
        <div data-reveal style={{ marginTop: "20px" }}>
          <h2 className="display-title">
            SCHEDULED
            <br />
            MISSIONS.
          </h2>
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
                  RESERVE PAYLOAD SLOT <ArrowRight size={13} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Industrial Roadmap Stages */}
      <section className="section-pad" id="roadmap">
        <SectionLabel
          number="03C"
          label="INDUSTRIAL ROADMAP"
          detail="LONG-TERM EVOLUTION"
        />
        <div data-reveal style={{ marginTop: "20px" }}>
          <h2 className="display-title">
            SEQUENTIAL
            <br />
            CAPABILITY.
          </h2>
          <p className="body-copy">
            The roadmap is not simply: satellites → rockets. It is: education →
            research → engineering → manufacturing → spacecraft → propulsion →
            launch systems → a self-sustaining African space industry.
          </p>
        </div>

        <div className="journal-grid" style={{ marginTop: "32px" }}>
          {journalItems.map((item, idx) => (
            <article
              className="journal-item"
              key={item.id}
              data-reveal
              data-reveal-delay={String((idx % 3) + 1)}
              onClick={() => onSelectStage(item)}
              title="Inspect roadmap deliverables"
            >
              <div>
                <span className="micro-label">{item.category}</span>
                <h3>{item.title}</h3>
              </div>
              <div className="journal-foot">
                <span>{item.timeline}</span>
                <span className="domain-pill">{item.status}</span>
                <ArrowRight size={15} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <SpaceXFooter onOpenContact={onOpenContact} />
    </>
  );
}
