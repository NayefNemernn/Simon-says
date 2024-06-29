const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;



// Start the game on keypress
document.addEventListener('keypress', () => {
  if (!started) {
    document.querySelector("#level-title").textContent = `Level ${level}`;
    nextSequence();
    started = true;
  }
});

//creating the sound map to use for blocks depending on colors
const soundMap = {
  "green": new Audio("sounds/green.mp3"),
  "red": new Audio("sounds/red.mp3"),
  "yellow": new Audio("sounds/yellow.mp3"),
  "blue": new Audio("sounds/blue.mp3"),
  "wrong": new Audio("sounds/wrong.mp3")
};
// Handle button clicks 
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function() {
    const userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
    
  });
});
function nextSequence() {
  userClickedPattern = [];
  level++;
  document.querySelector("#level-title").textContent = `Level ${level}`;

  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
//flash buttons at begining 
// const btnToFlash =document.querySelector(`#${randomChosenColor}`)
//  console.log(btnToFlash)

playSequence(randomChosenColor);
}
function playSequence(randomChosenColor) {
  console.log(randomChosenColor)
  // let delay = 0;
    setTimeout(() => {
      const button = document.getElementById(randomChosenColor);
      button.classList.add("pressed");
      setTimeout(() => {
        button.classList.remove("pressed");
      }, 200);

      playSound(randomChosenColor);
    }, 600);
    // delay += 600; // Adjust delay time to control the speed of the sequence flash

}
function playSound(name) {
  if (soundMap[name]) {
    soundMap[name].play();
  }
}

function animatePress(currentColor) {
  const button = document.getElementById(currentColor);
  button.classList.add("pressed");
  setTimeout(() => {
    button.classList.remove("pressed");
  }, 100);
  
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    document.body.classList.add("game-over");
    document.querySelector("#level-title").textContent = "Game Over, Press Any Key to Restart";

    setTimeout(() => {
      document.body.classList.remove("game-over");
    }, 200);

    startOver();
    
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

