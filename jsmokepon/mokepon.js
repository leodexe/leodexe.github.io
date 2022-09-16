let nullmon1, nullmon2, p1mon, p2mon, p1hp, p2hp, p1move, p2move;
nullmon1 = nullmon2 = p1mon = p2mon = "NULLMON";
let h2monselect = document.getElementById("mon-select");
let firemon = document.getElementById("fuegomon");
let watermon = document.getElementById("aguamon");
let grassmon = document.getElementById("plantamon");
let monselect = document.getElementById("button-monselect");
monselect.addEventListener("click", fmonselect);
let spanturncounter = document.getElementById("turncounter");
let p1basepower, p1critpower, p2basepower, p2critpower, p1fullpower, p2fullpower, turncounter, p1win, p1loss, roundcounter;
p1win = p1loss = roundcounter = 0;
let p1minpower, p2minpower, p1accuracy, p2accuracy, p1mincuracy,  p2mincuracy, stabattackp1, stabattackp2, sametypeattackbonus;
stabattackp1 = stabattackp2 = "NULL STAB";
sametypeattackbonus = 1.5;
let spanmon = document.getElementById("mon-name");
let pP1mon = document.getElementById("p1-mon");
let pP1lifecount = document.getElementById("p1-life-count");
let pP1lives = document.getElementById("p1-lives");
let pP2mon = document.getElementById("p2-mon");
let pP2lifecount = document.getElementById("p2-life-count");
let pP2lives = document.getElementById("p2-lives");
let labeltackle = document.getElementById("lab-tackle");
let radiotackle = document.getElementById("tackle");
let labelgrowl = document.getElementById("lab-growl");
let radiogrowl = document.getElementById("growl");
let labelsandattack = document.getElementById("lab-sandattack");
let radiosandattack = document.getElementById("sandattack");
let labelstab = document.getElementById("lab-stab");
let radiostab = document.getElementById("stab");
let spanstab = document.getElementById("stabtext");
let buttonattacknow = document.getElementById("attacknow");
buttonattacknow.addEventListener("click", beginBattle);
let pmessageboxp1 = document.getElementById("message-box-p1");
let pmessageboxp2 = document.getElementById("message-box-p2");
let spanrestartbox = document.getElementById("restart-box");

function fselectedmon() {
    h2monselect.hidden = true;
    monselect.hidden = true;
    spanmon.innerHTML = "Select your " + p1mon + "'s attack ";
    spanmon.hidden = false;
    labeltackle.hidden = false;
    labelgrowl.hidden = false;
    labelsandattack.hidden = false;
    labelstab.hidden = false;
    buttonattacknow.hidden = false;
    p1hp = p2hp = 31;
    p1basepower = p2basepower = 100;
    p1critpower  = p2critpower = 5;
    p1minpower = p1mincuracy = p2minpower = p2mincuracy = turncounter = 0;
    p1accuracy = p2accuracy = 100;
    pP1mon.innerHTML = "Your " + p1mon + " has ";
    pP1lifecount.innerHTML = p1hp;
    pP1lives.innerHTML = "HP";
    pmessageboxp1.innerHTML = pmessageboxp2.innerHTML = "";
    spanrestartbox.innerHTML = "";
    turncounter++;
    roundcounter++;
    spanturncounter.innerHTML = "(Turn " + turncounter + ")" + " [Round " + roundcounter + "]";
}

function fselectcpumon() {
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
        pP2mon.innerHTML = "CPU " + p2mon + " has ";
        pP2lifecount.innerHTML = p2hp;
        pP2lives.innerHTML = "HP";
        pmessageboxp1.innerHTML = "Player has selected " + p1mon + ", can begin battle!";
        pmessageboxp2.innerHTML = "CPU has selected " + p2mon + ", waiting for player!";
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
        pP2mon.innerHTML = "CPU " + p2mon + " has ";
        pP2lifecount.innerHTML = p2hp;
        pP2lives.innerHTML = "HP";
        pmessageboxp1.innerHTML = "Player has selected " + p1mon + ", can begin battle!";
        pmessageboxp2.innerHTML = "CPU has selected " + p2mon + ", waiting for player!";
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
        pP2mon.innerHTML = "CPU " + p2mon + " has ";
        pP2lifecount.innerHTML = p2hp;
        pP2lives.innerHTML = "HP";
        pmessageboxp1.innerHTML = "Player has selected " + p1mon + ", can begin battle!";
        pmessageboxp2.innerHTML = "CPU has selected " + p2mon + ", waiting for player!";
    } else
        console.log("Player didn't choose, so CPU won't choose.");
    if (nullmon2 == "Fuegomon")
        stabattackp2 = "Ember Shot";
    else if (nullmon2 == "Aguamon")
        stabattackp2 = "Water Gun";
    else if (nullmon2 == "Plantamon")
        stabattackp2 = "Vine Whip";
    else
        stabattackp2 = "NULL STRIKE";
}

function fmonselect() {
    if (firemon.checked == true) {
        nullmon1 = "Fuegomon";
        p1mon = "&#x1F525;Kakuchín";
        fselectedmon();
        fselectcpumon();
        spanstab.innerHTML = stabattackp1 = "Ember Shot";
        spanstab.style.color = "red";
        console.log(nullmon1 + " has been selected!");
    } else if (watermon.checked == true) {
        nullmon1 = "Aguamon";
        p1mon = "&#x1F4A7;Pochoclo";
        fselectedmon();
        fselectcpumon();
        spanstab.innerHTML = stabattackp1 = "Water Gun";
        spanstab.style.color = "blue";
        console.log(nullmon1 + " has been selected!");
    } else if (grassmon.checked == true) {
        nullmon1 = "Plantamon";
        p1mon = "&#x1F331;Plantasaurio";
        fselectedmon();
        fselectcpumon();
        spanstab.innerHTML = stabattackp1 = "Vine Whip";
        spanstab.style.color = "green";
        console.log(nullmon1 + " has been selected!");
    } else
        pP1mon.innerHTML = "No mon has been selected.";
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

function removezeros(monhp, showhp) {
    if (parseInt(monhp) == monhp)
        showhp.innerHTML = monhp;
    else
        showhp.innerHTML = monhp.toFixed(2);
}

function damagecalc(nullmon1, nullmon2, pmove, php, pbasepower, pcritpower, pfullpower, pPlifecount, pmessageboxp, p1mon, p2mon, stabattackp ) {
    let criticalrate = Math.ceil(Math.random() * 10);
        if (criticalrate == 10) {
            if (pmove == 1) {
                pfullpower = pcritpower * 2;
                php -= pfullpower;
                removezeros(php, pPlifecount);
                pmessageboxp.innerHTML = p1mon + "landed a Critical Hit! " + p2mon + " took " + (pfullpower) + " damage from Tackle!";
            } else if (pmove == 4) {
                if(nullmon1 == "Fuegomon" && nullmon2 == "Aguamon" || nullmon1 == "Aguamon" && nullmon2 == "Plantamon" || nullmon1 == "Plantamon" && nullmon2 == "Fuegomon" || nullmon1 == nullmon2) {
                    pfullpower = pcritpower * sametypeattackbonus;
                    php-= pfullpower;
                    removezeros(php, pPlifecount);
                    pmessageboxp.innerHTML = p1mon + "'s " + stabattackp + " landed a critical hit" + p2mon + " for average (" + pfullpower + ") damage , but it's not very effective...";
                } else {
                    pfullpower = p1critpower * sametypeattackbonus * 4;
                    php-= pfullpower;
                    removezeros(php, pPlifecount);
                    pmessageboxp.innerHTML = p1mon + "'s " + stabattackp + "landed a <b>CRITICAL SUPER EFFECTIVE!!!</b><br>" + p2mon + " received <i>LUDICROUS</i> <b>(" + (pfullpower) + ")</b> DAMAGE!!!";
                }
            }
        } else {
            if (pmove == 1) {
                pfullpower = pcritpower * pbasepower / 100;
                php -= pfullpower;
                removezeros(php, pPlifecount);
                if (parseInt(pfullpower) != pfullpower)
                    pfullpower = pfullpower.toFixed(2)
                pmessageboxp.innerHTML = p1mon + " used Tackle!" + p2mon + " received "+ pfullpower + " damage";
            } else if (pmove == 4) {
                if (nullmon1 == "Fuegomon" && nullmon2 == "Aguamon" || nullmon1 == "Aguamon" && nullmon2 == "Plantamon" || nullmon1 == "Plantamon" && nullmon2 == "Fuegomon" || nullmon1 == nullmon2) {
                    pfullpower = (pcritpower * pbasepower * sametypeattackbonus / 100) / 2;
                    php-= pfullpower;
                    removezeros(php, pPlifecount);
                    if (parseInt(pfullpower) != pfullpower)
                        pfullpower = pfullpower.toFixed(2)
                    pmessageboxp.innerHTML = p1mon + "'s " + stabattackp + " hit " + p2mon + " for " + pfullpower + " damage, but it's not very effective...";
            } else {
                pfullpower = (pcritpower * pbasepower * sametypeattackbonus / 100) * 2;
                php-= pfullpower;
                removezeros(php, pPlifecount);
                if (parseInt(pfullpower) != pfullpower)
                    pfullpower = pfullpower.toFixed(2)
                pmessageboxp.innerHTML = p1mon + "'s " + stabattackp + " hit " + p2mon + " for " + pfullpower + " damage, and it's <b>SUPER</b> effective...";
            }
        }
    }
    return php;
}

function checkp2hp() {
    if (p2hp > 0)
        p2selectattack();
    else
        pmessageboxp2.innerHTML = "";
}
 
function resetUI() {
    h2monselect.hidden = false;
    monselect.hidden = false;
    spanmon.hidden = true;
    labeltackle.hidden = true;
    labelgrowl.hidden = true;
    labelsandattack.hidden = true;
    labelstab.hidden = true;
}

function p2selectattack() {
    //setTimeout(() => {spanmessagebox.innerHTML = "Waiting for CPU Player...";}, 2000);
    p2move = Math.ceil(Math.random() * 4);
    console.log("p2move: " + p2move);
    if (p2move == 1) {
        let missrate = Math.ceil(Math.random() * 100);
        if (missrate <= p2accuracy * 95 / 100) {
            p1hp = damagecalc(nullmon2, nullmon1, p2move, p1hp, p2basepower, p2critpower, p2fullpower, pP1lifecount, pmessageboxp2, p2mon, p1mon, stabattackp2);
        } else 
            pmessageboxp2.innerHTML = p2mon + "'s Tackle Missed!";
    } else if (p2move == 2) {
        let missrate = Math.ceil(Math.random() * 100);
        if (p1minpower > -6) {
            if (missrate <= p2accuracy) {
                let p1lowerAtk = lowerAtk(p1basepower, p1minpower);
                p1basepower = p1lowerAtk[0];
                p1minpower = p1lowerAtk[1];
                pmessageboxp2.innerHTML = p2mon + " used Growl! Your " + p1mon + "'s <b>Attack</b> fell! x" + (p1minpower * -1);
                if (p1mincuracy == 0)
                    pP1lives.innerHTML = "HP | <b>" + p1minpower + "</b> <i>ATK</i>";
                else
                    pP1lives.innerHTML = "HP | <b>" + p1minpower + "</b> <i>ATK</i> | <b>" + p1mincuracy + "</b> <i>ACC</i>";
            } else 
                pmessageboxp2.innerHTML = p2mon + "'s Growl Missed!";
        } else
            p2selectattack();
    } else if (p2move == 3) {
        let missrate = Math.ceil(Math.random() * 100);
        if (p1mincuracy > -6) {
            if (missrate <= p2accuracy) {
                let p1lowerAcc = lowerAcc(p1accuracy, p1mincuracy);
                p1accuracy = p1lowerAcc[0];
                p1mincuracy = p1lowerAcc[1];
                pmessageboxp2.innerHTML = p2mon + " used Sand Attack! Your " + p1mon + "'s <b>Accuracy</b> fell! x" + (p1mincuracy * -1);
                if (p1minpower == 0)
                    pP1lives.innerHTML = "HP | <b>" + p1mincuracy + "</b> <i>ACC</i>";
                else
                    pP1lives.innerHTML = "HP | <b>" + p1minpower + "</b> <i>ATK</i> | <b>" + p1mincuracy + "</b> <i>ACC</i>";
            } else
                pmessageboxp2.innerHTML = p2mon + "'s Sand Attack Missed!";
        } else
            p2selectattack();
    } else if (p2move == 4) {
        let missrate = Math.ceil(Math.random() * 100);
        if (missrate <= p2accuracy) {
            p1hp = damagecalc(nullmon2, nullmon1, p2move, p1hp, p2basepower, p2critpower, p2fullpower, pP1lifecount, pmessageboxp2, p2mon, p1mon, stabattackp2);
        } else
            pmessageboxp2.innerHTML = p2mon + "'s " + stabattackp2 + " Missed!";
    } else
        pmessageboxp2.innerHTML = p2mon + " need to choose a move to begin battle...";
}


function beginBattle() {
    if (nullmon1 != "NULLMON" && nullmon2 != "NULLMON") {
        if (p1hp > 0 && p2hp > 0) {
            if (radiotackle.checked == true) {
                p1move = 1;
                let missrate = Math.ceil(Math.random() * 100)
                if (missrate <= p1accuracy * 95 / 100) {
                    p2hp = damagecalc(nullmon1, nullmon2, p1move, p2hp, p1basepower, p1critpower, p1fullpower, pP2lifecount, pmessageboxp1, p1mon, p2mon, stabattackp1);
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
                        pmessageboxp1.innerHTML = p1mon + " used Growl! " + p2mon + "'s <b>Attack</b> fell! x" + (p2minpower * -1);
                        if (p2mincuracy == 0)
                            pP2lives.innerHTML = "HP | <b>" + p2minpower + "</b> <i>ATK</i>";
                        else
                            pP2lives.innerHTML = "HP | <b>" + p2minpower + "</b> <i>ATK</i> | <b>" + p2mincuracy + "</b> <i>ACC</i>";
                    } else
                        pmessageboxp1.innerHTML = p1mon + "'s Growl Missed!";
                } else
                    pmessageboxp1.innerHTML = p1mon + "'s Growl <b>won't work</b> <i>anymore!!</i>";
                checkp2hp();
            } else if (radiosandattack.checked == true) {
                p1move = 3;
                if (p2mincuracy > -6) {
                    let missrate = Math.ceil(Math.random() * 100);
                    if (missrate <= p1accuracy) {
                        let p2lowerAcc = lowerAcc(p2accuracy, p2mincuracy);
                        p2accuracy = p2lowerAcc[0];
                        p2mincuracy = p2lowerAcc[1];
                        pmessageboxp1.innerHTML = p1mon + " used Sand Attack!" + p2mon + "'s <b>Accuracy</b> fell! x" + (p2mincuracy * -1);
                        if (p2minpower == 0)
                            pP2lives.innerHTML = "HP | <b>" + p2mincuracy + "</b> <i>ACC</i>";
                        else
                            pP2lives.innerHTML = "HP | <b>" + p2minpower + "</b> <i>ATK</i> | <b>" + p2mincuracy + "</b> <i>ACC</i>";
                    } else
                        pmessageboxp1.innerHTML = p1mon + "'s Sand Attack Missed!";
                } else
                    pmessageboxp1.innerHTML = p1mon + "'s Sand Attack <b>won't work</b> <i>anymore!!</i>";
                checkp2hp();
            } else if (radiostab.checked == true) {
                p1move = 4;
                let missrate = Math.ceil(Math.random() * 100);
                if (missrate <= p1accuracy) {
                    p2hp = damagecalc(nullmon1, nullmon2, p1move, p2hp, p1basepower, p1critpower, p1fullpower, pP2lifecount, pmessageboxp1, p1mon, p2mon, stabattackp1);
                }
                else
                    pmessageboxp1.innerHTML = p1mon + "'s " + stabattackp1 + " Missed!";
                checkp2hp();
            } else
                pmessageboxp1.innerHTML = "You need to choose a move to begin battle...";
        } if (p1hp <= 0) {
            p1hp = 0;
            pP1lifecount.innerHTML = p1hp;
            buttonattacknow.hidden = true;
            setTimeout(() => {
                p1loss++;
                pmessageboxp2.innerHTML = "Your " + p1mon + " fainted, <b>you lose</b> :(" + " | Your wins: " + p1win + " | Your losses: " + p1loss;
                pmessageboxp1.innerHTML = "";
                spanrestartbox.innerHTML = "Presiona el botón de seleccionar mon para iniciar una nueva batalla.";
                resetUI();
            }, 2000);
        } if (p2hp <= 0) {
            p2hp = 0;
            pP2lifecount.innerHTML = p2hp;
            buttonattacknow.hidden = true;
            setTimeout(() => {
                p1win++;
                pmessageboxp2.innerHTML = "";
                pmessageboxp1.innerHTML = "CPU " + p2mon + " fainted, <b>you win</b> :)" + " | Your wins: " + p1win + " | Your losses: " + p1loss;
                spanrestartbox.innerHTML = "Presiona el botón de seleccionar mon para iniciar una nueva batalla.";
                resetUI();
            }, 2000);
        } if (p1hp > 0 && p2hp > 0) {
            turncounter++;
            spanturncounter.innerHTML = "(Turn " + turncounter + ")" + " [Round " + roundcounter + "]";
        } else
            buttonattacknow.hidden = true;
    } else
        pmessageboxp1.innerHTML = "No has seleccionado un mon, no puedes atacar.";
}



