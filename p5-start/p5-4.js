///<reference path="../lib/p5.global.d.ts" />

var setup = function () {
  createCanvas(600, 400);
  frameRate(5);
};
var draw = function () {
  for (let x = 0; x < 600; x += 60) {
    for (let y = 0; y < 400; y += 60) {
      fill(random(200, 255), random(200, 255), random(50, 100));
      circle(x, y, random(60, 80));
    }
  }
};
