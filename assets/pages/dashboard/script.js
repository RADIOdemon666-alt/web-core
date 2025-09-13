// Services
const servicesSection = document.querySelector('.services');
const servicesData = [
  {icon: 'icon-code', title: 'تطوير المواقع', desc: 'مواقع حديثة ومتجاوبة مع كل الأجهزة.'},
  {icon: 'icon-paint', title: 'تصميم واجهات UI/UX', desc: 'تصاميم عصرية وسهلة الاستخدام.'},
  {icon: 'icon-server', title: 'استضافة وصيانة', desc: 'حلول متكاملة لموقعك بأمان وسرعة.'}
];

servicesData.forEach(s => {
  const card = document.createElement('div');
  card.className = 'service-card';
  card.innerHTML = `<i class="${s.icon}"></i><h3>${s.title}</h3><p>${s.desc}</p>`;
  servicesSection.appendChild(card);
});

// Portfolio
const portfolioSection = document.querySelector('.portfolio');
const projectsData = [
  {img:'assets/projects/project1.jpg', title:'مشروع 1'},
  {img:'assets/projects/project2.jpg', title:'مشروع 2'}
];

projectsData.forEach(p => {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.innerHTML = `<img src="${p.img}" alt="${p.title}"><div class="overlay"><h4>${p.title}</h4></div>`;
  portfolioSection.appendChild(card);
});

// Portfolio hover
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', () => card.querySelector('.overlay').style.opacity = 1);
  card.addEventListener('mouseleave', () => card.querySelector('.overlay').style.opacity = 0);
});

// Clients
const clientsSection = document.querySelector('.clients');
clientsSection.innerHTML = `
<h2>عملاؤنا</h2>
<div style="display:flex; justify-content:center; gap:30px; flex-wrap:wrap;">
  <img src="assets/clients/client1.png" alt="Client 1">
  <img src="assets/clients/client2.png" alt="Client 2">
</div>`;

// Contact form WhatsApp
const contactSection = document.querySelector('.contact');
contactSection.innerHTML = `
<div class="form-box">
  <h2>تواصل معنا</h2>
  <div class="input-group"><i class="icon-user"></i><input type="text" placeholder="اسمك" id="name"></div>
  <div class="input-group"><i class="icon-mail"></i><input type="email" placeholder="بريدك" id="email"></div>
  <div class="input-group"><i class="icon-message"></i><input type="text" placeholder="رسالتك" id="message"></div>
  <button id="sendBtn">إرسال عبر واتساب</button>
</div>`;

document.getElementById('sendBtn').addEventListener('click', () => {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  if(!name || !email || !message){ alert("يرجى ملء جميع الحقول!"); return; }
  const text = `اسم: ${name}%0Aالبريد: ${email}%0Aالرسالة: ${message}`;
  window.open(`https://wa.me/201500564191?text=${text}`, '_blank');
});

// Footer
document.querySelector('footer').innerHTML = '&copy; 2025 Web-Zone. جميع الحقوق محفوظة.';// Services
const servicesSection = document.querySelector('.services');
const servicesData = [
  {icon: 'icon-code', title: 'تطوير المواقع', desc: 'مواقع حديثة ومتجاوبة مع كل الأجهزة.'},
  {icon: 'icon-paint', title: 'تصميم واجهات UI/UX', desc: 'تصاميم عصرية وسهلة الاستخدام.'},
  {icon: 'icon-server', title: 'استضافة وصيانة', desc: 'حلول متكاملة لموقعك بأمان وسرعة.'}
];

servicesData.forEach(s => {
  const card = document.createElement('div');
  card.className = 'service-card';
  card.innerHTML = `<i class="${s.icon}"></i><h3>${s.title}</h3><p>${s.desc}</p>`;
  servicesSection.appendChild(card);
});

// Portfolio
const portfolioSection = document.querySelector('.portfolio');
const projectsData = [
  {img:'assets/projects/project1.jpg', title:'مشروع 1'},
  {img:'assets/projects/project2.jpg', title:'مشروع 2'}
];

projectsData.forEach(p => {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.innerHTML = `<img src="${p.img}" alt="${p.title}"><div class="overlay"><h4>${p.title}</h4></div>`;
  portfolioSection.appendChild(card);
});

// Portfolio hover
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', () => card.querySelector('.overlay').style.opacity = 1);
  card.addEventListener('mouseleave', () => card.querySelector('.overlay').style.opacity = 0);
});

// Clients
const clientsSection = document.querySelector('.clients');
clientsSection.innerHTML = `
<h2>عملاؤنا</h2>
<div style="display:flex; justify-content:center; gap:30px; flex-wrap:wrap;">
  <img src="assets/clients/client1.png" alt="Client 1">
  <img src="assets/clients/client2.png" alt="Client 2">
</div>`;

// Contact form WhatsApp
const contactSection = document.querySelector('.contact');
contactSection.innerHTML = `
<div class="form-box">
  <h2>تواصل معنا</h2>
  <div class="input-group"><i class="icon-user"></i><input type="text" placeholder="اسمك" id="name"></div>
  <div class="input-group"><i class="icon-mail"></i><input type="email" placeholder="بريدك" id="email"></div>
  <div class="input-group"><i class="icon-message"></i><input type="text" placeholder="رسالتك" id="message"></div>
  <button id="sendBtn">إرسال عبر واتساب</button>
</div>`;

document.getElementById('sendBtn').addEventListener('click', () => {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  if(!name || !email || !message){ alert("يرجى ملء جميع الحقول!"); return; }
  const text = `اسم: ${name}%0Aالبريد: ${email}%0Aالرسالة: ${message}`;
  window.open(`https://wa.me/201500564191?text=${text}`, '_blank');
});

// Footer
document.querySelector('footer').innerHTML = '&copy; 2025 Web-Zone. جميع الحقوق محفوظة.';
