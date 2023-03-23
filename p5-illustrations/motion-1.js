let canvas = { w: window.innerWidth, h: window.innerHeight };

let bg;
let rings = [];

var setup = function () {
  createCanvas(canvas.w, canvas.h);
  background("red");
  bg = new Background();
  bg.draw();
  rings.push(new Ring());
  rings.push(new PastelRing());
};

var draw = function () {
  bg.draw();
  for (let i = 0; i < rings.length; i++) {
    const ring = rings[i];
    ring.draw();
  }
};

class Background {
  constructor() {
    this.color1 = color(221, 115, 115);
    this.color2 = color(234, 217, 76);
    this.colorBands = 10;
  }
  draw() {
    noStroke();
    for (let i = 0; i < this.colorBands; i++) {
      fill(lerpColor(this.color1, this.color2, i / this.colorBands));
      rect((canvas.w / this.colorBands) * i - 1, 0, canvas.w / this.colorBands + 1, canvas.h);
    }
    for (let i = 0; i < this.colorBands; i++) {
      let color = lerpColor(this.color1, this.color2, i / this.colorBands);
      color.levels[3] = 10;
      color._array[3] = 0.3;
      fill(color);
      rect(0, (canvas.h / this.colorBands) * i, canvas.w, canvas.h / this.colorBands);
    }
  }
}

class Ring {
  constructor() {
    this.diameter = 200;
    this.x = random(this.diameter, canvas.w - this.diameter);
    this.y = random(this.diameter, canvas.h - this.diameter);
    this.ringSize = 10;
    this.color = "white";
    this.vx = random(-2, 2);
    this.vy = random(-2, 2);
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x - this.diameter / 2 < 0 || this.x + this.diameter / 2 > width) {
      this.vx *= -1;
    }

    if (this.y - this.diameter / 2 < 0 || this.y + this.diameter / 2 > height) {
      this.vy *= -1;
    }
  }
  draw() {
    this.move();
    strokeWeight(this.ringSize);
    stroke(this.color);
    noFill();
    circle(this.x, this.y, this.diameter);
  }
}

class PastelRing extends Ring {
  constructor() {
    super();
    this.color = color(random(180, 220), random(180, 220), random(180, 220));
    this.vx = random(-8, 8);
    this.vy = random(-8, 8);
  }
}
