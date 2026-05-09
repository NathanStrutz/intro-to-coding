class Score {class Score {
  constructor() {
    this.points = 0;
  }

  draw() {
    textSize(15);
    fill("white");
    textAlign(RIGHT);
    text(this.points.toString().padStart(5, "0"), 50, 30);

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

let bombs = [];
let bullets = [];

class Alien {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 50;
    this.alive = true;
  }

  draw() {
    if (!this.alive) return;

    fill("white");
    square(this.x, this.y, this.size);

    // Random bomb drop
    if (round(random(1, 1000)) === 5) {
      bombs.push(new Bomb(this.x + 20, this.y + 40));
    }
  }
}

class Bunker {
  draw() {}

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class BunkerHill {
  constructor() {
    this.x = this.x;
    this.y = this.y;
  }

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

    triangle(50, -10, 60, 0, 40, 0);

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

    // Tank hit
    if (
      this.x + this.size > tankLeft &&
      this.x < tankRight &&
      this.y + this.size > tankTop &&
      this.y < tankBottom
    ) {
      lives.count--;

      bombs.splice(bombs.indexOf(this), 1);
    }

    // Remove off screen bombs
    if (this.y > height) {
      bombs.splice(bombs.indexOf(this), 1);
    }
  }
}

class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.vy = -10;
    this.size = 8;
  }

  draw() {
    this.y += this.vy;

    fill("yellow");
    rect(this.x, this.y, 4, this.size);

    // Bullet hits alien
    for (let alien of aliens) {
      if (
        alien.alive &&
        this.x > alien.x &&
        this.x < alien.x + alien.size &&
        this.y > alien.y &&
        this.y < alien.y + alien.size
      ) {
        alien.alive = false;

        score.points += 100;

        bullets.splice(bullets.indexOf(this), 1);
      }
    }

    // Remove bullet if off screen
    if (this.y < 0) {
      bullets.splice(bullets.indexOf(this), 1);
    }
  }
}

// Main variables
let score;
let lives;
let mothership;
let bunkerHill;
let tank;

let aliens = [];

var setup = function () {
  createCanvas(800, 600);

  score = new Score();
  lives = new Lives();
  mothership = new Mothership();
  bunkerHill = new BunkerHill();
  tank = new Tank();

  // Create alien rows
  for (let x = 0; x < 8; x++) {
    aliens.push(new Alien(75 + 75 * x, 150));
  }

  for (let x = 0; x < 9; x++) {
    aliens.push(new Alien(45 + 75 * x, 250));
  }

  for (let x = 0; x < 8; x++) {
    aliens.push(new Alien(65 + 75 * x, 350));
  }
};

var draw = function () {
  background("black");

  score.draw();
  lives.draw();
  mothership.draw();

  // Draw aliens
  for (let alien of aliens) {
    alien.draw();
  }

  bunkerHill.draw();
  tank.draw();

  // Draw bombs
  for (let bomb of bombs) {
    bomb.draw();
  }

  // Draw bullets
  for (let bullet of bullets) {
    bullet.draw();
  }

  // Lose screen
  if (lives.count === 0) {
    textSize(100);

    textAlign(CENTER);

    fill("white");
    text("YOU LOSE!", width / 2, height / 2);

    textSize(40);

    text(score.points, width / 2, height / 2 + 75);

    noLoop();
  }
};

// Shoot bullets
function mousePressed() {
  bullets.push(new Bullet(mouseX, height - 45));
}
class Score { // <!--- NATHAN-WAS-HERE - I added this line
  constructor() {
    this.points = 0;
  }

  draw() {
    textSize(15);
    fill("white");
    textAlign(RIGHT);
    text(this.points.toString().padStart(5, "0"), 50, 30);

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

let bombs = [];
let bullets = [];

class Alien {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 50;
    this.alive = true;
  }

  draw() {
    if (!this.alive) return;

    fill("white");
    square(this.x, this.y, this.size);

    // Random bomb drop
    if (round(random(1, 1000)) === 5) {
      bombs.push(new Bomb(this.x + 20, this.y + 40));
    }
  }
}

class Bunker {
  draw() {}

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class BunkerHill {
  constructor() {
    this.x = this.x;
    this.y = this.y;
  }

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

    triangle(50, -10, 60, 0, 40, 0);

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

    // Tank hit
    if (
      this.x + this.size > tankLeft &&
      this.x < tankRight &&
      this.y + this.size > tankTop &&
      this.y < tankBottom
    ) {
      lives.count--;

      bombs.splice(bombs.indexOf(this), 1);
    }

    // Remove off screen bombs
    if (this.y > height) {
      bombs.splice(bombs.indexOf(this), 1);
    }
  }
}

class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.vy = -10;
    this.size = 8;
  }

  draw() {
    this.y += this.vy;

    fill("yellow");
    rect(this.x, this.y, 4, this.size);

    // Bullet hits alien
    for (let alien of aliens) {
      if (
        alien.alive &&
        this.x > alien.x &&
        this.x < alien.x + alien.size &&
        this.y > alien.y &&
        this.y < alien.y + alien.size
      ) {
        alien.alive = false;

        score.points += 100;

        bullets.splice(bullets.indexOf(this), 1);
      }
    }

    // Remove bullet if off screen
    if (this.y < 0) {
      bullets.splice(bullets.indexOf(this), 1);
    }
  }
}

// Main variables
let score;
let lives;
let mothership;
let bunkerHill;
let tank;

let aliens = [];

var setup = function () {
  createCanvas(800, 600);

  score = new Score();
  lives = new Lives();
  mothership = new Mothership();
  bunkerHill = new BunkerHill();
  tank = new Tank();

  // Create alien rows
  for (let x = 0; x < 8; x++) {
    aliens.push(new Alien(75 + 75 * x, 150));
  }

  for (let x = 0; x < 9; x++) {
    aliens.push(new Alien(45 + 75 * x, 250));
  }

  for (let x = 0; x < 8; x++) {
    aliens.push(new Alien(65 + 75 * x, 350));
  }
};

var draw = function () {
  background("black");

  score.draw();
  lives.draw();
  mothership.draw();

  // Draw aliens
  for (let alien of aliens) {
    alien.draw();
  }

  bunkerHill.draw();
  tank.draw();

  // Draw bombs
  for (let bomb of bombs) {
    bomb.draw();
  }

  // Draw bullets
  for (let bullet of bullets) {
    bullet.draw();
  }

  // Lose screen
  if (lives.count === 0) {
    textSize(100);

    textAlign(CENTER);

    fill("white");
    text("YOU LOSE!", width / 2, height / 2);

    textSize(40);

    text(score.points, width / 2, height / 2 + 75);

    noLoop();
  }
};

// Shoot bullets
function mousePressed() {
  bullets.push(new Bullet(mouseX, height - 45));
}
class Score {
  constructor() {
    this.points = 0;
  }

  draw() {
    textSize(15);
    fill("white");
    textAlign(RIGHT);
    text(this.points.toString().padStart(5, "0"), 50, 30);

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

let bombs = [];
let bullets = [];

class Alien {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 50;
    this.alive = true;
  }

  draw() {
    if (!this.alive) return;

    fill("white");
    square(this.x, this.y, this.size);

    // Random bomb drop
    if (round(random(1, 1000)) === 5) {
      bombs.push(new Bomb(this.x + 20, this.y + 40));
    }
  }
}

class Bunker {
  draw() {}

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class BunkerHill {
  constructor() {
    this.x = this.x;
    this.y = this.y;
  }

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

    triangle(50, -10, 60, 0, 40, 0);

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

    // Tank hit
    if (
      this.x + this.size > tankLeft &&
      this.x < tankRight &&
      this.y + this.size > tankTop &&
      this.y < tankBottom
    ) {
      lives.count--;

      bombs.splice(bombs.indexOf(this), 1);
    }

    // Remove off screen bombs
    if (this.y > height) {
      bombs.splice(bombs.indexOf(this), 1);
    }
  }
}

class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.vy = -10;
    this.size = 8;
  }

  draw() {
    this.y += this.vy;

    fill("yellow");
    rect(this.x, this.y, 4, this.size);

    // Bullet hits alien
    for (let alien of aliens) {
      if (
        alien.alive &&
        this.x > alien.x &&
        this.x < alien.x + alien.size &&
        this.y > alien.y &&
        this.y < alien.y + alien.size
      ) {
        alien.alive = false;

        score.points += 100;

        bullets.splice(bullets.indexOf(this), 1);
      }
    }

    // Remove bullet if off screen
    if (this.y < 0) {
      bullets.splice(bullets.indexOf(this), 1);
    }
  }
}

// Main variables
let score;
let lives;
let mothership;
let bunkerHill;
let tank;

let aliens = [];

var setup = function () {
  createCanvas(800, 600);

  score = new Score();
  lives = new Lives();
  mothership = new Mothership();
  bunkerHill = new BunkerHill();
  tank = new Tank();

  // Create alien rows
  for (let x = 0; x < 8; x++) {
    aliens.push(new Alien(75 + 75 * x, 150));
  }

  for (let x = 0; x < 9; x++) {
    aliens.push(new Alien(45 + 75 * x, 250));
  }

  for (let x = 0; x < 8; x++) {
    aliens.push(new Alien(65 + 75 * x, 350));
  }
};

var draw = function () {
  background("black");

  score.draw();
  lives.draw();
  mothership.draw();

  // Draw aliens
  for (let alien of aliens) {
    alien.draw();
  }

  bunkerHill.draw();
  tank.draw();

  // Draw bombs
  for (let bomb of bombs) {
    bomb.draw();
  }

  // Draw bullets
  for (let bullet of bullets) {
    bullet.draw();
  }

  // Lose screen
  if (lives.count === 0) {
    textSize(100);

    textAlign(CENTER);

    fill("white");
    text("YOU LOSE!", width / 2, height / 2);

    textSize(40);

    text(score.points, width / 2, height / 2 + 75);

    noLoop();
  }
};

// Shoot bullets
function mousePressed() {
  bullets.push(new Bullet(mouseX, height - 45));
}
