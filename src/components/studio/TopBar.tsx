import React from 'react';
import { TemplateId } from '../../types/portfolio';
import {
  Sparkles,
  Download,
  Upload,
  LayoutGrid,
  Sun,
  Moon,
  Search,
  CheckCircle2,
  Users,
} from 'lucide-react';

interface TopBarProps {
  activeTemplateId: TemplateId;
  onSelectTemplate: (templateId: TemplateId) => void;
  viewport?: 'desktop' | 'tablet' | 'mobile';
  onChangeViewport?: (viewport: 'desktop' | 'tablet' | 'mobile') => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenMarketplace: () => void;
  onOpenImport: () => void;
  onOpenExport: () => void;
  onOpenCritic: () => void;
  onToggleFullscreen: () => void;
  onOpenCommandPalette: () => void;
  onSelectPersona?: (personaKey: 'jane_doe' | 'alex_rivera' | 'blank_slate') => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  theme,
  onToggleTheme,
  onOpenMarketplace,
  onOpenImport,
  onOpenExport,
  onOpenCritic,
  onOpenCommandPalette,
  onSelectPersona,
}) => {
  const isDark = theme === 'dark';

  return (
    <header
      className={`h-16 px-4 md:px-6 flex items-center justify-between gap-4 select-none shrink-0 z-30 border-b transition-colors ${
        isDark
          ? 'bg-[#0e1320] border-[#1d2636] text-slate-100 shadow-sm shadow-black/30'
          : 'bg-white border-slate-200 text-slate-800 shadow-[0_1px_3px_rgba(0,0,0,0.05)]'
      }`}
    >
      {/* Cluster 1: Brand Mark & Persona Quick-Switcher */}
      <div className="flex items-center gap-3 md:gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-500 flex items-center justify-center text-white font-extrabold text-sm shadow-md shadow-indigo-600/30">
            FC
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm sm:text-base tracking-tight leading-none">
                FolioCraft
              </span>
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-500 border border-indigo-500/20 uppercase">
                Studio
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium hidden sm:block">
              Engineering Portfolio Engine
            </span>
          </div>
        </div>

        {/* Persona Switcher Dropdown */}
        {onSelectPersona && (
          <div
            className={`hidden md:flex items-center gap-1.5 pl-3 border-l ${
              isDark ? 'border-slate-800' : 'border-slate-200'
            }`}
          >
            <div
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full border text-xs font-semibold ${
                isDark
                  ? 'bg-[#151c27] border-[#252f40] text-slate-300'
                  : 'bg-slate-100 border-slate-250 text-slate-700'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <select
                aria-label="Load demo profile"
                onChange={(e) =>
                  onSelectPersona(e.target.value as 'jane_doe' | 'alex_rivera' | 'blank_slate')
                }
                defaultValue="jane_doe"
                className="bg-transparent text-xs font-medium cursor-pointer focus:outline-none pr-1"
              >
                <option value="jane_doe" className={isDark ? 'bg-[#121824]' : 'bg-white'}>
                  Jane Doe (Full-Stack)
                </option>
                <option value="alex_rivera" className={isDark ? 'bg-[#121824]' : 'bg-white'}>
                  Alex Rivera (Systems)
                </option>
                <option value="blank_slate" className={isDark ? 'bg-[#121824]' : 'bg-white'}>
                  Clean Slate (Empty)
                </option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Cluster 2: Center Document Status & Quick Command Palette Search */}
      <div className="hidden lg:flex items-center gap-3">
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${
            isDark
              ? 'bg-[#141a26] border-[#20293a] text-slate-300'
              : 'bg-slate-50 border-slate-200 text-slate-600'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-mono">Live Sync Active</span>
        </div>

        <button
          onClick={onOpenCommandPalette}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all cursor-pointer ${
            isDark
              ? 'bg-[#141a26] border-[#20293a] text-slate-400 hover:text-white hover:border-slate-600'
              : 'bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-800 hover:border-slate-300'
          }`}
          title="Open Command Palette (⌘K)"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Quick Actions</span>
          <kbd className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 text-[10px] font-mono">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Cluster 3: Grouped Action Tools & Export */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Templates Catalog Button */}
        <button
          onClick={onOpenMarketplace}
          className={`px-3 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
            isDark
              ? 'border-slate-700/80 bg-[#141a26] text-slate-200 hover:bg-[#1c2436] hover:text-white'
              : 'border-slate-250 bg-white text-slate-700 hover:bg-slate-50'
          }`}
          title="Browse 6 Material 3 Portfolio Templates"
        >
          <LayoutGrid className="w-3.5 h-3.5 text-indigo-500" />
          <span className="hidden sm:inline">Templates</span>
        </button>

        {/* Import Button */}
        <button
          onClick={onOpenImport}
          className={`px-3 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
            isDark
              ? 'border-slate-700/80 bg-[#141a26] text-slate-200 hover:bg-[#1c2436] hover:text-white'
              : 'border-slate-250 bg-white text-slate-700 hover:bg-slate-50'
          }`}
          title="Import Resume JSON or GitHub Profile"
        >
          <Upload className="w-3.5 h-3.5 text-cyan-500" />
          <span className="hidden sm:inline">Import</span>
        </button>

        {/* AI Critic Audit Button */}
        <button
          onClick={onOpenCritic}
          className={`px-3 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
            isDark
              ? 'border-slate-700/80 bg-[#141a26] text-amber-300 hover:bg-[#1c2436]'
              : 'border-amber-200 bg-amber-50/60 text-amber-700 hover:bg-amber-100/60'
          }`}
          title="Run Comprehensive Portfolio Audit"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span className="hidden md:inline">AI Critic</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          className={`p-2 rounded-full border transition-all cursor-pointer ${
            isDark
              ? 'border-slate-700/80 bg-[#141a26] text-slate-300 hover:text-white hover:bg-[#1c2436]'
              : 'border-slate-250 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Toggle studio color theme"
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
        </button>

        {/* Primary Export CTA */}
        <button
          onClick={onOpenExport}
          className="px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/25 transition-all cursor-pointer"
          title="Export Standalone HTML or Download JSON"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export</span>
        </button>
      </div>
    </header>
  );
};
