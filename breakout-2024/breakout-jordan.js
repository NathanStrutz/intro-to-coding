///<reference path="../lib/p5.global.d.ts" />

class Game {
  points = 0;
  lives = 3;
  width = window.innerWidth;
  height = window.innerHeight - 5;
  targetColumns = 2;
  targetRows = 0;

  draw() {
    textSize(50);
    text(this.points, 20, this.height - 30);

    text(this.lives, game.width - 100, game.height - 30);

    if (targets.length === 0) {
      textSize(50);
      textAlign(CENTER);
      text("you win!!", this.width / 2, this.height / 2);
      noLoop();
    }

    if (this.lives === 0) {
      textSize(50);
      textAlign(CENTER);
      text("you lose!!", this.width / 2, this.height / 2);
      noLoop();
    }
  }
}

class Ball {
  constructor() {
    this.x = 10;
    this.y = game.height - 100;
    this.vx = 5;
    this.vy = -5;
    this.size = 25;
  }
  draw() {
    stroke("yellow");
    strokeWeight(10);
    fill("blue");
    square(this.x, this.y, this.size);
    this.x += this.vx;
    this.y += this.vy;

    this.bounceOffWalls();
    this.bounceOffTargets();
    this.bounceOffPaddle();
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
      this.x + this.size > paddle.x &&
      this.x < paddle.x + paddle.width &&
      this.y + this.size >= paddle.y &&
      this.y <= paddle.y + paddle.height
    ) {
      this.vy = -Math.abs(this.vy);
    }

    if (
      this.x + this.size > paddle2.x &&
      this.x < paddle2.x + paddle2.width &&
      this.y + this.size >= paddle2.y &&
      this.y <= paddle2.y + paddle2.height
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
        this.vy = -this.vy;
        game.points += 5;
        targets.splice(i, 1);

        this.vx *= 1.2;
        this.vy *= 1.2;
      }
    }
  }
}
class Paddle {
  constructor() {
    this.y = game.height - 50;
    this.x = 0;
    this.width = 150;
    this.height = 15;
  }
  draw() {
    fill("green");
    noStroke();
    this.x = mouseX - this.width / 2;
    rect(this.x, this.y, this.width, this.height);
  }
}

class Paddle2 {
  constructor() {
    this.y = game.height - 600;
    this.x = 0;
    this.width = 150;
    this.height = 15;
  }
  draw() {
    fill("green");
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
    fill("pink");
    stroke("orange");
    strokeWeight(3);
    rect(this.x, this.y, this.width, 20);
  }
}

let game = new Game();
let targets = [];
let ball;
let paddle;
let paddle2;

var setup = function () {
  createCanvas(game.width, game.height);
  background(150);
  ball = new Ball();
  paddle = new Paddle();
  paddle2 = new Paddle2();

  // targets
  let targetWidth = game.width / game.targetColumns;
  let targetheight = 30;
  let targetgap = 3;
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < game.targetColumns; x++) {
      targets.push(
        new Target(
          x * targetWidth,
          y * targetheight + y * targetgap,
          targetWidth,
          targetheight
        )
      );
    }
  }
};
var draw = function () {
  background("magenta");
  ball.draw();
  paddle.draw();
  paddle2.draw();
  for (const target of targets) {
    target.draw();
  }
  game.draw();
};
