import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { ChapterViewer } from "./components/ChapterViewer";
import { CompilerPlayground } from "./components/CompilerPlayground";
import { PracticeLab } from "./components/PracticeLab";
import { CheatSheetView } from "./components/CheatSheetView";
import { CertificateView } from "./components/CertificateView";
import { AITutorModal } from "./components/AITutorModal";
import { CHAPTERS_DATA } from "./data/chaptersData";
import { PRACTICE_CHALLENGES } from "./data/challengesData";
import { CodeSnippet, UserProgress } from "./types";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, Terminal, Sparkles, Target, Award, Github } from "lucide-react";

const PROGRESS_STORAGE_KEY = "cpp_learning_user_progress_v1";

const DEFAULT_PROGRESS: UserProgress = {
  completedChapters: ["bab-1"], // First chapter unlocked by default
  quizScores: {},
  completedChallenges: [],
  xp: 50,
  userName: "Abdul Aziz",
  lastActiveDate: new Date().toISOString(),
  theme: "dark",
};

export default function App() {
  const [activeTab, setActiveTab] = useState<
    "materi" | "compiler" | "lab" | "cheatsheet" | "sertifikat"
  >("materi");
  const [currentChapterId, setCurrentChapterId] = useState<string>("bab-1");
  const [compilerSnippet, setCompilerSnippet] = useState<CodeSnippet | null>(null);
  const [isAITutorOpen, setIsAITutorOpen] = useState<boolean>(false);

  // LocalStorage Progress Management
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return DEFAULT_PROGRESS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Storage save error handler
    }
  }, [progress]);

  // Handler: Complete Chapter with Quiz Score
  const handleCompleteChapter = (chapterId: string, score: number = 3) => {
    setProgress((prev) => {
      const alreadyDone = prev.completedChapters.includes(chapterId);
      const newCompleted = alreadyDone
        ? prev.completedChapters
        : [...prev.completedChapters, chapterId];

      const gainedXp = alreadyDone ? 0 : 50 + score * 10;

      return {
        ...prev,
        completedChapters: newCompleted,
        quizScores: { ...prev.quizScores, [chapterId]: score },
        xp: prev.xp + gainedXp,
      };
    });
  };

  // Handler: Complete Practice Challenge
  const handleCompleteChallenge = (challengeId: string, xpEarned: number) => {
    setProgress((prev) => {
      const alreadyDone = prev.completedChallenges.includes(challengeId);
      if (alreadyDone) return prev;

      return {
        ...prev,
        completedChallenges: [...prev.completedChallenges, challengeId],
        xp: prev.xp + xpEarned,
      };
    });
  };

  // Handler: Open code snippet directly in compiler playground
  const handleOpenInCompiler = (snippet: CodeSnippet) => {
    setCompilerSnippet(snippet);
    setActiveTab("compiler");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdateUserName = (newName: string) => {
    setProgress((prev) => ({ ...prev, userName: newName }));
  };

  const currentChapter = CHAPTERS_DATA.find((c) => c.id === currentChapterId);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white antialiased">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        progress={progress}
        totalChapters={CHAPTERS_DATA.length}
        totalChallenges={PRACTICE_CHALLENGES.length}
        onOpenAITutor={() => setIsAITutorOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-24 lg:pb-12">
        <AnimatePresence mode="wait">
          {activeTab === "materi" && (
            <motion.div
              key="materi"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
            >
              <ChapterViewer
                chapters={CHAPTERS_DATA}
                currentChapterId={currentChapterId}
                onSelectChapter={setCurrentChapterId}
                completedChapters={progress.completedChapters}
                onCompleteChapter={handleCompleteChapter}
                onOpenInCompiler={handleOpenInCompiler}
              />
            </motion.div>
          )}

          {activeTab === "compiler" && (
            <motion.div
              key="compiler"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
            >
              <CompilerPlayground
                initialSnippet={compilerSnippet}
                onClearInitialSnippet={() => setCompilerSnippet(null)}
              />
            </motion.div>
          )}

          {activeTab === "lab" && (
            <motion.div
              key="lab"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
            >
              <PracticeLab
                completedChallenges={progress.completedChallenges}
                onCompleteChallenge={handleCompleteChallenge}
                onOpenInCompiler={(codeText) => {
                  setCompilerSnippet({
                    id: "custom-lab",
                    title: "Latihan Lab Mandiri",
                    category: "Lab",
                    description: "Kode latihan dari tantangan lab",
                    code: codeText,
                  });
                  setActiveTab("compiler");
                }}
              />
            </motion.div>
          )}

          {activeTab === "cheatsheet" && (
            <motion.div
              key="cheatsheet"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
            >
              <CheatSheetView />
            </motion.div>
          )}

          {activeTab === "sertifikat" && (
            <motion.div
              key="sertifikat"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
            >
              <CertificateView
                progress={progress}
                totalChapters={CHAPTERS_DATA.length}
                totalChallenges={PRACTICE_CHALLENGES.length}
                onUpdateUserName={handleUpdateUserName}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating AI Tutor Modal */}
      <AITutorModal
        isOpen={isAITutorOpen}
        onClose={() => setIsAITutorOpen(false)}
        currentTopic={currentChapter?.title}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 print:hidden mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center font-mono font-bold text-[10px] text-white shadow-xs">
              C++
            </div>
            <span className="text-slate-800 font-semibold">
              Belajar C++ Interaktif & Online Compiler
            </span>
          </div>

          <div className="flex items-center gap-6 text-slate-600">
            <button
              onClick={() => setActiveTab("materi")}
              className="hover:text-blue-600 font-medium transition-colors"
            >
              10 Modul Lengkap
            </button>
            <button
              onClick={() => setActiveTab("compiler")}
              className="hover:text-blue-600 font-medium transition-colors"
            >
              Online Compiler (GCC)
            </button>
            <button
              onClick={() => setActiveTab("lab")}
              className="hover:text-blue-600 font-medium transition-colors"
            >
              Tantangan Lab
            </button>
            <button
              onClick={() => setActiveTab("sertifikat")}
              className="hover:text-blue-600 font-medium transition-colors"
            >
              Sertifikat
            </button>
          </div>

          <div className="text-slate-600 font-medium flex items-center gap-1.5">
            <span>Created by :</span>
            <span className="text-slate-900 font-bold">Abdul Aziz., S.Kom., Gr</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
