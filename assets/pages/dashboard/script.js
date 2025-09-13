// --- فتح وغلق الفورم ---
const startBtn = document.getElementById('startProjectBtn');
const modal = document.getElementById('projectForm');
const closeBtn = document.getElementById('closeForm');

startBtn.addEventListener('click', () => {
  modal.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) modal.style.display = 'none';
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

// --- Projects Navigation with Buttons ---
const projects = Array.from(document.querySelectorAll('.project-card'));
let projectIndex = 0;

function showProject(index) {
  projects.forEach((p, i) => {
    p.style.display = (i === index) ? 'block' : 'none';
    if (i === index) p.classList.add('appear');
    else p.classList.remove('appear');
  });
}
showProject(projectIndex);

document.getElementById('projectPrev').addEventListener('click', () => {
  projectIndex = (projectIndex - 1 + projects.length) % projects.length;
  showProject(projectIndex);
});
document.getElementById('projectNext').addEventListener('click', () => {
  projectIndex = (projectIndex + 1) % projects.length;
  showProject(projectIndex);
});

// --- Clients Navigation with Buttons ---
const clients = Array.from(document.querySelectorAll('.client-card'));
let clientIndex = 0;

function showClient(index) {
  clients.forEach((c, i) => {
    c.style.display = (i === index) ? 'block' : 'none';
    if (i === index) c.classList.add('appear');
    else c.classList.remove('appear');
  });
}
showClient(clientIndex);

document.getElementById('clientPrev').addEventListener('click', () => {
  clientIndex = (clientIndex - 1 + clients.length) % clients.length;
  showClient(clientIndex);
});
document.getElementById('clientNext').addEventListener('click', () => {
  clientIndex = (clientIndex + 1) % clients.length;
  showClient(clientIndex);
});
