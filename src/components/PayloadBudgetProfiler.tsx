import React, { useState } from "react";
import { AlertCircle, BatteryCharging, CheckCircle, Database, HardDrive, Sun, Zap } from "lucide-react";

export function PayloadBudgetProfiler() {
  const [peakPowerW, setPeakPowerW] = useState(25);
  const [standbyPowerW, setStandbyPowerW] = useState(4);
  const [dutyCyclePct, setDutyCyclePct] = useState(20);
  const [dataRateMbps, setDataRateMbps] = useState(15);
  const [busBatteryWh, setBusBatteryWh] = useState(80); // LUNE standard 80Wh or 160Wh packs

  // Assumed 95-minute orbit: 60 min daylight, 35 min eclipse
  const orbitDurationMin = 95;
  const daylightMin = 60;
  const eclipseMin = 35;

  // Active time vs standby time per orbit
  const activeMin = (orbitDurationMin * dutyCyclePct) / 100;
  const standbyMin = orbitDurationMin - activeMin;

  // Average power over orbit (Watts)
  const averagePowerW =
    (peakPowerW * activeMin + standbyPowerW * standbyMin) / orbitDurationMin;

  // Total Energy used per orbit (Watt-hours)
  const energyPerOrbitWh = (averagePowerW * orbitDurationMin) / 60;

  // Eclipse power usage: assume worst-case (active during entire or partial eclipse)
  const eclipseEnergyWh =
    (averagePowerW * eclipseMin) / 60;

  // Battery Depth of Discharge (DoD %)
  const batteryDoDPct = Math.min(100, Math.round((eclipseEnergyWh / busBatteryWh) * 100));

  // Minimum Solar Array Power needed during daylight (W) to power bus + recharge battery (assuming 85% charging efficiency)
  const solarPowerRequiredW = Math.round(
    averagePowerW + (eclipseEnergyWh / (daylightMin / 60)) / 0.85
  );

  // Data generation per orbit (Gigabytes)
  // Data generated during active minutes: activeMin * 60 seconds * (Mbps / 8) / 1000 GB
  const dataPerOrbitGB = parseFloat(
    ((activeMin * 60 * (dataRateMbps / 8)) / 1000).toFixed(2)
  );
  const dataPerDayGB = parseFloat((dataPerOrbitGB * (1440 / orbitDurationMin)).toFixed(1));

  // Downlink feasibility over 4 daily passes (9 min each = 36 min/day)
  // S-Band capability: 2 Mbps -> 2/8 * 60 * 36 / 1000 = ~0.54 GB/day
  // X-Band capability: 150 Mbps -> 150/8 * 60 * 36 / 1000 = ~40.5 GB/day
  const sbandCapacityGB = 0.54;
  const xbandCapacityGB = 40.5;

  const sbandFeasible = dataPerDayGB <= sbandCapacityGB;
  const xbandFeasible = dataPerDayGB <= xbandCapacityGB;

  return (
    <div
      style={{
        background: "rgba(12, 14, 19, 0.82)",
        border: "1px solid var(--line)",
        borderRadius: "14px",
        overflow: "hidden",
        backdropFilter: "blur(20px)",
      }}
      data-reveal
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
          padding: "18px 24px",
          borderBottom: "1px solid var(--line)",
          background: "rgba(16, 18, 24, 0.9)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Zap size={18} style={{ color: "var(--accent)" }} />
          <div>
            <h3
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "13px",
                letterSpacing: "0.08em",
                margin: 0,
                color: "var(--text)",
                fontWeight: 700,
              }}
            >
              PAYLOAD ELECTRICAL & DATA BUDGET PROFILER
            </h3>
            <span style={{ fontSize: "11px", color: "var(--muted)" }}>
              Thermal, battery Depth-of-Discharge (DoD) and RF downlink margin estimator
            </span>
          </div>
        </div>
        <span className="domain-pill">SUBSYSTEM PROFILER</span>
      </div>

      <div style={{ padding: "clamp(18px, 3vw, 28px)" }}>
        {/* Controls Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            marginBottom: "28px",
          }}
        >
          {/* Peak Power Slider */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.02)",
              padding: "16px",
              borderRadius: "8px",
              border: "1px solid var(--line)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <label className="field-label">PEAK PAYLOAD POWER</label>
              <strong style={{ color: "var(--accent)", fontFamily: "var(--font-mono, monospace)" }}>
                {peakPowerW} W
              </strong>
            </div>
            <input
              type="range"
              min={2}
              max={150}
              step={1}
              value={peakPowerW}
              onChange={(e) => setPeakPowerW(parseInt(e.target.value))}
              style={{ width: "100%", accentColor: "var(--accent)" }}
            />
            <span style={{ fontSize: "10px", color: "var(--muted)" }}>During active payload operation</span>
          </div>

          {/* Duty Cycle Slider */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.02)",
              padding: "16px",
              borderRadius: "8px",
              border: "1px solid var(--line)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <label className="field-label">PAYLOAD DUTY CYCLE</label>
              <strong style={{ color: "var(--accent)", fontFamily: "var(--font-mono, monospace)" }}>
                {dutyCyclePct} %
              </strong>
            </div>
            <input
              type="range"
              min={5}
              max={100}
              step={5}
              value={dutyCyclePct}
              onChange={(e) => setDutyCyclePct(parseInt(e.target.value))}
              style={{ width: "100%", accentColor: "var(--accent)" }}
            />
            <span style={{ fontSize: "10px", color: "var(--muted)" }}>
              {activeMin.toFixed(0)} min active / {orbitDurationMin} min orbit
            </span>
          </div>

          {/* Data Generation Rate */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.02)",
              padding: "16px",
              borderRadius: "8px",
              border: "1px solid var(--line)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <label className="field-label">SENSOR DATA RATE</label>
              <strong style={{ color: "var(--accent)", fontFamily: "var(--font-mono, monospace)" }}>
                {dataRateMbps} Mbps
              </strong>
            </div>
            <input
              type="range"
              min={1}
              max={80}
              step={1}
              value={dataRateMbps}
              onChange={(e) => setDataRateMbps(parseInt(e.target.value))}
              style={{ width: "100%", accentColor: "var(--accent)" }}
            />
            <span style={{ fontSize: "10px", color: "var(--muted)" }}>
              Raw instrument stream
            </span>
          </div>

          {/* Bus Battery Capacity Selector */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.02)",
              padding: "16px",
              borderRadius: "8px",
              border: "1px solid var(--line)",
            }}
          >
            <label className="field-label" style={{ marginBottom: "8px", display: "block" }}>
              BUS BATTERY CAPACITY
            </label>
            <div style={{ display: "flex", gap: "8px" }}>
              {[40, 80, 160, 320].map((cap) => (
                <button
                  key={cap}
                  type="button"
                  onClick={() => setBusBatteryWh(cap)}
                  style={{
                    flex: 1,
                    padding: "6px 4px",
                    borderRadius: "4px",
                    background:
                      busBatteryWh === cap
                        ? "rgba(194, 155, 98, 0.2)"
                        : "rgba(255, 255, 255, 0.04)",
                    border:
                      busBatteryWh === cap
                        ? "1px solid var(--accent)"
                        : "1px solid var(--line)",
                    color: busBatteryWh === cap ? "var(--text)" : "var(--muted)",
                    fontSize: "11px",
                    fontFamily: "var(--font-mono, monospace)",
                    cursor: "pointer",
                  }}
                >
                  {cap}Wh
                </button>
              ))}
            </div>
            <span style={{ fontSize: "10px", color: "var(--muted)", marginTop: "6px", display: "block" }}>
              Li-Ion Aerospace 18650/21700 Pack
            </span>
          </div>
        </div>

        {/* Calculated Results Bar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
            background: "rgba(9, 11, 15, 0.9)",
            borderRadius: "10px",
            padding: "20px",
            border: "1px solid var(--line)",
          }}
        >
          {/* Battery Depth of Discharge */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
              <BatteryCharging size={14} style={{ color: "var(--accent)" }} />
              <span className="micro-label">ECLIPSE BATTERY DoD</span>
            </div>
            <div
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color:
                  batteryDoDPct <= 20
                    ? "#4ADE80"
                    : batteryDoDPct <= 35
                    ? "#F59E0B"
                    : "#EF4444",
              }}
            >
              {batteryDoDPct}%
            </div>
            <div
              style={{
                height: "6px",
                background: "rgba(255, 255, 255, 0.08)",
                borderRadius: "3px",
                overflow: "hidden",
                margin: "8px 0",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${batteryDoDPct}%`,
                  background:
                    batteryDoDPct <= 20
                      ? "#4ADE80"
                      : batteryDoDPct <= 35
                      ? "#F59E0B"
                      : "#EF4444",
                }}
              />
            </div>
            <span style={{ fontSize: "10px", color: "var(--muted)" }}>
              {batteryDoDPct <= 20
                ? "Optimal (>5 yr battery lifetime)"
                : batteryDoDPct <= 35
                ? "Moderate (3-5 yr lifetime)"
                : "High Stress (<3 yr lifetime)"}
            </span>
          </div>

          {/* Solar Power Generation Needed */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
              <Sun size={14} style={{ color: "var(--accent)" }} />
              <span className="micro-label">REQUIRED SOLAR GEN</span>
            </div>
            <div style={{ fontSize: "22px", fontWeight: 700, color: "var(--text)" }}>
              {solarPowerRequiredW} W
            </div>
            <span style={{ fontSize: "11px", color: "var(--muted)", marginTop: "6px", display: "block" }}>
              Avg Orbit Draw: {averagePowerW.toFixed(1)}W
            </span>
            <span style={{ fontSize: "10px", color: "var(--muted)" }}>
              Recharges battery during daylight
            </span>
          </div>

          {/* Daily Data Volume */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
              <Database size={14} style={{ color: "var(--accent)" }} />
              <span className="micro-label">DAILY SENSOR DATA</span>
            </div>
            <div style={{ fontSize: "22px", fontWeight: 700, color: "var(--text)" }}>
              {dataPerDayGB} <span style={{ fontSize: "12px", color: "var(--muted)" }}>GB/day</span>
            </div>
            <span style={{ fontSize: "11px", color: "var(--muted)", marginTop: "6px", display: "block" }}>
              Per Orbit: {dataPerOrbitGB} GB
            </span>
            <span style={{ fontSize: "10px", color: "var(--muted)" }}>
              Active capture: {activeMin.toFixed(0)} min/rev
            </span>
          </div>

          {/* Downlink Channel Recommendation */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
              <HardDrive size={14} style={{ color: "var(--accent)" }} />
              <span className="micro-label">DOWNLINK READINESS</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px" }}>
                {sbandFeasible ? (
                  <CheckCircle size={13} style={{ color: "#4ADE80" }} />
                ) : (
                  <AlertCircle size={13} style={{ color: "#EF4444" }} />
                )}
                <span>S-Band (2 Mbps): {sbandFeasible ? "Sufficient" : "Exceeds Capacity"}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px" }}>
                {xbandFeasible ? (
                  <CheckCircle size={13} style={{ color: "#4ADE80" }} />
                ) : (
                  <AlertCircle size={13} style={{ color: "#EF4444" }} />
                )}
                <span style={{ color: "var(--accent)" }}>
                  X-Band (150 Mbps): {xbandFeasible ? "Recommended" : "High Volume"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
