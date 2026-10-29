// ==========================================
// FUNGSI KEAMANAN DATA (Mencegah Crash)
// ==========================================
function getKomentarAman() {
    try {
        const data = JSON.parse(localStorage.getItem("komentar"));
        return Array.isArray(data) ? data : []; 
    } catch (e) {
        return [];
    }
}

function getLikeAman() {
    try {
        const data = JSON.parse(localStorage.getItem("dataLike"));
        return (data && typeof data === 'object' && !Array.isArray(data)) ? data : {};
    } catch (e) {
        return {};
    }
}

// ==========================================
// TEMA & ASIDE (Modul 3 & 7)
// ==========================================
const tombolTema = document.querySelector("#btn-tema");

function toggleTema() {
    document.body.classList.toggle("dark-mode");
    const temaSekarang = document.body.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem("tema", temaSekarang);
}

if (localStorage.getItem("tema") === "dark") {
    document.body.classList.add("dark-mode");
}

if (tombolTema) {
    tombolTema.addEventListener("click", toggleTema);
}

const tombolInfo = document.querySelector("#btn-info");
const kotakAside = document.querySelector("aside");

if (kotakAside && localStorage.getItem("asideSembunyi") === "true") {
    kotakAside.classList.add("tersembunyi");
}

if (tombolInfo && kotakAside) {
    tombolInfo.addEventListener("click", () => {
        kotakAside.classList.toggle("tersembunyi");
        localStorage.setItem("asideSembunyi", kotakAside.classList.contains("tersembunyi"));
    });
}

// ==========================================
// ARTIKEL HOBI & LIKE (Modul 4, 5, 7, & Modul 8)
// ==========================================
const containerArtikel = document.querySelector(".daftar-artikel");

// =========================================================================
// [MODUL 8: FETCH API & JSON] — 1. PERSIAPAN ENDPOINT API & ELEMEN LOADING
// FUNGSI: Menentukan URL server REST API publik (JSONPlaceholder) dan
// mengambil elemen penanda loading dari HTML.
// =========================================================================
const BASE_URL = "https://jsonplaceholder.typicode.com";
const textLoading = document.querySelector("#loading");

if (containerArtikel) {
    const dataLike = getLikeAman();

    // =========================================================================
    // [MODUL 8: FETCH API & JSON] — 2. FUNGSI ASYNCHRONOUS PENGAMBILAN DATA
    // FUNGSI: Mengambil data dari server secara asynchronous (di latar belakang),
    // mengonversi response JSON menjadi Objek JS, dan merender artikel ke DOM.
    // =========================================================================
    async function muatDataDariAPI() {
        // FUNGSI: Menampilkan indikator loading saat permintaan HTTP dimulai
        if (textLoading) textLoading.style.display = "block";
        
        try {
            // FUNGSI: Mengirim GET request ke API menggunakan fetch() dan 'await'
            const response = await fetch(BASE_URL + "/posts?_limit=4");
            
            // FUNGSI: Memeriksa apakah status HTTP merespons sukses (HTTP 200-299)
            if (!response.ok) throw new Error("Gagal load API: " + response.status);
            
            // FUNGSI: Parsing/mengubah format teks JSON dari server menjadi Objek JavaScript
            const dataPosts = await response.json();
            
            // FUNGSI: Mengosongkan kontainer sebelum merender data baru
            containerArtikel.innerHTML = ""; 

            // FUNGSI: Iterasi array objek hasil API untuk membentuk elemen HTML secara dinamis
            dataPosts.forEach((post) => {
                const article = document.createElement("article");
                
                // FUNGSI: Membaca properti .title dan .body hasil dari JSON API
                const judul = document.createElement("h4");
                judul.textContent = post.title; 
                
                const isi = document.createElement("p");
                isi.textContent = post.body; 

                article.appendChild(judul);
                article.appendChild(isi);

                // --- Fitur Tombol Like (Tetap mempertahankan logika Modul 4 & 7) ---
                const tombolLike = document.createElement("button");
                let jumlahLike = dataLike[post.title] || 0; 
                tombolLike.textContent = `Like (${jumlahLike})`;
                tombolLike.dataset.like = jumlahLike; 
                
                tombolLike.style.marginRight = "10px";
                tombolLike.style.background = "#10b981";
                tombolLike.style.color = "white";
                article.appendChild(tombolLike);

                // --- Fitur Tombol Hapus (Tetap mempertahankan logika Modul 3 & 4) ---
                const tombolHapus = document.createElement("button");
                tombolHapus.textContent = "Hapus";
                tombolHapus.style.background = "#ef4444";
                tombolHapus.style.color = "white";
                article.appendChild(tombolHapus);

                containerArtikel.appendChild(article);
            });
        } catch (error) {
            // FUNGSI: Menangkap error jika koneksi terputus / server bermasalah
            containerArtikel.innerHTML = `<p style="color: red;">Terjadi kesalahan: ${error.message}</p>`;
        } finally {
            // FUNGSI: Sembunyikan indikator loading setelah proses fetch selesai
            if (textLoading) textLoading.style.display = "none";
        }
    }

    // =========================================================================
    // [MODUL 8: FETCH API & JSON] — 3. PEMANGGILAN FUNGSI
    // FUNGSI: Memicu eksekusi pengambilan data dari API secara otomatis saat file JS dimuat.
    // =========================================================================
    muatDataDariAPI();
    // =========================================================================
    // [AKHIR MODUL 8]
    // =========================================================================

    // Event Delegation untuk Hover & Interaksi Tombol (Modul 4)
    containerArtikel.addEventListener("mouseover", (e) => {
        const article = e.target.closest("article");
        if (article) article.classList.add("artikel-hover");
    });
    
    containerArtikel.addEventListener("mouseout", (e) => {
        const article = e.target.closest("article");
        if (article) article.classList.remove("artikel-hover");
    });

    containerArtikel.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            if (e.target.textContent === "Hapus") {
                e.target.closest("article").remove();
            } else if (e.target.textContent.startsWith("Like")) {
                let jumlah = parseInt(e.target.dataset.like || 0);
                jumlah++;
                e.target.dataset.like = jumlah;
                e.target.textContent = `Like (${jumlah})`;
                
                const judulArtikel = e.target.closest("article").querySelector("h4").textContent;
                const simpananLike = getLikeAman();
                simpananLike[judulArtikel] = jumlah;
                localStorage.setItem("dataLike", JSON.stringify(simpananLike));
            }
        }
    });
}

// ==========================================
// FORM KOMENTAR & STORAGE (Modul 5 & 7)
// ==========================================
const formKomentar = document.querySelector("#form-komentar");
const inputNamaElemen = document.querySelector("#input-nama");
const inputPesanElemen = document.querySelector("#input-pesan");
const daftarKomentar = document.querySelector("#daftar-komentar");
const pesanError = document.querySelector("#pesan-error");

if (inputNamaElemen && inputPesanElemen) {
    inputNamaElemen.value = sessionStorage.getItem("draftNama") || "";
    inputPesanElemen.value = sessionStorage.getItem("draftPesan") || "";

    inputNamaElemen.addEventListener("input", () => sessionStorage.setItem("draftNama", inputNamaElemen.value));
    inputPesanElemen.addEventListener("input", () => sessionStorage.setItem("draftPesan", inputPesanElemen.value));
}

function renderKomentar() {
    if (!daftarKomentar) return; 
    
    daftarKomentar.innerHTML = ""; 
    const dataKomentar = getKomentarAman();
    
    dataKomentar.forEach((k, index) => {
        const itemKomentar = document.createElement("li");
        const teksKomentar = document.createElement("span");
        teksKomentar.innerHTML = `<strong>${k.nama}</strong>: ${k.pesan}`;
        
        const btnHapusKomentar = document.createElement("button");
        btnHapusKomentar.textContent = "Hapus";
        btnHapusKomentar.style.background = "#ef4444";
        btnHapusKomentar.style.color = "white";
        btnHapusKomentar.style.marginLeft = "10px";
        btnHapusKomentar.dataset.index = index; 

        itemKomentar.appendChild(teksKomentar);
        itemKomentar.appendChild(btnHapusKomentar);
        daftarKomentar.appendChild(itemKomentar);
    });
}

// Panggil pertama kali saat web diload
renderKomentar(); 

if (formKomentar) {
    formKomentar.addEventListener("submit", (e) => {
        e.preventDefault(); 
        
        const nama = inputNamaElemen.value.trim();
        const pesan = inputPesanElemen.value.trim();

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
        
        pesanError.style.display = "none";

        const dataKomentar = getKomentarAman();
        dataKomentar.push({ nama, pesan });
        localStorage.setItem("komentar", JSON.stringify(dataKomentar));

        sessionStorage.removeItem("draftNama");
        sessionStorage.removeItem("draftPesan");

        formKomentar.reset();
        renderKomentar(); 
    });
}

const btnHapusSemua = document.querySelector("#btn-hapus-semua");
if (btnHapusSemua) {
    btnHapusSemua.addEventListener("click", () => {
        if (confirm("Yakin hapus semua komentar?")) {
            localStorage.removeItem("komentar");
            renderKomentar();
        }
    });
}

if (daftarKomentar) {
    daftarKomentar.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const indexHapus = e.target.dataset.index;
            const dataKomentar = getKomentarAman();
            
            dataKomentar.splice(indexHapus, 1); 
            localStorage.setItem("komentar", JSON.stringify(dataKomentar)); 
            
            renderKomentar(); 
        }
    });
}

// ==========================================
// SHORTCUT KEYBOARD & SCROLL (Modul 5)
// ==========================================
document.addEventListener("keydown", (e) => {
    const tagFokus = e.target.tagName.toLowerCase();
    if (tagFokus === 'input' || tagFokus === 'textarea') return;

    if (e.key.toLowerCase() === "d") {
        toggleTema();
    }
});

const btnScrollTop = document.querySelector("#btn-scroll-top");
if (btnScrollTop) {
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
}

// ==========================================
// PORTOFOLIO (Modul 4)
// ==========================================
const containerPortofolio = document.querySelector("#container-portofolio");
let counterPorto = 1;

const btnTambahPorto = document.querySelector("#btn-tambah-porto");
if (btnTambahPorto && containerPortofolio) {
    btnTambahPorto.addEventListener("click", () => {
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
}

// ==========================================
// RESET SEMUA DATA (Modul 7)
// ==========================================
const btnResetData = document.querySelector("#btn-reset");
if (btnResetData) {
    btnResetData.addEventListener("click", () => {
        if (confirm("Reset seluruh data Local Storage dan Session Storage?")) {
            localStorage.clear();
            sessionStorage.clear();
            location.reload(); 
        }
    });
}