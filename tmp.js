// (c) 2020

var mediaRecorder = [];
var chunks = [];

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    console.log('getUserMedia supported.');
    navigator.mediaDevices.getUserMedia(
        // constraints - only audio needed for this app
        {
            audio: true
        })

        // Success callback
        .then(function (stream) {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.ondataavailable = function (e) {
                chunks.push(e.data);
            }

            mediaRecorder.onstop = function (e) {
                console.log("recorder onStop called");

                const clipName = prompt('Enter a name for your sound clip');

                const clipContainer = document.createElement('article');
                const clipLabel = document.createElement('p');
                const audio = document.createElement('audio');
                const deleteButton = document.createElement('button');

                clipContainer.classList.add('clip');
                audio.setAttribute('controls', '');
                deleteButton.innerHTML = "Delete";
                clipLabel.innerHTML = clipName;

                clipContainer.appendChild(audio);
                clipContainer.appendChild(clipLabel);
                clipContainer.appendChild(deleteButton);
                soundClips.appendChild(clipContainer);

                const blob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' });
                chunks = [];
                const audioURL = window.URL.createObjectURL(blob);
                audio.src = audioURL;

                deleteButton.onclick = function (e) {
                    let evtTgt = e.target;
                    evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
                }
            }

        })

        // Error callback
        .catch(function (err) {
            console.log('The following getUserMedia error occured: ' + err);
        }
        );
} else {
    console.log('getUserMedia not supported on your browser!');
}

function record() {
    mediaRecorder.start();
    console.log(mediaRecorder.state);
    console.log("recorder started");
}


function stop() {
    console.log(mediaRecorder.state);
    mediaRecorder.stop();
    console.log(mediaRecorder.state);
    console.log("recorder stopped");
}
