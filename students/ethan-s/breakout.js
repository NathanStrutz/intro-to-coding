/// <reference path= "../../lib/p5.global.d.ts"/>

class Game {
  width = 1250;
  height = 600;
  points = 0;
  // lives = 3;
  lives = random(1, 5);
  targetRows = 5;
  targetCols = 5;
}
let targets = [];
// console.log(game.lives);
class Ball {
  constructor() {
    this.x = game.width / 2;
    this.y = game.height - 100;
    this.vx = random(1, 5);
    this.vy = random(-1, -5);
    this.z = 25;
  }

  draw() {
    fill("red");
    stroke(255, 0, 0);
    square(this.x, this.y, this.z);
    this.x += this.vx;
    this.y += this.vy;

    this.collideWithWalls();
    this.collideWithPaddle();
    this.collideWithTarget();
  }
  collideWithWalls() {
    if (this.x < 0 || this.x > 1250) {
      this.vx = -this.vx;
    }
    if (this.y < 0) {
      this.vy = -this.vy;
    }
    if (this.y > 600) {
      this.vy = -this.vy;
      game.lives--;
    }
  }
  collideWithPaddle() {
    if (
      this.x + this.z > paddle.x &&
      this.x < paddle.x + paddle.width &&
      this.y + this.z >= paddle.y
      // &&
      // this.y <= paddle.y + paddle.height
    ) {
      this.vy = -this.vy;
    }
  }
  collideWithTarget() {
    for (let i = 0; i < targets.length; i++) {
      if (
        this.x + this.z > targets[i].x &&
        this.x < targets[i].x + targets[i].width &&
        this.y + this.z >= targets[i].y &&
        this.y <= targets[i].y + targets[i].height
      ) {
        this.vy = -this.vy;
        this.vy = this.vy * 1.1;
        this.vx = this.vx * 1.1;
        targets.splice(i, 1);

        return;
      }
    }
  }
}

class Paddle {
  constructor() {
    this.y = game.height - 50;
    this.width = 200;
    this.height = 15;
  }
  draw() {
    this.x = mouseX - this.width / 2;
    fill("white");
    noStroke();
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
    fill("green");
    stroke(0, 255, 0);
    strokeWeight(2);
    rect(this.x, this.y, this.width, this.height);
  }
}

/** @type {Game} */
let game;
/** @type {Ball} */
let ball;
/**@type {Paddle}*/
let paddle;
/** @type {Target} */
let target;

var setup = function () {
  game = new Game();
  createCanvas(1250, 600);
  ball = new Ball();
  paddle = new Paddle();
  for (let across = 0; across < game.targetCols; across++) {
    for (let down = 0; down < game.targetRows; down++) {
      targets.push(new Target(across, down));
    }
  }
};

var draw = function () {
  background(100, 25);
  ball.draw();
  paddle.draw();
  for (const target of targets) {
    target.draw();
  }
  if (targets.length === 0) {
    background("green");
    noLoop();
  } else if (game.lives === 0) {
    background("red");
    noLoop();
  }
};
