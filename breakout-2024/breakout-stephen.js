/// <reference path="../lib/p5.global.d.ts" />

class Game {
  points = 0;
  lives = 3;
  width = window.innerWidth;
  height = window.innerHeight - 5;
  targetColumns = 8;
  targetRows = 4;
  paddleWidth = 150; // Initial paddle width

  draw() {
    textSize(20);
    textFont("Calibri");

    fill("lime");
    text(`${this.points} POINTS`, 20, this.height - 20);

    fill("lime");
    text(`${this.lives} LIVES`, game.width - 100, this.height - 20);

    if (targets.length === 0) {
      // You win!
      textSize(100);
      textAlign(CENTER);
      fill("lime");
      text("YOU WIN!", this.width / 2, this.height / 2);
      noLoop();
    }
    if (this.lives === 0) {
      // You lose!
      textSize(100);
      textAlign(CENTER);
      fill("red");
      text("YOU LOSE!", this.width / 2, this.height / 2);
      noLoop();
    }
  }
}

class Ball {
  constructor() {
    this.x = game.width / 2;
    this.y = game.height / 2;
    this.vx = 6;
    this.vy = -6;
    this.size = 25;
  }
  draw() {
    noStroke();
    fill("white");
    square(this.x, this.y, this.size);
    this.x += this.vx;
    this.y += this.vy;

    this.bounceOffWalls();
    this.bounceOffPaddle();
    this.bounceOffTargets();
  }
  bounceOffWalls() {
    if (this.x < 0 || this.x + this.size > game.width) {
      this.vx = -this.vx;
    }
    if (this.y < 0) {
      this.vy = -this.vy;
    }
    if (this.y + this.size > game.height) {
      game.lives--;
      ball = new Ball();
    }
  }
  bounceOffPaddle() {
    if (
      this.x > paddle.x &&
      this.x < paddle.x + paddle.width &&
      this.y + this.size > paddle.y &&
      this.y < paddle.y + paddle.height
    ) {
      this.vy = -Math.abs(this.vy);
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
        console.log("I collided with ", target);
        this.vy = -this.vy;
        game.points += 5;
        targets.splice(i, 1);

        // Reduce paddle width on target hit (adjust shrink amount as needed)
        game.paddleWidth -= 5;
        if (game.paddleWidth < 50) {
          game.paddleWidth = 50; // Set minimum paddle width
        }
        paddle.width = game.paddleWidth;
      }
    }
  }
}

class Paddle {
  constructor() {
    this.y = game.height - 50;
    this.x = 0;
    this.width = game.paddleWidth; // Use initial paddle width from Game class
    this.height = 10;
  }
  draw() {
    fill("violet");
    noStroke();
    this.x = mouseX - this.width / 2;
    rect(this.x, this.y, this.width, this.height);
  }
}

class Target {
  constructor(x, y, width) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = 10;
  }
  draw() {
    fill("lime");
    stroke(255);
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
  let targetGap = 5;
  for (let y = 0; y < 4; y++) {
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
  background("black");
  ball.draw();
  paddle.draw();
  for (const target of targets) {
    target.draw();
  }
  game.draw();
};
