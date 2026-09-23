import React from "react";
import { SectionLabel } from "../layout/SectionLabel";

export function AboutSection() {
  return (
    <section className="about section-pad" id="about">
      <SectionLabel
        number="05B"
        label="THE ULTIMATE OBJECTIVE"
        detail="AFRICAN SPACE ECONOMY"
      />
      <div className="about-statement" data-reveal>
        <h2>
          THE SATELLITE IS THE BEGINNING.
          <br />
          THE PLATFORM IS THE VEHICLE.
          <br />
          <em>THE REAL OBJECTIVE IS CAPABILITY.</em>
        </h2>
        <p>
          The long-term roadmap is not simply isolated hardware. It is:
          <br />
          <strong>
            education → research → engineering → manufacturing → spacecraft →
            constellations → autonomous operations → an enduring African space industry.
          </strong>
          <br />
          <br />
          Together, LUNE and PAUSN are laying the foundations of an African
          space-industrial civilization.
        </p>
      </div>
    </section>
  );
}
