// scripts/login.js
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const poruka = document.getElementById("login-poruka");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      poruka.textContent = "Prijava uspješna. Preusmjeravanje...";
      const user = userCredential.user;
      setTimeout(() => {
        // Ako je admin, ide na admin, inače na početnu
        if (user.email === "admin@petshop.com") {
          window.location.href = "admin.html";
        } else {
          window.location.href = "../index.html";
        }
      }, 1500);
    } catch (error) {
      const code = error.code;
      if (code === "auth/wrong-password") poruka.textContent = "Pogrešna lozinka.";
      else if (code === "auth/user-not-found") poruka.textContent = "Korisnik ne postoji.";
      else poruka.textContent = "Greška: " + code;
    }
  });
});
