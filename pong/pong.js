///<reference path="../lib/p5.global-mode.d.ts" />

class Pong {
  constructor() {
    this.table = new Table();
    this.leftPaddle = new LeftPaddle();
    this.rightPaddle = new RightPaddle();
    this.score = new Score();
    this.createNewBall();
  }

  winningPoints = 2;

  createNewBall() {
    this.ball = new Ball(this.leftPaddle, this.rightPaddle);
    this.ball.registerPointHandler(this);
    this.ball.registerPointHandler(this.score);
  }

  leftPointScored() {
    if (this.score.leftScore >= this.winningPoints - 1) {
      this.winLeft();
    } else {
      this.createNewBall();
    }
  }
  rightPointScored() {
    if (this.score.rightScore >= this.winningPoints - 1) {
      this.winRight();
    } else {
      this.createNewBall();
    }
  }

  winLeft() {
    this.ball = new GameOverBall();
    this.table.winLeft();
  }
  winRight() {
    this.ball = new GameOverBall();
    this.table.winRight();
  }

  draw() {
    this.table.draw();
    this.leftPaddle.draw();
    this.rightPaddle.draw();
    this.ball.draw();
    this.score.draw();
  }
}

class Table {
  constructor() {
    this.leftWins = false;
    this.rightWins = false;
  }
  winLeft() {
    this.leftWins = true;
  }
  winRight() {
    this.rightWins = true;
  }

  draw() {
    background("black");

    let midPoint = windowWidth / 2 - 5;
    for (let y = 0; y < windowHeight; y++) {
      fill(50);
      rect(midPoint, y, 10, 20);
      y += 40;
    }

    if (this.leftWins) {
      push();
      // win message
      color(255);
      textSize(70);
      textAlign("center");
      text("You Win!", windowWidth / 4, 150);

      // red backdrop
      noStroke();
      fill(255, 0, 0, 50);
      rect(windowWidth / 2, 0, windowWidth, windowHeight - 4);
      pop();
    }
    if (this.rightWins) {
      push();
      // win message
      color(255);
      textSize(70);
      textAlign("center");
      text("You Win!", windowWidth * 0.75, 150);

      // red backdrop
      noStroke();
      fill(255, 0, 0, 50);
      rect(0, 0, windowWidth / 2, windowHeight - 4);
      pop();
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

  // I decided to put these in the left & right paddle classes
  // so that they can have slightly different functionality
  //
  isCollidingWith(ball) {
    return false;
  }
  registerCollision() {
    if (this.height > 5) {
      this.height -= 4;
    }
  }
}

class LeftPaddle extends Paddle {
  x = 40;
  draw() {
    this.y = mouseY;
    super.draw();
  }
  isCollidingWith(ball) {
    if (ball.x < this.x + this.width && ball.y + ball.size >= this.y && ball.y <= this.y + this.height) {
      // Allow the ball to pass through if it's going backwards
      if (ball.vx > 0) {
        return false;
      } else {
        this.registerCollision();
        return true;
      }
    }
  }
}
class RightPaddle extends Paddle {
  draw() {
    this.x = windowWidth - 50;
    this.y = windowHeight - mouseY;
    super.draw();
  }
  isCollidingWith(ball) {
    if (ball.x + ball.size > this.x && ball.y + ball.size >= this.y && ball.y <= this.y + this.height) {
      // Allow the ball to pass through if it's going backwards
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
    fill(this.color);
    // Collisions with the walls
    if (this.x <= 0) {
      this.vx = -this.vx;
      this.fireRightPointScored();
    }

    // Collisions with the walls
    if (this.x + this.size >= windowWidth) {
      this.vx = -this.vx;
      this.fireLeftPointScored();
    }
    if (this.y < 0 || this.y + this.size > windowHeight) {
      this.vy = -this.vy;
    }

    // Collisions with the paddles
    if (this.leftPaddle.isCollidingWith(this) || this.rightPaddle.isCollidingWith(this)) {
      this.vx = -this.vx * 1.1;
    }

    this.x += this.vx;
    this.y += this.vy;
    square(this.x, this.y, this.size);
  }
}

class GameOverBall extends Ball {
  constructor() {
    super();
    this.color = [random(255), random(255), random(255)];
    this.width = 150;
    this.height = 85;
    this.y = random(10, windowHeight - this.height - 10);
  }
  draw() {
    this.x += this.vx;
    this.y += this.vy;
    fill(this.color);
    push();
    translate(this.x, this.y);
    this.drawDVDLogo();

    // Wall collisions
    if (this.x + this.width >= windowWidth || this.x <= 0) {
      this.vx = -this.vx;
      this.color = [random(255), random(255), random(255)];
    }
    if (this.y < 0 || this.y + this.height > windowHeight) {
      this.vy = -this.vy;
      this.color = [random(255), random(255), random(255)];
    }
    pop();
  }
  drawDVDLogo() {
    noStroke();
    beginShape();
    vertex(9, 0);
    vertex(66, 0);
    vertex(74, 25);
    vertex(93, 0);
    vertex(129, 0);
    vertex(150, 17);
    vertex(124, 39);
    vertex(96, 39);
    vertex(101, 14);
    vertex(116, 14);
    vertex(112, 31);
    vertex(134, 19);
    vertex(127, 9);
    vertex(102, 9);
    vertex(68, 48);
    vertex(55, 9);
    vertex(53, 9);
    vertex(56, 17);
    vertex(29, 39);
    vertex(0, 39);
    vertex(6, 13);
    vertex(21, 13);
    vertex(17, 31);
    vertex(40, 18);
    vertex(32, 9);
    vertex(8, 9);
    vertex(9, 0);
    endShape(CLOSE);
    ellipse(75, 65, 150, 40);
    fill(0);
    ellipse(75, 65, 30, 10);
  }
}

class Score {
  constructor() {
    this.leftScore = 0;
    this.rightScore = 0;
  }

  leftPointScored() {
    this.leftScore++;
  }
  rightPointScored() {
    this.rightScore++;
  }

  draw() {
    fill(180);
    textSize(32);
    textAlign("center");
    text(this.leftScore, windowWidth / 2 - 50, 50);
    text(this.rightScore, windowWidth / 2 + 50, 50);
  }
}
