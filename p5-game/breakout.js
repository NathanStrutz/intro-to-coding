///<reference path="../lib/p5.global.d.ts" />

class Game {
  constructor() {
    this.width = 1000;
    this.height = 563;
    this.background = "#CCC";
    this.targetColumns = 6; // across
    this.targetRows = 6; // down
  }
}

class Ball {
  constructor() {
    this.x = game.width / 2;
    this.y = game.height - 50;
    this.vx = 2;
    this.vy = -2;
    this.size = 20;
  }
  speedUp() {
    this.vx = this.vx * 1.2;
    this.vy = this.vy * 1.2;
  }
  draw() {
    noStroke();
    fill("#F00");
    square(this.x, this.y, this.size);
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
  checkTargetCollision() {
    for (let i in targets) {
      let target = targets[i];

      if (
        this.x + this.size >= target.x &&
        this.x <= target.x + target.w &&
        this.y + this.size >= target.y &&
        this.y <= target.y + target.h
      ) {
        this.vy = -this.vy;
        targets.splice(i, 1);
      }
    }
  }
}

class Paddle {
  constructor() {
    this.width = 150;
    this.height = 10;
    this.x = mouseX;
    this.y = game.height - this.height - 10;
  }
  draw() {
    fill(255);
    rect(this.x, this.y, this.width, this.height);
    this.x = mouseX - this.width / 2;
  }
}

class Target {
  constructor(xNumber, yNumber) {
    this.xNumber = xNumber;
    this.yNumber = yNumber;

    this.color = [(255 / game.targetColumns) * xNumber, (255 / game.targetRows) * yNumber, 100];

    this.x = (game.width / game.targetColumns) * xNumber;
    this.y = (200 / game.targetRows) * yNumber;

    this.w = game.width / game.targetColumns;
    this.h = 24;
  }
  draw() {
    fill(this.color);
    noStroke();
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

  for (let row = 0; row < game.targetRows; row++) {
    for (let col = 0; col < game.targetColumns; col++) {
      targets.push(new Target(col, row));
    }
  }
};

var draw = function () {
  background(game.background);
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
