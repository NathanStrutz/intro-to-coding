///<reference path="../lib/p5.global.d.ts" />

class Game {
  constructor() {
    this.lives = 3;
    this.score = 0;
  }

  draw() {
    fill(255);
    textSize(24);
    text(`Lives: ${this.lives}`, 20, 30);
    text(`Score: ${this.score}`, 20, 60);
  }
}

class Paddle {
  constructor() {
    this.width = 200;
    this.height = 3;
    this.x = 0;
    this.y = height - 60;
  }

  draw() {
    this.x = constrain(mouseX - this.width / 2, 0, width - this.width);
    fill("red");
    rect(this.x, this.y, this.width, this.height);
  }
}

class Ball {
  constructor() {
    this.size = 10;
    this.reset();
    this.vx = 8 * (random() > 0.5 ? 1 : -1);
    this.vy = -8;
  }

  reset() {
    this.x = width / 2;
    this.y = height - 100;
    this.vx = 5 * (random() > 0.5 ? 1 : -1);
    this.vy = -5;
  }

  draw() {
    fill("red");
    square(this.x, this.y, this.size);
    this.x += this.vx;
    this.y += this.vy;

    this.bounceOffWalls();
    this.bounceOffPaddle();
    this.bounceOffTargets();

    if (this.y > height) {
      game.lives--;
      if (game.lives > 0) {
        this.reset();
      } else {
        noLoop();
        textSize(48);
        fill("white");
        text("🐎", width / 2 - 120, height / 2);
      }
    }

    if (targets.length === 0) {
      noLoop();
      textSize(48);
      fill("lightgreen");
      text(
        "ARGHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH HE HE HA HA",
        width / 2 - 100,
        height / 2
      );
    }
  }

  bounceOffWalls() {
    if (this.x <= 0 || this.x + this.size >= width) {
      this.vx *= -1;
    }
    if (this.y <= 0) {
      this.vy *= -1;
    }
  }

  bounceOffPaddle() {
    if (
      this.x + this.size > paddle.x &&
      this.x < paddle.x + paddle.width &&
      this.y + this.size > paddle.y &&
      this.y < paddle.y + paddle.height
    ) {
      this.vy = -Math.abs(this.vy);
    }
  }

  bounceOffTargets() {
    for (let i = targets.length - 1; i >= 0; i--) {
      let t = targets[i];
      if (
        this.x + this.size > t.x &&
        this.x < t.x + t.width &&
        this.y + this.size > t.y &&
        this.y < t.y + t.height
      ) {
        this.vy *= -1;
        targets.splice(i, 1);
        game.score += 10;
        break;
      }
    }
  }
}

class Target {
  constructor(col, row, totalCols, totalRows) {
    const margin = 10;
    this.width = (width - margin * (totalCols + 1)) / totalCols;
    this.height = 30;
    this.x = margin + col * (this.width + margin);
    this.y = margin + row * (this.height + margin) + 80; //🔹
  }

  draw() {
    fill("purple");
    rect(this.x, this.y, this.width, this.height, 5);
  }
}

let game;
let paddle;
let ball;
let targets = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  game = new Game();
  paddle = new Paddle();
  ball = new Ball();

  const cols = 10;
  const rows = 5;
  targets = [];

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      targets.push(new Target(x, y, cols, rows));
    }
  }
}

function draw() {
  background(6);
  game.draw();
  ball.draw();
  for (let target of targets) {
    target.draw();
  }
  paddle.draw();
}
