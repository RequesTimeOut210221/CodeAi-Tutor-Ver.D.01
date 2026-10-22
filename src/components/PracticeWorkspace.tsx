import React, { useState, useEffect } from 'react';

interface PracticeWorkspaceProps {
  onGenerateQuiz: () => void;
  onSubmitForGrading: () => void;
}

export const PracticeWorkspace: React.FC<PracticeWorkspaceProps> = ({
  onGenerateQuiz,
  onSubmitForGrading,
}) => {
  const [activeCenterTab, setActiveCenterTab] = useState<'mcq' | 'essay' | 'bug'>('mcq');
  const [selectedMCQ, setSelectedMCQ] = useState<string>('B');
  const [essayText, setEssayText] = useState<string>(
    'When React 19 initiates a transition or unmounts the host component, the return function of the effect must explicitly cancel the downstream task. Utilizing an AbortController alongside worker.terminate() prevents stale message events from invoking state dispatches after unmount, which otherwise causes silent leaks.'
  );
  const [isKeyVisible, setIsKeyVisible] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<boolean>(false);

  // Stopwatch timer
  const [seconds, setSeconds] = useState<number>(877); // 14:37

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText('AIzaSyB19482X92K472L49Qf');
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const wordCount = essayText.trim() ? essayText.trim().split(/\s+/).length : 0;

  return (
    <div className="w-full flex flex-col gap-6 font-['JetBrains_Mono']">
      {/* 1. TOP HEADER BANNER (Sketched drafting tape look) */}
      <header className="w-full bg-white border-2 border-[#1b1c1c] rounded-lg p-4 shadow-[3px_3px_0px_#1b1c1c] flex flex-wrap items-center justify-between gap-4 relative overflow-hidden">
        {/* Tape visual anchor */}
        <div className="absolute -top-3 left-10 w-24 h-5 bg-[#facc15]/50 border border-[#1b1c1c] rounded-sm -rotate-2 pointer-events-none shadow-sm" />

        <div className="flex flex-wrap items-center gap-4 min-w-0">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[28px] text-[#735c00]">draw</span>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-['Bricolage_Grotesque'] text-2xl font-bold text-[#1b1c1c] tracking-tight">
                  Telemetry Interactive Assessment
                </h1>
                <span className="px-2.5 py-0.5 rounded bg-[#64f9bc] border border-[#1b1c1c] text-[#002114] text-xs font-bold uppercase tracking-wider rotate-[0.8deg] shadow-[1px_1px_0px_#1b1c1c]">
                  ACTIVE SESSION
                </span>
              </div>
              <div className="flex items-center gap-2 text-[#4d4632] text-xs mt-1">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#7b41b4]">folder_open</span>
                  <span className="bg-[#f0eded] border border-[#1b1c1c] px-1.5 py-0.2 rounded">codetutor-sandbox-app</span>
                </span>
                <span>/</span>
                <span className="font-bold text-[#1b1c1c] bg-[#ffe083] border border-[#1b1c1c] px-1.5 py-0.2 rounded">
                  src/hooks/useDataStream.tsx
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Header actions & Stopwatch Badge */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Stopwatch doodle */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#eae7e7] border-2 border-[#1b1c1c] shadow-[2px_2px_0px_#1b1c1c] -rotate-1">
            <span className="material-symbols-outlined text-[#ba1a1a] text-[20px] animate-pulse">timer</span>
            <span className="text-xs font-bold text-[#1b1c1c]">
              Time: <span className="text-[#ba1a1a] font-bold">{formatTimer(seconds)}</span>
            </span>
          </div>

          <button
            type="button"
            className="px-3 py-1.5 rounded bg-white border-2 border-[#1b1c1c] text-[#1b1c1c] text-xs font-bold shadow-[2px_2px_0px_#1b1c1c] hover:bg-[#f0eded] transition-all flex items-center gap-1 active:translate-x-[1px] active:translate-y-[1px]"
          >
            <span className="material-symbols-outlined text-[16px]">tune</span>
            Config Presets
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedMCQ('B');
              setEssayText('');
            }}
            className="px-3 py-1.5 rounded bg-white border-2 border-[#1b1c1c] text-[#4d4632] hover:text-[#ba1a1a] text-xs font-bold shadow-[2px_2px_0px_#1b1c1c] hover:bg-[#ffdad6] transition-all flex items-center gap-1 active:translate-x-[1px] active:translate-y-[1px]"
          >
            <span className="material-symbols-outlined text-[16px]">restart_alt</span>
            Reset Draft
          </button>
        </div>
      </header>

      {/* 3-COLUMN STRUCTURED WORKSPACE */}
      <div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* ==========================================
            LEFT COLUMN: Setup & Code Input (4 Cols)
            ========================================== */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          {/* Google AI Studio Key Notebook Box */}
          <div className="bg-white border-2 border-[#1b1c1c] rounded-lg p-4 shadow-[3px_3px_0px_#1b1c1c] relative flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs uppercase tracking-wider text-[#4d4632] font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#735c00] text-[18px]">key</span>
                Google AI Studio Key
              </label>
              <span className="px-2.5 py-0.5 rounded-full bg-[#68fcbf] border border-[#1b1c1c] text-[#002114] text-[11px] font-bold flex items-center gap-1 shadow-[1px_1px_0px_#1b1c1c]">
                <span className="material-symbols-outlined text-[14px]">check</span> VALID KEY
              </span>
            </div>

            <div className="flex items-center justify-between bg-[#f6f3f2] border-2 border-[#1b1c1c] px-3 py-2 rounded shadow-[2px_2px_0px_#1b1c1c]">
              <span className="text-xs text-[#1b1c1c] font-bold tracking-widest">
                {isKeyVisible ? 'AIzaSyB19482X92K472L49Qf' : 'AIzaSyB••••••••••••••••••••3Qf'}
              </span>
              <div className="flex items-center gap-2 text-[#4d4632]">
                <button
                  type="button"
                  onClick={() => setIsKeyVisible(!isKeyVisible)}
                  className="hover:text-[#1b1c1c]"
                  title="Toggle visibility"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {isKeyVisible ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={handleCopyKey}
                  className="hover:text-[#1b1c1c]"
                  title="Copy Key"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {copiedKey ? 'done' : 'content_copy'}
                  </span>
                </button>
              </div>
            </div>
            <p className="text-[11px] text-[#4d4632] italic">
              Configured: Model <span className="font-bold text-[#1b1c1c]">gemini-1.5-pro-telemetry</span>
            </p>
          </div>

          {/* Ruled Notepad Code Editor Card */}
          <div className="bg-white border-2 border-[#1b1c1c] rounded-lg p-4 shadow-[4px_4px_0px_#1b1c1c] relative flex flex-col">
            {/* Washi tape pinned at top-center */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#facc15]/70 border border-[#1b1c1c] shadow-sm rotate-1 rounded-sm pointer-events-none" />

            {/* File header strip */}
            <div className="flex items-center justify-between pb-2 mt-1">
              <div className="flex items-center gap-1.5 bg-[#eae7e7] border border-[#1b1c1c] px-2.5 py-1 rounded shadow-[2px_2px_0px_#1b1c1c]">
                <span className="material-symbols-outlined text-[#735c00] text-[18px]">edit_document</span>
                <span className="text-xs font-bold text-[#1b1c1c]">useDataStream.tsx</span>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded bg-[#e4c5ff] border border-[#1b1c1c] text-[#763baf] font-semibold">
                React 19 Server/Client Hook
              </span>
            </div>

            {/* Code Display Panel with ruled paper aesthetic */}
            <div className="w-full bg-[#fcf9f8] border-2 border-[#1b1c1c] rounded p-3 shadow-[2px_2px_0px_#1b1c1c] overflow-x-auto text-[#1b1c1c] text-xs leading-relaxed mt-2">
              <pre className="font-mono text-xs">
                <code>
                  <span className="text-[#4d4632] select-none"> 1</span> <span className="text-[#7b41b4] font-bold">import</span> &#123; useState, useEffect &#125; <span className="text-[#7b41b4] font-bold">from</span> <span className="text-[#006c4b]">'react'</span>;{'\n'}
                  <span className="text-[#4d4632] select-none"> 2</span>{'\n'}
                  <span className="text-[#4d4632] select-none"> 3</span> <span className="text-[#7b41b4] font-bold">export function</span> <span className="text-[#735c00] font-bold">useDataStream</span>(streamId: <span className="text-[#006c4b]">string</span>) &#123;{'\n'}
                  <span className="text-[#4d4632] select-none"> 4</span>   <span className="text-[#7b41b4] font-bold">const</span> [payload, setPayload] = <span className="text-[#735c00]">useState</span>&lt;<span className="text-[#006c4b]">any</span>&gt;(<span className="text-[#4d4632]">null</span>);{'\n'}
                  <span className="text-[#4d4632] select-none"> 5</span>   <span className="text-[#7b41b4] font-bold">const</span> [isStale, setStale] = <span className="text-[#735c00]">useState</span>(<span className="text-[#735c00]">false</span>);{'\n'}
                  <span className="text-[#4d4632] select-none"> 6</span>{'\n'}
                  <span className="text-[#4d4632] select-none"> 7</span>   <span className="text-[#735c00]">useEffect</span>(() =&gt; &#123;{'\n'}
                  <span className="text-[#4d4632] select-none"> 8</span>     <span className="text-[#4d4632] italic">// ⚠️ CRITICAL RACE CONDITION & MISSING ABORT</span>{'\n'}
                  <span className="text-[#4d4632] select-none"> 9</span>     <span className="text-[#7b41b4] font-bold">let</span> active = <span className="text-[#735c00]">true</span>;{'\n'}
                  <span className="text-[#4d4632] select-none">10</span>     <span className="text-[#7b41b4] font-bold">const</span> worker = <span className="text-[#7b41b4] font-bold">new</span> <span className="text-[#735c00]">Worker</span>(<span className="text-[#006c4b]">'/streamWorker.js'</span>);{'\n'}
                  <span className="text-[#4d4632] select-none">11</span>{'\n'}
                  <span className="text-[#4d4632] select-none">12</span>     worker.onmessage = (<span className="text-[#006c4b]">evt</span>) =&gt; &#123;{'\n'}
                  <span className="text-[#4d4632] select-none">13</span>       <span className="bg-[#ffdad6] text-[#ba1a1a] px-1 rounded underline decoration-wavy decoration-[#ba1a1a] font-semibold">setPayload(evt.data.chunk);</span>{'\n'}
                  <span className="text-[#4d4632] select-none">14</span>     &#125;;{'\n'}
                  <span className="text-[#4d4632] select-none">15</span>{'\n'}
                  <span className="text-[#4d4632] select-none">16</span>     worker.postMessage(&#123; id: streamId &#125;);{'\n'}
                  <span className="text-[#4d4632] select-none">17</span>{'\n'}
                  <span className="text-[#4d4632] select-none">18</span>     <span className="text-[#4d4632] italic">// Missing: worker.terminate() & active flag guard!</span>{'\n'}
                  <span className="text-[#4d4632] select-none">19</span>   &#125;, [streamId]);{'\n'}
                  <span className="text-[#4d4632] select-none">20</span>{'\n'}
                  <span className="text-[#4d4632] select-none">21</span>   <span className="text-[#7b41b4] font-bold">return</span> &#123; payload, isStale &#125;;{'\n'}
                  <span className="text-[#4d4632] select-none">22</span> &#125;
                </code>
              </pre>
            </div>

            {/* Bug marker callout */}
            <div className="mt-2.5 p-2.5 rounded bg-[#ffdad6]/60 border border-[#1b1c1c] text-[#1b1c1c] shadow-[2px_2px_0px_#1b1c1c] flex items-start gap-2">
              <span className="material-symbols-outlined text-[#ba1a1a] text-[18px] shrink-0 mt-0.5">error</span>
              <div className="text-xs">
                <span className="font-bold text-[#ba1a1a]">Uncaught Leak:</span> Web Worker keeps posting messages after unmount; asynchronous updates cascade across rapid <code className="font-bold bg-white px-1 border border-[#1b1c1c] rounded">streamId</code> switches.
              </div>
            </div>

            {/* Giant Yellow Sticky CTA Button */}
            <button
              type="button"
              onClick={onGenerateQuiz}
              className="w-full mt-4 py-2.5 px-4 bg-[#facc15] hover:bg-[#ffe083] border-2 border-[#1b1c1c] text-[#1b1c1c] text-sm font-bold rounded shadow-[3px_3px_0px_#1b1c1c] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#1b1c1c] transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">bolt</span>
              <span>⚡ Generate Assessment Quiz [Ctrl + Enter]</span>
            </button>
          </div>

          {/* Parsed AST Context / Doodle Node Diagram Card */}
          <div className="bg-white border-2 border-[#1b1c1c] rounded-lg p-4 shadow-[3px_3px_0px_#1b1c1c] flex flex-col gap-2 -rotate-[0.5deg]">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-[#1b1c1c] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#006c4b] text-[18px]">schema</span>
                Parsed AST Context Graph
              </div>
              <span className="text-[#4d4632] text-[11px]">4 Nodes / 2 Effects</span>
            </div>

            {/* Hand-Drawn Diagram SVG Doodle */}
            <div className="w-full bg-[#f6f3f2] border-2 border-[#1b1c1c] p-2 rounded shadow-[2px_2px_0px_#1b1c1c] flex items-center justify-center">
              <svg className="w-full h-36" fill="none" viewBox="0 0 340 130" xmlns="http://www.w3.org/2000/svg">
                {/* Hook Node */}
                <rect fill="#FEF08A" height="40" rx="4" stroke="#1b1c1c" strokeWidth="2" width="85" x="10" y="45" />
                <text fill="#1b1c1c" fontFamily="JetBrains Mono" fontSize="11" fontWeight="bold" x="20" y="70">useDataStream</text>
                {/* Arrow 1 with hand scribble feel */}
                <path d="M95 65 C 115 65, 125 35, 145 35" stroke="#1b1c1c" strokeDasharray="3 3" strokeWidth="2" />
                <polygon fill="#1b1c1c" points="145,30 155,35 145,40" />
                {/* Worker Node */}
                <rect fill="#A7F3D0" height="40" rx="4" stroke="#1b1c1c" strokeWidth="2" width="80" x="155" y="15" />
                <text fill="#1b1c1c" fontFamily="JetBrains Mono" fontSize="11" fontWeight="bold" x="170" y="40">Worker()</text>
                {/* Arrow 2 */}
                <path d="M95 65 C 115 65, 125 95, 145 95" stroke="#1b1c1c" strokeWidth="2" />
                <polygon fill="#1b1c1c" points="145,90 155,95 145,100" />
                {/* State Dispatch Node */}
                <rect fill="#E9D5FF" height="40" rx="4" stroke="#1b1c1c" strokeWidth="2" width="90" x="155" y="75" />
                <text fill="#1b1c1c" fontFamily="JetBrains Mono" fontSize="11" fontWeight="bold" x="165" y="100">setPayload()</text>
                {/* Target Node Leaking */}
                <path d="M245 95 L 275 95" stroke="#ba1a1a" strokeDasharray="2 2" strokeWidth="2" />
                <circle cx="295" cy="95" fill="#ffdad6" r="14" stroke="#ba1a1a" strokeWidth="2" />
                <text fill="#ba1a1a" fontFamily="JetBrains Mono" fontSize="14" fontWeight="bold" x="290" y="100">!</text>
              </svg>
            </div>
            <div className="flex justify-between items-center text-[#4d4632] text-[11px]">
              <span>Dependencies: <code className="text-[#1b1c1c] font-bold">[streamId]</code></span>
              <span className="text-[#ba1a1a] font-bold">Cleanup: None ⚠️</span>
            </div>
          </div>
        </div>

        {/* ==========================================
            CENTER COLUMN: Interactive Assessment (5 Cols)
            ========================================== */}
        <div className="xl:col-span-5 flex flex-col gap-6">
          {/* Comprehension circular gauge & metric sketches */}
          <div className="bg-white border-2 border-[#1b1c1c] rounded-lg p-4 shadow-[4px_4px_0px_#1b1c1c] flex flex-col sm:flex-row items-center gap-4">
            {/* Hand-drawn circular gauge */}
            <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
              <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" fill="none" r="40" stroke="#f0eded" strokeWidth="10" />
                <circle
                  cx="50"
                  cy="50"
                  fill="none"
                  r="40"
                  stroke="#735c00"
                  strokeDasharray="251.2"
                  strokeDashoffset="45"
                  strokeLinecap="round"
                  strokeWidth="10"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-['Bricolage_Grotesque'] text-2xl font-bold text-[#1b1c1c]">82%</span>
                <span className="text-[10px] text-[#4d4632] uppercase font-bold">Mastery</span>
              </div>
            </div>

            {/* Metric Boxes */}
            <div className="flex-1 w-full grid grid-cols-3 gap-2">
              <div className="bg-[#f6f3f2] border border-[#1b1c1c] p-2 rounded text-center shadow-[1px_1px_0px_#1b1c1c]">
                <span className="text-[11px] text-[#4d4632] block">Arch</span>
                <p className="font-['Bricolage_Grotesque'] text-lg text-[#006c4b] font-bold">90%</p>
              </div>
              <div className="bg-[#f6f3f2] border border-[#1b1c1c] p-2 rounded text-center shadow-[1px_1px_0px_#1b1c1c]">
                <span className="text-[11px] text-[#4d4632] block">State</span>
                <p className="font-['Bricolage_Grotesque'] text-lg text-[#735c00] font-bold">75%</p>
              </div>
              <div className="bg-[#f6f3f2] border border-[#1b1c1c] p-2 rounded text-center shadow-[1px_1px_0px_#1b1c1c]">
                <span className="text-[11px] text-[#4d4632] block">Errors</span>
                <p className="font-['Bricolage_Grotesque'] text-lg text-[#7b41b4] font-bold">80%</p>
              </div>
            </div>
          </div>

          {/* Paper Tab Switcher */}
          <div className="flex items-end gap-1 border-b-2 border-[#1b1c1c]">
            <button
              type="button"
              onClick={() => setActiveCenterTab('mcq')}
              className={`px-3 py-1.5 text-xs font-bold rounded-t-lg border-t-2 border-l-2 border-r-2 border-[#1b1c1c] -mb-[2px] transition-all ${
                activeCenterTab === 'mcq'
                  ? 'bg-[#facc15] text-[#1b1c1c] shadow-[2px_-2px_0px_#1b1c1c]'
                  : 'bg-[#eae7e7] text-[#4d4632] hover:text-[#1b1c1c]'
              }`}
            >
              [ MCQ Questions (1) ]
            </button>
            <button
              type="button"
              onClick={() => setActiveCenterTab('essay')}
              className={`px-3 py-1.5 text-xs font-bold rounded-t-lg border-t-2 border-l-2 border-r-2 border-[#1b1c1c] -mb-[2px] transition-all ${
                activeCenterTab === 'essay'
                  ? 'bg-[#facc15] text-[#1b1c1c] shadow-[2px_-2px_0px_#1b1c1c]'
                  : 'bg-[#eae7e7] text-[#4d4632] hover:text-[#1b1c1c]'
              }`}
            >
              [ Architecture Essay ]
            </button>
            <button
              type="button"
              onClick={() => setActiveCenterTab('bug')}
              className={`px-3 py-1.5 text-xs font-bold rounded-t-lg border-t-2 border-l-2 border-r-2 border-[#1b1c1c] -mb-[2px] transition-all ${
                activeCenterTab === 'bug'
                  ? 'bg-[#facc15] text-[#1b1c1c] shadow-[2px_-2px_0px_#1b1c1c]'
                  : 'bg-[#eae7e7] text-[#4d4632] hover:text-[#1b1c1c]'
              }`}
            >
              [ Bug Squash (1) ]
            </button>
          </div>

          {/* Tab 1: Multiple Choice Card */}
          {activeCenterTab === 'mcq' && (
            <div className="bg-white border-2 border-[#1b1c1c] rounded-lg p-4 shadow-[4px_4px_0px_#1b1c1c] flex flex-col gap-4 relative">
              <div className="flex items-start gap-2.5">
                <span className="px-2.5 py-1 bg-[#e4e2e1] border border-[#1b1c1c] text-[#1b1c1c] text-xs font-bold rounded shadow-[1px_1px_0px_#1b1c1c]">
                  Q1
                </span>
                <div>
                  <h2 className="font-['Bricolage_Grotesque'] text-lg font-bold text-[#1b1c1c] leading-tight">
                    What critical performance bottleneck or memory leak is introduced by the <code className="bg-[#f0eded] border border-[#1b1c1c] px-1 rounded text-xs">useEffect</code> invocation on line 7-19?
                  </h2>
                  <p className="text-xs text-[#4d4632] mt-1">Select the primary structural root cause.</p>
                </div>
              </div>

              {/* Options */}
              <div className="flex flex-col gap-2.5 text-xs">
                {/* Option A */}
                <label
                  onClick={() => setSelectedMCQ('A')}
                  className={`p-2.5 rounded-lg border-2 border-[#1b1c1c] cursor-pointer flex items-center justify-between transition-all ${
                    selectedMCQ === 'A'
                      ? 'bg-[#68fcbf] text-[#002114] shadow-[3px_3px_0px_#1b1c1c]'
                      : 'bg-[#fcf9f8] hover:bg-[#f0eded] shadow-[2px_2px_0px_#1b1c1c]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded flex items-center justify-center font-bold bg-[#f0eded] border border-[#1b1c1c] text-[#1b1c1c] shadow-[1px_1px_0px_#1b1c1c]">
                      A
                    </span>
                    <span>The dependency array lacks <code className="font-bold">payload</code> state updates.</span>
                  </div>
                  <input type="radio" name="mcq_screen1" checked={selectedMCQ === 'A'} onChange={() => setSelectedMCQ('A')} className="sr-only" />
                </label>

                {/* Option B (Mint Highlighted) */}
                <label
                  onClick={() => setSelectedMCQ('B')}
                  className={`p-2.5 rounded-lg border-2 border-[#1b1c1c] cursor-pointer flex items-center justify-between transition-all rotate-[0.3deg] ${
                    selectedMCQ === 'B'
                      ? 'bg-[#68fcbf] text-[#002114] font-bold shadow-[3px_3px_0px_#1b1c1c]'
                      : 'bg-[#fcf9f8] hover:bg-[#f0eded] shadow-[2px_2px_0px_#1b1c1c]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded flex items-center justify-center font-bold bg-[#002114] text-white border border-[#1b1c1c] shadow-[1px_1px_0px_#1b1c1c]">
                      B
                    </span>
                    <span>New Web Workers spawn on every dependency change without invoking <code className="underline">terminate()</code> in a cleanup function.</span>
                  </div>
                  {selectedMCQ === 'B' && (
                    <span className="material-symbols-outlined text-[#006c4b] text-[20px] font-bold">check_circle</span>
                  )}
                  <input type="radio" name="mcq_screen1" checked={selectedMCQ === 'B'} onChange={() => setSelectedMCQ('B')} className="sr-only" />
                </label>

                {/* Option C */}
                <label
                  onClick={() => setSelectedMCQ('C')}
                  className={`p-2.5 rounded-lg border-2 border-[#1b1c1c] cursor-pointer flex items-center justify-between transition-all ${
                    selectedMCQ === 'C'
                      ? 'bg-[#68fcbf] text-[#002114] shadow-[3px_3px_0px_#1b1c1c]'
                      : 'bg-[#fcf9f8] hover:bg-[#f0eded] shadow-[2px_2px_0px_#1b1c1c]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded flex items-center justify-center font-bold bg-[#f0eded] border border-[#1b1c1c] text-[#1b1c1c] shadow-[1px_1px_0px_#1b1c1c]">
                      C
                    </span>
                    <span>The hook fails to declare TypeScript generic parameter constraints.</span>
                  </div>
                  <input type="radio" name="mcq_screen1" checked={selectedMCQ === 'C'} onChange={() => setSelectedMCQ('C')} className="sr-only" />
                </label>

                {/* Option D */}
                <label
                  onClick={() => setSelectedMCQ('D')}
                  className={`p-2.5 rounded-lg border-2 border-[#1b1c1c] cursor-pointer flex items-center justify-between transition-all ${
                    selectedMCQ === 'D'
                      ? 'bg-[#68fcbf] text-[#002114] shadow-[3px_3px_0px_#1b1c1c]'
                      : 'bg-[#fcf9f8] hover:bg-[#f0eded] shadow-[2px_2px_0px_#1b1c1c]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded flex items-center justify-center font-bold bg-[#f0eded] border border-[#1b1c1c] text-[#1b1c1c] shadow-[1px_1px_0px_#1b1c1c]">
                      D
                    </span>
                    <span><code className="font-bold">postMessage</code> cannot accept object literals in modern browsers.</span>
                  </div>
                  <input type="radio" name="mcq_screen1" checked={selectedMCQ === 'D'} onChange={() => setSelectedMCQ('D')} className="sr-only" />
                </label>
              </div>
            </div>
          )}

          {/* Tab 2: Architecture Essay Card */}
          {activeCenterTab === 'essay' && (
            <div className="bg-white border-2 border-[#1b1c1c] rounded-lg p-4 shadow-[4px_4px_0px_#1b1c1c] flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1b1c1c] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#7b41b4] text-[18px]">edit_note</span>
                  Architecture Essay Response
                </span>
                <span className="text-[#4d4632] text-xs bg-[#f0eded] border border-[#1b1c1c] px-2 py-0.5 rounded">
                  Word Count: {wordCount} / 250
                </span>
              </div>
              <p className="text-xs text-[#4d4632]">
                Prompt: <span className="text-[#1b1c1c] font-semibold">Explain how state reconciliation handles asynchronous abort signals and worker teardown during concurrent renders.</span>
              </p>
              <textarea
                rows={5}
                value={essayText}
                onChange={(e) => setEssayText(e.target.value)}
                className="w-full bg-[#fcf9f8] border-2 border-[#1b1c1c] p-2.5 rounded shadow-[2px_2px_0px_#1b1c1c] text-xs text-[#1b1c1c] leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#735c00] resize-y"
              />
            </div>
          )}

          {/* Tab 3: Bug Squash Diff Card */}
          {activeCenterTab === 'bug' && (
            <div className="bg-white border-2 border-[#1b1c1c] rounded-lg p-4 shadow-[4px_4px_0px_#1b1c1c] flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1b1c1c] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#006c4b] text-[18px]">difference</span>
                  Proposed Patch Diff
                </span>
                <span className="px-2 py-0.5 rounded bg-[#68fcbf] border border-[#1b1c1c] text-[#002114] text-[11px] font-bold">
                  READY TO APPLY
                </span>
              </div>
              <div className="bg-[#eae7e7] border-2 border-[#1b1c1c] p-2.5 rounded shadow-[2px_2px_0px_#1b1c1c] overflow-x-auto text-xs leading-tight font-mono">
                <pre className="text-[#1b1c1c]">
                  <code>
                    <span className="text-[#ba1a1a] bg-[#ffdad6] px-1 block">- // Missing return worker cleanup function</span>
                    <span className="text-[#006c4b] bg-[#68fcbf]/60 px-1 block font-bold">+ return () =&gt; &#123;</span>
                    <span className="text-[#006c4b] bg-[#68fcbf]/60 px-1 block font-bold">+   active = false;</span>
                    <span className="text-[#006c4b] bg-[#68fcbf]/60 px-1 block font-bold">+   worker.terminate();</span>
                    <span className="text-[#006c4b] bg-[#68fcbf]/60 px-1 block font-bold">+ &#125;;</span>
                  </code>
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* ==========================================
            RIGHT COLUMN: Live Evaluation & Grading (3 Cols)
            ========================================== */}
        <div className="xl:col-span-3 flex flex-col gap-6">
          {/* Hand-Drawn Exam Certificate Grade Card */}
          <div className="bg-white border-2 border-[#1b1c1c] rounded-lg p-5 shadow-[5px_5px_0px_#1b1c1c] relative flex flex-col items-center text-center rotate-1">
            {/* Tape doodle */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#e4c5ff]/70 border border-[#1b1c1c] shadow-sm -rotate-2 rounded-sm pointer-events-none" />

            {/* Star Badge Doodle */}
            <div className="w-14 h-14 rounded-full bg-[#facc15] border-2 border-[#1b1c1c] shadow-[2px_2px_0px_#1b1c1c] flex items-center justify-center -rotate-6 mt-1">
              <span className="material-symbols-outlined text-[#6c5700] text-[30px]">workspace_premium</span>
            </div>

            <div className="mt-2">
              <span className="text-[11px] uppercase tracking-widest text-[#4d4632] font-bold">Evaluation Result</span>
              <div className="font-['Bricolage_Grotesque'] text-4xl font-extrabold text-[#1b1c1c] tracking-tighter mt-1">
                88<span className="text-xl text-[#4d4632]">/100</span>
              </div>
              <p className="font-['Bricolage_Grotesque'] text-lg font-bold text-[#006c4b]">Proficient Architect</p>
            </div>

            <div className="w-full h-0.5 bg-[#e4e2e1] my-3 border-t border-dashed border-[#1b1c1c]" />

            {/* Granular Score Breakdown with rough bars */}
            <div className="w-full flex flex-col gap-3 text-left text-xs">
              <div>
                <div className="flex justify-between font-bold">
                  <span className="text-[#1b1c1c]">MCQ Diagnostic</span>
                  <span className="text-[#006c4b]">20 / 20</span>
                </div>
                <div className="w-full h-2.5 bg-[#f0eded] border border-[#1b1c1c] rounded-full mt-1 overflow-hidden shadow-[1px_1px_0px_#1b1c1c]">
                  <div className="bg-[#68fcbf] h-full w-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold">
                  <span className="text-[#1b1c1c]">Architecture Essay</span>
                  <span className="text-[#735c00]">34 / 40</span>
                </div>
                <div className="w-full h-2.5 bg-[#f0eded] border border-[#1b1c1c] rounded-full mt-1 overflow-hidden shadow-[1px_1px_0px_#1b1c1c]">
                  <div className="bg-[#facc15] h-full w-[85%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold">
                  <span className="text-[#1b1c1c]">Bug Squash Patch</span>
                  <span className="text-[#7b41b4]">34 / 40</span>
                </div>
                <div className="w-full h-2.5 bg-[#f0eded] border border-[#1b1c1c] rounded-full mt-1 overflow-hidden shadow-[1px_1px_0px_#1b1c1c]">
                  <div className="bg-[#e4c5ff] h-full w-[85%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Note: Live AI Code Review */}
          <div className="bg-[#ffe083]/40 border-2 border-[#1b1c1c] rounded-lg p-4 shadow-[4px_4px_0px_#1b1c1c] flex flex-col gap-2 -rotate-1 relative">
            <div className="flex items-center justify-between pb-1.5 border-b border-[#d1c6ab]">
              <span className="text-xs font-bold text-[#1b1c1c] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-[#735c00]">rate_review</span>
                Live AI Review Notes
              </span>
              <span className="text-[11px] text-[#4d4632]">Gemini 1.5</span>
            </div>

            <div className="flex flex-col gap-2 text-xs text-[#1b1c1c] mt-1">
              <div className="flex items-start gap-1.5">
                <span className="material-symbols-outlined text-[#006c4b] text-[16px] shrink-0 mt-0.5">check_circle</span>
                <span><strong className="text-[#006c4b] font-bold">Cleanup Solved:</strong> Worker teardown implemented within return lifecycle hook.</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="material-symbols-outlined text-[#735c00] text-[16px] shrink-0 mt-0.5">priority_high</span>
                <span><strong className="text-[#735c00] font-bold">Dispatch Memo:</strong> Consider wrapping payload setters inside <code className="font-bold bg-white px-1 rounded border border-[#1b1c1c]">startTransition</code> for responsive frames.</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="material-symbols-outlined text-[#7b41b4] text-[16px] shrink-0 mt-0.5">auto_awesome</span>
                <span><strong className="text-[#7b41b4] font-bold">Concurrent Hint:</strong> React 19 Actions can streamline this flow without raw worker event plumbing.</span>
              </div>
            </div>
          </div>

          {/* Bottom Action CTA Sticky Button */}
          <button
            type="button"
            onClick={onSubmitForGrading}
            className="w-full py-3.5 px-4 bg-[#e4c5ff] hover:bg-[#ddb8ff] border-2 border-[#1b1c1c] text-[#763baf] text-sm font-bold rounded-lg shadow-[4px_4px_0px_#1b1c1c] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#1b1c1c] transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">send</span>
            <span>Submit for Automated AI Grading ⚡</span>
          </button>
        </div>
      </div>
    </div>
  );
};
