export interface Experience {
  role: string;
  company: string;
  period: string;
  type: string;
}

export interface Client {
  name: string;
  logo: string; // simpler to use text/icon for demo than finding 20 separate logo svgs
}

export interface Skill {
  name: string;
  level: number;
}