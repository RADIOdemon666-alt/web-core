// الحصول على العناصر
const startBtn = document.getElementById('startProjectBtn');
const modal = document.getElementById('projectForm');
const closeBtn = document.getElementById('closeForm');
const sendBtn = document.getElementById('sendBtn');

// التأكد من وجود العناصر قبل إضافة الأحداث
if (startBtn && modal && closeBtn && sendBtn) {

  // فتح الموديل عند الضغط على زر "ابدأ مشروعك"
  startBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
  });

  // غلق الموديل عند الضغط على زر الإغلاق
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // غلق الموديل عند الضغط خارج المحتوى
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // إرسال البيانات على WhatsApp
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

    // فتح رابط WhatsApp في تبويب جديد
    window.open(waLink, '_blank');

    // مسح الحقول
    document.getElementById('nameInput').value = '';
    document.getElementById('emailInput').value = '';
    document.getElementById('requestInput').value = '';

    // غلق الموديل بعد الإرسال
    modal.style.display = 'none';
  });

}
