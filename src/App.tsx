import React, { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

import { CommandPalette } from "./components/CommandPalette";
import { ContactModal } from "./components/ContactModal";
import { ResearchModal } from "./components/ResearchModal";
import { RoadmapModal } from "./components/RoadmapModal";
import { SystemDrawer } from "./components/SystemDrawer";
import { Layout } from "./components/layout";
import { JournalItem, ResearchItem, SystemItem } from "./data";

// Route-level code-splitting with React.lazy
const Home = lazy(() => import("./pages/Home"));
const SystemsPage = lazy(() => import("./pages/SystemsPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const MissionsPage = lazy(() => import("./pages/MissionsPage"));
const ResearchPage = lazy(() => import("./pages/ResearchPage"));
const TechnologyPage = lazy(() => import("./pages/TechnologyPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const JournalPage = lazy(() => import("./pages/JournalPage"));
const InfrastructurePage = lazy(() => import("./pages/InfrastructurePage"));
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
          fontFamily: "var(--font-mono, monospace)",
          fontSize: "11px",
          letterSpacing: "0.14em",
          color: "var(--muted)",
          textTransform: "uppercase",
        }}
      >
        Initializing Telemetry...
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
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [activeSystem, setActiveSystem] = useState<SystemItem | null>(null);
  const [activeResearch, setActiveResearch] = useState<ResearchItem | null>(null);
  const [activeStage, setActiveStage] = useState<JournalItem | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("01");

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

  // Global Cmd+K / Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Homepage scrollspy section tracker matching 5-chapter IA
  useEffect(() => {
    const sectionIds = [
      { id: "hero", num: "01" },
      { id: "systems", num: "02" },
      { id: "projects", num: "03" },
      { id: "research-tech", num: "04" },
      { id: "ecosystem", num: "05" },
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i].num);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Layout
      onOpenSearch={() => setPaletteOpen(true)}
      onOpenContact={() => setContactOpen(true)}
      activeSection={activeSection}
    >
      <Suspense fallback={<RouteLoadingFallback />}>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                onSelectSystem={setActiveSystem}
                onSelectResearch={setActiveResearch}
                onSelectStage={setActiveStage}
                onOpenContact={() => setContactOpen(true)}
              />
            }
          />
          <Route
            path="/systems"
            element={
              <SystemsPage
                onSelectSystem={setActiveSystem}
                onOpenContact={() => setContactOpen(true)}
              />
            }
          />
          <Route
            path="/projects"
            element={
              <ProjectsPage
                onOpenContact={() => setContactOpen(true)}
              />
            }
          />
          <Route
            path="/missions"
            element={
              <MissionsPage
                onOpenContact={() => setContactOpen(true)}
              />
            }
          />
          <Route
            path="/research"
            element={
              <ResearchPage
                onOpenContact={() => setContactOpen(true)}
              />
            }
          />
          <Route
            path="/technology"
            element={
              <TechnologyPage
                onOpenContact={() => setContactOpen(true)}
              />
            }
          />
          <Route
            path="/about"
            element={<AboutPage onOpenContact={() => setContactOpen(true)} />}
          />
          <Route
            path="/mission"
            element={<AboutPage onOpenContact={() => setContactOpen(true)} />}
          />
          <Route
            path="/journal"
            element={<JournalPage onOpenContact={() => setContactOpen(true)} />}
          />
          <Route
            path="/infrastructure"
            element={
              <InfrastructurePage
                onOpenContact={() => setContactOpen(true)}
              />
            }
          />
          <Route
            path="/contact"
            element={<ContactPage onOpenContact={() => setContactOpen(true)} />}
          />
          <Route
            path="*"
            element={
              <Home
                onSelectSystem={setActiveSystem}
                onSelectResearch={setActiveResearch}
                onSelectStage={setActiveStage}
                onOpenContact={() => setContactOpen(true)}
              />
            }
          />
        </Routes>
      </Suspense>

      {/* Global Interactive Modals and Drawers */}
      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onSelectSystem={setActiveSystem}
        onSelectResearch={setActiveResearch}
        onSelectStage={setActiveStage}
      />

      <SystemDrawer
        system={activeSystem}
        onClose={() => setActiveSystem(null)}
        onSelectSystem={setActiveSystem}
      />

      <ResearchModal
        research={activeResearch}
        onClose={() => setActiveResearch(null)}
        onSelectResearch={setActiveResearch}
      />

      <RoadmapModal
        initialStage={activeStage}
        onClose={() => setActiveStage(null)}
      />

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </Layout>
  );
}

export default App;
