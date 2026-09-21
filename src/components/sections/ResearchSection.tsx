import React from "react";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "../layout/SectionLabel";
import { ResearchItem, researchItems } from "../../data";

export function ResearchSection({
  onSelectResearch,
}: {
  onSelectResearch: (research: ResearchItem) => void;
}) {
  return (
    <section className="research section-pad" id="research">
      <div className="research-head">
        <SectionLabel number="04B" label="RESEARCH" detail="THE LONG HORIZON" />
        <div data-reveal>
          <h2 className="display-title">
            RESEARCH FOR
            <br />
            THE NEXT LAYER.
          </h2>
        </div>
      </div>

      <div className="research-index">
        {researchItems.map((item, idx) => (
          <article
            className="research-row"
            key={item.number}
            data-reveal
            data-reveal-delay={String((idx % 4) + 1)}
            onClick={() => onSelectResearch(item)}
            title={`View research briefing: ${item.title}`}
          >
            <span className="row-number">{item.number}</span>
            <div className="row-title">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
            <span className="row-meta">{item.meta}</span>
            <ArrowRight className="row-arrow" size={17} />
          </article>
        ))}
      </div>
    </section>
  );
}
