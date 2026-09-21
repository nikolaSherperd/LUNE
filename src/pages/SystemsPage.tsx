import React from "react";
import { ArrowRight } from "lucide-react";
import { InteriorPageHero, SectionLabel, SpaceXFooter } from "../components/layout";
import { SystemsSection, FeaturedSystem } from "../components/sections";
import { SystemItem, images, platformSpecTable } from "../data";

export interface SystemsPageProps {
  onSelectSystem: (system: SystemItem) => void;
  onOpenContact: () => void;
}

export default function SystemsPage({
  onSelectSystem,
  onOpenContact,
}: SystemsPageProps) {
  return (
    <>
      <InteriorPageHero
        number="01"
        label="PLATFORMS & SYSTEMS"
        title={
          <>
            A COMMON
            <br />
            TECHNOLOGICAL
            <br />
            <em>FOUNDATION.</em>
          </>
        }
        description="Moving beyond conventional CubeSats toward modular spacecraft that can be configured for diverse missions, upgraded, manufactured efficiently, and produced at scale from standardized systems."
        image={images.platform}
      />

      {/* Technical Specifications Matrix */}
      <section className="section-pad" id="specs">
        <SectionLabel
          number="01A"
          label="SPECIFICATIONS MATRIX"
          detail="BUS COMPARISON"
        />
        <div data-reveal style={{ marginTop: "20px" }}>
          <h2 className="display-title">
            PLATFORM
            <br />
            PARAMETERS.
          </h2>
          <p className="body-copy">
            Detailed performance parameters across LUNE standard satellite bus
            form factors.
          </p>
        </div>

        <div className="spec-matrix-wrap" data-reveal>
          <table className="spec-matrix">
            <thead>
              <tr>
                <th>Parameter</th>
                <th>3U CubeSat Class</th>
                <th>6U / 12U CubeSat Class</th>
                <th>150kg SmallSat Platform</th>
              </tr>
            </thead>
            <tbody>
              {platformSpecTable.map((row, i) => (
                <tr key={i}>
                  <td className="spec-param">{row.parameter}</td>
                  <td>{row.cubesat3U}</td>
                  <td>{row.cubesat6U12U}</td>
                  <td style={{ color: "var(--accent)" }}>{row.smallsat150kg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Subsystem Dossiers */}
      <SystemsSection onSelectSystem={onSelectSystem} />
      <FeaturedSystem onSelectSystem={onSelectSystem} />

      {/* Downloadable / Inquiry Payload User Guide */}
      <section className="section-pad">
        <div
          className="contact-detail-box"
          data-reveal
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            border: "1px solid var(--accent)",
            background: "rgba(154,138,90,0.06)",
          }}
        >
          <span className="micro-label">
            PAYLOAD USER'S GUIDE (PUG) // VERSION 2.4
          </span>
          <h3 style={{ fontSize: "17px", letterSpacing: "0.04em", margin: 0 }}>
            Ready to integrate a sensor, instrument, or optical payload?
          </h3>
          <p style={{ fontSize: "13px", color: "var(--muted)", margin: 0 }}>
            Request mechanical interface control documents (ICD), power budget
            worksheets, and SpaceWire telemetry protocols.
          </p>
          <button
            className="header-cta-btn"
            onClick={onOpenContact}
            style={{ alignSelf: "flex-start", marginTop: "8px" }}
          >
            REQUEST PAYLOAD USER'S GUIDE <ArrowRight size={12} />
          </button>
        </div>
      </section>

      <SpaceXFooter onOpenContact={onOpenContact} />
    </>
  );
}
