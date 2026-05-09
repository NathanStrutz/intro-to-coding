/// <reference path="lib/p5.global.d.ts" />

var setup = function () {
  createCanvas(800, 600);
};

var draw = function () {
  background("black");

  // Score
  textSize(15);
  fill("white");
  textAlign(RIGHT);
  text("00000", 50, 30);
  textAlign(LEFT);
  text("Score", 60, 30);

  // lives
  textAlign(RIGHT);
  text("Lives", width - 40, 30);
  textAlign(LEFT);
  text("3", width - 30, 30);

  // UFO
  noStroke();
  fill("red");
  rect(150, 50, 100, 40);

  // aliens
  for (let x = 0; x < 8; x++) {
    let y = 150;
    let offset = 75;
    fill("white");
    square(offset + 75 * x, y, 50);
  }
  for (let x = 0; x < 9; x++) {
    let y = 250;
    let offset = 45;
    fill("white");
    square(offset + 75 * x, y, 50);
  }
  for (let x = 0; x < 8; x++) {
    let y = 350;
    let offset = 65;
    fill("white");
    square(offset + 75 * x, y, 50);
  }

  // shields
  fill("orange");
  let shieldYLevel = height - 125;
  rect(75, shieldYLevel, 125, 50);
  rect(325, shieldYLevel, 125, 50);
  rect(575, shieldYLevel, 125, 50);

  // Player cannon thing
  fill("orangered");
  rect(170, height - 35, 100, 25);
  triangle(170 + 50, height - 45, 170 + 60, height - 35, 170 + 40, height - 35);

  // fill("orangered");
  // translate(220, height - 35);
  // rect(-50, 0, 100, 25);
  // triangle(0, -15, 10, 0, -10, 0);
};
