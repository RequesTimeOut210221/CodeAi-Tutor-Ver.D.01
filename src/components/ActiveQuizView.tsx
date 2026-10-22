import React, { useState, useEffect } from 'react';

interface ActiveQuizViewProps {
  onPrevious: () => void;
  onSubmitChallenge: () => void;
}

export const ActiveQuizView: React.FC<ActiveQuizViewProps> = ({
  onPrevious,
  onSubmitChallenge,
}) => {
  // Solution editor code state
  const defaultSolution = `useEffect(() => {
  const controller = new AbortController();
  const { signal } = controller;

  fetch(url, { signal })
    .then(r => r.json())
    .then(payload => {
      startTransition(() => setTelemetry(payload));
    })
    .catch(err => {
      if (err.name !== 'AbortError') throw err;
    });

  return () => controller.abort();
}, [url]);`;

  const [solutionCode, setSolutionCode] = useState<string>(defaultSolution);
  const [selectedWarmup, setSelectedWarmup] = useState<string>('B');
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(3); // Q3 active

  // Socratic Hint state
  const [isHintUnlocked, setIsHintUnlocked] = useState<boolean>(false);
  const [remainingHints, setRemainingHints] = useState<number>(1);

  // Test Runner state
  const [isRunningTests, setIsRunningTests] = useState<boolean>(false);
  const [test03Passes, setTest03Passes] = useState<boolean>(false);
  const [testExecutionTime, setTestExecutionTime] = useState<number>(312);

  // Session timer countdown
  const [remainingSeconds, setRemainingSeconds] = useState<number>(1453); // 24:13

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleRunTests = () => {
    setIsRunningTests(true);
    setTimeout(() => {
      // Check if user solution contains startTransition and abort
      const hasTransition = solutionCode.includes('startTransition');
      const hasAbort = solutionCode.includes('controller.abort') || solutionCode.includes('.abort()');
      setTest03Passes(hasTransition && hasAbort);
      setTestExecutionTime(Math.floor(Math.random() * 80 + 280));
      setIsRunningTests(false);
    }, 400);
  };

  const handleUnlockHint = () => {
    if (!isHintUnlocked && remainingHints > 0) {
      setIsHintUnlocked(true);
      setRemainingHints((prev) => prev - 1);
    }
  };

  const handleResetCode = () => {
    setSolutionCode(defaultSolution);
  };

  return (
    <div className="w-full flex flex-col gap-6 font-['JetBrains_Mono'] max-w-[1400px] mx-auto">
      {/* 1. Top Section & Sketched Stage Tracker */}
      <div className="relative bg-white border-2 border-[#1b1c1c] rounded-lg p-4 shadow-[3px_3px_0px_#1b1c1c] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* Tape visual anchor at top center */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#eae7e7]/90 border border-[#1b1c1c] rotate-[-1deg] shadow-[1px_1px_0px_#1b1c1c] pointer-events-none flex items-center justify-center">
          <span className="text-[10px] text-[#4d4632] opacity-70 tracking-widest uppercase font-bold">
            TEST_DRAFT_#42
          </span>
        </div>

        {/* Module & Session Header */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded bg-[#ffdad6] border border-[#1b1c1c] text-[#93000a] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-[2px_2px_0px_#1b1c1c]">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#ba1a1a] animate-ping" />
              LIVE SESSION {formatCountdown(remainingSeconds)}
            </span>
            <span className="text-xs text-[#4d4632] font-semibold">Module 04 // Advanced Concurrency</span>
          </div>
          <h1 className="font-['Bricolage_Grotesque'] text-2xl font-bold text-[#1b1c1c] tracking-tight flex items-center gap-2">
            <span>Concurrent React 19 State & Network Sync</span>
            <span className="text-[#735c00] text-xl rotate-[4deg]">✍️</span>
          </h1>
        </div>

        {/* Stage Progress Tracker (Sketched Roadway) */}
        <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0">
          {/* Step 1: Multiple Choice (Completed) */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#64f9bc] border-2 border-[#1b1c1c] text-[#002114] shadow-[2px_2px_0px_#1b1c1c] rotate-[-0.5deg] shrink-0 text-xs font-bold">
            <span className="material-symbols-outlined text-[18px] text-[#006c4b] font-bold">check_box</span>
            <span className="line-through opacity-80">1. Multiple Choice</span>
            <span className="px-1 bg-white text-[#006c4b] rounded ml-1 border border-[#1b1c1c] shadow-[1px_1px_0px_#1b1c1c]">
              100%
            </span>
          </div>

          <span className="text-[#4d4632] font-bold select-none opacity-40 shrink-0">➔</span>

          {/* Step 2: Code Fix Challenge (Active) */}
          <div className="relative flex items-center gap-1.5 px-4 py-1.5 rounded bg-[#facc15] border-2 border-[#1b1c1c] text-[#1b1c1c] shadow-[3px_3px_0px_#1b1c1c] rotate-[1deg] shrink-0">
            <div className="absolute -top-2.5 -right-2 bg-[#1b1c1c] text-white text-[9px] font-bold px-1.5 py-0.5 rounded rotate-[8deg] shadow-[1px_1px_0px_#1b1c1c]">
              IN PROGRESS
            </div>
            <span className="material-symbols-outlined text-[18px] animate-spin text-[#1b1c1c]">cyclone</span>
            <span className="text-xs font-bold">2. Code Fix Challenge</span>
            <span className="text-[10px] text-[#6c5700] ml-1 font-extrabold">(Active)</span>
          </div>

          <span className="text-[#4d4632] font-bold select-none opacity-40 shrink-0">➔</span>

          {/* Step 3: Architecture Essay (Locked) */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#eae7e7] border-2 border-[#1b1c1c] text-[#4d4632] opacity-70 shadow-[2px_2px_0px_#1b1c1c] rotate-[-0.75deg] shrink-0 text-xs">
            <span className="material-symbols-outlined text-[18px]">lock</span>
            <span>3. Architecture Essay</span>
            <span className="text-[10px] px-1 bg-[#dcd9d9] rounded border border-[#1b1c1c]">Locked</span>
          </div>
        </div>
      </div>

      {/* MAIN TWO-COLUMN CONTENT ARENA */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* LEFT: ASSESSMENT ARENA (Col 1-8) */}
        <div className="xl:col-span-8 flex flex-col gap-6 min-w-0">
          {/* Challenge Header Card */}
          <div className="relative bg-white border-2 border-[#1b1c1c] rounded-lg p-6 shadow-[4px_4px_0px_#1b1c1c] flex flex-col gap-4">
            {/* Bookmark Ribbon Visual */}
            <div className="absolute -top-2 right-6 w-8 h-12 bg-[#facc15] border-2 border-[#1b1c1c] shadow-[2px_2px_0px_#1b1c1c] flex items-end justify-center pb-1 clip-path-ribbon">
              <span className="material-symbols-outlined text-[16px] text-[#1b1c1c]">bookmark</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 pr-12 text-xs">
              <span className="px-2.5 py-1 rounded bg-[#f0eded] border border-[#1b1c1c] text-[#1b1c1c] font-bold shadow-[1px_1px_0px_#1b1c1c]">
                TASK #03 OF 09
              </span>
              <span className="px-2.5 py-1 rounded bg-[#e4c5ff] border border-[#1b1c1c] text-[#763baf] font-bold shadow-[2px_2px_0px_#1b1c1c] rotate-[-1deg]">
                HIGH COMPLEXITY • 40 PTS
              </span>
              <span className="px-2.5 py-1 rounded bg-[#e4e2e1] border border-[#1b1c1c] text-[#4d4632]">
                Target: React 19 Canary / Suspense
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="font-['Bricolage_Grotesque'] text-2xl font-bold text-[#1b1c1c] tracking-tight">
                Squash Race Condition & Memory Leak in Event Stream
              </h2>
              <p className="text-xs text-[#4d4632] leading-relaxed">
                The high-frequency telemetry hook below triggers asynchronous state tearing under concurrent transitions. Fix the unhandled promise rejection on component unmount and replace the naive cancellation token with an <code className="px-1.5 py-0.5 rounded bg-[#f0eded] border border-[#1b1c1c] font-mono text-[#735c00] font-bold">AbortController</code> signal.
              </p>
            </div>

            {/* Evaluation Rubric List with Hand-drawn Bullets */}
            <div className="p-3.5 rounded-lg bg-[#f6f3f2] border-2 border-[#1b1c1c] shadow-[2px_2px_0px_#1b1c1c] flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#1b1c1c] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#735c00] text-[18px]">checklist</span>
                  Evaluation Criteria & Scoring Rubric:
                </span>
                <span className="text-[11px] text-[#4d4632]">Deduction Tolerance: 0 warnings</span>
              </div>
              <ul className="flex flex-col gap-1.5 text-xs text-[#1b1c1c]">
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded bg-[#facc15] border border-[#1b1c1c] text-[#1b1c1c] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 shadow-[1px_1px_0px_#1b1c1c]">✓</span>
                  <span>Properly bind <code className="font-mono bg-white border border-[#1b1c1c] px-1 rounded">abortController.signal</code> to the streaming fetch reader pipeline (+15 pts)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded bg-[#facc15] border border-[#1b1c1c] text-[#1b1c1c] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 shadow-[1px_1px_0px_#1b1c1c]">✓</span>
                  <span>Wrap concurrent state updates in <code className="font-mono bg-white border border-[#1b1c1c] px-1 rounded">React.startTransition</code> to prevent UI hitch (+15 pts)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded bg-[#facc15] border border-[#1b1c1c] text-[#1b1c1c] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 shadow-[1px_1px_0px_#1b1c1c]">✓</span>
                  <span>Guarantee clean idempotent teardown in hook unmount effect (+10 pts)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* SPLIT-PANE CODE FIX CHALLENGE */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left Pane: Buggy Baseline */}
            <div className="flex flex-col rounded-lg bg-white border-2 border-[#1b1c1c] shadow-[3px_3px_0px_#1b1c1c] overflow-hidden">
              <div className="px-3.5 py-2 bg-[#eae7e7] flex items-center justify-between border-b-2 border-[#1b1c1c]">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#ba1a1a]">bug_report</span>
                  <span className="text-xs font-bold text-[#1b1c1c]">useTelemetryStream.tsx</span>
                  <span className="px-1.5 py-0.2 rounded bg-[#ffdad6] border border-[#1b1c1c] text-[#93000a] text-[10px] font-bold">
                    Buggy Source
                  </span>
                </div>
                <span className="text-[11px] text-[#4d4632]">Read Only</span>
              </div>

              {/* Code listing with sketch bug callouts */}
              <div className="p-3 font-mono text-xs leading-relaxed overflow-x-auto bg-white text-[#1b1c1c] flex flex-col gap-1 select-none">
                <div className="flex gap-3 opacity-50">
                  <span className="w-6 text-right select-none text-[#4d4632]">01</span>
                  <span>export function useTelemetryStream(url: string) &#123;</span>
                </div>
                <div className="flex gap-3 opacity-50">
                  <span className="w-6 text-right select-none text-[#4d4632]">02</span>
                  <span>  const [telemetry, setTelemetry] = useState&lt;Data&gt;(null);</span>
                </div>
                <div className="flex gap-3 opacity-50">
                  <span className="w-6 text-right select-none text-[#4d4632]">03</span>
                  <span>  const [isPending, setIsPending] = useState(false);</span>
                </div>
                <div className="flex gap-3 opacity-50">
                  <span className="w-6 text-right select-none text-[#4d4632]">04</span>
                  <span></span>
                </div>
                {/* Bug Line 1 */}
                <div className="flex gap-3 bg-[#ffdad6]/60 p-0.5 rounded border border-[#ba1a1a]/40">
                  <span className="w-6 text-right select-none text-[#ba1a1a] font-bold">05</span>
                  <span className="text-[#1b1c1c] font-semibold">  useEffect(() =&gt; &#123;</span>
                  <span className="ml-auto text-[#ba1a1a] text-[11px] font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">warning</span> Missing Signal
                  </span>
                </div>
                {/* Bug Line 2 */}
                <div className="flex gap-3 bg-[#ffdad6]/60 p-0.5 rounded border border-[#ba1a1a]/40">
                  <span className="w-6 text-right select-none text-[#ba1a1a] font-bold">06</span>
                  <span className="text-[#1b1c1c]">    fetch(url).then(res =&gt; res.json())</span>
                </div>
                <div className="flex gap-3 bg-[#ffdad6]/60 p-0.5 rounded border border-[#ba1a1a]/40">
                  <span className="w-6 text-right select-none text-[#ba1a1a] font-bold">07</span>
                  <span className="text-[#1b1c1c]">      .then(data =&gt; setTelemetry(data));</span>
                  <span className="ml-auto text-[#ba1a1a] text-[11px] font-bold">Race!</span>
                </div>
                <div className="flex gap-3">
                  <span className="w-6 text-right select-none text-[#4d4632] opacity-50">08</span>
                  <span className="opacity-50">    // Note: No cleanup function returned!</span>
                </div>
                <div className="flex gap-3 bg-[#ffdad6]/70 p-0.5 rounded border border-[#ba1a1a]">
                  <span className="w-6 text-right select-none text-[#ba1a1a] font-bold">09</span>
                  <span className="text-[#ba1a1a] font-bold underline decoration-wavy decoration-[#ba1a1a]">
                    &#125;, [url]); // Memory leak on unmount
                  </span>
                </div>
                <div className="flex gap-3 opacity-50">
                  <span className="w-6 text-right select-none text-[#4d4632]">10</span>
                  <span>  return &#123; telemetry, isPending &#125;;</span>
                </div>
                <div className="flex gap-3 opacity-50">
                  <span className="w-6 text-right select-none text-[#4d4632]">11</span>
                  <span>&#125;</span>
                </div>
              </div>

              {/* Annotated sticky memo below bug */}
              <div className="p-2.5 m-2 rounded bg-[#f0eded] border border-[#1b1c1c] text-[#4d4632] text-xs shadow-[1px_1px_0px_#1b1c1c] flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#ba1a1a]">info</span>
                <span>Observed: Fast URL param switching overwrites state with stale cached data.</span>
              </div>
            </div>

            {/* Right Pane: Interactive Solution Editor */}
            <div className="flex flex-col rounded-lg bg-white border-2 border-[#1b1c1c] shadow-[3px_3px_0px_#1b1c1c] overflow-hidden">
              <div className="px-3.5 py-2 bg-[#facc15]/30 flex items-center justify-between border-b-2 border-[#1b1c1c]">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#735c00]">edit_document</span>
                  <span className="text-xs font-bold text-[#1b1c1c]">Your Solution Patch</span>
                  <span className="px-1.5 py-0.2 rounded bg-[#facc15] border border-[#1b1c1c] text-[#6c5700] text-[10px] font-bold">
                    Active Draft
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleResetCode}
                  className="px-2 py-0.5 rounded bg-white border border-[#1b1c1c] hover:bg-[#f0eded] text-[11px] font-bold shadow-[1px_1px_0px_#1b1c1c]"
                >
                  Reset Code
                </button>
              </div>

              {/* Editable Code Box */}
              <div className="relative p-3 bg-white flex-1 min-h-[280px]">
                <textarea
                  value={solutionCode}
                  onChange={(e) => setSolutionCode(e.target.value)}
                  className="w-full h-full min-h-[260px] font-mono text-xs leading-relaxed text-[#1b1c1c] bg-transparent focus:outline-none resize-none font-medium"
                  spellCheck={false}
                />
              </div>

              {/* Run Diagnostics Action Bar */}
              <div className="p-2.5 bg-[#f0eded] flex items-center justify-between border-t-2 border-[#1b1c1c]">
                <div className="flex items-center gap-1.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#006c4b]" />
                  <span className="text-xs text-[#1b1c1c] font-semibold">Compiler: Syntax OK</span>
                </div>
                <button
                  type="button"
                  onClick={handleRunTests}
                  disabled={isRunningTests}
                  className="px-3 py-1 rounded bg-[#735c00] hover:bg-[#574500] text-white text-xs font-bold flex items-center gap-1 shadow-[2px_2px_0px_#1b1c1c] hover:translate-x-0.5 hover:translate-y-0.5 transition-transform"
                >
                  <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                  <span>{isRunningTests ? 'Executing...' : 'Run Local Unit Tests'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* TEST RUNNER DIAGNOSTICS BOX */}
          <div className="rounded-lg bg-white border-2 border-[#1b1c1c] p-4 shadow-[3px_3px_0px_#1b1c1c] flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-['Bricolage_Grotesque'] text-lg font-bold text-[#1b1c1c]">
                  Test Runner Diagnostics
                </span>
                <span
                  className={`px-2 py-0.5 rounded border border-[#1b1c1c] text-xs font-bold shadow-[1px_1px_0px_#1b1c1c] ${
                    test03Passes
                      ? 'bg-[#64f9bc] text-[#002114]'
                      : 'bg-[#64f9bc]/70 text-[#002114]'
                  }`}
                >
                  {test03Passes ? '3 / 3 PASSING' : '2 / 3 PASSING'}
                </span>
              </div>
              <span className="text-[11px] text-[#4d4632]">Execution time: {testExecutionTime}ms</span>
            </div>

            {/* Test Results List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-1">
              <div className="p-2.5 rounded bg-[#64f9bc]/30 border border-[#1b1c1c] shadow-[1px_1px_0px_#1b1c1c] flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[#006c4b] text-[18px]">check_circle</span>
                  <span className="text-xs font-bold text-[#1b1c1c]">Test 01: Abort Signal</span>
                </div>
                <p className="text-[11px] text-[#4d4632]">Controller cleanly invoked upon quick prop update.</p>
                <span className="text-[#006c4b] text-[11px] font-bold">Passed (42ms)</span>
              </div>

              <div className="p-2.5 rounded bg-[#64f9bc]/30 border border-[#1b1c1c] shadow-[1px_1px_0px_#1b1c1c] flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[#006c4b] text-[18px]">check_circle</span>
                  <span className="text-xs font-bold text-[#1b1c1c]">Test 02: Unmount Teardown</span>
                </div>
                <p className="text-[11px] text-[#4d4632]">No setState invocation detected on dead root.</p>
                <span className="text-[#006c4b] text-[11px] font-bold">Passed (95ms)</span>
              </div>

              <div
                className={`p-2.5 rounded border border-[#1b1c1c] shadow-[1px_1px_0px_#1b1c1c] flex flex-col gap-1 ${
                  test03Passes ? 'bg-[#64f9bc]/30' : 'bg-[#ffdad6]/30'
                }`}
              >
                <div className="flex items-center gap-1">
                  <span
                    className={`material-symbols-outlined text-[18px] ${
                      test03Passes ? 'text-[#006c4b]' : 'text-[#ba1a1a]'
                    }`}
                  >
                    {test03Passes ? 'check_circle' : 'cancel'}
                  </span>
                  <span className="text-xs font-bold text-[#1b1c1c]">Test 03: Transition Sync</span>
                </div>
                <p className="text-[11px] text-[#4d4632]">
                  {test03Passes
                    ? 'State updates dispatched with transition priority non-blocking.'
                    : 'Expected startTransition wrapper during microtask deferral.'}
                </p>
                <span
                  className={`text-[11px] font-bold ${
                    test03Passes ? 'text-[#006c4b]' : 'text-[#ba1a1a]'
                  }`}
                >
                  {test03Passes ? 'Passed (68ms)' : 'Failed: Assertion Error #19'}
                </span>
              </div>
            </div>
          </div>

          {/* RELATED CONCEPTUAL WARMUP CARD */}
          <div className="rounded-lg bg-white border-2 border-[#1b1c1c] p-6 shadow-[3px_3px_0px_#1b1c1c] flex flex-col gap-4">
            <div className="flex items-center justify-between text-xs">
              <span className="px-2.5 py-1 rounded bg-[#e4c5ff] border border-[#1b1c1c] text-[#763baf] font-bold shadow-[1px_1px_0px_#1b1c1c]">
                CONCEPTUAL DRILL 3.B
              </span>
              <span className="text-[#4d4632] font-semibold">+10 Bonus Points</span>
            </div>

            <h3 className="font-['Bricolage_Grotesque'] text-lg font-bold text-[#1b1c1c]">
              Which React 19 primitive guarantees that high-priority user keystrokes bypass deferred network streaming results?
            </h3>

            {/* MCQ Options list */}
            <div className="flex flex-col gap-2.5 text-xs">
              <label
                onClick={() => setSelectedWarmup('A')}
                className={`p-2.5 rounded border-2 border-[#1b1c1c] flex items-center gap-3 cursor-pointer transition-all ${
                  selectedWarmup === 'A'
                    ? 'bg-[#e4c5ff] text-[#763baf] shadow-[2px_2px_0px_#1b1c1c]'
                    : 'bg-[#f6f3f2] hover:bg-[#f0eded] shadow-[1px_1px_0px_#1b1c1c]'
                }`}
              >
                <span className="w-7 h-7 rounded bg-white border border-[#1b1c1c] text-[#1b1c1c] flex items-center justify-center font-bold shadow-[1px_1px_0px_#1b1c1c]">
                  A
                </span>
                <span><code>useDeferredValue</code> with custom timeout fallback configuration</span>
              </label>

              <label
                onClick={() => setSelectedWarmup('B')}
                className={`p-2.5 rounded border-2 border-[#1b1c1c] flex items-center gap-3 cursor-pointer transition-all rotate-[0.5deg] ${
                  selectedWarmup === 'B'
                    ? 'bg-[#e4c5ff] text-[#2c0051] font-bold shadow-[2px_2px_0px_#1b1c1c]'
                    : 'bg-[#f6f3f2] hover:bg-[#f0eded] shadow-[1px_1px_0px_#1b1c1c]'
                }`}
              >
                <span className="w-7 h-7 rounded bg-[#7b41b4] text-white border border-[#1b1c1c] flex items-center justify-center font-bold shadow-[1px_1px_0px_#1b1c1c]">
                  B
                </span>
                <span className="flex-1">
                  <code>useOptimistic</code> paired with <code>startTransition</code> for action prioritization
                </span>
                {selectedWarmup === 'B' && (
                  <span className="material-symbols-outlined text-[#7b41b4] text-[20px]">check_circle</span>
                )}
              </label>

              <label
                onClick={() => setSelectedWarmup('C')}
                className={`p-2.5 rounded border-2 border-[#1b1c1c] flex items-center gap-3 cursor-pointer transition-all ${
                  selectedWarmup === 'C'
                    ? 'bg-[#e4c5ff] text-[#763baf] shadow-[2px_2px_0px_#1b1c1c]'
                    : 'bg-[#f6f3f2] hover:bg-[#f0eded] shadow-[1px_1px_0px_#1b1c1c]'
                }`}
              >
                <span className="w-7 h-7 rounded bg-white border border-[#1b1c1c] text-[#1b1c1c] flex items-center justify-center font-bold shadow-[1px_1px_0px_#1b1c1c]">
                  C
                </span>
                <span><code>React.memo</code> with deep shallow-equality comparison wrapper</span>
              </label>

              <label
                onClick={() => setSelectedWarmup('D')}
                className={`p-2.5 rounded border-2 border-[#1b1c1c] flex items-center gap-3 cursor-pointer transition-all ${
                  selectedWarmup === 'D'
                    ? 'bg-[#e4c5ff] text-[#763baf] shadow-[2px_2px_0px_#1b1c1c]'
                    : 'bg-[#f6f3f2] hover:bg-[#f0eded] shadow-[1px_1px_0px_#1b1c1c]'
                }`}
              >
                <span className="w-7 h-7 rounded bg-white border border-[#1b1c1c] text-[#1b1c1c] flex items-center justify-center font-bold shadow-[1px_1px_0px_#1b1c1c]">
                  D
                </span>
                <span>Standard <code>requestIdleCallback</code> invocation directly within dispatch</span>
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT RAIL: METRICS, NAVIGATOR, SOCRATIC HINTS (Col 9-12) */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          {/* SKETCHED QUESTION NAVIGATOR MATRIX */}
          <div className="rounded-lg bg-white border-2 border-[#1b1c1c] p-4 shadow-[3px_3px_0px_#1b1c1c] flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-['Bricolage_Grotesque'] font-bold text-sm text-[#1b1c1c] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[20px]">grid_view</span>
                Question Navigator
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-[#f0eded] border border-[#1b1c1c] text-[#4d4632] font-mono">
                3 of 9 Active
              </span>
            </div>

            {/* 3x3 Matrix Grid */}
            <div className="grid grid-cols-3 gap-2.5">
              {/* 01 Completed */}
              <div
                onClick={() => setActiveQuestionIndex(1)}
                className="p-2.5 rounded bg-[#64f9bc] border-2 border-[#1b1c1c] text-[#002114] flex flex-col items-center justify-center shadow-[2px_2px_0px_#1b1c1c] cursor-pointer hover:-translate-y-0.5 transition-transform"
              >
                <span className="font-['Bricolage_Grotesque'] text-lg font-bold">01</span>
                <span className="text-[11px] font-bold flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[14px]">check</span> Done
                </span>
              </div>

              {/* 02 Completed */}
              <div
                onClick={() => setActiveQuestionIndex(2)}
                className="p-2.5 rounded bg-[#64f9bc] border-2 border-[#1b1c1c] text-[#002114] flex flex-col items-center justify-center shadow-[2px_2px_0px_#1b1c1c] cursor-pointer hover:-translate-y-0.5 transition-transform"
              >
                <span className="font-['Bricolage_Grotesque'] text-lg font-bold">02</span>
                <span className="text-[11px] font-bold flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[14px]">check</span> Done
                </span>
              </div>

              {/* 03 ACTIVE (Sticky Highlight) */}
              <div
                onClick={() => setActiveQuestionIndex(3)}
                className="p-2.5 rounded bg-[#facc15] border-2 border-[#1b1c1c] text-[#1b1c1c] flex flex-col items-center justify-center shadow-[3px_3px_0px_#1b1c1c] rotate-[-2deg] ring-2 ring-[#1b1c1c] cursor-pointer"
              >
                <span className="font-['Bricolage_Grotesque'] text-lg font-extrabold">03</span>
                <span className="text-[9px] font-bold bg-[#1b1c1c] text-white px-1 rounded">CURRENT</span>
              </div>

              {/* 04-08 Pending */}
              {[4, 5, 6, 7, 8].map((num) => (
                <div
                  key={num}
                  onClick={() => setActiveQuestionIndex(num)}
                  className="p-2.5 rounded bg-[#f0eded] border-2 border-[#1b1c1c] text-[#1b1c1c] flex flex-col items-center justify-center shadow-[1px_1px_0px_#1b1c1c] cursor-pointer hover:bg-[#eae7e7] transition-colors"
                >
                  <span className="font-['Bricolage_Grotesque'] text-lg">{num < 10 ? `0${num}` : num}</span>
                  <span className="text-[10px] text-[#4d4632]">Pending</span>
                </div>
              ))}

              {/* 09 Locked Essay */}
              <div
                onClick={() => setActiveQuestionIndex(9)}
                className="p-2.5 rounded bg-[#f6f3f2] border-2 border-[#1b1c1c] text-[#4d4632] opacity-60 flex flex-col items-center justify-center shadow-[1px_1px_0px_#1b1c1c] cursor-pointer"
              >
                <span className="font-['Bricolage_Grotesque'] text-lg">09</span>
                <span className="text-[10px] flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[12px]">lock</span> Essay
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[#4d4632] pt-2 border-t border-dashed border-[#1b1c1c]">
              <span className="flex items-center gap-1 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#006c4b]" /> 2 Solved
              </span>
              <span className="flex items-center gap-1 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#facc15]" /> 1 In Flight
              </span>
              <span className="flex items-center gap-1 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#e4e2e1]" /> 6 Remaining
              </span>
            </div>
          </div>

          {/* AI SOCRATIC HINT STICKY NOTE */}
          <div className="relative bg-[#facc15] border-2 border-[#1b1c1c] rounded-lg p-4 shadow-[4px_4px_0px_#1b1c1c] rotate-[-1deg] flex flex-col gap-2">
            {/* Doodle Paperclip in top right corner */}
            <div className="absolute -top-3 right-4 w-6 h-10 border-2 border-[#1b1c1c] rounded-full bg-transparent shadow-[1px_1px_0px_#1b1c1c] pointer-events-none" />

            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#6c5700] text-[20px]">psychology</span>
              <span className="font-['Bricolage_Grotesque'] text-base font-bold text-[#1b1c1c]">
                Socratic Tutor Prompt
              </span>
            </div>

            <p className="text-xs text-[#1b1c1c] italic leading-relaxed">
              "When the cleanup routine triggers an abort signal, fetch raises an AbortError. Are you catching or accidentally swallowing other asynchronous runtime errors?"
            </p>

            {isHintUnlocked && (
              <div className="p-2.5 bg-white border-2 border-[#1b1c1c] rounded text-xs text-[#1b1c1c] leading-relaxed shadow-[2px_2px_0px_#1b1c1c]">
                <strong className="text-[#735c00] block mb-1">💡 Architectural Hint:</strong>
                Verify that your catch block inspects <code className="font-bold bg-[#f0eded] px-1 rounded">err.name !== 'AbortError'</code> before re-throwing, ensuring legitimate network failures bubble up to your telemetry boundary.
              </div>
            )}

            <div className="p-2 bg-white/70 border border-[#1b1c1c] rounded flex items-center justify-between text-[11px] text-[#1b1c1c]">
              <span>Remaining Tutor Hints: <strong>{remainingHints} left</strong></span>
              <span className="text-[#ba1a1a] font-bold">-5 pts if used</span>
            </div>

            <button
              type="button"
              onClick={handleUnlockHint}
              disabled={isHintUnlocked}
              className="w-full py-2 px-3 rounded bg-white hover:bg-[#f0eded] disabled:opacity-50 border-2 border-[#1b1c1c] text-[#1b1c1c] text-xs font-bold shadow-[2px_2px_0px_#1b1c1c] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">lightbulb</span>
              <span>{isHintUnlocked ? 'Hint Unlocked' : 'Unlock Hint for Challenge #03'}</span>
            </button>
          </div>

          {/* SANDBOX VITALS MINI-NOTE */}
          <div className="rounded-lg bg-white border-2 border-[#1b1c1c] p-4 shadow-[3px_3px_0px_#1b1c1c] flex flex-col gap-2">
            <span className="text-xs font-bold text-[#1b1c1c] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#006c4b] text-[18px]">memory</span>
              Sandbox Vitals & Runtime
            </span>
            <div className="flex flex-col gap-1.5 font-mono text-xs">
              <div className="flex items-center justify-between p-2 bg-[#f6f3f2] border border-[#1b1c1c] rounded">
                <span className="text-[#4d4632]">Heap Allocation:</span>
                <span className="font-bold text-[#1b1c1c]">14.8 MB / 64 MB</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-[#f6f3f2] border border-[#1b1c1c] rounded">
                <span className="text-[#4d4632]">Strict Mode:</span>
                <span className="text-[#006c4b] font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#006c4b]" /> Double-Mount ON
                </span>
              </div>
              <div className="flex items-center justify-between p-2 bg-[#f6f3f2] border border-[#1b1c1c] rounded">
                <span className="text-[#4d4632]">Tearing Detection:</span>
                <span className="text-[#735c00] font-bold">Enabled (Fiber v19)</span>
              </div>
            </div>
          </div>

          {/* DOODLE INSPIRATION QUOTE PINNED */}
          <div className="p-3 rounded bg-[#64f9bc]/40 border-2 border-[#1b1c1c] shadow-[2px_2px_0px_#1b1c1c] flex items-center gap-2">
            <span className="text-xl select-none">📌</span>
            <p className="text-xs text-[#4d4632]">
              <strong className="text-[#1b1c1c]">Tutor Tip:</strong> Remember that <code className="font-mono text-[#006c4b] font-bold">signal.aborted</code> checks avoid redundant React microtask triggers!
            </p>
          </div>
        </div>
      </div>

      {/* 4. BOTTOM STICKY ACTION DRAFTING BAR */}
      <div className="sticky bottom-4 z-30 w-full rounded-lg bg-white border-2 border-[#1b1c1c] p-4 shadow-[4px_4px_0px_#1b1c1c] flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Autosave indicator and progress overview */}
        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-1.5 text-[#4d4632] text-xs">
            <span className="material-symbols-outlined text-[16px] text-[#006c4b]">cloud_done</span>
            <span>Draft autosaved 12s ago</span>
          </div>
          <div className="h-4 w-px bg-[#1b1c1c]/30 hidden sm:block" />
          <span className="text-xs font-bold text-[#1b1c1c]">
            Overall Progress: 3 of 9 Items Handled
          </span>
        </div>

        {/* Action Button Controls */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={onPrevious}
            className="px-3.5 py-2 rounded bg-[#f0eded] border-2 border-[#1b1c1c] text-[#1b1c1c] text-xs font-bold shadow-[2px_2px_0px_#1b1c1c] hover:bg-[#eae7e7] transition-transform active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Previous</span>
          </button>

          <button
            type="button"
            className="px-3.5 py-2 rounded bg-[#f0eded] border-2 border-[#1b1c1c] text-[#1b1c1c] text-xs font-bold shadow-[2px_2px_0px_#1b1c1c] hover:bg-[#eae7e7] transition-transform active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[18px]">pause_circle</span>
            <span>Save Draft & Pause</span>
          </button>

          <button
            type="button"
            onClick={onSubmitChallenge}
            className="px-5 py-2 rounded bg-[#facc15] hover:bg-[#ffe083] border-2 border-[#1b1c1c] text-[#1b1c1c] text-xs font-bold shadow-[3px_3px_0px_#1b1c1c] transition-all active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-1.5"
          >
            <span>Submit Challenge #03</span>
            <span className="material-symbols-outlined text-[18px]">bolt</span>
          </button>
        </div>
      </div>
    </div>
  );
};
