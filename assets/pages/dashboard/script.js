document.addEventListener('DOMContentLoaded', () => {

  // === زر ابدأ المشروع + الفورم ===
  const startBtn = document.getElementById('startProjectBtn');

  // إنشاء الفورم ديناميكيًا
  const modal = document.createElement('div');
  modal.id = 'projectForm';
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close" id="closeForm">&times;</span>
      <h2>ابدأ مشروعك</h2>
      <div class="input-group">
        <i class="fa fa-user"></i>
        <input type="text" id="nameInput" placeholder="اسمك">
      </div>
      <div class="input-group">
        <i class="fa fa-envelope"></i>
        <input type="email" id="emailInput" placeholder="ايميلك">
      </div>
      <div class="input-group">
        <i class="fa fa-file-alt"></i>
        <textarea id="requestInput" placeholder="طلبك" rows="4"></textarea>
      </div>
      <button id="sendBtn"><i class="fa fa-paper-plane"></i> إرسال</button>
    </div>
  `;
  document.body.appendChild(modal);

  // فتح الفورم عند الضغط على الزر
  startBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
  });

  // اغلاق الفورم
  document.getElementById('closeForm').addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // إرسال البيانات على WhatsApp
  document.getElementById('sendBtn').addEventListener('click', () => {
    const name = document.getElementById('nameInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const request = document.getElementById('requestInput').value.trim();

    if(!name || !email || !request){
      alert('يرجى ملء جميع الحقول!');
      return;
    }

    const phone = '201500564191';
    const message = `مرحبا، أود بدء مشروع معكم.%0Aالاسم: ${name}%0Aالإيميل: ${email}%0Aالطلب: ${request}`;
    const url = `https://wa.me/${phone}?text=${message}`;
    window.open(url, '_blank');
  });

  // === Projects Slider ===
  const projects = document.querySelectorAll('.project-card');
  let currentProject = 0;

  // إظهار الكارد الأول تلقائيًا عند التحميل
  projects.forEach((card, index) => {
    if(index === currentProject){
      card.style.display = 'flex';
      card.classList.add('active');
    } else {
      card.style.display = 'none';
      card.classList.remove('active');
    }
  });

  function showProject(index){
    projects[currentProject].style.display = 'none';
    projects[currentProject].classList.remove('active');
    currentProject = index;
    projects[currentProject].style.display = 'flex';
    projects[currentProject].classList.add('active');
  }

  // Scroll و Swipe للمشاريع
  const portfolioContainer = document.querySelector('.portfolio-container');
  if(portfolioContainer){
    portfolioContainer.addEventListener('wheel', e => {
      if(e.deltaY > 0){
        showProject((currentProject + 1) % projects.length);
      } else if(e.deltaY < 0){
        showProject((currentProject - 1 + projects.length) % projects.length);
      }
    });

    let startX = 0;
    portfolioContainer.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
    portfolioContainer.addEventListener('touchend', e => {
      let endX = e.changedTouches[0].clientX;
      if(startX - endX > 50){
        showProject((currentProject + 1) % projects.length);
      } else if(endX - startX > 50){
        showProject((currentProject - 1 + projects.length) % projects.length);
      }
    });
  }

});
