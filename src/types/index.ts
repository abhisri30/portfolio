export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'Full-Stack' | 'AI & Vision' | 'Creative 3D' | 'Web3 & FinTech';
  tags: string[];
  metrics: string;
  featured: boolean;
  accentColor: string;
  demoUrl: string;
  githubUrl: string;
  architecture: string[];
  gradient: string;
}

export interface SkillItem {
  name: string;
  level: number;
  highlight: string;
}

export interface SkillCategory {
  title: string;
  subtitle: string;
  accentColor: string;
  skills: SkillItem[];
}

export interface TimelineItem {
  year: string;
  role: string;
  company: string;
  location: string;
  description: string;
  achievements: string[];
  badge: string;
  accentColor: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  badge: string;
}

export interface LabSettings {
  particleCount: number;
  connectionDistance: number;
  speed: number;
  palette: 'cyber' | 'ultraviolet' | 'solar' | 'emerald';
  soundEnabled: boolean;
}
