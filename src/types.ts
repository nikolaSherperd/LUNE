export interface NavItem {
  label: string;
  path: string;
}

export interface SystemDetail {
  mass?: string;
  power?: string;
  orbit?: string;
  readinessLevel: string; // TRL 1-9
  subsystems: string[];
  keySpecs: { label: string; value: string }[];
  extendedDescription: string;
}

export interface SystemItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  detail: SystemDetail;
}

export interface ResearchPaper {
  id: string;
  number: string;
  title: string;
  description: string;
  meta: string;
  abstract: string;
  leadDomain: string;
  trl: number;
  keyMilestones: string[];
  collaborators: string;
}

export interface JournalStage {
  id: string;
  stageNumber: string;
  category: string;
  title: string;
  date: string;
  status: "Completed" | "In Progress" | "Planned";
  image?: string;
  deliverables: string[];
  timeline: string;
}

export interface Hotspot {
  id: string;
  x: number; // percentage
  y: number; // percentage
  title: string;
  category: string;
  specs: string;
  details: string;
}
