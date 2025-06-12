// Primjer životinja (simulacija baze podataka)
const zivotinje = [
  {
    id: 1,
    naziv: "Njemački ovčar",
    vrsta: "Pas",
    starost: "2 godine",
    spol: "Mužjak",
    cijena: 300,
    slika: "pas.jpg"
  },
  {
    id: 2,
    naziv: "Britanska mačka",
    vrsta: "Mačka",
    starost: "1 godina",
    spol: "Ženka",
    cijena: 250,
    slika: "macka.jpg"
  }
];

// Prikaz životinja na stranici
function prikaziZivotinje() {
  const container = document.getElementById("zivotinje-container");
  zivotinje.forEach(z => {
    const card = document.createElement("div");
    card.className = "animal-card";
    card.innerHTML = `
      <img src="${z.slika}" alt="${z.naziv}">
      <h3>${z.naziv}</h3>
      <p>Vrsta: ${z.vrsta}</p>
      <p>Spol: ${z.spol}</p>
      <p>Starost: ${z.starost}</p>
      <p>Cijena: ${z.cijena} €</p>
      <button onclick="dodajUKosaricu(${z.id})">Dodaj u košaricu</button>
    `;
    container.appendChild(card);
  });
}

// Dodavanje u košaricu (koristi localStorage)
function dodajUKosaricu(id) {
  let kosarica = JSON.parse(localStorage.getItem("kosarica")) || [];
  const zivotinja = zivotinje.find(z => z.id === id);
  kosarica.push(zivotinja);
  localStorage.setItem("kosarica", JSON.stringify(kosarica));
  alert(`${zivotinja.naziv} je dodan(a) u košaricu.`);
}

// Poziv funkcije nakon učitavanja stranice
window.onload = prikaziZivotinje;
