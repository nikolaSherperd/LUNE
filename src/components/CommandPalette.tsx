import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ChevronRight,
  Compass,
  Cpu,
  FileText,
  Milestone,
  Search,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  journalItems,
  navigationItems,
  researchItems,
  systems,
} from "../data";
import { JournalItem, ResearchItem, SystemItem } from "../data";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSystem: (system: SystemItem) => void;
  onSelectResearch: (research: ResearchItem) => void;
  onSelectStage: (stage: JournalItem) => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  onSelectSystem,
  onSelectResearch,
  onSelectStage,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  // Handle ESC and Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Reset query when opening
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();

    const navMatches = navigationItems
      .filter((n) => !q || n.label.toLowerCase().includes(q))
      .map((n) => ({
        type: "navigation" as const,
        id: `nav-${n.path}`,
        title: n.label,
        subtitle: `Route: ${n.path}`,
        icon: Compass,
        action: () => {
          navigate(n.path);
          onClose();
        },
      }));

    const systemMatches = systems
      .filter(
        (s) =>
          !q ||
          s.title.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.detail.tagline.toLowerCase().includes(q),
      )
      .map((s) => ({
        type: "system" as const,
        id: `sys-${s.id}`,
        title: `${s.number} ${s.title}`,
        subtitle: s.detail.tagline,
        icon: Cpu,
        action: () => {
          onClose();
          onSelectSystem(s);
        },
      }));

    const researchMatches = researchItems
      .filter(
        (r) =>
          !q ||
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.leadDomain.toLowerCase().includes(q),
      )
      .map((r) => ({
        type: "research" as const,
        id: `res-${r.id}`,
        title: `${r.number} ${r.title}`,
        subtitle: `${r.meta} • ${r.leadDomain}`,
        icon: FileText,
        action: () => {
          onClose();
          onSelectResearch(r);
        },
      }));

    const stageMatches = journalItems
      .filter(
        (st) =>
          !q ||
          st.title.toLowerCase().includes(q) ||
          st.category.toLowerCase().includes(q),
      )
      .map((st) => ({
        type: "stage" as const,
        id: `stage-${st.id}`,
        title: `${st.category}: ${st.title}`,
        subtitle: `${st.timeline} • Status: ${st.status}`,
        icon: Milestone,
        action: () => {
          onClose();
          onSelectStage(st);
        },
      }));

    return [...navMatches, ...systemMatches, ...researchMatches, ...stageMatches];
  }, [query, navigate, onClose, onSelectSystem, onSelectResearch, onSelectStage]);

  // Arrow key navigation
  useEffect(() => {
    const handleNavigation = (e: KeyboardEvent) => {
      if (!isOpen || results.length === 0) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % results.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (results[selectedIndex]) {
          results[selectedIndex].action();
        }
      }
    };
    window.addEventListener("keydown", handleNavigation);
    return () => window.removeEventListener("keydown", handleNavigation);
  }, [isOpen, results, selectedIndex]);

  if (!isOpen) return null;

  return (
    <div className="palette-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="palette-window"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="palette-searchbar">
          <Search size={18} className="palette-icon" />
          <input
            autoFocus
            type="text"
            className="palette-input"
            placeholder="Search programs, systems, research, roadmap..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <button className="palette-close-btn" onClick={onClose} aria-label="Close search">
            <X size={16} />
          </button>
        </div>

        <div className="palette-results">
          {results.length === 0 ? (
            <div className="palette-empty">
              <span>No telemetry matches found for "{query}".</span>
            </div>
          ) : (
            results.map((item, index) => {
              const Icon = item.icon;
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  className={`palette-item ${isSelected ? "is-selected" : ""}`}
                  onMouseEnter={() => setSelectedIndex(index)}
                  onClick={() => item.action()}
                >
                  <div className="palette-item-icon">
                    <Icon size={16} />
                  </div>
                  <div className="palette-item-text">
                    <span className="palette-item-title">{item.title}</span>
                    <span className="palette-item-sub">{item.subtitle}</span>
                  </div>
                  <ChevronRight size={14} className="palette-item-arrow" />
                </div>
              );
            })
          )}
        </div>

        <div className="palette-footer">
          <span>
            <kbd>↑</kbd> <kbd>↓</kbd> to navigate
          </span>
          <span>
            <kbd>Enter</kbd> to select
          </span>
          <span>
            <kbd>Esc</kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
}
