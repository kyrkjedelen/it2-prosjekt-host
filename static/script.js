const form = document.querySelector("#form-fodselsnummer");
const output = document.querySelector("#out-fodselsnummer");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const fodselsdatoInp = formData.get("fodselsdato");
    const individsiffre = formData.get("individsiffre");

    const fodselsdato = genererFodselsdato(fodselsdatoInp);
    const fodselsnummer = genererFodselsnummer(fodselsdato, individsiffre);
    output.textContent = fodselsnummer;
});

function genererFodselsdato(dato)
{
    const dag = dato.substr(8, 2);
    const maned = dato.substr(5, 2);
    const ar = dato.substr(2, 2);

    return dag + maned + ar;
}

function genererFodselsnummer(fodselsdato, individsiffre) 
{
    let fodselsnummer = fodselsdato + individsiffre;

    const d1 = nummerFraStr(fodselsnummer, 0);
    const d2 = nummerFraStr(fodselsnummer, 1);
    const m1 = nummerFraStr(fodselsnummer, 2);
    const m2 = nummerFraStr(fodselsnummer, 3);
    const a1 = nummerFraStr(fodselsnummer, 4);
    const a2 = nummerFraStr(fodselsnummer, 5);
    const i1 = nummerFraStr(fodselsnummer, 6);
    const i2 = nummerFraStr(fodselsnummer, 7);
    const i3 = nummerFraStr(fodselsnummer, 8);
    
    let k1 = 11 - ((d1*3 + d2*7 + m1*6 + m2*1 + a1*8 + a2*9 + i1*4 + i2*5 + i3*2) % 11);
    if (k1 === 11) {
        k1 = 0;
    }
    let k2 = 11 - ((d1*5 + d2*4 + m1*3 + m2*2 + a1*7 + a2*6 + i1*5 + i2*4 + i3*3 + k1*2) % 11)
    if (k2 === 11) {
        k2 = 0;
    }
    fodselsnummer += k1 + k2;

    return fodselsnummer;
}

function nummerFraStr(string, index) {
    return Number(string[index]);
}