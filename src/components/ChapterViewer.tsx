import React, { useState } from "react";
import {
  CheckCircle2,
  Circle,
  Play,
  Copy,
  Check,
  HelpCircle,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  BookOpen,
  Clock,
  ChevronRight,
  Award,
  Search,
} from "lucide-react";
import confetti from "canvas-confetti";
import { Chapter, CodeSnippet } from "../types";
import { FormattedText } from "./FormattedText";

interface ChapterViewerProps {
  chapters: Chapter[];
  currentChapterId: string;
  onSelectChapter: (chapterId: string) => void;
  completedChapters: string[];
  onCompleteChapter: (chapterId: string, score?: number) => void;
  onOpenInCompiler: (snippet: CodeSnippet) => void;
}

export const ChapterViewer: React.FC<ChapterViewerProps> = ({
  chapters,
  currentChapterId,
  onSelectChapter,
  completedChapters,
  onCompleteChapter,
  onOpenInCompiler,
}) => {
  const currentChapter =
    chapters.find((c) => c.id === currentChapterId) || chapters[0];

  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileListOpen, setIsMobileListOpen] = useState(false);

  const isCompleted = completedChapters.includes(currentChapter.id);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleSelectOption = (quizId: string, optionIdx: number) => {
    if (quizSubmitted) return;
    setSelectedQuizAnswers((prev) => ({
      ...prev,
      [quizId]: optionIdx,
    }));
  };

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
    let correctCount = 0;
    currentChapter.quiz.forEach((q) => {
      if (selectedQuizAnswers[q.id] === q.correctOptionIndex) {
        correctCount++;
      }
    });

    const isAllCorrect = correctCount === currentChapter.quiz.length;

    if (isAllCorrect || correctCount >= Math.ceil(currentChapter.quiz.length * 0.6)) {
      onCompleteChapter(currentChapter.id, correctCount);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // Safe confetti fallback
      }
    }
  };

  const handleResetQuiz = () => {
    setSelectedQuizAnswers({});
    setQuizSubmitted(false);
  };

  const currentIndex = chapters.findIndex((c) => c.id === currentChapter.id);
  const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  const filteredChapters = chapters.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `Bab ${c.number}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar: Daftar Bab & Modul */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => setIsMobileListOpen(!isMobileListOpen)}
                className="lg:pointer-events-none flex items-center justify-between w-full lg:w-auto text-left"
              >
                <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  Daftar Modul Belajar
                </h2>
                <div className="flex items-center gap-2 lg:hidden">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-mono">
                    {currentChapter.number}/10 Aktif
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {isMobileListOpen ? "Tutup ▲" : "Ubah Bab ▼"}
                  </span>
                </div>
              </button>
              <span className="hidden lg:inline text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono">
                {completedChapters.length} / {chapters.length} Selesai
              </span>
            </div>

            {/* Collapsible Container for Mobile, Always Visible on Desktop */}
            <div className={`${isMobileListOpen ? "block" : "hidden"} lg:block space-y-3 pt-2 lg:pt-0`}>
              {/* Search Input */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Cari materi (variabel, loop, pointer...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                />
              </div>

              {/* Chapter Items List */}
              <div className="space-y-1.5 max-h-[350px] lg:max-h-[calc(100vh-280px)] overflow-y-auto pr-1 custom-scrollbar">
                {filteredChapters.map((chap) => {
                  const active = chap.id === currentChapter.id;
                  const done = completedChapters.includes(chap.id);

                  return (
                    <button
                      key={chap.id}
                      id={`chapter-nav-${chap.id}`}
                      onClick={() => {
                        onSelectChapter(chap.id);
                        setSelectedQuizAnswers({});
                        setQuizSubmitted(false);
                        setIsMobileListOpen(false);
                      }}
                      className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 border cursor-pointer ${
                        active
                          ? "bg-blue-50/90 border-blue-200 text-blue-950 shadow-xs"
                          : "bg-white hover:bg-slate-50 border-transparent hover:border-slate-200/60 text-slate-700"
                      }`}
                    >
                      <div className="mt-0.5 flex-shrink-0">
                        {done ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-300" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className={`text-[11px] font-bold uppercase tracking-wider font-mono ${
                            active ? "text-blue-700" : "text-blue-600"
                          }`}>
                            Bab {chap.number}
                          </span>
                          <span className="text-[10px] text-slate-500 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {chap.estimatedMinutes} mnt
                          </span>
                        </div>
                        <h4 className={`text-xs sm:text-sm font-semibold truncate mt-0.5 ${
                          active ? "text-slate-900" : "text-slate-800"
                        }`}>
                          {chap.title}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {chap.summary}
                        </p>
                      </div>

                      <ChevronRight
                        className={`w-4 h-4 mt-2 transition-transform ${
                          active ? "text-blue-600 translate-x-0.5" : "text-slate-400"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Main Content: Lesson Reader & Quiz */}
        <div className="lg:col-span-8 space-y-6">
          {/* Chapter Header Card */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xs">
            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/70 text-xs font-bold font-mono">
                    MODUL {currentChapter.number} DARI {chapters.length}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    {currentChapter.estimatedMinutes} Menit Belajar
                  </span>
                </div>

                {isCompleted && (
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Bab Selesai
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {currentChapter.title}
              </h1>
              <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
                {currentChapter.summary}
              </p>
            </div>
          </div>

          {/* Chapter Sections */}
          <div className="space-y-6">
            {currentChapter.sections.map((section) => (
              <div
                key={section.id}
                className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4"
              >
                <h3 className="text-base sm:text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  {section.title}
                </h3>

                {/* Section Text / Markdown formatting */}
                <FormattedText content={section.content} />

                {/* Visual / Info Box if any */}
                {section.visualBox && (
                  <div
                    className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed flex items-start gap-3 ${
                      section.visualBox.type === "warning"
                        ? "bg-amber-50 border-amber-200 text-amber-900"
                        : section.visualBox.type === "tip"
                        ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                        : "bg-blue-50 border-blue-200 text-blue-900"
                    }`}
                  >
                    <Sparkles className="w-5 h-5 flex-shrink-0 mt-0.5 text-current opacity-80" />
                    <div>
                      <h5 className="font-bold text-xs uppercase tracking-wider mb-1">
                        {section.visualBox.title}
                      </h5>
                      <FormattedText content={section.visualBox.text} />
                    </div>
                  </div>
                )}

                {/* Code Examples with Try in Compiler Button */}
                {section.codeExamples && section.codeExamples.length > 0 && (
                  <div className="space-y-4 pt-2">
                    {section.codeExamples.map((codeEx) => (
                      <div
                        key={codeEx.id}
                        className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-xs"
                      >
                        {/* Code Header Bar */}
                        <div className="bg-slate-900 px-4 py-2.5 flex items-center justify-between border-b border-slate-800 flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                            </div>
                            <span className="text-xs font-semibold text-slate-200 ml-2 font-mono">
                              {codeEx.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleCopy(codeEx.code, codeEx.id)}
                              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
                            >
                              {copiedCodeId === codeEx.id ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                  <span className="text-emerald-400">Tersalin!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>Salin</span>
                                </>
                              )}
                            </button>

                            {/* Try in Compiler Action Button */}
                            <button
                              id={`try-compiler-btn-${codeEx.id}`}
                              onClick={() =>
                                onOpenInCompiler({
                                  id: codeEx.id,
                                  title: codeEx.title,
                                  category: currentChapter.title,
                                  description: codeEx.description,
                                  code: codeEx.code,
                                  defaultStdin: codeEx.stdin,
                                  expectedOutput: codeEx.expectedOutput,
                                })
                              }
                              className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs active:scale-95 transition-all cursor-pointer"
                            >
                              <Play className="w-3.5 h-3.5 fill-white" />
                              <span>Coba di Compiler ➔</span>
                            </button>
                          </div>
                        </div>

                        {/* Code Body */}
                        <div className="p-4 overflow-x-auto bg-slate-950 font-mono text-xs sm:text-sm text-emerald-300 leading-relaxed">
                          <pre>{codeEx.code}</pre>
                        </div>

                        {/* Expected Output Preview */}
                        {codeEx.expectedOutput && (
                          <div className="bg-slate-900 border-t border-slate-800/80 p-3 text-xs font-mono">
                            <span className="text-slate-400 block mb-1 font-sans text-[11px] font-semibold">
                              Output yang Dihasilkan:
                            </span>
                            <pre className="text-cyan-300 whitespace-pre-wrap">
                              {codeEx.expectedOutput}
                            </pre>
                          </div>
                        )}

                        {/* Explanation list */}
                        {codeEx.explanation && codeEx.explanation.length > 0 && (
                          <div className="p-4 bg-slate-900/60 border-t border-slate-800/80 text-xs text-slate-300 space-y-1.5">
                            <h6 className="font-semibold text-slate-200">Penjelasan Kode:</h6>
                            <ul className="list-disc list-inside space-y-1.5 text-slate-300">
                              {codeEx.explanation.map((item, idx) => (
                                <li key={idx}>
                                  <FormattedText content={item} className="inline text-slate-300" />
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mini Quiz & Mastery Check Section */}
          <div
            id="chapter-quiz-section"
            className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-amber-600" />
                  Kuis Uji Pemahaman: {currentChapter.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Jawab pertanyaan di bawah untuk memastikan Anda memahami materi sebelum melanjutkan ke bab berikutnya.
                </p>
              </div>

              <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold font-mono">
                +50 XP
              </span>
            </div>

            {/* Quiz Questions */}
            <div className="space-y-6">
              {currentChapter.quiz.map((q, qIndex) => {
                const selected = selectedQuizAnswers[q.id];
                const isAnswered = selected !== undefined;
                const isCorrect = isAnswered && selected === q.correctOptionIndex;

                return (
                  <div
                    key={q.id}
                    className="p-4 sm:p-5 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-3"
                  >
                    <h4 className="text-xs sm:text-sm font-semibold text-slate-900">
                      {qIndex + 1}. {q.question}
                    </h4>

                    {q.codeSnippet && (
                      <pre className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-blue-300 overflow-x-auto">
                        {q.codeSnippet}
                      </pre>
                    )}

                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => {
                        let btnStyle =
                          "bg-white hover:bg-slate-100/80 border-slate-200 text-slate-800";

                        if (quizSubmitted) {
                          if (optIdx === q.correctOptionIndex) {
                            btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold";
                          } else if (selected === optIdx) {
                            btnStyle = "bg-rose-50 border-rose-400 text-rose-950";
                          }
                        } else if (selected === optIdx) {
                          btnStyle = "bg-blue-50 border-blue-600 text-blue-950 font-semibold shadow-xs";
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={quizSubmitted}
                            onClick={() => handleSelectOption(q.id, optIdx)}
                            className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {quizSubmitted && optIdx === q.correctOptionIndex && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 ml-2" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Feedback explanation after submit */}
                    {quizSubmitted && (
                      <div
                        className={`p-3 rounded-xl text-xs leading-relaxed ${
                          isCorrect
                            ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
                            : "bg-amber-50 text-amber-900 border border-amber-200"
                        }`}
                      >
                        <span className="font-bold">
                          {isCorrect ? "✅ Tepat Sekali! " : "💡 Penjelasan: "}
                        </span>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quiz Submit & Reset Action */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              {!quizSubmitted ? (
                <button
                  id="submit-quiz-btn"
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(selectedQuizAnswers).length < currentChapter.quiz.length}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm shadow-xs active:scale-95 transition-all cursor-pointer"
                >
                  Periksa Jawaban Kuis
                </button>
              ) : (
                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleResetQuiz}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer border border-slate-200"
                  >
                    Ulangi Kuis
                  </button>

                  <button
                    onClick={() => {
                      if (nextChapter) {
                        onSelectChapter(nextChapter.id);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                  >
                    <span>Lanjut ke Bab Selanjutnya</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Direct Practice Button */}
              <button
                onClick={() => onOpenInCompiler(currentChapter.starterSnippet)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <Play className="w-3.5 h-3.5 text-emerald-600" />
                <span>Buka Playground Bab Ini</span>
              </button>
            </div>
          </div>

          {/* Bottom Pagination: Prev / Next Chapter */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            {prevChapter ? (
              <button
                onClick={() => {
                  onSelectChapter(prevChapter.id);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Bab {prevChapter.number}: {prevChapter.title}</span>
              </button>
            ) : (
              <div />
            )}

            {nextChapter && (
              <button
                onClick={() => {
                  onSelectChapter(nextChapter.id);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer"
              >
                <span>Bab {nextChapter.number}: {nextChapter.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
