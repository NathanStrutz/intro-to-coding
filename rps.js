let cl = console.log;

let getRPS = function () {
  let rps = ["rock", "paper", "scissors"];
  return rps[Math.floor(Math.random() * rps.length)];
};

let getUserInput = function () {
  let userInput = process.argv[2];
  return userInput || getRPS();
};

let getWinner = function (userInput, computerInput) {
  if (userInput === computerInput) {
    return "tie";
  }
  if (
    (userInput === "rock" && computerInput === "scissors") ||
    (userInput === "scissors" && computerInput === "paper") ||
    (userInput === "paper" && computerInput === "rock")
  ) {
    return "win";
  } else {
    return "lose";
  }
};

let congratulate = function (result) {
  if (result === "tie") {
    cl("Nobody's a winner");
  } else if (result === "win") {
    cl("You are such a winner!");
  } else {
    cl("Sorry, not this time!");
  }
};

let userInput = getUserInput();
let computerInput = getRPS();
cl("You picked ", userInput);
cl("Computer picked", computerInput);
let result = getWinner(userInput, computerInput);
congratulate(result);
