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
    this.vx = random([1, -1]) * random(2, 3.5);
    this.vy = -3;
    this.size = 20;
  }
  draw() {
    fill("red");
    square(this.x, this.y, this.size);
    this.x += this.vx;
    this.y += this.vy;

    this.collideWithWalls();
    this.collideWithPaddle();
    this.collideWithTargets();
  }
  collideWithWalls() {
    if (this.x <= 0) this.vx = Math.abs(this.vx);
    if (this.x + this.size >= game.width) this.vx = -Math.abs(this.vx);
    if (this.y <= 0) this.vy = Math.abs(this.vy);
    if (this.y + this.size >= game.height) {
      game.lives -= 1;
      ball = new Ball();
    }
  }
  collideWithPaddle() {
    if (this.x + this.size >= paddle.x && this.x <= paddle.x + paddle.width && this.y + this.size >= paddle.y) {
      this.vy = -Math.abs(this.vy);
    }
  }
  collideWithTargets() {
    for (let i = 0; i < targets.length; i++) {
      let target = targets[i];
      if (
        this.x + this.size >= target.x &&
        this.x <= target.x + target.width &&
        this.y + this.size >= target.y &&
        this.y <= target.y + target.height
      ) {
        this.vy = -this.vy;
        targets.splice(i, 1);
        game.points += 10;
        return;
      }
    }
  }
}

class Paddle {
  constructor() {
    this.y = game.height - 50;
    this.x = 0;
    this.width = 150;
    this.height = 10;
  }
  draw() {
    fill("white");
    noStroke();
    this.x = mouseX - this.width / 2;
    rect(this.x, this.y, this.width, this.height);
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
