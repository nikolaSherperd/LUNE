import React from "react";
import { SectionLabel } from "../layout/SectionLabel";
import { continuousCycle } from "../../data";

export function Ecosystem() {
  return (
    <section className="ecosystem section-pad" id="ecosystem">
      <div className="eco-aside">
        <SectionLabel
          number="05"
          label="HUMAN & INDUSTRIAL SYMBIOSIS"
          detail="PAUSN // LUNE"
        />
      </div>
      <div className="eco-content">
        <p className="display-title" data-reveal>
          THE CONTINUOUS
          <br />
          CYCLE.
        </p>
        <div className="eco-grid">
          <p className="body-copy" data-reveal data-reveal-delay="1">
            Building spacecraft requires more than a factory. It requires
            engineers who understand spacecraft systems, researchers who can
            solve new problems, and institutions that cultivate native
            aerospace talent.
          </p>
          <div className="eco-mark" data-reveal data-reveal-delay="2">
            <span className="micro-label">HUMAN ENGINE & ACADEMY</span>
            <strong>PAUSN</strong>
            <span>Pan-African University Space Network</span>
          </div>
        </div>

        {/* 6-Step Continuous Cycle Grid */}
        <div className="cycle-chain-wrap" data-reveal style={{ marginTop: "48px" }}>
          <div className="cycle-grid-cards">
            {continuousCycle.map((item, idx) => (
              <div
                key={item.step}
                className="cycle-card bottom-to-top"
                data-reveal
                data-reveal-delay={String((idx % 3) + 1)}
              >
                <div className="cycle-card-header">
                  <span className="cycle-step-num">{item.step} // CYCLE</span>
                  <span className="cycle-sub">{item.sub}</span>
                </div>
                <h4 className="cycle-title">{item.title}</h4>
                <p className="cycle-desc">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Symbiosis Banner */}
        <div
          className="cycle-conclusion-banner bottom-to-top"
          data-reveal
          style={{ marginTop: "32px" }}
        >
          <div className="cycle-symbiosis-statement">
            <span className="symbiosis-line">
              <strong className="accent-word">LUNE</strong> builds the machines.
            </span>
            <span className="symbiosis-line">
              <strong>PAUSN</strong> helps build the people who will build the machines.
            </span>
          </div>
          <p className="symbiosis-caption">
            Connecting African students, engineers, and researchers to real space
            hardware through the LUNE/PAUSN Space Academy — hands-on engineering
            instead of textbook-only study — so the continent builds native
            aerospace capability rather than perpetually importing it.
          </p>
        </div>
      </div>
    </section>
  );
}
