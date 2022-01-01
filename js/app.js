const game = new Game();

document.querySelector('#begin-game').addEventListener('click', function() {
    game.startGame();

    this.style.display = 'none';
    document.querySelector('#play-area').style.opacity = '1';
});

/** 
 * Listen for keyboard presses
 */
 document.addEventListener('keydown', function(event){
    game.handleKeydown(event);
});