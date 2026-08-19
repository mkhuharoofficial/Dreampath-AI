const fs = require('fs');

// 1. Update types.ts
const typesCode = `export enum DomainType {
  HEALTH = 'Medical and Health Sciences',
  TECHNOLOGY = 'Technologies and Computing IT',
  ENGINEERING = 'Engineering',
  BUSINESS = 'Business and Finance',
  LAW = 'Law and Public Policies',
  NATURAL_SCIENCES = 'Natural and Life Sciences',
  SOCIAL_SCIENCES = 'Social Sciences',
  ARTS = 'Arts, Media, and Humanities',
}

export interface Degree {
  id: string;
  title: string;
  domain: DomainType;
  duration: string;
  category: 'Skill' | 'Degree' | 'Professional' | 'Professional Health Career' | 'Doctor level Career';
  description: string[];
  subjects: string[];
  marketReality: string[];
  jobRoles: string[];
  keySectors: string[];
  salaryTable: {
    level: string;
    salary: string;
  }[];
  skills: string[];
  universities: string[];
  strategy: string[];
  chooseIf: string[];
  avoidIf: string[];
  roadmap: {
    year: string;
    milestone: string;
  }[];
  startupOps: string[];
  summary: string;
}

export interface DomainInfo {
  type: DomainType;
  color: string;
  icon: string;
  description: string;
}
`;
fs.writeFileSync('src/types.ts', typesCode, 'utf8');

// 2. Update data.ts DOMAINS
let dataCode = fs.readFileSync('src/data.ts', 'utf8');

const newDomains = `export const DOMAINS: DomainInfo[] = [
  {
    type: DomainType.HEALTH,
    color: 'emerald',
    icon: 'Stethoscope',
    description: 'Health, Medical, Pharmacy & Clinical Specialties',
  },
  {
    type: DomainType.TECHNOLOGY,
    color: 'blue',
    icon: 'Laptop',
    description: 'Computing, IT, AI, Software & Digital Technologies',
  },
  {
    type: DomainType.ENGINEERING,
    color: 'orange',
    icon: 'Settings',
    description: 'Electrical, Mechanical, Civil & Specialized Engineering',
  },
  {
    type: DomainType.BUSINESS,
    color: 'purple',
    icon: 'Briefcase',
    description: 'Management, Accounting, Finance & Corporate Business',
  },
  {
    type: DomainType.LAW,
    color: 'slate',
    icon: 'Scale',
    description: 'Legal Studies, Corporate Law & Public Policies',
  },
  {
    type: DomainType.NATURAL_SCIENCES,
    color: 'teal',
    icon: 'FlaskConical',
    description: 'Chemistry, Biotech, Physics, Math & Life Sciences',
  },
  {
    type: DomainType.SOCIAL_SCIENCES,
    color: 'indigo',
    icon: 'Users',
    description: 'Economics, Psychology, Media & Sociological Studies',
  },
  {
    type: DomainType.ARTS,
    color: 'rose',
    icon: 'Palette',
    description: 'Design, Fine Arts, Humanities & Languages',
  },
];`;

dataCode = dataCode.replace(/export const DOMAINS: DomainInfo\[\] = \[[\s\S]*?\];/, newDomains);
fs.writeFileSync('src/data.ts', dataCode, 'utf8');

console.log("Done updating domains!");
