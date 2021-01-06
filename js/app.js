const resetButton = document.getElementById('btn__reset');
const onScreenKeysDiv = document.getElementById('qwerty');

resetButton.addEventListener('click', e => {
    const game = new Game();
    game.startGame();
    onScreenKeysDiv.addEventListener('click', e => game.handleInteraction(e) );
    document.addEventListener('keydown', e => game.handleInteraction(e) );
} );

