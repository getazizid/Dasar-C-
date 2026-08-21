import React, { useState } from "react";
import {
  Award,
  Download,
  Printer,
  CheckCircle2,
  Lock,
  Sparkles,
  ShieldCheck,
  Calendar,
  UserCheck,
} from "lucide-react";
import confetti from "canvas-confetti";
import { UserProgress } from "../types";

interface CertificateViewProps {
  progress: UserProgress;
  totalChapters: number;
  totalChallenges: number;
  onUpdateUserName: (name: string) => void;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  progress,
  totalChapters,
  totalChallenges,
  onUpdateUserName,
}) => {
  const [nameInput, setNameInput] = useState(progress.userName || "Programmer C++");
  const [isEditing, setIsEditing] = useState(false);

  const completedChaptersCount = progress.completedChapters.length;
  const completedChallengesCount = progress.completedChallenges.length;

  // Requirements: at least 6 chapters or completed all
  const isEligible = completedChaptersCount >= 5;
  const completionPercentage = Math.round(
    ((completedChaptersCount + completedChallengesCount) /
      (totalChapters + totalChallenges)) *
      100
  );

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      onUpdateUserName(nameInput.trim());
      setIsEditing(false);
    }
  };

  const handlePrint = () => {
    try {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
    } catch {
      // Confetti fallback
    }
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header & Status */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4 shadow-xs print:hidden">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold font-mono">
              SERTIFIKASI KELULUSAN
            </span>
            <span className="text-xs text-slate-500">Verifikasi Kompetensi C++</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Sertifikat Kelulusan Belajar C++ Dasar
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
            Selesaikan minimal 5 modul materi atau selesaikan seluruh bab untuk membuka dan mencetak sertifikat digital resmi Anda.
          </p>
        </div>

        {/* Action button */}
        {isEligible ? (
          <button
            id="print-certificate-btn"
            onClick={handlePrint}
            className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs active:scale-95 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak / Download PDF</span>
          </button>
        ) : (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 font-medium">
            <Lock className="w-4 h-4 text-amber-600" />
            <span>Kunci Sertifikat: {completedChaptersCount}/5 Bab Selesai</span>
          </div>
        )}
      </div>

      {/* Certificate Container */}
      <div className="relative bg-white border-8 border-double border-amber-600/30 rounded-3xl p-8 sm:p-14 shadow-lg text-center overflow-hidden print:border-4 print:p-8 print:shadow-none">
        {/* Top Seal / Badge */}
        <div className="relative z-10 flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 flex items-center justify-center shadow-md border-4 border-amber-100 text-white">
            <Award className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Certificate Title */}
        <div className="relative z-10 space-y-2 mb-6">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-amber-700 uppercase font-mono">
            CERTIFICATE OF COMPLETION
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            SERTIFIKAT KELULUSAN PEMROGRAMAN C++
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            Diberikan sebagai bukti kelulusan pelatihan dan penguasaan konsep fundamental bahasa pemrograman C++ Modern.
          </p>
        </div>

        {/* Recipient Name */}
        <div className="relative z-10 my-8 py-4 border-y border-amber-200 max-w-xl mx-auto">
          <p className="text-xs text-slate-500 mb-1">Diberikan Kepada:</p>
          {isEditing ? (
            <form onSubmit={handleSaveName} className="flex justify-center gap-2 max-w-md mx-auto">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="bg-slate-50 border border-amber-400 rounded-xl px-3 py-1.5 text-center text-lg font-bold text-slate-900 focus:outline-none focus:border-amber-600 focus:bg-white"
                autoFocus
              />
              <button
                type="submit"
                className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs cursor-pointer"
              >
                Simpan
              </button>
            </form>
          ) : (
            <div className="flex items-center justify-center gap-2 group">
              <span className="text-2xl sm:text-4xl font-extrabold text-amber-800 font-serif tracking-wide">
                {progress.userName || "Programmer C++"}
              </span>
              <button
                onClick={() => setIsEditing(true)}
                className="text-xs text-slate-400 hover:text-amber-700 print:hidden opacity-70 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                (Ubah Nama)
              </button>
            </div>
          )}
        </div>

        {/* Mastered Skills List */}
        <div className="relative z-10 max-w-2xl mx-auto mb-8 text-xs text-slate-700 space-y-3">
          <p className="leading-relaxed">
            Telah berhasil menyelesaikan pembelajaran terstruktur meliputi{" "}
            <span className="text-slate-900 font-semibold">
              Variabel & Tipe Data, I/O Formatting, Operator, Percabangan if-else, Perulangan Looping, Array 1D & 2D Matriks, Fungsi Modular & Rekursi, Dasar Pointer & Manajemen Memori, serta Object-Oriented Programming (OOP)
            </span>{" "}
            dan mempraktikkan langsung pada Online Compiler.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-[11px] text-slate-700 font-medium">
              ✓ Sintaks C++17 / C++20
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-[11px] text-slate-700 font-medium">
              ✓ Algoritma & Problem Solving
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-[11px] text-slate-700 font-medium">
              ✓ GCC Compilation Engine
            </span>
          </div>
        </div>

        {/* Footer info & Signature */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-200 max-w-3xl mx-auto text-xs text-slate-600">
          <div className="flex flex-col items-center">
            <Calendar className="w-4 h-4 text-amber-600 mb-1" />
            <span className="text-[11px] text-slate-500">Tanggal Terbit:</span>
            <span className="font-semibold text-slate-900">
              {new Date().toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <ShieldCheck className="w-4 h-4 text-emerald-600 mb-1" />
            <span className="text-[11px] text-slate-500">Status Verifikasi:</span>
            <span className="font-semibold text-emerald-700">Terverifikasi Sistem</span>
          </div>

          <div className="flex flex-col items-center">
            <Award className="w-4 h-4 text-blue-600 mb-1" />
            <span className="text-[11px] text-slate-500">ID Sertifikat:</span>
            <span className="font-mono text-slate-900 font-medium">CPP-2026-{progress.xp}XP</span>
          </div>
        </div>
      </div>
    </div>
  );
};
