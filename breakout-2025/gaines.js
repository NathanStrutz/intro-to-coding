///<reference path="lib/p5.global.d.ts" />

class Game {
  constructor() {
    this.lives = 5;
    this.score = 0;
    this.targetRows = 50;
    this.targetCols = 15;
  }

  draw() {
    fill(255);
    textSize(24);
    textAlign("left");
    text(`Lives: ${this.lives} | Score: ${this.score}`, 20, height - 15);
    textAlign("right");
    text(`${this.lives} :Lives`, width - 20, height - 15);

    if (targets.length === 0) {
      textAlign(CENTER, CENTER);
      textSize(120);
      fill(0, 255, 0);
      text("You Win!", width / 2, height / 2);
      noLoop();
    } else if (this.lives === 0) {
      textAlign(CENTER, CENTER);
      textSize(120);
      fill("black");
      text("You Lose!", width / 2, height / 2);
      noLoop();
    }
    if (this.score === 10000) {
      this.lives += 1;
      this.score = 0;
    }
  }
}

class Paddle {
  constructor() {
    this.x = 0;
    this.y = height - 60;
    this.width = 160;
    this.height = 20;
  }
  draw() {
    this.x = mouseX - this.width / 2;
    fill("white");
    rect(this.x, this.y, this.width, 20);
  }
}

class Ball {
  constructor() {
    this.x = random(0, width);
    this.y = height - 100;
    this.vx = random(5, 8);
    this.vy = -5;
    this.size = 10;
  }
  draw() {
    fill("black");
    circle((this.x += this.vx), (this.y += this.vy), this.size);
    this.bounceOffWalls();
    this.bounceOffTargets();
    this.bounceOffPaddle();
  }
  bounceOffWalls() {
    if (this.x < 0) {
      this.vx = Math.abs(this.vx);
    }
    if (this.x + this.size > width) {
      this.vx = -Math.abs(this.vx);
    }
    if (this.y < 0) {
      this.vy = Math.abs(this.vy);
    }
    if (this.y > height) {
      game.lives--;
      ball = new Ball();
    }
  }
  bounceOffTargets() {
    for (let i = 0; i < targets.length; i++) {
      let target = targets[i];
      if (
        this.x + this.size > target.x &&
        this.x < target.x + target.width &&
        this.y + this.size > target.y &&
        this.y < target.y + target.height
      ) {
        this.vy = -this.vy;
        game.score += 100;
        targets.splice(i, 1);
        this.vx = this.vx * 1.01;
        this.vy = this.vy * 1.01;
      }
    }
  }
  bounceOffPaddle() {
    if (
      this.x + this.size > paddle.x &&
      this.x < paddle.x + paddle.width &&
      this.y + this.size > paddle.y
    ) {
      this.vy = -Math.abs(this.vy);
    }
  }
}

class Target {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = width / game.targetRows;
    this.height = 5;
  }
  draw() {
    fill("blue");
    rect(this.x, this.y, this.width, this.height);
  }
}

let game;
let paddle;
let ball;

let targets = [];

var setup = function () {
  createCanvas(1530, 765);

  game = new Game();
  paddle = new Paddle();
  ball = new Ball();

  for (let x = 0; x < game.targetRows; x++) {
    for (let y = 0; y <= game.targetCols; y++) {
      targets.push(new Target((x * width) / game.targetRows, y * 32));
    }
  }
};

var draw = function () {
  background("red");

  game.draw();

  ball.draw();

  for (let target of targets) {
    target.draw();
  }

  paddle.draw();
};
