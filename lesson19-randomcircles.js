let canvas = { width: window.innerWidth, height: window.innerHeight };

function setup() {
  createCanvas(canvas.width, canvas.height);
  frameRate(1);
}

function draw() {
  noStroke();
  for (let j = 0; j < canvas.height + 50; j += 50) {
    for (let i = 0; i < canvas.width + 50; i += 10) {
      //   fill(random(200, 255), random(100, 230), random(50, 200));
      fill(random(200, 255));
      ellipse(i, j, random(100));
    }
  }
}
