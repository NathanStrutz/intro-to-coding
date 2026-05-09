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
    fill("green");
    rect(150, 50, 100, 40);

    if (army.aliens.length < 12) {
      if (round(random(1, 60)) === 5) {
        bombs.push(new Bomb(this.x + this.w / 2, this.w + this.y));
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

    if (round(random(1, 800)) === 5) {
      bombs.push(new Bomb(army.x + this.x, army.y + this.y));
    }
  }
}

class Army {
  constructor() {
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 8; x++) {
        let offsetY = 75;
        let offsetX = 75;
        this.aliens.push(new Alien(x * offsetX, y * offsetY));
      }
    }
  }
  x = 50;
  y = 100;
  vx = 3;
  vy = 9;
  aliens = [];

  draw() {
    this.x += this.vx;
    if (this.x < 10) {
      this.vx = abs(this.vx);
      this.y += this.vy;
      this.chanceOfShooting = max(50, this.chanceOfShooting - 20);
    }
    if (this.x > 215) {
      this.vx = -abs(this.vx);
      this.y += this.vy;
      this.chanceOfShooting = max(50, this.chanceOfShooting - 20);
    }

    if (this.y > 250) {
      this.vy = abs(this.vy);
    }
    if (this.y < 100) {
      this.vy = -abs(this.vy);
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
  h = 35;
  damage = 0;
  draw() {
    fill(this.damage * 2 + 55, 50, 55);
    rect(this.x, this.y, this.w, this.h);
  }
}
class BunkerHill {
  constructor() {
    this.bunkers = [];
    let shieldYlevel = height - 140;
    this.bunkers.push(new Bunker(75, shieldYlevel));
    this.bunkers.push(new Bunker(325, shieldYlevel));
    this.bunkers.push(new Bunker(575, shieldYlevel));
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
  vy = 6;
  size = 10;
  draw() {
    this.y += this.vy;
    fill("green");
    square(this.x, this.y, this.size);
    let tankLeft = mouseX - 45;
    let tankTop = height - 35;
    let tankRight = tankLeft + 100;
    let tankBottom = tankTop + 25;
    if (
      this.x + this.size > tankLeft &&
      this.x < tankRight &&
      this.y + this.size > tankTop &&
      this.y < tankBottom
    ) {
      // hit!
      lives.count--;
      bombs.splice(bombs.indexOf(this));
    }
    for (let bunker of bunkerHill.bunkers) {
      if (
        this.x + this.size > bunker.x &&
        this.x < bunker.x + bunker.w &&
        this.y + this.size > bunker.y &&
        this.y < bunker.y + bunker.h
      ) {
        // HIT!
        bunker.damage += 17;
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
    if (this.y < 0) {
      bullets.splice(bullets.indexOf(this), 1);
    }

    for (let alien of army.aliens) {
      if (
        this.x + this.w > alien.x + army.x &&
        this.x < alien.x + alien.size + army.x &&
        this.y + this.h > alien.size + army.y &&
        this.y < alien.size + army.y + alien.y
      ) {
        //hit
        console.log("Hit");
        score.points += army.y + alien.y;
        army.aliens.splice(army.aliens.indexOf(alien), 1);
        bullets.splice(bullets.indexOf(this), 1);
      }
    }
    //bullets hitting bunkers
    for (let bunker of bunkerHill.bunkers) {
      if (
        this.x + this.w > bunker.x &&
        this.x < bunker.x + bunker.w &&
        this.y + this.h > bunker.y &&
        this.y < this.y + bunker.h
      ) {
        //hit
        bunker.damage += 20;
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
    textSize(50);
    textAlign(CENTER);
    text("YOU SAVED THE WORLD", width / 2, height / 2 + 75);

    noLoop();
  }

  if (lives.count === 0) {
    textSize(50);
    textAlign(CENTER);
    text("YOU FAILED", width / 2, height / 2 + 75);

    noLoop();
  }
};
