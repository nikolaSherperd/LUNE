import React, { useState } from "react";
import { ArrowRight, CheckCircle2, Mail, MapPin, Phone, Shield } from "lucide-react";
import { SpaceXFooter } from "../components/layout";
import { INQUIRY_TYPES, submitContactInquiry } from "../services/contact";
import { images } from "../data";

export interface ContactPageProps {
  onOpenContact?: () => void;
}

export default function ContactPage({}: ContactPageProps) {
  const [inquiryType, setInquiryType] = useState<string>(INQUIRY_TYPES[0]);
  const [fullName, setFullName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "transmitting" | "success" | "error">(
    "idle"
  );
  const [receiptId, setReceiptId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;

    setStatus("transmitting");
    setErrorMessage("");

    try {
      const res = await submitContactInquiry({
        inquiryType,
        fullName,
        organization,
        email,
        message,
      });

      if (res.success) {
        setReceiptId(res.receiptId);
        setStatus("success");
      } else {
        throw new Error(res.message || "Submission timed out");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to submit inquiry. Please try again.");
      setStatus("error");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setFullName("");
    setOrganization("");
    setEmail("");
    setMessage("");
    setErrorMessage("");
  };

  return (
    <div className="contact-page">
      {/* -------------------------------------------------------------------- */}
      {/* PAGE HERO                                                            */}
      {/* -------------------------------------------------------------------- */}
      <section className="page-hero-clean">
        <div className="page-hero-media">
          <img
            src={images.hero}
            alt="Contact LUNE Aerospace engineering team"
            className="page-hero-img"
          />
          <div className="page-hero-vignette" />
        </div>

        <div className="site-container page-hero-container">
          <div className="page-hero-content" data-reveal>
            <span className="section-kicker">GET IN TOUCH</span>
            <h1 className="page-hero-title">
              CONNECT WITH OUR
              <br />
              <span className="accent-text">INTEGRATION TEAM.</span>
            </h1>
            <p className="page-hero-lead">
              Collaborate on modular spacecraft platforms, hosted sensor payloads,
              cleanroom testing, or PAUSN university consortium programs.
            </p>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* CONTACT CONTENT SECTION (Clean 2-column layout)                      */}
      {/* -------------------------------------------------------------------- */}
      <section className="editorial-section">
        <div className="site-container">
          <div className="contact-split-grid">
            {/* Left: Facility and Direct Details */}
            <div className="contact-info-col" data-reveal>
              <div className="contact-info-card">
                <div className="contact-info-icon">
                  <MapPin size={22} />
                </div>
                <div>
                  <h3 className="contact-info-title">Abuja Integration Campus</h3>
                  <p className="contact-info-desc">
                    ISO Class 7 Cleanroom, TVAC Vacuum Test Facility &amp; Mechanical Integration Lab.
                  </p>
                  <span className="contact-info-detail">Abuja, Federal Capital Territory, Nigeria</span>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-info-icon">
                  <Mail size={22} />
                </div>
                <div>
                  <h3 className="contact-info-title">Commercial &amp; Sovereign RFQs</h3>
                  <p className="contact-info-desc">
                    For satellite bus procurement, hosted payloads, and launch schedule planning.
                  </p>
                  <span className="contact-info-detail">missions@lune.space</span>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-info-icon">
                  <Shield size={22} />
                </div>
                <div>
                  <h3 className="contact-info-title">Academic &amp; PAUSN Consortium</h3>
                  <p className="contact-info-desc">
                    University student payloads, research fellowships, and ground station collaboration.
                  </p>
                  <span className="contact-info-detail">pausn@lune.space</span>
                </div>
              </div>
            </div>

            {/* Right: Modern Clean Inquiry Form */}
            <div className="contact-form-col" data-reveal>
              <div className="clean-form-card">
                {status === "success" ? (
                  <div className="form-success-view">
                    <CheckCircle2 size={44} className="success-icon" />
                    <h3>Inquiry Received</h3>
                    <p className="success-meta">Reference: {receiptId}</p>
                    <p className="success-body">
                      Thank you for contacting LUNE Aerospace. Our flight integration
                      engineers in Abuja will review your requirements and respond promptly.
                    </p>
                    <button
                      type="button"
                      className="btn-outline"
                      onClick={handleReset}
                      style={{ marginTop: "24px" }}
                    >
                      <span>Send Another Inquiry</span>
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="clean-inquiry-form">
                    <div className="form-header-clean">
                      <h3>Mission Inquiry Form</h3>
                      <p>Tell us about your mission timeline, payload requirements, or partnership interest.</p>
                    </div>

                    {status === "error" && (
                      <div className="form-error-alert">
                        {errorMessage}
                      </div>
                    )}

                    {/* Inquiry Type Chips */}
                    <div className="form-group-clean">
                      <label className="clean-field-label">Inquiry Category</label>
                      <div className="clean-chips-group">
                        {INQUIRY_TYPES.map((type) => (
                          <button
                            type="button"
                            key={type}
                            className={`clean-chip-btn ${inquiryType === type ? "active" : ""}`}
                            onClick={() => setInquiryType(type)}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="form-row-grid">
                      <div className="form-group-clean">
                        <label className="clean-field-label">Your Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Dr. Amina Bello"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="clean-text-input"
                        />
                      </div>

                      <div className="form-group-clean">
                        <label className="clean-field-label">Organization / Agency</label>
                        <input
                          type="text"
                          placeholder="National Space Agency / Operator"
                          value={organization}
                          onChange={(e) => setOrganization(e.target.value)}
                          className="clean-text-input"
                        />
                      </div>
                    </div>

                    <div className="form-group-clean">
                      <label className="clean-field-label">Work Email</label>
                      <input
                        type="email"
                        required
                        placeholder="amina@agency.gov.ng"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="clean-text-input"
                      />
                    </div>

                    <div className="form-group-clean">
                      <label className="clean-field-label">Message / Payload Specifications</label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Describe your spacecraft bus requirements, payload mass/power envelope, desired orbit (e.g. 500 km SSO), or intended mission timeline..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="clean-textarea"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-cta"
                      disabled={status === "transmitting"}
                      style={{ width: "100%", justifyContent: "center", marginTop: "12px" }}
                    >
                      <span>{status === "transmitting" ? "Transmitting..." : "Submit Mission Inquiry"}</span>
                      <ArrowRight size={14} />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SpaceXFooter />
    </div>
  );
}
