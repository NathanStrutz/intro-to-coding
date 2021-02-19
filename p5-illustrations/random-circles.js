let canvas = { width: window.innerWidth, height: window.innerHeight };

var setup = function () {
  createCanvas(canvas.width, canvas.height);
  // Looping just makes you dizzy - I don't recommend it!
  noLoop();
};

var draw = function () {
  noStroke();
  for (let j = 0; j < canvas.height + 50; j += 50) {
    for (let i = 0; i < canvas.width + 50; i += 10) {
      // comment this in to fill with colors - these ones are tinted red
      fill(random(200, 255), random(100, 230), random(50, 200));

      // comment this in to fill with grayscale dots
      // fill(random(200, 255));

      ellipse(i, j, random(100));
    }
  }
};

// click to run it over the top of the previous one
window.mouseReleased = draw;
