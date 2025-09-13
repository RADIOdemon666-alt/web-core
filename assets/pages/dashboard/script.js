// ======= Project Form =======
const startBtn = document.getElementById("startProjectBtn");
const projectForm = document.getElementById("projectForm");
const closeForm = document.getElementById("closeForm");
const sendBtn = document.getElementById("sendBtn");

startBtn.addEventListener("click", () => {
  projectForm.style.display = "flex";
});

closeForm.addEventListener("click", () => {
  projectForm.style.display = "none";
});

// إرسال البيانات على WhatsApp
sendBtn.addEventListener("click", () => {
  const name = document.getElementById("nameInput").value.trim();
  const email = document.getElementById("emailInput").value.trim();
  const request = document.getElementById("requestInput").value.trim();

  if (!name || !email || !request) {
    alert("يرجى ملء جميع الحقول!");
    return;
  }

  const message = `مرحبا، لدي طلب مشروع:\nالاسم: ${name}\nالإيميل: ${email}\nالطلب: ${request}`;
  const whatsappLink = `https://wa.me/201500564191?text=${encodeURIComponent(message)}`;
  window.open(whatsappLink, "_blank");

  // اغلاق الفورم وتنظيف الحقول
  projectForm.style.display = "none";
  document.getElementById("nameInput").value = "";
  document.getElementById("emailInput").value = "";
  document.getElementById("requestInput").value = "";
});

// ======= Portfolio Projects Slider =======
const projects = document.querySelectorAll(".project-card");
let currentProject = 0;

function showProject(index) {
  projects.forEach((proj, i) => {
    if (i === index) {
      proj.style.transform = "translateX(0)";
      proj.style.opacity = "1";
      proj.style.zIndex = "10";
    } else if (i < index) {
      proj.style.transform = "translateX(-120%)";
      proj.style.opacity = "0.5";
      proj.style.zIndex = "5";
    } else {
      proj.style.transform = "translateX(120%)";
      proj.style.opacity = "0.5";
      proj.style.zIndex = "5";
    }
  });
}

// إظهار المشروع الأول عند تحميل الصفحة
showProject(currentProject);

// السحب بالماوس/لمس
let startX = 0;
let isDragging = false;

projects.forEach((proj) => {
  proj.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
  });
  proj.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
  });

  proj.addEventListener("mouseup", (e) => handleSwipe(e.clientX));
  proj.addEventListener("touchend", (e) => handleSwipe(e.changedTouches[0].clientX));
});

function handleSwipe(endX) {
  if (!isDragging) return;
  let diff = endX - startX;
  if (diff > 50) { // swipe right
    currentProject = currentProject > 0 ? currentProject - 1 : projects.length - 1;
  } else if (diff < -50) { // swipe left
    currentProject = currentProject < projects.length - 1 ? currentProject + 1 : 0;
  }
  showProject(currentProject);
  isDragging = false;
}

// ======= Clients Slider =======
const clients = document.querySelectorAll(".client-card");
let currentClient = 0;

function showClient(index) {
  clients.forEach((c, i) => {
    if (i === index) {
      c.style.transform = "translateX(0)";
      c.style.opacity = "1";
      c.style.zIndex = "10";
    } else if (i < index) {
      c.style.transform = "translateX(-120%)";
      c.style.opacity = "0.5";
      c.style.zIndex = "5";
    } else {
      c.style.transform = "translateX(120%)";
      c.style.opacity = "0.5";
      c.style.zIndex = "5";
    }
  });
}

// إظهار العميل الأول عند تحميل الصفحة
showClient(currentClient);

// السحب بالماوس/لمس للعميل
let clientStartX = 0;
let isClientDragging = false;

clients.forEach((c) => {
  c.addEventListener("mousedown", (e) => {
    isClientDragging = true;
    clientStartX = e.clientX;
  });
  c.addEventListener("touchstart", (e) => {
    isClientDragging = true;
    clientStartX = e.touches[0].clientX;
  });

  c.addEventListener("mouseup", (e) => handleClientSwipe(e.clientX));
  c.addEventListener("touchend", (e) => handleClientSwipe(e.changedTouches[0].clientX));
});

function handleClientSwipe(endX) {
  if (!isClientDragging) return;
  let diff = endX - clientStartX;
  if (diff > 50) { // swipe right
    currentClient = currentClient > 0 ? currentClient - 1 : clients.length - 1;
  } else if (diff < -50) { // swipe left
    currentClient = currentClient < clients.length - 1 ? currentClient + 1 : 0;
  }
  showClient(currentClient);
  isClientDragging = false;
  }
