import React, { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  Copy,
  Download,
  ExternalLink,
  FileText,
  Filter,
  Search,
  X,
} from "lucide-react";

interface ResearchPaper {
  id: string;
  number: string;
  category: string;
  title: string;
  authors: string;
  institution: string;
  year: number;
  doi: string;
  abstract: string;
  methodology: string;
  conclusion: string;
  flightHeritage: string;
}

const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: "lune-rp-01",
    number: "LUNE-RP-01",
    category: "Thermal & Power",
    title: "Additive Manufacturing and Deep-Vacuum Thermal Characterization of Modular Spacecraft Chassis",
    authors: "Dr. K. Okonjo, T. Balogun, M. Nnamdi",
    institution: "LUNE Space Structures Laboratory & PAUSN Engineering Consortium",
    year: 2026,
    doi: "10.48550/arXiv.2603.04812",
    abstract: "This paper presents the design, laser powder-bed fusion (LPBF) additive manufacturing in AlSi10Mg, and thermal vacuum chamber characterization of an integrated 12U CubeSat chassis with conformal embedded heat pipes. Passive thermal regulation maintains avionics and LiFePO4 battery cells within safe operational bands (+5°C to +30°C) across simulated extreme eclipse-to-sunlight cycles without auxiliary electric heaters.",
    methodology: "Finite-element thermal dissipation modeling verified with 8-cycle deep vacuum (-75°C to +135°C @ 10⁻⁶ Torr) testing in the Abuja TVAC facility using calibrated thermocouple grids and infrared imaging.",
    conclusion: "Additive manufacturing of structural heat paths reduces assembly fastener count by 44% and chassis mass by 28% while improving thermal conductivity by 2.3× over legacy milled enclosures.",
    flightHeritage: "Qualified for LUNE Pathfinder-1 orbital demonstration mission.",
  },
  {
    id: "lune-rp-02",
    number: "LUNE-RP-02",
    category: "Avionics",
    title: "Radiation-Hardened-by-Design FPGA Neuromorphic Edge Inference for Autonomous Satellite Cloud Filtering",
    authors: "Engr. A. Bello, Prof. S. Mensah, D. Osei",
    institution: "PAUSN Space Academy & LUNE Flight Software Directorate",
    year: 2026,
    doi: "10.48550/arXiv.2604.09914",
    abstract: "Earth observation satellites often downlink cloud-occluded imagery, congesting limited S-Band and X-Band pass allocations. We deploy a quantized spike-neural-network (SNN) onto a radiation-tolerant PolarFire FPGA executing real-time cloud masking in under 12 ms per frame with under 2.4W total avionics power.",
    methodology: "Single-Event Effect (SEE) fault injection testing across proton beam lines, simulating 5-year radiation dose exposure in 550 km Sun-Synchronous Orbit.",
    conclusion: "Edge rejection saves up to 68% of raw RF downlink bandwidth, prioritizing clear optical spectral bands for agricultural and environmental monitoring.",
    flightHeritage: "Integrated on LUNE Pathfinder-1 flight computer.",
  },
  {
    id: "lune-rp-03",
    number: "LUNE-RP-03",
    category: "Bus Architecture",
    title: "A Standardized Modular Spacecraft Architecture for Pan-African Constellation Deployments",
    authors: "LUNE Systems Engineering Group",
    institution: "LUNE Aerospace Headquarters, Abuja",
    year: 2025,
    doi: "10.48550/arXiv.2511.01235",
    abstract: "Conventional space missions suffer from unique non-recurring engineering (NRE) costs per mission. LUNE establishes a modular mechanical, electrical, and telemetry standard from 3U CubeSats to 150kg SmallSats, utilizing SpaceWire routing and standardized ECSS bus backplanes.",
    methodology: "Comparative manufacturing cycle analysis evaluating unit production velocity and cleanroom test turnaround across 12 consecutive satellite bus builds.",
    conclusion: "Modular platform standardization compresses satellite assembly, integration, and test (AIT) timelines from 18 months down to 4.5 months.",
    flightHeritage: "Baseline platform for AFRI-OBS and commercial payloads.",
  },
  {
    id: "lune-rp-04",
    number: "LUNE-RP-04",
    category: "ADCS",
    title: "High-Agility Star Tracker Attitude Determination and Jitter Suppression for Sub-Meter Imaging",
    authors: "F. Adeyemi, K. Diop, Dr. E. Eze",
    institution: "Pan-African University Space Network (PAUSN)",
    year: 2026,
    doi: "10.48550/arXiv.2605.07721",
    abstract: "Sub-meter optical satellite payloads require jitter-free attitude pointing stability. This paper investigates elastomeric isolator dampening on reaction wheel momentum assemblies alongside multi-head autonomous star trackers to achieve <0.02° 3-axis pointing accuracy.",
    methodology: "Micro-vibration laser interferometry on 6-degree-of-freedom air-bearing testbed under simulated zero-gravity thermal vacuum environment.",
    conclusion: "Active Kalman filtering rejects structural solar array flexible modes, enabling sharp ground sample distance (GSD) resolution down to 0.75m.",
    flightHeritage: "Qualified on TVAC shaker rig in Abuja.",
  },
  {
    id: "lune-rp-05",
    number: "LUNE-RP-05",
    category: "Earth Observation",
    title: "Multi-Spectral Vegetation Index and Water Resource Mapping Over the Sahel via Micro-Constellations",
    authors: "Dr. H. Abubakar, PAUSN Agronomy & Climate Division",
    institution: "PAUSN University Consortium",
    year: 2025,
    doi: "10.48550/arXiv.2509.08819",
    abstract: "Rapid drought and agricultural monitoring across the Sahel demands frequent revisit intervals. We demonstrate that an equatorial micro-constellation of four LUNE-6U spacecraft provides 3-hour daily revisit frequency across West Africa at a fraction of traditional geostationary system costs.",
    methodology: "Orbital constellation Walker-delta constellation coverage modeling paired with simulated RedEdge and NIR band radiometric calibration.",
    conclusion: "Delivers sovereign soil moisture and agricultural yield forecasting directly to African ministerial and research stakeholders without foreign licensing fees.",
    flightHeritage: "Flight manifest scheduled for Q2 2027.",
  },
];

const CATEGORIES = ["All", "Thermal & Power", "Avionics", "Bus Architecture", "ADCS", "Earth Observation"];

export function ResearchArchive() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activePaper, setActivePaper] = useState<ResearchPaper | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredPapers = RESEARCH_PAPERS.filter((paper) => {
    const matchesCategory =
      selectedCategory === "All" || paper.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      paper.title.toLowerCase().includes(q) ||
      paper.authors.toLowerCase().includes(q) ||
      paper.abstract.toLowerCase().includes(q) ||
      paper.number.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const copyBibtex = (paper: ResearchPaper) => {
    const bibtex = `@article{lune_${paper.id.replace(/-/g, "_")},
  title = {${paper.title}},
  author = {${paper.authors}},
  journal = {LUNE Aerospace & PAUSN Technical Papers},
  year = {${paper.year}},
  doi = {${paper.doi}},
  publisher = {LUNE Aerospace Press, Abuja, Nigeria}
}`;
    navigator.clipboard.writeText(bibtex);
    setCopiedId(paper.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div style={{ marginTop: "36px" }} data-reveal>
      {/* Controls Bar: Search & Category Filter */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          marginBottom: "24px",
          padding: "16px 20px",
          background: "rgba(14, 16, 22, 0.75)",
          border: "1px solid var(--line)",
          borderRadius: "10px",
          backdropFilter: "blur(16px)",
        }}
      >
        {/* Category Pills */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "6px 12px",
                borderRadius: "4px",
                fontSize: "11px",
                fontFamily: "var(--font-mono, monospace)",
                background:
                  selectedCategory === cat
                    ? "rgba(194, 155, 98, 0.2)"
                    : "rgba(255, 255, 255, 0.03)",
                border:
                  selectedCategory === cat
                    ? "1px solid var(--accent)"
                    : "1px solid var(--line)",
                color: selectedCategory === cat ? "var(--text)" : "var(--muted)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div style={{ position: "relative", minWidth: "260px" }}>
          <Search
            size={14}
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--muted)",
            }}
          />
          <input
            type="text"
            placeholder="Search papers, authors, DOI..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "8px 12px 8px 34px",
              borderRadius: "6px",
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid var(--line)",
              color: "var(--text)",
              fontSize: "12px",
              outline: "none",
            }}
          />
        </div>
      </div>

      {/* Papers Grid */}
      <div style={{ display: "grid", gap: "16px" }}>
        {filteredPapers.map((paper) => (
          <article
            key={paper.id}
            style={{
              background: "rgba(12, 14, 19, 0.8)",
              border: "1px solid var(--line)",
              borderRadius: "10px",
              padding: "20px 24px",
              transition: "border-color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--line)")}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexWrap: "wrap",
                gap: "8px",
                marginBottom: "8px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span className="micro-label" style={{ color: "var(--accent)" }}>
                  {paper.number}
                </span>
                <span className="domain-pill">{paper.category}</span>
                <span style={{ fontSize: "11px", color: "var(--muted)" }}>
                  {paper.year}
                </span>
              </div>
              <span style={{ fontSize: "11px", fontFamily: "var(--font-mono, monospace)", color: "var(--muted)" }}>
                {paper.doi}
              </span>
            </div>

            <h3
              style={{
                fontSize: "16px",
                lineHeight: "1.35",
                margin: "8px 0",
                color: "var(--text)",
                fontWeight: 600,
                cursor: "pointer",
              }}
              onClick={() => setActivePaper(paper)}
            >
              {paper.title}
            </h3>

            <p style={{ fontSize: "12px", color: "var(--muted)", margin: "0 0 12px" }}>
              <strong>Authors:</strong> {paper.authors} — <em>{paper.institution}</em>
            </p>

            <p
              style={{
                fontSize: "13px",
                lineHeight: "1.6",
                color: "#A4A8B4",
                margin: "0 0 16px",
              }}
            >
              {paper.abstract}
            </p>

            {/* Card Actions */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "10px",
                paddingTop: "12px",
                borderTop: "1px solid rgba(255, 255, 255, 0.05)",
              }}
            >
              <span style={{ fontSize: "11px", color: "#4ADE80", fontFamily: "var(--font-mono, monospace)" }}>
                ✓ {paper.flightHeritage}
              </span>

              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  type="button"
                  onClick={() => copyBibtex(paper)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    background: "transparent",
                    border: "none",
                    color: "var(--muted)",
                    fontSize: "11px",
                    fontFamily: "var(--font-mono, monospace)",
                    cursor: "pointer",
                  }}
                  title="Copy BibTeX Citation"
                >
                  {copiedId === paper.id ? (
                    <>
                      <Check size={12} style={{ color: "#4ADE80" }} /> Copied
                    </>
                  ) : (
                    <>
                      <Copy size={12} /> BibTeX
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActivePaper(paper)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    background: "transparent",
                    border: "none",
                    color: "var(--accent)",
                    fontSize: "11px",
                    fontFamily: "var(--font-mono, monospace)",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  <span>FULL PAPER BRIEFING</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </article>
        ))}

        {filteredPapers.length === 0 && (
          <div style={{ textAlign: "center", padding: "48px 20px", color: "var(--muted)" }}>
            No research papers found matching "{searchQuery}". Try selecting another category.
          </div>
        )}
      </div>

      {/* Full Paper Inspection Modal */}
      {activePaper && (
        <div
          className="modal-backdrop"
          onClick={() => setActivePaper(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="contact-modal-window"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "780px" }}
          >
            <div className="modal-top-bar">
              <div className="modal-headline-meta">
                <span className="micro-label">{activePaper.number}</span>
                <span className="domain-pill">{activePaper.category.toUpperCase()}</span>
              </div>
              <button
                className="palette-close-btn"
                onClick={() => setActivePaper(null)}
                aria-label="Close"
              >
                <X size={17} />
              </button>
            </div>

            <div style={{ padding: "28px", maxHeight: "75vh", overflowY: "auto" }}>
              <span style={{ fontSize: "11px", color: "var(--accent)", fontFamily: "var(--font-mono, monospace)" }}>
                DOI: {activePaper.doi} // PUBLISHED {activePaper.year}
              </span>
              <h2 style={{ fontSize: "20px", margin: "8px 0 12px", color: "var(--text)", lineHeight: "1.3" }}>
                {activePaper.title}
              </h2>
              <p style={{ fontSize: "13px", color: "var(--muted)", margin: "0 0 20px" }}>
                {activePaper.authors} — <strong>{activePaper.institution}</strong>
              </p>

              <div style={{ marginBottom: "20px" }}>
                <h4 style={{ fontSize: "12px", color: "var(--accent)", fontFamily: "var(--font-mono, monospace)", marginBottom: "6px" }}>
                  1. ABSTRACT
                </h4>
                <p style={{ fontSize: "13px", lineHeight: "1.65", color: "#A4A8B4" }}>
                  {activePaper.abstract}
                </p>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <h4 style={{ fontSize: "12px", color: "var(--accent)", fontFamily: "var(--font-mono, monospace)", marginBottom: "6px" }}>
                  2. METHODOLOGY & EXPERIMENTAL RIG
                </h4>
                <p style={{ fontSize: "13px", lineHeight: "1.65", color: "#A4A8B4" }}>
                  {activePaper.methodology}
                </p>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <h4 style={{ fontSize: "12px", color: "var(--accent)", fontFamily: "var(--font-mono, monospace)", marginBottom: "6px" }}>
                  3. CONCLUSION & FLIGHT HERITAGE
                </h4>
                <p style={{ fontSize: "13px", lineHeight: "1.65", color: "#A4A8B4" }}>
                  {activePaper.conclusion}
                </p>
                <div style={{ marginTop: "8px", fontSize: "12px", color: "#4ADE80", fontFamily: "var(--font-mono, monospace)" }}>
                  ✓ Qualification Status: {activePaper.flightHeritage}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "12px",
                  paddingTop: "20px",
                  borderTop: "1px solid var(--line)",
                }}
              >
                <button
                  type="button"
                  onClick={() => copyBibtex(activePaper)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 16px",
                    borderRadius: "6px",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid var(--line)",
                    color: "var(--text)",
                    fontSize: "12px",
                    fontFamily: "var(--font-mono, monospace)",
                    cursor: "pointer",
                  }}
                >
                  <Copy size={13} />
                  <span>{copiedId === activePaper.id ? "COPIED TO CLIPBOARD" : "COPY BIBTEX CITATION"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActivePaper(null)}
                  className="contact-submit-btn"
                  style={{ padding: "10px 24px" }}
                >
                  CLOSE BRIEFING
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
