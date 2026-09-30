import React from 'react';

export const EmptySearchIllustration: React.FC<{ className?: string }> = ({ className = 'w-36 h-36' }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="searchGrad" x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
        <stop stopColor="#6366f1" stopOpacity="0.25" />
        <stop stopColor="#818cf8" stopOpacity="0.05" />
      </linearGradient>
      <linearGradient id="lensGrad" x1="60" y1="40" x2="130" y2="110" gradientUnits="userSpaceOnUse">
        <stop stopColor="#6366f1" />
        <stop stopColor="#a5b4fc" />
      </linearGradient>
    </defs>
    {/* Background Halo */}
    <circle cx="100" cy="100" r="70" fill="url(#searchGrad)" />
    <circle cx="100" cy="100" r="50" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.4" />
    
    {/* Floating Data Nodes */}
    <rect x="40" y="55" width="28" height="18" rx="6" fill="#6366f1" fillOpacity="0.15" stroke="#6366f1" strokeWidth="1.2" />
    <line x1="48" y1="64" x2="60" y2="64" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" />
    
    <rect x="135" y="120" width="32" height="20" rx="6" fill="#818cf8" fillOpacity="0.15" stroke="#818cf8" strokeWidth="1.2" />
    <line x1="143" y1="130" x2="157" y2="130" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" />

    {/* Magnifying Glass */}
    <g transform="translate(10, 5)">
      <circle cx="85" cy="80" r="32" stroke="url(#lensGrad)" strokeWidth="6" fill="white" fillOpacity="0.03" />
      <line x1="108" y1="103" x2="140" y2="135" stroke="url(#lensGrad)" strokeWidth="7" strokeLinecap="round" />
      {/* Glare */}
      <path d="M 68 65 A 22 22 0 0 1 95 62" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.8" />
      {/* Question mark / cross in lens */}
      <path d="M 80 80 L 90 80 M 85 75 L 85 85" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6" />
    </g>
  </svg>
);

export const NoProjectsIllustration: React.FC<{ className?: string }> = ({ className = 'w-36 h-36' }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="folderGrad" x1="30" y1="40" x2="170" y2="160" gradientUnits="userSpaceOnUse">
        <stop stopColor="#06b6d4" stopOpacity="0.25" />
        <stop stopColor="#6366f1" stopOpacity="0.08" />
      </linearGradient>
      <linearGradient id="cardGrad" x1="60" y1="70" x2="140" y2="150" gradientUnits="userSpaceOnUse">
        <stop stopColor="#06b6d4" />
        <stop stopColor="#3b82f6" />
      </linearGradient>
    </defs>
    {/* Base Glow */}
    <rect x="35" y="45" width="130" height="110" rx="20" fill="url(#folderGrad)" />
    
    {/* Folder Back Tab */}
    <path d="M 45 65 L 85 65 L 100 80 L 155 80 C 160 80 165 85 165 90 L 165 145 C 165 150 160 155 155 155 L 45 155 C 40 155 35 150 35 145 L 35 75 C 35 70 40 65 45 65 Z" stroke="#06b6d4" strokeWidth="2" strokeOpacity="0.4" />
    
    {/* Floating Blank Blueprint Card */}
    <g transform="translate(5, -5)">
      <rect x="55" y="75" width="90" height="65" rx="14" fill="#080c14" stroke="url(#cardGrad)" strokeWidth="2" />
      {/* Code / Wireframe dashes */}
      <rect x="68" y="90" width="30" height="8" rx="4" fill="#06b6d4" fillOpacity="0.5" />
      <rect x="68" y="105" width="64" height="4" rx="2" fill="#64748b" fillOpacity="0.4" />
      <rect x="68" y="115" width="48" height="4" rx="2" fill="#64748b" fillOpacity="0.3" />
      {/* Plus icon on card */}
      <circle cx="125" cy="94" r="8" fill="#06b6d4" fillOpacity="0.2" />
      <path d="M 125 90 L 125 98 M 121 94 L 129 94" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  </svg>
);

export const JsonErrorIllustration: React.FC<{ className?: string }> = ({ className = 'w-36 h-36' }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="errorGrad" x1="20" y1="30" x2="180" y2="170" gradientUnits="userSpaceOnUse">
        <stop stopColor="#f43f5e" stopOpacity="0.25" />
        <stop stopColor="#fb7185" stopOpacity="0.05" />
      </linearGradient>
    </defs>
    {/* Ambient Glow */}
    <circle cx="100" cy="100" r="70" fill="url(#errorGrad)" />
    
    {/* Terminal / Code Window */}
    <rect x="40" y="45" width="120" height="110" rx="16" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.8" strokeOpacity="0.8" />
    
    {/* Window Dots */}
    <circle cx="55" cy="60" r="3.5" fill="#f43f5e" />
    <circle cx="66" cy="60" r="3.5" fill="#f59e0b" fillOpacity="0.6" />
    <circle cx="77" cy="60" r="3.5" fill="#10b981" fillOpacity="0.6" />
    <line x1="40" y1="72" x2="160" y2="72" stroke="#334155" strokeWidth="1" />

    {/* Broken Brackets & Error Flag */}
    <text x="56" y="105" fontFamily="monospace" fontSize="22" fontWeight="bold" fill="#f43f5e">{"{ ; }"}</text>
    <path d="M 120 90 L 140 110 M 140 90 L 120 110" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
    
    {/* Squiggly underline */}
    <path d="M 55 125 Q 60 120 65 125 T 75 125 T 85 125 T 95 125 T 105 125 T 115 125 T 125 125" stroke="#f43f5e" strokeWidth="2" fill="none" />
  </svg>
);

export const GitSyncIllustration: React.FC<{ className?: string }> = ({ className = 'w-36 h-36' }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="gitGrad" x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
        <stop stopColor="#a855f7" stopOpacity="0.25" />
        <stop stopColor="#6366f1" stopOpacity="0.08" />
      </linearGradient>
    </defs>
    <circle cx="100" cy="100" r="68" fill="url(#gitGrad)" />

    {/* Git Tree Branches */}
    <circle cx="70" cy="65" r="9" fill="#a855f7" stroke="white" strokeWidth="2" />
    <circle cx="70" cy="135" r="9" fill="#6366f1" stroke="white" strokeWidth="2" />
    <circle cx="130" cy="100" r="11" fill="#ec4899" stroke="white" strokeWidth="2.5" />

    <line x1="70" y1="74" x2="70" y2="126" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
    <path d="M 70 74 C 70 100 110 100 119 100" stroke="#a855f7" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M 70 126 C 70 100 110 100 119 100" stroke="#6366f1" strokeWidth="3" fill="none" strokeLinecap="round" />

    {/* Sync Ring */}
    <path d="M 130 65 A 35 35 0 0 1 155 115" stroke="#ec4899" strokeWidth="2" strokeDasharray="3 3" fill="none" />
  </svg>
);
