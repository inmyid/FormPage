// Fungsi untuk menampilkan pop-up saat halaman dibuka
document.addEventListener("DOMContentLoaded", function () {
    tampilkanPopupPeringatan();
});

function tampilkanPopupPeringatan() {
    // Buat elemen pop-up
    let popupPeringatan = document.createElement("div");
    popupPeringatan.classList.add("popup-peringatan");

    // Isi pop-up
    popupPeringatan.innerHTML = `
        <div class="popup-content">
            <h3>⚠️ Peringatan</h3>
            <p>Formulir ini hanya dapat diisi oleh <b>Kepala Keluarga</b> atau <b>salah satu anggota keluarga yang terdaftar dalam Kartu Keluarga</b>.</p>            <button onclick="tutupPopupPeringatan()" class="btn-close">Mengerti</button>
        </div>
    `;

    // Tambahkan pop-up ke dalam body
    document.body.appendChild(popupPeringatan);
}

// Fungsi untuk menutup pop-up peringatan
function tutupPopupPeringatan() {
    let popupPeringatan = document.querySelector(".popup-peringatan");
    if (popupPeringatan) {
        popupPeringatan.remove();
    }
}

function toggleForm(containerId, checkboxId) {
    let container = document.getElementById(containerId);
    let checkbox = document.getElementById(checkboxId);

    if (checkbox.checked) {
        container.style.display = "flex";
        container.classList.add("show");
    } else {
        container.style.display = "none";
        container.classList.remove("show");
    }
}

function tambahAnak() {
    const anakList = document.getElementById("anakList");
    const anakCount = anakList.children.length + 1; // Menentukan urutan anak

    // Buat div untuk input anak
    const anakDiv = document.createElement("div");
    anakDiv.classList.add("form-group", "anak-item");

    // Label untuk Anak (Anak 1, Anak 2, dst.)
    const labelAnak = document.createElement("label");
    labelAnak.textContent = `Anak ${anakCount}:`;

    // Input Nama Anak
    const inputAnak = document.createElement("input");
    inputAnak.type = "text";
    inputAnak.placeholder = "Masukkan Nama Anak";

    // Container Kehadiran + Hapus
    const kehadiranContainer = document.createElement("div");
    kehadiranContainer.classList.add("kehadiran-container");

    // Label Kehadiran
    const labelKehadiran = document.createElement("label");
    labelKehadiran.textContent = "Kehadiran:";

    // Radio Button Kehadiran
    const radioGroup = document.createElement("div");
    radioGroup.classList.add("radio-group");

    const hadirLabel = document.createElement("label");
    hadirLabel.innerHTML = `<input type="radio" name="hadirAnak${anakCount}" value="Hadir"> Hadir`;

    const tidakHadirLabel = document.createElement("label");
    tidakHadirLabel.innerHTML = `<input type="radio" name="hadirAnak${anakCount}" value="Tidak Hadir"> Tidak Hadir`;

    // Tombol Hapus Anak
    const hapusButton = document.createElement("button");
    hapusButton.textContent = "Hapus";
    hapusButton.classList.add("hapus-anak");
    hapusButton.onclick = function () {
        anakDiv.remove(); // Menghapus elemen anak dari daftar
    };

    // Gabungkan radio button ke dalam radioGroup
    radioGroup.appendChild(hadirLabel);
    radioGroup.appendChild(tidakHadirLabel);

    // Masukkan label, radio, dan tombol hapus ke dalam container
    kehadiranContainer.appendChild(labelKehadiran);
    kehadiranContainer.appendChild(radioGroup);
    kehadiranContainer.appendChild(hapusButton); // Letakkan tombol di dalam container

    // Tambahkan elemen ke dalam div anak
    anakDiv.appendChild(labelAnak);
    anakDiv.appendChild(inputAnak);
    anakDiv.appendChild(kehadiranContainer); // Masukkan container kehadiran

    // Tambahkan ke daftar anak
    anakList.appendChild(anakDiv);
}

function hapusAnak(button) {
    button.parentElement.remove();
}

document.getElementById("invitationForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const kepalaKeluarga = document.getElementById("kepalaKeluarga").value;
    const alamat = document.getElementById("alamat").value;
    
    // Data Suami
    const punyaSuami = document.getElementById("punyaSuami").checked;
    const namaSuami = punyaSuami ? (document.getElementById("namaSuami").value || "-") : "Tidak Ada";
    const hadirSuami = punyaSuami ? (document.querySelector("input[name='hadirSuami']:checked")?.value || "-") : "-";

    // Data Istri
    const punyaIstri = document.getElementById("punyaIstri").checked;
    const namaIstri = punyaIstri ? (document.getElementById("namaIstri").value || "-") : "Tidak Ada";
    const hadirIstri = punyaIstri ? (document.querySelector("input[name='hadirIstri']:checked")?.value || "-") : "-";

    // Data Anak
    let anakData = [];
    document.querySelectorAll("#anakList .anak-item").forEach((anak, index) => {
        const namaAnak = anak.querySelector("input[type='text']").value || "-";
        const hadirAnak = anak.querySelector(`input[name='hadirAnak${index+1}']:checked`)?.value || "-";
        anakData.push(`<b>Anak ${index + 1}:</b> ${namaAnak} (Kehadiran: ${hadirAnak})`);
    });

    // Gabungkan data
    let popupText = `
        <b>Nama Kepala Keluarga:</b> ${kepalaKeluarga} <br>
        <b>Alamat:</b> ${alamat} <br><br>
        <b>Suami:</b> ${namaSuami} (Kehadiran: ${hadirSuami}) <br>
        <b>Istri:</b> ${namaIstri} (Kehadiran: ${hadirIstri}) <br><br>
        ${anakData.length > 0 ? anakData.join("<br>") : "<b>Anak:</b> Tidak Ada"}
    `;

    // Tampilkan pop-up
    document.getElementById("popupContent").innerHTML = popupText;
    document.getElementById("popup").style.display = "flex";
});

// Fungsi untuk menutup pop-up
function tutupPopup() {
    document.getElementById("popup").style.display = "none";
}

