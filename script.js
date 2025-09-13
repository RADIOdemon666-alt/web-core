import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

// إعدادات Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCBTPlQVGgqL1MmDuZRSJMlS244AtAzZ6E",
  authDomain: "web-zone-c95aa.firebaseapp.com",
  projectId: "web-zone-c95aa",
  storageBucket: "web-zone-c95aa.firebasestorage.app",
  messagingSenderId: "776469157795",
  appId: "1:776469157795:web:d69518695895cff22e2c16",
  measurementId: "G-9NLEWJYZ6J"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// توليد ID عشوائي 10 أرقام
function generateId() {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
}

// الرسائل
function showMessage(msg, type="error") {
  const messageBox = document.getElementById("message-box");
  const loginBox = document.getElementById("login-box");
  const registerBox = document.getElementById("register-box");
  messageBox.textContent = msg;
  messageBox.className = type==="error" ? "message-box error" : "message-box success";
  messageBox.style.display = "block";

  // إخفاء الكارد أثناء الرسالة
  loginBox.style.visibility = "hidden";
  registerBox.style.visibility = "hidden";

  setTimeout(()=>{
    messageBox.style.display = "none";
    loginBox.style.visibility = "visible";
    registerBox.style.visibility = "visible";
  }, 3000);
}

// الترحيب
function showWelcome(msg) {
  const welcomeBox = document.getElementById("welcome-box");
  welcomeBox.textContent = msg;
  welcomeBox.style.display = "block";
}

// التبديل بين الكاردين
window.toggleForms = function() {
  const loginBox = document.getElementById("login-box");
  const registerBox = document.getElementById("register-box");
  loginBox.classList.toggle("hidden");
  registerBox.classList.toggle("hidden");
};

// تسجيل جديد
window.register = async function() {
  const name = document.getElementById("reg-name").value;
  const phone = document.getElementById("reg-phone").value;
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-password").value;

  // الدول
  const selected = document.querySelector("#country-select .selected");
  const countryName = selected.dataset.name;
  const countryCode = selected.dataset.code;
  const countryFlag = selected.dataset.flag;

  if(!name || !phone || !email || !password || !countryName){
    showMessage("❌ الرجاء تعبئة جميع الحقول واختيار الدولة", "error");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      id: generateId(),
      name: name,
      country: countryName,
      countryCode: countryCode,
      countryFlag: countryFlag,
      phone: phone,
      email: email,
      role: "client"
    });

    showMessage("✅ تم التسجيل بنجاح!", "success");
    toggleForms();

  } catch (error) {
    let msg = "❌ خطأ غير معروف";
    if(error.code==="auth/email-already-in-use") msg="❌ البريد الإلكتروني مستخدم مسبقًا";
    else if(error.code==="auth/invalid-email") msg="❌ البريد الإلكتروني غير صالح";
    else if(error.code==="auth/weak-password") msg="❌ كلمة المرور ضعيفة";
    showMessage(msg, "error");
    console.error(error);
  }
};

// تسجيل دخول
window.login = async function() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  if(!email || !password){
    showMessage("❌ الرجاء إدخال البريد الإلكتروني وكلمة المرور", "error");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    showWelcome(`🎉 مرحبًا بك!`);
    setTimeout(()=>{
      window.location.href = "assets/pages/dashboard/index.html";
    }, 1500);
  } catch(error) {
    let msg = "❌ البريد أو كلمة المرور غير صحيحة";
    showMessage(msg, "error");
    console.error(error);
  }
};

// جلب الدول وعرضها بشكل Discord style
async function loadCountriesDiscord() {
  try {
    const res = await fetch("assets/settings/countries.json");
    const countries = await res.json();
    countries.sort((a,b)=>a.name.localeCompare(b.name));

    const select = document.getElementById("country-select");
    const selected = select.querySelector(".selected");
    const optionsList = select.querySelector(".options");

    // إضافة الدول
    countries.forEach(c=>{
      const li = document.createElement("li");
      li.textContent = `${c.flag} ${c.name} (+${c.code})`;
      li.dataset.name = c.name;
      li.dataset.code = c.code;
      li.dataset.flag = c.flag;
      optionsList.appendChild(li);

      li.addEventListener("click", ()=>{
        selected.textContent = li.textContent;
        selected.dataset.name = li.dataset.name;
        selected.dataset.code = li.dataset.code;
        selected.dataset.flag = li.dataset.flag;
        optionsList.classList.add("hidden");
      });
    });

    // عند الضغط على selected تفتح/تغلق القائمة
    selected.addEventListener("click", (e)=>{
      e.stopPropagation(); // يمنع غلق القائمة مباشرة عند الضغط
      optionsList.classList.toggle("hidden");
    });

    // إغلاق القائمة عند الضغط في أي مكان خارجها
    document.addEventListener("click", ()=>{
      optionsList.classList.add("hidden");
    });

  } catch(err){
    showMessage("❌ فشل تحميل الدول", "error");
    console.error(err);
  }
}

loadCountriesDiscord();
