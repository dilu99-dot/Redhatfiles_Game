var boy = document.getElementById("boy");
idleImageNumber = 1;
idleAnimationNumber = 0;


function idleAnimation(){
  idleImageNumber  = idleImageNumber + 1;

  if (idleImageNumber ==11){
    idleImageNumber = 1;
  }

  boy.src = "resources/redhatfiles/png/idle ("+idleImageNumber+").png";
}

function idleAnimationStart(){
  idleAnimationNumber = setInterval(idleAnimation, 200);
}


runImageNumber = 1;
runAnimationNumber = 0;

function runAnimation(){
  boy.src = "resources/redhatfiles/png/Run ("+runImageNumber+").png";
  runImageNumber = runImageNumber + 1;
  if (runImageNumber == 9){
    runImageNumber = 1;
  }
}

function runAnimationStart(){
  runAnimationNumber = setInterval(runAnimation, 200);
  clearInterval(idleAnimationNumber);
}

jumpAnimationNumber = 0;
jumpImageNumber = 1;
boyMarginTop = 600;

function jumpAnimation(){
  jumpImageNumber = jumpImageNumber + 1;

  // Increase the jump height by changing the value from 20 to a higher number, e.g., 35
  if (jumpImageNumber <= 7) {
    boyMarginTop = boyMarginTop - 30;
    boy.style.marginTop = boyMarginTop + "px";
  }

  if (jumpImageNumber >= 8) {
    boyMarginTop = boyMarginTop + 30;
    boy.style.marginTop = boyMarginTop + "px";
  }

  if (jumpImageNumber == 13){
    jumpImageNumber = 1;
    clearInterval(jumpAnimationNumber);
    jumpAnimationNumber = 0;
    runImageNumber = 0;
    runAnimationStart();
  }

  boy.src = "resources/redhatfiles/png/jump ("+jumpImageNumber+").png";
}

function jumpAnimationStart(){
  clearInterval(idleAnimationNumber);
  runImageNumber = 0;
  clearInterval(runAnimationNumber);
  jumpAnimationNumber = setInterval(jumpAnimation, 200);
}
function keyCheck(event){
  // alert(event.which);
  // enter=13
  //space=32

  var keyCode = event.which;

  if (keyCode == 13){
    if(runAnimationNumber == 0){
      runAnimationStart();
    }
  

    if (moveBackgroundAnimationId == 0){
      moveBackgroundAnimationId = setInterval(moveBackground, 100);
    }

    if (boxAnimationId == 0){
      boxAnimationId = setInterval(boxAnimation, 100);
    }
  }

  if (keyCode == 32){
    if (jumpAnimationNumber == 0){
      jumpAnimationStart();
    }

    if (moveBackgroundAnimationId == 0){
      moveBackgroundAnimationId = setInterval(moveBackground, 100);
    }

    if (boxAnimationId == 0){
      boxAnimationId = setInterval(boxAnimation, 100);
    }
  }
}

var backgroundImagePositionX = 0;
var moveBackgroundAnimationId = 0;

var score = 0;

function moveBackground(){

  backgroundImagePositionX = backgroundImagePositionX - 20;
  document.getElementById("background").style.backgroundPositionX = backgroundImagePositionX + "px";

  score = score + 1;
  document.getElementById("score").innerHTML = "Score: " + score;
}


boxMarginLeft = 2000;
function createBoxes (){

  for (var i = 0; i < 10; i++){

  var box = document.createElement("div");
  box.className = "box";
  document.getElementById("background").appendChild(box);
  box.style.marginLeft = boxMarginLeft + "px";
  box.id = "box" + i;

  //boxMarginLeft = boxMarginLeft + 1000;

    if (i < 5) {
      boxMarginLeft = boxMarginLeft + 1000;
    }
    if (i >= 5) {
      boxMarginLeft = boxMarginLeft + 600;
    }
  }
  
}

var boxAnimationId = 0;

function boxAnimation(){
  for (var i = 0; i < 10; i++){
    var box = document.getElementById("box" + i);
    var currentMarginLeft = getComputedStyle(box).marginLeft;
    var newMarginLeft = parseInt(currentMarginLeft) - 35;
    box.style.marginLeft = newMarginLeft + "px";
  

    if (newMarginLeft >= -110 & newMarginLeft <= 100){
      if (boyMarginTop > 500) {
        clearInterval(boxAnimationId);
        boxAnimationId = 0;

        clearInterval(runAnimationNumber);
        runAnimationNumber = -1;

        clearInterval(jumpAnimationNumber);
        jumpAnimationNumber = -1;

        clearInterval(moveBackgroundAnimationId);
        moveBackgroundAnimationId = -1;

        deadAnimationNumber = setInterval(deadAnimation, 100);
      }
    }
  }
}

deadImageNumber = 1;
deadAnimationNumber = 0;

function deadAnimation() {
  deadImageNumber = deadImageNumber + 1;
  if (deadImageNumber == 11) {
    clearInterval(deadAnimationNumber);
    deadAnimationNumber = 0;
    deadImageNumber = 10; // Show last frame

    document.getElementById("end").style.visibility = "visible";
    document.getElementById("endScore").innerHTML = "Score: " + score;
  }
  boy.src = "resources/redhatfiles/png/dead (" + deadImageNumber + ").png";
  boy.style.marginTop = "600px"; 
}

function reload() {
  location.reload();
}