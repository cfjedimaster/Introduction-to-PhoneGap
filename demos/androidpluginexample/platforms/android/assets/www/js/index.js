document.addEventListener("deviceready", deviceready, false);
var input;

function fail(e) {
    console.log(e);
}

function deviceready() {
    input = document.querySelector("#ttsinput");

    window.plugins.tts.startup(speakReady, fail);
}

function speakReady() {
    window.plugins.tts.speak("The TTS service is ready", function() {

        var btn = document.querySelector("#speakButton");

        btn.addEventListener("touchstart", function(e) {
            e.preventDefault();
            var text = input.value;

            window.plugins.tts.speak(text, function() {}, fail);

        });

    }, fail);

}