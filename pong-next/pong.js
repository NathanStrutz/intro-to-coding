///<reference path="../lib/p5.global-mode.d.ts" />

class Pong {
  constructor() {
    this.court = new Court();
    this.leftPaddle = new UserPaddle(10);
    this.rightPaddle = new ComputerPaddle(windowWidth - 15);
    this.ball = new Ball();
  }

  draw() {
    this.court.draw();
    this.leftPaddle.draw();
    this.rightPaddle.draw();
    this.ball.draw();
  }
}

class Court {
  draw() {
    background(50);

    // draw the middle line
    fill(100);
    noStroke();
    for (let i = 0; i < windowHeight; i += 20) {
      rect(windowWidth / 2, i, 10, 10);
    }
  }
}

class Paddle {
  constructor(x) {
    this.width = 10;
    this.height = 100;
    this.x = x;
    this.y = windowHeight / 2 - this.height / 2;
  }
  draw() {
    fill(255);
    rect(this.x, this.y, this.width, this.height);
  }
}
class UserPaddle extends Paddle {
  draw() {
    this.y = mouseY;
    super.draw();
    // this.y = mouseY - this.height / 2;
  }
}
class ComputerPaddle extends Paddle {
  draw() {
    this.y = this.height / 2;
    super.draw();
  }
}

class Ball {
  constructor() {
    this.size = 20;
    this.x = 50;
    this.y = windowHeight / 2;
    this.vx = 5;
    this.vy = 3;
  }
  draw() {
    fill(255);
    this.x += this.vx;
    this.y += this.vy;
    rect(this.x, this.y, 20, 20);

    if (this.x < 0 || this.x + this.size > windowWidth) {
      this.vx = -this.vx;
    }
    if (this.y < 0 || this.y + this.size > windowHeight) {
      this.vy = -this.vy;
    }
  }
}
