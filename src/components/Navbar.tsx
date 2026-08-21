import React, { useState, useRef, useEffect } from "react";
import {
  BookOpen,
  Terminal,
  Target,
  FileText,
  Award,
  Sparkles,
  Flame,
  Menu,
  X,
  ChevronDown,
  CheckCircle2,
  Zap,
  GraduationCap,
  Code2,
  RotateCcw,
} from "lucide-react";
import { UserProgress } from "../types";

interface NavbarProps {
  activeTab: "materi" | "compiler" | "lab" | "cheatsheet" | "sertifikat";
  setActiveTab: (tab: "materi" | "compiler" | "lab" | "cheatsheet" | "sertifikat") => void;
  progress: UserProgress;
  totalChapters: number;
  totalChallenges: number;
  onOpenAITutor: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  progress,
  totalChapters,
  totalChallenges,
  onOpenAITutor,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProgressDropdownOpen, setIsProgressDropdownOpen] = useState(false);
  const progressDropdownRef = useRef<HTMLDivElement>(null);

  const completedChaptersCount = progress.completedChapters.length;
  const progressPercent = Math.round((completedChaptersCount / totalChapters) * 100);
  const completedChallengesCount = progress.completedChallenges.length;

  // Level calculation based on XP
  const currentLevel = Math.floor(progress.xp / 100) + 1;
  const nextLevelXp = currentLevel * 100;
  const currentLevelBaseXp = (currentLevel - 1) * 100;
  const levelProgressPercent = Math.min(
    100,
    Math.max(0, Math.round(((progress.xp - currentLevelBaseXp) / (nextLevelXp - currentLevelBaseXp)) * 100))
  );

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        progressDropdownRef.current &&
        !progressDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProgressDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    {
      id: "materi" as const,
      label: "Materi Belajar",
      shortLabel: "Materi",
      icon: BookOpen,
      badge: `${completedChaptersCount}/${totalChapters}`,
      badgeColor: "bg-blue-100 text-blue-800",
      description: "10 Bab Teori Terstruktur & Kuis Interaktif",
    },
    {
      id: "compiler" as const,
      label: "Compiler Online",
      shortLabel: "Compiler",
      icon: Terminal,
      badge: "GCC 20",
      badgeColor: "bg-emerald-100 text-emerald-800",
      description: "Editor C++ Modern, stdin interaktif & GCC engine",
    },
    {
      id: "lab" as const,
      label: "Tantangan Lab",
      shortLabel: "Lab",
      icon: Target,
      badge: `${completedChallengesCount}/${totalChallenges}`,
      badgeColor: "bg-amber-100 text-amber-900",
      description: "Soal coding mandiri dengan autotester otomatis",
    },
    {
      id: "cheatsheet" as const,
      label: "Cheat Sheet",
      shortLabel: "Sintaks",
      icon: FileText,
      badge: "Kamus",
      badgeColor: "bg-indigo-100 text-indigo-800",
      description: "Contekan cepat sintaks C++ & solusi compiler error",
    },
    {
      id: "sertifikat" as const,
      label: "Sertifikat",
      shortLabel: "Sertifikat",
      icon: Award,
      badge: completedChaptersCount >= 5 ? "Tersedia" : `${completedChaptersCount}/5`,
      badgeColor: completedChaptersCount >= 5 ? "bg-amber-100 text-amber-900 font-bold" : "bg-slate-100 text-slate-600",
      description: "Sertifikat digital kompetensi kelulusan resmi",
    },
  ];

  return (
    <>
      {/* Main Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 text-slate-900 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-[70px]">
            {/* Left: Brand Logo & Title */}
            <div className="flex items-center gap-3">
              <div
                id="brand-logo"
                onClick={() => {
                  setActiveTab("materi");
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 cursor-pointer group select-none"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center font-bold text-white shadow-xs group-hover:scale-105 transition-transform">
                  <span className="font-mono text-sm tracking-tight font-extrabold">C++</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-base tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                      Belajar C++
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200/60 uppercase tracking-wider font-mono">
                      v2.0
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 hidden sm:block">
                    Kurikulum Interaktif & Compiler Online
                  </p>
                </div>
              </div>
            </div>

            {/* Middle: Desktop Segmented Navigation */}
            <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80 shadow-inner">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-${item.id}-btn`}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer relative ${
                      isActive
                        ? "bg-white text-slate-900 shadow-xs border border-slate-200/90 font-bold"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                    }`}
                  >
                    <IconComponent
                      className={`w-3.5 h-3.5 ${
                        isActive
                          ? item.id === "compiler"
                            ? "text-emerald-600"
                            : item.id === "lab"
                            ? "text-amber-600"
                            : item.id === "sertifikat"
                            ? "text-amber-500"
                            : "text-blue-600"
                          : "text-slate-400"
                      }`}
                    />
                    <span>{item.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold leading-none ${
                        isActive ? item.badgeColor : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {item.badge}
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* Right: Actions, XP Stats Dropdown & AI Tutor */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* User Level & XP Dropdown Trigger */}
              <div className="relative" ref={progressDropdownRef}>
                <button
                  id="user-progress-menu-btn"
                  onClick={() => setIsProgressDropdownOpen(!isProgressDropdownOpen)}
                  className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/90 text-xs text-slate-800 transition-all cursor-pointer shadow-xs"
                >
                  <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-[11px] font-mono">
                    <Flame className="w-3.5 h-3.5 text-amber-600" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] text-slate-500 font-medium leading-none">
                      Level {currentLevel}
                    </span>
                    <span className="font-bold text-amber-900 font-mono text-xs leading-tight">
                      {progress.xp} XP
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                      isProgressDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Progress Details Dropdown Modal */}
                {isProgressDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white border border-slate-200/90 rounded-2xl shadow-xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center font-bold text-blue-700">
                          <GraduationCap className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">
                            {progress.userName || "Pelajar C++"}
                          </h4>
                          <span className="text-[10px] text-slate-500">
                            Tingkat: Junior Programmer
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-mono font-bold">
                        Level {currentLevel}
                      </span>
                    </div>

                    {/* Level XP Progress Bar */}
                    <div className="py-3 space-y-1.5 border-b border-slate-100">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-600 font-medium">Progres ke Level {currentLevel + 1}</span>
                        <span className="font-mono text-slate-900 font-bold">
                          {progress.xp} / {nextLevelXp} XP
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full transition-all duration-300"
                          style={{ width: `${levelProgressPercent}%` }}
                        />
                      </div>
                    </div>

                    {/* Stats Summary Grid */}
                    <div className="grid grid-cols-2 gap-2 pt-3">
                      <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="text-[10px] text-slate-500 block">Modul Selesai</span>
                        <span className="text-sm font-bold text-slate-900 font-mono">
                          {completedChaptersCount} / {totalChapters}
                        </span>
                        <span className="text-[9px] text-blue-600 font-medium block mt-0.5">
                          {progressPercent}% Kurikulum
                        </span>
                      </div>

                      <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="text-[10px] text-slate-500 block">Tantangan Lab</span>
                        <span className="text-sm font-bold text-slate-900 font-mono">
                          {completedChallengesCount} / {totalChallenges}
                        </span>
                        <span className="text-[9px] text-amber-600 font-medium block mt-0.5">
                          Terselesaikan
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 flex justify-between items-center text-[11px]">
                      <button
                        onClick={() => {
                          setActiveTab("sertifikat");
                          setIsProgressDropdownOpen(false);
                        }}
                        className="text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                      >
                        Lihat Sertifikat ➔
                      </button>
                      <button
                        onClick={() => {
                          if (confirm("Reset seluruh data progres belajar?")) {
                            localStorage.removeItem("cpp_learning_user_progress_v1");
                            window.location.reload();
                          }
                        }}
                        className="text-slate-400 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Reset</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Ask AI Tutor Action Button */}
              <button
                id="ai-tutor-btn"
                onClick={onOpenAITutor}
                className="flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-200" />
                <span className="hidden sm:inline">Tanya AI</span>
                <span className="sm:hidden">AI</span>
              </button>

              {/* Mobile Menu Hamburger Toggle */}
              <button
                id="mobile-menu-toggle-btn"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                aria-label="Buka Menu Navigasi"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Fullscreen / Slide Down Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200/90 shadow-xl py-3 px-4 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="space-y-1.5 mb-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 block">
                Menu Pembelajaran
              </span>
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between border cursor-pointer ${
                      isActive
                        ? "bg-blue-50/90 border-blue-200 text-blue-950 shadow-xs"
                        : "bg-slate-50/50 hover:bg-slate-50 border-transparent text-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          isActive
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{item.label}</h4>
                        <p className="text-[10px] text-slate-500 line-clamp-1">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick AI & Level Footer inside mobile drawer */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-bold text-slate-800 font-mono">
                  {progress.xp} XP
                </span>
                <span className="text-[11px] text-slate-500">• {progressPercent}% Selesai</span>
              </div>

              <button
                onClick={() => {
                  onOpenAITutor();
                  setIsMobileMenuOpen(false);
                }}
                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-200" />
                <span>Konsultasi AI</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Floating Bottom Navigation Bar for Mobile (Mobile-First Experience) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-1 px-2 shadow-lg safe-area-pb">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all relative flex-1 min-h-[48px] cursor-pointer ${
                  isActive ? "text-blue-600 font-bold" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <div
                  className={`p-1 rounded-lg transition-colors ${
                    isActive ? "bg-blue-50 text-blue-600" : "text-slate-500"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                </div>
                <span className="text-[10px] mt-0.5 tracking-tight">{item.shortLabel}</span>

                {/* Subtle active indicator bar */}
                {isActive && (
                  <span className="w-4 h-0.5 rounded-full bg-blue-600 absolute bottom-0.5" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
