import React, { useState, useEffect } from "react";
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

import { INQUIRY_TYPES, submitContactInquiry } from "../services/contact";

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [inquiryType, setInquiryType] = useState<string>(INQUIRY_TYPES[0]);
  const [fullName, setFullName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "transmitting" | "success" | "error">(
    "idle",
  );
  const [receiptId, setReceiptId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

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
      setErrorMessage(err.message || "Unable to route transmission. Please retry.");
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

              {status === "error" && (
                <div
                  style={{
                    padding: "10px 14px",
                    background: "rgba(220, 38, 38, 0.12)",
                    border: "1px solid rgba(220, 38, 38, 0.4)",
                    borderRadius: "4px",
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
      </div>
    </div>
  );
}
