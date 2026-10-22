import React, { useState, useEffect } from 'react';
import { DoodleHeader } from './components/DoodleHeader';
import { DoodleSidebar } from './components/DoodleSidebar';
import { PracticeWorkspace } from './components/PracticeWorkspace';
import { ActiveQuizView } from './components/ActiveQuizView';
import { PerformanceReportView } from './components/PerformanceReportView';
import { SearchModal } from './components/SearchModal';

export default function App() {
  // Screen state: 'workspace' | 'quiz' | 'report'
  const [currentScreen, setCurrentScreen] = useState<'workspace' | 'quiz' | 'report'>('workspace');
  // Visual theme edition: 'doodle' | 'kinetic'
  const [edition, setEdition] = useState<'doodle' | 'kinetic'>('doodle');
  // Active repo selector
  const [activeRepo, setActiveRepo] = useState<string>('codetutor-sandbox-app');
  // Mastery progress
  const [masteryPercentage, setMasteryPercentage] = useState<number>(84);
  // Search modal state
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K opens search
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      // Ctrl + Enter advances screen
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        if (currentScreen === 'workspace') {
          setCurrentScreen('quiz');
        } else if (currentScreen === 'quiz') {
          setCurrentScreen('report');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentScreen]);

  return (
    <div
      className={`min-h-screen text-[#1b1c1c] font-['JetBrains_Mono'] ${
        edition === 'doodle'
          ? 'bg-[#fcf9f8] antialiased'
          : 'bg-[#111319] text-slate-100 antialiased'
      }`}
    >
      {/* Persistent Top Header */}
      <DoodleHeader
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
        edition={edition}
        setEdition={setEdition}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Persistent Left Sidebar */}
      <DoodleSidebar
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
        activeRepo={activeRepo}
        setActiveRepo={setActiveRepo}
        masteryPercentage={masteryPercentage}
      />

      {/* Main Viewport Container */}
      <div className="pl-64">
        <main className="w-full pt-16 bg-[#fcf9f8] min-h-screen">
          <div className="flex flex-col w-full">
            <div className="w-full min-h-screen px-4 sm:px-6 py-6 flex flex-col gap-6 dot-grid-canvas">
              {/* Screen 1: Assessment & Practice Workspace */}
              {currentScreen === 'workspace' && (
                <PracticeWorkspace
                  onGenerateQuiz={() => {
                    setCurrentScreen('quiz');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onSubmitForGrading={() => {
                    setCurrentScreen('report');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              )}

              {/* Screen 2: Active Assessment Quiz View */}
              {currentScreen === 'quiz' && (
                <ActiveQuizView
                  onPrevious={() => {
                    setCurrentScreen('workspace');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onSubmitChallenge={() => {
                    setCurrentScreen('report');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              )}

              {/* Screen 3: Grading & Performance Report View */}
              {currentScreen === 'report' && (
                <PerformanceReportView
                  onRetake={() => {
                    setCurrentScreen('quiz');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onStartNextStage={() => {
                    setCurrentScreen('workspace');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Quick Search Palette (⌘K) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectAction={(screen) => {
          if (screen === 'workspace' || screen === 'quiz' || screen === 'report') {
            setCurrentScreen(screen);
          }
        }}
      />
    </div>
  );
}
