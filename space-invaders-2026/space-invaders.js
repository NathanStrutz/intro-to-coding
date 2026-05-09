///<reference path="lib/p5.global.d.ts" />

class Score {
  points = 0;
  draw() {
    textSize(15);
    fill("white");
    textAlign(RIGHT);
    text(this.points, 50, 30);
    textAlign(LEFT);
    text("Score", 60, 30);
  }
}
class Lives {
  count = 3;
  draw() {
    textAlign(RIGHT);
    text("Lives", width - 40, 30);
    textAlign(LEFT);
    text(this.count, width - 30, 30);
  }
}
class Mothership {
  x = 150;
  y = 50;
  w = 100;
  h = 40;
  draw() {
    noStroke();
    fill("blue");
    rect(this.x, this.y, this.w, this.h);

    if (army.aliens.length < 10) {
      if (round(random(1, 20)) === 5) {
        bombs.push(
          new Bomb(this.x + random(0, this.w), this.y + random(0, this.h)),
        );
      }
    }
  }
}
class Alien {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  size = 50;
  draw() {
    fill("white");
    square(this.x, this.y, this.size);

    if (round(random(1, army.chanceOfShooting)) === 5) {
      bombs.push(new Bomb(army.x + this.x, army.y + this.y));
    }
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
  chanceOfShooting = 1000;

  draw() {
    this.x += this.vx;
    if (this.x < 10) {
      this.vx = abs(this.vx);
      this.y += this.vy;
      this.chanceOfShooting = max(50, this.chanceOfShooting - 20);
    }
    if (this.x > 220) {
      this.vx = -abs(this.vx);
      this.y += this.vy;
      this.chanceOfShooting = max(50, this.chanceOfShooting - 20);
    }

    if (this.y > 250) {
      this.vy = -abs(this.vy);
    }
    if (this.y < 100) {
      this.vy = abs(this.vy);
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
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  w = 125;
  h = 50;
  damage = 0; // 100 = dead!
  draw() {
    fill(this.damage * 2 + 55, 50, 50);
    rect(this.x, this.y, this.w, this.h);
  }
}
class BunkerHill {
  constructor() {
    this.bunkers = [];
    let shieldYLevel = height - 125;
    this.bunkers.push(new Bunker(75, shieldYLevel));
    this.bunkers.push(new Bunker(325, shieldYLevel));
    this.bunkers.push(new Bunker(575, shieldYLevel));
  }
  draw() {
    for (let bunker of this.bunkers) {
      bunker.draw();
    }
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
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  vy = 10;
  size = 10;
  draw() {
    this.y += this.vy;
    fill("green");
    square(this.x, this.y, this.size);
    let tankLeft = mouseX - 45;
    let tankTop = height - 35;
    let tankRight = tankLeft + 100;
    let tankBottom = tankTop + 25;

    // bombs hitting the tank
    if (
      this.x + this.size > tankLeft &&
      this.x < tankRight &&
      this.y + this.size > tankTop &&
      this.y < tankBottom
    ) {
      // hit!
      lives.count--;
      // bombs.splice(bombs.indexOf(this));
      bombs = [];
    }

    // bombs hitting the bunkers
    for (let bunker of bunkerHill.bunkers) {
      if (
        this.x + this.size > bunker.x &&
        this.x < bunker.x + bunker.w &&
        this.y + this.size > bunker.y &&
        this.y < bunker.y + bunker.h
      ) {
        // HIT!
        bunker.damage += 2;
        bombs.splice(bombs.indexOf(this), 1);
        if (bunker.damage >= 100) {
          bunkerHill.bunkers.splice(bunkerHill.bunkers.indexOf(bunker), 1);
        }
      }
    }
  }
}
class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  w = 5;
  h = 20;
  vy = -10;
  draw() {
    this.y += this.vy;
    fill("red");
    rect(this.x, this.y, this.w, this.h);

    // bullets hitting aliens
    for (let alien of army.aliens) {
      if (
        this.x + this.w > army.x + alien.x &&
        this.x < army.x + alien.x + alien.size &&
        this.y + this.h > army.y + alien.y &&
        this.y < army.y + alien.y + alien.size
      ) {
        // HIT!
        score.points += army.y + alien.y;
        army.aliens.splice(army.aliens.indexOf(alien), 1);
        bullets.splice(bullets.indexOf(this), 1);
      }
    }

    // bullets hitting bunkers
    for (let bunker of bunkerHill.bunkers) {
      if (
        this.x + this.w > bunker.x &&
        this.x < bunker.x + bunker.w &&
        this.y + this.h > bunker.y &&
        this.y < bunker.y + bunker.h
      ) {
        // HIT!
        bunker.damage += 10;
        bullets.splice(bullets.indexOf(this), 1);
        if (bunker.damage >= 100) {
          bunkerHill.bunkers.splice(bunkerHill.bunkers.indexOf(bunker), 1);
        }
      }
    }
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

  if (army.aliens.length === 0) {
    textSize(100);
    textAlign(CENTER);
    text("YOU WIN!", width / 2, height / 2);
    textSize(40);
    text(score.points, width / 2, height / 2 + 75);
    noLoop();
  }

  if (lives.count === 0) {
    textSize(100);
    textAlign(CENTER);
    text("YOU LOSE!", width / 2, height / 2);
    textSize(40);
    text(score.points, width / 2, height / 2 + 75);
    noLoop();
  }
};
