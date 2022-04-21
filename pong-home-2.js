///<reference path="../lib/p5.global-mode.d.ts" />

class Pong {
  constructor() {
    let court = new Court();
    let leftPaddle = new UserPaddle(10);
    let rightPaddle = new ComputerPaddle(windowWidth - 15);
    let ball = new Ball();

    leftPaddle.setBall(ball);
    rightPaddle.setBall(ball);
    ball.setPaddles(leftPaddle, rightPaddle);

    this.court = court;
    this.leftPaddle = leftPaddle;
    this.rightPaddle = rightPaddle;
    this.ball = ball;
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

  setBall(ball) {
    this.ball = ball;
  }

  draw() {
    fill(255);
    rect(this.x, this.y, this.width, this.height);
  }
}
class LeftPaddle extends Paddle {
  x = 40;
  draw() {
    super.draw();
  }
}
class RightPaddle extends Paddle {
  x = windowWidth - 50;
  draw() {
    this.y = this.ball.y - this.height / 2;
    super.draw();
  }
}
class Ball {
  constructor() {
    this.x = random(windowWidth);
    this.y = random(windowHeight);
    this.vx = 6;
    this.vy = 4;
    this.color = 255;
  }

  setPaddles(leftPaddle, rightPaddle) {
    this.leftPaddle = leftPaddle;
    this.rightPaddle = rightPaddle;
  }

  draw() {
    fill(this.color);
    if (this.x < 0 || this.x > windowWidth) {
      this.vx = -this.vx;
    }
    if (this.y < 0 || this.y > windowHeight) {
      this.vy = -this.vy;
    }
    this.x += this.vx;
    this.y += this.vy;
    square(this.x, this.y, 10);
  }
}
