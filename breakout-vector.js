/// <reference path="lib/p5.global.d.ts" />

class Game {
  width = 1000;
  height = 600;
  lives = 3;
  points = 0;
  targetRows = 5;
  targetCols = 7;
}

class Ball {
  constructor() {
    this.x = game.width / 2;
    this.y = game.height - 100;
    this.size = 20;
    let startingVelocity = {
      x: random([1, -1]) * random(2, 3.5),
      y: -3,
    };
    this.vector = createVector(startingVelocity.x, startingVelocity.y);
    this.vector.setMag(3);
  }
  draw() {
    fill("red");
    square(this.x, this.y, this.size);
    this.x += this.vector.x;
    this.y += this.vector.y;

    this.bounceOffWalls();
    this.bounceOffPaddle();
    this.bounceOffTargets();
  }
  bounceOffWalls() {
    if (this.x <= 0) this.vector.x = Math.abs(this.vector.x);
    if (this.x + this.size >= game.width) this.vector.x = -Math.abs(this.vector.x);
    if (this.y <= 0) this.vector.y = Math.abs(this.vector.y);
    if (this.y + this.size >= game.height) {
      game.lives -= 1;
      ball = new Ball();
    }
  }
  bounceOffPaddle() {
    if (this.x + this.size >= paddle.x && this.x <= paddle.x + paddle.width && this.y + this.size >= paddle.y) {
      // bounce upward
      this.vector.y = -Math.abs(this.vector.y);

      // todo: rotate based on paddle bounce position

      if (Math.abs(this.x - paddle.x) < this.size) {
        ball.vector.rotate((-0.3 * PI) / 3);
      }
    }
  }
  bounceOffTargets() {
    for (let i = 0; i < targets.length; i++) {
      let target = targets[i];
      if (
        this.x + this.size >= target.x &&
        this.x <= target.x + target.width &&
        this.y + this.size >= target.y &&
        this.y <= target.y + target.height
      ) {
        this.vector.y = -this.vector.y;
        targets.splice(i, 1);
        game.points += 10;
        return;
      }
    }
  }
}

class Paddle {
  constructor() {
    this.y = game.height - 50;
    this.x = 0;
    this.width = 150;
    this.height = 10;
  }
  draw() {
    fill("white");
    noStroke();
    this.x = mouseX - this.width / 2;
    rect(this.x, this.y, this.width, this.height);
  }
}

class Target {
  constructor(row, col) {
    this.row = row;
    this.col = col;

    this.height = 15;
    this.width = game.width / game.targetCols;
    this.x = this.width * this.row;
    this.y = (120 / game.targetRows) * col + 20;
  }
  draw() {
    fill("blue");
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
  ball.draw();
  paddle.draw();
  for (const target of targets) {
    target.draw();
  }

  if (targets.length === 0) {
    // you win!
    noLoop();
  }
};
