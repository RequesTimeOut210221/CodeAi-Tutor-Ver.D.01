import React, { useState } from 'react';
import JSZip from 'jszip';
import { CodebaseFile } from '../types';
import { Upload, X, FileCode, Check, AlertCircle, Loader2 } from 'lucide-react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadFiles: (files: CodebaseFile[], name: string) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onLoadFiles,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      if (file.name.endsWith('.zip')) {
        const zip = new JSZip();
        const zipContent = await zip.loadAsync(file);
        const extracted: CodebaseFile[] = [];

        for (const [filename, fileEntry] of Object.entries(zipContent.files)) {
          if (fileEntry.dir) continue;
          if (filename.includes('__MACOSX') || filename.includes('.git/')) continue;

          const text = await fileEntry.async('string');
          const ext = filename.split('.').pop() || '';
          const parts = filename.split('/');
          const dir = parts.length > 1 ? parts.slice(0, -1).join('/') : 'root';

          extracted.push({
            path: filename,
            name: parts[parts.length - 1],
            directory: dir,
            content: text,
            language: ext.toLowerCase(),
          });
        }

        if (extracted.length === 0) {
          throw new Error('No readable source files found inside the ZIP archive.');
        }

        onLoadFiles(extracted, file.name.replace('.zip', ''));
        onClose();
      } else {
        // Single file
        const text = await file.text();
        const ext = file.name.split('.').pop() || '';
        onLoadFiles(
          [
            {
              path: file.name,
              name: file.name,
              directory: 'root',
              content: text,
              language: ext.toLowerCase(),
            },
          ],
          file.name
        );
        onClose();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to parse uploaded archive.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <Upload className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white">Upload Project Archive</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Upload any Dart, TypeScript, or project source archive (<code>.zip</code> or single code file).
          CodeTutor AI will automatically ingest the files, update the codebase explorer, and adapt quiz evaluations.
        </p>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <label className="border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-950/60 group">
          <input
            type="file"
            accept=".zip,.dart,.ts,.tsx,.js,.json,.yaml"
            onChange={handleFileUpload}
            className="sr-only"
            disabled={loading}
          />
          {loading ? (
            <div className="flex flex-col items-center space-y-2 text-indigo-400">
              <Loader2 className="w-8 h-8 animate-spin" />
              <span className="text-xs text-slate-300">Extracting source files...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2 text-center">
              <Upload className="w-8 h-8 text-slate-400 group-hover:text-indigo-400 transition-colors" />
              <span className="text-xs font-semibold text-slate-200">
                Click or drag & drop project .zip here
              </span>
              <span className="text-[11px] text-slate-500">Supports .zip, .dart, .ts archives</span>
            </div>
          )}
        </label>
      </div>
    </div>
  );
};
