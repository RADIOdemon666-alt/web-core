// script.js
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

// تبديل بين الفورمين
window.toggleForms = function () {
  document.getElementById("login-box").classList.toggle("hidden");
  document.getElementById("register-box").classList.toggle("hidden");
};

// توليد ID عشوائي 10 أرقام
function generateId() {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
}

// تسجيل دخول
window.login = async function () {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  if (!email || !password) {
    alert("❌ الرجاء ملء جميع الحقول!");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("✅ تم تسجيل الدخول بنجاح!");
  } catch (error) {
    alert("❌ خطأ: " + error.message);
  }
};

// تسجيل جديد
window.register = async function () {
  const name = document.getElementById("reg-name").value;
  const phoneInput = document.getElementById("reg-phone").value;
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-password").value;

  if (!name || !phoneInput || !email || !password) {
    alert("❌ الرجاء ملء جميع الحقول!");
    return;
  }

  // الرقم النهائي: +رمز_الدولة + الرقم
  const fullPhone = phoneInput.replace(/\s+/g, '');

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      id: generateId(),
      name: name,
      fullPhone: fullPhone,
      email: email,
      role: "client"
    });

    alert("✅ تم التسجيل بنجاح!");
    toggleForms();

  } catch (error) {
    alert("❌ خطأ: " + error.message);
  }
};

// تحميل قائمة الدول
async function loadCountries() {
  try {
    const res = await fetch("https://restcountries.com/v3.1/all");
    const countries = await res.json();
    const select = document.getElementById("country-code");

    countries.sort((a, b) => a.name.common.localeCompare(b.name.common));

    countries.forEach(c => {
      if (c.idd && c.idd.root) {
        const suffix = (c.idd.suffixes && c.idd.suffixes.length > 0) ? c.idd.suffixes[0] : "";
        const fullCode = `${c.idd.root}${suffix}`;

        const option = document.createElement("option");
        option.value = fullCode;
        option.textContent = `${c.flag || ""} ${c.name.common} (+${fullCode})`;
        select.appendChild(option);
      }
    });

    setDefaultCountry();
    updatePhoneDisplay();

  } catch (err) {
    console.error("❌ فشل تحميل أكواد الدول:", err);
  }
}

// اختيار الدولة تلقائيًا حسب IP
async function setDefaultCountry() {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    const countryCode = data.country_calling_code || "+20";

    const select = document.getElementById("country-code");
    if (select) {
      const matchedOption = [...select.options].find(opt => opt.value === countryCode.replace("+",""));
      if (matchedOption) select.value = matchedOption.value;
    }
  } catch (err) {
    console.warn("⚠️ لم نتمكن من تحديد الدولة تلقائيًا:", err);
  }
}

// دمج رمز الدولة مع الرقم أثناء الكتابة
const regPhone = document.getElementById("reg-phone");
const countrySelect = document.getElementById("country-code");

function updatePhoneDisplay() {
  const code = countrySelect.value ? `+${countrySelect.value}` : "";
  const number = regPhone.value.replace(/\D/g, '');
  const flag = countrySelect.selectedOptions[0]?.textContent.match(/[\p{Emoji}]/u)?.[0] || "";

  regPhone.value = `${flag} ${code} ${number}`;
}

regPhone.addEventListener("input", () => {
  updatePhoneDisplay();
});

countrySelect.addEventListener("change", () => {
  updatePhoneDisplay();
});

regPhone.addEventListener("focus", () => {
  // إزالة العلم مؤقتًا لتسهيل الكتابة
  regPhone.value = regPhone.value.replace(/^[\p{Emoji}\s]+/, '');
});

regPhone.addEventListener("blur", () => {
  updatePhoneDisplay();
});

// استدعاء تحميل الدول
loadCountries();
