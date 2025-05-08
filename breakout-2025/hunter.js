///<reference path="lib/p5.global.d.ts" />

class Game {
    lives = 3;
    score = 0;
    targetRows = 10;
    targetCols = 4;
    gameOver = false;
  draw() {
    fill("black");
    textSize(32);
    textAlign("left");
    text(`Score: ${this.score}`, 20, height - 15);
    textAlign("right");
    text(`Lives: ${this.lives}`, width - 20, height - 15);

    if (targets.length === 0) {
      background("Green");
      textSize(150);
      textAlign("center");
      text("You Win!", width / 2, height / 2);
      textSize(32);
      this.gameOver = true;
    }

    if (this.lives === 0) {
      background("Red");
      textSize(100);
      textAlign("center");
      text("Game Over... Ctrl + R to restart", width / 2, height / 2);
      textSize(32);
      this.gameOver = true;
    }
  }
}

class Paddle {
  constructor() {
    this.x = 0;
    this.y = height - 60;
    this.width = random(15, 260);
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
      this.vx = 5;
      this.vy = -5;
      this.size = random(1, 50);
  }

  draw() {

      if (game.gameOver) return;

      if (this.x < 0 || this.x > width) {
          this.vx = -this.vx;
      }
      if (this.y < 0 || this.y > height) {
          this.vy = -this.vy;
      }
      if (this.x > paddle.x && this.x < paddle.x + paddle.width && this.y > paddle.y) {
          this.vy = -this.vy;
          this.y = paddle.y - 20;

          this.vx *= 1.1;
          this.vy *= 1.1;
      }
      if (this.y > height) {
          game.lives--;
          ball = new Ball();
      }
      this.bounceOffTargets();
      fill("red");
      square((this.x += this.vx), (this.y += this.vy), this.size);
  }

  bounceOffTargets() {
      for (let i = targets.length - 1; i >= 0; i--) {
          let target = targets[i];
          if (
              this.x + this.size > target.x &&
              this.x < target.x + target.width &&
              this.y + this.size > target.y &&
              this.y < target.y + target.height
          ) {
              targets.splice(i, 1);
              this.vy = -this.vy;
              game.score += 10;
          }
      }
  }
}

class Target {
constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = width / game.targetRows;
    this.height = 45;

    let darkypink = random(0, 100);
    let lightypink = random(100, 200);
    this.color = color(255, darkypink, lightypink);
}
draw() {

    if (game.gameOver) return;

    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
}
}

let game;
let paddle;
let ball;
let targets = [];

var setup = function () {
  createCanvas(windowWidth, windowHeight);

  game = new Game();
  paddle = new Paddle();
  ball = new Ball();

  for (let x = 0; x < game.targetRows; x++) {
      for (let y = 0; y <= game.targetCols; y++) {
          targets.push(new Target(x * width / game.targetRows, y * 32));
      }
  }
};

var draw = function () {
  background(0, 255, 255);
  // draw game
  game.draw();
  // draw ball
  ball.draw();
  // draw targets
  for (let target of targets) {
    target.draw();
  }
  // draw paddle
  paddle.draw();
};
