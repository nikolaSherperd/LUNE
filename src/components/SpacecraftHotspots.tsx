import React, { useState } from "react";
import { ChevronRight, Crosshair, Eye, EyeOff, X } from "lucide-react";
import { SpacecraftHotspot, spacecraftHotspots } from "../data";

export function SpacecraftHotspots() {
  const [activeHotspot, setActiveHotspot] = useState<SpacecraftHotspot | null>(
    null,
  );
  const [showHotspots, setShowHotspots] = useState(true);

  return (
    <div className="hotspots-container">
      <div className="hotspots-toolbar">
        <button
          className="hotspots-toggle-btn"
          onClick={() => setShowHotspots((prev) => !prev)}
          title="Toggle telemetry hotspots"
        >
          {showHotspots ? (
            <>
              <Eye size={13} /> <span>HUD ACTIVE</span>
            </>
          ) : (
            <>
              <EyeOff size={13} /> <span>HUD OFF</span>
            </>
          )}
        </button>
      </div>

      {showHotspots &&
        spacecraftHotspots.map((spot, idx) => {
          const isSelected = activeHotspot?.id === spot.id;
          return (
            <div
              key={spot.id}
              className={`radar-pin-wrap ${isSelected ? "active" : ""}`}
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            >
              <button
                className="radar-target"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveHotspot(isSelected ? null : spot);
                }}
                aria-label={`Inspect ${spot.title}`}
              >
                <span className="radar-ping" />
                <span className="radar-dot" />
                <span className="radar-num">0{idx + 1}</span>
              </button>

              {isSelected && (
                <div
                  className="hud-tooltip"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="hud-tooltip-header">
                    <span className="micro-label">
                      <Crosshair size={11} /> {spot.category}
                    </span>
                    <button
                      className="hud-close-btn"
                      onClick={() => setActiveHotspot(null)}
                      aria-label="Close"
                    >
                      <X size={12} />
                    </button>
                  </div>
                  <h4>{spot.title}</h4>
                  <div className="hud-spec-tag">{spot.specs}</div>
                  <p>{spot.details}</p>
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
}
