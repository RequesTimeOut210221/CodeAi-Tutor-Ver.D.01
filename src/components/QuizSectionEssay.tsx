import React, { useState } from 'react';
import { EssayPrompt } from '../types';
import { BookOpen, Lightbulb, ChevronDown, ChevronUp, FileCode } from 'lucide-react';

interface QuizSectionEssayProps {
  essays: EssayPrompt[];
  answers: Record<string, string>;
  onChangeAnswer: (promptId: string, text: string) => void;
  onOpenFileReference?: (filePath: string) => void;
  onSubmitSection?: () => void;
}

export const QuizSectionEssay: React.FC<QuizSectionEssayProps> = ({
  essays,
  answers,
  onChangeAnswer,
  onOpenFileReference,
  onSubmitSection,
}) => {
  const [expandedHints, setExpandedHints] = useState<Record<string, boolean>>({});

  const toggleHints = (id: string) => {
    setExpandedHints((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const answeredCount = essays.filter((e) => (answers[e.id] || '').trim().length > 20).length;

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-violet-500/10 text-violet-400 border border-violet-500/30">
              Section 2 of 3
            </span>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              📝 Conceptual & Architecture Essay Prompts ({essays.length} Prompts)
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Focus on system design trade-offs, component interactions, and data lifecycles.
            Explain <em>why</em> specific design patterns were chosen in this codebase.
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <span className="text-slate-400">
            Progress:{' '}
            <strong className="text-violet-400 font-mono">
              {answeredCount}/{essays.length}
            </strong>{' '}
            drafted
          </span>
          {onSubmitSection && (
            <button
              onClick={onSubmitSection}
              disabled={answeredCount === 0}
              className="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:hover:bg-violet-600 text-white font-medium transition-colors"
            >
              Grade Section 2
            </button>
          )}
        </div>
      </div>

      {/* Essay Prompt Cards */}
      <div className="space-y-6">
        {essays.map((essay) => {
          const text = answers[essay.id] || '';
          const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
          const showHints = expandedHints[essay.id] ?? false;

          return (
            <div
              key={essay.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-md hover:border-slate-700/80 transition-all space-y-4"
            >
              {/* Meta & Category */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-full bg-violet-600/30 border border-violet-500/50 text-violet-300 font-bold flex items-center justify-center text-xs">
                    {essay.number}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-violet-300 font-medium">
                    {essay.category}
                  </span>
                </div>

                {/* Relevant Files */}
                <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
                  {essay.relevantFiles.map((file) => (
                    <button
                      key={file}
                      type="button"
                      onClick={() => onOpenFileReference?.(file)}
                      className="inline-flex items-center space-x-1 text-slate-400 hover:text-indigo-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 hover:border-indigo-500/40 transition-colors"
                    >
                      <FileCode className="w-3 h-3 text-indigo-400" />
                      <span>{file}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Title & Prompt Text */}
              <div>
                <h4 className="text-base font-semibold text-white">{essay.title}</h4>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                  {essay.prompt}
                </p>
              </div>

              {/* Architectural Questions to Address Accordion */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/40 overflow-hidden text-xs">
                <button
                  type="button"
                  onClick={() => toggleHints(essay.id)}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <span className="flex items-center gap-1.5 font-medium text-amber-400/90">
                    <Lightbulb className="w-3.5 h-3.5" />
                    Key Architectural Points to Address ({essay.keyArchitectureQuestions.length})
                  </span>
                  {showHints ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                {showHints && (
                  <div className="px-4 pb-3 pt-1 space-y-1.5 border-t border-slate-800/60 bg-slate-950/70">
                    {essay.keyArchitectureQuestions.map((pt, i) => (
                      <div key={i} className="flex items-start space-x-2 text-slate-300">
                        <span className="text-amber-400">•</span>
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Textarea Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <label htmlFor={`essay-${essay.id}`} className="font-medium text-slate-300">
                    Your Architectural Explanation:
                  </label>
                  <span className="font-mono text-[11px] text-slate-500">
                    {wordCount} words • {text.length} characters
                  </span>
                </div>
                <textarea
                  id={`essay-${essay.id}`}
                  rows={6}
                  value={text}
                  onChange={(e) => onChangeAnswer(essay.id, e.target.value)}
                  placeholder="Articulate the system design trade-offs, language mechanisms, and domain guarantees..."
                  className="w-full rounded-xl bg-slate-950 border border-slate-700/80 text-sm text-slate-100 p-3.5 leading-relaxed focus:outline-none focus:ring-2 focus:ring-violet-500 font-sans resize-y placeholder:text-slate-600"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
