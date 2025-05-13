// Error at the bottom because student left duplicate code in.
// At least 50% written by AI, does not match the class style.
// Communication is probably more important than coding skills.

///<reference path="../lib/p5.min.js" />

let bricks = [];
let score = 0;
let lives = 3;
let paddle;
let ball;
let game;

function setup() {
  createCanvas(800, 600);
  game = new Game();
  paddle = new Paddle();
  ball = new Ball();

  for (let x = 0; x < game.targetRows; x++) {
    for (let y = 0; y < game.targetCols; y++) {
      let brickX = (x * width) / game.targetRows;
      let brickY = y * 32 + 40;
      bricks.push(new Brick(brickX, brickY));
    }
  }
}

function draw() {
  background(51);

  paddle.update();
  paddle.draw();

  ball.update(paddle, bricks);
  ball.draw();

  for (let i = bricks.length - 1; i >= 0; i--) {
    bricks[i].draw();
    if (bricks[i].isHit(ball)) {
      ball.vy *= -1;
      bricks.splice(i, 1);
      score += 10;
    }
  }

  // Check for ball falling below screen
  if (ball.y > height) {
    lives--;
    if (lives > 0) {
      ball.reset();
    } else {
      noLoop();
      textSize(32);
      fill("white");
      text("Game Over!", width / 2 - 80, height / 2);
    }
  }

  if (bricks.length === 0) {
    background("green");
    textSize(100);
    textAlign(CENTER, CENTER);
    fill("white");
    text("You Win!", width / 2, height / 2);
    noLoop();
  }

  // HUD
  fill(255);
  textSize(18);
  text("Score: " + score, 10, 20);
  text("Lives: " + lives, width - 100, 20);
}

class Game {
  constructor() {
    this.lives = 3;
    this.score = 0;
    this.targetRows = int(random(4, 10));
    this.targetCols = int(random(3, 7));
  }
}

class Paddle {
  constructor() {
    this.width = 100;
    this.height = 20;
    this.y = height - 30;
    this.x = width / 2;
  }

  update() {
    this.x = constrain(mouseX, this.width / 2, width - this.width / 2);
  }

  draw() {
    fill("white");
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
  }
}

class Ball {
  constructor() {
    this.r = 10;
    this.reset();
  }

  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.vx = 5;
    this.vy = -5;
  }

  update(paddle, bricks) {
    this.x += this.vx;
    this.y += this.vy;

    // Bounce off walls
    if (this.x - this.r < 0 || this.x + this.r > width) {
      this.vx *= -1;
    }
    if (this.y - this.r < 0) {
      this.vy *= -1;
    }

    // Bounce off paddle
    if (
      this.y + this.r > paddle.y - paddle.height / 2 &&
      this.x > paddle.x - paddle.width / 2 &&
      this.x < paddle.x + paddle.width / 2 &&
      this.y < paddle.y
    ) {
      this.vy *= -1;
      this.y = paddle.y - paddle.height / 2 - this.r;

      // Bonus: slightly modify speed & paddle width
      this.vx = min(this.vx * 1.05, 10);
      this.vy = min(this.vy * 1.05, 10);
      paddle.width = constrain(paddle.width * random(0.95, 1.05), 40, 200);
    }
  }

  draw() {
    fill("red");
    ellipse(this.x, this.y, this.r * 2);
  }
}

class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 70;
    this.h = 20;
  }

  draw() {
    fill("yellow");
    rect(this.x, this.y, this.w, this.h);
  }

  isHit(ball) {
    return (
      ball.x + ball.r > this.x &&
      ball.x - ball.r < this.x + this.w &&
      ball.y + ball.r > this.y &&
      ball.y - ball.r < this.y + this.h
    );
  }
}

var setup;

var draw = function () {
  background(66);
  //draw ball
  ball.draw();
  //draw targets
};
