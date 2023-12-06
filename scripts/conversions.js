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

// Array logic:

function removeElementByIndex(array, i){
    tempElement = array[0];
    array[0] = array[i];
    array[i] = tempElement;
    array.shift();
}

function removeElementByContent(array, thing){
    for (var i = array.length - 1; i >= 0; i--) {
        if (array[i] === thing) {
            array.splice(i, 1);
        }
    }
}