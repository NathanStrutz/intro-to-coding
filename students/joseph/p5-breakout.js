/// <reference path="../../lib/p5.global.d.ts"/>

easteregg = {
  draw() {
    translate(43, 0);
    strokeWeight(1);
    stroke("black");

    fill("blue");
    square(421, 341, 14);
    square(455, 341, 14);
    fill("white");

    rect(421, 355, 7, 7);
    rect(428, 355, 7, 14);
    rect(435, 334, 7, 35);
    rect(442, 341, 7, 21);
    rect(428, 334, 7, 7);
    rect(455, 355, 7, 7);
    rect(462, 355, 7, 14);
    rect(469, 334, 7, 35);
    rect(476, 341, 7, 21);
    rect(462, 334, 7, 7);
    fill("orange");
    rect(400, 355, 7, 56);
    rect(407, 334, 7, 70);
    rect(414, 327, 7, 70);
    rect(421, 362, 7, 42);
    rect(421, 320, 7, 21);
    rect(428, 320, 7, 14);
    rect(435, 313, 7, 21);
    rect(442, 313, 7, 28);
    rect(456, 320, 7, 21);
    rect(463, 320, 7, 14);
    rect(470, 327, 7, 7);
    rect(477, 334, 7, 7);
    rect(428, 369, 7, 42);
    rect(435, 369, 7, 28);
    rect(442, 362, 7, 35);
    rect(449, 313, 7, 98);
    rect(456, 362, 7, 49);
    rect(463, 369, 7, 35);
    rect(470, 369, 7, 28);
    rect(477, 362, 7, 42);
    rect(484, 341, 7, 70);
  },
};
class Game {
  width = 1000;
  height = 600;
  lives = 3;
  points = 0;
  targetRows = 5;
  targetCols = 7;

  draw() {
    textSize(40);
    fill("green");
    text(`${this.lives} Lives left`, 10, this.height - 60);
    text(`${this.points} Points`, 830, this.height - 60);
    this.gameover();
  }
  gameover() {
    if (this.lives < 1) {
      fill("red");
      strokeWeight(10);
      stroke("black");
      text(`YOU LOSE BETTER LUCK NEXT TIME`, this.width / 7, this.height / 2);
      noLoop();
    }
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
    fill("red");
    strokeWeight(2);
    stroke("white");
    square(this.x, this.y, this.size);
    this.x += this.vx;
    this.y += this.vy;
    this.collideWithWalls();
    this.collideWithPaddle();
    this.bounceOffTargets();
  }
  collideWithWalls() {
    if (this.y >= 580) {
      game.lives--;
    }
    if (this.x < 0 || this.x + 20 > game.width) {
      this.vx = -this.vx;
    }
    if (this.y < 0 || this.y + 20 > game.height) {
      this.vy = -this.vy;
    }
  }
  collideWithPaddle() {
    if (
      this.y + this.size > paddle.y &&
      this.y < paddle.y + 10 &&
      mouseX - paddle.width / 2 < this.x &&
      mouseX + paddle.width / 2 > this.x
    ) {
      this.vy = -Math.abs(this.vy);
    }
  }

  bounceOffTargets() {
    for (let i = 0; i < targets.length; i++) {
      const target = targets[i];
      if (this.y < target.y && this.x > target.x && this.x + this.size < target.x + target.width) {
        this.vy = -this.vy;
        targets.splice(i, 1);
        game.points++;
        if (ball.vx < 20) {
          ball.vx++;
        }
        if (ball.vy < 20) {
          ball.vy++;
        }
        if (ball.size > 7) {
          ball.size--;
        }
        if (paddle.width > 30) {
          paddle.width -= 10;
        }
      }
    }
  }
}
class Paddle {
  constructor() {
    this.y = game.height - 50;
    this.width = 200;
    this.height = 10;
  }
  draw() {
    fill("purple");
    noStroke();
    rect(mouseX - this.width / 2, this.y, this.width, this.height);
  }
}

class Target {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.height = 10;
    this.width = game.width / game.targetCols;
    this.x = this.width * this.row;
    this.y = (100 / game.targetRows) * col + 20;
  }
  draw() {
    fill("orange");
    strokeWeight(2);
    stroke("white");
    rect(this.x, this.y, this.width, this.height);
  }
}
/** @type {Game} */
let game;
/** @type {Ball} */
let ball;
/** @type {Paddle} */
let paddle;
/** @type {Array<Target>} */
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

var draw = function () {
  background(200);
  angleMode(DEGREES);
  game.draw();
  ball.draw();
  paddle.draw();

  for (const target of targets) {
    target.draw();
  }
  if (targets.length === 0) {
    fill("green");
    strokeWeight(3);
    stroke("white");
    text(`YOU WIN CONGRATS`, this.width / 3.5, this.height / 2);
    easteregg.draw();
    noLoop();
  }
};
