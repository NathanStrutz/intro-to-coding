let boxes = [];
let canvas = { w: 1000, h: 800 };

var setup = function () {
  createCanvas(canvas.w, canvas.h);

  for (let index = 0; index < 1000; index++) {
    let w = random(20, 100);
    let box = {
      x: random(2, canvas.w - w - 2),
      y: random(2, canvas.h - w - 2),
      w: w,
      vx: random(-2, 2),
      vy: random(-2, 2),
      r: random(0, 150),
      g: random(0, 150),
      b: random(100, 255),
    };

    boxes.push(box);
  }
};

var draw = function () {
  background(150);

  for (let index = 0; index < boxes.length; index++) {
    let box = boxes[index];
    box.x += box.vx;
    box.y += box.vy;

    if (box.x + box.w > canvas.w || box.x < 0) {
      box.vx = -box.vx;
    } else if (box.y + box.w > canvas.h || box.y < 0) {
      box.vy = -box.vy;
    }

    fill(box.r, box.g, box.b);
    square(box.x, box.y, box.w);
  }
};
