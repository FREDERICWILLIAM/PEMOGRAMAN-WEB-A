// ==========================================
// LANGKAH 1: Variabel dan Seleksi Elemen Dasar
// ==========================================
const judulSitus = document.querySelector("header h1");
console.log(judulSitus);
console.log(judulSitus.textContent);

// ==========================================
// LANGKAH 2: Fungsi dan Tombol Dark Mode
// ==========================================
const tombolTema = document.querySelector("#btn-tema");
function toggleTema() {
    document.body.classList.toggle("dark-mode");
}
tombolTema.addEventListener("click", toggleTema);

// ==========================================
// LANGKAH 3: Tombol Tampilkan/Sembunyikan Aside
// ==========================================
const tombolInfo = document.querySelector("#btn-info");
const kotakAside = document.querySelector("aside");

tombolInfo.addEventListener("click", () => {
    kotakAside.classList.toggle("tersembunyi");
});

// ==========================================
// LANGKAH 4: Render Daftar Artikel (Hobi)
// ==========================================
const daftarArtikel = [
    { judul: "1. Bermain Basket", isi: "Olahraga dan menjaga kebugaran fisik." },
    { judul: "2. Bermain Game", isi: "Hiburan dan melatih ketangkasan strategi." },
    { judul: "3. Mendengarkan Musik", isi: "Aktivitas pendukung untuk menjaga fokus dan ketenangan saat belajar." },
    { judul: "4. Menonton Film", isi: "Sarana hiburan dan penyegaran pikiran di waktu luang." }
];

const containerArtikel = document.querySelector(".daftar-artikel");

daftarArtikel.forEach((data) => {
    const article = document.createElement("article");
    
    const judul = document.createElement("h4");
    judul.textContent = data.judul;
    
    const isi = document.createElement("p");
    isi.textContent = data.isi;

    article.appendChild(judul);
    article.appendChild(isi);

    // ==========================================
    // LANGKAH 5: Tombol Hapus Artikel per Item
    // ==========================================
    const tombolHapus = document.createElement("button");
    tombolHapus.textContent = "Hapus";
    article.appendChild(tombolHapus);

    containerArtikel.appendChild(article);
});

// Event delegation pada container hobi
containerArtikel.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        e.target.closest("article").remove();
    }
});

// ==========================================
// TUGAS PRAKTIKUM MANDIRI: PORTOFOLIO
// ==========================================
const dataPortofolio = [
    { pengalaman: "Java", deskripsi: "Pengalaman belajar dasar pemrograman berorientasi objek." },
    { pengalaman: "Python", deskripsi: "Pengalaman menggunakan pemrograman untuk berbagai studi kasus." }
];

const containerPortofolio = document.querySelector("#container-portofolio");

function buatItemPortofolio(data) {
    const article = document.createElement("article");
    
    const judul = document.createElement("h4");
    judul.textContent = data.pengalaman;
    
    const isi = document.createElement("p");
    isi.textContent = data.deskripsi;

    const tombolHapusPorto = document.createElement("button");
    tombolHapusPorto.textContent = "Hapus Portofolio";

    article.appendChild(judul);
    article.appendChild(isi);
    article.appendChild(tombolHapusPorto);

    if(containerPortofolio) {
        containerPortofolio.appendChild(article);
    }
}

// Render data awal portofolio
dataPortofolio.forEach(buatItemPortofolio);

// Tombol tambah portofolio dinamis
const btnTambahPorto = document.querySelector("#btn-tambah-porto");
let counter = 1;

if(btnTambahPorto) {
    btnTambahPorto.addEventListener("click", () => {
        buatItemPortofolio({
            pengalaman: "Proyek Baru " + counter,
            deskripsi: "Deskripsi pengalaman atau tugas yang baru ditambahkan secara dinamis."
        });
        counter++;
    });
}

// Event delegation untuk hapus portofolio
if(containerPortofolio) {
    containerPortofolio.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            e.target.closest("article").remove();
        }
    });
}