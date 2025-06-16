function prikaziSvePoKategorijama() {
  db.collection("zivotinje").get().then((snapshot) => {
    const sve = {};

    snapshot.forEach((doc) => {
      const z = doc.data();
      z.id = doc.id;

      if (!sve[z.kategorija]) {
        sve[z.kategorija] = [];
      }

      sve[z.kategorija].push(z);
    });

    prikaziKategorije(sve);
  });
}

function prikaziKategorije(podaci) {
  const wrapper = document.getElementById("kategorije-prikaz");
  wrapper.innerHTML = "";

  Object.keys(podaci).forEach((kategorija) => {
    const section = document.createElement("section");
    section.className = "kategorija-blok";

    const naslov = document.createElement("h3");
    naslov.textContent = kategorija;
    section.appendChild(naslov);

    const container = document.createElement("div");
    container.className = "kategorija-container";

    podaci[kategorija].forEach((z) => {
      const card = document.createElement("div");
      card.className = "animal-card";

      card.innerHTML = `
        <img src="${z.slika}" alt="${z.vrsta}">
        <h3>${z.vrsta}</h3>
        <p>Spol: ${z.spol}</p>
        <p>Starost: ${z.starost}</p>
        <p>Cijena: ${z.cijena} €</p>
        <button class="kosarica-gumb" data-id="${z.id}">Dodaj u košaricu</button>
      `;

      card.querySelector(".kosarica-gumb").addEventListener("click", () => {
        dodajUKosaricu(z.id);
      });

      container.appendChild(card);
    });

    section.appendChild(container);
    wrapper.appendChild(section);
  });
}

function dodajUKosaricu(id) {
  let kosarica = JSON.parse(localStorage.getItem("kosarica")) || [];
  kosarica.push(id);
  localStorage.setItem("kosarica", JSON.stringify(kosarica));
  alert("Životinja je dodana u košaricu.");
}

window.onload = prikaziSvePoKategorijama;
