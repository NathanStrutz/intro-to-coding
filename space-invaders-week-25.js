///<reference path="lib/p5.global.d.ts" />

class Score {
  draw() {
    textSize(15);
    fill("white");
    textAlign(RIGHT);
    text("00000", 50, 30);
    textAlign(LEFT);
    text("Score", 60, 30);
  }
}
class Lives {
  draw() {
    textAlign(RIGHT);
    text("Lives", width - 40, 30);
    textAlign(LEFT);
    text("3", width - 30, 30);
  }
}
class Mothership {
  draw() {
    noStroke();
    fill("red");
    rect(150, 50, 100, 40);
  }
}
class Alien {
  draw() {}
}
class Army {
  draw() {
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
  }
}
class Bunker {
  draw() {}
}
class BunkerHill {
  draw() {
    fill("orange");
    let shieldYLevel = height - 125;
    rect(75, shieldYLevel, 125, 50);
    rect(325, shieldYLevel, 125, 50);
    rect(575, shieldYLevel, 125, 50);
  }
}
class Tank {
  draw() {
    push();
    translate(mouseX - 45, height - 35);
    fill("orangered");
    rect(0, 0, 100, 25);
    triangle(0 + 50, -10, 0 + 60, 0, 0 + 40, 0);
    pop();
  }
}
class Bomb {
  draw() {}
}
class Bullet {
  draw() {}
}

// Hoist the main variables out of p5
let score;
let lives;
let mothership;
let army;
let bunkerHill;
let tank;

var setup = function () {
  createCanvas(800, 600);
  // Create the main variables only INSIDE of p5
  score = new Score();
  lives = new Lives();
  mothership = new Mothership();
  army = new Army();
  bunkerHill = new BunkerHill();
  tank = new Tank();
};
var draw = function () {
  background("black");
  score.draw();
  lives.draw();
  mothership.draw();
  army.draw();
  bunkerHill.draw();
  tank.draw();
};
