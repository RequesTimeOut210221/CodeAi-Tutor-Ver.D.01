import React from 'react';
import { MCQQuestion } from '../types';
import { CheckCircle, HelpCircle, Code, ExternalLink } from 'lucide-react';

interface QuizSectionMCQProps {
  questions: MCQQuestion[];
  answers: Record<string, string>;
  onSelectAnswer: (questionId: string, optionId: string) => void;
  onOpenFileReference?: (filePath: string, line?: number) => void;
  onSubmitSection?: () => void;
}

export const QuizSectionMCQ: React.FC<QuizSectionMCQProps> = ({
  questions,
  answers,
  onSelectAnswer,
  onOpenFileReference,
  onSubmitSection,
}) => {
  const answeredCount = questions.filter((q) => answers[q.id]).length;

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
              Section 1 of 3
            </span>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              🎯 Multiple Choice Questions (5 Questions)
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Focus on execution flow, module dependencies, state management, and edge-case behavior.
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <span className="text-slate-400">
            Progress:{' '}
            <strong className="text-indigo-400 font-mono">
              {answeredCount}/{questions.length}
            </strong>{' '}
            answered
          </span>
          {onSubmitSection && (
            <button
              onClick={onSubmitSection}
              disabled={answeredCount === 0}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white font-medium transition-colors"
            >
              Grade Section 1
            </button>
          )}
        </div>
      </div>

      {/* Question Cards */}
      <div className="space-y-6">
        {questions.map((q) => {
          const selectedOption = answers[q.id];

          // Parse start line if available
          let lineNum = 1;
          const match = q.lineRange.match(/\d+/);
          if (match) lineNum = parseInt(match[0], 10);

          return (
            <div
              key={q.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-md transition-all hover:border-slate-700/80 space-y-4"
            >
              {/* Question Meta & Tag */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-full bg-indigo-600/30 border border-indigo-500/50 text-indigo-300 font-bold flex items-center justify-center text-xs">
                    {q.number}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                    {q.focusArea}
                  </span>
                </div>

                {/* File Reference Link */}
                <button
                  type="button"
                  onClick={() => onOpenFileReference?.(q.fileReference, lineNum)}
                  className="inline-flex items-center space-x-1.5 text-xs text-indigo-400 hover:text-indigo-300 bg-indigo-950/40 hover:bg-indigo-900/50 border border-indigo-800/40 px-2.5 py-1 rounded-lg transition-colors font-mono"
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>
                    {q.fileReference} ({q.lineRange})
                  </span>
                  <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
                </button>
              </div>

              {/* Question Text */}
              <p className="text-sm sm:text-base font-medium text-slate-100 leading-relaxed">
                {q.question}
              </p>

              {/* 4 Options (A, B, C, D) */}
              <div className="space-y-2.5 pt-1">
                {q.options.map((opt) => {
                  const isChecked = selectedOption === opt.id;
                  return (
                    <label
                      key={opt.id}
                      className={`group flex items-start space-x-3.5 p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-indigo-950/40 border-indigo-500 text-white shadow-sm ring-1 ring-indigo-500/30'
                          : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/40 text-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        value={opt.id}
                        checked={isChecked}
                        onChange={() => onSelectAnswer(q.id, opt.id)}
                        className="sr-only"
                      />
                      <span
                        className={`w-6 h-6 shrink-0 rounded-lg flex items-center justify-center text-xs font-bold font-mono transition-colors ${
                          isChecked
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-slate-200'
                        }`}
                      >
                        {opt.id}
                      </span>
                      <span className="text-xs sm:text-sm leading-relaxed pt-0.5">
                        {opt.text}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
