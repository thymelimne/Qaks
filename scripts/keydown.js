notes = [];

document.addEventListener("keydown", function(e){
    console.log("keydown");
    note = keynotes[e.key];
    if (!(notes.includes(note))) {
        notes.push(note);
        synth.triggerAttack(note, Tone.context.currentTime);
    }
});

document.addEventListener("keyup", function(e){
    console.log("keyup");
    note = keynotes[e.key];
    synth.triggerRelease(note, Tone.context.currentTime);
    removeElementByContent(notes, note);
});

