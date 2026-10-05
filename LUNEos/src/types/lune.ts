export type LuneEnvironment = 
  | 'SYSTEMS'
  | 'MISSIONS'
  | 'SPACECRAFT'
  | 'ENGINEERING'
  | 'SIMULATION'
  | 'DIGITAL_TWIN'
  | 'RESEARCH'
  | 'DATA'
  | 'NETWORK';

export type SubsystemId = 
  | 'EPS' 
  | 'ADCS' 
  | 'THERMAL' 
  | 'OBC' 
  | 'COMMS' 
  | 'PROPULSION' 
  | 'PAYLOAD';

export type DigitalTwinLevel = 
  | 'SPACECRAFT'
  | 'EPS'
  | 'BATTERY'
  | 'CELL'
  | 'SENSOR'
  | 'TELEMETRY';

export type SimulationStateMode = 'REAL' | 'SIMULATED' | 'DIGITAL_TWIN';

export interface SpacecraftSubsystemTelemetry {
  id: SubsystemId;
  name: string;
  metric: string;
  unit: string;
  status: 'NOMINAL' | 'ACTIVE' | 'CALIBRATED' | 'STANDBY';
  primaryValues: { label: string; value: string; unit?: string }[];
  technicalDescription: string;
}

export interface MissionData {
  id: string;
  designation: string;
  name: string;
  orbitKm: number;
  velocityKmS: number;
  inclinationDeg: number;
  periodMin: number;
  state: 'NOMINAL' | 'STANDBY' | 'COMMISSIONING';
  apogeeKm: number;
  perigeeKm: number;
  groundTrackTarget: string;
  nextContact: string;
  subsystemSummary: {
    eps: string;
    obc: string;
    thermal: string;
    adcs: string;
    comms: string;
  };
}

export interface EngineeringArtifact {
  id: string;
  category: 'STRUCTURES' | 'PROPULSION' | 'AVIONICS' | 'COMMUNICATIONS' | 'MATERIALS';
  title: string;
  revision: string;
  status: 'VERIFIED' | 'FLIGHT_READY' | 'ANALYSIS' | 'PROTOTYPE';
  massKg: string;
  material: string;
  keySpecs: { label: string; value: string }[];
  notes: string;
  dimensions: { x: number; y: number; z: number; unit: string };
  tolerance: string;
}

export interface ResearchDocument {
  id: string;
  category: 'AEROSPIKE PROPULSION' | 'CUBESAT ARCHITECTURE' | 'AUTONOMOUS SYSTEMS' | 'THERMAL SYSTEMS' | 'ADVANCED MATERIALS';
  title: string;
  author: string;
  facility: string;
  docNumber: string;
  date: string;
  classification: string;
  abstract: string;
  equations: { formula: string; explanation: string }[];
  keyFindings: string[];
  testRuns?: { runId: string; chamberPressureBar: number; thrustN: number; ispSec: number; status: string }[];
}

export interface GroundStation {
  id: string;
  name: string;
  location: string;
  country: string;
  coordinates: string;
  band: string;
  elevationLimit: string;
  status: 'TRACKING' | 'ACQUIRING' | 'HORIZON_WAIT' | 'MAINTENANCE';
  nextPass: string;
  signalSnrDb: number;
  dopplerShiftKhz: number;
}
