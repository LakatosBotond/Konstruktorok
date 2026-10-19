//konstruktor
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

// Könyvek megjelenítése
function megjelenitKonyvek() {
    konyvekElem.innerHTML = "";

    konyvek.forEach(function(konyv) {
        konyvekElem.innerHTML += `
            <div class="konyv">
                <h3>${konyv.cim}</h3>
                <p>Szerző: ${konyv.szerzo}</p>
                <p>Év: ${konyv.kiadasiEv}</p>
                <p>Oldalak: ${konyv.oldalszam}</p>
                <p>Állapot: ${konyv.kolcsonozve ? "Kölcsönözve" : "Kölcsönözhető"}</p>

                <button class="kolcsonozas" onclick="kolcsonzes(${konyvek.indexOf(konyv)})">
                    ${konyv.kolcsonozve ? "Visszahozás" : "Kölcsönzés"}
                </button>
            </div>
        `;  
    });
}

// Kölcsönzés és visszahozás
function kolcsonzes(index) {
    konyvek[index].kolcsonozve = !konyvek[index].kolcsonozve;
    megjelenitKonyvek();
};

// function kolcsonzes(index) {
//     if (konyvek[index].kolcsonozve == false) {
//         konyvek[index].kolcsonozve = true;
//     } else {
//         konyvek[index].kolcsonozve = false;
//     }

//     megjelenitKonyvek();
// }


// Könyv hozzáadása
document.getElementById("HozzaadasBtn").addEventListener("click", function() {

    const ujKonyv = new Konyv(
        document.getElementById("cim").value,
        document.getElementById("szerzo").value,
        document.getElementById("kiadasiEv").value,
        Number(document.getElementById("oldalszam").value)
    );

    konyvek.push(ujKonyv);

    megjelenitKonyvek();
});

//szabad könyvek szürése, csak kölcsönözve == false megjelenítése
// Szabad könyvek szűrése
function szabadKonyvek() {
    konyvekElem.innerHTML = "";

    konyvek.forEach(function(konyv, index) {
        if (konyv.kolcsonozve == false) {
            konyvekElem.innerHTML += `
                <div class="konyv">
                    <h3>${konyv.cim}</h3>
                    <p>Szerző: ${konyv.szerzo}</p>
                    <p>Év: ${konyv.kiadasiEv}</p>
                    <p>Oldalak: ${konyv.oldalszam}</p>
                    <p>Állapot: Kölcsönözhető</p>

                    <button class="kolcsonozas" onclick="kolcsonzes(${index})">
                        Kölcsönzés
                    </button>
                </div>
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
        <div class="konyv">
            <h3>Legrégebbi könyv:</h3>
            <p>${legregebbi.cim} (${legregebbi.kiadasiEv})</p>
        </div>
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
        <div class="konyv">
            <h3>Legvastagabb könyv:</h3>
            <p>${legvastagabb.cim} (${legvastagabb.oldalszam} oldal)</p>
        </div>
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
        <div class="konyv">
            <h3>Átlagos oldalszám</h3>
            <p>A könyvek átlagos oldalszáma: ${atlag.toFixed(0)} oldal</p>
        </div>
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

megjelenitKonyvek();