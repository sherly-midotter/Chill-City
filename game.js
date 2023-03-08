// Define variables
const words = [
    'noms',
    'lil bro',
    'shuk',
    'pdash'
];

let word = "";
let hiddenWord = "";
let guesses = [];
let maxGuesses = 6;

// Generate random word from list
function getWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// Create hidden word with underscores
function createHiddenWord(word) {
    let hidden = "";
    for (let i = 0; i < word.length; i++) {
        hidden += "_";
    }
    return hidden;
}

// Update word with guessed letters
function updateWord(letter) {
    let indices = [];
    for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) {
            indices.push(i);
        }
    }
    if (indices.length === 0) {
        maxGuesses--;
    } else {
        indices.forEach(index => {
            hiddenWord = hiddenWord.substring(0, index) + letter + hiddenWord.substring(index + 1);
        });
    }
    if (hiddenWord === word) {
        document.querySelector('.guess').textContent = "You win!";
        document.querySelector('.buttons').innerHTML = "";
    }
    if (maxGuesses === 0) {
        document.querySelector('.guess').textContent = "You lose! The word was " + word + ".";
        document.querySelector('.buttons').innerHTML = "";
    }
    document.querySelector('.word').textContent = hiddenWord;
    document.querySelector('.guess').textContent = "Guesses left: " + maxGuesses;
}

// Add buttons for each letter of the alphabet
function renderButtons() {
    for (let i = 65; i <= 90; i++) {
        let letter = String.fromCharCode(i).toLowerCase();
        let button = document.createElement('button');
        button.classList.add('button');
        button.textContent = letter;
        button.addEventListener('click', function() {
            if (!guesses.includes(letter)) {
                guesses.push(letter);
                button.classList.add('disabled');
                button.disabled = true;
                updateWord(letter);
            }
        });
        document.querySelector('.buttons').appendChild(button);
    }
}

// Initialize game
function init() {
    word = getWord();
    hiddenWord = createHiddenWord(word);
    document.querySelector('.word').textContent = hiddenWord;
    document.querySelector('.guess').textContent = "Guesses left: " + maxGuesses;
    renderButtons();
}

init();
