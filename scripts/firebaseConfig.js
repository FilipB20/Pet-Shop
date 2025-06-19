const firebaseConfig = {
  apiKey: "AIzaSyDMSkLgsjs_tVJCgLUKEzltEw0j2yHihBA",
  authDomain: "pet-shop-9b4fa.firebaseapp.com",
  projectId: "pet-shop-9b4fa",
  storageBucket: "pet-shop-9b4fa.firebasestorage.app",
  messagingSenderId: "699425941364",
  appId: "1:699425941364:web:296ec92976f82c17406e21"
};


firebase.initializeApp(firebaseConfig);
window.db = firebase.firestore();