randomphrases = [
    "Do the crabwalk!",
    "<3",
    "Fun for part of the family!",
    "Eyyy...",
    "Is this enough?",
    "Rather be liked than lonely",
    "Rather be hated than abandoned",
    "Who are we",
    "n = 3",
    "Yes?",
    "A fashion project.",
    "So I've heard...:",
    "Bp",
    "QAKS",
    "QAKS, inspired by Zombo.com:",
    "All signs point to yes",
    "20",
    "1",
    "Qaks",
    "Qaks: Qwerty-as-keyboard-synth",
    "Qaks: QWERTY-as-keyboard-synth",
    "Qaks: Qwerty-as-Keyboard-Synth",
    "Qaks: QWERTY-as-keyboard-synth",
    "Qaks: Qwerty-As-Keyboard-Synth",
    "QAKS: Qwerty-as-keyboard-synth",
    "QAKS: QWERTY-as-keyboard-synth",
    "QAKS: Qwerty-as-Keyboard-Synth",
    "QAKS: QWERTY-as-keyboard-synth",
    "QAKS: Qwerty-As-Keyboard-Synth",
];
function selectRandomPhrase(){
    var phrase = randomphrases[Math.floor(Math.random()*randomphrases.length)];
    console.log("selectRandomPhrase()");
    return phrase;
}
console.log("randomphrases.js");
document.getElementById("demo").textContent = selectRandomPhrase();