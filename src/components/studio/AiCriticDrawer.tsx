import React, { useState } from 'react';
import { PortfolioData } from '../../types/portfolio';
import {
  Sparkles,
  X,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  RefreshCw,
  Tag,
} from 'lucide-react';

interface AuditResult {
  overallScore: number;
  summary: string;
  categoryScores: {
    completeness: number;
    impact: number;
    technicalClarity: number;
    proofAndLinks: number;
  };
  strengths: string[];
  actionableImprovements: Array<{
    section: string;
    priority: 'high' | 'medium' | 'low';
    issue: string;
    suggestion: string;
  }>;
  suggestedKeywords: string[];
}

interface AiCriticDrawerProps {
  isOpen: boolean;
  theme: 'dark' | 'light';
  onClose: () => void;
  data: PortfolioData;
}

export const AiCriticDrawer: React.FC<AiCriticDrawerProps> = ({
  isOpen,
  theme,
  onClose,
  data,
}) => {
  const isDark = theme === 'dark';
  const [loading, setLoading] = useState(false);
  const [audit, setAudit] = useState<AuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runAudit = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/gemini/audit-portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ portfolio: data }),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to analyze portfolio');
      }
      const result = await res.json();
      setAudit(result);
    } catch (err: any) {
      setError(err.message || 'Error communicating with AI critic service');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (isOpen && !audit && !loading) {
      runAudit();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div
        className={`w-full max-w-lg border-l h-full flex flex-col shadow-2xl transition-colors ${
          isDark
            ? 'bg-[#111622] border-[#222c3d] text-slate-100'
            : 'bg-white border-slate-200 text-slate-800'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className={`p-5 border-b flex items-center justify-between ${
            isDark ? 'border-[#222c3d] bg-[#0d121c]' : 'border-slate-100 bg-slate-50/70'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold">
                Portfolio Critic & Quality Audit
              </h2>
              <p className={`text-[11px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Powered by Gemini 3.8 Flash
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={runAudit}
              disabled={loading}
              className={`p-2 rounded-full transition-colors disabled:opacity-50 ${
                isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-500'
              }`}
              title="Re-run Analysis"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className={`p-2 rounded-full transition-colors ${
                isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-500'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs font-sans">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400">
              <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
              <span className="font-semibold text-sm">
                Auditing portfolio storytelling, metrics, & schema...
              </span>
              <span className="text-xs opacity-75 max-w-xs text-center">
                Scoring project links, Google X-Y-Z metrics, and skills taxonomy.
              </span>
            </div>
          ) : error ? (
            <div className="p-4 rounded-2xl bg-red-950/40 border border-red-900 text-red-300 space-y-3">
              <p className="font-semibold text-sm">Audit couldn't complete:</p>
              <p className="text-xs">{error}</p>
              <button
                onClick={runAudit}
                className="px-4 py-1.5 bg-red-900 hover:bg-red-800 text-white rounded-full text-xs flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </button>
            </div>
          ) : audit ? (
            <>
              {/* Overall Score Card */}
              <div
                className={`p-5 rounded-3xl border space-y-4 ${
                  isDark ? 'bg-[#151c28] border-[#222c3d]' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <span
                      className={`text-[11px] font-mono uppercase tracking-wider block ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      Overall Quality Score
                    </span>
                    <p className="text-xs leading-relaxed max-w-xs font-medium">
                      {audit.summary}
                    </p>
                  </div>
                  <div className="w-18 h-18 rounded-3xl bg-amber-500/15 border border-amber-500/30 flex flex-col items-center justify-center text-amber-500 font-bold shrink-0">
                    <span className="text-2xl font-mono tabular-nums leading-none">
                      {audit.overallScore}
                    </span>
                    <span className="text-[10px] opacity-75 font-normal">/ 100</span>
                  </div>
                </div>

                {/* Sub Scores */}
                <div
                  className={`space-y-2 pt-3 border-t ${
                    isDark ? 'border-slate-800' : 'border-slate-200'
                  }`}
                >
                  <ScoreBar
                    label="Completeness & Metadata"
                    score={audit.categoryScores.completeness}
                    isDark={isDark}
                  />
                  <ScoreBar
                    label="Impact & Storytelling (X-Y-Z)"
                    score={audit.categoryScores.impact}
                    isDark={isDark}
                  />
                  <ScoreBar
                    label="Technical Clarity & Taxonomy"
                    score={audit.categoryScores.technicalClarity}
                    isDark={isDark}
                  />
                  <ScoreBar
                    label="Proof, Media & Live Links"
                    score={audit.categoryScores.proofAndLinks}
                    isDark={isDark}
                  />
                </div>
              </div>

              {/* Strengths */}
              {audit.strengths && audit.strengths.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-bold text-xs uppercase tracking-wider font-mono flex items-center gap-1.5 opacity-90">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Key Strengths</span>
                  </h3>
                  <div className="space-y-2">
                    {audit.strengths.map((str, idx) => (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-2xl border text-xs leading-relaxed ${
                          isDark
                            ? 'bg-emerald-950/20 border-emerald-900/40 text-emerald-300'
                            : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        }`}
                      >
                        {str}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actionable Improvements */}
              {audit.actionableImprovements && audit.actionableImprovements.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-bold text-xs uppercase tracking-wider font-mono flex items-center gap-1.5 opacity-90">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span>Actionable Improvements</span>
                  </h3>

                  <div className="space-y-3">
                    {audit.actionableImprovements.map((imp, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-2xl border space-y-1.5 ${
                          isDark
                            ? 'bg-[#151c28] border-[#222c3d]'
                            : 'bg-white border-slate-200 shadow-xs'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono text-indigo-500 font-bold">
                            {imp.section}
                          </span>
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase font-bold ${
                              imp.priority === 'high'
                                ? 'bg-red-500/15 text-red-500 border border-red-500/30'
                                : imp.priority === 'medium'
                                ? 'bg-amber-500/15 text-amber-500 border border-amber-500/30'
                                : 'bg-slate-500/15 text-slate-500 border border-slate-500/30'
                            }`}
                          >
                            {imp.priority}
                          </span>
                        </div>
                        <p className="font-semibold">{imp.issue}</p>
                        <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          💡 Fix: {imp.suggestion}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggested Keywords */}
              {audit.suggestedKeywords && audit.suggestedKeywords.length > 0 && (
                <div
                  className={`space-y-2 pt-3 border-t ${
                    isDark ? 'border-slate-800' : 'border-slate-200'
                  }`}
                >
                  <h3 className="font-bold text-xs uppercase tracking-wider font-mono flex items-center gap-1.5 opacity-90">
                    <Tag className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Recruiter Keywords</span>
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {audit.suggestedKeywords.map((kw, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1 rounded-full text-[11px] font-mono font-medium border ${
                          isDark
                            ? 'bg-[#182133] border-slate-700 text-slate-300'
                            : 'bg-slate-100 border-slate-200 text-slate-700'
                        }`}
                      >
                        +{kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const ScoreBar: React.FC<{ label: string; score: number; isDark: boolean }> = ({
  label,
  score,
  isDark,
}) => {
  const getColor = (s: number) => {
    if (s >= 80) return 'bg-emerald-500';
    if (s >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-[11px]">
        <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>{label}</span>
        <span className="font-mono tabular-nums font-bold">
          {score}%
        </span>
      </div>
      <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ${getColor(score)}`}
          style={{ width: `${Math.min(100, Math.max(0, score))}%` }}
        />
      </div>
    </div>
  );
};
