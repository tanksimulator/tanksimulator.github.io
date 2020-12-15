var cvs = document.getElementById("cvs");
var ctx = cvs.getContext("2d");

cvs.width = window.innerWidth;
cvs.height = window.innerHeight;

var x = cvs.width/2;
var y = cvs.height/2;

var playerWidth = 100;
var playerHeight = 100;

var playerSpeed = 3;

var rightPressed = false;
var leftPressed = false;

var jumpPressed = false;
var jumpCount = 0;
var jumpLength = 50;
var jumpHeight = 0;

var gravitation = 10;

var dx = 0;
var num = 0;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var audioTankStopped = new Audio('audio/tankstopped.mp3');
var audioTankMove = new Audio('audio/tankmove.mp3');



var tank = new Image();
tank.src = "img/tank.png";

var tankStoped = new Image();
tankStoped.src = "img/tankstop.png";

function keyDownHandler(e){
	window.open('http://images.retinex.net/archive/image315965.png');
    if(e.keyCode == 39 || e.keyCode == 68) {
        rightPressed = true;

    }
    else if(e.keyCode == 37 || e.keyCode == 65) {
        leftPressed = true;
    }
    if(e.keyCode == 32){
		  jumpPressed = true;
		}
}

function keyUpHandler(e){
    if(e.keyCode == 39 || e.keyCode == 68) {
        rightPressed = false;
    }
    else if(e.keyCode == 37 || e.keyCode == 65) {
        leftPressed = false;
    }
}

function clearCanvas(){
	ctx.clearRect(0, 0, cvs.width, cvs.height);
}

function player(){
	if (rightPressed || leftPressed){
		ctx.drawImage(tank, dx, 0, 274, 77, x - playerWidth/2, y - playerHeight/2-jumpHeight, 274, 77);
		if (num >= 10) {
			dx = (dx === 1644  ? 0 : dx + 274);
			num = 0;
		}
	}
	else {
		ctx.drawImage(tankStoped, dx, 0, 274, 77, x - playerWidth/2, y - playerHeight/2-jumpHeight, 274, 77);
		if (num >= 10) {
			dx = (dx === 1644  ? 0 : dx + 274);
			num = 0;
		}
	}
	num += 1;



	if(rightPressed){
    	x += playerSpeed;
	}
	else if(leftPressed){
    	x -= playerSpeed;
	}
	if(jumpPressed){
    	jumpCount++;
    	jumpHeight = 4*jumpLength*Math.sin(Math.PI*jumpCount/jumpLength);
  	}
	if(jumpCount>jumpLength){
    	jumpCount=0;
    	jumpPressed=false;
    	jumpHeight=0;
	}
}
function audios() {
	if (rightPressed || leftPressed){
		audioTankMove.play();
  		if(audioTankMove.currentTime >= audioTankMove.duration - 0.25){
    		audioTankMove.currentTime = 0;
    		audioTankMove.play();
  		}
	}
	else if (rightPressed == false && leftPressed == false){
		audioTankStopped.play();
		if(audioTankStopped.currentTime >= audioTankStopped.duration - 0.3){
    		audioTankStopped.currentTime = 0;
    		audioTankStopped.play();
  		}
	}
}

function gameLoop(){
	clearCanvas();
	player();
	audios();
	requestAnimationFrame(gameLoop);
}

gameLoop();
