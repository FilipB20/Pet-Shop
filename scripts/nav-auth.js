// scripts/nav-auth.js

document.addEventListener("DOMContentLoaded", () => {
  const loginLink = document.getElementById("loginLink");
  const logoutLink = document.getElementById("logoutLink");

  auth.onAuthStateChanged(user => {
    if (user) {
      loginLink.style.display = "none";
      logoutLink.style.display = "inline-block";

      logoutLink.addEventListener("click", () => {
        auth.signOut().then(() => {
          window.location.href = "../index.html";
        });
      });
    } else {
      loginLink.style.display = "inline-block";
      logoutLink.style.display = "none";
    }
  });
});
