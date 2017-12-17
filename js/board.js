class Board{
    constructor(){
        this.obj = new PIXI.Container();
        foreground.addChild(this.obj);   

        for(let i = 0; i < 20; i++){
            for(let j = 0; j < 10; j++){
                let backgroundBlock = new PIXI.Sprite.fromImage("assets/background.png");
                backgroundBlock.x = j*BLOCK_SIZE;
                backgroundBlock.y = i*BLOCK_SIZE;
                backgroundBlock.width = backgroundBlock.height = BLOCK_SIZE;
                background.addChild(backgroundBlock);
            }
        }
    }


    figureCanRotate(){
        let pomFigure = new Figure(this.figure.id);
        pomFigure.blocks.x = this.figure.blocks.x;
        pomFigure.blocks.y = this.figure.blocks.y;
        
        for(let i = 0; i < this.figure.rotation+1; i++){
            pomFigure.rotate();
        }

        for(let i = 0; i < pomFigure.blocks.children.length; i++){

            if(pomFigure.blocks.x + pomFigure.blocks.children[i].x >= 320 || 
               pomFigure.blocks.x + pomFigure.blocks.children[i].x < 0   ||
               pomFigure.blocks.y + pomFigure.blocks.children[i].y >= 576) 
                return false;

            for(let j = 0; j < this.obj.children.length - 1; j++){
                
                for(let k = 0; k < this.obj.children[j].children.length; k++){
                    if(pomFigure.blocks.x + pomFigure.blocks.children[i].x == this.obj.children[j].x + this.obj.children[j].children[k].x &&
                       pomFigure.blocks.y + pomFigure.blocks.children[i].y == this.obj.children[j].y + this.obj.children[j].children[k].y){
                            return false;
                       }
                }
            }
        }

        return true;
    }

    // (left/right)
    figureCanMove(dirX){
        for(let i = 0; i < this.figure.blocks.children.length; i++){
            let newPosX = this.figure.blocks.children[i].x + this.figure.blocks.x + dirX*BLOCK_SIZE;
            if(newPosX < 0 || newPosX >= app.renderer.width) return false;

            for(let j = 0; j < this.obj.children.length; j++){
                if(this.figure.blocks != this.obj.children[j]) 
                    for(let k = 0; k < this.obj.children[j].children.length; k++){  
                        if(this.figure.blocks.y + this.figure.blocks.children[i].y == this.obj.children[j].y + this.obj.children[j].children[k].y &&
                            this.figure.blocks.x + this.figure.blocks.children[i].x + dirX*BLOCK_SIZE == this.obj.children[j].x + this.obj.children[j].children[k].x){
                            return false;
                        }
                    }
            }
        }
        return true;
    }

    figureLanded(){
       
        if(this.figure == null) return false;
       
        for(let i = 0; i < this.figure.blocks.children.length; i++){

            if(this.figure.blocks.y + this.figure.blocks.getChildAt(i).y + BLOCK_SIZE >= app.renderer.height){
                return true;
            }

            for(let j = 0; j < this.obj.children.length; j++){
                
                if(this.figure.blocks != this.obj.children[j]) 
                    for(let k = 0; k < this.obj.children[j].children.length; k++){  
                        if(this.figure.blocks.y < this.obj.children[j].y + this.obj.children[j].children[k].y && this.figure.blocks.y + this.figure.blocks.children[i].y + BLOCK_SIZE >= this.obj.children[j].y + this.obj.children[j].children[k].y &&
                            this.figure.blocks.x + this.figure.blocks.children[i].x == this.obj.children[j].x + this.obj.children[j].children[k].x){
                            return true;
                        }
                    }
            }
        }
        
        return false;
    }

    //count score & delete filled rows
    countScore(){
        let count;
  
        for(let i = 0; i*BLOCK_SIZE < app.renderer.height; i++){
            count = 0;
            for(let j = 0; j < this.obj.children.length; j++)
                for(let k = 0; k < this.obj.children[j].children.length; k++)
                    if(this.obj.children[j].y + this.obj.children[j].children[k].y == i*BLOCK_SIZE) count++;
            
            if(count*BLOCK_SIZE == app.renderer.width){
                
                for(let j = 0; j < this.obj.children.length; j++){
                    for(let k = 0; k < this.obj.children[j].children.length; k++){
                        if(this.obj.children[j].y + this.obj.children[j].children[k].y == i*BLOCK_SIZE) 
                            this.obj.children[j].removeChildAt(k--);
                    }
                }

                for(let j = 0; j < this.obj.children.length; j++){
                    for(let k = 0; k < this.obj.children[j].children.length; k++)
                        if(this.obj.children[j].y + this.obj.children[j].children[k].y < i*BLOCK_SIZE)  
                            this.obj.children[j].children[k].y += BLOCK_SIZE;
                }

                gameScore += 100; // 100 points per row
            }
        }
    }

    
    addNewFigure(_figure){
        this.figure = _figure;
        this.obj.addChild(this.figure.blocks);
    }

    update(){
        this.figure.blocks.y += BLOCK_SIZE;
    }
}