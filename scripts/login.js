document.addEventListener("DOMContentLoaded", function () {
  const forma = document.getElementById("login-form");
  const poruka = document.getElementById("login-poruka");

  forma.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = forma.email.value.trim();
    const password = forma.password.value;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        poruka.textContent = "✅ Prijava uspješna. Preusmjeravanje...";

        setTimeout(() => {
          if (user.email === "admin@petshop.com") {
            window.location.href = "admin.html";
          } else {
            window.location.href = "../index.html";
          }
        }, 1500);
      })
      .catch((error) => {
        console.error("Greška:", error);
        const kod = error.code;
        const poruke = {
          "auth/user-not-found": "❌ Korisnik ne postoji.",
          "auth/wrong-password": "❌ Pogrešna lozinka.",
          "auth/invalid-email": "❌ Neispravan email.",
          "auth/too-many-requests": "⚠️ Previše pokušaja. Pokušajte kasnije."
        };
        poruka.textContent = poruke[kod] || "❌ Greška: " + kod;
      });
  });
});
