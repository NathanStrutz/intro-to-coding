let game;
let paddle;
let balls = [];
let targets = [];

class Game {
  constructor() {
    this.lives = 100;
    this.score = 0;
  }
  draw() {
    fill("white");
    textSize(24);
    text("Score: " + this.score, 20, 35);
    text("Lives: " + this.lives, 20, 60);
  }
}

class Paddle {
  constructor() {
    this.width = 250;
    this.y = height - 70;
    this.x = mouseX - this.width / 2;
  }
  draw() {
    this.x = mouseX - this.width / 2;
    this.x = constrain(this.x, 0, width - this.width);

    for (let i = 3; i >= 1; i--) {
      fill(0, 255, 255, 50 * i);
      rect(this.x - i, this.y - i, this.width + i * 2, 20 + i * 2, 10);
    }

    fill(0, 255, 255);
    rect(this.x, this.y, this.width, 20, 10);
  }
}

class Ball {
  constructor() {
    this.x = random(0, width);
    this.y = height - 100;
    this.vx = random(-1, 1);
    this.vy = random(-1, -0.4);
    this.speed = 15;
  }

  draw() {
    this.x += this.vx * this.speed;
    this.y += this.vy * this.speed;

    for (let i = targets.length - 1; i >= 0; i--) {
      const t = targets[i];
      if (
        this.x + 10 > t.x &&
        this.x - 10 < t.x + t.width &&
        this.y + 10 > t.y &&
        this.y - 10 < t.y + t.height
      ) {
        this.vy = -this.vy;
        targets.splice(i, 1);
        game.score += 10;
        //  this.vx += 5;
        //  this.vy += (-5, -2);
        break;
      }
    }

    if (this.x < 0 || this.x > width) {
      this.vx = -this.vx;
    }
    if (this.y < 0) {
      this.vy = -this.vy;
    }
    if (
      this.y + 10 >= paddle.y &&
      this.x >= paddle.x &&
      this.x <= paddle.x + paddle.width &&
      this.vy > 0
    ) {
      this.vy = -this.vy;
      this.y = paddle.y - 10;
    }
    if (this.y > height) {
      game.lives--;
      this.reset();
    }

    strokeWeight(4);
    stroke(255, 0, 0, 100);
    line(
      this.x,
      this.y,
      this.x - this.vx * this.speed * 5,
      this.y - this.vy * this.speed * 5
    );

    noStroke();
    fill(255, 0, 0);
    circle(this.x, this.y, 12);
  }

  reset() {
    this.x = random(0, width);
    this.y = height - 100;
    this.vx = random(-1, 1);
    this.vy = random(-1, -0.4);
    this.speed = random(4, 6);
  }

  static generateBalls(count) {
    const balls = [];
    for (let i = 0; i < count; i++) {
      balls.push(new Ball());
    }
    return balls;
  }
}

class Target {
  constructor(x, y) {
    this.width = 150;
    this.height = 25;
    this.x = x;
    this.y = y;
  }

  draw() {
    fill("black");
    strokeWeight(4);
    stroke(255, 0, 0, 100);
    rect(this.x, this.y, this.width, this.height);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  game = new Game();
  paddle = new Paddle();
  balls = Ball.generateBalls(2);

  const targetWidth = 150;
  const targetHeight = 25;
  const paddingX = 15;
  const paddingY = 10;

  const columns = 10;
  const rows = 9;

  const totalGridWidth = columns * targetWidth + (columns - 1) * paddingX;
  const totalGridHeight = rows * targetHeight + (rows - 1) * paddingY;

  const startX = (windowWidth - totalGridWidth) / 2;
  const startY = 50;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const x = startX + col * (targetWidth + paddingX);
      const y = startY + row * (targetHeight + paddingY);
      targets.push(new Target(x, y));
    }
  }
}

function draw() {
  background(66);
  game.draw();

  for (let ball of balls) {
    ball.draw();
  }

  for (let target of targets) {
    target.draw();
  }

  paddle.draw();
}
