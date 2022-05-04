///<reference path="../../lib/p5.global-mode.d.ts" />

let game;
var setup = function () {
  createCanvas(windowWidth, windowHeight - 40);
  game = new Pong();
};
var draw = function () {
  game.draw();
};

var windowResized = function () {
  resizeCanvas(windowHeight, windowWidth - 4);
  game = new Pong();
};
