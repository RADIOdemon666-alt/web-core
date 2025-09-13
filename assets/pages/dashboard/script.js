document.addEventListener('DOMContentLoaded', () => {
  // --- المودال ---
  const modal = document.getElementById('projectForm');
  const openModalBtn = document.getElementById('startProjectBtn');
  const closeModalBtn = document.getElementById('closeForm');

  openModalBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
  });

  closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // --- Projects Slider ---
  const projects = document.querySelectorAll('.project-card');
  let currentIndex = 0;
  projects[currentIndex].classList.add('active');

  const btnLeft = document.querySelector('.slider-btn-left');
  const btnRight = document.querySelector('.slider-btn-right');

  btnRight.addEventListener('click', () => {
    projects[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % projects.length;
    projects[currentIndex].classList.add('active');
  });

  btnLeft.addEventListener('click', () => {
    projects[currentIndex].classList.remove('active');
    currentIndex = (currentIndex - 1 + projects.length) % projects.length;
    projects[currentIndex].classList.add('active');
  });

  // --- Scroll Clients Slider ---
  const clientSlider = document.querySelector('.clients-slider');
  clientSlider.addEventListener('wheel', e => {
    e.preventDefault();
    clientSlider.scrollLeft += e.deltaY;
  });

  // --- إرسال البيانات على WhatsApp ---
  const sendBtn = document.getElementById('sendBtn');
  sendBtn.addEventListener('click', (e) => {
    e.preventDefault(); // منع أي سلوك افتراضي للزر

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

    // اغلاق المودال بعد الإرسال
    modal.style.display = 'none';

    // مسح الحقول بعد الإرسال
    document.getElementById('nameInput').value = '';
    document.getElementById('emailInput').value = '';
    document.getElementById('requestInput').value = '';
  });
});
