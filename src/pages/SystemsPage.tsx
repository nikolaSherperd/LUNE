import React from "react";
import { ArrowRight } from "lucide-react";
import { InteriorPageHero, SectionLabel, SpaceXFooter } from "../components/layout";
import { SystemsSection, FeaturedSystem } from "../components/sections";
import { MissionCalculator } from "../components/MissionCalculator";
import { PayloadBudgetProfiler } from "../components/PayloadBudgetProfiler";
import { PayloadICDViewer } from "../components/PayloadICDViewer";
import { ADCSSimulator } from "../components/ADCSSimulator";
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

      {/* Feature 1: Mission Orbit & Delta-V Calculator */}
      <section className="section-pad" id="mission-calculator" style={{ paddingTop: "20px" }}>
        <SectionLabel
          number="01B"
          label="MISSION ARCHITECT"
          detail="ORBIT & DELTA-V ENGINE"
        />
        <div style={{ marginTop: "24px" }}>
          <MissionCalculator onOpenContactWithMission={() => onOpenContact()} />
        </div>
      </section>

      {/* Feature 2: Payload Electrical & Data Budget Profiler */}
      <section className="section-pad" id="power-profiler" style={{ paddingTop: "20px" }}>
        <SectionLabel
          number="01C"
          label="POWER & TELEMETRY BUDGET"
          detail="BATTERY DoD & DOWNLINK"
        />
        <div style={{ marginTop: "24px" }}>
          <PayloadBudgetProfiler />
        </div>
      </section>

      {/* Subsystem Dossiers */}
      <SystemsSection onSelectSystem={onSelectSystem} />
      <FeaturedSystem onSelectSystem={onSelectSystem} />

      {/* Feature 6: Interactive Attitude Determination & Control Simulator */}
      <section className="section-pad" id="adcs-simulator" style={{ paddingTop: "20px" }}>
        <SectionLabel
          number="01D"
          label="ATTITUDE CONTROL & GUIDANCE"
          detail="REACTION WHEEL SIMULATION"
        />
        <div style={{ marginTop: "24px" }}>
          <ADCSSimulator />
        </div>
      </section>

      {/* Feature 3: Interactive Payload Interface Control Document (ICD / PUG Viewer) */}
      <section className="section-pad" id="payload-icd" style={{ paddingTop: "20px" }}>
        <SectionLabel
          number="01E"
          label="INTERFACE CONTROL DOCUMENT"
          detail="PUG v2.4 SPECIFICATION"
        />
        <div style={{ marginTop: "24px" }}>
          <PayloadICDViewer onOpenContact={onOpenContact} />
        </div>
      </section>

      <SpaceXFooter onOpenContact={onOpenContact} />
    </>
  );
}
