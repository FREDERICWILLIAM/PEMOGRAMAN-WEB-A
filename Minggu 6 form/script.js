// ============================
// JAVASCRIPT: VALIDASI DINAMIS
// ============================
const formPendaftaran = document.querySelector("#form-pendaftaran");
const inputNama = document.querySelector("#nama");
const inputEmail = document.querySelector("#email");
const inputNoHP = document.querySelector("#nohp");
const inputSekolah = document.querySelector("#sekolah");
const selectAgama = document.querySelector("#agama");
const selectProdi = document.querySelector("#prodi");
const radioJk = document.querySelectorAll("input[name='jenisKelamin']");

// Fungsi Validasi Umum
function validasiField(input, errorId, namaField) {
    const errorElement = document.querySelector(`#${errorId}`);
    
    if (input.validity.valueMissing) {
        input.setCustomValidity(`${namaField} wajib diisi!`);
    } else if (input.validity.tooShort) {
        input.setCustomValidity(`${namaField} minimal ${input.minLength} karakter!`);
    } else if (input.validity.typeMismatch && input.type === "email") {
        input.setCustomValidity(`Format email tidak valid!`);
    } else if (input.validity.patternMismatch && input.type === "tel") {
        input.setCustomValidity(`No HP harus berupa angka (10-13 digit)!`);
    } else {
        input.setCustomValidity(""); 
    }

    if (!input.checkValidity()) {
        errorElement.textContent = input.validationMessage;
    } else {
        errorElement.textContent = "";
    }
}

// Memicu validasi saat user mengetik atau memilih
inputNama.addEventListener("input", () => validasiField(inputNama, "error-nama", "Nama Lengkap"));
inputEmail.addEventListener("input", () => validasiField(inputEmail, "error-email", "Email"));
inputNoHP.addEventListener("input", () => validasiField(inputNoHP, "error-nohp", "No Handphone"));
inputSekolah.addEventListener("input", () => validasiField(inputSekolah, "error-sekolah", "Asal Sekolah"));
selectAgama.addEventListener("change", () => validasiField(selectAgama, "error-agama", "Agama"));
selectProdi.addEventListener("change", () => validasiField(selectProdi, "error-prodi", "Program Studi"));

// Validasi khusus saat form di-submit (termasuk radio button)
formPendaftaran.addEventListener("submit", (e) => {
    e.preventDefault(); 
    
    let jkTerpilih = false;
    radioJk.forEach(radio => {
        if (radio.checked) jkTerpilih = true;
    });

    if (!jkTerpilih) {
        document.querySelector("#error-jk").textContent = "Jenis Kelamin wajib dipilih!";
        return;
    } else {
        document.querySelector("#error-jk").textContent = "";
    }

    alert("Pendaftaran Berhasil Disimpan!");
    formPendaftaran.reset();
});