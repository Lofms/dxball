
function start() {

const gameElement = document.getElementById('gameContainer'); // elementet som jag ritar i

const draw = gameElement.getContext('2d'); // genom att hålla denna metod i en variabel slipper jag ange första argumentet 2d varje gång jag ska rita något

let bricks = [];

class Brick {
    constructor(health,width) {
        this.colors = ['#fda2a2','#fb7777','#fb5757','#fb2f2f','#f90000']
        this.health = health;
        this.width = width;
        this.height = 15;
        this.padding = 10;
        this.brickOffsetTop = 30;
        this.brickOffsetleft = 30;
        this.draw = function(i,paddingLeftMultiplyer,row) {
            draw.beginPath();
            if(this.x){
                draw.rect(this.x, this.y, this.width, this.height);
            }else{
                draw.rect((this.padding+this.width) * paddingLeftMultiplyer,(this.height + this.padding)*row,this.width,this.height);
            }
            if(!this.x && !this.y){
                this.x = (this.padding+this.width) * paddingLeftMultiplyer;
                this.y = (this.height + this.padding)*row;
            }      

            draw.fillStyle = this.colors[this.health];
            draw.fill();
            draw.closePath;
        }
    }
}

const playerPaddle = {
    height : 10,
    width : 80,
    moveRight : false,
    moveLeft : false,
    movementSpeed : 2,
    draw : function () {
        draw.beginPath();
        draw.rect(playerPaddle.x, (gameElement.height-this.height), this.width, this.height);
        draw.fillStyle = "#0095DD";
        draw.fill();
        draw.closePath();
        playerPaddle.controlls();
    },
    controlls : function(){
        if(this.moveRight) {
            playerPaddle.x += this.movementSpeed;
            if (playerPaddle.x + this.width > gameElement.width){
                playerPaddle.x = gameElement.width - this.width;
                
            }
        }
        else if(this.moveLeft) {
            playerPaddle.x -= this.movementSpeed;
            if (playerPaddle.x < 0){
                playerPaddle.x = 0;
            }
        }
    },
    keyDownHandler : function(e) {
        if(e.key == "Right" || e.key == "ArrowRight") {
            playerPaddle.moveRight = true;
        }
        else if(e.key == "Left" || e.key == "ArrowLeft") {
            playerPaddle.moveLeft = true;
        }
    },
    keyUpHandler : function(e) {
        if(e.key == "Right" || e.key == "ArrowRight") {
            playerPaddle.moveRight = false;
        }
        else if(e.key == "Left" || e.key == "ArrowLeft") {
            playerPaddle.moveLeft = false;
        }

    }
}
    
playerPaddle.x = (gameElement.width - playerPaddle.width) / 2 


document.addEventListener("keydown", playerPaddle.keyDownHandler, false);
document.addEventListener("keyup", playerPaddle.keyUpHandler, false);

const ball = {
    radius : 10,
    start : 0,
    end : Math.PI*2,
    posistion : [
        240,
        160
    ],
    color : "#0095DD",
    startX : gameElement.width/2,
    startY : gameElement.height-30,
    speedX : 2,
    speedY : -2,
    draw : function () {
        draw.beginPath();
        draw.arc(this.startX, this.startY, this.radius, this.start, this.end);
        draw.fillStyle = this.color;
        draw.fill();
        draw.closePath();
        this.startX += this.speedX;
        this.startY += this.speedY;
    }
};

function drawScore() {
    draw.font = "16px Arial";
    draw.fillStyle = "#0095DD";
    draw.fillText("You win", 8, 20);
    clearInterval(gameLoop); 
}

function updateFrame() {
    draw.clearRect(0, 0, gameElement.width, gameElement.height);
    playerPaddle.draw();
    drawbricks();
    playerPaddle.controlls();
    ball.draw();
    bricks = collision(ball,gameElement,gameLoop,playerPaddle,bricks);

    if (bricks.length === 0){
        drawScore()
    }
};
for (var i = 0,health=1;i < 12;i++){
    const newBrick = new Brick(health,75)
    if (health > 4){health = 1}else{health++}
    bricks.push(newBrick);
}

function drawbricks(){

    for (var i = 0, ii = 0,row = 1,brickInRow = 1;i < bricks.length;i++,brickInRow++){
        if ((bricks[i].padding+bricks[i].width) * brickInRow + bricks[i].width > gameElement.width){
            row++
            brickInRow = 1
        }
        bricks[i].draw(i,brickInRow,row)
    }
}

const gameLoop = setInterval(updateFrame, 10);
};




window.onload = function() {
    start();
};

