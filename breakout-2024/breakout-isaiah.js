///<reference path="../lib/p5.global.d.ts" />

class Game {
  points = 0;
  lives = 10;
  width = window.innerWidth;
  height = window.innerHeight - 5;
  targetColumns = 10;
  targetRows = 105;
  frameCount = 0;

  draw() {
    stroke("black");
    strokeWeight(10);
    textSize(40);
    text(this.points, 20, this.height - 30);

    text(this.lives, game.width - 50, game.height - 30);

    if (targets.length === 0) {
      textSize(100);
      textAlign(CENTER);
      text("you win!", this.width / 2, this.height / 2);
      noLoop();
    }
    if (this.lives === 0) {
      textSize(100);
      textAlign(CENTER);
      text("you lose!", this.width / 2, this.height / 2);
      noLoop();
    }
  }
}

class Ball {
  constructor() {
    this.x = game.width / 2 - 10;
    this.y = game.height - 100;
    this.vx = 5;
    this.vy = -5;
    this.size = 20;
  }
  draw() {
    stroke("black");
    strokeWeight(4);
    fill("red");
    square(this.x, this.y, this.size);
    this.x += this.vx;
    this.y += this.vy;

    this.bounceOffWall();
    this.bounceOffPaddle();
    this.bounceOffTargets();
  }

  bounceOffWall() {
    if (this.x < 0 || this.x + this.size > game.width) {
      this.vx = -this.vx;
    }
    if (this.y < 0 || this.y + this.size > game.height) {
      this.vy = -this.vy;
    }
    if (this.y + this.size > game.height) {
      game.lives--;
      if (game.points >= 20) {
        game.points = game.points - 20;
      } else {
        game.points = 0;
      }
      ball = new Ball();
    }
  }
  bounceOffPaddle() {
    if (
      this.x > paddle.x &&
      this.x < paddle.x + paddle.width &&
      this.y + this.size > paddle.y
    ) {
      this.vy = -Math.abs(this.vy);
      this.vx = this.vx *= 1.02;
      this.vy = this.vy *= 1.02;
    }
  }

  bounceOffTargets() {
    for (let i = 0; i < targets.length; i++) {
      const target = targets[i];
      if (
        this.x > target.x &&
        this.x < target.x + target.width &&
        this.y + this.size > target.y &&
        this.y < target.y + target.height
      ) {
        this.vy = -this.vy;
        game.points += 5;
        targets.splice(i, 1);
        paddle.width = paddle.width - 150 / 50;
        this.vx = this.vx *= 1.02;
        this.vy = this.vy *= 1.02;
      }
    }
  }
}
class Paddle {
  constructor() {
    this.y = game.height - 100;
    this.x = 0;
    this.width = 200;
    this.height = 10;
  }
  draw() {
    fill("black");
    noStroke();
    this.x = mouseX - this.width / 2;
    rect(this.x, this.y, this.width, this.height);
  }
}
class Target {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  draw() {
    fill("blue");
    stroke(50);
    strokeWeight(1);
    rect(this.x, this.y, this.width, this.height);
  }
}

let game = new Game();
let targets = [];
let ball;
let paddle;

var setup = function () {
  createCanvas(game.width, game.height);
  background(150);
  ball = new Ball();
  paddle = new Paddle();

  // targets
  let targetWidth = game.width / game.targetColumns;
  let targetHeight = 20;
  let targetGap = 30;
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < game.targetColumns; x++) {
      targets.push(
        new Target(
          x * targetWidth,
          y * targetHeight + y * targetGap,
          targetWidth,
          targetHeight
        )
      );
    }
  }
};

var draw = function () {
  background(200, 200, 200, 50);
  ball.draw();
  paddle.draw();
  for (const target of targets) {
    target.draw();
  }
  game.draw();
};
