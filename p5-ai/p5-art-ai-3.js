// Gemini 2026
let particles = [];
const num = 2000;
const noiseScale = 0.01 / 2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Initialize particles with random positions
  for (let i = 0; i < num; i++) {
    particles.push(createVector(random(width), random(height)));
  }

  stroke(255, 20); // Low opacity for a "layered" effect
  background(10, 15, 25); // Deep midnight blue
}

function draw() {
  // We don't clear the background so the paths "paint" the canvas

  for (let i = 0; i < num; i++) {
    let p = particles[i];
    point(p.x, p.y);

    // Use Perlin noise to get an angle for movement
    let n = noise(p.x * noiseScale, p.y * noiseScale, frameCount * noiseScale * noiseScale);
    let a = TAU * n; // TAU is 2 * PI

    // Move the particle based on the angle
    p.x += cos(a);
    p.y += sin(a);

    // Cycle particles back onto the screen if they wander off
    if (!onScreen(p)) {
      p.x = random(width);
      p.y = random(height);
    }

    // Subtle color shift based on position
    stroke(100 + p.x / 10, 150, 255, 25);
  }
}

function onScreen(v) {
  return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}

// Clear and restart on mouse click
function mousePressed() {
  background(10, 15, 25);
  noiseSeed(millis());
}
