///<reference path="lib/p5.global-mode.d.ts" />

let shape = {
  x: 300,
  y: 200,
  vx: -7,
  vy: -6,
  draw: function () {
    fill("red");
    circle((this.x += this.vx), (this.y += this.vy), 100);
    if (this.x < 0 || this.x > 600) {
      this.vx = -this.vx;
    }
    if (this.y < 0 || this.y > 400) {
      this.vy = -this.vy;
    }
  },
};

var setup = function () {
  createCanvas(600, 400);
};

var draw = function () {
  background(100);
  shape.draw();
};
