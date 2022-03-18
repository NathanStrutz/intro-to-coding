///<reference path="lib/p5.global-mode.d.ts" />

var setup = function () {
  createCanvas(600, 400);
  frameRate(5);
};

var draw = function () {
  background(100);

  for (let y = 0; y < 50; y++) {
    for (let x = 0; x < 50; x++) {
      fill(random(200, 255));
      square(x * 50, y * 50, 50);
    }
  }
};

// Ideas
// 1. A circle that draws at mouseX and mouseY.
// 2. What about a loop to draw circles across?
// 3. fill() with random(255) to paint with random colors.
// 4. What about two loops to draw circles in a grid?
// 5. What about squares vs circles?
