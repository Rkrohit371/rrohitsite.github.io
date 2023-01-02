const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

console.log(randomNum);
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start recognition and game
recognition.start();

// Capture user voice
function onSpeak(e) {
    const msg = e.results[0][0].transcript;

    writeMessage(msg);
    checkNumber(msg);
}

// Write what user speak
function writeMessage(msg) {
    // console.log(msg);
    msgEl.innerHTML = `
    <div>You Said: </div>
    <span class="box">${msg}</span>
    `;
}

// Check message against number
function checkNumber(msg) {
    const num = +msg;

    // Check if it is a valid number
    if(Number.isNaN(num)) {
        msgEl.innerHTML += '<div>That is not a valid number</div>';
        return 
    }

    // Check the range
    if (num > 100 || num < 1) {
        msgEl.innerHTML += '<div>Number must be between 1 and 100</div>';
        return ;
    }

    // Check Number
    if(num === randomNum) {
        document.body.innerHTML = `
        <h2>Congrats! You have guessed the number!</<br><br>
        It was ${num}</h2>
        <button class="play-again" id="play-again">Play Again</button>
        `;
    } else if(num >= randomNum) {
        msgEl.innerHTML += '<div>GO LOWER</div>';
    } else {
        msgEl.innerHTML += '<div>GO Higher</div>';
    }
}

// Generate random number
function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1; 
}

// Speak result
recognition.addEventListener('result', onSpeak);

// End SpeechRecognition service
recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', (e) => {
    if(e.target.id == 'play-again') {
        window.location.reload();
    }
});