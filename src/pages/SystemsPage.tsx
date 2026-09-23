import React, { useEffect, useState } from "react";
import { ArrowRight, Cpu, Layers, Orbit, Wrench } from "lucide-react";
import { useLocation } from "react-router-dom";
import { InteriorPageHero, SectionLabel, SpaceXFooter } from "../components/layout";
import { MissionCalculator } from "../components/MissionCalculator";
import { PayloadBudgetProfiler } from "../components/PayloadBudgetProfiler";
import { PayloadICDViewer } from "../components/PayloadICDViewer";
import { ADCSSimulator } from "../components/ADCSSimulator";
import { SystemItem, facilitySpecs, images, platformSpecTable, systems } from "../data";

export interface SystemsPageProps {
  onSelectSystem: (system: SystemItem) => void;
  onOpenContact: () => void;
}

type SystemTab = "space-systems" | "avionics" | "autonomous" | "manufacturing";

export default function SystemsPage({
  onSelectSystem,
  onOpenContact,
}: SystemsPageProps) {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<SystemTab>("space-systems");

  // Sync tab with URL hash
  useEffect(() => {
    const hash = location.hash.replace("#", "") as SystemTab;
    if (["space-systems", "avionics", "autonomous", "manufacturing"].includes(hash)) {
      setActiveTab(hash);
    }
  }, [location.hash]);

  const tabs: { id: SystemTab; label: string; code: string; icon: React.ComponentType<{ size: number }> }[] = [
    { id: "space-systems", label: "Space Systems", code: "01.1", icon: Layers },
    { id: "avionics", label: "Avionics", code: "01.2", icon: Cpu },
    { id: "autonomous", label: "Autonomous Systems", code: "01.3", icon: Orbit },
    { id: "manufacturing", label: "Manufacturing", code: "01.4", icon: Wrench },
  ];

  const currentSystem = systems.find(
    (s) =>
      s.id === activeTab ||
      (activeTab === "autonomous" && s.id === "autonomous-systems") ||
      (activeTab === "manufacturing" && s.id === "manufacturing")
  ) || systems[0];

  return (
    <>
      <InteriorPageHero
        number="01"
        label="SYSTEMS ARCHITECTURE"
        title={
          <>
            STANDARDIZED
            <br />
            AEROSPACE
            <br />
            <em>SYSTEMS.</em>
          </>
        }
        description="A common technological foundation across four interconnected aerospace disciplines: from modular spacecraft buses and radiation-hardened avionics to autonomous flight control and sovereign cleanroom integration in Abuja."
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

      {/* -------------------------------------------------------------------- */}
      {/* TAB 1: SPACE SYSTEMS                                                 */}
      {/* -------------------------------------------------------------------- */}
      {activeTab === "space-systems" && (
        <div className="tab-pane" data-reveal>
          {/* Platform Specs Matrix */}
          <section className="section-pad" id="space-systems">
            <SectionLabel
              number="01.1"
              label="SPACE SYSTEMS"
              detail="MODULAR PLATFORMS & BUSES"
            />
            <div style={{ marginTop: "20px" }}>
              <h2 className="display-title">
                MODULAR
                <br />
                SPACECRAFT.
              </h2>
              <p className="body-copy">
                Moving beyond the limitations of artisanal CubeSats toward standardized
                spacecraft buses produced at industrial scale. Configure 3U, 6U, 12U, or
                150kg SmallSat platforms with pre-qualified power, ADCS, and communications.
              </p>
            </div>

            <div className="spec-matrix-wrap" style={{ marginTop: "32px" }}>
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

          {/* Interactive Mission Orbit & Delta-V Calculator */}
          <section className="section-pad" id="mission-calculator" style={{ paddingTop: "20px" }}>
            <SectionLabel
              number="01.1B"
              label="MISSION ARCHITECT"
              detail="ORBIT & DELTA-V ENGINE"
            />
            <div style={{ marginTop: "24px" }}>
              <MissionCalculator onOpenContactWithMission={() => onOpenContact()} />
            </div>
          </section>

          {/* Interactive Payload Electrical & Data Budget Profiler */}
          <section className="section-pad" id="power-profiler" style={{ paddingTop: "20px" }}>
            <SectionLabel
              number="01.1C"
              label="POWER & TELEMETRY BUDGET"
              detail="BATTERY DoD & DOWNLINK"
            />
            <div style={{ marginTop: "24px" }}>
              <PayloadBudgetProfiler />
            </div>
          </section>

          {/* Interactive Payload Interface Control Document (ICD) */}
          <section className="section-pad" id="payload-icd" style={{ paddingTop: "20px" }}>
            <SectionLabel
              number="01.1D"
              label="INTERFACE CONTROL DOCUMENT"
              detail="PUG v2.4 SPECIFICATION"
            />
            <div style={{ marginTop: "24px" }}>
              <PayloadICDViewer onOpenContact={onOpenContact} />
            </div>
          </section>
        </div>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* TAB 2: AVIONICS                                                      */}
      {/* -------------------------------------------------------------------- */}
      {activeTab === "avionics" && (
        <div className="tab-pane" data-reveal>
          <section className="section-pad" id="avionics">
            <SectionLabel
              number="01.2"
              label="AVIONICS"
              detail="RADIATION-HARDENED SILICON & EPS"
            />
            <div style={{ marginTop: "20px" }}>
              <h2 className="display-title">
                HARDENED
                <br />
                FLIGHT COMPUTING.
              </h2>
              <p className="body-copy">
                The computing core and electrical backbone engineered for low Earth orbit.
                Features lockstep ARM Cortex-M7 cores, Triple-Modular Redundant (TMR) ECC memory,
                isolated power regulation, and deterministic RTOS execution.
              </p>
            </div>

            <div className="ia-card-grid" style={{ marginTop: "32px" }}>
              <div className="ia-feature-card">
                <span className="ia-badge">AVIONICS // COMPUTE</span>
                <h3 style={{ fontSize: "18px", margin: 0 }}>Dual Lockstep OBC Core</h3>
                <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.6 }}>
                  Dual-core ARM Cortex-M7 executing identical instruction sequences with hardware
                  comparator logic to instantly trap single-event radiation transients.
                </p>
                <ul className="facility-specs-list" style={{ marginTop: "auto" }}>
                  <li>Clock Speed: 400 MHz Deterministic Execution</li>
                  <li>Single Event Latchup (SEL) Immune &gt; 35 MeV-cm²/mg</li>
                  <li>Background scrubbing prevents latent SEU accumulation</li>
                </ul>
              </div>

              <div className="ia-feature-card">
                <span className="ia-badge">AVIONICS // POWER</span>
                <h3 style={{ fontSize: "18px", margin: 0 }}>Multi-Channel EPS</h3>
                <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.6 }}>
                  High-efficiency Maximum Power Point Tracking (MPPT) solar charge regulators,
                  autonomous battery state-of-charge balancing, and isolated rail switching.
                </p>
                <ul className="facility-specs-list" style={{ marginTop: "auto" }}>
                  <li>Regulated Bus Rails: 28V, 12V, 5V, 3.3V</li>
                  <li>Overcurrent Trip Latency: &lt; 10 Microseconds</li>
                  <li>Automated Battery Heater Control in Eclipse</li>
                </ul>
              </div>

              <div className="ia-feature-card">
                <span className="ia-badge">AVIONICS // HARNESS</span>
                <h3 style={{ fontSize: "18px", margin: 0 }}>Fault-Tolerant Buses</h3>
                <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.6 }}>
                  Differential avionics harness combining SpaceWire (100 Mbps) for optical payload data,
                  redundant CAN 2.0B for subsystem telemetry, and isolated RS-422.
                </p>
                <ul className="facility-specs-list" style={{ marginTop: "auto" }}>
                  <li>SpaceWire Packet Switching Interface</li>
                  <li>Galvanic Ground Isolation Across Payloads</li>
                  <li>Mil-Spec Twisted Shielded Pair Interconnects</li>
                </ul>
              </div>
            </div>

            <div style={{ marginTop: "36px" }}>
              <button
                className="btn-outline btn-magnetic"
                onClick={() => onSelectSystem(currentSystem)}
              >
                <span>Inspect Full Avionics Dossier</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </section>
        </div>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* TAB 3: AUTONOMOUS SYSTEMS                                            */}
      {/* -------------------------------------------------------------------- */}
      {activeTab === "autonomous" && (
        <div className="tab-pane" data-reveal>
          <section className="section-pad" id="autonomous">
            <SectionLabel
              number="01.3"
              label="AUTONOMOUS SYSTEMS"
              detail="CLOSED-LOOP FLIGHT & FDIR"
            />
            <div style={{ marginTop: "20px" }}>
              <h2 className="display-title">
                ON-ORBIT
                <br />
                AUTONOMY.
              </h2>
              <p className="body-copy">
                Spacecraft cannot afford continuous human ground control. LUNE autonomous systems
                execute closed-loop attitude stabilization, automated reaction wheel momentum
                dumping via magnetorquers, and sub-15ms fault detection, isolation and recovery.
              </p>
            </div>

            <div style={{ marginTop: "32px" }}>
              <ADCSSimulator />
            </div>

            <div className="ia-card-grid" style={{ marginTop: "36px" }}>
              <div className="ia-feature-card">
                <span className="ia-badge">AUTONOMY // FDIR</span>
                <h3 style={{ fontSize: "18px", margin: 0 }}>Autonomous FDIR Engine</h3>
                <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.6 }}>
                  Three-tiered hierarchical state engine continuously monitoring currents, voltages,
                  watchdog heartbeats, and thermal envelopes to isolate anomalous subsystems before cascade failure.
                </p>
              </div>

              <div className="ia-feature-card">
                <span className="ia-badge">AUTONOMY // DETUMBLING</span>
                <h3 style={{ fontSize: "18px", margin: 0 }}>Lyapunov-Stable B-Dot</h3>
                <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.6 }}>
                  Autonomous magnetic detumbling algorithm driving triaxial magnetorquers against Earth's
                  magnetic field, safely arresting launch vehicle separation tumble without gyro sensors.
                </p>
              </div>

              <div className="ia-feature-card">
                <span className="ia-badge">AUTONOMY // GUIDANCE</span>
                <h3 style={{ fontSize: "18px", margin: 0 }}>Star Tracker Slew Control</h3>
                <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.6 }}>
                  Sub-arcsecond celestial pattern matching against an onboard 5,000-star catalogue at 10 Hz,
                  enabling agile ground target slews and sub-0.03° nadir pointing accuracy.
                </p>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* TAB 4: MANUFACTURING                                                 */}
      {/* -------------------------------------------------------------------- */}
      {activeTab === "manufacturing" && (
        <div className="tab-pane" data-reveal>
          <section className="section-pad" id="manufacturing">
            <SectionLabel
              number="01.4"
              label="MANUFACTURING"
              detail="ABUJA INTEGRATION CAMPUS"
            />
            <div style={{ marginTop: "20px" }}>
              <h2 className="display-title">
                SOVEREIGN TEST RIGS
                <br />
                &amp; CLEANROOMS.
              </h2>
              <p className="body-copy">
                Building domestic aerospace infrastructure under one roof in Abuja, Nigeria:
                ISO Class 7 cleanrooms, vacuum thermal cycling (-75°C to +135°C @ 10⁻⁶ Torr),
                20 kN electrodynamic vibration shakers, and laser powder bed additive metallurgy.
              </p>
            </div>

            <div className="ia-card-grid" style={{ marginTop: "32px" }}>
              {facilitySpecs.map((fac) => (
                <div key={fac.id} className="ia-feature-card">
                  <div className="ia-card-header">
                    <span className="ia-badge">{fac.code}</span>
                    <span className="ia-badge green">QUALIFIED</span>
                  </div>
                  <h3 style={{ fontSize: "18px", margin: 0 }}>{fac.name}</h3>
                  <span style={{ fontSize: "11px", color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
                    {fac.classification}
                  </span>
                  <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.6 }}>
                    {fac.description}
                  </p>
                  <ul className="facility-specs-list" style={{ marginTop: "auto" }}>
                    {fac.specs.map((spec, i) => (
                      <li key={i}>{spec}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Testing Booking Callout */}
            <div
              className="contact-detail-box"
              style={{
                marginTop: "36px",
                border: "1px solid var(--accent-soft)",
                padding: "28px",
              }}
            >
              <span className="micro-label" style={{ color: "var(--accent)" }}>
                THIRD-PARTY ENVIRONMENTAL QUALIFICATION
              </span>
              <h4 style={{ margin: "6px 0 10px", fontSize: "18px" }}>
                Book Testing Time on LUNE's TVAC &amp; Shaker Table in Abuja
              </h4>
              <p style={{ fontSize: "13px", color: "var(--muted)", maxWidth: "700px" }}>
                Commercial satellite companies, sovereign defense bodies, and university aerospace labs
                can book certified qualification campaigns matching NASA GEVS and ECSS standards.
              </p>
              <button
                className="btn-cta btn-magnetic"
                onClick={onOpenContact}
                style={{ marginTop: "16px" }}
              >
                <span>Request Facility Booking / Inspection</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </section>
        </div>
      )}

      <SpaceXFooter onOpenContact={onOpenContact} />
    </>
  );
}
