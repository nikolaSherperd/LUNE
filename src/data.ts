import heroRocket from "../Images/4d470eaec613721b01026b3ffbd82ca4.jpg";
import launchRocket from "../Images/58b129e81e16c5ccff592de06b93656e.jpg";
import padRockets from "../Images/71e3fbd44c9688627366e223310b9c66.jpg";
import largeRocket from "../Images/98ae5c7f60e7d937a960430b82d0f83f.jpg";
import darkRocket from "../Images/ab5bdf14b63eba46547f5ff99c5fce11.jpg";
import luneWordmark from "../Images/file_00000000e35c71f4b529230b685b189d.png";
import luneEmblem from "../Images/file_00000000e43c71f4a1b152dd8dfdae31.png";

export interface NavItem {
  label: string;
  path: string;
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
  { label: "Vision", path: "/mission" },
  { label: "Capabilities", path: "/systems" },
  { label: "Research", path: "/research" },
  { label: "Ecosystem", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export const images = {
  hero: heroRocket,
  systems: padRockets,
  platform: largeRocket,
  manufacturing: launchRocket,
  darkRocket,
};

export const brandAssets = {
  wordmark: luneWordmark,
  emblem: luneEmblem,
};

export const systems: SystemItem[] = [
  {
    id: "space-systems",
    number: "01",
    title: "SPACE SYSTEMS",
    description:
      "CubeSats, small satellites, subsystems, flight computers, communications and mission operations.",
    image: images.platform,
    detail: {
      tagline: "LEO Modular Satellites & Tactical Bus Architectures",
      readinessLevel: "TRL 6 / FLIGHT HERITAGE READY",
      extendedDescription:
        "Standardized, modular small-satellite platforms engineered for responsive manufacturing, resilient orbital operations, and rapid payload integration. Designed to establish sovereign African telemetry, communications, and remote sensing infrastructure.",
      keySpecs: [
        { label: "Form Factors", value: "3U, 6U, 12U CubeSat and 150kg SmallSat Class" },
        { label: "Operational Orbit", value: "450 km – 650 km Sun-Synchronous (SSO)" },
        { label: "Pointing Precision", value: "< 0.05° 3-Axis via Star Tracker & Reaction Wheels" },
        { label: "Telemetry & Comms", value: "S-Band Telecommand / X-Band 50 Mbps Payload Downlink" },
        { label: "Power Output", value: "Deployable GaAs Arrays up to 75W BOL" },
        { label: "Design Life", value: "3 to 5 Years in LEO Environment" },
      ],
      subsystems: [
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
    title: "Learn: engineering, software, electronics and systems discipline",
    date: "FOUNDATION",
    status: "Operational",
    timeline: "2024 – 2025",
    deliverables: [
      "Core engineering team assembly across avionics, RF and structures",
      "Establishment of the Pan-African University Space Network (PAUSN)",
      "High-reliability embedded software architecture and telemetry standards",
    ],
  },
  {
    id: "stage-02",
    stageNumber: "02",
    category: "STAGE 02",
    title: "Build and operate spacecraft before integrating the wider industrial stack",
    date: "SPACE SYSTEMS",
    status: "Active R&D",
    image: images.darkRocket,
    timeline: "2025 – 2027",
    deliverables: [
      "LUNE-1 3U CubeSat demonstration flight for African Earth observation",
      "Autonomous mission operations center and ground receiver network",
      "Standardized 6U/12U satellite bus platform commercially available",
    ],
  },
  {
    id: "stage-03",
    stageNumber: "03",
    category: "STAGE 03",
    title: "Domestic Additive Metallurgy & Precision Cleanroom Integration",
    date: "MANUFACTURING",
    status: "Active R&D",
    timeline: "2026 – 2028",
    deliverables: [
      "ISO Class 7 cleanroom and vacuum thermal cycling facility operational",
      "Direct metal laser sintering of aerospace structural titanium and Inconel",
      "Full environmental qualification (vibration, thermal, EMC) conducted in-house",
    ],
  },
  {
    id: "stage-04",
    stageNumber: "04",
    category: "STAGE 04",
    title: "Integrated AI-Enabled Avionics & Edge Inference Flight Heritage",
    date: "INTELLIGENCE",
    status: "Planned",
    timeline: "2027 – 2029",
    deliverables: [
      "Orbital NPU payload performing real-time multi-spectral image inference",
      "Cryptographic hardware root-of-trust satellite constellations",
      "Inter-satellite optical cross-link demonstration test",
    ],
  },
  {
    id: "stage-05",
    stageNumber: "05",
    category: "STAGE 05",
    title: "Chemical Rocket Engine Static Firing & Test Stand Infrastructure",
    date: "PROPULSION",
    status: "Planned",
    timeline: "2028 – 2030",
    deliverables: [
      "Dedicated sovereign static rocket test facility in Nigeria",
      "Full-duration 60-second hot fire of 35 kN LOX/Kerosene engine",
      "Regeneratively cooled additive combustion chambers qualified",
    ],
  },
  {
    id: "stage-06",
    stageNumber: "06",
    category: "STAGE 06",
    title: "Suborbital Test Vehicles & Micro-Launcher Flight Validation",
    date: "LAUNCH ARCHITECTURE",
    status: "Planned",
    timeline: "2030 – 2032",
    deliverables: [
      "Sounding rocket campaign reaching Kármán line (100 km+ altitude)",
      "Autonomous guidance, navigation and control (GNC) closed-loop flight",
      "Stage separation and telemetry recovery systems proven",
    ],
  },
  {
    id: "stage-07",
    stageNumber: "07",
    category: "STAGE 07",
    title: "Orbital Insertion & Dedicated Sovereign Launch Capability",
    date: "ORBITAL CAPABILITY",
    status: "Planned",
    timeline: "2032 – 2035",
    deliverables: [
      "Two-stage small launch vehicle delivering 150 kg payload to SSO",
      "First fully indigenous African orbital launch operation",
      "Commercial rideshare service deployment for regional customers",
    ],
  },
  {
    id: "stage-08",
    stageNumber: "08",
    category: "STAGE 08",
    title: "Aerospike Research, First-Stage Reuse & Scaled Space Logistics",
    date: "LONG HORIZON",
    status: "Planned",
    timeline: "2035+",
    deliverables: [
      "Altitude-compensating aerospike flight demonstrator engine",
      "Vertical propulsive landing and recovery of first-stage booster",
      "High-cadence modular orbital infrastructure assembly",
    ],
  },
];
