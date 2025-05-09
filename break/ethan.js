/// <reference path= "../lib/p5.global.d.ts"/>

class Game {
  width = windowWidth - 15;
  height = windowHeight - 15;
  points = 0;
  lives = random(1, 5);
  targetRows = random(5, 15);
  targetCols = random(5, 15);
  score = 0;
  transparency = random(0, 25);

  draw() {
    textSize(100);
    text(this.score, this.width / 2, this.height / 2);
  }
}
let targets = [];

class Ball {
  // good ball
  constructor() {
    this.x = game.width / 2;
    this.y = game.height - 100;
    this.vx = random(1, 3);
    this.vy = random(-1, -3);
    this.z = 25;
    // this.vyDecay = -0.1;
  }

  draw() {
    fill("red");
    stroke(255, 0, 0);
    square(this.x, this.y, this.z);
    this.x += this.vx;
    this.y += this.vy;
    // this.vy = this.vy - this.vyDecay;

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
      this.x = game.width / 2;
      this.y = game.height - 100;
      game.lives--;
    }
  }
  collideWithPaddle() {
    if (
      this.x + this.z > paddle.x &&
      this.x < paddle.x + paddle.width &&
      this.y + this.z >= paddle.y &&
      this.y <= paddle.y + paddle.height
    ) {
      this.vy = -Math.abs(this.vy);
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
        this.vy = this.vy * 1.03;
        this.vx = this.vx * 1.03;
        // Game.transparancy -= 3;
        targets.splice(i, 1);
        // game.transparency--;
        paddle.width *= 1.3;
        if (paddle.width > 750) {
          paddle.width = 300;
        }
        game.score += 33;
        return;
      }
    }
  }
}
class Ball2 {
  // bad ball
  constructor() {
    this.x = game.width / 2;
    this.y = game.height - 100;
    this.vx = random(1, 5);
    this.vy = random(-1, -5);
    this.z = 25;
    // this.vyDecay = -0.1;
  }

  draw() {
    fill("red");
    stroke(255, 0, 0);
    square(this.x, this.y, this.z);
    this.x += this.vx;
    this.y += this.vy;
    // this.vy = this.vy - this.vyDecay;

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
      this.x = game.width / 2;
      this.y = game.height - 100;
      game.lives--;
    }
  }
  collideWithPaddle() {
    if (
      this.x + this.z > paddle.x &&
      this.x < paddle.x + paddle.width &&
      this.y + this.z >= paddle.y &&
      this.y <= paddle.y + paddle.height
    ) {
      this.vy = -Math.abs(this.vy);
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
        this.vy = this.vy * 1.03;
        this.vx = this.vx * 1.03;
        // Game.transparancy = Game.transparancy -= 3;
        Paddle.width *= 0.7;
        targets.splice(i, 1);
        // game.transparency--;
        game.score += 25;
        paddle.width *= 0.85;
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
    fill("#ABE32B");
    stroke(0, 255, 0);
    strokeWeight(2);
    rect(this.x, this.y, this.width, this.height);
  }
}

/** @type {Game} */
let game;
/** @type {Ball} */
let ball;
/** @type {Ball2} */
let ball2;
/**@type {Paddle}*/
let paddle;
/** @type {Target} */
let target;

var setup = function () {
  game = new Game();
  console.log(game.lives);
  createCanvas(1250, 600);
  ball = new Ball();
  ball2 = new Ball2();
  paddle = new Paddle();
  for (let across = 0; across < game.targetCols; across++) {
    for (let down = 0; down < game.targetRows; down++) {
      targets.push(new Target(across, down));
    }
  }
};
var draw = function () {
  background(100, game.transparency);
  ball.draw();
  ball2.draw();
  paddle.draw();

  for (const target of targets) {
    target.draw();
  }
  if (targets.length === 0) {
    background("green");
    game.draw();
    noLoop();
  } else if (game.lives < 1) {
    background("red");
    game.draw();
    noLoop();
  }
};
