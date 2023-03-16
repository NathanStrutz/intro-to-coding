/// <reference path="lib/p5.global.d.ts" />

var setup = function () {
  createCanvas(600, 400);
  frameRate(5);
};
var draw = function () {
  background(200);

  for (let y = 0; y < 400; y += 60) {
    for (let x = 0; x < 600; x += 60) {
      fill(random(150, 200));
      square(x, y, 60);
    }
  }
};
