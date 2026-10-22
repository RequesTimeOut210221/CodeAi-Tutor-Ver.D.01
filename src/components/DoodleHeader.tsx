import React from 'react';

interface DoodleHeaderProps {
  currentScreen: 'workspace' | 'quiz' | 'report';
  setCurrentScreen: (screen: 'workspace' | 'quiz' | 'report') => void;
  edition: 'doodle' | 'kinetic';
  setEdition: (edition: 'doodle' | 'kinetic') => void;
  onOpenSearch: () => void;
}

export const DoodleHeader: React.FC<DoodleHeaderProps> = ({
  currentScreen,
  setCurrentScreen,
  edition,
  setEdition,
  onOpenSearch,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#fcf9f8]/95 backdrop-blur-md border-b-2 border-[#1b1c1c] shadow-[0_2px_0px_#1b1c1c]">
      <div className="h-16 w-full px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Brand Logo & Edition Tag */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#facc15] border-2 border-[#1b1c1c] flex items-center justify-center shadow-[2px_2px_0px_#1b1c1c] -rotate-2">
            <span className="material-symbols-outlined text-[22px] text-[#1b1c1c]">draw</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-['Bricolage_Grotesque'] text-2xl font-bold tracking-tight text-[#1b1c1c]">
              CodeTutor AI
            </span>
            <button
              onClick={() => setEdition(edition === 'doodle' ? 'kinetic' : 'doodle')}
              title="Click to toggle theme edition"
              className="px-2 py-0.5 rounded bg-[#facc15] border border-[#1b1c1c] text-[#6c5700] font-['JetBrains_Mono'] text-[11px] font-bold uppercase tracking-wider -rotate-1 shadow-[1px_1px_0px_#1b1c1c] hover:bg-[#ffe083] transition-all"
            >
              {edition === 'doodle' ? 'v2.5 Doodle Edition' : 'v2.4 Kinetic'}
            </button>
          </div>
        </div>

        {/* Center Screen Stepper Navigation */}
        <nav className="hidden lg:flex items-center gap-2">
          <button
            onClick={() => setCurrentScreen('workspace')}
            className={`px-3.5 py-1.5 font-['JetBrains_Mono'] text-xs font-semibold rounded-lg transition-all ${
              currentScreen === 'workspace'
                ? 'bg-[#facc15] text-[#1b1c1c] border-2 border-[#1b1c1c] shadow-[2px_2px_0px_#1b1c1c]'
                : 'text-[#4d4632] hover:text-[#1b1c1c] hover:bg-[#f0eded]'
            }`}
          >
            Practice Workspace
          </button>
          <button
            onClick={() => setCurrentScreen('quiz')}
            className={`px-3.5 py-1.5 font-['JetBrains_Mono'] text-xs font-semibold rounded-lg transition-all ${
              currentScreen === 'quiz'
                ? 'bg-[#facc15] text-[#1b1c1c] border-2 border-[#1b1c1c] shadow-[2px_2px_0px_#1b1c1c]'
                : 'text-[#4d4632] hover:text-[#1b1c1c] hover:bg-[#f0eded]'
            }`}
          >
            Active Assessment Quiz View
          </button>
          <button
            onClick={() => setCurrentScreen('report')}
            className={`px-3.5 py-1.5 font-['JetBrains_Mono'] text-xs font-semibold rounded-lg transition-all ${
              currentScreen === 'report'
                ? 'bg-[#facc15] text-[#1b1c1c] border-2 border-[#1b1c1c] shadow-[2px_2px_0px_#1b1c1c]'
                : 'text-[#4d4632] hover:text-[#1b1c1c] hover:bg-[#f0eded]'
            }`}
          >
            Grading & Performance Report View
          </button>
        </nav>

        {/* Right Status & Tools */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#eae7e7] border border-[#1b1c1c] text-[#1b1c1c] font-['JetBrains_Mono'] text-xs shadow-[1px_1px_0px_#1b1c1c]">
            <span className="material-symbols-outlined text-[16px] text-[#006c4b]">check_circle</span>
            <span>Connected (Gemini 1.5 Pro)</span>
          </div>

          <button
            onClick={onOpenSearch}
            className="flex items-center px-2.5 py-1 rounded bg-[#f0eded] border border-[#1b1c1c] text-[#4d4632] hover:text-[#1b1c1c] font-['JetBrains_Mono'] text-xs shadow-[1px_1px_0px_#1b1c1c]"
          >
            <span className="material-symbols-outlined text-[16px] mr-1">search</span>
            <span>⌘K Search</span>
          </button>

          <div className="w-8 h-8 rounded-full bg-[#735c00] border-2 border-[#1b1c1c] flex items-center justify-center text-white shadow-[1px_1px_0px_#1b1c1c]">
            <span className="material-symbols-outlined text-[18px]">person</span>
          </div>
        </div>
      </div>
    </header>
  );
};
