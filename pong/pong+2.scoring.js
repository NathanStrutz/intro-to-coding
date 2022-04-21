///<reference path="../lib/p5.global-mode.d.ts" />

class Pong {
  constructor() {
    this.table = new Table();
    this.leftPaddle = new LeftPaddle();
    this.rightPaddle = new RightPaddle();
    this.score = new Score();
    this.ball = new Ball(this.leftPaddle, this.rightPaddle, this.score);
  }

  draw() {
    this.table.draw();
    this.leftPaddle.draw();
    this.rightPaddle.draw();
    this.ball.draw();
    this.score.draw(this.leftScore, this.rightScore);
  }
}

class Table {
  draw() {
    background("black");

    let midPoint = windowWidth / 2;
    for (let y = 0; y < windowHeight; y++) {
      fill(50);
      rect(midPoint, y, 10, 20);
      y += 40;
    }
  }
}
class Paddle {
  constructor() {
    this.x = 10;
    this.y = windowHeight / 2;
    this.width = 10;
    this.height = 100;
  }
  draw() {
    fill(255);
    rect(this.x, this.y, this.width, this.height);
  }
}
class LeftPaddle extends Paddle {
  x = 40;
  draw() {
    this.y = mouseY;
    super.draw();
  }
}
class RightPaddle extends Paddle {
  draw() {
    this.x = windowWidth - 50;
    this.y = mouseY;
    super.draw();
  }
}
class Ball {
  constructor(leftPaddle, rightPaddle, score) {
    this.leftPaddle = leftPaddle;
    this.rightPaddle = rightPaddle;
    this.score = score;

    this.x = random(windowWidth);
    this.y = random(windowHeight);
    this.vx = 6;
    this.vy = 4;
    this.color = 255;
  }

  draw() {
    fill(this.color);
    if (this.x <= 0) {
      this.vx = -this.vx;
      this.score.rightScore++;
    }

    if (this.x >= windowWidth) {
      this.vx = -this.vx;
      this.score.leftScore++;
    }
    if (this.y < 0 || this.y > windowHeight) {
      this.vy = -this.vy;
    }
    this.x += this.vx;
    this.y += this.vy;
    square(this.x, this.y, 10);
  }
}

class Score {
  constructor() {
    this.leftScore = 0;
    this.rightScore = 0;
  }

  draw() {
    fill(180);
    textSize(32);
    textAlign("center");
    text(this.leftScore, windowWidth / 2 - 50, 50);
    text(this.rightScore, windowWidth / 2 + 50, 50);
  }
}
