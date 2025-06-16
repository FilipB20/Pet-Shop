// NE KORISTI "export" ili "import" – to nije podržano bez module loadera

// Firebase konfiguracija i inicijalizacija
const firebaseConfig = {
  apiKey: "AIzaSyDMSkLgsj5_tvJCgLUKEzltEw8JzYihHBA",
  authDomain: "pet-shop-9b4fa.firebaseapp.com",
  projectId: "pet-shop-9b4fa",
  storageBucket: "pet-shop-9b4fa.appspot.com",
  messagingSenderId: "699425941364",
  appId: "1:699425941364:web:296ec92976f82c17406e21"
};

// Inicijalizacija Firebase aplikacije
const app = firebase.initializeApp(firebaseConfig);

// Firestore – učini ga globalno dostupnim
window.db = firebase.firestore(app);
