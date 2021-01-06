class Game {
    constructor() {
        this.missed = 0;
        this.phrases = [
            new Phrase('Good night'), 
            new Phrase('Fed with a silver spoon'), 
            new Phrase('Bullshitography'), 
            new Phrase('It is what it is'), 
            new Phrase('Look what the cat dragged in')
        ];
        this.activePhrase = null;
    }

    /**
     * Hides the start screen overlay, gets a random new phrase to update the activePhrase property and displays it
     */
    startGame() {
        // Initializing part
        document.getElementById('overlay').style.display = 'none';
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
    }
 
    /**
     * Gets a random phrase Object from 'phrases' and returns it 
     * @returns { object } - phrase Object
     */
    getRandomPhrase() {
        return this.phrases[ Math.floor( Math.random() * this.phrases.length ) ];
    }

    /**
     * Controls game logic, listens for buttons and matches letters, and takes action depending on whether it was correct or not
     * @param { event } e - the event to handle
     */
    handleInteraction( e ) {
        const handle = ( button ) => {
            const letter = button.textContent;
            if( !this.activePhrase.checkLetter( letter ) ) {
                button.classList.add('wrong');
                button.disabled = true;
                this.removeLife();
            } else {
                button.classList.add('chosen');
                button.disabled = true;
                this.activePhrase.showMatchedLetter( letter );
                if( this.checkForWin() ) {
                    this.gameOver();
                }
            }
        }
        if( e.target.tagName === 'BUTTON' && !e.target.disabled ) {
            const button = e.target;
            handle( button);
        }
        if( e.type === 'keydown' ) {
            const keys = [...document.querySelectorAll('.key')];
            const button = keys.find( key => key.textContent === e.key );
            /* Checks whether the key pressed is valid before checking if disabled, as that would return an error */
            if( keys.some( key => key.textContent === e.key ) && !button.disabled ) {
                handle( button );
            }
        }
    }

    /**
     * Removes a life from the scoreboard
     */
    removeLife() {
        const lives = document.querySelectorAll('.tries');
        this.missed++;
        for (let i = 0; i < this.missed; i++) {
            if( this.missed !== 0 ) {
                const life = lives[i];
                life.innerHTML = `<img src="images/lostHeart.png" alt="Lost Heart Icon" height="45" width="45">`;
            }
        }
        // Switch Case to change the backround color according to the remaining lives
        switch( this.missed ){
            case 1:
                document.body.style.backgroundColor = '#A7C758';
                break;
            case 2:
                document.body.style.backgroundColor = '#C7B058';
                break;
            case 3:
                document.body.style.backgroundColor = '#C77958';
                break;
            default:
                document.body.style.backgroundColor = '#C7586F';
                break;
        }

        if( this.missed === 5 ) {
            this.gameOver();
        }
    }

    /**
     * Checks to see if all letters are displayed, if so return true, letting them know they won
     * @returns { boolean } - true: win, false: loss
     */
    /* 
    Looked up about nodeLists and got inspired from here: 
    https://stackoverflow.com/questions/32765157/filter-or-map-nodelists-in-es6 
    */
    checkForWin() {
        const letters = document.querySelectorAll('.letter');
        const hiddenLetters = [...letters].filter( letter => letter.classList.contains('hide'));
        return hiddenLetters.length === 0;
    }

    /**
     * Displays win/loss message and returning them to the start screen overlay
     */
    gameOver() {
        const gameOverMessage = document.getElementById('game-over-message');
        const overlay = document.getElementById('overlay');
        overlay.style.display = 'block';

        if( this.checkForWin()) {
            gameOverMessage.textContent = `Congratulations, you won! The phrase was '${this.activePhrase.phrase}'`;
            overlay.className = 'win';
        } else {
            gameOverMessage.textContent = `Sorry, you lost... The phrase was '${this.activePhrase.phrase}'`;
            overlay.className = 'lose';
        }

        // Resetting previous game
        [...document.querySelectorAll('.tries')].forEach( life => life.innerHTML = `<img src="images/liveHeart.png" alt="Heart Icon" height="45" width="45">`); // Resets hearts
        document.querySelector('#phrase ul').innerHTML = ''; // Resets onscreen phrase
        [...document.querySelectorAll('.key')].forEach( key => {
            if( key.classList.contains('chosen') ) {
                key.classList.remove('chosen');
                key.disabled = false;
            } else if( key.classList.contains('wrong') ) {
                key.classList.remove('wrong');
                key.disabled = false;
            }
        }); // Resets all the classes for the onscreen keyboard
        document.body.style.backgroundColor = '#6FC758'; // resets the background color
        this.missed = 0; // Resets lives
    }
}