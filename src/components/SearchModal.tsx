import React, { useState } from 'react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (action: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectAction,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const items = [
    { title: 'Practice Workspace', category: 'Navigation', screen: 'workspace', icon: 'code' },
    { title: 'Active Assessment Quiz', category: 'Navigation', screen: 'quiz', icon: 'quiz' },
    { title: 'Grading & Performance Report', category: 'Navigation', screen: 'report', icon: 'insights' },
    { title: 'React 19 AbortController & Stream Fix', category: 'Challenge', screen: 'quiz', icon: 'bug_report' },
    { title: 'useDataStream.tsx AST Graph', category: 'Codebase', screen: 'workspace', icon: 'schema' },
    { title: 'Dart Academic System (Sistem Nilai)', category: 'Codebase', screen: 'workspace', icon: 'folder' },
    { title: 'Cognitive Velocity vs Cohort', category: 'Analytics', screen: 'report', icon: 'show_chart' },
  ];

  const filtered = items.filter(
    (i) =>
      i.title.toLowerCase().includes(query.toLowerCase()) ||
      i.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white border-2 border-[#1b1c1c] rounded-xl shadow-[5px_5px_0px_#1b1c1c] overflow-hidden font-['JetBrains_Mono']">
        <div className="flex items-center px-4 py-3 border-b-2 border-[#1b1c1c] bg-[#fcf9f8]">
          <span className="material-symbols-outlined text-[20px] text-[#4d4632] mr-2">search</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, question, or file to search..."
            className="w-full bg-transparent text-xs text-[#1b1c1c] focus:outline-none placeholder:text-[#7f7660]"
            autoFocus
          />
          <button
            onClick={onClose}
            className="px-1.5 py-0.5 rounded bg-[#f0eded] border border-[#1b1c1c] text-[10px] font-bold text-[#4d4632] hover:bg-[#ffdad6]"
          >
            ESC
          </button>
        </div>

        <div className="max-h-72 overflow-y-auto p-2 space-y-1">
          {filtered.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                onSelectAction(item.screen);
                onClose();
              }}
              className="w-full flex items-center justify-between p-2.5 rounded hover:bg-[#facc15]/30 text-left transition-colors border border-transparent hover:border-[#1b1c1c]"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#735c00]">{item.icon}</span>
                <span className="text-xs font-bold text-[#1b1c1c]">{item.title}</span>
              </div>
              <span className="text-[10px] uppercase font-bold text-[#4d4632] bg-[#f0eded] border border-[#1b1c1c] px-1.5 py-0.2 rounded">
                {item.category}
              </span>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="p-4 text-center text-xs text-[#4d4632]">
              No matching commands or modules found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
