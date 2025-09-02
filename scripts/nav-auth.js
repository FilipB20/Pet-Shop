// scripts/nav-auth.js
document.addEventListener("DOMContentLoaded", () => {
  // provjera prijavljenog korisnika
  firebase.auth().onAuthStateChanged((user) => {
    const loginLink = document.getElementById("loginLink");
    const logoutLink = document.getElementById("logoutLink");

    if (loginLink && logoutLink) {
      if (user) {
        // korisnik prijavljen: sakrij link za prijavu, prikaži odjavu
        loginLink.style.display = "none";
        logoutLink.style.display = "inline";
        // postavi funkciju za odjavu
        logoutLink.onclick = function (e) {
          e.preventDefault();
          firebase.auth().signOut().then(() => {
            // ne brišemo košaricu — localStorage ostaje
            window.location.reload(); // osvježi stranicu
          });
        };
      } else {
        // korisnik nije prijavljen: prikaži prijavu, sakrij odjavu
        loginLink.style.display = "inline";
        logoutLink.style.display = "none";
      }
    }
  });
});
