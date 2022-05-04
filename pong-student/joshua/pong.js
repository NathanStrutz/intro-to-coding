///<reference path="../lib/p5.global-mode.d.ts" />

let paddleH = 100;
let paddleW = 10;

let leftX = 0;
let leftY = 0;

let rightX = 0;
let rightY = 0;

class Pong {
  constructor() {
    this.leftScore = 0;
    this.rightScore = 0;

    this.table = new Table();
    this.leftPaddle = new leftPaddle();
    this.rightPaddle = new rightPaddle();
    this.ball = new Ball(1);
    this.ball2 = new Ball(-1);
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
  constructor(){
    this.hslHistory = []
  }
  draw() {
    background("Black");
    let midPoint = windowWidth / 2;
    for (let y = 0; y < windowHeight; y++) {
      fill(50);
      rect(midPoint - 5, y, 10, 20);
      y += 40;
    }
    colorMode(HSL)
    noStroke()
    this.hslHistory.push(frameCount % 360);

if (this.hslHistory.length > 560) {
  this.hslHistory.splice(0, 1);
}

    for (let i = 0; i < windowWidth; i++) {
      let h = (frameCount % 360) +i;
      if (h > 360){h = (h % 360)}
      fill(h, 100, 50, 1)
      
      let offset = 2

      square(i+offset, 0, offset)
      square(i+offset, windowHeight-offset, offset)
      square(0, i+offset, offset)
      square(windowWidth-offset, i+offset, offset)
    }
  }
}
let scoreL = 0;
let scoreR = 0;
let message = "";
class Score {
  draw() {
    textSize(64);
    fill("white");
    text(scoreL, windowWidth / 2 - 164, 50);
    text(scoreR, windowWidth / 2 + 100, 50);

    text(message, windowWidth / 2 - 160, 200);
  }
}
class Paddle {
  constructor() {
    this.x = 10;
    this.y = 20;
    this.width = paddleW;
    this.height = paddleH;
  }
  draw() {
    colorMode(HSL);
    fill("black");
    stroke((frameCount*2 % 360), 100, 50)
    rect(this.x, this.y, this.width, this.height);
  }
}
class leftPaddle extends Paddle {
  x = 40;
  draw() {
    leftX = this.x;
    this.y = mouseY;
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
  constructor(a) {
    (this.x = windowWidth / 2),
      (this.y = random(windowHeight)),
      (this.vx = a * 6),
      (this.vy = a * 4),
      (this.color = "white");
      this.history = [];
      this.hslHistory = [];
  }
  draw() {
    fill(this.color);

    if (this.y < 0 || this.y > windowHeight) {
      this.vy = -this.vy;
    }
    if (this.x + 10 > rightX && this.x < rightX + 8) {
      if (this.y > rightY && this.y < rightY + paddleH) {
        this.vx = -this.vx;
      }
    }
    if (this.x < leftX + 10 && this.x + 8 > leftX) {
      if (this.y > leftY && this.y < leftY + paddleH) {
        this.vx = -this.vx;
      }
    }
    if (this.x < 0) {
      this.x = windowWidth / 2;
      scoreR++;
     if (this.vx >= -10) {
      this.vx-=2
      this.vy-=2
     }
    }
    if (scoreR >= 10) {
      message = "  You win!";
      this.vx = 0;
      this.vy = 0;
    }
    if (this.x > windowWidth) {
      this.x = windowWidth / 2;
      scoreL++;
      if(this.vx <= 10) {
        this.vx+=2
        this.vy+=2
      }
    }
      if (scoreL >= 10) {
        message = "You Lose!"
        this.vx = 0
        this.vy = 0
      } 
      noStroke();
      colorMode(HSL);

      var v = createVector(this.x,this.y);
      this.history.push(v);
      this.hslHistory.push(frameCount % 360);

      if(this.history.length > 80) {
        this.history.splice(0, 1);
        this.hslHistory.splice(0, 1);
      }

      for (let i = 0; i < this.history.length; i++) {
        const pos = this.history[i];
        const h = this.hslHistory[i];

        fill(h, 100, 50, i*0.01);
        square(pos.x, pos.y, 10);
      }

    square(this.x, this.y, 10);
    this.x += this.vx;
    this.y += this.vy;
  }
}
