document.addEventListener("DOMContentLoaded", function () {
  const forma = document.getElementById("forma-zivotinja");
  const poruka = document.getElementById("poruka");

  forma.addEventListener("submit", function (e) {
    e.preventDefault();

    const podaci = {
      vrsta: forma.vrsta.value.trim(),
      spol: forma.spol.value.trim(),
      starost: forma.starost.value.trim(),
      cijena: parseFloat(forma.cijena.value),
      slika: forma.slika.value.trim(),
      kategorija: forma.kategorija.value
    };

    if (!db) {
      poruka.textContent = "Greška: Firestore nije dostupan.";
      return;
    }

    db.collection("zivotinje").add(podaci)
      .then(() => {
        poruka.textContent = "✅ Životinja uspješno dodana!";
        forma.reset();
      })
      .catch((err) => {
        console.error("Greška pri dodavanju:", err);
        poruka.textContent = "Došlo je do greške. Pokušaj ponovno.";
      });
  });
});
