let cl = console.log;

// 1. Create a function that picks Rock, Paper, or Scissors at random
let getRandomRockPaperScissors = function () {
  let rps = ["rock", "paper", "scissors"];
  return rps[Math.floor(Math.random() * rps.length)];
};

// 2. Create a function that reads user input (or picks a random value)
let getUserInput = function () {
  let userInput = process.argv[2];
  return userInput || getRandomRockPaperScissors();
};

// 3. Write if statements to find the winner
let getWinner = function (userInput, computerInput) {
  if (userInput === computerInput) {
    return "tie";
  } else if (
    (userInput === "rock" && computerInput === "scissors") ||
    (userInput === "paper" && computerInput === "rock") ||
    (userInput === "scissors" && computerInput === "paper")
  ) {
    return "user";
  } else {
    return "computer";
  }
};

// 4. Congratulate the winner
let congratulateWinner = function (winner) {
  if (winner === "user") {
    cl("You win!");
  } else if (winner === "computer") {
    cl("You lose!");
  } else {
    cl("It's a tie!");
  }
};

// 5. Run the program
let userInput = getUserInput();
let computerInput = getRandomRockPaperScissors();
cl("You chose " + userInput);
cl("Computer chose " + computerInput);
let winner = getWinner(userInput, computerInput);
congratulateWinner(winner);
