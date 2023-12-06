function playNote(note) {
    synth.triggerAttack(note, Tone.context.currentTime);
    synth.triggerRelease(note, Tone.context.currentTime+.1);
}