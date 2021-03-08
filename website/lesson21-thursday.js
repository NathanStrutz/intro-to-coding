class Shape {
  x = 100;
  y = 100;
  w = 100;
  h = 100;
  draw() {
    throw "Nothing to draw!";
  }
}

class Square extends Shape {
  draw() {
    this.x -= 2;
    square(this.x, this.y, this.w);
  }
}
class Circle extends Shape {
  draw() {
    this.x += 2;
    circle(this.x, this.y, this.w);
  }
}

let shapes = [];

var setup = function () {
  createCanvas(800, 600);
  for (let index = 0; index < 200; index++) {
    let box = new Square();
    shapes.push(box);

    let cir = new Circle();
    shapes.push(cir);
  }
};

var draw = function () {
  for (let index = 0; index < shapes.length; index++) {
    let shape = shapes[index];
    shape.draw();
  }
};
