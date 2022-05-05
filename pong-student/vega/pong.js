///<reference path="../../lib/p5.global-mode.d.ts" />

class Pong {
  constructor() {
    this.table = new Table();
    this.leftPaddle = new LeftPaddle();
    this.rightPaddle = new RightPaddle();
    this.ball = new Ball(this.leftPaddle, this.rightPaddle);
  }

  draw() {
    this.table.draw();
    this.leftPaddle.draw();
    this.rightPaddle.draw();
    this.ball.draw();
  }
}

class Table {
  draw() {
    background("green");

    let midPoint = windowWidth / 2;
    for (let y = 0; y < windowHeight; y++) {
      fill(50);
      rect(midPoint, y, 10, 20);
      y += 40;
    }
    class Score {
      constructor() {
        this.leftScore = 0;
        this.rightScore = 0;
      }
      draw() {
        fill(100);
        textSize(32);
        textAlign("center");
        text(this.leftScore, windowWidth / 2 - 50, 50);
        text(this.rightScore, windowWidth / 2 + 50, 50);
      }
    }

    var draw = function () {
      background(0);
      game.draw();
    };
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
  x = windowWidth - 40;
  draw() {
    this.y = mouseY;
    super.draw();
  }
}
class Ball {
  constructor(leftPaddle, rightPaddle) {
    this.leftPaddle = leftPaddle;
    this.rightPaddle = rightPaddle;

    this.x = windowWidth / 2;
    this.y = random(windowHeight);
    this.vx = 6;
    this.vy = 4;
    this.size = 10;
    this.color = 255;
  }

  draw() {
    fill(this.color);
    if (this.x < 0 || this.x > windowWidth) {
      this.vx = -this.vx;
    }
    if (this.y < 0 || this.y > windowHeight) {
      this.vy = -this.vy;
    }
    if (
      this.x < this.leftPaddle.x + this.leftPaddle.width &&
      this.y + this.size > this.leftPaddle.y &&
      this.y < this.leftPaddle.y + this.leftPaddle.height &&
      this.vx < 0
    ) {
      this.vx = -this.vx;
    }
    if (
      this.x + this.size > this.rightPaddle.x &&
      this.y + this.size > this.rightPaddle.y &&
      this.y < this.rightPaddle.y + this.rightPaddle.height &&
      this.vx > 0
    ) {
      this.vx = -this.vx;
    }
    this.x += this.vx;
    this.y += this.vy;
    square(this.x, this.y, 10);
  }
}
