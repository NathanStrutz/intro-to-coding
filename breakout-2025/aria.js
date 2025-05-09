///<reference path="../lib/p5.js" />

class Game {
      lives = 2;
      score = 0;
      targetRows = random(2, 10);
      targetCols = random(2, 8);
      draw() {
      fill("black");
      textSize(25);
      textAlign("left")
      text(`Score: ${this.score}`, 40, height - 15);
      textAlign("right")
      text(`${this.lives} :Lives`, width-40, height-15);



      if (targets.length === 0) {
        background("white");
        textSize(125);
        textAlign("center");
        fill("black");
        text("You won!!! Congratulations!!", 0, height / 2 - height*0.15, width);
        noLoop();
      }

        if(this.lives === 0){
          background("black");
          textSize(125);
          textAlign("center");
          fill("white");
          text("Maybe try winning?!", 0, height / 2 - height * 0.15, width);
          noLoop();

        }
        }
      }


  class Paddle {
    constructor() {
      this.x = 0;
      this.y = height - 60;
      this.width = random(0, 300);
      this.height = random(0, 20);
      this.color = [random(200), random(255), random(200, 255)];

    }

    draw() {
      this.x = mouseX - this.width / 2;
      fill(this.color);
      rect(this.x, this.y, this.width, this.height);
    }
  }

  class Ball {
    constructor() {
      this.x = random(0, width);
      this.y = height - 100;
      this.vx = random(2, 50);
      this.vy = random(-25, -5);
      this.size = random(0, 100);
      this.color = [random(0), random(255), random(0, 255)];
    }
    draw() {
      fill(this.color);
      circle((this.x += this.vx), (this.y += this.vy), this.size);
      this.bounceOffWalls();
      this.bounceOffTargets();
      this.bounceOffPaddle();
    }

bounceOffWalls() {
  if(this.x < 0) {
    this.vx = Math.abs(this.vx);
  }

  if(this.x + this.size > width) {
    this.vx = -Math.abs(this.vx);
  }

  if (this.y < 0){
    this.vy = Math.abs(this.vy);
  }
  if(this.y + this.size > height){
    game.lives--;
    ball = new Ball();
  }

}

bounceOffTargets() {
  for (let i in targets) {
    let target = targets[i];
    if (
      this.x + this.size > target.x &&
      this.x < target.x + target.width &&
      this.y + this.size > target.y &&
      this.y < target.y + target.height
    ) {
      this.vy = -this.vy;
      targets.splice(i, 1);
      game.score += 25;
      this.vx = random(5, 15);
      this.vy = random(5, 15);

    }
  }
}

bounceOffPaddle() {

  if(this.x + this.size > paddle.x &&
     this.x < paddle.x + paddle.width &&
     this.y + this.size > paddle.y)
  {this.vy = -Math.abs(this.vy);

  }
  }
 }

class Target {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = width / game.targetRows;
    this.height = random(30, 50);
    this.color = [random(150), random(255), random(150, 255)];
  }
  draw() {
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
}
}
  let game;
  let paddle;
  let ball;
  let targets = [];

  var setup = function () {
    createCanvas(windowWidth, windowHeight);

    game = new Game();
    paddle = new Paddle();
    ball = new Ball();


    for (let x = 0; x < game.targetRows; x++) {
      for (let y = 0; y <= game.targetCols; y++) {
        targets.push(new Target((x * width) / game.targetRows, y * 32));

      }
    }
  };

  var draw = function () {

    background(100, 150, 255);
    ball.draw();
    for (let target of targets) {
      target.draw();
    }
    paddle.draw();
     game.draw();
  };