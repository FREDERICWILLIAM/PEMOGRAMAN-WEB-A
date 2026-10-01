// ==========================================
// KODE MODUL 4: Dark Mode & Aside
// ==========================================
const tombolTema = document.querySelector("#btn-tema");
tombolTema.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

const tombolInfo = document.querySelector("#btn-info");
const kotakAside = document.querySelector("aside");
tombolInfo.addEventListener("click", () => {
    kotakAside.classList.toggle("tersembunyi");
});

// ==========================================
// KODE MODUL 4 & 5: Render Artikel, Hover, & Like
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

    // Tombol Like (Modul 5)
    const tombolLike = document.createElement("button");
    tombolLike.textContent = "Like (0)";
    tombolLike.dataset.like = 0; 
    tombolLike.style.marginRight = "10px";
    tombolLike.style.background = "#10b981";
    tombolLike.style.color = "white";
    article.appendChild(tombolLike);

    // Tombol Hapus
    const tombolHapus = document.createElement("button");
    tombolHapus.textContent = "Hapus";
    tombolHapus.style.background = "#ef4444";
    tombolHapus.style.color = "white";
    article.appendChild(tombolHapus);

    containerArtikel.appendChild(article);
});

// Efek Hover (Modul 5)
containerArtikel.addEventListener("mouseover", (e) => {
    const article = e.target.closest("article");
    if (article) article.classList.add("artikel-hover");
});
containerArtikel.addEventListener("mouseout", (e) => {
    const article = e.target.closest("article");
    if (article) article.classList.remove("artikel-hover");
});

// Event Delegation: Hapus & Like (Modul 5)
containerArtikel.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        if (e.target.textContent === "Hapus") {
            e.target.closest("article").remove();
        } else if (e.target.textContent.startsWith("Like")) {
            let jumlah = parseInt(e.target.dataset.like || 0);
            jumlah++;
            e.target.dataset.like = jumlah;
            e.target.textContent = `Like (${jumlah})`;
        }
    }
});

// ==========================================
// KODE MODUL 5: Form Komentar (Event Submit)
// ==========================================
const formKomentar = document.querySelector("#form-komentar");
const daftarKomentar = document.querySelector("#daftar-komentar");
const pesanError = document.querySelector("#pesan-error");

formKomentar.addEventListener("submit", (e) => {
    e.preventDefault(); // Mencegah halaman reload
    
    const nama = document.querySelector("#input-nama").value.trim();
    const pesan = document.querySelector("#input-pesan").value.trim();

    // Validasi Tugas Mandiri (Minimal 5 Karakter)
    if (nama === "" || pesan === "") {
        pesanError.textContent = "Nama dan komentar wajib diisi!";
        pesanError.style.display = "block";
        return;
    }
    if (pesan.length < 5) {
        pesanError.textContent = "Komentar terlalu pendek (minimal 5 karakter)!";
        pesanError.style.display = "block";
        return;
    }
    
    pesanError.style.display = "none"; // Sembunyikan error jika berhasil

    // Render Komentar ke DOM
    const itemKomentar = document.createElement("li");
    const teksKomentar = document.createElement("span");
    teksKomentar.innerHTML = `<strong>${nama}</strong>: ${pesan}`;
    
    // Tombol hapus masing-masing komentar (Tugas Mandiri)
    const btnHapusKomentar = document.createElement("button");
    btnHapusKomentar.textContent = "Hapus";
    btnHapusKomentar.style.background = "#ef4444";
    btnHapusKomentar.style.color = "white";
    btnHapusKomentar.style.marginBottom = "0";

    itemKomentar.appendChild(teksKomentar);
    itemKomentar.appendChild(btnHapusKomentar);
    daftarKomentar.appendChild(itemKomentar);

    formKomentar.reset();
});

// Hapus Semua Komentar (Tugas Mandiri)
document.querySelector("#btn-hapus-semua").addEventListener("click", () => {
    daftarKomentar.innerHTML = "";
});

// Event Delegation Hapus Spesifik Komentar (Tugas Mandiri)
daftarKomentar.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        e.target.closest("li").remove();
    }
});

// ==========================================
// KODE MODUL 5: Keyboard Shortcut & Scroll
// ==========================================
document.addEventListener("keydown", (e) => {
    const tagFokus = e.target.tagName.toLowerCase();
    // Abaikan jika sedang mengetik di dalam form
    if (tagFokus === 'input' || tagFokus === 'textarea') return;

    if (e.key.toLowerCase() === "d") {
        document.body.classList.toggle("dark-mode");
    }
});

const btnScrollTop = document.querySelector("#btn-scroll-top");
window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
        btnScrollTop.classList.remove("tersembunyi");
    } else {
        btnScrollTop.classList.add("tersembunyi");
    }
});
btnScrollTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// ==========================================
// MODUL 4: Tugas Portofolio
// ==========================================
const containerPortofolio = document.querySelector("#container-portofolio");
let counterPorto = 1;

document.querySelector("#btn-tambah-porto").addEventListener("click", () => {
    const article = document.createElement("article");
    const judul = document.createElement("h4");
    judul.textContent = "Proyek Baru " + counterPorto;
    
    const btnHapusPorto = document.createElement("button");
    btnHapusPorto.textContent = "Hapus Proyek";
    btnHapusPorto.style.background = "#ef4444";
    btnHapusPorto.style.color = "white";
    
    article.appendChild(judul);
    article.appendChild(btnHapusPorto);
    containerPortofolio.appendChild(article);
    counterPorto++;
});

containerPortofolio.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        e.target.closest("article").remove();
    }
});