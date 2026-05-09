///<reference path="lib/p5.global.d.ts" />

class Score {
  constructor() {
    this.points = 0;
  }

  draw() {
    fill("white");
    textSize(15);

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
    fill("white");

    textAlign(RIGHT);
    text("Lives", width - 40, 30);

    textAlign(LEFT);
    text(this.count, width - 30, 30);
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

    this.size = 50;
    this.color = "white";
  }

  draw() {
    fill(this.color);
    square(this.x, this.y, this.size);
  }
}

class Army {
  constructor() {
    this.aliens = [];

    this.direction = 1;
    this.speed = 1;

    for (let i = 0; i < 8; i++) {
      this.aliens.push(new Alien(75 + i * 75, 150));
    }

    for (let i = 0; i < 9; i++) {
      this.aliens.push(new Alien(45 + i * 75, 250));
    }

    for (let i = 0; i < 8; i++) {
      this.aliens.push(new Alien(65 + i * 75, 350));
    }
  }

  update() {
    let hitWall = false;

    for (let alien of this.aliens) {
      alien.x += this.direction * this.speed;

      if (alien.x <= 0 || alien.x >= width - alien.size) {
        hitWall = true;
      }
    }

    if (hitWall) {
      this.direction *= -1;

      for (let alien of this.aliens) {
        alien.y += 15;
      }
    }
  }

  draw() {
    this.update();

    for (let alien of this.aliens) {
      alien.draw();
    }
  }
}

class Bunker {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.w = 75;
    this.h = 50;

    this.damage = 0;
  }

  draw() {
    fill(this.damage * 2 + 55, 50, 50);

    rect(this.x, this.y, this.w, this.h);
  }
}

class BunkerHill {
  constructor() {
    let level = height - 125;

    this.bunkers = [
      new Bunker(75, level),
      new Bunker(325, level),
      new Bunker(575, level),
    ];
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
    triangle(50, -10, 60, 0, 40, 0);

    pop();
  }
}

class Bomb {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.size = 16;
    this.vy = 5;
  }

  draw() {
    this.y += this.vy;

    fill("green");
    square(this.x, this.y, this.size);

    let left = mouseX - 45;
    let right = left + 100;

    let top = height - 35;
    let bottom = top + 25;

    if (
      this.x + this.size > left &&
      this.x < right &&
      this.y + this.size > top &&
      this.y < bottom
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
        bunker.damage += 2;

        bombs.splice(bombs.indexOf(this), 1);

        if (bunker.damage >= 100) {
          bunkerHill.bunkers.splice(bunkerHill.bunkers.indexOf(bunker), 1);
        }

        return;
      }
    }
  }
}

class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.vy = -10;
    this.size = 6;
  }

  draw() {
    this.y += this.vy;

    fill("yellow");
    rect(this.x, this.y, this.size, this.size * 2);

    if (this.y < 0) {
      bullets.splice(bullets.indexOf(this), 1);
      return;
    }

    for (let bunker of bunkerHill.bunkers) {
      if (
        this.x + this.size > bunker.x &&
        this.x < bunker.x + bunker.w &&
        this.y + this.size > bunker.y &&
        this.y < bunker.y + bunker.h
      ) {
        bunker.damage += 5;

        bullets.splice(bullets.indexOf(this), 1);

        if (bunker.damage >= 100) {
          bunkerHill.bunkers.splice(bunkerHill.bunkers.indexOf(bunker), 1);
        }

        return;
      }
    }

    for (let alien of army.aliens) {
      if (
        this.x + this.size > alien.x &&
        this.x < alien.x + alien.size &&
        this.y + this.size > alien.y &&
        this.y < alien.y + alien.size
      ) {
        score.points += 15;

        army.aliens.splice(army.aliens.indexOf(alien), 1);
        bullets.splice(bullets.indexOf(this), 1);

        return;
      }
    }
  }
}

let score;
let lives;
let mothership;
let army;
let bunkerHill;
let tank;
let bombs = [];
let bullets = [];
let gameOver = false;
let win = false;
let brainwash = false;
let startTime;

function setup() {
  createCanvas(800, 600);

  score = new Score();
  lives = new Lives();

  mothership = new Mothership();
  army = new Army();

  bunkerHill = new BunkerHill();
  tank = new Tank();

  startTime = millis();
}

function draw() {
  background("black");

  let timeSurvived = floor((millis() - startTime) / 1000);

  if (timeSurvived >= 45) {
    army.speed = 3;

    for (let alien of army.aliens) {
      alien.color = "red";
    }
  } else if (timeSurvived >= 30) {
    army.speed = 1.5;
  } else {
    army.speed = 1;
  }

  fill("white");
  textAlign(CENTER);

  textSize(15);
  text("Time: " + timeSurvived, width / 2, 30);

  if (lives.count <= 0) {
    gameOver = true;
  }

  if (army.aliens.length === 0) {
    win = true;
  }

  if (timeSurvived >= 48) {
    win = true;
    brainwash = true;
  }

  if (gameOver) {
    fill("red");

    textAlign(CENTER);

    textSize(30);
    text("THE ALIENS TOOK OVER SOUTH CAROLINA", width / 2, height / 2);

    textSize(24);
    text("Humanity has fallen", width / 2, height / 2 + 50);

    textSize(18);
    text("Refresh to Restart", width / 2, height / 2 + 100);

    return;
  }

  if (win) {
    textAlign(CENTER);

    if (brainwash) {
      background("black");

      fill("red");

      textSize(30);
      text("THE ALIENS NEVER LEFT", width / 2, height / 2 - 40);

      textSize(25);
      text("THIS WAS A TRICK", width / 2, height / 2);

      textSize(20);
      text("YOU ARE BEING REPROGRAMMED", width / 2, height / 2 + 40);

      textSize(18);
      text("Refresh (it won't help)", width / 2, height / 2 + 100);
    } else {
      fill("lime");

      textSize(38);
      text("THE ALIENS LEFT FOR FLORIDA", width / 2, height / 2);

      textSize(18);
      text("Refresh to Restart", width / 2, height / 2 + 80);
    }

    return;
  }

  score.draw();
  lives.draw();

  mothership.draw();
  army.draw();

  bunkerHill.draw();

  for (let bomb of bombs) {
    bomb.draw();
  }

  if (frameCount % 60 === 0) {
    let randomAlien = random(army.aliens);

    if (randomAlien) {
      bombs.push(new Bomb(randomAlien.x, randomAlien.y));

      if (timeSurvived >= 30) {
        bombs.push(new Bomb(randomAlien.x + 25, randomAlien.y));
      }
    }
  }

  for (let bullet of bullets) {
    bullet.draw();
  }

  tank.draw();
}

var mousePressed = function () {
  bullets.push(new Bullet(mouseX, height - 35));
};
