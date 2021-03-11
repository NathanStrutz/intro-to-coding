class Cloud {
  constructor(canvas) {
    this.canvas = canvas;
  }

  raindrops = [];

  draw() {
    if (this.raindrops.length < 2500) {
      for (let index = 0; index < 20; index++) {
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
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
  }

  x = 0;
  y = -5;
  w = 5;
  vx = random(1, -1);
  vy = random(1, -1);
  vxRate = random(1.01, 1.1);
  vyRate = random(1.01, 1.1);

  move() {
    this.x += this.vx;
    this.vx = this.vx * this.vxRate;

    this.y += this.vy;
    this.vy = this.vy * this.vyRate;
  }
  draw() {
    this.move();
    fill(255);
    noStroke();
    circle(this.x, this.y, this.w);

    if (this.y > canvas.height * 2 || this.x > canvas.width * 2 || this.y < -canvas.height || this.x < -canvas.width) {
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
