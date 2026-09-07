import React, { useEffect, useState } from "react";
import {
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  Milestone,
  X,
} from "lucide-react";
import { JournalItem, journalItems } from "../data";

interface RoadmapModalProps {
  initialStage: JournalItem | null;
  onClose: () => void;
}

export function RoadmapModal({ initialStage, onClose }: RoadmapModalProps) {
  const [selectedStage, setSelectedStage] = useState<JournalItem>(
    initialStage || journalItems[0],
  );

  useEffect(() => {
    if (initialStage) {
      setSelectedStage(initialStage);
    }
  }, [initialStage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!initialStage) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="roadmap-modal-window"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-top-bar">
          <div className="modal-headline-meta">
            <span className="micro-label">DEVELOPMENT ROADMAP / 08 STAGES</span>
            <span className="domain-pill">TECHNOLOGY PROGRESSION</span>
          </div>
          <button
            className="palette-close-btn"
            onClick={onClose}
            aria-label="Close roadmap modal"
          >
            <X size={17} />
          </button>
        </div>

        <div className="roadmap-modal-body">
          {/* Stage Selector Tabs */}
          <div className="roadmap-stage-pills">
            {journalItems.map((st) => {
              const isCurrent = st.id === selectedStage.id;
              return (
                <button
                  key={st.id}
                  className={`stage-tab-btn ${isCurrent ? "active" : ""}`}
                  onClick={() => setSelectedStage(st)}
                >
                  <span className="tab-stage-num">{st.stageNumber}</span>
                  <span className="tab-stage-name">{st.date}</span>
                </button>
              );
            })}
          </div>

          {/* Active Stage Detail */}
          <div className="stage-detail-panel">
            <div className="stage-detail-header">
              <div>
                <span className="micro-label">
                  STAGE {selectedStage.stageNumber} • {selectedStage.date}
                </span>
                <h2>{selectedStage.title}</h2>
              </div>
              <div className="stage-status-badge">
                <Clock size={13} />
                <span>{selectedStage.status}</span>
              </div>
            </div>

            <div className="stage-timeline-bar">
              <Calendar size={14} />
              <span>TIMELINE WINDOW: {selectedStage.timeline}</span>
            </div>

            {selectedStage.image && (
              <div className="stage-image-preview">
                <img src={selectedStage.image} alt={selectedStage.title} />
              </div>
            )}

            <div className="stage-deliverables-box">
              <h3>
                <Milestone size={16} /> CORE PROGRAM DELIVERABLES
              </h3>
              <ul className="deliverables-list">
                {selectedStage.deliverables.map((item) => (
                  <li key={item}>
                    <CheckCircle2 size={14} className="deliv-icon" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
