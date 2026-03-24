///<reference path="../lib/p5.global.d.ts" />


function setup() {
  createCanvas(400, 400);
  noLoop();
}

function draw() {
  background("skyblue");
  noStroke();
  angleMode(DEGREES);

  // hill
  fill("green");
  ellipse(width / 2, height - 100, 800, 300);

  // barn
  fill(230, 0, 0);
  square(100, 80, 100);
  // roof
  fill(0);
  triangle(90, 80, 210, 80, 150, 40);
  // doors
  fill(255);
  rect(130, 139, 18, 40);
  rect(150, 139, 18, 40);

  // bird 1
  fill(0, 0, 0, 0);
  stroke(0);
  strokeWeight(3);
  arc(300, 100, 20, 10, 200, 360);
  arc(320, 100, 20, 10, 200, 340);
  // bird 2
  arc(340, 110, 20, 10, 200, 360);
  arc(360, 110, 20, 10, 200, 340);
}
