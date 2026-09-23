import React, { useState } from "react";
import {
  ArrowRight,
  Calculator,
  Compass,
  Copy,
  Cpu,
  Gauge,
  Info,
  RotateCw,
  Send,
  Zap,
} from "lucide-react";

interface MissionCalculatorProps {
  onOpenContactWithMission?: (specText: string) => void;
}

const ORBIT_REGIMES = [
  {
    id: "sso",
    name: "Sun-Synchronous (SSO)",
    inclination: 97.4,
    desc: "Consistent solar illumination; optimal for optical Earth observation and SAR missions.",
    defaultAlt: 550,
  },
  {
    id: "mid-leo",
    name: "Mid-Inclination LEO (45°)",
    inclination: 45.0,
    desc: "Frequent revisit rates over African and tropical latitudes; optimal for weather and IoT.",
    defaultAlt: 500,
  },
  {
    id: "equatorial",
    name: "Equatorial LEO (9°)",
    inclination: 9.0,
    desc: "Direct ground track over Nigerian and equatorial telemetry stations; maximal downlink passes.",
    defaultAlt: 480,
  },
  {
    id: "polar",
    name: "Polar LEO (90°)",
    inclination: 90.0,
    desc: "Complete global coverage including polar regions; scientific and atmospheric sensing.",
    defaultAlt: 600,
  },
];

const PAYLOAD_CLASSES = [
  {
    id: "3u",
    name: "3U CubeSat",
    massKg: 4.5,
    bus: "LUNE-3U Bus",
    payloadMassMax: 2.0,
    volume: "10 × 10 × 30 cm",
  },
  {
    id: "6u",
    name: "6U CubeSat",
    massKg: 10.0,
    bus: "LUNE-6U Bus",
    payloadMassMax: 4.5,
    volume: "10 × 20 × 30 cm",
  },
  {
    id: "12u",
    name: "12U CubeSat",
    massKg: 20.0,
    bus: "LUNE-12U Bus",
    payloadMassMax: 9.0,
    volume: "20 × 20 × 30 cm",
  },
  {
    id: "150kg",
    name: "150kg SmallSat",
    massKg: 150.0,
    bus: "LUNE-150 Modular Platform",
    payloadMassMax: 65.0,
    volume: "80 × 80 × 100 cm",
  },
];

export function MissionCalculator({ onOpenContactWithMission }: MissionCalculatorProps) {
  const [selectedOrbit, setSelectedOrbit] = useState(ORBIT_REGIMES[0]);
  const [altitudeKm, setAltitudeKm] = useState(550);
  const [selectedPayload, setSelectedPayload] = useState(PAYLOAD_CLASSES[0]);
  const [copied, setCopied] = useState(false);

  // Orbital Mechanics Calculations
  const earthRadiusKm = 6371;
  const GM = 398600.4418; // km^3/s^2
  const r = earthRadiusKm + altitudeKm;

  // Orbital Velocity: v = sqrt(GM / r)
  const velocityKmS = Math.sqrt(GM / r);

  // Orbital Period: T = 2 * pi * sqrt(r^3 / GM)
  const periodSeconds = 2 * Math.PI * Math.sqrt(Math.pow(r, 3) / GM);
  const periodMinutes = periodSeconds / 60;

  // Eclipse Time Approximation (minutes)
  const eclipseFraction = (1 / Math.PI) * Math.asin(earthRadiusKm / r);
  const eclipseMinutes = periodMinutes * eclipseFraction;
  const daylightMinutes = periodMinutes - eclipseMinutes;

  // Atmospheric Drag Lifetime estimate (empirical King-Hele exponential model)
  const calculateLifetimeYears = (alt: number, mass: number) => {
    if (alt < 350) return 0.2;
    if (alt < 400) return 0.8;
    if (alt < 450) return 2.1;
    if (alt < 500) return 4.5;
    if (alt < 550) return 8.2;
    if (alt < 600) return 14.0;
    if (alt < 700) return 35.0;
    return 80.0;
  };
  const orbitalLifetimeYears = calculateLifetimeYears(altitudeKm, selectedPayload.massKg);

  // Daily Passes over Abuja Gateway (approximate based on inclination)
  const calculateDailyPasses = (inc: number) => {
    if (inc <= 15) return 8; // Equatorial: pass almost every orbit
    if (inc <= 60) return 5;
    return 4; // SSO / Polar
  };
  const dailyPasses = calculateDailyPasses(selectedOrbit.inclination);
  const dailyDownlinkMinutes = dailyPasses * 9.2; // average 9.2 min per pass

  // Delta-V needed for de-orbit at end of life (km/s)
  const rPerigeeDeorbit = earthRadiusKm + 120; // deorbit target perigee
  const deltaVDeorbitMS = Math.round(
    Math.abs(velocityKmS - Math.sqrt(GM * (2 / r - 1 / ((r + rPerigeeDeorbit) / 2)))) * 1000
  );

  const missionSpecString = `MISSION DESIGNATION SPECIFICATION // LUNE MISSION FORGE
Platform Bus: ${selectedPayload.bus} (${selectedPayload.name})
Orbit: ${selectedOrbit.name} at ${altitudeKm} km altitude
Inclination: ${selectedOrbit.inclination}°
Orbital Period: ${periodMinutes.toFixed(1)} min | Velocity: ${velocityKmS.toFixed(2)} km/s
Eclipse / Daylight: ${eclipseMinutes.toFixed(1)} min / ${daylightMinutes.toFixed(1)} min
Estimated Passive Orbital Lifetime: ~${orbitalLifetimeYears.toFixed(1)} years
Abuja Gateway Visibility: ${dailyPasses} passes/day (~${dailyDownlinkMinutes.toFixed(0)} min/day downlink)
Deorbit Delta-V Requirement: ~${deltaVDeorbitMS} m/s`;

  const handleCopy = () => {
    navigator.clipboard.writeText(missionSpecString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDispatch = () => {
    if (onOpenContactWithMission) {
      onOpenContactWithMission(missionSpecString);
    }
  };

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
          <Calculator size={18} style={{ color: "var(--accent)" }} />
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
              ORBITAL MISSION & DELTA-V CALCULATOR
            </h3>
            <span style={{ fontSize: "11px", color: "var(--muted)" }}>
              Orbital mechanics, downlink windows, and platform matching engine
            </span>
          </div>
        </div>
        <span className="domain-pill">MISSION FORGE V2.4</span>
      </div>

      <div style={{ padding: "clamp(18px, 3vw, 28px)" }}>
        {/* Step 1: Orbit Selection */}
        <div style={{ marginBottom: "26px" }}>
          <label className="field-label" style={{ marginBottom: "10px", display: "block" }}>
            1. SELECT ORBITAL REGIME
          </label>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "10px",
            }}
          >
            {ORBIT_REGIMES.map((regime) => (
              <button
                key={regime.id}
                type="button"
                onClick={() => {
                  setSelectedOrbit(regime);
                  setAltitudeKm(regime.defaultAlt);
                }}
                style={{
                  textAlign: "left",
                  padding: "12px 14px",
                  borderRadius: "8px",
                  background:
                    selectedOrbit.id === regime.id
                      ? "rgba(194, 155, 98, 0.12)"
                      : "rgba(255, 255, 255, 0.03)",
                  border:
                    selectedOrbit.id === regime.id
                      ? "1px solid var(--accent)"
                      : "1px solid var(--line)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong
                    style={{
                      fontSize: "12px",
                      color: selectedOrbit.id === regime.id ? "var(--accent)" : "var(--text)",
                      fontFamily: "var(--font-mono, monospace)",
                    }}
                  >
                    {regime.name}
                  </strong>
                  <span style={{ fontSize: "11px", color: "var(--muted)" }}>
                    {regime.inclination}°
                  </span>
                </div>
                <p style={{ fontSize: "11px", color: "var(--muted)", margin: "6px 0 0" }}>
                  {regime.desc}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Altitude Slider & Payload Form Factor */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
            marginBottom: "28px",
          }}
        >
          {/* Altitude Slider */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.02)",
              padding: "16px 18px",
              borderRadius: "10px",
              border: "1px solid var(--line)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <label className="field-label">2. TARGET ALTITUDE</label>
              <strong
                style={{
                  color: "var(--accent)",
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "14px",
                }}
              >
                {altitudeKm} KM
              </strong>
            </div>
            <input
              type="range"
              min={350}
              max={850}
              step={10}
              value={altitudeKm}
              onChange={(e) => setAltitudeKm(parseInt(e.target.value))}
              style={{
                width: "100%",
                accentColor: "var(--accent)",
                cursor: "pointer",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "10px",
                color: "var(--muted)",
                fontFamily: "var(--font-mono, monospace)",
                marginTop: "4px",
              }}
            >
              <span>350 km (VLEO)</span>
              <span>550 km (Standard SSO)</span>
              <span>850 km (High LEO)</span>
            </div>
          </div>

          {/* Payload Form Factor */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.02)",
              padding: "16px 18px",
              borderRadius: "10px",
              border: "1px solid var(--line)",
            }}
          >
            <label className="field-label" style={{ marginBottom: "8px", display: "block" }}>
              3. PAYLOAD CLASS & PLATFORM BUS
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              {PAYLOAD_CLASSES.map((pl) => (
                <button
                  key={pl.id}
                  type="button"
                  onClick={() => setSelectedPayload(pl)}
                  style={{
                    padding: "8px 10px",
                    borderRadius: "6px",
                    textAlign: "left",
                    background:
                      selectedPayload.id === pl.id
                        ? "rgba(194, 155, 98, 0.16)"
                        : "rgba(255, 255, 255, 0.04)",
                    border:
                      selectedPayload.id === pl.id
                        ? "1px solid var(--accent)"
                        : "1px solid var(--line)",
                    cursor: "pointer",
                  }}
                >
                  <strong
                    style={{
                      display: "block",
                      fontSize: "11px",
                      color: selectedPayload.id === pl.id ? "var(--accent)" : "var(--text)",
                    }}
                  >
                    {pl.name}
                  </strong>
                  <span style={{ fontSize: "10px", color: "var(--muted)" }}>
                    Max Payload: {pl.payloadMassMax} kg
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Real-time Computed Results Matrix */}
        <div
          style={{
            background: "rgba(9, 11, 15, 0.95)",
            borderRadius: "10px",
            border: "1px solid var(--line)",
            padding: "20px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "11px",
                color: "var(--accent)",
                letterSpacing: "0.1em",
              }}
            >
              COMPUTED MISSION TELEMETRY
            </span>
            <span style={{ fontSize: "11px", color: "var(--muted)" }}>
              Recommended: <strong>{selectedPayload.bus}</strong>
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "16px",
            }}
          >
            <div className="metric-cell" style={{ padding: "12px", background: "transparent" }}>
              <span className="micro-label">ORBITAL VELOCITY</span>
              <div style={{ fontSize: "18px", fontWeight: 700, color: "var(--text)" }}>
                {velocityKmS.toFixed(2)}{" "}
                <span style={{ fontSize: "11px", color: "var(--muted)" }}>km/s</span>
              </div>
              <span style={{ fontSize: "10px", color: "var(--muted)" }}>
                27,{Math.round(velocityKmS * 3600).toLocaleString()} km/h
              </span>
            </div>

            <div className="metric-cell" style={{ padding: "12px", background: "transparent" }}>
              <span className="micro-label">ORBITAL PERIOD</span>
              <div style={{ fontSize: "18px", fontWeight: 700, color: "var(--text)" }}>
                {periodMinutes.toFixed(1)}{" "}
                <span style={{ fontSize: "11px", color: "var(--muted)" }}>min</span>
              </div>
              <span style={{ fontSize: "10px", color: "var(--muted)" }}>
                {(1440 / periodMinutes).toFixed(1)} revs / day
              </span>
            </div>

            <div className="metric-cell" style={{ padding: "12px", background: "transparent" }}>
              <span className="micro-label">DAYLIGHT / ECLIPSE</span>
              <div style={{ fontSize: "18px", fontWeight: 700, color: "var(--text)" }}>
                {daylightMinutes.toFixed(0)}m / {eclipseMinutes.toFixed(0)}m
              </div>
              <span style={{ fontSize: "10px", color: "var(--muted)" }}>
                Solar gen: {((daylightMinutes / periodMinutes) * 100).toFixed(0)}% orbit
              </span>
            </div>

            <div className="metric-cell" style={{ padding: "12px", background: "transparent" }}>
              <span className="micro-label">PASSIVE LIFETIME</span>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: orbitalLifetimeYears > 25 ? "#F59E0B" : "var(--accent)",
                }}
              >
                ~{orbitalLifetimeYears.toFixed(1)}{" "}
                <span style={{ fontSize: "11px", color: "var(--muted)" }}>yrs</span>
              </div>
              <span style={{ fontSize: "10px", color: "var(--muted)" }}>
                {orbitalLifetimeYears <= 25 ? "Compliant (<25 yr rule)" : "Requires de-orbit drag sail"}
              </span>
            </div>

            <div className="metric-cell" style={{ padding: "12px", background: "transparent" }}>
              <span className="micro-label">ABUJA GATEWAY PASSES</span>
              <div style={{ fontSize: "18px", fontWeight: 700, color: "#4ADE80" }}>
                {dailyPasses}{" "}
                <span style={{ fontSize: "11px", color: "var(--muted)" }}>passes/day</span>
              </div>
              <span style={{ fontSize: "10px", color: "var(--muted)" }}>
                ~{dailyDownlinkMinutes.toFixed(0)} min/day downlink
              </span>
            </div>

            <div className="metric-cell" style={{ padding: "12px", background: "transparent" }}>
              <span className="micro-label">DEORBIT DELTA-V</span>
              <div style={{ fontSize: "18px", fontWeight: 700, color: "var(--text)" }}>
                {deltaVDeorbitMS}{" "}
                <span style={{ fontSize: "11px", color: "var(--muted)" }}>m/s</span>
              </div>
              <span style={{ fontSize: "10px", color: "var(--muted)" }}>
                To 120km disposal perigee
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <button
            type="button"
            onClick={handleCopy}
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
            <Copy size={13} />
            {copied ? "COPIED TO CLIPBOARD" : "COPY MISSION BRIEFING"}
          </button>

          {onOpenContactWithMission && (
            <button
              type="button"
              onClick={handleDispatch}
              className="btn-cta btn-magnetic"
              style={{
                fontSize: "11px",
                padding: "10px 20px",
              }}
            >
              <span>DISPATCH RFQ WITH THIS SPEC</span>
              <ArrowRight size={13} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
