import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

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

window.toggleForms = function() {
  document.getElementById("login-box").classList.toggle("hidden");
  document.getElementById("register-box").classList.toggle("hidden");
};

function generateId() {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
}

// الرسائل المعروفة
const firebaseErrors = {
  "auth/email-already-in-use": "❌ البريد الإلكتروني مستخدم مسبقًا.",
  "auth/invalid-email": "❌ البريد الإلكتروني غير صالح.",
  "auth/weak-password": "❌ كلمة المرور ضعيفة.",
  "auth/user-not-found": "❌ المستخدم غير موجود.",
  "auth/wrong-password": "❌ كلمة المرور خاطئة."
};

function showMessage(msg, type="success") {
  const messageBox = document.getElementById("message-box");
  const loginBox = document.getElementById("login-box");
  const registerBox = document.getElementById("register-box");

  // إخفاء الفورمز أثناء الرسالة
  loginBox.style.display = "none";
  registerBox.style.display = "none";

  messageBox.textContent = msg;
  messageBox.className = `message-box ${type}`;
  messageBox.style.display = "block";

  setTimeout(() => {
    messageBox.style.display = "none";
    loginBox.style.display = "flex";
    registerBox.style.display = "flex";
  }, 3000);
}

function showWelcome(name) {
  const welcomeBox = document.getElementById("welcome-box");
  const loginBox = document.getElementById("login-box");

  loginBox.style.display = "none";

  welcomeBox.textContent = `مرحبًا ${name} 👋`;
  welcomeBox.style.display = "block";

  setTimeout(() => {
    welcomeBox.style.display = "none";
    loginBox.style.display = "flex";
  }, 3000);
}

// تسجيل جديد
window.register = async function() {
  const name = document.getElementById("reg-name").value.trim();
  const countryInput = document.getElementById("country-code").value.trim();
  const phone = document.getElementById("reg-phone").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-password").value.trim();

  if(!name || !countryInput || !phone || !email || !password){
    showMessage("❌ يرجى ملء جميع الحقول", "error");
    return;
  }

  let countryName = countryInput.split(" (+")[0] || countryInput;
  let countryCode = countryInput.match(/\+(\d+)/)?.[1] || "";

  try{
    const userCredential = await createUserWithEmailAndPassword(auth,email,password);
    const user = userCredential.user;

    await setDoc(doc(db,"users",user.uid),{
      id: generateId(),
      name,
      country: countryName,
      countryCode,
      phone,
      email,
      role:"client"
    });

    showMessage("✅ تم التسجيل بنجاح!");
    toggleForms();
  }catch(err){
    showMessage(firebaseErrors[err.code] || "❌ حدث خطأ أثناء التسجيل","error");
  }
};

// تسجيل دخول
window.login = async function(){
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();

  if(!email || !password){
    showMessage("❌ يرجى إدخال البريد وكلمة المرور","error");
    return;
  }

  try{
    const userCredential = await signInWithEmailAndPassword(auth,email,password);
    const user = userCredential.user;

    showMessage("✅ تم تسجيل الدخول بنجاح!");
    showWelcome(user.email.split("@")[0]);

    setTimeout(()=>{ window.location.href = "assets/pages/dashboard/index.html"; },2000);

  }catch(err){
    showMessage(firebaseErrors[err.code] || "❌ حدث خطأ أثناء تسجيل الدخول","error");
  }
};

// جلب الدول
async function loadCountries(){
  try{
    const res = await fetch("assets/settings/countries.json");
    const countries = await res.json();
    const datalist = document.getElementById("countries-list");

    countries.sort((a,b)=>a.name.localeCompare(b.name));

    countries.forEach(c=>{
      const option = document.createElement("option");
      option.value = `${c.name} (+${c.code})`;
      datalist.appendChild(option);
    });
  }catch(err){
    showMessage("❌ فشل تحميل الدول","error");
    console.error(err);
  }
}

loadCountries();
