import React, { Suspense, lazy, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

import { ContactModal } from "./components/ContactModal";
import { Layout } from "./components/layout";

// Route-level code-splitting with React.lazy
const Home = lazy(() => import("./pages/Home"));
const PlatformsPage = lazy(() => import("./pages/PlatformsPage"));
const MissionsPage = lazy(() => import("./pages/MissionsPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

function RouteLoadingFallback() {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "14px",
      }}
    >
      <div
        style={{
          width: "32px",
          height: "32px",
          border: "2px solid rgba(255, 255, 255, 0.12)",
          borderTopColor: "var(--accent)",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <span
        style={{
          fontFamily: "var(--font-sans, sans-serif)",
          fontSize: "12px",
          letterSpacing: "0.08em",
          color: "var(--muted)",
          textTransform: "uppercase",
        }}
      >
        Loading LUNE Aerospace...
      </span>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export function App() {
  const [contactOpen, setContactOpen] = useState(false);

  // Global Lenis smooth momentum scroll instance
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    (window as any).__lenis = lenis;

    return () => {
      lenis.destroy();
      delete (window as any).__lenis;
    };
  }, []);

  return (
    <Layout onOpenContact={() => setContactOpen(true)}>
      <Suspense fallback={<RouteLoadingFallback />}>
        <Routes>
          {/* Core 4 Pages */}
          <Route path="/" element={<Home onOpenContact={() => setContactOpen(true)} />} />
          <Route
            path="/platforms"
            element={<PlatformsPage onOpenContact={() => setContactOpen(true)} />}
          />
          <Route
            path="/missions"
            element={<MissionsPage onOpenContact={() => setContactOpen(true)} />}
          />
          <Route
            path="/about"
            element={<AboutPage onOpenContact={() => setContactOpen(true)} />}
          />
          <Route
            path="/contact"
            element={<ContactPage onOpenContact={() => setContactOpen(true)} />}
          />

          {/* Consolidated Backward-Compatible Redirects */}
          <Route path="/systems" element={<Navigate to="/platforms" replace />} />
          <Route path="/technology" element={<Navigate to="/platforms" replace />} />
          <Route path="/infrastructure" element={<Navigate to="/platforms" replace />} />
          <Route path="/projects" element={<Navigate to="/missions" replace />} />
          <Route path="/mission" element={<Navigate to="/about" replace />} />
          <Route path="/research" element={<Navigate to="/about" replace />} />
          <Route path="/journal" element={<Navigate to="/about" replace />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>

      {/* Global Contact Transmission Modal */}
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </Layout>
  );
}

export default App;
