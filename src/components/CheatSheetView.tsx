import React, { useState } from "react";
import {
  FileText,
  Search,
  Copy,
  Check,
  Code2,
  AlertTriangle,
  Layers,
  Database,
  Terminal,
} from "lucide-react";

export const CheatSheetView: React.FC = () => {
  const [search, setSearch] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const sections = [
    {
      id: "cs-types",
      title: "1. Tipe Data Primitif & Ukuran",
      icon: Database,
      items: [
        { name: "int", desc: "Bilangan bulat standar (4 Byte, -2M s/d +2M)", example: "int umur = 20;" },
        { name: "float", desc: "Pecahan presisi tunggal (4 Byte, ~7 digit desimal)", example: "float berat = 65.5f;" },
        { name: "double", desc: "Pecahan presisi ganda (8 Byte, ~15 digit desimal)", example: "double pi = 3.14159265;" },
        { name: "char", desc: "Karakter tunggal ASCII (1 Byte, petik satu)", example: "char nilai = 'A';" },
        { name: "bool", desc: "Logika Boolean (1 Byte, true / false)", example: "bool lulus = true;" },
        { name: "string", desc: "Teks kumpulan karakter (#include <string>)", example: "string nama = \"Budi\";" },
      ],
    },
    {
      id: "cs-io",
      title: "2. Input & Output Stream",
      icon: Terminal,
      items: [
        { name: "cout <<", desc: "Mencetak ke layar terminal", example: "cout << \"Nilai: \" << x << endl;" },
        { name: "cin >>", desc: "Membaca input satu kata tanpa spasi", example: "cin >> umur;" },
        { name: "getline(cin, str)", desc: "Membaca satu baris penuh berisi spasi", example: "getline(cin, namaLengkap);" },
        { name: "cin.ignore()", desc: "Membersihkan karakter newline buffer", example: "cin.ignore();" },
        { name: "fixed & setprecision(n)", desc: "Menentukan angka di belakang koma (<iomanip>)", example: "cout << fixed << setprecision(2) << harga;" },
      ],
    },
    {
      id: "cs-control",
      title: "3. Struktur Kontrol & Perulangan",
      icon: Layers,
      items: [
        { name: "if - else if - else", desc: "Percabangan kondisi majemuk", example: "if (x > 0) cout << \"Positif\"; else cout << \"Negatif\";" },
        { name: "switch (var)", desc: "Pencocokan nilai diskrit (int / char)", example: "switch(op) { case '+': cout << a+b; break; }" },
        { name: "for loop", desc: "Perulangan dengan counter terhitung", example: "for (int i = 0; i < 10; i++) cout << i;" },
        { name: "while loop", desc: "Perulangan dengan cek kondisi di awal", example: "while (x > 0) { x--; }" },
        { name: "do-while loop", desc: "Perulangan dijamin jalan minimal 1x", example: "do { cin >> x; } while (x <= 0);" },
        { name: "break / continue", desc: "Hentikan loop / lewati iterasi sekarang", example: "if (i == 5) break; else continue;" },
      ],
    },
    {
      id: "cs-pointers",
      title: "4. Pointer & Referensi",
      icon: Code2,
      items: [
        { name: "Address-of (&)", desc: "Mengambil alamat memori variabel", example: "int *ptr = &angka;" },
        { name: "Dereference (*)", desc: "Mengakses nilai di alamat memori", example: "*ptr = 50; // Mengubah angka jadi 50" },
        { name: "nullptr", desc: "Standar modern pointer kosong (C++11)", example: "int *p = nullptr;" },
        { name: "Pass by Reference", desc: "Parameter fungsi mengubah variabel asli", example: "void tukar(int &a, int &b) { ... }" },
      ],
    },
  ];

  const commonErrors = [
    {
      err: "expected ';' before ...",
      cause: "Lupa menambahkan titik koma (;) di akhir pernyataan instruksi.",
      fix: "Periksa baris yang ditunjuk atau 1 baris tepat di atasnya dan tambahkan semicolon.",
    },
    {
      err: "undefined reference to 'main'",
      cause: "Tidak ada fungsi 'int main()' atau salah ketik nama fungsi utama.",
      fix: "Pastikan program memiliki fungsi 'int main() { ... }'.",
    },
    {
      err: "'cout' was not declared in this scope",
      cause: "Lupa menyertakan #include <iostream> atau using namespace std;",
      fix: "Tambahkan #include <iostream> dan using namespace std; di baris paling atas.",
    },
    {
      err: "Segmentation fault (core dumped)",
      cause: "Mengakses indeks array di luar batas (out of bounds) atau pointer liar/null.",
      fix: "Periksa batas indeks array (0 s/d N-1) dan pastikan pointer telah diinisialisasi.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/70 text-xs font-bold font-mono">
              REFERENSI CEPAT
            </span>
            <span className="text-xs text-slate-500">Rangkuman Sintaks C++</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            C++ Cheat Sheet & Kamus Sintaks
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Gunakan panduan cepat ini sebagai contekan resmi ketika sedang mengerjakan koding atau memecahkan compiler error.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Cari sintaks (cout, pointer, array...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Syntax Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((sec) => (
          <div
            key={sec.id}
            className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-3"
          >
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <sec.icon className="w-5 h-5 text-blue-600" />
              <h3 className="text-base font-bold text-slate-900">{sec.title}</h3>
            </div>

            <div className="space-y-2.5">
              {sec.items
                .filter(
                  (item) =>
                    item.name.toLowerCase().includes(search.toLowerCase()) ||
                    item.desc.toLowerCase().includes(search.toLowerCase()) ||
                    item.example.toLowerCase().includes(search.toLowerCase())
                )
                .map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-blue-700">
                        {item.name}
                      </span>
                      <button
                        onClick={() => handleCopy(item.example, `${sec.id}-${idx}`)}
                        className="text-slate-500 hover:text-slate-800 text-[11px] flex items-center gap-1 cursor-pointer font-medium"
                      >
                        {copiedKey === `${sec.id}-${idx}` ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-600">{item.desc}</p>
                    <pre className="p-2 rounded-lg bg-slate-950 font-mono text-[11px] text-emerald-300 overflow-x-auto">
                      {item.example}
                    </pre>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Common Errors & Fixes Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <h3 className="text-base font-bold text-slate-900">
            Kamus Error Kompilator C++ Populer & Solusinya
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {commonErrors.map((e, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 space-y-2 text-xs"
            >
              <div className="font-mono font-bold text-rose-700 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-600" />
                {e.err}
              </div>
              <p className="text-slate-700">
                <span className="font-semibold text-slate-900">Penyebab: </span>
                {e.cause}
              </p>
              <p className="text-emerald-800">
                <span className="font-semibold text-emerald-950">Solusi: </span>
                {e.fix}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
