from flask import Flask, render_template, request, jsonify
import os

app = Flask(__name__)

# Simple chatbot responses
def chatbot_response(message):
    message = message.lower()
    
    responses = {
        "jam": "🕐 Jam operasional Klinik Iis:\n- Senin–Jumat: 08.00–20.00\n- Sabtu: 08.00–17.00\n- Minggu: 09.00–14.00",
        "buka": "🕐 Jam operasional Klinik Iis:\n- Senin–Jumat: 08.00–20.00\n- Sabtu: 08.00–17.00\n- Minggu: 09.00–14.00",
        "layanan": "💊 Layanan kami meliputi:\n- Konsultasi Dokter Umum\n- Kesehatan Ibu & Anak\n- Imunisasi\n- Laboratorium\n- Farmasi",
        "harga": "💰 Biaya konsultasi mulai dari Rp 75.000. Untuk informasi lebih lengkap, silakan hubungi kami di 0812-3456-7890.",
        "dokter": "👩‍⚕️ Dokter kami:\n- dr. Iis Suryani (Dokter Umum)\n- dr. Hendra (Anak)\n- Bidan Sari (Kebidanan)",
        "alamat": "📍 Kami berlokasi di:\nJl. Kesehatan No. 45, Perumahan Indah, Kota Bandung\n\nGoogle Maps: bit.ly/klinik-iis",
        "daftar": "📋 Cara pendaftaran:\n1. Datang langsung ke klinik\n2. Hubungi WA: 0812-3456-7890\n3. Isi form di website\n\nPendaftaran online dibuka 1 jam sebelum jadwal.",
        "covid": "😷 Kami menyediakan layanan:\n- Tes Antigen & PCR\n- Vaksinasi COVID-19\n- Konsultasi pasca COVID",
        "imunisasi": "💉 Jadwal imunisasi tersedia setiap:\n- Selasa & Kamis: 09.00–12.00\n- Sabtu: 09.00–12.00\n\nHarap mendaftar terlebih dahulu.",
    }
    
    for key, value in responses.items():
        if key in message:
            return value
    
    return "Halo! Terima kasih menghubungi Klinik Iis 😊\n\nSaya bisa membantu informasi tentang:\n- Jam buka\n- Layanan & dokter\n- Harga konsultasi\n- Cara pendaftaran\n- Alamat klinik\n\nSilakan ketik pertanyaan Anda!"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    message = data.get('message', '')
    response = chatbot_response(message)
    return jsonify({'response': response})

@app.route('/api/health')
def health():
    return jsonify({'status': 'ok', 'clinic': 'Klinik Iis'})

if __name__ == '__main__':
    app.run(debug=True)