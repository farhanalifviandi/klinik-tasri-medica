// ============================
// KLINIK IIS — Main JavaScript
// ============================

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ---- Mobile menu ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');

hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
closeMenu.addEventListener('click', () => mobileMenu.classList.remove('open'));
function closeMobile() { mobileMenu.classList.remove('open'); }

// ---- Chatbot Toggle ----
const chatbotFab = document.getElementById('chatbotFab');
const chatbotWidget = document.getElementById('chatbotWidget');
const chatbotClose = document.getElementById('chatbotClose');

chatbotFab.addEventListener('click', () => {
  chatbotWidget.classList.toggle('open');
  if (chatbotWidget.classList.contains('open')) {
    document.getElementById('chatInput').focus();
  }
});
chatbotClose.addEventListener('click', () => chatbotWidget.classList.remove('open'));

// ---- Chatbot Messages ----
const chatbotBody = document.getElementById('chatbotBody');

function appendMessage(text, sender) {
  const msg = document.createElement('div');
  msg.className = `chat-msg ${sender}`;
  const p = document.createElement('p');
  p.innerHTML = text.replace(/\n/g, '<br>');
  msg.appendChild(p);
  chatbotBody.appendChild(msg);
  chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

function showTyping() {
  const typing = document.createElement('div');
  typing.className = 'chat-msg bot';
  typing.id = 'typing';
  typing.innerHTML = '<p style="color:#aaa;font-style:italic;">⏳ Mengetik...</p>';
  chatbotBody.appendChild(typing);
  chatbotBody.scrollTop = chatbotBody.scrollHeight;
}
function hideTyping() {
  const t = document.getElementById('typing');
  if (t) t.remove();
}

async function sendMessage() {
  const input = document.getElementById('chatInput');
  const message = input.value.trim();
  if (!message) return;

  appendMessage(message, 'user');
  input.value = '';
  showTyping();

  try {
    const res = await fetch('/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    const data = await res.json();
    hideTyping();
    setTimeout(() => appendMessage(data.response, 'bot'), 200);
  } catch (e) {
    hideTyping();
    appendMessage('Maaf, terjadi kesalahan. Silakan hubungi kami via WhatsApp.', 'bot');
  }
}

document.getElementById('chatInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') sendMessage();
});

function sendQuick(text) {
  document.getElementById('chatInput').value = text;
  // Remove quick replies after first use
  const qr = document.querySelector('.quick-replies');
  if (qr) qr.style.display = 'none';
  sendMessage();
}

// ---- Registration Form (redirect to WA) ----
document.getElementById('daftarForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const nama = this.querySelector('input[type="text"]').value;
  const wa = this.querySelector('input[type="tel"]').value;
  const layanan = this.querySelector('select').value;
  const tanggal = this.querySelector('input[type="date"]').value;
  const keluhan = this.querySelector('textarea').value;

  const msg = encodeURIComponent(
    `Halo Klinik Iis! Saya ingin mendaftar:\n\n` +
    `👤 Nama: ${nama}\n` +
    `📱 No. WA: ${wa}\n` +
    `💊 Layanan: ${layanan}\n` +
    `📅 Tanggal: ${tanggal}\n` +
    (keluhan ? `📝 Keluhan: ${keluhan}` : '')
  );

  window.open(`https://wa.me/6285363281138?text=${msg}`, '_blank');
});

// ---- Scroll Animations ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.layanan-card, .dokter-card, .info-box').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms`;
  observer.observe(el);
});

// ---- Active nav link on scroll ----
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let scrollY = window.scrollY + 100;
  sections.forEach(sec => {
    if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
      document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
});