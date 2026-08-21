import { PracticeChallenge } from "../types";

export const PRACTICE_CHALLENGES: PracticeChallenge[] = [
  {
    id: "chal-1",
    number: 1,
    title: "1. Konversi Suhu Celsius ke Fahrenheit",
    difficulty: "Mudah",
    category: "Variabel & Rumus",
    xp: 50,
    description: `Buatlah program C++ yang membaca satu bilangan desimal (float/double) berupa suhu dalam derajat **Celsius**, kemudian menghitung dan mencetak hasil konversinya ke **Fahrenheit**.

**Rumus:**
$$Fahrenheit = (Celsius \\times \\frac{9}{5}) + 32$$

Format output harus mencetak angka Fahrenheit (gunakan tipe double).`,
    inputFormat: "Satu angka desimal Celsius (misal: 100 atau 37.5)",
    outputFormat: "Cetak nilai Fahrenheit hasil konversi.",
    starterCode: `#include <iostream>
using namespace std;

int main() {
    double celsius;
    // Baca input dari pengguna
    if (cin >> celsius) {
        // Tulis logika konversi Anda di sini
        double fahrenheit = (celsius * 9.0 / 5.0) + 32.0;
        
        // Cetak output
        cout << fahrenheit << endl;
    }
    return 0;
}`,
    solutionCode: `#include <iostream>
using namespace std;

int main() {
    double celsius;
    cin >> celsius;
    double fahrenheit = (celsius * 9.0 / 5.0) + 32.0;
    cout << fahrenheit << endl;
    return 0;
}`,
    hint: "Ingat untuk menggunakan '9.0 / 5.0' bukan '9 / 5' agar pembagian tidak terpotong menjadi 1 karena integer division!",
    testCases: [
      {
        id: "tc-1-1",
        input: "0",
        expectedOutput: "32",
        description: "Uji coba titik beku air (0°C = 32°F)",
      },
      {
        id: "tc-1-2",
        input: "100",
        expectedOutput: "212",
        description: "Uji coba titik didih air (100°C = 212°F)",
      },
      {
        id: "tc-1-3",
        input: "37",
        expectedOutput: "98.6",
        description: "Uji coba suhu tubuh normal (37°C = 98.6°F)",
      },
    ],
  },
  {
    id: "chal-2",
    number: 2,
    title: "2. Cek Bilangan Positif, Negatif atau Nol",
    difficulty: "Mudah",
    category: "Percabangan",
    xp: 60,
    description: `Diberikan sebuah bilangan bulat $N$. Buatlah program untuk memeriksa status bilangan tersebut:
- Jika $N > 0$, cetak \`POSITIF\`
- Jika $N < 0$, cetak \`NEGATIF\`
- Jika $N == 0$, cetak \`NOL\``,
    inputFormat: "Satu bilangan bulat N",
    outputFormat: "Satu kata: POSITIF, NEGATIF, atau NOL",
    starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    // Tulis kode if-else Anda di sini
    
    return 0;
}`,
    solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    if (n > 0) {
        cout << "POSITIF" << endl;
    } else if (n < 0) {
        cout << "NEGATIF" << endl;
    } else {
        cout << "NOL" << endl;
    }
    return 0;
}`,
    hint: "Gunakan struktur if-else if-else bertingkat.",
    testCases: [
      { id: "tc-2-1", input: "15", expectedOutput: "POSITIF", description: "Angka positif" },
      { id: "tc-2-2", input: "-42", expectedOutput: "NEGATIF", description: "Angka negatif" },
      { id: "tc-2-3", input: "0", expectedOutput: "NOL", description: "Angka nol" },
    ],
  },
  {
    id: "chal-3",
    number: 3,
    title: "3. Penjumlahan Deret Bilangan 1 sampai N",
    difficulty: "Mudah",
    category: "Perulangan",
    xp: 75,
    description: `Diberikan bilangan bulat positif $N$. Hitunglah jumlah total dari seluruh bilangan dari $1$ sampai $N$ ($1 + 2 + 3 + ... + N$).`,
    inputFormat: "Satu bilangan bulat N (1 <= N <= 1000)",
    outputFormat: "Cetak hasil total penjumlahan.",
    starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    long long total = 0;
    // Gunakan for loop untuk menjumlahkan
    
    cout << total << endl;
    return 0;
}`,
    solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    long long total = 0;
    for (int i = 1; i <= n; i++) {
        total += i;
    }
    cout << total << endl;
    return 0;
}`,
    hint: "Gunakan variabel akumulator 'total = 0' dan loop 'for (int i = 1; i <= n; i++) total += i;'",
    testCases: [
      { id: "tc-3-1", input: "5", expectedOutput: "15", description: "1+2+3+4+5 = 15" },
      { id: "tc-3-2", input: "10", expectedOutput: "55", description: "1 s/d 10 = 55" },
      { id: "tc-3-3", input: "100", expectedOutput: "5050", description: "1 s/d 100 = 5050" },
    ],
  },
  {
    id: "chal-4",
    number: 4,
    title: "4. Pola Persegi Bintang N x N",
    difficulty: "Sedang",
    category: "Nested Loop",
    xp: 90,
    description: `Diberikan sebuah bilangan bulat $N$. Cetaklah pola persegi bintang berukuran $N \\times N$. Setiap bintang dipisahkan oleh spasi.

Contoh untuk $N = 3$:
\`\`\`
* * *
* * *
* * *
\`\`\``,
    inputFormat: "Satu bilangan bulat positif N",
    outputFormat: "Pola persegi bintang N baris dan N kolom",
    starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    // Tulis nested loop untuk mencetak pola
    
    return 0;
}`,
    solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            cout << "* ";
        }
        cout << endl;
    }
    return 0;
}`,
    hint: "Gunakan dua loop for: loop luar untuk baris dan loop dalam untuk kolom.",
    testCases: [
      {
        id: "tc-4-1",
        input: "3",
        expectedOutput: "* * * \n* * * \n* * * ",
        description: "Persegi 3x3",
      },
      {
        id: "tc-4-2",
        input: "2",
        expectedOutput: "* * \n* * ",
        description: "Persegi 2x2",
      },
    ],
  },
  {
    id: "chal-5",
    number: 5,
    title: "5. Cari Nilai Terbesar dalam Array",
    difficulty: "Sedang",
    category: "Array 1D",
    xp: 100,
    description: `Diberikan $N$ buah bilangan bulat. Buatlah program untuk mencari dan mencetak **nilai maksimum (terbesar)** di antara bilangan-bilangan tersebut.

Baris pertama berisi $N$ (jumlah angka), baris kedua berisi $N$ buah angka.`,
    inputFormat: "N kemudian diikuti N buah bilangan bulat.",
    outputFormat: "Satu angka yang merupakan nilai terbesar.",
    starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    if (!(cin >> n) || n <= 0) return 0;
    
    int angka[n];
    for (int i = 0; i < n; i++) {
        cin >> angka[i];
    }
    
    // Cari nilai terbesar
    int maxVal = angka[0];
    for (int i = 1; i < n; i++) {
        if (angka[i] > maxVal) {
            maxVal = angka[i];
        }
    }
    
    cout << maxVal << endl;
    return 0;
}`,
    solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    int maxVal;
    cin >> maxVal;
    for (int i = 1; i < n; i++) {
        int x;
        cin >> x;
        if (x > maxVal) maxVal = x;
    }
    cout << maxVal << endl;
    return 0;
}`,
    hint: "Inisialisasi variabel maxVal dengan elemen pertama, lalu periksa setiap elemen lainnya dengan if (angka[i] > maxVal).",
    testCases: [
      {
        id: "tc-5-1",
        input: "5\n12 45 7 89 23",
        expectedOutput: "89",
        description: "Mencari max dari [12, 45, 7, 89, 23]",
      },
      {
        id: "tc-5-2",
        input: "4\n-10 -5 -20 -2",
        expectedOutput: "-2",
        description: "Mencari max dengan angka negatif",
      },
    ],
  },
  {
    id: "chal-6",
    number: 6,
    title: "6. Fungsi Hitung Faktorial",
    difficulty: "Sedang",
    category: "Fungsi & Rekursi",
    xp: 110,
    description: `Buatlah sebuah fungsi bernama \`hitungFaktorial(int n)\` yang menerima parameter bilangan bulat $n$ ($0 \\le n \\le 15$) dan mengembalikan nilai faktorialnya ($n! = n \\times (n-1) \\times ... \\times 1$). Catatan: $0! = 1$.`,
    inputFormat: "Satu bilangan bulat non-negatif N",
    outputFormat: "Hasil nilai faktorial",
    starterCode: `#include <iostream>
using namespace std;

// Buat fungsi faktorial di sini
long long hitungFaktorial(int n) {
    if (n <= 1) return 1;
    return n * hitungFaktorial(n - 1);
}

int main() {
    int n;
    if (cin >> n) {
        cout << hitungFaktorial(n) << endl;
    }
    return 0;
}`,
    solutionCode: `#include <iostream>
using namespace std;

long long hitungFaktorial(int n) {
    if (n <= 1) return 1;
    return n * hitungFaktorial(n - 1);
}

int main() {
    int n;
    cin >> n;
    cout << hitungFaktorial(n) << endl;
    return 0;
}`,
    hint: "Base case: jika n <= 1 return 1. Recursive case: return n * hitungFaktorial(n-1).",
    testCases: [
      { id: "tc-6-1", input: "0", expectedOutput: "1", description: "0! = 1" },
      { id: "tc-6-2", input: "5", expectedOutput: "120", description: "5! = 120" },
      { id: "tc-6-3", input: "7", expectedOutput: "5040", description: "7! = 5040" },
    ],
  },
];
