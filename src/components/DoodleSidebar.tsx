import React from 'react';

interface DoodleSidebarProps {
  currentScreen: 'workspace' | 'quiz' | 'report';
  setCurrentScreen: (screen: 'workspace' | 'quiz' | 'report') => void;
  activeRepo: string;
  setActiveRepo: (repo: string) => void;
  masteryPercentage: number;
}

export const DoodleSidebar: React.FC<DoodleSidebarProps> = ({
  currentScreen,
  setCurrentScreen,
  activeRepo,
  setActiveRepo,
  masteryPercentage,
}) => {
  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-[#f6f3f2] border-r-2 border-[#1b1c1c] z-30 flex flex-col justify-between py-4 px-3 shadow-[2px_0px_0px_#1b1c1c]">
      <div className="flex flex-col gap-4">
        {/* Active Repo Card */}
        <div className="mx-1 p-3 rounded-lg bg-white border-2 border-[#1b1c1c] shadow-[2px_2px_0px_#1b1c1c]">
          <div className="flex items-center justify-between text-[11px] font-['JetBrains_Mono'] text-[#4d4632]">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-[#735c00]">star</span>
              <span className="font-bold tracking-wider uppercase">ACTIVE REPO</span>
            </div>
            <span className="text-[10px] px-1 bg-[#64f9bc] border border-[#1b1c1c] rounded font-bold">GIT</span>
          </div>

          <select
            value={activeRepo}
            onChange={(e) => setActiveRepo(e.target.value)}
            className="w-full mt-2 bg-[#f0eded] border border-[#1b1c1c] rounded px-2 py-1 text-xs font-['JetBrains_Mono'] font-bold text-[#1b1c1c] focus:outline-none focus:ring-1 focus:ring-[#735c00]"
          >
            <option value="codetutor-sandbox-app">codetutor-sandbox-app (React 19)</option>
            <option value="dart-academic-system">dart-academic-system (Dart OOP)</option>
            <option value="custom-uploaded-repo">custom-uploaded-repo</option>
          </select>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex flex-col gap-1.5 px-1 font-['JetBrains_Mono'] text-xs">
          <button
            onClick={() => setCurrentScreen('workspace')}
            className={`flex items-center px-3 py-2.5 rounded-lg border-2 transition-all ${
              currentScreen === 'workspace'
                ? 'bg-[#facc15] text-[#1b1c1c] border-[#1b1c1c] font-bold shadow-[2px_2px_0px_#1b1c1c]'
                : 'border-transparent text-[#4d4632] hover:bg-[#eae7e7] hover:text-[#1b1c1c]'
            }`}
          >
            <span className="material-symbols-outlined mr-2.5 text-[20px]">code</span>
            <span>Practice Workspace</span>
          </button>

          <button
            onClick={() => setCurrentScreen('quiz')}
            className={`flex items-center px-3 py-2.5 rounded-lg border-2 transition-all ${
              currentScreen === 'quiz'
                ? 'bg-[#facc15] text-[#1b1c1c] border-[#1b1c1c] font-bold shadow-[2px_2px_0px_#1b1c1c]'
                : 'border-transparent text-[#4d4632] hover:bg-[#eae7e7] hover:text-[#1b1c1c]'
            }`}
          >
            <span className="material-symbols-outlined mr-2.5 text-[20px]">quiz</span>
            <span>Active Quiz Assessment</span>
          </button>

          <button
            onClick={() => setCurrentScreen('report')}
            className={`flex items-center px-3 py-2.5 rounded-lg border-2 transition-all ${
              currentScreen === 'report'
                ? 'bg-[#facc15] text-[#1b1c1c] border-[#1b1c1c] font-bold shadow-[2px_2px_0px_#1b1c1c]'
                : 'border-transparent text-[#4d4632] hover:bg-[#eae7e7] hover:text-[#1b1c1c]'
            }`}
          >
            <span className="material-symbols-outlined mr-2.5 text-[20px]">insights</span>
            <span>Performance Report & Evaluation</span>
          </button>
        </nav>
      </div>

      {/* Bottom Live Mastery Card */}
      <div className="mx-1 p-3.5 rounded-lg bg-white border-2 border-[#1b1c1c] shadow-[2px_2px_0px_#1b1c1c] flex flex-col gap-2 font-['JetBrains_Mono']">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#4d4632] font-medium">Live Mastery</span>
          <span className="font-bold text-[#006c4b]">{masteryPercentage}% Ready</span>
        </div>
        <div className="w-full h-2.5 rounded-full bg-[#e4e2e1] border border-[#1b1c1c] overflow-hidden p-0.5">
          <div
            className="h-full bg-[#facc15] rounded-full transition-all duration-700"
            style={{ width: `${masteryPercentage}%` }}
          />
        </div>
        <p className="text-[11px] text-[#4d4632] mt-0.5">Next checkpoint in 2 tests</p>
      </div>
    </aside>
  );
};
