class Shape {
  constructor(canvas) {
    this.canvas = canvas;
    this.randomizeSize(25, 100);
    this.randomizeLocation();
  }

  x = 0;
  y = 0;
  w = 0;
  h = 0;
  c = random(255);
  vx = random(-2, 2);
  vy = random(-2, 2);

  randomizeLocation() {
    this.x = random(this.canvas.width);
    this.y = random(this.canvas.height);
    this.x = Math.min(this.x, this.canvas.width - this.w);
    this.y = Math.min(this.y, this.canvas.height - this.h);
  }

  randomizeSize(min, max) {
    this.w = random(min, max);
    this.h = random(min, max);
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    this.bounce();
  }
  bounce() {
    if (this.x + this.w > canvas.width || this.x < 0) {
      this.vx = -this.vx;
      this.c = random(255);
    }
    if (this.y + this.h > canvas.height || this.y < 0) {
      this.vy = -this.vy;
      this.c = random(255);
    }
  }

  draw() {
    this.move();
    fill(this.c);
  }
}

class Rectangle extends Shape {
  draw() {
    super.draw();
    rect(this.x, this.y, this.w, this.h);
  }
}

class Circle extends Shape {
  randomizeSize() {
    this.w = random(15, 40);
  }
  randomizeLocation() {
    this.x = random(this.canvas.width);
    this.x = max(this.x, this.w / 2);
    this.x = min(this.x, this.canvas.width - this.w / 2);

    this.y = random(this.canvas.height);
    this.y = max(this.y, this.w / 2);
    this.y = min(this.y, this.canvas.height - this.w / 2);
  }

  bounce() {
    if (this.x > canvas.width - this.w / 2 || this.x - this.w / 2 < 0) {
      this.vx = -this.vx;
      this.c = random(255);
    }
    if (this.y > canvas.height - this.w / 2 || this.y - this.w / 2 < 0) {
      this.vy = -this.vy;
      this.c = random(255);
    }
  }

  draw() {
    super.draw();
    circle(this.x, this.y, this.w);
  }
}

class Raindrop extends Circle {
  constructor(canvas) {
    super(canvas);
    this.randomizeRaindrop();
  }
  randomizeRaindrop() {
    this.w = random(4, 7);
    this.randomizeLocation();
    this.y = random(-this.canvas.height);
    this.vy = random(1, 2);
    this.c = [random(50), random(75), random(255)];
  }
  randomizeLocation() {
    this.x = random(-this.w, this.canvas.width + this.w);
  }
  move() {
    this.y += this.vy;
    this.vy = this.vy * 1.02;
    if (this.y > this.canvas.height + this.w) {
      this.randomizeRaindrop();
    }
  }
  draw() {
    fill(this.c);
    noStroke();
    super.draw();
  }
}

let canvas = { width: 1000, height: 700 };
let shapes = [];
let raindrops = [];

var setup = function () {
  createCanvas(canvas.width, canvas.height);

  for (let index = 0; index < 205; index++) {
    shapes.push(new Raindrop(canvas));
  }
  // create shapes
  for (let index = 0; index < 5; index++) {
    if (random() > 0.5) {
      shapes.push(new Rectangle(canvas));
    } else {
      shapes.push(new Circle(canvas));
    }
  }
};

var draw = function () {
  background(200);
  stroke(0);
  // for (let index = 0; index < shapes.length; index++) {
  //   const shape = shapes[index];
  //   shape.draw();
  // }
  for (let shape of shapes) {
    shape.draw();
  }
};
