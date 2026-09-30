import { TemplateDefinition } from '../types/portfolio';

export const TEMPLATES: TemplateDefinition[] = [
  {
    id: 'modern-bento',
    name: 'Modern Bento',
    category: 'Product',
    description: 'Structured card architecture with metrics, tech badges, live demo links, and modern modular layouts.',
    tags: ['Modular', 'Product', 'Full-Stack', 'Balanced'],
    previewAccent: '#6366f1',
    requires: ['projects', 'skills'],
  },
  {
    id: 'terminal-dark',
    name: 'Terminal Dark',
    category: 'Developer',
    description: 'Retro-futuristic command-line interface with interactive prompt commands, phosphor accents, and monospace clarity.',
    tags: ['CLI / Monospace', 'Hacker', 'Dark Mode', 'Developer'],
    previewAccent: '#10b981',
    requires: ['basics', 'skills'],
  },
  {
    id: 'minimal-slate',
    name: 'Minimal Slate',
    category: 'Editorial',
    description: 'Serif headlines, generous whitespace, subtle hairline dividers, and museum-grade visual restraint.',
    tags: ['Editorial', 'Serif', 'High Restraint', 'Clean'],
    previewAccent: '#0ea5e9',
    requires: ['experience', 'basics.bio'],
  },
  {
    id: 'creative-grid',
    name: 'Creative Grid',
    category: 'Creative',
    description: 'High-impact media bento grid, bold headline typography, rich visual frames, and expressive aesthetic rhythm.',
    tags: ['Media-First', 'Display Typography', 'Expressive', 'Showcase'],
    previewAccent: '#f59e0b',
    requires: ['projects', 'basics.avatarUrl'],
  },
];
