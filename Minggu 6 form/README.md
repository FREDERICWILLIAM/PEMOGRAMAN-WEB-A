# Laporan Praktikum Pemrograman Berbasis Web - Modul 6
## Jawaban Latihan Soal Evaluasi Mandiri

**Nama:** Frederic William Parengkuan Sambe  
**NIM:** 255314029  
**Program Studi:** Informatika  

---

## Daftar Jawaban Evaluasi Mandiri

**1. Jelaskan mengapa validasi client-side tidak boleh menjadi satu-satunya lapisan validasi pada aplikasi web[cite: 3].**  
*Jawaban:* Validasi pada sisi klien (*client-side*) tidak boleh dijadikan sebagai satu-satunya sistem pengaman karena sangat mudah untuk dilewati atau dimanipulasi oleh pengguna, seperti melalui penonaktifan skrip JavaScript atau penggunaan *Developer Tools* pada peramban web[cite: 3]. Oleh karena itu, validasi pada sisi peladen (*server-side*) mutlak diperlukan untuk menjamin integritas data dan keamanan sistem secara menyeluruh[cite: 3].

**2. Sebutkan minimal tiga atribut validasi bawaan HTML5 beserta fungsinya masing-masing[cite: 3].**  
*Jawaban:*  
- **`required`**: Memastikan bahwa suatu elemen masukan wajib diisi dan tidak boleh dibiarkan kosong[cite: 3].
- **`minlength`**: Menentukan batasan jumlah karakter minimal yang harus dimasukkan oleh pengguna[cite: 3].
- **`maxlength`**: Menetapkan batasan jumlah karakter maksimal yang diizinkan pada suatu elemen masukan[cite: 3].

**3. Jelaskan perbedaan antara `input.checkValidity()` dan `input.reportValidity()`[cite: 3].**  
*Jawaban:*  
- **`input.checkValidity()`**: Berfungsi untuk memeriksa status validitas elemen secara pasif dan mengembalikan nilai boolean (`true` atau `false`) tanpa memunculkan pesan kesalahan visual secara otomatis[cite: 3].
- **`input.reportValidity()`**: Berfungsi untuk melakukan pemeriksaan sekaligus secara aktif menampilkan pesan peringatan (*validation tooltip*) bawaan peramban kepada pengguna jika elemen tidak valid[cite: 3].

**4. Apa fungsi `setCustomValidity("")` (string kosong), dan mengapa penting memanggilnya kembali setelah error diperbaiki[cite: 3]?**  
*Jawaban:* Fungsi `setCustomValidity("")` dengan argumen berupa *string* kosong digunakan untuk menghapus atau mereset pesan kesalahan kustom yang sebelumnya telah ditetapkan pada suatu elemen input[cite: 3]. Pemanggilan ini sangat penting dilakukan setelah pengguna memperbaiki data, karena peramban akan terus menganggap elemen tersebut berada dalam status tidak valid selama pesan kesalahan kustom masih bernilai teks[cite: 3].

**5. Rancang aturan validasi (beserta pseudocode) agar field “Tanggal Lahir” tidak boleh berada di masa depan[cite: 3].**  
*Jawaban:*  
- **Aturan Validasi:** Nilai tanggal yang dimasukkan oleh pengguna harus divalidasi terhadap tanggal aktual saat ini. Jika nilai input tanggal lahir melebihi tanggal hari ini, maka sistem wajib menyatakan data tersebut tidak valid[cite: 3].
- **Pseudocode:**
  ```text
  MULAI
      Ambil elemen input "tanggal-lahir"
      Dapatkan tanggal aktual hari ini (Current Date)
      
      KETIKA terjadi perubahan nilai pada input "tanggal-lahir":
          JIKA nilai input tanggal lahir > tanggal hari ini MAKA
              Panggil input.setCustomValidity("Tanggal lahir tidak boleh berada di masa depan")
          SEBALIKNYA
              Panggil input.setCustomValidity("")
          AKHIR JIKA
      AKHIR KETIKA
  SELESAI
  ```[cite: 3]

---
*© 2026 Frederic William Parengkuan Sambe*