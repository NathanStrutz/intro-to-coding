let paddle;
let ball;
let bricks = [];
let brickRows = 5;
let brickCols = 10;
let brickWidth;
let brickHeight;
let score = 0;
let lives = 3;
let gameOver = false;

function setup() {
  createCanvas(800, 600);
  paddle = new Paddle();
  ball = new Ball();
  brickWidth = width / brickCols;
  brickHeight = 30;
  createBricks();
}

function draw() {
  background(0);

  paddle.update();
  paddle.display();

  ball.update();
  ball.checkCollision();
  ball.display();

  for (let i = bricks.length - 1; i >= 0; i--) {
    bricks[i].display();
    if (ball.hits(bricks[i])) {
      bricks.splice(i, 1);
      ball.reverse("y");
      score++;
    }
  }

  displayScore();
  displayLives();

  if (bricks.length === 0) {
    gameOver = true;
    textSize(32);
    fill(255);
    textAlign(CENTER, CENTER);
    text("Winner Winner Chicken Dinner!", width / 2, height / 2);
  }

  if (lives === 0) {
    gameOver = true;
    textSize(32);
    fill(255);
    textAlign(CENTER, CENTER);
    text("Game Over Buddy", width / 2, height / 2);
    noLoop();
  }

  let paddleWidth = map(score, 0, 50, 100, 50);
  paddle.setWidth(paddleWidth);

  let ballSpeed = map(score, 0, 50, 5, 10);
  ball.setSpeed(ballSpeed);
}

function createBricks() {
  for (let i = 0; i < brickRows; i++) {
    for (let j = 0; j < brickCols; j++) {
      bricks.push(
        new Brick(j * brickWidth, i * brickHeight + 50, brickWidth, brickHeight)
      );
    }
  }
}

function displayScore() {
  textSize(24);
  fill(255);
  textAlign(LEFT);
  text("Score: " + score, 10, 30);
}

function displayLives() {
  textSize(24);
  fill(255);
  textAlign(RIGHT);
  text("Lives: " + lives, width - 10, 30);
}

class Paddle {
  constructor() {
    this.width = 100;
    this.height = 20;
    this.x = width / 2 - this.width / 2;
    this.y = height - 40;
    this.speed = 8;
  }

  update() {
    this.x = constrain(mouseX - this.width / 2, 0, width - this.width);
  }

  display() {
    fill(255);
    rect(this.x, this.y, this.width, this.height);
  }

  setWidth(newWidth) {
    this.width = newWidth;
  }
}

class Ball {
  constructor() {
    this.size = 20;
    this.x = width / 2;
    this.y = height / 2;
    this.xSpeed = random(-5, 5);
    this.ySpeed = -5;
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x < 0 || this.x > width) {
      this.reverse("x");
    }
    if (this.y < 0) {
      this.reverse("y");
    }
    if (this.y > height) {
      this.reset();
      lives--;
    }
  }

  display() {
    fill(255);
    ellipse(this.x, this.y, this.size);
  }

  hits(brick) {
    let d = dist(
      this.x,
      this.y,
      brick.x + brick.width / 2,
      brick.y + brick.height / 2
    );
    return d < this.size / 2 + brick.width / 2;
  }

  checkCollision() {
    if (
      this.x > paddle.x &&
      this.x < paddle.x + paddle.width &&
      this.y + this.size / 2 > paddle.y
    ) {
      this.reverse("y");
    }
  }

  reverse(direction) {
    if (direction === "x") {
      this.xSpeed *= -1;
    } else if (direction === "y") {
      this.ySpeed *= -1;
    }
  }

  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.xSpeed = random(-5, 5);
    this.ySpeed = -5;
  }

  setSpeed(newSpeed) {
    this.xSpeed = this.xSpeed > 0 ? newSpeed : -newSpeed;
    this.ySpeed = this.ySpeed > 0 ? newSpeed : -newSpeed;
  }
}

class Brick {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color(random(255), random(255), random(255));
  }

  display() {
    this.color = color(random(255), random(255), random(255));
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
  }
}
