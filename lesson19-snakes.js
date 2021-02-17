let canvas = { width: window.innerWidth, height: window.innerHeight };
let bounds = {
  left: 0 - canvas.width / 2,
  right: canvas.width / 2,
  top: 0 - canvas.height / 2,
  bottom: canvas.height / 2,
};
let colorStretch = 35;

// runs once
window.setup = function () {
  createCanvas(canvas.width, canvas.height);
  background(230);
  noLoop();
};

// runs continuously in a rendering loop
window.draw = function () {
  //   if (mouseIsPressed) {
  //     fill(random(255), random(255), random(255));
  //   }

  let currentSpot = { x: 0, y: 0 };
  let currentColor = [255, 255, 255];
  let currentSize = 50;
  translate(canvas.width / 2, canvas.height / 2);
  let direction = { x: random(-30, 30), y: random(-30, 30) };

  //   while (currentSpot.x < window.innerHeight + currentSize && currentSpot.y < window.innerHeight + currentSize) {
  //   while (currentSpot.x < canvas.width + currentSize && currentSpot.y < canvas.height + currentSize) {
  while (
    currentSpot.x > bounds.left &&
    currentSpot.x < bounds.right &&
    currentSpot.y > bounds.top &&
    currentSpot.y < bounds.bottom &&
    currentSize < 500
  ) {
    currentColor = [
      randColorRange(currentColor[0], colorStretch),
      randColorRange(currentColor[1], colorStretch),
      randColorRange(currentColor[2], colorStretch),
    ];
    currentSpot = { x: currentSpot.x + random(direction.x), y: currentSpot.y + random(direction.y) };
    currentSize = currentSize + 2;
    noStroke();
    fill(currentColor[0], currentColor[1], currentColor[2]);
    ellipse(currentSpot.x, currentSpot.y, currentSize);
  }
  noLoop();
};

// returns a number from 0-255 within a small range, made for semi-closely matching colors
let randColorRange = function (currentValue, travelRange = 10) {
  let val = Math.floor(random(currentValue - travelRange, currentValue + travelRange));
  val = Math.max(0, val);
  val = Math.min(val, 255);
  return val;
};

window.mouseReleased = function () {
  loop();
};
