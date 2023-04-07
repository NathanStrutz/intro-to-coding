/// <reference path="lib/p5.global.d.ts" />

class Game {
  width = 1000;
  height = 600;
  lives = 3;
  points = 0;
  targetRows = 5;
  targetCols = 7;
}

class Ball {
  constructor() {
    this.x = game.width / 2;
    this.y = game.height - 100;
    this.vx = 3;
    this.vy = -3;
    this.size = 20;
  }
  draw() {
    fill("red");
    square(this.x, this.y, this.size);
    this.x += this.vx;
    this.y += this.vy;

    collideWithWalls();
    collideWithPaddle();
    collideWithTargets();
  }
  collideWithWalls() {
    // Same code we used last week for the animation stuff
  }
  collideWithPaddle() {
    // Similar code to colliding with the wall
  }
  collideWithTargets() {
    // Similar code to colliding with the paddle, but check ALL of the targets!
    for (let i = 0; i < targets.length; i++) {
      const target = targets[i];
      // if the ball is in the target...
      targets.splice(i, 1);
      return;
    }
  }
}

class Paddle {
  constructor() {
    this.y = game.height - 50;
    this.width = 200;
    this.height = 10;
  }
  draw() {
    fill("white");
    noStroke();
    rect(mouseX - this.width / 2, this.y, this.width, this.height);
  }
}

class Target {
  constructor(row, col) {
    this.row = row;
    this.col = col;

    this.height = 15;
    this.width = game.width / game.targetCols;
    this.x = this.width * this.row;
    this.y = (120 / game.targetRows) * col + 20;
  }
  draw() {
    fill("blue");
    strokeWeight(2);
    stroke("white");
    rect(this.x, this.y, this.width, this.height);
  }
}

/** @type {Game} */
let game;
/** @type {Ball} */
let ball;
/** @type {Paddle} */
let paddle;
/** @type {Array<Target>} */
let targets = [];

var setup = function () {
  game = new Game();
  createCanvas(game.width, game.height);
  ball = new Ball();
  paddle = new Paddle();

  for (let across = 0; across < game.targetCols; across++) {
    for (let down = 0; down < game.targetRows; down++) {
      targets.push(new Target(across, down));
    }
  }
};

var draw = function () {
  background(200);
  ball.draw();
  paddle.draw();
  for (const target of targets) {
    target.draw();
  }

  if (targets.length === 0) {
    // you win!
    noLoop();
  }
};