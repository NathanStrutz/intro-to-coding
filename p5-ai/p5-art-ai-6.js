// ChatGPT 2026
// p5.js generative art — "Crystal Quilt"
// Static artwork (no animation). Refresh for a new variation.

function setup() {
  createCanvas(900, 900);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(RADIANS);
  noLoop();
  background(220, 20, 8);

  let palette = [color(200, 80, 100), color(260, 70, 100), color(300, 60, 100), color(180, 60, 100), color(340, 70, 100)];

  drawGrid(palette);
  drawGlow();
  drawFilmGrain();
}

function drawGrid(palette) {
  let cols = 9;
  let rows = 9;

  let w = width / cols;
  let h = height / rows;

  for (let gx = 0; gx < cols; gx++) {
    for (let gy = 0; gy < rows; gy++) {
      push();

      translate(gx * w + w / 2, gy * h + h / 2);

      let rot = floor(random(4)) * HALF_PI;
      rotate(rot);

      let layers = floor(random(4, 8));

      for (let i = layers; i > 0; i--) {
        let size = map(i, 0, layers, 10, w * 0.9);

        let c = random(palette);
        fill(hue(c), saturation(c), brightness(c), 70);
        stroke(0, 0, 100, 15);
        strokeWeight(1);

        polygon(0, 0, size, 6);
      }

      pop();
    }
  }
}

function polygon(x, y, radius, npoints) {
  beginShape();
  for (let a = 0; a < TWO_PI; a += TWO_PI / npoints) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function drawGlow() {
  noStroke();

  for (let i = 0; i < 80; i++) {
    let x = random(width);
    let y = random(height);

    let r = random(80, 200);

    for (let j = r; j > 0; j -= 4) {
      fill(200, 40, 100, 2);
      circle(x, y, j);
    }
  }
}

function drawFilmGrain() {
  strokeWeight(1);

  for (let i = 0; i < 80000; i++) {
    stroke(0, 0, 100, 3);
    point(random(width), random(height));
  }
}
