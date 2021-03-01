let canvas = { width: 1000, height: 800 };
// let movers = [];
let objects = [];

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
    circle(this.x, this.y, this.w);
  }
}

class RandomRect extends RandomRenderable {
  constructor() {
    super();
    // todo: implement these
    this.speed = random(10);
    this.direction = random(360);
  }
  render() {
    strokeWeight(this.strokeWeight);
    fill(this.color.getRGB());
    rect(this.x, this.y, this.w, this.h);
  }
}

class JigglingRect extends RandomRect {
  render() {
    this.x = random(this.x - 10, this.x + 10);
    this.y = random(this.y - 10, this.y + 10);
    super.render();
  }
}

var setup = function () {
  createCanvas(canvas.width, canvas.height);

  init();
};

// Initialization function because `random` doesn't exist until we start drawing
let init = function () {
  for (let index = 0; index < 1000; index++) {
    objects.push(new JigglingRect());
    !index % 4 && objects.push(new RandomCircle());
  }
};

var draw = function () {
  background(200);

  textSize(20);
  fill(50);
  text("Secret Message", canvas.width / 2 - 100, canvas.height / 2 - 20, 200, 40);

  for (let index = 0; index < objects.length; index++) {
    let renderableThing = objects[index];
    renderableThing.render();
  }
};
