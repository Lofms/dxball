function collision(ball,gameElement,gameLoop,playerPaddle,bricks) {
    if(ball.startX + ball.speedX > gameElement.width-ball.radius || ball.startX + ball.speedX < ball.radius) {
        ball.speedX = -ball.speedX;
    }
    if(ball.startY + ball.speedY < ball.radius) {
        ball.speedY = -ball.speedY;
    } else if(ball.startY + ball.speedY > gameElement.height-ball.radius) {
        if(ball.startX > playerPaddle.x && ball.startX < playerPaddle.x + playerPaddle.width) {
            console.log(((ball.startX-playerPaddle.x)-(playerPaddle.width/2))/10)
            ball.speedY = -ball.speedY;
            if(((ball.startX-playerPaddle.x)-(playerPaddle.width/2))/10 < 0){
                ball.speedX = ball.speedX +((ball.startX-playerPaddle.x)-(playerPaddle.width/2))/10
            }else{
                ball.speedX = ball.speedX +((ball.startX-playerPaddle.x)-(playerPaddle.width/2))/10
            }
            ball.speedX = ball.speedX
        }
        else {
    
        alert("GAME OVER");
        document.location.reload();
        clearInterval(gameLoop); 
        }
    }
    for (var i = 0;i < bricks.length;i++){
        
        let brick = bricks[i]
        if (ball.startX > brick.x+ball.radius && ball.startX < brick.x+brick.width+ball.radius && ball.startY > brick.y+ball.radius && ball.startY < brick.y+brick.height+ball.radius ||
            ball.startX > brick.x-ball.radius && ball.startX < brick.x+brick.width-ball.radius && ball.startY > brick.y-ball.radius && ball.startY < brick.y+brick.height-ball.radius
            ){
            ball.speedY = -ball.speedY
            brick.health--
            bricks = bricks.filter(b => b.health >= 1);    
        }


    }
    return bricks
}