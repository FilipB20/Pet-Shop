function dohvatiSveZivotinje(callback) {
  db.collection("zivotinje").get().then((snapshot) => {
    const podaci = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      data.id = doc.id;
      podaci.push(data);
    });
    callback(podaci);
  }).catch((error) => {
    console.error("Greška kod dohvaćanja svih životinja:", error);
  });
}

function dohvatiZivotinjePoKategoriji(kategorija, callback) {
  if (kategorija === "Sve") {
    dohvatiSveZivotinje(callback);
    return;
  }

  db.collection("zivotinje").where("kategorija", "==", kategorija).get()
    .then((snapshot) => {
      const podaci = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        podaci.push(data);
      });
      callback(podaci);
    })
    .catch((error) => {
      console.error("Greška kod dohvaćanja po kategoriji:", error);
    });
}
