class Shape {
  constructor(width, height) {
    this.canvasWidth = width;
    this.canvasHeight = height;

    this.x = random(width);
    this.y = random(height);

    this.vx = random(-2, 2);
    this.vy = random(-2, 2);
  }

  canvasWidth = 0;
  canvasHeight = 0;
  x = 100;
  y = 100;
  w = 100;
  h = 100;
  vx = 0;
  vy = 0;

  move() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x + this.w > this.canvasWidth || this.x < 0) {
      this.vx = -this.vx;
    } else if (this.y + this.w > this.canvasHeight || this.y < 0) {
      this.vy = -this.vy;
    }
  }

  draw() {
    throw "Nope, can't do this!";
  }
}

class Square extends Shape {
  draw() {
    this.move();
    fill(255);
    square(this.x, this.y, this.w);
  }
}
class Circle extends Shape {
  c = [random(255), random(255), random(255)];

  draw() {
    this.move();
    fill(this.c);
    circle(this.x, this.y, this.w);
  }
}

let shapes = [];

var setup = function () {
  createCanvas(800, 600);
  for (let index = 0; index < 100; index++) {
    shapes.push(new Square(800, 600));
    shapes.push(new Circle(800, 600));
  }
};
var draw = function () {
  background(150);

  for (let index = 0; index < shapes.length; index++) {
    const shape = shapes[index];
    shape.draw();
  }
};
