///<reference path="lib/p5.global.d.ts" />

let tank;
let bullets = [];
let alienBullets = [];
let aliens = [];
let explosions = [];
let bunkers = [];
let mothership;

let direction = 1;
let score = 0;
let lives = 3;
let wave = 1;

function setup() {
  createCanvas(600, 400);
  player = new Player();
  mothership = new Mothership();
  spawnAliens();
  spawnBunkers();
}

function draw() {
  background(5);
  drawStars();

  fill(255);
  textSize(16);
  text("Score: " + nf(score, 4), 10, 20);
  text("Lives: " + lives, width - 80, 20);
  text("Wave: " + wave, width / 2 - 30, 20);

  player.update();
  player.show();

  mothership.update();
  mothership.show();

  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].update();
    bullets[i].show();

    if (bullets[i].offscreen()) bullets.splice(i, 1);
  }

  for (let i = alienBullets.length - 1; i >= 0; i--) {
    alienBullets[i].update();
    alienBullets[i].show();

    if (player.hit(alienBullets[i])) {
      explosions.push(new Explosion(player.x, player.y));
      alienBullets.splice(i, 1);
      lives--;
    } else if (alienBullets[i].offscreen()) {
      alienBullets.splice(i, 1);
    }
  }

  let hitEdge = false;
  for (let alien of aliens) {
    alien.x += (1 + wave * 0.2) * direction;

    if (alien.x > width - 40 || alien.x < 40) {
      hitEdge = true;
    }

    if (random(1) < 0.002 + wave * 0.0005) {
      alienBullets.push(new AlienBullet(alien.x, alien.y));
    }
  }

  if (hitEdge) {
    direction *= -1;
    for (let alien of aliens) alien.y += 20;
  }

  for (let i = aliens.length - 1; i >= 0; i--) {
    aliens[i].show();

    for (let j = bullets.length - 1; j >= 0; j--) {
      if (aliens[i].hits(bullets[j])) {
        aliens[i].health--;
        bullets.splice(j, 1);

        explosions.push(new Explosion(aliens[i].x, aliens[i].y));

        if (aliens[i].health <= 0) {
          aliens.splice(i, 1);
          score += 10 * wave;
        }
        break;
      }
    }
  }

  for (let i = bullets.length - 1; i >= 0; i--) {
    if (mothership.hits(bullets[i])) {
      explosions.push(new Explosion(mothership.x, mothership.y));
      score += 50 * wave;
      mothership.reset();
      bullets.splice(i, 1);
    }
  }

  for (let bunker of bunkers) {
    bunker.show();
  }
  for (let i = alienBullets.length - 1; i >= 0; i--) {
    for (let j = bunkers.length - 1; j >= 0; j--) {
      if (bunkers[j].hits(alienBullets[i])) {
        bunkers[j].health--;
        alienBullets.splice(i, 1);
        if (bunkers[j].health <= 0) {
          bunkers.splice(j, 1);
        }
        break;
      }
    }
  }
  for (let i = explosions.length - 1; i >= 0; i--) {
    explosions[i].update();
    explosions[i].show();
    if (explosions[i].done()) explosions.splice(i, 1);
  }

  if (aliens.length === 0) {
    wave++;
    spawnAliens();
  }

  if (lives <= 0) gameOver();
}

function keyPressed() {
  if (key === " ") {
    bullets.push(new Bullet(player.x, player.y - 15));
  }
}

function spawnAliens() {
  aliens = [];

  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 8; x++) {
      aliens.push(new Alien(80 + x * 55, 80 + y * 45, wave));
    }
  }
}

function spawnBunkers() {
  bunkers = [];
  bunkers.push(new Bunker(100, 300));
  bunkers.push(new Bunker(250, 300));
  bunkers.push(new Bunker(400, 300));
}

function drawStars() {
  fill(255);
  for (let i = 0; i < 60; i++) {
    ellipse(random(width), random(height), 2);
  }
}

class Player {
  constructor() {
    this.x = width / 2;
    this.y = height - 30;
  }

  update() {
    if (keyIsDown(LEFT_ARROW)) this.x -= 5;
    if (keyIsDown(RIGHT_ARROW)) this.x += 5;
    this.x = constrain(this.x, 30, width - 30);
  }

  show() {
    fill(255, 100, 50);
    rect(this.x - 20, this.y, 40, 12, 5);
    rect(this.x - 3, this.y - 15, 6, 15);
  }

  hit(bullet) {
    return (
      bullet.x > this.x - 20 &&
      bullet.x < this.x + 20 &&
      bullet.y > this.y &&
      bullet.y < this.y + 15
    );
  }
}

class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  update() {
    this.y -= 6;
  }

  show() {
    fill(0, 255, 200);
    rect(this.x - 2, this.y, 4, 10);
  }

  offscreen() {
    return this.y < 0;
  }
}

class AlienBullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  update() {
    this.y += 4;
  }

  show() {
    fill(255, 50, 50);
    rect(this.x - 2, this.y, 4, 10);
  }

  offscreen() {
    return this.y > height;
  }
}

class Alien {
  constructor(x, y, health) {
    this.x = x;
    this.y = y;
    this.health = health;
  }
  show() {
    push();
    translate(this.x, this.y);

    let c = map(this.health, 1, wave, 255, 100);
    fill(c, 200, 255);

    rect(-15, -10, 30, 20, 5);

    fill(0);
    ellipse(-6, -2, 4);
    ellipse(6, -2, 4);

    rect(-12, 10, 6, 6);
    rect(6, 10, 6, 6);

    pop();
  }

  hits(b) {
    return (
      b.x > this.x - 15 &&
      b.x < this.x + 15 &&
      b.y > this.y - 10 &&
      b.y < this.y + 10
    );
  }
}

class Mothership {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = -100;
    this.y = 40;
    this.speed = random(2, 4);
  }

  update() {
    this.x += this.speed;
    if (this.x > width + 100) this.reset();
  }

  show() {
    fill(0, 255, 180);
    rect(this.x - 40, this.y, 80, 20, 10);
  }

  hits(b) {
    return (
      b.x > this.x - 40 &&
      b.x < this.x + 40 &&
      b.y > this.y &&
      b.y < this.y + 20
    );
  }
}

class Bunker {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.health = 20;
  }

  show() {
    let c = map(this.health, 0, 5, 80, 255);
    fill(255, c, 0);

    rect(this.x, this.y, 100, 40, 8);

    fill(0, 0, 0, 50);
    for (let i = 0; i < 5 - this.health; i++) {
      rect(this.x + random(10, 80), this.y + random(5, 35), 5, 5);
    }
  }
  hits(b) {
    return (
      b.x > this.x && b.x < this.x + 100 && b.y > this.y && b.y < this.y + 40
    );
  }
}

class Explosion {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 5;
  }

  update() {
    this.r += 2;
  }

  show() {
    noFill();
    stroke(255, 150, 0);
    ellipse(this.x, this.y, this.r);
    stroke(255, 50, 0);
    ellipse(this.x, this.y, this.r / 2);
    noStroke();
  }

  done() {
    return this.r > 30;
  }
}

function gameOver() {
  fill(255, 50, 50);
  textSize(40);
  textAlign(CENTER);
  text("you died lol :P", width / 2, height / 2);
  noLoop();
}
