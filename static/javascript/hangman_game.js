const wordEl = document.getElementById('word');

const wrongLetterEl = document.getElementById('wrong-letters');

const playAgainBtn = document.getElementById('play-button');

const popup = document.getElementById('popup');

const notification = document.getElementById('notification-container');

const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'happy', 'python','javascript','enter', 'computer', 'keyboard', 'mouse', 'run', 'mobile', 'laptop', 'program', 'money' ,'corona', 'india'];

let selectedWord = words[Math.floor(Math.random() * words.length )];

const correctLetters = [];
const wrongLetters = [];

function displayWord() {
    wordEl.innerHTML = `
    ${selectedWord.split('').map(letter => `
    <span class="letter">
        ${correctLetters.includes(letter) ? letter : ''}
    </span>
    `).join('')}
    `;
    const innerWord = word.innerText.replace(/\n/g,'');
    if(innerWord === selectedWord) {
        finalMessage.innerText = 'Congratulations! You won 😀😀';
        popup.style.display = 'flex';
    }
}

function updateWrongLetterEl() {
    wrongLetterEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    figureParts.forEach((parts, index) => {
        const errors = wrongLetters.length;

        if(index < errors){
            parts.style.display = 'block';
        } else {
            parts.style.display = 'none';
        }
    });

    if(wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'You Lost! Try Again. 😥😥';
        popup.style.display = 'flex';
    }
}

function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.remove('show')
    }, 2000);
}

window.addEventListener('keydown', e => {
    if(e.keyCode >= 65 && e.keyCode <= 90){
        const letter = e.key;

        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);

                displayWord()
            } else {
                showNotification();
            }
        } else {
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
            
                updateWrongLetterEl();
            } else {
                showNotification()
            }
        }
    }
});

playAgainBtn.addEventListener('click', () => {
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    updateWrongLetterEl();

    popup.style.display = 'none';
});

displayWord();