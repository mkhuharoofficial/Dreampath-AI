export enum DomainType {
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
  category: 'Skill' | 'Diploma' | 'Degree' | 'Professional' | 'Professional Health Career' | 'Doctor level Career';
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
