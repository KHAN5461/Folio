export type TemplateId = 'terminal-dark' | 'minimal-slate' | 'creative-grid' | 'modern-bento';

export interface SocialLink {
  platform: string;
  url: string;
  handle?: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface ProjectMedia {
  type: 'image' | 'video';
  url: string;
  caption?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
  media?: ProjectMedia[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  startDate: string;
  endDate?: string | null;
  current?: boolean;
  bullets: string[];
}

export interface PortfolioMeta {
  version: string;
  templateId: TemplateId;
  theme: {
    primaryColor: string;
    font: string;
    mode: 'dark' | 'light';
  };
  lastUpdated: string;
}

export interface PortfolioBasics {
  name: string;
  headline: string;
  email: string;
  phone?: string;
  location: {
    city: string;
    country: string;
  };
  bio: string;
  avatarUrl?: string;
  resumeUrl?: string;
  socials: SocialLink[];
}

export interface PortfolioData {
  $schema?: string;
  meta: PortfolioMeta;
  basics: PortfolioBasics;
  skills: SkillCategory[];
  projects: ProjectItem[];
  experience: ExperienceItem[];
}

export interface TemplateDefinition {
  id: TemplateId;
  name: string;
  category: 'Developer' | 'Editorial' | 'Creative' | 'Product';
  description: string;
  tags: string[];
  previewAccent: string;
  requires: string[];
}

export function validatePortfolioData(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!data || typeof data !== 'object') {
    return { valid: false, errors: ['Portfolio data must be an object'] };
  }

  if (!data.basics || typeof data.basics !== 'object') {
    errors.push('Missing "basics" object');
  } else {
    if (!data.basics.name) errors.push('basics.name is required');
    if (!data.basics.headline) errors.push('basics.headline is required');
  }

  if (!Array.isArray(data.skills)) {
    errors.push('"skills" must be an array of categories');
  }

  if (!Array.isArray(data.projects)) {
    errors.push('"projects" must be an array');
  }

  if (!Array.isArray(data.experience)) {
    errors.push('"experience" must be an array');
  }

  if (!data.meta || typeof data.meta !== 'object') {
    errors.push('Missing "meta" configuration');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function createBlankPortfolio(): PortfolioData {
  return {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    meta: {
      version: '1.0.0',
      templateId: 'modern-bento',
      theme: {
        primaryColor: '#6366f1',
        font: 'Plus Jakarta Sans',
        mode: 'dark',
      },
      lastUpdated: new Date().toISOString().split('T')[0],
    },
    basics: {
      name: 'Your Name',
      headline: 'Software Engineer & Builder',
      email: 'you@example.com',
      phone: '',
      location: {
        city: 'San Francisco',
        country: 'United States',
      },
      bio: 'Crafting thoughtful digital systems, high-performance web applications, and intuitive user experiences.',
      avatarUrl: '',
      resumeUrl: '',
      socials: [
        { platform: 'GitHub', url: 'https://github.com', handle: 'username' },
        { platform: 'LinkedIn', url: 'https://linkedin.com', handle: 'username' },
      ],
    },
    skills: [
      {
        category: 'Engineering & Languages',
        items: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
      },
      {
        category: 'Architecture & DevOps',
        items: ['Docker', 'AWS', 'System Design', 'CI/CD Pipelines'],
      },
    ],
    projects: [
      {
        id: 'proj-1',
        title: 'High-Performance API Gateway',
        description: 'Sub-millisecond routing proxy with distributed rate limiting and end-to-end tracing.',
        tags: ['TypeScript', 'Redis', 'Docker'],
        liveUrl: 'https://example.com',
        repoUrl: 'https://github.com',
        featured: true,
        media: [],
      },
    ],
    experience: [
      {
        company: 'Vanguard Systems',
        role: 'Senior Software Engineer',
        startDate: '2023-01',
        endDate: null,
        current: true,
        bullets: [
          'Engineered event-driven microservices processing 4.2M daily messages with 99.99% reliability.',
          'Reduced API latency by 38% through connection pooling and intelligent caching layers.',
        ],
      },
    ],
  };
}
