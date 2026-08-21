import React, { useState } from "react";
import {
  Sparkles,
  X,
  Send,
  HelpCircle,
  Code2,
  BookOpen,
  MessageSquare,
} from "lucide-react";
import { askAITutor } from "../services/cppRunner";
import { FormattedText } from "./FormattedText";

interface AITutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTopic?: string;
}

export const AITutorModal: React.FC<AITutorModalProps> = ({
  isOpen,
  onClose,
  currentTopic = "Dasar C++",
}) => {
  const [question, setQuestion] = useState("");
  const [userCode, setUserCode] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [messages, setMessages] = useState<
    Array<{ sender: "user" | "ai"; text: string }>
  >([
    {
      sender: "ai",
      text: `Halo! Saya Asisten & Tutor AI Pemrograman C++. Ada konsep yang belum Anda pahami (seperti Variabel, Pointer, Percabangan, Loop, atau Struct) atau ada kode C++ yang ingin Anda diskusikan? Tanyakan saja di sini!`,
    },
  ]);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const quickQuestions = [
    "Apa perbedaan pass by value dan pass by reference?",
    "Mengapa cin >> tidak bisa membaca string berspasi?",
    "Apa perbedaan while dan do-while loop?",
    "Bagaimana cara kerja pointer di C++?",
  ];

  const handleSend = async (qToSend?: string) => {
    const textToSend = qToSend || question;
    if (!textToSend.trim() || loading) return;

    const newMessages = [
      ...messages,
      { sender: "user" as const, text: textToSend },
    ];
    setMessages(newMessages);
    setQuestion("");
    setLoading(true);

    try {
      const res = await askAITutor(textToSend, currentTopic, userCode);
      setMessages([
        ...newMessages,
        {
          sender: "ai" as const,
          text:
            res.text ||
            "Maaf, saya tidak dapat menjawab saat ini. Pastikan koneksi internet stabil.",
        },
      ]);
    } catch {
      setMessages([
        ...newMessages,
        {
          sender: "ai" as const,
          text: "Terjadi kesalahan saat menghubungi AI Tutor.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200/90 rounded-2xl max-w-2xl w-full h-[600px] shadow-xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                Tutor AI C++ Pintar
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono font-semibold">
                  Online
                </span>
              </h3>
              <p className="text-xs text-slate-500">Tanyakan apapun tentang sintaks & logika C++</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat History Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto custom-scrollbar space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                  m.sender === "user"
                    ? "bg-blue-600 text-white rounded-br-xs font-medium whitespace-pre-line"
                    : "bg-slate-50 border border-slate-200/90 text-slate-800 rounded-bl-xs font-sans"
                }`}
              >
                {m.sender === "user" ? (
                  m.text
                ) : (
                  <FormattedText content={m.text} />
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl text-xs text-slate-600 flex items-center gap-2 font-mono shadow-xs">
                <div className="w-3.5 h-3.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <span>AI Tutor sedang mengetik penjelasan...</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 overflow-x-auto flex gap-1.5 custom-scrollbar">
          {quickQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              disabled={loading}
              className="px-2.5 py-1 rounded-full bg-white hover:bg-slate-100 text-slate-700 text-[11px] whitespace-nowrap border border-slate-200 transition-colors flex-shrink-0 cursor-pointer shadow-xs font-medium"
            >
              💡 {q}
            </button>
          ))}
        </div>

        {/* Optional Code Snippet Attachment Toggle */}
        {showCodeInput && (
          <div className="p-3 bg-slate-950 border-t border-slate-800">
            <textarea
              rows={3}
              placeholder="// Tempelkan potongan kode C++ Anda di sini..."
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 font-mono text-xs text-emerald-300 focus:outline-none focus:border-blue-500"
            />
          </div>
        )}

        {/* Input Bar */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
          <button
            onClick={() => setShowCodeInput(!showCodeInput)}
            title="Lampirkan Kode C++"
            className={`p-2.5 rounded-xl border text-xs transition-colors cursor-pointer shadow-xs ${
              showCodeInput
                ? "bg-blue-50 border-blue-300 text-blue-800"
                : "bg-white border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100"
            }`}
          >
            <Code2 className="w-4 h-4" />
          </button>

          <input
            type="text"
            placeholder="Tuliskan pertanyaan C++ Anda..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSend();
              }
            }}
            disabled={loading}
            className="flex-1 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors shadow-xs"
          />

          <button
            onClick={() => handleSend()}
            disabled={!question.trim() || loading}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs active:scale-95 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
