import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  RotateCcw,
  Download,
  Copy,
  Check,
  Sparkles,
  Terminal as TerminalIcon,
  HelpCircle,
  FileCode,
  Sliders,
  Maximize2,
  Minimize2,
  AlertCircle,
  CheckCircle2,
  Clock,
  Cpu,
  ChevronDown,
  Layers,
} from "lucide-react";
import { CodeSnippet, ExecutionResult } from "../types";
import { PRESET_SNIPPETS } from "../data/snippetsData";
import { executeCppCode, explainCodeWithAI } from "../services/cppRunner";

interface CompilerPlaygroundProps {
  initialSnippet?: CodeSnippet | null;
  onClearInitialSnippet?: () => void;
}

export const CompilerPlayground: React.FC<CompilerPlaygroundProps> = ({
  initialSnippet,
  onClearInitialSnippet,
}) => {
  const [code, setCode] = useState<string>(
    initialSnippet?.code || PRESET_SNIPPETS[0].code
  );
  const [stdin, setStdin] = useState<string>(initialSnippet?.defaultStdin || "");
  const [activePresetId, setActivePresetId] = useState<string>(
    initialSnippet?.id || PRESET_SNIPPETS[0].id
  );

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [showStdinDrawer, setShowStdinDrawer] = useState<boolean>(
    Boolean(initialSnippet?.defaultStdin)
  );
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // AI Assistant states
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [showAiModal, setShowAiModal] = useState<boolean>(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync when an external snippet is passed from tutorial
  useEffect(() => {
    if (initialSnippet) {
      setCode(initialSnippet.code);
      setStdin(initialSnippet.defaultStdin || "");
      setActivePresetId(initialSnippet.id);
      if (initialSnippet.defaultStdin) {
        setShowStdinDrawer(true);
      }
      if (onClearInitialSnippet) {
        onClearInitialSnippet();
      }
    }
  }, [initialSnippet, onClearInitialSnippet]);

  // Handle Tab key indentation inside textarea
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handleRunCode();
      return;
    }

    if (e.key === "Tab") {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      const newCode = code.substring(0, start) + "    " + code.substring(end);
      setCode(newCode);

      // Set cursor position after tab
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 4;
      }, 0);
    }
  };

  const handleRunCode = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setExecutionResult(null);

    try {
      const result = await executeCppCode(code, stdin);
      setExecutionResult(result);
    } catch (err: unknown) {
      setExecutionResult({
        success: false,
        output: "",
        error: err instanceof Error ? err.message : "Terjadi kesalahan sistem saat mengeksekusi kode.",
        exitCode: 1,
        executionTime: 0,
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handlePresetSelect = (preset: CodeSnippet) => {
    setActivePresetId(preset.id);
    setCode(preset.code);
    setStdin(preset.defaultStdin || "");
    if (preset.defaultStdin) {
      setShowStdinDrawer(true);
    }
    setExecutionResult(null);
  };

  const handleResetCode = () => {
    const defaultSnippet =
      PRESET_SNIPPETS.find((s) => s.id === activePresetId) || PRESET_SNIPPETS[0];
    setCode(defaultSnippet.code);
    setStdin(defaultSnippet.defaultStdin || "");
    setExecutionResult(null);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "program_cpp.cpp";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleAskAI = async (mode: "explain" | "fix-error" | "line-by-line") => {
    setAiLoading(true);
    setShowAiModal(true);
    setAiResponse(null);

    const res = await explainCodeWithAI(
      code,
      executionResult?.output,
      executionResult?.error,
      mode
    );

    setAiLoading(false);
    setAiResponse(res.text);
  };

  // Line numbers generation
  const lineCount = code.split("\n").length;
  const lineNumbers = Array.from({ length: Math.max(lineCount, 15) }, (_, i) => i + 1);

  return (
    <div
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 ${
        isFullscreen ? "fixed inset-0 z-50 bg-slate-950 p-6 overflow-y-auto" : ""
      }`}
    >
      {/* Top Controls & Toolbar */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 mb-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Preset Selector Dropdown */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <select
                id="preset-code-selector"
                value={activePresetId}
                onChange={(e) => {
                  const selected = PRESET_SNIPPETS.find((s) => s.id === e.target.value);
                  if (selected) handlePresetSelect(selected);
                }}
                className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl pl-3 pr-8 py-2 focus:outline-none focus:border-blue-600 focus:bg-white appearance-none cursor-pointer shadow-xs"
              >
                <optgroup label="Contoh Program Siap Pakai">
                  {PRESET_SNIPPETS.map((preset) => (
                    <option key={preset.id} value={preset.id}>
                      {preset.title}
                    </option>
                  ))}
                </optgroup>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>

            <button
              id="stdin-toggle-btn"
              onClick={() => setShowStdinDrawer(!showStdinDrawer)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-colors cursor-pointer ${
                showStdinDrawer
                  ? "bg-blue-50 border-blue-300 text-blue-900 shadow-xs"
                  : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Input Keyboard (cin)</span>
              {stdin && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              )}
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleCopyCode}
              title="Salin Kode"
              className="p-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs transition-colors cursor-pointer shadow-xs"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>

            <button
              onClick={handleDownloadFile}
              title="Download File .cpp"
              className="p-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs transition-colors cursor-pointer shadow-xs"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={handleResetCode}
              title="Reset Kode ke Semula"
              className="p-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs transition-colors cursor-pointer shadow-xs"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              title={isFullscreen ? "Keluar Layar Penuh" : "Layar Penuh"}
              className="p-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs transition-colors cursor-pointer shadow-xs"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Run Button */}
            <button
              id="run-cpp-button"
              onClick={handleRunCode}
              disabled={isRunning}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <Play className={`w-4 h-4 fill-white ${isRunning ? "animate-spin" : ""}`} />
              <span>{isRunning ? "Mengompilasi..." : "Jalankan Kode (Ctrl+Enter)"}</span>
            </button>
          </div>
        </div>

        {/* Custom Stdin Drawer */}
        {showStdinDrawer && (
          <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-3 text-xs text-slate-700">
              <span className="font-bold block text-slate-900">Custom Input (Standard Input / stdin):</span>
              <p className="text-[11px] text-slate-500 mt-1">
                Masukkan nilai yang akan dibaca oleh perintah <code className="text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded font-mono">cin &gt;&gt;</code> atau <code className="text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded font-mono">getline()</code>. Jika ada beberapa input, pisahkan dengan baris baru (enter).
              </p>
            </div>
            <div className="md:col-span-9">
              <textarea
                id="stdin-textarea"
                rows={2}
                value={stdin}
                onChange={(e) => setStdin(e.target.value)}
                placeholder="Contoh input:&#10;100&#10;3.14&#10;Budi Santoso"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-mono text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white resize-y"
              />
            </div>
          </div>
        )}
      </div>

      {/* Main Workspace: Code Editor (Left) & Output Terminal (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Side: C++ Code Editor */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xs flex flex-col h-[560px]">
          {/* Editor Header */}
          <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold text-slate-200 font-mono">main.cpp</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono border border-slate-700">
                C++17 / C++20
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="text-[11px]">Tab = 4 spasi</span>
            </div>
          </div>

          {/* Editor Textarea with Line Numbers */}
          <div className="flex-1 flex overflow-hidden bg-slate-950 relative">
            {/* Line Numbers Bar */}
            <div className="w-12 bg-slate-900/60 border-r border-slate-800/80 py-3 select-none text-right pr-2.5 text-slate-600 font-mono text-xs leading-6 overflow-hidden">
              {lineNumbers.map((num) => (
                <div key={num}>{num}</div>
              ))}
            </div>

            {/* Code Input */}
            <textarea
              id="cpp-code-editor"
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              className="flex-1 bg-transparent text-slate-100 p-3 font-mono text-xs sm:text-sm leading-6 resize-none focus:outline-none overflow-auto custom-scrollbar whitespace-pre"
              style={{
                tabSize: 4,
              }}
            />
          </div>
        </div>

        {/* Right Side: Output Terminal & AI Diagnostics */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Terminal Console Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xs flex flex-col h-[560px]">
            {/* Terminal Header */}
            <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TerminalIcon className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-slate-200">Terminal Output</span>
              </div>

              {/* Execution Status Badge */}
              {executionResult && (
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-mono flex items-center gap-1 ${
                      executionResult.success
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                    }`}
                  >
                    {executionResult.success ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : (
                      <AlertCircle className="w-3 h-3" />
                    )}
                    Exit: {executionResult.exitCode}
                  </span>

                  {executionResult.executionTime !== undefined && (
                    <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {executionResult.executionTime}ms
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Terminal Content Screen */}
            <div className="flex-1 bg-slate-950 p-4 font-mono text-xs overflow-y-auto custom-scrollbar flex flex-col justify-between">
              <div>
                {!executionResult && !isRunning && (
                  <div className="text-slate-500 space-y-2 py-8 text-center font-sans">
                    <TerminalIcon className="w-8 h-8 mx-auto text-slate-600 opacity-60" />
                    <p className="text-xs">
                      Tekan tombol <span className="text-emerald-400 font-semibold">"Jalankan Kode"</span> untuk melihat hasil kompilasi program.
                    </p>
                  </div>
                )}

                {isRunning && (
                  <div className="flex flex-col items-center justify-center py-12 text-slate-400 space-y-3 font-sans">
                    <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-xs font-mono">Mengompilasi source code C++ dengan GCC...</p>
                  </div>
                )}

                {executionResult && (
                  <div className="space-y-3">
                    {/* Standard Output stdout */}
                    {executionResult.output && (
                      <div>
                        <div className="text-[11px] text-slate-500 mb-1 font-sans font-semibold">
                          [Standard Output]
                        </div>
                        <pre className="text-emerald-300 whitespace-pre-wrap leading-relaxed">
                          {executionResult.output}
                        </pre>
                      </div>
                    )}

                    {/* Standard Error stderr / Compilation Error */}
                    {executionResult.error && (
                      <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-900/50">
                        <div className="text-[11px] text-rose-400 mb-1 font-sans font-bold flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          [Pesan Error Kompilator]
                        </div>
                        <pre className="text-rose-300 whitespace-pre-wrap text-[11px] leading-relaxed">
                          {executionResult.error}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom Compiler Info & AI Action Trigger */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between flex-wrap gap-2 text-[11px] text-slate-400">
                <span className="flex items-center gap-1 font-mono text-slate-400">
                  <Cpu className="w-3 h-3 text-blue-400" />
                  {executionResult?.compiler || "GCC Native C++ Engine"}
                </span>

                <div className="flex items-center gap-2">
                  {executionResult && !executionResult.success && (
                    <button
                      onClick={() => handleAskAI("fix-error")}
                      className="px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3 text-rose-300" />
                      <span>Analisis Error via AI</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleAskAI("line-by-line")}
                    className="px-2.5 py-1 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/40 text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3 text-blue-200" />
                    <span>Jelaskan Kode dengan AI</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Explanation & Fix Modal */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full p-6 shadow-xl space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900">
                  Asisten AI C++ Tutor
                </h3>
              </div>
              <button
                onClick={() => setShowAiModal(false)}
                className="text-slate-500 hover:text-slate-800 text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 cursor-pointer font-medium"
              >
                Tutup [ESC]
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-1 text-slate-700 text-xs sm:text-sm leading-relaxed">
              {aiLoading ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-3 text-slate-500">
                  <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  <p className="text-xs">AI Tutor sedang menganalisis kode Anda...</p>
                </div>
              ) : (
                <div className="whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-slate-200 text-slate-800 font-sans">
                  {aiResponse}
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowAiModal(false)}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
