import React from 'react';
import { PortfolioData, TemplateId } from '../../types/portfolio';
import { FormEditor } from '../editor/FormEditor';
import { CodeEditor } from '../editor/CodeEditor';
import { TemplateRenderer } from '../templates/TemplateRenderer';
import { PreviewDock } from './PreviewDock';
import { M3FAB } from '../m3';
import {
  SlidersHorizontal,
  Code2,
  Columns2,
  PanelLeftClose,
  PanelRightClose,
  Sparkles,
  Download,
} from 'lucide-react';

export interface WorkspaceLayoutProps {
  portfolioData: PortfolioData;
  studioTheme: 'dark' | 'light';
  editorMode: 'form' | 'json';
  layoutMode: 'split' | 'editor-only' | 'preview-only';
  viewport: 'desktop' | 'tablet' | 'mobile';
  zoom: number;
  onSetPortfolioData: (updated: PortfolioData) => void;
  onSetEditorMode: (mode: 'form' | 'json') => void;
  onSetLayoutMode: (mode: 'split' | 'editor-only' | 'preview-only') => void;
  onSetViewport: (viewport: 'desktop' | 'tablet' | 'mobile') => void;
  onSetZoom: (zoom: number) => void;
  onToggleTheme: () => void;
  onEnhanceBullet: (
    bulletText: string,
    roleContext?: { role?: string; company?: string },
    bulletIndex?: number,
    expIndex?: number
  ) => void;
  onSelectTemplate: (templateId: TemplateId) => void;
  onChangeAccentColor: (color: string) => void;
  onOpenFullscreen: () => void;
  onOpenMarketplace: () => void;
  onOpenCritic: () => void;
  onOpenExport: () => void;
}

export const WorkspaceLayout: React.FC<WorkspaceLayoutProps> = ({
  portfolioData,
  studioTheme,
  editorMode,
  layoutMode,
  viewport,
  zoom,
  onSetPortfolioData,
  onSetEditorMode,
  onSetLayoutMode,
  onSetViewport,
  onSetZoom,
  onToggleTheme,
  onEnhanceBullet,
  onSelectTemplate,
  onChangeAccentColor,
  onOpenFullscreen,
  onOpenMarketplace,
  onOpenCritic,
  onOpenExport,
}) => {
  const isDark = studioTheme === 'dark';

  return (
    <main className="flex-1 flex overflow-hidden relative">
      {/* Left Pane: Tabbed Editor (Form / JSON Schema) */}
      {layoutMode !== 'preview-only' && (
        <section
          className={`flex flex-col border-r overflow-hidden transition-all duration-300 z-10 ${
            layoutMode === 'editor-only'
              ? 'w-full'
              : 'w-full md:w-[500px] lg:w-[580px] xl:w-[640px] shrink-0'
          } ${isDark ? 'bg-[#0a0d14] border-[#1d2432]' : 'bg-white border-slate-200'}`}
        >
          {/* Sub-Header: Mode Selector & Pane Size Toggle */}
          <div
            className={`px-4 py-2 border-b flex items-center justify-between shrink-0 transition-colors ${
              isDark ? 'border-[#18202e] bg-[#0c1018]' : 'border-slate-200/80 bg-slate-50/70'
            }`}
          >
            {/* Editor Mode Tabs */}
            <div
              className={`p-0.5 rounded-xl border flex items-center ${
                isDark ? 'bg-[#111724] border-[#1e2738]' : 'bg-slate-200/50 border-slate-250'
              }`}
            >
              <button
                onClick={() => onSetEditorMode('form')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  editorMode === 'form'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : isDark
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Form Editor</span>
              </button>

              <button
                onClick={() => onSetEditorMode('json')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  editorMode === 'json'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : isDark
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>JSON Schema</span>
              </button>
            </div>

            {/* Layout Mode Toggles */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() =>
                  onSetLayoutMode(layoutMode === 'split' ? 'editor-only' : 'split')
                }
                className={`p-1.5 rounded-lg border text-xs font-mono transition-colors cursor-pointer ${
                  layoutMode === 'editor-only'
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : isDark
                    ? 'border-[#1e2738] bg-[#111724] text-slate-400 hover:text-white'
                    : 'border-slate-250 bg-white text-slate-600 hover:text-slate-900'
                }`}
                title={layoutMode === 'editor-only' ? 'Show Split Preview' : 'Expand Editor'}
              >
                <PanelRightClose className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onSetLayoutMode('preview-only')}
                className={`p-1.5 rounded-lg border text-xs font-mono transition-colors cursor-pointer ${
                  isDark
                    ? 'border-[#1e2738] bg-[#111724] text-slate-400 hover:text-white'
                    : 'border-slate-250 bg-white text-slate-600 hover:text-slate-900'
                }`}
                title="Focus Preview Canvas"
              >
                <PanelLeftClose className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Left Pane Content Body */}
          <div className="flex-1 overflow-hidden">
            {editorMode === 'form' ? (
              <FormEditor
                data={portfolioData}
                theme={studioTheme}
                onChange={onSetPortfolioData}
                onEnhanceBullet={onEnhanceBullet}
              />
            ) : (
              <CodeEditor
                data={portfolioData}
                theme={studioTheme}
                onChange={onSetPortfolioData}
              />
            )}
          </div>
        </section>
      )}

      {/* Right Pane: Live Hot-Reloading Preview Frame */}
      {layoutMode !== 'editor-only' && (
        <section
          className={`flex-1 flex flex-col overflow-hidden relative transition-colors ${
            isDark ? 'bg-[#080b13]' : 'bg-[#f1f3f9]'
          }`}
        >
          {/* Docked Preview Top Toolbar */}
          <PreviewDock
            portfolioData={portfolioData}
            activeTemplateId={portfolioData.meta.templateId || 'modern-bento'}
            onSelectTemplate={onSelectTemplate}
            viewport={viewport}
            onChangeViewport={onSetViewport}
            zoom={zoom}
            onChangeZoom={onSetZoom}
            theme={studioTheme}
            onToggleTheme={onToggleTheme}
            onChangeColor={onChangeAccentColor}
            onToggleFullscreen={onOpenFullscreen}
            onOpenMarketplace={onOpenMarketplace}
          />

          {/* Sub-bar when in preview-only mode */}
          {layoutMode === 'preview-only' && (
            <div
              className={`px-4 py-2 border-b flex items-center justify-between text-xs ${
                isDark ? 'bg-[#121824] border-[#1d2636]' : 'bg-slate-100 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                <span className="font-semibold text-slate-300">Live Preview Canvas (Focused)</span>
              </div>
              <button
                onClick={() => onSetLayoutMode('split')}
                className={`px-3 py-1 rounded-full border text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer ${
                  isDark
                    ? 'bg-[#151c28] border-[#2b3548] text-slate-200 hover:bg-[#1e2534]'
                    : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                }`}
                title="Restore Split View"
              >
                <Columns2 className="w-3.5 h-3.5 text-indigo-500" />
                <span>Show Editor</span>
              </button>
            </div>
          )}

          {/* Device Frame Viewport Container */}
          <div
            className={`flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start ${
              isDark
                ? 'bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]'
                : 'bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]'
            }`}
          >
            <div
              className={`transition-all duration-300 rounded-3xl overflow-hidden shadow-2xl border ${
                isDark ? 'border-[#252f40] bg-[#0e1320]' : 'border-slate-300 bg-white shadow-xl'
              } ${
                viewport === 'desktop'
                  ? 'w-full max-w-5xl'
                  : viewport === 'tablet'
                  ? 'w-[768px]'
                  : 'w-[375px]'
              }`}
              style={{
                minHeight: '680px',
                transform: zoom !== 1 ? `scale(${zoom})` : undefined,
                transformOrigin: 'top center',
              }}
            >
              <TemplateRenderer data={portfolioData} />
            </div>
          </div>

          {/* M3 Floating Extended Action Buttons (FAB) */}
          <div className="absolute bottom-6 right-6 flex items-center gap-2.5 z-20">
            <M3FAB
              variant="tertiary"
              label="Audit Portfolio"
              icon={<Sparkles className="w-4 h-4 text-black" />}
              onClick={onOpenCritic}
              title="Audit Portfolio with AI Critic"
            />

            <M3FAB
              variant="primary"
              label="Export & Deploy"
              icon={<Download className="w-4 h-4" />}
              onClick={onOpenExport}
              title="Download HTML/JSON or Deploy"
            />
          </div>
        </section>
      )}
    </main>
  );
};
