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
