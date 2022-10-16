const h1maintitle = document.getElementById("main-title");
const sectionmonselect = document.getElementById("mon-select");
const radiodex = document.querySelectorAll(".plagiomon-radio");
const monselect = document.getElementById("button-monselect");
monselect.addEventListener("click", fmonselect);
const rngselect = document.getElementById("button-rngselect");
rngselect.addEventListener("click", fmonrandom);
const cpuselect = document.getElementById("button-cpuselect");
cpuselect.addEventListener("click", fcpuselect);

const spanturncounter = document.getElementById("turncounter");
const spanmon = document.getElementById("mon-name");
const weathertext = document.getElementById("weather-info");
const P1img = document.getElementById("p1-img");
const spanP1mon = document.getElementById("p1-mon");
const spanP1HPcount = document.getElementById("p1-life-count");
const pP1HPbar = document.getElementById("p1-hpbar");
const pP1status = document.getElementById("p1-statmodifiers");
const P2img = document.getElementById("p2-img");
const spanP2mon = document.getElementById("p2-mon");
const spanP2HPcount = document.getElementById("p2-life-count");
const pP2HPbar = document.getElementById("p2-hpbar");
const pP2status = document.getElementById("p2-statmodifiers");
const movesectionhider = document.getElementById("moves-section-hider");
const divmovesection = document.getElementById("moves-section");
const divmovecontainer = document.getElementById("move-container");
const buttonrematchnow = document.getElementById("rematchnow");
buttonrematchnow.addEventListener("click", frematchnow);

let moveStruggle;
let radiomoves;
let spanmoves;
let labelmoves;

const buttonattacknow = document.getElementById("attacknow");
buttonattacknow.addEventListener("click", selectp1Move);
const buttonattackinfo = document.getElementById("attackinfo");
buttonattackinfo.addEventListener("click", fgetAttackInfo);
let messagebox, savebox1, savebox2;
const messagebox1 = document.getElementById("upper-message-box");
const messagebox2 = document.getElementById("lower-message-box");
const spanrestartbox = document.getElementById("restart-text");

let plagiomon1, lastmon1, p1mon, p1monid, p1hp, p1maxhp, p1pyatk, p1pydef, p1spatk, p1spdef, p1speed, p1BasePyAtk, p1BasePyDef, p1BaseSpAtk, p1BaseSpDef, p1BaseSpeed, p1PyAtkLevel, p1PyDefLevel, p1SpAtkLevel, p1SpDefLevel, p1SpeedLevel, p1Accuracy, p1AccuracyLevel, p1Evasion, p1EvasionLevel, p1Reflect, p1LightScreen, p1Power, p1moveset, p1PPs, p1move, p1moveid, p1flinched, p1confusedLevel, p1badstatus, p1burned, p1paralyzed, p1fullyparalyzed, p1frozen, p1badpoisoned, p1badpoisonLevel, p1poisoned, p1Seeded, p1recurrentDamage, p1ProtectRate, p1ProtectLevel,  p1ProtectMessage, p1ProtectReset, p1move1ZeroPP, p1move2ZeroPP, p1move3ZeroPP, p1move4ZeroPP;
let plagiomon2, lastmon2, p2mon, p2monid, p2hp, p2maxhp, p2pyatk, p2pydef, p2spatk, p2spdef, p2speed, p2BasePyAtk, p2BasePyDef, p2BaseSpAtk, p2BaseSpDef, p2BaseSpeed, p2PyAtkLevel, p2PyDefLevel, p2SpAtkLevel, p2SpDefLevel, p2SpeedLevel, p2Accuracy, p2AccuracyLevel, p2Evasion, p2EvasionLevel, p2Reflect, p2LightScreen, p2Power, p2moveset, p2PPs, p2move, p2moveid, p2flinched, p2confusedLevel, p2badstatus, p2burned, p2paralyzed, p2fullyparalyzed, p2frozen, p2badpoisoned, p2badpoisonLevel, p2poisoned, p2Seeded, p2recurrentDamage, p2ProtectRate, p2ProtectLevel, p2ProtectMessage, p2ProtectReset, p2move1ZeroPP, p2move2ZeroPP, p2move3ZeroPP, p2move4ZeroPP;
let selection = 1;
plagiomon1 = p1mon = p1monid = plagiomon2 = p2mon = p2monid = "NULLMON";
let PPindex, p1weather, p2weather; //not needed for now
let attackmiss, gamedata1, gamedata2, hpleech, leechMessage, weather, weatherLevel, lastMoveCategory, lastDamageDealt, sametypeattackbonus, turncounter, p1win, p1loss, p1tie, roundcounter;
p1win = p1loss = p1tie = roundcounter = 0;
sametypeattackbonus = 1.5;

function frematchnow() {
    if (plagiomon1 == "NULLMON") {
        plagiomon1 = lastmon1;
        p1mon = plagiomon1.name;
        P1img.src = plagiomon1.img;
    } if (plagiomon2 == "NULLMON") {
        plagiomon2 = lastmon2;
        p2mon = plagiomon2.name;
        p2monid = plagiomon2.id;
    }
    fselectedmon();
}

function fgetAttackInfo() {
    let infodex = 0;
    let noradio = false;
    for (radio of radiomoves) {
        if (radio.checked == true) {
            messagebox1.innerHTML = "Category: " + p1moveset[infodex].category + " | Power: " + p1moveset[infodex].power + " | Accuracy: " + p1moveset[infodex].accuracy + "%";
            messagebox2.innerHTML = p1moveset[infodex].description;
            noradio = true;
        }
        infodex++;
    }
    if (noradio == false) {
        messagebox1.innerHTML = "Click on a move, then click this button again to get some information about that move.";
        messagebox2.innerHTML = "If you don't know how to play, get information about moves first before using them."
    }
}

function fmonselect() {
    plagiomon1 = p1mon = p1monid = "NULLMON";
    for (radiomon in radiodex) {
        if (radiodex[radiomon].checked == true) {
            console.log("You chose: " + radiodex[radiomon].title);
            p1monid = radiodex[radiomon].id;
            h2subtitle.innerHTML = "Select " + radiodex[radiomon].name;
        }
    }
    if (p1monid != "NULLMON") {
        selection = 2;
        plagiomon1 = plagiodex[p1monid];
        p1mon = plagiomon1.name;
        P1img.src = plagiomon1.img;
        if (p1hp <= 0) {
            P1img.style.filter = "grayscale(0)";
            spanP1HPcount.style.color = pP1HPbar.style.background = "black";
        } if (p2hp <= 0) {
            pP1HPbar.style.width = "0px";
        }
        spanP1HPcount.innerHTML = spanP2HPcount.innerHTML = "";
        spanP1mon.innerHTML = "You chose " + p1mon;
        spanP2mon.innerHTML = "Select CPU mon.";
        h2subtitle.innerHTML = "Select Player 2 (CPU) mon";
        monselect.hidden = true;

        if (plagiomon2 != "NULLMON") {
            fselectedmon();
        }
    } else {
        spanP1mon.innerHTML = "No mon has been selected.";
    }
    radiodex.forEach((radiomon) => {
        if (radiomon.checked == true) {
            radiomon.checked = false;
        }
    });
}

function fcpuselect() {
    plagiomon2 = p2mon = p2monid = "NULLMON";
    for (radiomon in radiodex) {
        if (radiodex[radiomon].checked == true) {
            console.log("CPU chose: " + radiodex[radiomon].title);
            p2monid = radiodex[radiomon].id;
        }
    }
    if (p2monid != "NULLMON") {
        selection = 3;
        plagiomon2 = plagiodex[p2monid];
        p2mon = plagiomon2.name;
        P2img.src = plagiomon2.img;
        if (p2hp <= 0) {
            P2img.style.filter = "grayscale(0)";
            spanP2HPcount.style.color = pP2HPbar.style.background = "black";
        } if (p1hp <= 0) {
            pP2HPbar.style.width = "0px";
        }
        cpuselect.hidden = true;
        h2subtitle.innerHTML = "Select Player 1 (your) mon";
        if (plagiomon1 != "NULLMON") {
            fselectedmon();
        }
    } else {
        spanP2mon.innerHTML = "No mon has been selected.";
    }
    radiodex.forEach((radiomon) => {
        if (radiomon.checked == true) {
            radiomon.checked = false;
        }
    });
}

function fmonrandom() {
    radiodex.forEach((radiomon) => {
        if (radiomon.checked == true) {
            radiomon.checked = false;
        }
    });
    let random;
    while (plagiodex[random] == undefined) {
        random = Math.ceil(Math.random() * plagiodex.length - 1);
    }
    if (selection == 1) {
        plagiomon1 = plagiodex[random];
        p1mon = plagiomon1.name;
        P1img.src = plagiomon1.img;
        selection++;
        fmonrandom();
    } else if (selection == 2) {
        plagiomon2 = plagiodex[random];
        p2mon = plagiomon2.name;
        P2img.src = plagiomon2.img;
        selection++;
        fselectedmon();
    } else if (selection == 3) {
        plagiomon1 = plagiodex[random];
        p1mon = plagiomon1.name;
        P1img.src = plagiomon1.img;
        selection++;
        fselectedmon();
    }
}

function checkInitialWeather(mon) {
    if (turncounter == 0) {
        if (mon.ability == "Sand Stream" || mon.ability == "Drizzle" || mon.ability == "Drought" || mon.ability == "Snow Warning") {
            if (mon.ability == "Sand Stream") {
                weather = "Sandstorm";
            } else if (mon.ability == "Drizzle") {
                weather = "Rain";
            } else if (mon.ability == "Drought") {
                weather = "Harsh Sunlight";
            } else if (mon.ability == "Snow Warning") {
                weather = "Hail";
            }
            if (weather != "Clear") {
                weathertext.innerHTML = mon.name + "'s " + mon.ability + " summoned a " + weather + "!";
                if (weatherLevel == -1) {
                    weatherLevel++;
                }
            }
        } else {
            weathertext.innerHTML = "Weather: " + weather;
        }
    }
    return weather;
}

function checkWeather() {
    if (weather != "Clear") {
        if (weatherLevel < 5) {
            weatherLevel++;
            weathertext.innerHTML = "Weather: " + weather + " (Turn " + weatherLevel + ")";
        } else {
            weather = "Clear";
            //should add p1abilityweatherEnd later
        }
        if (weatherLevel == 5) {
            weathertext.innerHTML = "The " + weather + " has subsided.";
            weatherLevel = -1;
        }
    } else {
        weathertext.innerHTML = "Weather: " + weather;
    }
    return [weather, weatherLevel];
}

function colorMove() {
    let i = 0;
    for (label of labelmoves) {
        if (p1moveset[i].type == "Normal") {
            label.style.background = "#ddcccc";
        }
        else if (p1moveset[i].type == "Fighting") {
            label.style.background = "#dd8888";
        }
        else if (p1moveset[i].type == "Flying") {
            label.style.background = "#6699ff";
        }
        else if (p1moveset[i].type == "Poison") {
            label.style.background = "#cc88bb";
        }
        else if (p1moveset[i].type == "Ground") {
            label.style.background = "#ddbb55";
        }
        else if (p1moveset[i].type == "Rock") {
            label.style.background = "#bbaa66";
        }
        else if (p1moveset[i].type == "Ghost") {
            label.style.background = "#7777bb";
        }
        else if (p1moveset[i].type == "Fire") {
            label.style.background = "#f08030";
        }
        else if (p1moveset[i].type == "Water") {
            label.style.background = "#44aaff";
        }
        else if (p1moveset[i].type == "Grass") {
            label.style.background = "#77cc55";
        }
        else if (p1moveset[i].type == "Electric") {
            label.style.background = "#fff000";
        }
        else if (p1moveset[i].type == "Psychic") {
            label.style.background = "#ff99bb";
        }
        else if (p1moveset[i].type == "Ice") {
            label.style.background = "#77ddff";
        }
        else if (p1moveset[i].type == "Dragon") {
            label.style.background = "#bbaaff";
        }
        else if (p1moveset[i].type == "Dark") {
            label.style.background = "#998877";
            // label.style.color = "white";
        }
        i++;
    }
        
}

function fselectedmon() {
    lastmon1 = plagiomon1;
    lastmon2 = plagiomon2;
    p1move1ZeroPP = p1move2ZeroPP = p1move3ZeroPP = p1move4ZeroPP = p1Seeded = p1flinched = p1badstatus = p1burned = p1paralyzed = p1fullyparalyzed = p1frozen = p1badpoisoned = p1poisoned = p2flinched = p2badstatus = p2burned = p2paralyzed = p2fullyparalyzed = p2frozen = p2badpoisoned = p2poisoned = p2Seeded = false; //remember to reset new variables here
    p2move1ZeroPP = p2move2ZeroPP = p2move3ZeroPP = p2move4ZeroPP = attackmiss = false;
    p1moveid = p2moveid = undefined;
    h1maintitle.hidden = true;
    sectionmonselect.hidden = true;
    monselect.hidden = true;
    cpuselect.hidden = true;
    rngselect.hidden = true;
    spanmon.hidden = false;
    spanmon.innerHTML = "Select your " + p1mon + "'s attack ";
    movesectionhider.hidden = false;
    buttonrematchnow.hidden = true;
    let sampletext = "";
    p1moveset = plagiomon1.moveset;
    p1PPs = [];
    PPindex = -1;
    p1moveset.forEach((move) => {
        PPindex++;
        p1PPs[PPindex] = move.setpp;
        sampletext += `
        <div class='move-inputholder ${move.moveid}-inputholder'>
            <input type='radio' name='movepool' class='move-input' id='${move.moveid}-radio' hidden>
            <label for='${move.moveid}-radio' class='move-label' id='${move.moveid}-label'>
                <span class='move-text' id='${move.moveid}-text'>${move.name}</span>
                <p class='move-subtext'>${move.type}</p>
            </label>
        </div>`
        divmovecontainer.innerHTML = sampletext;        
    });
    moveStruggle = false;
    radiomoves = document.getElementsByName('movepool');
    labelmoves = document.getElementsByClassName('move-label');
    spanmoves = document.getElementsByClassName('move-text');
    colorMove();
    updatePP();
    for (radio of radiomoves) {
        radio.checked = false;
        radio.disabled = false;
    }
    for (label of labelmoves) {
        label.style.filter = "invert(0)";
    }
    p1hp = p1maxhp = plagiomon1.maxhp;
    p1pyatk = plagiomon1.maxpyatk;
    p1pydef = plagiomon1.maxpydef;
    p1spatk = plagiomon1.maxspatk;
    p1spdef = plagiomon1.maxspdef;
    p1speed = plagiomon1.maxspeed;
    P1img.style.filter = "grayscale(0)";
    spanP1mon.innerHTML = "Your <b>" + p1mon + "</b>:";
    spanP1HPcount.style.color = pP1HPbar.style.background = "green";
    pP1HPbar.style.width = "100px";
    roundDecimalsAndShowHP(p1hp, spanP1HPcount, p1maxhp);
    p2hp = p2maxhp = plagiomon2.maxhp;
    p2pyatk = plagiomon2.maxpyatk;
    p2pydef = plagiomon2.maxpydef;
    p2spatk = plagiomon2.maxspatk;
    p2spdef = plagiomon2.maxspdef;
    p2speed = plagiomon2.maxspeed;
    p2moveset = plagiomon2.moveset;
    p2PPs = [];
    PPindex = -1;
    p2moveset.forEach((move) => {
        PPindex++;
        p2PPs[PPindex] = move.setpp;
    });
    P2img.style.filter = "grayscale(0)";
    spanP2mon.innerHTML = "CPU <b>" + p2mon + "</b>: ";
    spanP2HPcount.style.color = pP2HPbar.style.background = "green";
    pP2HPbar.style.width = "100px";
    roundDecimalsAndShowHP(p2hp, spanP2HPcount, p2maxhp);
    pP1status.innerHTML = pP2status.innerHTML = "";//CHECK THIS
    p1BasePyAtk = p1BasePyDef = p1BaseSpAtk = p1BaseSpDef = p1BaseSpeed = p1Accuracy = p1Evasion = p1ProtectRate = p2BasePyAtk = p2BasePyDef = p2BaseSpAtk = p2BaseSpDef = p2BaseSpeed = p2Accuracy = p2Evasion = p2ProtectRate = 100;

    p1PyAtkLevel = p1PyDefLevel = p1SpAtkLevel = p1SpDefLevel = p1SpeedLevel = p1badpoisonLevel = p1AccuracyLevel = p1EvasionLevel = p1ProtectLevel = p2PyAtkLevel = p2PyDefLevel = p2SpAtkLevel = p2SpDefLevel = p2SpeedLevel = p2badpoisonLevel = p2AccuracyLevel = p2EvasionLevel = p2ProtectLevel = p2ProtectLevel = turncounter = p1Reflect = p1LightScreen = p2Reflect = p2LightScreen = 0;

    lastDamageDealt = p1confusedLevel = p2confusedLevel = weatherLevel = -1;
    weather = "Clear";
    checkInitialWeather(plagiomon1);
    checkInitialWeather(plagiomon2);
    // messagebox1.innerHTML = messagebox2.innerHTML = "";
    messagebox1.innerHTML = "Player selected " + p1mon + ", can begin battle!";
    messagebox2.innerHTML = "CPU selected " + p2mon + ", waiting for player!";
    spanrestartbox.innerHTML = "";
    turncounter++;
    roundcounter++;
    spanturncounter.innerHTML = "(Turn " + turncounter + ")" + " [Round " + roundcounter + "]";
}

function updatePP() {
    if (moveStruggle == false) {
        spanmoves[0].innerHTML = p1moveset[0].name + " " + p1PPs[0] + "/" + p1moveset[0].maxpp;
        spanmoves[1].innerHTML = p1moveset[1].name + " " + p1PPs[1] + "/" + p1moveset[1].maxpp;
        spanmoves[2].innerHTML = p1moveset[2].name + " " + p1PPs[2] + "/" + p1moveset[2].maxpp;
        spanmoves[3].innerHTML = p1moveset[3].name + " " + p1PPs[3] + "/" + p1moveset[3].maxpp;
    } else {
        spanmoves[0].innerHTML = plagiomon1.struggle.name;
        spanmoves[1].innerHTML = plagiomon1.struggle.name;
        spanmoves[2].innerHTML = plagiomon1.struggle.name;
        spanmoves[3].innerHTML = plagiomon1.struggle.name;
    }
}

function changeStats1(stat, level, sign, factor) {
    if (sign == "+") {
        if (level < 6) {
            level++;
            if (level <= 0) {
                stat = (factor/(factor + (level*-1))) * 100;
            } else if (level >= 0) {
                stat = ((factor+level)/factor) * 100;
            } 
        }
    } else if (sign == "-") {
        if (level > -6) {
            level--;
            if (level <= 0) {
                stat = (factor/(factor + (level*-1))) * 100;
            } else if (level >= 0) {
                stat = ((factor+level)/factor) * 100;
            } 
        }
    }
    return [stat, level];
}

function changeStats2(stat, level, sign, factor) {
    if (sign == "+") {
        if (level < 5) {
            level = level + 2;
            if (level <= 0) {
                stat = (factor/(factor + (level*-1))) * 100;
            } else if (level >= 0) {
                stat = ((factor+level)/factor) * 100;
            } 
        } else {
            if (level < 6) {
                level++;
                stat = ((factor+level)/factor) * 100;
            }
        }
    } else if (sign == "-") {
        if (level > -5) {
            level = level -2;
            if (level <= 0) {
                stat = (factor/(factor + (level*-1))) * 100;
            } else if (level >= 0) {
                stat = ((factor+level)/factor) * 100;
            } 
        } else {
            if (level < -6) {
                level--;
                stat = (factor/(factor + (level*-1))) * 100;
            }
        }
    }
    return [stat, level];
}

function roundDecimals(value, n) {
    if (parseInt(value) != value) {
        value = value.toFixed(n);
    }
    return value;
}

function roundDecimalsAndShowHP(monhp, showhp, showmaxhp) {
    let percentagehp = 100 / (showmaxhp / monhp);
    let floathp, floatpercentagehp;
    if (monhp != 0) {
        if (parseInt(monhp) == monhp) {
            floathp = false;
            if (parseInt(percentagehp) == percentagehp)
                floatpercentagehp = false;
            else
                floatpercentagehp = true;
        } else {
            floathp = true;
            if (parseInt(percentagehp) == percentagehp)
                floatpercentagehp = false;
            else
                floatpercentagehp = true;
        }
        if (parseInt(showmaxhp) == showmaxhp) {
            if (floathp == false && floatpercentagehp == false)
                showhp.innerHTML = "HP: " + monhp + "/" + showmaxhp + " (" + percentagehp + "%)";
            else if (floathp == false && floatpercentagehp == true)
                showhp.innerHTML = "HP: " + monhp + "/" + showmaxhp + " (" + percentagehp.toFixed(2) + "%)";
            else if (floathp == true && floatpercentagehp == false)
                showhp.innerHTML = "HP: " + monhp.toFixed(2) + "/" + showmaxhp + " (" + percentagehp + "%)";
            else if (floathp == true && floatpercentagehp == true)
                showhp.innerHTML = "HP: " + monhp.toFixed(2) + "/" + showmaxhp + " (" + percentagehp.toFixed(2) + "%)";
        } else {
            if (floathp == false && floatpercentagehp == false)
                showhp.innerHTML = "HP: " + monhp + "/" + showmaxhp.toFixed(2) + " (" + percentagehp + "%)";
            else if (floathp == false && floatpercentagehp == true)
                showhp.innerHTML = "HP: " + monhp + "/" + showmaxhp.toFixed(2) + " (" + percentagehp.toFixed(2) + "%)";
            else if (floathp == true && floatpercentagehp == false)
                showhp.innerHTML = "HP: " + monhp.toFixed(2) + "/" + showmaxhp.toFixed(2) + " (" + percentagehp + "%)";
            else if (floathp == true && floatpercentagehp == true)
                showhp.innerHTML = "HP: " + monhp.toFixed(2) + "/" + showmaxhp.toFixed(2) + " (" + percentagehp.toFixed(2) + "%)";
        }
    }
}

function bumpZeroDamage(damage) {
    if (damage >= 0 && damage < 1)
        damage = 1;
    return damage;
}

function checkp2hp() {
    if (p2hp > 0)
        p2selectattack();
    else
        messagebox2.innerHTML = "";
}

function resetUI() {
    plagiomon1 = p1mon = p1monid = plagiomon2 = p2mon = p2monid = "NULLMON";
    selection = 1;
    h1maintitle.hidden = false;
    sectionmonselect.hidden = false;
    monselect.hidden = false;
    cpuselect.hidden = false;
    rngselect.hidden = false;
    spanmon.hidden = true;
    buttonrematchnow.hidden = false;
    if (spanP1mon.style.color != "")
        spanP1mon.style.color = "";
    if (messagebox1.style.color != "")
        messagebox1.style.color = "";
    if (spanP2mon.style.color != "")
        spanP2mon.style.color = "";
    if (messagebox2.style.color != "")
        messagebox2.style.color = "";
    for (radio of radiomoves) {
        radio.checked = false;
        radio.disabled = false;
    }
    for (label of labelmoves)
        label.style.filter = "invert(0)";
}

function colorHPbar(playerhp, playermaxhp, playerHPbar, playerHPcount, playerimg) {
    console.log("Player HP: " + playerhp);
    console.log("Player MaxHP: " + playermaxhp);
    console.log("Player HP bar: " + playerHPbar.innerHTML);
    console.log("Player HP count: " + playerHPcount.innerHTML);
    console.log("Player img: " + playerimg);

    let playerhpcolor;
    if (playerhp > 0) {
        console.log("HP is greater than zero");
        playerhpcolor = 100 / (playermaxhp / playerhp);
        console.log("playerhpcolor: " + playerhpcolor);
    } else {
        console.log("HP is lower than zero");
        playerhpcolor = playerhp = 0;
        if (parseInt(playermaxhp) == playermaxhp) {
            playerHPcount.innerHTML = "HP: " + playerhp + "/" + playermaxhp + " (0%)";
        } else {
            playerHPcount.innerHTML = "HP: " + playerhp + "/" + playermaxhp.toFixed(2) + " (0%)";
        }
        setTimeout(() => {
            playerimg.style.filter = "grayscale(1)";
            playerimg.style.transition = "filter 1s";
            spanrestartbox.innerHTML = "Presiona el botón de seleccionar mon para iniciar una nueva batalla.";
        }, 2000);
    }
    // playerHPbar.style.transform = "scaleX(" + (playerhpcolor / 100) + ") translateX(" + (-100 + playerhpcolor) + "px)";
    playerHPbar.style.width = playerhpcolor + "px";
    console.log("styled playerhpbar");
    if (playerhpcolor <= 100 && playerhpcolor > 50) {
        playerhpcolor = "green";
    } else if (playerhpcolor <= 50 && playerhpcolor > 20) {
        playerhpcolor = "yellow";
    } else if (playerhpcolor <= 20 && playerhpcolor > 0) {
        playerhpcolor = "red";
    } else if (playerhpcolor == 0) {
        playerhpcolor = "lightgray";
    } else {
        playerhpcolor = "black";
    }
    console.log("before styling color");
    playerHPbar.style.background = playerhpcolor;
    if (playerhpcolor == "yellow") {
        playerHPcount.style.color = "orange";
    } else {
        playerHPcount.style.color = playerhpcolor;
    }
    roundDecimalsAndShowHP(playerhp, playerHPcount, playermaxhp);
    return playerhp;
}
//Type Multipliers

function NormalMultiplier(damageMultiplier, pmove, defender) {
    if (pmove.type == "Normal") {
        if (defender.type1 == "Ghost" || defender.type2 == "Ghost") {
            damageMultiplier*= 0;
        }
        if (defender.type1 == "Rock" || defender.type2 == "Rock") {
            damageMultiplier/= 2;
        }
        if (defender.type1 == "Steel" || defender.type2 == "Steel") {
            damageMultiplier/= 2;
        }
    }
    return damageMultiplier;
}

function GhostMultiplier(damageMultiplier, pmove, defender) {
    if (pmove.type == "Ghost") {
        if (defender.type1 == "Normal" || defender.type2 == "Normal") {
            damageMultiplier*= 0;
        }
        if (defender.type1 == "Ghost" || defender.type2 == "Ghost") {
            damageMultiplier*= 2;
        }
        if (defender.type1 == "Psychic" || defender.type2 == "Psychic") {
            damageMultiplier*= 2;
        }
        if (defender.type1 == "Dark" || defender.type2 == "Dark") {
            damageMultiplier/= 2;
        }
    }
    return damageMultiplier;
}

function DarkMultiplier(damageMultiplier, pmove, defender) {
    if (pmove.type == "Dark") {
        if (defender.type1 == "Ghost" || defender.type2 == "Ghost") {
            damageMultiplier*= 2;
        }
        if (defender.type1 == "Psychic" || defender.type2 == "Psychic") {
            damageMultiplier*= 2;
        }
        if (defender.type1 == "Dark" || defender.type2 == "Dark") {
            damageMultiplier/= 2;
        }
        if (defender.type1 == "Fairy" || defender.type2 == "Fairy") {
            damageMultiplier/= 2;
        }
        if (defender.type1 == "Fighting" || defender.type2 == "Fighting") {
            damageMultiplier/= 2;
        }
    }
    return damageMultiplier;
}

function ElectricMultiplier(damageMultiplier, pmove, defender) {
    if (pmove.type == "Electric") {
        if (defender.type1 == "Ground" || defender.type2 == "Ground") {
            damageMultiplier*= 0;
        }
        if (defender.type1 == "Flying" || defender.type2 == "Flying") {
            damageMultiplier*= 2;
        }
        if (defender.type1 == "Water" || defender.type2 == "Water") {
            damageMultiplier*= 2;
        }
        if (defender.type1 == "Grass" || defender.type2 == "Grass") {
            damageMultiplier/= 2;
        }
        if (defender.type1 == "Electric" || defender.type2 == "Electric") {
            damageMultiplier/= 2;
        }
        if (defender.type1 == "Dragon" || defender.type2 == "Dragon") {
            damageMultiplier/= 2;
        }
    }
    return damageMultiplier;
}

function FightingMultiplier(damageMultiplier, pmove, defender) {
    if (pmove.type == "Fighting") {
        if (defender.type1 == "Ghost" || defender.type2 == "Ghost") {
            damageMultiplier*= 0;
        }
        if (defender.type1 == "Dark" || defender.type2 == "Dark") {
            damageMultiplier*= 2;
        }
        if (defender.type1 == "Ice" || defender.type2 == "Ice") {
            damageMultiplier*= 2;
        }
        if (defender.type1 == "Normal" || defender.type2 == "Normal") {
            damageMultiplier*= 2;
        }
        if (defender.type1 == "Rock" || defender.type2 == "Rock") {
            damageMultiplier*= 2;
        }
        if (defender.type1 == "Steel" || defender.type2 == "Steel") {
            damageMultiplier*= 2;
        }
        if (defender.type1 == "Bug" || defender.type2 == "Bug") {
            damageMultiplier/= 2;
        }
        if (defender.type1 == "Fairy" || defender.type2 == "Fairy") {
            damageMultiplier/= 2;
        }
        if (defender.type1 == "Flying" || defender.type2 == "Flying") {
            damageMultiplier/= 2;
        }
        if (defender.type1 == "Poison" || defender.type2 == "Poison") {
            damageMultiplier/= 2;
        }
        if (defender.type1 == "Psychic" || defender.type2 == "Psychic") {
            damageMultiplier/= 2;
        }
    }
    return damageMultiplier;
}

function FireMultiplier(damageMultiplier, pmove, defender) {
    if (pmove.type == "Fire") {
        if (defender.type1 == "Bug" || defender.type2 == "Bug") {
            damageMultiplier*= 2;
        }
        if (defender.type1 == "Grass" || defender.type2 == "Grass") {
            damageMultiplier*= 2;
        }
        if (defender.type1 == "Ice" || defender.type2 == "Ice") {
            damageMultiplier*= 2;
        }
        if (defender.type1 == "Steel" || defender.type2 == "Steel") {
            damageMultiplier*= 2;
        }
        if (defender.type1 == "Rock" || defender.type2 == "Rock") {
            damageMultiplier/= 2;
        }
        if (defender.type1 == "Fire" || defender.type2 == "Fire") {
            damageMultiplier/= 2;
        }
        if (defender.type1 == "Water" || defender.type2 == "Water") {
            damageMultiplier/= 2;
        }
        if (defender.type1 == "Dragon" || defender.type2 == "Dragon") {
            damageMultiplier/= 2;
        }
    }
    return damageMultiplier;
}

function FlyingMultiplier(damageMultiplier, pmove, defender) {
    if (pmove.type == "Flying") {
        if (defender.type1 == "Bug" || defender.type2 == "Bug") {
            damageMultiplier*= 2;
        }
        if (defender.type1 == "Fighting" || defender.type2 == "Fighting") {
            damageMultiplier*= 2;
        }
        if (defender.type1 == "Grass" || defender.type2 == "Grass") {
            damageMultiplier*= 2;
        }
        if (defender.type1 == "Electric" || defender.type2 == "Electric") {
            damageMultiplier/= 2;
        }
        if (defender.type1 == "Rock" || defender.type2 == "Rock") {
            damageMultiplier/= 2;
        }
        if (defender.type1 == "Steel" || defender.type2 == "Steel") {
            damageMultiplier/= 2;
        }
    }
    return damageMultiplier;
}

function GroundMultiplier(damageMultiplier, pmove, defender) {
    if (pmove.type == "Ground") {
        if (defender.type1 == "Flying" || defender.type2 == "Flying") {
            damageMultiplier*= 0;
        }
        if (defender.type1 == "Electric" || defender.type2 == "Electric") {
            damageMultiplier*= 2;
        }
        if (defender.type1 == "Fire" || defender.type2 == "Fire") {
            damageMultiplier*= 2;
        }
        if (defender.type1 == "Poison" || defender.type2 == "Poison") {
            damageMultiplier*= 2;
        }
        if (defender.type1 == "Rock" || defender.type2 == "Rock") {
            damageMultiplier*= 2;
        }
        if (defender.type1 == "Steel" || defender.type2 == "Steel") {
            damageMultiplier*= 2;
        }
        if (defender.type1 == "Bug" || defender.type2 == "Bug") {
            damageMultiplier/= 2;
        }
        if (defender.type1 == "Grass" || defender.type2 == "Grass") {
            damageMultiplier/= 2;
        }
    }
    return damageMultiplier;
}

function GrassMultiplier(damageMultiplier, pmove, defender) {
    if (pmove.type == "Grass") {
        if (defender.type1 == "Ground" || defender.type2 == "Ground") {
            damageMultiplier*= 2;
        }
        if (defender.type1 == "Rock" || defender.type2 == "Rock") {
            damageMultiplier*= 2;
        }
        if (defender.type1 == "Water" || defender.type2 == "Water") {
            damageMultiplier*= 2;
        }
        if (defender.type1 == "Bug" || defender.type2 == "Bug") {
            damageMultiplier/= 2;
        }
        if (defender.type1 == "Dragon" || defender.type2 == "Dragon") {
            damageMultiplier/= 2;
        }
        if (defender.type1 == "Fire" || defender.type2 == "Fire") {
            damageMultiplier/= 2;
        }
        if (defender.type1 == "Flying" || defender.type2 == "Flying") {
            damageMultiplier/= 2;
        }
        if (defender.type1 == "Grass" || defender.type2 == "Grass") {
            damageMultiplier/= 2;
        }
        if (defender.type1 == "Poison" || defender.type2 == "Poison") {
            damageMultiplier/= 2;
        }
        if (defender.type1 == "Steel" || defender.type2 == "Steel") {
            damageMultiplier/= 2;
        }
    }
    return damageMultiplier;
}

function IceMultiplier(damageMultiplier, pmove, defender) {
    if (pmove.type == "Ice") {
        if (defender.type1 == "Dragon" || defender.type2 == "Dragon") {
            damageMultiplier*= 2;
        }
        if (defender.type1 == "Flying" || defender.type2 == "Flying") {
            damageMultiplier*= 2;
        }
        if (defender.type1 == "Grass" || defender.type2 == "Grass") {
            damageMultiplier*= 2;
        }
        if (defender.type1 == "Ground" || defender.type2 == "Ground") {
            damageMultiplier*= 2;
        }
        if (defender.type1 == "Fire" || defender.type2 == "Fire") {
            damageMultiplier/= 2;
        }
        if (defender.type1 == "Ice" || defender.type2 == "Ice") {
            damageMultiplier/= 2;
        }
        if (defender.type1 == "Steel" || defender.type2 == "Steel") {
            damageMultiplier/= 2;
        }
        if (defender.type1 == "Water" || defender.type2 == "Water") {
            damageMultiplier/= 2;
        }
    }
    return damageMultiplier;
}

function PoisonMultiplier(damageMultiplier, pmove, defender) {
    if (pmove.type == "Poison") {
        if (defender.type1 == "Steel" || defender.type2 == "Steel") {
            damageMultiplier*= 0;
        }
        if (defender.type1 == "Fairy" || defender.type2 == "Fairy") {
            damageMultiplier*= 2;
        }
        if (defender.type1 == "Grass" || defender.type2 == "Grass") {
            damageMultiplier*= 2;
        }
        if (defender.type1 == "Ghost" || defender.type2 == "Ghost") {
            damageMultiplier/= 2;
        }
        if (defender.type1 == "Ground" || defender.type2 == "Ground") {
            damageMultiplier/= 2;
        }
        if (defender.type1 == "Poison" || defender.type2 == "Poison") {
            damageMultiplier/= 2;
        }
        if (defender.type1 == "Rock" || defender.type2 == "Rock") {
            damageMultiplier/= 2;
        }
    }
    return damageMultiplier;
}

function RockMultiplier(damageMultiplier, pmove, defender) {
    if (pmove.type == "Rock") {
        if (defender.type1 == "Bug" || defender.type2 == "Bug") {
            damageMultiplier*= 2;
        }
        if (defender.type1 == "Fire" || defender.type2 == "Fire") {
            damageMultiplier*= 2;
        }
        if (defender.type1 == "Flying" || defender.type2 == "Flying") {
            damageMultiplier*= 2;
        }
        if (defender.type1 == "Ice" || defender.type2 == "Ice") {
            damageMultiplier*= 2;
        }
        if (defender.type1 == "Fighting" || defender.type2 == "Fighting") {
            damageMultiplier/= 2;
        }
        if (defender.type1 == "Ground" || defender.type2 == "Ground") {
            damageMultiplier/= 2;
        }
        if (defender.type1 == "Steel" || defender.type2 == "Steel") {
            damageMultiplier/= 2;
        }
    }
    return damageMultiplier;
}

function WaterMultiplier(damageMultiplier, pmove, defender) {
    if (pmove.type == "Water") {
        if (defender.type1 == "Ground" || defender.type2 == "Ground") {
            damageMultiplier*= 2;
        }
        if (defender.type1 == "Fire" || defender.type2 == "Fire") {
            damageMultiplier*= 2;
        }
        if (defender.type1 == "Rock" || defender.type2 == "Rock") {
            damageMultiplier*= 2;
        }
        if (defender.type1 == "Grass" || defender.type2 == "Grass") {
            damageMultiplier/= 2;
        }
        if (defender.type1 == "Water" || defender.type2 == "Water") {
            damageMultiplier/= 2;
        }
        if (defender.type1 == "Dragon" || defender.type2 == "Dragon") {
            damageMultiplier/= 2;
        }
    }
    return damageMultiplier;
}

function PsychicMultiplier(damageMultiplier, pmove, defender) {
    if (pmove.type == "Psychic") {
        if (defender.type1 == "Dark" || defender.type2 == "Dark") {
            damageMultiplier*= 0;
        }
        if (defender.type1 == "Fighting" || defender.type2 == "Fighting") {
            damageMultiplier*= 2;
        }
        if (defender.type1 == "Poison" || defender.type2 == "Poison") {
            damageMultiplier*= 2;
        }
        if (defender.type1 == "Steel" || defender.type2 == "Steel") {
            damageMultiplier/= 2;
        }
        if (defender.type1 == "Psychic" || defender.type2 == "Psychic") {
            damageMultiplier/= 2;
        }
    }
    return damageMultiplier;
}

function NormalizeSetDamage(damageMultiplier, pmove) {
    if (pmove.critrate == "none") {
        if (damageMultiplier > 0) {
            if (damageMultiplier != 1) {
                damageMultiplier = 1;
            }
        }
    }
    return damageMultiplier;
}

function checkMove(checkOrder, aMove, aPP, amon, apyatk, apydef, aspatk, aspdef, aspeed, aBasePyAtk, aBasePyDef, aBaseSpAtk, aBaseSpDef, aBaseSpeed, aPyAtkLevel, aPyDefLevel, aSpAtkLevel, aSpDefLevel, aSpeedLevel, abadstatus, aburned, afrozen, aparalyzed, afullyparalyzed, apoisoned, aflinched, aconfusedLevel, attacker, attackertext, attackerboxp, attackerimg, attackerHP, attackerHPbar, attackerHPcount, attackerMaxHP, attackerPower, aEvasion, aEvasionLevel, aProtectLevel, aProtectMessage, aProtectRate, aReflect, aLightScreen, dMove, dPP, dmon, dpyatk, dpydef, dspatk, dspdef, dspeed, dBasePyAtk, dBasePyDef, dBaseSpAtk, dBaseSpDef, dBaseSpeed, dPyAtkLevel, dPyDefLevel, dSpAtkLevel, dSpDefLevel, dSpeedLevel, dProtectLevel, dProtectRate, dReflect, dLightScreen, dmontext, defender, defenderboxp, defenderimg, defenderHP, defenderHPbar, defenderHPcount, defenderMaxHP, dbadstatus, dpoisoned, dfrozen, dburned, dparalyzed, dflinched, dconfusedLevel, dSeeded, checkMoveCategory, checkDamageDealt) {
    //alert("aMove: " + aMove.name);
    //alert("defenderMaxHP: " + defenderMaxHP);
    // alert("Player: " + amon + " | Last Damage Dealt at start of CheckMove: " + checkDamageDealt);
    if (defenderHP <= 0) {
        messagebox.innerHTML = dmon + " fainted!";
        return [aPP, attackerHP, attackerMaxHP, apyatk, apydef, aspatk, aspdef, aspeed, aBasePyAtk, aBasePyDef, aBaseSpAtk, aBaseSpDef, aBaseSpeed, aPyAtkLevel, aPyDefLevel, aSpAtkLevel, aSpDefLevel, aSpeedLevel, attackerPower, abadstatus, apoisoned, aburned, aparalyzed, aflinched, aconfusedLevel, afullyparalyzed, afrozen, aEvasion, aEvasionLevel, aProtectLevel, aProtectMessage, aProtectRate, aReflect, aLightScreen, dPP, defenderHP, defenderMaxHP, dpyatk, dpydef, dspatk, dspdef, dspeed, dBasePyAtk, dBasePyDef, dBaseSpAtk, dBaseSpDef, dBaseSpeed, dPyAtkLevel, dPyDefLevel, dSpAtkLevel, dSpDefLevel, dSpeedLevel, dProtectLevel, dProtectRate, dReflect, dLightScreen, dbadstatus, dpoisoned, dfrozen, dburned, dparalyzed, dflinched, dconfusedLevel, dSeeded]
    }
    let attackerMessage = "";
    let aconfused = false;
    let attackerPercentHP = attackerHP/attackerMaxHP*100;
    if (weather == "Sandstorm") {
        if (attacker.type1 == "Rock" || attacker.type2 == "Rock")
        {
            aspdef = attacker.maxspdef * 1.5;
        }
        if (defender.type1 == "Rock" || defender.type2 == "Rock")
        {
            dspdef = defender.maxspdef * 1.5;
        }
    }
    
    if (aPP[aMove.moveid] > 0) {
        if (aconfusedLevel >= 0) {
            aconfusedLevel++;
            let confuserate = Math.random() * 100;
            let confusionDamageMultiplier = 0;
            while (confusionDamageMultiplier < 0.93) {
                confusionDamageMultiplier = Math.random() * 1.08;
            }
            confusionDamage = ((((((2*attacker.level)/5)+2)*40*apyatk*(aBasePyAtk/100))/apydef*(aBasePyDef/100))/50) + 2;
            confusionDamage*= confusionDamageMultiplier;
            confusionDamage = roundDecimals(confusionDamage, 2);
            if (aconfusedLevel < 3) {
                if (confuserate > 50) {
                    aconfused = true;
                    attackerHP -= confusionDamage;
                    attackerMessage+= amon + " hurt itself in it's confusion! (-" + confusionDamage + "HP)";
                }
            } else if (aconfusedLevel < 5) {
                let snapConfusion = Math.random() * 100;
                if (snapConfusion < 50) {
                    if (confuserate > 50) {
                        aconfused = true;
                        attackerHP -= confusionDamage;
                        attackerMessage+= amon + " hurt itself in it's confusion! (-" + confusionDamage + "HP)";
                    }
                } else {
                    aconfusedLevel = -1;
                    attackerMessage += amon + " snapped out of it's confusion!";
                }
            } else {
                aconfusedLevel = -1;
                attackerMessage += amon + " snapped out of it's confusion!";
            }
        }
        if (aMove.name == "Fake Out") {
            if (turncounter != 1) {
                attackmiss = true;
            }
        }
        if (attackmiss == false && aflinched == false && aconfused == false && afrozen == false && afullyparalyzed == false) {
            if (aMove.target != "self") {
                if (dProtectLevel == 0) {
                    if (aMove.category != "Status") {
                        console.log("not a status move");
                        let damageMultiplier = 1;
                        let lowHPboost = false;
                        attackerPower = -1;
                        let roundedPower;
                        if (aMove.power != "-") {
                            console.log("standard damage calc") 
                            if (aMove.category == "Physical") {
                                if (aMove.name == "Struggle") {
                                    attackerHP -= Math.round(attacker.maxhp * 25 / 100);
                                }
                                console.log("physical move");
                                console.log("defender: " + defender.name);
                                console.log("defender maxpydef: " + defender.maxpydef);
                                if (attacker.ability == "Overgrow" || attacker.ability == "Blaze" || attacker.ability == "Torrent") {
                                    if (attackerHP < attackerMaxHP/3) {
                                        if (aMove.type == attacker.type1) {
                                            if (aMove.stab == true) {
                                                attackerPower = ((((((2*attacker.level)/5)+2)*aMove.power*(apyatk*1.5))/dpydef)/50) + 2;
                                                lowHPboost = true;
                                                console.log("Low HP Boost!");
                                            } 
                                        } 
                                    } 
                                }
                                if (lowHPboost == false) {
                                    attackerPower = ((((((2*attacker.level)/5)+2)*aMove.power*apyatk)/dpydef)/50) + 2;
                                }
                                attackerPower *= aBasePyAtk / 100;
                                if (dReflect > 0) {
                                    attackerPower/= 2;
                                }
                                if (aburned == true)
                                    attackerPower/= 2;
                            } else if (aMove.category == "Special") {
                                if (aMove.name != "Mirror Coat") {
                                    console.log("special move");
                                    console.log("defender: " + defender.name);
                                    console.log("defender maxspdef: " + defender.maxspdef);
                                    attackerPower = ((((((2*attacker.level)/5)+2)*aMove.power*aspatk)/dspdef)/50) + 2;
                                    if (attacker.ability == "Overgrow" || attacker.ability == "Blaze" || attacker.ability == "Torrent") {
                                        if (attackerHP < attackerMaxHP/3) {
                                            if (aMove.type == attacker.type1) {
                                                if (aMove.stab == true) {
                                                    attackerPower = ((((((2*attacker.level)/5)+2)*aMove.power*(aspatk*1.5))/dspdef)/50) + 2;
                                                    lowHPboost = true;
                                                    console.log("Low HP Boost!");
                                                } 
                                            } 
                                        } 
                                    }
                                    if (lowHPboost == false) {
                                        attackerPower = ((((((2*attacker.level)/5)+2)*aMove.power*aspatk)/dspdef)/50) + 2;
                                    }
                                    attackerPower *= aBaseSpAtk / 100;
                                    if (dLightScreen > 0) {
                                        attackerPower/= 2;
                                    }
                                } 
                            }
                        }
                        //Begin other damage formula like Reversal and Mirror Coat 
                        else { 
                            if (aMove.effect = "returnDamage2x") {
                                if (aMove.name == "Mirror Coat") {
                                    console.log("Mirror Coat");
                                    if (checkMoveCategory == "Special") {
                                        if (checkDamageDealt >= 0) {
                                            attackerPower = checkDamageDealt*2;
                                            console.log("Mirror Coat *2");
                                        } else {
                                            attackerMessage = "<b>" + amon + "'s</b> used " + aMove.name + " failed due to no damage dealt!";
                                            console.log("<b>" + amon + "'s</b> used " + aMove.name + " failed due to no damage dealt!");    
                                        }
                                    } else {
                                        attackerMessage = "<b>" + amon + "'s</b> used " + aMove.name + " failed due to non-special move! (" + checkMoveCategory + ")";
                                        console.log("<b>" + amon + "'s</b> used " + aMove.name + " failed due to non-special move! (" + checkMoveCategory + ")");
                                    }
                                } else if (aMove.name == "Counter") {
                                    console.log("Mirror Coat");
                                    if (checkMoveCategory == "Physical") {
                                        if (checkDamageDealt >= 0) {
                                            attackerPower = checkDamageDealt*2;
                                            console.log("Mirror Coat *2");
                                        } else {
                                            attackerMessage = "<b>" + amon + "'s</b> used " + aMove.name + " failed due to no damage dealt!";
                                            console.log("<b>" + amon + "'s</b> used " + aMove.name + " failed due to no damage dealt!");    
                                        }
                                    } else {
                                        attackerMessage = "<b>" + amon + "'s</b> used " + aMove.name + " failed due to non-physical move! (" + checkMoveCategory + ")";
                                        console.log("<b>" + amon + "'s</b> used " + aMove.name + " failed due to non-special move! (" + checkMoveCategory + ")");
                                    }
                                } else {
                                    alert("Not Counter nor Mirror Coat");
                                }
                            }
                            if (aMove.effect == "flailReversal") {
                                if (attackerPercentHP >= 68.75) {
                                    attackerPower = ((((((2*attacker.level)/5)+2)*20*apyatk)/dpydef)/50) + 2;
                                } else if (attackerPercentHP < 68.75 && attackerPercentHP >= 35.42) {
                                    attackerPower = ((((((2*attacker.level)/5)+2)*40*apyatk)/dpydef)/50) + 2;
                                } else if (attackerPercentHP < 35.42 && attackerPercentHP >= 20.83) {
                                    attackerPower = ((((((2*attacker.level)/5)+2)*80*apyatk)/dpydef)/50) + 2;
                                } else if (attackerPercentHP < 20.83 && attackerPercentHP >= 10.42) {
                                    attackerPower = ((((((2*attacker.level)/5)+2)*100*apyatk)/dpydef)/50) + 2;
                                } else if (attackerPercentHP < 10.42 && attackerPercentHP >= 4.17) {
                                    attackerPower = ((((((2*attacker.level)/5)+2)*150*apyatk)/dpydef)/50) + 2;
                                } else if (attackerPercentHP < 4.17) {
                                    attackerPower = ((((((2*attacker.level)/5)+2)*200*apyatk)/dpydef)/50) + 2;
                                } else {
                                    alert("flailReversal equals NaN: " + attackerPercentHP);
                                }
                            }
                        }
                        if (aMove.type == attacker.type1 || aMove.type == attacker.type2) {
                            if (aMove.stab == true) {
                                attackerPower *= sametypeattackbonus;
                                console.log("STAB OK");
                            }
                        } else {
                            console.log("NO STAB");
                        } 
                        if (aMove.name != "Struggle") {
                            damageMultiplier = NormalMultiplier(damageMultiplier, aMove, defender);
                            damageMultiplier = FightingMultiplier(damageMultiplier, aMove, defender);
                            damageMultiplier = FlyingMultiplier(damageMultiplier, aMove, defender);
                            damageMultiplier = PoisonMultiplier(damageMultiplier, aMove, defender);
                            damageMultiplier = GroundMultiplier(damageMultiplier, aMove, defender)
                            damageMultiplier = RockMultiplier(damageMultiplier, aMove, defender)
                            damageMultiplier = GhostMultiplier(damageMultiplier, aMove, defender)
                            // Physical / Special Split as per Generations I-III
                            damageMultiplier = FireMultiplier(damageMultiplier, aMove, defender);
                            damageMultiplier = WaterMultiplier(damageMultiplier, aMove, defender);
                            damageMultiplier = GrassMultiplier(damageMultiplier, aMove, defender);
                            damageMultiplier = ElectricMultiplier(damageMultiplier, aMove, defender)
                            damageMultiplier = PsychicMultiplier(damageMultiplier, aMove, defender);
                            damageMultiplier = IceMultiplier(damageMultiplier, aMove, defender)
                            damageMultiplier = DarkMultiplier(damageMultiplier, aMove, defender);
                            damageMultiplier = NormalizeSetDamage(damageMultiplier, aMove);
                        }
                        if (aMove.effect == "revengeTurn") {
                            if (checkOrder == "second") {
                                attackerPower*= 2;
                                console.log("REVENGE DAMAGE BOOST!");
                            }
                        }
                        //alert("APOWER HERE: " + attackerPower);
                        let effectiveMessage;
                        if (damageMultiplier == 0) {
                            effectiveMessage = " It doesn't affect ";
                        } else if (damageMultiplier == 0.25) {
                            effectiveMessage = " It's NOT very effective...";
                        } else if (damageMultiplier == 0.5) {
                            effectiveMessage = " It's not very effective!";
                        } else if (damageMultiplier == 1) {
                            effectiveMessage = "";
                        } else if (damageMultiplier == 2) {
                            effectiveMessage = " It's super effective!!";
                        } else if (damageMultiplier == 4) {
                            effectiveMessage = " It's SUPER effective!!!!";
                        } else {
                            effectiveMessage = " UNKNOWN EFFECTIVENESS ";
                        }
                        console.log("Move: " + aMove.name + " | Power: " + attackerPower + " * " + damageMultiplier);
                        attackerPower*= damageMultiplier;
                        console.log("Full Power: " + attackerPower);
                        if (damageMultiplier == 0) {
                            attackerMessage = "<b>" + amon + "</b> used " + aMove.name + "! " + effectiveMessage + "<b>" + dmon + "</b>.";
                            messagebox.innerHTML = attackerMessage;
                            // alert(attackerMessage);
                        } else {
                            let criticalrate = 0;
                            if (aMove.critrate != "none") {
                                if (aMove.critrate == "increased") {
                                    criticalrate = Math.ceil((Math.random() * 117.283950617) / 100);
                                } else if (aMove.critrate == "standard") {
                                    criticalrate = Math.round(Math.random() * 100);
                                } else {
                                    criticalrate = "Critrate exception";
                                }
                                if (criticalrate > 95) {
                                    attackerPower*= 2;
                                    console.log("Crit damage before RNG: " + attackerPower);
                                } else {
                                    //If attack doesn't crit
                                    console.log("non-Crit damage before RNG: " + attackerPower);
                                }
                                let randomMultiplier = 0;
                                while (randomMultiplier < 0.93) {
                                    randomMultiplier = Math.random() * 1.08;
                                    console.log("RNG: " + randomMultiplier)
                                }
                                attackerPower *= randomMultiplier;
                            }
                            attackerPower = bumpZeroDamage(attackerPower);
                            roundedPower = roundDecimals(attackerPower, 2);
                            if (criticalrate > 95 ) {
                                    if (aMove.name == "Struggle") {
                                        attackerMessage = "<b>CRITICAL HIT!!</b><br>" + amon + " has no moves left!<br>" + amon + " used <i><u>" + aMove.name + "</u></i>!!!<br>" + dmon + " took " + roundedPower + " major damage!";    
                                    } else {
                                        attackerMessage = "<b>CRITICAL HIT!!</b><br>" + dmon + " took " + roundedPower + " major damage from " + amon + "'s " + aMove.name + "!!!" + effectiveMessage;
                                    }
                                
                            } else {
                                if (aMove.name == "Struggle") {
                                    attackerMessage = "<b>" + amon + "</b> has no moves left!<br><b>" + amon + "</b> used <i><u>" + aMove.name + "</u></i>!!<br>" + dmon + " took " + roundedPower + " damage!!!";
                                } else {
                                    attackerMessage = "<b>" + amon + "</b> used " + aMove.name + "!<br>" + dmon + " took " + roundedPower + " damage!!" + effectiveMessage;
                                }
                            }
                            // alert("Full Power: " + roundedPower);
                            if (attackerPower < 0) {
                                attackerMessage = "<b>" + amon + "</b> used " + aMove.name + "!<br>But it failed!";
                                messagebox.innerHTML = attackerMessage;
                            }
                            if (attackerPower > 0) { //calc drain and recoil
                                let recoilDamage; 
                                    if (attackerPower > defenderHP) {
                                        recoilDamage = defenderHP*aMove.recoil;
                                    } else {
                                        recoilDamage = attackerPower*aMove.recoil;
                                    }
                                defenderHP -= attackerPower;
                                if (aMove.name == "Absorb" || aMove.name == "Mega Drain" || aMove.name == "Leech Life" || aMove.name == "Giga Drain" || aMove.name == "Drain Punch" || aMove.name == "Horn Leech") {
                                    if (attackerHP < attackerMaxHP) {
                                        console.log("Attacker HP less than MAXHP before " + aMove.name + ": <" + attackerHP);
                                        attackerHP += attackerPower/2;
                                        console.log("Attacker HP less than MAXHP after " + aMove.name + ": <" + attackerHP);
                                    } 
                                    if (attackerHP > attackerMaxHP) {
                                        console.log("Attacker HP more than MAXHP before " + aMove.name + ": >" + attackerHP);
                                        attackerHP = attackerMaxHP;
                                        console.log("Attacker HP equal MAXHP after " + aMove.name + ": >" + attackerHP);
                                    }
                                    attackerMessage += " | <b>" + amon + " restored " + roundedPower/2 + "HP" ;
                                }
                                if (aMove.recoil > 0) {
                                    attackerHP-= recoilDamage;
                                    recoilDamage = roundDecimals(recoilDamage, 2);
                                    attackerMessage+= "<br>" + amon + " is hurt by the recoil damage! (-" + recoilDamage + "HP)";
                                    console.log(attackerMessage);
                                } else {
                                }
                            }
                            messagebox.innerHTML = attackerMessage;
                            if (defenderHP > 0) {
                                if (dbadstatus == false) {
                                    if (aMove.effect == "burn" || aMove.effect == "triattack") {
                                        if (defender.type1 != "Fire" && defender.type2 != "Fire") {
                                            let burnlimit;
                                            let burnrate = Math.random() * 100;
                                            if (aMove.name == "Ember" || aMove.name == "Fire Punch" || aMove.name == "Flamethrower" || aMove.name == "Fire Blast" || aMove.name == "Flame Wheel" || aMove.name == "Blaze Kick" || aMove.name == "Heat Wave" || aMove.name == "Fire Fang" || aMove.name == "Flare Blitz" || aMove.name == "Pyro Ball" || aMove.name == "Shadow Fire") {
                                                burnlimit = 90;
                                            } else if (aMove.name == "Tri Attack") {
                                                if (dbadstatus == false) {
                                                    burnlimit = 93.3333333333;
                                                    burnrate = Math.random() * 100;
                                                }
                                            }
                                            if (burnrate > burnlimit) {
                                                dburned = true;
                                                dbadstatus = true;
                                                dpyatk = defender.maxpyatk/2;
                                                dmontext.innerHTML += "| BRN";
                                                dmontext.style.color = "red";
                                                attackerMessage += "<br><b>" + dmon + "</b> was <i>burned!!!</i>";
                                                if (defender.ability == "Synchronize") {
                                                    if (attacker.type1 != "Fire" && attacker.type2 != "Fire") {
                                                        aburned = true;
                                                        abadstatus = true;
                                                        apyatk = attacker.maxpyatk/2;
                                                        attackertext.innerHTML += "| BRN";
                                                        attackertext.style.color = "red";
                                                        attackerMessage += "<br>" + dmon + "'s <b>" + defender.ability + "</b> burned " + amon + "!!!";
                                                    }
                                                }
                                            }
                                        }
                                    } if (aMove.effect == "freeze" || aMove.effect == "triattack") {
                                        if (defender.type1 != "Ice" && defender.type2 != "Ice") {
                                            let freezelimit;
                                            let freezerate = Math.random() * 100;
                                            if (aMove.name == "Ice Punch" || aMove.name == "Ice Beam" || aMove.name == "Blizzard" || aMove.name == "Powder Snow" || aMove.name == "Ice Fang" || aMove.name == "Ice Fang" || aMove.name == "Freeze-Dry" || aMove.name == "Freezing Glare" || aMove.name == "Shadow Chill") {
                                                freezelimit = 90;
                                            } else if (aMove.name == "Tri Attack") {
                                                if (dbadstatus == false) {
                                                    freezelimit = 93.3333333333;
                                                    freezerate = Math.random() * 100;
                                                }
                                            }
                                            if (freezerate > freezelimit) {
                                                dfrozen = true;
                                                dbadstatus = true;
                                                dmontext.innerHTML += "| FRZ";
                                                dmontext.style.color = "deepskyblue";
                                                attackerMessage += "<br><b>" + dmon + "</b> was <i>frozen solid!!!</i>";
                                            }
                                        }
                                    } if (aMove.effect == "paralyze" || aMove.effect == "triattack") {
                                        if (defender.type1 != "Electric" && defender.type2 != "Electric") {
                                            let paralimit;
                                            let pararate = Math.random() * 100;
                                            if (aMove.name == "Thunder Shock" || aMove.name == "Thunder Punch" || aMove.name == "Thunderbolt" || aMove.name == "Volt Tackle" || aMove.name == "Thunder Fang" || aMove.name == "Shadow Bolt") {
                                                paralimit = 90;
                                            } else if (aMove.name == "Body Slam" || aMove.name == "Bounce" || aMove.name == "Discharge" || aMove.name == "Dragon Breath" || aMove.name == "Force Palm" || aMove.name == "Freeze Shock" || aMove.name == "Lick" || aMove.name == "Secret Power Electric" || aMove.name == "Spark" || aMove.name == "Splishy Splash" || aMove.name == "Thunder") {
                                                paralimit = 70;

                                            }

                                                else if (aMove.name == "Tri Attack") {
                                                if (dbadstatus == false) {
                                                    paralimit = 93.3333333333;
                                                    pararate = Math.random() * 100;
                                                }
                                            }
                                            if (pararate > paralimit) {
                                                dparalyzed = true;
                                                dbadstatus = true;
                                                dspeed = defender.maxspeed/2;
                                                dmontext.innerHTML += "| PAR";
                                                dmontext.style.color = "gold";
                                                attackerMessage+= "<br><b>" + dmon + "</b> was <i>paralyzed! it may be unable to move!!</i>";
                                                if (defender.ability == "Synchronize") {
                                                    if (attacker.type1 != "Electric" && attacker.type2 != "Electric") {
                                                        aparalyzed = true;
                                                        abadstatus = true;
                                                        aspeed = attacker.maxspeed/2;
                                                        attackertext.innerHTML += "| PAR";
                                                        attackertext.style.color = "gold";
                                                        attackerMessage+= "<br>" + dmon + "'s <b>" + defender.ability + "</b> paralyzed " + amon + "!!!";
                                                    }
                                                }
                                            }
                                        }
                                    } else if (aMove.effect == "poison") {
                                        if (defender.type1 != "Steel" && defender.type2 != "Steel" && defender.type1 != "Poison" && defender.type2 != "Poison") {
                                            let poisonlimit;
                                            let poisonrate = Math.random() * 100;
                                            if (aMove.name == "Poison Sting" || aMove.name == "Sludge" || aMove.name == "Sludge Bomb" || aMove.name == "Poison Jab" || aMove.name == "Gunk Shot") {
                                                poisonlimit = 70;
                                            }
                                            if (poisonrate > poisonlimit) {
                                                dpoisoned = true;
                                                dbadstatus = true;
                                                dmontext.innerHTML+= "| PSN";
                                                dmontext.style.color = "purple";
                                                messagebox.style.color = "purple";
                                                attackerMessage+= "<br><b>" + dmon + "</b> has been <i>poisoned!!!</i>";
                                                if (defender.ability == "Synchronize") {
                                                    if (attacker.type1 != "Steel" && attacker.type2 != "Steel" && attacker.type1 != "Poison" && attacker.type2 != "Poison") {
                                                        apoisoned = true;
                                                        abadstatus = true;
                                                        attackertext.innerHTML+= "| PSN";
                                                        attackertext.style.color = "purple";
                                                        attackerMessage+= dmon + "'s <b>" + defender.ability + "</b> poisoned " + amon + "!!!";
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                if (aMove.effect == "flinch100%") {
                                    dflinched = true;
                                }
                                if (aMove.effect == "confuse100%") {
                                    if (dconfusedLevel == -1) {
                                        dconfusedLevel++;
                                        attackerMessage+= "<br" + dmon + " became confused!";
                                    }
                                }
                                if (aMove.effect == "flinch") {
                                    let flinchlimit;
                                    let flinchrate = Math.round(Math.random() * 100);
                                    if (aMove.name == "Air Slash" || aMove.name == "Astonish" || aMove.name == "Bite" || aMove.name == "Double Iron Bash" || aMove.name == "Floaty Fall" || aMove.name == "Headbutt" || aMove.name == "Heart Stamp" || aMove.name == "Icicle Crash" || aMove.name == "Iron Head" || aMove.name == "Needle Arm" || aMove.name == "Rock Slide" || aMove.name == "Rolling Kick" || aMove.name == "Sky Attack" || aMove.name == "Snore" || aMove.name == "Steamroller" || aMove.name == "Stomp" || aMove.name == "Zing Zap") {
                                        flinchlimit = 70;
                                    }
                                    else if (aMove.name == "Fake Out") {
                                        dflinched = true;
                                    }
                                    if (flinchrate > flinchlimit) {
                                    dflinched = true;
                                    }
                                }
                            }
                        }
                        checkDamageDealt = attackerPower;
                    }
                    //Begin status moves 
                    else {
                        if (aMove.name == "Leech Seed") {
                            if (defender.type1 != "Grass" && defender.type2 != "Grass") {
                                if (dSeeded == false) {
                                    attackerMessage+= "<b>" + amon + " used " + aMove.name + "!<br>" + dmon + " was seeded!";
                                    dSeeded = true;
                                    console.log("player2 was seeded");
                                } else
                                    attackerMessage+= "<b>" + amon + " used " + aMove.name + "!<br>But " + dmon + " is already seeded!";
                            } else {
                                attackerMessage+= "<b>" + amon + " used " + aMove.name + "! <b>It doesn't affect</b> " + dmon + ".";
                            }
                        }
                        if (aMove.name == "Swagger") {
                            attackerMessage = "<b>" + amon + "</b> used " + aMove.name + "! "
                            if (dPyAtkLevel < 6) {
                                let attackChange = changeStats2(dBasePyAtk, dPyAtkLevel, "+", 2);
                                dBasePyAtk = attackChange[0];
                                dPyAtkLevel = attackChange[1];
                                attackerMessage += dmon + "'s Attack sharply rose!<br>";
                            } else {
                                attackerMessage += dmon + "'s Attack won't rise anymore!<br>";
                            }
                            if (dconfusedLevel == -1) {
                                dconfusedLevel++;
                                attackerMessage+= dmon + " became confused!!";
                            } else {
                                attackerMessage+= dmon + " is already confused!";
                            }
                        }
                    }
                    //Check stat changes if defender is alive
                    if (defenderHP > 0) {
                        if (aMove.effect == "lowerPyDef1x20%") {
                            if (dPyDefLevel > -6) {
                                let lowerlimit = Math.round(Math.random() * 100);
                                if (lowerlimit > 80) {
                                    let statChange = changeStats1(dBasePyDef, dPyDefLevel, "-", 2);
                                    dBasePyDef = statChange[0];
                                    dPyDefLevel = statChange[1];
                                }
                            } else {
                                messagebox += "<br>" + dmon + "'s PyDef won't drop anymore!";
                            }
                        }
                        if (aMove.effect == "lowerSpDef1x10%") {
                            if (dSpDefLevel > -6) {
                                let lowerlimit = Math.round(Math.random() * 100);
                                if (lowerlimit > 90) {
                                    let statChange = changeStats1(dBaseSpDef, dSpDefLevel, "-", 2);
                                    dBaseSpDef = statChange[0];
                                    dSpDefLevel = statChange[1];
                                } 
                            } else {  
                                messagebox += "<br>" + dmon + "'s SpDef won't drop anymore!";
                            }
                        }
                        if (aMove.effect == "lowerSpeed1x100%") {
                            if (dSpeedLevel > -6) {
                                let statChange = changeStats1(dBaseSpeed, dSpeedLevel, "-", 2);
                                dBaseSpeed = statChange[0];
                                dSpeedLevel = statChange[1];
                            } else {
                                messagebox += "<br>" + dmon + "'s Speed won't drop anymore!";
                            }
                        }
                    }
                    if (abadstatus == false) {
                        if (defender.ability == "Static") {
                            if (aMove.contact == true) {
                                if (attacker.type1 != "Electric" && attacker.type2 != "Electric") {   //TODO: DRY
                                    let paralimit = 70;
                                    let pararate = Math.random() * 100; 
                                    if (pararate > paralimit) {
                                        aparalyzed = true;
                                        abadstatus = true;
                                        aspeed = attacker.maxspeed/2;
                                        attackertext.innerHTML += "| PAR";
                                        attackertext.style.color = "gold";
                                        attackerMessage+= "<br>" + dmon + "'s <b>" + defender.ability + "</b> paralyzed " + amon + "!!!";
                                    }
                                }
                            }
                        }
                    }
                }

                else { //defender is protected
                    attackerMessage = defender.name + " protected itself from " + attacker.name + "'s " + aMove.name + "!";
                    // attackerboxp.innerHTML = "<b>" + attacker.name + "</b> used " + aMove.name + "!";
                }
            } 
            else {
                //self-targeted moves
                attackerPower = 0;
                if (aMove.name == "Double Team") {
                    if (aEvasionLevel < 6) {
                        let changeEvasion = changeStats1(aEvasion, aEvasionLevel, "+", 3);
                        aEvasion = changeEvasion[0];
                        aEvasionLevel = changeEvasion[1];
                        attackerMessage+= "<b>" + amon + " used " + aMove.name + "!<br>" + amon + " evasiveness rose!";
                    } else {
                        attackerMessage+= "<b>" + amon + " used " + aMove.name + "!<br>" + amon + " already has MAX evasiveness!";
                    }
                } else if (aMove.name == "Protect" || aMove.name == "Detect" || aMove.name == "Endure") {
                    if (dMove.target != "self") {
                        if (aProtectLevel == 0) {
                            aProtectLevel++;
                            aProtectRate/= 3;
                            aProtectMessage = amon + " protected itself! x" + aProtectLevel
                            attackerMessage+= aProtectMessage;
                        } else {
                            let protectrate = Math.random() * 100;
                            if (protectrate <= aProtectRate) {
                                aProtectLevel++;
                                aProtectRate/= 3;
                                aProtectMessage = amon + " protected itself! x" + aProtectLevel
                                attackerMessage+= aProtectMessage;
                            } else {
                                aProtectLevel = 0;
                                aProtectRate = 100;
                                aProtectMessage = amon + "'s " + aMove.name + " failed!"
                                attackerMessage+= aProtectMessage;
                            }
                        }
                    } else {
                        aProtectLevel = 0;
                        aProtectRate = 100;
                        aProtectMessage = amon + " used " + aMove.name + ", but it failed!"
                        attackerMessage+= aProtectMessage;
                    }
                } else if (aMove.name == "Reflect" || aMove.name == "Light Screen" || aMove.name == "Aurora Veil") {
                    if (aMove.name == "Reflect") {
                        if (aReflect == 0) {
                            aReflect++;
                            attackerMessage = amon + " used " + aMove.name + "! it gained resistance from physical attacks!";
                        } else {
                            attackerMessage = amon + " used " + aMove.name + "! But it failed!";
                        }
                    } else if (aMove.name == "Light Screen") {
                        if (aLightScreen == 0) {
                            aLightScreen++;
                            attackerMessage = amon + " used " + aMove.name + "! it gained resistance from special attacks!";
                        } else {
                            attackerMessage = amon + " used " + aMove.name + "! But it failed!";
                        }
                    } else if (aMove.name == "Aurora Veil") {
                        alert("MOVE NOT IMPLEMENTED");
                    }
                } else if (aMove.name == "Recover" || aMove.name == "Soft-Boiled" || aMove.name == "Milk Drink" || aMove.name == "Slack Off" || aMove.name == "Heal Order" || aMove.name == "Roost") {
                    if (attackerHP < attackerMaxHP) {
                        if (attackerMaxHP/2 < 1) {
                            attackerHP++; //Shedinja will never regain HP
                        } else {
                            if (attackerHP/attackerMaxHP*100 < 50 ) {
                                attackerHP+= attackerMaxHP/2;
                            } else {
                                attackerHP = attackerMaxHP;
                            }
                        }
                        attackerMessage+= amon + " used " + aMove.name + "!<br>" + amon + " roosted and restored HP!";
                        if (aMove.name == "Roost") {
                            if (attacker.type1 == "Flying") {
                                attacker.type1 = "Roosting";
                            }
                            if (attacker.type2 == "Flying") {
                                attacker.type2 = "Roosting";
                            }
                        }
                    } else {
                        attackerMessage+= amon + " used " + aMove.name + "!<br>But HP is already full!";
                    }
                }
                else if (aMove.name == "Dragon Dance") {
                    attackerMessage = amon + " used " + aMove.name + "!<br>"
                    if (aPyAtkLevel < 6) {
                        let attackChange = changeStats1(aBasePyAtk, aPyAtkLevel, "+", 2);
                        aBasePyAtk = attackChange[0];
                        aPyAtkLevel = attackChange[1];
                        attackerMessage+= amon + "'s Attack rose!!<br>"
                    } else {
                        attackerMessage+= amon + "'s Attack won't rise anymore!!<br>"
                    }
                    if (aSpeedLevel < 6) {
                        let speedChange = changeStats1(aBaseSpeed, aSpeedLevel, "+", 2);
                        aBaseSpeed = speedChange[0];
                        aSpeedLevel = speedChange[1];
                        attackerMessage+= amon + "'s Speed rose!!!"
                    } else {
                        attackerMessage+= amon + "'s Speed won't rise anymore!!!"
                    }
                }
            }
            messagebox.innerHTML = attackerMessage;
            if (aMove.name != "Struggle") {
                aPP[aMove.moveid]--;
                if (defender.ability == "Pressure") {
                    aPP[aMove.moveid]--;
                }
            }
            updatePP();
        } else {
            console.log("lost turn due flinch, freeze, paralysis or miss!");
            if (aflinched == true) {
                attackerMessage = amon + " flinched!";
            } else if (afullyparalyzed == true) {
                attackerMessage = amon + " is fully paralyzed! It can't move!";
            } else if (afrozen == true) {
                attackerMessage = amon + " is frozen rock solid!";
            } else if (aconfused == true) {
                //put something here
            } else if (attackmiss == true) {
                attackerMessage = amon + " used " + aMove.name + "! But it's attack missed!";
            } else {
                attackerMessage = amon + "Lost turn for unknown reasons!";
            }
            aflinched = false;
            afullyparalyzed = false;
            aconfused = false;
            attackmiss = false;
            aProtectLevel = 0;
            aProtectRate = 100;
            messagebox.innerHTML = attackerMessage;
        }
    } else {
        alert("ERROR: ZERO PP should not be here!");
    }
    if (aMove.effect != "protect" && aProtectLevel != 0) {
        aProtectLevel = 0;
        aProtectRate = 100;
    }
    if (aMove.category == "Physical") {
        checkMoveCategory = "Physical"
        //alert("PyA: " + checkMoveCategory);
    } else if (aMove.category == "Special") {
        checkMoveCategory = "Special"
        //alert("SpA: " + checkMoveCategory);
    } else {
        checkMoveCategory = aMove.category;
        //alert("Other category: " + checkMoveCategory);
    }
    attackerHP = colorHPbar(attackerHP, attackerMaxHP, attackerHPbar, attackerHPcount, attackerimg);
    defenderHP = colorHPbar(defenderHP, defenderMaxHP, defenderHPbar, defenderHPcount, defenderimg);
    roundDecimalsAndShowHP(attackerHP, attackerHPcount, attackerMaxHP);
    roundDecimalsAndShowHP(defenderHP, defenderHPcount, defenderMaxHP);
    lastDamageDealt = checkDamageDealt;
    lastMoveCategory = checkMoveCategory;

    return [aPP, attackerHP, attackerMaxHP, apyatk, apydef, aspatk, aspdef, aspeed, aBasePyAtk, aBasePyDef, aBaseSpAtk, aBaseSpDef, aBaseSpeed, aPyAtkLevel, aPyDefLevel, aSpAtkLevel, aSpDefLevel, aSpeedLevel, attackerPower, abadstatus, apoisoned, aburned, aparalyzed, aflinched, aconfusedLevel, afullyparalyzed, afrozen, aEvasion, aEvasionLevel, aProtectLevel, aProtectMessage, aProtectRate, aReflect, aLightScreen, dPP, defenderHP, defenderMaxHP, dpyatk, dpydef, dspatk, dspdef, dspeed, dBasePyAtk, dBasePyDef, dBaseSpAtk, dBaseSpDef, dBaseSpeed, dPyAtkLevel, dPyDefLevel, dSpAtkLevel, dSpDefLevel, dSpeedLevel, dProtectLevel, dProtectRate, dReflect, dLightScreen, dbadstatus, dpoisoned, dfrozen, dburned, dparalyzed, dflinched, dconfusedLevel, dSeeded]
}

function leechSeedandPoison(player, dphp, aphp, pmessageboxp, plagiomon, seeded, burned, badpoisoned, poisonLevel, poisoned) {
    hpleech = 0;
    let badpoisonDamage = 0;
    if (dphp > 0 && aphp > 0) {
        if (burned == true) {
            let burnDamage = plagiomon.maxhp * 6.25 / 100;
            burnDamage = bumpZeroDamage(burnDamage);
            dphp -= burnDamage;
            pmessageboxp.innerHTML+= "<br>" + plagiomon.name + " lost " + burnDamage + "HP due to burn!";
        } else if (poisoned == true) {
            let poisonDamage = plagiomon.maxhp * 12.5 / 100;
            poisonDamage = bumpZeroDamage(poisonDamage);
            dphp -= poisonDamage;
            pmessageboxp.innerHTML+= "<br>" + plagiomon.name + " lost " + poisonDamage + "HP due to poisoning!!";
        } else if (badpoisoned == true) {
            if (poisonLevel == 0) {
                poisonLevel = 1;
            } else {
                poisonLevel*= 2;
            } 
            badpoisonDamage = (plagiomon.maxhp * ((poisonLevel/16) * 100)) / 100;
            badpoisonDamage = bumpZeroDamage(badpoisonDamage);
            dphp -= badpoisonDamage;
            pmessageboxp.innerHTML+= "<br>" + plagiomon.name + " lost " + badpoisonDamage + "HP due to bad poisoning!!!";
        }
        if (seeded == true) {
            if (aphp > 0) {
                hpleech = plagiomon.maxhp * 12.5 / 100;
                if (dphp < hpleech) {
                    if (dphp >= 0) {
                        hpleech = dphp;
                    } else {
                        hpleech = 0;
                    }
                } 
                hpleech = bumpZeroDamage(hpleech);
                dphp -= hpleech;
                console.log("INSIDE hpleech value: " + hpleech);
                if (burned == true || poisoned == true || badpoisoned == true) {
                    leechMessage = "<br>" + plagiomon.name + " also lost " + hpleech + "HP due to leech seed!";
                    pmessageboxp.innerHTML+= leechMessage;
                } else {
                    leechMessage = "<br>" + plagiomon.name + " lost " + hpleech + "HP due to leech seed!";
                    pmessageboxp.innerHTML+= leechMessage;
                }
            }
        }
        if (player == 1) {
            p1badpoisonLevel = badpoisonDamage;
            p1hp = dphp;
            p1Seeded = seeded
            if (p2hp > 0) {
                p2hp+= hpleech;
            } 
            if (p2hp > p2maxhp) {
                p2hp = p2maxhp;
            }
        } else if (player == 2) {
            p2badpoisonLevel = badpoisonDamage;
            p2hp = dphp;
            p2Seeded = seeded
            if (p1hp > 0) {
                p1hp+= hpleech;
            } 
            if (p1hp > p1maxhp) {
                p1hp = p1maxhp;
            }
        }
    } else {
        seeded = false;
        // leechMessage = "<br>" + plagiomon.name + " freed from leech seed!";
        // setTimeout(() => {
        //     pmessageboxp.innerHTML += leechMessage;
        // }, 2000);
    }
    return [poisonLevel, hpleech, dphp, seeded, burned, badpoisoned, poisonLevel, poisoned];
}

function playerAttack(player) {
    if (player == 1) {
        console.log("Start P1 turn");
        attackTurn("first", 1, plagiomon1, messagebox1, spanP1mon, P1img, p1hp, p1maxhp, pP1HPbar, spanP1HPcount, p1move, p1moveid, p1PPs, p1Power, p1Evasion, p1EvasionLevel, p1ProtectLevel, p1ProtectMessage, p1ProtectRate, p1Reflect, p1LightScreen, p1badstatus, p1burned, p1poisoned, p1flinched, p1confusedLevel, p1paralyzed, p1fullyparalyzed, p1frozen, p1pyatk, p1pydef, p1spatk, p1spdef, p1speed, p1BasePyAtk, p1BasePyDef, p1BaseSpAtk, p1BaseSpDef, p1BaseSpeed, p1PyAtkLevel, p1PyDefLevel, p1SpAtkLevel, p1SpDefLevel, p1SpeedLevel, p1Accuracy, p2Evasion, p1mon, p1move1ZeroPP, p1move2ZeroPP, p1move3ZeroPP, p1move4ZeroPP, p2move, p2PPs, p2mon, p2pyatk, p2pydef, p2spatk, p2spdef,  p2speed, p2BasePyAtk, p2BasePyDef, p2BaseSpAtk, p2BaseSpDef, p2BaseSpeed, p2PyAtkLevel, p2PyDefLevel, p2SpAtkLevel, p2SpDefLevel, p2SpeedLevel, p2ProtectLevel, p2ProtectRate, p2Reflect, p2LightScreen, spanP2mon, plagiomon2, messagebox2, P2img, p2hp, p2maxhp, pP2HPbar, spanP2HPcount, p2badstatus, p2badpoisoned, p2badpoisonLevel, p2poisoned, p2frozen, p2burned, p2paralyzed, p2flinched, p2confusedLevel, p2Seeded);
        console.log("End P1 turn");

        console.log("Start P2 turn");
        attackTurn("second", 2, plagiomon2, messagebox2, spanP2mon, P2img, p2hp, p2maxhp, pP2HPbar, spanP2HPcount, p2move, p2moveid, p2PPs, p2Power, p2Evasion, p2EvasionLevel, p2ProtectLevel, p2ProtectMessage, p2ProtectRate, p2Reflect, p2LightScreen, p2badstatus, p2burned, p2poisoned, p2flinched, p2confusedLevel, p2paralyzed, p2fullyparalyzed, p2frozen, p2pyatk, p2pydef, p2spatk, p2spdef, p2speed, p2BasePyAtk, p2BasePyDef, p2BaseSpAtk, p2BaseSpDef, p2BaseSpeed, p2PyAtkLevel, p2PyDefLevel, p2SpAtkLevel, p2SpDefLevel, p2SpeedLevel, p2Accuracy, p1Evasion, p2mon, p2move1ZeroPP, p2move2ZeroPP, p2move3ZeroPP, p2move4ZeroPP, p1move, p1PPs, p1mon, p1pyatk, p1pydef, p1spatk, p1spdef, p1speed, p1BasePyAtk, p1BasePyDef, p1BaseSpAtk, p1BaseSpDef, p1BaseSpeed, p1PyAtkLevel, p1PyDefLevel, p1SpAtkLevel, p1SpDefLevel, p1SpeedLevel, p1ProtectLevel, p1ProtectRate, p1Reflect, p1LightScreen, spanP1mon, plagiomon1, messagebox1, P1img, p1hp, p1maxhp, pP1HPbar, spanP1HPcount, p1badstatus, p1badpoisoned, p1badpoisonLevel, p1poisoned, p1frozen, p1burned, p1paralyzed, p1flinched, p1confusedLevel, p1Seeded);
            
        console.log("End P2 turn");
    } else if (player == 2) {
        console.log("Start P2 turn");
        attackTurn("first", 2, plagiomon2, messagebox2, spanP2mon, P2img, p2hp, p2maxhp, pP2HPbar, spanP2HPcount, p2move, p2moveid, p2PPs, p2Power, p2Evasion, p2EvasionLevel, p2ProtectLevel, p2ProtectMessage, p2ProtectRate, p2Reflect, p2LightScreen, p2badstatus, p2burned, p2poisoned, p2flinched, p2confusedLevel, p2paralyzed, p2fullyparalyzed, p2frozen, p2pyatk, p2pydef, p2spatk, p2spdef, p2speed, p2BasePyAtk, p2BasePyDef, p2BaseSpAtk, p2BaseSpDef, p2BaseSpeed, p2PyAtkLevel, p2PyDefLevel, p2SpAtkLevel, p2SpDefLevel, p2SpeedLevel, p2Accuracy, p1Evasion, p2mon, p2move1ZeroPP, p2move2ZeroPP, p2move3ZeroPP, p2move4ZeroPP, p1move, p1PPs, p1mon, p1pyatk, p1pydef, p1spatk, p1spdef, p1speed, p1BasePyAtk, p1BasePyDef, p1BaseSpAtk, p1BaseSpDef, p1BaseSpeed, p1PyAtkLevel, p1PyDefLevel, p1SpAtkLevel, p1SpDefLevel, p1SpeedLevel, p1ProtectLevel, p1ProtectRate, p1Reflect, p1LightScreen, spanP1mon, plagiomon1, messagebox1, P1img, p1hp, p1maxhp, pP1HPbar, spanP1HPcount, p1badstatus, p1badpoisoned, p1badpoisonLevel, p1poisoned, p1frozen, p1burned, p1paralyzed, p1flinched, p1confusedLevel, p1Seeded);
        console.log("End P2 turn");

        console.log("Start P1 turn");
        attackTurn("second", 1, plagiomon1, messagebox1, spanP1mon, P1img, p1hp, p1maxhp, pP1HPbar, spanP1HPcount, p1move, p1moveid, p1PPs, p1Power, p1Evasion, p1EvasionLevel, p1ProtectLevel, p1ProtectMessage, p1ProtectRate, p1Reflect, p1LightScreen, p1badstatus, p1burned, p1poisoned, p1flinched, p1confusedLevel, p1paralyzed, p1fullyparalyzed, p1frozen, p1pyatk, p1pydef, p1spatk, p1spdef, p1speed, p1BasePyAtk, p1BasePyDef, p1BaseSpAtk, p1BaseSpDef, p1BaseSpeed, p1PyAtkLevel, p1PyDefLevel, p1SpAtkLevel, p1SpDefLevel, p1SpeedLevel, p1Accuracy, p2Evasion, p1mon, p1move1ZeroPP, p1move2ZeroPP, p1move3ZeroPP, p1move4ZeroPP, p2move, p2PPs, p2mon, p2pyatk, p2pydef, p2spatk, p2spdef, p2speed, p2BasePyAtk, p2BasePyDef, p2BaseSpAtk, p2BaseSpDef, p2BaseSpeed, p2PyAtkLevel, p2PyDefLevel, p2SpAtkLevel, p2SpDefLevel, p2SpeedLevel, p2ProtectLevel, p2ProtectRate, p2Reflect, p2LightScreen, spanP2mon, plagiomon2, messagebox2, P2img, p2hp, p2maxhp, pP2HPbar, spanP2HPcount, p2badstatus, p2badpoisoned, p2badpoisonLevel, p2poisoned, p2frozen, p2burned, p2paralyzed, p2flinched, p2confusedLevel, p2Seeded);
        console.log("End P1 turn");
    }
}

function weatherDamage(weather, mon, hp, maxhp, player) {
    if (hp > 0) {
        if (weather == "Sandstorm") {
            if (mon.type1 != "Rock" && mon.type2 != "Rock" && mon.type1 != "Ground" && mon.type2 != "Ground" && mon.type1 != "Steel" && mon.type2 != "Steel") {
                let weatherDamage = maxhp*6.25/100;
                hp-= weatherDamage;
                if (player == 1) {
                    messagebox1.innerHTML += "<br>" + mon.name + " is buffeted by the sandstorm! (-" + weatherDamage + "HP)";
                } else if (player == 2) {
                    messagebox2.innerHTML += "<br>" + mon.name + " is buffeted by the sandstorm! (-" + weatherDamage + "HP)";
                }
            }
        }
    } else {
        hp = 0;
    }
    return hp;
}

function checkFirstStrike(p1move, p2move) {
    console.log("checkfirststrike-");
    if (p1paralyzed == true) {
        p1speed = plagiomon1.maxspeed*p1BaseSpeed/200;
    } else {
        p1speed = plagiomon1.maxspeed*p1BaseSpeed/100;
    }
    if (p2paralyzed == true) {
        p2speed = plagiomon2.maxspeed*p2BaseSpeed/200;
    } else {
        p2speed = plagiomon2.maxspeed*p2BaseSpeed/100;
    }
    if (p1move.priority == p2move.priority) {
        console.log("prioritytie-");
        if (p1speed == p2speed) {
            console.log("speedtie-");
            let p1randomspeed = Math.round(Math.random() * p1speed);
            let p2randomspeed = Math.round(Math.random() * p2speed);
            if (p1randomspeed > p2randomspeed) {
                console.log("p1 is faster (random speed tiebreak)");
                playerAttack(1);
            } else if (p1randomspeed < p2randomspeed) {
                console.log("p2 is faster! (random speed tiebreak)");
                playerAttack(2);
            } else {
                console.log("Random Speed Tie! | P1: " + p1randomspeed + " | P2: " + p2randomspeed);
                messagebox1.innerHTML = "Random Speed Tie! P1: " + p1randomspeed;
                messagebox1.innerHTML = "Random Speed Tie! P2: " + p2randomspeed;
                setTimeout(checkFirstStrike, 2000, p1move, p2move);
            }
        } else if (p1speed > p2speed) {
            console.log("p1 is faster!");
            playerAttack(1);
            console.log("p2 attacked!");
        } else if (p1speed < p2speed) {
            console.log("p2 is faster!");
            playerAttack(2);
        } else {
            console.log("speed exception");
        }
    } else if (p1move.priority > p2move.priority) {
        console.log("p1 has higher priority move!");
        playerAttack(1);
    } else if (p1move.priority < p2move.priority) {
        console.log("p2 has higher priority move!!");
        playerAttack(2);
    } else {
        console.log("priority exception");
    }
    //alert("Last Damage Dealt after AttackTurn: " + lastDamageDealt);
    p1flinched = false;
    p2flinched = false;
    p1fullyparalyzed = false;
    p2fullyparalyzed = false;
    lastDamageDealt = -1;
    lastMoveCategory = undefined;
    checkWeather();
    p1recurrentDamage = leechSeedandPoison(1, p1hp, p2hp, messagebox1, plagiomon1, p1Seeded, p1burned, p1badpoisoned, p1badpoisonLevel, p1poisoned);
    p2recurrentDamage = leechSeedandPoison(2, p2hp, p1hp, messagebox2, plagiomon2, p2Seeded, p2burned, p2badpoisoned, p2badpoisonLevel, p2poisoned);
    p1hp = weatherDamage(weather, plagiomon1, p1hp, p1maxhp, 1);
    p2hp = weatherDamage(weather, plagiomon2, p2hp, p2maxhp, 2);
    // p1badpoisonLevel = p1recurrentDamage[0];
    // p1hp = p1recurrentDamage[2];
    // p1Seeded = p1recurrentDamage[3];
    // if (p2hp > 0) {
    //     p2hp+= p1recurrentDamage[1];
    // } 
    // if (p2hp > p2maxhp) {
    //     p2hp = p2maxhp;
    // }
    // p2badpoisonLevel = p2recurrentDamage[0];
    // p2hp = p2recurrentDamage[2];
    // p2Seeded = p2recurrentDamage[3];
    // if (p1hp > 0) {
    //     p1hp+= p2recurrentDamage[1];
    // } 
    // if (p1hp > p1maxhp) {
    //     p1hp = p1maxhp;
    // }
    p1hp = colorHPbar(p1hp, p1maxhp, pP1HPbar, spanP1HPcount, P1img);
    p2hp = colorHPbar(p2hp, p2maxhp, pP2HPbar, spanP2HPcount, P2img);
    if (p1hp <= 0 && p2hp > 0) {
        setTimeout(() => {
            p1loss++;
            messagebox1.innerHTML = "";
            spanP1mon.innerHTML = "Your <b>" + p1mon + "</b>&#x1FAA6;";
            spanP2mon.innerHTML = "CPU <b>" + p2mon + "</b>&#x1F451;";
            messagebox2.innerHTML = "Your <b>" + p1mon + "</b> fainted, <i><u>you lose...</u></i> :(" + " | Your wins: " + p1win + " | Your losses: " + p1loss;
        }, 2000);
    } else if (p2hp <= 0 && p1hp > 0) {
        setTimeout(() => {
            p1win++;
            messagebox2.innerHTML = "";
            spanP1mon.innerHTML = "Your <b>" + p1mon + "</b>&#x1F451;";
            spanP2mon.innerHTML = "CPU <b>" + p2mon + "</b>&#x1FAA6;";
            messagebox1.innerHTML = "CPU <b>" + p2mon + "</b> fainted, <i><u>you win!!!</u></i> :)" + " | Your wins: " + p1win + " | Your losses: " + p1loss;
        }, 2000);
    } else if (p1hp <= 0 && p2hp <= 0) {
        setTimeout(() => {
            p1tie++;
            messagebox1.innerHTML = "Wow, it's a tie!";
            messagebox2.innerHTML = "Your ties: " + p1tie;
            spanP1mon.innerHTML = "Your <b>" + p1mon + "</b>&#x1FAA6;";
            spanP2mon.innerHTML = "CPU <b>" + p2mon + "</b>&#x1FAA6;";
        }, 2000);
    }
    if (p1hp > 0 && p2hp > 0) {
        turncounter++;
        spanturncounter.innerHTML = "(Turn " + turncounter + ")" + " [Round " + roundcounter + "]";
    } else {
        movesectionhider.hidden = true;
        setTimeout((resetUI), 2000);
    }
}

function selectp2Move() {
    if (p2moveid == "struggle") { //Struggle
        p2move = plagiomon2.struggle;
        checkFirstStrike(p1move, p2move);
    } else {
        p2moveid = Math.floor(Math.random() * 4);
        console.log("p2moveid: " + p2moveid + " (out)");
        if (p2moveid == 0) {
            p2move = p2moveset[0];
            if (p2PPs[0] > 0) {
                console.log("1pp check ok");
                checkFirstStrike(p1move, p2move);
            } else {
                console.log("1pp check zero");
                selectp2Move();
            }
        } else if (p2moveid == 1) {
            p2move = p2moveset[1];
            if (p2PPs[1] > 0) {
                console.log("2pp check ok");
                checkFirstStrike(p1move, p2move);
            } else {
                console.log("2pp check zero");
                selectp2Move();
            }
        } else if (p2moveid == 2) {
            p2move = p2moveset[2];
            if (p2PPs[2] > 0) {
                console.log("3pp check ok");
                checkFirstStrike(p1move, p2move);
            } else {
                console.log("3pp check zero");
                selectp2Move();
            }
        } else if (p2moveid == 3) {
            p2move = p2moveset[3];
            if (p2PPs[3] > 0) {
                console.log("4pp check ok");
                checkFirstStrike(p1move, p2move);
            } else {
                console.log("4pp check zero");
                selectp2Move();
            }
        } else {
            console.log("Illegal moveid: " + p2moveid);
        }
        console.log("p2moveid: " + p2moveid + " in")
        console.log("p2movesetPP: " + p2PPs[p2moveid]);
    }
}

function selectp1Move() {
    console.log("selectp1move-");
    if (moveStruggle == true) {
        p1move = plagiomon1.struggle;
        p1moveid = "struggle"; //Struggle
        console.log("selected p1 move: " + p1moveid);
        selectp2Move();
    } else if (radiomoves[0].checked == true) {
        p1move = p1moveset[0];
        if (p1PPs[0] > 0) {
            p1moveid = 0;
            console.log("selectp1move1");
            selectp2Move();
        } else {
            messagebox1.innerHTML = "No PP left for " + p1move.name + "!";
            p1move = undefined;
            return;
        }
    } else if (radiomoves[1].checked == true) {
        p1move = p1moveset[1];
        if (p1PPs[1] > 0) {
            p1moveid = 1;
            selectp2Move();
        } else {
            messagebox1.innerHTML = "No PP left for " + p1move.name + "!";
            p1move = undefined;
            return;
        }
    } else if (radiomoves[2].checked == true) {
        p1move = p1moveset[2];
        if (p1PPs[2] > 0) {
            p1moveid = 2;
            selectp2Move();
        } else {
            messagebox1.innerHTML = "No PP left for " + p1move.name + "!";
            p1move = undefined;
            return;
        }
    } else if (radiomoves[3].checked == true) {
        p1move = p1moveset[3];
        if (p1PPs[3] > 0) {
            p1moveid = 3;
            selectp2Move();
        } else {
            messagebox1.innerHTML = "No PP left for " + p1move.name + "!";
            p1move = undefined;
            return;
        }
    } else {
        messagebox1.innerHTML = "You need to choose a move to begin battle...";
    }
}

//TODO: #0f4 reemplazar instancias de amon y dmon con atacker.name y defender.name, respeectivamente
function accuracyCheck(accOrder, aMove, aPP, paccuracy, pevasion, attackertext, attackerboxp, amon, player, attacker, attackerimg, attackerHP, attackerHPbar, attackerHPcount, attackerMaxHP, attackerPower, aEvasion, aEvasionLevel, aProtectLevel, aProtectMessage, aProtectRate, aReflect, aLightScreen, abadstatus, aburned, afrozen, aparalyzed, afullyparalyzed, apoisoned, aflinched, aconfusedLevel, apyatk, apydef, aspatk, aspdef, aspeed, aBasePyAtk, aBasePyDef, aBaseSpAtk, aBaseSpDef, aBaseSpeed, aPyAtkLevel, aPyDefLevel, aSpAtkLevel, aSpDefLevel, aSpeedLevel, dMove, dPP, dmon, dpyatk, dpydef, dspatk, dspdef, dspeed, dBasePyAtk, dBasePyDef, dBaseSpAtk, dBaseSpDef, dBaseSpeed, dPyAtkLevel, dPyDefLevel, dSpAtkLevel, dSpDefLevel, dSpeedLevel, dProtectLevel, dProtectRate, dReflect, dLightScreen, dmontext, defender, defenderboxp, defenderimg, defenderHP, defenderHPbar, defenderHPcount, defenderMaxHP, dbadstatus, dpoisoned, dfrozen, dburned, dparalyzed, dflinched, dconfusedLevel, dSeeded, dbadpoisoned, dbadpoisonLevel) {
    //alert("acc Check aMove: " + aMove.name);
    //alert("acc Check defenderMaxHP: " + defenderMaxHP);
    let missrate = Math.round(Math.random() * pevasion);
    console.log("accuracyCheck player" + player + " turn");
    if (attacker.ability == "No Guard" || defender.ability == "No Guard") {
        missrate = 0;
        console.log("No Guard is present, ignoring accuracy checks");
    } else {
        console.log("No Guard is not present, checking accuracy");
        if (aMove.accuracy != "-") {
            console.log("accuracyCheck0");
            let hitrate = paccuracy * aMove.accuracy / 100;
            if (missrate <= hitrate) {
                console.log("accifEvasionLevel: " + aEvasionLevel);
            }
            else {
                //need to update game data, set power to 0 (null);-      +
                attackerMessage = amon + "'s " + aMove.name + " missed!";
                console.log(attackerMessage);
                messagebox.innerHTML = attackerMessage;
                attackmiss = true;
                aPP[aMove.moveid]--;
                if (defender.ability == "Pressure") {
                    aPP[aMove.moveid]--;
                }
                if (player == 1) {
                    console.log("accuracyCheckelse2");
                    updatePP();
                }
            }
        } else {
        }
    }
    console.log("skipped fEvasionLevel: " + aEvasionLevel);
    gamedata1 = checkMove(accOrder, aMove, aPP, amon, apyatk, apydef, aspatk, aspdef, aspeed, aBasePyAtk, aBasePyDef, aBaseSpAtk, aBaseSpDef, aBaseSpeed, aPyAtkLevel, aPyDefLevel, aSpAtkLevel, aSpDefLevel, aSpeedLevel, abadstatus, aburned, afrozen, aparalyzed, afullyparalyzed, apoisoned, aflinched, aconfusedLevel, attacker, attackertext, attackerboxp, attackerimg, attackerHP, attackerHPbar, attackerHPcount, attackerMaxHP, attackerPower, aEvasion, aEvasionLevel, aProtectLevel, aProtectMessage, aProtectRate, aReflect, aLightScreen, dMove, dPP, dmon, dpyatk, dpydef, dspatk, dspdef, dspeed, dBasePyAtk, dBasePyDef, dBaseSpAtk, dBaseSpDef, dBaseSpeed, dPyAtkLevel, dPyDefLevel, dSpAtkLevel, dSpDefLevel, dSpeedLevel, dProtectLevel, dProtectRate, dReflect, dLightScreen, dmontext, defender, defenderboxp, defenderimg, defenderHP, defenderHPbar, defenderHPcount, defenderMaxHP, dbadstatus, dpoisoned, dfrozen, dburned, dparalyzed, dflinched, dconfusedLevel, dSeeded, lastMoveCategory, lastDamageDealt);
}

function checkPP(player) {
    if (player == 1) {
        if (p1PPs[p1moveid] == 0) {
            if (p1moveid == 0) {
                p1move1ZeroPP = true;
                labelmoves[0].style.filter = "invert(1)";
            } else if (p1moveid == 1) {
                p1move2ZeroPP = true;
                labelmoves[1].style.filter = "invert(1)";
            } else if (p1moveid == 2) {
                p1move3ZeroPP = true;
                labelmoves[2].style.filter = "invert(1)";
            } else if (p1moveid == 3) {
                p1move4ZeroPP = true;
                labelmoves[3].style.filter = "invert(1)";
            } else
                console.log("Unknown p1 moveid reached zero PP");
        }
        if (p1move1ZeroPP == true && p1move2ZeroPP == true && p1move3ZeroPP == true && p1move4ZeroPP == true) {
            moveStruggle = true;
            radiomoves[0].disabled = true;
            radiomoves[1].disabled = true;
            radiomoves[2].disabled = true;
            radiomoves[3].disabled = true;
        }  else {
            console.log("all zero PP is not true");
        } 
    } else if (player == 2) {
        if (p2PPs[p2moveid] == 0) {
            if (p2moveid == 1) {
                p2move1ZeroPP = true;
            } else if (p2moveid == 2) {
                p2move2ZeroPP = true;
            } else if (p2moveid == 3) {
                p2move3ZeroPP = true;
            } else if (p2moveid == 4) {
                p2move4ZeroPP = true;
            } else
                console.log("Unknown p2 moveid reached zero PP");
        }
        if (p2move1ZeroPP == true && p2move2ZeroPP == true && p2move3ZeroPP == true && p2move4ZeroPP == true) {
            p2moveid = "struggle";
        }
    } else {
        console.log("Can't check PP due to unknown player ID");
    }
}

function updatePlayerData(player) {
    if (player == 1) {
        p1PPs = gamedata1[0];
        p1hp = gamedata1[1];
        //p1maxhp
        console.log("P1HP: uPD1 " + p1hp + " (case" + player +")");
        p1pyatk = gamedata1[3];
        p1pydef = gamedata1[4];
        p1spatk = gamedata1[5];
        p1spdef = gamedata1[6];
        p1speed = gamedata1[7];
        p1BasePyAtk = gamedata1[8];
        p1BasePyDef = gamedata1[9];
        p1BaseSpAtk = gamedata1[10];
        p1BaseSpDef = gamedata1[11];
        p1BaseSpeed = gamedata1[12];
        p1PyAtkLevel = gamedata1[13];
        p1PyDefLevel = gamedata1[14];
        p1SpAtkLevel = gamedata1[15];
        p1SpDefLevel = gamedata1[16];
        p1SpeedLevel = gamedata1[17];
        //atatckerpower
        p1badstatus = gamedata1[19];
        p1poisoned = gamedata1[20];
        p1burned = gamedata1[21];
        p1paralyzed = gamedata1[22];
        p1flinched = gamedata1[23];
        p1confusedLevel = gamedata1[24];
        p1fullyparalyzed = gamedata1[25];
        p1frozen = gamedata1[26];
        p1Evasion = gamedata1[27];
        p1EvasionLevel = gamedata1[28];
        p1ProtectLevel = gamedata1[29];
        p1ProtectMessage = gamedata1[30];
        p1ProtectRate = gamedata1[31];
        p1Reflect = gamedata1[32];
        p1LightScreen = gamedata1[33];
        p2PPs = gamedata1[34];
        p2hp = gamedata1[35];
        //p2maxhp
        p2pyatk = gamedata1[37];
        p2pydef = gamedata1[38];
        p2spatk = gamedata1[39];
        p2spdef = gamedata1[40];
        p2speed = gamedata1[41];
        p2BasePyAtk = gamedata1[42];
        p2BasePyDef = gamedata1[43];
        p2BaseSpAtk = gamedata1[44];
        p2BaseSpDef = gamedata1[45];
        p2BaseSpeed = gamedata1[46];
        p2PyAtkLevel = gamedata1[47];
        p2PyDefLevel = gamedata1[48];
        p2SpAtkLevel = gamedata1[49];
        p2SpDefLevel = gamedata1[50];
        p2SpeedLevel = gamedata1[51];
        p2ProtectLevel = gamedata1[52];
        p2ProtectRate = gamedata1[53];
        p2Reflect = gamedata1[54];
        p2LightScreen = gamedata1[55];
        p2badstatus = gamedata1[56];
        p2poisoned = gamedata1[57];
        p2frozen = gamedata1[58];
        p2burned = gamedata1[59];
        p2paralyzed = gamedata1[60];
        p2flinched = gamedata1[61];
        p2confusedLevel = gamedata1[62];
        p2Seeded = gamedata1[63];

    } else if (player == 2) {
        p2PPs = gamedata1[0];
        p2hp = gamedata1[1];
        //p2maxhp
        console.log("P2HP: uPD1 " + p2hp + " (case" + player +")");
        p2pyatk = gamedata1[3];
        p2pydef = gamedata1[4];
        p2spatk = gamedata1[5];
        p2spdef = gamedata1[6];
        p2speed = gamedata1[7];
        p2BasePyAtk = gamedata1[8];
        p2BasePyDef = gamedata1[9];
        p2BaseSpAtk = gamedata1[10];
        p2BaseSpDef = gamedata1[11];
        p2BaseSpeed = gamedata1[12];
        p2PyAtkLevel = gamedata1[13];
        p2PyDefLevel = gamedata1[14];
        p2SpAtkLevel = gamedata1[15];
        p2SpDefLevel = gamedata1[16];
        p2SpeedLevel = gamedata1[17];
        //attackerPower
        p2badstatus = gamedata1[19];
        p2poisoned = gamedata1[20];
        p2burned = gamedata1[21];
        p2paralyzed = gamedata1[22];
        p2flinched = gamedata1[23];
        p2confusedLevel = gamedata1[24];
        p2fullyparalyzed = gamedata1[25];
        p2frozen = gamedata1[26];
        p2Evasion = gamedata1[27];
        p2EvasionLevel = gamedata1[28];
        p2ProtectLevel = gamedata1[29];
        p2ProtectMessage = gamedata1[30];
        p2ProtectRate = gamedata1[31];
        p2Reflect = gamedata1[32];
        p2LightScreen = gamedata1[33];
        p1PPs = gamedata1[34];
        p1hp = gamedata1[35];
        //p1maxhp
        p1pyatk = gamedata1[37];
        p1pydef = gamedata1[38];
        p1spatk = gamedata1[39];
        p1spdef = gamedata1[40];
        p1speed = gamedata1[41];
        p1BasePyAtk = gamedata1[42];
        p1BasePyDef = gamedata1[43];
        p1BaseSpAtk = gamedata1[44];
        p1BaseSpDef = gamedata1[45];
        p1BaseSpeed = gamedata1[46];
        p1PyAtkLevel = gamedata1[47];
        p1PyDefLevel = gamedata1[48];
        p1SpAtkLevel = gamedata1[49];
        p1SpDefLevel = gamedata1[50];
        p1SpeedLevel = gamedata1[51];
        p1ProtectLevel = gamedata1[52];
        p1ProtectRate = gamedata1[53];
        p1Reflect = gamedata1[54];
        p1LightScreen = gamedata1[55];
        p1badstatus = gamedata1[56];
        p1poisoned = gamedata1[57];
        p1frozen = gamedata1[58];
        p1burned = gamedata1[59];
        p1paralyzed = gamedata1[60];
        p1flinched = gamedata1[61];
        p1confusedLevel = gamedata1[62];
        p1Seeded = gamedata1[63];
    } else {
        console.log("ERROR: Can't update Player (" + player +") Data");
    }
    return [p1PPs, p1hp, p1pyatk, p1pydef, p1spatk, p1spdef, p1speed, p1BasePyAtk, p1BasePyDef, p1BaseSpAtk, p1BaseSpDef, p1BaseSpeed, p1PyAtkLevel, p1PyDefLevel, p1SpAtkLevel, p1SpDefLevel, p1SpeedLevel, p1Power, p1Evasion, p1EvasionLevel, p1ProtectLevel, p1ProtectMessage, p1ProtectRate, p1Reflect, p1LightScreen, p1badstatus, p1poisoned, p1frozen, p1burned, p1paralyzed, p1fullyparalyzed, p1flinched, p1confusedLevel, p1Seeded, p2PPs, p2hp, p2pyatk, p2pydef, p2spatk, p2spdef, p2speed, p2BasePyAtk, p2BasePyDef, p2BaseSpAtk, p2BaseSpDef, p2BaseSpeed, p2PyAtkLevel, p2PyDefLevel, p2SpAtkLevel, p2SpDefLevel, p2SpeedLevel, p2Power, p2Evasion, p2EvasionLevel, p2ProtectLevel, p2ProtectMessage, p2ProtectRate, p2Reflect, p2LightScreen, p2badstatus, p2poisoned, p2frozen, p2burned, p2paralyzed, p2fullyparalyzed, p2flinched, p2confusedLevel, p2Seeded]
}

function checkBarrier(player, amon, barrier, type) {
    if (barrier > 0) {
        messagebox.innerHTML = amon + "'s " + type + " Turn: " + barrier + "<br>";
        barrier++;
        if (barrier > 5) {
            barrier = 0;
            if (player == 1) {
                messagebox.innerHTML = "Your " + amon + "'s " + type + " whore off!<br>";
            } else if (player == 2) {
                messagebox.innerHTML = "CPU " + amon + "'s " + type + " whore off!<br>";
            } else {
                alert("WHOSE BARRIER IS THIS?");
            }
        }
    }
    return barrier;
}

function attackTurn(turnOrder, player, attacker, attackerboxp, spanattackermon, attackerimg, attackerHP, attackerMaxHP, attackerHPbar, attackerHPcount, attackerMove, attackerMoveID, aPP, attackerPower, aEvasion, aEvasionLevel, aProtectLevel, aProtectMessage, aProtectRate, aReflect, aLightScreen, abadstatus, aburned, apoisoned, aflinched, aconfusedLevel, aparalyzed, afullyparalyzed, afrozen, apyatk, apydef, aspatk, aspdef, aspeed, aBasePyAtk, aBasePyDef, aBaseSpAtk, aBaseSpDef, aBaseSpeed, aPyAtkLevel, aPyDefLevel, aSpAtkLevel, aSpDefLevel, aSpeedLevel, aaccuracy, devasion, amon, amove1ZeroPP, amove2ZeroPP, amove3ZeroPP, amove4ZeroPP, dMove, dPP, dmon, dpyatk, dpydef, dspatk, dspdef, dspeed, dBasePyAtk, dBasePyDef, dBaseSpAtk, dBaseSpDef, dBaseSpeed, dPyAtkLevel, dPyDefLevel, dSpAtkLevel, dSpDefLevel, dSpeedLevel, dProtectLevel, dProtectRate, dReflect, dLightScreen, dmontext, defender, defenderboxp, defenderimg, defenderHP, defenderMaxHP, defenderHPbar, defenderHPcount, dbadstatus, dbadpoisoned, dbadpoisonLevel, dpoisoned, dfrozen, dburned, dparalyzed, dflinched, dconfusedLevel, dSeeded) {
    if (turnOrder == "first") {
        messagebox = messagebox1;
    } else if (turnOrder == "second") {
        messagebox = messagebox2;
    }
    messagebox.innerHTML = "";
    console.log("Player " + player + " turn");
    aReflect = checkBarrier(player, amon, aReflect, "Reflect");
    aLightScreen = checkBarrier(player, amon, aLightScreen, "Light Screen");
    if (attackerHP > 0) {
        if (plagiomon1 != "NULLMON" && plagiomon2 != "NULLMON") {
            if (dMove.effect != "protect") {
                if (dProtectLevel != 0) {
                    dProtectLevel = 0;
                    dProtectRate = 100;
                }
            }
                console.log("aMove: " + attackerMove.name + " | amon: " + amon);
                if (attacker.type1 == "Roosting") {
                    attacker.type1 = "Flying";
                }
                if (attacker.type2 == "Roosting") {
                    attacker.type2 = "Flying";
                }
                if (aflinched == true) {
                    messagebox.innerHTML = amon + " flinched!";
                }
                if (aparalyzed == true) {
                    aspeed = attacker.maxspeed/2;
                    let fullparalysis = Math.round(Math.random() * 100);
                    if (fullparalysis > 75 ) {
                        afullyparalyzed = true;
                        messagebox.innerHTML = amon + " is fully paralyzed!<br>It can't move!";
                    }
                }
                else if (afrozen == true) {
                    if (aflinched == false) {
                        let unfreeze = Math.round(Math.random() * 100);
                        if (unfreeze > 80) {
                            afrozen = false;
                            abadstatus = false;
                            spanattackermon.innerHTML = "P1<b>" + amon + "</b>:";
                            spanattackermon.style.color = "";
                            messagebox.innerHTML += amon + " thawed out of freeze!";
                            //alert(amon + " defrost!");
                        } else {
                            messagebox.innerHTML += amon + " is frozen rock solid!";
                        }
                    }
                }
                //Struggle
                if (attackerMoveID == "struggle") {
                    console.log(attacker.name + " will use Struggle!");
                    accuracyCheck(turnOrder, attackerMove, aPP, aaccuracy, devasion, spanattackermon, attackerboxp, amon,  player, attacker, attackerimg, attackerHP, attackerHPbar, attackerHPcount, attackerMaxHP, attackerPower, aEvasion, aEvasionLevel, aProtectLevel, aProtectMessage, aProtectRate, aReflect, aLightScreen, abadstatus, aburned, afrozen, aparalyzed, afullyparalyzed, apoisoned, aflinched, aconfusedLevel, apyatk, apydef, aspatk, aspdef, aspeed, aBasePyAtk, aBasePyDef, aBaseSpAtk, aBaseSpDef, aBaseSpeed, aPyAtkLevel, aPyDefLevel, aSpAtkLevel, aSpDefLevel, aSpeedLevel, dMove, dPP, dmon, dpyatk, dpydef, dspatk, dspdef, dspeed, dBasePyAtk, dBasePyDef, dBaseSpAtk, dBaseSpDef, dBaseSpeed, dPyAtkLevel, dPyDefLevel, dSpAtkLevel, dSpDefLevel, dSpeedLevel, dProtectLevel, dProtectRate, dReflect, dLightScreen, dmontext, defender, defenderboxp, defenderimg, defenderHP, defenderHPbar, defenderHPcount, defenderMaxHP, dbadstatus, dpoisoned, dfrozen, dburned, dparalyzed, dflinched, dconfusedLevel, dSeeded, dbadpoisoned, dbadpoisonLevel);
                    console.log(attacker.name + " used Struggle!!");
                }
                else if (attackerMoveID == 0 || attackerMoveID == 1 || attackerMoveID == 2 || attackerMoveID == 3) {
                    console.log(attacker.name + " will use " + attackerMove.name + "!");
                    accuracyCheck(turnOrder, attackerMove, aPP, aaccuracy, devasion, spanattackermon, attackerboxp, amon,  player, attacker, attackerimg, attackerHP, attackerHPbar, attackerHPcount, attackerMaxHP, attackerPower, aEvasion, aEvasionLevel, aProtectLevel, aProtectMessage, aProtectRate, aReflect, aLightScreen, abadstatus, aburned, afrozen, aparalyzed, afullyparalyzed, apoisoned, aflinched, aconfusedLevel, apyatk, apydef, aspatk, aspdef, aspeed, aBasePyAtk, aBasePyDef, aBaseSpAtk, aBaseSpDef, aBaseSpeed, aPyAtkLevel, aPyDefLevel, aSpAtkLevel, aSpDefLevel, aSpeedLevel, dMove, dPP, dmon, dpyatk, dpydef, dspatk, dspdef, dspeed, dBasePyAtk, dBasePyDef, dBaseSpAtk, dBaseSpDef, dBaseSpeed, dPyAtkLevel, dPyDefLevel, dSpAtkLevel, dSpDefLevel, dSpeedLevel, dProtectLevel, dProtectRate, dReflect, dLightScreen, dmontext, defender, defenderboxp, defenderimg, defenderHP, defenderHPbar, defenderHPcount, defenderMaxHP, dbadstatus, dpoisoned, dfrozen, dburned, dparalyzed, dflinched, dconfusedLevel, dSeeded, dbadpoisoned, dbadpoisonLevel);
                    console.log(attacker.name + " used " + attackerMove.name + "!!");
                }  else {
                    messagebox.innerHTML = "You need to choose a move to begin battle...";
                    console.log(attacker.name + " failed to use " + attackerMove.name + "!");
                }
                console.log("before checkPP");
                checkPP(player, attackerMove, attackerMoveID, amove1ZeroPP, amove2ZeroPP, amove3ZeroPP, amove4ZeroPP);
                //alert("P1Protect Level outside player data1, before: " + p1ProtectLevel);
                gamedata2 = updatePlayerData(player);
                console.log("P1HP: uPD2 " + p1hp);
                console.log("P2HP: uPD2 " + p2hp);
                console.log("should end here");
        } else
            messagebox.innerHTML = "No has seleccionado un mon, no puedes atacar.";
    } else {
        messagebox.innerHTML = amon + " fainted!";
    }
}