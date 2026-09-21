import React from "react";
import { ArrowRight } from "lucide-react";
import { InteriorPageHero, SectionLabel, SpaceXFooter } from "../components/layout";
import { AboutSection, Ecosystem } from "../components/sections";
import { images } from "../data";

export interface AboutPageProps {
  onOpenContact: () => void;
}

export default function AboutPage({ onOpenContact }: AboutPageProps) {
  return (
    <>
      <InteriorPageHero
        number="05"
        label="THE INDUSTRIAL FOUNDATION"
        title={
          <>
            AN AFRICAN
            <br />
            SPACE
            <br />
            <em>ECONOMY.</em>
          </>
        }
        description="LUNE is an African aerospace and space-systems company building toward something much larger than satellites or rockets: the industrial and human foundation for an African space civilization."
        image={images.systems}
      />

      <section className="prose-section section-pad" id="manifesto">
        <SectionLabel
          number="05A"
          label="THE LUNE MANIFESTO"
          detail="CORE PURPOSE"
        />
        <div className="prose-grid" data-reveal>
          <h2>THE JOURNEY BEGINS WITH SPACECRAFT.</h2>
          <p>
            LUNE intends to develop increasingly capable small satellites,
            moving beyond the limitations of conventional CubeSats toward modular
            spacecraft that can be configured for different missions, upgraded,
            manufactured more efficiently, and eventually produced at scale.
            <br />
            <br />
            Instead of building every satellite as a completely unique machine,
            LUNE’s vision is to create a{" "}
            <strong>common technological foundation</strong> — a spacecraft
            platform made from standardized systems that can be assembled,
            tested, upgraded, and reused.
          </p>
        </div>
      </section>

      <section
        className="prose-section section-pad"
        id="pausn-thesis"
        style={{ paddingTop: "60px" }}
      >
        <SectionLabel
          number="05B"
          label="THE HUMAN ENGINE"
          detail="PAUSN & ACADEMY"
        />
        <div className="prose-grid" data-reveal>
          <h2>BUILDING PEOPLE TO BUILD THE MACHINES.</h2>
          <p>
            Building spacecraft requires more than a factory. It requires
            engineers who understand spacecraft systems, researchers who can
            solve new problems, and institutions that can train the next
            generation of aerospace talent.
            <br />
            <br />
            This is where{" "}
            <strong>PAUSN (Pan-African University Space Network)</strong> comes
            in. PAUSN is the human and academic network that surrounds LUNE’s
            industrial ambition. Connecting African students, engineers, and
            researchers via the <strong>LUNE/PAUSN Space Academy</strong>, PAUSN
            helps build the aerospace workforce Africa needs so the continent
            does not have to perpetually import aerospace expertise.
            <br />
            <br />
            Instead of learning space engineering only from textbooks, students
            and researchers work on actual satellite systems, payloads, and
            aerospace hardware.
          </p>
        </div>
      </section>

      <Ecosystem />
      <AboutSection />

      {/* Careers Callout */}
      <section className="section-pad">
        <div
          className="contact-detail-box"
          data-reveal
          style={{
            border: "1px solid var(--line)",
            background: "rgba(17,18,18,0.8)",
          }}
        >
          <span className="micro-label">TALENT & FELLOWSHIPS</span>
          <h3 style={{ fontSize: "17px", letterSpacing: "0.04em", margin: "8px 0" }}>
            Build the next aerospace layer with LUNE.
          </h3>
          <p style={{ fontSize: "13px", color: "var(--muted)", margin: "0 0 16px" }}>
            We recruit flight software engineers, RF avionics specialists,
            cleanroom integration technicians, and PAUSN university fellows in
            Abuja.
          </p>
          <button
            className="text-link"
            onClick={onOpenContact}
            style={{
              background: "transparent",
              border: 0,
              padding: 0,
              cursor: "pointer",
            }}
          >
            APPLY FOR ENGINEERING ROLES <ArrowRight size={14} />
          </button>
        </div>
      </section>

      <SpaceXFooter onOpenContact={onOpenContact} />
    </>
  );
}
