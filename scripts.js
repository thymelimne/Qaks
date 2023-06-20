console.log("Starting JavaScript");
const synth = new Tone.PolySynth(Tone.Synth).toDestination();
var adsr = [.01, .02, .5, .8];
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
        "type" : "highpass",
    },
	"envelope" : {
		"attack" : adsr[0],
        "decay": adsr[1],
        "sustain": adsr[2],
        "release": adsr[3],
	}
});
const now = Tone.now();
const middleCfreq = Tone.Frequency("C4").toFrequency();
keynotes = {
    "1":"C4",
    "q":"C#4",
    "2":"D4",
    "w":"D#4",
    "3":"E4",
    "e":"F4",
    "4":"F#4",
    "r":"G4",
    "5":"G#4",
    "t":"A4",
    "6":"A#4",
    "y":"B4",
    "7":"C5",
    "u":"C#5",
    "8":"D5",
    "i":"D#5",
    "9":"E5",
    "o":"F5",
    "0":"F#5",
    "p":"G5",
    "-":"G#5",
    "[":"A5",
    "=":"A#5",
    "]":"B5",
    "Backspace":"C6",
    "\\":"C#6",

    "'":"C4",
    "/":"B3",
    ";":"Bb3",
    ".":"A3",
    "l":"Ab3",
    ",":"G3",
    "k":"Gb3",
    "m":"F3",
    "j":"E3",
    "n":"Eb3",
    "h":"D3",
    "b":"Db3",
    "g":"C3",
    "v":"B2",
    "f":"Bb2",
    "c":"A2",
    "d":"Ab2",
    "x":"G2",
    "s":"Gb2",
    "z":"F2",
    "a":"Fb2"
};

function playC() {
    synth.triggerAttackRelease("C4", "8n");
}

function playNote(note) {
    synth.triggerAttack(note, Tone.context.currentTime);
    synth.triggerRelease(note, Tone.context.currentTime+.1);
}

document.addEventListener("keydown", function(e){
    console.log("keydown");
    note = keynotes[e.key];
    playNote(note);
    drawNote(note);
});

document.addEventListener("DOMContentLoaded", function() {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d")
    circles = [];
    animate();
});

//*
function headerTextStep(){
    element = document.getElementById("introText");
    if (initialKeyPressed){
        stepsSinceInitialKeyPressed = stepsSinceInitialKeyPressed + 1;
        if (stepsSinceInitialKeyPressed > stepsToWaitBeforeFadingHeaderText){
            doneWaitingBeforeFadingHeaderText = true;
        }
        if (doneWaitingBeforeFadingHeaderText){
            headerTextOpacity = .01;
        }f
    }
    if (headerTextOpacity <= 0){
        doneFadingHeaderText = true;
    }
    element.style.opacity = headerTextOpacity;
}
//*/

//---------------
// Conversions:

function note2value(note){
    value = Math.log2(Tone.Frequency(note).toFrequency() / middleCfreq);
    return value;
}

function note2freq(note){
    freq = Tone.Frequency(note).toFrequency();
    return freq;
}

function freq2value(freq){
    value = Math.log2(freq / middleCfreq);
    return value;
}

function freq2note(freq){
    note = Tone.Frequency(tone.frequencyToMidi(freq), "midi").toNote();
    return note;
}

function arduinoMap(x, in_min, in_max, out_min, out_max) {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}  

function removeElement(array, i){
    tempElement = array[0];
    array[0] = array[i];
    array[i] = tempElement;
    array.shift();
}

//--------------------
// Visual display:

var canvas;
var ctx;
var circles;

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circlesStep();
    headerTextStep();
    window.requestAnimationFrame(animate);
}

function circlesStep(){
    for (var i=0; i<circles.length; i++){
        circle = circles[i]
        if (circle.age > 200){
            removeElement(circles, i);
        }
        if (circles.length > 0){
            drawCircle(circles[i]);
            ageCircle(i);
        }
    }
}

function ageCircle(i){
    circles[i].age = circles[i].age + 1;
    circleRadius(i);
    circleOpacity(i);
}

function circleRadius(i){
    circles[i].radius = 10 + circles[i].age;
}

function circleOpacity(i){
    if (circles[i].age > 20) {
        circles[i].opacity = 1 / (circles[i].age + 1);
    }
    
}

function drawNote(note){
    value = note2value(note);
    distFromCenter = getDistFromCenter(value);
    loc = placeOnCircle(distFromCenter, [ctx.canvas.width/2,ctx.canvas.height/2], value);
    radius = ctx.canvas.height/27;
    color = "#FF0000"
    color = getColorFromNote(value)
    var circle = {
        radius: radius,
        loc: loc,
        color: color,
        age: 0,
        opacity: 1,
    };
    circles.push(circle);
}

function drawCircle(circle){
    ctx.globalAlpha = circle.opacity;
    ctx.beginPath();
    ctx.arc(circle.loc[0], circle.loc[1], circle.radius, 0, 2*Math.PI, false);
    ctx.fillStyle = circle.color
    ctx.fill();
    ctx.globalAlpha = 1;
}

function placeOnCircle(distFromCenter, centerLoc, value){
    x = Math.floor(centerLoc[0] + distFromCenter * Math.cos((2*Math.PI) * (value - 1/4)));
    y = Math.floor(centerLoc[1] + distFromCenter * Math.sin((2*Math.PI) * (value - 1/4)));
    loc = [x, y];
    return loc;
}

function getDistFromCenter(noteValue){
    distFromCenter = .3*ctx.canvas.height - noteValue * .05*ctx.canvas.height;
    return distFromCenter;
}

function getColorFromNote(noteValue, highestColor="#FF0000", octaves=6, highestNote=2){
    spinValue = (highestNote-noteValue)/octaves
    spinDegrees = spinValue * 360;
    newColor = tinycolor(highestColor).spin(spinDegrees);
    return newColor;
}
