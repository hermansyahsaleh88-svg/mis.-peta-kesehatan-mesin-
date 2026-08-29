# Panduan Deploy — Peta Kesehatan Mesin Diesel

Panduan ini untuk membuat aplikasi bisa diakses lewat website oleh siapa
saja (Admin/Koordinator/Team Leader), dengan alur update yang mudah ke
depannya. Total waktu: sekitar 20–30 menit, sekali saja.

Ringkasan arsitektur:

```
Pengunjung situs  --->  Netlify (hosting, gratis)  --->  file index.html
                                                              |
                                                              v
                                              Firebase Realtime Database
                                              (penyimpanan data, real-time)
```

GitHub dipakai sebagai "sumber file" — setiap kali file di GitHub
diperbarui, Netlify otomatis men-deploy ulang. Tidak perlu command
line/git sama sekali; semua bisa lewat website.

---

## Bagian A — Setup Firebase (database)

1. Buka [console.firebase.google.com](https://console.firebase.google.com),
   login pakai akun Google apa saja.
2. Klik **Add project**, beri nama bebas (mis. "peta-kesehatan-mesin"),
   ikuti langkah sampai selesai (boleh matikan Google Analytics, tidak
   perlu).
3. Di menu kiri: **Build → Realtime Database → Create Database**. Pilih
   lokasi server terdekat (mis. Singapore/asia-southeast1), lalu pilih
   **"Start in test mode"**.
4. Buka tab **Rules** pada halaman Realtime Database tsb, hapus isinya,
   ganti dengan:
   ```json
   {
     "rules": {
       ".read": true,
       ".write": true
     }
   }
   ```
   Klik **Publish**.

   > Catatan keamanan: rules ini mengizinkan siapa pun yang tahu
   > konfigurasi project untuk membaca/menulis data. Ini setara dengan
   > keamanan versi Google Sheets sebelumnya ("Anyone" access) — cukup
   > untuk pemakaian internal selama konfigurasi tidak disebarluaskan ke
   > luar organisasi. Kalau butuh keamanan lebih ketat (login per-user
   > sungguhan), itu perlu pengembangan tambahan (Firebase
   > Authentication) — beri tahu saya kalau ini diperlukan nanti.

5. Klik ikon gerigi (⚙) di pojok kiri atas → **Project settings** →
   scroll ke bagian **"Your apps"** → klik ikon **`</>`  (Web)** →
   beri nama bebas → **Register app** (tidak perlu centang Hosting).
6. Firebase akan menampilkan kode seperti ini — **salin seluruh bagian
   `{ ... }`**:
   ```js
   const firebaseConfig = {
     apiKey: "AIzaSy...",
     authDomain: "peta-kesehatan-mesin.firebaseapp.com",
     databaseURL: "https://peta-kesehatan-mesin-default-rtdb.asia-southeast1.firebasedatabase.app",
     projectId: "peta-kesehatan-mesin",
     storageBucket: "peta-kesehatan-mesin.appspot.com",
     messagingSenderId: "...",
     appId: "..."
   };
   ```
7. **Kirim konfigurasi ini ke saya** (Claude) — akan saya tanam permanen
   ke dalam `index.html` supaya SEMUA pengunjung situs otomatis
   tersambung ke Firebase yang sama tanpa perlu setting manual satu-satu.

   Kalau tidak mau menunggu, bisa juga langsung ditempel sendiri lewat
   menu **Sinkronisasi Data** di aplikasi (login sebagai `admin`) — tapi
   ini hanya tersimpan di browser Admin itu sendiri, jadi tiap
   Koordinator/Team Leader di device lain harus login Admin & sambungkan
   manual sekali juga per browser. Menanam permanen (opsi di atas) lebih
   simpel untuk banyak user.

---

## Bagian B — Upload ke GitHub (tanpa command line)

1. Buka [github.com](https://github.com), buat akun gratis kalau belum
   punya.
2. Klik tombol **+** di kanan atas → **New repository**.
3. Beri nama (mis. `peta-kesehatan-mesin`), pilih **Public** atau
   **Private** (keduanya bisa dipakai Netlify gratis), centang **"Add a
   README file"**, klik **Create repository**.
4. Di halaman repo, klik **Add file → Upload files**.
5. Seret (drag & drop) file `index.html`, `README.md`, dan
   `PANDUAN-DEPLOY.md` yang saya berikan ke area upload tsb.
6. Scroll ke bawah, klik **Commit changes**.

Repo GitHub Anda sekarang berisi file aplikasinya.

---

## Bagian C — Hubungkan ke Netlify

1. Buka [app.netlify.com](https://app.netlify.com), klik **Sign up**,
   pilih **Sign up with GitHub** (paling mudah, langsung terhubung).
2. Setelah masuk, klik **Add new site → Import an existing project**.
3. Pilih **Deploy with GitHub**, izinkan akses saat diminta, lalu pilih
   repo `peta-kesehatan-mesin` yang tadi dibuat.
4. Di pengaturan build:
   - **Build command**: kosongkan
   - **Publish directory**: kosongkan (atau isi `/` atau `.`)
5. Klik **Deploy site**.

Dalam ±1 menit, Netlify akan memberi Anda URL publik seperti
`https://nama-acak-123.netlify.app` — situs sudah bisa diakses siapa saja.

**(Opsional)** Ganti nama domain: di halaman site Netlify → **Site
configuration → Change site name** → ganti jadi nama yang lebih mudah
diingat, mis. `peta-kesehatan-mesin-sul1.netlify.app` (masih gratis).

---

## Bagian D — Cara update aplikasi ke depannya

Setiap kali saya (Claude) memberikan versi baru `index.html`:

1. Buka repo GitHub Anda → klik file `index.html`.
2. Klik ikon pensil (Edit) di kanan atas, **atau** hapus lalu upload
   ulang file baru lewat **Add file → Upload files** (pilih **"Replace"**
   kalau ditanya).
3. Klik **Commit changes**.
4. Selesai — Netlify otomatis mendeteksi perubahan di GitHub dan
   men-deploy ulang situs dalam ±1 menit, tanpa langkah manual apa pun
   di Netlify.

Anda bisa cek progres deploy di tab **Deploys** pada dashboard Netlify.

---

## Ringkasan

| Bagian | Sekali di awal | Berulang (tiap update) |
|---|---|---|
| Firebase | Setup project + rules (Bagian A) | Tidak perlu diulang |
| GitHub | Buat repo + upload awal (Bagian B) | Upload ulang `index.html` |
| Netlify | Hubungkan ke repo (Bagian C) | Otomatis, tidak perlu apa-apa |
