class Cloud {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  width = 300;
  raindrops = [];

  accumulate() {
    for (let index = 0; index < 5; index++) {
      this.raindrops.push(new Raindrop(this.width / 2, this.height / 2));
    }
  }
  precipitate() {
    this.accumulate();

    for (let index = 0; index < this.raindrops.length; index++) {
      const raindrop = this.raindrops[index];
      raindrop.draw();

      if (raindrop.isOutOfBounds(this.width, this.height)) {
        this.raindrops.shift();
      }
    }
  }
}

class Raindrop {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  x = 0;
  y = 0;
  vx = random(-1, 1);
  vy = random(-1, 1);
  c = "lightblue";

  draw() {
    this.vx = this.vx * 1.02;
    this.x += this.vx;

    this.vy = this.vy * 1.02;
    this.y += this.vy;

    noStroke();
    fill(this.c);
    circle(this.x, this.y, 5);
  }
  isOutOfBounds(maxWidth, maxHeight) {
    if (this.x > maxWidth || this.x < 0) {
      return true;
    } else if (this.y > maxHeight || this.y < 0) {
      return true;
    } else {
      return false;
    }
  }
}

let cloud;

var setup = function () {
  createCanvas(800, 600);
  cloud = new Cloud(800, 600);
};
var draw = function () {
  background(100);
  cloud.precipitate();
};
