///<reference path="../../lib/p5.global.d.ts" />

class Game {
  width = 1000;
  height = 600;
  lives = 3;
  points = 0;
  targetRows = 5;
  targetCols = 7;

  draw() {
    textSize(40);
    fill("blue");
    textAlign(LEFT);
    text(this.lives, 10, this.height - 40);
  }
}

class Ball {
  constructor() {
    this.x = game.width / 2;
    this.y = game.height - 100;
    this.vx = 3;
    this.vy = -3;
    this.size = 20;
  }
  draw() {
    fill("green");
    square(this.x, this.y, this.size);
    this.x += this.vx;
    this.y += this.vy;

    this.collideWithWalls();
    this.collideWithPaddle();
    this.collideWithTargets();
  }

  collideWithWalls() {
    if (this.y < 0) {
      this.vy = Math.abs(this.vy);
    }
    if (this.x < 0) {
      this.vx = Math.abs(this.vx);
    }
    if (this.x > game.width) {
      this.vx = -Math.abs(this.vx);
    }
    if (this.y > game.height) {
      game.lives--;
      if (this.lives === 0) {
        //game over
        noLoop();
      } else {
        //reset ball
        ball = new Ball();
      }

      this.vy = Math.abs(this.vy);
    }
  }
  collideWithPaddle() {
    if (
      this.y + this.size / 2 >= paddle.y &&
      this.x + this.size / 2 >= paddle.x &&
      this.x - this.size / 2 <= paddle.x + paddle.width
    ) {
      this.vy = -this.vy;
    }
  }
  collideWithTargets() {
    for (let i = 0; i < targets.length; i++) {
      const target = targets[i];
      if (
        this.y - this.size / 2 <= target.y + target.height &&
        this.x + this.size / 2 >= target.x &&
        this.x - this.size / 2 <= target.x + target.width
      ) {
        targets.splice(i, 1);
        this.points++;
        this.vy = -this.vy;
        return;
      }
    }
  }
}

class Paddle {
  constructor() {
    this.y = game.height - 50;
    this.x = mouseX;
    this.width = 200;
    this.height = 10;
  }
  draw() {
    fill("green");
    noStroke();
    rect(mouseX - this.width / 2, this.y, this.width, this.height);
  }
}

class Target {
  constructor(row, col) {
    this.row = row;
    this.col = col;

    this.height = 15;
    this.width = game.width / game.targetCols;
    this.x = this.width * this.row;
    this.y = (120 / game.targetRows) * col + 20;
  }
  draw() {
    fill("blue");
    strokeWeight(2);
    stroke("white");
    rect(this.x, this.y, this.width, this.height);
  }
}

/**@type {Game} */
let game;
/**@type {Ball} */
let ball;
/**@type {Paddle} */
let paddle;
/**@type {Array<Targets>} */
let targets = [];

var setup = function () {
  game = new Game();
  createCanvas(game.width, game.height);
  ball = new Ball();
  paddle = new Paddle();
  for (let across = 0; across < game.targetCols; across++) {
    for (let down = 0; down < game.targetRows; down++) {
      targets.push(new Target(across, down));
    }
  }
};
function mouseMoved() {
  paddle.x = mouseX - paddle.width / 2;
}
function keyPressed() {
  for (let i = 0; i < game.lives; i++) {
    fill("red");
    noStroke();
    circle(game.width - 30 - i * 25, 30, 10);
  }
}
function drawScore() {
  fill("black");
  textSize(24);
  text(`Score: ${game.points}`, 10, 30);
}
function loseLife() {
  game.lives--;
  if (game.lives === 0) {
    // game over
    noLoop();
  } else {
    ball = new Ball();
    ball.inPlay = false;
    // paddle = new Paddle();
  }
}
function winGame() {
  //you win!
  noLoop();
  textSize(48);
  fill("black");
  text("You Win!", game.width / 2 - 100, game.height / 2);
}
function gameOver() {
  //game over
  noLoop();
  textSize(48);
  fill("black");
  text("Game Over", game.width / 2 - 100, game.height / 2);
}
function checkForWin() {
  if (targets.length === 0) {
    winGame();
  }
}
function checkForLoss() {
  if (ball.y > game.height) {
    loseLife();
  }
}
function checkForCollision() {
  if (
    dist(
      ball.x,
      ball.y,
      paddle.x + paddle.width / 2,
      paddle.y + paddle.height / 2
    ) <
      ball.size / 2 &&
    paddle.width / 2
  ) {
    //collision with paddle
    ball.vy = ball.vy;
  }
  for (let i = targets.length - 1; i >= 0; i--) {
    const target = targets[i];
    if (
      (ball.x > target.x && ball.x < target.x + target.width / 2,
      paddle.width && ball.y > target.y && ball.y < target.y + target.height)
    ) {
      //collision with target
      targets.splice(i, 1);
      game.points++;
      ball.vy = ball.vy;
      break;
    }
  }
}

var draw = function () {
  background(200);
  ball.draw();
  paddle.draw();
  for (const target of targets) {
    target.draw();
    game.draw();
  }
  // drawLives();
  drawScore();

  checkForWin();
  checkForLoss();
  checkForCollision();

  // if (targets.length === 0) {
  //   //you win!
  //   noLoop();
  // }
};
textSize(50);
textAlign(CENTER);
text("You Lose", game.width / 2, game.height / 2);
noLoop();
