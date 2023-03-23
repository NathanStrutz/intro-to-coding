/// <reference path="lib/p5.global.d.ts" />

var setup = function () {
  createCanvas(600, 400);
  shape = {
    x: 50,
    y: 50,
    vx: random(-3, 3),
    vy: random(-3, 3),
    draw: function () {
      fill("red");
      if (this.x - 50 < 0 || this.x + 50 > 600) {
        this.vx = -this.vx;
      }
      if (this.y - 50 < 0 || this.y + 50 > 400) {
        this.vy = -this.vy;
      }
      circle((this.x += this.vx), (this.y += this.vy), 100);
    },
  };
};

var draw = function () {
  background(200);
  shape.draw();
};

let shape;
