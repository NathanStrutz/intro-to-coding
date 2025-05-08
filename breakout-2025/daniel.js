///<reference path="lib/p5.global.d.ts" />

let targets = [];
let game;
let padd;
let ball;

class Game {
  constructor() {
    this.lives = 10;
    this.score = 0;
  }

  draw() {
    fill(255);
    textSize(20);
    text(`Score: ${this.score}`, 20, 30);
    text(`Lives: ${this.lives}`, width - 100, 30);
  }
}

class Paddle {
  constructor() {
    this.width = 200;
    this.height = 30;
    this.y = height - 40;
    this.x = width / 2 - this.width / 2;
  }

  draw() {
    this.x = constrain(mouseX - this.width / 2, 0, width - this.width);
    fill("white");
    rect(this.x, this.y, this.width, this.height);
  }
}

class Ball {
  constructor() {
    this.size = 15;
    this.x = width / 2;
    this.y = height / 2;
    this.vx = 5;
    this.vy = -5;
  }

  draw() {
    fill("red");
    ellipse(this.x, this.y, this.size);
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0) this.vy *= -1;

    if (this.y > height) {
      game.lives--;
      this.reset();
    }
  }

  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.vx = random([-5, 5]);
    this.vy = -5;
  }

  bounceOffPaddle(paddle) {
    if (
      this.x > paddle.x &&
      this.x < paddle.x + paddle.width &&
      this.y + this.size / 2 > paddle.y &&
      this.y < paddle.y + paddle.height
    ) {
      this.vy *= -1;
      this.y = paddle.y - this.size / 2;
    }
  }

  hit(target) {
    return (
      this.x > target.x &&
      this.x < target.x + target.w &&
      this.y > target.y &&
      this.y < target.y + target.h
    );
  }
}

class Target {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 70;
    this.h = 10;
    this.visible = true;
  }

  draw() {
    if (!this.visible) return;
    fill("green");
    rect(this.x, this.y, this.w, this.h);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  game = new Game();
  padd = new Paddle();
  ball = new Ball();

  let cols = floor(width / 70);
  let rows = 10;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      targets.push(new Target(j * 70 + 10, i * 30 + 60));
    }
  }
}

function draw() {
  background(30);
  game.draw();
  padd.draw();
  ball.draw();
  ball.move();
  ball.bounceOffPaddle(padd);

  for (let target of targets) {
    if (target.visible && ball.hit(target)) {
      ball.vy *= -1;
      ball.vx *= 1.05;
      ball.vy *= 1.05;
      target.visible = false;
      game.score += 10;
    }
    target.draw();
  }

  if (game.lives <= 0) {
    noLoop();
    textSize(40);
    fill("red");
    textAlign(CENTER);
    text("Game Over", width / 2, height / 2);
  }
}

