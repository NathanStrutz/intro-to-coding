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

    if (ceil(random(1000)) === 15) {
      bombs.push(new Bomb(this));
    } else {
    }
  }
}
class Army {
  constructor() {
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 8; x++) {
        let offsetX = random(70, 80);
        let offsetY = random(70, 80);
        this.aliens.push(new Alien(x * offsetX, y * offsetY));
      }
    }
  }
  x = 100;
  y = 150;
  vx = -1;
  aliens = [];
  draw() {
    this.x += this.vx;
    if (this.x < 10) {
      this.vx = 1;
      this.y += 5;
    }
    if (this.x > 200) {
      this.vx = -1;
      this.y += 5;
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
  constructor(alien) {
    this.x = army.x + alien.x + 25;
    this.y = army.y + alien.y + 50;
  }
  vy = 4;
  draw() {
    this.y += this.vy;
    fill("green");
    rect(this.x, this.y, 5, 10);
    ellipse(this.x + 2.5, this.y + 20, 15, 30);
  }
}
class Bullet {
  x = mouseX;
  y = height - 35;
  vy = -5;
  w = 5;
  h = 20;
  draw() {
    this.y += this.vy;
    fill("orangered");
    rect(this.x, this.y, this.w, this.h);

    if (this.y < 0) {
      bullets.splice(bullets.indexOf(this), 1);
    }
    this.checkIfHitAlien();
  }
  checkIfHitAlien() {
    for (let alien of army.aliens) {
      if (
        this.x + this.w > army.x + alien.x &&
        this.x < army.x + alien.x + 50 &&
        this.y + this.h > army.y + alien.y &&
        this.y < army.y + alien.y + 50
      ) {
        bullets.splice(bullets.indexOf(this), 1);
        army.aliens.splice(army.aliens.indexOf(alien), 1);
      }
    }
  }
}

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

var mouseClicked = function () {
  if (bullets.length < 6) {
    bullets.push(new Bullet());
  }
};
