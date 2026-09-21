import React from "react";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionLabel } from "../layout/SectionLabel";
import { SpacecraftHotspots } from "../SpacecraftHotspots";
import { SystemItem, images, systems } from "../../data";

export function SystemsSection({
  onSelectSystem,
}: {
  onSelectSystem: (system: SystemItem) => void;
}) {
  return (
    <section className="systems-section section-pad" id="systems">
      <div className="section-intro">
        <SectionLabel
          number="02"
          label="CAPABILITY STACK"
          detail="BUILD PROGRESSIVELY"
        />
        <div className="intro-copy" data-reveal>
          <p className="display-title">
            CAPABILITY
            <br />
            COMPOUNDS.
          </p>
          <p className="body-copy">
            LUNE begins with achievable small-satellite capability and uses each
            generation of knowledge, hardware and operations as the foundation
            for the next.
          </p>
        </div>
      </div>

      <div className="system-grid">
        {systems.map((system, idx) => (
          <article
            className="system-entry"
            key={system.number}
            data-reveal
            data-reveal-delay={String((idx % 4) + 1)}
            onClick={() => onSelectSystem(system)}
            title={`Inspect ${system.title} dossier`}
          >
            <div className="system-image-wrap">
              <img src={system.image} alt={system.title} />
              <span className="image-index">{system.number}</span>
            </div>
            <div className="system-meta">
              <span>{system.number}</span>
              <h3>{system.title}</h3>
            </div>
            <p>{system.description}</p>
            <span className="entry-arrow">
              <ArrowDownRight size={15} />
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}

export function FeaturedSystem({
  onSelectSystem,
}: {
  onSelectSystem?: (system: SystemItem) => void;
}) {
  return (
    <section className="featured section-pad" id="featured">
      <SectionLabel number="02A" label="ENTRY POINT" detail="CUBESATS" />
      <div className="featured-frame" data-reveal="media">
        <img
          src={images.platform}
          alt="CubeSat spacecraft representing LUNE's practical entry point into space hardware"
        />
        <div className="featured-overlay" />

        {/* Interactive Spacecraft Hotspots telemetry */}
        <SpacecraftHotspots />

        <div className="featured-title" data-reveal data-reveal-delay="1">
          <span className="micro-label">
            CUBESAT → SMALL SATELLITE → SPACECRAFT
          </span>
          <h2>
            START
            <br />
            WITH SPACE SYSTEMS
          </h2>
        </div>
        <div className="featured-specs" data-reveal data-reveal-delay="2">
          <div>
            <span className="micro-label">STATUS</span>
            <strong>EARLY PRACTICAL PLATFORM</strong>
          </div>
          <div>
            <span className="micro-label">DOMAIN</span>
            <strong>ENGINEERING + OPERATIONS</strong>
          </div>
          {onSelectSystem ? (
            <button
              className="text-link"
              onClick={() => onSelectSystem(systems[0])}
              style={{
                background: "transparent",
                border: 0,
                padding: 0,
                cursor: "pointer",
              }}
            >
              EXPLORE DOSSIER <ArrowRight size={14} />
            </button>
          ) : (
            <Link className="text-link" to="/systems">
              EXPLORE CAPABILITIES <ArrowRight size={14} />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
