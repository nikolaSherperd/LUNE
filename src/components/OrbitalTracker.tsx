import React, { useEffect, useRef, useState } from "react";
import { Activity, Clock, Globe2, Pause, Play, Radio, RotateCcw, Signal, Zap } from "lucide-react";

interface SatelliteOrbit {
  id: string;
  name: string;
  designation: string;
  orbitType: string;
  altitudeKm: number;
  inclinationDeg: number;
  periodMin: number;
  downlinkFreq: string;
  color: string;
}

interface GroundStation {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
  freq: string;
}

const TRACKED_SATELLITES: SatelliteOrbit[] = [
  {
    id: "lune-pathfinder-1",
    name: "LUNE Pathfinder-1",
    designation: "LUNE-PF1 / NORAD 98412",
    orbitType: "Sun-Synchronous (SSO)",
    altitudeKm: 540,
    inclinationDeg: 97.5,
    periodMin: 95.4,
    downlinkFreq: "2245.5 MHz S-Band",
    color: "#C29B62",
  },
  {
    id: "afri-obs-3",
    name: "AFRI-OBS-3 Multi-Spectral",
    designation: "AFRI-OBS / NORAD 99104",
    orbitType: "Polar LEO",
    altitudeKm: 620,
    inclinationDeg: 98.2,
    periodMin: 97.1,
    downlinkFreq: "8120.0 MHz X-Band",
    color: "#E5C388",
  },
  {
    id: "pausn-sat-1",
    name: "PAUSN Student Explorer",
    designation: "PAUSN-1 / NORAD 99781",
    orbitType: "Low Earth Orbit (LEO)",
    altitudeKm: 480,
    inclinationDeg: 51.6,
    periodMin: 94.2,
    downlinkFreq: "436.7 MHz UHF",
    color: "#8E929B",
  },
];

const GROUND_STATIONS: GroundStation[] = [
  { id: "abuja", name: "ABUJA GATEWAY (HQ)", country: "Nigeria", lat: 9.0765, lon: 7.3986, freq: "S/X-Band" },
  { id: "nairobi", name: "NAIROBI RELAY", country: "Kenya", lat: -1.2921, lon: 36.8219, freq: "S-Band" },
  { id: "capetown", name: "CAPE TOWN PASS", country: "South Africa", lat: -33.9249, lon: 18.4241, freq: "X/Ka-Band" },
  { id: "cairo", name: "CAIRO GATEWAY", country: "Egypt", lat: 30.0444, lon: 31.2357, freq: "UHF/S-Band" },
];

export function OrbitalTracker() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedSat, setSelectedSat] = useState<SatelliteOrbit>(TRACKED_SATELLITES[0]);
  const [selectedGS, setSelectedGS] = useState<GroundStation>(GROUND_STATIONS[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [activeLinkStation, setActiveLinkStation] = useState<string | null>(null);

  const [telemetry, setTelemetry] = useState({
    lat: 0,
    lon: 0,
    altitude: 540,
    velocity: 7.59,
    rangeToStationKm: 0,
    elevationDeg: 0,
    isAOS: false,
    nextPassCountdownSec: 2840,
  });

  const animRef = useRef<number | null>(null);
  const progressRef = useRef(0.24);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let lastTime = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const render = (time: number) => {
      const deltaSec = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      if (isPlaying) {
        const orbitRate = (1 / (selectedSat.periodMin * 60)) * 60 * speedMultiplier;
        progressRef.current = (progressRef.current + deltaSec * orbitRate * 0.05) % 1;
      }

      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      // Canvas background
      ctx.fillStyle = "#090B0E";
      ctx.fillRect(0, 0, w, h);

      // Parallels (latitudes)
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";

      for (let lat = -60; lat <= 60; lat += 30) {
        const y = h / 2 - (lat / 90) * (h / 2);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();

        ctx.fillStyle = "rgba(255, 255, 255, 0.18)";
        ctx.font = "9px 'JetBrains Mono', monospace";
        ctx.fillText(`${Math.abs(lat)}°${lat >= 0 ? "N" : "S"}`, 6, y - 3);
      }

      // Meridians (longitudes)
      for (let lon = -180; lon <= 180; lon += 45) {
        const x = ((lon + 180) / 360) * w;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();

        if (lon > -180 && lon < 180) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.18)";
          ctx.font = "9px 'JetBrains Mono', monospace";
          ctx.fillText(`${Math.abs(lon)}°${lon >= 0 ? "E" : "W"}`, x + 4, h - 8);
        }
      }

      // Equator
      ctx.strokeStyle = "rgba(194, 155, 98, 0.22)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.stroke();

      // Coordinate converter helper
      const toCanvas = (lat: number, lon: number) => ({
        x: ((lon + 180) / 360) * w,
        y: h / 2 - (lat / 90) * (h / 2),
      });

      // Africa continent outline
      ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
      ctx.lineWidth = 1;
      ctx.fillStyle = "rgba(255, 255, 255, 0.015)";

      const africaCoords: [number, number][] = [
        [37, 10], [32, 32], [22, 38], [11, 43], [12, 51], [2, 45],
        [-4, 40], [-12, 40], [-26, 33], [-34, 18], [-33, 27],
        [-22, 14], [-5, 12], [4, 9], [5, -4], [15, -17], [28, -13],
        [35, -6], [37, 10]
      ];

      ctx.beginPath();
      africaCoords.forEach(([lat, lon], idx) => {
        const pt = toCanvas(lat, lon);
        if (idx === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.stroke();
      ctx.fill();

      // Satellite position calculation
      const phase = progressRef.current * Math.PI * 2;
      const satLat = Math.sin(phase) * selectedSat.inclinationDeg * (selectedSat.inclinationDeg > 90 ? 0.9 : 1);
      const satLon = ((progressRef.current * 360 * 1.5) % 360) - 180;
      const satPt = toCanvas(satLat, satLon);

      // Draw Orbit Trajectory Line
      ctx.beginPath();
      ctx.strokeStyle = "rgba(194, 155, 98, 0.32)";
      ctx.lineWidth = 1.4;

      const samples = 140;
      for (let i = 0; i <= samples; i++) {
        const frac = i / samples;
        const p = frac * Math.PI * 2;
        const lat = Math.sin(p) * selectedSat.inclinationDeg * (selectedSat.inclinationDeg > 90 ? 0.9 : 1);
        const lon = ((frac * 360 * 1.5) % 360) - 180;
        const pt = toCanvas(lat, lon);
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.stroke();

      // Draw Ground Stations & Detect AOS
      let anyAOSStation: GroundStation | null = null;

      GROUND_STATIONS.forEach((gs) => {
        const gsPt = toCanvas(gs.lat, gs.lon);
        const distPx = Math.hypot(satPt.x - gsPt.x, satPt.y - gsPt.y);
        const isThisAOS = distPx < 42;
        const isSelected = selectedGS.id === gs.id;

        if (isThisAOS) anyAOSStation = gs;

        // Station footprint circle
        ctx.beginPath();
        ctx.arc(gsPt.x, gsPt.y, 40, 0, Math.PI * 2);
        ctx.strokeStyle = isThisAOS
          ? "rgba(74, 222, 128, 0.5)"
          : isSelected
          ? "rgba(194, 155, 98, 0.4)"
          : "rgba(255, 255, 255, 0.1)";
        ctx.setLineDash([2, 3]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Pulse wave for selected or AOS station
        if (isThisAOS || isSelected) {
          const pulse = (time * 0.002) % 1;
          ctx.beginPath();
          ctx.arc(gsPt.x, gsPt.y, 40 + pulse * 18, 0, Math.PI * 2);
          ctx.strokeStyle = isThisAOS
            ? `rgba(74, 222, 128, ${0.4 * (1 - pulse)})`
            : `rgba(194, 155, 98, ${0.3 * (1 - pulse)})`;
          ctx.stroke();
        }

        // Station marker point
        ctx.fillStyle = isThisAOS ? "#4ADE80" : isSelected ? "#C29B62" : "#9CA3AF";
        ctx.beginPath();
        ctx.arc(gsPt.x, gsPt.y, isSelected ? 3.8 : 2.8, 0, Math.PI * 2);
        ctx.fill();

        // Label
        ctx.fillStyle = isThisAOS ? "#4ADE80" : isSelected ? "#C29B62" : "rgba(255,255,255,0.4)";
        ctx.font = "8.5px 'JetBrains Mono', monospace";
        ctx.fillText(gs.id.toUpperCase(), gsPt.x + 6, gsPt.y + 3);

        // Draw downlink beam if in AOS
        if (isThisAOS) {
          ctx.beginPath();
          ctx.moveTo(satPt.x, satPt.y);
          ctx.lineTo(gsPt.x, gsPt.y);
          ctx.strokeStyle = "#4ADE80";
          ctx.lineWidth = 1.4;
          ctx.setLineDash([3, 3]);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      });

      setActiveLinkStation(anyAOSStation ? (anyAOSStation as GroundStation).name : null);

      // Satellite Footprint & Marker
      ctx.beginPath();
      ctx.arc(satPt.x, satPt.y, 28, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(194, 155, 98, 0.09)";
      ctx.fill();
      ctx.strokeStyle = selectedSat.color;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.arc(satPt.x, satPt.y, 4, 0, Math.PI * 2);
      ctx.fill();

      // Calculate distance to selected station
      const dLat = ((selectedGS.lat - satLat) * Math.PI) / 180;
      const dLon = ((selectedGS.lon - satLon) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((satLat * Math.PI) / 180) *
          Math.cos((selectedGS.lat * Math.PI) / 180) *
          Math.sin(dLon / 2) ** 2;
      const groundDistKm = Math.round(6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
      const slantRangeKm = Math.round(Math.hypot(groundDistKm, selectedSat.altitudeKm));
      const targetAOS = groundDistKm < 1800;

      // Update telemetry state
      setTelemetry({
        lat: parseFloat(satLat.toFixed(2)),
        lon: parseFloat(satLon.toFixed(2)),
        altitude: selectedSat.altitudeKm,
        velocity: parseFloat((7.9 - Math.sqrt(selectedSat.altitudeKm) * 0.013).toFixed(2)),
        rangeToStationKm: slantRangeKm,
        elevationDeg: targetAOS ? Math.max(5, Math.round(90 - (groundDistKm / 1800) * 85)) : 0,
        isAOS: targetAOS,
        nextPassCountdownSec: targetAOS ? 0 : Math.max(60, Math.round((groundDistKm / 7.6) % 3600)),
      });

      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [selectedSat, selectedGS, isPlaying, speedMultiplier]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div
      style={{
        background: "rgba(10, 12, 16, 0.88)",
        border: "1px solid var(--line)",
        borderRadius: "14px",
        overflow: "hidden",
        backdropFilter: "blur(20px)",
      }}
      data-reveal
    >
      {/* Top telemetry control bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
          padding: "16px 22px",
          borderBottom: "1px solid var(--line)",
          background: "rgba(14, 16, 22, 0.92)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Globe2 size={16} style={{ color: "var(--accent)" }} />
          <div>
            <strong
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "12px",
                letterSpacing: "0.08em",
                color: "var(--text)",
              }}
            >
              PAN-AFRICAN TELEMETRY & GROUND STATION NETWORK
            </strong>
          </div>
          <span className="domain-pill">LIVE SGP4</span>
        </div>

        {/* Satellite Selection */}
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {TRACKED_SATELLITES.map((sat) => (
            <button
              key={sat.id}
              type="button"
              onClick={() => setSelectedSat(sat)}
              style={{
                background:
                  selectedSat.id === sat.id ? "rgba(194, 155, 98, 0.2)" : "transparent",
                border:
                  selectedSat.id === sat.id
                    ? "1px solid var(--accent)"
                    : "1px solid var(--line)",
                color: selectedSat.id === sat.id ? "var(--text)" : "var(--muted)",
                padding: "4px 10px",
                borderRadius: "4px",
                fontSize: "11px",
                fontFamily: "var(--font-mono, monospace)",
                cursor: "pointer",
              }}
            >
              {sat.name.split(" ")[0]}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            type="button"
            onClick={() => setIsPlaying((p) => !p)}
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid var(--line)",
              color: "var(--text)",
              padding: "5px 9px",
              borderRadius: "4px",
              fontSize: "11px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              cursor: "pointer",
            }}
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} />}
            <span>{isPlaying ? "PAUSE" : "RESUME"}</span>
          </button>

          <button
            type="button"
            onClick={() => setSpeedMultiplier((s) => (s === 1 ? 5 : s === 5 ? 10 : 1))}
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid var(--line)",
              color: "var(--accent)",
              padding: "5px 9px",
              borderRadius: "4px",
              fontSize: "11px",
              fontFamily: "var(--font-mono, monospace)",
              cursor: "pointer",
            }}
          >
            {speedMultiplier}x SPEED
          </button>
        </div>
      </div>

      {/* Ground Station Focus Strip */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          padding: "10px 22px",
          background: "rgba(11, 13, 17, 0.7)",
          borderBottom: "1px solid var(--line)",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontSize: "11px", color: "var(--muted)", fontFamily: "var(--font-mono, monospace)" }}>
          GATEWAY FOCUS:
        </span>
        {GROUND_STATIONS.map((gs) => (
          <button
            key={gs.id}
            type="button"
            onClick={() => setSelectedGS(gs)}
            style={{
              background: selectedGS.id === gs.id ? "rgba(194, 155, 98, 0.15)" : "transparent",
              border: selectedGS.id === gs.id ? "1px solid var(--accent)" : "1px solid transparent",
              color: selectedGS.id === gs.id ? "var(--accent)" : "var(--muted)",
              padding: "3px 8px",
              borderRadius: "4px",
              fontSize: "10px",
              fontFamily: "var(--font-mono, monospace)",
              cursor: "pointer",
            }}
          >
            {gs.name} ({gs.country})
          </button>
        ))}

        {activeLinkStation && (
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "#4ADE80",
              fontSize: "11px",
              fontFamily: "var(--font-mono, monospace)",
            }}
          >
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ADE80" }} />
            DOWNLINK ACTIVE: {activeLinkStation}
          </div>
        )}
      </div>

      {/* Canvas View */}
      <div style={{ position: "relative", width: "100%", height: "370px" }}>
        <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />

        {/* Floating Telemetry HUD */}
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            left: "14px",
            background: "rgba(8, 10, 14, 0.88)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "6px",
            padding: "10px 14px",
            backdropFilter: "blur(12px)",
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "11px",
            color: "var(--text)",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            pointerEvents: "none",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: telemetry.isAOS ? "#4ADE80" : "var(--accent)",
                boxShadow: telemetry.isAOS ? "0 0 8px #4ADE80" : "none",
              }}
            />
            <strong style={{ color: "var(--accent)" }}>{selectedSat.designation}</strong>
          </div>
          <div style={{ color: "var(--muted)", fontSize: "10px" }}>
            SUB-SAT LAT: {telemetry.lat}° / LON: {telemetry.lon}° | ALT: {telemetry.altitude} KM
          </div>
          <div style={{ color: telemetry.isAOS ? "#4ADE80" : "#9CA3AF", fontSize: "10px" }}>
            {selectedGS.name}: {telemetry.isAOS ? `AOS ACTIVE (ELEV ${telemetry.elevationDeg}°)` : `LOS (NEXT PASS: ${formatTime(telemetry.nextPassCountdownSec)})`}
          </div>
        </div>
      </div>

      {/* Bottom Grid Parameters */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "12px",
          padding: "14px 20px",
          background: "rgba(11, 13, 17, 0.95)",
          borderTop: "1px solid var(--line)",
        }}
      >
        <div>
          <span style={{ fontSize: "10px", color: "var(--muted)", display: "block" }}>
            ORBIT REGIME
          </span>
          <strong style={{ fontSize: "12px", color: "var(--text)" }}>
            {selectedSat.orbitType}
          </strong>
        </div>
        <div>
          <span style={{ fontSize: "10px", color: "var(--muted)", display: "block" }}>
            INCLINATION / PERIOD
          </span>
          <strong style={{ fontSize: "12px", color: "var(--text)" }}>
            {selectedSat.inclinationDeg}° / {selectedSat.periodMin}m
          </strong>
        </div>
        <div>
          <span style={{ fontSize: "10px", color: "var(--muted)", display: "block" }}>
            SELECTED GATEWAY
          </span>
          <strong style={{ fontSize: "12px", color: "var(--accent)" }}>
            {selectedGS.name}
          </strong>
        </div>
        <div>
          <span style={{ fontSize: "10px", color: "var(--muted)", display: "block" }}>
            DOWNLINK PASS RANGE
          </span>
          <strong style={{ fontSize: "12px", color: telemetry.isAOS ? "#4ADE80" : "var(--text)" }}>
            {telemetry.rangeToStationKm} KM ({telemetry.isAOS ? "IN SIGHT" : "STANDBY"})
          </strong>
        </div>
      </div>
    </div>
  );
}
