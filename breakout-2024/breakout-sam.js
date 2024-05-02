///<reference path="../lib/p5.global.d.ts" />

class Game {
  constructor() {
    this.points = 0;
    this.lives = 3;
    this.width = window.innerWidth;
    this.height = window.innerHeight - 5;
    this.targetColumns = 10;
    this.targetRows = 3;
    this.misses = 0; // misses
  }
}

class Ball {
  constructor() {
    this.size = 17;
    this.reset();
  }

  reset() {
    this.x = random(this.size / 2, game.width - this.size / 2);
    this.y = game.height - 50;
    // update velo
    this.vx = random(-5, 5) * 1.2;
    this.vy = random(-5, -3) * 1.2;
  }

  draw() {
    stroke("black");
    strokeWeight(4);
    fill("gold");
    square(this.x, this.y, this.size);
    this.x += this.vx;
    this.y += this.vy;
    this.wallBounce();
    this.paddleBounce();
    this.targetBounce();
    this.bottomBounce();
  }

  wallBounce() {
    if (this.x < this.size / 2 || this.x + this.size / 2 > game.width) {
      this.vx = -this.vx;
    }
    if (this.y < this.size / 2 || this.y + this.size / 2 > game.height) {
      this.vy = -this.vy;
    }
  }

  paddleBounce() {
    if (
      this.x + this.size / 2 > paddle.x &&
      this.x - this.size / 2 < paddle.x + paddle.width &&
      this.y + this.size / 2 > paddle.y &&
      this.y - this.size / 2 < paddle.y + paddle.height
    ) {
      this.vy = -this.vy;
    }
  }

  targetBounce() {
    for (let i = 0; i < targets.length; i++) {
      const target = targets[i];
      if (
        this.x + this.size / 2 > target.x &&
        this.x - this.size / 2 < target.x + target.width &&
        this.y + this.size / 2 > target.y &&
        this.y - this.size / 2 < target.y + target.height
      ) {
        this.vy = -this.vy;
        game.points += 5;
        targets.splice(i, 1);
        this.vx = this.vy * 1.5;
        this.vy += 0.5;
      }
    }
  }

  bottomBounce() {
    if (this.y + this.size / 2 > game.height) {
      game.lives--;
      game.misses++; // count misses
      if (game.lives > 0) {
        // increase velocity
        this.vx *= 1.2;
        this.vy *= 1.2;
        this.reset();
      } else {
        console.log("Game Over");
        noLoop();
      }
    }
  }
}

class Paddle {
  constructor() {
    this.y = game.height - 50;
    this.x = 0;
    this.width = 300;
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

let game;
let ball;
let targets = [];
let paddle;
let gameOverText = "YOU LOST"; // LOST TEXT

function setup() {
  game = new Game();
  createCanvas(game.width, game.height);
  background(150);
  paddle = new Paddle();

  // targets
  let targetWidth = game.width / game.targetColumns;
  let targetHeight = 40;
  let targetGap = 0;
  for (let y = 0; y < 8; y++) {
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

  // Initial ball
  ball = new Ball();
}

function draw() {
  background(200);
  ball.draw();
  paddle.draw();
  for (const target of targets) {
    target.draw();
  }

  // show score
  fill(255, 255, 0);
  textSize(60);
  textAlign(LEFT, BOTTOM);
  text("SCORE: " + game.points, 20, height - 20);

  // player loses
  if (game.misses >= 3) {
    // Display "YOU LOST"
    fill(255, 0, 0);
    textSize(128);
    textAlign(CENTER, CENTER);
    text(gameOverText, width / 2, height / 2);
    noLoop();
  }

  // player wins
  if (targets.length === 0) {
    // Display "YOU WON"
    fill(0, 255, 0);
    textSize(128);
    textAlign(CENTER, CENTER);
    text(winMessage, width / 2, height / 2);
    noLoop();
  }
}
