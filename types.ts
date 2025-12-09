export interface Experience {
  role: string;
  company: string;
  period: string;
  type: string;
}

export interface Project {
  name: string;
  category: string;
  description: string;
  images: string[];
}

export interface Client {
  name: string;
  logo: string;
}

export interface Skill {
  name: string;
  level: number;
}