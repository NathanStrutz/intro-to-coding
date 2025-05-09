///<reference path="../lib/p5.global.d.ts" />

class Game {
    constructor() {
      this.lives = 3;
      this.score = 0;
    }
    draw() {
      // draw scoreboard
    }
  }
  
  class Paddle {
    constructor() {
      this.x = 0;
      this.y = height - 60;
      this.width = 160;
    }
    draw() {
      this.x = mouseX - this.width / 2;
      fill("white");
      rect(this.x, this.y, this.width, 20);
    }
  }
  
  class Ball {
    constructor() {
      this.x = random(0, width);
      this.y = height - 100;
      this.vx = 5;
      this.vy = -5;
    }
    draw() {
      fill("red");
      square((this.x += this.vx), (this.y += this.vy), 20);
    }
  }
  
  class Target {
    constructor(x, y) {
      this.x = 0;
      this.y = 0;
      this.width = 0;
      this.height = 0;
    }
    draw() {
      fill("blue");
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
  
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y <= 5; y++) {
        targets.push(new Target(x, y));
      }
    }
  };
  
  var draw = function () {
    background(66);
    // draw game
    game.draw();
    // draw ball
    ball.draw();
    // draw targets
    for (let target of targets) {
      target.draw();
    }
    // draw paddle
    paddle.draw();
  };