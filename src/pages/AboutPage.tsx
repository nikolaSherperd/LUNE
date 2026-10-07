import React, { useState } from "react";
import { ArrowRight, Compass, HeartHandshake, Users } from "lucide-react";
import { SpaceXFooter } from "../components/layout";
import { aboutData, continuousCycle, images, journalItems } from "../data";

export interface AboutPageProps {
  onOpenContact: () => void;
}

type AboutTab = "mission" | "philosophy" | "team";

export default function AboutPage({ onOpenContact }: AboutPageProps) {
  const [activeTab, setActiveTab] = useState<AboutTab>("mission");

  return (
    <div className="about-page">
      {/* -------------------------------------------------------------------- */}
      {/* PAGE HERO                                                            */}
      {/* -------------------------------------------------------------------- */}
      <section className="page-hero-clean">
        <div className="page-hero-media">
          <img
            src={images.systems}
            alt="African space civilization and aerospace engineering"
            className="page-hero-img"
          />
          <div className="page-hero-vignette" />
        </div>

        <div className="site-container page-hero-container">
          <div className="page-hero-content" data-reveal>
            <span className="section-kicker">THE INDUSTRIAL THESIS</span>
            <h1 className="page-hero-title">
              AN AFRICAN
              <br />
              <span className="accent-text">SPACE CIVILIZATION.</span>
            </h1>
            <p className="page-hero-lead">
              LUNE is establishing the technological, physical, and human foundations
              of an African space-industrial civilization through standardized modular spacecraft,
              sovereign flight silicon, and cleanroom test facilities in Abuja.
            </p>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* SECTION TABS                                                         */}
      {/* -------------------------------------------------------------------- */}
      <div className="clean-tabs-bar">
        <div className="site-container">
          <div className="clean-tabs-nav">
            <button
              className={`clean-tab-pill ${activeTab === "mission" ? "active" : ""}`}
              onClick={() => setActiveTab("mission")}
            >
              <Compass size={14} />
              <span>The Mission</span>
            </button>
            <button
              className={`clean-tab-pill ${activeTab === "philosophy" ? "active" : ""}`}
              onClick={() => setActiveTab("philosophy")}
            >
              <HeartHandshake size={14} />
              <span>Engineering Philosophy</span>
            </button>
            <button
              className={`clean-tab-pill ${activeTab === "team" ? "active" : ""}`}
              onClick={() => setActiveTab("team")}
            >
              <Users size={14} />
              <span>Consortium &amp; Team</span>
            </button>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* TAB 1: MISSION & ROADMAP                                             */}
      {/* -------------------------------------------------------------------- */}
      {activeTab === "mission" && (
        <section className="tab-section-content" data-reveal>
          <div className="site-container">
            <div className="section-header-clean">
              <span className="section-kicker">STRATEGIC IMPERATIVE</span>
              <h2 className="section-title-clean">
                FROM CONSUMERS TO BUILDERS.
              </h2>
              <p className="section-lead-clean">
                For decades, Africa has been an importer of foreign satellite data,
                launching isolated pathfinders with foreign contractors. LUNE was founded
                to build domestic industrial capability: repeatable spacecraft buses,
                indigenous avionics, and flight qualification in Abuja.
              </p>
            </div>

            <div className="roadmap-clean-grid">
              {journalItems.map((stage) => (
                <div key={stage.id} className="roadmap-clean-card">
                  <div className="roadmap-clean-lead">
                    <div className="roadmap-clean-header">
                      <span className="tag-pill">{stage.stageNumber}</span>
                      <span className="tag-pill accent">{stage.status}</span>
                    </div>
                    <h3 className="roadmap-clean-title">{stage.title}</h3>
                    <span className="roadmap-clean-timeline">{stage.timeline}</span>
                  </div>
                  <p className="roadmap-clean-desc">{stage.category}</p>
                  <ul className="clean-bullet-list">
                    {stage.deliverables.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* TAB 2: PHILOSOPHY & CONTINUOUS CYCLE                                 */}
      {/* -------------------------------------------------------------------- */}
      {activeTab === "philosophy" && (
        <section className="tab-section-content" data-reveal>
          <div className="site-container">
            <div className="section-header-clean">
              <span className="section-kicker">CORE PRINCIPLES</span>
              <h2 className="section-title-clean">
                CAPABILITY BEFORE COMPLEXITY.
              </h2>
              <p className="section-lead-clean">
                Aerospace engineering often fails through premature optimization and
                bespoke complexity. LUNE embraces an uncompromising focus on repeatability,
                robust interfaces, and rapid flight cadence.
              </p>
            </div>

            <div className="cycle-clean-grid">
              {continuousCycle.map((cycle) => (
                <div key={cycle.step} className="cycle-clean-card">
                  <div className="cycle-clean-lead">
                    <div className="cycle-clean-header">
                      <span className="tag-pill">STEP {cycle.step}</span>
                      <span className="tag-pill accent">{cycle.sub}</span>
                    </div>
                    <h3 className="cycle-clean-title">{cycle.title}</h3>
                  </div>
                  <p className="cycle-clean-detail">{cycle.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* TAB 3: CONSORTIUM & TEAM                                             */}
      {/* -------------------------------------------------------------------- */}
      {activeTab === "team" && (
        <section className="tab-section-content" data-reveal>
          <div className="site-container">
            <div className="section-header-clean">
              <span className="section-kicker">THE HUMAN ENGINE</span>
              <h2 className="section-title-clean">
                PAUSN CONSORTIUM &amp; LEADERSHIP.
              </h2>
              <p className="section-lead-clean">
                Connecting top aerospace researchers, sovereign space agencies, and university
                laboratories across Nigeria, Kenya, South Africa, Egypt, and the global diaspora.
              </p>
            </div>

            <div className="team-statement-box">
              <h3>Pan-African University Space Network (PAUSN)</h3>
              <p>
                PAUSN is our academic arm, embedding real satellite flight projects into African university curricula.
                Undergraduate and postgraduate students write flight firmware, integrate orbital sensors,
                and operate ground stations — generating a self-sustaining talent pipeline for the African space economy.
              </p>
              <div style={{ marginTop: "24px" }}>
                <button className="btn-cta" onClick={onOpenContact}>
                  <span>Join PAUSN University Consortium</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* CTA BANNER                                                           */}
      {/* -------------------------------------------------------------------- */}
      <section className="cta-banner-section">
        <div className="site-container">
          <div className="cta-banner-clean" data-reveal>
            <div className="cta-banner-left">
              <span className="section-kicker">GET INVOLVED</span>
              <h3 className="cta-banner-heading">
                Build the future of African aerospace.
              </h3>
              <p className="cta-banner-description">
                Whether you are an aerospace engineer looking to relocate, an academic institution,
                or a commercial satellite operator — we welcome mission inquiries.
              </p>
            </div>
            <div className="cta-banner-right">
              <button className="btn-cta" onClick={onOpenContact}>
                <span>Get in Touch</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <SpaceXFooter onOpenContact={onOpenContact} />
    </div>
  );
}
