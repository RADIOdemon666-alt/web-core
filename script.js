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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// التبديل بين الكاردين
window.toggleForms = function () {
  document.getElementById("login-box").classList.toggle("hidden");
  document.getElementById("register-box").classList.toggle("hidden");
};

// توليد ID عشوائي 10 أرقام
function generateId() {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
}

// تسجيل جديد
window.register = async function () {
  const name = document.getElementById("reg-name").value;
  const select = document.getElementById("country-code");
  const phone = document.getElementById("reg-phone").value;
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-password").value;

  // جلب بيانات الدولة المختارة
  const selectedOption = select.options[select.selectedIndex];
  const countryName = selectedOption.getAttribute("data-name");
  const countryCode = selectedOption.value;
  const countryFlag = selectedOption.getAttribute("data-flag");

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

    alert("✅ تم التسجيل بنجاح!");
    toggleForms();
  } catch (error) {
    alert("❌ خطأ: " + error.message);
  }
};

// تسجيل دخول
window.login = async function () {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("✅ تم تسجيل الدخول بنجاح!");
  } catch (error) {
    alert("❌ خطأ: " + error.message);
  }
};

// جلب الدول من ملف JSON محلي وعرضها (العلم + الكود فقط)
async function loadCountries() {
  try {
    const res = await fetch("assets/Settings/countries.json");
    const countries = await res.json();
    const select = document.getElementById("country-code");

    countries.sort((a, b) => a.name.localeCompare(b.name));

    countries.forEach(c => {
      const option = document.createElement("option");
      option.value = c.code; // الكود فقط
      option.textContent = `${c.flag} +${c.code}`; // يظهر فقط العلم والكود
      option.setAttribute("data-name", c.name); // الاسم للفايرستور
      option.setAttribute("data-flag", c.flag); // العلم للفايرستور
      select.appendChild(option);
    });

  } catch (err) {
    console.error("❌ فشل تحميل الدول من JSON:", err);
  }
}

loadCountries();
