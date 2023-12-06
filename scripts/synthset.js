console.log("Starting JavaScript");
const synth = new Tone.PolySynth(Tone.Synth).toDestination();
var adsr = [.1, 1, .5, 1];
//*
var initialKeyPressed = false;
const stepsToWaitBeforeFadingHeaderText = 10;
var stepsSinceInitialKeyPressed = 0;
var doneWaitingBeforeFadingHeaderText = false;
var headerTextOpacity = 1;
var doneFadingHeaderText = false;
//*/
synth.set({
    "filter" : {
        "type" : "lowpass",
    },
	"envelope" : {
		"attack" : adsr[0],
        "decay": adsr[1],
        "sustain": adsr[2],
        "release": adsr[3],
	}
});
const now = Tone.now();