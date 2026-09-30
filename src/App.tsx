import React, { useState, useEffect } from 'react';
import { PortfolioData, TemplateId } from './types/portfolio';
import { SAMPLE_PROFILES } from './data/sampleProfiles';
import { TopBar } from './components/studio/TopBar';
import { WorkspaceLayout } from './components/studio/WorkspaceLayout';
import { TemplateRenderer } from './components/templates/TemplateRenderer';
import {
  TemplateMarketplaceModal,
  ImportModal,
  ExportModal,
  AiBulletModal,
  CommandPalette,
} from './components/modals';
import { AiCriticDrawer } from './components/studio/AiCriticDrawer';
import { CheckCircle2, X, Minimize2 } from 'lucide-react';

export default function App() {
  // Studio Workspace Theme: 'dark' | 'light'
  const [studioTheme, setStudioTheme] = useState<'dark' | 'light'>('dark');

  // Canonical Portfolio Data State (Single Source of Truth)
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(
    () => SAMPLE_PROFILES.jane_doe
  );

  // Studio Left Pane Mode: 'form' | 'json'
  const [editorMode, setEditorMode] = useState<'form' | 'json'>('form');

  // Preview Viewport Mode: 'desktop' | 'tablet' | 'mobile'
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Preview Scale/Zoom
  const [zoom, setZoom] = useState<number>(1);

  // Layout View Mode: 'split' | 'editor-only' | 'preview-only'
  const [layoutMode, setLayoutMode] = useState<'split' | 'editor-only' | 'preview-only'>('split');

  // Fullscreen Preview Overlay
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Modals & Drawers
  const [marketplaceOpen, setMarketplaceOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [criticOpen, setCriticOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // M3 Snackbar Feedback Notification
  const [snackbar, setSnackbar] = useState<{ message: string; visible: boolean }>({
    message: '',
    visible: false,
  });

  const showSnackbar = (msg: string) => {
    setSnackbar({ message: msg, visible: true });
    setTimeout(() => {
      setSnackbar((prev) => ({ ...prev, visible: false }));
    }, 3200);
  };

  // Bullet Enhancer State
  const [bulletModal, setBulletModal] = useState<{
    isOpen: boolean;
    text: string;
    roleContext?: { role?: string; company?: string };
    expIdx?: number;
    bulletIdx?: number;
  }>({
    isOpen: false,
    text: '',
  });

  const isDark = studioTheme === 'dark';

  const toggleTheme = () => {
    const next = studioTheme === 'dark' ? 'light' : 'dark';
    setStudioTheme(next);
    showSnackbar(`Switched Studio to ${next === 'dark' ? 'Dark' : 'Light'} Mode`);
  };

  // Global Keyboard Shortcuts (⌘K, ⌘S, ⌘B)
  useEffect(() => {
    const handleGlobalKeys = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      } else if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        setExportOpen(true);
      } else if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault();
        toggleTheme();
      }
    };
    window.addEventListener('keydown', handleGlobalKeys);
    return () => window.removeEventListener('keydown', handleGlobalKeys);
  }, [studioTheme]);

  // Switch template with zero data loss
  const handleSelectTemplate = (templateId: TemplateId) => {
    setPortfolioData((prev) => ({
      ...prev,
      meta: {
        ...prev.meta,
        templateId,
        lastUpdated: new Date().toISOString().split('T')[0],
      },
    }));
    showSnackbar(`Applied "${templateId.replace('-', ' ')}" template`);
  };

  const handleChangeAccentColor = (colorHex: string) => {
    setPortfolioData((prev) => ({
      ...prev,
      meta: {
        ...prev.meta,
        theme: {
          ...prev.meta.theme,
          primaryColor: colorHex,
        },
      },
    }));
    showSnackbar(`Accent palette updated`);
  };

  // AI Bullet Polish Request
  const handleEnhanceBullet = (
    bulletText: string,
    roleContext?: { role?: string; company?: string },
    bulletIdx?: number,
    expIdx?: number
  ) => {
    setBulletModal({
      isOpen: true,
      text: bulletText,
      roleContext,
      bulletIdx,
      expIdx,
    });
  };

  const handleApplyEnhancedBullet = (enhancedText: string) => {
    if (
      bulletModal.expIdx !== undefined &&
      bulletModal.bulletIdx !== undefined &&
      portfolioData.experience[bulletModal.expIdx]
    ) {
      const updatedExperience = [...portfolioData.experience];
      const targetExp = { ...updatedExperience[bulletModal.expIdx] };
      const updatedBullets = [...targetExp.bullets];
      updatedBullets[bulletModal.bulletIdx] = enhancedText;
      targetExp.bullets = updatedBullets;
      updatedExperience[bulletModal.expIdx] = targetExp;

      setPortfolioData((prev) => ({
        ...prev,
        experience: updatedExperience,
      }));
      showSnackbar('Accomplishment bullet updated with Google X-Y-Z formula');
    }
  };

  return (
    <div
      className={`h-screen w-screen flex flex-col overflow-hidden select-none m3-motion ${
        isDark ? 'theme-dark bg-[#0b0f17] text-slate-100' : 'theme-light bg-[#f8f9fc] text-slate-900'
      }`}
    >
      {/* M3 Top Bar with Dark/Light Switch & Command Palette Trigger */}
      <TopBar
        activeTemplateId={portfolioData.meta.templateId || 'modern-bento'}
        onSelectTemplate={handleSelectTemplate}
        viewport={viewport}
        onChangeViewport={setViewport}
        theme={studioTheme}
        onToggleTheme={toggleTheme}
        onOpenMarketplace={() => setMarketplaceOpen(true)}
        onOpenImport={() => setImportOpen(true)}
        onOpenExport={() => setExportOpen(true)}
        onOpenCritic={() => setCriticOpen(true)}
        onToggleFullscreen={() => setIsFullscreen(true)}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onSelectPersona={(personaKey) => {
          setPortfolioData(SAMPLE_PROFILES[personaKey]);
          showSnackbar(
            `Loaded ${
              personaKey === 'jane_doe'
                ? 'Jane Doe (Full-Stack)'
                : personaKey === 'alex_rivera'
                ? 'Alex Rivera (Systems)'
                : 'Clean Slate'
            } profile`
          );
        }}
      />

      {/* Main Studio Split Dual-Pane Workspace */}
      <WorkspaceLayout
        portfolioData={portfolioData}
        studioTheme={studioTheme}
        editorMode={editorMode}
        layoutMode={layoutMode}
        viewport={viewport}
        zoom={zoom}
        onSetPortfolioData={setPortfolioData}
        onSetEditorMode={setEditorMode}
        onSetLayoutMode={setLayoutMode}
        onSetViewport={setViewport}
        onSetZoom={setZoom}
        onToggleTheme={toggleTheme}
        onEnhanceBullet={handleEnhanceBullet}
        onSelectTemplate={handleSelectTemplate}
        onChangeAccentColor={handleChangeAccentColor}
        onOpenFullscreen={() => setIsFullscreen(true)}
        onOpenMarketplace={() => setMarketplaceOpen(true)}
        onOpenCritic={() => setCriticOpen(true)}
        onOpenExport={() => setExportOpen(true)}
      />

      {/* Fullscreen Preview Overlay Modal */}
      {isFullscreen && (
        <div
          className={`fixed inset-0 z-50 flex flex-col ${
            isDark ? 'bg-[#0b0f17] text-white' : 'bg-[#f8f9fc] text-slate-900'
          }`}
        >
          <div
            className={`h-16 px-6 border-b flex items-center justify-between shrink-0 ${
              isDark ? 'border-[#222c3d] bg-[#111622]' : 'border-slate-200 bg-white shadow-xs'
            }`}
          >
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="font-bold text-sm">Fullscreen Live Preview</span>
              <span>·</span>
              <span className="text-indigo-500 font-bold capitalize">
                {portfolioData.meta.templateId}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setExportOpen(true)}
                className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-sm"
              >
                Export HTML
              </button>
              <button
                onClick={() => setIsFullscreen(false)}
                className={`p-2 rounded-full transition-colors ${
                  isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-500'
                }`}
                title="Exit Fullscreen"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            <TemplateRenderer data={portfolioData} />
          </div>
        </div>
      )}

      {/* M3 Command Palette (⌘K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        theme={studioTheme}
        onToggleTheme={toggleTheme}
        onSelectTemplate={handleSelectTemplate}
        onOpenCritic={() => setCriticOpen(true)}
        onOpenExport={() => setExportOpen(true)}
        onOpenImport={() => setImportOpen(true)}
        onToggleFullscreen={() => setIsFullscreen(true)}
      />

      {/* M3 Snackbar / Banner */}
      {snackbar.visible && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div
            className={`px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-medium border ${
              isDark
                ? 'bg-[#1e2534] border-[#2e3b52] text-white shadow-black/40'
                : 'bg-slate-900 border-slate-800 text-white shadow-slate-900/30'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{snackbar.message}</span>
            <button
              onClick={() => setSnackbar((prev) => ({ ...prev, visible: false }))}
              className="ml-2 text-slate-400 hover:text-white p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Modals & Drawers */}
      <TemplateMarketplaceModal
        isOpen={marketplaceOpen}
        theme={studioTheme}
        onClose={() => setMarketplaceOpen(false)}
        activeTemplateId={portfolioData.meta.templateId || 'modern-bento'}
        onApplyTemplate={handleSelectTemplate}
        currentData={portfolioData}
      />

      <ImportModal
        isOpen={importOpen}
        theme={studioTheme}
        onClose={() => setImportOpen(false)}
        onImport={(imported) => {
          setPortfolioData(imported);
          showSnackbar('Imported portfolio data successfully');
        }}
      />

      <ExportModal
        isOpen={exportOpen}
        theme={studioTheme}
        onClose={() => setExportOpen(false)}
        data={portfolioData}
      />

      <AiCriticDrawer
        isOpen={criticOpen}
        theme={studioTheme}
        onClose={() => setCriticOpen(false)}
        data={portfolioData}
      />

      <AiBulletModal
        isOpen={bulletModal.isOpen}
        theme={studioTheme}
        onClose={() => setBulletModal((prev) => ({ ...prev, isOpen: false }))}
        originalBullet={bulletModal.text}
        roleContext={bulletModal.roleContext}
        onApply={handleApplyEnhancedBullet}
      />
    </div>
  );
}
