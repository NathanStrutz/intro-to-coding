let paddleH = 100;
let paddleW = 10;

let leftX = 0;
let leftY = 0;

let rightX = 0;
let rightY = 0;

class Pong {
  constructor() {
    this.leftScore = 10;
    this.rightScore = 10;

    this.table = new Table();
    this.leftPaddle = new leftPaddle();
    this.rightPaddle = new rightPaddle();
    this.ball = new Ball();
    this.ball2 = new Ball();
    this.score = new Score();
  }
  draw() {
    this.table.draw();
    this.leftPaddle.draw();
    this.rightPaddle.draw();
    this.ball.draw();
    this.ball2.draw();
    this.score.draw();
  }
}
class Table {
  draw() {
    background("black");
    let midPoint = windowWidth / 2;
    for (let y = 0; y < windowHeight; y++) {
      fill(50);
      rect(midPoint - 5, y, 10, 20);
      y += 40;
    }
  }
}
let scoreL = 0;
let scoreR = 0;

let massage = ""


class Score {
  draw() {
    textSize(40);
    fill("white");
    text(scoreL, windowWidth / 2 - 164, 50);
    text(scoreR, windowWidth / 2 + 100, 50);

    text(massage,windowWidth / 2 - 164, 200)
  }
}
class Paddle {
  constructor() {
    this.x = 10;
    this.y = 10;
    this.width = paddleW;
    this.height = paddleH;
  }
  draw() {
    noStroke();
    fill("white");
    rect(this.x, this.y, this.width, this.height);
  }
}
class leftPaddle extends Paddle {
  x = 40;
  draw() {
    leftX = this.x;
    this.y = mouseX;
    leftY = this.y;
    super.draw();
  }
}
class rightPaddle extends Paddle {
  x = windowWidth - 50;
  draw() {
    rightX = windowWidth - 50;
    this.y = mouseY;
    rightY = this.y;
    super.draw();
  }
}
class Ball {
  constructor() {
    this.x = windowWidth / 2,
     this.y = random(windowHeight),
      this.vx = 10,
      this.vy = 10,
      this.color = "blue";
  }
  draw() {
    fill(this.color);



    if (this.y < 10 || this.y > windowHeight) {
      this.vy = -this.vy;
    }

    if (this.x + 10 > rightX) {
      if (this.y > rightY && this.y < rightY + paddleH) {
        this.vx = -this.vx;
      }
    }
    if (this.x < leftX + 10) {
      if (this.y > leftY && this.y < leftY + paddleH) {
        this.vx = -this.vx;
      }
    }

    if (this.x < 10) {
      this.x = windowWidth / 2;
      scoreR>=10;

    }
    if (this.x > windowWidth) {
      (this.x = windowWidth / 2), scoreL++;
      massage = "You suck loser!"
    }

    if (scoreR >=10) {
      massage = "Your the winner!";
      this.vx = 0;
      this.vy = 0;
    }
    noStroke();
    square(this.x, this.y, 10);
    this.x += this.vx;
    this.y += this.vy;
  }
}
