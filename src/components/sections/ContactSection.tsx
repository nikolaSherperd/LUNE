import React from "react";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "../layout/SectionLabel";

export function Contact({ onOpenContact }: { onOpenContact: () => void }) {
  return (
    <section className="contact section-pad" id="contact">
      <div className="contact-inner" data-reveal>
        <SectionLabel
          number="06"
          label="CONTACT"
          detail="RESEARCH / ENGINEERING / PARTNERSHIPS"
        />
        <h2>
          BUILD
          <br />
          CAPABILITY
          <br />
          <em>TOGETHER.</em>
        </h2>
        <p>
          For commercial satellite bus procurement, hosted payload integration,
          environmental testing facility booking, and PAUSN academic programs.
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
          ESTABLISH TELEMETRY CONTACT <ArrowRight size={14} />
        </button>
      </div>
    </section>
  );
}
