import React, { useState, useMemo, useEffect, useRef } from 'react';
import { CodebaseFile } from '../types';
import {
  Folder,
  FileCode,
  Search,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  ChevronRight,
  ChevronDown,
  Terminal,
} from 'lucide-react';

interface CodeExplorerProps {
  files: CodebaseFile[];
  activeFilePath?: string;
  highlightLine?: number;
  onSelectFile?: (file: CodebaseFile) => void;
}

export const CodeExplorer: React.FC<CodeExplorerProps> = ({
  files,
  activeFilePath,
  highlightLine,
  onSelectFile,
}) => {
  const [selectedPath, setSelectedPath] = useState<string>(
    activeFilePath || (files.length > 0 ? files[0].path : '')
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    root: true,
    lib: true,
    'lib/models': true,
    'lib/exceptions': true,
    'lib/services': true,
    'lib/interfaces': true,
    bin: true,
  });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const lineRef = useRef<HTMLDivElement>(null);

  // Sync external selection
  useEffect(() => {
    if (activeFilePath && activeFilePath !== selectedPath) {
      setSelectedPath(activeFilePath);
      // Auto expand folder
      const dir = activeFilePath.includes('/') ? activeFilePath.substring(0, activeFilePath.lastIndexOf('/')) : 'root';
      setExpandedFolders((prev) => ({ ...prev, [dir]: true }));
    }
  }, [activeFilePath]);

  // Scroll to highlighted line
  useEffect(() => {
    if (highlightLine && lineRef.current) {
      lineRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [highlightLine, selectedPath]);

  const activeFile = useMemo(() => {
    return files.find((f) => f.path === selectedPath) || files[0];
  }, [files, selectedPath]);

  // Organize files into a directory hierarchy
  const fileTree = useMemo(() => {
    const tree: Record<string, CodebaseFile[]> = {};
    files.forEach((file) => {
      const parts = file.path.split('/');
      const dir = parts.length > 1 ? parts.slice(0, -1).join('/') : 'root';
      if (!tree[dir]) tree[dir] = [];
      tree[dir].push(file);
    });
    return tree;
  }, [files]);

  const filteredFiles = useMemo(() => {
    if (!searchTerm.trim()) return files;
    const term = searchTerm.toLowerCase();
    return files.filter(
      (f) =>
        f.path.toLowerCase().includes(term) ||
        f.content.toLowerCase().includes(term)
    );
  }, [files, searchTerm]);

  const handleCopy = () => {
    if (!activeFile) return;
    navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleFolder = (folder: string) => {
    setExpandedFolders((prev) => ({ ...prev, [folder]: !prev[folder] }));
  };

  const lines = activeFile ? activeFile.content.split('\n') : [];

  return (
    <div
      className={`bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col ${
        isFullscreen ? 'fixed inset-4 z-50' : 'h-[750px]'
      }`}
    >
      {/* Top Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800 text-sm">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-indigo-400" />
          <span className="font-semibold text-slate-200">Dart Project Files</span>
          <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
            {files.length} source files
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search code or symbols..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-900 border border-slate-700/80 text-xs text-slate-200 rounded-lg pl-8 pr-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-44 sm:w-60"
            />
          </div>

          <button
            onClick={handleCopy}
            title="Copy current file contents"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Split Explorer */}
      <div className="flex-1 flex overflow-hidden">
        {/* File Sidebar */}
        <div className="w-64 sm:w-72 bg-slate-950/60 border-r border-slate-800 overflow-y-auto p-2 text-xs">
          {searchTerm.trim() ? (
            <div className="space-y-1">
              <div className="text-[11px] font-semibold text-slate-400 px-2 py-1 uppercase tracking-wider">
                Matching Files ({filteredFiles.length})
              </div>
              {filteredFiles.map((file) => (
                <button
                  key={file.path}
                  onClick={() => {
                    setSelectedPath(file.path);
                    onSelectFile?.(file);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center space-x-2 transition-colors ${
                    selectedPath === file.path
                      ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5 shrink-0 text-indigo-400" />
                  <span className="truncate">{file.path}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {Object.entries(fileTree).map(([dir, dirFiles]) => {
                const isExpanded = expandedFolders[dir] ?? true;
                return (
                  <div key={dir} className="space-y-0.5">
                    <button
                      onClick={() => toggleFolder(dir)}
                      className="w-full flex items-center space-x-1.5 text-slate-300 hover:text-white px-2 py-1 rounded hover:bg-slate-800/40 font-medium"
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                      )}
                      <Folder className="w-3.5 h-3.5 text-amber-400/80" />
                      <span className="truncate">{dir === 'root' ? 'root project' : dir}</span>
                      <span className="text-[10px] text-slate-500 ml-auto">({dirFiles.length})</span>
                    </button>

                    {isExpanded && (
                      <div className="pl-4 space-y-0.5 border-l border-slate-800/80 ml-2">
                        {dirFiles.map((file) => {
                          const isSelected = selectedPath === file.path;
                          return (
                            <button
                              key={file.path}
                              onClick={() => {
                                setSelectedPath(file.path);
                                onSelectFile?.(file);
                              }}
                              className={`w-full text-left px-2 py-1 rounded-md flex items-center space-x-2 transition-all ${
                                isSelected
                                  ? 'bg-indigo-600 text-white font-medium shadow-sm'
                                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                              }`}
                            >
                              <FileCode
                                className={`w-3.5 h-3.5 shrink-0 ${
                                  isSelected ? 'text-white' : 'text-indigo-400'
                                }`}
                              />
                              <span className="truncate">{file.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Code Content Viewer */}
        <div className="flex-1 flex flex-col bg-slate-900/95 overflow-hidden">
          {/* Active File Header */}
          <div className="px-4 py-2 bg-slate-950/40 border-b border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center space-x-2 font-mono">
              <span className="text-slate-500">path:</span>
              <span className="text-indigo-300 font-semibold">{activeFile?.path}</span>
              {highlightLine && (
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded text-[11px]">
                  Focus: line {highlightLine}
                </span>
              )}
            </div>
            <div className="text-[11px] text-slate-500 font-mono">
              {lines.length} lines • {activeFile?.language.toUpperCase()}
            </div>
          </div>

          {/* Code Lines with Line Numbers */}
          <div className="flex-1 overflow-auto font-mono text-[13px] leading-relaxed p-4 select-text">
            {lines.map((lineText, idx) => {
              const lineNum = idx + 1;
              const isTargetLine = highlightLine === lineNum;

              return (
                <div
                  key={idx}
                  ref={isTargetLine ? lineRef : null}
                  className={`flex items-start rounded px-1 transition-colors ${
                    isTargetLine
                      ? 'bg-amber-500/20 border-l-4 border-amber-400 text-amber-100 font-medium'
                      : 'hover:bg-slate-800/40'
                  }`}
                >
                  <span className="w-10 shrink-0 text-slate-600 select-none text-right pr-4 text-xs pt-0.5">
                    {lineNum}
                  </span>
                  <pre className="flex-1 text-slate-200 whitespace-pre overflow-x-visible">
                    {colorizeDart(lineText)}
                  </pre>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// Lightweight Dart syntax highlighting formatter
function colorizeDart(line: string): React.ReactNode {
  if (!line) return ' ';

  // Comments
  if (line.trim().startsWith('//') || line.trim().startsWith('///')) {
    return <span className="text-emerald-400 italic">{line}</span>;
  }

  // Split tokens safely
  const parts = line.split(/(\b(?:abstract|class|extends|implements|import|void|double|int|String|bool|Map|List|Set|final|static|const|required|super|this|return|throw|try|catch|rethrow|finally|if|else|for|in|where|fold|on|get|set|override|print)\b|"[^"]*"|'[^']*'|\d+\.?\d*)/g);

  return parts.map((part, i) => {
    if (
      /^(abstract|class|extends|implements|import|void|final|static|const|required|super|this|return|throw|try|catch|rethrow|finally|if|else|for|in|where|fold|on|get|set|override)$/.test(
        part
      )
    ) {
      return (
        <span key={i} className="text-violet-400 font-semibold">
          {part}
        </span>
      );
    }
    if (/^(double|int|String|bool|Map|List|Set)$/.test(part)) {
      return (
        <span key={i} className="text-cyan-400 font-medium">
          {part}
        </span>
      );
    }
    if (/^("[^"]*"|'[^']*')$/.test(part)) {
      return (
        <span key={i} className="text-amber-300">
          {part}
        </span>
      );
    }
    if (/^\d+\.?\d*$/.test(part)) {
      return (
        <span key={i} className="text-emerald-300">
          {part}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}
