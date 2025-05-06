///<reference path="../lib/p5.global.d.ts" />

class Game {
  lives = 3;
  score = 0;
  targetRows = random(2, 10);
  targetCols = random(2, 10);
  draw() {
    if (targets.length === 0) {
      // You win
      background("green");
      textSize(150);
      textAlign("center");
      fill("white");
      text("You won! Congratulations!", 0, height / 2 - height * 0.15, width);
      noLoop();
    }
    if (this.lives === 0) {
      // You Lose
      background("red");
      textSize(100);
      textAlign("center");
      fill("white");
      text("You are such a loser!", 0, height / 2 - height * 0.15, width);
      noLoop();
    }

    // draw scoreboard
    fill("white");
    textSize(25);
    textAlign("left");
    text(`Score: ${this.score}`, 20, height - 15);
    textAlign("right");
    text(`${this.lives} :Lives`, width - 20, height - 15);
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
    rect(this.x, this.y, this.width, this.height);
  }
}

class Ball {
  constructor() {
    this.x = random(0, width);
    this.y = height - 100;
    this.vx = random(4.8, 5.2);
    this.vy = -5;
    this.size = 20;
  }
  draw() {
    fill("red");
    square((this.x += this.vx), (this.y += this.vy), this.size);
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
    if (this.y + this.size > height) {
      game.lives--;
      ball = new Ball();
    }
  }
  bounceOffTargets() {
    for (let i in targets) {
      let target = targets[i];
      if (
        this.x + this.size > target.x &&
        this.x < target.x + target.width &&
        this.y + this.size > target.y &&
        this.y < target.y + target.height
      ) {
        this.vy = -this.vy;
        targets.splice(i, 1);
        game.score += 25;
        // speed up the ball
        this.vx = min(this.vx * 1.1, 10);
        this.vy = min(this.vy * 1.1, 10);
        // change the paddle size
        paddle.width = min(max(paddle.width * random(0.85, 1.15), 40), 250);
      }
    }
  }
  bounceOffPaddle() {
    // prettier-ignore
    if (this.x + this.size > paddle.x &&
      this.x < paddle.x + paddle.width &&
      this.y + this.size > paddle.y) {
      this.vy = -Math.abs(this.vy);
      this.vx = this.vx * random(.85, 1.15)
    }
  }
}

class Target {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = width / game.targetRows;
    this.height = 30;
  }
  draw() {
    fill("blue");
    rect(this.x, this.y, this.width, this.height);
  }
}

let game;
let paddle;
let ball;
let ball2;
let targets = [];

var setup = function () {
  createCanvas(windowWidth, windowHeight);

  game = new Game();
  paddle = new Paddle();
  ball = new Ball();
  ball2 = new Ball();

  for (let x = 0; x < game.targetRows; x++) {
    for (let y = 0; y <= game.targetCols; y++) {
      targets.push(new Target((x * width) / game.targetRows, y * 32));
    }
  }
};

var draw = function () {
  background(88,88,88,160);
  // draw ball
  ball.draw();
  ball2.draw();
  // draw targets
  for (let target of targets) {
    target.draw();
  }
  // draw paddle
  paddle.draw();
  // draw game
  game.draw();
};
