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
const soundMap = {
  "green": new Audio("sounds/green.mp3"),
  "red": new Audio("sounds/red.mp3"),
  "yellow": new Audio("sounds/yellow.mp3"),
  "blue": new Audio("sounds/blue.mp3"),
  "wrong": new Audio("sounds/wrong.mp3")
};