///<reference path="../lib/p5.global.d.ts" />

class Game {
  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.background = "#bbf";
  }
}

class Ball {
  constructor() {
    this.x = game.width / 2;
    this.y = game.height - 50;
    this.vx = 2;
    this.vy = -2;
    this.size = 10;
  }
  speedUp() {
    this.vx = this.vx * 1.2;
    this.vy = this.vy * 1.2;
  }
  draw() {
    noStroke();
    square(this.x, this.y, 10);
    this.x += this.vx;
    this.y += this.vy;

    this.checkWallCollision();
    this.checkPaddleCollision();
    this.checkTargetCollision();
  }
  checkWallCollision() {
    if (this.x <= 0 || this.x + this.size >= game.width) {
      this.vx = -this.vx;
    }
    if (this.y <= 0 || this.y + this.size >= game.height) {
      this.vy = -this.vy;
    }
  }
  checkPaddleCollision() {
    if (
      this.y + this.size >= paddle.y &&
      this.y <= paddle.y + paddle.height &&
      this.x + this.size >= paddle.x &&
      this.x <= paddle.x + paddle.width
    ) {
      this.vy = -this.vy;
    }
  }
  checkTargetCollision() {}
}
class Paddle {
  constructor() {
    this.width = 150;
    this.height = 10;
    this.x = mouseX;
    this.y = game.height - this.height - 10;
  }
  draw() {
    rect(this.x, this.y, this.width, this.height);
    this.x = mouseX - this.width / 2;
  }
}
class Target {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = [this.x * this.y, 40, 40];
    console.log("new Target", this.x, this.y, this.color);
  }
  draw() {
    color(this.color);
    stroke("green");
    rect(this.x, this.y, this.w, this.h);
  }
}

let game;
let ball;
let paddle;
let targets = [];

var setup = function () {
  game = new Game();
  createCanvas(game.width, game.height);
  ball = new Ball();
  paddle = new Paddle();

  let rows = 6;
  let cols = 6;
  this.gap = 5;
  let targetWidth = game.width / cols - this.gap;
  for (let i = 0; i < rows * cols; i++) {
    let column = targetWidth % cols;
    let x = i * column + column * gap;
    let y = (i % rows) * 25;
    targets.push(new Target(x, y, targetWidth, 10));
  }
};

var draw = function () {
  background("#bbf");
  ball.draw();
  paddle.draw();
  for (let i = 0; i < targets.length; i++) {
    const target = targets[i];
    target.draw();
  }
};
var mouseClicked = function () {
  ball.speedUp();
};
