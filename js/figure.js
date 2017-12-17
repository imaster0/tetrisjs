class Figure{
    
    constructor(_id){
        this.blocks = new PIXI.Container();
        this.id = _id;
        this.rotation = 0;
        this.blocks.x = 4*BLOCK_SIZE;
        this.blocks.y = -BLOCK_SIZE;

        switch(_id){
            case 0:
            this.pattern = ["#--",
                            "###"];
            this.width = 3;
            this.height = 2;
            this.color = "blue";
            break;
            case 1:
            this.pattern = ["--#",
                            "###"];
            this.width = 3;
            this.height = 2;
            this.color = "orange";
            break;
            case 2:
            this.pattern = ["##",
                            "##"];
            this.width = 2;
            this.height = 2;
            this.color = "yellow";
            break;
            case 3:
            this.pattern = ["-#-",
                            "###"];
            this.width = 3;
            this.height = 2;
            this.color = "purple";
            break;
            case 4:
            this.pattern = ["####"];
            this.width = 4;
            this.height = 1;
            this.color = "cyan";
            break;
            case 5:
            this.pattern = ["##-",
                            "-##"];
            this.width = 3;
            this.height = 2;
            this.color = "red";
            break;
            case 6:
            this.pattern = ["-##",
                            "##-"];
            this.width = 3;
            this.height = 2;
            this.color = "green";
            break;
        }

        this.create();
    }

    create(){
        for(let i = 0; i < this.height; i++){
            for(let j = 0; j < this.width; j++){
                if(this.pattern[i][j] == '#'){
                    let newBlock;
                    switch(this.color){
                        case "blue":
                        newBlock = new PIXI.Sprite.fromImage('assets/block_blue.png');
                        break;
                        case "cyan":
                        newBlock = new PIXI.Sprite.fromImage('assets/block_cyan.png');
                        break;
                        case "green":
                        newBlock = new PIXI.Sprite.fromImage('assets/block_green.png');
                        break;
                        case "orange":
                        newBlock = new PIXI.Sprite.fromImage('assets/block_orange.png');
                        break;
                        case "purple":
                        newBlock = new PIXI.Sprite.fromImage('assets/block_purple.png');
                        break;
                        case "red":
                        newBlock = new PIXI.Sprite.fromImage('assets/block_red.png');
                        break;
                        case "yellow":
                        newBlock = new PIXI.Sprite.fromImage('assets/block_yellow.png');
                        break;
                    }
                    newBlock.width = newBlock.height = BLOCK_SIZE;
                    newBlock.x = j*BLOCK_SIZE;
                    newBlock.y = i*BLOCK_SIZE;
                    this.blocks.addChild(newBlock);
                }
            }
        }
    }

    rotate(){
        let newPattern = [];
        let str = "";
        
        for(let i = 0; i < this.width; i++){
            str = "";
            for(let j = this.height-1; j >= 0; j--){
                str += this.pattern[j][i];
            }
            newPattern.push(str);
        }

        let newH = this.width;
        let newW = this.height;

        this.pattern = newPattern;
        this.width = newW;
        this.height = newH;
        this.rotation = (this.rotation + 1) % 4;
        this.blocks.removeChildren();
        this.create();
    }
}