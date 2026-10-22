import React, { useEffect } from 'react';
import { EvaluationResult, AssessmentQuiz } from '../types';
import confetti from 'canvas-confetti';
import {
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  FileCode,
  TrendingUp,
  RotateCcw,
  Download,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Zap,
  AlertCircle,
} from 'lucide-react';

interface MasteryScorecardProps {
  evaluation: EvaluationResult;
  quiz: AssessmentQuiz;
  onRetake: () => void;
  onOpenFileReference?: (filePath: string, line?: number) => void;
  onOpenTutor?: () => void;
}

export const MasteryScorecard: React.FC<MasteryScorecardProps> = ({
  evaluation,
  quiz,
  onRetake,
  onOpenFileReference,
  onOpenTutor,
}) => {
  // Trigger confetti for high mastery score!
  useEffect(() => {
    if (evaluation.overallScore >= 75) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore if not loaded
      }
    }
  }, [evaluation.overallScore]);

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'S':
        return 'text-emerald-300 bg-emerald-500/20 border-emerald-500/40';
      case 'A':
        return 'text-cyan-300 bg-cyan-500/20 border-cyan-500/40';
      case 'B':
        return 'text-indigo-300 bg-indigo-500/20 border-indigo-500/40';
      case 'C':
        return 'text-amber-300 bg-amber-500/20 border-amber-500/40';
      default:
        return 'text-rose-300 bg-rose-500/20 border-rose-500/40';
    }
  };

  const downloadReport = () => {
    let md = `# CodeTutor AI - Mastery Evaluation Report\n\n`;
    md += `**Target Codebase:** ${quiz.codebaseName}\n`;
    md += `**Overall Mastery Score:** ${evaluation.overallScore}/100 (Grade ${evaluation.letterGrade})\n\n`;
    md += `### Summary\n${evaluation.summary}\n\n`;
    md += `### Competency Breakdown\n`;
    md += `- Execution Flow & Logic: ${evaluation.subScores.executionFlow}%\n`;
    md += `- Architecture & Design: ${evaluation.subScores.architecture}%\n`;
    md += `- Edge Cases & Code Quality: ${evaluation.subScores.codeQuality}%\n\n`;

    md += `## Section 1: Multiple Choice Questions\n`;
    evaluation.mcqResults.forEach((m, idx) => {
      md += `\n**Q${idx + 1} (${m.questionId}):** User Chose [${m.userAnswer}] | Correct: [${m.correctAnswer}] — ${
        m.isCorrect ? '✅ PASSED' : '❌ INCORRECT'
      }\n`;
      md += `*Code Reference:* ${m.codeReference}\n`;
      md += `*Explanation:* ${m.explanation}\n`;
    });

    md += `\n## Section 2: Conceptual & Architecture Essays\n`;
    evaluation.essayResults.forEach((e, idx) => {
      md += `\n**Essay ${idx + 1} (${e.promptId}):** Score ${e.score}/${e.maxScore}\n`;
      md += `*Feedback:* ${e.feedback}\n`;
    });

    md += `\n## Section 3: Code Challenges\n`;
    evaluation.challengeResults.forEach((c) => {
      md += `\n**${c.title}:** Score ${c.score}/${c.maxScore} (${c.isPass ? 'PASS' : 'RETRY'})\n`;
      md += `*Code Review:* ${c.codeReview}\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `codetutor-mastery-report-${evaluation.overallScore}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Top Mastery Badge & Summary Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-indigo-950/40 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-300">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Official Pedagogical Grade Report</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Codebase Mastery Evaluation
            </h2>
            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              {evaluation.summary}
            </p>
          </div>

          {/* Radial Score Gauge */}
          <div className="flex items-center space-x-6 shrink-0">
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-800"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className={
                      evaluation.overallScore >= 80
                        ? 'text-emerald-500'
                        : evaluation.overallScore >= 60
                        ? 'text-cyan-500'
                        : 'text-amber-500'
                    }
                    strokeDasharray={`${evaluation.overallScore}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black font-mono text-white">
                    {evaluation.overallScore}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                    Score / 100
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-1">
              <div
                className={`w-14 h-14 rounded-2xl border flex items-center justify-center font-black text-2xl font-mono shadow-lg ${getGradeColor(
                  evaluation.letterGrade
                )}`}
              >
                {evaluation.letterGrade}
              </div>
              <span className="text-[11px] font-semibold text-slate-400">Mastery Tier</span>
            </div>
          </div>
        </div>

        {/* Competency Sub-Scores Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/60">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-indigo-400" />
                Execution Flow & Logic
              </span>
              <span className="font-mono font-bold text-slate-200">
                {evaluation.subScores.executionFlow}%
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all duration-1000"
                style={{ width: `${evaluation.subScores.executionFlow}%` }}
              />
            </div>
          </div>

          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/60">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                Architecture & Design
              </span>
              <span className="font-mono font-bold text-slate-200">
                {evaluation.subScores.architecture}%
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-cyan-500 rounded-full transition-all duration-1000"
                style={{ width: `${evaluation.subScores.architecture}%` }}
              />
            </div>
          </div>

          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/60">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-400 flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5 text-amber-400" />
                Edge Cases & Code Quality
              </span>
              <span className="font-mono font-bold text-slate-200">
                {evaluation.subScores.codeQuality}%
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-1000"
                style={{ width: `${evaluation.subScores.codeQuality}%` }}
              />
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-end gap-3 mt-6 pt-4 border-t border-slate-800/80">
          <button
            onClick={downloadReport}
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report (.md)</span>
          </button>
          <button
            onClick={onRetake}
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Assessment</span>
          </button>
          {onOpenTutor && (
            <button
              onClick={onOpenTutor}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask Tutor Follow-ups</span>
            </button>
          )}
        </div>
      </div>

      {/* Detailed Section 1 Results (MCQs) */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          🎯 Section 1 Review: Multiple Choice Questions
        </h3>
        <div className="space-y-4">
          {evaluation.mcqResults.map((m, idx) => {
            const originalQ = quiz.mcqs.find((q) => q.id === m.questionId) || quiz.mcqs[idx];

            return (
              <div
                key={m.questionId}
                className={`p-5 rounded-2xl border transition-all ${
                  m.isCorrect
                    ? 'bg-emerald-950/20 border-emerald-500/30'
                    : 'bg-rose-950/20 border-rose-500/30'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center space-x-2">
                    {m.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    )}
                    <span className="font-bold text-sm text-slate-100">
                      Question {idx + 1}: {originalQ?.focusArea}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 text-xs font-mono">
                    <span
                      className={`px-2 py-0.5 rounded font-semibold ${
                        m.isCorrect
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-rose-500/20 text-rose-300'
                      }`}
                    >
                      Your Answer: [{m.userAnswer}]
                    </span>
                    {!m.isCorrect && (
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-emerald-300 font-semibold">
                        Correct: [{m.correctAnswer}]
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 mb-3">{originalQ?.question}</p>

                {/* Explanation Box */}
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-indigo-300 flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5" />
                      Pedagogical Explanation:
                    </span>
                    <button
                      type="button"
                      onClick={() => onOpenFileReference?.(m.codeReference)}
                      className="text-[11px] text-indigo-400 hover:text-indigo-300 font-mono flex items-center gap-1"
                    >
                      <span>ref: {m.codeReference}</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="leading-relaxed text-slate-300">{m.explanation}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Section 2 Results (Essays) */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          📝 Section 2 Review: Conceptual & Architecture Essays
        </h3>
        <div className="space-y-4">
          {evaluation.essayResults.map((e, idx) => {
            const originalPrompt = quiz.essays.find((p) => p.id === e.promptId) || quiz.essays[idx];

            return (
              <div
                key={e.promptId}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs text-violet-400 font-semibold uppercase">
                      Essay {idx + 1} • {originalPrompt?.category}
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-white">
                      {originalPrompt?.title}
                    </h4>
                  </div>
                  <div className="font-mono text-xs px-2.5 py-1 rounded-lg bg-violet-500/10 text-violet-300 border border-violet-500/30">
                    Score: <strong>{e.score}</strong> / {e.maxScore} pts
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs space-y-2">
                  <p className="text-slate-300 leading-relaxed">
                    <strong className="text-violet-300">Instructor Feedback: </strong>
                    {e.feedback}
                  </p>
                  {e.keyPointsCovered && e.keyPointsCovered.length > 0 && (
                    <div className="text-[11px] text-emerald-400">
                      ✓ Covered: {e.keyPointsCovered.join(' • ')}
                    </div>
                  )}
                  {e.missedOpportunities && e.missedOpportunities.length > 0 && (
                    <div className="text-[11px] text-amber-400">
                      △ Missed Nuances: {e.missedOpportunities.join(' • ')}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Section 3 Results (Code Challenges) */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          🛠️ Section 3 Review: Code Fix & Improvisation Challenges
        </h3>
        <div className="space-y-4">
          {evaluation.challengeResults.map((c) => (
            <div
              key={c.challengeId}
              className={`p-5 rounded-2xl border space-y-3 ${
                c.isPass
                  ? 'bg-slate-900/80 border-emerald-500/30'
                  : 'bg-slate-900/80 border-amber-500/30'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  {c.isPass ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-amber-400" />
                  )}
                  <h4 className="text-sm sm:text-base font-bold text-white">{c.title}</h4>
                </div>
                <div className="font-mono text-xs px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  Score: <strong>{c.score}</strong> / {c.maxScore} pts
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs space-y-2 text-slate-300">
                <p>
                  <strong className="text-amber-300">Code Logic & Syntax Review: </strong>
                  {c.codeReview}
                </p>
                {c.solutionComparison && (
                  <p className="text-slate-400 pt-1 border-t border-slate-800">
                    <strong className="text-slate-300">Benchmark Comparison: </strong>
                    {c.solutionComparison}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
