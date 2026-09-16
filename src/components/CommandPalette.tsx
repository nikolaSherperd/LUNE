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
  const [categoryFilter, setCategoryFilter] = useState<"ALL" | "NAV" | "SYSTEM" | "RESEARCH" | "ROADMAP">("ALL");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  // Handle ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Reset query and filter when opening
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setCategoryFilter("ALL");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();

    const navMatches: Array<{
      type: "navigation";
      category: "NAV";
      id: string;
      title: string;
      subtitle: string;
      icon: any;
      action: () => void;
    }> = [];

    navigationItems.forEach((n) => {
      if (!q || n.label.toLowerCase().includes(q)) {
        navMatches.push({
          type: "navigation" as const,
          category: "NAV" as const,
          id: `nav-${n.path}`,
          title: n.label,
          subtitle: `Route: ${n.path}`,
          icon: Compass,
          action: () => {
            navigate(n.path);
            onClose();
          },
        });
      }
      if (n.children) {
        n.children.forEach((child) => {
          if (
            !q ||
            child.label.toLowerCase().includes(q) ||
            child.description.toLowerCase().includes(q)
          ) {
            navMatches.push({
              type: "navigation" as const,
              category: "NAV" as const,
              id: `nav-${child.path}-${child.code}`,
              title: `${child.code} ${child.label}`,
              subtitle: child.description,
              icon: Compass,
              action: () => {
                navigate(child.path);
                onClose();
              },
            });
          }
        });
      }
    });

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
        category: "SYSTEM" as const,
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
        category: "RESEARCH" as const,
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
        category: "ROADMAP" as const,
        id: `stage-${st.id}`,
        title: `${st.category}: ${st.title}`,
        subtitle: `${st.timeline} • Status: ${st.status}`,
        icon: Milestone,
        action: () => {
          onClose();
          onSelectStage(st);
        },
      }));

    let all = [...navMatches, ...systemMatches, ...researchMatches, ...stageMatches];
    if (categoryFilter !== "ALL") {
      all = all.filter((item) => item.category === categoryFilter);
    }
    return all;
  }, [query, categoryFilter, navigate, onClose, onSelectSystem, onSelectResearch, onSelectStage]);

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

  // Scroll active item into view
  useEffect(() => {
    const activeEl = document.querySelector(".palette-item.is-selected");
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

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

        {/* Quick Filter Chips */}
        <div className="palette-filter-chips">
          {[
            { id: "ALL", label: "ALL" },
            { id: "SYSTEM", label: "PLATFORMS" },
            { id: "RESEARCH", label: "R&D BRIEFS" },
            { id: "ROADMAP", label: "ROADMAP" },
            { id: "NAV", label: "NAVIGATION" },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`palette-filter-chip ${categoryFilter === cat.id ? "active" : ""}`}
              onClick={() => {
                setCategoryFilter(cat.id as any);
                setSelectedIndex(0);
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="palette-results" data-lenis-prevent>
          {results.length === 0 ? (
            <div className="palette-empty">
              <span>No telemetry matches found for "{query}".</span>
              <p style={{ marginTop: "6px", fontSize: "11px", color: "var(--muted)" }}>
                Try searching for "CubeSat", "Propulsion", "TVAC", or "Flight".
              </p>
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
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span className="palette-item-title">{item.title}</span>
                      <span className={`palette-badge palette-badge-${item.category.toLowerCase()}`}>
                        {item.category}
                      </span>
                    </div>
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
            <kbd>↑</kbd> <kbd>↓</kbd> navigate
          </span>
          <span>
            <kbd>Enter</kbd> select
          </span>
          <span>
            <kbd>Esc</kbd> close
          </span>
          <span style={{ marginLeft: "auto", color: "var(--accent)" }}>
            {results.length} telemetry {results.length === 1 ? "entry" : "entries"}
          </span>
        </div>
      </div>
    </div>
  );
}
