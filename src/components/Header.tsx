import React from 'react';
import {
  GraduationCap,
  FileCode2,
  CheckCircle2,
  Layers,
  Sparkles,
  Upload,
  Copy,
  Check,
  MessageSquareCode,
  BookOpen,
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'assessment' | 'explorer' | 'architecture' | 'results';
  setActiveTab: (tab: 'assessment' | 'explorer' | 'architecture' | 'results') => void;
  hasEvaluated: boolean;
  score?: number;
  letterGrade?: string;
  onOpenUpload: () => void;
  onOpenTutor: () => void;
  onCopyMarkdown: () => void;
  hasCopied: boolean;
  codebaseName: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  hasEvaluated,
  score,
  letterGrade,
  onOpenUpload,
  onOpenTutor,
  onCopyMarkdown,
  hasCopied,
  codebaseName,
}) => {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Platform Info */}
          <div className="flex items-center space-x-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-1 ring-white/20">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  CodeTutor AI
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  Architectural Pedagogical Engine
                </span>
              </div>
              <p className="text-xs text-slate-400 truncate flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Target: <span className="text-slate-300 font-mono text-[11px]">{codebaseName}</span>
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-sm font-medium">
            <button
              onClick={() => setActiveTab('assessment')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === 'assessment'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Assessment</span>
            </button>
            <button
              onClick={() => setActiveTab('explorer')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === 'explorer'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <FileCode2 className="w-4 h-4" />
              <span>Codebase Explorer</span>
            </button>
            <button
              onClick={() => setActiveTab('architecture')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === 'architecture'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Class Blueprint</span>
            </button>
            {hasEvaluated && (
              <button
                onClick={() => setActiveTab('results')}
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg transition-all ${
                  activeTab === 'results'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-emerald-400 hover:text-emerald-300 hover:bg-slate-800/60'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Scorecard ({score}/100)</span>
                {letterGrade && (
                  <span className="text-[11px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    Grade {letterGrade}
                  </span>
                )}
              </button>
            )}
          </nav>

          {/* Action Tools */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onCopyMarkdown}
              title="Copy 3-Section Assessment as Clean Markdown"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors"
            >
              {hasCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span className="hidden sm:inline">Copy Markdown</span>
                </>
              )}
            </button>

            <button
              onClick={onOpenUpload}
              title="Upload new codebase ZIP"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors"
            >
              <Upload className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Upload Repo</span>
            </button>

            <button
              onClick={onOpenTutor}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-indigo-300 hover:text-white bg-indigo-950/60 hover:bg-indigo-900/60 border border-indigo-700/60 rounded-lg transition-colors"
            >
              <MessageSquareCode className="w-3.5 h-3.5 text-indigo-400" />
              <span>Ask Tutor AI</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-800/80 text-xs">
          <button
            onClick={() => setActiveTab('assessment')}
            className={`flex items-center gap-1 py-1 px-2 rounded ${
              activeTab === 'assessment' ? 'text-indigo-400 font-semibold' : 'text-slate-400'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" /> Assessment
          </button>
          <button
            onClick={() => setActiveTab('explorer')}
            className={`flex items-center gap-1 py-1 px-2 rounded ${
              activeTab === 'explorer' ? 'text-indigo-400 font-semibold' : 'text-slate-400'
            }`}
          >
            <FileCode2 className="w-3.5 h-3.5" /> Codebase
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`flex items-center gap-1 py-1 px-2 rounded ${
              activeTab === 'architecture' ? 'text-indigo-400 font-semibold' : 'text-slate-400'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Architecture
          </button>
          {hasEvaluated && (
            <button
              onClick={() => setActiveTab('results')}
              className={`flex items-center gap-1 py-1 px-2 rounded ${
                activeTab === 'results' ? 'text-emerald-400 font-semibold' : 'text-slate-400'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> Scorecard ({score})
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
