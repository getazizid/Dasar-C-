import React, { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Play,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Award,
  ChevronRight,
  Flame,
  Lightbulb,
  ArrowRight,
  Target,
} from "lucide-react";
import confetti from "canvas-confetti";
import { PracticeChallenge, TestCase } from "../types";
import { PRACTICE_CHALLENGES } from "../data/challengesData";
import { executeCppCode } from "../services/cppRunner";
import { FormattedText } from "./FormattedText";

interface PracticeLabProps {
  completedChallenges: string[];
  onCompleteChallenge: (challengeId: string, xpEarned: number) => void;
  onOpenInCompiler: (code: string) => void;
}

interface TestRunResult {
  testCase: TestCase;
  passed: boolean;
  actualOutput: string;
  error?: string;
}

export const PracticeLab: React.FC<PracticeLabProps> = ({
  completedChallenges,
  onCompleteChallenge,
  onOpenInCompiler,
}) => {
  const [selectedChallengeId, setSelectedChallengeId] = useState<string>(
    PRACTICE_CHALLENGES[0].id
  );
  const currentChallenge =
    PRACTICE_CHALLENGES.find((c) => c.id === selectedChallengeId) ||
    PRACTICE_CHALLENGES[0];

  const [code, setCode] = useState<string>(currentChallenge.starterCode);
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [testResults, setTestResults] = useState<TestRunResult[] | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);

  const isCompleted = completedChallenges.includes(currentChallenge.id);

  const handleSelectChallenge = (challenge: PracticeChallenge) => {
    setSelectedChallengeId(challenge.id);
    setCode(challenge.starterCode);
    setTestResults(null);
    setShowHint(false);
  };

  const handleResetStarter = () => {
    setCode(currentChallenge.starterCode);
    setTestResults(null);
  };

  const handleRunTestCases = async () => {
    if (isTesting) return;
    setIsTesting(true);
    setTestResults(null);

    const results: TestRunResult[] = [];
    let allPassed = true;

    for (const tc of currentChallenge.testCases) {
      try {
        const runRes = await executeCppCode(code, tc.input);
        const actual = runRes.output.trim();
        const expected = tc.expectedOutput.trim();

        // Normalizing whitespace and line endings for robust grading
        const normalize = (str: string) => str.replace(/\r\n/g, "\n").trim();
        const passed = normalize(actual) === normalize(expected);

        if (!passed) allPassed = false;

        results.push({
          testCase: tc,
          passed,
          actualOutput: actual,
          error: runRes.error,
        });
      } catch (err: unknown) {
        allPassed = false;
        results.push({
          testCase: tc,
          passed: false,
          actualOutput: "",
          error: err instanceof Error ? err.message : "Eksekusi gagal",
        });
      }
    }

    setTestResults(results);
    setIsTesting(false);

    if (allPassed) {
      onCompleteChallenge(currentChallenge.id, currentChallenge.xp);
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch {
        // Confetti fallback
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/70 text-xs font-bold font-mono">
              LAB PRAKTIK CODING MANDIRI
            </span>
            <span className="text-xs text-slate-500">Uji Logika & Algoritma</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Tantangan & Proyek Praktik C++
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Selesaikan soal coding di bawah ini. Kode Anda akan otomatis diuji oleh sistem verifikator dengan berbagai kasus uji (test cases).
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-2xl border border-slate-200 shadow-xs">
          <Award className="w-8 h-8 text-amber-500" />
          <div>
            <span className="text-xs text-slate-500 block font-medium">Tantangan Terselesaikan</span>
            <span className="text-lg font-bold text-slate-900 font-mono">
              {completedChallenges.length} / {PRACTICE_CHALLENGES.length}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Challenge List & Problem Description */}
        <div className="lg:col-span-5 space-y-4">
          {/* Challenge Selector Pills */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-3 space-y-1.5 max-h-[320px] overflow-y-auto custom-scrollbar shadow-xs">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-2 block mb-1">
              Daftar Soal Latihan
            </span>
            {PRACTICE_CHALLENGES.map((ch) => {
              const active = ch.id === currentChallenge.id;
              const done = completedChallenges.includes(ch.id);

              return (
                <button
                  key={ch.id}
                  id={`challenge-tab-${ch.id}`}
                  onClick={() => handleSelectChallenge(ch)}
                  className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-center justify-between border cursor-pointer ${
                    active
                      ? "bg-blue-50/90 border-blue-200 text-blue-950 font-semibold shadow-xs"
                      : "bg-white hover:bg-slate-50 border-transparent hover:border-slate-200/60 text-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    {done ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-300 flex-shrink-0" />
                    )}
                    <span className="truncate">{ch.title}</span>
                  </div>

                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 font-mono text-amber-800 ml-2 font-bold">
                    +{ch.xp} XP
                  </span>
                </button>
              );
            })}
          </div>

          {/* Problem Details Card */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/70">
                {currentChallenge.category}
              </span>
              <span className="text-xs text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 font-bold font-mono flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-600" />
                +{currentChallenge.xp} XP
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              {currentChallenge.title}
            </h3>

            <FormattedText content={currentChallenge.description} />

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1.5 font-mono">
              <div>
                <span className="text-slate-500 font-sans font-semibold">Format Input: </span>
                <span className="text-slate-800 font-medium">{currentChallenge.inputFormat}</span>
              </div>
              <div>
                <span className="text-slate-500 font-sans font-semibold">Format Output: </span>
                <span className="text-slate-800 font-medium">{currentChallenge.outputFormat}</span>
              </div>
            </div>

            {/* Hint Dropdown */}
            <div>
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-xs text-amber-700 hover:text-amber-800 flex items-center gap-1.5 font-semibold transition-colors cursor-pointer"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>{showHint ? "Sembunyikan Petunjuk" : "Butuh Petunjuk / Hint?"}</span>
              </button>
              {showHint && (
                <div className="mt-2 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
                  💡 {currentChallenge.hint}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Code Editor & Automated Test Evaluator */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xs flex flex-col h-[520px]">
            {/* Editor Toolbar */}
            <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-slate-200 font-mono">Solusi C++</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetStarter}
                  title="Reset Kode Starter"
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>

                <button
                  id="run-all-tests-btn"
                  onClick={handleRunTestCases}
                  disabled={isTesting}
                  className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs active:scale-95 transition-all cursor-pointer"
                >
                  <Play className={`w-3.5 h-3.5 fill-white ${isTesting ? "animate-spin" : ""}`} />
                  <span>{isTesting ? "Sedang Menguji..." : "Jalankan Semua Test Case"}</span>
                </button>
              </div>
            </div>

            {/* Code Input */}
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="flex-1 bg-slate-950 text-slate-100 p-4 font-mono text-xs sm:text-sm leading-relaxed resize-none focus:outline-none overflow-auto custom-scrollbar"
              style={{ tabSize: 4 }}
            />
          </div>

          {/* Test Case Evaluation Results Card */}
          {testResults && (
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Hasil Pengujian Kasus Uji (Test Cases)
                </h4>
                {testResults.every((r) => r.passed) ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold font-mono">
                    🎉 SEMUA KASUS UJI LULUS! (+{currentChallenge.xp} XP)
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold font-mono">
                    Masih Ada Kasus Uji yang Gagal
                  </span>
                )}
              </div>

              <div className="space-y-2">
                {testResults.map((tr, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border text-xs font-mono space-y-1.5 ${
                      tr.passed
                        ? "bg-emerald-50/80 border-emerald-200 text-emerald-900"
                        : "bg-rose-50/80 border-rose-200 text-rose-900"
                    }`}
                  >
                    <div className="flex items-center justify-between font-sans font-semibold">
                      <div className="flex items-center gap-1.5">
                        {tr.passed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-600" />
                        )}
                        <span>
                          Test Case #{idx + 1}: {tr.testCase.description}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono font-bold">
                        {tr.passed ? "LULUS" : "GAGAL"}
                      </span>
                    </div>

                    {!tr.passed && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                          <span className="text-slate-400 text-[10px] block font-sans">
                            Output yang Diharapkan:
                          </span>
                          <pre className="text-emerald-400">{tr.testCase.expectedOutput}</pre>
                        </div>
                        <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                          <span className="text-slate-400 text-[10px] block font-sans">
                            Output Program Anda:
                          </span>
                          <pre className="text-rose-400">
                            {tr.actualOutput || tr.error || "(kosong)"}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
