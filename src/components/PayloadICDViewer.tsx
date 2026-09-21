import React, { useState } from "react";
import {
  Activity,
  Box,
  Cpu,
  Download,
  FileCode,
  Flame,
  Layers,
  Radio,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface PayloadICDViewerProps {
  onOpenContact?: () => void;
}

export function PayloadICDViewer({ onOpenContact }: PayloadICDViewerProps) {
  const [activeTab, setActiveTab] = useState<"mechanical" | "electrical" | "data" | "environmental">("mechanical");
  const [activeBus, setActiveBus] = useState<"cubesat" | "smallsat">("cubesat");

  const downloadSimulatedICD = () => {
    const icdData = {
      document: "LUNE Payload Interface Control Document (ICD)",
      version: "2.4-REV-A",
      standard: "ECSS-E-ST-50 & NASA GEVS",
      classification: "COMMERCIAL & DEFENSE SPECIFICATION",
      platform: activeBus === "cubesat" ? "LUNE-12U Modular CubeSat" : "LUNE-150 SmallSat",
      mechanical: {
        envelope_mm: activeBus === "cubesat" ? "226.3 × 226.3 × 340.5" : "800 × 800 × 1000",
        payload_mass_kg: activeBus === "cubesat" ? 9.0 : 65.0,
        mounting_fasteners: "M3 Aerospace Grade A286 / Titanium Grade 5",
        cg_tolerance_mm: "±8.0mm from geometric volume center",
      },
      electrical: {
        unregulated_bus_voltage_v: "28.0 (22.0V - 33.6V)",
        regulated_avionics_rails_v: ["5.0V ±1%", "3.3V ±1%"],
        peak_current_a: activeBus === "cubesat" ? 6.0 : 25.0,
        latchup_protection: "Solid-state current limiter with 12ms auto-trip",
      },
      data_interfaces: [
        { protocol: "SpaceWire", standard: "ECSS-E-ST-50-52C", max_rate: "100 Mbps" },
        { protocol: "CAN 2.0B", rate: "1.0 Mbps", addressing: "29-bit CANaerospace" },
        { protocol: "RS-422", baud: "921.6 kbps", duplex: "Full Duplex" },
        { timing: "GPS PPS (Pulse-Per-Second)", accuracy: "±50 ns" },
      ],
      environmental_testing: {
        random_vibration_grms: 14.1,
        tvac_temperature_range_c: "-40 to +85",
        tvac_vacuum_torr: "1.0e-5",
        thermal_dwell_cycles: 4,
        radiation_tid_krad: 20,
      },
    };

    const blob = new Blob([JSON.stringify(icdData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `LUNE_ICD_${activeBus.toUpperCase()}_v2.4.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      style={{
        background: "rgba(12, 14, 19, 0.85)",
        border: "1px solid var(--accent)",
        borderRadius: "14px",
        overflow: "hidden",
        backdropFilter: "blur(20px)",
      }}
      data-reveal
    >
      {/* Top Header Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
          padding: "18px 24px",
          borderBottom: "1px solid var(--line)",
          background: "rgba(154, 138, 90, 0.08)",
        }}
      >
        <div>
          <span className="micro-label">PAYLOAD USER'S GUIDE (PUG) // VERSION 2.4</span>
          <h3
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "14px",
              letterSpacing: "0.08em",
              margin: "4px 0 0",
              color: "var(--text)",
            }}
          >
            INTERACTIVE PAYLOAD INTERFACE CONTROL DOCUMENT (ICD)
          </h3>
        </div>

        {/* Bus form factor toggle */}
        <div style={{ display: "flex", gap: "6px" }}>
          <button
            type="button"
            onClick={() => setActiveBus("cubesat")}
            style={{
              padding: "6px 12px",
              borderRadius: "4px",
              fontSize: "11px",
              fontFamily: "var(--font-mono, monospace)",
              background: activeBus === "cubesat" ? "var(--accent)" : "rgba(255,255,255,0.05)",
              color: activeBus === "cubesat" ? "#090A0C" : "var(--muted)",
              fontWeight: activeBus === "cubesat" ? 700 : 400,
              border: "none",
              cursor: "pointer",
            }}
          >
            CUBESAT (3U–12U)
          </button>
          <button
            type="button"
            onClick={() => setActiveBus("smallsat")}
            style={{
              padding: "6px 12px",
              borderRadius: "4px",
              fontSize: "11px",
              fontFamily: "var(--font-mono, monospace)",
              background: activeBus === "smallsat" ? "var(--accent)" : "rgba(255,255,255,0.05)",
              color: activeBus === "smallsat" ? "#090A0C" : "var(--muted)",
              fontWeight: activeBus === "smallsat" ? 700 : 400,
              border: "none",
              cursor: "pointer",
            }}
          >
            SMALLSAT (150KG ESPA)
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid var(--line)",
          background: "rgba(16, 18, 24, 0.9)",
          overflowX: "auto",
        }}
      >
        {[
          { id: "mechanical", label: "MECHANICAL ENVELOPE", icon: Box },
          { id: "electrical", label: "POWER & ELECTRICAL", icon: Zap },
          { id: "data", label: "DATA & TELEMETRY", icon: Cpu },
          { id: "environmental", label: "QUALIFICATION TESTING", icon: ShieldCheck },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 18px",
                border: "none",
                background: isActive ? "rgba(194, 155, 98, 0.12)" : "transparent",
                borderBottom: isActive ? "2px solid var(--accent)" : "2px solid transparent",
                color: isActive ? "var(--accent)" : "var(--muted)",
                fontSize: "11px",
                fontFamily: "var(--font-mono, monospace)",
                fontWeight: isActive ? 600 : 400,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.2s ease",
              }}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Panels */}
      <div style={{ padding: "24px" }}>
        {activeTab === "mechanical" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            <div>
              <h4 style={{ fontSize: "14px", color: "var(--accent)", margin: "0 0 12px", fontFamily: "var(--font-mono, monospace)" }}>
                DIMENSIONAL & MASS CONSTRAINTS
              </h4>
              <table className="spec-matrix" style={{ width: "100%", fontSize: "12px" }}>
                <tbody>
                  <tr>
                    <td className="spec-param">Allowable Payload Volume</td>
                    <td>{activeBus === "cubesat" ? "200 × 200 × 300 mm (12U Bay)" : "700 × 700 × 900 mm"}</td>
                  </tr>
                  <tr>
                    <td className="spec-param">Max Dedicated Payload Mass</td>
                    <td>{activeBus === "cubesat" ? "Up to 9.0 kg" : "Up to 65.0 kg"}</td>
                  </tr>
                  <tr>
                    <td className="spec-param">Center of Gravity (CG) Window</td>
                    <td>Within ±8.0 mm of geometric center</td>
                  </tr>
                  <tr>
                    <td className="spec-param">Standard Mechanical Interface</td>
                    <td>{activeBus === "cubesat" ? "PC/104 stack + M3 Hardened Rails" : "ESPA 24-bolt circle ring"}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ background: "rgba(255,255,255,0.02)", padding: "16px", borderRadius: "8px", border: "1px solid var(--line)" }}>
              <span className="micro-label">THERMAL EXPANSION COMPLIANCE</span>
              <p style={{ fontSize: "12px", color: "var(--muted)", margin: "8px 0" }}>
                Payload chassis must match satellite structural Coefficient of Thermal Expansion (CTE).
                LUNE primary bus structures are CNC-milled from aerospace **Aluminium 6061-T651** and additive
                **Ti-6Al-4V titanium**.
              </p>
              <div style={{ fontSize: "11px", color: "var(--accent)", fontFamily: "var(--font-mono, monospace)" }}>
                ✓ Structural stiffness: First fundamental bending mode &gt; 90 Hz
              </div>
            </div>
          </div>
        )}

        {activeTab === "electrical" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            <div>
              <h4 style={{ fontSize: "14px", color: "var(--accent)", margin: "0 0 12px", fontFamily: "var(--font-mono, monospace)" }}>
                POWER HARNESSING & RAILS
              </h4>
              <table className="spec-matrix" style={{ width: "100%", fontSize: "12px" }}>
                <tbody>
                  <tr>
                    <td className="spec-param">Unregulated Battery Rail</td>
                    <td>28.0 V nominal (22.0 V to 33.6 V Li-Ion)</td>
                  </tr>
                  <tr>
                    <td className="spec-param">Regulated Digital Rail</td>
                    <td>5.0 V ±1% (up to 3.5 A continuous)</td>
                  </tr>
                  <tr>
                    <td className="spec-param">Low-Noise Sensor Rail</td>
                    <td>3.3 V ±0.5% (up to 2.0 A continuous)</td>
                  </tr>
                  <tr>
                    <td className="spec-param">Peak Transient Current</td>
                    <td>{activeBus === "cubesat" ? "8.0 A for 500ms" : "30.0 A for 2000ms"}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ background: "rgba(255,255,255,0.02)", padding: "16px", borderRadius: "8px", border: "1px solid var(--line)" }}>
              <span className="micro-label">ELECTRICAL PROTECTION</span>
              <p style={{ fontSize: "12px", color: "var(--muted)", margin: "8px 0" }}>
                Every power channel features latchup current limiters (LCL) with automated overcurrent
                disconnects within 12 milliseconds to protect the primary satellite power bus.
              </p>
              <div style={{ fontSize: "11px", color: "#4ADE80", fontFamily: "var(--font-mono, monospace)" }}>
                ✓ Galvanic isolation: &gt; 10 MΩ at 50V DC
              </div>
            </div>
          </div>
        )}

        {activeTab === "data" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            <div>
              <h4 style={{ fontSize: "14px", color: "var(--accent)", margin: "0 0 12px", fontFamily: "var(--font-mono, monospace)" }}>
                AVIONICS BUS PROTOCOLS
              </h4>
              <table className="spec-matrix" style={{ width: "100%", fontSize: "12px" }}>
                <tbody>
                  <tr>
                    <td className="spec-param">High-Throughput Payload Data</td>
                    <td>SpaceWire ECSS-E-ST-50-52C (up to 100 Mbps LVDS)</td>
                  </tr>
                  <tr>
                    <td className="spec-param">Command & Telemetry (C&DH)</td>
                    <td>Dual Redundant CAN 2.0B (1 Mbps CANaerospace)</td>
                  </tr>
                  <tr>
                    <td className="spec-param">Auxiliary Diagnostic Line</td>
                    <td>RS-422 Differential UART (up to 921.6 kbps)</td>
                  </tr>
                  <tr>
                    <td className="spec-param">Time Synchronization</td>
                    <td>GPS Pulse-Per-Second (PPS) line, &lt;50 ns jitter</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ background: "rgba(255,255,255,0.02)", padding: "16px", borderRadius: "8px", border: "1px solid var(--line)" }}>
              <span className="micro-label">TELEMETRY DOWNLINK PIPELINE</span>
              <p style={{ fontSize: "12px", color: "var(--muted)", margin: "8px 0" }}>
                Payload data is buffered into on-board high-reliability NVMe storage before automated transmission
                via high-speed X-Band (150 Mbps) direct to the Abuja Telemetry Gateway.
              </p>
              <div style={{ fontSize: "11px", color: "var(--accent)", fontFamily: "var(--font-mono, monospace)" }}>
                ✓ Framing: CCSDS 131.0-B-3 Space Data Link Protocol
              </div>
            </div>
          </div>
        )}

        {activeTab === "environmental" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            <div>
              <h4 style={{ fontSize: "14px", color: "var(--accent)", margin: "0 0 12px", fontFamily: "var(--font-mono, monospace)" }}>
                QUALIFICATION TEST PROFILES
              </h4>
              <table className="spec-matrix" style={{ width: "100%", fontSize: "12px" }}>
                <tbody>
                  <tr>
                    <td className="spec-param">Random Vibration Qualification</td>
                    <td>14.1 Grms overall (NASA GEVS / ECSS profile, 3-axis)</td>
                  </tr>
                  <tr>
                    <td className="spec-param">Thermal Vacuum (TVAC) Range</td>
                    <td>-40°C to +85°C at &lt; 10⁻⁵ Torr vacuum</td>
                  </tr>
                  <tr>
                    <td className="spec-param">Thermal Dwell Cycles</td>
                    <td>4 complete thermal cycles, 4-hour soak at plateaus</td>
                  </tr>
                  <tr>
                    <td className="spec-param">Radiation Tolerance (TID)</td>
                    <td>20 krad(Si) minimum total ionizing dose qualification</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ background: "rgba(255,255,255,0.02)", padding: "16px", borderRadius: "8px", border: "1px solid var(--line)" }}>
              <span className="micro-label">IN-HOUSE ABUJA TEST FACILITY</span>
              <p style={{ fontSize: "12px", color: "var(--muted)", margin: "8px 0" }}>
                All acceptance and qualification testing is performed natively inside LUNE's Abuja campus
                featuring our 20 kN electromagnetic shaker table and ISO Class 7 cleanrooms.
              </p>
              <div style={{ fontSize: "11px", color: "#4ADE80", fontFamily: "var(--font-mono, monospace)" }}>
                ✓ Cleanroom environment: FED-STD-209E Class 10,000
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
            marginTop: "24px",
            paddingTop: "16px",
            borderTop: "1px solid var(--line)",
          }}
        >
          <button
            type="button"
            onClick={downloadSimulatedICD}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 16px",
              borderRadius: "6px",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid var(--line)",
              color: "var(--text)",
              fontSize: "12px",
              fontFamily: "var(--font-mono, monospace)",
              cursor: "pointer",
            }}
          >
            <Download size={14} />
            <span>DOWNLOAD {activeBus.toUpperCase()} ICD SPEC (JSON)</span>
          </button>

          {onOpenContact && (
            <button
              type="button"
              onClick={onOpenContact}
              className="btn-cta btn-magnetic"
              style={{ padding: "10px 20px", fontSize: "11px" }}
            >
              <span>REQUEST 3D STEP CAD MODELS</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
