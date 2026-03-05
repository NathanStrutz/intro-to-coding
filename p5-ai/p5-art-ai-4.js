// ChatGPT 2026
// p5.js generative art: Flowing Perlin Noise Field

let particles = [];
let numParticles = 1200;
let noiseScale = 0.002;
let t = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  background(0);

  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: random(width),
      y: random(height),
      life: random(200, 800),
    });
  }
}

function draw() {
  t += 0.002;

  noStroke();

  for (let p of particles) {
    let n = noise(p.x * noiseScale, p.y * noiseScale, t);
    let angle = n * TWO_PI * 2;

    let vx = cos(angle);
    let vy = sin(angle);

    let hue = (n * 360 + frameCount * 0.3) % 360;

    fill(hue, 80, 100, 25);
    circle(p.x, p.y, 2);

    p.x += vx * 1.2;
    p.y += vy * 1.2;

    p.life--;

    if (p.x < 0 || p.x > width || p.y < 0 || p.y > height || p.life <= 0) {
      p.x = random(width);
      p.y = random(height);
      p.life = random(200, 800);
    }
  }

  // subtle fade to create trails
  fill(0, 0, 0, 5);
  rect(0, 0, width, height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}
