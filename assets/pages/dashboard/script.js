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
