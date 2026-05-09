///<reference path="lib/p5.global.d.ts" />
let points = 0;
class Score {
  draw() {
    fill("white");
    textSize(20);

    text("Score: " + points, 650, 50);
  }
}

class Lives {
  count = 2;
  draw() {
    fill("white");
    textSize(20);
    text("Lives: " + this.count, 50, 50);
  }
}

class Game {
  draw() {
    fill("red");
    textSize(30);
    text("VeggieVaders", 50, 570);
  }
}

class Mothership {
  constructor(x, y, vx, vy) {
    this.x = 370;
    this.y = 60;
    this.vx = 5;
    this.vy = 1;
  }

  draw() {
    textSize(60);
    text("🍅", 370, 60);
  }
}

class Alien {
  constructor(veg, x, y) {
    this.veg = veg;
    this.x = x;
    this.y = y;
    this.size = 50;
  }
  draw() {
    textSize(40);
    text(this.veg, this.x, this.y);

    if (round(random(1, 400)) === 5) {
      bombs.push(new Bomb(random(20, 780), 50));
    }
  }
}

class Army {
  constructor(x, y, vx, vy) {
    this.x = 50;
    this.y = 100;
    this.vx = 10;
    this.vy = 8;

    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 9; x++) {
        let veg = "🥦";
        if (y === 1) {
          veg = "🌽";
        }
        if (y === 2) {
          veg = "🥕";
        }
        // else other vegs
        aliens.push(new Alien(veg, x * 70, y * 100));
      }
    }
  }
  aliens = [];

  draw() {
    this.x += this.vx;
    if (this.x < 10) {
      this.vx = abs(this.vx);
      this.y += this.vy;
    }
    if (this.x > 200) {
      this.vx = -abs(this.vx);
      this.y += this.vy;
    }
    push();
    translate(this.x, this.y);
    for (let alien of aliens) {
      alien.draw();
    }
    pop();

    // textSize(40);
    // push();
    // for (let index = 0; index < 9; index++) {
    //   text("🥦", 100, 140);
    //   translate(70, 0);
    // }
    // pop();
    // push();
    // for (let index = 0; index < 9; index++) {
    //   text("🌽", 100, 240);
    //   translate(70, 0);
    // }
    // pop();
    // push();
    // for (let index = 0; index < 9; index++) {
    //   text("🥕", 100, 340);
    //   translate(70, 0);
    // }
    // pop();
  }
}

class Bunker {
  draw() {}
}

class BunkerHill {
  draw() {
    textSize(60);
    text("🍔", 140, 500);
    text("🍔", 290, 500);
    text("🍔", 440, 500);
    text("🍔", 590, 500);
  }
}

class Tank {
  draw() {
    textSize(45);
    text("🍟", mouseX - 20, 550);
    noStroke();
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
    fill("red");
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
      lives.count -= 1;
      bombs.splice(bombs.indexOf(this));
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
    fill("#f5e23b");
    rect(this.x, this.y, 3, 25);

    for (let alien of aliens) {
      if (
        this.x + this.w > army.x + alien.x &&
        this.x < army.x + alien.x + alien.size &&
        this.y + this.h > army.y + alien.y &&
        this.y < army.y + alien.y + alien.size
      ) {
        points += army.y + alien.y;
        aliens.splice(aliens.indexOf(alien), 1);
        bullets.splice(bullets.indexOf(this), 1);
      }
    }
  }
}

var mousePressed = function () {
  bullets.push(new Bullet(mouseX, height - 85, -10));
};

let score;
let lives;
let game;
let mothership;
let bunkerHill;
let tank;
let alien;
let bunkers = [];
let bullets = [];
let bombs = [];
let aliens = [];

var setup = function () {
  createCanvas(800, 600);
  score = new Score();
  lives = new Lives();
  game = new Game();
  mothership = new Mothership();
  army = new Army();
  bunkerHill = new BunkerHill();
  tank = new Tank();
  bullet = new Bullet();
  bomb = new Bomb();
  alien = new Alien();
};

var draw = function () {
  background("black");

  score.draw();
  lives.draw();
  game.draw();
  mothership.draw();
  army.draw();
  bunkerHill.draw();
  tank.draw();
  for (let bomb of bombs) {
    bomb.draw();
  }

  for (let bullet of bullets) {
    bullet.draw();
  }

  if (lives.count < 1) {
    background("black");
    textSize(100);
    fill("red");
    textAlign(CENTER);
    text("You Lose", 400, 300);
    textSize(50);
    text("GO EAT YOUR VEGGIES!", 400, 400);
  }

  if (army.y === 400) {
    background("black");
    textSize(100);
    fill("red");
    textAlign(CENTER);
    text("You Lose", 400, 300);
    textSize(50);
    text("GO EAT YOUR VEGGIES!", 400, 400);
    noLoop();
  }

  if (aliens.length === 0) {
    background("black");
    textSize(200);
    textAlign(CENTER);
    text("You Win!", width / 2, height / 2);
    textSize(75);
    text("No More Veggies!", width / 2, height - 170);
    textSize(50);
    text(points, width / 2, height - 100);
    noLoop();
  }
};
