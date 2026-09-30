import { PortfolioData } from '../types/portfolio';

export function generateStandaloneHtml(data: PortfolioData): string {
  const { basics, skills, projects, experience, meta } = data;
  const templateId = meta.templateId || 'modern-bento';

  return `<!DOCTYPE html>
<html lang="en" class="h-full">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(basics.name)} — Portfolio</title>
  <meta name="description" content="${escapeHtml(basics.headline)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:ital,wght@0,400;0,600;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@600;700;800&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['"Plus Jakarta Sans"', 'sans-serif'],
            serif: ['"Instrument Serif"', 'serif'],
            mono: ['"JetBrains Mono"', 'monospace'],
            syne: ['"Syne"', 'sans-serif'],
          }
        }
      }
    }
  </script>
  <style>
    body { margin: 0; padding: 0; min-height: 100vh; }
  </style>
</head>
<body class="bg-[#0b0f19] text-[#e2e8f0] font-sans antialiased min-h-screen">
  <main class="max-w-5xl mx-auto px-6 py-12 md:py-16 space-y-12">
    <!-- Header -->
    <header class="border-b border-slate-800 pb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div class="space-y-3">
        ${basics.avatarUrl ? `<img src="${escapeHtml(basics.avatarUrl)}" alt="${escapeHtml(basics.name)}" class="w-16 h-16 rounded-2xl object-cover border border-slate-700 mb-2">` : ''}
        <h1 class="text-3xl md:text-4xl font-bold text-white tracking-tight">${escapeHtml(basics.name)}</h1>
        <p class="text-base text-indigo-300 font-medium">${escapeHtml(basics.headline)}</p>
        <p class="text-sm text-slate-400 max-w-2xl leading-relaxed">${escapeHtml(basics.bio)}</p>
      </div>
      <div class="flex flex-col md:items-end gap-2 text-xs font-mono text-slate-400 shrink-0">
        ${basics.location.city ? `<div>📍 ${escapeHtml(basics.location.city)}, ${escapeHtml(basics.location.country)}</div>` : ''}
        ${basics.email ? `<a href="mailto:${escapeHtml(basics.email)}" class="hover:text-indigo-300">✉️ ${escapeHtml(basics.email)}</a>` : ''}
        ${basics.resumeUrl ? `<a href="${escapeHtml(basics.resumeUrl)}" target="_blank" class="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-sans font-medium hover:bg-indigo-500 transition-colors mt-2 text-center">View Resume →</a>` : ''}
      </div>
    </header>

    <!-- Social Links -->
    ${basics.socials && basics.socials.length > 0 ? `
    <div class="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
      <span class="text-slate-500 uppercase tracking-wider">Connect:</span>
      ${basics.socials.map(s => `<a href="${escapeHtml(s.url)}" target="_blank" class="text-indigo-400 hover:underline">[${escapeHtml(s.platform)}]</a>`).join(' ')}
    </div>` : ''}

    <!-- Projects -->
    <section class="space-y-6">
      <h2 class="text-xl font-bold text-white tracking-tight flex items-center gap-2">
        <span>Selected Projects</span>
        <span class="text-xs font-mono text-slate-500">(${projects.length})</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${projects.map(proj => `
        <article class="p-6 rounded-2xl bg-[#111726] border border-slate-800 space-y-3 flex flex-col justify-between">
          <div class="space-y-2">
            <div class="flex items-start justify-between gap-2">
              <h3 class="text-base font-bold text-white">${escapeHtml(proj.title)}</h3>
              ${proj.featured ? `<span class="text-[10px] px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 font-mono">Featured</span>` : ''}
            </div>
            <p class="text-xs text-slate-400 leading-relaxed">${escapeHtml(proj.description)}</p>
            ${proj.tags && proj.tags.length > 0 ? `
            <div class="flex flex-wrap gap-1.5 pt-1 text-xs font-mono text-slate-400">
              ${proj.tags.map(t => `<span class="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-[11px]">${escapeHtml(t)}</span>`).join('')}
            </div>` : ''}
          </div>
          <div class="pt-4 border-t border-slate-800/80 flex items-center gap-4 text-xs font-mono">
            ${proj.liveUrl ? `<a href="${escapeHtml(proj.liveUrl)}" target="_blank" class="text-indigo-400 hover:underline">Live Demo ↗</a>` : ''}
            ${proj.repoUrl ? `<a href="${escapeHtml(proj.repoUrl)}" target="_blank" class="text-slate-400 hover:text-white">Source Code ↗</a>` : ''}
          </div>
        </article>
        `).join('')}
      </div>
    </section>

    <!-- Experience -->
    <section class="space-y-6">
      <h2 class="text-xl font-bold text-white tracking-tight">Work Experience</h2>
      <div class="space-y-6">
        ${experience.map(exp => `
        <div class="p-6 rounded-2xl bg-[#111726] border border-slate-800 space-y-3">
          <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <h3 class="text-base font-bold text-white">${escapeHtml(exp.role)} <span class="text-indigo-400">@ ${escapeHtml(exp.company)}</span></h3>
            <span class="text-xs font-mono text-slate-400">${escapeHtml(exp.startDate)} — ${exp.current ? 'Present' : escapeHtml(exp.endDate || 'Present')}</span>
          </div>
          <ul class="space-y-1.5 text-xs text-slate-300 pl-4 border-l border-slate-800">
            ${exp.bullets.map(b => `<li class="leading-relaxed">• ${escapeHtml(b)}</li>`).join('')}
          </ul>
        </div>
        `).join('')}
      </div>
    </section>

    <!-- Skills -->
    <section class="space-y-6">
      <h2 class="text-xl font-bold text-white tracking-tight">Skills & Technologies</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        ${skills.map(cat => `
        <div class="p-5 rounded-2xl bg-[#111726] border border-slate-800 space-y-2">
          <h3 class="text-xs font-mono uppercase tracking-wider text-indigo-400">${escapeHtml(cat.category)}</h3>
          <div class="flex flex-wrap gap-1.5">
            ${cat.items.map(item => `<span class="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">${escapeHtml(item)}</span>`).join('')}
          </div>
        </div>
        `).join('')}
      </div>
    </section>

    <!-- Footer -->
    <footer class="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-2">
      <span>${escapeHtml(basics.name)} · Generated with FolioCraft</span>
      <span>Updated ${escapeHtml(meta.lastUpdated)}</span>
    </footer>
  </main>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
