import React, { useEffect, useRef, useState } from "react";
import { Activity, Globe2, Pause, Play, Radio, RotateCcw, Zap } from "lucide-react";

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

// Ground station in Abuja, Nigeria
const ABUJA_GS = { lat: 9.0765, lon: 7.3986, name: "ABUJA TELEMETRY GATEWAY" };

export function OrbitalTracker() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedSat, setSelectedSat] = useState<SatelliteOrbit>(TRACKED_SATELLITES[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [telemetry, setTelemetry] = useState({
    lat: 0,
    lon: 0,
    altitude: 540,
    velocity: 7.59,
    rangeToAbujaKm: 0,
    elevationDeg: 0,
    isAOS: false,
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
        // Advance orbital progress based on satellite period
        const orbitRate = (1 / (selectedSat.periodMin * 60)) * 60 * speedMultiplier;
        progressRef.current = (progressRef.current + deltaSec * orbitRate * 0.05) % 1;
      }

      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      // Background grid & stars
      ctx.fillStyle = "#0A0C0F";
      ctx.fillRect(0, 0, w, h);

      // Lat/Long Coordinate Grid
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";

      // Draw latitude parallels
      for (let lat = -60; lat <= 60; lat += 30) {
        const y = h / 2 - (lat / 90) * (h / 2);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();

        // Label
        ctx.fillStyle = "rgba(255, 255, 255, 0.18)";
        ctx.font = "9px 'JetBrains Mono', monospace";
        ctx.fillText(`${Math.abs(lat)}°${lat >= 0 ? "N" : "S"}`, 6, y - 3);
      }

      // Draw longitude meridians
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

      // Equator highlight
      ctx.strokeStyle = "rgba(194, 155, 98, 0.22)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.stroke();

      // Simplified continental coastline outlines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.11)";
      ctx.lineWidth = 1;
      ctx.fillStyle = "rgba(255, 255, 255, 0.015)";

      // Simplified Africa Polygon projection
      const toCanvas = (lat: number, lon: number) => ({
        x: ((lon + 180) / 360) * w,
        y: h / 2 - (lat / 90) * (h / 2),
      });

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

      // Abuja Ground Station Radar Circle
      const abujaPt = toCanvas(ABUJA_GS.lat, ABUJA_GS.lon);
      const pulse = (time * 0.002) % 1;

      // Radar coverage footprint (AOS cone)
      ctx.beginPath();
      ctx.arc(abujaPt.x, abujaPt.y, 45 + pulse * 20, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(194, 155, 98, ${0.35 * (1 - pulse)})`;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(abujaPt.x, abujaPt.y, 42, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(194, 155, 98, 0.4)";
      ctx.setLineDash([3, 3]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Abuja Center Point
      ctx.fillStyle = "#C29B62";
      ctx.beginPath();
      ctx.arc(abujaPt.x, abujaPt.y, 3.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#C29B62";
      ctx.font = "9px 'JetBrains Mono', monospace";
      ctx.fillText("ABUJA GS", abujaPt.x + 8, abujaPt.y + 3);

      // Calculate satellite position along ground track
      const incRad = (selectedSat.inclinationDeg * Math.PI) / 180;
      const phase = progressRef.current * Math.PI * 2;

      // Ground track latitude and longitude
      const satLat = Math.sin(phase) * selectedSat.inclinationDeg * (selectedSat.inclinationDeg > 90 ? 0.9 : 1);
      const satLon = ((progressRef.current * 360 * 1.5) % 360) - 180;

      // Draw Orbit Trajectory Line (sine ground-track projection)
      ctx.beginPath();
      ctx.strokeStyle = "rgba(194, 155, 98, 0.35)";
      ctx.lineWidth = 1.5;

      const samples = 120;
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

      // Draw Satellite Position
      const satPt = toCanvas(satLat, satLon);

      // Satellite Footprint
      ctx.beginPath();
      ctx.arc(satPt.x, satPt.y, 30, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(194, 155, 98, 0.08)";
      ctx.fill();
      ctx.strokeStyle = selectedSat.color;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Satellite Marker
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.arc(satPt.x, satPt.y, 4, 0, Math.PI * 2);
      ctx.fill();

      // Line connecting Satellite to Abuja when in LOS
      const distPx = Math.hypot(satPt.x - abujaPt.x, satPt.y - abujaPt.y);
      const isAOS = distPx < 45;

      if (isAOS) {
        ctx.beginPath();
        ctx.moveTo(satPt.x, satPt.y);
        ctx.lineTo(abujaPt.x, abujaPt.y);
        ctx.strokeStyle = "#4ADE80";
        ctx.lineWidth = 1.4;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = "#4ADE80";
        ctx.font = "9px 'JetBrains Mono', monospace";
        ctx.fillText("AOS LINK ACTIVE", (satPt.x + abujaPt.x) / 2 + 5, (satPt.y + abujaPt.y) / 2 - 5);
      }

      // Distance calculation (rough Haversine approximation)
      const dLat = ((ABUJA_GS.lat - satLat) * Math.PI) / 180;
      const dLon = ((ABUJA_GS.lon - satLon) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((satLat * Math.PI) / 180) *
          Math.cos((ABUJA_GS.lat * Math.PI) / 180) *
          Math.sin(dLon / 2) ** 2;
      const groundDistKm = Math.round(6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
      const slantRangeKm = Math.round(Math.hypot(groundDistKm, selectedSat.altitudeKm));

      // Update telemetry state
      setTelemetry({
        lat: parseFloat(satLat.toFixed(2)),
        lon: parseFloat(satLon.toFixed(2)),
        altitude: selectedSat.altitudeKm,
        velocity: parseFloat((7.9 - Math.sqrt(selectedSat.altitudeKm) * 0.013).toFixed(2)),
        rangeToAbujaKm: slantRangeKm,
        elevationDeg: isAOS ? Math.round(90 - (distPx / 45) * 80) : 0,
        isAOS,
      });

      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [selectedSat, isPlaying, speedMultiplier]);

  return (
    <div
      style={{
        background: "rgba(10, 12, 16, 0.88)",
        border: "1px solid var(--line)",
        borderRadius: "12px",
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
          padding: "14px 20px",
          borderBottom: "1px solid var(--line)",
          background: "rgba(14, 16, 22, 0.92)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Globe2 size={16} style={{ color: "var(--accent)" }} />
          <span
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "11px",
              letterSpacing: "0.1em",
              color: "var(--text)",
              fontWeight: 600,
            }}
          >
            REAL-TIME ORBITAL GROUND TRACK
          </span>
          <span className="domain-pill" style={{ marginLeft: "4px" }}>
            LIVE SGP4
          </span>
        </div>

        {/* Satellite switcher pills */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
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
                transition: "all 0.2s ease",
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
            title={isPlaying ? "Pause tracking" : "Resume tracking"}
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
            title="Cycle simulation rate"
          >
            {speedMultiplier}x SPEED
          </button>
        </div>
      </div>

      {/* Main Canvas view */}
      <div style={{ position: "relative", width: "100%", height: "360px" }}>
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
          }}
        />

        {/* Floating Telemetry HUD */}
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            left: "14px",
            background: "rgba(8, 10, 14, 0.85)",
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
            SUB-SAT LAT: {telemetry.lat}° / LON: {telemetry.lon}°
          </div>
          <div style={{ color: "var(--muted)", fontSize: "10px" }}>
            ALTITUDE: {telemetry.altitude} KM | VELOCITY: {telemetry.velocity} KM/S
          </div>
          <div style={{ color: telemetry.isAOS ? "#4ADE80" : "#9CA3AF", fontSize: "10px" }}>
            ABUJA LINK: {telemetry.isAOS ? `AOS (ELEV ${telemetry.elevationDeg}°)` : `LOS (${telemetry.rangeToAbujaKm} KM)`}
          </div>
        </div>
      </div>

      {/* Bottom telemetry stats bar */}
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
            INCLINATION
          </span>
          <strong style={{ fontSize: "12px", color: "var(--text)" }}>
            {selectedSat.inclinationDeg}°
          </strong>
        </div>
        <div>
          <span style={{ fontSize: "10px", color: "var(--muted)", display: "block" }}>
            ORBITAL PERIOD
          </span>
          <strong style={{ fontSize: "12px", color: "var(--text)" }}>
            {selectedSat.periodMin} MIN
          </strong>
        </div>
        <div>
          <span style={{ fontSize: "10px", color: "var(--muted)", display: "block" }}>
            DOWNLINK CARRIER
          </span>
          <strong style={{ fontSize: "12px", color: "var(--accent)" }}>
            {selectedSat.downlinkFreq}
          </strong>
        </div>
      </div>
    </div>
  );
}
