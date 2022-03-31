///<reference path="lib/p5.global-mode.d.ts" />

var setup = function () {
  createCanvas(600, 400);
};

// 1: Move the circle
let x = 0;
var draw = function () {
  background(100);
  fill("red");
  circle(x++, 100, 100);
};

// **
// **
// **
// **
// **
// **
// **
// **

// 2: Track the circle's x-y coordinates
// let shape = {
//   x: 0,
//   y: 0,
// };
// var draw = function () {
//   background(100);
//   fill("red");
//   circle(shape.x++, shape.y++, 100);
// };

// **
// **
// **
// **
// **
// **
// **
// **

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

// **
// **
// **
// **
// **
// **
// **
// **

// 4: Start tracking velocity
// let shape = {
//   x: 300,
//   y: 200,
//   vx: -1,
//   vy: 1,
// };
// var draw = function () {
//   background(100);
//   fill("red");
//   circle((shape.x += shape.vx), (shape.y += shape.vy), 100);
// };

// **
// **
// **
// **
// **
// **
// **
// **

// 5: Bounce off the wall
// let shape = {
//   x: 300,
//   y: 200,
//   vx: -3,
//   vy: -3,
// };
// var draw = function () {
//   background(100);
//   fill("red");
//   circle((shape.x += shape.vx), (shape.y += shape.vy), 100);
//   if (shape.x < 0 || shape.x > 600) {
//     shape.vx = -shape.vx;
//   }
//   if (shape.y < 0 || shape.y > 400) {
//     shape.vy = -shape.vy;
//   }
// };

// **
// **
// **
// **
// **
// **
// **
// **

// 6: Shapes that draw themselves
// let shape = {
//   x: 300,
//   y: 200,
//   vx: -7,
//   vy: -6,
//   draw: function () {
//     fill("red");
//     circle((shape.x += shape.vx), (shape.y += shape.vy), 100);
//     if (shape.x < 0 || shape.x > 600) {
//       shape.vx = -shape.vx;
//     }
//     if (shape.y < 0 || shape.y > 400) {
//       shape.vy = -shape.vy;
//     }
//   },
// };

// var draw = function () {
//   background(100);
//   shape.draw();
// };

/*
  What about 2 shapes?
  They will need to reference "this"
  What else references "this"?
*/

// Note: class time ran out. Continuing on p5-3.
