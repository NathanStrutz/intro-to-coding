///<reference path="lib/p5.global-mode.d.ts" />

var setup = function () {
  createCanvas(600, 400);
};

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

// **
// **
// **
// **
// **
// **
// **
// **

// 7: Shapes that are classes
// class Circle {
//   constructor(vx = 1, vy = 1, color) {
//     this.x = 300;
//     this.y = 200;
//     this.vx = vx;
//     this.vy = vy;
//     this.color = color;
//   }
//   draw() {
//     fill(this.color);
//     circle((this.x += this.vx), (this.y += this.vy), 100);
//     if (this.x < 0 || this.x > 600) {
//       this.vx = -this.vx;
//     }
//     if (this.y < 0 || this.y > 400) {
//       this.vy = -this.vy;
//     }
//   }
// }

// let shape1 = new Circle(5, 5, "red");
// let shape2 = new Circle(-4, -4, "blue");

// var draw = function () {
//   background(100);
//   shape1.draw();
//   shape2.draw();
// };

// **
// **
// **
// **
// **
// **
// **
// **

// 8: Hundreds of shapes
// class Circle {
//   constructor() {
//     this.x = random(600);
//     this.y = random(400);
//     this.vx = random(-4, 4);
//     this.vy = random(-4, 4);
//     this.color = random(255);
//   }

//   draw() {
//     fill(this.color);
//     circle((this.x += this.vx), (this.y += this.vy), 40);
//     if (this.x < 0 || this.x > 600) {
//       this.vx = -this.vx;
//     }
//     if (this.y < 0 || this.y > 400) {
//       this.vy = -this.vy;
//     }
//   }
// }

// let shapes = [];
// var setup = function () {
//   createCanvas(600, 400);
//   for (let i = 0; i < 500; i++) {
//     shapes.push(new Circle());
//   }
// };

// var draw = function () {
//   background(100);
//   for (let index = 0; index < shapes.length; index++) {
//     const shape = shapes[index];
//     shape.draw();
//   }
// };
