/// <reference path="lib/p5.global.d.ts" />

class Score {
  constructor() {
    this.points = 0;
  }
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
  constructor() {
    this.count = 3;
  }
  draw() {
    textSize(15);
    fill("white");
    textAlign(RIGHT);
    text("Lives", width - 60, 30);
    textAlign(LEFT);
    text(this.count, width - 50, 30);
  }
}

class Mothership {
  draw() {
    noStroke();
    fill("red");
    rect(width / 2 - 50, 50, 100, 40);
  }
}

class Alien {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 30;
  }

  draw() {
    fill("white");
    square(this.x, this.y, this.size);

    if (random(100) < 0.5) {
      bombs.push(
        new Bomb(army.x + this.x + this.size / 2, army.y + this.y + this.size),
      );
    }
  }
}

class Army {
  constructor() {
    this.x = 50;
    this.y = 100;
    this.vx = 2;
    this.vy = 20;
    this.aliens = [];

    let offset = 60;
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 8; x++) {
        this.aliens.push(new Alien(x * offset, y * offset));
      }
    }
  }

  draw() {
    this.x += this.vx;
    if (this.x < 20 || this.x + 8 * 60 > width - 20) {
      this.vx *= -1;
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
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 80;
    this.h = 40;
    this.health = 3;
  }

  draw() {
    fill("#ffe599");
    rect(this.x, this.y, this.w, this.h);
  }
}

class BunkerHill {
  constructor() {
    this.bunkers = [];
    let shieldYLevel = height - 150;
    this.bunkers.push(new Bunker(100, shieldYLevel));
    this.bunkers.push(new Bunker(width / 2 - 40, shieldYLevel));
    this.bunkers.push(new Bunker(width - 180, shieldYLevel));
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
    let tankX = mouseX - 50;
    let tankY = height - 50;
    translate(tankX, tankY);
    fill("#8000ff");
    rect(0, 0, 100, 25);
    triangle(50, -10, 60, 0, 40, 0);
    pop();
  }

  getBounds() {
    let x = mouseX - 50;
    let y = height - 50;
    return { x, y, w: 100, h: 25 };
  }
}

class Bomb {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vy = 5;
    this.size = 10;
  }

  draw() {
    this.y += this.vy;
    fill("#ff1493");
    square(this.x, this.y, this.size);

    let tankBounds = tank.getBounds();
    if (
      this.x + this.size > tankBounds.x &&
      this.x < tankBounds.x + tankBounds.w &&
      this.y + this.size > tankBounds.y &&
      this.y < tankBounds.y + tankBounds.h
    ) {
      lives.count--;
      bombs.splice(bombs.indexOf(this), 1);
      return;
    }

    for (let bunker of bunkerHill.bunkers) {
      if (
        this.x + this.size > bunker.x &&
        this.x < bunker.x + bunker.w &&
        this.y + this.size > bunker.y &&
        this.y < bunker.y + bunker.h
      ) {
        bunker.health--;
        bombs.splice(bombs.indexOf(this), 1);
        if (bunker.health <= 0) {
          bunkerHill.bunkers.splice(bunkerHill.bunkers.indexOf(bunker), 1);
        }
        return;
      }
    }

    if (this.y > height + this.size) {
      bombs.splice(bombs.indexOf(this), 1);
    }
  }
}

class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 5;
    this.h = 15;
    this.vy = -8;
  }

  draw() {
    this.y += this.vy;
    fill("#30f2e4");
    rect(this.x, this.y, this.w, this.h);

    for (let alien of army.aliens) {
      let ax = army.x + alien.x;
      let ay = army.y + alien.y;
      if (
        this.x + this.w > ax &&
        this.x < ax + alien.size &&
        this.y + this.h > ay &&
        this.y < ay + alien.size
      ) {
        score.points += 10;
        army.aliens.splice(army.aliens.indexOf(alien), 1);
        bullets.splice(bullets.indexOf(this), 1);
        return;
      }
    }

    for (let bunker of bunkerHill.bunkers) {
      if (
        this.x + this.w > bunker.x &&
        this.x < bunker.x + bunker.w &&
        this.y + this.h > bunker.y &&
        this.y < bunker.y + bunker.h
      ) {
        bullets.splice(bullets.indexOf(this), 1);
        return;
      }
    }

    if (this.y + this.h < 0) {
      bullets.splice(bullets.indexOf(this), 1);
    }
  }
}

let score;
let lives;
let mothership;
let army;
let bunkerHill;
let tank;
let bullets = [];
let bombs = [];

function setup() {
  createCanvas(800, 600);
  score = new Score();
  lives = new Lives();
  mothership = new Mothership();
  army = new Army();
  bunkerHill = new BunkerHill();
  tank = new Tank();
}

function draw() {
  background("#0a0f33");

  score.draw();
  lives.draw();
  mothership.draw();
  army.draw();
  bunkerHill.draw();
  tank.draw();

  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].draw();
  }

  for (let i = bombs.length - 1; i >= 0; i--) {
    bombs[i].draw();
  }

  if (lives.count <= 0) {
    textAlign(CENTER);
    textSize(60);
    fill("white");
    text("GAME OVER", width / 2, height / 2);
    textSize(30);
    text("Score: " + score.points, width / 2, height / 2 + 50);
    noLoop();
  } else if (army.aliens.length === 0) {
    textAlign(CENTER);
    textSize(60);
    fill("white");
    text("YOU WIN", width / 2, height / 2);
    textSize(30);
    text("Score: " + score.points, width / 2, height / 2 + 50);
    noLoop();
  }
}

function mousePressed() {
  let tankBounds = tank.getBounds();
  bullets.push(new Bullet(tankBounds.x + tankBounds.w / 2, tankBounds.y));
}
function keyPressed() {
  if (key === " ") {
    let tankBounds = tank.getBounds();
    bullets.push(new Bullet(tankBounds.x + tankBounds.w / 2, tankBounds.y));
  }
}
