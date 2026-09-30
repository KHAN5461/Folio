export interface ThemePreset {
  id: string;
  name: string;
  category: 'dark' | 'light';
  primaryColor: string;
  font: string;
  mode: 'dark' | 'light';
  previewBg: string;
  description: string;
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'cyber-indigo',
    name: 'Cyber Indigo',
    category: 'dark',
    primaryColor: '#6366f1',
    font: 'Inter',
    mode: 'dark',
    previewBg: '#0f172a',
    description: 'Deep modern tech navy with electric indigo accents',
  },
  {
    id: 'emerald-matrix',
    name: 'Emerald Matrix',
    category: 'dark',
    primaryColor: '#10b981',
    font: 'JetBrains Mono',
    mode: 'dark',
    previewBg: '#06130d',
    description: 'High-contrast terminal green on obsidian black',
  },
  {
    id: 'nordic-glacier',
    name: 'Nordic Glacier',
    category: 'dark',
    primaryColor: '#06b6d4',
    font: 'Plus Jakarta Sans',
    mode: 'dark',
    previewBg: '#0c1524',
    description: 'Crisp Arctic cyan with cool oceanic dark slate',
  },
  {
    id: 'tokyo-neon',
    name: 'Tokyo Neon',
    category: 'dark',
    primaryColor: '#a855f7',
    font: 'Outfit',
    mode: 'dark',
    previewBg: '#140c24',
    description: 'Vibrant cyberpunk violet with midnight sheen',
  },
  {
    id: 'sunset-amber',
    name: 'Sunset Amber',
    category: 'dark',
    primaryColor: '#f59e0b',
    font: 'Space Grotesk',
    mode: 'dark',
    previewBg: '#1c1409',
    description: 'Warm solar amber and rich bronze undertones',
  },
  {
    id: 'rose-crimson',
    name: 'Rose Crimson',
    category: 'dark',
    primaryColor: '#f43f5e',
    font: 'Plus Jakarta Sans',
    mode: 'dark',
    previewBg: '#1c0c14',
    description: 'Bold magenta rose on velvety carbon background',
  },
  {
    id: 'clean-minimalist',
    name: 'Clean Minimalist',
    category: 'light',
    primaryColor: '#4f46e5',
    font: 'Inter',
    mode: 'light',
    previewBg: '#ffffff',
    description: 'Crisp studio white with deep cobalt accents',
  },
  {
    id: 'warm-editorial',
    name: 'Warm Editorial',
    category: 'light',
    primaryColor: '#d97706',
    font: 'Space Grotesk',
    mode: 'light',
    previewBg: '#faf8f5',
    description: 'Nordic cream paper texture with warm amber typography',
  },
];

export const AVAILABLE_FONTS = [
  { id: 'Inter', name: 'Inter (Clean & Balanced)', style: 'font-sans' },
  { id: 'Plus Jakarta Sans', name: 'Plus Jakarta Sans (Modern Geometric)', style: 'font-sans' },
  { id: 'JetBrains Mono', name: 'JetBrains Mono (Code & Technical)', style: 'font-mono' },
  { id: 'Space Grotesk', name: 'Space Grotesk (Distinctive Editorial)', style: 'font-sans' },
  { id: 'Outfit', name: 'Outfit (Contemporary Tech)', style: 'font-sans' },
];
