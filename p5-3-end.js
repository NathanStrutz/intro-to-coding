///<reference path="lib/p5.global-mode.d.ts" />

// This shapes array has to be outside of the p5 progrm (setup and draw)
let shapes = [];

// p5 setup (called once)
var setup = function () {
  createCanvas(600, 400);

  // Create all the shapes so we can draw them later
  for (let i = 0; i < 200; i++) {
    shapes.push(new Circle());
    shapes.push(new Square());
  }
};

// p5 draw (called over and over)
var draw = function () {
  background(100);

  // Draw all the shapes that have been created
  for (let index = 0; index < shapes.length; index++) {
    const shape = shapes[index];
    shape.draw();
  }
};

class Shape {
  constructor() {
    this.x = random(600);
    this.y = random(400);
    this.vx = random(-5, 5);
    this.vy = random(-5, 5);
    this.color = random(255);
  }

  draw() {
    fill(this.color);
    if (this.x < 0 || this.x > 600) {
      this.vx = -this.vx;
    }
    if (this.y < 0 || this.y > 400) {
      this.vy = -this.vy;
    }
  }
}

class Circle extends Shape {
  // Circles get RGB colors!
  color = [random(255), random(255), random(255)];

  draw() {
    super.draw();
    circle((this.x += this.vx), (this.y += this.vy), 40);
  }
}
class Square extends Shape {
  draw() {
    super.draw();
    square((this.x += this.vx), (this.y += this.vy), 40);
  }
}
