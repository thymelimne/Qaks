document.addEventListener("DOMContentLoaded", function() {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d")
    circles = [];
    animate();
});

//--------------------
// Visual display setup:

var canvas;
var ctx;
var circles;

class Layer{
    constructor(depth, visibility, content){
        this.depth = depth;
        this.visibility = visibility;
        this.content = content;
    }
}

titleLayer = new Layer();
circlesLayer = new Layer();
menuLayer = new Layer();
keyboardLayer = new Layer();

//--------------------
// Visual display functions:

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circlesStep();
    headerTextStep();
    window.requestAnimationFrame(animate);
}

function circlesStep(circles){
    for (var i=0; i<circles.length; i++){
        circle = circles[i]
        if (circle.age > 200){
            removeElementByIndex(circles, i);
        }
        if (circles.length > 0){
            drawCircle(circles[i]);
            ageCircle(i);
        }
    }
}
circlesLayer.step = circlesStep();

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
        radius: 14,
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
