// Gemini 2026
let colors = ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51", "#ffffff"];

function setup() {
  createCanvas(800, 800);
  noLoop(); // No motion, just a single render
  strokeWeight(2);
  stroke(30);
}

function draw() {
  background(240);
  // Initial call: x, y, width, height, recursion depth
  divide(50, 50, width - 100, height - 100, 7);
}

function divide(x, y, w, h, depth) {
  if (depth > 0) {
    // Determine a split point (not always in the center for "organic" feel)
    let splitProb = random(1);

    if (w > h && w > 50) {
      // Horizontal split
      let nw = w * random(0.3, 0.7);
      divide(x, y, nw, h, depth - 1);
      divide(x + nw, y, w - nw, h, depth - 1);
    } else if (h > 50) {
      // Vertical split
      let nh = h * random(0.3, 0.7);
      divide(x, y, w, nh, depth - 1);
      divide(x, y + nh, w, h - nh, depth - 1);
    } else {
      drawRect(x, y, w, h);
    }
  } else {
    drawRect(x, y, w, h);
  }
}

function drawRect(x, y, w, h) {
  // Select a random color from our palette
  let col = color(random(colors));
  fill(col);

  // Add a slight chance for a "special" texture (hatching)
  rect(x, y, w, h);

  if (random(1) > 0.8 && w > 20) {
    drawTexture(x, y, w, h);
  }
}

function drawTexture(x, y, w, h) {
  stroke(0, 50);
  for (let i = 0; i < w; i += 4) {
    line(x + i, y, x + i, y + h);
  }
  stroke(30);
}

function mousePressed() {
  redraw(); // Generates a new unique composition
}
