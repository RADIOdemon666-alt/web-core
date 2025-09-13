// فتح وإغلاق المودال
const modal = document.getElementById('contactModal');
const openBtn = document.getElementById('openModal');
const closeBtn = document.querySelector('.close');

openBtn.onclick = () => { modal.style.display = 'flex'; }
closeBtn.onclick = () => { modal.style.display = 'none'; }
window.onclick = e => { if(e.target == modal) modal.style.display = 'none'; }

// إرسال بيانات عبر واتساب
document.getElementById('sendBtn').addEventListener('click', () => {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  if(!name || !email || !message){ alert("يرجى ملء جميع الحقول!"); return; }
  const text = `اسم: ${name}%0Aالبريد: ${email}%0Aالرسالة: ${message}`;
  window.open(`https://wa.me/201500564191?text=${text}`, '_blank');
});
