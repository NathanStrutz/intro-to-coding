// ChatGPT 2026
// p5.js Generative Art — "Electric Garden"
// Static piece (no animation). Refresh to generate a new one.

function setup() {
  createCanvas(900, 900);
  colorMode(HSB, 360, 100, 100, 100);
  noLoop();

  background(230, 15, 8);

  drawTexture();
  drawPetals();
  drawFilaments();
  drawDust();
}

function drawTexture() {
  // subtle paper-like noise
  for (let i = 0; i < 120000; i++) {
    stroke(0, 0, random(10, 20), 3);
    point(random(width), random(height));
  }
}

function drawPetals() {
  translate(width / 2, height / 2);

  let layers = 7;

  for (let l = 0; l < layers; l++) {
    let radius = 90 + l * 70;
    let petals = 10 + l * 4;
    let hue = random(180, 320);

    for (let i = 0; i < petals; i++) {
      let a = (TWO_PI / petals) * i;

      push();
      rotate(a);

      let wobble = random(-0.25, 0.25);
      rotate(wobble);

      noStroke();
      fill(hue + random(-15, 15), 70, random(70, 100), 70);

      beginShape();
      for (let t = 0; t < PI; t += 0.1) {
        let r = radius + sin(t * 3) * 35;

        let x = cos(t) * r;
        let y = sin(t) * r * 0.35;

        curveVertex(x, y);
      }
      endShape();

      pop();
    }
  }
}

function drawFilaments() {
  translate(width / 2, height / 2);

  for (let i = 0; i < 600; i++) {
    let a = random(TWO_PI);
    let r = random(40, 380);

    let x = cos(a) * r;
    let y = sin(a) * r;

    let hue = map(r, 40, 380, 40, 320);

    stroke(hue, 60, 100, 70);
    strokeWeight(random(0.5, 2));

    line(0, 0, x, y);
  }
}

function drawDust() {
  for (let i = 0; i < 3000; i++) {
    let x = random(width);
    let y = random(height);

    stroke(random(360), 40, 100, random(20, 80));
    strokeWeight(random(0.3, 1.5));

    point(x, y);
  }
}
