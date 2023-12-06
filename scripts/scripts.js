const middleCfreq = Tone.Frequency("C4").toFrequency();
function playC() {
    synth.triggerAttackRelease("C4", "8n");
}

//*
function headerTextStep(){
    element = document.getElementById("introText");
    if (initialKeyPressed){
        element.style.opacity = 0;
    }
}
//*/