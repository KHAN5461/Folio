import React, { useState } from 'react';
import { PortfolioData, ProjectItem } from '../../types/portfolio';
import {
  ExternalLink,
  Github,
  Mail,
  MapPin,
  Briefcase,
  Layers,
  ArrowUpRight,
  Code2,
  CheckCircle2,
  Copy,
  Check,
  Filter,
} from 'lucide-react';
import { ProjectCaseStudyModal } from '../studio/ProjectCaseStudyModal';

interface TemplateProps {
  data: PortfolioData;
}

export const ModernBentoTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { basics, skills, projects, experience, meta } = data;
  const isLight = meta.theme.mode === 'light';

  const [activeFilterTag, setActiveFilterTag] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [inspectProject, setInspectProject] = useState<ProjectItem | null>(null);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!basics.email) return;
    navigator.clipboard.writeText(basics.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const filteredProjects = activeFilterTag
    ? projects.filter((p) => p.tags.some((t) => t.toLowerCase() === activeFilterTag.toLowerCase()))
    : projects;

  const containerBg = isLight ? 'bg-[#f8fafc] text-[#0f172a]' : 'bg-[#0b0f19] text-[#e2e8f0]';
  const cardBg = isLight
    ? 'bg-white border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)]'
    : 'bg-[#111726] border-slate-800/80';
  const mutedText = isLight ? 'text-slate-500' : 'text-slate-400';
  const headingText = isLight ? 'text-slate-900' : 'text-white';
  const tagBg = isLight ? 'bg-slate-100 border-slate-200 text-slate-700' : 'bg-slate-900 border-slate-800 text-slate-300';
  const dividerBorder = isLight ? 'border-slate-150' : 'border-slate-800/80';

  return (
    <div className={`min-h-full font-sans p-4 md:p-8 lg:p-12 transition-colors selection:bg-indigo-500 selection:text-white ${containerBg}`}>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Bento Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Main Profile Bento Box (col-span-2) */}
          <div className={`md:col-span-2 lg:col-span-2 p-6 md:p-8 rounded-3xl border flex flex-col justify-between relative overflow-hidden ${cardBg}`}>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                {basics.avatarUrl ? (
                  <img
                    src={basics.avatarUrl}
                    alt={basics.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-2xl object-cover border border-slate-300 dark:border-slate-700/80 shadow-md"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xl">
                    {basics.name.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
                      Open to Opportunities
                    </span>
                  </div>
                  <h1 className={`text-2xl md:text-3xl font-extrabold tracking-tight ${headingText}`}>
                    {basics.name}
                  </h1>
                </div>
              </div>

              <p className="text-sm md:text-base font-semibold text-indigo-600 dark:text-indigo-300">
                {basics.headline}
              </p>

              <p className={`text-xs md:text-sm leading-relaxed ${mutedText}`}>
                {basics.bio}
              </p>
            </div>

            <div className={`pt-6 mt-4 border-t flex flex-wrap items-center justify-between gap-3 text-xs ${dividerBorder}`}>
              <div className={`flex items-center gap-3 ${mutedText}`}>
                {basics.location.city && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                    {basics.location.city}, {basics.location.country}
                  </span>
                )}
                {basics.email && (
                  <button
                    onClick={handleCopyEmail}
                    className="hover:text-indigo-500 transition-colors flex items-center gap-1 cursor-pointer"
                    title="Click to copy email address"
                  >
                    <Mail className="w-3.5 h-3.5 text-indigo-500" />
                    <span>{basics.email}</span>
                    {copiedEmail ? (
                      <Check className="w-3 h-3 text-emerald-500 ml-0.5" />
                    ) : (
                      <Copy className="w-2.5 h-2.5 opacity-50 ml-0.5" />
                    )}
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3 font-mono font-medium">
                {basics.socials.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-indigo-500 transition-colors"
                  >
                    {s.platform}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Metrics / Stats Card */}
          <div className={`p-6 rounded-3xl border flex flex-col justify-between ${cardBg}`}>
            <span className={`text-xs font-mono uppercase tracking-wider font-semibold ${mutedText}`}>
              Overview Snapshot
            </span>

            <div className="grid grid-cols-2 gap-4 py-4">
              <div>
                <span className={`text-2xl md:text-3xl font-bold font-mono tabular-nums ${headingText}`}>
                  {projects.length}
                </span>
                <p className={`text-xs mt-1 ${mutedText}`}>Shipped Projects</p>
              </div>
              <div>
                <span className="text-2xl md:text-3xl font-bold font-mono text-indigo-600 dark:text-indigo-400 tabular-nums">
                  {experience.length}
                </span>
                <p className={`text-xs mt-1 ${mutedText}`}>Roles Held</p>
              </div>
              <div>
                <span className="text-2xl md:text-3xl font-bold font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
                  {skills.reduce((acc, cat) => acc + cat.items.length, 0)}
                </span>
                <p className={`text-xs mt-1 ${mutedText}`}>Core Tech Skills</p>
              </div>
              <div>
                <span className="text-2xl md:text-3xl font-bold font-mono text-amber-600 dark:text-amber-400 tabular-nums">
                  {data.meta.version}
                </span>
                <p className={`text-xs mt-1 ${mutedText}`}>Schema Spec</p>
              </div>
            </div>

            {basics.resumeUrl ? (
              <a
                href={basics.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-indigo-600/20"
              >
                <span>Download Resume</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            ) : (
              <div className={`text-[11px] font-mono ${mutedText}`}>
                Last updated: {data.meta.lastUpdated}
              </div>
            )}
          </div>

          {/* Skills Highlight Box */}
          <div className={`p-6 rounded-3xl border flex flex-col justify-between ${cardBg}`}>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Code2 className="w-4 h-4 text-indigo-500" />
                <h3 className={`text-xs font-mono uppercase tracking-wider font-bold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  Click to Filter Projects
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {skills.flatMap((s) => s.items).slice(0, 10).map((skill, idx) => {
                  const isSelected = activeFilterTag?.toLowerCase() === skill.toLowerCase();
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveFilterTag(isSelected ? null : skill)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                          : tagBg
                      }`}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className={`pt-4 border-t text-[11px] font-mono ${dividerBorder} ${mutedText} flex items-center justify-between`}>
              <span>+{Math.max(0, skills.flatMap((s) => s.items).length - 10)} more</span>
              {activeFilterTag && (
                <button
                  onClick={() => setActiveFilterTag(null)}
                  className="text-indigo-500 font-bold hover:underline"
                >
                  Clear filter
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Featured Projects Bento Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className={`text-lg md:text-xl font-bold tracking-tight flex items-center gap-2 ${headingText}`}>
                <Layers className="w-5 h-5 text-indigo-500" />
                <span>Projects & Engineering Works</span>
              </h2>
              {activeFilterTag && (
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-bold flex items-center gap-1">
                  <Filter className="w-3 h-3" />
                  <span>#{activeFilterTag}</span>
                  <button onClick={() => setActiveFilterTag(null)} className="ml-1 hover:text-red-500">×</button>
                </span>
              )}
            </div>
            <span className={`text-xs font-mono ${mutedText}`}>
              Showing {filteredProjects.length} of {projects.length} Works
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => setInspectProject(proj)}
                className={`p-6 rounded-3xl border hover:border-indigo-500/50 transition-all flex flex-col justify-between group cursor-pointer ${cardBg}`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className={`text-base font-bold group-hover:text-indigo-500 transition-colors ${headingText}`}>
                      {proj.title}
                    </h3>
                    {proj.featured && (
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20 font-mono font-bold shrink-0">
                        Featured
                      </span>
                    )}
                  </div>

                  <p className={`text-xs md:text-sm leading-relaxed ${mutedText}`}>
                    {proj.description}
                  </p>

                  {proj.tags && proj.tags.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs font-mono opacity-80">
                      {proj.tags.map((t, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveFilterTag(t)}
                          className={`hover:text-indigo-500 transition-colors cursor-pointer ${
                            activeFilterTag?.toLowerCase() === t.toLowerCase() ? 'font-bold text-indigo-500' : ''
                          }`}
                        >
                          #{t}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div
                  onClick={(e) => e.stopPropagation()}
                  className={`pt-4 mt-4 border-t flex items-center justify-between text-xs font-mono ${dividerBorder}`}
                >
                  <div className="flex items-center gap-3">
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-semibold"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {proj.repoUrl && (
                      <a
                        href={proj.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-indigo-500 flex items-center gap-1 transition-colors"
                      >
                        <Github className="w-3 h-3" />
                        <span>Source</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className={`text-lg md:text-xl font-bold tracking-tight flex items-center gap-2 ${headingText}`}>
              <Briefcase className="w-5 h-5 text-indigo-500" />
              <span>Work Experience</span>
            </h2>
            <span className={`text-xs font-mono ${mutedText}`}>Career Trajectory</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {experience.map((exp, idx) => (
              <div key={idx} className={`p-6 rounded-3xl border space-y-3 ${cardBg}`}>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <h3 className={`text-base font-bold ${headingText}`}>{exp.role}</h3>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-mono font-semibold mt-0.5">
                      {exp.company}
                    </p>
                  </div>
                  <span className={`text-xs font-mono tabular-nums ${mutedText}`}>
                    {exp.startDate} — {exp.current ? 'Present' : exp.endDate || 'Present'}
                  </span>
                </div>

                <ul className="space-y-2 text-xs pt-1">
                  {exp.bullets.map((b, bIdx) => (
                    <li key={bIdx} className={`leading-relaxed flex items-start gap-2.5 ${mutedText}`}>
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Complete Skills Directory */}
        <section className={`p-6 md:p-8 rounded-3xl border space-y-6 ${cardBg}`}>
          <h2 className={`text-lg font-bold tracking-tight ${headingText}`}>
            Comprehensive Skills Matrix
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {skills.map((cat, idx) => (
              <div key={idx} className="space-y-2.5">
                <h3 className="text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold">
                  {cat.category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {cat.items.map((item, itemIdx) => (
                    <button
                      key={itemIdx}
                      onClick={() => setActiveFilterTag(item)}
                      className={`px-3 py-1 rounded-xl text-xs font-mono border transition-all cursor-pointer ${
                        activeFilterTag?.toLowerCase() === item.toLowerCase()
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                          : tagBg
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className={`pt-6 border-t flex flex-col sm:flex-row items-center justify-between text-xs font-mono gap-2 ${dividerBorder} ${mutedText}`}>
          <span>{basics.name} · Built with FolioCraft Universal Schema</span>
          <span>Last Updated {data.meta.lastUpdated}</span>
        </footer>
      </div>

      {/* Case Study Modal */}
      {inspectProject && (
        <ProjectCaseStudyModal
          project={inspectProject}
          onClose={() => setInspectProject(null)}
          theme={isLight ? 'light' : 'dark'}
        />
      )}
    </div>
  );
};
