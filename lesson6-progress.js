let cl = console.log;

let getRandomChoice = function () {
  let choices = ["Rock", "Paper", "Scissors"];
  let randomChoice = Math.random() * 3;
  randomChoice = Math.floor(randomChoice);
  let choice = choices[randomChoice];
  return choice;
};

let declareWinner = function (p1, p2) {
  let whatBeatsWhat = {};
  whatBeatsWhat.Rock = "Scissors";
  whatBeatsWhat.Paper = "Rock";
  whatBeatsWhat.Scissors = "Paper";

  if (whatBeatsWhat[p1] === p2) {
    return "Player 1";
  } else if (whatBeatsWhat[p2] === p1) {
    return "Player 2";
  } else {
    return "Nobody";
  }
};

let player1 = getRandomChoice();
let player2 = getRandomChoice();

cl(player1, player2);
cl(declareWinner(player1, player2));
