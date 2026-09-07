import React, { useEffect, useState } from "react";
import { Activity } from "lucide-react";

interface StatusStripProps {
  onOpenSystem?: () => void;
}

export function StatusStrip({ onOpenSystem }: StatusStripProps) {
  const [utcTime, setUtcTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getUTCHours()).padStart(2, "0");
      const minutes = String(now.getUTCMinutes()).padStart(2, "0");
      const seconds = String(now.getUTCSeconds()).padStart(2, "0");
      setUtcTime(`${hours}:${minutes}:${seconds} UTC`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const data = [
    { label: "PROGRAM", value: "LUNE", detail: "DEEP-TECH INFRASTRUCTURE" },
    { label: "START", value: "01", detail: "SPACE SYSTEMS (LEO CUBESAT)" },
    { label: "PROGRESSION", value: "02", detail: "MANUFACTURE → OPERATE" },
    {
      label: "MISSION CLOCK",
      value: utcTime || "00:00:00 UTC",
      detail: "SYNCHRONIZED TELEMETRY",
    },
  ];

  return (
    <div className="status-strip" data-reveal>
      {data.map((item) => (
        <div className="status-cell interactive-cell" key={item.label}>
          <span className="micro-label">{item.label}</span>
          <strong>{item.value}</strong>
          <span>{item.detail}</span>
        </div>
      ))}
    </div>
  );
}
