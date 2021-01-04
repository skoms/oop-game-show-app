/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */
class Phrase {
    constructor( phrase ) {
        this.phrase = phrase.toLowerCase();
    }

    /**
     * Adds letter placeholders to the display when the game starts
     */
    addPhraseToDisplay() {
        const phraseDivUl = document.querySelector('#phrase ul');
        let phraseHTML = ``;

        for (let i = 0; i < this.phrase.length; i++) {
            const letter = this.phrase[i];
            if( letter === ' ' ) {
                phraseHTML += `<li class="space"> </li>`;
            } else {
                phraseHTML += `<li class="hide letter ${letter}">${letter}</li>`;
            }
        }

        phraseDivUl.innerHTML = phraseHTML;
    }

    /**
     * Checks whether or not chosen letter is in the phrase
     * @param { string } letter - Letter chosen by the player
     * @returns { boolean } - Whether or not it includes the letter
     */
    checkLetter( letter ) {
        return this.phrase.includes(letter) && letter !== ' ';
    }
}