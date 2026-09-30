import React, { useState, useEffect } from 'react';
import { Sparkles, X, Check, Loader2, RefreshCw } from 'lucide-react';

interface Variation {
  label: string;
  text: string;
}

interface AiBulletModalProps {
  isOpen: boolean;
  theme: 'dark' | 'light';
  onClose: () => void;
  originalBullet: string;
  roleContext?: { role?: string; company?: string };
  onApply: (enhancedText: string) => void;
}

export const AiBulletModal: React.FC<AiBulletModalProps> = ({
  isOpen,
  theme,
  onClose,
  originalBullet,
  roleContext,
  onApply,
}) => {
  const isDark = theme === 'dark';
  const [loading, setLoading] = useState(false);
  const [variations, setVariations] = useState<Variation[]>([]);
  const [reasoning, setReasoning] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const fetchEnhancements = async () => {
    if (!originalBullet.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/gemini/enhance-bullet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bullet: originalBullet, context: roleContext }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to enhance bullet');
      }
      const data = await res.json();
      setVariations(data.variations || []);
      setReasoning(data.reasoning || '');
    } catch (err: any) {
      setError(err.message || 'Error communicating with AI service');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && originalBullet) {
      fetchEnhancements();
    }
  }, [isOpen, originalBullet]);

  if (!isOpen) return null;

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
            <div className="w-9 h-9 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold">
                AI Bullet Enhancer (Google X-Y-Z)
              </h2>
              <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Accomplished [X], measured by [Y], by doing [Z]
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
          {/* Original Context */}
          <div
            className={`p-3.5 rounded-2xl border space-y-1 ${
              isDark ? 'bg-[#0f1420] border-[#1d2534]' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span
              className={`text-[10px] font-mono uppercase tracking-wider block ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              Original Text {roleContext?.role ? `(${roleContext.role} @ ${roleContext.company})` : ''}
            </span>
            <p className="italic font-medium">"{originalBullet}"</p>
          </div>

          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-400">
              <Loader2 className="w-7 h-7 text-amber-500 animate-spin" />
              <span className="font-semibold text-sm">Applying Google X-Y-Z formula via Gemini...</span>
            </div>
          ) : error ? (
            <div className="p-4 rounded-2xl bg-red-950/40 border border-red-900/60 text-red-300 space-y-2">
              <p className="font-semibold">Unable to polish bullet:</p>
              <p>{error}</p>
              <button
                onClick={fetchEnhancements}
                className="mt-2 px-3 py-1 bg-red-900 hover:bg-red-800 text-white rounded-full text-xs flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between font-medium opacity-80">
                <span>Select a high-impact variation to apply:</span>
                <button
                  onClick={fetchEnhancements}
                  className="text-amber-500 hover:underline flex items-center gap-1 text-[11px] font-semibold"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Regenerate</span>
                </button>
              </div>

              {variations.map((v, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all space-y-2 group ${
                    isDark
                      ? 'bg-[#0f1420] border-[#222c3d] hover:border-amber-500/60'
                      : 'bg-white border-slate-200 hover:border-amber-500/60 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-amber-500 font-bold">
                      {v.label}
                    </span>
                    <button
                      onClick={() => {
                        onApply(v.text);
                        onClose();
                      }}
                      className="px-3 py-1 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-bold text-[11px] flex items-center gap-1 transition-transform active:scale-95"
                    >
                      <span>Apply</span>
                      <Check className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="leading-relaxed font-sans font-medium">{v.text}</p>
                </div>
              ))}

              {reasoning && (
                <div
                  className={`pt-3 text-[11px] border-t ${
                    isDark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
                  }`}
                >
                  <span className="font-semibold">Rationale:</span> {reasoning}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
