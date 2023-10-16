
var vsbm = [9, 9, 10]

var tabla = document.getElementById("minesweeper");
let i; let j;
var prvipotezodigran = false;

smajli = document.getElementById("smajli");
smajli.style.width = 48;
smajli.style.heigth = 48;

restart(vsbm);

function potvrdi() {
    var value = document.getElementsByName('tezina');
    for (var radio of value) {
        if (radio.checked) {
            switch (radio.value) {
                case "beginner":
                    vsbm = [9, 9, 10];
                    restart(vsbm);
                    break;
                case "medium":
                    vsbm = [16, 16, 40];
                    restart(vsbm);
                    break;
                case "expert":
                    vsbm = [16, 30, 99];
                    restart(vsbm);
                    break;
                case "custom":
                    vsbm = [document.getElementById('visina').value, document.getElementById('sirina').value, document.getElementById('brojmina').value];
                    restart(vsbm);
                    break;
            }
        }
    }
}

function restart(vsbm) {
    visina = vsbm[0];
    sirina = vsbm[1];
    brojMina = vsbm[2];

    wrapper = document.getElementById("wrapper");
    wrapper.style.width = sirina * 24 + "px";

    tabla.innerHTML = "";
    for (i = 0; i < visina; i++) {
        istring = i + "";
        red = "<div id = 'red" + istring + "' class = 'red'>"
        for (j = 0; j < sirina; j++) {
            jstring = j + "";
            id = istring + "_" + jstring;
            var dodajeSe = `<div class = 'polje ima0' id = '` + id + `' oncontextmenu='return false;' onmouseup = 'klik(` + istring + "," + jstring + `)' > </div>`;
            red += dodajeSe;
        }
        tabla.innerHTML += red + "</div>";
        prvipotezodigran = false;
        document.getElementById("smajli").src = "slike/smajli1.png"
    }
}

function klik(visinapolja, sirinapolja) {
    id = visinapolja + "_" + sirinapolja;
    var polje = document.getElementById(id);

    e = window.event;

    if (e.which == 3) {
        if (polje.classList.contains("zastava")) {
            polje.style.backgroundImage = "url('slike/unopened.png')"
            polje.classList.remove("zastava");
        }
        else if (!polje.classList.contains("otvoreno")) {
            polje.style.backgroundImage = "url('slike/flag.png')"
            polje.classList.add("zastava");
        }
    }
    if (e.which == 1) {
        if (!polje.classList.contains("zastava")) {
            otvoriPolje(visinapolja, sirinapolja);
        }
    }
}

function otvoriPolje(visinapolja, sirinapolja) {
    id = visinapolja + "_" + sirinapolja;
    polje = document.getElementById(id);

    if (!prvipotezodigran) {
        prvipotezodigran = true;
        generisiMine(visinapolja, sirinapolja);
        otvoriPolje(visinapolja, sirinapolja);
    }
    else {
        polje.classList.add("otvoreno");

        if (polje.classList.contains("ima1")) polje.style.backgroundImage = "url('slike/1.png')";
        if (polje.classList.contains("ima2")) polje.style.backgroundImage = "url('slike/2.png')";
        if (polje.classList.contains("ima3")) polje.style.backgroundImage = "url('slike/3.png')";
        if (polje.classList.contains("ima4")) polje.style.backgroundImage = "url('slike/4.png')";
        if (polje.classList.contains("ima5")) polje.style.backgroundImage = "url('slike/5.png')";
        if (polje.classList.contains("ima6")) polje.style.backgroundImage = "url('slike/6.png')";
        if (polje.classList.contains("ima7")) polje.style.backgroundImage = "url('slike/7.png')";
        if (polje.classList.contains("ima8")) polje.style.backgroundImage = "url('slike/8.png')";

        if (prvipotezodigran) {

            if (polje.classList.contains("imaminu")) {
                for (let i = 0; i < visina; i++) {
                    for (let j = 0; j < sirina; j++) {
                        istring = i + "";
                        jstring = j + "";

                        id = istring + "_" + jstring;
                        polje = document.getElementById(id)
                        polje.removeAttribute("onmouseup");
                        if (polje.classList.contains("imaminu")) {
                            polje.style.backgroundImage = "url('slike/bomb.png')";
                        }
                        document.getElementById("smajli").src = "slike/smajli3.png";
                    }
                }

            }
            else if (polje.classList.contains("ima0")) {
                polje.style.backgroundImage = "url('slike/0.png')";
                if (proveriJelPoljePostoji((visinapolja - 1), (sirinapolja - 1))) {
                    id = (visinapolja - 1) + "_" + (sirinapolja - 1);
                    if (!document.getElementById(id).classList.contains("otvoreno")) {
                        otvoriPolje((visinapolja - 1), (sirinapolja - 1));
                    }
                }
                if (proveriJelPoljePostoji((visinapolja - 1), (sirinapolja))) {
                    id = (visinapolja - 1) + "_" + (sirinapolja);
                    if (!document.getElementById(id).classList.contains("otvoreno")) {
                        otvoriPolje((visinapolja - 1), (sirinapolja));
                    }
                }
                if (proveriJelPoljePostoji((visinapolja - 1), (sirinapolja + 1))) {
                    id = (visinapolja - 1) + "_" + (sirinapolja + 1);
                    if (!document.getElementById(id).classList.contains("otvoreno")) {
                        otvoriPolje((visinapolja - 1), (sirinapolja + 1));
                    }
                }
                if (proveriJelPoljePostoji((visinapolja), (sirinapolja - 1))) {
                    id = (visinapolja) + "_" + (sirinapolja - 1);
                    if (!document.getElementById(id).classList.contains("otvoreno")) {
                        otvoriPolje((visinapolja), (sirinapolja - 1));
                    }
                }
                if (proveriJelPoljePostoji((visinapolja), (sirinapolja + 1))) {
                    id = (visinapolja) + "_" + (sirinapolja + 1);
                    if (!document.getElementById(id).classList.contains("otvoreno")) {
                        otvoriPolje((visinapolja), (sirinapolja + 1));
                    }
                }
                if (proveriJelPoljePostoji((visinapolja + 1), (sirinapolja - 1))) {
                    id = (visinapolja + 1) + "_" + (sirinapolja - 1);
                    if (!document.getElementById(id).classList.contains("otvoreno")) {
                        otvoriPolje((visinapolja + 1), (sirinapolja - 1));
                    }
                }
                if (proveriJelPoljePostoji((visinapolja + 1), (sirinapolja))) {
                    id = (visinapolja + 1) + "_" + (sirinapolja);
                    if (!document.getElementById(id).classList.contains("otvoreno")) {
                        otvoriPolje((visinapolja + 1), (sirinapolja));
                    }
                }
                if (proveriJelPoljePostoji((visinapolja + 1), (sirinapolja + 1))) {
                    id = (visinapolja + 1) + "_" + (sirinapolja + 1);
                    if (!document.getElementById(id).classList.contains("otvoreno")) {
                        otvoriPolje((visinapolja + 1), (sirinapolja + 1));
                    }
                }
            }
        }
    }
    if (pobedio()) {
        for (let i = 0; i < visina; i++) {
            for (let j = 0; j < sirina; j++) {
                noviId = i + "_" + j;
                polje = document.getElementById(noviId);
                if (polje.classList.contains("imaminu")) {
                    polje.classList.add("zastava");
                    polje.style.backgroundImage = "url('slike/flag.png')";
                }
            }
        }
        document.getElementById("smajli").src = "slike/smajli2.png";
        alert("Čestitamo! Pobedili ste igru!");
    }
}

function pobedio() {
    for (let q = 0; q < visina; q++) {
        for (let w = 0; w < sirina; w++) {
            qstring = q + "";
            wstring = w + "";
            id = qstring + "_" + wstring;

            if (!document.getElementById(id).classList.contains("otvoreno") && !document.getElementById(id).classList.contains("imaminu")) {
                return false;
            }
        }
    }
    return true;
}

function generisiMine(visinapolja, sirinapolja) {
    for (let i = 0; i < brojMina; i++) {

        var visinaMine = Math.floor(Math.random() * visina);
        var sirinaMine = Math.floor(Math.random() * sirina);

        novoPolje = document.getElementById(visinaMine + "_" + sirinaMine);
        if (
            (visinaMine == visinapolja - 1 && sirinaMine == sirinapolja - 1) ||
            (visinaMine == visinapolja - 1 && sirinaMine == sirinapolja) ||
            (visinaMine == visinapolja - 1 && sirinaMine == sirinapolja + 1) ||
            (visinaMine == visinapolja && sirinaMine == sirinapolja - 1) ||
            (visinaMine == visinapolja && sirinaMine == sirinapolja + 1) ||
            (visinaMine == visinapolja && sirinaMine == sirinapolja) ||
            (visinaMine == visinapolja + 1 && sirinaMine == sirinapolja - 1) ||
            (visinaMine == visinapolja + 1 && sirinaMine == sirinapolja) ||
            (visinaMine == visinapolja + 1 && sirinaMine == sirinapolja + 1)) {
            i--; continue;
        }
        if (proveriJelPoljePostoji(visinaMine, sirinaMine)) {
            if (!novoPolje.classList.contains("imaminu")) {
                novoPolje.classList.add("imaminu");
                novoPolje.classList.remove("ima0");
                novoPolje.classList.remove("ima1");
                novoPolje.classList.remove("ima2");
                novoPolje.classList.remove("ima3");
                novoPolje.classList.remove("ima4");
                novoPolje.classList.remove("ima5");
                novoPolje.classList.remove("ima6");
                novoPolje.classList.remove("ima7");
                novoPolje.classList.remove("ima8");
                brojacMinaPored(visinaMine, sirinaMine);
            }
            else {
                i--; continue;
            }
        }
    }
}

function brojacMinaPored(visinapolja, sirinapolja) {

    if (proveriJelPoljePostoji(visinapolja - 1, sirinapolja - 1)) {
        dodajbroj(visinapolja - 1, sirinapolja - 1);
    }
    if (proveriJelPoljePostoji(visinapolja - 1, sirinapolja)) {
        dodajbroj(visinapolja - 1, sirinapolja);
    }
    if (proveriJelPoljePostoji(visinapolja - 1, sirinapolja + 1)) {
        dodajbroj(visinapolja - 1, sirinapolja + 1);
    }
    if (proveriJelPoljePostoji(visinapolja, sirinapolja - 1)) {
        dodajbroj(visinapolja, sirinapolja - 1);
    }
    if (proveriJelPoljePostoji(visinapolja, sirinapolja + 1)) {
        dodajbroj(visinapolja, sirinapolja + 1);
    }
    if (proveriJelPoljePostoji(visinapolja + 1, sirinapolja - 1)) {
        dodajbroj(visinapolja + 1, sirinapolja - 1);
    }
    if (proveriJelPoljePostoji(visinapolja + 1, sirinapolja)) {
        dodajbroj(visinapolja + 1, sirinapolja);
    }
    if (proveriJelPoljePostoji(visinapolja + 1, sirinapolja + 1)) {
        dodajbroj(visinapolja + 1, sirinapolja + 1);
    }
}

function dodajbroj(visinapolja, sirinapolja) {
    visinapolja = visinapolja + "";
    sirinapolja = sirinapolja + "";
    polje = document.getElementById(visinapolja + "_" + sirinapolja);
    if (polje.classList.contains("imaminu")) { }
    else if (polje.classList.contains("ima0")) {
        polje.classList.add("ima1");
        polje.classList.remove("ima0");
    }
    else if (polje.classList.contains("ima1")) {
        polje.classList.add("ima2");
        polje.classList.remove("ima1");
    }
    else if (polje.classList.contains("ima2")) {
        polje.classList.add("ima3");
        polje.classList.remove("ima2");
    }
    else if (polje.classList.contains("ima3")) {
        polje.classList.add("ima4");
        polje.classList.remove("ima3");
    }
    else if (polje.classList.contains("ima4")) {
        polje.classList.add("ima5");
        polje.classList.remove("ima4");
    }
    else if (polje.classList.contains("ima5")) {
        polje.classList.add("ima6");
        polje.classList.remove("ima5");
    }
    else if (polje.classList.contains("ima6")) {
        polje.classList.add("ima7");
        polje.classList.remove("ima6");
    }
    else if (polje.classList.contains("ima7")) {
        polje.classList.add("ima8");
        polje.classList.remove("ima7");
    }
}

function proveriJelPoljePostoji(visinapolja, sirinapolja) {

    if (visinapolja < visina && sirinapolja < sirina && visinapolja >= 0 && sirinapolja >= 0) {
        return true;
    }
    else return false;
}