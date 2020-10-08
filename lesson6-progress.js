let cl = console.log;

let getRockPaperScissors = function () {
  let choices = ["rock", "paper", "scissors"];
  let randomChoice = Math.floor(Math.random() * 3);
  let choice = choices[randomChoice];
  return choice;
};

cl(getRockPaperScissors());
