document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("kosarica-container");
  const ukupnoPrikaz = document.getElementById("ukupno-prikaz");
  const naruciBtn = document.getElementById("naruci-btn");

  let kosarica = JSON.parse(localStorage.getItem("kosarica")) || [];

  if (kosarica.length === 0) {
    container.innerHTML = "<p>Vaša košarica je prazna.</p>";
    naruciBtn.style.display = "none";
    return;
  }

  let ukupno = 0;

  // Brojimo koliko puta se ID pojavljuje
  const brojac = {};
  kosarica.forEach(id => {
    brojac[id] = (brojac[id] || 0) + 1;
  });

  const jedinstveniId = [...new Set(kosarica)];

  const dohvaceni = jedinstveniId.map(id =>
    db.collection("zivotinje").doc(id).get().then(doc => {
      const data = doc.data();
      data.id = doc.id;
      return data;
    })
  );

  Promise.all(dohvaceni).then((zivotinje) => {
    zivotinje.forEach((z) => {
      const kolicina = brojac[z.id];
      const cijenaUkupna = z.cijena * kolicina;
      ukupno += cijenaUkupna;

      const card = document.createElement("div");
      card.className = "animal-card";
      card.innerHTML = `
        <img src="${z.slika}" alt="${z.vrsta}">
        <h3>${z.vrsta}</h3>
        <p>Spol: ${z.spol}</p>
        <p>Starost: ${z.starost}</p>
        <p>Cijena: ${z.cijena} €</p>
        <p>Količina: ${kolicina}</p>
        <p>Ukupno: ${cijenaUkupna.toFixed(2)} €</p>
        <button onclick="ukloniIzKosarice('${z.id}')">Ukloni sve</button>
      `;
      container.appendChild(card);
    });

    ukupnoPrikaz.innerHTML = `<h3>Ukupno za platiti: ${ukupno.toFixed(2)} €</h3>`;
  });

  naruciBtn.addEventListener("click", () => {
    alert("✅ Narudžba je zaprimljena!");
    localStorage.removeItem("kosarica");
    location.reload();
  });
});

function ukloniIzKosarice(id) {
  let kosarica = JSON.parse(localStorage.getItem("kosarica")) || [];
  kosarica = kosarica.filter(item => item !== id);
  localStorage.setItem("kosarica", JSON.stringify(kosarica));
  location.reload();
}
