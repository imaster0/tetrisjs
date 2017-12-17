var app = new PIXI.Application(320, 576, {backgroundColor: 0xfffff0});
document.body.appendChild(app.view);

const BLOCK_SIZE = 32;

//global game elements
var gameBoard, gameScore, scoreText, gameOver, gameSpeed, gameSpeedBoost, countFrames;

var foreground = new PIXI.Container();
var background = new PIXI.Container();
app.stage.addChild(background);
app.stage.addChild(foreground);


function start(){
    gameScore = 0;
    gameOver = false;
    gameSpeed = 60, gameSpeedBoost = 0, countFrames = 0;
    
    let tetrisText = new PIXI.Text('TETRIS', {fontFamily : 'Arial Black', fontSize: 64, fill : "black", align : 'center'});
    let startBtn = new PIXI.Text('start', {fontFamily : 'Arial', fontSize: 32, fill : "black", align : 'center'});
    
    tetrisText.anchor.set(0.5);
    startBtn.anchor.set(0.5);
    
    startBtn.interactive = true;
    startBtn.buttonMode = true;
    
    //startBtn events
    startBtn.on('mouseover', function(){
        startBtn.style = {fontFamily : 'Arial', fontSize: 32, fill : "grey", align : 'center'};
    });

    startBtn.on('mouseout', function(){
        startBtn.style = {fontFamily : 'Arial', fontSize: 32, fill : "black", align : 'center'};
    });

    startBtn.on('click', function(){
        tetrisText.destroy();
        startBtn.destroy();

        gameBoard = new Board();
        gameBoard.addNewFigure(new Figure(2));
        scoreText = new PIXI.Text('score: ' + gameScore, {fontFamily : 'Arial', fontSize: 20, fill : "black", align : 'center'});
        scoreText.anchor.set(0.5, 0);
        scoreText.x = app.renderer.width/2;
        foreground.addChild(scoreText);
        update();
    });

    tetrisText.x = app.renderer.width/2;
    tetrisText.y = app.renderer.height/4;
    startBtn.x = app.renderer.width/2;
    startBtn.y = app.renderer.height/2;
    foreground.addChild(tetrisText);
    foreground.addChild(startBtn);
}


function update(){
    scoreText.text = 'score: ' + gameScore;

    if(countFrames >= 900/(gameSpeed+gameSpeedBoost)){
        if(gameBoard.figureLanded() && gameBoard.figure.blocks.y < 0){
            //GAMEOVER
            let gmOver = new PIXI.Text('Game Over',{fontFamily : 'Arial', fontSize: 62, fill : "black", align : 'center'});
            gmOver.anchor.set(0.5);
            scoreText.anchor.set(0.5);
            
            gmOver.x = app.renderer.width/2;
            gmOver.y = app.renderer.height/2;
            scoreText.x = app.renderer.width/2;
            scoreText.y = app.renderer.height/2 - 2*BLOCK_SIZE;
            scoreText.style.fontSize = 32;
            
            foreground.addChild(gmOver);
            gameOver = true;
            return;
        }

        if(gameBoard.figureLanded()){
            gameBoard.countScore();
            gameBoard.addNewFigure(new Figure(Math.floor(Math.random()*7)));
        }
        else gameBoard.update();
        
        
        gameSpeedBoost += 0.2;
        countFrames = 0;
    }

    countFrames++;
    setTimeout(update, 1000/30);
}

start();