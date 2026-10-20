
 // Konstruktor
function Konyv(cim, szerzo, kiadasiEv, oldalszám) {
    this.cim = cim;
    this.szerzo = szerzo;
    this.kiadasiEv = kiadasiEv;
    this.oldalszam = oldalszám;
    this.kolcsonozve = false;
}

const elsoKonyv = new Konyv("A Gyűrűk Ura", "J.R.R. Tolkien", 1954, 1178);
const masodikKonyv = new Konyv("1984", "George Orwell", 1949, 328);
const harmadikKonyv = new Konyv("A kis herceg", "Antoine de Saint-Exupéry", 1943, 96);

const konyvek = [elsoKonyv, masodikKonyv, harmadikKonyv];

const konyvekElem = document.getElementById("konyvek");

// Könyvek táblázatos megjelenítése
function megjelenitKonyvek() {
    konyvekElem.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Cím</th>
                    <th>Szerző</th>
                    <th>Kiadási év</th>
                    <th>Oldalszám</th>
                    <th>Állapot</th>
                    <th>Művelet</th>
                </tr>
            </thead>
            <tbody id="konyvekTabla"></tbody>
        </table>
    `;

    const konyvekTabla = document.getElementById("konyvekTabla");

    konyvek.forEach(function(konyv, index) {
        konyvekTabla.innerHTML += `
            <tr>
                <td>${konyv.cim}</td>
                <td>${konyv.szerzo}</td>
                <td>${konyv.kiadasiEv}</td>
                <td>${konyv.oldalszam}</td>
                <td>${konyv.kolcsonozve ? "Kölcsönözve" : "Kölcsönözhető"}</td>
                <td>
                    <button onclick="kolcsonzes(${index})">
                        ${konyv.kolcsonozve ? "Visszahozás" : "Kölcsönzés"}
                    </button>
                </td>
            </tr>
        `;
    });
}

// Kölcsönzés és visszahozás
function kolcsonzes(index) {
    if (konyvek[index].kolcsonozve == false) {
        konyvek[index].kolcsonozve = true;
    } else {
        konyvek[index].kolcsonozve = false;
    }

    megjelenitKonyvek();
}

// Könyv hozzáadása
document.getElementById("HozzaadasBtn").addEventListener("click", function() {
    const ujKonyv = new Konyv(
        document.getElementById("cim").value,
        document.getElementById("szerzo").value,
        Number(document.getElementById("kiadasiEv").value),
        Number(document.getElementById("oldalszam").value)
    );

    konyvek.push(ujKonyv);
    megjelenitKonyvek();
});

// Szabad könyvek szűrése
function szabadKonyvek() {
    konyvekElem.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Cím</th>
                    <th>Szerző</th>
                    <th>Kiadási év</th>
                    <th>Oldalszám</th>
                    <th>Állapot</th>
                    <th>Művelet</th>
                </tr>
            </thead>
            <tbody id="konyvekTabla"></tbody>
        </table>
    `;

    const konyvekTabla = document.getElementById("konyvekTabla");

    konyvek.forEach(function(konyv, index) {
        if (konyv.kolcsonozve == false) {
            konyvekTabla.innerHTML += `
                <tr>
                    <td>${konyv.cim}</td>
                    <td>${konyv.szerzo}</td>
                    <td>${konyv.kiadasiEv}</td>
                    <td>${konyv.oldalszam}</td>
                    <td>Kölcsönözhető</td>
                    <td>
                        <button onclick="kolcsonzes(${index})">
                            Kölcsönzés
                        </button>
                    </td>
                </tr>
            `;
        }
    });
}

// Szabad könyvek gomb
document.getElementById("SzabadSzures").addEventListener("click", function() {
    szabadKonyvek();
});

// Összes könyv gomb
document.getElementById("osszesKonyv").addEventListener("click", function() {
    megjelenitKonyvek();
});

// Legrégebbi könyv
function legregebbiKonyv() {
    let legregebbi = konyvek[0];

    konyvek.forEach(function(konyv) {
        if (konyv.kiadasiEv < legregebbi.kiadasiEv) {
            legregebbi = konyv;
        }
    });

    konyvekElem.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Legrégebbi könyv</th>
                    <th>Kiadási év</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${legregebbi.cim}</td>
                    <td>${legregebbi.kiadasiEv}</td>
                </tr>
            </tbody>
        </table>
    `;
}

// Legvastagabb könyv
function legvastagabbKonyv() {
    let legvastagabb = konyvek[0];

    konyvek.forEach(function(konyv) {
        if (konyv.oldalszam > legvastagabb.oldalszam) {
            legvastagabb = konyv;
        }
    });

    konyvekElem.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Legvastagabb könyv</th>
                    <th>Oldalszám</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${legvastagabb.cim}</td>
                    <td>${legvastagabb.oldalszam} oldal</td>
                </tr>
            </tbody>
        </table>
    `;
}

// Átlagos oldalszám
function atlagOldalszam() {
    let osszeg = 0;

    konyvek.forEach(function(konyv) {
        osszeg = osszeg + konyv.oldalszam;
    });

    let atlag = osszeg / konyvek.length;

    konyvekElem.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Átlagos oldalszám</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${atlag.toFixed(0)} oldal</td>
                </tr>
            </tbody>
        </table>
    `;
}

// Legrégebbi könyv gomb
document.getElementById("LegregebbiKereses").addEventListener("click", function() {
    legregebbiKonyv();
});

// Legvastagabb könyv gomb
document.getElementById("LegnagyobbOldalszam").addEventListener("click", function() {
    legvastagabbKonyv();
});

// Átlagos oldalszám gomb
document.getElementById("AtlagOldalszam").addEventListener("click", function() {
    atlagOldalszam();
});

// Könyvek megjelenítése betöltéskor
megjelenitKonyvek();
