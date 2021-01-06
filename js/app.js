const resetButton = document.getElementById('btn__reset');
const onScreenKeysDiv = document.getElementById('qwerty');

const game = new Game();

resetButton.addEventListener('click', e => game.startGame() );

onScreenKeysDiv.addEventListener('click', e => game.handleInteraction(e) );

document.addEventListener('keydown', e => game.handleInteraction(e) );