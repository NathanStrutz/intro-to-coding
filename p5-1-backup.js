///<reference path="lib/p5.global-mode.d.ts" />

var setup = function () {
  createCanvas(600, 400);
  background(100);
  frameRate(5);
  // noLoop();
};

var draw = function () {
  for (let y = 0; y < 50; y++) {
    for (let x = 0; x < 50; x++) {
      fill(random(255));
      noStroke();
      // circle(x * 50, y * 50, 75);
      square(x * 50, y * 50, 50);
    }
  }
};
