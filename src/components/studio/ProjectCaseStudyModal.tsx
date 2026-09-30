import React, { useEffect } from 'react';
import { ProjectItem } from '../../types/portfolio';
import {
  ExternalLink,
  Github,
  X,
  Layers,
  Sparkles,
  ArrowUpRight,
  Code2,
  Calendar,
} from 'lucide-react';
import { M3Button, M3Chip, M3IconButton } from '../m3';

interface ProjectCaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  theme?: 'dark' | 'light';
}

export const ProjectCaseStudyModal: React.FC<ProjectCaseStudyModalProps> = ({
  project,
  onClose,
  theme = 'dark',
}) => {
  const isDark = theme === 'dark';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 select-none animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className={`w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[85vh] transition-all ${
          isDark
            ? 'bg-[#111622] border-[#253246] text-slate-100 shadow-black/60'
            : 'bg-white border-slate-250 text-slate-800 shadow-2xl'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between ${
            isDark ? 'border-[#222c3d] bg-[#0c101a]' : 'border-slate-200 bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-500 font-bold block">
                Engineering Case Study
              </span>
              <h2 className="text-base font-extrabold tracking-tight truncate max-w-md">
                {project.title}
              </h2>
            </div>
          </div>

          <M3IconButton variant="standard" size="sm" onClick={onClose} title="Close (ESC)">
            <X className="w-4 h-4 text-slate-400" />
          </M3IconButton>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-xs leading-relaxed">
          {/* Status & Featured Banner */}
          {project.featured && (
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center gap-2 font-mono text-[11px] font-semibold">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>Selected Key Showcase Project in Portfolio Catalog</span>
            </div>
          )}

          {/* Core Architectural Narrative */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500">
              System Architecture & Problem Statement
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
              {project.description}
            </p>
          </div>

          {/* Tech Stack Chips */}
          {project.tags && project.tags.length > 0 && (
            <div className="space-y-2.5">
              <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500">
                Technologies & Technical Focus
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1 rounded-xl text-xs font-mono font-medium border ${
                      isDark
                        ? 'bg-slate-800/80 border-slate-700 text-slate-200'
                        : 'bg-slate-100 border-slate-250 text-slate-700'
                    }`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Links & Production URLs */}
          <div className="pt-4 border-t border-slate-700/15 flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-indigo-600/25 transition-all active:scale-95"
              >
                <span>Launch Production Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className={`px-5 py-2.5 rounded-full border font-bold text-xs flex items-center gap-2 transition-all active:scale-95 ${
                  isDark
                    ? 'border-slate-700 bg-slate-800/70 hover:bg-slate-800 text-slate-200'
                    : 'border-slate-300 bg-white hover:bg-slate-100 text-slate-700'
                }`}
              >
                <Github className="w-3.5 h-3.5" />
                <span>Source Repository</span>
              </a>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div
          className={`px-6 py-3 border-t text-[11px] font-mono flex items-center justify-between ${
            isDark ? 'border-[#222c3d] text-slate-500' : 'border-slate-200 text-slate-400'
          }`}
        >
          <span>FolioCraft Standard Portfolio Schema</span>
          <button
            onClick={onClose}
            className="hover:text-indigo-500 transition-colors font-bold cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
