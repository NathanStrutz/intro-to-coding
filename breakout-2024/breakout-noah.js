/// <reference path="../lib/p5.global.d.ts" />

class Game {
  points = 0;
  lives = 6;
  width = window.innerWidth;
  height = window.innerHeight - 5;
  targetColumns = 12;
  targetRows = 4;

  draw() {
    textSize(25);
    text(this.points, 25, this.height - 15);
    text(this.lives, game.width - 100, this.height - 20);

    if (targets.length === 0) {
      //You Win!
      textSize(100);
      textAlign(CENTER);
      text("You Win For now!", this.width / 2, this.height / 2);
      noLoop();
    }
    if (this.lives === 0) {
      //Fatality!
      textSize(150);
      textAlign(CENTER);
      text("Fatality!", this.width / 2, this.height / 2);
      noLoop();
    }
  }
}

class Ball {
  constructor() {
    this.x = 10;
    this.y = game.height - 100;
    this.vx = 10;
    this.vy = -10;
    this.size = random(5, 25);
    this.color = [0, 0, 0, 255];
  }
  draw() {
    stroke("black");
    strokeWeight(noStroke);
    fill("gray");
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
        this.vy = -this.vy;
        game.points += 5;
        targets.splice(i, 1);

        this.color[3] *= 0.8;
        this.vx *= 1.02;
        this.vy *= 1.02;
        paddle.width *= 0.99;
      }
    }
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
  for (let x = 0; x < game.targetColumns; x++) {
    targets.push(new Target(x * targetWidth, 20, targetWidth));
  }
  for (let x = 0; x < game.targetColumns; x++) {
    targets.push(new Target(x * targetWidth, 50, targetWidth));
  }
  for (let x = 0; x < game.targetColumns; x++) {
    targets.push(new Target(x * targetWidth, 80, targetWidth));
  }
};

var draw = function () {
  background("blue");
  ball.draw();
  paddle.draw();
  game.draw();
  for (const target of targets) {
    target.draw();
  }
};

class Paddle {
  constructor() {
    this.y = game.height - 50;
    this.x = 0;
    this.width = 150;
    this.height = 10;
  }
  draw() {
    fill("blue");
    stroke("Purple");
    this.x = mouseX - this.width / 2;
    rect(this.x, this.y, this.width, this.height);
  }
}
class Target {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = 20;
  }

  draw() {
    fill("blue");
    stroke("purple");
    strokeWeight(2);
    rect(this.x, this.y, this.width, this.height);
    game.draw();
  }
}
