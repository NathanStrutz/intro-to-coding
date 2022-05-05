///<reference path="../../lib/p5.global-mode.d.ts" />

class Pong {
  constructor() {
    this.table = new Table();
    this.leftPaddle = new LeftPaddle();
    this.rightPaddle = new RightPaddle();
    this.score = new Score();
    this.createNewBall();
  }
  createNewBall() {
    this.ball = new Ball(this.leftPaddle, this.rightPaddle, this.score);
    this.ball.registerPointHandler(this.score);
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
  leftPointScored() {
    this.leftScore++;
  }
  rightPointScored() {
    this.rightScore++;
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
  x = 40;
  draw() {
    this.y = mouseY;
    super.draw();
  }
  isCollidingWith(ball) {
    if (ball.x < this.x + this.width && ball.y + 10 >= this.y && ball.y <= this.y + this.height)
      if (ball.vx > 0) {
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
    if (ball.x + 10 > this.x && ball.y + 10 >= this.y && ball.y <= this.y + this.height) {
      if (ball.vx < 0) {
        return false;
      } else {
        return true;
      }
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
  /**
   * Register an object to listen in on point scored events
   * @param {leftPointScored: Function, rightPointScored: Function} handler Object with leftPointScored and rightPointScored methods
   */
  registerPointHandler(handler) {
    this.pointHandlers.push(handler);
  }
  fireLeftPointScored() {
    for (let handler of this.pointHandlers) {
      handler.leftPointScored();
    }
  }
  fireRightPointScored() {
    for (let handler of this.pointHandlers) {
      handler.rightPointScored();
    }
  }

  draw() {
    // Paddle collisions
    if (this.leftPaddle.isCollidingWith(this) || this.rightPaddle.isCollidingWith(this)) {
      this.vx = -this.vx * 1.1;
    }

    // Bounce off the right wall
    if (this.x + 10 >= windowWidth && this.vx > 0) {
      this.vx = -this.vx;
      this.fireLeftPointScored();
    }
    // Bounce off the left wall
    if (this.x <= 0 && this.vx < 0) {
      this.vx = -this.vx;
      this.fireRightPointScored();
    }

    // Bounce off the top & bottom wall
    if (this.y < 0 || this.y > windowHeight) {
      this.vy = -this.vy;
    }

    fill(this.color);
    this.x += this.vx;
    this.y += this.vy;
    square(this.x, this.y, 10);
  }
}
