///<reference path="lib/p5.global.d.ts" />
let points = 1000;
let count = 1;
let damage = 0;
let lives = [count];

class Score {
  draw() {
    fill("white");
    text(points, 5, 20);
    text("points", 5, 35);
  }
}
class Lives {
  draw() {
    fill("white");

    text(count, 750, 20);
    text("lives left", 750, 40);
  }
}
class Mothership {
  draw() {
    push();
    translate(380, 12);
    for (let i = 0; i < 1; i++) {
      fill("grey");

      rect(5, 0, 5, 5);
      rect(10, 0, 5, 5);
      rect(15, 0, 5, 5);
      rect(20, 0, 5, 5);
      rect(-10, 5, 5, 5);
      rect(-5, 5, 5, 5);
      rect(0, 5, 5, 5);
      rect(5, 5, 5, 5);
      rect(10, 5, 5, 5);
      rect(15, 5, 5, 5);
      rect(20, 5, 5, 5);
      rect(25, 5, 5, 5);
      rect(30, 5, 5, 5);
      rect(35, 5, 5, 5);
      rect(-15, 10, 5, 5);
      rect(-10, 10, 5, 5);
      rect(-5, 10, 5, 5);
      rect(0, 10, 5, 5);
      rect(5, 10, 5, 5);
      rect(10, 10, 5, 5);
      rect(15, 10, 5, 5);
      rect(20, 10, 5, 5);
      rect(25, 10, 5, 5);
      rect(30, 10, 5, 5);
      rect(35, 10, 5, 5);
      rect(40, 10, 5, 5);
      rect(-15, 15, 5, 5);
      rect(-10, 15, 5, 5);
      rect(-5, 15, 5, 5);
      rect(10, 15, 5, 5);
      rect(15, 15, 5, 5);
      rect(30, 15, 5, 5);
      rect(35, 15, 5, 5);
      rect(40, 15, 5, 5);
      rect(-15, 20, 5, 5);
      rect(-10, 20, 5, 5);
      rect(-5, 20, 5, 5);
      rect(0, 20, 5, 5);
      rect(5, 20, 5, 5);
      rect(10, 20, 5, 5);
      rect(15, 20, 5, 5);
      rect(20, 20, 5, 5);
      rect(25, 20, 5, 5);
      rect(30, 20, 5, 5);
      rect(35, 20, 5, 5);
      rect(40, 20, 5, 5);
      rect(0, 25, 5, 5);
      rect(5, 25, 5, 5);
      rect(20, 25, 5, 5);
      rect(25, 25, 5, 5);
      rect(-5, 30, 5, 5);
      rect(0, 30, 5, 5);
      rect(10, 30, 5, 5);
      rect(15, 30, 5, 5);
      rect(25, 30, 5, 5);
      rect(30, 30, 5, 5);
      rect(-15, 35, 5, 5);
      rect(-10, 35, 5, 5);
      rect(35, 35, 5, 5);
      rect(40, 35, 5, 5);
    }
    noStroke();
    pop();
  }
}

class Alien {
  constructor(x, y, h, w) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
    this.size = 50;
  }
  draw() {
    push();
    {
      fill("purple");

      rect(this.x + 15, this.y + 0, 5, 5);
      rect(this.x + 20, this.y + 0, 5, 5);
      rect(this.x + 10, this.y + 5, 5, 5);
      rect(this.x + 15, this.y + 5, 5, 5);
      rect(this.x + 20, this.y + 5, 5, 5);
      rect(this.x + 25, this.y + 5, 5, 5);
      rect(this.x + 5, this.y + 10, 5, 5);
      rect(this.x + 10, this.y + 10, 5, 5);
      rect(this.x + 15, this.y + 10, 5, 5);
      rect(this.x + 20, this.y + 10, 5, 5);
      rect(this.x + 25, this.y + 10, 5, 5);
      rect(this.x + 30, this.y + 10, 5, 5);
      rect(this.x + 0, this.y + 15, 5, 5);
      rect(this.x + 5, this.y + 15, 5, 5);
      rect(this.x + 15, this.y + 15, 5, 5);
      rect(this.x + 20, this.y + 15, 5, 5);
      rect(this.x + 30, this.y + 15, 5, 5);
      rect(this.x + 35, this.y + 15, 5, 5);
      rect(this.x + 0, this.y + 20, 5, 5);
      rect(this.x + 5, this.y + 20, 5, 5);
      rect(this.x + 10, this.y + 20, 5, 5);
      rect(this.x + 15, this.y + 20, 5, 5);
      rect(this.x + 20, this.y + 20, 5, 5);
      rect(this.x + 25, this.y + 20, 5, 5);
      rect(this.x + 30, this.y + 20, 5, 5);
      rect(this.x + 35, this.y + 20, 5, 5);
      rect(this.x + 10, this.y + 25, 5, 5);
      rect(this.x + 25, this.y + 25, 5, 5);
      rect(this.x + 5, this.y + 30, 5, 5);
      rect(this.x + 15, this.y + 30, 5, 5);
      rect(this.x + 20, this.y + 30, 5, 5);
      rect(this.x + 30, this.y + 30, 5, 5);
      rect(this.x + 0, this.y + 35, 5, 5);
      rect(this.x + 10, this.y + 35, 5, 5);
      rect(this.x + 25, this.y + 35, 5, 5);
      rect(this.x + 35, this.y + 35, 5, 5);
    }

    pop();
    // x = 40;
    // y = 70;
    if (round(random(1, 500)) === 5) {
      bombs.push(new Bomb(random(20, 780), -5));
    }
  }
}

class Army {
  constructor(x, y, vx, vy) {
    this.x = 50;
    this.y = 100;
    this.vx = 10;
    this.vy = 5;

    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 7; x++) {
        aliens.push(new Alien(x * 70, y * 75, 8, 8));
      }
    }
  }

  draw() {
    this.x += this.vx;
    if (this.x < 10) {
      this.vx = abs(this.vx);
      this.y += this.vy;
    }
    if (this.x > 300) {
      this.vx = -abs(this.vx);
      this.y += this.vy;
    }

    push();
    translate(this.x, this.y);
    for (let alien of aliens) {
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

  draw() {
    let w = 100;
    let h = 15;
    fill("white");
    rect(this.x, this.y, w, h);
  }
}
class BunkerHill {
  constructor(x, vx) {
    this.x = 50;
    this.vx = 5;

    push();
    let sheildY = height - 150;
    bunkers.push(new Bunker(0, sheildY));
    pop();
  }
  draw() {
    this.x += this.vx;
    if (this.x < 10) {
      this.vx = abs(this.vx);
    }
    if (this.x > 700) {
      this.vx = -abs(this.vx);
    }
    push();
    translate(this.x, 0);
    for (let bunker of bunkers) {
      bunker.draw();
    }
    pop();
  }
}
class Tank {
  draw() {
    noStroke();
    triangle(mouseX, 550, mouseX - 10, 570, mouseX + 15, 570);
    rect(mouseX - 25, 560, 50, 20);
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
    let tankLeft = mouseX - 25;
    let tankTop = height - 35;
    let tankRight = tankLeft + 75;
    let tankBottom = tankTop + 25;

    if (
      this.x + this.size > tankLeft &&
      this.x < tankRight &&
      this.y + this.size > tankTop &&
      this.y < tankBottom
    ) {
      // hit!
      count -= 1;
      bombs.splice(bombs.indexOf(this));
    }
    let barrierLeft = bunkerHill.x;
    let barrierTop = height - 150;
    let barrierRight = bunkerHill.x + 100;
    let barrierBottom = barrierTop + 20;

    if (
      this.x + this.size > barrierLeft &&
      this.x < barrierRight &&
      this.y + this.size > barrierTop &&
      this.y < barrierBottom
    ) {
      damage += 1;
      bombs.splice(bombs.indexOf(bomb));
      if (damage === 4) {
        bunkers.splice(bunkers.indexOf(this));
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
    this.w = 5;
    this.h = 20;
    this.vy = -10;
    this.y += this.vy;
    fill("red");
    rect(this.x, this.y, this.w, this.h);
    alien.x;
    alien.y;
    for (let alien of aliens) {
      if (
        this.x + this.w > army.x + alien.x &&
        this.x < army.x + alien.x + alien.size &&
        this.y + this.h > army.y + alien.y &&
        this.y < army.y + alien.y + alien.size
      ) {
        // hit
        bullets.splice(bullets.indexOf(bullet));
        aliens.splice(aliens.indexOf(alien), 1);
      }
      let barrierLeft = bunkerHill.x;
      let barrierTop = height - 150;
      let barrierRight = bunkerHill.x + 100;
      let barrierBottom = barrierTop + 20;

      if (
        this.x + this.size > barrierLeft &&
        this.x < barrierRight &&
        this.y + this.size > barrierTop &&
        this.y < barrierBottom
      ) {
        damage += 1;
        bullets.splice(bullets.indexOf(this));
        if (damage === 4) {
          bunkers.splice(bunkers.indexOf(this));
        }
      }
    }
  }
}
mousePressed = function () {
  bullets.push(new Bullet(mouseX, height - 60));
};

let score;
let mothership;
let army;
let alien;
let bunker;

let tank;
let bullets = [];
let bombs = [];
let aliens = [];
let bunkers = [];
let bunkerHill;

function setup() {
  createCanvas(800, 600);

  score = new Score();
  lives = new Lives();

  mothership = new Mothership();
  army = new Army();
  bunkerHill = new BunkerHill();
  tank = new Tank();
  bullet = new Bullet();
  bomb = new Bomb();
  alien = new Alien();
}

function draw() {
  background("black");
  score.draw();
  lives.draw();
  mothership.draw();
  bunkerHill.draw();
  tank.draw();
  army.draw();

  for (let bullet of bullets) {
    bullet.draw();
  }
  for (let bomb of bombs) {
    bomb.draw();
  }

  if (count < 1) {
    background("black");
    fill("red");
    textSize(50);
    textAlign(CENTER);
    text("You lose", 400, 300);
    text(points, 400, 350);
  } else {
    points--;
  }
  if (aliens.length === 0) {
    background("black");
    textSize(100);
    textAlign(CENTER);
    fill("green");
    text("You Win", width / 2, height / 2);
    text("Score " + points, width / 2, height - 150);
    noLoop();
  }
  if (army.y > 300) {
    background("black");
    fill("red");
    textSize(50);
    textAlign(CENTER);
    text("You lose", 400, 300);
    text(points, 400, 350);
    noLoop();
  }
  if (points === 0) {
    background("black");
    fill("red");
    textSize(50);
    textAlign(CENTER);
    text("You lose", 400, 300);
    text(points, 400, 350);
    noLoop();
  }
}
