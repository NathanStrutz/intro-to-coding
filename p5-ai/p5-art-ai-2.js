let canvas = { w: window.innerWidth, h: window.innerHeight };
let particles = [];

function setup() {
  createCanvas(canvas.w, canvas.h);
  background(0);

  for (let i = 0; i < 50; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(0);

  for (let particle of particles) {
    particle.move();
    particle.display();
  }
}

class Particle {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.diameter = random(10, 30);
    this.color = color(random(255), random(255), random(255));
    this.vx = random(-3, 3);
    this.vy = random(-3, 3);
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > width) {
      this.vx *= -1;
    }

    if (this.y < 0 || this.y > height) {
      this.vy *= -1;
    }
  }

  display() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.diameter);
  }
}
