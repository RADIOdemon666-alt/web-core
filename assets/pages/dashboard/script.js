// Services - add icon, title, desc dynamically
document.querySelectorAll('.service-card').forEach(card => {
  const icon = card.dataset.icon;
  const title = card.dataset.title;
  const desc = card.dataset.desc;
  card.innerHTML = `<i class="${icon}"></i><h3>${title}</h3><p>${desc}</p>`;
});

// Projects Slider
const projects = document.querySelectorAll('.project-card');
let currentProject = 0;
projects.forEach((card, index) => {
  if(index !== currentProject) card.style.display = 'none';
});

function showProject(index) {
  projects[currentProject].style.display = 'none';
  currentProject = index;
  projects[currentProject].style.display = 'flex';
}

// Wheel Scroll for Desktop
document.querySelector('.portfolio-container').addEventListener('wheel', e => {
  if(e.deltaY > 0){
    let next = (currentProject + 1) % projects.length;
    showProject(next);
  } else if(e.deltaY < 0){
    let prev = (currentProject - 1 + projects.length) % projects.length;
    showProject(prev);
  }
});

// Touch Swipe for Mobile
let startX = 0;
document.querySelector('.portfolio-container').addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});
document.querySelector('.portfolio-container').addEventListener('touchend', e => {
  let endX = e.changedTouches[0].clientX;
  if(startX - endX > 50){ // swipe left
    let next = (currentProject + 1) % projects.length;
    showProject(next);
  } else if(endX - startX > 50){ // swipe right
    let prev = (currentProject - 1 + projects.length) % projects.length;
    showProject(prev);
  }
});

// Projects expand
const expanded = document.querySelector('.project-expanded');
const title = document.getElementById('expandedTitle');
const link = document.getElementById('expandedLink');
const source = document.getElementById('expandedSource');
const stars = document.getElementById('expandedStars');
const closeBtn = document.getElementById('closeExpanded');

projects.forEach(card => {
  card.addEventListener('click', () => {
    projects[currentProject].style.display='none';
    expanded.style.display='flex';
    title.textContent = card.dataset.title;
    link.href = card.dataset.link;
    source.href = card.dataset.source;
    stars.textContent = card.dataset.stars;
  });
});

closeBtn.addEventListener('click', () => {
  projects[currentProject].style.display='flex';
  expanded.style.display='none';
});

// Clients Slider
const clients = document.querySelectorAll('.client-card');
let currentClient = 0;
clients.forEach((card, index) => {
  if(index !== currentClient) card.style.display = 'none';
});

function showClient(index) {
  clients[currentClient].style.display = 'none';
  currentClient = index;
  clients[currentClient].style.display = 'flex';
}

// Wheel Scroll for Desktop
document.querySelector('.clients-container').addEventListener('wheel', e => {
  if(e.deltaY > 0){
    let next = (currentClient + 1) % clients.length;
    showClient(next);
  } else if(e.deltaY < 0){
    let prev = (currentClient - 1 + clients.length) % clients.length;
    showClient(prev);
  }
});

// Touch Swipe for Mobile
let clientStartX = 0;
document.querySelector('.clients-container').addEventListener('touchstart', e => {
  clientStartX = e.touches[0].clientX;
});
document.querySelector('.clients-container').addEventListener('touchend', e => {
  let endX = e.changedTouches[0].clientX;
  if(clientStartX - endX > 50){ // swipe left
    let next = (currentClient + 1) % clients.length;
    showClient(next);
  } else if(endX - clientStartX > 50){ // swipe right
    let prev = (currentClient - 1 + clients.length) % clients.length;
    showClient(prev);
  }
});
