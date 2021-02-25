// from the in-person class
var setup = function () {
  createCanvas(600, 400);
  background(100);
  //   noLoop();
};

var draw = function () {
  for (let outerIndex = 0; outerIndex < 100; outerIndex++) {
    for (let index = 0; index < 100; index++) {
      fill(random(255), random(255), random(255));
      ellipse(index * 10, outerIndex * 10, 50);
    }
  }
};

// from the online class
/*
var setup = function () {
  createCanvas(1000, 800);
  noLoop();
};

var draw = function () {
  background(200);
  strokeWeight(4);

  for (let vertical = 0; vertical < 80; vertical++) {
    for (let horizontal = 0; horizontal < 100; horizontal++) {
      stroke(random(["red", "turquoise", "aquamarine", "maroon"]));
      fill(random(200, 255), random(10), random(100));
      circle(10 * horizontal, 10 * vertical, 10);
    }
  }
};
*/
