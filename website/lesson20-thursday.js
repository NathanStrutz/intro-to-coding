let canvas = { width: 1400, height: 800 };
let boxes = [];

var setup = function () {
  createCanvas(canvas.width, canvas.height);

  for (let index = 0; index < 500; index++) {
    boxes.push({ x: 100, y: 100, w: 150, h: 200, s: 5 });
  }
};

var draw = function () {
  background(100);

  text("Secret message", canvas.width / 2, canvas.height / 2);

  for (let index = 0; index < boxes.length; index++) {
    const box = boxes[index];

    box.x = random(max(box.x - box.s, 0), min(box.x + box.s, canvas.width - box.w));
    box.y = random(max(box.y - box.s, 0), min(box.y + box.s, canvas.height - box.h));

    box.w = random(box.w - 1, box.w + 1);
    box.h = random(box.h - 1, box.h + 1);

    rect(box.x, box.y, box.w, box.h);
  }
};

let randColorRange = function (currentValue, travelRange = 10) {
  let val = round(random(currentValue - travelRange, currentValue + travelRange));
  val = max(0, val);
  val = min(val, 255);
  return val;
};
