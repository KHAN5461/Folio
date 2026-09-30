import React, { useState } from 'react';
import { PortfolioData, validatePortfolioData, createBlankPortfolio } from '../../types/portfolio';
import { SAMPLE_PROFILES } from '../../data/sampleProfiles';
import {
  Github,
  FileCode,
  Users,
  Upload,
  X,
  Loader2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

interface ImportModalProps {
  isOpen: boolean;
  theme: 'dark' | 'light';
  onClose: () => void;
  onImport: (importedData: PortfolioData) => void;
}

export const ImportModal: React.FC<ImportModalProps> = ({
  isOpen,
  theme,
  onClose,
  onImport,
}) => {
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState<'github' | 'json' | 'samples'>('github');
  const [githubUser, setGithubUser] = useState('');
  const [githubLoading, setGithubLoading] = useState(false);
  const [githubError, setGithubError] = useState<string | null>(null);

  const [jsonInput, setJsonInput] = useState('');
  const [jsonError, setJsonError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFetchGithub = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!githubUser.trim()) return;
    setGithubLoading(true);
    setGithubError(null);

    try {
      const res = await fetch(`/api/github/${encodeURIComponent(githubUser.trim())}`);
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to fetch GitHub profile');
      }
      const portfolio = await res.json();
      onImport(portfolio);
      onClose();
    } catch (err: any) {
      setGithubError(err.message || 'Error fetching GitHub details');
    } finally {
      setGithubLoading(false);
    }
  };

  const handleJsonSubmit = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const validation = validatePortfolioData(parsed);
      if (!validation.valid) {
        setJsonError(`Invalid Portfolio JSON: ${validation.errors.join(', ')}`);
        return;
      }
      onImport(parsed);
      onClose();
    } catch (err: any) {
      setJsonError(`JSON Parse Error: ${err.message}`);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);
        const validation = validatePortfolioData(parsed);
        if (!validation.valid) {
          setJsonError(`Invalid Portfolio JSON: ${validation.errors.join(', ')}`);
          return;
        }
        onImport(parsed);
        onClose();
      } catch (err: any) {
        setJsonError(`Failed to parse uploaded JSON file: ${err.message}`);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 transition-all"
      onClick={onClose}
    >
      <div
        className={`max-w-xl w-full rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border transition-colors ${
          isDark
            ? 'bg-[#141a26] border-[#2b3548] text-slate-100'
            : 'bg-white border-slate-200 text-slate-800'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className={`p-5 border-b flex items-center justify-between ${
            isDark ? 'border-[#222c3d] bg-[#111622]' : 'border-slate-100 bg-slate-50/70'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold">Magic Data Ingestion</h2>
              <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Populate your universal portfolio.json schema with 1-click
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors ${
              isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-500'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switcher (M3 segmented bar) */}
        <div
          className={`flex p-1.5 mx-5 mt-4 rounded-full border ${
            isDark ? 'bg-[#0f1420] border-[#222c3d]' : 'bg-slate-100 border-slate-200'
          }`}
        >
          <button
            onClick={() => setActiveTab('github')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-full flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'github'
                ? isDark
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white text-indigo-600 shadow-sm'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub Sync</span>
          </button>

          <button
            onClick={() => setActiveTab('samples')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-full flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'samples'
                ? isDark
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white text-indigo-600 shadow-sm'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Presets</span>
          </button>

          <button
            onClick={() => setActiveTab('json')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-full flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'json'
                ? isDark
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white text-indigo-600 shadow-sm'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>JSON Upload</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs font-sans">
          {/* GitHub Tab */}
          {activeTab === 'github' && (
            <div className="space-y-4">
              <p className="opacity-80 leading-relaxed font-medium">
                Enter any public GitHub handle. FolioCraft fetches star counts, repositories, languages, bio, and avatar to construct your portfolio.
              </p>

              <form onSubmit={handleFetchGithub} className="space-y-3">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span
                      className={`absolute left-3.5 top-1/2 -translate-y-1/2 font-mono ${
                        isDark ? 'text-slate-500' : 'text-slate-400'
                      }`}
                    >
                      github.com/
                    </span>
                    <input
                      type="text"
                      value={githubUser}
                      onChange={(e) => setGithubUser(e.target.value)}
                      placeholder="torvalds"
                      className={`w-full rounded-2xl pl-28 pr-4 py-2.5 font-mono text-xs border focus:outline-none focus:ring-2 focus:ring-indigo-500/40 ${
                        isDark
                          ? 'bg-[#0f1420] border-[#222c3d] text-white focus:border-indigo-500'
                          : 'bg-white border-slate-200 text-slate-800 focus:border-indigo-600'
                      }`}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={githubLoading || !githubUser.trim()}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold rounded-2xl flex items-center gap-2 transition-all shadow-md shadow-indigo-600/20 active:scale-95 shrink-0"
                  >
                    {githubLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Fetching...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Import</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {githubError && (
                <div className="p-4 rounded-2xl bg-rose-500/10 dark:bg-rose-950/40 border border-rose-500/30 text-rose-700 dark:text-rose-300 space-y-2">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                    <span className="font-bold text-xs">GitHub Ingestion Unsuccessful</span>
                  </div>
                  <p className="text-[11px] leading-relaxed opacity-90 pl-6">
                    {githubError}
                  </p>
                  <div className="pl-6 pt-1 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setGithubUser('shadcn')}
                      className="text-[11px] font-mono font-bold text-indigo-500 hover:underline"
                    >
                      Try @shadcn instead
                    </button>
                    <span>·</span>
                    <button
                      type="button"
                      onClick={() => setActiveTab('samples')}
                      className="text-[11px] font-mono font-bold text-indigo-500 hover:underline"
                    >
                      Browse Reference Personas
                    </button>
                  </div>
                </div>
              )}

              <div className="pt-2 text-[11px] opacity-70">
                Tip: Try famous open-source handles like <code className="font-mono font-bold">shadcn</code>, <code className="font-mono font-bold">torvalds</code>, or <code className="font-mono font-bold">gaearon</code>.
              </div>
            </div>
          )}

          {/* Sample Presets Tab */}
          {activeTab === 'samples' && (
            <div className="space-y-3">
              <p className="opacity-80">
                Select a rich reference profile to experiment with all template layouts:
              </p>

              <div className="space-y-2.5">
                <button
                  onClick={() => {
                    onImport(SAMPLE_PROFILES.jane_doe);
                    onClose();
                  }}
                  className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all group ${
                    isDark
                      ? 'bg-[#0f1420] border-[#222c3d] hover:border-emerald-500/60'
                      : 'bg-white border-slate-200 hover:border-emerald-500/60 shadow-xs'
                  }`}
                >
                  <div>
                    <h3 className="font-bold text-sm group-hover:text-emerald-500 transition-colors">
                      Jane Doe — Distributed Systems Engineer
                    </h3>
                    <p className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Go/Rust microservices, Raft consensus, terminal-first setup
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-500">Apply →</span>
                </button>

                <button
                  onClick={() => {
                    onImport(SAMPLE_PROFILES.maya_lin);
                    onClose();
                  }}
                  className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all group ${
                    isDark
                      ? 'bg-[#0f1420] border-[#222c3d] hover:border-amber-500/60'
                      : 'bg-white border-slate-200 hover:border-amber-500/60 shadow-xs'
                  }`}
                >
                  <div>
                    <h3 className="font-bold text-sm group-hover:text-amber-500 transition-colors">
                      Maya Lin — Creative Technologist
                    </h3>
                    <p className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      WebGL shaders, generative design, media showcase bento
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-500">Apply →</span>
                </button>

                <button
                  onClick={() => {
                    onImport(SAMPLE_PROFILES.alex_rivera);
                    onClose();
                  }}
                  className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all group ${
                    isDark
                      ? 'bg-[#0f1420] border-[#222c3d] hover:border-indigo-500/60'
                      : 'bg-white border-slate-200 hover:border-indigo-500/60 shadow-xs'
                  }`}
                >
                  <div>
                    <h3 className="font-bold text-sm group-hover:text-indigo-500 transition-colors">
                      Alex Rivera — Principal Frontend Architect
                    </h3>
                    <p className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Design systems, React 19, modern bento card layout
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-indigo-500">Apply →</span>
                </button>

                <button
                  onClick={() => {
                    onImport(createBlankPortfolio());
                    onClose();
                  }}
                  className={`w-full p-4 rounded-2xl border border-dashed text-left flex items-center justify-between transition-all ${
                    isDark
                      ? 'border-slate-700 hover:border-slate-500'
                      : 'border-slate-300 hover:border-slate-400'
                  }`}
                >
                  <div>
                    <h3 className="font-bold text-sm">Blank Starter Canvas</h3>
                    <p className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Clean canvas with basic schema scaffolding
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold opacity-70">Start Clean →</span>
                </button>
              </div>
            </div>
          )}

          {/* JSON Upload Tab */}
          {activeTab === 'json' && (
            <div className="space-y-4">
              <div
                className={`p-6 rounded-3xl border-2 border-dashed text-center space-y-2.5 transition-colors ${
                  isDark
                    ? 'border-slate-700 hover:border-indigo-500 bg-[#0f1420]'
                    : 'border-slate-300 hover:border-indigo-500 bg-slate-50/50'
                }`}
              >
                <Upload className="w-6 h-6 text-indigo-500 mx-auto" />
                <p className="text-xs font-medium">
                  Upload an existing <code className="font-mono text-indigo-500">portfolio.json</code>
                </p>
                <label className="inline-block px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold cursor-pointer text-xs transition-colors shadow-sm">
                  <span>Browse File</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label className="block font-semibold mb-1 opacity-80">
                  Or Paste JSON Text:
                </label>
                <textarea
                  rows={5}
                  value={jsonInput}
                  onChange={(e) => {
                    setJsonInput(e.target.value);
                    setJsonError(null);
                  }}
                  placeholder='{ "basics": { ... }, "projects": [ ... ] }'
                  className={`w-full rounded-2xl p-3 font-mono text-xs border focus:outline-none focus:ring-2 focus:ring-indigo-500/40 resize-none ${
                    isDark
                      ? 'bg-[#0f1420] border-[#222c3d] text-white focus:border-indigo-500'
                      : 'bg-white border-slate-200 text-slate-800 focus:border-indigo-600'
                  }`}
                />
              </div>

              {jsonError && (
                <div className="p-4 rounded-2xl bg-rose-500/10 dark:bg-rose-950/40 border border-rose-500/30 text-rose-700 dark:text-rose-300 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                    <span className="font-bold text-xs">JSON Validation Failed</span>
                  </div>
                  <p className="text-[11px] font-mono leading-relaxed pl-6 opacity-90">
                    {jsonError}
                  </p>
                </div>
              )}

              <button
                onClick={handleJsonSubmit}
                disabled={!jsonInput.trim()}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold rounded-full transition-all shadow-md shadow-indigo-600/20 active:scale-95"
              >
                Validate & Load JSON
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
