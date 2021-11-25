const form = document.querySelector("#form-fodselsnummer");

const testedeIndividSiffre = [];


form.addEventListener("submit", (event) => {
    event.preventDefault();

    testedeIndividSiffre = [];

    const formData = new FormData(form);
    const dato = formData.get("fodselsdato");
    const kjonn = formData.get("kjonn");

    const fulltAr = Number(dato.substr(0, 4));
    const fodselsdato = genererFodselsdato(dato);


    
});

function genererFodselsdato(dato) 
{
    const dag = dato.substr(8, 2);
    const maned = dato.substr(5, 2);
    const ar = dato.substr(2, 2);

    return dag + maned + ar;
}

function genererFodselsnummer(fodselsdato, fulltAr, kjonn) 
{
    let fodselsnummer = fodselsdato;
    let individsiffere = "";

    if(2000 <= fulltAr <= 2039) {
        individsiffere = genererIndividsiffer(500, 999, kjonn);
    } else if(1940 <= fulltAr <= 1999) {
        individsiffere = genererIndividsiffer(900, 999, kjonn);
    } else if(1900 < fulltAr <= 1999) {
        individsiffere = genererIndividsiffer(000, 499, kjonn);
    } else if (1854 < fulltAr <= 1899) {
        individsiffere = genererIndividsiffer(500, 749, kjonn);
    } else {
        throw new Error("Året passer ikke.")
    }

    fodselsnummer += individsiffere;

    const d1 = nummerFraStr(fodselsnummer, 0);
    const d2 = nummerFraStr(fodselsnummer, 1);
    const m1 = nummerFraStr(fodselsnummer, 2);
    const m2 = nummerFraStr(fodselsnummer, 3);
    const a1 = nummerFraStr(fodselsnummer, 4);
    const a2 = nummerFraStr(fodselsnummer, 5);
    const i1 = nummerFraStr(fodselsnummer, 6);
    const i2 = nummerFraStr(fodselsnummer, 7);
    const i3 = nummerFraStr(fodselsnummer, 8);

    const k1 = 11 - ((d1*3 + d2*6 + m1*6 + m2*1 + a1*8 + a2*9 + i1*4 + i2*5 + i3*2) % 11);
    if (k1 === 11) {
        k1 = 0;
    }
    const k2 = 11 - ((d1*5 + d2*4 + m1*3 + m2*2 + a1*7 + a2*6 + i1*5 + i2*4 + i3*3 + k1*2) % 11)
    if (k2 === 11) {
        k2 = 0;
    }
    fodselsnummer += k1 + k2;

    return fodselsnummer;
}

function genererIndividsiffer(min, max) {
    let individInt = Math.round((min + max) /2);
    while (testedeIndividSiffre.includes(individInt)) {
        individInt =  Math.round((max - min)*Math.random() + min);
    }
    testedeIndividSiffre.push(individInt);
    let individStr = String(individInt);

    let nuller = "";
    for (let i = 0; i < 3 - individStr.length; i++) {
        nuller += "0";
    }
    
    individStr = nuller + individStr;
    return individStr;
}

function nummerFraStr(string, index) {
    return Number(string[index]);
}