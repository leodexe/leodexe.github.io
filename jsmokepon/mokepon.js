const h1maintitle = document.getElementById("main-title");
const h2monselect = document.getElementById("mon-select");
const firemon = document.getElementById("fuegomon");
const watermon = document.getElementById("aguamon");
const grassmon = document.getElementById("plantamon");
const monselect = document.getElementById("button-monselect");
monselect.addEventListener("click", fmonselect);
const spanturncounter = document.getElementById("turncounter");
const spanmon = document.getElementById("mon-name");
const P1img = document.getElementById("p1-img");
const spanP1mon = document.getElementById("p1-mon");
const spanP1lifecount = document.getElementById("p1-life-count");
const pP1HPbar = document.getElementById("p1-hpbar");
const pP1status = document.getElementById("p1-statmodifiers");
const P2img = document.getElementById("p2-img");
const spanP2mon = document.getElementById("p2-mon");
const spanP2lifecount = document.getElementById("p2-life-count");
const pP2HPbar = document.getElementById("p2-hpbar");
const pP2status = document.getElementById("p2-statmodifiers");
const divatkcontainer = document.getElementById("atk-container");
const radiotackle = document.getElementById("tackle");
const radiogrowl = document.getElementById("growl");
const radiosandattack = document.getElementById("sandattack");
const radiostab = document.getElementById("stab");
const spanstab = document.getElementById("stabtext");
const buttonattacknow = document.getElementById("attacknow");
buttonattacknow.addEventListener("click", beginBattle);
const pmessageboxp1 = document.getElementById("message-box-p1");
const pmessageboxp2 = document.getElementById("message-box-p2");
const spanrestartbox = document.getElementById("restart-box");
let nullmon1, nullmon2, p1imgsrc, p1mon, p2imgsrc, p2mon, p1hp, p1maxhp, p2hp, p2maxhp, p1move, p2move;
nullmon1 = nullmon2 = p1mon = p2mon = "NULLMON";
let p1basepower, p1critpower, p2basepower, p2critpower, p1fullpower, p2fullpower, turncounter, p1win, p1loss, roundcounter;
p1win = p1loss = roundcounter = 0;
let p1minpower, p2minpower, p1accuracy, p2accuracy, p1mincuracy,  p2mincuracy, stabattackp1, stabattackp2, sametypeattackbonus;
stabattackp1 = stabattackp2 = "NULL STAB";
sametypeattackbonus = 1.5;

function fselectedmon() {
    h1maintitle.hidden = true;
    h2monselect.hidden = true;
    monselect.hidden = true;
    spanmon.innerHTML = "Select your " + p1mon + "'s attack ";
    spanmon.hidden = false;
    divatkcontainer.hidden = false;
    buttonattacknow.hidden = false;
    p1hp = p2hp = p1maxhp = p2maxhp = 31;
    pP1status.innerHTML = pP2status.innerHTML = "";
    p1basepower = p2basepower = 100;
    p1critpower  = p2critpower = 5;
    p1minpower = p1mincuracy = p2minpower = p2mincuracy = turncounter = 0;
    p1accuracy = p2accuracy = 100;
    P1img.src = p1imgsrc;
    P1img.style.filter = "grayscale(0)";
    spanP1mon.innerHTML = "Your<b>" + p1mon + "</b>:";
    spanP1lifecount.innerHTML = "HP: " + p1hp + "/" + p1maxhp + " (100%)";
    spanP1lifecount.style.color = pP1HPbar.style.background = "green";
    pP1HPbar.style.width = "100px";
    pmessageboxp1.innerHTML = pmessageboxp2.innerHTML = "";
    spanrestartbox.innerHTML = "";
    turncounter++;
    roundcounter++;
    spanturncounter.innerHTML = "(Turn " + turncounter + ")" + " [Round " + roundcounter + "]";
}

function fselectcpumon() {
    if (nullmon1 != "NULLMON") {
        if (nullmon1 == "Fuegomon") {
            let notmon = 1;
            while (notmon != 2 && notmon != 3) {
                notmon = Math.ceil(Math.random() * 3);
            }
            if (notmon == 2) {
                nullmon2 = "Aguamon";
                p2mon = "&#x1F4A7;Pochoclo";
            } else if (notmon == 3) {
                nullmon2 = "Plantamon";
                p2mon = "&#x1F331;Plantasaurio";
            } else
                nullmon2 = "ERRORMON1";
            
        } else if (nullmon1 == "Aguamon") {
            let notmon = 2;
            while (notmon != 1 && notmon != 3) {
                notmon = Math.ceil(Math.random() * 3);
            }
            if (notmon == 1) {
                nullmon2 = "Fuegomon";
                p2mon = "&#x1F525;Kakuchín";
            } else if (notmon == 3) {
                nullmon2 = "Plantamon";
                p2mon = "&#x1F331;Plantasaurio";
            } else
                nullmon2 = "ERRORMON2";
        } else if (nullmon1 == "Plantamon") {
            let notmon = 3;
            while (notmon != 1 && notmon != 2) {
                notmon = Math.ceil(Math.random() * 3);
            }
            if (notmon == 1) {
                nullmon2 = "Fuegomon";
                p2mon = "&#x1F525;Kakuchín";
            } else if (notmon == 2) {
                nullmon2 = "Aguamon";
                p2mon = "&#x1F4A7;Pochoclo";
            } else
                nullmon2 = "ERRORMON3";            
        } else
            console.log("Player didn't choose a valid mon, so CPU won't choose either.");
        if (nullmon2 == "Fuegomon") {
            stabattackp2 = "Ember Shot";
            p2imgsrc = "./mons/charizardsomething.png";
        }
        else if (nullmon2 == "Aguamon") {
            stabattackp2 = "Water Gun";
            p2imgsrc = "./mons/greninjasomething.png";
        }
        else if (nullmon2 == "Plantamon") {
            stabattackp2 = "Vine Whip";
            p2imgsrc = "./mons/ivysaursomething.png";
        }
        else
            stabattackp2 = "NULL STRIKE";
        P2img.src = p2imgsrc;
        P2img.style.filter = "grayscale(0)";
        spanP2mon.innerHTML = "CPU<b>" + p2mon + "</b>: ";
        spanP2lifecount.innerHTML = "HP: " + p2hp + "/" + p2maxhp + " (100%)";
        spanP2lifecount.style.color = pP2HPbar.style.background = "green";
        pP2HPbar.style.width = "100px";
        pmessageboxp1.innerHTML = "Player selected " + p1mon + ", can begin battle!";
        pmessageboxp2.innerHTML = "CPU selected " + p2mon + ", waiting for player!";
    }
    else
        spanP2mon.innerHTML = "Please select a non-nullmon.";
}

function fmonselect() {
    if (firemon.checked == true) {
        nullmon1 = "Fuegomon";
        p1imgsrc = "./mons/charizardsomething.png";
        p1mon = "&#x1F525;Kakuchín";
        fselectedmon();
        fselectcpumon();
        spanstab.innerHTML = stabattackp1 = "Ember Shot";
        spanstab.style.color = "red";
        console.log(nullmon1 + " has been selected!");
    } else if (watermon.checked == true) {
        nullmon1 = "Aguamon";
        p1imgsrc = "./mons/greninjasomething.png";
        p1mon = "&#x1F4A7;Pochoclo";
        fselectedmon();
        fselectcpumon();
        spanstab.innerHTML = stabattackp1 = "Water Gun";
        spanstab.style.color = "blue";
        console.log(nullmon1 + " has been selected!");
    } else if (grassmon.checked == true) {
        nullmon1 = "Plantamon";
        p1imgsrc = "./mons/ivysaursomething.png";
        p1mon = "&#x1F331;Plantasaurio";
        fselectedmon();
        fselectcpumon();
        spanstab.innerHTML = stabattackp1 = "Vine Whip";
        spanstab.style.color = "green";
        console.log(nullmon1 + " has been selected!");
    } else
        spanP1mon.innerHTML = "No mon has been selected.";
}

function lowerAtk(basepower, minpower) {
    if (minpower == 0) {
        basepower = 66;
        minpower--;
    } else if (minpower == -1) {
        basepower = 50;
        minpower--;
    } else if (minpower == -2) {
        basepower = 40;
        minpower--;
    } else if (minpower == -3) {
        basepower = 33;
        minpower--;
    } else if (minpower == -4) {
        basepower = 28;
        minpower--;
    } else if (minpower == -5) {
        basepower = 25;
        minpower--;
    }
    return [basepower, minpower];
}

function lowerAcc(accuracy, mincuracy) {
    if (mincuracy == 0) {
        accuracy = 75;
        mincuracy--;
    } else if (mincuracy == -1) {
        accuracy = 60;
        mincuracy--;
    } else if (mincuracy == -2) {
        accuracy = 50;
        mincuracy--;
    } else if (mincuracy == -3) {
        accuracy = 43;
        mincuracy--;
    } else if (mincuracy == -4) {
        accuracy = 36;
        mincuracy--;
    } else if (mincuracy == -5) {
        accuracy = 33;
        mincuracy--;
    }
    return [accuracy, mincuracy];
}

function removezerosandshowhp(monhp, showhp, showmaxhp) {
    let percentagehp = 100 / (showmaxhp / monhp);
    if (monhp != 0) {
        if (parseInt(monhp) == monhp) {
            if (parseInt(percentagehp) == percentagehp)
                showhp.innerHTML = "HP: " + monhp + "/" + showmaxhp + " (" + percentagehp + "%)";
            else
                showhp.innerHTML = "HP: " + monhp + "/" + showmaxhp + " (" + percentagehp.toFixed(2) + "%)";
        } else {
            if (parseInt(percentagehp) == percentagehp)
                showhp.innerHTML = "HP: " + monhp.toFixed(2) + "/" + showmaxhp + " (" + percentagehp + "%)";
            else
                showhp.innerHTML = "HP: " + monhp.toFixed(2) + "/" + showmaxhp + " (" + percentagehp.toFixed(2) + "%)";
        }
    }
}

function damagecalc(nullmon1, nullmon2, pmove, php, pmaxhp, pbasepower, pcritpower, pfullpower, spanPlifecount, pmessageboxp, p1mon, p2mon, stabattackp ) {
    let criticalrate = Math.ceil(Math.random() * 10);
        if (criticalrate == 10) {
            if (pmove == 1) {
                pfullpower = pcritpower * 2;
                pmessageboxp.innerHTML = "<b>" + p1mon + "</b> landed a <i><u>Critical Hit!</u><i> " + p2mon + " took " + (pfullpower) + " damage from Tackle!";
            } else if (pmove == 4) {
                if(nullmon1 == "Fuegomon" && nullmon2 == "Aguamon" || nullmon1 == "Aguamon" && nullmon2 == "Plantamon" || nullmon1 == "Plantamon" && nullmon2 == "Fuegomon" || nullmon1 == nullmon2) {
                    pfullpower = pcritpower * sametypeattackbonus;
                    pmessageboxp.innerHTML = "<b>" + p1mon + "</b>'s " + stabattackp + " landed a <i><u>critical hit</u></i>" + p2mon + " for average (" + pfullpower + ") damage , but it's not very effective...";
                } else {
                    pfullpower = p1critpower * sametypeattackbonus * 4;
                    pmessageboxp.innerHTML = "<b>" + p1mon + "</b>'s " + stabattackp + " landed a <i><u>CRITICAL SUPER EFFECTIVE!!!</u></i><br>" + p2mon + " received <i>LUDICROUS</i> <b>(" + (pfullpower) + ")</b> DAMAGE!!!";
                }
            }
        } else {
            if (pmove == 1) {
                pfullpower = pcritpower * pbasepower / 100;
                if (parseInt(pfullpower) != pfullpower)
                    pfullpower = pfullpower.toFixed(2)
                pmessageboxp.innerHTML = "<b>" + p1mon + "</b> used Tackle!<b>" + p2mon + "</b> received "+ pfullpower + " damage";
            } else if (pmove == 4) {
                if (nullmon1 == "Fuegomon" && nullmon2 == "Aguamon" || nullmon1 == "Aguamon" && nullmon2 == "Plantamon" || nullmon1 == "Plantamon" && nullmon2 == "Fuegomon" || nullmon1 == nullmon2) {
                    pfullpower = (pcritpower * pbasepower * sametypeattackbonus / 100) / 2;
                    if (parseInt(pfullpower) != pfullpower)
                        pfullpower = pfullpower.toFixed(2)
                    pmessageboxp.innerHTML = "<b>" + p1mon + "</b>'s " + stabattackp + " hit <b>" + p2mon + "</b> for " + pfullpower + " damage, but it's <i>not</i> very effective...";
            } else {
                pfullpower = (pcritpower * pbasepower * sametypeattackbonus / 100) * 2;
                if (parseInt(pfullpower) != pfullpower)
                    pfullpower = pfullpower.toFixed(2)
                pmessageboxp.innerHTML = "<b>" + p1mon + "</b>'s " + stabattackp + " hit <b>" + p2mon + "</b> for " + pfullpower + " damage, and it's <b>SUPER</b> effective...";
            }
        }
    }
    php-= pfullpower;
    removezerosandshowhp(php, spanPlifecount, pmaxhp);
    return php;
}

function checkp2hp() {
    if (p2hp > 0)
        p2selectattack();
    else
        pmessageboxp2.innerHTML = "";
}

function resetUI() {
    h1maintitle.hidden = false;
    h2monselect.hidden = false;
    monselect.hidden = false;
    spanmon.hidden = true;
    radiotackle.checked = false;
    radiogrowl.checked = false;
    radiosandattack.checked = false;
    radiostab.checked = false;
}

function p2selectattack() {
    p2move = Math.ceil(Math.random() * 4);
    console.log("p2move: " + p2move);
    if (p2move == 1) {
        let missrate = Math.ceil(Math.random() * 100);
        if (missrate <= p2accuracy * 95 / 100) {
            p1hp = damagecalc(nullmon2, nullmon1, p2move, p1hp, p1maxhp, p2basepower, p2critpower, p2fullpower, spanP1lifecount, pmessageboxp2, p2mon, p1mon, stabattackp2);
        } else
            pmessageboxp2.innerHTML = p2mon + "'s Tackle Missed!";
    } else if (p2move == 2) {
        let missrate = Math.ceil(Math.random() * 100);
        if (p1minpower > -6) {
            if (missrate <= p2accuracy) {
                let p1lowerAtk = lowerAtk(p1basepower, p1minpower);
                p1basepower = p1lowerAtk[0];
                p1minpower = p1lowerAtk[1];
                pmessageboxp2.innerHTML = "<b>" + p2mon + "</b> used Growl! Your <b>" + p1mon + "</b>'s <b>Attack</b> fell! x" + (p1minpower * -1);
                if (p1mincuracy == 0)
                    pP1status.innerHTML = " | <b>" + p1minpower + "</b> <i>ATK</i>";
                else
                    pP1status.innerHTML = " | <b>" + p1minpower + "</b> <i>ATK</i> | <b>" + p1mincuracy + "</b> <i>ACC</i>";
            } else
                pmessageboxp2.innerHTML = "<b>" + p2mon + "</b>'s Growl Missed!";
        } else
            p2selectattack();
    } else if (p2move == 3) {
        let missrate = Math.ceil(Math.random() * 100);
        if (p1mincuracy > -6) {
            if (missrate <= p2accuracy) {
                let p1lowerAcc = lowerAcc(p1accuracy, p1mincuracy);
                p1accuracy = p1lowerAcc[0];
                p1mincuracy = p1lowerAcc[1];
                pmessageboxp2.innerHTML = "<b>" + p2mon + "</b> used Sand Attack! Your <b>" + p1mon + "</b>'s <b>Accuracy</b> fell! x" + (p1mincuracy * -1);
                if (p1minpower == 0)
                    pP1status.innerHTML = " | <b>" + p1mincuracy + "</b> <i>ACC</i>";
                else
                    pP1status.innerHTML = " | <b>" + p1minpower + "</b> <i>ATK</i> | <b>" + p1mincuracy + "</b> <i>ACC</i>";
            } else
                pmessageboxp2.innerHTML = "<b>" + p2mon + "</b>'s Sand Attack Missed!";
        } else
            p2selectattack();
    } else if (p2move == 4) {
        let missrate = Math.ceil(Math.random() * 100);
        if (missrate <= p2accuracy) {
            p1hp = damagecalc(nullmon2, nullmon1, p2move, p1hp, p1maxhp, p2basepower, p2critpower, p2fullpower, spanP1lifecount, pmessageboxp2, p2mon, p1mon, stabattackp2);
        } else
            pmessageboxp2.innerHTML = p2mon + "'s " + stabattackp2 + " Missed!";
    } else
        pmessageboxp2.innerHTML = p2mon + " need to choose a move to begin battle...";
}

function colorHPbar(playerhp, playermaxhp, playerhpbar, playerlifecount, playerimg) {
    let playerhpcolor;
    if (playerhp > 0)
        playerhpcolor = 100 / (playermaxhp / playerhp);
    else {
        playerhpcolor = playerhp = 0;
        playerlifecount.innerHTML = "HP: " + playerhp + "/" + playermaxhp + " (0%)";
        setTimeout(() => {
            playerimg.style.filter = "grayscale(1)";
            playerimg.style.transition = "filter 1s";
            spanrestartbox.innerHTML = "Presiona el botón de seleccionar mon para iniciar una nueva batalla.";
        }, 2000);
    }
    // playerhpbar.style.transform = "scaleX(" + (playerhpcolor / 100) + ") translateX(" + (-100 + playerhpcolor) + "px)";
    playerhpbar.style.width = playerhpcolor + "px";
    if (playerhpcolor <= 100 && playerhpcolor > 50) {
        playerhpcolor = "green";
    }
    else if (playerhpcolor <= 50 && playerhpcolor > 20) {
        playerhpcolor = "orange";
        playerhpbar.style.background = playerhpcolor;
    }
    else if (playerhpcolor <= 20 && playerhpcolor > 0) {
        playerhpcolor = "red";
        playerhpbar.style.background = playerhpcolor;
    }
    else {
        playerhpcolor = "black";
        playerhpbar.style.background = playerhpcolor;
    }
    return [playerhpcolor, playerhp];
}

function beginBattle() {
    if (nullmon1 != "NULLMON" && nullmon2 != "NULLMON") {
        if (p1hp > 0 && p2hp > 0) {
            if (radiotackle.checked == true) {
                p1move = 1;
                let missrate = Math.ceil(Math.random() * 100)
                if (missrate <= p1accuracy * 95 / 100) {
                    p2hp = damagecalc(nullmon1, nullmon2, p1move, p2hp, p2maxhp, p1basepower, p1critpower, p1fullpower, spanP2lifecount, pmessageboxp1, p1mon, p2mon, stabattackp1);
                } else
                    pmessageboxp1.innerHTML = p1mon + "'s Tackle Missed!";
                checkp2hp();
            } else if (radiogrowl.checked == true) {
                p1move = 2;
                if (p2minpower > -6) {
                    let missrate = Math.ceil(Math.random() * 100);
                    if (missrate <= p1accuracy) {
                        let p2lowerAtk = lowerAtk(p2basepower, p2minpower);
                        p2basepower = p2lowerAtk[0];
                        p2minpower = p2lowerAtk[1];
                        pmessageboxp1.innerHTML = "<b>" + p1mon + "</b> used Growl! <b>" + p2mon + "</b>'s <b>Attack</b> fell! x" + (p2minpower * -1);
                        if (p2mincuracy == 0)
                            pP2status.innerHTML = " | <b>" + p2minpower + "</b> <i>ATK</i>";
                        else
                            pP2status.innerHTML = " | <b>" + p2minpower + "</b> <i>ATK</i> | <b>" + p2mincuracy + "</b> <i>ACC</i>";
                    } else
                        pmessageboxp1.innerHTML = "<b>" + p1mon + "</b>'s Growl Missed!";
                } else
                    pmessageboxp1.innerHTML = "<b>" + p1mon + "</b>'s Growl <b>won't work</b> <i>anymore!!</i>";
                checkp2hp();
            } else if (radiosandattack.checked == true) {
                p1move = 3;
                if (p2mincuracy > -6) {
                    let missrate = Math.ceil(Math.random() * 100);
                    if (missrate <= p1accuracy) {
                        let p2lowerAcc = lowerAcc(p2accuracy, p2mincuracy);
                        p2accuracy = p2lowerAcc[0];
                        p2mincuracy = p2lowerAcc[1];
                        pmessageboxp1.innerHTML = "<b>" + p1mon + "</b> used Sand Attack!<b>" + p2mon + "</b>'s <b>Accuracy</b> fell! x" + (p2mincuracy * -1);
                        if (p2minpower == 0)
                            pP2status.innerHTML = " | <b>" + p2mincuracy + "</b> <i>ACC</i>";
                        else
                            pP2status.innerHTML = " | <b>" + p2minpower + "</b> <i>ATK</i> | <b>" + p2mincuracy + "</b> <i>ACC</i>";
                    } else
                        pmessageboxp1.innerHTML = "<b>" + p1mon + "</b>'s Sand Attack Missed!";
                } else
                    pmessageboxp1.innerHTML = "<b>" + p1mon + "</b>'s Sand Attack <b>won't work</b> <i>anymore!!</i>";
                checkp2hp();
            } else if (radiostab.checked == true) {
                p1move = 4;
                let missrate = Math.ceil(Math.random() * 100);
                if (missrate <= p1accuracy) {
                    p2hp = damagecalc(nullmon1, nullmon2, p1move, p2hp, p2maxhp, p1basepower, p1critpower, p1fullpower, spanP2lifecount, pmessageboxp1, p1mon, p2mon, stabattackp1);
                }
                else
                    pmessageboxp1.innerHTML = p1mon + "'s " + stabattackp1 + " Missed!";
                checkp2hp();
            } else
                pmessageboxp1.innerHTML = "You need to choose a move to begin battle...";
        }
        let P1data = colorHPbar(p1hp, p1maxhp, pP1HPbar, spanP1lifecount, P1img); 
        spanP1lifecount.style.color = P1data[0];
        p1hp = P1data[1];
        let P2data = colorHPbar(p2hp, p2maxhp, pP2HPbar, spanP2lifecount, P2img); 
        spanP2lifecount.style.color = P2data[0];
        p2hp = P2data[1];
        spanP2lifecount.style.color = colorHPbar(p2hp, p2maxhp, pP2HPbar, spanP2lifecount, P2img);
        if (p1hp <= 0 && p2hp > 0) {
            setTimeout(() => {
                p1loss++;
                pmessageboxp1.innerHTML = "";
                spanP1mon.innerHTML = "Your<b>" + p1mon + "</b>&#x1FAA6;";
                spanP2mon.innerHTML = "CPU<b>" + p2mon + "</b>&#x1F451;";
                pmessageboxp2.innerHTML = "Your<b>" + p1mon + "</b> fainted, <i><u>you lose...</u></i> :(" + " | Your wins: " + p1win + " | Your losses: " + p1loss;
            }, 2000);
        } else if (p2hp <= 0 && p1hp > 0) {
            setTimeout(() => {
                p1win++;
                pmessageboxp2.innerHTML = "";
                spanP1mon.innerHTML = "Your<b>" + p1mon + "</b>&#x1F451;";
                spanP2mon.innerHTML = "CPU<b>" + p2mon + "</b>&#x1FAA6;";
                pmessageboxp1.innerHTML = "CPU<b>" + p2mon + "</b> fainted, <i><u>you win!!!</u></i> :)" + " | Your wins: " + p1win + " | Your losses: " + p1loss;
            }, 2000);
        } if (p1hp > 0 && p2hp > 0) {
            turncounter++;
            spanturncounter.innerHTML = "(Turn " + turncounter + ")" + " [Round " + roundcounter + "]";
        } else {
            divatkcontainer.hidden = true;
            setTimeout((resetUI), 2000);
        }
    } else
        pmessageboxp1.innerHTML = "No has seleccionado un mon, no puedes atacar.";
}