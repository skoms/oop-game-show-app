/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
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
        if( e.target.type === 'button' ) {
            const button = e.target;
            const letter = button.textContent;
            if( !this.activePhrase.checkLetter( letter ) ) {
                button.classList.add('wrong');
                this.removeLife();
            } else {
                button.classList.add('chosen');
                this.activePhrase.showMatchedLetter( letter );
                if( this.checkForWin() ) {
                    this.gameOver();
                }
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
            const life = lives[i];
            life.innerHTML = `<img src="images/lostHeart.png" alt="Lost Heart Icon" height="35" width="30">`;
        }
        if( this.missed === 5 ) {
            this.gameOver();
        }
    }

    /**
     * Checks to see if all letters are displayed, if so return true, letting them know they won
     * @returns { boolean } - true: win, false: loss
     */
    checkForWin() {
        const hiddenLetters = document
            .querySelectorAll('.letter')
            .filter( letter => letter.classList.contains('hide'));
        return hiddenLetters.length === 0;
    }

    /**
     * Displays win/loss message and returning them to the start screen overlay
     */
    gameOver() {
        const gameOverMessage = document.getElementById('game-over-message').innerHTML;
        const overlay = document.getElementById('overlay');
        overlay.style.display = 'block';

        
        if( this.checkForWin()) {
            gameOverMessage = 'Congratulations, you won!';
            overlay.className = 'win';
        } else {
            gameOverMessage = 'Sorry, you lost...';
            overlay.className = 'lose';
        }
    }
}