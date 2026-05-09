///<reference path="lib/p5.global.d.ts" />
let point = 0;
class Score {
  draw() {
    textSize(15);
    fill("white");
    text(point, 10, 15);
  }
}
class Lives {
  count = 5;
  draw() {
    fill("white");
    text(this.count, 760, 15);
  }
}
class Mothership {
  draw() {
    fill("red");
    ellipse(300, 50, 100, 30);
    fill("black");
    square(270, 47, 5, 50);
    square(295, 47, 5, 50);
    square(320, 47, 5, 50);
  }
}
class Alien {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  size = 50;
  draw() {
    fill(178, 34, 34, army.t);
    square(this.x, this.y, this.size);
    if (round(random(1, 200)) === 5) {
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
  t = 250;
  aliens = [];

  draw() {
    this.x += this.vx;
    if (this.x < 10) {
      this.vx = abs(this.vx);
      this.y += this.vy;
      this.t = this.t - 15;
    }
    if (this.x > 220) {
      this.vx = -abs(this.vx);
      this.y += this.vy;
      this.t = this.t - 15;
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
  w = 100;
  h = 25;
  damage = 0;
  draw() {
    fill(20, 30, this.damage * 2 + 30);
    rect(this.x, this.y, 100, 25);
  }
}
class Bunkerhill {
  constructor() {
    this.bunkers = [];
    let shieldYLeve1 = height - 125;
    this.bunkers.push(new Bunker(75, shieldYLeve1));
    this.bunkers.push(new Bunker(330, shieldYLeve1));
    this.bunkers.push(new Bunker(600, shieldYLeve1));
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
    fill(20, 30, 80);
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
    fill(255, 50, 70);
    square(this.x, this.y, this.size);
    // (mouseX - 45, height - 35)
    let tankLeft = mouseX - 45;
    let tankTop = height - 45;
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
        this.y + this.size > bunker.h &&
        this.y < bunker.y + bunker.h
      ) {
        bunker.damage += 10;
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
    fill("aqua");
    rect(this.x, this.y, this.w, this.h);
    //bullets hitting aliens
    for (let alien of army.aliens) {
      if (
        this.x + this.w > alien.x + army.x &&
        this.x < alien.x + army.x + alien.size &&
        this.y + this.h > alien.y + army.y &&
        this.y < alien.y + army.y + alien.size
      ) {
        point += 10;
        army.aliens.splice(army.aliens.indexOf(alien), 1);
        bullets.splice(bullets.indexOf(this), 1);
      }
    }

    // bullets hit bunker
    for (let bunker of bunkerHill.bunkers) {
      if (
        this.x + this.w > bunker.x &&
        this.x < bunker.x + bunker.w &&
        this.y + this.h > bunker.h &&
        this.y < bunker.y + bunker.h
      ) {
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

let score;
let lives;
let mothership;
let alien;
let army;
let bunker;
let bunkerHill;
let tank;
let bombs = [];
let bullets = [];

var setup = function () {
  createCanvas(800, 600);
  score = new Score();
  lives = new Lives();
  mothership = new Mothership();
  army = new Army();
  bunkerHill = new Bunkerhill();
  tank = new Tank();
};

var draw = function () {
  background(0);
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
    fill("Green");
    textSize(100);
    textAlign(CENTER);
    text("YOU WIN!", width / 2, height / 2);
    textSize(40);
    text("Score", width / 2, height / 2 + 60);
    text(point * lives.count, width / 2, height / 2 + 100);
    noLoop();
  }

  if (lives.count === 0) {
    fill("red");
    textSize(80);
    textAlign(CENTER);
    text("YOU LOSE", width / 2, height / 2);
    textSize(30);
    text("Score", width / 2, height / 2 + 60);
    text(point, width / 2, height / 2 + 100);
    noLoop();
  }
};
