import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "5mb" }));

  // API Route: Health Check
  app.get("/api/health", (_req: Request, res: Response) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // API Route: Safe C++ Compilation & Execution Proxy
  app.post("/api/compile", async (req: Request, res: Response) => {
    const { code, stdin = "" } = req.body;

    if (!code || typeof code !== "string") {
      return res.status(400).json({
        success: false,
        error: "Kode C++ tidak boleh kosong.",
      });
    }

    const startTime = Date.now();

    // 1. Try Piston Public Execution Engine (Fast & reliable GCC/Clang C++)
    try {
      const pistonResponse = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: "cpp",
          version: "10.2.0",
          files: [
            {
              name: "main.cpp",
              content: code,
            },
          ],
          stdin: stdin,
          run_timeout: 6000,
          compile_timeout: 10000,
        }),
      });

      if (pistonResponse.ok) {
        const data = await pistonResponse.json();
        const duration = Date.now() - startTime;

        const compileStderr = data.compile?.stderr || "";
        const runStdout = data.run?.stdout || "";
        const runStderr = data.run?.stderr || "";
        const exitCode = data.run?.code ?? (compileStderr ? 1 : 0);

        return res.json({
          success: exitCode === 0 && !compileStderr,
          output: runStdout || "",
          error: compileStderr ? compileStderr : runStderr,
          exitCode: exitCode,
          executionTime: duration,
          compiler: "GCC 10.2 (C++17)",
        });
      }
    } catch {
      // Piston network error, proceed to fallback
    }

    // 2. Try Wandbox Public Execution Engine Fallback (Supports latest GCC / Clang C++20)
    try {
      const wandboxResponse = await fetch("https://wandbox.org/api/compile.json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: code,
          compiler: "gcc-head",
          stdin: stdin,
          options: "warning,c++20",
        }),
      });

      if (wandboxResponse.ok) {
        const data = await wandboxResponse.json();
        const duration = Date.now() - startTime;
        const output = data.program_output || "";
        const error = (data.compiler_error || "") + (data.program_error || "");
        const status = Number(data.status ?? 0);

        return res.json({
          success: status === 0 && !data.compiler_error,
          output: output,
          error: error,
          exitCode: status,
          executionTime: duration,
          compiler: "GCC Head (C++20)",
        });
      }
    } catch {
      // Wandbox network error
    }

    return res.status(503).json({
      success: false,
      error: "Layanan compiler eksternal sedang sibuk. Menggunakan engine C++ lokal.",
      fallbackToLocal: true,
    });
  });

  // API Route: AI Tutor & Code Explainer
  app.post("/api/gemini/explain-code", async (req: Request, res: Response) => {
    try {
      const { code, output, error, queryType } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        return res.status(503).json({
          success: false,
          message: "Gemini API key belum dikonfigurasi. Penjelasan otomatis offline aktif.",
        });
      }

      let systemPrompt = `Anda adalah Guru Pemrograman C++ yang ramah, jelas, sabar, dan sangat ahli dalam bahasa C++.
Target audiens adalah pelajar pemula berbahasa Indonesia.
Jelaskan konsep dengan analogi yang mudah dipahami, sorot baris kode yang relevan, berikan tips pencegahan error, dan gunakan format Markdown yang rapi dengan highlight sintaksis.`;

      let prompt = "";
      if (queryType === "fix-error") {
        prompt = `Tolong periksa kode C++ berikut yang mengalami error:

KODE C++:
\`\`\`cpp
${code}
\`\`\`

PESAN ERROR:
\`\`\`
${error || "Kompilasi gagal atau output tidak sesuai"}
\`\`\`

Tugas Anda:
1. Jelaskan dalam bahasa Indonesia yang sederhana mengapa error tersebut terjadi dan di baris berapa.
2. Berikan kode perbaikan yang benar beserta penjelasannya secara ringkas dan mudah dipahami.`;
      } else if (queryType === "line-by-line") {
        prompt = `Tolong jelaskan kode C++ berikut baris demi baris untuk pemula:

\`\`\`cpp
${code}
\`\`\`

Berikan penjelasan ringkas per bagian:
- Header & Preprocessor Directive
- Fungsi main()
- Variabel & Tipe Data yang digunakan
- Logika alur program
- Output yang dihasilkan`;
      } else {
        prompt = `Jelaskan fungsi dan cara kerja kode C++ berikut secara jelas dan edukatif untuk pemula:

\`\`\`cpp
${code}
\`\`\`

Output yang dihasilkan program:
\`\`\`
${output || "Tidak ada output"}
\`\`\``;
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
        },
      });

      return res.json({
        success: true,
        explanation: response.text || "Tidak ada penjelasan yang dihasilkan.",
      });
    } catch (err: unknown) {
      console.error("Gemini explain error:", err);
      return res.status(500).json({
        success: false,
        error: err instanceof Error ? err.message : "Terjadi kesalahan saat memproses permintaan AI.",
      });
    }
  });

  // API Route: AI Tutor Chat / Ask Questions
  app.post("/api/gemini/ask-tutor", async (req: Request, res: Response) => {
    try {
      const { question, currentTopic, userCode } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        return res.status(503).json({
          success: false,
          message: "Layanan AI memerlukan GEMINI_API_KEY.",
        });
      }

      const prompt = `Topik Pembelajaran Saat Ini: ${currentTopic || "Dasar Pemrograman C++"}
Kode Siswa (jika ada):
\`\`\`cpp
${userCode || "// Tidak ada kode yang dilampirkan"}
\`\`\`

Pertanyaan Siswa:
"${question}"

Jawablah pertanyaan siswa dengan ramah, jelas, akurat, dan gunakan contoh kode C++ singkat yang mudah dipahami pemula.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          systemInstruction:
            "Anda adalah Asisten & Tutor Pembelajaran C++ Dasar berbahasa Indonesia. Berikan penjelasan terstruktur, edukatif, dan ramah pemula.",
        },
      });

      return res.json({
        success: true,
        answer: response.text,
      });
    } catch (err: unknown) {
      console.error("Gemini ask tutor error:", err);
      return res.status(500).json({
        success: false,
        error: err instanceof Error ? err.message : "Gagal menghubungi AI Tutor.",
      });
    }
  });

  // Vite middleware for development vs static production serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`C++ Interactive Learning server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
