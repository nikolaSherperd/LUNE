import React, { useEffect, useRef, useState } from "react";
import { Compass, Crosshair, Eye, Play, RotateCcw, ShieldCheck, Target, Zap } from "lucide-react";

export function ADCSSimulator() {
  const [controlMode, setControlMode] = useState<"nadir" | "sun" | "target" | "detumble">("nadir");
  const [angles, setAngles] = useState({ roll: 0.0, pitch: 0.0, yaw: 0.0 });
  const [rates, setRates] = useState({ rollRate: 0.0, pitchRate: 0.0, yawRate: 0.0 });
  const [pointingErrorDeg, setPointingErrorDeg] = useState(0.024);
  const [wheelRPM, setWheelRPM] = useState({ x: 1820, y: -2410, z: 890 });
  const [starTrackerLocked, setStarTrackerLocked] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;

    const render = () => {
      time += 0.02;

      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
      }

      const w = rect.width;
      const h = rect.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      // Attitude Sphere Background
      ctx.fillStyle = "#0A0C10";
      ctx.fillRect(0, 0, w, h);

      // Gimbal Rings / Wireframe Attitude Sphere
      const r = Math.min(w, h) * 0.38;

      ctx.strokeStyle = "rgba(194, 155, 98, 0.15)";
      ctx.lineWidth = 1;

      // Outer Pitch/Roll reticle
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.65, 0, Math.PI * 2);
      ctx.setLineDash([2, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Horizon line
      let rollOffset = 0;
      let pitchOffset = 0;

      if (controlMode === "nadir") {
        rollOffset = Math.sin(time * 0.8) * 1.5;
        pitchOffset = Math.cos(time * 0.6) * 1.2;
      } else if (controlMode === "sun") {
        rollOffset = Math.sin(time * 0.4) * 0.8 + 25;
        pitchOffset = Math.cos(time * 0.3) * 0.5 - 15;
      } else if (controlMode === "target") {
        rollOffset = Math.sin(time * 1.2) * 0.4;
        pitchOffset = Math.cos(time * 1.1) * 0.3;
      } else if (controlMode === "detumble") {
        rollOffset = Math.sin(time * 3) * 8;
        pitchOffset = Math.cos(time * 2.5) * 6;
      }

      // Artificial Horizon
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate((rollOffset * Math.PI) / 180);

      // Sky/Ground divide
      ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-r, pitchOffset);
      ctx.lineTo(r, pitchOffset);
      ctx.stroke();

      // Pitch ladders
      for (let p = -20; p <= 20; p += 10) {
        if (p === 0) continue;
        const yPos = pitchOffset - (p / 30) * (r * 0.7);
        const ladderW = p % 20 === 0 ? 30 : 18;
        ctx.strokeStyle = "rgba(194, 155, 98, 0.4)";
        ctx.beginPath();
        ctx.moveTo(-ladderW, yPos);
        ctx.lineTo(ladderW, yPos);
        ctx.stroke();

        ctx.fillStyle = "rgba(194, 155, 98, 0.6)";
        ctx.font = "9px 'JetBrains Mono', monospace";
        ctx.fillText(`${p}°`, ladderW + 4, yPos + 3);
      }

      ctx.restore();

      // Fixed Crosshairs (Boresight)
      ctx.strokeStyle = "#C29B62";
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(cx - 16, cy);
      ctx.lineTo(cx - 4, cy);
      ctx.moveTo(cx + 4, cy);
      ctx.lineTo(cx + 16, cy);
      ctx.moveTo(cx, cy - 16);
      ctx.lineTo(cx, cy - 4);
      ctx.moveTo(cx, cy + 4);
      ctx.lineTo(cx, cy + 16);
      ctx.stroke();

      // Central target dot
      ctx.fillStyle = controlMode === "detumble" ? "#EF4444" : "#4ADE80";
      ctx.beginPath();
      ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Update state angles smoothly
      setAngles({
        roll: parseFloat(rollOffset.toFixed(2)),
        pitch: parseFloat(pitchOffset.toFixed(2)),
        yaw: parseFloat((Math.sin(time * 0.5) * 2).toFixed(2)),
      });

      setPointingErrorDeg(
        controlMode === "detumble" ? 4.12 : controlMode === "target" ? 0.018 : 0.026
      );

      setWheelRPM({
        x: Math.round(1800 + Math.sin(time) * 120),
        y: Math.round(-2400 + Math.cos(time * 1.2) * 150),
        z: Math.round(900 + Math.sin(time * 0.8) * 80),
      });

      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [controlMode]);

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
          <Crosshair size={18} style={{ color: "var(--accent)" }} />
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
              SPACECRAFT ATTITUDE DETERMINATION & CONTROL (ADCS)
            </h3>
            <span style={{ fontSize: "11px", color: "var(--muted)" }}>
              3-Axis reaction wheel momentum management & fine target pointing
            </span>
          </div>
        </div>

        {/* Mode Selector Buttons */}
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {[
            { id: "nadir", label: "NADIR (EARTH)" },
            { id: "sun", label: "SUN-TRACKING" },
            { id: "target", label: "ABUJA TARGET SLEW" },
            { id: "detumble", label: "B-DOT DETUMBLE" },
          ].map((mode) => (
            <button
              key={mode.id}
              type="button"
              onClick={() => setControlMode(mode.id as any)}
              style={{
                padding: "5px 10px",
                borderRadius: "4px",
                fontSize: "11px",
                fontFamily: "var(--font-mono, monospace)",
                background:
                  controlMode === mode.id
                    ? "rgba(194, 155, 98, 0.2)"
                    : "rgba(255, 255, 255, 0.04)",
                border:
                  controlMode === mode.id
                    ? "1px solid var(--accent)"
                    : "1px solid var(--line)",
                color: controlMode === mode.id ? "var(--text)" : "var(--muted)",
                cursor: "pointer",
              }}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: "24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
            alignItems: "center",
          }}
        >
          {/* Attitude Gyro Canvas */}
          <div
            style={{
              position: "relative",
              height: "300px",
              background: "#0A0C10",
              borderRadius: "10px",
              border: "1px solid var(--line)",
              overflow: "hidden",
            }}
          >
            <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />

            {/* Readout HUD Overlay */}
            <div
              style={{
                position: "absolute",
                top: "10px",
                left: "12px",
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "10px",
                color: "var(--muted)",
              }}
            >
              <div>ROLL: <strong style={{ color: "var(--text)" }}>{angles.roll}°</strong></div>
              <div>PITCH: <strong style={{ color: "var(--text)" }}>{angles.pitch}°</strong></div>
              <div>YAW: <strong style={{ color: "var(--text)" }}>{angles.yaw}°</strong></div>
            </div>

            <div
              style={{
                position: "absolute",
                bottom: "10px",
                right: "12px",
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "10px",
                textAlign: "right",
              }}
            >
              <div style={{ color: "var(--accent)" }}>
                POINTING ERROR: <strong>{pointingErrorDeg}°</strong>
              </div>
              <div style={{ color: "#4ADE80" }}>STAR TRACKER: LOCKED</div>
            </div>
          </div>

          {/* Subsystem Metrics & Reaction Wheels */}
          <div>
            <span className="micro-label">ACTUATOR MOMENTUM STATUS</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "12px" }}>
              {/* Wheel X */}
              <div style={{ background: "rgba(255,255,255,0.02)", padding: "12px 14px", borderRadius: "8px", border: "1px solid var(--line)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "4px" }}>
                  <span>REACTION WHEEL X (ROLL)</span>
                  <strong style={{ color: "var(--accent)", fontFamily: "var(--font-mono, monospace)" }}>
                    {wheelRPM.x} RPM
                  </strong>
                </div>
                <div style={{ height: "4px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(Math.abs(wheelRPM.x) / 6000) * 100}%`, background: "var(--accent)" }} />
                </div>
              </div>

              {/* Wheel Y */}
              <div style={{ background: "rgba(255,255,255,0.02)", padding: "12px 14px", borderRadius: "8px", border: "1px solid var(--line)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "4px" }}>
                  <span>REACTION WHEEL Y (PITCH)</span>
                  <strong style={{ color: "var(--accent)", fontFamily: "var(--font-mono, monospace)" }}>
                    {wheelRPM.y} RPM
                  </strong>
                </div>
                <div style={{ height: "4px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(Math.abs(wheelRPM.y) / 6000) * 100}%`, background: "var(--accent)" }} />
                </div>
              </div>

              {/* Wheel Z */}
              <div style={{ background: "rgba(255,255,255,0.02)", padding: "12px 14px", borderRadius: "8px", border: "1px solid var(--line)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "4px" }}>
                  <span>REACTION WHEEL Z (YAW)</span>
                  <strong style={{ color: "var(--accent)", fontFamily: "var(--font-mono, monospace)" }}>
                    {wheelRPM.z} RPM
                  </strong>
                </div>
                <div style={{ height: "4px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(Math.abs(wheelRPM.z) / 6000) * 100}%`, background: "var(--accent)" }} />
                </div>
              </div>
            </div>

            <div style={{ marginTop: "16px", display: "flex", gap: "16px", fontSize: "11px", color: "var(--muted)" }}>
              <span>✓ Magnetorquer Dipole: 0.2 A·m²</span>
              <span>✓ Pointing Knowledge: &lt; 0.005°</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
