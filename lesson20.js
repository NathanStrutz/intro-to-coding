let canvas = { width: 1000, height: 800 };
let movers = [];

var setup = function () {
  createCanvas(canvas.width, canvas.height);

  init();
};

// Initialization function because `random` doesn't exist until we start drawing
let init = function () {
  for (let index = 0; index < 1000; index++) {
    movers.push({
      x: random(canvas.width),
      y: random(canvas.height),
      w: random(30, 200),
      h: random(30, 200),
      r: 255,
      g: 255,
      b: 255,
      jiggle: random(10),
    });
  }
};

var draw = function () {
  background(200);
  strokeWeight(5);

  textSize(20);
  fill(50);
  text("Secret Message", canvas.width / 2 - 100, canvas.height / 2 - 20, 200, 40);

  for (let index = 0; index < movers.length; index++) {
    let mover = movers[index];
    renderMover(mover);
  }
};

let renderMover = function (mover) {
  mover.r = randColorRange(mover.r, 2);
  mover.g = randColorRange(mover.g, 2);
  mover.b = randColorRange(mover.b, 2);
  fill(mover.r, mover.g, mover.b);

  mover.x = random(min(canvas.width - mover.w, mover.x - mover.jiggle), max(0, mover.x + mover.jiggle));
  mover.y = random(min(canvas.height - mover.h, mover.y - mover.jiggle), max(0, mover.y + mover.jiggle));

  if (mouseX > mover.x && mouseX < mover.x + mover.w && mouseY > mover.y && mouseY < mover.y + mover.h) {
    // you're in the way!
    mover.x = mouseX + 2;
    mover.y = mouseY + 2;
  }

  rect(mover.x, mover.y, mover.w, mover.h);
};

// returns a number from 0-255 within a small range, made for semi-closely matching colors
let randColorRange = function (currentValue, travelRange = 10) {
  let val = round(random(currentValue - travelRange, currentValue + travelRange));
  val = max(0, val);
  val = min(val, 255);
  return val;
};
