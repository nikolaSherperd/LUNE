import heroRocket from "../Images/4d470eaec613721b01026b3ffbd82ca4.jpg";
import launchRocket from "../Images/58b129e81e16c5ccff592de06b93656e.jpg";
import padRockets from "../Images/71e3fbd44c9688627366e223310b9c66.jpg";
import largeRocket from "../Images/98ae5c7f60e7d937a960430b82d0f83f.jpg";
import darkRocket from "../Images/ab5bdf14b63eba46547f5ff99c5fce11.jpg";
import luneWordmark from "../Images/1500x500.jpeg";
import luneEmblem from "../Images/gkZcl8oI_400x400.jpg";
import siteBackground from "../Images/site-background.png";

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
    label: "Mission Foundry",
    path: "/systems",
    children: [
      {
        label: "Mission Design & Simulation",
        path: "/systems#platforms",
        description: "Constellation geometry, orbital mechanics & sensor modeling",
        code: "01.1",
      },
      {
        label: "Spacecraft Platforms",
        path: "/systems#platforms",
        description: "3U, 6U, 12U & 150kg modular flight architectures",
        code: "01.2",
      },
      {
        label: "Payloads & Data Products",
        path: "/systems#hosted",
        description: "Optical, RF, and multispectral sensor integration",
        code: "01.3",
      },
      {
        label: "Orbital AI",
        path: "/systems#avionics",
        description: "Cortex-M7 OBC and real-time neural inference",
        code: "01.4",
      },
      {
        label: "Constellation Production",
        path: "/infrastructure",
        description: "Cleanroom assembly, TVAC and 20 kN shaker testing",
        code: "01.5",
      },
      {
        label: "Managed Orbital Services",
        path: "/missions#tracking",
        description: "Direct-to-ground TT&C and mission telemetry",
        code: "01.6",
      },
    ],
  },
  {
    label: "Missions",
    path: "/missions",
  },
  {
    label: "About",
    path: "/about",
  },
  {
    label: "Careers",
    path: "/about#careers",
    children: [
      {
        label: "Open Positions",
        path: "/about#positions",
        description: "Aerospace engineering, avionics & flight software",
        code: "04.1",
      },
    ],
  },
  {
    label: "News",
    path: "/missions#news",
  },
];

export const images = {
  hero: heroRocket,
  systems: padRockets,
  platform: largeRocket,
  manufacturing: launchRocket,
  darkRocket,
  cleanroom: launchRocket,
  facility: padRockets,
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
    title: "MODULAR SPACECRAFT PLATFORMS",
    description:
      "Moving beyond conventional CubeSats to standardized spacecraft platforms that can be configured, upgraded, and produced at scale.",
    image: images.platform,
    detail: {
      tagline: "Common Technological Foundation for Modular Spacecraft",
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
    id: "secure-hardware",
    number: "02",
    title: "SECURE HARDWARE + AI",
    description:
      "Embedded systems, secure communications, asset tracking, sensing and AI-enabled operations.",
    image: images.systems,
    detail: {
      tagline: "Sovereign Edge Computing & Cryptographic Aerospace Silicon",
      readinessLevel: "TRL 5 / INTEGRATED PROTOTYPE",
      extendedDescription:
        "Flight-grade compute modules running real-time neural inference directly in space. By filtering, classifying, and compressing sensory telemetry on-orbit before transmission, LUNE reduces ground link bandwidth bottlenecks by up to 80%.",
      keySpecs: [
        { label: "Inference Engine", value: "Edge Neural Processing Unit (NPU) @ 4.2 TOPS" },
        { label: "Security Architecture", value: "Hardware Root of Trust with Post-Quantum AES-256 GCM" },
        { label: "RF Spectrum Sensing", value: "Wideband SDR Frontend (70 MHz to 6 GHz)" },
        { label: "Power Consumption", value: "< 6.8W Full Dual-Inference Mode" },
        { label: "Memory Subsystem", value: "Triple-Modular Redundant (TMR) ECC LPDDR4" },
        { label: "Operating Thermal", value: "-40°C to +85°C Industrial Aerospace Grade" },
      ],
      subsystems: [
        "Cryptographic Hardware Security Module (HSM) for Uplink Authentication",
        "Onboard Satellite Vision Classifier for Automated Cloud Filtering",
        "Radiation-Hardened Supervisory Microcontroller Watchdog",
        "Low-Power LoRa & UHF Mesh Transceiver for Ground Sensing Interconnect",
      ],
    },
  },
  {
    id: "advanced-manufacturing",
    number: "03",
    title: "ADVANCED MANUFACTURING",
    description:
      "Precision fabrication, electronics, composites, additive manufacturing, metrology and testing.",
    image: images.manufacturing,
    detail: {
      tagline: "Aerospace Metallurgy, Cleanroom Integration & Metrology",
      readinessLevel: "TRL 7 / OPERATIONAL FOUNDATION",
      extendedDescription:
        "Building a sovereign domestic manufacturing base across Nigeria and partner African nations. Combining multi-axis CNC machining, selective laser melting (SLM) 3D printing of high-temperature superalloys, and rigorous environmental qualification.",
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
  {
    id: "propulsion-launch",
    number: "04",
    title: "PROPULSION + LAUNCH",
    description:
      "A later-stage program: conventional propulsion first, with aerospike R&D as a strategic option.",
    image: images.hero,
    detail: {
      tagline: "Sequential Propulsion Evolution: Cryogenic Rocketry to Aerospike Exploration",
      readinessLevel: "TRL 3-4 / COMPONENT TEST & SIMULATION",
      extendedDescription:
        "LUNE strictly enforces 'capability before complexity'. We begin with reliable pressure-fed and pump-fed LOX/Kerosene chemical rocket engines, establishing safety and test firing testbeds before deploying capital into advanced aerospike architectures.",
      keySpecs: [
        { label: "Propellant Pair", value: "Liquid Oxygen (LOX) / Rocket Propellant 1 (RP-1)" },
        { label: "Thrust Output", value: "25 kN Sea-Level Baseline (Scalable to 80 kN)" },
        { label: "Cycle Architecture", value: "Regeneratively Cooled Additive Combustion Chamber" },
        { label: "Feed System", value: "High-Pressure Helium Pressurized with Coaxial Pintle Injector" },
        { label: "Chamber Pressure", value: "45 bar Nominal Operating Pressure" },
        { label: "Aerospike Research", value: "Altitude-Compensating Toroidal Nozzle CFD Optimization" },
      ],
      subsystems: [
        "Inconel-Printed Regenerative Cooling Channels with Helical Passages",
        "Fast-Acting Electro-Pneumatic Cryogenic Ball Valves",
        "High-Speed Engine Telemetry & Pressure Transducer DAQ (100 kHz)",
        "Gimbaled Hydraulic/Electromechanical Thrust Vector Control (TVC)",
      ],
    },
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
    id: "propulsion-first",
    number: "04",
    title: "Conventional Propulsion First",
    description:
      "Early launch systems should establish practical bell-nozzle propulsion competence before advanced architectures.",
    meta: "PROPULSION",
    leadDomain: "Chemical Rocketry & Combustion Dynamics",
    trl: 4,
    abstract:
      "Focusing capital and engineering discipline on proven, high-reliability chemical propulsion. We characterize regeneratively cooled bell nozzles, coaxial pintle injectors, and cryogenic valve manifolds on static test stands before flight integration.",
    keyMilestones: [
      "High-pressure cold-flow water test and discharge coefficient mapping",
      "10-second subscale LOX/RP-1 combustion chamber hot-fire test",
      "Additive Inconel regenerative cooling channel pressure proof testing",
    ],
    collaborators: "Propulsion Research Consortia",
  },
  {
    id: "aerospike-rd",
    number: "05",
    title: "Aerospike R&D",
    description:
      "Aerospikes are a long-term research option enabled by advanced manufacturing, thermal engineering and high-cadence reuse.",
    meta: "LONG HORIZON",
    leadDomain: "Computational Fluid Dynamics & Advanced Metallurgy",
    trl: 2,
    abstract:
      "Investigating altitude-compensating aerospike nozzles as an exploratory program for second-generation launch architectures. Advanced additive manufacturing now permits complex internal conformal cooling channels that were historically impossible to machine.",
    keyMilestones: [
      "High-Mach CFD aerodynamic boundary layer pressure distribution modeling",
      "Conformal cooling fluid dynamics thermal dissipation analysis",
      "Laser-sintered copper-alloy plug nozzle subscale coupon fabrication",
    ],
    collaborators: "Aerospace Propulsion Labs & Computational Modeling Centers",
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
    title: "Propulsion: Chemical Rocketry & Advanced Propulsion R&D",
    date: "PROPULSION",
    status: "Planned",
    timeline: "CAPABILITY FIRST",
    deliverables: [
      "Sovereign static rocket engine test facilities and pressure-fed testbeds",
      "Regeneratively cooled LOX/Kerosene chemical rocket engine hot-fire qualification",
      "Exploratory computational modeling and metallurgy for aerospike nozzles",
    ],
  },
  {
    id: "stage-07",
    stageNumber: "07",
    category: "STAGE 07",
    title: "Launch Systems: Dedicated Sovereign Orbital Insertion",
    date: "LAUNCH SYSTEMS",
    status: "Planned",
    timeline: "SOVEREIGN LAUNCH",
    deliverables: [
      "Small launch vehicle engineered for dedicated African payload delivery to SSO",
      "First fully indigenous African orbital launch operation and flight heritage",
      "Regional rideshare sovereignty and domestic space access capability",
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
      "Complete sovereign capability to design, manufacture, test, operate, and launch",
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
      "Integrated cold-gas / electric micro-propulsion options",
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
      { label: "Propulsion", value: "Modular Electric Hall Thruster" },
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
      "Multi-axis electrodynamic shaker reproducing the intense acoustic and mechanical vibration profiles experienced during rocket ascent and stage separation.",
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
      "High-precision laser powder bed fusion 3D printing engineered for complex regeneratively cooled rocket nozzles, satellite structural brackets, and lightweight fairing fittings.",
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
    image: padRockets,
    link: "/systems#platforms",
  },
  {
    id: "spacecraft-platforms",
    title: "Spacecraft Platforms",
    subtitle: "Modular CubeSat and 150kg SmallSat flight-qualified architectures.",
    image: largeRocket,
    link: "/systems",
  },
  {
    id: "payloads-data",
    title: "Payloads and Data Products",
    subtitle: "Electro-optical, RF spectrum sensing, and telemetry pipelines.",
    image: darkRocket,
    link: "/systems#hosted",
  },
  {
    id: "orbital-ai",
    title: "Orbital AI",
    subtitle: "Onboard neural inference, autonomous cloud filtering & edge processing.",
    image: launchRocket,
    link: "/systems#avionics",
  },
  {
    id: "constellation-production",
    title: "Constellation Production",
    subtitle: "Turnkey cleanroom assembly, TVAC vacuum thermal cycling & vibration testing.",
    image: launchRocket,
    link: "/infrastructure",
  },
  {
    id: "managed-services",
    title: "Managed Orbital Services",
    subtitle: "Ground network tracking, direct-to-ground downlink & flight operations.",
    image: heroRocket,
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
    id: "zinc-propulsion",
    category: "Press Releases",
    date: "September 10, 2026",
    title: "LUNE Aerospace Achieves Milestone: Electric Hall-Effect Thruster Successfully Validated in Vacuum Rig",
    excerpt: "LUNE advances its sovereign propulsion roadmap with successful high-vacuum continuous test fire in the Abuja propulsion test chamber.",
    image: heroRocket,
    link: "/research",
  },
  {
    id: "series-capital",
    category: "Press Releases",
    date: "August 20, 2026",
    title: "LUNE Aerospace Closes Strategic Financing to Scale High-Mix Satellite Manufacturing Campus",
    excerpt: "Expansion funds additional ISO Class 7 cleanroom capacity, high-power TVAC chambers, and multi-axis CNC tooling in Abuja.",
    image: launchRocket,
    link: "/infrastructure",
  },
  {
    id: "pausn-deploys",
    category: "Mission Update",
    date: "July 7, 2026",
    title: "LUNE Deploys First Three Operational Pathfinders for Pan-African University Space Network",
    excerpt: "Consortium nodes across Nigeria, Ghana, Kenya, and South Africa achieve first telemetry lock and direct downlink passes.",
    image: largeRocket,
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


