// azeriah

///<reference path="../../lib/p5.global-mode.d.ts" />

let paddleH = 100;
let paddleW = 100;
let leftX = 0;
let leftY = 0;
let rightX = 0;
let rightY = 0;
let lScore = 0;
let rScore = 0;

class Pong {
  constructor() {
    this.leftScore = 0;
    this.rightScore = 0;

    this.table = new Table();
    this.leftPaddle = new leftPaddle();
    this.rightPaddle = new rightPaddle();
    this.ball = new Ball();
    this.Score = new Score();
  }
  draw() {
    this.table.draw();
    this.leftPaddle.draw();
    this.rightPaddle.draw();
    this.ball.draw();
    this.Score.draw();
    if (lScore > 2) {
      this.ball.draw();
    }
    if (rScore > 2) {
      this.ball.draw();
    }
  }
}
class Table {
  draw() {
    background("blue");
    let midPoint = windowWidth / 2;
    for (let y = 0; y < windowHeight; y++) {
      fill(50);
      rect(midPoint - 5, y, 10, 20);
      y += 40;
    }
  }
}
class Paddle {
  constructor() {
    this.x = 10;
    this.y = windowHeight / 2;
    this.width = 10;
    this.hight = 100;
  }
  draw() {
    fill("black");
    rect(this.x, this.y, this.width, this.hight);
  }
}
class leftPaddle extends Paddle {
  x = 40;
  draw() {
    this.y = mouseX;
    leftX = this.x;
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
class Score {
  constructor() {
    lScore = 0;
    rScore = 0;
  }

  draw() {
    fill("white");
    textSize(75);
    textAlign("center");
    text(lScore, windowWidth / 2 - 700, 50);
    text(rScore, windowWidth / 2 + 700, 50);

    if (lScore === 5) {
      alert("left wins");
    }
    if (rScore === 5) {
      alert("right wins");
    }
  }
}

class Ball {
  constructor() {
    (this.x = random(windowWidth)),
      (this.y = random(windowHeight)),
      (this.vx = 6),
      (this.vy = 4),
      (this.color = "white");
  }
  draw() {
    fill(this.color);

    if (this.x < 0 || this.x > windowWidth) {
      this.vx = -this.vx;
      if (this.x < 0) {
        rScore++;
      }
      if (this.x > windowWidth) {
        lScore++;
      }
    }
    if (this.y < 0 || this.y > windowHeight - 50) {
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

    circle(this.x, this.y, 10);
    this.x += this.vx;
    this.y += this.vy;
  }
}
function currentTime() {
  let date = new Date();
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();
  let session = "AM";

  if (hh === 0) {
    hh = 12;
  }
  if (hh > 12) {
    hh = hh - 12;
    session = "PM";
  }

  hh = hh < 10 ? "0" + hh : hh;
  mm = mm < 10 ? "0" + mm : mm;
  ss = ss < 10 ? "0" + ss : ss;

  let time = hh + ":" + mm + ":" + ss + " " + session;

  document.getElementById("clock").innerText = time;
  let t = setTimeout(function () {
    currentTime();
  }, 1000);
}

currentTime();

// if (lScore === 3) {
//   alert("left wins");
// }
// if (rScore === 3) {
//   alert("right wins");
// }
