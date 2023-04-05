/// <reference path="lib/p5.global.d.ts" />

class Shape {
  constructor() {
    this.x = random(100, 500);
    this.y = random(100, 300);
    this.vx = random(-5, 5);
    this.vy = random(-5, 5);
    this.color = [random(100, 255), random(100, 255), random(100, 255)];
    this.size = random(25, 100);
  }
  draw() {
    fill(this.color);
    if (this.x - 50 < 0 || this.x + 50 > 600) {
      this.vx = -this.vx;
    }
    if (this.y - 50 < 0 || this.y + 50 > 400) {
      this.vy = -this.vy;
    }
  }
}

class Circle extends Shape {
  draw() {
    super.draw();
    circle((this.x += this.vx), (this.y += this.vy), this.size);
  }
}

class Square extends Shape {
  draw() {
    super.draw();
    square((this.x += this.vx), (this.y += this.vy), this.size);
  }
}

let shapes = [];

var setup = function () {
  createCanvas(600, 400);
  for (let i = 0; i < 100; i++) {
    shapes.push(new Circle());
    shapes.push(new Square());
  }
};

var draw = function () {
  background(200);
  for (let shape of shapes) {
    shape.draw();
  }
};
