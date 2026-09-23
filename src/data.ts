import heroSpacecraft from "../Images/4d470eaec613721b01026b3ffbd82ca4.jpg";
import launchVehicle from "../Images/58b129e81e16c5ccff592de06b93656e.jpg";
import launchPad from "../Images/71e3fbd44c9688627366e223310b9c66.jpg";
import largeSpacecraft from "../Images/98ae5c7f60e7d937a960430b82d0f83f.jpg";
import darkSatellite from "../Images/ab5bdf14b63eba46547f5ff99c5fce11.jpg";
import luneWordmark from "../Images/1500x500.jpeg";
import luneEmblem from "../Images/gkZcl8oI_400x400.jpg";
import siteBackground from "../Images/site-background.webp";

export interface NavChildItem {
  label: string;
  path: string;
  description: string;
  code: string;
}

export interface NavItem {
  label: string;
  path: string;
  badge?: string;
  children?: NavChildItem[];
}

export interface SystemDetail {
  tagline: string;
  readinessLevel: string;
  extendedDescription: string;
  subsystems: string[];
  keySpecs: { label: string; value: string }[];
}

export interface SystemItem {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  detail: SystemDetail;
}

export interface ResearchItem {
  id: string;
  number: string;
  title: string;
  description: string;
  meta: string;
  leadDomain: string;
  trl: number;
  abstract: string;
  keyMilestones: string[];
  collaborators: string;
}

export interface JournalItem {
  id: string;
  stageNumber: string;
  category: string;
  title: string;
  date: string;
  status: "Operational" | "Active R&D" | "Planned";
  image?: string;
  timeline: string;
  deliverables: string[];
}

export interface SpacecraftHotspot {
  id: string;
  x: number; // percentage
  y: number; // percentage
  title: string;
  category: string;
  specs: string;
  details: string;
}

export const navigationItems: NavItem[] = [
  {
    label: "Systems",
    path: "/systems",
    children: [
      {
        label: "Space Systems",
        path: "/systems#space-systems",
        description: "3U, 6U, 12U & 150kg modular flight platforms",
        code: "01.1",
      },
      {
        label: "Avionics",
        path: "/systems#avionics",
        description: "Rad-tolerant Cortex-M7 OBC, EPS & harness",
        code: "01.2",
      },
      {
        label: "Autonomous Systems",
        path: "/systems#autonomous",
        description: "FDIR, 3-axis stabilization & ADCS simulation",
        code: "01.3",
      },
      {
        label: "Manufacturing",
        path: "/systems#manufacturing",
        description: "ISO 7 cleanroom, TVAC & additive metallurgy",
        code: "01.4",
      },
    ],
  },
  {
    label: "Projects",
    path: "/projects",
    children: [
      {
        label: "Active",
        path: "/projects#active",
        description: "LUNE-1, PAUSN-1 & Ground Station Network",
        code: "02.1",
      },
      {
        label: "Research",
        path: "/projects#research",
        description: "Sovereign EO-1, tactical crypto & sensor testbeds",
        code: "02.2",
      },
      {
        label: "Completed",
        path: "/projects#completed",
        description: "HIL bench qualification & TVAC flight heritage",
        code: "02.3",
      },
    ],
  },
  {
    label: "Research",
    path: "/research",
    children: [
      {
        label: "Papers",
        path: "/research#papers",
        description: "PAUSN peer-reviewed monographs & BibTeX archive",
        code: "03.1",
      },
      {
        label: "Technical Notes",
        path: "/research#technical-notes",
        description: "Engineering memos on thermal, radiation & links",
        code: "03.2",
      },
      {
        label: "Engineering Logs",
        path: "/research#engineering-logs",
        description: "TVAC, shaker table & cold-flow qualification data",
        code: "03.3",
      },
    ],
  },
  {
    label: "Technology",
    path: "/technology",
    children: [
      {
        label: "Embedded",
        path: "/technology#embedded",
        description: "Hardware root of trust, RTOS & TMR ECC memory",
        code: "04.1",
      },
      {
        label: "AI",
        path: "/technology#ai",
        description: "Orbital Edge NPU (4.2 TOPS) & real-time segmentation",
        code: "04.2",
      },
      {
        label: "Communications",
        path: "/technology#communications",
        description: "S/X-band transceivers, LoRa mesh & phased arrays",
        code: "04.3",
      },
      {
        label: "Control",
        path: "/technology#control",
        description: "3-axis reaction wheels, star tracker & B-dot",
        code: "04.4",
      },
    ],
  },
  {
    label: "About",
    path: "/about",
    children: [
      {
        label: "Mission",
        path: "/about#mission",
        description: "The industrial foundation for an African space civilization",
        code: "05.1",
      },
      {
        label: "Philosophy",
        path: "/about#philosophy",
        description: "Capability before complexity & the 6-step cycle",
        code: "05.2",
      },
      {
        label: "Team",
        path: "/about#team",
        description: "Engineering leadership, PAUSN consortium & fellowships",
        code: "05.3",
      },
    ],
  },
  {
    label: "Journal",
    path: "/journal",
    children: [
      {
        label: "Updates",
        path: "/journal#updates",
        description: "Program milestones, funding & sovereign agreements",
        code: "06.1",
      },
      {
        label: "Experiments",
        path: "/journal#experiments",
        description: "TVAC thermal cycles, vibration sweeps & environmental screening",
        code: "06.2",
      },
      {
        label: "Field Notes",
        path: "/journal#field-notes",
        description: "African ground station deployments & launch prep",
        code: "06.3",
      },
    ],
  },
];

export const images = {
  hero: heroSpacecraft,
  systems: launchPad,
  platform: largeSpacecraft,
  manufacturing: launchVehicle,
  satellite: darkSatellite,
  cleanroom: launchVehicle,
  facility: launchPad,
  background: siteBackground,
};

export const brandAssets = {
  wordmark: luneWordmark,
  emblem: luneEmblem,
  background: siteBackground,
};

export const systems: SystemItem[] = [
  {
    id: "space-systems",
    number: "01",
    title: "SPACE SYSTEMS",
    description:
      "Modular spacecraft platforms (3U, 6U, 12U & 150kg) configured from standardized building blocks and produced at scale.",
    image: images.platform,
    detail: {
      tagline: "Standardized Modular Spacecraft Architecture",
      readinessLevel: "TRL 6 / FLIGHT HERITAGE READY",
      extendedDescription:
        "Instead of building every satellite as a completely unique machine, LUNE creates a common technological foundation — a spacecraft platform made from standardized systems that can be assembled, tested, upgraded, and reused. Moving beyond the limitations of conventional CubeSats toward modular spacecraft produced at industrial scale.",
      keySpecs: [
        { label: "Form Factors", value: "3U, 6U, 12U CubeSat and 150kg Modular Bus" },
        { label: "Architecture", value: "Standardized Reconfigurable Subsystems" },
        { label: "Operational Orbit", value: "450 km – 650 km Sun-Synchronous (SSO)" },
        { label: "Pointing Precision", value: "< 0.05° 3-Axis via Star Tracker & Reaction Wheels" },
        { label: "Telemetry & Comms", value: "S-Band Telecommand / X-Band 50 Mbps Payload Downlink" },
        { label: "Production Model", value: "Batch Qualified & Scaled Manufacturing" },
      ],
      subsystems: [
        "Standardized Flight Bus Interface & Reusable Subsystem Benches",
        "Radiation-tolerant Dual-Core ARM Cortex-M7 On-Board Computer (OBC)",
        "3-Axis Reaction Wheels with Integrated Magnetic Torquer Rods",
        "Multi-channel Electrical Power System (EPS) with LiFePO4 Battery Pack",
        "Autonomous Fault Detection, Isolation and Recovery (FDIR) Firmware",
      ],
    },
  },
  {
    id: "avionics",
    number: "02",
    title: "AVIONICS",
    description:
      "Radiation-tolerant flight computers, multi-channel EPS power distribution, and fault-tolerant space-grade telemetry harnesses.",
    image: images.systems,
    detail: {
      tagline: "Radiation-Tolerant Silicon & Deterministic Flight Avionics",
      readinessLevel: "TRL 6 / BENCH QUALIFIED",
      extendedDescription:
        "Engineered for the harsh ionizing radiation and extreme thermal environments of LEO. Features dual lockstep ARM Cortex-M7 cores, Triple Modular Redundant (TMR) ECC memory, isolated power regulation, and deterministic RTOS kernel execution.",
      keySpecs: [
        { label: "Processor Core", value: "Dual Lockstep ARM Cortex-M7 @ 400 MHz" },
        { label: "Radiation Hardening", value: "Latchup Immune > 35 MeV-cm²/mg (SEL) / 25 krad (TID)" },
        { label: "Memory Subsystem", value: "Triple-Modular Redundant (TMR) ECC LPDDR4 + MRAM" },
        { label: "Data Buses", value: "SpaceWire (100 Mbps), CAN 2.0B, RS-422 & I2C" },
        { label: "EPS Rails", value: "Regulated 28V, 12V, 5V, 3.3V with Overcurrent Trip" },
        { label: "Operating Temp", value: "-40°C to +85°C Industrial Aerospace Grade" },
      ],
      subsystems: [
        "Cryptographic Hardware Security Module (HSM) for Uplink Authentication",
        "Solar Array Maximum Power Point Tracking (MPPT) Battery Charge Regulators",
        "Radiation-Hardened Supervisory Microcontroller Watchdog",
        "Galvanically Isolated Differential Sensor Harnessing",
      ],
    },
  },
  {
    id: "autonomous-systems",
    number: "03",
    title: "AUTONOMOUS SYSTEMS",
    description:
      "Autonomous attitude determination and control (ADCS), real-time FDIR fault recovery, and orbital trajectory maintenance.",
    image: images.manufacturing,
    detail: {
      tagline: "Intelligent On-Orbit Autonomy & Closed-Loop Control",
      readinessLevel: "TRL 5 / INTEGRATED HIL TESTED",
      extendedDescription:
        "Spacecraft cannot afford continuous human micromanagement. LUNE autonomous systems run closed-loop attitude stabilization, automated reaction wheel momentum dumping via magnetorquers, and autonomous fault mitigation within milliseconds.",
      keySpecs: [
        { label: "ADCS Stability", value: "< 0.03° 3-Axis Pointing via Star Tracker" },
        { label: "FDIR Latency", value: "< 15 ms Autonomous Fault Detection & Rail Isolation" },
        { label: "Detumble Alg", value: "Energy-Dissipating Lyapunov B-Dot Magnetic Stabilization" },
        { label: "Actuator Array", value: "3-Axis Brushless Reaction Wheels + 3 Magnetorquer Rods" },
        { label: "Sensor Suite", value: "Miniature Star Tracker, Coarse Sun Sensors, 3-Axis Magnetometer" },
        { label: "Autonomous Orbit", value: "SGP4 Ephemeris Propagation with GPS Time Lock" },
      ],
      subsystems: [
        "Closed-Loop Nadir and Target Slew Attitude Controller",
        "Multi-Tiered Fault Detection, Isolation and Recovery (FDIR) State Engine",
        "Autonomous Battery Safe-Mode & Solar Array Sun-Tracking Director",
        "Hardware-in-the-Loop (HIL) Real-Time Dynamics Simulator Interface",
      ],
    },
  },
  {
    id: "manufacturing",
    number: "04",
    title: "MANUFACTURING",
    description:
      "Sovereign ISO Class 7 cleanrooms, TVAC thermal vacuum cycling, 20 kN electrodynamic vibration testing, and additive metallurgy in Abuja.",
    image: images.manufacturing,
    detail: {
      tagline: "Aerospace Metallurgy, Cleanroom Integration & Metrology",
      readinessLevel: "TRL 7 / OPERATIONAL FOUNDATION",
      extendedDescription:
        "Building a sovereign domestic manufacturing base in Abuja, Nigeria and partner African nations. Combining multi-axis CNC machining, selective laser melting (SLM) 3D printing of high-temperature superalloys, and rigorous environmental qualification matching NASA GEVS and ECSS standards.",
      keySpecs: [
        { label: "Additive Metallurgy", value: "Laser Powder Bed Fusion (Inconel 718, Ti-6Al-4V, AlSi10Mg)" },
        { label: "Cleanroom Facility", value: "ISO Class 7 (Class 10,000) Spacecraft Integration Bay" },
        { label: "Thermal Vacuum (TVAC)", value: "-75°C to +135°C @ 10⁻⁶ Torr Chamber" },
        { label: "Vibration Test Rig", value: "20 kN Electrodynamic Shaker Table (Sine & Random)" },
        { label: "Dimensional Metrology", value: "Coordinate Measuring Machine (CMM) ± 1.5 µm Accuracy" },
        { label: "PCB Assembly", value: "Automated SMT Line with Class 3 Aerospace Soldering" },
      ],
      subsystems: [
        "5-Axis High-Speed CNC Gantry for Airframe & Fairing Tooling",
        "Helium Leak Detection & Mass Spectrometry Vacuum Testing",
        "Non-Destructive Industrial Computed Tomography (CT) Scanning",
        "Outgassing Measurement & Cleanroom Bakeout Chambers",
      ],
    },
  },
];

/* -------------------------------------------------------------------------- */
/* PROJECTS ARCHITECTURE (Active, Research, Completed)                        */
/* -------------------------------------------------------------------------- */
export interface ProjectItem {
  id: string;
  category: "active" | "research" | "completed";
  code: string;
  name: string;
  headline: string;
  statusBadge: string;
  orbit?: string;
  formFactor: string;
  timeline: string;
  overview: string;
  deliverables: string[];
  metrics: { label: string; value: string }[];
}

export const projectsData: ProjectItem[] = [
  {
    id: "lune-1",
    category: "active",
    code: "PRJ-01",
    name: "LUNE-1 Tech Demonstrator",
    headline: "First Indigenous Flight Computer & Autonomous ADCS Mission",
    statusBadge: "In Cleanroom Integration",
    orbit: "500 km Sun-Synchronous (SSO)",
    formFactor: "3U CubeSat (4.2 kg)",
    timeline: "Q4 2026 Launch Window",
    overview:
      "LUNE's primary orbital pathfinder mission validating domestic radiation-tolerant avionics, 3-axis reaction wheel pointing, and real-time neural edge inference over West Africa.",
    deliverables: [
      "Flight verification of dual-core ARM Cortex-M7 On-Board Computer",
      "Sub-0.05° pointing stabilization using miniature star tracker",
      "Onboard cloud-filtering neural inference engine test passes",
      "Direct telemetry downlink to Abuja Ground Station Gateway",
    ],
    metrics: [
      { label: "Mass", value: "4.2 kg" },
      { label: "Orbit", value: "500 km SSO" },
      { label: "Downlink", value: "50 Mbps X-Band" },
      { label: "Location", value: "Abuja Cleanroom" },
    ],
  },
  {
    id: "pausn-gateway",
    category: "active",
    code: "PRJ-02",
    name: "Pan-African Ground Station Gateway Network",
    headline: "Multi-Node S/X-Band Tracking & Telemetry Station Infrastructure",
    statusBadge: "Operational / Active Links",
    orbit: "Ground Segment Across 4 Hubs",
    formFactor: "4.5m S/X-Band Automated Dishes",
    timeline: "Continuous Daily Operations",
    overview:
      "A distributed network of automated ground stations connecting Abuja (HQ), Nairobi (Kenya), Cape Town (South Africa), and Cairo (Egypt) to deliver unified orbital TT&C coverage.",
    deliverables: [
      "Automated TLE orbit propagation and dish tracking",
      "Direct-to-cloud telemetry ingestion and mission portal",
      "Emergency TT&C uplink command authorization",
      "Academic data distribution for PAUSN university nodes",
    ],
    metrics: [
      { label: "Gateways", value: "4 African Nodes" },
      { label: "Dish Diameter", value: "4.5 Meters" },
      { label: "Frequency", value: "S-Band & X-Band" },
      { label: "Uptime", value: "99.85%" },
    ],
  },
  {
    id: "pausn-pathfinder",
    category: "active",
    code: "PRJ-03",
    name: "PAUSN-1 Academic Pathfinder",
    headline: "Multi-University Scientific Payload Carrier",
    statusBadge: "Subsystem Integration",
    orbit: "525 km SSO",
    formFactor: "6U CubeSat (11.5 kg)",
    timeline: "Q2 2027 Scheduled",
    overview:
      "Co-developed with the Pan-African University Space Network (PAUSN), carrying student and faculty plasma diagnostic instruments and regional LoRa mesh transmitters.",
    deliverables: [
      "Joint assembly by PAUSN fellows inside LUNE cleanrooms",
      "Ionospheric plasma electron density sensor array",
      "Distributed student ground terminal interconnect",
      "Open telemetry feed for African universities",
    ],
    metrics: [
      { label: "Nodes", value: "8 Universities" },
      { label: "Payload Mass", value: "2.4 kg" },
      { label: "Orbit", value: "525 km SSO" },
      { label: "Partners", value: "AfSA & NASRDA" },
    ],
  },
  {
    id: "sovereign-eo1",
    category: "research",
    code: "PRJ-04",
    name: "Sovereign EO-1 Regional Earth Observation",
    headline: "Sub-Meter Resolution Agricultural & Climate Monitoring Platform",
    statusBadge: "Architecture & Optical Design",
    orbit: "550 km Dawn-Dusk SSO",
    formFactor: "150 kg SmallSat Class",
    timeline: "2028 Target Deployment",
    overview:
      "Next-generation modular spacecraft platform engineered to provide sovereign optical and multispectral Earth observation for agricultural yield prediction, flood monitoring, and infrastructure security.",
    deliverables: [
      "0.75m Ground Sampling Distance (GSD) optical payload",
      "Deployable articulated 250W GaAs solar wings",
      "Autonomous 3-axis reaction wheels and star-tracker pointing",
      "Sovereign cryptographic image encryption keys",
    ],
    metrics: [
      { label: "Resolution", value: "0.75m GSD" },
      { label: "Bus Class", value: "150 kg SmallSat" },
      { label: "Design Life", value: "5 Years" },
      { label: "Downlink", value: "150 Mbps X-Band" },
    ],
  },
  {
    id: "aero-secure",
    category: "research",
    code: "PRJ-05",
    name: "Aero-Secure Tactical Defense Comms",
    headline: "Post-Quantum Cryptographic Orbital Relay",
    statusBadge: "Simulation & FPGA Synthesis",
    orbit: "600 km Polar Circular",
    formFactor: "12U CubeSat (22 kg)",
    timeline: "2028 – 2029 Target",
    overview:
      "Hardened orbital secure relay with hardware root of trust and post-quantum lattice cryptography to ensure unjammable and spoof-proof sovereign communications.",
    deliverables: [
      "Post-quantum lattice cryptography coprocessor on FPGA",
      "Wideband SDR frontend spanning 70 MHz to 6 GHz",
      "Anti-jamming spread spectrum telemetry modes",
      "Single-Event-Upset immune lockstep avionics",
    ],
    metrics: [
      { label: "Security", value: "Post-Quantum HSM" },
      { label: "SDR Band", value: "70 MHz – 6 GHz" },
      { label: "Form Factor", value: "12U Bus" },
      { label: "Sovereignty", value: "Domestic Keys" },
    ],
  },
  {
    id: "hil-qualification",
    category: "completed",
    code: "PRJ-06",
    name: "Hardware-In-The-Loop (HIL) Flight Qualification",
    headline: "Comprehensive Full-Bus Real-Time Emulation",
    statusBadge: "Flight Heritage Proven",
    formFactor: "Full Subsystem Suite",
    timeline: "Completed Q2 2026",
    overview:
      "Over 1,200 continuous hours of hardware-in-the-loop stress testing verifying flight software, telemetry encryption, EPS power regulation, and ADCS reaction wheel response.",
    deliverables: [
      "1,200 continuous hours without anomalous core reset",
      "Simulated eclipse, tumbling, and single-event upset recovery",
      "Direct verification of SpaceWire, CAN, and RS-422 communications",
      "Formal verification matching ECSS-E-ST-10C standards",
    ],
    metrics: [
      { label: "Test Hours", value: "1,200+ Hours" },
      { label: "Anomalies", value: "0 Critical" },
      { label: "Standard", value: "ECSS Qualified" },
      { label: "Bus Coverage", value: "100% Subsystems" },
    ],
  },
  {
    id: "tvac-qualification",
    category: "completed",
    code: "PRJ-07",
    name: "TVAC & Shaker Environmental Qualification Campaign",
    headline: "Rigorous Space Environment Simulation in Abuja",
    statusBadge: "Certified Complete",
    formFactor: "3U & 6U Engineering Models",
    timeline: "Completed Q3 2026",
    overview:
      "Subjected engineering structural models to extreme vacuum thermal cycling (-75°C to +135°C @ 10⁻⁶ Torr) and NASA GEVS 14.1 Grms 3-axis vibration testing without mechanical degradation.",
    deliverables: [
      "Thermal vacuum bakeout and outgassing certification",
      "Sine and random vibration sweeps on 20 kN electrodynamic table",
      "Zero structural crack propagation verified via metrology CMM",
      "Solar array deployment kinematics verified post-vibration",
    ],
    metrics: [
      { label: "Vacuum Level", value: "1.0 × 10⁻⁶ Torr" },
      { label: "Vibration", value: "14.1 Grms GEVS" },
      { label: "Temp Swing", value: "-75°C to +135°C" },
      { label: "Status", value: "Flight Ready" },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* RESEARCH DATA (Papers, Technical Notes, Engineering Logs)                  */
/* -------------------------------------------------------------------------- */
export interface TechnicalNoteItem {
  id: string;
  code: string;
  title: string;
  date: string;
  category: string;
  leadAuthor: string;
  summary: string;
  keyFindings: string[];
}

export const technicalNotesData: TechnicalNoteItem[] = [
  {
    id: "tn-01",
    code: "TN-2026-01",
    title: "Single Event Upset (SEU) Mitigation in LEO COTS Embedded Microcontrollers",
    date: "August 2026",
    category: "AVIONICS & RADIATION",
    leadAuthor: "LUNE Avionics Research Group",
    summary:
      "Empirical analysis of single-event upsets in Commercial-Off-The-Shelf (COTS) ARM Cortex-M7 processors within low Earth orbit solar particle radiation environments, comparing software watchdog mechanisms vs. hardware Triple Modular Redundancy.",
    keyFindings: [
      "TMR ECC memory architectures reduced uncorrected bitflips by 99.4%",
      "Periodic background flash scrubbing prevents latent error accumulation",
      "Supervisory external hardware watchdog guarantees sub-15ms system recovery",
    ],
  },
  {
    id: "tn-02",
    code: "TN-2026-02",
    title: "Thermal Dissipation & Heat Pipe Modeling in Conformal Aerospace Chassis",
    date: "July 2026",
    category: "THERMAL & MECHANICAL",
    leadAuthor: "PAUSN Thermal Dynamics Lab",
    summary:
      "Computational fluid and conduction modeling of oscillating heat pipes integrated directly into 3D printed additive AlSi10Mg smallsat chassis, dissipating up to 45W of compute waste heat during continuous daylight passes.",
    keyFindings: [
      "Conformal internal heat pipes reduce peak component temperatures by 18.2°C",
      "Eliminates traditional bulky copper thermal straps, saving 340g of bus mass",
      "Maintains battery cells strictly between +5°C and +25°C throughout eclipse",
    ],
  },
  {
    id: "tn-03",
    code: "TN-2026-03",
    title: "S-Band TT&C and X-Band Downlink Link Budget Margins over West Africa",
    date: "June 2026",
    category: "RF & TELECOMMUNICATIONS",
    leadAuthor: "LUNE Ground Network Team",
    summary:
      "Detailed link budget calculations evaluating atmospheric rain attenuation, ionospheric scintillation, and elevation angle loss for direct downlinks to the Abuja, Nairobi, and Cape Town ground gateways.",
    keyFindings: [
      "Minimum 4.8 dB link margin achieved at 5° elevation during heavy rainfall",
      "Circular polarization prevents Faraday rotation fading in equatorial ionosphere",
      "Adaptive modulation allows 50 Mbps throughput above 15° elevation",
    ],
  },
  {
    id: "tn-04",
    code: "TN-2026-04",
    title: "Passive Attitude Magnetic Detumbling: Lyapunov-Stable B-Dot Implementation",
    date: "May 2026",
    category: "ATTITUDE CONTROL",
    leadAuthor: "PAUSN Astrodynamics Node",
    summary:
      "Mathematical formulation and hardware bench verification of an optimized B-dot magnetic control law, detumbling spacecraft from > 45°/s post-separation rates down to < 1°/s within two orbits.",
    keyFindings: [
      "Guarantees asymptotic stability without requiring rate gyro sensors",
      "Consumes less than 0.8W of power during active magnetic actuation",
      "Preserves battery reserves during critical early orbit phase (LEOP)",
    ],
  },
];

export interface EngineeringLogItem {
  id: string;
  code: string;
  facility: string;
  date: string;
  operator: string;
  title: string;
  status: "PASSED" | "COMPLETED" | "VERIFIED";
  telemetryPoints: { parameter: string; target: string; measured: string; result: string }[];
  notes: string;
}

export const engineeringLogsData: EngineeringLogItem[] = [
  {
    id: "log-tvac-01",
    code: "LOG-TVAC-2609",
    facility: "Abuja TVAC Chamber Bay 1",
    date: "14 Sep 2026",
    operator: "K. Alabi, Lead Test Engineer",
    title: "72-Hour Continuous Vacuum Bakeout & Mass Loss Telemetry at 10⁻⁶ Torr",
    status: "PASSED",
    telemetryPoints: [
      { parameter: "Base Vacuum", target: "< 5.0 × 10⁻⁶ Torr", measured: "1.2 × 10⁻⁶ Torr", result: "NOMINAL" },
      { parameter: "Shroud Low Temp", target: "-75.0°C", measured: "-77.4°C", result: "NOMINAL" },
      { parameter: "Shroud High Temp", target: "+135.0°C", measured: "+136.2°C", result: "NOMINAL" },
      { parameter: "Total Mass Loss (TML)", target: "< 1.00%", measured: "0.24%", result: "EXCELLENT" },
    ],
    notes:
      "All thermal cycles executed with zero sensor drift. Thermal vacuum chamber cold-wall cryogenic LN2 injection operated steadily throughout the 72-hour burn.",
  },
  {
    id: "log-vib-01",
    code: "LOG-VIB-2608",
    facility: "Abuja Electrodynamic Shaker Cell",
    date: "28 Aug 2026",
    operator: "M. Mensah, Structural Dynamics",
    title: "20 kN Multi-Axis Sine Resonance Survey & Random Vibration Sweep (5 Hz – 2,500 Hz)",
    status: "VERIFIED",
    telemetryPoints: [
      { parameter: "1st Fundamental Mode (X)", target: "> 45.0 Hz", measured: "58.4 Hz", result: "PASSED" },
      { parameter: "1st Fundamental Mode (Y)", target: "> 45.0 Hz", measured: "59.1 Hz", result: "PASSED" },
      { parameter: "1st Fundamental Mode (Z)", target: "> 65.0 Hz", measured: "82.6 Hz", result: "PASSED" },
      { parameter: "Random Vibration Level", target: "14.1 Grms (NASA GEVS)", measured: "14.12 Grms", result: "QUALIFIED" },
    ],
    notes:
      "Zero structural fastener loosening observed post-sweep. Micro-crack visual inspection under CMM showed no plastic deformation on solar wing hinges.",
  },
  {
    id: "log-rf-01",
    code: "LOG-RF-2607",
    facility: "Abuja Anechoic Chamber",
    date: "19 Jul 2026",
    operator: "T. Ndlovu, Communications Architect",
    title: "X-Band Phased-Array Transponder S-Parameter & Radiation Pattern Mapping",
    status: "COMPLETED",
    telemetryPoints: [
      { parameter: "Return Loss (S11)", target: "< -15 dB", measured: "-18.4 dB", result: "OPTIMAL" },
      { parameter: "Transmit Gain (8.2 GHz)", target: "> 24.0 dBi", measured: "24.8 dBi", result: "PASSED" },
      { parameter: "Axial Ratio", target: "< 1.5 dB", measured: "1.2 dB", result: "OPTIMAL" },
      { parameter: "Sidelobe Suppression", target: "> 20 dB", measured: "22.4 dB", result: "QUALIFIED" },
    ],
    notes:
      "Near-field spherical scanner verified dual-circular polarization across the full 8.0–8.4 GHz space research downlink band with zero phase jitter.",
  },
];

/* -------------------------------------------------------------------------- */
/* TECHNOLOGY DATA (Embedded, AI, Communications, Control)                    */
/* -------------------------------------------------------------------------- */
export interface TechnologyPillarItem {
  id: "embedded" | "ai" | "communications" | "control";
  title: string;
  eyebrow: string;
  tagline: string;
  leadCopy: string;
  specs: { label: string; value: string }[];
  architecturePoints: { title: string; desc: string }[];
}

export const technologyData: TechnologyPillarItem[] = [
  {
    id: "embedded",
    title: "EMBEDDED SYSTEMS",
    eyebrow: "FOUNDATIONAL COMPUTING CORE",
    tagline: "Radiation-Hardened Microcontrollers & Deterministic RTOS Kernels",
    leadCopy:
      "The nervous system of every LUNE spacecraft. We design embedded silicon systems that pair extreme energy efficiency with radiation resilience, hardware roots of trust, and deterministic real-time responsiveness.",
    specs: [
      { label: "Core Silicon", value: "Dual Lockstep ARM Cortex-M7 @ 400 MHz" },
      { label: "Operating System", value: "Hard Real-Time FreeRTOS / Zephyr Kernel" },
      { label: "Memory Integrity", value: "Triple-Modular Redundant (TMR) ECC LPDDR4" },
      { label: "Security", value: "Hardware Root of Trust with Post-Quantum Boot" },
      { label: "Total Ionizing Dose", value: "> 25 krad Radiation Tolerance" },
      { label: "Power Draw", value: "< 2.2W Nominal Flight Compute Mode" },
    ],
    architecturePoints: [
      {
        title: "Deterministic Flight RTOS",
        desc: "Strict priority-driven preemption guaranteeing sub-millisecond task scheduling for attitude control loops, fault watchdogs, and telecommand processing.",
      },
      {
        title: "Hardware Cryptographic Root of Trust",
        desc: "Dedicated physical tamper-proof enclave ensuring telecommand uplinks are cryptographically signed and authenticated, eliminating unauthorized orbital overrides.",
      },
      {
        title: "Self-Healing Memory Subsystem",
        desc: "Continuous hardware scrubbing of memory cells against cosmic ray single-event upsets (SEU), preventing bitflip accumulation.",
      },
    ],
  },
  {
    id: "ai",
    title: "ORBITAL AI",
    eyebrow: "IN-SPACE NEURAL INFERENCE",
    tagline: "Edge Neural Processing Units Delivering Onboard Telemetry Triage",
    leadCopy:
      "Traditional satellites blindly downlink raw gigabytes of telemetry and imagery, saturating ground station radio bands. LUNE integrates low-power Neural Processing Units (NPUs) directly into flight avionics to triage data on-orbit.",
    specs: [
      { label: "Inference Engine", value: "Edge NPU Delivering 4.2 TOPS" },
      { label: "Thermal Power Envelope", value: "< 3.8W During Active Neural Inference" },
      { label: "Downlink Bandwidth Saved", value: "Up to 80% via Real-Time Cloud Pruning" },
      { label: "Vision Latency", value: "< 45 ms per 12MP Multispectral Frame" },
      { label: "Model Architecture", value: "Quantized MobileNet & U-Net Segmentation" },
      { label: "Quantization", value: "INT8 Precision with Zero Accuracy Loss" },
    ],
    architecturePoints: [
      {
        title: "On-Orbit Cloud Screening",
        desc: "Multispectral optical images obscured by cloud cover are identified and discarded in under 50 milliseconds before ever reaching the radio transponder queue.",
      },
      {
        title: "Real-Time Event Detection",
        desc: "Autonomous edge detection of high-priority maritime vessels, wildfire thermal signatures, and river flood boundaries, triggering immediate priority flash downlinks.",
      },
      {
        title: "Autonomous Anomaly Detection",
        desc: "Unsupervised machine learning monitors onboard telemetry sensors (currents, temperatures, reaction wheel vibrations) to predict component fatigue prior to failure.",
      },
    ],
  },
  {
    id: "communications",
    title: "COMMUNICATIONS",
    eyebrow: "SPACE-TO-GROUND TELEMETRY",
    tagline: "S-Band TT&C, High-Throughput X-Band & Terrestrial Sensor Interconnect",
    leadCopy:
      "Reliable space missions depend on unyielding RF links. LUNE engineers end-to-end radio systems from spacecraft patch arrays to automated 4.5m ground stations across the African continent.",
    specs: [
      { label: "Telemetry & Command (TT&C)", value: "S-Band (2.0 – 2.2 GHz) Omnidirectional" },
      { label: "Payload Downlink", value: "X-Band (8.0 – 8.4 GHz) 50 – 150 Mbps" },
      { label: "Modulation", value: "QPSK / OQPSK / DVB-S2 Adaptive Coding" },
      { label: "Sensor Interconnect", value: "UHF / LoRa Mesh Uplink for Remote Sensors" },
      { label: "Ground Gateways", value: "Abuja, Nairobi, Cape Town, Cairo" },
      { label: "Tracking Reliability", value: "99.85% Automatic Pass Lock" },
    ],
    architecturePoints: [
      {
        title: "Distributed African Ground Station Network",
        desc: "Coordinated tracking gateways across East, West, North, and Southern Africa ensure frequent daily line-of-sight contact passes for rapid telemetry retrieval.",
      },
      {
        title: "Adaptive Modulation & Coding (AMC)",
        desc: "Real-time adjustment of modulation order based on atmospheric rain attenuation and elevation angle, maximizing total gigabyte throughput per pass.",
      },
      {
        title: "Direct-to-Satellite Ground Sensor Interconnect",
        desc: "Spacecraft listen for low-power terrestrial IoT transmitters deployed in agriculture, wildlife conservation, and hydrological river monitoring stations.",
      },
    ],
  },
  {
    id: "control",
    title: "CONTROL & ADCS",
    eyebrow: "PRECISION ATTITUDE CONTROL",
    tagline: "3-Axis Reaction Wheels, Sub-Arcsecond Star Trackers & B-Dot Laws",
    leadCopy:
      "High-resolution Earth imaging and focused communications require sub-arcsecond pointing precision. LUNE's Attitude Determination and Control System (ADCS) maintains closed-loop spacecraft orientation.",
    specs: [
      { label: "Pointing Accuracy", value: "< 0.03° 3-Axis Stabilized" },
      { label: "Star Tracker Precision", value: "< 5 Arcseconds Cross-Boresight" },
      { label: "Reaction Wheels", value: "3-Axis Brushless (0.04 Nms Storage)" },
      { label: "Momentum Desaturation", value: "Triaxial Magnetic Torquer Coils" },
      { label: "Slew Rate", value: "> 3.0° / Second Agile Targeting" },
      { label: "Detumble Time", value: "< 2 Orbits from 45°/s Tip-Off Rate" },
    ],
    architecturePoints: [
      {
        title: "Celestial Star Tracker Sensor Fusion",
        desc: "Dual miniature star trackers cross-reference star patterns against an onboard 5,000-star astronomical catalogue at 10 Hz to maintain absolute inertial orientation.",
      },
      {
        title: "Brushless Magnetic Reaction Wheels",
        desc: "Dynamically balanced flywheels suspended on precision ceramic hybrid bearings provide smooth, jitter-free momentum exchange without optical blur.",
      },
      {
        title: "Lyapunov-Stable Detumbling",
        desc: "Autonomous magnetic B-dot algorithms automatically sense geomagnetic field gradients to safely desaturate momentum without relying on fragile rate sensors.",
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* ABOUT DATA (Mission, Philosophy, Team)                                     */
/* -------------------------------------------------------------------------- */
export interface AboutData {
  mission: {
    northStar: string;
    statement: string;
    pillars: { title: string; description: string }[];
  };
  philosophy: {
    coreTenets: { title: string; quote: string; detail: string }[];
    symbiosisThesis: string;
  };
  team: {
    leaders: { name: string; role: string; bio: string; category: string }[];
    academicNodes: { country: string; institution: string; specialty: string }[];
  };
}

export const aboutData: AboutData = {
  mission: {
    northStar: "THE INDUSTRIAL FOUNDATION FOR AN AFRICAN SPACE ECONOMY",
    statement:
      "The satellite is the beginning. The real objective is enduring capability. LUNE is building the technological, physical, and human foundations of an African space-industrial civilization through standardized spacecraft platforms and sovereign integration.",
    pillars: [
      {
        title: "Indigenous Manufacturing Sovereignty",
        description: "Moving Africa from a passive consumer of foreign space technology to a self-sufficient designer, builder, and operator of modular spacecraft platforms.",
      },
      {
        title: "Standardized Modular Architecture",
        description: "Replacing artisanal, one-off satellite manufacturing with standardized, configurable, and high-reliability platform production at industrial scale.",
      },
      {
        title: "Pan-African Academic Integration",
        description: "Empowering universities across Africa with real orbital flight hardware missions, turning engineering students into mission-qualified aerospace builders.",
      },
    ],
  },
  philosophy: {
    coreTenets: [
      {
        title: "Capability Before Complexity",
        quote: "Start with achievable space systems. Use each generation of knowledge and hardware as the stepping stone for the next.",
        detail:
          "Rather than pursuing fragile one-off bespoke missions, LUNE establishes enduring competency through sequential smallsat execution: 3U CubeSats -> 6U/12U Platforms -> 150kg SmallSats -> Multi-Satellite Constellations.",
      },
      {
        title: "Standardization Over Bespoke Design",
        quote: "Instead of building every satellite as a completely unique machine, create a common technological foundation.",
        detail:
          "Modular platforms with standardized electrical buses, structural envelopes, and software APIs can be assembled, tested, upgraded, and produced at high cadence.",
      },
      {
        title: "Machines & People Symbiosis",
        quote: "LUNE builds the machines. PAUSN builds the people.",
        detail:
          "Building spacecraft requires more than a factory. Africa must not perpetually import aerospace talent, but cultivate native engineers through hands-on mission apprenticeships.",
      },
    ],
    symbiosisThesis:
      "The long-term roadmap is not merely single-mission satellites. It is: education -> research -> engineering -> manufacturing -> sovereign spacecraft -> constellation operations -> an enduring African space industry.",
  },
  team: {
    leaders: [
      {
        name: "LUNE Systems Engineering Core",
        role: "Aerospace Architecture & Flight Systems",
        bio: "Specializing in modular satellite bus mechanics, ECSS qualification, and orbital dynamics modeling.",
        category: "FLIGHT SYSTEMS",
      },
      {
        name: "Avionics & Embedded Silicon Group",
        role: "Radiation Hardening & Flight Computers",
        bio: "Designing radiation-tolerant ARM Cortex-M7 architectures, hardware roots of trust, and deterministic RTOS.",
        category: "AVIONICS",
      },
      {
        name: "Manufacturing & Environmental Qualification",
        role: "Cleanroom Integration & Environmental Screening",
        bio: "Directing ISO Class 7 spacecraft integration, TVAC thermal cycling, and 20 kN electrodynamic vibration screening.",
        category: "MANUFACTURING",
      },
    ],
    academicNodes: [
      { country: "Nigeria", institution: "Abuja Aerospace Campus / PAUSN Core", specialty: "Satellite Assembly & TVAC Qualification" },
      { country: "Kenya", institution: "Nairobi Ground Terminal Hub", specialty: "Equatorial Orbit TT&C & Optical Comms" },
      { country: "South Africa", institution: "Cape Town Space Mechanics Node", specialty: "ADCS Dynamics & Star Tracker Calibration" },
      { country: "Ghana", institution: "West African Radio Astronomy Consortium", specialty: "RF Link Budgets & Spectrum Sensing" },
      { country: "Egypt", institution: "Cairo Space Science Institute", specialty: "Atmospheric Science & Ionospheric Probes" },
    ],
  },
};

/* -------------------------------------------------------------------------- */
/* JOURNAL DATA (Updates, Experiments, Field Notes)                           */
/* -------------------------------------------------------------------------- */
export interface JournalEntryItem {
  id: string;
  category: "updates" | "experiments" | "field-notes";
  code: string;
  date: string;
  title: string;
  location: string;
  excerpt: string;
  body: string;
  tags: string[];
}

export const journalEntriesData: JournalEntryItem[] = [
  {
    id: "update-adcs-qualification",
    category: "updates",
    code: "JRN-UPD-01",
    date: "September 10, 2026",
    title: "LUNE-1 Autonomous ADCS & Star Tracker Qualified in HIL Test Cell",
    location: "Abuja Avionics Lab",
    excerpt:
      "Hardware-in-the-loop simulation verifies arcsecond pointing accuracy, reaction wheel desaturation, and autonomous sun acquisition routines.",
    body:
      "LUNE Aerospace successfully achieved a landmark milestone in its autonomous flight systems campaign: qualification of the integrated 3-axis ADCS and miniature star tracker inside the Abuja Hardware-in-the-Loop (HIL) air-bearing test cell. The autonomous control loops demonstrated sub-0.02° pointing precision during dynamic slew maneuvers with zero wheel saturation, verifying sovereign flight heritage for upcoming Earth observation missions.",
    tags: ["ADCS", "Autonomous Systems", "HIL Test"],
  },
  {
    id: "update-capital-expansion",
    category: "updates",
    code: "JRN-UPD-02",
    date: "August 20, 2026",
    title: "LUNE Closes Strategic Financing to Expand Cleanroom Integration Capacity",
    location: "Abuja Campus",
    excerpt:
      "Capital deployment funds additional ISO Class 7 cleanroom footprint, secondary TVAC thermal vacuum chamber, and multi-axis CNC milling machinery.",
    body:
      "To satisfy accelerating commercial constellation demand and sovereign Earth observation manifests, LUNE Aerospace has concluded strategic growth capital deployment. The capital directly accelerates the commissioning of Cleanroom Bay 2 in Abuja, doubling simultaneous satellite integration throughput to 12 modular spacecraft buses per quarter.",
    tags: ["Company", "Infrastructure", "Abuja Campus"],
  },
  {
    id: "exp-tvac-thermal",
    category: "experiments",
    code: "JRN-EXP-01",
    date: "September 02, 2026",
    title: "Deep Vacuum Thermal Cycling: -75°C to +135°C On Integrated 3U Chassis",
    location: "TVAC Test Cell 1",
    excerpt:
      "8-cycle thermal balance test verifies conformal heat pipe conductance and battery pack internal thermal regulation during simulated orbital eclipse.",
    body:
      "The engineering qualification model of LUNE-1 underwent rigorous 8-cycle thermal vacuum balance testing. Liquid nitrogen cold-wall shrouds simulated deep space radiation heat sinks (-75°C), while quartz infrared lamps simulated maximum solar radiation (+135°C). The internal LiFePO4 battery pack temperature was successfully maintained between +8.2°C and +22.4°C throughout all simulated eclipse cycles without supplemental electrical heater strain.",
    tags: ["TVAC", "Thermal Modeling", "LUNE-1"],
  },
  {
    id: "exp-vibration-gevs",
    category: "experiments",
    code: "JRN-EXP-02",
    date: "August 12, 2026",
    title: "NASA GEVS 14.1 Grms Multi-Axis Random Vibration Screening",
    location: "Dynamics Cell 2",
    excerpt:
      "Electrodynamic shaker validates structural integrity of deployable solar array latches and titanium structural fasteners under full launch loads.",
    body:
      "The 20 kN electrodynamic shaker subjected the structural test article to NASA GEVS random vibration profiles (14.1 Grms across X, Y, and Z axes). Post-test visual and coordinate measuring machine inspection confirmed zero bolt torque relaxation, zero solder fatigue on the SMT avionics board, and nominal release action of the solar array beryllium-copper deployment springs.",
    tags: ["Vibration", "Structural", "NASA GEVS"],
  },
  {
    id: "field-abuja-dish",
    category: "field-notes",
    code: "JRN-FLD-01",
    date: "August 29, 2026",
    title: "Installation & RF Calibration of the Abuja 4.5m S/X-Band Tracking Dish",
    location: "Abuja Ground Station Node",
    excerpt:
      "Field engineers erect dual-reflector motorized pedestal and achieve first autotrack pass with passing international weather satellites.",
    body:
      "Field operations at the primary Abuja Ground Station Gateway concluded the mechanical erection and dual-axis servo calibration of the 4.5-meter Cassegrain reflector dish. The RF frontend demonstrated a G/T figure of merit of 24.2 dB/K at X-Band. The tracking system achieved autonomous closed-loop lock on NOAA-20 polar passes with sub-0.08° pointing error.",
    tags: ["Ground Stations", "RF", "Abuja HQ"],
  },
  {
    id: "field-nairobi-survey",
    category: "field-notes",
    code: "JRN-FLD-02",
    date: "July 22, 2026",
    title: "Site Survey & Frequency Coordination at the Nairobi Earth Station Node",
    location: "Nairobi, Kenya",
    excerpt:
      "Joint technical mission with regional telecom regulators clears S-Band uplink spectrum and completes foundation boring for antenna tower.",
    body:
      "LUNE systems engineers and PAUSN East African fellows completed the electromagnetic survey and site soil boring for the second ground station gateway in Nairobi. Spectrum monitoring confirmed zero co-channel interference in the 2025–2110 MHz uplink band, clearing the gateway for immediate civil and academic spacecraft telecommand authorizations.",
    tags: ["Nairobi", "PAUSN", "Spectrum"],
  },
];

export const spacecraftHotspots: SpacecraftHotspot[] = [
  {
    id: "solar",
    x: 24,
    y: 34,
    title: "Deployable Solar Arrays",
    category: "POWER SUBSYSTEM",
    specs: "GaAs Triple-Junction | 29.5% Efficiency | 65W BOL",
    details:
      "Multi-panel articulated solar wings folded during fairing ascent. Features passive knife-edge hinges and beryllium-copper deployment springs with thermal barrier coating.",
  },
  {
    id: "obc",
    x: 50,
    y: 48,
    title: "Radiation-Tolerant OBC",
    category: "AVIONICS CORE",
    specs: "Dual Cortex-M7 | Triple Modular Redundancy | Flash ECC",
    details:
      "Central command computer executing orbit determination, real-time telemetry encryption, and attitude sensor fusion with sub-millisecond deterministic latency.",
  },
  {
    id: "adcs",
    x: 72,
    y: 38,
    title: "3-Axis ADCS Reaction Wheels",
    category: "ATTITUDE CONTROL",
    specs: "0.04 Nms Momentum Storage | Star Tracker Aided",
    details:
      "Precision brushless flywheels providing three-axis angular momentum damping, paired with miniature star tracker cameras to maintain < 0.05° optical pointing accuracy.",
  },
  {
    id: "comm",
    x: 64,
    y: 66,
    title: "X-Band Phased-Array Transceiver",
    category: "COMMUNICATIONS",
    specs: "8.2 GHz Downlink | 50 Mbps Throughput | Circular Polarization",
    details:
      "Direct-to-ground high-bandwidth communications antenna for tactical image telemetry downlink directly to regional African receiver ground stations.",
  },
];

export const researchItems: ResearchItem[] = [
  {
    id: "cubesat-spacecraft",
    number: "01",
    title: "CubeSat to Spacecraft",
    description:
      "CubeSats are the entry point for spacecraft engineering, flight software, RF, power, control and operations.",
    meta: "SPACE SYSTEMS",
    leadDomain: "Orbital Mechanics & Flight Avionics",
    trl: 6,
    abstract:
      "Establishing systematic sovereign mastery over all primary spacecraft disciplines. By constraining early missions to CubeSat standards, LUNE validates power budgets, attitude stabilization, radiation-tolerant computing, and ground station link budgets with high flight cadence.",
    keyMilestones: [
      "Subsystem hardware-in-the-loop (HIL) bench qualification",
      "S-Band RF ground station telemetry link closure",
      "Autonomous 3-axis detumble and sun-pointing algorithm verification",
    ],
    collaborators: "PAUSN University Nodes, African Space Agencies",
  },
  {
    id: "satellite-mfg",
    number: "02",
    title: "Satellite Manufacturing",
    description:
      "Build from assembly and integration toward an increasingly complete spacecraft production chain.",
    meta: "MANUFACTURING",
    leadDomain: "Cleanroom Integration & Quality Engineering",
    trl: 5,
    abstract:
      "Transitioning from external component procurement toward fully vertically integrated indigenous bus fabrication. Encompasses automated wire-harness manufacture, thermal insulation blanketing, cleanroom bakeout, and structural vibration testing.",
    keyMilestones: [
      "ISO Class 7 cleanroom commissioning and protocol certification",
      "Thermal vacuum bakeout chamber characterization at 10⁻⁶ Torr",
      "Automated optical inspection (AOI) pipeline for surface-mount PCBs",
    ],
    collaborators: "Domestic Precision Engineering Partners",
  },
  {
    id: "ai-embedded",
    number: "03",
    title: "AI + Embedded Systems",
    description:
      "AI, software, secure hardware and embedded computing are horizontal capabilities across LUNE.",
    meta: "ENABLING LAYER",
    leadDomain: "Neuromorphic Edge Inference & Cryptography",
    trl: 6,
    abstract:
      "Deploying ultra-low-power neural processing units onto satellite avionics to perform orbital data triage. Raw Earth observation imagery is classified in real time; cloud-occluded frames are discarded prior to downlink, multiplying effective transponder bandwidth.",
    keyMilestones: [
      "Onboard semantic segmentation model running under 4W envelope",
      "Post-quantum authenticated telemetry protocol implementation",
      "Fault-injection radiation simulation with autonomous memory scrub",
    ],
    collaborators: "PAUSN AI Labs, Deep-Tech Software Institutes",
  },
  {
    id: "constellation-dynamics",
    number: "04",
    title: "Autonomous Constellation Dynamics",
    description:
      "Decentralized inter-satellite link protocols and autonomous station-keeping to govern multi-spacecraft swarms without continuous ground contact.",
    meta: "AUTONOMOUS FLIGHT",
    leadDomain: "Relative Navigation & Swarm Consensus",
    trl: 5,
    abstract:
      "Developing multi-agent orbital dynamics algorithms that enable distributed satellite constellations to execute autonomous formation maintenance, optical inter-satellite routing, and collision avoidance maneuvers using magnetic torque rods and differential aerodynamic drag.",
    keyMilestones: [
      "Hardware-in-the-loop multi-spacecraft crosslink simulator validation",
      "Distributed mesh routing protocol across variable orbital geometries",
      "Autonomous collision conjunction screening running on flight avionics",
    ],
    collaborators: "African Astronomy Consortium & Orbital Mechanics Labs",
  },
  {
    id: "optical-payloads",
    number: "05",
    title: "High-Resolution Optical Payloads",
    description:
      "Sovereign spaceborne remote sensing payloads engineered for sub-meter multispectral agriculture, mineral, and climate monitoring.",
    meta: "EARTH OBSERVATION",
    leadDomain: "Optomechanics & Spectral Sensor Integration",
    trl: 4,
    abstract:
      "Designing compact, thermally compensated folded-optics telescopes and TDI image sensors tailored for 12U to 150kg satellite platforms. Optimized for sovereign African agriculture intelligence, moisture tracking, and infrastructure monitoring.",
    keyMilestones: [
      "Athermalized carbon-composite optical bench structural vibration test",
      "Multispectral line-scan sensor radiometric calibration in vacuum cell",
      "Sub-meter ground sampling distance (GSD) optical path verification",
    ],
    collaborators: "Regional Remote Sensing Centers & Geological Survey Institutes",
  },
];

export const journalItems: JournalItem[] = [
  {
    id: "stage-01",
    stageNumber: "01",
    category: "STAGE 01",
    title: "Education: Pan-African University Space Network & Talent Engine",
    date: "EDUCATION",
    status: "Operational",
    timeline: "FOUNDATION",
    deliverables: [
      "Connect African universities, researchers, and institutions through PAUSN",
      "LUNE/PAUSN Space Academy for spacecraft systems, avionics & RF engineering",
      "Build domestic aerospace talent so Africa never has to import a workforce",
    ],
  },
  {
    id: "stage-02",
    stageNumber: "02",
    category: "STAGE 02",
    title: "Research: From Textbooks to University Labs & Real Prototypes",
    date: "RESEARCH",
    status: "Operational",
    timeline: "TALENT → RESEARCH",
    deliverables: [
      "University laboratories where experimentation turns ideas into flight prototypes",
      "Multi-node simulation testbeds for autonomous flight and RF communications",
      "Student & researcher subsystem development for real operational missions",
    ],
  },
  {
    id: "stage-03",
    stageNumber: "03",
    category: "STAGE 03",
    title: "Engineering: Standardized Architecture for Modular Spacecraft",
    date: "ENGINEERING",
    status: "Active R&D",
    timeline: "COMMON FOUNDATION",
    deliverables: [
      "Create a common technological foundation moving beyond conventional CubeSats",
      "Standardized systems that can be assembled, tested, upgraded, and reused",
      "Modular bus architectures configured for high-reliability mission scale",
    ],
  },
  {
    id: "stage-04",
    stageNumber: "04",
    category: "STAGE 04",
    title: "Manufacturing: Cleanrooms, Additive Metallurgy & Qualification",
    date: "MANUFACTURING",
    status: "Active R&D",
    timeline: "ABUJA CAMPUS",
    deliverables: [
      "ISO Class 7 cleanroom integration campus and TVAC thermal cycling in Abuja",
      "Direct metal laser sintering 3D printing of high-temperature aerospace superalloys",
      "20 kN electrodynamic vibration testing and domestic qualification standard",
    ],
  },
  {
    id: "stage-05",
    stageNumber: "05",
    category: "STAGE 05",
    title: "Spacecraft: Modular Platform Production at Industrial Scale",
    date: "SPACECRAFT",
    status: "Active R&D",
    timeline: "PRODUCTION AT SCALE",
    deliverables: [
      "Produce modular spacecraft efficiently at scale rather than unique machines",
      "Deploy commercial, civil Earth observation, and academic constellations",
      "Autonomous mission operations and Pan-African ground tracking stations",
    ],
  },
  {
    id: "stage-06",
    stageNumber: "06",
    category: "STAGE 06",
    title: "Constellations: Multi-Satellite Networks & Swarm Dynamics",
    date: "CONSTELLATIONS",
    status: "Planned",
    timeline: "SWARM ARCHITECTURE",
    deliverables: [
      "Coordinated multi-spacecraft Earth observation swarms with inter-satellite crosslinks",
      "Autonomous distributed orbital station-keeping using differential drag and magnetic desaturation",
      "Low-latency regional data routing and tactical tasking across Pan-African nodes",
    ],
  },
  {
    id: "stage-07",
    stageNumber: "07",
    category: "STAGE 07",
    title: "Sovereign Operations: Pan-African Ground Station Mesh & Tracking",
    date: "OPERATIONS",
    status: "Planned",
    timeline: "CONTINENTAL COVERAGE",
    deliverables: [
      "Unified multi-node tracking antenna array spanning West, East, Southern, and North Africa",
      "Automated satellite pass scheduling, TT&C command uplink, and real-time telemetry processing",
      "Direct-to-cell tactical messaging and sovereign Earth observation data delivery",
    ],
  },
  {
    id: "stage-08",
    stageNumber: "08",
    category: "STAGE 08",
    title: "Self-Sustaining Industry: African Space-Industrial Civilization",
    date: "ENDURING ECOSYSTEM",
    status: "Planned",
    timeline: "CONTINUOUS CYCLE",
    deliverables: [
      "Complete sovereign capability to design, manufacture, test, operate, and sustain spacecraft constellations",
      "Self-reinforcing loop: Education → Talent → Research → Technology → Machines → Industry",
      "Progressively reaching toward advanced systems on Earth, in orbit, and beyond",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Proof & Authoritative Metrics Strip                                        */
/* -------------------------------------------------------------------------- */
export interface MetricItem {
  id: string;
  number: string;
  value: string;
  unit: string;
  label: string;
  detail: string;
}

export const metricsData: MetricItem[] = [
  {
    id: "bus-envelope",
    number: "01",
    value: "3U – 150",
    unit: "KG",
    label: "PLATFORM ARCHITECTURE",
    detail: "Modular CubeSat & SmallSat buses configured for high-cadence LEO operations",
  },
  {
    id: "downlink",
    number: "02",
    value: "50",
    unit: "MBPS",
    label: "DOWNLINK BANDWIDTH",
    detail: "High-throughput X-Band telemetry paired with S-Band TT&C direct-to-ground link",
  },
  {
    id: "cleanroom",
    number: "03",
    value: "ISO 7",
    unit: "CLASS",
    label: "CLEANROOM INTEGRATION",
    detail: "Controlled environment assembly & 10⁻⁶ Torr TVAC thermal cycling facility",
  },
  {
    id: "pausn-nodes",
    number: "04",
    value: "08",
    unit: "NODES",
    label: "PAN-AFRICAN ACADEMIC REACH",
    detail: "University research consortium nodes actively feeding engineering talent & payloads",
  },
];

/* -------------------------------------------------------------------------- */
/* Customer Personas & Operational Sectors                                    */
/* -------------------------------------------------------------------------- */
export interface SectorItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  engagementPath: string;
}

export const operationalSectors: SectorItem[] = [
  {
    id: "commercial",
    number: "01",
    title: "COMMERCIAL CONSTELLATIONS",
    subtitle: "Turnkey LEO Satellite Platforms & Operations",
    description:
      "Rapidly deployable small satellites engineered for telecom operators, IoT network providers, and regional logistics tracking across Africa and emerging markets.",
    deliverables: [
      "Standardized 6U/12U CubeSat and 150kg SmallSat buses",
      "Managed Launch & Rideshare Brokerage Integration",
      "Full Ground Station Telemetry & Mission Operations (MaaS)",
    ],
    engagementPath: "Request Platform Specifications",
  },
  {
    id: "civil",
    number: "02",
    title: "CIVIL & EARTH OBSERVATION",
    subtitle: "Resource, Climate & Maritime Monitoring",
    description:
      "High-cadence multispectral and hyperspectral optical sensing platforms providing critical real-time data for agricultural yield forecasting, flood mapping, and coastal security.",
    deliverables: [
      "Sub-meter Ground Sampling Distance (GSD) optical payloads",
      "Onboard AI Cloud-Filtering & Edge Image Segmentation",
      "Sovereign data sovereignty with domestic encryption keys",
    ],
    engagementPath: "Inquire on Sensing Capacities",
  },
  {
    id: "defense",
    number: "03",
    title: "SOVEREIGN DEFENSE & SECURITY",
    subtitle: "Hardened Avionics & Cryptographic Systems",
    description:
      "Ruggedized, radiation-tolerant aerospace silicon engineered for national security communications, spectrum surveillance, and tamper-proof command uplinks.",
    deliverables: [
      "Post-quantum cryptographic root-of-trust hardware modules",
      "Wideband software-defined radio (SDR) surveillance payloads",
      "Deterministic, single-event-upset immune ARM flight avionics",
    ],
    engagementPath: "Request Secure Briefing",
  },
  {
    id: "academic",
    number: "04",
    title: "ACADEMIC & PAUSN SCIENCE",
    subtitle: "Pan-African University Space Consortium",
    description:
      "Direct pathway for universities and research institutions to fly scientific instruments, train the next generation of African aerospace engineers, and publish peer-reviewed space physics research.",
    deliverables: [
      "Standardized 1U/2U student scientific payload bays",
      "Hardware-in-the-loop (HIL) simulation testbeds in universities",
      "Open-access atmospheric & ionospheric telemetry datasets",
    ],
    engagementPath: "Join PAUSN Consortium",
  },
];

/* -------------------------------------------------------------------------- */
/* Commercial Offerings & Solutions (The LUNE Foundry)                        */
/* -------------------------------------------------------------------------- */
export interface OfferingItem {
  id: string;
  code: string;
  title: string;
  tagline: string;
  description: string;
  capabilities: string[];
}

export const foundryOfferings: OfferingItem[] = [
  {
    id: "bus-platforms",
    code: "F-01",
    title: "MODULAR SPACECRAFT PLATFORMS",
    tagline: "High-Reliability SmallSat Buses for LEO",
    description:
      "Flight-ready CubeSat (3U/6U/12U) and 150kg SmallSat platforms configured with radiation-tolerant flight computers, 3-axis reaction wheels, GaAs solar wings, and high-efficiency power distribution.",
    capabilities: [
      "Pre-integrated and bench-qualified bus subsystems",
      "Flexible payload bay volume and mass allocation",
      "Integrated 3-axis reaction wheel & magnetic torque desaturation",
    ],
  },
  {
    id: "hosted-payloads",
    code: "F-02",
    title: "HOSTED PAYLOAD INTEGRATION",
    tagline: "Rapid Flight Heritage for Sensors & Electronics",
    description:
      "A fast, cost-effective way to validate customer optical sensors, RF transceivers, or scientific instruments on orbit without building an entire satellite from scratch.",
    capabilities: [
      "Standardized electrical (SpaceWire, CAN, UART) & mechanical mounts",
      "Thermal vacuum bakeout and mechanical vibration screening",
      "Scheduled rideshare integration and deployment verification",
    ],
  },
  {
    id: "environmental-testing",
    code: "F-03",
    title: "ENVIRONMENTAL TEST & CLEANROOM",
    tagline: "Sovereign Qualification Infrastructure in Abuja",
    description:
      "Full aerospace qualification services under one roof: ISO Class 7 cleanroom assembly bays, high-vacuum thermal cycling, and electrodynamic vibration tables.",
    capabilities: [
      "Thermal Vacuum (TVAC): -75°C to +135°C @ 10⁻⁶ Torr",
      "20 kN sine and random vibration shaker table testing",
      "Cleanroom outgassing bakeout and optical metrology inspection",
    ],
  },
  {
    id: "orbital-data",
    code: "F-04",
    title: "MANAGED GROUND & ORBITAL DATA",
    tagline: "End-to-End Mission Telemetry & Operations",
    description:
      "Turnkey space operations: autonomous ground station tracking, secure command uplinks, telemetry downlink archiving, and cloud-delivered mission analytics.",
    capabilities: [
      "Automated S-Band TT&C and X-Band high-speed payload ground terminals",
      "Real-time orbital dynamics and conjunction assessment",
      "Web telemetry console with secure customer API keys",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Orbital Missions Manifest & Flight Heritage                                */
/* -------------------------------------------------------------------------- */
export interface MissionManifestItem {
  id: string;
  designation: string;
  name: string;
  status: "In Integration" | "Scheduled" | "Active R&D" | "Completed";
  statusType: "active" | "scheduled" | "dev" | "complete";
  targetOrbit: string;
  formFactor: string;
  payloadType: string;
  launchWindow: string;
  summary: string;
  keySpecs: { label: string; value: string }[];
}

export const missionsManifest: MissionManifestItem[] = [
  {
    id: "lune-1",
    designation: "LN-01",
    name: "LUNE-1 TECH DEMONSTRATOR",
    status: "In Integration",
    statusType: "active",
    targetOrbit: "500 km Sun-Synchronous (SSO)",
    formFactor: "3U CubeSat (4.2 kg)",
    payloadType: "Multispectral Micro-Camera + Dual NPU Edge Inference",
    launchWindow: "Q4 2026",
    summary:
      "Pathfinder flight validating LUNE's indigenous flight computer, ADCS reaction wheel pointing, and real-time cloud-screening neural inference over West Africa.",
    keySpecs: [
      { label: "Orbit", value: "500 km SSO / 97.4° Inclination" },
      { label: "Pointing Precision", value: "< 0.05° 3-Axis Stabilized" },
      { label: "Downlink", value: "X-Band 50 Mbps / S-Band TT&C" },
      { label: "Integration Base", value: "Abuja Cleanroom Bay 1" },
    ],
  },
  {
    id: "pausn-pathfinder",
    designation: "LN-02",
    name: "PAUSN-1 ACADEMIC PATHFINDER",
    status: "Scheduled",
    statusType: "scheduled",
    targetOrbit: "525 km SSO",
    formFactor: "6U CubeSat (11.5 kg)",
    payloadType: "Ionospheric Plasma Probe + University LoRa Mesh Node",
    launchWindow: "Q2 2027",
    summary:
      "Collaborative Pan-African University Space Network mission hosting scientific instruments developed across partner African aerospace faculties.",
    keySpecs: [
      { label: "Orbit", value: "525 km SSO" },
      { label: "Consortium Nodes", value: "Nigeria, Ghana, Kenya, South Africa" },
      { label: "Downlink", value: "UHF / S-Band Multi-Ground Station" },
      { label: "Instrument Mass", value: "2.4 kg Dedicated Payload" },
    ],
  },
  {
    id: "sovereign-eo1",
    designation: "LN-03",
    name: "SOVEREIGN EO-1 REGIONAL SENSING",
    status: "Active R&D",
    statusType: "dev",
    targetOrbit: "550 km Dawn-Dusk SSO",
    formFactor: "150 kg SmallSat Class",
    payloadType: "Sub-meter Electro-Optical Camera & SAR Sensor",
    launchWindow: "2028",
    summary:
      "First full-scale sovereign African Earth observation spacecraft delivering high-revisit imagery for food security, infrastructure planning, and natural resource stewardship.",
    keySpecs: [
      { label: "Resolution", value: "0.75m GSD Visible / Multi-Spectral" },
      { label: "Power Generation", value: "250W Deployable Articulated Arrays" },
      { label: "Downlink", value: "150 Mbps X-Band High-Rate Link" },
      { label: "Design Life", value: "5 Years Mission Operations" },
    ],
  },
  {
    id: "tactical-crypto",
    designation: "LN-04",
    name: "AERO-SECURE SECCOM DISPATCH",
    status: "Active R&D",
    statusType: "dev",
    targetOrbit: "600 km Circular Polar",
    formFactor: "12U CubeSat (22 kg)",
    payloadType: "Post-Quantum Cryptographic Routing & Tactical Comms",
    launchWindow: "2028 – 2029",
    summary:
      "Hardened orbital secure relay demonstrating inter-station cryptographic authentication, resilient against jamming and spoofing for sovereign defense links.",
    keySpecs: [
      { label: "Security Level", value: "Post-Quantum HSM Lattice Cryptography" },
      { label: "RF Agility", value: "Wideband SDR 70 MHz – 6 GHz" },
      { label: "Autonomy", value: "FDIR Radiation Mitigation System" },
      { label: "Target Orbit", value: "600 km Polar" },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Physical Infrastructure & Testing Facilities                               */
/* -------------------------------------------------------------------------- */
export interface FacilityItem {
  id: string;
  code: string;
  name: string;
  classification: string;
  specs: string[];
  description: string;
}

export const facilitySpecs: FacilityItem[] = [
  {
    id: "cleanroom",
    code: "FAC-01",
    name: "ISO Class 7 Spacecraft Integration Bay",
    classification: "PARTICULATE CONTROLLED ENV // FED-STD-209E CLASS 10,000",
    description:
      "Dedicated cleanroom integration facility in Abuja featuring laminar airflow benches, positive-pressure airlocks, ESD flooring, and calibrated optical assembly stations.",
    specs: [
      "Particle Count: < 352,000 particles/m³ @ ≥ 0.5 µm",
      "Temperature: 20°C ± 1.5°C | Relative Humidity: 45% ± 5%",
      "Continuous HEPA filtration with automated airborne particle counters",
      "Dual airlock gowning chamber with ionized air shower",
    ],
  },
  {
    id: "tvac",
    code: "FAC-02",
    name: "Thermal Vacuum (TVAC) Chamber",
    classification: "ORBITAL ENVIRONMENT SIMULATION // HIGH-VACUUM TEST RIG",
    description:
      "Precision thermal cycling chamber simulating deep space extreme vacuum and solar radiative thermal loads on fully integrated satellite systems.",
    specs: [
      "Base Vacuum Level: 1.0 × 10⁻⁶ Torr via cryogenic turbomolecular pump",
      "Thermal Temperature Range: -75°C to +135°C",
      "Thermal Shroud: High-emissivity copper cold-wall with LN2 cooling",
      "Feedthrough Ports: Multi-channel thermocouple, RF, and SpaceWire data",
    ],
  },
  {
    id: "vibration",
    code: "FAC-03",
    name: "Electrodynamic Shaker Table System",
    classification: "LAUNCH LOADS & ACOUSTIC QUALIFICATION // 20 kN RIG",
    description:
      "Multi-axis electrodynamic shaker reproducing the intense acoustic and mechanical vibration profiles experienced during launch vehicle ascent, transonic buffeting, and stage separation.",
    specs: [
      "Peak Sine Force: 20 kN | Random RMS Force: 18 kN",
      "Frequency Spectrum: 5 Hz to 2,500 Hz",
      "Maximum Acceleration: 100g Peak",
      "Slip Table: 600 mm × 600 mm hydrostatic guided table for horizontal axis",
    ],
  },
  {
    id: "additive",
    code: "FAC-04",
    name: "Additive Metallurgy & Metrology Lab",
    classification: "DIRECT METAL LASER SINTERING // AEROSPACE SUPERALLOYS",
    description:
      "High-precision laser powder bed fusion 3D printing engineered for lightweight satellite structural brackets, antenna feeds, star tracker baffles, and deployable hinge mechanisms.",
    specs: [
      "Certified Materials: Inconel 718, Ti-6Al-4V Grade 5, AlSi10Mg",
      "Dual 500W Ytterbium Fiber Lasers with 30 µm layer resolution",
      "In-chamber oxygen monitoring (< 100 ppm) with Argon atmosphere purge",
      "Coordinate Measuring Machine (CMM) ± 1.5 µm dimensional metrology",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Platform Specifications Matrix                                             */
/* -------------------------------------------------------------------------- */
export interface PlatformSpecRow {
  parameter: string;
  cubesat3U: string;
  cubesat6U12U: string;
  smallsat150kg: string;
}

export const platformSpecTable: PlatformSpecRow[] = [
  {
    parameter: "Total Mass Envelope",
    cubesat3U: "Up to 4.5 kg",
    cubesat6U12U: "10 kg to 24 kg",
    smallsat150kg: "80 kg to 150 kg",
  },
  {
    parameter: "Payload Mass Capacity",
    cubesat3U: "Up to 1.8 kg",
    cubesat6U12U: "5 kg to 12 kg",
    smallsat150kg: "40 kg to 75 kg",
  },
  {
    parameter: "Payload Volume",
    cubesat3U: "1.5U available",
    cubesat6U12U: "3U to 6U available",
    smallsat150kg: "Custom payload fairing envelope",
  },
  {
    parameter: "Orbit Capability",
    cubesat3U: "450 – 550 km LEO / SSO",
    cubesat6U12U: "450 – 650 km LEO / SSO",
    smallsat150kg: "500 – 900 km LEO / MEO capable",
  },
  {
    parameter: "Power Generation (BOL)",
    cubesat3U: "25W – 45W Deployable",
    cubesat6U12U: "65W – 120W Articulated",
    smallsat150kg: "250W – 450W Multi-Wing",
  },
  {
    parameter: "Pointing Accuracy (ADCS)",
    cubesat3U: "< 0.5° 3-Axis Stabilized",
    cubesat6U12U: "< 0.05° with Star Tracker",
    smallsat150kg: "< 0.01° High-Stability Line of Sight",
  },
  {
    parameter: "Telemetry & Comms",
    cubesat3U: "UHF / S-Band (2 Mbps)",
    cubesat6U12U: "S-Band TT&C + X-Band (50 Mbps)",
    smallsat150kg: "X-Band (150 Mbps) + Optical Downlink Ready",
  },
  {
    parameter: "Design Operational Life",
    cubesat3U: "1 to 2 Years",
    cubesat6U12U: "3 to 5 Years",
    smallsat150kg: "5 to 7 Years",
  },
  {
    parameter: "Lead Time to Delivery",
    cubesat3U: "6 Months",
    cubesat6U12U: "9 Months",
    smallsat150kg: "14 – 18 Months",
  },
];

/* -------------------------------------------------------------------------- */
/* Social Proof / Trusted Partners & Agencies                                 */
/* -------------------------------------------------------------------------- */
export interface PartnerItem {
  id: string;
  name: string;
  acronym: string;
  category: string;
}

export const trustedPartners: PartnerItem[] = [
  { id: "nasrda", name: "National Space Research and Development Agency", acronym: "NASRDA", category: "Civil Space" },
  { id: "afsa", name: "African Space Agency", acronym: "AfSA", category: "Pan-African Agency" },
  { id: "dsa", name: "Defence Space Administration", acronym: "DSA", category: "National Security" },
  { id: "pausn", name: "Pan-African University Space Network", acronym: "PAUSN", category: "Academic Consortium" },
  { id: "nigcomsat", name: "Nigerian Communications Satellite Ltd", acronym: "NIGCOMSAT", category: "Commercial Telecom" },
  { id: "eofa", name: "Earth Observation Alliance", acronym: "EOA", category: "Civil Remote Sensing" },
  { id: "comm-leo", name: "Commercial Constellation Operators", acronym: "LEO-SAT", category: "Commercial Operator" },
  { id: "hydro-sat", name: "Hydrological Sensing Network", acronym: "HYDRO-SAT", category: "Resource Management" },
  { id: "tactical-net", name: "Tactical Defense Communications", acronym: "DEF-NET", category: "National Security" },
];

/* -------------------------------------------------------------------------- */
/* Six Foundry Pillars                                                        */
/* -------------------------------------------------------------------------- */
export interface FoundryPillar {
  id?: string;
  number: string;
  title: string;
  description: string;
}

export const foundryPillars: FoundryPillar[] = [
  {
    id: "pillar-01",
    number: "01",
    title: "Mission Design & Simulation",
    description: "AI-powered orbital trajectory simulation, constellation geometry, and coverage optimization.",
  },
  {
    id: "pillar-02",
    number: "02",
    title: "Modular Spacecraft Platforms",
    description: "Moving beyond conventional CubeSats to modular spacecraft built from a common, standardized, upgradable foundation.",
  },
  {
    id: "pillar-03",
    number: "03",
    title: "Payloads & Edge Compute",
    description: "Unique mission enablers including Radio Frequency, multispectral Earth observation, and onboard compute.",
  },
  {
    id: "pillar-04",
    number: "04",
    title: "Industrial Manufacturing",
    description: "Standardized assembly, ISO cleanroom qualification, and batch production replacing one-off artisanal spacecraft builds.",
  },
  {
    id: "pillar-05",
    number: "05",
    title: "Managed Orbital Services",
    description: "High-bandwidth low-latency global telemetry downlink, Over-the-Air flight dynamics updates, and ground stations.",
  },
  {
    id: "pillar-06",
    number: "06",
    title: "LuneOS Integration Layer",
    description: "LuneOS — software integration layer that makes hardware, payloads, and ground networks work seamlessly together.",
  },
];

/* -------------------------------------------------------------------------- */
/* What the Foundry is Built On (6 Products)                                 */
/* -------------------------------------------------------------------------- */
export interface FoundryProduct {
  id: string;
  title: string;
  subtitle: string;
  description?: string;
  image: string;
  link: string;
}

export const foundryProducts: FoundryProduct[] = [
  {
    id: "mission-design",
    title: "Mission Design & Simulation",
    subtitle: "Constellation geometry, orbital mechanics & payload coverage modeling.",
    image: launchPad,
    link: "/systems#platforms",
  },
  {
    id: "spacecraft-platforms",
    title: "Spacecraft Platforms",
    subtitle: "Modular CubeSat and 150kg SmallSat flight-qualified architectures.",
    image: largeSpacecraft,
    link: "/systems",
  },
  {
    id: "payloads-data",
    title: "Payloads and Data Products",
    subtitle: "Electro-optical, RF spectrum sensing, and telemetry pipelines.",
    image: darkSatellite,
    link: "/systems#hosted",
  },
  {
    id: "orbital-ai",
    title: "Orbital AI",
    subtitle: "Onboard neural inference, autonomous cloud filtering & edge processing.",
    image: launchVehicle,
    link: "/systems#avionics",
  },
  {
    id: "constellation-production",
    title: "Constellation Production",
    subtitle: "Turnkey cleanroom assembly, TVAC vacuum thermal cycling & vibration testing.",
    image: launchVehicle,
    link: "/infrastructure",
  },
  {
    id: "managed-services",
    title: "Managed Orbital Services",
    subtitle: "Ground network tracking, direct-to-ground downlink & flight operations.",
    image: heroSpacecraft,
    link: "/missions#tracking",
  },
];

/* -------------------------------------------------------------------------- */
/* News & Insights (Latest Missions Delivering Impact)                        */
/* -------------------------------------------------------------------------- */
export interface NewsArticle {
  id: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  link: string;
}

export const newsArticles: NewsArticle[] = [
  {
    id: "adcs-qualification",
    category: "Press Releases",
    date: "September 10, 2026",
    title: "LUNE Aerospace Achieves Milestone: Autonomous ADCS & Star Tracker Qualified in HIL Cell",
    excerpt: "LUNE advances its autonomous flight control roadmap with successful Hardware-in-the-Loop simulation in the Abuja avionics test cell.",
    image: heroSpacecraft,
    link: "/systems#autonomous",
  },
  {
    id: "series-capital",
    category: "Press Releases",
    date: "August 20, 2026",
    title: "LUNE Aerospace Closes Strategic Financing to Scale High-Mix Satellite Manufacturing Campus",
    excerpt: "Expansion funds additional ISO Class 7 cleanroom capacity, high-power TVAC chambers, and multi-axis CNC tooling in Abuja.",
    image: launchVehicle,
    link: "/infrastructure",
  },
  {
    id: "pausn-deploys",
    category: "Mission Update",
    date: "July 7, 2026",
    title: "LUNE Deploys First Three Operational Pathfinders for Pan-African University Space Network",
    excerpt: "Consortium nodes across Nigeria, Ghana, Kenya, and South Africa achieve first telemetry lock and direct downlink passes.",
    image: largeSpacecraft,
    link: "/missions",
  },
];

/* -------------------------------------------------------------------------- */
/* The Continuous Cycle (Ecosystem & Industrial Symbiosis)                    */
/* -------------------------------------------------------------------------- */
export interface CycleStep {
  step: string;
  title: string;
  sub: string;
  detail: string;
}

export const continuousCycle: CycleStep[] = [
  {
    step: "01",
    title: "Education Produces Talent",
    sub: "PAUSN & TALENT ENGINE",
    detail:
      "Through the LUNE/PAUSN Space Academy, African students and researchers engage in hands-on hardware engineering instead of textbook-only study, cultivating native aerospace capability.",
  },
  {
    step: "02",
    title: "Talent Produces Research",
    sub: "APPLIED SCIENCE",
    detail:
      "Engineers and scientists tackle foundational challenges: orbital mechanics, thermal modeling, radiation-tolerant avionics, and low-cost structural composites.",
  },
  {
    step: "03",
    title: "Research Produces Technology",
    sub: "FLIGHT ARCHITECTURES",
    detail:
      "Breakthroughs transition into modular flight computers, power distribution units, attitude determination and control systems (ADCS), and communication payloads.",
  },
  {
    step: "04",
    title: "Technology Produces Machines",
    sub: "MODULAR SPACECRAFT",
    detail:
      "Standardized subsystems are assembled, tested, and integrated into modular satellites and launch systems engineered for configuration flexibility, reusability, and rapid production.",
  },
  {
    step: "05",
    title: "Machines Create Industry",
    sub: "ECONOMIC FOUNDATION",
    detail:
      "Operational spacecraft unlock sovereign telecommunications, Earth observation, climate resilience data, and an expanding domestic aerospace supply chain.",
  },
  {
    step: "06",
    title: "Industry Creates Opportunities",
    sub: "SUSTAINED EVOLUTION",
    detail:
      "A flourishing aerospace ecosystem creates high-value careers, reinvests capital into research labs, and pulls forward the next generation of African aerospace pioneers.",
  },
];


