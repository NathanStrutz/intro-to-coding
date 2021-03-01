// -----------------------------------------------------------------------------
// Fake-implementation of P5 and convenience features
let cl = console.log;
// if (typeof p5 === undefined) {
//   var circle = () => cl("Drawing a circle");
//   var rect = () => cl("Drawing a rectangle");
//   var fill = (c) => cl("setting fill to", c);
//   var strokeWeight = (w) => cl("setting stroke weight to", w);
//   var random = (...args) => {
//     if (args.length === 1) {
//       // random in a
//       return Math.random() * args[0];
//     } else if (args.length === 2) {
//       let upper = Math.max(args[0], args[1]);
//       let lower = Math.min(args[0], args[1]);
//       return Math.random() * (upper - lower) + lower;
//     } else {
//       return Math.random();
//     }
//   };
//   var min = Math.min;
//   var max = Math.max;
//   var round = Math.round;
//   var floor = Math.floor;
// }

let canvas = { width: 960, height: 540 };
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// RGB, RandomRGB, MutatingRGB
class RGB {
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
  getR() {
    return this.r;
  }
  getG() {
    return this.g;
  }
  getB() {
    return this.b;
  }
  getRGB() {
    return [this.getR(), this.getG(), this.getB()];
  }
}

class RandomRGB extends RGB {
  constructor() {
    super(random(255), random(255), random(255));
  }
}

class MutatingRGB extends RandomRGB {
  constructor(speed = 3) {
    super();
    this.speed = speed;
  }
  getR() {
    this.r = random(max(0, super.getR() - this.speed), min(255, super.getR() + this.speed));
    return this.r;
  }
  getG() {
    this.g = random(max(0, super.getG() - this.speed), min(255, super.getG() + this.speed));
    return this.g;
  }
  getB() {
    this.b = random(max(0, super.getB() - this.speed), min(255, super.getB() + this.speed));
    return this.b;
  }
}

// -----------------------------------------------------------------------------
// Renderable objects - that is, objects with a render function that call on P5.
class Renderable {
  constructor(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
  }
  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }
  render() {
    // circle(this.x, this.y, this.w);
  }
}

class RandomRenderable extends Renderable {
  constructor() {
    super(random(canvas.width), random(canvas.height), random(30, 200));
    this.h = random(30, 200);
    this.color = new MutatingRGB(random(10));
    this.strokeWeight = round(random(5));
  }
  render() {
    throw "No rendering random nothings";
  }
}

class RandomCircle extends RandomRenderable {
  constructor() {
    super();
  }
  render() {
    strokeWeight(this.strokeWeight);
    fill(this.color.getRGB());
    circle(this.getX(), this.getY(), this.w);
  }
}

class RandomRect extends RandomRenderable {
  constructor() {
    super();
    this.speedX = random(-10, 10);
    this.speedY = random(-10, 10);
  }
  render() {
    strokeWeight(this.strokeWeight);
    fill(this.color.getRGB());
    rect(this.getX(), this.getY(), this.w, this.h);
  }
}

class JigglingRect extends RandomRect {
  getX() {}
  getY() {}
  render() {
    this.x = random(this.x - 10, this.x + 10);
    this.y = random(this.y - 10, this.y + 10);
    super.render();
  }
}

class MovingRect extends RandomRect {
  getX() {
    this.x += this.speedX;
    if (this.x > canvas.width || this.x < 0) {
      this.speedX = -this.speedX;
    }
  }
  getY() {
    this.y += this.speedY;
    if (this.y > canvas.height || this.y < 0) {
      this.speedY = -this.speedY;
    }
  }
}

// new MovingRect().render();
