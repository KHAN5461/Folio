import { PortfolioData } from '../types/portfolio';

export const SAMPLE_PROFILES: Record<string, PortfolioData> = {
  jane_doe: {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    meta: {
      version: '1.0.0',
      templateId: 'terminal-dark',
      theme: {
        primaryColor: '#10b981',
        font: 'JetBrains Mono',
        mode: 'dark',
      },
      lastUpdated: '2026-09-30',
    },
    basics: {
      name: 'Jane Doe',
      headline: 'Distributed Systems & Cloud Infrastructure Engineer',
      email: 'jane.doe@devcore.io',
      phone: '+1 (415) 892-0144',
      location: {
        city: 'San Francisco',
        country: 'United States',
      },
      bio: 'Staff infrastructure engineer specializing in distributed consensus, low-latency stream processing, and container orchestration at planet scale. Core contributor to open-source distributed caches.',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      resumeUrl: 'https://example.com/jane-doe-resume.pdf',
      socials: [
        { platform: 'GitHub', url: 'https://github.com/janedoe', handle: 'janedoe' },
        { platform: 'LinkedIn', url: 'https://linkedin.com/in/janedoe', handle: 'janedoe' },
        { platform: 'Twitter', url: 'https://twitter.com/janedoe_dev', handle: '@janedoe_dev' },
      ],
    },
    skills: [
      {
        category: 'Systems & Languages',
        items: ['Go', 'Rust', 'TypeScript', 'C++', 'Python', 'SQL'],
      },
      {
        category: 'Infrastructure & Data',
        items: ['Kubernetes', 'Raft Consensus', 'Kafka', 'Redis', 'PostgreSQL', 'eBPF', 'Terraform'],
      },
      {
        category: 'Protocols & Architecture',
        items: ['gRPC', 'Protocol Buffers', 'Event Sourcing', 'Distributed Tracing', 'Zero-Trust'],
      },
    ],
    projects: [
      {
        id: 'proj-1',
        title: 'Decentralized Cache Layer',
        description: 'Sub-millisecond in-memory cache system built with Go and Raft consensus, sustaining 2.4M writes/sec.',
        tags: ['Go', 'Distributed Systems', 'Raft', 'Docker'],
        liveUrl: 'https://cache.devcore.io',
        repoUrl: 'https://github.com/janedoe/cache-layer',
        featured: true,
        media: [
          {
            type: 'image',
            url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
            caption: 'Architecture benchmark showing 0.8ms p99 latency under 2M QPS',
          },
        ],
      },
      {
        id: 'proj-2',
        title: 'eBPF Network Telemetry Agent',
        description: 'Kernel-level observability daemon monitoring socket-level packet drops and TCP retransmits without kernel patches.',
        tags: ['Rust', 'eBPF', 'Linux Kernel', 'Prometheus'],
        liveUrl: 'https://ebpf-agent.devcore.io',
        repoUrl: 'https://github.com/janedoe/ebpf-telemetry',
        featured: true,
        media: [],
      },
      {
        id: 'proj-3',
        title: 'Vector Index Microservice',
        description: 'Embedded HNSW vector similarity search engine running on SIMD AVX-512 extensions with instant re-indexing.',
        tags: ['C++', 'SIMD', 'Vector Search', 'gRPC'],
        repoUrl: 'https://github.com/janedoe/simd-vector-engine',
        featured: false,
        media: [],
      },
    ],
    experience: [
      {
        company: 'Vanguard Cloud Systems',
        role: 'Staff Infrastructure Engineer',
        startDate: '2023-03',
        endDate: null,
        current: true,
        bullets: [
          'Architected multi-region Raft cluster spanning 12 AWS regions, decreasing cross-datacenter failover time by 82% from 45s to 8s.',
          'Reduced annual compute costs by $1.4M by introducing custom eBPF load-balancing filters across 4,000 edge nodes.',
          'Mentored 8 senior engineers on distributed consensus validation and chaos engineering practices.',
        ],
      },
      {
        company: 'HyperScale Data Labs',
        role: 'Senior Distributed Systems Engineer',
        startDate: '2020-06',
        endDate: '2023-02',
        current: false,
        bullets: [
          'Engineered streaming ingestion pipeline processing 14B telemetry events daily using Apache Kafka and Go consumers.',
          'Spearheaded transition from REST microservices to gRPC/Protobuf, decreasing internal networking overhead by 44%.',
        ],
      },
    ],
  },

  maya_lin: {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    meta: {
      version: '1.0.0',
      templateId: 'creative-grid',
      theme: {
        primaryColor: '#f59e0b',
        font: 'Syne',
        mode: 'dark',
      },
      lastUpdated: '2026-09-30',
    },
    basics: {
      name: 'Maya Lin',
      headline: 'Creative Technologist & Generative Designer',
      email: 'maya@studio-lin.design',
      phone: '+1 (212) 555-0198',
      location: {
        city: 'New York',
        country: 'United States',
      },
      bio: 'Blending algorithmic art, interactive WebGL shaders, and tactile physical computing. Creating expressive spatial brand experiences for cultural institutions and forward-thinking studios worldwide.',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      resumeUrl: 'https://studio-lin.design/curriculum-vitae',
      socials: [
        { platform: 'Website', url: 'https://studio-lin.design', handle: 'studio-lin.design' },
        { platform: 'GitHub', url: 'https://github.com/mayalindesign', handle: 'mayalindesign' },
        { platform: 'Twitter', url: 'https://twitter.com/mayalin_art', handle: '@mayalin_art' },
      ],
    },
    skills: [
      {
        category: 'Creative Technology',
        items: ['Three.js', 'GLSL Shaders', 'WebGPU', 'TouchDesigner', 'Canvas 2D', 'Hydra'],
      },
      {
        category: 'Frontend & Creative Code',
        items: ['TypeScript', 'React', 'Tailwind CSS', 'Framer Motion', 'p5.js', 'Next.js'],
      },
      {
        category: 'Sensory & Audio',
        items: ['Web Audio API', 'MIDI Interface', 'Ableton Link', 'Spatial Acoustics'],
      },
    ],
    projects: [
      {
        id: 'proj-cg-1',
        title: 'Kinetic Particle Symphony',
        description: 'Interactive audio-reactive WebGL simulation driving 65,000 GPU particles guided by custom curl noise shaders.',
        tags: ['Three.js', 'GLSL', 'Web Audio API', 'Interactive'],
        liveUrl: 'https://particles.studio-lin.design',
        repoUrl: 'https://github.com/mayalindesign/particle-symphony',
        featured: true,
        media: [
          {
            type: 'image',
            url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
            caption: 'Audio-reactive particle cloud rendering in 60fps WebGL',
          },
        ],
      },
      {
        id: 'proj-cg-2',
        title: 'Monumentum: Digital Pavilion',
        description: 'Virtual museum exhibition capturing 12 physical architectural models with photogrammetry and interactive lighting.',
        tags: ['WebGPU', 'Photogrammetry', 'Spatial Design', 'React'],
        liveUrl: 'https://monumentum.studio-lin.design',
        repoUrl: 'https://github.com/mayalindesign/monumentum',
        featured: true,
        media: [
          {
            type: 'image',
            url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
            caption: 'Ray-marched architectural light study',
          },
        ],
      },
      {
        id: 'proj-cg-3',
        title: 'Chroma Specimen Typeface',
        description: 'Variable generative typeface that deforms in real-time according to ambient microphone frequency inputs.',
        tags: ['Variable Fonts', 'Canvas 2D', 'Web Audio'],
        liveUrl: 'https://chroma.studio-lin.design',
        featured: false,
        media: [],
      },
    ],
    experience: [
      {
        company: 'Stellar Atelier',
        role: 'Lead Creative Developer',
        startDate: '2023-01',
        endDate: null,
        current: true,
        bullets: [
          'Engineered immersive web experience for Milan Design Week that achieved 180,000 unique international visitors with 4.8 min average dwell time.',
          'Optimized WebGL compute shaders, achieving smooth 60fps on mobile browsers while reducing GPU power consumption by 35%.',
        ],
      },
      {
        company: 'MediaLab Interactive',
        role: 'Interaction Designer & Coder',
        startDate: '2021-04',
        endDate: '2022-12',
        current: false,
        bullets: [
          'Designed and deployed 14 bespoke interactive digital installations for contemporary art exhibitions across Berlin and Tokyo.',
          'Built custom TouchDesigner-to-WebSockets bridge allowing physical pedal sensors to trigger live browser visualizers.',
        ],
      },
    ],
  },

  alex_rivera: {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    meta: {
      version: '1.0.0',
      templateId: 'modern-bento',
      theme: {
        primaryColor: '#6366f1',
        font: 'Plus Jakarta Sans',
        mode: 'dark',
      },
      lastUpdated: '2026-09-30',
    },
    basics: {
      name: 'Alex Rivera',
      headline: 'Principal Frontend Architect & Open Source Creator',
      email: 'alex.rivera@codearch.dev',
      phone: '+1 (512) 803-9122',
      location: {
        city: 'Austin',
        country: 'United States',
      },
      bio: 'Leading modern web frontend architecture, design systems at enterprise scale, and high-performance React runtime optimizations. Author of open-source UI libraries with 120k+ weekly npm downloads.',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      resumeUrl: 'https://codearch.dev/resume.pdf',
      socials: [
        { platform: 'GitHub', url: 'https://github.com/alexrivera', handle: 'alexrivera' },
        { platform: 'LinkedIn', url: 'https://linkedin.com/in/alexrivera', handle: 'alexrivera' },
        { platform: 'Website', url: 'https://codearch.dev', handle: 'codearch.dev' },
      ],
    },
    skills: [
      {
        category: 'Web Platforms & Frameworks',
        items: ['TypeScript', 'React 19', 'Next.js', 'Vite', 'Node.js', 'GraphQL'],
      },
      {
        category: 'Design Systems & UI',
        items: ['Tailwind CSS', 'Radix UI', 'CSS Modules', 'Storybook', 'Figma Tokens', 'WCAG AAA'],
      },
      {
        category: 'Performance & Testing',
        items: ['Web Vitals (LCP/INP)', 'Playwright', 'Vitest', 'Bundle Optimization', 'Micro-frontends'],
      },
    ],
    projects: [
      {
        id: 'proj-ar-1',
        title: 'Prism Design System',
        description: 'Comprehensive, accessible design system supporting 4 multi-brand themes and 65 production-grade components.',
        tags: ['Design System', 'TypeScript', 'React', 'WCAG AAA'],
        liveUrl: 'https://prism.codearch.dev',
        repoUrl: 'https://github.com/alexrivera/prism-ds',
        featured: true,
        media: [
          {
            type: 'image',
            url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
            caption: 'Token architecture & component tree',
          },
        ],
      },
      {
        id: 'proj-ar-2',
        title: 'UltraSync State Machine',
        description: 'Zero-dependency state coordinator with optimistic offline syncing, conflict resolution, and indexedDB storage.',
        tags: ['State Management', 'Offline-First', 'TypeScript', 'IndexedDB'],
        liveUrl: 'https://ultrasync.codearch.dev',
        repoUrl: 'https://github.com/alexrivera/ultrasync',
        featured: true,
        media: [],
      },
      {
        id: 'proj-ar-3',
        title: 'Bundle Budget CI Bot',
        description: 'GitHub Action bot that analyzes pull request ASTs to flag bundle size regressions with byte-level precision.',
        tags: ['Node.js', 'GitHub Actions', 'AST Parsing', 'Tooling'],
        repoUrl: 'https://github.com/alexrivera/bundle-budget-bot',
        featured: false,
        media: [],
      },
    ],
    experience: [
      {
        company: 'CloudScale Global',
        role: 'Principal Frontend Architect',
        startDate: '2022-08',
        endDate: null,
        current: true,
        bullets: [
          'Spearheaded design system migration across 48 customer-facing applications, slashing feature UI turnaround time by 60%.',
          'Eliminated 320KB of duplicate vendor dependencies, improving Core Web Vitals Interaction to Next Paint (INP) by 45ms.',
          'Established accessibility standards resulting in zero critical accessibility compliance tickets across 2 audit cycles.',
        ],
      },
      {
        company: 'Apex Software Group',
        role: 'Senior Staff Engineer',
        startDate: '2019-02',
        endDate: '2022-07',
        current: false,
        bullets: [
          'Architected core customer analytics dashboard with virtualized tables handling 250,000 real-time financial events.',
          'Coached 24 frontend engineers across 4 squads on modern TypeScript and micro-frontend federation.',
        ],
      },
    ],
  },
};
