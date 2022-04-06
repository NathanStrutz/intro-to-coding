///<reference path="../lib/p5.global-mode.d.ts" />

var setup = function () {
  createCanvas(windowWidth, windowHeight - 4);
  background(230);
};

var draw = function () {
  game.draw();
};

let game = new RpsGame();

/*
  3 scenes in Rock Paper Scissors:

  1. Ready to play?
  2. Choose your weapon
    2.a wait for the results
  3. Results
    3.a Congratulate the user for winning
    3.b Console the loser for losing

*/
