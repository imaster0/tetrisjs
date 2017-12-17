document.addEventListener('keydown', function(event) {
    if(!gameOver){
        if(event.keyCode == 37) {
            if(gameBoard.figure != null && gameBoard.figureCanMove(-1))
                gameBoard.figure.blocks.x -= BLOCK_SIZE;
        }
        else if(event.keyCode == 39) {
            if(gameBoard.figure != null && gameBoard.figureCanMove(1))
                gameBoard.figure.blocks.x += BLOCK_SIZE;
        }
        else if(event.keyCode == 38){
            if(gameBoard.figure != null && gameBoard.figureCanRotate())
                gameBoard.figure.rotate();
        }
        else if(event.keyCode == 40){
            gameSpeed = 800;
        }
    }
});

document.addEventListener('keyup', function(event){
    if(event.keyCode == 40){
        gameSpeed = 60;
    }
});