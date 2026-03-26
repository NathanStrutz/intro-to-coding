// Note the errors - circles were bouncing based on radius, but squares
// are drawn from the top-left pixel, so the physics are different

class Shape {
  size = random(25, 75);
  x = random(width - this.size);
  y = random(height - this.size);
  vx = random(-5, 5);
  vy = random(-5, 5);
  color = [random(255), random(255), random(255)];

  draw() {
    fill(this.color);
    this.x += this.vx;
    this.y += this.vy;

    let radius = this.size / 2;
    if (this.x - radius < 0) {
      this.vx = abs(this.vx);
    } else if (this.x + radius > width) {
      this.vx = -abs(this.vx);
    }
    if (this.y - radius < 0) {
      this.vy = abs(this.vy);
    } else if (this.y + radius > height) {
      this.vy = -abs(this.vy);
    }
  }
}

class Circle extends Shape {
  draw() {
    super.draw();
    circle(this.x, this.y, this.size);
  }
}

class Square extends Shape {
  draw() {
    super.draw();
    square(this.x, this.y, this.size);
  }
}

let shapes = [];

var setup = function () {
  createCanvas(800, 600);
  for (let i = 0; i < 100; i++) {
    shapes.push(new Circle());
    shapes.push(new Square());
  }
};
var draw = function () {
  background(100);
  for (shape of shapes) {
    shape.draw();
  }
};
