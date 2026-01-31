import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

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
const newsRef = ref(db, "news");

window.addNews = function(){
  const title = document.getElementById("title").value;
  const msg = document.getElementById("msg").value;

  push(newsRef, {
    title,
    msg,
    time: new Date().toLocaleString()
  });
}

onValue(newsRef, snapshot => {
  const data = snapshot.val();
  const list = document.getElementById("newsList");
  list.innerHTML="";

  for(let id in data){
    list.innerHTML += `
      <div class="card">
        <h3>${data[id].title}</h3>
        <p>${data[id].msg}</p>
        <small>${data[id].time}</small>
      </div>
    `;
  }
});
