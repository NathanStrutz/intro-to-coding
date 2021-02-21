// make the canvas as large as possible
let canvas = { width: window.innerWidth, height: window.innerHeight };

let circleSize = 200;

// set the canvas bounds, out from the center
let bounds = {
  left: -circleSize,
  right: canvas.width,
  top: -circleSize,
  bottom: canvas.height,
};

// runs once
var setup = function () {
  createCanvas(canvas.width, canvas.height);
  background(0);
  noLoop();
};

// runs continuously in a rendering loop
var draw = function () {
  noFill();
  strokeWeight(15);
  for (let index = 0; index < (canvas.width * canvas.height) / 2000; index++) {
    stroke(64, 224, 208, 60);
    circle(random(bounds.left, bounds.right), random(bounds.top, bounds.bottom), circleSize);
  }
  for (let index = 0; index < (canvas.width * canvas.height) / 5000; index++) {
    stroke(255, 140, 0, 60);
    circle(random(bounds.left, bounds.right), random(bounds.top, bounds.bottom), circleSize);
  }
  for (let index = 0; index < (canvas.width * canvas.height) / 12000; index++) {
    stroke(255, 255, 255, 50);
    circle(random(bounds.left, bounds.right), random(bounds.top, bounds.bottom), circleSize);
  }
};

// draw as long as the mouse is pressed
window.mousePressed = draw;
