///<reference path="../lib/p5.global.d.ts" />

class Game {
  constructor() {
    this.lives = 3;
    this.score = 0;
    this.targetRows = 5; 
    this.targetCols = 8; 
  }
  draw() {
    fill ("black");
    textSize(32);
    fill("Blue")
    text(`Score: ${this.score}` , 20, height - 20,);
    fill("red")
    text(`Lives: ${this.lives}`, width - 150, height - 20);

    if (this.lives <= 0) {
      background ("Black");
      paddle.color = "white";
      fill("red");
      textSize(64);
      textAlign(CENTER);
      text("Game Over", width / 2, height / 2);
      textSize(32);
      text("Refresh Page to Restart", width / 2, height / 2 + 50);
      noLoop();
    }
    if (this.score >= this.targetRows * this.targetCols * 10) {
      background ("Black");
      paddle.color = "white";
      fill(2,252,13);
      textSize(64);
      textAlign(CENTER);
      text("You Win!", width / 2, height / 2);
      textSize(32);
      text("Refresh Page to Restart", width / 2, height / 2 + 50);
      noLoop();
    }
    if (this.score >= 100) {
      paddle.width = 200;
    }
    if (this.score >= 200) {
      paddle.width = 150;
    }
    if (this.score >= 300) {
      paddle.width = 100;
    }
  }
}

class Paddle {
  constructor() {
    this.x = 0;
    this.y = height - 60;
    this.width = 300;
    this.height = 20;
  }
  draw() {
    this.x = mouseX - this.width / 2;
    fill("black");
    rect(this.x, this.y, this.width, 20);
  }
}

class Ball {
  constructor() {
    this.x = random(0, width);
    this.y = height - 100;
    this.vx = random(4.7, 5.3);
    this.vy = -5;
    this.size = 20;
  }

  draw() {
    fill("red");
    square((this.x += this.vx), (this.y += this.vy), this.size);
    this.bounceOffWalls();
    this.bounceOffPaddle();
    this.bounceOffTargets();
  }

  bounceOffWalls() {
    if (this.x < 0) {
      this.vx = Math.abs(this.vx);
    }
    if (this.x + this.size > width) {
      this.vx = -Math.abs(this.vx);
    }
    if (this.y < 0) {
      this.vy = Math.abs(this.vy);
    }
    if (this.y > height) {
      game.lives--;
      ball = new Ball();
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
    for (let i in targets) {
      let target = targets[i];
      if (
        this.x + this.size > target.x && 
        this.x < target.x + target.width && 
        this.y + this.size > target.y && 
        this.y < target.y + target.height
      ) {
        this.vy = -this.vy;
        targets.splice(i, 1)
        game.score += 10; 
        this.vx = min(this.vx * 1.1, 10);
        this.vy = min(this.vy * 1.1, 10);
      }
    }
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
    fill(random(255), random(255), random(255));
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

  const targetWidth = width / game.targetCols;
  const targetHeight = 50;

  for (let row = 0; row < game.targetRows; row++) {
    for (let col = 0; col < game.targetCols; col++) {
      targets.push(new Target(col * targetWidth, row * targetHeight, targetWidth, targetHeight));
    }
  }
};

var draw = function () {
  background ("white"); // For epilepsy replace with (random(255), random(255), random(255))
  // draw game
  game.draw();
  // draw ball
  ball.draw();
  // draw targets
  for (let target of targets) {
    target.draw();
  }
  // draw paddle
  paddle.draw();
};
