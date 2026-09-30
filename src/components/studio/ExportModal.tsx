import React, { useState } from 'react';
import { PortfolioData } from '../../types/portfolio';
import { generateStandaloneHtml } from '../../utils/exportHtml';
import {
  Download,
  FileCode,
  Globe,
  Copy,
  Check,
  X,
  Code2,
} from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  theme: 'dark' | 'light';
  onClose: () => void;
  data: PortfolioData;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  theme,
  onClose,
  data,
}) => {
  const isDark = theme === 'dark';
  const [copiedJson, setCopiedJson] = useState(false);
  const [copiedMd, setCopiedMd] = useState(false);

  if (!isOpen) return null;

  const downloadJson = () => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-${data.basics.name.toLowerCase().replace(/\s+/g, '-') || 'user'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadHtml = () => {
    const htmlString = generateStandaloneHtml(data);
    const blob = new Blob([htmlString], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const copyReadmeMarkdown = () => {
    const md = `
### 👨‍💻 ${data.basics.name} — ${data.basics.headline}

${data.basics.bio}

- 📍 Location: ${data.basics.location.city}, ${data.basics.location.country}
- 💼 Projects: ${data.projects.map((p) => `[${p.title}](${p.liveUrl || p.repoUrl || '#'})`).join(' · ')}
- ⚡ Skills: ${data.skills.map((s) => s.items.slice(0, 4).join(', ')).join(' | ')}
    `.trim();

    navigator.clipboard.writeText(md);
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2000);
  };

  const cardStyle = `p-4 rounded-2xl border transition-all space-y-2 ${
    isDark
      ? 'bg-[#151c28] border-[#222c3d]'
      : 'bg-white border-slate-200 shadow-xs'
  }`;

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
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold">Export & Deploy Portfolio</h2>
              <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                100% data ownership with zero platform lock-in
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs font-sans">
          {/* Action 1: Static HTML bundle */}
          <div className={cardStyle}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-500">
                  <Globe className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm">
                  Standalone Static Website (<code className="font-mono text-cyan-500 text-xs">index.html</code>)
                </h3>
              </div>
              <button
                onClick={downloadHtml}
                className="px-4 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/20 active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .html</span>
              </button>
            </div>
            <p className={`leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Produces a self-contained, zero-dependency HTML file bundled with Tailwind CSS and typography fonts. Deploy instantly to GitHub Pages, Vercel, or Netlify.
            </p>
          </div>

          {/* Action 2: Raw portfolio.json */}
          <div className={cardStyle}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <FileCode className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm">
                  Canonical <code className="font-mono text-emerald-500 text-xs">portfolio.json</code>
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={copyJson}
                  className={`px-3 py-1.5 rounded-full border font-semibold flex items-center gap-1.5 transition-colors ${
                    isDark
                      ? 'bg-[#0f1420] border-[#252f40] hover:bg-[#1a2333]'
                      : 'bg-slate-100 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  {copiedJson ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedJson ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  onClick={downloadJson}
                  className="px-4 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 transition-all shadow-md shadow-emerald-600/20 active:scale-95"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .json</span>
                </button>
              </div>
            </div>
            <p className={`leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              The standard single source of truth file. Keep it in your dotfiles, Git repository, or migrate between themes without re-entering content.
            </p>
          </div>

          {/* Action 3: GitHub README Profile */}
          <div className={cardStyle}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <Code2 className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm">
                  GitHub Profile README
                </h3>
              </div>
              <button
                onClick={copyReadmeMarkdown}
                className={`px-3.5 py-1.5 rounded-full border font-semibold flex items-center gap-1.5 transition-colors ${
                  isDark
                    ? 'bg-[#0f1420] border-[#252f40] hover:bg-[#1a2333]'
                    : 'bg-slate-100 border-slate-200 hover:bg-slate-200'
                }`}
              >
                {copiedMd ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedMd ? 'Copied' : 'Copy Markdown'}</span>
              </button>
            </div>
            <p className={`leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Formatted markdown summary ready to drop into your personal GitHub profile repo (<code className="font-mono text-amber-500">username/README.md</code>).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
