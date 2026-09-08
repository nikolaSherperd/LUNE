import React, { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  Radio,
  Send,
  Sparkles,
  X,
} from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INQUIRY_TYPES = [
  "PAUSN Academic Collaboration",
  "Institutional / Space Agency Program",
  "Commercial Satellite Subsystems",
  "Precision Additive Manufacturing",
  "Engineering Careers & Fellowships",
];

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [inquiryType, setInquiryType] = useState(INQUIRY_TYPES[0]);
  const [fullName, setFullName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "transmitting" | "success">(
    "idle",
  );
  const [receiptId, setReceiptId] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;

    setStatus("transmitting");
    setTimeout(() => {
      const generatedId = `LUNE-TX-${Math.floor(100000 + Math.random() * 900000)}`;
      setReceiptId(generatedId);
      setStatus("success");
    }, 1200);
  };

  const handleReset = () => {
    setStatus("idle");
    setFullName("");
    setOrganization("");
    setEmail("");
    setMessage("");
    onClose();
  };

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="contact-modal-window"
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-top-bar">
          <div className="modal-headline-meta">
            <span className="micro-label">COMMUNICATIONS TERMINAL</span>
            <span className="domain-pill">SECURE DISPATCH</span>
          </div>
          <button
            className="palette-close-btn"
            onClick={onClose}
            aria-label="Close terminal"
          >
            <X size={17} />
          </button>
        </div>

        <div className="contact-modal-body">
          {status === "success" ? (
            <div className="transmission-success">
              <div className="success-pulse">
                <CheckCircle2 size={38} className="success-icon" />
              </div>
              <h3>TRANSMISSION ACKNOWLEDGED</h3>
              <p className="success-meta">
                PACKET ID: <code>{receiptId}</code>
              </p>
              <p className="success-text">
                Your dispatch has been logged in LUNE's mission registry. Our
                engineering or ecosystem team in Abuja will review and follow up
                via encrypted channel.
              </p>
              <div className="success-actions">
                <button className="contact-submit-btn" onClick={handleReset}>
                  CLOSE DISPATCH TERMINAL
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="transmission-form">
              <div className="form-head">
                <h2>ESTABLISH CONTACT</h2>
                <p>
                  Direct engineering, research, institutional or supplier
                  inquiries to LUNE.
                </p>
              </div>

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
      </div>
    </div>
  );
}
