import React, { useState } from "react";
import { ArrowRight, Check, Cpu, Layers, ShieldCheck, Wrench } from "lucide-react";
import { SpaceXFooter } from "../components/layout";
import { facilitySpecs, images, platformSpecTable } from "../data";

export interface PlatformsPageProps {
  onOpenContact: () => void;
}

type PlatformTab = "buses" | "avionics" | "facilities";

export default function PlatformsPage({ onOpenContact }: PlatformsPageProps) {
  const [activeTab, setActiveTab] = useState<PlatformTab>("buses");

  return (
    <div className="platforms-page">
      {/* -------------------------------------------------------------------- */}
      {/* PAGE HERO                                                            */}
      {/* -------------------------------------------------------------------- */}
      <section className="page-hero-clean">
        <div className="page-hero-media">
          <img
            src={images.platform}
            alt="LUNE modular spacecraft buses and facilities"
            className="page-hero-img"
          />
          <div className="page-hero-vignette" />
        </div>

        <div className="site-container page-hero-container">
          <div className="page-hero-content" data-reveal>
            <span className="section-kicker">HARDWARE &amp; INFRASTRUCTURE</span>
            <h1 className="page-hero-title">
              STANDARDIZED
              <br />
              <span className="accent-text">AEROSPACE PLATFORMS.</span>
            </h1>
            <p className="page-hero-lead">
              A cohesive technological foundation engineered for reliable low Earth orbit missions:
              modular spacecraft buses, radiation-tolerant avionics, and sovereign cleanroom integration in Abuja.
            </p>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* SECTION TABS (Soft pill toggle bar)                                  */}
      {/* -------------------------------------------------------------------- */}
      <div className="clean-tabs-bar">
        <div className="site-container">
          <div className="clean-tabs-nav">
            <button
              className={`clean-tab-pill ${activeTab === "buses" ? "active" : ""}`}
              onClick={() => setActiveTab("buses")}
            >
              <Layers size={14} />
              <span>Spacecraft Buses</span>
            </button>
            <button
              className={`clean-tab-pill ${activeTab === "avionics" ? "active" : ""}`}
              onClick={() => setActiveTab("avionics")}
            >
              <Cpu size={14} />
              <span>Flight Avionics &amp; Software</span>
            </button>
            <button
              className={`clean-tab-pill ${activeTab === "facilities" ? "active" : ""}`}
              onClick={() => setActiveTab("facilities")}
            >
              <Wrench size={14} />
              <span>Abuja Test Facilities</span>
            </button>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* TAB 1: SPACECRAFT BUSES                                              */}
      {/* -------------------------------------------------------------------- */}
      {activeTab === "buses" && (
        <section className="tab-section-content" data-reveal>
          <div className="site-container">
            <div className="section-header-clean">
              <span className="section-kicker">MODULAR SPACECRAFT</span>
              <h2 className="section-title-clean">
                FLIGHT PLATFORMS: 3U TO 150KG.
              </h2>
              <p className="section-lead-clean">
                Moving beyond bespoke artisanal fabrication toward industrialized satellite platforms.
                Each bus arrives pre-qualified with precision 3-axis ADCS, high-efficiency solar arrays,
                and standardized payload mechanical and electrical interfaces.
              </p>
            </div>

            {/* Spacecraft Visual Showcase Bar */}
            <div className="platform-visual-bar" data-reveal>
              <div className="platform-visual-media">
                <img
                  src={images.platform}
                  alt="LUNE standardized modular spacecraft platform"
                  className="platform-visual-img"
                />
                <span className="platform-visual-tag">LUNE-BUS-150 // FLIGHT QUALIFIED</span>
              </div>
              <div className="platform-visual-details">
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <span className="tag-pill accent">ORBITAL PLATFORM ARCHITECTURE</span>
                  <span className="tag-pill">3U TO 150KG CLASS</span>
                </div>
                <h3 className="platform-visual-title">Modular Spacecraft Bus System</h3>
                <p className="platform-visual-desc">
                  Standardized structural frames with modular mechanical load paths, dual deployable GaAs solar arrays,
                  and sub-arcminute 3-axis attitude determination and control. Pre-qualified in Abuja TVAC and vibration labs.
                </p>
                <div className="platform-visual-specs-row">
                  <div>
                    <span className="lbl">Solar Generation</span>
                    <span className="val">Up to 240W EOL</span>
                  </div>
                  <div>
                    <span className="lbl">Pointing Stability</span>
                    <span className="val">&lt; 0.005°/s jitter</span>
                  </div>
                  <div>
                    <span className="lbl">Payload Mass</span>
                    <span className="val">Up to 85 kg</span>
                  </div>
                  <div>
                    <span className="lbl">Design Life</span>
                    <span className="val">5–7 Years LEO</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Platform Comparison Bars */}
            <div className="spec-cards-grid">
              <div className="spec-card">
                <div className="spec-card-lead">
                  <div className="spec-card-header">
                    <span className="tag-pill">CUBESAT CLASS</span>
                    <h3 className="spec-card-title">3U Platform</h3>
                  </div>
                  <p className="spec-card-desc">
                    Ideal for rapid technology validation, university science instruments, and IoT mesh payloads.
                  </p>
                </div>
                <div className="spec-card-metrics">
                  <div className="spec-card-metric">
                    <span className="label">Payload Volume</span>
                    <span className="value">1.5U to 2U</span>
                  </div>
                  <div className="spec-card-metric">
                    <span className="label">Average Bus Power</span>
                    <span className="value">15W — 25W</span>
                  </div>
                  <div className="spec-card-metric">
                    <span className="label">Pointing Accuracy</span>
                    <span className="value">&lt; 0.5° (3-Axis)</span>
                  </div>
                  <div className="spec-card-metric">
                    <span className="label">Downlink</span>
                    <span className="value">UHF / S-Band</span>
                  </div>
                </div>
                <div className="spec-card-action">
                  <button className="btn-outline" onClick={onOpenContact}>
                    <span>Inquire for 3U Slot</span>
                  </button>
                </div>
              </div>

              <div className="spec-card">
                <div className="spec-card-lead">
                  <div className="spec-card-header">
                    <span className="tag-pill">CUBESAT CLASS</span>
                    <h3 className="spec-card-title">6U / 12U Platform</h3>
                  </div>
                  <p className="spec-card-desc">
                    High-capacity nanosatellite platform for multispectral optical imaging, tactical communications, and RF mapping.
                  </p>
                </div>
                <div className="spec-card-metrics">
                  <div className="spec-card-metric">
                    <span className="label">Payload Volume</span>
                    <span className="value">4U to 8U</span>
                  </div>
                  <div className="spec-card-metric">
                    <span className="label">Average Bus Power</span>
                    <span className="value">40W — 85W</span>
                  </div>
                  <div className="spec-card-metric">
                    <span className="label">Pointing Accuracy</span>
                    <span className="value">&lt; 0.1° (Star Tracker)</span>
                  </div>
                  <div className="spec-card-metric">
                    <span className="label">Downlink</span>
                    <span className="value">S-Band / X-Band (50 Mbps)</span>
                  </div>
                </div>
                <div className="spec-card-action">
                  <button className="btn-outline" onClick={onOpenContact}>
                    <span>Inquire for 6U/12U Slot</span>
                  </button>
                </div>
              </div>

              <div className="spec-card featured">
                <div className="spec-card-lead">
                  <div className="spec-card-header">
                    <span className="tag-pill accent">FLAGSHIP SMALLSAT</span>
                    <h3 className="spec-card-title">150kg SmallSat Bus</h3>
                  </div>
                  <p className="spec-card-desc">
                    Heavy sovereign Earth observation, sub-meter optical resolution, SAR sensors, and institutional constellation missions.
                  </p>
                </div>
                <div className="spec-card-metrics">
                  <div className="spec-card-metric">
                    <span className="label">Payload Mass</span>
                    <span className="value">Up to 85 kg</span>
                  </div>
                  <div className="spec-card-metric">
                    <span className="label">Average Bus Power</span>
                    <span className="value">250W — 450W (Peak 900W)</span>
                  </div>
                  <div className="spec-card-metric">
                    <span className="label">Pointing Accuracy</span>
                    <span className="value">&lt; 0.02° (Dual Star Trackers)</span>
                  </div>
                  <div className="spec-card-metric">
                    <span className="label">Downlink</span>
                    <span className="value">X-Band &amp; Ka-Band (300+ Mbps)</span>
                  </div>
                </div>
                <div className="spec-card-action">
                  <button className="btn-cta" onClick={onOpenContact}>
                    <span>Request 150kg Spec Sheet</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>

            {/* Clean Spec Comparison Table */}
            <div className="specs-table-wrapper" style={{ marginTop: "48px" }}>
              <div className="specs-table-header">
                <h3>Detailed Platform Comparison Matrix</h3>
                <span className="sub">All parameters verified through thermal vacuum and vibration screening</span>
              </div>
              <div className="table-responsive">
                <table className="clean-table">
                  <thead>
                    <tr>
                      <th>Parameter</th>
                      <th>3U CubeSat</th>
                      <th>6U / 12U CubeSat</th>
                      <th className="highlight-col">150kg SmallSat Platform</th>
                    </tr>
                  </thead>
                  <tbody>
                    {platformSpecTable.map((row, i) => (
                      <tr key={i}>
                        <td className="param-name">{row.parameter}</td>
                        <td>{row.cubesat3U}</td>
                        <td>{row.cubesat6U12U}</td>
                        <td className="highlight-cell">{row.smallsat150kg}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* TAB 2: FLIGHT AVIONICS & SOFTWARE                                    */}
      {/* -------------------------------------------------------------------- */}
      {activeTab === "avionics" && (
        <section className="tab-section-content" data-reveal>
          <div className="site-container">
            <div className="section-header-clean">
              <span className="section-kicker">AVIONICS ARCHITECTURE</span>
              <h2 className="section-title-clean">
                RADIATION-TOLERANT FLIGHT COMPUTING.
              </h2>
              <p className="section-lead-clean">
                Engineered for continuous operation in low Earth orbit. Built with hardware root-of-trust,
                fault-tolerant bus topologies, and deterministic real-time execution.
              </p>
            </div>

            {/* Avionics Satellite Visual Bar */}
            <div className="platform-visual-bar" data-reveal>
              <div className="platform-visual-media">
                <img
                  src={images.satellite}
                  alt="Radiation-tolerant flight avionics and satellite systems"
                  className="platform-visual-img"
                />
                <span className="platform-visual-tag">LUNE-OBC-V2 // RAD-HARD SILICON</span>
              </div>
              <div className="platform-visual-details">
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <span className="tag-pill accent">INTEGRATED FLIGHT SILICON</span>
                  <span className="tag-pill">DUAL LOCKSTEP EPS</span>
                </div>
                <h3 className="platform-visual-title">Hardened Avionics &amp; Power Architecture</h3>
                <p className="platform-visual-desc">
                  Radiation-tolerant flight computer running dual ARM Cortex-M7 cores in lockstep at 400 MHz,
                  providing deterministic real-time telemetry processing, SpaceWire payload interfaces,
                  and automated fault recovery.
                </p>
                <div className="platform-visual-specs-row">
                  <div>
                    <span className="lbl">Compute Speed</span>
                    <span className="val">400 MHz Lockstep</span>
                  </div>
                  <div>
                    <span className="lbl">Total Ionizing Dose</span>
                    <span className="val">&gt; 30 krad (Si)</span>
                  </div>
                  <div>
                    <span className="lbl">Telemetry Bus</span>
                    <span className="val">CAN 2.0B / SpaceWire</span>
                  </div>
                  <div>
                    <span className="lbl">Efficiency</span>
                    <span className="val">96% MPPT Conversion</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="avionics-pillars-grid">
              <div className="avionics-card">
                <div className="avionics-card-lead">
                  <div className="avionics-card-icon">
                    <Cpu size={24} />
                  </div>
                  <h3 className="avionics-card-title">Dual Lockstep OBC Core</h3>
                </div>
                <p className="avionics-card-desc">
                  ARM Cortex-M7 cores running identical instruction sequences with cycle-accurate
                  hardware comparators that trap single-event transients instantaneously without reboot.
                </p>
                <ul className="clean-bullet-list">
                  <li><Check size={14} /> Clock speed: 400 MHz deterministic execution</li>
                  <li><Check size={14} /> Single Event Latchup (SEL) immune &gt; 35 MeV-cm²/mg</li>
                  <li><Check size={14} /> Triple-modular redundancy (TMR) ECC memory scrubbing</li>
                </ul>
              </div>

              <div className="avionics-card">
                <div className="avionics-card-lead">
                  <div className="avionics-card-icon">
                    <ShieldCheck size={24} />
                  </div>
                  <h3 className="avionics-card-title">Multi-Channel Power Distribution (EPS)</h3>
                </div>
                <p className="avionics-card-desc">
                  High-efficiency Maximum Power Point Tracking (MPPT) solar regulation, autonomous battery
                  cell state-of-charge balancing, and galvanically isolated payload rails.
                </p>
                <ul className="clean-bullet-list">
                  <li><Check size={14} /> Regulated output rails: 28V, 12V, 5V, 3.3V</li>
                  <li><Check size={14} /> Overcurrent trip latency &lt; 10 microseconds</li>
                  <li><Check size={14} /> Autonomous thermal heater management during eclipse</li>
                </ul>
              </div>

              <div className="avionics-card">
                <div className="avionics-card-lead">
                  <div className="avionics-card-icon">
                    <Layers size={24} />
                  </div>
                  <h3 className="avionics-card-title">Differential Data Harness</h3>
                </div>
                <p className="avionics-card-desc">
                  High-reliability communications combining SpaceWire (100 Mbps) for optical payload data,
                  dual-redundant CAN 2.0B for subsystem telemetry, and isolated RS-422 channels.
                </p>
                <ul className="clean-bullet-list">
                  <li><Check size={14} /> SpaceWire packet switching interface</li>
                  <li><Check size={14} /> Galvanic ground isolation across all payloads</li>
                  <li><Check size={14} /> Mil-spec twisted shielded pair harnessing</li>
                </ul>
              </div>

              <div className="avionics-card">
                <div className="avionics-card-lead">
                  <div className="avionics-card-icon">
                    <Cpu size={24} />
                  </div>
                  <h3 className="avionics-card-title">Edge Orbital Neural Inference</h3>
                </div>
                <p className="avionics-card-desc">
                  Dedicated 4.2 TOPS low-power neural processing unit (NPU) for on-orbit imagery classification,
                  cloud-cover filtering, and automatic maritime detection prior to downlink.
                </p>
                <ul className="clean-bullet-list">
                  <li><Check size={14} /> 4.2 TOPS INT8 edge neural compute</li>
                  <li><Check size={14} /> Real-time cloud screening preserves downlink bandwidth</li>
                  <li><Check size={14} /> In-orbit firmware and neural weight updates</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* TAB 3: ABUJA TEST & INTEGRATION FACILITIES                           */}
      {/* -------------------------------------------------------------------- */}
      {activeTab === "facilities" && (
        <section className="tab-section-content" data-reveal>
          <div className="site-container">
            <div className="section-header-clean">
              <span className="section-kicker">PHYSICAL INFRASTRUCTURE</span>
              <h2 className="section-title-clean">
                SOVEREIGN INTEGRATION &amp; TEST CAMPUS.
              </h2>
              <p className="section-lead-clean">
                LUNE is establishing indigenous aerospace infrastructure in Abuja:
                ISO Class 7 cleanrooms, thermal vacuum chambers, dynamic vibration benches,
                and flight harness integration.
              </p>
            </div>

            {/* Facilities Visual Bar */}
            <div className="platform-visual-bar" data-reveal>
              <div className="platform-visual-media">
                <img
                  src={images.manufacturing}
                  alt="Abuja aerospace cleanroom and qualification laboratories"
                  className="platform-visual-img"
                />
                <span className="platform-visual-tag">ABUJA LABS // ISO CLASS 7</span>
              </div>
              <div className="platform-visual-details">
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <span className="tag-pill accent">SOVEREIGN INFRASTRUCTURE</span>
                  <span className="tag-pill">TVAC + 20 KN SHAKER</span>
                </div>
                <h3 className="platform-visual-title">Cleanroom Integration &amp; Environmental Test Labs</h3>
                <p className="platform-visual-desc">
                  Indigenous ISO 14644-1 Class 7 cleanrooms, thermal vacuum chamber (-60°C to +125°C),
                  and 20 kN electromagnetic shaker system for full sine/random vibration qualification
                  meeting NASA GEVS and ECSS space flight standards.
                </p>
                <div className="platform-visual-specs-row">
                  <div>
                    <span className="lbl">Cleanroom Class</span>
                    <span className="val">ISO Class 7</span>
                  </div>
                  <div>
                    <span className="lbl">Thermal Vacuum</span>
                    <span className="val">10⁻⁶ Torr / TVAC</span>
                  </div>
                  <div>
                    <span className="lbl">Shaker Force</span>
                    <span className="val">20 kN Sine/Random</span>
                  </div>
                  <div>
                    <span className="lbl">Qualification</span>
                    <span className="val">NASA GEVS / ECSS</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="facilities-cards-grid">
              {facilitySpecs.map((fac) => (
                <div key={fac.id} className="facility-clean-card">
                  <div className="facility-clean-lead">
                    <div className="facility-clean-header">
                      <span className="tag-pill">{fac.code}</span>
                      <span className="tag-pill accent">ABUJA CAMPUS</span>
                    </div>
                    <h3 className="facility-clean-title">{fac.name}</h3>
                    <span className="facility-clean-class">{fac.classification}</span>
                  </div>
                  <p className="facility-clean-desc">{fac.description}</p>
                  <ul className="clean-bullet-list">
                    {fac.specs.map((spec, i) => (
                      <li key={i}>{spec}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* CTA FOOTER BANNER                                                    */}
      {/* -------------------------------------------------------------------- */}
      <section className="cta-banner-section">
        <div className="site-container">
          <div className="cta-banner-clean" data-reveal>
            <div className="cta-banner-left">
              <span className="section-kicker">FLIGHT INTEGRATION</span>
              <h3 className="cta-banner-heading">
                Ready to book your payload or flight slot?
              </h3>
              <p className="cta-banner-description">
                Our integration engineers in Abuja provide end-to-end mission design,
                cleanroom assembly, TVAC screening, and launch procurement support.
              </p>
            </div>
            <div className="cta-banner-right">
              <button className="btn-cta" onClick={onOpenContact}>
                <span>Dispatch Inquiry</span>
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
