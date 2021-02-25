let canvas = { width: 1000, height: 800 };
let movers = [];

var setup = function () {
  createCanvas(canvas.width, canvas.height);

  init();
};

// Initialization function because `random` doesn't exist until we start drawing
let init = function () {
  let colors = [
    "Aqua",
    "Cyan",
    "LightCyan",
    "PaleTurquoise",
    "Aquamarine",
    "Turquoise",
    "MediumTurquoise",
    "DarkTurquoise",
    "CadetBlue",
    "SteelBlue",
    "LightSteelBlue",
    "PowderBlue",
    "LightBlue",
    "SkyBlue",
    "LightSkyBlue",
    "DeepSkyBlue",
    "DodgerBlue",
    "CornflowerBlue",
    "MediumSlateBlue",
    "RoyalBlue",
    "Blue",
  ];

  for (let index = 0; index < 1000; index++) {
    movers.push({
      x: random(canvas.width),
      y: random(canvas.height),
      w: random(30, 200),
      h: random(30, 200),
      c: random(colors),
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
  fill(mover.c);
  mover.x = random(min(canvas.width - mover.w, mover.x - mover.jiggle), max(0, mover.x + mover.jiggle));
  mover.y = random(min(canvas.height - mover.h, mover.y - mover.jiggle), max(0, mover.y + mover.jiggle));

  if (mouseX > mover.x && mouseX < mover.x + mover.w && mouseY > mover.y && mouseY < mover.y + mover.h) {
    // you're in the way!
    mover.x = mouseX + 2;
    mover.y = mouseY + 2;
  }

  rect(mover.x, mover.y, mover.w, mover.h);
};
