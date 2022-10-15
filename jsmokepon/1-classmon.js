const moncontainer = document.getElementById("mon-container");
let plagiodex = [];

class Plagiomon {
    constructor(name, id, ability, level, type1, type2, basehp, pyatk, pydef, spatk, spdef, speed) {
        this.name = name;
        this.id = id;
        this._idname = "_" + id + name;
        this.ability = ability;
        this.img = "./mons/" + this.name + "something.png"
        this.level = level;
        this.type1 = type1;
        this.type2 = type2;
        this.basehp = basehp;
        this.pyatk = pyatk;
        this.pydef = pydef;
        this.spatk = spatk;
        this.spdef = spdef;
        this.speed = speed;
        this.maxhp = basehp * level + ((-level/10) + 10) * 1;
        this.maxpyatk = pyatk * level + (((-level/10) + 10)/2);
        this.maxpydef = pydef * level + (((-level/10) + 10)/2);
        this.maxspatk = spatk * level + (((-level/10) + 10)/2);
        this.maxspdef = spdef * level + (((-level/10) + 10)/2);
        this.maxspeed = speed * level + (((-level/10) + 10)/2);
        this.moveset;
        this.struggle = {
            name: "Struggle",
            category: "physical",
            critrate: "standard",
            power: 50,
            accuracy: "-",
            type: "Normal",
            stab: false,
            priority: 0,
            setpp: 1,
            minpp: 1,
            maxpp: 1,
            effect: "RecoilStruggle",
            target: "single",
        };
    }
}

//plagiodex[0] = new Plagiomon("Omnimon", 0, 255, "", "", 7.14, 6.69, 6.69, 6.69, 6.69, 6.69);
//plagiodex[7] = new Plagiomon("Escuero", 7, 60, "Water", "", 2.92, 2.14, 2.51, 2.18, 2.49, 2.03);
//plagiodex[150] = new Plagiomon("MiauDos", 150, 70, "Psychic", "", 4.16, 3.5, 3.06, 4.47, 3.06, 3.94);
//plagiodex[448] = new Plagiomon("Perrito", 448, 70, "Fighting", "Steel", 3.44, 3.5, 2.62, 3.61, 2.62, 3.06);
// plagiodex[658] = new Plagiomon("Pochoclo", "Water", "Dark", 3.48, 3.17, 2.56, 3.35, 2.65, 3.77);

//#003 Maceta
//let maceta = plagiodex.push(new Plagiomon("Maceta", 2, 55, "Grass", "Poison", 3.24, 2.45, 2.47, 2.84, 2.84, 2.4));
let Maceta = plagiodex[3] = new Plagiomon("Maceta", 3, "Overgrow", 50, "Grass", "Poison", 3.64, 2.89, 2.91, 3.28, 3.28, 2.84);
Maceta.moveset = [
    {
        moveid: "move1",
        name: "Giga Drain",
        category: "special",
        contact: false,
        critrate: "standard",
        power: 75,
        accuracy: 100,
        type: "Grass",
        stab: true,
        priority: 0,
        setpp: 100,
        minpp: 10,
        maxpp: 16,
        effect: "drain",
        recoil: 0,
        target: "single",
    },
    {
        moveid: "move2",
        name: "Sludge Bomb",
        category: "special",
        contact: false,
        critrate: "standard",
        power: 90,
        accuracy: 100,
        type: "Poison",
        stab: true,
        priority: 0,
        setpp: 10,
        minpp: 10,
        maxpp: 16,
        effect: "poison",
        recoil: 0,
        target: "single",
    },
    {
        moveid: "move3",
        name: "Leech Seed",
        category: "status",
        contact: false,
        critrate: "none",
        power: "-",
        accuracy: 90,
        type: "Grass",
        stab: false,
        priority: 0,
        setpp: 10,
        minpp: 10,
        maxpp: 16,
        effect: "sap",
        recoil: 0,
        target: "single",
    },
    {
        moveid: "move4",
        name: "Protect",
        category: "status",
        contact: false,
        critrate: "none",
        power: "-",
        accuracy: "-",
        type: "Normal",
        stab: false,
        priority: 4,
        setpp: 10,
        minpp: 10,
        maxpp: 16,
        effect: "protect",
        recoil: 0,
        target: "self",
    },
];
console.log(Maceta.moveset);

//#006 Kakuchin
//let kakuchin = plagiodex.push(new Plagiomon("Kakuchin", 6, 50, "Fire", "Flying", 3.6, 2.93, 2.8, 3.48, 2.95, 3.28));
let Kakuchin = plagiodex[6] = new Plagiomon("Kakuchin", 6, "Blaze", 50, "Fire", "Flying", 3.6, 2.93, 2.8, 3.48, 2.95, 3.28);
Kakuchin.moveset = [
    {
        moveid: "move1",
        name: "Fire Blast",
        category: "special",
        contact: false,
        critrate: "standard",
        power: 110,
        accuracy: 85,
        type: "Fire",
        stab: true,
        priority: 0,
        setpp: 5,
        minpp: 5,
        maxpp: 8,
        effect: "burn",
        recoil: 0,
        target: "single",
    },
    {
        moveid: "move2",
        name: "Air Slash",
        category: "special",
        contact: false,
        critrate: "standard",
        power: 75,
        accuracy: 95,
        type: "Flying",
        stab: true,
        priority: 0,
        setpp: 15,
        minpp: 15,
        maxpp: 24,
        effect: "flinch",
        target: "single",
    },
    {
        moveid: "move3",
        name: "Earthquake",
        category: "physical",
        contact: false,
        critrate: "standard",
        power: 100,
        accuracy: 100,
        type: "Ground",
        stab: true,
        priority: 0,
        setpp: 10,
        minpp: 10,
        maxpp: 16,
        effect: "hitDig",
        recoil: 0,
        target: "all",
    },
    //Tentaive Focus Blast replacement
    //Tentative Hurricane replacement
    {
        moveid: "move4",
        name: "Shadow Claw",
        category: "physical",
        contact: true,
        critrate: "increased",
        power: 70,
        accuracy: 100,
        type: "Ghost",
        stab: true,
        priority: 0,
        setpp: 15,
        minpp: 15,
        maxpp: 24,
        effect: "highCrit",
        recoil: 0,
        target: "single",
    },
    //Tentative Earthquake replacement
    //Tentative Scorching Sands replacement
];
console.log(Kakuchin.moveset);

//#009 Pochoclo
let Pochoclo = plagiodex[9] = new Plagiomon("Pochoclo", 9, "Torrent", 50, "Water", "", 3.62, 2.91, 3.28, 2.95, 3.39, 2.80);
Pochoclo.moveset = [
    {
        moveid: "move1",
        name: "Hydro Pump",
        category: "special",
        contact: false,
        critrate: "standard",
        power: 110,
        accuracy: 80,
        type: "Water",
        stab: true,
        priority: 0,
        setpp: 5,
        minpp: 5,
        maxpp: 8,
        effect: "none",
        recoil: 0,
        target: "single",
    },
    {
        moveid: "move2",
        name: "Aqua Jet",
        category: "physical",
        contact: true,
        critrate: "standard",
        power: 40,
        accuracy: 100,
        type: "Water",
        stab: true,
        priority: 1,
        setpp: 20,
        minpp: 20,
        maxpp: 32,
        effect: "quickattack",
        recoil: 0,
        target: "single",
    },
    {
        moveid: "move3",
        name: "Ice Beam",
        category: "special",
        contact: false,
        critrate: "standard",
        power: 90,
        accuracy: 100,
        type: "Ice",
        stab: true,
        priority: 0,
        setpp: 10,
        minpp: 10,
        maxpp: 16,
        effect: "freeze",
        recoil: 0,
        target: "single",
    },
    {
        moveid: "move4",
        name: "Mirror Coat",
        category: "special",
        contact: false,
        critrate: "none",
        power: "-",
        accuracy: 100,
        type: "Psychic",
        stab: false,
        priority: -5,
        setpp: 20,
        minpp: 20,
        maxpp: 32,
        effect: "returnDamage2x",
        recoil: 0,
        target: "single",
    },
];
console.log(Pochoclo.moveset);

let Shikapu = plagiodex[25] = new Plagiomon("Shikapu", 25, "Static", 50, "Electric", "", 2.74, 2.29, 1.96, 2.18, 2.18, 3.06);
Shikapu.moveset = [
    {
        moveid: "move1",
        name: "Volt Tackle",
        category: "physical",
        contact: true,
        critrate: "standard",
        power: 120,
        accuracy: 100,
        type: "Electric",
        stab: true,
        priority: 0,
        setpp: 15,
        minpp: 15,
        maxpp: 24,
        effect: "paralyze",
        recoil: 1/3,
        target: "single",
    },
    {
        moveid: "move2",
        name: "Thunderbolt",
        category: "special",
        contact: false,
        critrate: "standard",
        power: 90,
        accuracy: 100,
        type: "Electric",
        stab: true,
        priority: 0,
        setpp: 15,
        minpp: 15,
        maxpp: 16,
        effect: "paralyze",
        recoil: 0,
        target: "single",
    },
    {
        moveid: "move3",
        name: "Counter",
        category: "physical",
        contact: true,
        critrate: "none",
        power: "-",
        accuracy: 100,
        type: "Fighting",
        stab: false,
        priority: -5,
        setpp: 20,
        minpp: 20,
        maxpp: 32,
        effect: "returnDamage2x",
        recoil: 0,
        target: "single",
    },
    {
        moveid: "move4",
        name: "Electroweb",
        contact: false,
        category: "special",
        critrate: "standard",
        power: 55,
        accuracy: 95,
        type: "Electric",
        stab: true,
        priority: 0,
        setpp: 15,
        minpp: 15,
        maxpp: 24,
        effect: "lowerSpeed1x100%",
        recoil: 0,
        target: "single",
    },
];
console.log(Shikapu.moveset);

//#658 Gexninja
//let gexninja = plagiodex.push(new Plagiomon("Gexninja", 658, 50, "Water", "Dark", 3.48, 3.17, 2.56, 3.35, 2.65, 3.77));
let Gexninja = plagiodex[658] = new Plagiomon("Gexninja", 658, "Torrent", 50, "Water", "Dark", 3.48, 3.17, 2.56, 3.35, 2.65, 3.77);
Gexninja.moveset = [
    {
        moveid: "move1",
        name: "Hydro Pump",
        category: "special",
        contact: false,
        critrate: "standard",
        power: 110,
        accuracy: 80,
        type: "Water",
        stab: true,
        priority: 0,
        setpp: 5,
        minpp: 5,
        maxpp: 8,
        effect: "none",
        recoil: 0,
        target: "all",
    },
    {
        moveid: "move2",
        name: "Night Slash",
        category: "physical",
        contact: true,
        critrate: "increased",
        power: 70,
        accuracy: 100,
        type: "Dark",
        stab: true,
        priority: 0,
        setpp: 15,
        minpp: 15,
        maxpp: 24,
        effect: "highcrit",
        recoil: 0,
        target: "single",
    },
    {
        moveid: "move3",
        name: "Swagger",
        category: "status",
        contact: false,
        critrate: "none",
        power: "-",
        accuracy: 85,
        type: "Normal",
        stab: false,
        priority: 0,
        setpp: 15,
        minpp: 15,
        maxpp: 24,
        effect: "confuse100%",
        recoil: 0,
        target: "single",
    },
    {
        moveid: "move4",
        name: "Double Team",
        category: "status",
        contact: false,
        critrate: "none",
        power: "-",
        accuracy: "-",
        type: "Normal",
        stab: false,
        priority: 0,
        setpp: 15,
        minpp: 15,
        maxpp: 24,
        effect: "raiseEvasion",
        recoil: 0,
        target: "self",
    },
];
console.log(Gexninja.moveset);

//#065 Shazakazam
let Shazakazam = plagiodex[65] = new Plagiomon("Shazakazam", 65, "Synchronize", 50, "Psychic", "", 3.14, 2.18, 2.07, 4.05, 3.17, 3.72);
Shazakazam.moveset = [
    {
        moveid: "move1",
        name: "Psychic",
        category: "special",
        contact: false,
        critrate: "standard",
        power: 90,
        accuracy: 100,
        type: "Psychic",
        stab: true,
        priority: 0,
        setpp: 10,
        minpp: 10,
        maxpp: 16,
        effect: "lowerSpDef1x10%",
        recoil: 0,
        target: "single",
    },
    {
        moveid: "move2",
        name: "Tri Attack",
        category: "special",
        contact: false,
        critrate: "standard",
        power: 80,
        accuracy: 100,
        type: "Normal",
        stab: true,
        priority: 0,
        setpp: 10,
        minpp: 10,
        maxpp: 16,
        effect: "triattack",
        recoil: 0,
        target: "single",
    },
    {
        moveid: "move3",
        name: "Focus Blast",
        category: "special",
        contact: false,
        critrate: "standard",
        power: 120,
        accuracy: 70,
        type: "Fighting",
        stab: true,
        priority: 0,
        setpp: 5,
        minpp: 5,
        maxpp: 8,
        effect: "lowerSpDef1x10%",
        recoil: 0,
        target: "single",
    },
    {
        moveid: "move4",
        name: "Reflect",
        category: "status",
        contact: false,
        critrate: "none",
        power: "-",
        accuracy: "-",
        type: "Psychic",
        stab: false,
        priority: 0,
        setpp: 20,
        minpp: 20,
        maxpp: 32,
        effect: "halfPhysicalDamage",
        recoil: 0,
        target: "self",
    },
];
console.log(Shazakazam.moveset);

//#068 Cuatrobiceps
let Cuatrobiceps = plagiodex[68] = new Plagiomon("Cuatrobiceps", 68, "No Guard", 50, "Fighting", "", 3.84, 3.94, 2.84, 2.51, 2.95, 2.29);
Cuatrobiceps.moveset = [
    {
        moveid: "move1",
        name: "Dynamic Punch",
        category: "physical",
        critrate: "standard",
        contact: true,
        power: 100,
        accuracy: 50,
        type: "Fighting",
        stab: true,
        priority: 0,
        setpp: 5,
        minpp: 5,
        maxpp: 8,
        effect: "confuse100%",
        recoil: 0,
        target: "single",
    },
    {
        moveid: "move2",
        name: "Payback",
        category: "physical",
        contact: true,
        critrate: "standard",
        power: 50,
        accuracy: 100,
        type: "Dark",
        stab: true,
        priority: 0,
        setpp: 10,
        minpp: 10,
        maxpp: 16,
        effect: "revengeTurn",
        recoil: 0,
        target: "single",
    },
    {
        moveid: "move3",
        name: "Fire Punch",
        category: "physical",
        contact: true,
        critrate: "standard",
        power: 75,
        accuracy: 100,
        type: "Fire",
        stab: true,
        priority: 0,
        setpp: 15,
        minpp: 15,
        maxpp: 24,
        effect: "burn",
        recoil: 0,
        target: "single",
    },
    {
        moveid: "move4",
        name: "Stone Edge",
        category: "physical",
        contact: false,
        critrate: "increased",
        power: 100,
        accuracy: 80,
        type: "Rock",
        stab: true,
        priority: 0,
        setpp: 5,
        minpp: 5,
        maxpp: 8,
        effect: "highCrit",
        recoil: 0,
        target: "single",
    },
];
console.log(Cuatrobiceps.moveset);

//#248 Rockzilla
let Rockzilla = plagiodex[248] = new Plagiomon("Rockzilla", 248, "Sand Stream", 50, "Rock", "Dark", 4.04, 4.03, 3.5, 3.17, 3.28, 2.43);
Rockzilla.moveset = [
    {
        moveid: "move1",
        name: "Rock Slide",
        category: "physical",
        contact: false,
        critrate: "standard",
        power: 75,
        accuracy: 90,
        type: "Rock",
        stab: true,
        priority: 0,
        setpp: 10,
        minpp: 10,
        maxpp: 16,
        effect: "flinch",
        recoil: 0,
        target: "single",
    },
    {
        moveid: "move2",
        name: "Crunch",
        category: "physical",
        contact: true,
        critrate: "standard",
        power: 80,
        accuracy: 100,
        type: "Dark",
        stab: true,
        priority: 0,
        setpp: 15,
        minpp: 15,
        maxpp: 24,
        effect: "lowerPyDef1x10%",
        recoil: 0,
        target: "single",
    },
    {
        moveid: "move3",
        name: "Double Edge",
        category: "physical",
        contact: true,
        critrate: "standard",
        power: 120,
        accuracy: 100,
        type: "Normal",
        stab: true,
        priority: 0,
        setpp: 15,
        minpp: 15,
        maxpp: 24,
        effect: "none",
        recoil: 1/3,
        target: "single",
    },
    {
        moveid: "move4",
        name: "Dragon Dance",
        category: "status",
        contact: false,
        critrate: "none",
        power: "-",
        accuracy: "-",
        type: "Dragon",
        stab: false,
        priority: 0,
        setpp: 20,
        minpp: 20,
        maxpp: 32,
        effect: "raisePyAtk1xSpeed1x",
        recoil: 0,
        target: "self",
    },
];
console.log(Rockzilla.moveset);

/*Blastoise Moveset:
1. Surf
2. Ice Beam
3. Mirror Coat
4. Aqua Jet
*/
/*
Alakazam tentative Moveset:
1. Psychic
2. Tri-Attack
3. Focus Blast
4. Reflect
*/

/* 
Machamp tentative Moveset:
1. Low Sweep
2. Rock Slide
3. Fire Punch
4. Thunder Punch
*/



/*Tyranitar tentative Moveset:
1. Rock Slide
2. Crunch
3. Thunder Wave
4. Giga Impact
*/

/* 
Absol tentative Moveset:
1. Double Team
2. Night Slash
3. Psycho Cut
4. Rock Tomb
*/