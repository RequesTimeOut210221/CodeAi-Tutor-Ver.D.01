export interface CodebaseFile {
  path: string;
  name: string;
  directory: string;
  content: string;
  language: string;
}

export interface MCQOption {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface MCQQuestion {
  id: string;
  number: number;
  question: string;
  focusArea: 'Execution Flow' | 'Module Dependencies' | 'State Management' | 'Edge Cases' | 'Algorithms';
  options: MCQOption[];
  fileReference: string;
  lineRange: string;
}

export interface EssayPrompt {
  id: string;
  number: number;
  title: string;
  category: string;
  prompt: string;
  relevantFiles: string[];
  keyArchitectureQuestions: string[];
}

export interface CodeChallenge {
  id: 'challengeA' | 'challengeB';
  type: 'bugfix' | 'feature';
  title: string;
  subtitle: string;
  scenario: string;
  targetFile: string;
  starterCode: string;
  referenceSolution?: string;
  requirements: string[];
}

export interface AssessmentQuiz {
  id: string;
  title: string;
  subtitle: string;
  codebaseName: string;
  estimatedMinutes: number;
  totalPoints: number;
  mcqs: MCQQuestion[];
  essays: EssayPrompt[];
  challenges: CodeChallenge[];
}

export interface UserSubmission {
  mcq: Record<string, string>; // { q1: 'A', ... }
  essays: Record<string, string>; // { essay1: 'text...', ... }
  challenges: Record<string, string>; // { challengeA: 'code...', ... }
}

export interface MCQEvaluation {
  questionId: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  score: number;
  explanation: string;
  codeReference: string;
}

export interface EssayEvaluation {
  promptId: string;
  score: number;
  maxScore: number;
  feedback: string;
  keyPointsCovered: string[];
  missedOpportunities: string[];
}

export interface ChallengeEvaluation {
  challengeId: string;
  title: string;
  score: number;
  maxScore: number;
  isPass: boolean;
  codeReview: string;
  solutionComparison: string;
}

export interface EvaluationResult {
  overallScore: number; // 0-100
  letterGrade: 'S' | 'A' | 'B' | 'C' | 'F';
  summary: string;
  subScores: {
    executionFlow: number;
    architecture: number;
    codeQuality: number;
  };
  mcqResults: MCQEvaluation[];
  essayResults: EssayEvaluation[];
  challengeResults: ChallengeEvaluation[];
}
