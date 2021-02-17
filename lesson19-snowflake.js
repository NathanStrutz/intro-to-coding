let canvas = { width: window.innerWidth, height: window.innerHeight };
let shapeSize = 500;

var setup = function () {
  createCanvas(canvas.width, canvas.height);
  noLoop();
  angleMode(DEGREES);
  rectMode(CENTER);
};

var draw = function () {
  if (option(1 / 5)) testLines();
  if (option(1 / 3)) outlineCircle();
  if (option(1 / 2.25)) outlineHexagon();
  if (option(1 / 4)) triangles();
  noLoop();
};

let outlineCircle = function () {
  push();
  translate(canvas.width / 2, canvas.height / 2);
  strokeWeight(choice([2, 5]));
  ellipse(0, 0, shapeSize);
  pop();
};
let outlineHexagon = function () {
  let sides = choice([6, 6, 12]);
  push();
  translate(canvas.width / 2, canvas.height / 2);
  strokeWeight(choice([2, 5]));
  stroke(randomColor());

  // here's the line itself, so we can draw it by doing -line/2, +line/2
  let lineLength = (shapeSize / 2) * Math.cos(360 / sides); // ed: this may need to be doubled...
  // next we need the angle, to form a trialgle, and calculate the end point from our starting position at 0,0.
  // the angle is 360/6
  // the radius is shapeSize/2
  // so... given an angle and radius, and the length of the line, where do I put the pixels - where is the x,y?
  // there's this kind of thing that makes it close:
  let lineHeightCorrection = 44; //-(Math.sin(360 / sides) / 2) * (shapeSize / 2) + 5;

  rotationally(sides, () =>
    line(lineLength / 2, shapeSize / 2 - lineHeightCorrection, -lineLength / 2, shapeSize / 2 - lineHeightCorrection)
  );
  pop();
};

let testLines = function () {
  let numberOfShapes = random([6, 12]);
  let strokeColor = randomColor();
  noFill();
  stroke(strokeColor);

  push();
  translate(canvas.width / 2, canvas.height / 2);
  rotationally(numberOfShapes, () => line(0, 0, 0, shapeSize / 2));
  pop();
};

let triangles = function () {
  fill(randomColor());
  let firstPoint = shapeSize / 2 - 100;
  push();
  translate(canvas.width / 2, canvas.height / 2);
  rotationally(6, () => triangle(0, firstPoint, -20, firstPoint + 30, 20, firstPoint + 30));
  pop();
};

/**
 * Performs an action for each rotation. Please push and pop outside to set your own centerpoint.
 * @param {Number} rotations Number of rotations, defaults to 6
 * @param {Function} fn Function to execute as a higher-order function
 * @param  {...any} rest Other arguments are sent to fn
 */
const rotationally = function (rotations = 6, fn, ...rest) {
  let angle = 360 / rotations;
  for (i = 0; i < rotations; i++) {
    fn(...rest);
    rotate(angle);
  }
};

const option = function (chances = 1 / 2) {
  return Math.random() < chances;
};
const choice = function (arr = [true, false]) {
  return random(arr);
};
const randomColor = function () {
  return choice(["black", "deepskyblue", "midnightblue", "hotpink"]);
};

window.mouseReleased = function () {
  loop();
};
