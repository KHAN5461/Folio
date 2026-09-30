import React, { useState, useRef, useEffect } from 'react';
import { PortfolioData } from '../../types/portfolio';
import { ExternalLink, Github, Mail, MapPin, Folder, CornerDownRight, Terminal as TerminalIcon } from 'lucide-react';

interface TemplateProps {
  data: PortfolioData;
}

interface CommandLog {
  id: string;
  command: string;
  output: React.ReactNode;
}

export const TerminalDarkTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { basics, skills, projects, experience } = data;
  const [activeTab, setActiveTab] = useState<'all' | 'projects' | 'experience' | 'skills'>('all');
  const [cliInput, setCliInput] = useState('');
  const [commandLogs, setCommandLogs] = useState<CommandLog[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = cliInput.trim().toLowerCase();
    if (!cmd) return;

    let output: React.ReactNode = null;

    if (cmd === 'help') {
      output = (
        <div className="space-y-1 text-slate-300">
          <div>Available commands:</div>
          <div>  <span className="text-emerald-400">whoami</span>      - Display author bio and location</div>
          <div>  <span className="text-emerald-400">projects</span>    - List portfolio engineering works</div>
          <div>  <span className="text-emerald-400">experience</span>  - Show career trajectory & accomplishments</div>
          <div>  <span className="text-emerald-400">skills</span>      - Print comprehensive technical stack</div>
          <div>  <span className="text-emerald-400">contact</span>     - Output email and social coordinates</div>
          <div>  <span className="text-emerald-400">clear</span>       - Clear terminal session history</div>
        </div>
      );
    } else if (cmd === 'whoami') {
      output = (
        <div className="text-slate-300 space-y-1">
          <div className="text-white font-bold">{basics.name} · {basics.headline}</div>
          <div className="text-slate-400">{basics.bio}</div>
        </div>
      );
    } else if (cmd === 'projects') {
      output = (
        <div className="space-y-2 text-slate-300">
          {projects.map((p) => (
            <div key={p.id}>
              <span className="text-cyan-400 font-bold">{p.title}</span>: {p.description} [{p.tags.join(', ')}]
            </div>
          ))}
        </div>
      );
    } else if (cmd === 'skills') {
      output = (
        <div className="space-y-1 text-slate-300">
          {skills.map((s, i) => (
            <div key={i}>
              <span className="text-amber-400 font-bold">{s.category}:</span> {s.items.join(' · ')}
            </div>
          ))}
        </div>
      );
    } else if (cmd === 'experience') {
      output = (
        <div className="space-y-2 text-slate-300">
          {experience.map((exp, i) => (
            <div key={i}>
              <span className="text-emerald-400 font-bold">{exp.role}</span> @ {exp.company} ({exp.startDate} - {exp.current ? 'Present' : exp.endDate})
            </div>
          ))}
        </div>
      );
    } else if (cmd === 'contact') {
      output = (
        <div className="text-slate-300">
          Email: <a href={`mailto:${basics.email}`} className="text-cyan-400 underline">{basics.email}</a>
          <br />
          Socials: {basics.socials.map((s) => s.platform).join(', ')}
        </div>
      );
    } else if (cmd === 'clear') {
      setCommandLogs([]);
      setCliInput('');
      return;
    } else {
      output = (
        <div className="text-red-400">
          command not found: {cmd}. Type <span className="text-emerald-300 underline cursor-pointer" onClick={() => setCliInput('help')}>help</span> for available commands.
        </div>
      );
    }

    setCommandLogs((prev) => [
      ...prev,
      {
        id: `cmd-${Date.now()}`,
        command: cliInput,
        output,
      },
    ]);
    setCliInput('');
  };

  return (
    <div className="min-h-full bg-[#0a0d14] text-[#d1d5db] font-mono p-4 md:p-8 selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Terminal Window Chrome */}
      <div className="max-w-4xl mx-auto border border-emerald-900/60 bg-[#0c1017] rounded-2xl overflow-hidden shadow-2xl shadow-emerald-950/20">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#080c12] border-b border-emerald-900/40 select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            <span className="ml-3 text-xs text-emerald-500/70 font-semibold tracking-wide">
              {basics.name.toLowerCase().replace(/\s+/g, '-')}@folio-sys: ~
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-emerald-500/50">
            <span>interactive-zsh</span>
            <span>UTF-8</span>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-6 md:p-8 space-y-8">
          {/* Prompt 1: Whoami / Intro */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 text-sm">
              <span className="text-emerald-500">➜</span>
              <span className="text-cyan-400">~</span>
              <span className="text-slate-300">whoami --verbose</span>
            </div>

            <div className="pl-4 border-l-2 border-emerald-800/40 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
                  {basics.name}
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/50 font-normal">
                    system ready
                  </span>
                </h1>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  {basics.location.city && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      {basics.location.city}, {basics.location.country}
                    </span>
                  )}
                  {basics.email && (
                    <a
                      href={`mailto:${basics.email}`}
                      className="hover:text-emerald-300 transition-colors flex items-center gap-1"
                    >
                      <Mail className="w-3.5 h-3.5 text-emerald-400" />
                      {basics.email}
                    </a>
                  )}
                </div>
              </div>

              <p className="text-emerald-300/90 text-sm font-medium">
                {basics.headline}
              </p>

              <p className="text-slate-400 text-xs md:text-sm leading-relaxed max-w-3xl">
                {basics.bio}
              </p>

              {/* Socials as CLI links */}
              {basics.socials && basics.socials.length > 0 && (
                <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
                  <span className="text-slate-500">connect:</span>
                  {basics.socials.map((s, idx) => (
                    <a
                      key={idx}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 underline decoration-cyan-700/60 underline-offset-4 flex items-center gap-1 transition-colors"
                    >
                      <span>[{s.platform}]</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                    </a>
                  ))}
                  {basics.resumeUrl && (
                    <a
                      href={basics.resumeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-amber-400 hover:text-amber-300 underline decoration-amber-700/60 underline-offset-4 flex items-center gap-1 transition-colors"
                    >
                      <span>[resume.pdf]</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Interactive Command Switcher */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-emerald-950/80">
            <span className="text-xs text-slate-500 mr-2">filter:</span>
            {(['all', 'projects', 'experience', 'skills'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs px-2.5 py-1 rounded transition-colors ${
                  activeTab === tab
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/70'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                ${' '}
                {tab === 'all'
                  ? 'ls -la'
                  : tab === 'projects'
                  ? 'cat projects.json'
                  : tab === 'experience'
                  ? 'git log --exp'
                  : 'env skills'}
              </button>
            ))}
          </div>

          {/* Section: Projects */}
          {(activeTab === 'all' || activeTab === 'projects') && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 text-sm">
                <span className="text-emerald-500">➜</span>
                <span className="text-cyan-400">~</span>
                <span className="text-slate-300">cat ./projects.json | jq .</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4 border-l-2 border-emerald-800/40">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-4 rounded-lg bg-[#080c12]/90 border border-emerald-900/40 hover:border-emerald-600/50 transition-colors flex flex-col justify-between group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-2">
                          <Folder className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{proj.title}</span>
                        </h3>
                        {proj.featured && (
                          <span className="text-[10px] text-amber-400 border border-amber-900/60 px-1.5 py-0.2 rounded bg-amber-950/40 shrink-0">
                            ★ featured
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed">
                        {proj.description}
                      </p>

                      {proj.tags && proj.tags.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] text-emerald-500/80">
                          {proj.tags.map((t, idx) => (
                            <span key={idx} className="bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-900/30">
                              #{t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3 pt-3 mt-2 border-t border-emerald-950 text-xs">
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                        >
                          <span>demo</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                      {proj.repoUrl && (
                        <a
                          href={proj.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors"
                        >
                          <Github className="w-3 h-3" />
                          <span>src</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Experience */}
          {(activeTab === 'all' || activeTab === 'experience') && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 text-sm">
                <span className="text-emerald-500">➜</span>
                <span className="text-cyan-400">~</span>
                <span className="text-slate-300">git log --oneline --graph career</span>
              </div>

              <div className="space-y-5 pl-4 border-l-2 border-emerald-800/40">
                {experience.map((exp, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-400 font-bold text-xs">*</span>
                        <span className="text-white text-sm font-semibold">{exp.role}</span>
                        <span className="text-slate-500">@</span>
                        <span className="text-emerald-300 text-sm">{exp.company}</span>
                      </div>
                      <span className="text-xs text-slate-500 font-mono">
                        [{exp.startDate} → {exp.current ? 'HEAD' : exp.endDate || 'Present'}]
                      </span>
                    </div>

                    <ul className="space-y-1.5 pl-4 border-l border-emerald-950/80 text-xs text-slate-300">
                      {exp.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="leading-relaxed flex items-start gap-2">
                          <CornerDownRight className="w-3 h-3 text-emerald-500/70 mt-0.5 shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Skills */}
          {(activeTab === 'all' || activeTab === 'skills') && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 text-sm">
                <span className="text-emerald-500">➜</span>
                <span className="text-cyan-400">~</span>
                <span className="text-slate-300">printenv --skills</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pl-4 border-l-2 border-emerald-800/40">
                {skills.map((category, idx) => (
                  <div key={idx} className="p-3 rounded bg-[#080c12] border border-emerald-950 space-y-2">
                    <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                      {category.category}
                    </div>
                    <div className="flex flex-wrap gap-1.5 text-xs text-slate-300">
                      {category.items.map((item, itemIdx) => (
                        <span key={itemIdx} className="text-slate-400">
                          {item}
                          {itemIdx < category.items.length - 1 && (
                            <span className="text-emerald-800 ml-1.5">/</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interactive User CLI Execution History */}
          {commandLogs.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-emerald-950">
              {commandLogs.map((log) => (
                <div key={log.id} className="space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs">
                    <span>➜</span>
                    <span className="text-cyan-400">~</span>
                    <span className="text-slate-200">{log.command}</span>
                  </div>
                  <div className="pl-4 border-l border-emerald-800/60 text-xs">
                    {log.output}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Live Interactive CLI Command Input Form */}
          <form onSubmit={handleCommandSubmit} className="pt-4 border-t border-emerald-950 flex items-center gap-2 text-xs">
            <span className="text-emerald-400">➜</span>
            <span className="text-cyan-400">~</span>
            <input
              ref={inputRef}
              type="text"
              value={cliInput}
              onChange={(e) => setCliInput(e.target.value)}
              placeholder="Type 'help', 'whoami', 'skills', 'projects', 'contact'..."
              className="flex-1 bg-transparent text-emerald-300 placeholder-emerald-800/60 focus:outline-none font-mono text-xs"
            />
            <span className="text-slate-600 text-[10px] hidden sm:inline">
              [Enter to run]
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};
