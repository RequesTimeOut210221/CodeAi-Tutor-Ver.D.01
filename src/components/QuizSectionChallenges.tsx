import React, { useState } from 'react';
import { CodeChallenge } from '../types';
import {
  Wrench,
  RotateCcw,
  Copy,
  Check,
  CheckCircle2,
  AlertCircle,
  FileCode,
  Sparkles,
} from 'lucide-react';

interface QuizSectionChallengesProps {
  challenges: CodeChallenge[];
  answers: Record<string, string>;
  onChangeAnswer: (challengeId: string, code: string) => void;
  onOpenFileReference?: (filePath: string) => void;
  onSubmitSection?: () => void;
}

export const QuizSectionChallenges: React.FC<QuizSectionChallengesProps> = ({
  challenges,
  answers,
  onChangeAnswer,
  onOpenFileReference,
  onSubmitSection,
}) => {
  const [activeChallengeId, setActiveChallengeId] = useState<string>(challenges[0]?.id || 'challengeA');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeChallenge = challenges.find((c) => c.id === activeChallengeId) || challenges[0];

  const handleReset = (challenge: CodeChallenge) => {
    onChangeAnswer(challenge.id, challenge.starterCode);
  };

  const handleCopy = (challenge: CodeChallenge) => {
    const code = answers[challenge.id] || challenge.starterCode;
    navigator.clipboard.writeText(code);
    setCopiedId(challenge.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const answeredCount = challenges.filter(
    (c) => (answers[c.id] || '').trim() && answers[c.id] !== c.starterCode
  ).length;

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
              Section 3 of 3
            </span>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              🛠️ Code Fix & Improvisation Challenges (2 Challenges)
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            <strong>Challenge A (Bug Fix):</strong> Identify and repair intentional defects in realistic snippets.
            <br />
            <strong>Challenge B (Feature/Refactor):</strong> Extend domain features adhering to Dart OOP design.
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <span className="text-slate-400">
            Progress:{' '}
            <strong className="text-amber-400 font-mono">
              {answeredCount}/{challenges.length}
            </strong>{' '}
            modified
          </span>
          {onSubmitSection && (
            <button
              onClick={onSubmitSection}
              disabled={answeredCount === 0}
              className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 disabled:opacity-40 disabled:hover:bg-amber-600 text-white font-medium transition-colors"
            >
              Grade Section 3
            </button>
          )}
        </div>
      </div>

      {/* Challenge Tabs */}
      <div className="flex space-x-2 border-b border-slate-800 pb-2">
        {challenges.map((c) => {
          const isSelected = activeChallenge.id === c.id;
          const isTouched = (answers[c.id] || '').trim() && answers[c.id] !== c.starterCode;

          return (
            <button
              key={c.id}
              onClick={() => setActiveChallengeId(c.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                isSelected
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>{c.type === 'bugfix' ? 'Challenge A (Bug Fix)' : 'Challenge B (Feature/Refactor)'}</span>
              {isTouched && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Changes made" />
              )}
            </button>
          );
        })}
      </div>

      {/* Active Challenge Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Requirements & Scenario (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-md">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px] font-mono text-slate-300 uppercase">
                  {activeChallenge.type}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Target: {activeChallenge.targetFile}
                </span>
              </div>
              <h4 className="text-base font-bold text-white mt-1.5">{activeChallenge.title}</h4>
              <p className="text-xs text-slate-400 mt-1">{activeChallenge.subtitle}</p>
            </div>

            {/* Scenario */}
            <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80 text-xs text-slate-300 leading-relaxed whitespace-pre-line">
              <span className="font-semibold text-slate-200 block mb-1">Scenario & Defect Context:</span>
              {activeChallenge.scenario}
            </div>

            {/* Requirements Checklist */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                Specification Requirements:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {activeChallenge.requirements.map((req, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-amber-400 shrink-0 mt-0.5">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Link to target file */}
            <button
              type="button"
              onClick={() => onOpenFileReference?.(activeChallenge.targetFile)}
              className="w-full flex items-center justify-center space-x-2 py-2 px-3 rounded-lg bg-slate-950 hover:bg-slate-800 text-indigo-400 text-xs border border-indigo-900/40 transition-colors font-mono"
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Inspect original {activeChallenge.targetFile}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Code Editor (7 cols) */}
        <div className="lg:col-span-7 flex flex-col bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          {/* Editor Header Toolbar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs">
            <div className="flex items-center space-x-2 font-mono text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 inline-block" />
              <span className="text-slate-400">editor:</span>
              <span className="font-semibold text-amber-300">{activeChallenge.id}.dart</span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => handleReset(activeChallenge)}
                className="flex items-center space-x-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title="Reset code to starter template"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>

              <button
                type="button"
                onClick={() => handleCopy(activeChallenge)}
                className="flex items-center space-x-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title="Copy current editor code"
              >
                {copiedId === activeChallenge.id ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Code Textarea */}
          <div className="relative flex-1 min-h-[420px]">
            <textarea
              value={answers[activeChallenge.id] ?? activeChallenge.starterCode}
              onChange={(e) => onChangeAnswer(activeChallenge.id, e.target.value)}
              className="w-full h-full p-4 bg-slate-950 text-slate-100 font-mono text-xs leading-relaxed resize-none focus:outline-none focus:ring-1 focus:ring-amber-500 font-normal"
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
            />
          </div>

          {/* Editor Status Footer */}
          <div className="px-4 py-2 bg-slate-900/60 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Dart OOP Syntax • Null-Safety Enabled</span>
            <span>
              {(answers[activeChallenge.id] ?? activeChallenge.starterCode).split('\n').length} lines
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
