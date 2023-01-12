cl = console.log;
let prompt = require("prompt-sync")({ sigint: true });

let getRandomRps = function () {
  let rps = ["Rock", "Paper", "Scissors"];
  return rps[Math.floor(Math.random() * rps.length)];
};

let randomChoice = getRandomRps();
let userChoice = prompt("What do you say - rock, paper, or scissors? ", "rock");

if (userChoice[0].toLowerCase() === "r") {
  userChoice = "Rock";
} else if (userChoice[0].toLowerCase() === "p") {
  userChoice = "Paper";
} else if (userChoice[0].toLowerCase() === "s") {
  userChoice = "Scissors";
} else {
  userChoice = randomChoice;
  cl("I couldn't figure out what you said, so you get a random choice.");
}
cl("You choose " + userChoice);

let computerChoice = getRandomRps();
cl("The computer chooses " + computerChoice);

let beats = {
  Rock: "Scissors",
  Scissors: "Paper",
  Paper: "Rock",
};

if (userChoice === computerChoice) {
  cl("OK this is embarrassing! You chose the same thing that the computer picked.");
} else if (beats[userChoice] === computerChoice) {
  cl("YOU WON!! WOW!");
} else {
  cl("You lost. You must be so ashamed!");
}
