import React, { useState } from 'react';
import { PortfolioData, ProjectItem } from '../../types/portfolio';
import { ArrowUpRight, Github, ExternalLink, Sparkles, X, Image as ImageIcon } from 'lucide-react';

interface TemplateProps {
  data: PortfolioData;
}

export const CreativeGridTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { basics, skills, projects, experience } = data;
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <div className="min-h-full bg-[#0c0d12] text-[#f3f4f6] font-sans p-4 md:p-8 lg:p-12 selection:bg-amber-500 selection:text-black">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Creative Hero Bento Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Title Card */}
          <div className="lg:col-span-2 p-8 md:p-10 rounded-3xl bg-[#13151f] border border-neutral-800/80 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/15 transition-all duration-700"></div>

            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
                <span className="text-xs uppercase tracking-widest text-amber-400/90 font-mono">
                  Available for Select Commissions & Roles
                </span>
              </div>

              <h1 className="font-['Syne',sans-serif] text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.05]">
                {basics.name}
              </h1>

              <p className="text-lg md:text-xl text-neutral-300 font-medium max-w-xl">
                {basics.headline}
              </p>
            </div>

            <div className="pt-8 space-y-4 relative z-10">
              <p className="text-sm md:text-base text-neutral-400 leading-relaxed max-w-xl">
                {basics.bio}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-neutral-300">
                {basics.socials.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-amber-400 transition-colors inline-flex items-center gap-1.5 underline underline-offset-4 decoration-neutral-700 hover:decoration-amber-400"
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
                    className="text-amber-400 hover:text-amber-300 font-semibold transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Resume</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Quick Snapshot / Location Card */}
          <div className="p-8 rounded-3xl bg-[#13151f] border border-neutral-800/80 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-neutral-800 border border-neutral-700/60 flex items-center justify-center">
                {basics.avatarUrl ? (
                  <img
                    src={basics.avatarUrl}
                    alt={basics.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <Sparkles className="w-6 h-6 text-amber-400" />
                )}
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-wider font-mono text-neutral-400">
                  Location & Base
                </h3>
                <p className="text-lg font-semibold text-white mt-1">
                  {basics.location.city}, {basics.location.country}
                </p>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-wider font-mono text-neutral-400">
                  Inquiries
                </h3>
                <a
                  href={`mailto:${basics.email}`}
                  className="text-sm font-mono text-amber-400 hover:underline block truncate mt-1"
                >
                  {basics.email}
                </a>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-800/80">
              <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest block">
                Last Compiled
              </span>
              <span className="text-xs font-mono text-neutral-300">
                {data.meta.lastUpdated}
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Project Bento Showcase */}
        <section className="space-y-6">
          <div className="flex items-baseline justify-between">
            <h2 className="font-['Syne',sans-serif] text-2xl md:text-3xl font-bold text-white tracking-tight">
              Featured Case Studies & Work
            </h2>
            <span className="text-xs font-mono text-amber-400">
              {projects.length} Showcase Items
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj, idx) => {
              const isHeroCard = idx === 0 || (proj.featured && idx === 1);
              return (
                <div
                  key={proj.id}
                  onClick={() => setSelectedProject(proj)}
                  className={`p-6 md:p-8 rounded-3xl bg-[#13151f] border border-neutral-800/80 hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between cursor-pointer group ${
                    isHeroCard ? 'md:col-span-2' : 'col-span-1'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Media thumbnail if present */}
                    {proj.media && proj.media.length > 0 && (
                      <div className="w-full h-44 sm:h-56 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 relative group-hover:scale-[1.01] transition-transform">
                        <img
                          src={proj.media[0].url}
                          alt={proj.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}

                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-['Syne',sans-serif] text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                          {proj.title}
                        </h3>
                        <p className="text-sm text-neutral-400 leading-relaxed mt-2 line-clamp-3">
                          {proj.description}
                        </p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-neutral-800 group-hover:bg-amber-500 group-hover:text-black flex items-center justify-center shrink-0 transition-colors">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-4 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-400">
                      {proj.tags?.map((t, tIdx) => (
                        <span key={tIdx}>
                          {t}
                          {tIdx < (proj.tags?.length || 0) - 1 && (
                            <span className="text-neutral-600 ml-2">·</span>
                          )}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono" onClick={(e) => e.stopPropagation()}>
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-amber-400 hover:underline flex items-center gap-1"
                        >
                          <span>Live</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {proj.repoUrl && (
                        <a
                          href={proj.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-neutral-400 hover:text-white flex items-center gap-1"
                        >
                          <Github className="w-3 h-3" />
                          <span>Code</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Experience & Skills Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Experience Card */}
          <div className="p-8 rounded-3xl bg-[#13151f] border border-neutral-800/80 space-y-6">
            <h2 className="font-['Syne',sans-serif] text-2xl font-bold text-white tracking-tight">
              Selected Engagements
            </h2>

            <div className="space-y-6">
              {experience.map((exp, idx) => (
                <div key={idx} className="space-y-2 border-b border-neutral-800/80 pb-5 last:border-b-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="text-base font-semibold text-white">
                      {exp.role} <span className="text-amber-400">@ {exp.company}</span>
                    </h3>
                    <span className="text-xs font-mono text-neutral-400">
                      {exp.startDate} — {exp.current ? 'Present' : exp.endDate || 'Present'}
                    </span>
                  </div>

                  <ul className="space-y-1.5 pl-4 border-l border-neutral-700/60 text-xs text-neutral-400">
                    {exp.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="leading-relaxed">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Skills & Tooling Card */}
          <div className="p-8 rounded-3xl bg-[#13151f] border border-neutral-800/80 space-y-6">
            <h2 className="font-['Syne',sans-serif] text-2xl font-bold text-white tracking-tight">
              Mediums & Capabilities
            </h2>

            <div className="space-y-6">
              {skills.map((skillGroup, idx) => (
                <div key={idx} className="space-y-2">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400">
                    {skillGroup.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((item, itemIdx) => (
                      <span
                        key={itemIdx}
                        className="px-3 py-1 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 font-mono"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lightbox / Modal for Project Details */}
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="bg-[#151722] border border-neutral-700 max-w-2xl w-full rounded-3xl p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-['Syne',sans-serif] text-2xl font-bold text-white">
                    {selectedProject.title}
                  </h3>
                  {selectedProject.tags && (
                    <div className="flex flex-wrap gap-2 text-xs font-mono text-amber-400 mt-2">
                      {selectedProject.tags.join(' · ')}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {selectedProject.media && selectedProject.media.length > 0 && (
                <div className="rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800">
                  <img
                    src={selectedProject.media[0].url}
                    alt={selectedProject.title}
                    referrerPolicy="no-referrer"
                    className="w-full max-h-80 object-cover"
                  />
                  {selectedProject.media[0].caption && (
                    <p className="p-3 text-xs text-neutral-400 font-mono bg-neutral-900/90 border-t border-neutral-800">
                      {selectedProject.media[0].caption}
                    </p>
                  )}
                </div>
              )}

              <p className="text-sm text-neutral-300 leading-relaxed">
                {selectedProject.description}
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-neutral-800">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-amber-500 text-black font-semibold text-xs flex items-center gap-1.5 hover:bg-amber-400 transition-colors"
                  >
                    <span>Visit Live Project</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
                {selectedProject.repoUrl && (
                  <a
                    href={selectedProject.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-neutral-800 text-white text-xs flex items-center gap-1.5 hover:bg-neutral-700 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View Repository</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
