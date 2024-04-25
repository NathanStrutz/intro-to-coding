let canvas = { w: window.innerWidth, h: window.innerHeight };
function setup() {
  createCanvas(canvas.w, canvas.h);
  background(30);
  noLoop();
}

function draw() {
  strokeWeight(3);
  for (let i = 0; i < 1000; i++) {
    let r = random(1);
    if (r < 0.25) {
      stroke(random(255), random(255), random(255), 50);
      line(random(width), random(height), random(width), random(height));
    } else if (r < 0.5) {
      stroke(random(255), random(255), random(255), 50);
      rect(random(width), random(height), random(50), random(50));
    } else if (r < 0.75) {
      fill(random(255), random(255), random(255), 50);
      noStroke();
      ellipse(random(width), random(height), random(50), random(50));
    } else {
      fill(random(255), random(255), random(255), 50);
      noStroke();
      triangle(random(width), random(height), random(width), random(height), random(width), random(height));
    }
  }
}
