import React, { useState } from 'react';
import { PortfolioData, ProjectItem } from '../../types/portfolio';
import { ArrowUpRight, Mail, MapPin, Copy, Check, Printer } from 'lucide-react';
import { ProjectCaseStudyModal } from '../studio/ProjectCaseStudyModal';

interface TemplateProps {
  data: PortfolioData;
}

export const MinimalSlateTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { basics, skills, projects, experience, meta } = data;
  const isDark = meta.theme.mode === 'dark';
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [inspectProject, setInspectProject] = useState<ProjectItem | null>(null);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!basics.email) return;
    navigator.clipboard.writeText(basics.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const containerBg = isDark
    ? 'bg-[#0e1117] text-[#f1f5f9]'
    : 'bg-[#fbfbfa] text-[#1c1917]';
  const headingText = isDark ? 'text-white' : 'text-neutral-900';
  const bodyText = isDark ? 'text-slate-300' : 'text-neutral-700';
  const mutedText = isDark ? 'text-slate-500' : 'text-neutral-400';
  const dividerBorder = isDark ? 'border-slate-800' : 'border-neutral-200';

  return (
    <div className={`min-h-full font-sans p-6 md:p-14 lg:p-20 transition-colors selection:bg-neutral-900 selection:text-white print:p-0 print:bg-white print:text-black ${containerBg}`}>
      <div className="max-w-3xl mx-auto space-y-16 md:space-y-24">
        {/* Editorial Header */}
        <header className={`space-y-8 border-b pb-12 ${dividerBorder}`}>
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
            <div>
              <h1 className={`font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] ${headingText}`}>
                {basics.name}
              </h1>
              <p className="mt-3 text-base md:text-lg opacity-80 font-light max-w-xl">
                {basics.headline}
              </p>
            </div>

            <div className={`flex flex-wrap md:flex-col items-start md:items-end gap-2 text-xs font-mono tracking-tight shrink-0 ${mutedText}`}>
              {basics.location.city && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 opacity-60" />
                  {basics.location.city}, {basics.location.country}
                </span>
              )}
              {basics.email && (
                <button
                  onClick={handleCopyEmail}
                  className="hover:opacity-100 transition-opacity flex items-center gap-1.5 cursor-pointer"
                  title="Click to copy email address"
                >
                  <Mail className="w-3 h-3 opacity-60" />
                  <span>{basics.email}</span>
                  {copiedEmail ? (
                    <Check className="w-3 h-3 text-emerald-500" />
                  ) : (
                    <Copy className="w-2.5 h-2.5 opacity-40" />
                  )}
                </button>
              )}
              <button
                onClick={handlePrint}
                className="print:hidden hover:opacity-100 transition-opacity flex items-center gap-1.5 cursor-pointer pt-1"
                title="Print or Save as PDF"
              >
                <Printer className="w-3 h-3 opacity-60" />
                <span>Print Curriculum</span>
              </button>
            </div>
          </div>

          <p className={`text-sm md:text-base leading-relaxed font-normal max-w-2xl ${bodyText}`}>
            {basics.bio}
          </p>

          {/* Socials & Resume Links */}
          <div className={`flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs uppercase tracking-wider font-mono ${mutedText}`}>
            {basics.socials.map((s, idx) => (
              <a
                key={idx}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-100 transition-opacity inline-flex items-center gap-1 underline underline-offset-4"
              >
                <span>{s.platform}</span>
                <ArrowUpRight className="w-3 h-3 opacity-60" />
              </a>
            ))}
            {basics.resumeUrl && (
              <a
                href={basics.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className={`hover:opacity-100 transition-opacity inline-flex items-center gap-1 font-bold underline underline-offset-4 ${headingText}`}
              >
                <span>Curriculum Vitae</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            )}
          </div>
        </header>

        {/* Selected Works / Projects */}
        <section className="space-y-8">
          <div className={`flex items-baseline justify-between border-b pb-3 ${dividerBorder}`}>
            <h2 className={`font-serif text-2xl italic ${headingText}`}>
              Selected Works
            </h2>
            <span className={`text-xs font-mono ${mutedText}`}>
              01 — {String(projects.length).padStart(2, '0')}
            </span>
          </div>

          <div className={`divide-y ${dividerBorder}`}>
            {projects.map((proj, idx) => (
              <article
                key={proj.id}
                onClick={() => setInspectProject(proj)}
                className="py-8 first:pt-2 space-y-4 group cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div className="flex items-baseline gap-3">
                    <span className={`text-xs font-mono ${mutedText}`}>
                      {String(idx + 1).padStart(2, '0')}.
                    </span>
                    <h3 className={`text-xl font-medium group-hover:underline underline-offset-4 transition-all ${headingText}`}>
                      {proj.title}
                    </h3>
                    {proj.featured && (
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border border-neutral-700/60 opacity-70">
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono" onClick={(e) => e.stopPropagation()}>
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex items-center gap-1 hover:opacity-75 transition-opacity font-medium ${headingText}`}
                      >
                        <span>Visit Site</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}
                    {proj.repoUrl && (
                      <a
                        href={proj.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex items-center gap-1 hover:opacity-100 transition-opacity ${mutedText}`}
                      >
                        <span>Source</span>
                        <ArrowUpRight className="w-3 h-3 opacity-60" />
                      </a>
                    )}
                  </div>
                </div>

                <p className={`text-sm leading-relaxed max-w-2xl ${bodyText}`}>
                  {proj.description}
                </p>

                {proj.tags && proj.tags.length > 0 && (
                  <div className={`flex flex-wrap items-center gap-2 text-xs font-mono pt-1 ${mutedText}`}>
                    {proj.tags.map((tag, tIdx) => (
                      <span key={tIdx}>
                        {tag}
                        {tIdx < proj.tags.length - 1 && <span className="ml-2 opacity-50">/</span>}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="space-y-8">
          <div className={`flex items-baseline justify-between border-b pb-3 ${dividerBorder}`}>
            <h2 className={`font-serif text-2xl italic ${headingText}`}>
              Career & Trajectory
            </h2>
            <span className={`text-xs font-mono ${mutedText}`}>Experience</span>
          </div>

          <div className="space-y-10">
            {experience.map((exp, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <h3 className={`text-base font-semibold ${headingText}`}>
                      {exp.role}
                    </h3>
                    <p className={`text-sm font-serif italic opacity-75`}>
                      {exp.company}
                    </p>
                  </div>
                  <span className={`text-xs font-mono tabular-nums ${mutedText}`}>
                    {exp.startDate} — {exp.current ? 'Present' : exp.endDate || 'Present'}
                  </span>
                </div>

                <ul className="space-y-2 text-xs md:text-sm pl-4 list-disc list-outside marker:text-neutral-400">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className={`leading-relaxed ${bodyText}`}>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Directory */}
        <section className={`border-t pt-12 space-y-6 ${dividerBorder}`}>
          <h2 className={`font-serif text-2xl italic ${headingText}`}>
            Technical Disciplines
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-mono">
            {skills.map((category, idx) => (
              <div key={idx} className="space-y-1.5">
                <span className={`uppercase tracking-wider font-bold ${headingText}`}>
                  {category.category}
                </span>
                <p className={`leading-relaxed ${mutedText}`}>
                  {category.items.join(' · ')}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className={`border-t pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono ${dividerBorder} ${mutedText}`}>
          <span>{basics.name} · Minimal Slate Spec</span>
          <span>Updated {meta.lastUpdated}</span>
        </footer>
      </div>

      {/* Case Study Modal */}
      {inspectProject && (
        <ProjectCaseStudyModal
          project={inspectProject}
          onClose={() => setInspectProject(null)}
          theme={isDark ? 'dark' : 'light'}
        />
      )}
    </div>
  );
};
