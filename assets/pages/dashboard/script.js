// عند الضغط على أي مشروع
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.project-card').forEach(c => {
      if(c !== card) c.classList.add('disappear');
    });
    document.querySelectorAll('.hero, .services, .clients').forEach(el => {
      el.classList.add('disappear');
    });
    card.style.transform = "scale(1.05)";
  });
});

// Scroll Clients Slider
let clientSlider = document.querySelector('.clients-slider');
clientSlider.addEventListener('wheel', e => {
  e.preventDefault();
  clientSlider.scrollLeft += e.deltaY;
});

// Scroll Portfolio Slider
let portfolioSlider = document.querySelector('.portfolio-slider');
portfolioSlider.addEventListener('wheel', e => {
  e.preventDefault();
  portfolioSlider.scrollLeft += e.deltaY;
});
// --- إرسال البيانات على WhatsApp ---
const sendBtn = document.getElementById('sendBtn');
sendBtn.addEventListener('click', () => {
  const name = document.getElementById('nameInput').value.trim();
  const email = document.getElementById('emailInput').value.trim();
  const request = document.getElementById('requestInput').value.trim();

  if (!name || !email || !request) {
    alert('من فضلك املأ جميع الحقول');
    return;
  }

  const message = `مرحبًا، أنا ${name}\nالبريد الإلكتروني: ${email}\nطلبي: ${request}`;
  const waLink = `https://wa.me/201500564191?text=${encodeURIComponent(message)}`;
  window.open(waLink, '_blank');
  modal.style.display = 'none';
});
