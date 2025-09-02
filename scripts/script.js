// scripts/script.js

document.addEventListener("DOMContentLoaded", async () => {
  const kategorijeDiv = document.getElementById("kategorije-prikaz");

  try {
    const querySnapshot = await db.collection("zivotinje").get();
    const zivotinje = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const kategorije = {};
    zivotinje.forEach(z => {
      if (!kategorije[z.kategorija]) {
        kategorije[z.kategorija] = [];
      }
      kategorije[z.kategorija].push(z);
    });

    for (const [kategorija, lista] of Object.entries(kategorije)) {
      const blok = document.createElement("div");
      blok.classList.add("kategorija-blok");

      const naslov = document.createElement("h3");
      naslov.textContent = kategorija;
      blok.appendChild(naslov);

      const container = document.createElement("div");
      container.classList.add("kategorija-container");

      lista.forEach(zivotinja => {
        const kartica = document.createElement("div");
        kartica.classList.add("animal-card");

        kartica.innerHTML = `
          <img src="${zivotinja.slika}" alt="${zivotinja.vrsta}" />
          <div class="animal-info">
            <p><strong>Vrsta:</strong> ${zivotinja.vrsta}</p>
            <p><strong>Spol:</strong> ${zivotinja.spol}</p>
            <p><strong>Starost:</strong> ${zivotinja.starost}</p>
            <p><strong>Cijena:</strong> €${zivotinja.cijena}</p>
          </div>
          <button onclick="dodajUKosaricu('${zivotinja.id}')">Dodaj u košaricu</button>
        `;
        container.appendChild(kartica);
      });

      blok.appendChild(container);
      kategorijeDiv.appendChild(blok);
    }

  } catch (error) {
    console.error("Greška pri dohvaćanju:", error);
  }
});

function dodajUKosaricu(id) {
  const user = auth.currentUser;
  if (!user) {
    alert("Morate biti prijavljeni za dodavanje u košaricu.");
    return;
  }

  db.collection("zivotinje").doc(id).get()
    .then(doc => {
      if (doc.exists) {
        const zivotinja = doc.data();
        db.collection("kosarice")
          .doc(user.uid)
          .collection("stavke")
          .add(zivotinja)
          .then(() => {
            alert("Dodano u košaricu!");
          });
      }
    });
}
