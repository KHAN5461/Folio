import React from 'react';
import { PortfolioMeta } from '../../../types/portfolio';
import { M3Card, M3TextField } from '../../m3';
import { Palette, Moon, Sun, Check, Type } from 'lucide-react';
import { THEME_PRESETS, AVAILABLE_FONTS, ThemePreset } from '../../../data/themePresets';

interface ThemeSectionProps {
  meta: PortfolioMeta;
  onChange: (updatedMeta: PortfolioMeta) => void;
  isDark?: boolean;
}

export const ThemeSection: React.FC<ThemeSectionProps> = ({
  meta,
  onChange,
  isDark = true,
}) => {
  const applyThemePreset = (preset: ThemePreset) => {
    onChange({
      ...meta,
      theme: {
        ...meta.theme,
        primaryColor: preset.primaryColor,
        font: preset.font,
        mode: preset.mode,
      },
    });
  };

  const updateThemeField = (field: keyof PortfolioMeta['theme'], val: any) => {
    onChange({
      ...meta,
      theme: {
        ...meta.theme,
        [field]: val,
      },
    });
  };

  return (
    <div className="space-y-8">
      {/* Lighting Mode & Accent Picker Card */}
      <M3Card variant="elevated" className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-700/10">
          <div className="w-10 h-10 rounded-2xl bg-pink-500/15 flex items-center justify-center text-pink-500 font-bold">
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold">Lighting & Core Brand Color</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Set the primary ambient mode and custom brand accent hue
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          <div>
            <span className="block text-xs font-mono font-bold tracking-wider mb-2.5 uppercase text-slate-500 dark:text-slate-400">
              Portfolio Lighting Theme
            </span>
            <div className="flex items-center gap-3 p-1 rounded-2xl border border-slate-300/80 dark:border-slate-700/60 bg-slate-50/70 dark:bg-[#0f1422]">
              <button
                type="button"
                onClick={() => updateThemeField('mode', 'dark')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  meta.theme.mode === 'dark'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Moon className="w-4 h-4" />
                <span>Dark Theme</span>
              </button>

              <button
                type="button"
                onClick={() => updateThemeField('mode', 'light')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  meta.theme.mode === 'light'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Sun className="w-4 h-4" />
                <span>Light Theme</span>
              </button>
            </div>
          </div>

          <div>
            <span className="block text-xs font-mono font-bold tracking-wider mb-2.5 uppercase text-slate-500 dark:text-slate-400">
              Custom Brand Accent
            </span>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={meta.theme.primaryColor || '#6366f1'}
                onChange={(e) => updateThemeField('primaryColor', e.target.value)}
                className="w-12 h-11 rounded-2xl border border-slate-300/80 dark:border-slate-700/60 bg-slate-50/70 dark:bg-[#0f1422] cursor-pointer p-1 transition-all focus:ring-2 focus:ring-indigo-500/25"
                title="Select custom HEX color"
              />
              <div className="flex-1">
                <M3TextField
                  label="Color HEX Code"
                  value={meta.theme.primaryColor || '#6366f1'}
                  onChange={(val) => updateThemeField('primaryColor', val)}
                />
              </div>
            </div>
          </div>
        </div>
      </M3Card>

      {/* Curated Theme Presets Grid */}
      <M3Card variant="elevated" className="p-6 sm:p-8 space-y-5">
        <div>
          <h3 className="text-base font-bold">Curated Theme Presets</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Handcrafted color harmonies and typography pairings designed for engineering portfolios
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {THEME_PRESETS.map((preset) => {
            const isCurrent =
              meta.theme.primaryColor.toLowerCase() === preset.primaryColor.toLowerCase() &&
              meta.theme.mode === preset.mode;
            return (
              <div
                key={preset.id}
                onClick={() => applyThemePreset(preset)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  isCurrent
                    ? 'border-indigo-500 ring-2 ring-indigo-500/25 bg-indigo-500/10'
                    : isDark
                    ? 'bg-[#0f1422] border-slate-800/80 hover:border-slate-700'
                    : 'bg-slate-50/80 border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shadow-xs text-white"
                    style={{ backgroundColor: preset.primaryColor }}
                  >
                    {isCurrent && <Check className="w-4 h-4 stroke-[3]" />}
                  </div>
                  <div>
                    <div className="text-sm font-bold">{preset.name}</div>
                    <div className="text-[11px] opacity-60 font-mono">
                      {preset.mode === 'dark' ? '🌙 Dark' : '☀️ Light'} · {preset.font}
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10 uppercase font-bold text-slate-400">
                  {preset.category}
                </span>
              </div>
            );
          })}
        </div>
      </M3Card>

      {/* Typography System */}
      <M3Card variant="elevated" className="p-6 sm:p-8 space-y-5">
        <div className="flex items-center gap-2">
          <Type className="w-4 h-4 text-indigo-500" />
          <h3 className="text-base font-bold">Typography System</h3>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Select a font family suited for your engineering archetype
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {AVAILABLE_FONTS.map((f) => {
            const isSelected = meta.theme.font === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => updateThemeField('font', f.id)}
                className={`p-4 rounded-2xl border text-left text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'border-indigo-500 ring-2 ring-indigo-500/25 bg-indigo-500/10 font-bold text-indigo-500'
                    : isDark
                    ? 'bg-[#0f1422] border-slate-800/80 text-slate-300 hover:border-slate-700'
                    : 'bg-slate-50/80 border-slate-200/80 text-slate-700 hover:border-slate-300'
                }`}
              >
                <span>{f.name}</span>
                {isSelected && <Check className="w-4 h-4 text-indigo-500 stroke-[3]" />}
              </button>
            );
          })}
        </div>
      </M3Card>
    </div>
  );
};
