import { CodeSnippet } from "../types";

export const PRESET_SNIPPETS: CodeSnippet[] = [
  {
    id: "snip-hello",
    title: "1. Hello World Modern",
    category: "Dasar",
    description: "Program C++ standar pembuka dengan output konsol dan manipulasi baris.",
    code: `#include <iostream>
#include <string>

using namespace std;

int main() {
    string pesan = "Selamat datang di C++ Compiler Online!";
    cout << "========================================" << endl;
    cout << pesan << endl;
    cout << "Kompiler: GCC C++17 / C++20 Ready" << endl;
    cout << "========================================" << endl;
    return 0;
}`,
  },
  {
    id: "snip-calculator",
    title: "2. Kalkulator Interaktif",
    category: "I/O & Operator",
    description: "Membaca dua bilangan dan operator matematika dari stdin.",
    defaultStdin: "25\n4\n*",
    code: `#include <iostream>
using namespace std;

int main() {
    double a, b;
    char op;

    cout << "Masukkan angka pertama: ";
    if (!(cin >> a)) return 0;
    
    cout << "Masukkan angka kedua: ";
    if (!(cin >> b)) return 0;
    
    cout << "Masukkan operator (+, -, *, /): ";
    if (!(cin >> op)) return 0;

    cout << "\n=== HASIL PERHITUNGAN ===" << endl;
    switch (op) {
        case '+': cout << a << " + " << b << " = " << (a + b) << endl; break;
        case '-': cout << a << " - " << b << " = " << (a - b) << endl; break;
        case '*': cout << a << " * " << b << " = " << (a * b) << endl; break;
        case '/':
            if (b != 0) cout << a << " / " << b << " = " << (a / b) << endl;
            else cout << "Error: Pembagian dengan nol!" << endl;
            break;
        default: cout << "Operator tidak valid!" << endl;
    }
    return 0;
}`,
  },
  {
    id: "snip-prime",
    title: "3. Generator Bilangan Prima (Sieve)",
    category: "Looping & Array",
    description: "Mencari seluruh bilangan prima hingga N dengan algoritma efisien.",
    defaultStdin: "50",
    code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int limit = 50;
    cout << "Mencari bilangan prima hingga " << limit << "..." << endl;

    vector<bool> isPrime(limit + 1, true);
    isPrime[0] = isPrime[1] = false;

    for (int p = 2; p * p <= limit; p++) {
        if (isPrime[p]) {
            for (int i = p * p; i <= limit; i += p) {
                isPrime[i] = false;
            }
        }
    }

    cout << "Daftar Bilangan Prima:" << endl;
    int count = 0;
    for (int i = 2; i <= limit; i++) {
        if (isPrime[i]) {
            cout << i << " ";
            count++;
        }
    }
    cout << "\nTotal ditemukan: " << count << " bilangan prima." << endl;
    return 0;
}`,
  },
  {
    id: "snip-sort",
    title: "4. Bubble Sort & Binary Search",
    category: "Algoritma",
    description: "Mengurutkan array dan melakukan pencarian data cepat.",
    code: `#include <iostream>
using namespace std;

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

int main() {
    int data[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(data) / sizeof(data[0]);

    cout << "Data Awal   : ";
    for (int i = 0; i < n; i++) cout << data[i] << " ";
    cout << endl;

    bubbleSort(data, n);

    cout << "Hasil Sort  : ";
    for (int i = 0; i < n; i++) cout << data[i] << " ";
    cout << endl;

    return 0;
}`,
  },
  {
    id: "snip-struct-oop",
    title: "5. OOP: Class Mobil & Kecepatan",
    category: "OOP",
    description: "Demonstrasi Class, Enkapsulasi, Constructor, dan Method.",
    code: `#include <iostream>
#include <string>
using namespace std;

class Mobil {
private:
    string merk;
    int kecepatan;

public:
    Mobil(string m) {
        merk = m;
        kecepatan = 0;
    }

    void gas(int kenaikan) {
        kecepatan += kenaikan;
        cout << merk << " menambah kecepatan +" << kenaikan << " km/jam." << endl;
    }

    void rem(int penurunan) {
        kecepatan = max(0, kecepatan - penurunan);
        cout << merk << " mengerem -" << penurunan << " km/jam." << endl;
    }

    void cekSpeedometer() {
        cout << ">> Speedometer " << merk << ": " << kecepatan << " km/jam" << endl;
    }
};

int main() {
    Mobil mobilSport("Supra MK4");
    mobilSport.cekSpeedometer();
    mobilSport.gas(60);
    mobilSport.gas(40);
    mobilSport.cekSpeedometer();
    mobilSport.rem(30);
    mobilSport.cekSpeedometer();
    return 0;
}`,
  },
];
