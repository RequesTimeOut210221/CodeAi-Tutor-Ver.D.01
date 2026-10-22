import React, { useState } from 'react';

interface PerformanceReportViewProps {
  onRetake: () => void;
  onStartNextStage: () => void;
}

export const PerformanceReportView: React.FC<PerformanceReportViewProps> = ({
  onRetake,
  onStartNextStage,
}) => {
  const [activeTab, setActiveTab] = useState<'mcq' | 'essay' | 'code'>('mcq');

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="w-full flex flex-col gap-6 font-['JetBrains_Mono'] max-w-[1360px] mx-auto">
      {/* Top Report Banner: Sketched Header & Ink Stamp */}
      <div className="relative bg-white border-2 border-[#1b1c1c] p-4 rounded-lg shadow-[3px_3px_0px_#1b1c1c] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Faux Top Masking Tape Deco */}
        <div className="absolute -top-3 left-12 w-28 h-5 bg-[#eae7e7]/90 border border-[#1b1c1c] rotate-[-1deg] shadow-sm pointer-events-none" />

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs text-[#4d4632]">
            <span className="material-symbols-outlined text-[16px] text-[#006c4b]">verified_user</span>
            <span className="tracking-widest uppercase font-bold">Telemetry Evaluation Complete</span>
            <span className="text-[#7f7660]">/</span>
            <span className="bg-[#facc15] border border-[#1b1c1c] px-1.5 py-0.2 rounded text-[#1b1c1c] font-bold">
              Gemini 1.5 Pro Engine
            </span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="font-['Bricolage_Grotesque'] text-2xl font-bold text-[#1b1c1c] tracking-tight">
              React 19 Concurrent Core Assessment
            </h1>
            <span className="text-xs px-2.5 py-0.5 bg-[#64f9bc] border border-[#1b1c1c] text-[#002114] rounded font-bold rotate-[1deg] shadow-[1px_1px_0px_#1b1c1c]">
              STATUS: PASSED
            </span>
          </div>
        </div>

        {/* Ink Stamped Run ID */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <div className="px-3.5 py-1.5 bg-[#ffdad6]/40 text-[#ba1a1a] border-2 border-[#ba1a1a] rounded rotate-[-2.5deg] shadow-[2px_2px_0px_#ba1a1a] flex flex-col items-center">
            <span className="text-[10px] tracking-widest font-extrabold uppercase">LEDGER VERIFIED</span>
            <span className="text-xs font-bold tracking-wider">RUN: 0x88F-REACT19</span>
            <span className="text-[9px] text-[#ba1a1a]/80">HASH #7C89·OCTOBER</span>
          </div>
        </div>
      </div>

      {/* Upper Performance Dashboard: Side-by-Side Sketched Dossiers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Card: Overall Score Card (5 cols) */}
        <div className="lg:col-span-5 bg-white border-2 border-[#1b1c1c] p-6 rounded-lg shadow-[4px_4px_0px_#1b1c1c] flex flex-col justify-between relative">
          <div className="absolute -top-3 right-8 w-20 h-5 bg-[#facc15]/60 border border-[#1b1c1c] rotate-[2deg] pointer-events-none" />

          <div>
            {/* Title Banner with Highlighter Swatch */}
            <div className="flex items-start justify-between gap-2 mb-4">
              <div>
                <span className="text-xs text-[#4d4632] uppercase tracking-wider block font-bold">Official Result</span>
                <div className="inline-block bg-[#facc15] border border-[#1b1c1c] px-2.5 py-0.5 rotate-[-0.75deg] shadow-[1px_1px_0px_#1b1c1c] mt-1">
                  <span className="font-['Bricolage_Grotesque'] text-lg text-[#1b1c1c] font-extrabold">
                    Proficient React Architect
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[28px] text-[#735c00]">military_tech</span>
            </div>

            {/* Circular Score Dial (Doodle Progress Ring) */}
            <div className="flex items-center justify-center my-4">
              <div className="relative w-44 h-44 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                  {/* Outer Hand-drawn Track */}
                  <circle
                    className="text-[#e4e2e1]"
                    cx="60"
                    cy="60"
                    fill="none"
                    r="48"
                    stroke="currentColor"
                    strokeDasharray="3 4"
                    strokeWidth="8"
                  />
                  {/* Filled Arc ~88% (circumference ~301.5px, 88% is 265px) */}
                  <circle
                    className="text-[#facc15]"
                    cx="60"
                    cy="60"
                    fill="none"
                    r="48"
                    stroke="currentColor"
                    strokeDasharray="265 301.5"
                    strokeLinecap="round"
                    strokeWidth="9"
                  />
                  {/* Decorative secondary doodle ring */}
                  <circle
                    className="text-[#d1c6ab]"
                    cx="60"
                    cy="60"
                    fill="none"
                    r="42"
                    stroke="currentColor"
                    strokeDasharray="5 3"
                    strokeWidth="1.5"
                  />
                </svg>
                {/* Center Metric */}
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="font-['Bricolage_Grotesque'] text-5xl font-extrabold text-[#1b1c1c] leading-none">
                    88
                  </span>
                  <span className="text-xs text-[#4d4632] font-bold mt-1">/ 100 PTS</span>
                  <span className="text-[10px] text-[#006c4b] font-bold uppercase tracking-wider bg-[#64f9bc] border border-[#1b1c1c] px-1.5 py-0.2 rounded mt-1 shadow-[1px_1px_0px_#1b1c1c]">
                    TOP 8.4% TIER
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-2 my-4 text-center text-xs">
              <div className="bg-[#f0eded] border border-[#1b1c1c] p-2.5 rounded shadow-[2px_2px_0px_#1b1c1c]">
                <span className="text-[11px] text-[#4d4632] block">Test Cases</span>
                <span className="font-bold text-sm text-[#1b1c1c]">18 / 20</span>
              </div>
              <div className="bg-[#f0eded] border border-[#1b1c1c] p-2.5 rounded shadow-[2px_2px_0px_#1b1c1c]">
                <span className="text-[11px] text-[#4d4632] block">Duration</span>
                <span className="font-bold text-sm text-[#1b1c1c]">28m 42s</span>
              </div>
              <div className="bg-[#f0eded] border border-[#1b1c1c] p-2.5 rounded shadow-[2px_2px_0px_#1b1c1c]">
                <span className="text-[11px] text-[#4d4632] block">Code Clean</span>
                <span className="font-bold text-sm text-[#006c4b]">Grade A+</span>
              </div>
            </div>
          </div>

          {/* Strengths & Growth Badges */}
          <div className="pt-2 flex flex-col gap-1.5 text-xs">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[#4d4632] font-bold">Strengths:</span>
              <span className="bg-[#64f9bc] border border-[#1b1c1c] text-[#002114] px-1.5 py-0.5 rounded font-bold shadow-[1px_1px_0px_#1b1c1c]">
                useTransition internals
              </span>
              <span className="bg-[#64f9bc] border border-[#1b1c1c] text-[#002114] px-1.5 py-0.5 rounded font-bold shadow-[1px_1px_0px_#1b1c1c]">
                Server actions
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[#4d4632] font-bold">Growth:</span>
              <span className="bg-[#e4c5ff] border border-[#1b1c1c] text-[#763baf] px-1.5 py-0.5 rounded font-bold shadow-[1px_1px_0px_#1b1c1c]">
                Hydration bail-out edge cases
              </span>
            </div>
          </div>
        </div>

        {/* Right Card: Architectural Competency Matrix (7 cols) */}
        <div className="lg:col-span-7 bg-white border-2 border-[#1b1c1c] p-6 rounded-lg shadow-[4px_4px_0px_#1b1c1c] flex flex-col justify-between relative">
          <div className="absolute -top-3 left-10 w-24 h-5 bg-[#eae7e7]/90 border border-[#1b1c1c] rotate-[-1.5deg] pointer-events-none" />

          <div>
            {/* Header and Stamp */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-xs text-[#4d4632] uppercase tracking-wider block font-bold">Diagnostics</span>
                <h2 className="font-['Bricolage_Grotesque'] text-xl font-bold text-[#1b1c1c]">
                  Architectural Competency Matrix
                </h2>
              </div>
              {/* Verification Stamp Badge */}
              <div className="px-2.5 py-1 rounded bg-[#68fcbf] border border-[#1b1c1c] text-[#002114] shadow-[2px_2px_0px_#1b1c1c] rotate-[3deg] text-center">
                <span className="material-symbols-outlined text-[18px] align-middle block">auto_awesome</span>
                <span className="text-[9px] font-bold block uppercase leading-tight">GEMINI-VERIFIED</span>
              </div>
            </div>

            {/* Sketched Score Breakdown Bars */}
            <div className="flex flex-col gap-3.5 my-4">
              {/* Module 1 */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#1b1c1c] flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-[#facc15] border border-[#1b1c1c] rounded-sm shadow-[1px_1px_0px_#1b1c1c]" />
                    MCQ Theory Assessment
                  </span>
                  <span className="font-bold text-[#006c4b]">20 / 20 pts (100% Mastery)</span>
                </div>
                <div className="w-full h-3.5 bg-[#f0eded] border border-[#1b1c1c] rounded shadow-[2px_2px_0px_#1b1c1c] p-0.5 overflow-hidden">
                  <div className="h-full bg-[#68fcbf] rounded" style={{ width: '100%' }} />
                </div>
              </div>

              {/* Module 2 */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#1b1c1c] flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-[#e4c5ff] border border-[#1b1c1c] rounded-sm shadow-[1px_1px_0px_#1b1c1c]" />
                    System Design & Action Essay
                  </span>
                  <span className="font-bold text-[#4d4632]">34 / 40 pts (85% Depth)</span>
                </div>
                <div className="w-full h-3.5 bg-[#f0eded] border border-[#1b1c1c] rounded shadow-[2px_2px_0px_#1b1c1c] p-0.5 overflow-hidden">
                  <div className="h-full bg-[#facc15] rounded" style={{ width: '85%' }} />
                </div>
              </div>

              {/* Module 3 */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#1b1c1c] flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-[#64f9bc] border border-[#1b1c1c] rounded-sm shadow-[1px_1px_0px_#1b1c1c]" />
                    Runtime Code Patch Fix
                  </span>
                  <span className="font-bold text-[#4d4632]">34 / 40 pts (85% Fidelity)</span>
                </div>
                <div className="w-full h-3.5 bg-[#f0eded] border border-[#1b1c1c] rounded shadow-[2px_2px_0px_#1b1c1c] p-0.5 overflow-hidden">
                  <div className="h-full bg-[#64f9bc] rounded" style={{ width: '85%' }} />
                </div>
              </div>
            </div>

            {/* Sketched Velocity Line Graph: Candidate vs. Cohort Baseline */}
            <div className="mt-4 p-3 bg-[#f0eded] border-2 border-[#1b1c1c] rounded shadow-[2px_2px_0px_#1b1c1c]">
              <div className="flex items-center justify-between mb-2 text-[#4d4632] text-xs">
                <span className="font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">show_chart</span>
                  Cognitive Velocity vs Senior Cohort (n=1,420)
                </span>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><span className="w-2 h-0.5 bg-[#1b1c1c]" /> Candidate</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-0.5 bg-[#7f7660]" /> Cohort Mean</span>
                </div>
              </div>

              {/* Hand-drawn SVG Line Chart */}
              <div className="w-full h-24">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 500 90">
                  <line className="text-[#dcd9d9]" stroke="currentColor" strokeDasharray="4 4" x1="0" x2="500" y1="20" y2="20" />
                  <line className="text-[#dcd9d9]" stroke="currentColor" strokeDasharray="4 4" x1="0" x2="500" y1="50" y2="50" />
                  <line className="text-[#dcd9d9]" stroke="currentColor" strokeDasharray="4 4" x1="0" x2="500" y1="80" y2="80" />
                  {/* Baseline Engineer Curve (Dashed) */}
                  <path
                    className="text-[#7f7660]"
                    d="M 10 75 Q 120 70 250 55 T 490 40"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="6 4"
                    strokeWidth="2"
                  />
                  {/* Candidate Curve (Solid bold wavy doodle line) */}
                  <path
                    className="text-[#1b1c1c]"
                    d="M 10 80 Q 90 60 170 35 T 320 22 T 490 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                  />
                  {/* Candidate Data Knots */}
                  <circle className="fill-[#facc15] stroke-[#1b1c1c] stroke-2" cx="170" cy="35" r="5" />
                  <circle className="fill-[#facc15] stroke-[#1b1c1c] stroke-2" cx="320" cy="22" r="5" />
                  <circle className="fill-[#64f9bc] stroke-[#1b1c1c] stroke-2" cx="490" cy="12" r="5.5" />
                  {/* Annotation Callout */}
                  <text className="text-[10px] fill-[#1b1c1c] font-bold" x="330" y="16">
                    +18% Ahead in State Sync
                  </text>
                </svg>
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-[#4d4632] text-xs pt-1">
            <span>Benchmarked against: <strong>Meta & Vercel RFC Patterns</strong></span>
            <span className="text-[#006c4b] font-bold">Percentile: 92nd</span>
          </div>
        </div>
      </div>

      {/* Detailed Review Section with Folder-Style Tabs */}
      <div className="bg-white border-2 border-[#1b1c1c] p-6 rounded-lg shadow-[4px_4px_0px_#1b1c1c] flex flex-col gap-6 relative">
        {/* Sketched Folder Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('mcq')}
            className={`px-4 py-2 border-2 border-[#1b1c1c] rounded font-bold shadow-[2px_2px_0px_#1b1c1c] flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'mcq'
                ? 'bg-[#facc15] text-[#1b1c1c] shadow-[3px_3px_0px_#1b1c1c] -rotate-[0.5deg]'
                : 'bg-[#f0eded] text-[#4d4632] hover:text-[#1b1c1c]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">fact_check</span>
            <span>Multiple Choice Review (20 / 20)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('essay')}
            className={`px-4 py-2 border-2 border-[#1b1c1c] rounded font-bold shadow-[2px_2px_0px_#1b1c1c] flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'essay'
                ? 'bg-[#facc15] text-[#1b1c1c] shadow-[3px_3px_0px_#1b1c1c] -rotate-[0.5deg]'
                : 'bg-[#f0eded] text-[#4d4632] hover:text-[#1b1c1c]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">architecture</span>
            <span>Architecture Essay (34 / 40)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2 border-2 border-[#1b1c1c] rounded font-bold shadow-[2px_2px_0px_#1b1c1c] flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'code'
                ? 'bg-[#facc15] text-[#1b1c1c] shadow-[3px_3px_0px_#1b1c1c] -rotate-[0.5deg]'
                : 'bg-[#f0eded] text-[#4d4632] hover:text-[#1b1c1c]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">code_blocks</span>
            <span>Code Patch Analysis (34 / 40)</span>
          </button>
        </div>

        {/* TAB 1: MCQ Review */}
        {activeTab === 'mcq' && (
          <div className="space-y-6">
            {/* Question Review 1 Card */}
            <div className="bg-[#f6f3f2] border-2 border-[#1b1c1c] p-6 rounded-lg shadow-[3px_3px_0px_#1b1c1c] flex flex-col gap-4 relative">
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-32 h-4 bg-[#e4c5ff]/50 border border-[#1b1c1c] rotate-[-0.5deg]" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded bg-[#1b1c1c] text-white text-xs font-bold flex items-center justify-center">
                    Q1
                  </span>
                  <span className="font-['Bricolage_Grotesque'] text-lg font-bold text-[#1b1c1c]">
                    React 19 Action Transition Behavior
                  </span>
                </div>
                <span className="self-start sm:self-auto bg-[#68fcbf] border border-[#1b1c1c] text-[#002114] text-xs px-3 py-1 rounded font-bold shadow-[2px_2px_0px_#1b1c1c]">
                  +10 / 10 PTS (CORRECT)
                </span>
              </div>

              <p className="text-xs text-[#1b1c1c] leading-relaxed">
                When dispatching an async Server Action inside a client-side <code className="px-1.5 py-0.5 bg-[#e4e2e1] border border-[#1b1c1c] rounded font-bold">useTransition</code> closure, how does the UI handle intermediate pending state without triggering fallback suspense boundaries?
              </p>

              {/* Options */}
              <div className="grid grid-cols-1 gap-2.5 my-1 text-xs">
                <div className="p-2.5 bg-white border border-[#1b1c1c] rounded shadow-[2px_2px_0px_#1b1c1c] flex items-start gap-2.5 opacity-60">
                  <span className="font-bold px-1.5 py-0.5 bg-[#e4e2e1] rounded">[A]</span>
                  <span>The DOM unmounts the pending sibling tree and defers all state dispatch to <code className="bg-[#e4e2e1] px-1 rounded">requestIdleCallback</code>.</span>
                </div>

                <div className="p-2.5 bg-[#64f9bc] border-2 border-[#1b1c1c] text-[#002114] rounded shadow-[3px_3px_0px_#1b1c1c] flex items-start justify-between gap-2.5">
                  <div className="flex items-start gap-2.5">
                    <span className="font-bold px-1.5 py-0.5 bg-[#1b1c1c] text-white rounded">[B]</span>
                    <span className="font-semibold">
                      React keeps the previous UI tree responsive and fully interactive while the async Action promise evaluates in parallel, toggling <code className="bg-white text-[#1b1c1c] px-1 rounded border border-[#1b1c1c]">isPending: true</code>.
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-extrabold uppercase shrink-0">
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    <span>Your Choice</span>
                  </div>
                </div>

                <div className="p-2.5 bg-white border border-[#1b1c1c] rounded shadow-[2px_2px_0px_#1b1c1c] flex items-start gap-2.5 opacity-60">
                  <span className="font-bold px-1.5 py-0.5 bg-[#e4e2e1] rounded">[C]</span>
                  <span>The nearest error boundary captures the unhandled promise rejection and prompts an automatic rollback retry.</span>
                </div>
              </div>

              {/* AI Commentary Note */}
              <div className="bg-[#facc15]/20 border-2 border-[#1b1c1c] p-4 rounded shadow-[2px_2px_0px_#1b1c1c] rotate-[-0.5deg] flex items-start gap-3">
                <div className="p-1 rounded bg-[#facc15] border border-[#1b1c1c] text-[#1b1c1c] shadow-[1px_1px_0px_#1b1c1c] shrink-0">
                  <span className="material-symbols-outlined text-[20px]">smart_toy</span>
                </div>
                <div className="flex flex-col gap-1 text-xs">
                  <span className="font-bold uppercase tracking-wider text-[#1b1c1c]">AI Evaluator Commentary:</span>
                  <p className="text-[#4d4632] leading-relaxed">
                    Spot-on explanation! You accurately pinpointed that React 19's <code className="font-bold bg-[#f0eded] border border-[#1b1c1c] px-1 rounded">useTransition</code> treats the async callback as a prioritized non-blocking update, preserving stale layout responsiveness rather than triggering abrupt unmounts.
                  </p>
                </div>
              </div>
            </div>

            {/* Question Review 2 Card */}
            <div className="bg-[#f6f3f2] border-2 border-[#1b1c1c] p-6 rounded-lg shadow-[3px_3px_0px_#1b1c1c] flex flex-col gap-4 relative">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded bg-[#1b1c1c] text-white text-xs font-bold flex items-center justify-center">
                    Q2
                  </span>
                  <span className="font-['Bricolage_Grotesque'] text-lg font-bold text-[#1b1c1c]">
                    AbortController Cleanup with the new use() API
                  </span>
                </div>
                <span className="self-start sm:self-auto bg-[#68fcbf] border border-[#1b1c1c] text-[#002114] text-xs px-3 py-1 rounded font-bold shadow-[2px_2px_0px_#1b1c1c]">
                  +10 / 10 PTS (CORRECT)
                </span>
              </div>

              <p className="text-xs text-[#1b1c1c] leading-relaxed">
                Unlike standard <code className="px-1.5 py-0.5 bg-[#e4e2e1] border border-[#1b1c1c] rounded font-bold">useEffect</code> teardown cycles, how does an abort signal handle cancellation when passed into a promise unwrapped via <code className="px-1.5 py-0.5 bg-[#e4e2e1] border border-[#1b1c1c] rounded font-bold">use(promise)</code>?
              </p>

              {/* Options */}
              <div className="grid grid-cols-1 gap-2.5 my-1 text-xs">
                <div className="p-2.5 bg-[#64f9bc] border-2 border-[#1b1c1c] text-[#002114] rounded shadow-[3px_3px_0px_#1b1c1c] flex items-start justify-between gap-2.5">
                  <div className="flex items-start gap-2.5">
                    <span className="font-bold px-1.5 py-0.5 bg-[#1b1c1c] text-white rounded">[A]</span>
                    <span className="font-semibold">
                      The promise lifecycle lives outside the render loop; abort signals must be triggered explicitly via unmount listeners or parent suspense cancellation handlers.
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-extrabold uppercase shrink-0">
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    <span>Your Choice</span>
                  </div>
                </div>

                <div className="p-2.5 bg-white border border-[#1b1c1c] rounded shadow-[2px_2px_0px_#1b1c1c] flex items-start gap-2.5 opacity-60">
                  <span className="font-bold px-1.5 py-0.5 bg-[#e4e2e1] rounded">[B]</span>
                  <span><code className="bg-[#e4e2e1] px-1 rounded">use()</code> automatically binds its internal fiber to browser window event cancellation listeners.</span>
                </div>
              </div>

              {/* Architect Tip */}
              <div className="bg-[#64f9bc]/30 border-2 border-[#1b1c1c] p-4 rounded shadow-[2px_2px_0px_#1b1c1c] rotate-[0.5deg] flex items-start gap-3">
                <div className="p-1 rounded bg-[#006c4b] text-white border border-[#1b1c1c] shadow-[1px_1px_0px_#1b1c1c] shrink-0">
                  <span className="material-symbols-outlined text-[20px]">lightbulb</span>
                </div>
                <div className="flex flex-col gap-1 text-xs">
                  <span className="font-bold uppercase tracking-wider text-[#1b1c1c]">Architect Tip:</span>
                  <p className="text-[#4d4632] leading-relaxed">
                    Precisely. Because <code className="font-bold bg-[#f0eded] border border-[#1b1c1c] px-1 rounded">use()</code> can be invoked conditionally inside blocks, it does not manage asynchronous abort teardown automatically. External caching (e.g. React Cache or tanstack query) must maintain the abort controller lifecycle.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Architecture Essay Review */}
        {activeTab === 'essay' && (
          <div className="bg-[#f6f3f2] border-2 border-[#1b1c1c] p-6 rounded-lg shadow-[3px_3px_0px_#1b1c1c] flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs text-[#7b41b4] font-bold uppercase">ESSAY EVALUATION</span>
                <h3 className="font-['Bricolage_Grotesque'] text-xl font-bold text-[#1b1c1c]">
                  Asynchronous State Reconciliation & Worker Lifecycle
                </h3>
              </div>
              <span className="bg-[#facc15] border border-[#1b1c1c] text-[#1b1c1c] text-xs px-3 py-1 rounded font-bold shadow-[2px_2px_0px_#1b1c1c]">
                34 / 40 PTS (HIGH FIDELITY)
              </span>
            </div>

            <div className="bg-white border-2 border-[#1b1c1c] p-4 rounded text-xs leading-relaxed text-[#1b1c1c] shadow-[2px_2px_0px_#1b1c1c]">
              <span className="font-bold text-[#4d4632] block mb-1">Your Submission:</span>
              "When React 19 initiates a transition or unmounts the host component, the return function of the effect must explicitly cancel the downstream task. Utilizing an AbortController alongside worker.terminate() prevents stale message events from invoking state dispatches after unmount, which otherwise causes silent leaks."
            </div>

            <div className="bg-[#e4c5ff]/40 border-2 border-[#1b1c1c] p-4 rounded text-xs flex flex-col gap-2 shadow-[2px_2px_0px_#1b1c1c]">
              <span className="font-bold text-[#763baf]">Rubric Feedback & Covered Invariants:</span>
              <ul className="space-y-1 text-[#1b1c1c]">
                <li>✓ Accurately addressed unmount cleanup contract with explicit <code className="font-bold">worker.terminate()</code> (+15 pts)</li>
                <li>✓ Identified asynchronous race conditions under fast parameter changes (+10 pts)</li>
                <li>✓ Demonstrated understanding of non-blocking transition priority (+9 pts)</li>
                <li>△ Missed opportunity: Mentioning <code className="font-bold">queueMicrotask</code> scheduling implications (-6 pts)</li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 3: Code Patch Analysis */}
        {activeTab === 'code' && (
          <div className="bg-[#f6f3f2] border-2 border-[#1b1c1c] p-6 rounded-lg shadow-[3px_3px_0px_#1b1c1c] flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs text-[#006c4b] font-bold uppercase">CODE REVIEW AUDIT</span>
                <h3 className="font-['Bricolage_Grotesque'] text-xl font-bold text-[#1b1c1c]">
                  Runtime Solution Diff & Assertion Logs
                </h3>
              </div>
              <span className="bg-[#64f9bc] border border-[#1b1c1c] text-[#002114] text-xs px-3 py-1 rounded font-bold shadow-[2px_2px_0px_#1b1c1c]">
                34 / 40 PTS (PASSED)
              </span>
            </div>

            <div className="bg-[#eae7e7] border-2 border-[#1b1c1c] p-4 rounded text-xs font-mono shadow-[2px_2px_0px_#1b1c1c]">
              <pre className="text-[#1b1c1c] leading-relaxed">
                <code>
                  <span className="text-[#ba1a1a] bg-[#ffdad6] block px-1">- // 09: &#125;, [url]); // Memory leak on unmount</span>
                  <span className="text-[#006c4b] bg-[#64f9bc]/70 font-bold block px-1">+ const controller = new AbortController();</span>
                  <span className="text-[#006c4b] bg-[#64f9bc]/70 font-bold block px-1">+ const &#123; signal &#125; = controller;</span>
                  <span className="text-[#006c4b] bg-[#64f9bc]/70 font-bold block px-1">+ startTransition(() =&gt; setTelemetry(payload));</span>
                  <span className="text-[#006c4b] bg-[#64f9bc]/70 font-bold block px-1">+ return () =&gt; controller.abort();</span>
                </code>
              </pre>
            </div>

            <div className="p-3 bg-white border border-[#1b1c1c] rounded text-xs flex items-center justify-between text-[#1b1c1c]">
              <span>Vitest Test Suite: <strong>3 / 3 assertions passed</strong></span>
              <span className="text-[#006c4b] font-bold">Zero memory leaks detected</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Deck: Sketched Evaluation Ledger Footer */}
      <div className="bg-white border-2 border-[#1b1c1c] p-6 rounded-lg shadow-[4px_4px_0px_#1b1c1c] flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        {/* Signature Sign-off Block */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-12 h-12 rounded bg-[#f0eded] border-2 border-[#1b1c1c] flex items-center justify-center text-[#735c00] shadow-[2px_2px_0px_#1b1c1c]">
            <span className="material-symbols-outlined text-[28px]">assignment_turned_in</span>
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#1b1c1c]">
              <span>Assessment Complete</span>
              <span className="text-[#006c4b] font-extrabold">• Ledger Sealed</span>
            </div>
            <p className="text-[11px] text-[#4d4632]">
              Result recorded in candidate portfolio repository: <code className="text-[#1b1c1c] font-bold bg-[#f0eded] border border-[#1b1c1c] px-1 rounded">/assessments/2025/react19-88f.json</code>
            </p>
          </div>
        </div>

        {/* Action Buttons Cluster */}
        <div className="flex items-center gap-2.5 flex-wrap w-full md:w-auto justify-end">
          <button
            type="button"
            onClick={onRetake}
            className="px-4 py-2 bg-white border-2 border-[#1b1c1c] text-[#1b1c1c] text-xs font-bold rounded shadow-[3px_3px_0px_#1b1c1c] hover:bg-[#f0eded] transition-all flex items-center gap-1.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#1b1c1c]"
          >
            <span className="material-symbols-outlined text-[18px]">replay</span>
            <span>Retake Quiz</span>
          </button>

          <button
            type="button"
            onClick={handleExportPDF}
            className="px-4 py-2 bg-white border-2 border-[#1b1c1c] text-[#1b1c1c] text-xs font-bold rounded shadow-[3px_3px_0px_#1b1c1c] hover:bg-[#f0eded] transition-all flex items-center gap-1.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#1b1c1c]"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Export Report (.PDF)</span>
          </button>

          <button
            type="button"
            onClick={onStartNextStage}
            className="px-5 py-2 bg-[#e4c5ff] hover:bg-[#ddb8ff] border-2 border-[#1b1c1c] text-[#2c0051] text-xs font-bold rounded shadow-[4px_4px_0px_#1b1c1c] transition-all flex items-center gap-1.5 rotate-[-0.75deg] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#1b1c1c]"
          >
            <span className="material-symbols-outlined text-[20px] text-[#7b41b4]">bolt</span>
            <span>Start Next Stage: Node 22 API Design</span>
            <span className="text-[9px] bg-[#7b41b4] text-white px-1 py-0.2 rounded shadow-[1px_1px_0px_#1b1c1c]">NEW</span>
          </button>
        </div>
      </div>
    </div>
  );
};
