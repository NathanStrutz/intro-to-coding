// make the canvas as large as possible
let canvas = { width: window.innerWidth, height: window.innerHeight };
// set the canvas bounds, out from the center
let bounds = {
  left: 0 - canvas.width / 2,
  right: canvas.width / 2,
  top: 0 - canvas.height / 2,
  bottom: canvas.height / 2,
};

// runs once
var setup = function () {
  createCanvas(canvas.width, canvas.height);
  background(230);
  createSnakeLine();
};

// runs continuously in a rendering loop
var draw = function () {
  if (mouseIsPressed) {
    createSnakeLine();
  }
};

let createSnakeLine = function () {
  // config options
  // where to place the next dot - it starts at zero and can move from there
  let currentSpot = { x: 0, y: 0 };
  // what color to start with - I like how white makes it look like it fades into the background
  let currentColor = [255, 255, 255];
  // change how much the colors can move away from the previous color
  // too much, and they don't loo similar; not enough and it just stays white
  let colorStretch = 35;
  // how big the dot will be - starts at 50px in diameter and moves up
  let currentSize = 50;
  // decide which direction to grow
  let direction = { x: random(-30, 30), y: random(-30, 30) };

  // move the middle to the middle of the canvas
  translate(canvas.width / 2, canvas.height / 2);

  // keep making dots until we are off the screen
  // or until there are 500 dots in a stack
  while (
    currentSpot.x > bounds.left &&
    currentSpot.x < bounds.right &&
    currentSpot.y > bounds.top &&
    currentSpot.y < bounds.bottom &&
    currentSize < 500
  ) {
    // every dot gets its own color
    currentColor = [
      randColorRange(currentColor[0], colorStretch),
      randColorRange(currentColor[1], colorStretch),
      randColorRange(currentColor[2], colorStretch),
    ];
    // every dot can move a tiny bit away from the previous, guided by the direction set above
    currentSpot = { x: currentSpot.x + random(direction.x), y: currentSpot.y + random(direction.y) };
    // every dot grows by just a bit
    currentSize = currentSize + 2;
    noStroke();
    fill(currentColor[0], currentColor[1], currentColor[2]);
    ellipse(currentSpot.x, currentSpot.y, currentSize);
  }
};

// returns a number from 0-255 within a small range, made for semi-closely matching colors
let randColorRange = function (currentValue, travelRange = 10) {
  let val = Math.floor(random(currentValue - travelRange, currentValue + travelRange));
  val = Math.max(0, val);
  val = Math.min(val, 255);
  return val;
};

// draw as long as the mouse is pressed
window.mousePressed = draw;
