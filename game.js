const buttonColors = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userClickedPattern = [];
var started = false; 
var level = 0;
var gameOver = true;

window.addEventListener("keypress", (e) => {
  if ((e.key === "s" || e.key === "S" )&& !started ){
      started = true;
      nextSequence();      
  }
});

function nextSequence() {
  let levelTitle = document.getElementById("level-title");
  userClickedPattern.length = 0;
  level += 1;
  levelTitle.textContent = `level  ${level}`;


  let random = Math.floor(Math.random(0) * 4);
  let randomChoosenColor = buttonColors[random];
  gamePattern.push(randomChoosenColor);
  console.log("Game Pattern:", gamePattern);

  let fadeInOutObj = document.getElementById(randomChoosenColor);
  if (fadeInOutObj) {
    fadeInOut(fadeInOutObj, 1000);
    playSound(randomChoosenColor);
  }
  setupButtonListeners();

}


function checkAnswer(currentLevel) {
  if (gamePattern.length === currentLevel && userClickedPattern.length === currentLevel) {
    let isCorrect = true; 

    gamePattern.forEach((gameColor, index) => {
      let userColor = userClickedPattern[index];
      console.log("usercolor: ", userColor);
      console.log("gameColor: ", gameColor);

     
      if (userColor !== gameColor) {
        isCorrect = false; 
      }
    });

    if (isCorrect && userClickedPattern.length == gamePattern.length) {
      console.log("Pattern Matched!");
      setTimeout(() => {
        nextSequence();
      }, 1000);
    
    } else {
      console.log("Wrong Pattern ");
      document.body.classList.add('game-over');
      playSound("wrong");

      setTimeout(() => {
        document.body.classList.remove('game-over');
        document.getElementById("level-title").textContent= 'Game Over, Press r Key to Restart';
        if(gameOver){
          window.addEventListener("keypress", (e)=>{StartOver(e)});
        }
        else{
          window.removeEventListener("keypress", (e)=>{StartOver(e)} );
        }
  
      }, 3000);
    
     
    
    

    }
  }
}
function StartOver(e) {
  if (e.key === "r" && gameOver) {
    document.getElementById("level-title").textContent= 'Press s Key to Start';
    started = false;
    gamePattern.length = 0;
    level = 0;
   
     
  }
  
  

  
}

function setupButtonListeners() {
  
  document.querySelectorAll(".btn").forEach((item) => {
    item.removeEventListener("click", handleButtonClick);
  });


  document.querySelectorAll(".btn").forEach((item) => {
    item.addEventListener("click", handleButtonClick);
  });
  
}

function handleButtonClick(e) {
  animatePress(e.target.id);
  let userChoosenColor = e.target.id;
  userClickedPattern.push(userChoosenColor);
   checkAnswer(level);
  
}

 function fadeInOut(element, duration) {
  //Fade in
  element.style.opacity = 0;
  var fadeInInterval = setInterval(() => {
    element.style.opacity += 1;

    if (element.style.opacity >= 1) {
      clearInterval(fadeInInterval);

      //fade out
      var fadeOutInterval = setInterval(() => {
        element.style.opacity -= 1;
        if (element.style.opacity <= 0) {
          clearInterval(fadeOutInterval);

          //reset opacity for next fadeIn
          element.style.opacity = 1;
        }
      }, duration / 10);
    }
  }, duration / 10);
}

function playSound(color) {
  let audio = new Audio(`./sounds/${color}.mp3`);
  audio.play();
}

function animatePress(currentColor){
  document.getElementById(currentColor).classList.add('pressed');
  setTimeout(() => {
    document.getElementById(currentColor).classList.remove('pressed');
  }, 100);
}