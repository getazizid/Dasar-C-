export interface CodeSnippet {
  id: string;
  title: string;
  category: string;
  description: string;
  code: string;
  defaultStdin?: string;
  expectedOutput?: string;
}

export interface CodeExample {
  id: string;
  title: string;
  description: string;
  code: string;
  stdin?: string;
  expectedOutput: string;
  explanation: string[];
  keyPoints?: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface ChapterSection {
  id: string;
  title: string;
  content: string; // Markdown or rich HTML-friendly text
  codeExamples?: CodeExample[];
  visualBox?: {
    title: string;
    type: "info" | "warning" | "tip" | "memory";
    text: string;
  };
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  slug: string;
  summary: string;
  icon: string;
  estimatedMinutes: number;
  sections: ChapterSection[];
  quiz: QuizQuestion[];
  starterSnippet: CodeSnippet;
}

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  description: string;
  isHidden?: boolean;
}

export interface PracticeChallenge {
  id: string;
  number: number;
  title: string;
  difficulty: "Mudah" | "Sedang" | "Tantangan";
  category: string;
  xp: number;
  description: string;
  inputFormat: string;
  outputFormat: string;
  starterCode: string;
  solutionCode: string;
  hint: string;
  testCases: TestCase[];
}

export interface ExecutionResult {
  success: boolean;
  output: string;
  error?: string;
  executionTime?: number;
  exitCode?: number;
  compiler?: string;
  isSimulated?: boolean;
}

export interface UserProgress {
  completedChapters: string[];
  quizScores: Record<string, number>; // chapterId -> score
  completedChallenges: string[];
  xp: number;
  userName: string;
  lastActiveDate: string;
  theme: "dark" | "light";
}
