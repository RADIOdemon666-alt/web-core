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

// رسائل الخطأ المخصصة
const firebaseErrors = {
  "auth/email-already-in-use": "❌ هذا البريد مستخدم من قبل",
  "auth/invalid-email": "❌ البريد غير صالح",
  "auth/weak-password": "❌ كلمة المرور ضعيفة",
  "auth/user-not-found": "❌ المستخدم غير موجود",
  "auth/wrong-password": "❌ كلمة المرور خاطئة"
};

// دوال عرض الرسائل والترحيب
function showMessage(type, text) {
  let box = document.getElementById("message-box");
  if(!box){
    box = document.createElement("div");
    box.id = "message-box";
    document.querySelector(".container").prepend(box);
  }
  box.className = "message-box " + type;
  box.textContent = text;
  box.style.display = "block";
  setTimeout(() => box.style.display = "none", 4000);
}

function showWelcome(name) {
  let box = document.getElementById("welcome-box");
  if(!box){
    box = document.createElement("div");
    box.id = "welcome-box";
    document.querySelector(".container").prepend(box);
  }
  box.textContent = `أهلاً وسهلاً بك، ${name} 🌟`;
  box.className = "welcome-box";
  box.style.display = "block";
}

// تسجيل جديد
window.register = async function () {
  const name = document.getElementById("reg-name").value;
  const phone = document.getElementById("reg-phone").value;
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-password").value;
  const countryInput = document.getElementById("country-code").value;

  const countryData = countryInput.split(" ");
  const countryFlag = countryData[1] || "";
  const countryCode = countryData[0].replace("+", "") || "";
  const countryName = countryData.slice(2).join(" ") || "";

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

    showMessage("success", "✅ تم التسجيل بنجاح!");
    showWelcome(name);

    setTimeout(() => {
      window.location.href = "assets/pages/dashboard/index.html";
    }, 1500);

  } catch (error) {
    const msg = firebaseErrors[error.code] || "❌ حدث خطأ غير متوقع";
    showMessage("error", msg);
  }
};

// تسجيل دخول
window.login = async function () {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    showMessage("success", "✅ تم تسجيل الدخول!");
    showWelcome(user.email);

    setTimeout(() => {
      window.location.href = "assets/pages/dashboard/index.html";
    }, 1500);

  } catch (error) {
    const msg = firebaseErrors[error.code] || "❌ حدث خطأ غير متوقع";
    showMessage("error", msg);
  }
};

// جلب الدول وعرضها داخل input مع datalist
async function loadCountries() {
  try {
    const res = await fetch("assets/settings/countries.json");
    const countries = await res.json();

    const input = document.getElementById("country-code");
    const datalist = document.createElement("datalist");
    datalist.id = "countries-list";
    document.body.appendChild(datalist);
    input.setAttribute("list", "countries-list");

    countries.sort((a, b) => a.name.localeCompare(b.name));

    countries.forEach(c => {
      const option = document.createElement("option");
      option.value = `+${c.code} ${c.flag} ${c.name}`;
      datalist.appendChild(option);
    });

  } catch (err) {
    console.error("❌ فشل تحميل الدول من JSON:", err);
  }
}

loadCountries();
