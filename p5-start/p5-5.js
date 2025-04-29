///<reference path="../lib/p5.global.d.ts" />

let shapes = [];

var setup = function () {
  createCanvas(600, 400);
  for (let i = 0; i < 200; i++) {
    shapes.push(new Circle());
    shapes.push(new Square());
  }
};

class Shape {
  constructor() {
    this.x = 100;
    this.y = 100;
    this.vx = random(5, -5);
    this.vy = random(5, -5);
    this.color = color(random(255), random(100, 255), random(100, 255));
  }
  draw() {
    fill(this.color);
    if (this.x < 0 || this.x > width) {
      this.vx = -this.vx;
    }
    if (this.y < 0 || this.y > height) {
      this.vy = -this.vy;
    }
  }
}
class Circle extends Shape {
  draw() {
    super.draw();
    circle((this.x += this.vx), (this.y += this.vy), 50);
  }
}
class Square extends Shape {
  draw() {
    super.draw();
    square((this.x += this.vx), (this.y += this.vy), 50);
  }
}

var draw = function () {
  background(128);
  for (let shape of shapes) {
    shape.draw();
  }
};
