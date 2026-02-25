# 🏥 Website Klinik Iis

Website profesional untuk Klinik Iis dengan UI pink × burgundy, chatbot bawaan, dan integrasi WhatsApp gratis.

## 📁 Struktur Folder

```
klinik-iis/
├── app.py                  # Flask app utama + logika chatbot
├── requirements.txt        # Dependencies Python
├── vercel.json             # Konfigurasi deployment Vercel
├── templates/
│   └── index.html          # Halaman utama (single-page)
└── static/
    ├── css/
    │   └── style.css       # Semua styling (pink × burgundy theme)
    └── js/
        └── main.js         # Interaktivitas & chatbot frontend
```

## ✨ Fitur

- ✅ **UI Elegan** — Tema pink × burgundy dengan Playfair Display
- ✅ **Chatbot Bawaan** — Menjawab pertanyaan umum tentang klinik
- ✅ **Tombol WhatsApp** — Float button & link ke WA langsung (gratis)
- ✅ **Form Pendaftaran** — Redirect ke WhatsApp otomatis dengan data pasien
- ✅ **Responsif** — Mobile-friendly
- ✅ **Hosting Vercel** — Gratis & cepat

## 🚀 Cara Jalankan Lokal

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Jalankan Flask
python app.py

# 3. Buka browser
# → http://localhost:5000
```

## ☁️ Deploy ke Vercel (Gratis)

### Langkah-langkah:

1. **Buat akun** di https://vercel.com (gratis, bisa login pakai GitHub)

2. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

3. **Login:**
   ```bash
   vercel login
   ```

4. **Deploy dari folder project:**
   ```bash
   cd klinik-iis
   vercel
   ```
   Ikuti instruksi → pilih "Yes" untuk semua default.

5. **Selesai!** Vercel akan memberikan URL seperti:
   `https://klinik-iis.vercel.app`

### Atau via GitHub (lebih mudah):
1. Upload folder ke GitHub repository
2. Buka https://vercel.com → New Project
3. Import dari GitHub → pilih repo
4. Klik **Deploy** — otomatis live!

## 📱 Chatbot WhatsApp (Gratis)

Chatbot di website ini menjawab pertanyaan otomatis. Untuk meneruskan ke WhatsApp nyata:
- Tombol **"Lanjut chat di WhatsApp"** di bawah chatbot langsung membuka WA
- Form pendaftaran otomatis mengirim pesan ke WA klinik
- Float button WA di pojok kanan bawah selalu terlihat

> **Ubah nomor WA:** Cari `6281234567890` di file `index.html` dan `main.js`, ganti dengan nomor klinik Anda.

## ⚙️ Kustomisasi

| Yang ingin diubah | Lokasi |
|---|---|
| Nama, alamat, nomor | `templates/index.html` |
| Warna tema | `static/css/style.css` (variabel `:root`) |
| Jawaban chatbot | `app.py` → fungsi `chatbot_response()` |
| Nomor WhatsApp | `templates/index.html` & `static/js/main.js` |