# 🎧 AnkiWeb Sequential Audio Autoplay

Script UserScript (.js) ini memungkinkan **AnkiWeb** memutar audio secara otomatis dan berurutan — cocok buat kamu yang:

- Lagi **review kartu dari HP** (via Safari/iOS),
- Belum bisa beli **AnkiMobile**,
- Suka rebahan sambil dengerin audio dari mining di laptop 😎.

> ⚠️ **Supported Notes**: Saat ini tested dan bekerja dengan baik untuk:
> - **Lapis**
> - **JPMN**
>
> Jika kamu pakai jenis note lain, pastikan field audio-nya disimpan sebagai elemen `<audio>` seperti biasanya.

---

## 🚀 Cara Pakai

### 1. Download file `.js` dari repo ini

[👉 Klik di sini untuk unduh](https://github.com/Ryuuusuke/ankiwebautoplay)

### 2. Install UserScript extension untuk Safari (iOS)

Kamu bisa pakai app gratis bernama [**UserScripts** di App Store](https://apps.apple.com/id/app/userscripts/id1463298887)

### 3. Masukkan file `.js` ke folder UserScripts

- Buka aplikasi UserScripts
- Tambahkan file script ini ke dalam foldernya
- Buka [AnkiWeb](https://ankiuser.net/) dan login ke akunmu

### 4. Mulai Review

Sekarang setiap kali kamu membuka kartu di AnkiWeb yang punya audio (dari note **lapis** atau **jpmn**), maka audionya akan **diputar otomatis satu per satu**, tanpa perlu tekan tombol.

Kalau kamu skip kartu atau ganti halaman, script akan **otomatis menyesuaikan** dan memutar audio baru (jika ada).

---

## 🛠️ Fitur

- ✅ Autoplay semua audio yang muncul dalam kartu secara berurutan
- ✅ Deteksi otomatis perubahan kartu (pakai `MutationObserver`)
- ✅ Aman walau skip di tengah atau buka kartu tanpa audio
- ✅ Tidak ada audio yang diputar ulang dua kali tanpa ganti kartu
- ✅ Tidak perlu refresh

---

## 💡 Tips

- Pastikan field audio kamu tersimpan dalam format `[sound:example.mp3]` di Anki Desktop supaya di AnkiWeb muncul sebagai `<audio>`.
- Kalau audionya gak muncul di AnkiWeb, coba `Tools > Check Database` dulu di Anki Desktop.
- Gunakan note type **lapis** atau **jpmn** untuk hasil paling mulus (tested).

---

## ✨ Credits

Script ini dibuat supaya para pengguna iOS bisa review kartu dengan suara **tanpa harus beli AnkiMobile dulu**. Semangat belajar dan happy mining! 🍵📚

---

## 🐞 Known Issues

- Saat review ulang kartu yang sama (misal tekan `r`), audio tidak akan diputar ulang secara otomatis (karena dianggap kartu tidak berubah).
- Tidak support audio dari sumber eksternal (hanya `<audio>` tag langsung di DOM).

Pull request dan improvement sangat welcome!

