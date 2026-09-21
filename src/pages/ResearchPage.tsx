import React from "react";
import { InteriorPageHero, SpaceXFooter } from "../components/layout";
import { ResearchSection } from "../components/sections";
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
      <SpaceXFooter onOpenContact={onOpenContact} />
    </>
  );
}
