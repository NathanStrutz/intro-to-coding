///<reference path="../lib/p5.global-mode.d.ts" />

class Pong {
  constructor() {
    this.table = new Table();
    this.leftPaddle = new LeftPaddle();
    this.rightPaddle = new RightPaddle();
    this.score = new Score();
    this.ball = new Ball(this.leftPaddle, this.rightPaddle, this.score);
    this.createNewBall();
  }
  createNewBall() {
    this.ball = new Ball(this.leftPaddle, this.rightPaddle);
  }
  draw() {
    this.table.draw();
    this.leftPaddle.draw();
    this.rightPaddle.draw();
    this.ball.draw();
    this.score.draw(this.leftScore, this.rightScore);
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

class Table {
  draw() {
    background("#003151");

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
  x = windowWidth - 1510;
  draw() {
    this.y = mouseY;
    super.draw();
  }
  isCollidingWith(ball) {
    if (ball.x + ball.size > this.x && ball.y + ball.size >= this.y && ball.y <= this.y + th)
      if (ball.vx < 0) {
        return false;
      } else {
        return true;
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
        console.log("right passthrough");
        return false;
      } else {
        console.log("right collision");
        // this.registerCollision();
        return true;
      }
    } else {
      console.log("right nothing");
    }
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
    this.color = "#FD6A02";
  }
  pointHandlers = [];
  registerPointHandler(handler) {
    this.pointHandlers.push(handler);
  }
  fireLeftPointScored() {
    if (this.x + this.size >= windowWidth) {
      this.vx = this.vx;
      this.fireLeftPointScored();
    }
    if (this.y < 0 || this.y + this.size > windowHeight) {
      this.vy = -this.vy;
    }
    if (this.leftPaddle.isColldingWith(this) || this.rightPaddle.isColldingWith(this)) {
      this.vx = -this.vx * 1.1;
    }
    this.x += this.vx;
    this.y += this.vy;
    square(this.x, this.y, this.size);
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
