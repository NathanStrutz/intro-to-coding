class Cloud {
  constructor(canvas) {
    this.canvas = canvas;
  }

  raindrops = [];

  draw() {
    if (this.raindrops.length < 2500) {
      for (let index = 0; index < 5; index++) {
        this.raindrops.push(new Raindrop(canvas));
      }
    }

    for (let index = 0; index < this.raindrops.length; index++) {
      const raindrop = this.raindrops[index];

      if (raindrop.draw()) {
        this.raindrops.shift();
      }
    }
  }
}

class Raindrop {
  constructor(canvas) {
    this.canvas = canvas;
    this.x = random(canvas.width);
  }

  x = 0;
  y = -5;
  w = 5;
  vy = 1;

  move() {
    this.y += this.vy;
    this.vy = this.vy * 1.02;
  }
  draw() {
    this.move();
    fill(255);
    noStroke();
    circle(this.x, this.y, this.w);

    if (this.y > canvas.height * 2) {
      return true;
    } else {
      return false;
    }
  }
}

let canvas = { width: 1000, height: 700 };
let cloud;

var setup = function () {
  createCanvas(canvas.width, canvas.height);
  cloud = new Cloud({ width: canvas.width, height: canvas.height });
};

var draw = function () {
  background(0);
  cloud.draw();
};
