///<reference path="../../lib/p5.global-mode.d.ts" />

class Pong {
  constructor() {
    this.table = new Table();
    this.leftPaddle = new LeftPaddle();
    this.rightPaddle = new RightPaddle();
    this.ball = new Ball();
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
    background("pink");

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
    fill(1);
    rect(this.x, this.y, this.width, this.height);
  }
}
class LeftPaddle extends Paddle {
  x = 40;
  draw() {
    this.y = mouseY;
    super.draw();
  }
  isCollidingWith(ball) {
    if (ball.x + ball.size > this.x && ball.y + ball.size >= this.y && ball.y <= this.y + this.height) {
      if (ball.vx < 0) {
        return false;
      } else {
        this.registerCollision();
        return true;
      }
    }
  }
}

class RightPaddle extends Paddle {
  x = windowWidth - 50;
  draw() {
    this.y = mouseY;
    super.draw();
  }
  isCollidingWith(ball) {
    if (ball.x + ball.size > this.x && ball.y + ball.size >= this.y && ball.y <= this.y + this.height) {
      if (ball.vx < 0) {
        return false;
      } else {
        this.registerCollision();
        return true;
      }
    }
  }
}
class Ball {
  constructor() {
    this.x = random(windowWidth);
    this.y = random(windowHeight);
    this.vx = 7;
    this.vy = 6;
    this.color = 1;
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
    circle(this.x, this.y, 20, 20, 20);

    if (this.leftPaddle.isCollidingWith(this) || this.rightPaddle.isCollidingWith(this)) {
      console.log("Collision");
      this.vx = this.vx;
    }
  }
}
