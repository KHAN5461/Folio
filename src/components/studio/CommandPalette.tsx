import React, { useState, useEffect } from 'react';
import { TemplateId } from '../../types/portfolio';
import { TEMPLATES } from '../../data/templates';
import {
  Search,
  LayoutGrid,
  Sun,
  Moon,
  Sparkles,
  Download,
  Upload,
  Maximize2,
  FileCode,
  Briefcase,
  User,
  FolderGit2,
  X,
  Command,
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onSelectTemplate: (id: TemplateId) => void;
  onOpenCritic: () => void;
  onOpenExport: () => void;
  onOpenImport: () => void;
  onToggleFullscreen: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  theme,
  onToggleTheme,
  onSelectTemplate,
  onOpenCritic,
  onOpenExport,
  onOpenImport,
  onToggleFullscreen,
}) => {
  const isDark = theme === 'dark';
  const [query, setQuery] = useState('');

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: 'critic',
      label: 'Run AI Portfolio Critic & Audit',
      category: 'AI Copilot',
      icon: Sparkles,
      iconColor: 'text-amber-500',
      action: () => {
        onClose();
        onOpenCritic();
      },
    },
    {
      id: 'export-html',
      label: 'Export Standalone HTML Website',
      category: 'Export',
      icon: Download,
      iconColor: 'text-indigo-500',
      action: () => {
        onClose();
        onOpenExport();
      },
    },
    {
      id: 'import',
      label: 'Magic Import (GitHub / JSON / Presets)',
      category: 'Data',
      icon: Upload,
      iconColor: 'text-cyan-500',
      action: () => {
        onClose();
        onOpenImport();
      },
    },
    {
      id: 'theme',
      label: `Switch to ${isDark ? 'Light' : 'Dark'} Studio Mode`,
      category: 'Appearance',
      icon: isDark ? Sun : Moon,
      iconColor: 'text-amber-400',
      action: () => {
        onToggleTheme();
        onClose();
      },
    },
    {
      id: 'fullscreen',
      label: 'Toggle Fullscreen Live Preview',
      category: 'View',
      icon: Maximize2,
      iconColor: 'text-purple-500',
      action: () => {
        onClose();
        onToggleFullscreen();
      },
    },
    ...TEMPLATES.map((tmpl) => ({
      id: `tmpl-${tmpl.id}`,
      label: `Switch Template to ${tmpl.name}`,
      category: 'Templates',
      icon: LayoutGrid,
      iconColor: 'text-indigo-400',
      action: () => {
        onSelectTemplate(tmpl.id);
        onClose();
      },
    })),
  ];

  const filtered = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-start justify-center pt-20 p-4 select-none"
      onClick={onClose}
    >
      <div
        className={`w-full max-w-xl rounded-3xl border shadow-2xl overflow-hidden m3-motion ${
          isDark
            ? 'bg-[#121824] border-[#253246] text-slate-100 shadow-black/50'
            : 'bg-white border-slate-250 text-slate-800 shadow-xl'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div
          className={`flex items-center gap-3 px-5 py-3.5 border-b ${
            isDark ? 'border-[#222c3d] bg-[#0d121c]' : 'border-slate-200 bg-slate-50'
          }`}
        >
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or jump to feature (e.g. 'export', 'audit', 'terminal')..."
            className="w-full bg-transparent text-sm focus:outline-none placeholder-slate-400 font-medium"
          />
          <kbd
            className={`px-2 py-0.5 rounded-lg border text-[10px] font-mono font-bold ${
              isDark ? 'border-slate-700 bg-slate-800 text-slate-400' : 'border-slate-300 bg-white text-slate-500'
            }`}
          >
            ESC
          </kbd>
        </div>

        {/* Action Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs opacity-60">
              No matching commands found for "{query}"
            </div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className={`w-full px-4 py-3 rounded-2xl flex items-center justify-between text-left text-xs font-semibold transition-all group ${
                    isDark
                      ? 'hover:bg-slate-800/80 text-slate-200 hover:text-white'
                      : 'hover:bg-slate-100 text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                        isDark ? 'bg-[#182132]' : 'bg-slate-100'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${item.iconColor}`} />
                    </div>
                    <span>{item.label}</span>
                  </div>

                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {item.category}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer Hint */}
        <div
          className={`px-5 py-2.5 border-t text-[11px] font-mono flex items-center justify-between ${
            isDark ? 'border-[#222c3d] text-slate-500' : 'border-slate-200 text-slate-400'
          }`}
        >
          <span>Use ⌘K or Ctrl+K anywhere</span>
          <span>FolioCraft Quick Actions</span>
        </div>
      </div>
    </div>
  );
};
