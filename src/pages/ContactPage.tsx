import React, { useState } from "react";
import { ArrowRight, CheckCircle2, Mail, Radio } from "lucide-react";
import { InteriorPageHero, SectionLabel, SpaceXFooter } from "../components/layout";
import { INQUIRY_TYPES, submitContactInquiry } from "../services/contact";
import { images } from "../data";

export interface ContactPageProps {
  onOpenContact: () => void;
}

export default function ContactPage({ onOpenContact }: ContactPageProps) {
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
        throw new Error(res.message || "Transmission timed out");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Transmission network error. Logged to local buffer.");
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
    <>
      <InteriorPageHero
        number="06"
        label="COMMUNICATIONS & INQUIRIES"
        title={
          <>
            BUILD THE
            <br />
            NEXT
            <br />
            <em>LAYER.</em>
          </>
        }
        description="Collaborate on small-satellite platform procurement, hosted sensor integration, cleanroom testing facilities, or PAUSN university consortium research."
        image={images.hero}
      />

      <section className="contact-detail section-pad">
        <div
          className="contact-detail-box"
          data-reveal
          data-reveal-delay="1"
          onClick={onOpenContact}
          style={{ cursor: "pointer", border: "1px solid var(--accent)" }}
        >
          <span className="micro-label">MODAL DISPATCH TERMINAL</span>
          <span
            style={{
              color: "var(--accent)",
              fontSize: "16px",
              fontWeight: 550,
            }}
          >
            Launch Floating Terminal →
          </span>
          <p style={{ fontSize: "12px", color: "var(--muted)", margin: "8px 0 0" }}>
            Direct encrypted inquiry overlay for quick access anywhere across the site.
          </p>
        </div>

        <div className="contact-detail-box" data-reveal data-reveal-delay="2">
          <span className="micro-label">PRIMARY HEADQUARTERS</span>
          <span style={{ fontSize: "16px", fontWeight: 550, color: "var(--text)" }}>
            ABUJA / NIGERIA
          </span>
          <p style={{ fontSize: "12px", color: "var(--muted)", margin: "8px 0 0" }}>
            Cleanroom Integration Bay & Testing Campus, Federal Capital Territory.
          </p>
        </div>
      </section>

      {/* Direct In-Page Transmission Terminal */}
      <section className="section-pad" id="dispatch-form">
        <SectionLabel
          number="06A"
          label="DIRECT TRANSMISSION"
          detail="SECURE TELEMETRY BUFFER"
        />

        <div
          style={{
            maxWidth: "760px",
            margin: "32px 0 0",
            background: "rgba(12, 14, 18, 0.7)",
            border: "1px solid var(--line)",
            borderRadius: "12px",
            padding: "clamp(20px, 3.5vw, 36px)",
            backdropFilter: "blur(18px)",
          }}
          data-reveal
        >
          {status === "success" ? (
            <div className="transmission-success" style={{ padding: "24px 0" }}>
              <div className="success-pulse">
                <CheckCircle2 size={38} className="success-icon" />
              </div>
              <h3>TRANSMISSION ACKNOWLEDGED</h3>
              <p className="success-meta">
                PACKET ID: <code>{receiptId}</code>
              </p>
              <p className="success-text">
                Your dispatch has been logged in LUNE's mission registry. Our
                engineering team in Abuja will review and respond promptly.
              </p>
              <div className="success-actions" style={{ marginTop: "20px" }}>
                <button
                  type="button"
                  className="contact-submit-btn"
                  onClick={handleReset}
                >
                  NEW TRANSMISSION
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="transmission-form">
              <div className="form-head">
                <h2 style={{ fontSize: "20px", letterSpacing: "0.06em" }}>
                  TRANSMISSION DISPATCH FORM
                </h2>
                <p style={{ fontSize: "13px", color: "var(--muted)" }}>
                  Submit direct specifications for bus integration, RF testing, or PAUSN programs.
                </p>
              </div>

              {status === "error" && (
                <div
                  style={{
                    padding: "10px 14px",
                    background: "rgba(220, 38, 38, 0.12)",
                    border: "1px solid rgba(220, 38, 38, 0.4)",
                    borderRadius: "6px",
                    color: "#fca5a5",
                    fontSize: "12px",
                    marginBottom: "16px",
                  }}
                >
                  {errorMessage}
                </div>
              )}

              <div className="form-field">
                <label className="field-label">DOMAIN / INQUIRY TYPE</label>
                <div className="inquiry-chips">
                  {INQUIRY_TYPES.map((type) => (
                    <button
                      type="button"
                      key={type}
                      className={`inquiry-chip ${inquiryType === type ? "active" : ""}`}
                      onClick={() => setInquiryType(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-field">
                  <label className="field-label">NAME / CALLSIGN</label>
                  <input
                    type="text"
                    required
                    placeholder="Dr. Amina Bello"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="contact-input"
                  />
                </div>
                <div className="form-field">
                  <label className="field-label">ORGANIZATION / UNIVERSITY</label>
                  <input
                    type="text"
                    placeholder="Federal University / Institute"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="contact-input"
                  />
                </div>
              </div>

              <div className="form-field">
                <label className="field-label">OFFICIAL EMAIL</label>
                <input
                  type="email"
                  required
                  placeholder="contact@institution.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="contact-input"
                />
              </div>

              <div className="form-field">
                <label className="field-label">TELEMETRY / BRIEF MESSAGE</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Detail research scope, subsystem specs, or partnership objective..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="contact-textarea"
                />
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  disabled={status === "transmitting"}
                  className="contact-submit-btn"
                >
                  {status === "transmitting" ? (
                    <>
                      <Radio size={15} className="spin-icon" /> TRANSMITTING PACKET...
                    </>
                  ) : (
                    <>
                      TRANSMIT DISPATCH <ArrowRight size={14} />
                    </>
                  )}
                </button>
                <a
                  href={`mailto:hello@lune.africa?subject=${encodeURIComponent(inquiryType)}`}
                  className="fallback-mailto"
                >
                  <Mail size={13} /> Or dispatch via standard mailto
                </a>
              </div>
            </form>
          )}
        </div>
      </section>

      <SpaceXFooter onOpenContact={onOpenContact} />
    </>
  );
}
