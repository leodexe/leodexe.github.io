const h2subtitle = document.getElementById("h2-monselect");
let monNameLv = [];
let monStats = [];
let monMoves = [];

function removezerosandshowstats(mon, stats) {
    let showmaxhp, showmaxspeed, showmaxpyatk, showmaxpydef, showmaxspatk, showmaxspdef;
    if (parseInt(mon.maxhp) == mon.maxhp) {
        showmaxhp = mon.maxhp;
    } else {
        showmaxhp = mon.maxhp.toFixed(1);
    }
    if (parseInt(mon.maxspeed) == mon.maxspeed) {
        showmaxspeed = mon.maxspeed;
    } else {
        showmaxspeed = mon.maxspeed.toFixed(1);
        if (parseInt(showmaxspeed) == showmaxspeed) {
            showmaxspeed = parseInt(showmaxspeed);
        }
    }
    if (parseInt(mon.maxpyatk) == mon.maxpyatk) {
        showmaxpyatk = mon.maxpyatk;
    } else {
        showmaxpyatk = mon.maxpyatk.toFixed(1);
        if (parseInt(showmaxpyatk) == showmaxpyatk) {
            showmaxpyatk = parseInt(showmaxpyatk);
        }
    }
    if (parseInt(mon.maxpydef) == mon.maxpydef) {
        showmaxpydef = mon.maxpydef;
    } else {
        showmaxpydef = mon.maxpydef.toFixed(1);
        if (parseInt(showmaxpydef) == showmaxpydef) {
            showmaxpydef = parseInt(showmaxpydef);
        }
    }
    if (parseInt(mon.maxspatk) == mon.maxspatk) {
        showmaxspatk = mon.maxspatk;
    } else {
        showmaxspatk = mon.maxspatk.toFixed(1);
        if (parseInt(showmaxspatk) == showmaxspatk) {
            showmaxspatk = parseInt(showmaxspatk);
        }
    }
    if (parseInt(mon.maxspdef) == mon.maxspdef) {
        showmaxspdef = mon.maxspdef;
    } else {
        showmaxspdef = mon.maxspdef.toFixed(1);
        if (parseInt(showmaxspdef) == showmaxspdef) {
            showmaxspdef = parseInt(showmaxspdef);
        }
    }
    stats.innerHTML = "<br>MaxHP: " + showmaxhp + " | Speed: " + showmaxspeed + "<br>PyAtk:  " + showmaxpyatk + " | PyDef: " + showmaxpydef + "<br>SpAtk: " + showmaxspatk + " | SpDef: " + showmaxspdef + "<br><br>";
}

plagiodex.forEach((plagiomon) => {
    htmlmontemplate = `
    <div class="${plagiomon._idname}-inputholder mon-card">
        <input type="radio" name="typemon" title="${plagiomon.name}" class="plagiomon-radio ${plagiomon._idname}" id="${plagiomon.id}" hidden>
        <label for="${plagiomon.id}" class="label-plagiomon label-${plagiomon._idname}">
            <figure class="mon-imgcontainer">
                <img src="${plagiomon.img.src}" alt="${plagiomon.name}" class="plagiomon-img">
            </figure>
            <span id="${plagiomon._idname}-nameLv">${plagiomon.name}</span>
            <p id="${plagiomon._idname}-stats"></p>
            <p id="${plagiomon._idname}-moves"></p>
        </label>
    </div>`
    moncontainer.innerHTML += htmlmontemplate;
    monNameLv.push(document.getElementById(`${plagiomon._idname}-nameLv`));
    monStats.push(document.getElementById(`${plagiomon._idname}-stats`));
    monMoves.push(document.getElementById(`${plagiomon._idname}-moves`));
    let i = monNameLv.length - 1;
    monNameLv[i].innerHTML += " Lv" + `${plagiomon.level}` + "<br>Ability: " + `${plagiomon.ability}`;
    removezerosandshowstats(plagiomon, monStats[i]);
    monMoves[i].innerHTML = `${plagiomon.moveset[0].name}` + " | " + `${plagiomon.moveset[1].name}` + "<br>" + `${plagiomon.moveset[2].name}` + " | " + `${plagiomon.moveset[3].name}`;
});

let radiomons = document.getElementsByClassName("plagiomon-radio");

for (tacos of radiomons) {
    tacos.addEventListener("click", fnamemon);
}

function fnamemon() {
    for (index in radiomons) {
        if (radiomons[index].checked == true) {
            h2subtitle.innerHTML = "Select " + radiomons[index].title;
        }
    }
}

// const name = "Juan David";
// const lastname = "Castro Gallego";
// const completeName = name + lastname;
// const nickname = "juandc";

// console.log("Mi nombre es " + completeName + ", pero prefiero que me digas " + nickname + ".");

// function cualestunombre(name, lastname, nickname) {
//     const completeName = name + " " + lastname;
//     console.log("Mi nombre es " + completeName + ", pero prefiero que me digas " + nickname + "."); 
// }

// const tipoDeSuscripcion = "Basic";

// switch (tipoDeSuscripcion) {
//    case "Free":
//        console.log("Solo puedes tomar los cursos gratis");
//        break;
//    case "Basic":
//        console.log("Puedes tomar casi todos los cursos de Platzi durante un mes");
//        break;
//    case "Expert":
//        console.log("Puedes tomar casi todos los cursos de Platzi durante un año");
//        break;
//    case "ExpertPlus":
//        console.log("Tú y alguien más pueden tomar TODOS los cursos de Platzi durante un año");
//        break;
// }

// if (tipoDeSuscripcion == "Free") {
//     console.log("Solo puedes tomar los cursos gratis");
// } else if (tipoDeSuscripcion == "Basic") {
//     console.log("Puedes tomar casi todos los cursos de Platzi durante un mes");
// } else if (tipoDeSuscripcion == "Expert") {
//     console.log("Puedes tomar casi todos los cursos de Platzi durante un año");
// } else if (tipoDeSuscripcion == "ExpertPlus") {
//     console.log("Tú y alguien más pueden tomar TODOS los cursos de Platzi durante un año");
// } else {
//     console.warn("Ese tipo de suscripción no existe.");
// }

// if (tipoDeSuscripcion == "Free" && tipoDeSuscripcion != "Basic" && tipoDeSuscripcion != "Expert" && tipoDeSuscripcion != "ExpertPlus") {
//     console.log("Solo puedes tomar los cursos gratis");
//     return;
// } if (tipoDeSuscripcion == "Basic" && tipoDeSuscripcion != "Free" && tipoDeSuscripcion != "Expert" && tipoDeSuscripcion != "ExpertPlus") {
//     console.log("Puedes tomar casi todos los cursos de Platzi durante un mes");
//     return;
// } if (tipoDeSuscripcion == "Expert" && tipoDeSuscripcion != "Free" && tipoDeSuscripcion != "Basic" && tipoDeSuscripcion != "ExpertPlus") {
//     console.log("Puedes tomar casi todos los cursos de Platzi durante un año");
//     return;
// } if (tipoDeSuscripcion == "ExpertPlus" && tipoDeSuscripcion != "Free" && tipoDeSuscripcion != "Basic" && tipoDeSuscripcion != "Expert") {
//     console.log("Tú y alguien más pueden tomar TODOS los cursos de Platzi durante un año");
//     return;
// }
// console.warn("Ese tipo de suscripción no existe.");

// let tipodeMensaje = [];
// tipodeMensaje["Free"] = "Solo puedes tomar los cursos gratis";
// tipodeMensaje["Basic"] = "Puedes tomar casi todos los cursos de Platzi durante un mes";
// tipodeMensaje["Expert"] = "Puedes tomar casi todos los cursos de Platzi durante un año";
// tipodeMensaje["ExpertPlus"] = "Tú y alguien más pueden tomar TODOS los cursos de Platzi durante un año";

// if (tipoDeSuscripcion == "Free" || tipoDeSuscripcion == "Basic" || tipoDeSuscripcion == "Expert" || tipoDeSuscripcion == "ExpertPlus") {
//     console.log(tipodeMensaje[tipoDeSuscripcion]);
//     return;
// }
// console.warn("Ese tipo de suscripción no existe.");

// for (let i = 0; i < 5; i++) {
//     console.log("El valor de i es: " + i);
// }
// let i = 0;
// while (i < 5) {
//     i++;
//     console.log("El valor de i es: " + i);
// }

// for (let i = 10; i >= 2; i--) {
//     console.log("El valor de i es: " + i);
// }
// let ii = 10;
// while (ii >=2) {
//     ii--;
//     console.log("El valor de i es: " + ii);
// }

// function loop4() {
//     let respuesta = prompt("Cuánto es 2 + 2? ");
//     if (respuesta == 4) {
//         alert("Felicidades, es 4!");
//     } else {
//         loop4();
//     }
//     return respuesta;
// }

// const array1 = [-4, 2, 3, 8, 5, -14];
// function printArray1(arrayA) {
//     console.log (arrayA[0]); 
// }

// const array2 = [2, 12, 14, -44, -1, 3];
// function printArray2(arrayB) {
//     for (let i = 0; i < array2.length; i++) {
//         console.log (arrayB[i]);
//     }    
// }

// const array3 = {"name": "burrito","taste": "spicy", "type": "mexican", "category": "food", "class": "bread", "country": "Mexico",};
// function printArray3(arrayC) {
//     for (object in arrayC) {
//         console.log (arrayC[object]);
//     }
// }