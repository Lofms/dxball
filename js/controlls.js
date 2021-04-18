function keyDownHandler(e)  {
    if(e.key == "Right" || e.key == "ArrowRight") {
        playerPaddle.moveRight = true;
     
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        playerPaddle.moveLeft = true;
    }
}
function keyUpHandler(e)  {
    if(e.key == "Right" || e.key == "ArrowRight") {
        playerPaddle.moveRight = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        playerPaddle.moveLeft = false;
    }
    
}