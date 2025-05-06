/// <reference path= "../lib/p5.global.d.ts"/>

class Game {
  lives = 5;
  score = 0;
  targetRows = 10;
  targetCols = 4;
  draw() {
    // draw scoarboard
    fill("white");
    textSize(25);
    text(`Score: ${this.score}`, 30, height - 15);
    text(` ${this.lives}; :Lives`, 30, height - 15);

    if (targets.length === 0) {
      // You Win
      background("purple");
      textSize(250);
      textAlign("center");
      fill("orange");
      text("You Won, Congratulations", 0, height - 20);
    }
  }
}

class Paddle {
  constructor() {
    this.x = random(0, width);
    this.y = height - 100;
    this.vx = 5;
    this.vy = 5;
  }
  draw() {
    fill("blue");
    square(mouseX, this.y, 20);
  }
}

class Ball {
  constructor() {
    this.x = random(0, width);
    this.y = height - 100;
    this.vx = 5;
    this.vy = 5;
  }
  draw() {
    fill("green");
    square(this.x, this.y, 20);
    this.bounceOffWalls();
    this.bounceOffTargets();
    this.bounceOffPaddle();
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
        this.vx = this.vx * 1.1;
        this.vy = this.vy * 1.1;
      }
    }
  }
  bounceOffWalls() {
    if (this.x < 0) {
    }
    if (this.x + this.size > width) {
    }

    if (this.x + this.size > height) {
      game.lives--;
      ball = new Ball();
    }
  }

  bounceOffPaddle() {
    // prettier-ignore
    if (this.x + this.size > paddle.x &&
    this.x < paddle.x + paddle.width &&
    this.y + this.size > paddle.y) {
    this.vy = -Math.abs(this.vy);
    }
  }
}

class Target {
  constructor(x, y) {
    this.width = width / game.targetCols - 3;
    this.height = 35;
    this.x = x * this.width;
    this.y = y * this.height + 3;
  }
  draw() {
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

  for (let x = 0; x < 8; x++) {
    for (let y = 0; y <= 5; y++) {
      targets.push(new Target(x, y));
    }
  }

  // for (let x = 0; x < game.targetRows; x++) {
  //     for (let y = 0; y <= game.targetCols; y++) {
  //         // targets.push(new Target(x * , y));
  //     }
  // };
};

var draw = function () {
  background(66);
  // draw game
  game.draw();
  // draw targets
  for (let target of targets) {
    target.draw();
  }
  // draw ball
  ball.draw();
  // draw paddle
  paddle.draw();
};
