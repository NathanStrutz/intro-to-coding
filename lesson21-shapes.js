class Shape {
  constructor(canvas) {
    this.canvas = canvas;
    this.randomizeXY();
    this.randomizeSize(25, 100);
  }

  x = 0;
  y = 0;
  w = 0;
  h = 0;
  c = random(255);
  vx = random(-2, 2);
  vy = random(-2, 2);

  randomizeXY() {
    this.x = random(this.canvas.width);
    this.y = random(this.canvas.height);
  }
  randomizeSize(min, max) {
    this.w = random(min, max);
    this.h = random(min, max);
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
  }
  render() {
    this.move();
    fill(this.c);
  }
}
class Rectangle extends Shape {
  render() {
    super.render();
    rect(this.x, this.y, this.w, this.h);
  }
}
class Circle extends Shape {
  randomizeSize() {
    this.w = random(15, 35);
  }
  render() {
    super.render();
    circle(this.x, this.y, this.w);
  }
}

let canvas = { width: 1000, height: 700 };
let shapes = [];

var setup = function () {
  createCanvas(canvas.width, canvas.height);
  for (let index = 0; index < 250; index++) {
    if (random() > 0.5) {
      shapes.push(new Rectangle(canvas));
    } else {
      shapes.push(new Circle(canvas));
    }
  }
};

var draw = function () {
  background(200);
  // for (let index = 0; index < shapes.length; index++) {
  //   const item = shapes[index];
  //   item.render();
  // }
  for (let shape of shapes) {
    shape.render();
  }
};
