import React from 'react';
import { TemplateId, PortfolioData } from '../../types/portfolio';
import { TEMPLATES } from '../../data/templates';
import {
  Monitor,
  Tablet,
  Smartphone,
  Maximize2,
  ZoomIn,
  ZoomOut,
  LayoutGrid,
  ChevronDown,
} from 'lucide-react';

interface PreviewDockProps {
  portfolioData: PortfolioData;
  activeTemplateId: TemplateId;
  onSelectTemplate: (templateId: TemplateId) => void;
  viewport: 'desktop' | 'tablet' | 'mobile';
  onChangeViewport: (viewport: 'desktop' | 'tablet' | 'mobile') => void;
  zoom: number;
  onChangeZoom: (zoom: number) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onChangeColor: (color: string) => void;
  onToggleFullscreen: () => void;
  onOpenMarketplace: () => void;
}

const ACCENT_COLORS = [
  { name: 'Indigo', hex: '#6366f1' },
  { name: 'Emerald', hex: '#10b981' },
  { name: 'Cyan', hex: '#06b6d4' },
  { name: 'Amber', hex: '#f59e0b' },
  { name: 'Rose', hex: '#f43f5e' },
  { name: 'Violet', hex: '#8b5cf6' },
];

export const PreviewDock: React.FC<PreviewDockProps> = ({
  portfolioData,
  activeTemplateId,
  onSelectTemplate,
  viewport,
  onChangeViewport,
  zoom,
  onChangeZoom,
  theme,
  onChangeColor,
  onToggleFullscreen,
  onOpenMarketplace,
}) => {
  const isDark = theme === 'dark';

  const handleZoomIn = () => {
    onChangeZoom(Math.min(1.5, Number((zoom + 0.1).toFixed(1))));
  };

  const handleZoomOut = () => {
    onChangeZoom(Math.max(0.6, Number((zoom - 0.1).toFixed(1))));
  };

  const handleZoomReset = () => {
    onChangeZoom(1);
  };

  return (
    <div
      className={`h-13 px-4 border-b flex items-center justify-between gap-3 shrink-0 select-none transition-colors ${
        isDark ? 'bg-[#0c1018] border-[#1d2636]' : 'bg-slate-50 border-slate-200'
      }`}
    >
      {/* Left Cluster: Template Picker & Catalog */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          <div className="relative">
            <select
              value={activeTemplateId}
              onChange={(e) => onSelectTemplate(e.target.value as TemplateId)}
              aria-label="Active portfolio template"
              className={`appearance-none text-xs font-bold py-1.5 pl-3 pr-8 rounded-full border cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/30 ${
                isDark
                  ? 'bg-[#151c27] border-[#252f40] text-slate-200 hover:bg-[#1e2637]'
                  : 'bg-white border-slate-250 text-slate-800 hover:bg-slate-100'
              }`}
            >
              {TEMPLATES.map((t) => (
                <option key={t.id} value={t.id} className={isDark ? 'bg-[#121824]' : 'bg-white'}>
                  {t.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <button
            onClick={onOpenMarketplace}
            className={`p-1.5 rounded-full border transition-all cursor-pointer ${
              isDark
                ? 'border-[#252f40] bg-[#151c27] text-slate-300 hover:text-white hover:bg-[#1e2637]'
                : 'border-slate-250 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
            title="Browse Templates Catalog"
            aria-label="Browse Templates Catalog"
          >
            <LayoutGrid className="w-3.5 h-3.5 text-indigo-500" />
          </button>
        </div>
      </div>

      {/* Center Cluster: Responsive Viewport Segmented Selector */}
      <div
        className={`flex items-center p-1 rounded-full border shadow-2xs ${
          isDark ? 'bg-[#141a26] border-[#20293a]' : 'bg-white border-slate-200'
        }`}
      >
        <button
          onClick={() => onChangeViewport('desktop')}
          className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            viewport === 'desktop'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          title="Desktop Canvas (100% width)"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Desktop</span>
        </button>

        <button
          onClick={() => onChangeViewport('tablet')}
          className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            viewport === 'tablet'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          title="Tablet Canvas (768px)"
        >
          <Tablet className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Tablet</span>
        </button>

        <button
          onClick={() => onChangeViewport('mobile')}
          className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            viewport === 'mobile'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          title="Mobile Canvas (375px)"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Mobile</span>
        </button>
      </div>

      {/* Right Cluster: Zoom Scaler, Accent Color Swatches & Fullscreen */}
      <div className="flex items-center gap-2">
        {/* Accent Color Palette Quick Switcher */}
        <div className="hidden xl:flex items-center gap-1 pl-1 pr-2">
          {ACCENT_COLORS.map((c) => (
            <button
              key={c.hex}
              onClick={() => onChangeColor(c.hex)}
              className={`w-4 h-4 rounded-full transition-transform hover:scale-125 cursor-pointer ${
                portfolioData.meta.theme.primaryColor.toLowerCase() === c.hex.toLowerCase()
                  ? 'ring-2 ring-white ring-offset-1 scale-110'
                  : 'opacity-70'
              }`}
              style={{ backgroundColor: c.hex }}
              title={`Switch accent to ${c.name}`}
            />
          ))}
        </div>

        {/* Zoom Controls */}
        <div
          className={`hidden sm:flex items-center gap-1 px-1.5 py-1 rounded-full border text-xs font-mono ${
            isDark ? 'bg-[#151c27] border-[#252f40]' : 'bg-white border-slate-200'
          }`}
        >
          <button
            onClick={handleZoomOut}
            className="p-1 hover:text-indigo-400 cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-3 h-3" />
          </button>

          <button
            onClick={handleZoomReset}
            className="px-1 text-[11px] font-bold hover:text-indigo-400 cursor-pointer"
            title="Reset Zoom to 100%"
          >
            {Math.round(zoom * 100)}%
          </button>

          <button
            onClick={handleZoomIn}
            className="p-1 hover:text-indigo-400 cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-3 h-3" />
          </button>
        </div>

        {/* Fullscreen Button */}
        <button
          onClick={onToggleFullscreen}
          className={`p-2 rounded-full border transition-all cursor-pointer ${
            isDark
              ? 'border-[#252f40] bg-[#151c27] text-slate-300 hover:text-white hover:bg-[#1e2637]'
              : 'border-slate-250 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
          title="Open Fullscreen Live Canvas"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
