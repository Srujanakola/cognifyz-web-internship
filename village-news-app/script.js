import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA_P-2_tFNsTIuCx7cfK4F89gJhIAp7nGU",
  authDomain: "village-news-app.firebaseapp.com",
  projectId: "village-news-app",
  storageBucket: "village-news-app.firebasestorage.app",
  messagingSenderId: "344764768351",
  appId: "1:344764768351:web:fb280518069e28f958fbea",
  measurementId: "G-ZQC9KJHH7X"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const newsRef = ref(db, "news");


/* ---------------- LOGIN SYSTEM ---------------- */

window.login = function () {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, pass)
    .then(() => alert("Login successful"))
    .catch(err => alert(err.message));
};

window.logout = function () {
  signOut(auth);
};

onAuthStateChanged(auth, user => {
  if (user) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
  } else {
    document.getElementById("loginBox").style.display = "block";
    document.getElementById("adminPanel").style.display = "none";
  }
});


/* ---------------- ADD NEWS ---------------- */

window.addNews = function () {
  const title = document.getElementById("title").value;
  const msg = document.getElementById("msg").value;

  push(newsRef, {
    title,
    msg,
    time: new Date().toLocaleString()
  });
};


/* ---------------- SHOW NEWS ---------------- */

onValue(newsRef, snapshot => {
  const data = snapshot.val();
  const list = document.getElementById("newsList");

  if(!list) return;

  list.innerHTML = "";

  for (let id in data) {
    list.innerHTML += `
      <div class="card">
        <h3>${data[id].title}</h3>
        <p>${data[id].msg}</p>
        <small>${data[id].time}</small>
      </div>
    `;
  }
});
import { remove } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";


/* ---------------- DELETE FUNCTION ---------------- */

window.deleteNews = function(id){
  remove(ref(db, "news/" + id));
};


/* ---------------- SHOW NEWS ---------------- */

onValue(newsRef, snapshot => {
  const data = snapshot.val();
  const list = document.getElementById("newsList");

  if(!list) return;

  list.innerHTML = "";

  for (let id in data) {

    const isAdmin = auth.currentUser;

    list.innerHTML += `
      <div class="card">
        <h3>${data[id].title}</h3>
        <p>${data[id].msg}</p>
        <small>${data[id].time}</small>
        ${isAdmin ? `<button onclick="deleteNews('${id}')">Delete</button>` : ""}
      </div>
    `;
  }
});
