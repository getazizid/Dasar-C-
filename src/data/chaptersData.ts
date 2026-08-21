import { Chapter } from "../types";

export const CHAPTERS_DATA: Chapter[] = [
  {
    id: "bab-1",
    number: 1,
    title: "Pengenalan C++ & Anatomi Program",
    slug: "pengenalan-cpp",
    summary: "Memahami apa itu C++, sejarah singkat, alur kompilasi kode, dan struktur dasar program pertama Anda.",
    icon: "Terminal",
    estimatedMinutes: 15,
    sections: [
      {
        id: "sec-1-1",
        title: "1. Apa itu C++ dan Mengapa Kita Mempelajarinya?",
        content: `**C++** adalah salah satu bahasa pemrograman paling populer dan bertenaga di dunia. Diciptakan oleh **Bjarne Stroustrup** di Bell Labs pada tahun 1979 sebagai pengembangan dari bahasa C dengan penambahan fitur *Object-Oriented Programming (OOP)*.

### Keunggulan Utama C++:
- ⚡ **Kinerja Sangat Tinggi & Cepat:** Diterjemahkan langsung menjadi instruksi bahasa mesin (*native machine code*), tanpa overhead virtual machine yang berat.
- 🎯 **Kontrol Memori Tingkat Rendah:** Memberikan kontrol penuh terhadap alokasi memori melalui *Pointer* dan *Memory Management*.
- 🕹️ **Standar Industri:** Digunakan secara luas dalam pembuatan Game Engine (Unreal Engine), Sistem Operasi (Windows, Linux kernel parts), Browser Web (Chromium / Google Chrome), Database (MySQL, MongoDB), dan Robotika / AI High Performance.`,
        visualBox: {
          title: "Tahapan Kompilasi C++",
          type: "info",
          text: "Source Code (.cpp) ➔ Preprocessor (#include) ➔ Compiler (Kode Assembly) ➔ Assembler (Object Code .o/.obj) ➔ Linker (Menggabungkan library) ➔ Executable (.exe / binary)",
        },
      },
      {
        id: "sec-1-2",
        title: "2. Struktur & Anatomi Program C++ Pertama",
        content: `Mari kita bedah program legendaris **"Hello, World!"** baris demi baris:`,
        codeExamples: [
          {
            id: "code-1-1",
            title: "Program Hello World Standar",
            description: "Program dasar untuk mencetak teks ke layar terminal.",
            code: `#include <iostream>

using namespace std;

int main() {
    // Mencetak teks ke konsol
    cout << "Halo Dunia, Selamat Datang di C++!" << endl;
    cout << "Belajar coding itu seru dan menantang." << endl;
    
    return 0; // Mengindikasikan program selesai sukses
}`,
            expectedOutput: `Halo Dunia, Selamat Datang di C++!
Belajar coding itu seru dan menantang.`,
            explanation: [
              "#include <iostream> : Memberi tahu preprocessor untuk menyertakan pustaka Input/Output Stream standar agar kita bisa menggunakan cout dan cin.",
              "using namespace std; : Memungkinkan kita menggunakan nama-nama fungsi dari standard library tanpa harus menulis 'std::cout' setiap saat.",
              "int main() : Fungsi utama tempat eksekusi program selalu dimulai. Setiap program C++ wajib memiliki tepat satu fungsi main.",
              "cout << ... : Objek output standar untuk menampilkan data ke layar konsol.",
              "<< (Stream Insertion Operator) : Mengalirkan data ke objek cout.",
              "endl : Mengakhiri baris dan membersihkan output buffer (sama seperti newline '\\n').",
              "return 0; : Mengembalikan nilai 0 ke sistem operasi sebagai sinyal bahwa program berakhir tanpa error.",
            ],
            keyPoints: [
              "Setiap pernyataan instruksi di C++ WAJIB diakhiri dengan titik koma (;).",
              "C++ bersifat Case-Sensitive (huruf besar dan kecil dibedakan: 'Main' berbeda dengan 'main').",
              "Komentar satu baris menggunakan // dan multi-baris menggunakan /* ... */.",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        id: "q-1-1",
        question: "Fungsi utama tempat eksekusi program C++ selalu dimulai adalah...",
        options: ["start()", "int main()", "void run()", "#include <iostream>"],
        correctOptionIndex: 1,
        explanation: "Program C++ selalu mulai dieksekusi dari fungsi 'int main()'.",
      },
      {
        id: "q-1-2",
        question: "Tanda apa yang wajib digunakan untuk menutup setiap instruksi pernyataan di C++?",
        options: ["Titik (.)", "Titik koma (;)", "Koma (,)", "Tanda petik (\")"],
        correctOptionIndex: 1,
        explanation: "Setiap statement instruksi di C++ harus diakhiri dengan tanda titik koma (;).",
      },
      {
        id: "q-1-3",
        question: "Library header yang harus disertakan untuk melakukan operasi cout dan cin adalah...",
        options: ["<stdio.h>", "<math.h>", "<iostream>", "<string>"],
        correctOptionIndex: 2,
        explanation: "<iostream> (Input Output Stream) adalah pustaka standar untuk 'std::cin' dan 'std::cout'.",
      },
    ],
    starterSnippet: {
      id: "snip-bab-1",
      title: "Uji Coba Hello World",
      category: "Bab 1",
      description: "Modifikasi teks di bawah ini lalu tekan tombol Jalankan untuk melihat hasilnya.",
      code: `#include <iostream>
using namespace std;

int main() {
    cout << "=================================" << endl;
    cout << "   BELAJAR C++ DARI NOL HINGGA MAHIR" << endl;
    cout << "=================================" << endl;
    cout << "Nama Saya : Programmer C++" << endl;
    cout << "Status    : Sedang Belajar di Compiler Online!" << endl;
    return 0;
}`,
    },
  },
  {
    id: "bab-2",
    number: 2,
    title: "Variabel, Tipe Data & Konstanta",
    slug: "variabel-dan-tipe-data",
    summary: "Memahami tempat penyimpanan data di memori komputer, ukuran bit, tipe data numerik, karakter, boolean, dan konstanta.",
    icon: "Boxes",
    estimatedMinutes: 20,
    sections: [
      {
        id: "sec-2-1",
        title: "1. Konsep Variabel & Memori",
        content: `**Variabel** adalah nama simbolik untuk lokasi memori yang digunakan untuk menyimpan nilai sementara selama program berjalan. 

Sintaks deklarasi variabel:
\`\`\`cpp
tipe_data nama_variabel = nilai_awal;
\`\`\`

### Aturan Penamaan Variabel (Identifier):
1. Boleh mengandung huruf (a-z, A-Z), angka (0-9), dan garis bawah (\`_\`).
2. **TIDAK BOLEH** diawali dengan angka (contoh \`1total\` ❌ salah, \`total1\` ✅ benar).
3. Tidak boleh mengandung spasi atau simbol khusus seperti \`@, #, $, %\`.
4. Tidak boleh menggunakan kata kunci (*keywords*) C++ seperti \`int, return, class, if\`.
5. Bersifat *case-sensitive* (\`umur\`, \`Umur\`, dan \`UMUR\` adalah 3 variabel yang berbeda).`,
      },
      {
        id: "sec-2-2",
        title: "2. Tabel Tipe Data Primitif C++",
        content: `Berikut adalah tipe data bawaan paling penting di C++ beserta ukuran memori dan fungsinya:

| Tipe Data | Ukuran Memori | Rentang Nilai Umum | Contoh Penulisan |
| :--- | :--- | :--- | :--- |
| **int** | 4 Byte (32 bit) | -2.147.483.648 s/d 2.147.483.647 | \`int umur = 20;\` |
| **float** | 4 Byte (32 bit) | Angka desimal presisi tunggal (~7 digit) | \`float ipk = 3.85f;\` |
| **double** | 8 Byte (64 bit) | Angka desimal presisi ganda (~15 digit) | \`double pi = 3.1415926535;\` |
| **char** | 1 Byte (8 bit) | Karakter ASCII tunggal (petik satu) | \`char nilai = 'A';\` |
| **bool** | 1 Byte (8 bit) | Nilai logika kebenaran (\`true\` / \`false\`) | \`bool lulus = true;\` |
| **string** | Dinamis | Teks / kumpulan karakter (\`#include <string>\`) | \`string nama = "Budi";\` |`,
        visualBox: {
          title: "Tips Memori & Pemilihan Tipe Data",
          type: "tip",
          text: "Gunakan 'int' untuk bilangan bulat biasa, 'double' untuk perhitungan desimal akurat (seperti uang atau sains), 'char' untuk satu huruf, dan 'string' untuk teks kalimat.",
        },
      },
      {
        id: "sec-2-3",
        title: "3. Konstanta (const) & Type Casting",
        content: `**Konstanta** adalah variabel yang nilainya **tidak dapat diubah** setelah diinisialisasi. Gunakan kata kunci \`const\`.

**Type Casting** adalah proses mengonversi nilai dari satu tipe data ke tipe data lainnya.
- **Implicit Casting:** Otomatis dilakukan compiler (misal \`int\` dimasukkan ke \`double\`).
- **Explicit Casting:** Ditentukan secara sadar oleh programmer menggunakan \`static_cast<tipe>(variabel)\` atau \`(tipe)variabel\`.`,
        codeExamples: [
          {
            id: "code-2-1",
            title: "Demonstrasi Variabel, Tipe Data & Casting",
            description: "Contoh lengkap penggunaan berbagai tipe data dan explicit type casting.",
            code: `#include <iostream>
#include <string>

using namespace std;

int main() {
    // 1. Deklarasi variabel berbagai tipe data
    string namaLengkap = "Ahmad Dahlan";
    int usia = 21;
    char jenisKelamin = 'L';
    double saldoTabungan = 1500750.50;
    bool isActive = true;

    // 2. Konstanta (tidak bisa diubah)
    const double PAJAK = 0.11; // PPN 11%

    cout << "=== BIODATA SISWA ===" << endl;
    cout << "Nama          : " << namaLengkap << endl;
    cout << "Usia          : " << usia << " tahun" << endl;
    cout << "Jenis Kelamin : " << jenisKelamin << endl;
    cout << "Saldo Awal    : Rp " << saldoTabungan << endl;
    cout << "Status Aktif  : " << (isActive ? "Aktif" : "Non-Aktif") << endl;

    // 3. Demonstrasi Type Casting (Pembagian Integer vs Float)
    int totalNilai = 275;
    int jumlahMapel = 3;

    // Tanpa casting (hasil salah karena integer division: 275/3 = 91)
    double rataSalah = totalNilai / jumlahMapel; 

    // Dengan explicit static_cast (hasil benar: 91.6667)
    double rataBenar = static_cast<double>(totalNilai) / jumlahMapel;

    cout << "\\n=== DEMO TYPE CASTING ===" << endl;
    cout << "Rata-rata tanpa casting : " << rataSalah << endl;
    cout << "Rata-rata dengan casting: " << rataBenar << endl;

    return 0;
}`,
            expectedOutput: `=== BIODATA SISWA ===
Nama          : Ahmad Dahlan
Usia          : 21 tahun
Jenis Kelamin : L
Saldo Awal    : Rp 1.50075e+06
Status Aktif  : Aktif

=== DEMO TYPE CASTING ===
Rata-rata tanpa casting : 91
Rata-rata dengan casting: 91.6667`,
            explanation: [
              "Konstanta PAJAK dibuat dengan 'const double PAJAK = 0.11;', nilainya terkunci selamanya.",
              "Operasi 'totalNilai / jumlahMapel' menghasilkan integer 91 karena kedua operan adalah integer.",
              "Dengan 'static_cast<double>(totalNilai)', nilai 275 dikonversi sementara menjadi 275.0 sehingga pembagian menghasilkan nilai desimal 91.6667.",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        id: "q-2-1",
        question: "Manakah nama variabel yang VALID dalam aturan sintaks C++?",
        options: ["2nd_score", "nilai_akhir_ujian", "total nilai", "class"],
        correctOptionIndex: 1,
        explanation: "'nilai_akhir_ujian' valid karena menggunakan huruf dan underscore, tidak diawali angka, tidak ada spasi, dan bukan keyword.",
      },
      {
        id: "q-2-2",
        question: "Jika int a = 7 dan int b = 2, berapakah hasil dari ekspresi (a / b) dalam C++?",
        options: ["3.5", "3", "4", "Error kompilasi"],
        correctOptionIndex: 1,
        explanation: "Karena kedua variabel bertipe integer, C++ melakukan pembagian bulat (integer division) dan memotong desimalnya menjadi 3.",
      },
      {
        id: "q-2-3",
        question: "Tipe data apa yang paling tepat untuk menyimpan status apakah lampu menyala atau mati?",
        options: ["int", "char", "bool", "float"],
        correctOptionIndex: 2,
        explanation: "Tipe data 'bool' dirancang khusus untuk kondisi biner (true/false, 1/0).",
      },
    ],
    starterSnippet: {
      id: "snip-bab-2",
      title: "Eksperimen Variabel & Ukuran Memori",
      category: "Bab 2",
      description: "Cari tahu ukuran memori (sizeof) dari masing-masing tipe data di mesin kompilator.",
      code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    cout << "=== UKURAN TIPE DATA DALAM MEMORI (BYTE) ===" << endl;
    cout << "Ukuran char    : " << sizeof(char) << " byte" << endl;
    cout << "Ukuran bool    : " << sizeof(bool) << " byte" << endl;
    cout << "Ukuran int     : " << sizeof(int) << " byte" << endl;
    cout << "Ukuran float   : " << sizeof(float) << " byte" << endl;
    cout << "Ukuran double  : " << sizeof(double) << " byte" << endl;
    cout << "Ukuran string  : " << sizeof(string) << " byte" << endl;
    return 0;
}`,
    },
  },
  {
    id: "bab-3",
    number: 3,
    title: "Input & Output Standar (I/O)",
    slug: "input-dan-output",
    summary: "Mengambil input pengguna dengan cin & getline, menampilkan output terformat dengan cout dan header <iomanip>.",
    icon: "ArrowRightLeft",
    estimatedMinutes: 20,
    sections: [
      {
        id: "sec-3-1",
        title: "1. Menggunakan std::cin untuk Membaca Input",
        content: `Untuk menerima masukan dari pengguna melalui keyboard / terminal, kita menggunakan objek **\`cin\`** dan operator ekstraksi **\`>>\`**.

\`\`\`cpp
int umur;
cout << "Masukkan umur Anda: ";
cin >> umur;
\`\`\`

### Masalah Spasi pada \`cin >>\`:
Operator \`cin >>\` berhenti membaca data begitu menemui karakter spasi, tab, atau newline. Jadi jika pengguna mengetik nama \`"Budi Santoso"\`, variabel hanya akan menyimpan \`"Budi"\`.

### Solusi: Menggunakan \`getline(cin, variabel)\`
Untuk membaca satu baris penuh teks yang mengandung spasi:
\`\`\`cpp
string namaLengkap;
getline(cin, namaLengkap);
\`\`\`

⚠️ **Perhatian Buffer!** Jika Anda menggunakan \`getline()\` setelah \`cin >>\`, Anda harus memanggil \`cin.ignore()\` terlebih dahulu untuk membersihkan sisa karakter enter (\\n) di input buffer.`,
      },
      {
        id: "sec-3-2",
        title: "2. Formatting Output dengan <iomanip>",
        content: `Pustaka **\`<iomanip>\`** (Input Output Manipulation) menyediakan fungsi penting untuk merapikan tampilan angka dan tabel:
- \`fixed\` & \`setprecision(n)\`: Menetapkan jumlah angka di belakang koma pada bilangan desimal.
- \`setw(n)\`: Mengatur lebar kolom karakter (sangat berguna untuk tabel).
- \`setfill(c)\`: Mengisi ruang kosong dengan karakter tertentu.`,
        codeExamples: [
          {
            id: "code-3-1",
            title: "Program Kasir Sederhana dengan Input & Format Desimal",
            description: "Menerima input nama barang, harga, dan jumlah beli lalu menampilkan struk terformat rapi.",
            code: `#include <iostream>
#include <string>
#include <iomanip> // Diperlukan untuk formatting desimal dan tabel

using namespace std;

int main() {
    string namaBarang;
    double hargaSatuan;
    int jumlahBeli;

    // Membaca input string ber-spasi
    cout << "Masukkan Nama Barang : ";
    getline(cin, namaBarang);

    cout << "Masukkan Harga Satuan: ";
    cin >> hargaSatuan;

    cout << "Masukkan Jumlah Beli : ";
    cin >> jumlahBeli;

    // Perhitungan
    double subtotal = hargaSatuan * jumlahBeli;
    double diskon = 0.0;
    
    if (subtotal >= 100000) {
        diskon = subtotal * 0.10; // Diskon 10% jika belanja >= 100rb
    }
    
    double totalBayar = subtotal - diskon;

    // Menampilkan Struk Pembayaran dengan format 2 desimal
    cout << "\n========================================" << endl;
    cout << "           STRUK PEMBELIAN TOKO         " << endl;
    cout << "========================================" << endl;
    
    // Set format desimal fixed 2 angka di belakang koma
    cout << fixed << setprecision(2);
    
    cout << "Nama Barang   : " << namaBarang << endl;
    cout << "Harga Satuan  : Rp " << setw(10) << hargaSatuan << endl;
    cout << "Jumlah        :    " << setw(10) << jumlahBeli << " pcs" << endl;
    cout << "----------------------------------------" << endl;
    cout << "Subtotal      : Rp " << setw(10) << subtotal << endl;
    cout << "Diskon (10%)  : Rp " << setw(10) << diskon << endl;
    cout << "----------------------------------------" << endl;
    cout << "TOTAL BAYAR   : Rp " << setw(10) << totalBayar << endl;
    cout << "========================================" << endl;

    return 0;
}`,
            stdin: `Buku Pemrograman C++ Modern
75000.00
2`,
            expectedOutput: `Masukkan Nama Barang : Masukkan Harga Satuan: Masukkan Jumlah Beli: 
========================================
           STRUK PEMBELIAN TOKO         
========================================
Nama Barang   : Buku Pemrograman C++ Modern
Harga Satuan  : Rp   75000.00
Jumlah        :             2 pcs
----------------------------------------
Subtotal      : Rp  150000.00
Diskon (10%)  : Rp   15000.00
----------------------------------------
TOTAL BAYAR   : Rp  135000.00
========================================`,
            explanation: [
              "getline(cin, namaBarang) digunakan agar input nama barang yang ada spasinya tidak terpotong.",
              "fixed dan setprecision(2) memastikan output desimal selalu memiliki 2 digit presisi (contoh: 75000.00).",
              "setw(10) membuat lebar kolom 10 karakter agar nominal sejajar rapi ke kanan.",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        id: "q-3-1",
        question: "Fungsi apa yang tepat untuk membaca string satu baris penuh yang mengandung spasi?",
        options: ["cin >> str;", "getline(cin, str);", "cin.read(str);", "cout << str;"],
        correctOptionIndex: 1,
        explanation: "Fungsi 'getline(cin, str)' membaca seluruh karakter hingga karakter newline (enter), termasuk spasi.",
      },
      {
        id: "q-3-2",
        question: "Header library apa yang dibutuhkan jika ingin menggunakan fixed dan setprecision()?",
        options: ["<cmath>", "<iomanip>", "<cstdlib>", "<string>"],
        correctOptionIndex: 1,
        explanation: "<iomanip> berisi manipulator stream seperti setprecision, setw, fixed, dan setfill.",
      },
      {
        id: "q-3-3",
        question: "Mengapa cin.ignore() sering dibutuhkan sebelum memanggil getline() setelah cin >> ?",
        options: [
          "Untuk menghapus virus di memori",
          "Untuk membersihkan sisa karakter newline '\\n' di input buffer",
          "Untuk mempercepat proses compile",
          "Untuk mereset nilai variabel menjadi nol"
        ],
        correctOptionIndex: 1,
        explanation: "Operator >> meninggalkan sisa newline '\\n' di buffer keyboard. Jika tidak dibersihkan dengan cin.ignore(), getline berikutnya akan langsung menangkap newline tersebut dan membaca string kosong.",
      },
    ],
    starterSnippet: {
      id: "snip-bab-3",
      title: "Kalkulator Luas & Keliling Persegi Panjang",
      category: "Bab 3",
      description: "Latihlah input angka dan tampilkan perhitungan rumus secara langsung.",
      code: `#include <iostream>
using namespace std;

int main() {
    double panjang, lebar;
    
    cout << "=== KALKULATOR PERSEGI PANJANG ===" << endl;
    cout << "Masukkan Panjang : ";
    cin >> panjang;
    cout << "Masukkan Lebar   : ";
    cin >> lebar;
    
    double luas = panjang * lebar;
    double keliling = 2 * (panjang + lebar);
    
    cout << "\nHasil Perhitungan:" << endl;
    cout << "Luas Persegi Panjang     = " << luas << endl;
    cout << "Keliling Persegi Panjang = " << keliling << endl;
    
    return 0;
}`,
      defaultStdin: "12.5\n8.0",
    },
  },
  {
    id: "bab-4",
    number: 4,
    title: "Operator & Ekspresi Lengkap",
    slug: "operator-dan-ekspresi",
    summary: "Menguasai operator aritmatika, penugasan, pembanding, logika, bitwise, dan ternary di C++.",
    icon: "Calculator",
    estimatedMinutes: 20,
    sections: [
      {
        id: "sec-4-1",
        title: "1. Kategori Operator dalam C++",
        content: `Operator adalah simbol khusus yang memberi tahu kompiler untuk melakukan operasi matematika atau logika tertentu pada satu atau lebih operan.

### 1. Operator Aritmatika:
- \`+\` (Penjumlahan), \`-\` (Pengurangan), \`*\` (Perkalian)
- \`/\` (Pembagian: desimal jika ada float/double, bilangan bulat jika keduanya int)
- \`%\` (Modulus / Sisa Bagi: hanya berlaku untuk bilangan bulat!)

### 2. Operator Increment & Decrement:
- \`++x\` (Prefix): Tambahkan 1 terlebih dahulu, lalu gunakan nilainya.
- \`x++\` (Postfix): Gunakan nilai sekarang terlebih dahulu, lalu tambahkan 1.
- \`--x\` / \`x--\`: Mengurangi nilai sebesar 1.

### 3. Operator Relasional / Perbandingan (Menghasilkan bool: true/false):
- \`==\` (Sama dengan), \`!=\` (Tidak sama dengan)
- \`>\` (Lebih besar), \`<\` (Lebih kecil), \`>=\` (Lebih besar atau sama), \`<=\` (Lebih kecil atau sama)

### 4. Operator Logika (Logical Operators):
- \`&&\` (AND): Bernilai \`true\` hanya jika KEDUA sisi bernilai \`true\`.
- \`||\` (OR): Bernilai \`true\` jika SALAH SATU sisi bernilai \`true\`.
- \`!\` (NOT): Membalik nilai logika (\`!true\` menjadi \`false\`).

### 5. Operator Ternary (Kondisional Singkat):
\`\`\`cpp
kondisi ? nilai_jika_true : nilai_jika_false;
\`\`\``,
      },
      {
        id: "sec-4-2",
        title: "2. Contoh Praktik Operator Lengkap",
        content: `Mari kita lihat bagaimana operator bekerja dalam skenario nyata:`,
        codeExamples: [
          {
            id: "code-4-1",
            title: "Uji Coba Berbagai Operator C++",
            description: "Program lengkap menguji modulus, logika, ternary, dan prefix vs postfix.",
            code: `#include <iostream>
using namespace std;

int main() {
    int a = 10;
    int b = 3;

    cout << "=== OPERATOR ARITMATIKA ===" << endl;
    cout << "a + b = " << (a + b) << endl;
    cout << "a - b = " << (a - b) << endl;
    cout << "a * b = " << (a * b) << endl;
    cout << "a / b = " << (a / b) << " (pembagian bulat)" << endl;
    cout << "a % b = " << (a % b) << " (sisa bagi 10 dibagi 3)" << endl;

    cout << "\n=== PREFIX VS POSTFIX ===" << endl;
    int x = 5;
    cout << "Nilai awal x = " << x << endl;
    cout << "Hasil x++    = " << x++ << " (dicetak 5 dulu, lalu jadi 6)" << endl;
    cout << "Nilai x kini = " << x << endl;
    cout << "Hasil ++x    = " << ++x << " (langsung jadi 7 lalu dicetak)" << endl;

    cout << "\n=== OPERATOR LOGIKA & TERNARY ===" << endl;
    int umur = 18;
    bool punyaSIM = true;

    // Evaluasi logika AND
    bool bolehMenyetir = (umur >= 17) && punyaSIM;
    cout << "Boleh Menyetir? " << (bolehMenyetir ? "BOLEH" : "TIDAK BOLEH") << endl;

    // Cek Ganjil / Genap dengan Modulus dan Ternary
    int angka = 17;
    string jenisAngka = (angka % 2 == 0) ? "GENAP" : "GANJIL";
    cout << "Angka " << angka << " adalah bilangan " << jenisAngka << endl;

    return 0;
}`,
            expectedOutput: `=== OPERATOR ARITMATIKA ===
a + b = 13
a - b = 7
a * b = 30
a / b = 3 (pembagian bulat)
a % b = 1 (sisa bagi 10 dibagi 3)

=== PREFIX VS POSTFIX ===
Nilai awal x = 5
Hasil x++    = 5 (dicetak 5 dulu, lalu jadi 6)
Nilai x kini = 6
Hasil ++x    = 7 (langsung jadi 7 lalu dicetak)

=== OPERATOR LOGIKA & TERNARY ===
Boleh Menyetir? BOLEH
Angka 17 adalah bilangan GANJIL`,
            explanation: [
              "10 % 3 = 1 karena 3 * 3 = 9, bersisa 1.",
              "Postfix x++ mengembalikan nilai lama sebelum menambahkannya, sedangkan prefix ++x menambahkan nilainya terlebih dahulu.",
              "Ternary operator '(angka % 2 == 0) ? \"GENAP\" : \"GANJIL\"' adalah cara elegan dan ringkas menggantikan blok if-else sederhana.",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        id: "q-4-1",
        question: "Berapakah hasil dari ekspresi 14 % 4 dalam C++?",
        options: ["3.5", "2", "3", "0"],
        correctOptionIndex: 1,
        explanation: "14 dibagi 4 adalah 3 dengan sisa bagi 2 (4 * 3 = 12, 14 - 12 = 2).",
      },
      {
        id: "q-4-2",
        question: "Jika nilai x = 4, berapakah nilai y setelah dieksekusi instruksi: int y = ++x;",
        options: ["y = 4, x = 5", "y = 5, x = 5", "y = 4, x = 4", "y = 5, x = 4"],
        correctOptionIndex: 1,
        explanation: "Prefix ++x akan menaikkan nilai x dari 4 menjadi 5 terlebih dahulu, lalu nilainya (5) dimasukkan ke y.",
      },
      {
        id: "q-4-3",
        question: "Ekspresi logika mana yang menghasilkan nilai true jika A = true dan B = false?",
        options: ["A && B", "!A || B", "A || B", "!(A || B)"],
        correctOptionIndex: 2,
        explanation: "Operator OR (||) bernilai true jika minimal salah satu operan bernilai true (A bernilai true).",
      },
    ],
    starterSnippet: {
      id: "snip-bab-4",
      title: "Pengecek Tahun Kabisat dengan Operator Logika",
      category: "Bab 4",
      description: "Sebuah tahun adalah kabisat jika habis dibagi 400 ATAU (habis dibagi 4 dan TIDAK habis dibagi 100).",
      code: `#include <iostream>
using namespace std;

int main() {
    int tahun = 2024;
    
    // Logika Kabisat
    bool isKabisat = (tahun % 400 == 0) || ((tahun % 4 == 0) && (tahun % 100 != 0));
    
    cout << "Tahun: " << tahun << endl;
    cout << "Status: " << (isKabisat ? "Tahun Kabisat (366 hari)" : "Bukan Tahun Kabisat (365 hari)") << endl;
    
    return 0;
}`,
    },
  },
  {
    id: "bab-5",
    number: 5,
    title: "Percabangan (Decision Making)",
    slug: "percabangan-if-else-switch",
    summary: "Mengendalikan alur logika program dengan if, if-else, nested if, dan switch-case.",
    icon: "GitFork",
    estimatedMinutes: 25,
    sections: [
      {
        id: "sec-5-1",
        title: "1. Struktur if, else if, dan else",
        content: `Percabangan memungkinkan program kita mengambil keputusan berbeda berdasarkan kondisi boolean tertentu.

### Sintaks Percabangan Bertingkat:
\`\`\`cpp
if (kondisi1) {
    // Dijalankan jika kondisi1 bernilai true
} else if (kondisi2) {
    // Dijalankan jika kondisi1 false dan kondisi2 true
} else {
    // Dijalankan jika semua kondisi di atas bernilai false
}
\`\`\``,
      },
      {
        id: "sec-5-2",
        title: "2. Struktur switch - case",
        content: `**\`switch-case\`** sangat cocok ketika kita mencocokkan satu variabel tunggal dengan banyak nilai diskrit (konstanta integer atau char).

### Aturan Penting switch-case:
1. Variabel dalam switch **harus bertipe integer, char, atau enum** (tidak bisa float atau string).
2. Gunakan **\`break;\`** di setiap akhir case untuk mencegah eksekusi "jatuh" (*fall-through*) ke case berikutnya.
3. Gunakan **\`default:\`** sebagai penanganan jika tidak ada case yang cocok.`,
        codeExamples: [
          {
            id: "code-5-1",
            title: "Sistem Konversi Nilai Huruf & Menu Resto",
            description: "Contoh praktis penerapan if-else ladder dan switch-case menu.",
            code: `#include <iostream>
using namespace std;

int main() {
    // 1. Contoh if-else ladder: Konversi Nilai Angka ke Huruf
    int nilaiUjian = 85;
    char grade;
    string keterangan;

    if (nilaiUjian >= 85) {
        grade = 'A';
        keterangan = "Sangat Memuaskan";
    } else if (nilaiUjian >= 70) {
        grade = 'B';
        keterangan = "Memuaskan";
    } else if (nilaiUjian >= 55) {
        grade = 'C';
        keterangan = "Cukup";
    } else if (nilaiUjian >= 40) {
        grade = 'D';
        keterangan = "Kurang";
    } else {
        grade = 'E';
        keterangan = "Tidak Lulus";
    }

    cout << "=== LAPORAN HASIL STUDI ===" << endl;
    cout << "Nilai Angka : " << nilaiUjian << endl;
    cout << "Grade Huruf : " << grade << endl;
    cout << "Keterangan  : " << keterangan << endl;

    // 2. Contoh switch-case: Pilihan Menu Minuman
    int pilihanMenu = 2;

    cout << "\n=== MENU MINUMAN KAFE ===" << endl;
    switch (pilihanMenu) {
        case 1:
            cout << "Pesanan: Espresso Panas (Rp 18.000)" << endl;
            break;
        case 2:
            cout << "Pesanan: Matcha Latte Dingin (Rp 24.000)" << endl;
            break;
        case 3:
            cout << "Pesanan: Cokelat Hangat (Rp 20.000)" << endl;
            break;
        default:
            cout << "Pilihan menu tidak valid!" << endl;
            break;
    }

    return 0;
}`,
            expectedOutput: `=== LAPORAN HASIL STUDI ===
Nilai Angka : 85
Grade Huruf : A
Keterangan  : Sangat Memuaskan

=== MENU MINUMAN KAFE ===
Pesanan: Matcha Latte Dingin (Rp 24.000)`,
            explanation: [
              "Kondisi 'nilaiUjian >= 85' terpenuhi, sehingga program langsung mengeksekusi grade = 'A' dan melompati sisa cabang else if lainnya.",
              "Pada switch-case, nilai pilihanMenu bernilai 2 sehingga langsung melompat ke case 2. Instruksi 'break;' mencegah eksekusi case 3.",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        id: "q-5-1",
        question: "Apa akibatnya jika kita lupa menuliskan kata kunci 'break;' pada sebuah blok case dalam switch?",
        options: [
          "Program akan langsung crash",
          "Kompiler menghasilkan error syntax",
          "Program akan terus mengeksekusi case berikutnya di bawahnya (fall-through)",
          "Nilai variabel switch akan otomatis direset ke nol"
        ],
        correctOptionIndex: 2,
        explanation: "Tanpa 'break;', C++ akan melanjutkan eksekusi kode di case berikutnya terlepas dari apakah kondisinya cocok atau tidak (fall-through behavior).",
      },
      {
        id: "q-5-2",
        question: "Tipe data apa yang TIDAK BISA digunakan langsung sebagai variabel ekspresi dalam switch-case C++?",
        options: ["int", "char", "float", "short"],
        correctOptionIndex: 2,
        explanation: "Pernyataan switch hanya menerima tipe data integer integral (seperti int, char, short, long, enum). Float dan double tidak didukung karena presisi pecahan biner.",
      },
    ],
    starterSnippet: {
      id: "snip-bab-5",
      title: "Kalkulator Sederhana dengan Switch Case",
      category: "Bab 5",
      description: "Memproses dua bilangan dengan operator (+, -, *, /).",
      code: `#include <iostream>
using namespace std;

int main() {
    double num1 = 20, num2 = 4;
    char op = '*'; // Pilihan operator: '+', '-', '*', '/'

    cout << "Angka 1   : " << num1 << endl;
    cout << "Operator  : " << op << endl;
    cout << "Angka 2   : " << num2 << endl;
    cout << "Hasil     : ";

    switch (op) {
        case '+':
            cout << (num1 + num2) << endl;
            break;
        case '-':
            cout << (num1 - num2) << endl;
            break;
        case '*':
            cout << (num1 * num2) << endl;
            break;
        case '/':
            if (num2 != 0) {
                cout << (num1 / num2) << endl;
            } else {
                cout << "Error: Pembagian dengan angka nol tidak terdefinisi!" << endl;
            }
            break;
        default:
            cout << "Operator tidak dikenali!" << endl;
            break;
    }

    return 0;
}`,
    },
  },
  {
    id: "bab-6",
    number: 6,
    title: "Perulangan / Looping",
    slug: "perulangan-looping",
    summary: "Mengotomasi tugas berulang dengan for loop, while loop, do-while, nested loop, break dan continue.",
    icon: "Repeat",
    estimatedMinutes: 25,
    sections: [
      {
        id: "sec-6-1",
        title: "1. Jenis-Jenis Perulangan di C++",
        content: `Looping memungkinkan kita mengeksekusi blok kode berulang kali sampai suatu kondisi berhenti terpenuhi.

### 1. For Loop (Ketika jumlah iterasi sudah diketahui):
\`\`\`cpp
for (inisialisasi; kondisi; increment/decrement) {
    // blok kode yang diulang
}
\`\`\`

### 2. While Loop (Entry-controlled loop):
Mengecek kondisi di awal. Jika kondisi false sejak awal, kode di dalam loop **tidak akan pernah dijalankan sama sekali**.
\`\`\`cpp
while (kondisi) {
    // kode
}
\`\`\`

### 3. Do-While Loop (Exit-controlled loop):
Mengecek kondisi di akhir. Kode dijamin **pasti dijalankan minimal 1 kali** meskipun kondisinya false!
\`\`\`cpp
do {
    // kode
} while (kondisi);
\`\`\`

### 4. Perintah break & continue:
- **\`break\`**: Langsung menghentikan dan keluar dari loop seketika.
- **\`continue\`**: Melewati sisa iterasi saat ini dan langsung melompat ke iterasi berikutnya.`,
      },
      {
        id: "sec-6-2",
        title: "2. Nested Loop & Pola Bintang",
        content: `**Nested Loop** adalah perulangan di dalam perulangan. Sering digunakan untuk mengolah matriks, tabel, atau mencetak pola 2D.`,
        codeExamples: [
          {
            id: "code-6-1",
            title: "Demonstrasi For, While, dan Pola Segitiga Bintang",
            description: "Menampilkan deret angka genap, faktorial, dan segitiga siku-siku bintang.",
            code: `#include <iostream>
using namespace std;

int main() {
    // 1. For Loop: Mencetak bilangan genap dari 2 sampai 10
    cout << "=== BILANGAN GENAP (2 s/d 10) ===" << endl;
    for (int i = 2; i <= 10; i += 2) {
        cout << i << " ";
    }
    cout << endl;

    // 2. While Loop: Menghitung Faktorial dari 5 (5! = 5 * 4 * 3 * 2 * 1)
    cout << "\n=== HITUNG FAKTORIAL 5! ===" << endl;
    int n = 5;
    int faktorial = 1;
    int counter = n;

    while (counter > 1) {
        faktorial *= counter;
        counter--;
    }
    cout << n << "! = " << faktorial << endl;

    // 3. Nested Loop: Membuat Pola Segitiga Bintang Siku-siku 5 Baris
    cout << "\n=== POLA SEGITIGA SIKU-SIKU ===" << endl;
    int tinggi = 5;
    for (int baris = 1; baris <= tinggi; baris++) {
        for (int kolom = 1; kolom <= baris; kolom++) {
            cout << "* ";
        }
        cout << endl; // Pindah ke baris baru
    }

    return 0;
}`,
            expectedOutput: `=== BILANGAN GENAP (2 s/d 10) ===
2 4 6 8 10 

=== HITUNG FAKTORIAL 5! ===
5! = 120

=== POLA SEGITIGA SIKU-SIKU ===
* 
* * 
* * * 
* * * * 
* * * * * `,
            explanation: [
              "For loop 'i += 2' melompat dua angka setiap iterasi sehingga hanya mencetak bilangan genap.",
              "Faktorial dihitung dengan mengalikan faktorial dengan counter secara mundur hingga counter mencapai 1.",
              "Pada nested loop, loop luar mengatur baris (1 sampai 5), dan loop dalam mengatur berapa banyak bintang yang dicetak pada baris tersebut.",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        id: "q-6-1",
        question: "Perulangan mana yang dijamin akan mengeksekusi blok kodenya MINIMAL 1 KALI meskipun kondisinya bernilai false?",
        options: ["for loop", "while loop", "do-while loop", "nested loop"],
        correctOptionIndex: 2,
        explanation: "Do-while loop mengecek kondisi di akhir (exit-controlled), sehingga instruksi di dalam blok do selalu jalan minimal satu kali.",
      },
      {
        id: "q-6-2",
        question: "Apa fungsi dari pernyataan 'continue;' dalam sebuah perulangan?",
        options: [
          "Menghentikan seluruh program",
          "Keluar dari perulangan secara permanen",
          "Melewati sisa kode pada iterasi saat ini dan lanjut ke iterasi berikutnya",
          "Mengulang dari iterasi pertama lagi"
        ],
        correctOptionIndex: 2,
        explanation: "'continue;' melompati sisa kode pada putaran saat ini dan langsung melanjutkan evaluasi iterasi berikutnya.",
      },
    ],
    starterSnippet: {
      id: "snip-bab-6",
      title: "Deret Bilangan Fibonacci",
      category: "Bab 6",
      description: "Menghasilkan N suku pertama deret Fibonacci (0, 1, 1, 2, 3, 5, 8, 13...).",
      code: `#include <iostream>
using namespace std;

int main() {
    int jumlahSuku = 10;
    long long a = 0, b = 1;

    cout << "=== 10 BILANGAN PERTAMA DERET FIBONACCI ===" << endl;
    for (int i = 1; i <= jumlahSuku; i++) {
        cout << a << " ";
        long long selanjutnya = a + b;
        a = b;
        b = selanjutnya;
    }
    cout << endl;

    return 0;
}`,
    },
  },
  {
    id: "bab-7",
    number: 7,
    title: "Array, Vektor & std::string",
    slug: "array-vektor-dan-string",
    summary: "Menyimpan kumpulan data sejenis dengan Array 1D, Matriks 2D, dan manipulasi teks dengan std::string.",
    icon: "Layers",
    estimatedMinutes: 25,
    sections: [
      {
        id: "sec-7-1",
        title: "1. Konsep Array 1 Dimensi",
        content: `**Array** adalah struktur data yang menyimpan kumpulan elemen dengan tipe data yang sama pada lokasi memori yang berurutan (*contiguous memory*).

### Karakteristik Array:
1. **0-indexed:** Indeks elemen pertama selalu dimulai dari \`0\`.
2. **Ukuran Tetap (Fixed Size):** Ukuran array standar di C++ harus ditentukan saat kompilasi.
3. Elemen terakhir pada array berukuran \`N\` berada di indeks \`N - 1\`.

\`\`\`cpp
int nilai[5] = {80, 90, 75, 88, 95};
cout << nilai[0]; // Mencetak 80
\`\`\``,
      },
      {
        id: "sec-7-2",
        title: "2. Array 2 Dimensi (Matriks) & Manipulasi String",
        content: `Array 2 Dimensi sering digunakan untuk merepresentasikan tabel atau matriks matematika:
\`\`\`cpp
int matriks[2][3] = {
    {1, 2, 3},
    {4, 5, 6}
};
\`\`\`

### Fungsi Bawaan Populer pada \`std::string\`:
- \`str.length()\` atau \`str.size()\`: Mengembalikan panjang karakter string.
- \`str.substr(posisi, panjang)\`: Mengambil potongan substring.
- \`str.find("kata")\`: Mencari posisi kata dalam string.
- \`str.push_back('A')\` / \`str.pop_back()\`: Menambah/menghapus karakter di akhir.`,
        codeExamples: [
          {
            id: "code-7-1",
            title: "Pengolahan Nilai Siswa & Matriks Penjumlahan",
            description: "Mencari nilai tertinggi, rata-rata pada array 1D dan penjumlahan matriks 2D.",
            code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    // 1. Array 1D: Nilai Siswa
    int skor[5] = {78, 92, 85, 64, 99};
    int jumlahSiswa = 5;
    int total = 0;
    int maxNilai = skor[0];
    int minNilai = skor[0];

    for (int i = 0; i < jumlahSiswa; i++) {
        total += skor[i];
        if (skor[i] > maxNilai) maxNilai = skor[i];
        if (skor[i] < minNilai) minNilai = skor[i];
    }

    double rataRata = static_cast<double>(total) / jumlahSiswa;

    cout << "=== STATISTIK NILAI SISWA (ARRAY 1D) ===" << endl;
    cout << "Total Nilai : " << total << endl;
    cout << "Rata-rata   : " << rataRata << endl;
    cout << "Nilai Max   : " << maxNilai << endl;
    cout << "Nilai Min   : " << minNilai << endl;

    // 2. Array 2D: Penjumlahan Matriks 2x2
    int matA[2][2] = {{2, 4}, {1, 3}};
    int matB[2][2] = {{5, 1}, {2, 6}};
    int matHasil[2][2];

    cout << "\n=== HASIL PENJUMLAHAN MATRIKS 2x2 ===" << endl;
    for (int r = 0; r < 2; r++) {
        for (int c = 0; c < 2; c++) {
            matHasil[r][c] = matA[r][c] + matB[r][c];
            cout << matHasil[r][c] << "\t";
        }
        cout << endl;
    }

    return 0;
}`,
            expectedOutput: `=== STATISTIK NILAI SISWA (ARRAY 1D) ===
Total Nilai : 418
Rata-rata   : 83.6
Nilai Max   : 99
Nilai Min   : 64

=== HASIL PENJUMLAHAN MATRIKS 2x2 ===
7	5	
3	9	`,
            explanation: [
              "Elemen skor[0] bernilai 78, skor[4] bernilai 99.",
              "Looping melintasi seluruh array untuk menghitung total akumulasi dan memperbarui nilai maksimum/minimum.",
              "Matriks 2x2 diproses menggunakan nested loop di mana 'r' mewakili baris dan 'c' mewakili kolom.",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        id: "q-7-1",
        question: "Jika array dideklarasikan dengan 'int data[10];', berapakah indeks untuk elemen terakhir?",
        options: ["10", "9", "11", "0"],
        correctOptionIndex: 1,
        explanation: "Karena indeks C++ berbasis 0, array berukuran 10 memiliki indeks valid dari 0 sampai 9 (10 - 1 = 9).",
      },
      {
        id: "q-7-2",
        question: "Metode apa pada objek std::string yang digunakan untuk menghitung jumlah total karakter teks?",
        options: ["str.count()", "str.length()", "str.total()", "sizeof(str)"],
        correctOptionIndex: 1,
        explanation: "Metode 'str.length()' atau 'str.size()' mengembalikan banyaknya karakter dalam string.",
      },
    ],
    starterSnippet: {
      id: "snip-bab-7",
      title: "Pengecek Kata Palindrom (String)",
      category: "Bab 7",
      description: "Memeriksa apakah sebuah kata terbaca sama dari depan maupun dari belakang (misal: KATAK, RADAR, KASUR RUSAK).",
      code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string kata = "KATAK";
    string terbalik = "";

    // Membalik string dari belakang ke depan
    for (int i = kata.length() - 1; i >= 0; i--) {
        terbalik += kata[i];
    }

    cout << "Kata Asli : " << kata << endl;
    cout << "Dibalik   : " << terbalik << endl;

    if (kata == terbalik) {
        cout << "Hasil     : ADALAH PALINDROM!" << endl;
    } else {
        cout << "Hasil     : BUKAN Palindrom." << endl;
    }

    return 0;
}`,
    },
  },
  {
    id: "bab-8",
    number: 8,
    title: "Fungsi (Functions) & Modularitas",
    slug: "fungsi-dan-modularitas",
    summary: "Membuat fungsi modular, parameter pass by value vs reference, default arguments, overloading, dan rekursi.",
    icon: "FunctionSquare",
    estimatedMinutes: 25,
    sections: [
      {
        id: "sec-8-1",
        title: "1. Anatomi Fungsi C++",
        content: `**Fungsi** adalah blok kode terpisah yang dapat digunakan kembali (*reusable*) untuk menyelesaikan tugas tertentu.

\`\`\`cpp
tipe_kembalian namaFungsi(tipe_param1 param1, tipe_param2 param2) {
    // instruksi
    return hasil;
}
\`\`\`
Jika fungsi tidak mengembalikan nilai apapun, gunakan tipe kembalian **\`void\`**.`,
      },
      {
        id: "sec-8-2",
        title: "2. Pass by Value vs Pass by Reference",
        content: `- **Pass by Value (Standar):** Fungsi menerima **salinan** (copy) dari nilai variabel. Perubahan di dalam fungsi **TIDAK mempengaruhi** variabel asli di pemanggil.
- **Pass by Reference (Menggunakan tanda \`&\`):** Fungsi menerima **alamat referensi asli**. Perubahan di dalam fungsi **AKAN LANGSUNG MENGUBAH** variabel aslinya! Serta menghemat memori karena tidak menyalin data besar.`,
        codeExamples: [
          {
            id: "code-8-1",
            title: "Pass by Reference (Tukar Nilai) & Fungsi Rekursif",
            description: "Contoh fungsi tukar angka menggunakan reference dan rekursi menghitung faktorial.",
            code: `#include <iostream>
using namespace std;

// 1. Fungsi Pass by Reference untuk menukar 2 angka
void tukarAngka(int &a, int &b) {
    int temp = a;
    a = b;
    b = temp;
}

// 2. Fungsi Rekursif: Fungsi yang memanggil dirinya sendiri
long long hitungFaktorial(int n) {
    // Base Case (Kondisi Berhenti)
    if (n <= 1) return 1;
    // Recursive Step
    return n * hitungFaktorial(n - 1);
}

// 3. Function Overloading (Nama fungsi sama, parameter berbeda)
int tambah(int a, int b) {
    return a + b;
}

double tambah(double a, double b) {
    return a + b;
}

int main() {
    // Uji Pass by Reference
    int x = 10, y = 99;
    cout << "Sebelum ditukar: x = " << x << ", y = " << y << endl;
    tukarAngka(x, y);
    cout << "Setelah ditukar: x = " << x << ", y = " << y << endl;

    // Uji Fungsi Rekursif
    int angka = 6;
    cout << "\nHasil Rekursif " << angka << "! = " << hitungFaktorial(angka) << endl;

    // Uji Function Overloading
    cout << "\nOverloading int    : 5 + 7 = " << tambah(5, 7) << endl;
    cout << "Overloading double : 3.5 + 2.5 = " << tambah(3.5, 2.5) << endl;

    return 0;
}`,
            expectedOutput: `Sebelum ditukar: x = 10, y = 99
Setelah ditukar: x = 99, y = 10

Hasil Rekursif 6! = 720

Overloading int    : 5 + 7 = 12
Overloading double : 3.5 + 2.5 = 6`,
            explanation: [
              "Parameter 'int &a, int &b' menggunakan simbol '&' sehingga variabel x dan y di main() ikut bertukar nilainya secara langsung.",
              "Fungsi rekursif 'hitungFaktorial' memanggil 'hitungFaktorial(n - 1)' berulang kali sampai 'n <= 1' (base case) tercapai.",
              "C++ mendukung 'Function Overloading', di mana kita bisa membuat banyak fungsi bernama 'tambah' asalkan tipe atau jumlah parameternya berbeda.",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        id: "q-8-1",
        question: "Simbol apa yang digunakan pada parameter fungsi untuk menjadikannya Pass by Reference?",
        options: ["*", "&", "#", "$"],
        correctOptionIndex: 1,
        explanation: "Simbol ampersand '&' menandai parameter sebagai referensi langsung ke variabel asli pemanggil.",
      },
      {
        id: "q-8-2",
        question: "Apa yang wajib dimiliki oleh setiap fungsi rekursif agar tidak terjadi infinite loop / stack overflow?",
        options: ["Loop for", "Base Case (Kondisi Berhenti)", "Tipe kembalian void", "Pernyataan switch"],
        correctOptionIndex: 1,
        explanation: "Base case adalah syarat kondisi di mana pemanggilan rekursif dihentikan dan mulai mengembalikan hasil.",
      },
    ],
    starterSnippet: {
      id: "snip-bab-8",
      title: "Fungsi Cek Bilangan Prima",
      category: "Bab 8",
      description: "Membuat fungsi modular isPrime(n) untuk menguji apakah bilangan n adalah prima.",
      code: `#include <iostream>
using namespace std;

// Fungsi boolean untuk mengecek prima
bool isPrime(int n) {
    if (n <= 1) return false;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}

int main() {
    cout << "=== DAFTAR BILANGAN PRIMA (1 s/d 30) ===" << endl;
    for (int i = 1; i <= 30; i++) {
        if (isPrime(i)) {
            cout << i << " ";
        }
    }
    cout << endl;
    return 0;
}`,
    },
  },
  {
    id: "bab-9",
    number: 9,
    title: "Pointer & Memori Dasar",
    slug: "pointer-dan-memori",
    summary: "Memahami alamat memori (&), dereferencing (*), pointer null (nullptr), dan manipulasi memori.",
    icon: "Compass",
    estimatedMinutes: 20,
    sections: [
      {
        id: "sec-9-1",
        title: "1. Apa itu Pointer?",
        content: `**Pointer** adalah variabel khusus yang menyimpan **alamat memori** (*memory address*) dari variabel lain, bukan menyimpan nilainya secara langsung.

### Dua Operator Kunci Pointer:
1. **Operator Address-of (\`&\`):** Mengambil alamat memori dari sebuah variabel (contoh: \`&angka\`).
2. **Operator Dereference (\`*\`):** Mengakses atau memodifikasi nilai yang berada di alamat memori yang ditunjuk pointer.

\`\`\`cpp
int x = 25;
int *ptr = &x; // ptr menyimpan alamat memori x

cout << ptr;   // Mencetak alamat memori (contoh: 0x7ffd9b8a)
cout << *ptr;  // Mencetak nilai di alamat tersebut (yaitu 25)

*ptr = 100;    // Mengubah nilai x menjadi 100 lewat pointer!
\`\`\``,
        visualBox: {
          title: "Selalu Inisialisasi Pointer!",
          type: "warning",
          text: "Pointer yang tidak diinisialisasi disebut 'Wild Pointer' dan dapat menyebabkan crash (Segmentation Fault). Selalu berikan inisialisasi awal ke alamat variabel atau 'nullptr'.",
        },
      },
      {
        id: "sec-9-2",
        title: "2. Contoh Praktik Pointer & Modifikasi Memori",
        content: `Mari kita buktikan bagaimana pointer bekerja langsung di atas memori:`,
        codeExamples: [
          {
            id: "code-9-1",
            title: "Demonstrasi Alamat Memori dan Dereferensi Pointer",
            description: "Melihat alamat heksadesimal variabel dan mengubah nilainya lewat dereference pointer.",
            code: `#include <iostream>
using namespace std;

int main() {
    int saldo = 50000;
    
    // Deklarasi pointer yang menunjuk ke variabel saldo
    int *ptrSaldo = &saldo;

    cout << "=== INFORMASI VARIABEL & MEMORI ===" << endl;
    cout << "Nilai asli saldo      : " << saldo << endl;
    cout << "Alamat memori saldo (&): " << &saldo << endl;
    cout << "Nilai pointer ptrSaldo: " << ptrSaldo << endl;
    cout << "Nilai via Dereference (*): " << *ptrSaldo << endl;

    // Mengubah nilai saldo tanpa memanggil variabel saldo secara langsung
    *ptrSaldo = 125000;

    cout << "\n=== SETELAH DIUBAH LEWAT POINTER ===" << endl;
    cout << "Nilai saldo sekarang  : " << saldo << " (Berubah sukses!)" << endl;

    // Menggunakan nullptr (Modern C++11)
    int *ptrKosong = nullptr;
    if (ptrKosong == nullptr) {
        cout << "Pointer aman: sedang tidak menunjuk memori manapun." << endl;
    }

    return 0;
}`,
            expectedOutput: `=== INFORMASI VARIABEL & MEMORI ===
Nilai asli saldo      : 50000
Alamat memori saldo (&): 0x7fff...
Nilai pointer ptrSaldo: 0x7fff...
Nilai via Dereference (*): 50000

=== SETELAH DIUBAH LEWAT POINTER ===
Nilai saldo sekarang  : 125000 (Berubah sukses!)
Pointer aman: sedang tidak menunjuk memori manapun.`,
            explanation: [
              "Variabel 'ptrSaldo' menyimpan alamat memori heksadesimal dari variabel 'saldo'.",
              "Instruksi '*ptrSaldo = 125000;' langsung menulis nilai baru ke lokasi RAM tempat 'saldo' berada.",
              "'nullptr' adalah standar modern C++ untuk menggantikan 'NULL' / 0 guna keamanan tipe pointer.",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        id: "q-9-1",
        question: "Operator mana yang digunakan untuk mengambil ALAMAT MEMORI dari suatu variabel?",
        options: ["Operator Asterisk (*)", "Operator Ampersand (&)", "Operator Arrow (->)", "Operator Dot (.)"],
        correctOptionIndex: 1,
        explanation: "Operator '&' (address-of) mengembalikan alamat lokasi memori di mana variabel disimpan.",
      },
      {
        id: "q-9-2",
        question: "Jika kita memiliki 'int *p = &x;', apa yang dilakukan oleh perintah '*p = 50;'?",
        options: [
          "Mengubah alamat memori p menjadi 50",
          "Mengubah nilai variabel x menjadi 50 melalui dereference",
          "Menghapus variabel x dari memori",
          "Menghasilkan error kompilasi"
        ],
        correctOptionIndex: 1,
        explanation: "'*p' mengakses lokasi yang ditunjuk p (yaitu x) dan memasukkan nilai 50 ke dalamnya.",
      },
    ],
    starterSnippet: {
      id: "snip-bab-9",
      title: "Pointer dan Array (Array Decay)",
      category: "Bab 9",
      description: "Nama array sebenarnya bertindak sebagai pointer konstan ke elemen pertamanya.",
      code: `#include <iostream>
using namespace std;

int main() {
    int angka[3] = {10, 20, 30};
    int *ptr = angka; // Menunjuk ke angka[0]

    cout << "Nilai elemen pertama  : " << *ptr << endl;
    cout << "Nilai elemen kedua    : " << *(ptr + 1) << endl;
    cout << "Nilai elemen ketiga   : " << *(ptr + 2) << endl;

    return 0;
}`,
    },
  },
  {
    id: "bab-10",
    number: 10,
    title: "Struct & Pengenalan Konsep OOP",
    slug: "struct-dan-oop-dasar",
    summary: "Mengelompokkan data kompleks dengan Struct, pengenalan Class, Object, Constructor, dan Access Specifier.",
    icon: "Cpu",
    estimatedMinutes: 25,
    sections: [
      {
        id: "sec-10-1",
        title: "1. Struct (Struktur Data Kustom)",
        content: `**Struct** memungkinkan kita menggabungkan beberapa variabel dengan tipe data berbeda menjadi satu kesatuan tipe data bentukan baru.

\`\`\`cpp
struct Mahasiswa {
    string nim;
    string nama;
    double ipk;
};
\`\`\``,
      },
      {
        id: "sec-10-2",
        title: "2. Pengenalan Class & Object (OOP)",
        content: `**Object-Oriented Programming (OOP)** adalah paradigma pemrograman yang berbasis pada konsep objek yang memiliki *atribut (data)* dan *metode (fungsi)*.

### 3 Akses Penentu (Access Specifiers):
- **\`public\`**: Anggota dapat diakses dari luar kelas secara bebas.
- **\`private\`**: Anggota HANYA dapat diakses oleh fungsi di dalam kelas itu sendiri (Encapsulation).
- **\`protected\`**: Dapat diakses oleh kelas itu sendiri dan kelas turunannya (*Inheritance*).`,
        codeExamples: [
          {
            id: "code-10-1",
            title: "Penerapan Struct & Class Rekening Bank",
            description: "Contoh implementasi data struct mahasiswa dan class rekening bank dengan enkapsulasi.",
            code: `#include <iostream>
#include <string>
using namespace std;

// 1. Definisi Struct Mahasiswa
struct Mahasiswa {
    string nim;
    string nama;
    double ipk;
};

// 2. Definisi Class RekeningBank (OOP)
class RekeningBank {
private:
    string nomorRekening;
    string pemilik;
    double saldo; // Private: tidak bisa diubah langsung dari luar

public:
    // Constructor (Dipanggil otomatis saat objek dibuat)
    RekeningBank(string noRek, string nama, double saldoAwal) {
        nomorRekening = noRek;
        pemilik = nama;
        saldo = saldoAwal;
    }

    // Method untuk Menabung
    void setor(double nominal) {
        if (nominal > 0) {
            saldo += nominal;
            cout << "Berhasil setor: Rp " << nominal << endl;
        }
    }

    // Method untuk Tarik Tunai
    void tarik(double nominal) {
        if (nominal <= saldo) {
            saldo -= nominal;
            cout << "Berhasil tarik: Rp " << nominal << endl;
        } else {
            cout << "Gagal tarik: Saldo tidak mencukupi!" << endl;
        }
    }

    // Method untuk Menampilkan Info
    void cetakInfo() {
        cout << "-----------------------------------" << endl;
        cout << "No Rekening : " << nomorRekening << endl;
        cout << "Pemilik     : " << pemilik << endl;
        cout << "Saldo Akhir : Rp " << saldo << endl;
        cout << "-----------------------------------" << endl;
    }
};

int main() {
    // 1. Menggunakan Struct
    Mahasiswa mhs1 = {"240101", "Budi Pratama", 3.89};
    cout << "=== DATA MAHASISWA (STRUCT) ===" << endl;
    cout << "NIM  : " << mhs1.nim << endl;
    cout << "Nama : " << mhs1.nama << endl;
    cout << "IPK  : " << mhs1.ipk << endl;

    // 2. Menggunakan Class & Object
    cout << "\n=== SIMULASI REKENING BANK (OOP) ===" << endl;
    RekeningBank akun("1002-3849", "Budi Pratama", 500000);
    akun.cetakInfo();

    akun.setor(250000);
    akun.tarik(100000);
    akun.tarik(900000); // Harus gagal karena saldo kurang
    
    akun.cetakInfo();

    return 0;
}`,
            expectedOutput: `=== DATA MAHASISWA (STRUCT) ===
NIM  : 240101
Nama : Budi Pratama
IPK  : 3.89

=== SIMULASI REKENING BANK (OOP) ===
-----------------------------------
No Rekening : 1002-3849
Pemilik     : Budi Pratama
Saldo Akhir : Rp 500000
-----------------------------------
Berhasil setor: Rp 250000
Berhasil tarik: Rp 100000
Gagal tarik: Saldo tidak mencukupi!
-----------------------------------
No Rekening : 1002-3849
Pemilik     : Budi Pratama
Saldo Akhir : Rp 650000
-----------------------------------`,
            explanation: [
              "Struct mengelompokkan data NIM, Nama, dan IPK dalam satu tipe baru 'Mahasiswa'.",
              "Class 'RekeningBank' mengenkapsulasi data 'saldo' di bagian private sehingga aman dari modifikasi liar.",
              "Transaksi uang hanya dapat dilakukan melalui method 'setor()' dan 'tarik()' yang memiliki validasi logika.",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        id: "q-10-1",
        question: "Apa fungsi utama dari access specifier 'private' pada sebuah class di C++?",
        options: [
          "Membuat fungsi berjalan lebih cepat",
          "Membatasi akses data agar hanya bisa dimodifikasi dari dalam class itu sendiri (Encapsulation)",
          "Menghapus variabel setelah fungsi selesai",
          "Mengizinkan akses dari semua file eksternal"
        ],
        correctOptionIndex: 1,
        explanation: "'private' menyembunyikan data internal dari akses luar langsung guna menjaga integritas dan keamanan data (Enkapsulasi).",
      },
      {
        id: "q-10-2",
        question: "Fungsi khusus yang memiliki nama sama persis dengan nama class dan dipanggil otomatis saat objek dibuat disebut...",
        options: ["Destructor", "Constructor", "Main function", "Pointer method"],
        correctOptionIndex: 1,
        explanation: "Constructor adalah fungsi khusus inisialisasi objek yang dieksekusi secara otomatis saat instansiasi.",
      },
    ],
    starterSnippet: {
      id: "snip-bab-10",
      title: "Class Persegi Panjang OOP",
      category: "Bab 10",
      description: "Membuat class PersegiPanjang dengan method hitungLuas() dan hitungKeliling().",
      code: `#include <iostream>
using namespace std;

class PersegiPanjang {
private:
    double panjang;
    double lebar;

public:
    // Constructor
    PersegiPanjang(double p, double l) {
        panjang = p;
        lebar = l;
    }

    double getLuas() {
        return panjang * lebar;
    }

    double getKeliling() {
        return 2 * (panjang + lebar);
    }
};

int main() {
    PersegiPanjang pp(10.0, 5.0);
    cout << "Luas Persegi Panjang     : " << pp.getLuas() << endl;
    cout << "Keliling Persegi Panjang : " << pp.getKeliling() << endl;
    return 0;
}`,
    },
  },
];
