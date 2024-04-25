/// <reference path="../lib/p5.global.d.ts"/>

/// Credit: Joseph B, who made this game impossible

class Game {
  width = 1000;
  height = 600;
  lives = round(random(2, 5));
  points = 0;
  targetRows = round(random(4, 6));
  targetCols = round(random(7, 15));

  draw() {
    textSize(40);
    fill("green");
    text(`${this.lives} Lives left`, 10, this.height - 60);
    text(`${this.points} Points`, 830, this.height - 60);
    this.gameover();
  }
  gameover() {
    if (this.lives < 1) {
      fill("red");
      strokeWeight(10);
      stroke("black");
      text(`YOU LOSE BETTER LUCK NEXT TIME`, this.width / 7, this.height / 2);
      noLoop();
    }
  }
}
class Ball {
  constructor() {
    this.x = random(0, 1000);
    this.y = random(300, 525);
    this.vx = random(-12, 12);
    this.vy = random(-12, -1);
    this.size = random(5, 30);
  }
  draw() {
    fill("red");
    strokeWeight(2);
    stroke("white");
    square(this.x, this.y, this.size);
    this.x += this.vx;
    this.y += this.vy;
    this.collideWithWalls();
    this.collideWithPaddle();
    this.bounceOffTargets();
  }
  collideWithWalls() {
    if (this.y >= 580) {
      game.lives--;
    }
    if (this.x < 0 || this.x + 20 > game.width) {
      this.vx = -this.vx;
    }
    if (this.y + 20 > game.height) {
      this.vy = -this.vy;
    }
    if (this.y < 0) {
      game.lives--;
      ball = new Ball();
    }
  }
  collideWithPaddle() {
    if (
      this.y + this.size > paddle.y &&
      this.y < paddle.y + 10 &&
      mouseX - paddle.width / 2 < this.x &&
      mouseX + paddle.width / 2 > this.x
    ) {
      this.vy = random(-12, -1);
      this.xy = random(-12, 12);
    }
  }

  bounceOffTargets() {
    for (let i = 0; i < targets.length; i++) {
      const target = targets[i];
      if (this.y < target.y && this.x > target.x && this.x + this.size < target.x + target.width) {
        this.vy = -this.vy;
        targets.splice(i, 1);
        game.points++;
      }
    }
  }
}
class Paddle {
  constructor() {
    this.y = game.height - 50;
    this.width = random(50, 175);
    this.height = 10;
  }
  draw() {
    fill("purple");
    noStroke();
    rect(mouseX - this.width / 2, this.y, this.width, this.height);
  }
}

class Target {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.height = 10;
    this.width = game.width / game.targetCols;
    this.x = this.width * this.row;
    this.y = (100 / game.targetRows) * col + 20;
  }
  draw() {
    fill("orange");
    strokeWeight(2);
    stroke("white");
    rect(this.x, this.y, this.width, this.height);
  }
}
/** @type {Game} */
let game;
/** @type {Ball} */
let ball;
/** @type {Paddle} */
let paddle;
/** @type {Array<Target>} */
let targets = [];

var setup = function () {
  game = new Game();
  createCanvas(game.width, game.height);
  ball = new Ball();
  paddle = new Paddle();
  for (let across = 0; across < game.targetCols; across++) {
    for (let down = 0; down < game.targetRows; down++) {
      targets.push(new Target(across, down));
    }
  }
};

var draw = function () {
  background(200);
  angleMode(DEGREES);
  game.draw();
  ball.draw();
  paddle.draw();
  //for (const target of targets) {
  // target.draw();
  // }
  if (targets.length === 0) {
    fill("green");
    strokeWeight(3);
    stroke("white");
    text(`YOU WIN CONGRATS`, this.width / 3.5, this.height / 2);
    noLoop();
  }
};
