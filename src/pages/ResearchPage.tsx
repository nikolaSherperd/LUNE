import React from "react";
import { InteriorPageHero, SectionLabel, SpaceXFooter } from "../components/layout";
import { ResearchSection } from "../components/sections";
import { ResearchArchive } from "../components/ResearchArchive";
import { ResearchItem, images } from "../data";

export interface ResearchPageProps {
  onSelectResearch: (research: ResearchItem) => void;
  onOpenContact: () => void;
}

export default function ResearchPage({
  onSelectResearch,
  onOpenContact,
}: ResearchPageProps) {
  return (
    <>
      <InteriorPageHero
        number="04"
        label="RESEARCH & DEEP TECHNOLOGY"
        title={
          <>
            ENGINEERING
            <br />
            THE
            <br />
            <em>UNKNOWN.</em>
          </>
        }
        description="R&D spans spacecraft bus architecture, radiation-tolerant avionics, RF spectrum sensing, onboard neuromorphic inference, and advanced aerospike propulsion simulation."
        image={images.manufacturing}
      />

      <ResearchSection onSelectResearch={onSelectResearch} />

      {/* Feature 5: Searchable PAUSN Technical Paper Archive */}
      <section className="section-pad" id="technical-archive" style={{ paddingTop: "20px" }}>
        <SectionLabel
          number="04C"
          label="TECHNICAL PAPERS & ARCHIVE"
          detail="PAUSN CONSORTIUM MONOGRAPHS"
        />
        <ResearchArchive />
      </section>

      <SpaceXFooter onOpenContact={onOpenContact} />
    </>
  );
}
