///<reference path="../lib/p5.global.d.ts" />

class Game {
    constructor() {
      this.lives = 5;
      this.score = 0;
    }
    draw() {
      // draw scoreboard
      textSize(15);
      textAlign(RIGHT, CENTER);
      text(`LIVES: ${this.lives}`, width - 50, height - 15);
      textAlign(LEFT, CENTER);
      text(`SCORE: ${this.score}`, 40, height - 15);
    }
  }

  class Paddle {
    constructor() {
      this.x = 0;
      this.y = height - 60;
      this.width = 170;
      this.height = 190;
    }
    draw() {
      this.x = mouseX - this.width / 2;
      fill("hotpink");
      rect(this.x, this.y, this.width, 20);
    }
  }

  class Ball {
    constructor() {
      this.x = random(0, width);
      this.y = height - 100;
      this.d = 20;
      this.r = this.d / 2;
      this.vx = 10;
      this.vy = -10;
    }
    draw() {
      this.bounceWall();
      this.bouncePaddle();
      this.bounceTargets();

      fill("hotpink");
      circle((this.x += this.vx), (this.y += this.vy), this.d);
    }

    bounceWall() {
      if (this.x < 0 || this.x > width) {
        this.vx = -this.vx;
      }
      if (this.y < 0) {
        this.vy = -this.vy;
      }
      if (this.y > height) {
        this.x = random(width);
        this.y = random(height / 2, height - 200);
        game.lives--;
      }
    }

    bouncePaddle() {
      if (
        this.y >= paddle.y &&
        this.y <= paddle.y + paddle.height &&
        this.x >= paddle.x &&
        this.x <= paddle.x + paddle.width
      ) {
        this.y = paddle.y - 10;
        this.vy = -this.vy;
      }
    }

    bounceTargets() {
      for (let i = targets.length - 1; i >= 0; i--) {
        let target = targets[i];

        if (
          this.x + this.r >= target.x &&
          this.x - this.r <= target.x + target.width &&
          this.y + this.r >= target.y &&
          this.y + this.r <= target.y + target.height
        ) {
          this.vy = -this.vy;
          targets.splice(i, 1);
          game.score += 100;
        }
      }
    }
  }

  class Target {
    constructor(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.width = w;
      this.height = h;
    }
    draw() {
      fill("hotpink");
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
        let w = width / 8;
        let h = 20;
        targets.push(new Target(x * w, y * h, w, h));
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

  ///<reference path="./lib/p5.global.d.ts" />

  class Game {
    constructor() {
      this.lives = 5;
      this.score = 0;
    }
    draw() {
      // draw scoreboard
      textSize(15);
      textAlign(RIGHT, CENTER);
      text(`LIVES: ${this.lives}`, width - 50, height - 15);
      textAlign(LEFT, CENTER);
      text(`SCORE: ${this.score}`, 40, height - 15);
    }
  }

  class Paddle {
    constructor() {
      this.x = 0;
      this.y = height - 60;
      this.width = 170;
      this.height = 190;
    }
    draw() {
      this.x = mouseX - this.width / 2;
      fill("hotpink");
      rect(this.x, this.y, this.width, 20);
    }
  }

  class Ball {
    constructor() {
      this.x = random(0, width);
      this.y = height - 100;
      this.d = 20;
      this.r = this.d / 2;
      this.vx = 10;
      this.vy = -10;
    }
    draw() {
      this.bounceWall();
      this.bouncePaddle();
      this.bounceTargets();

      fill("hotpink");
      circle((this.x += this.vx), (this.y += this.vy), this.d);
    }

    bounceWall() {
      if (this.x < 0 || this.x > width) {
        this.vx = -this.vx;
      }
      if (this.y < 0) {
        this.vy = -this.vy;
      }
      if (this.y > height) {
        this.x = random(width);
        this.y = random(height / 2, height - 200);
        game.lives--;
      }
    }

    bouncePaddle() {
      if (
        this.y >= paddle.y &&
        this.y <= paddle.y + paddle.height &&
        this.x >= paddle.x &&
        this.x <= paddle.x + paddle.width
      ) {
        this.y = paddle.y - 10;
        this.vy = -this.vy;
      }
    }

    bounceTargets() {
      for (let i = targets.length - 1; i >= 0; i--) {
        let target = targets[i];

        if (
          this.x + this.r >= target.x &&
          this.x - this.r <= target.x + target.width &&
          this.y + this.r >= target.y &&
          this.y + this.r <= target.y + target.height
        ) {
          this.vy = -this.vy;
          targets.splice(i, 1);
          game.score += 100;
        }
      }
    }
  }

  class Target {
    constructor(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.width = w;
      this.height = h;
    }
    draw() {
      fill("hotpink");
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
        let w = width / 8;
        let h = 20;
        targets.push(new Target(x * w, y * h, w, h));
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

