// scripts/register.js
document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");
  const poruka = document.getElementById("register-poruka");

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("register-email").value.trim();
    const password = document.getElementById("register-password").value;
    const password2 = document.getElementById("register-password2").value;

    if (password !== password2) {
      poruka.textContent = "Lozinke se ne podudaraju.";
      return;
    }

    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      poruka.textContent = "Registracija uspješna. Sada se prijavite.";
      // Nakon registracije vraćamo korisnika na login stranicu
      setTimeout(() => { window.location.href = "login.html"; }, 2000);
    } catch (error) {
      const code = error.code;
      if (code === "auth/email-already-in-use") {
        poruka.textContent = "E-mail je već registriran.";
      } else {
        poruka.textContent = "Greška: " + code;
      }
    }
  });
});
