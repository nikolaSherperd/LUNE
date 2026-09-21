import React from "react";
import { ArrowRight } from "lucide-react";
import { InteriorPageHero, SectionLabel, SpaceXFooter } from "../components/layout";
import { facilitySpecs, images } from "../data";

export interface InfrastructurePageProps {
  onOpenContact: () => void;
}

export default function InfrastructurePage({
  onOpenContact,
}: InfrastructurePageProps) {
  return (
    <>
      <InteriorPageHero
        number="02"
        label="PHYSICAL INFRASTRUCTURE"
        title={
          <>
            SOVEREIGN
            <br />
            INTEGRATION
            <br />
            <em>& TEST LABS.</em>
          </>
        }
        description="LUNE is building indigenous aerospace infrastructure in Abuja: ISO Class 7 cleanrooms, vacuum thermal cycling, 20 kN shaker tables, and laser powder-bed metallurgy."
        image={images.manufacturing}
      />

      <section className="section-pad" id="overview">
        <SectionLabel
          number="02A"
          label="FACILITIES"
          detail="ABUJA INTEGRATION CAMPUS"
        />
        <div data-reveal style={{ marginTop: "20px" }}>
          <h2 className="display-title">
            QUALIFIED BEFORE
            <br />
            INSERTION.
          </h2>
          <p className="body-copy">
            Every satellite bus, avionics bay, and rocket component undergoes
            rigorous qualification matching ECSS and NASA GEVS environmental test
            standards before orbital deployment.
          </p>
        </div>

        <div className="facility-grid">
          {facilitySpecs.map((fac) => (
            <article key={fac.id} className="facility-card" data-reveal>
              <div className="flex items-center justify-between">
                <span className="facility-code">{fac.code}</span>
                <span className="domain-pill">OPERATIONAL</span>
              </div>
              <div>
                <h3 className="facility-name">{fac.name}</h3>
                <span className="facility-class">{fac.classification}</span>
              </div>
              <p className="facility-desc">{fac.description}</p>
              <ul className="facility-specs-list">
                {fac.specs.map((spec, i) => (
                  <li key={i}>{spec}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section-pad">
        <SectionLabel
          number="02B"
          label="CONTRACT QUALIFICATION"
          detail="FACILITY ACCESS"
        />
        <div
          className="contact-detail-box"
          data-reveal
          style={{ marginTop: "24px" }}
        >
          <span className="micro-label">THIRD-PARTY ENVIRONMENTAL TESTING</span>
          <p style={{ fontSize: "13px", color: "#a8a8a2" }}>
            Commercial aerospace companies, defense organizations, and
            university research labs can book testing time on LUNE's TVAC
            chamber and vibration shaker in Abuja.
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
            SCHEDULE FACILITY INSPECTION / BOOKING <ArrowRight size={14} />
          </button>
        </div>
      </section>

      <SpaceXFooter onOpenContact={onOpenContact} />
    </>
  );
}
