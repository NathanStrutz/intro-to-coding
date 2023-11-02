let cl = console.log;

let getRandomRPS = function () {
  let rps = ["rock", "paper", "scissors"];
  let choice = Math.floor(Math.random() * rps.length);
  return rps[choice];
};

let getUserInput = function () {
  return "rock";
};

let getWinner = function (user, computer) {
  if (user === computer) {
    return "tie";
  } else if (
    (user === "rock" && computer === "scissors") ||
    (user === "paper" && computer === "rock") ||
    (user === "scissors" && computer === "paper")
  ) {
    return "user";
  } else {
    return "computer";
  }
};

let congratulate = function (winner) {
  if (winner === "tie") {
    cl("Nobody wins. 😧");
  } else if (winner === "computer") {
    cl("You lost to a computer. What a buffoon. 😢");
  } else {
    cl("Congratulations, you are the best!");
  }
};

// connect the game
let computerInput = getRandomRPS();
let userInput = getUserInput();
cl("User chooses:", userInput);
cl("Computer chooses:", computerInput);
let winner = getWinner(userInput, computerInput);
congratulate(winner);
