import { CodebaseFile } from '../types';
import rawFiles from './defaultCodebase.json';

export const DEFAULT_CODEBASE_FILES: CodebaseFile[] = rawFiles as CodebaseFile[];

export const CODEBASE_INFO = {
  name: 'Sistem Nilai Akademik Mahasiswa (Dart OOP)',
  framework: 'Dart 3.x (Console Application)',
  description: 'An object-oriented academic grading engine enforcing strict type bounds, SKS limits, modular custom exceptions, functional fold score aggregation, and class ranking comparators.',
  totalFiles: DEFAULT_CODEBASE_FILES.length,
};
