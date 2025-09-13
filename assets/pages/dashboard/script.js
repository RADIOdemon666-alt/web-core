// عند الضغط على أي مشروع
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {

    // اخفاء بقية المشاريع والعناصر
    document.querySelectorAll('.project-card').forEach(c => {
      if(c !== card) c.classList.add('disappear');
    });
    document.querySelectorAll('.hero, .services, .clients').forEach(el => {
      el.classList.add('disappear');
    });

    // تكبير المشروع الحالي
    card.style.transform = "scale(1.05)";

    // إنشاء زر الإغلاق إذا مش موجود
    if(!card.querySelector('.close-btn')) {
      const closeBtn = document.createElement('button');
      closeBtn.textContent = "✖";
      closeBtn.classList.add('close-btn');
      closeBtn.style.position = 'absolute';
      closeBtn.style.top = '10px';
      closeBtn.style.left = '10px';
      closeBtn.style.padding = '5px 10px';
      closeBtn.style.border = 'none';
      closeBtn.style.borderRadius = '5px';
      closeBtn.style.cursor = 'pointer';
      closeBtn.style.background = '#ff5555';
      closeBtn.style.color = '#fff';
      closeBtn.style.fontSize = '14px';
      closeBtn.style.zIndex = '10';
      card.appendChild(closeBtn);

      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // لمنع تشغيل click على الكارد نفسه
        // إعادة ظهور كل العناصر
        document.querySelectorAll('.project-card').forEach(c => c.classList.remove('disappear'));
        document.querySelectorAll('.hero, .services, .clients').forEach(el => el.classList.remove('disappear'));
        card.style.transform = "scale(1)";

        // إزالة زر الإغلاق
        closeBtn.remove();
      });
    }
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
