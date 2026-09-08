import React, { useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  X,
} from "lucide-react";
import { ResearchItem, researchItems } from "../data";

interface ResearchModalProps {
  research: ResearchItem | null;
  onClose: () => void;
  onSelectResearch: (research: ResearchItem) => void;
}

export function ResearchModal({
  research,
  onClose,
  onSelectResearch,
}: ResearchModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && research) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [research, onClose]);

  if (!research) return null;

  const currentIndex = researchItems.findIndex((r) => r.id === research.id);
  const prevItem =
    researchItems[(currentIndex - 1 + researchItems.length) % researchItems.length];
  const nextItem = researchItems[(currentIndex + 1) % researchItems.length];

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="research-modal-window"
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-top-bar">
          <div className="modal-headline-meta">
            <span className="micro-label">RESEARCH BRIEF /{research.number}</span>
            <span className="domain-pill">{research.meta}</span>
          </div>
          <button
            className="palette-close-btn"
            onClick={onClose}
            aria-label="Close research brief"
          >
            <X size={17} />
          </button>
        </div>

        <div className="research-modal-content">
          <div className="research-title-block">
            <h2>{research.title}</h2>
            <p className="lead-domain">
              <span>LEAD DOMAIN:</span> {research.leadDomain}
            </p>
          </div>

          <div className="trl-meter-card">
            <div className="trl-meter-header">
              <span className="micro-label">TECHNOLOGY READINESS LEVEL (TRL)</span>
              <strong>TRL {research.trl} OF 9</strong>
            </div>
            <div className="trl-track">
              {Array.from({ length: 9 }).map((_, idx) => (
                <div
                  key={idx}
                  className={`trl-step ${idx < research.trl ? "active" : ""}`}
                >
                  <span>0{idx + 1}</span>
                </div>
              ))}
            </div>
            <div className="trl-legend">
              <span>Basic Principles</span>
              <span>Subsystem In-Lab</span>
              <span>Flight Heritage</span>
            </div>
          </div>

          <div className="research-section-box">
            <h3>
              <BookOpen size={16} /> EXECUTIVE ABSTRACT
            </h3>
            <p>{research.abstract}</p>
          </div>

          <div className="research-section-box">
            <h3>
              <Sparkles size={16} /> VALIDATION MILESTONES
            </h3>
            <ul className="milestone-list">
              {research.keyMilestones.map((milestone) => (
                <li key={milestone}>
                  <CheckCircle2 size={14} className="milestone-icon" />
                  <span>{milestone}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="collaborator-card">
            <GraduationCap size={18} className="collab-icon" />
            <div>
              <span className="micro-label">ACADEMIC & INSTITUTIONAL PARTNERS</span>
              <p>{research.collaborators}</p>
            </div>
          </div>
        </div>

        <div className="modal-bottom-bar">
          <button
            className="drawer-nav-btn"
            onClick={() => onSelectResearch(prevItem)}
          >
            <ArrowLeft size={14} /> /{prevItem.number} {prevItem.title}
          </button>
          <button
            className="drawer-nav-btn"
            onClick={() => onSelectResearch(nextItem)}
          >
            /{nextItem.number} {nextItem.title} <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
