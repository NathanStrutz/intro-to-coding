class Cloud {
  raindrops = [];

  setup(canvas) {
    this.canvas = canvas;
    // for (let index = 0; index < 500; index++) {
    //   this.raindrops.push(new Raindrop(canvas));
    // }
  }

  draw() {
    this.raindrops.push(new Raindrop(this.canvas));

    for (let index = 0; index < this.raindrops.length; index++) {
      const raindrop = this.raindrops[index];
      if (!raindrop.draw()) {
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
  y = -10;
  vy = 1;
  w = 5;

  draw() {
    this.y += this.vy;
    this.vy *= 1.02;
    noStroke();
    fill("blue");
    circle(this.x, this.y, this.w);

    if (this.y > this.canvas.height) {
      return false;
    } else {
      return true;
    }
  }
}

let canvas = { width: 800, height: 600 };
let cloud = new Cloud();

var setup = function () {
  createCanvas(canvas.width, canvas.height);
  cloud.setup(canvas);
};
var draw = function () {
  background(200);
  cloud.draw();
};
