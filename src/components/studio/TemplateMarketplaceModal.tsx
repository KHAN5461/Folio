import React, { useState } from 'react';
import { PortfolioData, TemplateId } from '../../types/portfolio';
import { TEMPLATES } from '../../data/templates';
import { TemplateRenderer } from '../templates/TemplateRenderer';
import { LayoutGrid, X, Check, Monitor, Tablet, Smartphone } from 'lucide-react';

interface TemplateMarketplaceModalProps {
  isOpen: boolean;
  theme: 'dark' | 'light';
  onClose: () => void;
  activeTemplateId: TemplateId;
  onApplyTemplate: (templateId: TemplateId) => void;
  currentData: PortfolioData;
}

export const TemplateMarketplaceModal: React.FC<TemplateMarketplaceModalProps> = ({
  isOpen,
  theme,
  onClose,
  activeTemplateId,
  onApplyTemplate,
  currentData,
}) => {
  const isDark = theme === 'dark';
  const [selectedPreviewId, setSelectedPreviewId] = useState<TemplateId>(activeTemplateId);
  const [previewViewport, setPreviewViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  if (!isOpen) return null;

  const activeTemplateDef = TEMPLATES.find((t) => t.id === selectedPreviewId) || TEMPLATES[0];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-6 transition-all"
      onClick={onClose}
    >
      <div
        className={`w-full max-w-6xl h-[92vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border transition-colors ${
          isDark
            ? 'bg-[#111622] border-[#252f40] text-slate-100'
            : 'bg-white border-slate-200 text-slate-800'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className={`p-5 border-b flex items-center justify-between shrink-0 ${
            isDark ? 'border-[#222c3d] bg-[#0d121c]' : 'border-slate-100 bg-slate-50/70'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
              <LayoutGrid className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold">Template Marketplace</h2>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Switch rendering engines instantly with zero data loss over your portfolio.json
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onApplyTemplate(selectedPreviewId);
                onClose();
              }}
              className="px-5 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-indigo-600/25 active:scale-95"
            >
              <Check className="w-4 h-4" />
              <span>Apply "{activeTemplateDef.name}"</span>
            </button>
            <button
              onClick={onClose}
              className={`p-2 rounded-full transition-colors ${
                isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-500'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 2-Pane Content */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Left Column: Template Cards */}
          <div
            className={`w-full lg:w-96 border-b lg:border-b-0 lg:border-r p-4 space-y-3 overflow-y-auto shrink-0 ${
              isDark ? 'border-[#222c3d] bg-[#0d121c]' : 'border-slate-200 bg-slate-50/50'
            }`}
          >
            <span
              className={`text-[11px] font-mono uppercase tracking-wider block px-1 ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              Curated Layout Engines ({TEMPLATES.length})
            </span>

            {TEMPLATES.map((tmpl) => {
              const isSelected = tmpl.id === selectedPreviewId;
              const isCurrentActive = tmpl.id === activeTemplateId;

              return (
                <div
                  key={tmpl.id}
                  onClick={() => setSelectedPreviewId(tmpl.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2.5 ${
                    isSelected
                      ? isDark
                        ? 'bg-[#182133] border-indigo-500/80 shadow-md shadow-indigo-950/40'
                        : 'bg-white border-indigo-600 shadow-md ring-2 ring-indigo-500/20'
                      : isDark
                      ? 'bg-[#111726]/60 border-[#222c3d] hover:border-slate-700'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: tmpl.previewAccent }}
                      />
                      <h3 className="font-bold text-sm">{tmpl.name}</h3>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {isCurrentActive && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 font-mono font-bold">
                          Active
                        </span>
                      )}
                      <span className={`text-[11px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {tmpl.category}
                      </span>
                    </div>
                  </div>

                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {tmpl.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-1 pt-1 text-[11px] font-mono">
                    {tmpl.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-0.5 rounded-full border ${
                          isDark
                            ? 'bg-slate-900 border-slate-800 text-slate-400'
                            : 'bg-slate-100 border-slate-200 text-slate-600'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Live Viewport Preview */}
          <div
            className={`flex-1 flex flex-col overflow-hidden ${
              isDark ? 'bg-[#070a12]' : 'bg-slate-100'
            }`}
          >
            {/* Viewport bar */}
            <div
              className={`px-5 py-3 border-b flex items-center justify-between shrink-0 ${
                isDark ? 'border-[#222c3d] bg-[#0c101a]' : 'border-slate-200 bg-white'
              }`}
            >
              <div className="text-xs font-mono flex items-center gap-2">
                <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Previewing:</span>
                <span className="font-bold">{activeTemplateDef.name}</span>
              </div>

              <div
                className={`flex items-center p-1 rounded-full border text-xs ${
                  isDark ? 'bg-[#141a26] border-[#252f40]' : 'bg-slate-100 border-slate-200'
                }`}
              >
                <button
                  onClick={() => setPreviewViewport('desktop')}
                  className={`px-3 py-1 rounded-full flex items-center gap-1.5 transition-all ${
                    previewViewport === 'desktop'
                      ? isDark
                        ? 'bg-indigo-600 text-white font-semibold'
                        : 'bg-white text-indigo-700 font-semibold shadow-xs'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Desktop</span>
                </button>
                <button
                  onClick={() => setPreviewViewport('tablet')}
                  className={`px-3 py-1 rounded-full flex items-center gap-1.5 transition-all ${
                    previewViewport === 'tablet'
                      ? isDark
                        ? 'bg-indigo-600 text-white font-semibold'
                        : 'bg-white text-indigo-700 font-semibold shadow-xs'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <Tablet className="w-3.5 h-3.5" />
                  <span>Tablet</span>
                </button>
                <button
                  onClick={() => setPreviewViewport('mobile')}
                  className={`px-3 py-1 rounded-full flex items-center gap-1.5 transition-all ${
                    previewViewport === 'mobile'
                      ? isDark
                        ? 'bg-indigo-600 text-white font-semibold'
                        : 'bg-white text-indigo-700 font-semibold shadow-xs'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mobile</span>
                </button>
              </div>
            </div>

            {/* Frame Container */}
            <div className="flex-1 overflow-auto p-4 md:p-6 flex justify-center items-start">
              <div
                className={`transition-all duration-300 rounded-3xl overflow-hidden shadow-2xl border ${
                  isDark ? 'border-[#222c3d] bg-[#0e1320]' : 'border-slate-300 bg-white'
                } ${
                  previewViewport === 'desktop'
                    ? 'w-full max-w-5xl'
                    : previewViewport === 'tablet'
                    ? 'w-[768px]'
                    : 'w-[375px]'
                }`}
                style={{ minHeight: '600px' }}
              >
                <TemplateRenderer
                  data={currentData}
                  overrideTemplateId={selectedPreviewId}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
