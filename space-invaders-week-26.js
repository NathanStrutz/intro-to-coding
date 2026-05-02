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
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  draw() {
    fill("white");
    square(this.x, this.y, 50);
  }
}
class Army {
  constructor() {
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 8; x++) {
        let offset = 75;
        this.aliens.push(new Alien(x * offset, y * offset));
      }
    }
  }
  x = 50;
  y = 100;
  vx = 5;
  vy = 5;
  aliens = [];

  draw() {
    this.x += this.vx;
    if (this.x < 10) {
      this.vx = abs(this.vx);
      this.y += this.vy;
    }
    if (this.x > 220) {
      this.vx = -abs(this.vx);
      this.y += this.vy;
    }
    push();
    translate(this.x, this.y);
    for (let alien of this.aliens) {
      alien.draw();
    }
    pop();
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
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  vy = -10;
  draw() {
    this.y += this.vy;
    fill("red");
    rect(this.x, this.y, 5, 20);
  }
}

var mousePressed = function () {
  bullets.push(new Bullet(mouseX, height - 35));
};

// Hoist the main variables out of p5
let score;
let lives;
let mothership;
let army;
let bunkerHill;
let tank;
let bullets = [];
let bombs = [];

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

  for (let bullet of bullets) {
    bullet.draw();
  }
  for (let bomb of bombs) {
    bomb.draw();
  }
};
