///<reference path="lib/p5.global-mode.d.ts" />

var setup = function () {
  createCanvas(600, 400);
  angleMode(DEGREES);
};

// 1: Move the circle
// let x = 0;
// var draw = function () {
//   background(100);
//   fill("red");
//   circle(x++, 100, 100);
// };

// 2: Track the circle's x-y coordinates
// let pos = {
//   // short for Position
//   x: 0,
//   y: 0,
// };
// var draw = function () {
//   background(100);
//   fill("red");
//   circle(pos.x++, pos.y++, 100);
// };

// 3: Center the shape and introduce random x/y movement
// let shape = {
//   x: 300,
//   y: 200,
// };
// var draw = function () {
//   background(100);
//   fill("red");
//   circle((shape.x += random(-4, 4)), (shape.y += random(-4, 4)), 100);
// };

// 4: Start tracking velocity
