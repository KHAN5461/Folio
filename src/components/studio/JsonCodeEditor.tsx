import React, { useState, useEffect } from 'react';
import { PortfolioData } from '../../types/portfolio';
import {
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Download,
  AlertTriangle,
  Code2,
  FileCheck2,
  Wand2,
} from 'lucide-react';
import { M3Button, M3IconButton } from '../m3';
import { JsonErrorIllustration } from '../illustrations';

interface JsonCodeEditorProps {
  data: PortfolioData;
  theme: 'dark' | 'light';
  onChange: (updated: PortfolioData) => void;
}

export const JsonCodeEditor: React.FC<JsonCodeEditorProps> = ({
  data,
  theme,
  onChange,
}) => {
  const isDark = theme === 'dark';
  const [rawJson, setRawJson] = useState(() => JSON.stringify(data, null, 2));
  const [parseError, setParseError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [lastValidJson, setLastValidJson] = useState(() => JSON.stringify(data, null, 2));

  // Sync incoming props if external changes happened and no local parse error
  useEffect(() => {
    if (!parseError) {
      const formatted = JSON.stringify(data, null, 2);
      setRawJson(formatted);
      setLastValidJson(formatted);
    }
  }, [data, parseError]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setRawJson(val);
    try {
      const parsed = JSON.parse(val);
      setParseError(null);
      setLastValidJson(val);
      onChange(parsed);
    } catch (err: any) {
      setParseError(err.message || 'Invalid JSON syntax');
    }
  };

  const handleRevert = () => {
    setRawJson(lastValidJson);
    setParseError(null);
    try {
      const parsed = JSON.parse(lastValidJson);
      onChange(parsed);
    } catch (e) {
      // Ignore
    }
  };

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(rawJson);
      const formatted = JSON.stringify(parsed, null, 2);
      setRawJson(formatted);
      setParseError(null);
      setLastValidJson(formatted);
      onChange(parsed);
    } catch (err: any) {
      setParseError(err.message || 'Cannot format invalid JSON');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(rawJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([rawJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-${data.basics.name.toLowerCase().replace(/\s+/g, '-') || 'data'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const lineCount = rawJson.split('\n').length;

  return (
    <div className="h-full flex flex-col overflow-hidden font-mono select-text">
      {/* Editor Sub-Header Toolbar */}
      <div
        className={`h-11 px-4 border-b flex items-center justify-between text-xs shrink-0 select-none ${
          isDark
            ? 'bg-[#101522] border-[#222c3d] text-slate-300'
            : 'bg-slate-100/90 border-slate-250 text-slate-700'
        }`}
      >
        <div className="flex items-center gap-2">
          <Code2 className="w-3.5 h-3.5 text-indigo-500" />
          <span className="font-bold">schema: portfolio.json</span>
          <span className="text-[10px] opacity-60">({lineCount} lines)</span>
        </div>

        <div className="flex items-center gap-1.5">
          <M3Button
            variant="text"
            size="sm"
            onClick={handleFormat}
            disabled={!!parseError}
            icon={<Wand2 className="w-3 h-3 text-indigo-500" />}
            title="Auto-format and beautify JSON"
          >
            Format
          </M3Button>

          <M3IconButton
            variant="standard"
            size="sm"
            onClick={handleCopy}
            title={copied ? 'Copied to clipboard!' : 'Copy raw JSON'}
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </M3IconButton>

          <M3IconButton
            variant="standard"
            size="sm"
            onClick={handleDownload}
            title="Download portfolio.json"
          >
            <Download className="w-3.5 h-3.5" />
          </M3IconButton>
        </div>
      </div>

      {/* M3 Real-time Parse Error Banner */}
      {parseError && (
        <div className="bg-rose-500/15 dark:bg-rose-950/40 border-b border-rose-500/40 p-3 flex items-start justify-between gap-3 text-xs shrink-0 animate-in fade-in duration-200">
          <div className="flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-rose-500/20 text-rose-500 flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-bold text-rose-600 dark:text-rose-400 block font-sans">
                JSON Syntax Error Detected
              </span>
              <p className="text-[11px] font-mono text-rose-700 dark:text-rose-300 break-all leading-tight">
                {parseError}
              </p>
            </div>
          </div>

          <button
            onClick={handleRevert}
            className="px-3 py-1 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-[10px] flex items-center gap-1 shrink-0 shadow-xs transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Revert</span>
          </button>
        </div>
      )}

      {/* Code Textarea & Gutter */}
      <div className="flex-1 relative overflow-hidden flex">
        {/* Line Numbers Gutter */}
        <div
          className={`w-12 py-3 pr-2 text-right select-none text-[11px] leading-[20px] font-mono border-r shrink-0 opacity-40 ${
            isDark ? 'bg-[#0a0d14] border-slate-800' : 'bg-slate-50 border-slate-250 text-slate-600'
          }`}
        >
          {Array.from({ length: Math.min(lineCount, 300) }, (_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Editor Area */}
        <textarea
          value={rawJson}
          onChange={handleTextChange}
          spellCheck={false}
          className={`flex-1 p-3 text-[11px] leading-[20px] font-mono resize-none focus:outline-none overflow-auto whitespace-pre tab-4 ${
            isDark
              ? 'bg-[#0b0e17] text-indigo-100 placeholder-slate-600 selection:bg-indigo-600/40'
              : 'bg-white text-slate-800 placeholder-slate-400 selection:bg-indigo-500/20'
          } ${parseError ? 'ring-1 ring-inset ring-rose-500/30' : ''}`}
          placeholder="Paste or write valid portfolio JSON..."
        />
      </div>

      {/* Editor Status Bar */}
      <div
        className={`h-7 px-3 border-t flex items-center justify-between text-[10px] font-mono select-none shrink-0 ${
          isDark
            ? 'bg-[#0c101a] border-slate-800 text-slate-400'
            : 'bg-slate-100 border-slate-200 text-slate-600'
        }`}
      >
        <div className="flex items-center gap-2">
          {parseError ? (
            <span className="flex items-center gap-1 text-rose-500 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
              <span>SYNTAX ERROR</span>
            </span>
          ) : (
            <span className="flex items-center gap-1 text-emerald-500 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>VALID JSON</span>
            </span>
          )}
        </div>

        <span>FolioCraft Standard Schema v1.0.0</span>
      </div>
    </div>
  );
};
