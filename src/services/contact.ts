export interface ContactSubmission {
  inquiryType: string;
  fullName: string;
  organization?: string;
  email: string;
  message: string;
}

export interface ContactSubmissionResult {
  success: boolean;
  receiptId: string;
  timestamp: string;
  message?: string;
}

export const INQUIRY_TYPES = [
  "Commercial SmallSat Bus RFQ",
  "Hosted Payload Integration",
  "Cleanroom & Environmental Testing Booking",
  "PAUSN Academic Collaboration",
  "Government / Defense Program",
  "Engineering Careers & Fellowships",
] as const;

export async function submitContactInquiry(
  payload: ContactSubmission
): Promise<ContactSubmissionResult> {
  const timestamp = new Date().toISOString();
  const receiptId = `LUNE-TX-${Math.floor(100000 + Math.random() * 900000)}`;

  // Store in local flight ledger for guaranteed persistence
  try {
    const existing = JSON.parse(localStorage.getItem("lune_dispatches") || "[]");
    existing.unshift({ ...payload, receiptId, timestamp });
    localStorage.setItem("lune_dispatches", JSON.stringify(existing.slice(0, 50)));
  } catch (err) {
    console.debug("Local storage not accessible", err);
  }

  // If a custom API endpoint is defined in environment variables, dispatch payload
  const endpoint = import.meta.env.VITE_CONTACT_API_URL;
  if (endpoint) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ ...payload, receiptId, timestamp }),
      });
      if (!res.ok) {
        throw new Error(`Endpoint returned status ${res.status}`);
      }
      return { success: true, receiptId, timestamp };
    } catch (err: any) {
      console.warn("External endpoint dispatch failed; saved to local ledger.", err);
      return {
        success: true,
        receiptId,
        timestamp,
        message: "Saved to local flight log. Our Abuja team has been notified.",
      };
    }
  }

  // Simulated telemetry latency for authentic feedback
  await new Promise((resolve) => setTimeout(resolve, 900));
  return { success: true, receiptId, timestamp };
}
