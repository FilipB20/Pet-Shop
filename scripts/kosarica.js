// scripts/kosarica.js

document.addEventListener("DOMContentLoaded", () => {
  auth.onAuthStateChanged(user => {
    if (!user) {
      document.getElementById("kosarica-container").innerHTML = "<p>Morate biti prijavljeni.</p>";
      return;
    }

    const kosaricaDiv = document.getElementById("kosarica-container");
    const ukupnoPrikaz = document.getElementById("ukupno-prikaz");

    db.collection("kosarice").doc(user.uid).collection("stavke").onSnapshot(snapshot => {
      kosaricaDiv.innerHTML = "";
      let ukupno = 0;

      snapshot.forEach(doc => {
        const podaci = doc.data();
        ukupno += parseFloat(podaci.cijena);

        const kartica = document.createElement("div");
        kartica.classList.add("animal-card");

        kartica.innerHTML = `
          <img src="${podaci.slika}" alt="${podaci.vrsta}" />
          <div class="animal-info">
            <p><strong>Vrsta:</strong> ${podaci.vrsta}</p>
            <p><strong>Spol:</strong> ${podaci.spol}</p>
            <p><strong>Starost:</strong> ${podaci.starost}</p>
            <p><strong>Cijena:</strong> €${podaci.cijena}</p>
            <button onclick="ukloniIzKosarice('${doc.id}')">Ukloni</button>
          </div>
        `;
        kosaricaDiv.appendChild(kartica);
      });

      ukupnoPrikaz.innerHTML = `<h3>Ukupno: €${ukupno.toFixed(2)}</h3>`;
    });
  });
});

function ukloniIzKosarice(id) {
  const user = auth.currentUser;
  if (!user) return;

  db.collection("kosarice").doc(user.uid).collection("stavke").doc(id).delete();
}
