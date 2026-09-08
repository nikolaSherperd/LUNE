import React, { useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Layers,
  ShieldCheck,
  X,
} from "lucide-react";
import { SystemItem, systems } from "../data";

interface SystemDrawerProps {
  system: SystemItem | null;
  onClose: () => void;
  onSelectSystem: (system: SystemItem) => void;
}

export function SystemDrawer({
  system,
  onClose,
  onSelectSystem,
}: SystemDrawerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && system) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [system, onClose]);

  if (!system) return null;

  const currentIndex = systems.findIndex((s) => s.id === system.id);
  const prevSystem = systems[(currentIndex - 1 + systems.length) % systems.length];
  const nextSystem = systems[(currentIndex + 1) % systems.length];

  return (
    <div
      className="drawer-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="drawer-panel"
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
      >
        <div className="drawer-header">
          <div className="drawer-header-left">
            <span className="micro-label">SYSTEM DOSSIER /{system.number}</span>
            <span className="badge-trl">{system.detail.readinessLevel}</span>
          </div>
          <button
            className="drawer-close-btn"
            onClick={onClose}
            aria-label="Close dossier"
          >
            <X size={18} />
          </button>
        </div>

        <div className="drawer-body">
          <div className="drawer-media">
            <img src={system.image} alt={system.title} />
            <div className="drawer-media-overlay" />
            <div className="drawer-media-title">
              <h2>{system.title}</h2>
              <p>{system.detail.tagline}</p>
            </div>
          </div>

          <div className="drawer-section">
            <h3 className="drawer-section-title">
              <ShieldCheck size={16} /> PROGRAM OVERVIEW
            </h3>
            <p className="drawer-prose">{system.detail.extendedDescription}</p>
          </div>

          <div className="drawer-section">
            <h3 className="drawer-section-title">
              <Cpu size={16} /> SPECIFICATIONS MATRIX
            </h3>
            <div className="specs-table">
              {system.detail.keySpecs.map((spec) => (
                <div className="spec-row" key={spec.label}>
                  <span className="spec-name">{spec.label}</span>
                  <span className="spec-val">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="drawer-section">
            <h3 className="drawer-section-title">
              <Layers size={16} /> INTEGRATED SUBSYSTEMS
            </h3>
            <ul className="subsystems-list">
              {system.detail.subsystems.map((sub) => (
                <li key={sub}>
                  <CheckCircle2 size={14} className="sub-icon" />
                  <span>{sub}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="drawer-footer">
          <button
            className="drawer-nav-btn"
            onClick={() => onSelectSystem(prevSystem)}
          >
            <ArrowLeft size={14} /> /{prevSystem.number} {prevSystem.title}
          </button>
          <button
            className="drawer-nav-btn"
            onClick={() => onSelectSystem(nextSystem)}
          >
            /{nextSystem.number} {nextSystem.title} <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
