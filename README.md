# Peta Kesehatan Mesin Diesel — PLN Nusa Daya Sul 1

Aplikasi web pemantauan kesehatan mesin PLTD (123 unit, 23 lokasi), dengan
penilaian 30 parameter, alur persetujuan berjenjang (Koordinator → Team
Leader), laporan bertanda tangan QR, dan sinkronisasi data real-time lewat
Firebase Realtime Database.

**Situs ini murni file statis** (`index.html` satu file, tanpa server
backend sendiri) — bisa langsung di-hosting di Netlify, Vercel, GitHub
Pages, atau layanan static hosting apa pun.

## Cara update aplikasi

1. Buka repo ini di GitHub.
2. Klik file `index.html` → ikon pensil (Edit) → atau upload file baru
   dari tombol "Add file → Upload files" untuk menimpa versi lama.
3. Klik **Commit changes**.
4. Kalau repo ini sudah terhubung ke Netlify, situs akan otomatis
   ter-deploy ulang dalam ±1 menit — tidak perlu langkah manual lain.

## Konfigurasi Firebase

Kredensial Firebase (untuk penyimpanan data real-time) diatur lewat menu
**Sinkronisasi Data** di dalam aplikasi (login sebagai Admin), atau
ditanam permanen di `index.html` oleh pengembang supaya semua pengunjung
otomatis tersambung. Lihat `PANDUAN-DEPLOY.md` untuk detail lengkap.

## Akses

- Admin: akses penuh semua PLTD
- Koordinator: 1 PLTD sesuai penugasan
- Team Leader: 1 UPP (beberapa PLTD)

Daftar akun lengkap ada di menu **Kelola User** (Admin).
