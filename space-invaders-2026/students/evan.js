///<reference path="lib/p5.global.d.ts" />

let bullets = [];
let lastScoreTime = 0;

let gameOver = false;
let gameOverReason = "";

// ================= EASY SETTINGS =================
const STARTING_LIVES = 3;

const BUNKER_HEALTH = 300;

const WAVE_3_HP = 3;

const MOTHERSHIP_HP = 100;

const MOTHERSHIP_BOMB_SPEED = 2;
const MOTHERSHIP_ATTACK_RATE = 40;

// TANK SETTINGS
const TANK_SCALE = 0.5;

// ================= MOUSE =================
function mousePressed() {
  if (!gameOver) {
    bullets.push(new Bullet(mouseX, height - 45));
  }
}

// ================= HIT DETECTION =================
function hit(a, b, aw = 10, ah = 10, bw = 80, bh = 40) {
  return a.x < b.x + bw && a.x + aw > b.x && a.y < b.y + bh && a.y + ah > b.y;
}

// ================= RESET =================
function keyPressed() {
  if (gameOver && key === " ") {
    resetGame();
  }
}

// ================= SCORE =================
class Score {
  constructor() {
    this.value = 0;
  }

  draw() {
    fill("white");
    textSize(15);

    textAlign(RIGHT);
    text(this.value, 50, 30);

    textAlign(LEFT);
    text("Score", 60, 30);
  }
}

// ================= LIVES =================
class Lives {
  constructor() {
    this.value = STARTING_LIVES;

    this.lastHitTime = 0;
    this.cooldown = 1000;
  }

  canBeHit() {
    return millis() - this.lastHitTime > this.cooldown;
  }

  hit() {
    if (this.canBeHit()) {
      this.value--;
      this.lastHitTime = millis();

      if (this.value <= 0) {
        gameOver = true;
        gameOverReason = "You ran out of lives!";
      }
    }
  }

  draw() {
    fill("white");

    textAlign(RIGHT);
    text("Lives", width - 40, 30);

    textAlign(LEFT);
    text(this.value, width - 30, 30);
  }
}

// ================= MOTHERSHIP BOMB =================
class MothershipBomb {
  constructor(x, y, dx) {
    this.x = x;
    this.y = y;

    this.dx = dx;
    this.dy = MOTHERSHIP_BOMB_SPEED;

    this.size = 8;
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
  }

  draw() {
    fill("#890909");
    ellipse(this.x, this.y, this.size);
  }
}

// ================= MOTHERSHIP =================
class Mothership {
  constructor(x, y, size = 6, hp = MOTHERSHIP_HP, color = "#890909") {
    this.x = x;
    this.y = y;

    this.size = size;
    this.hp = hp;

    this.color = color;

    this.speed = 4;
    this.dir = 1;

    this.bombs = [];

    this.attackMode = false;
  }

  startFinalAttack() {
    this.attackMode = true;
  }

  update() {
    this.x += this.speed * this.dir;

    if (this.x < 0 || this.x > width - 80) {
      this.dir *= -1;
    }

    this.y += sin(frameCount * 0.1) * 0.5;

    // FINAL ATTACK
    if (this.attackMode) {
      if (frameCount % MOTHERSHIP_ATTACK_RATE === 0) {
        this.bombs.push(new MothershipBomb(this.x + 40, this.y + 20, -3));
        this.bombs.push(new MothershipBomb(this.x + 40, this.y + 20, -1.5));
        this.bombs.push(new MothershipBomb(this.x + 40, this.y + 20, 0));
        this.bombs.push(new MothershipBomb(this.x + 40, this.y + 20, 1.5));
        this.bombs.push(new MothershipBomb(this.x + 40, this.y + 20, 3));
      }
    }

    // UPDATE BOMBS
    for (let i = this.bombs.length - 1; i >= 0; i--) {
      let bomb = this.bombs[i];

      bomb.update();
      bomb.draw();

      // PLAYER HIT
      if (
        hit(
          bomb,
          {
            x: mouseX - 25,
            y: height - 20,
          },
          8,
          8,
          50,
          12,
        )
      ) {
        this.bombs.splice(i, 1);
        lives.hit();
        continue;
      }

      // REMOVE OFFSCREEN
      if (bomb.y > height || bomb.x < 0 || bomb.x > width) {
        this.bombs.splice(i, 1);
      }
    }
  }

  hit() {
    this.hp--;

    score.value += 50;

    if (this.hp <= 0) {
      score.value += 1000;

      gameOver = true;
      gameOverReason = "You destroyed the mothership!";

      return true;
    }

    return false;
  }

  draw() {
    fill(this.color);
    noStroke();

    const sprite = [
      [0, 1, 0, 0, 0, 0, 1, 0],
      [0, 0, 1, 0, 0, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 0, 1, 1, 0, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 0, 0, 1, 1, 0],
      [0, 1, 0, 1, 1, 0, 1, 0],
    ];

    for (let r = 0; r < sprite.length; r++) {
      for (let c = 0; c < sprite[r].length; c++) {
        if (sprite[r][c]) {
          rect(
            this.x + c * this.size,
            this.y + r * this.size,
            this.size,
            this.size,
          );
        }
      }
    }

    // HP
    fill("white");

    textAlign(CENTER);
    textSize(14);

    text(this.hp, this.x + 25, this.y - 12);
  }
}

// ================= ALIEN =================
class Alien {
  constructor(x, y, size = 5, hp = 1, color = "#939393") {
    this.x = x;
    this.y = y;

    this.size = size;
    this.hp = hp;

    this.color = color;
  }

  draw() {
    fill(this.color);
    noStroke();

    const sprite = [
      [0, 1, 0, 0, 0, 0, 1, 0],
      [0, 0, 1, 0, 0, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 0, 1, 1, 0, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 0, 0, 1, 1, 0],
      [0, 1, 0, 1, 1, 0, 1, 0],
    ];

    for (let r = 0; r < sprite.length; r++) {
      for (let c = 0; c < sprite[r].length; c++) {
        if (sprite[r][c]) {
          rect(
            this.x + c * this.size,
            this.y + r * this.size,
            this.size,
            this.size,
          );
        }
      }
    }
  }
}

// ================= ARMY =================
class Army {
  constructor() {
    this.aliens = [];
    this.bombs = [];

    this.dir = 1;

    this.baseSpeed = 1;
    this.speed = 1;

    this.drop = 20;

    this.baseBombRate = 0.01;

    this.wave = 1;

    this.finalBattle = false;

    this.spawnWave1();
  }

  spawnWave1() {
    this.aliens = [];

    for (let x = 0; x < 8; x++) {
      this.aliens.push(new Alien(75 + 75 * x, 150));
    }

    for (let x = 0; x < 9; x++) {
      this.aliens.push(new Alien(45 + 75 * x, 250));
    }

    for (let x = 0; x < 8; x++) {
      this.aliens.push(new Alien(65 + 75 * x, 350));
    }

    this.totalAliens = this.aliens.length;
  }

  spawnWave2() {
    this.aliens = [];

    for (let x = 0; x < 8; x++) {
      this.aliens.push(new Alien(75 + 75 * x, 150, 5, 2, "#073560"));
    }

    for (let x = 0; x < 9; x++) {
      this.aliens.push(new Alien(45 + 75 * x, 250, 5, 2, "#073560"));
    }

    for (let x = 0; x < 8; x++) {
      this.aliens.push(new Alien(65 + 75 * x, 350, 5, 2, "#073560"));
    }

    this.totalAliens = this.aliens.length;
  }

  spawnWave3() {
    this.aliens = [];

    for (let x = 0; x < 8; x++) {
      this.aliens.push(new Alien(75 + 75 * x, 150, 5, WAVE_3_HP, "#640964"));
    }

    for (let x = 0; x < 9; x++) {
      this.aliens.push(new Alien(45 + 75 * x, 250, 5, WAVE_3_HP, "#640964"));
    }

    for (let x = 0; x < 8; x++) {
      this.aliens.push(new Alien(65 + 75 * x, 350, 5, WAVE_3_HP, "#640964"));
    }

    this.totalAliens = this.aliens.length;

    this.baseSpeed = 1.5;
    this.baseBombRate = 0.02;
  }

  startFinalBattle() {
    this.finalBattle = true;

    // REMOVE BUNKERS
    bunkerHill.bunkers = [];

    // ENABLE BOSS ATTACK
    mothership.startFinalAttack();
  }

  draw() {
    // WAVE SWITCHING
    if (this.aliens.length === 0 && !this.finalBattle) {
      this.bombs = [];

      if (this.wave === 1) {
        this.wave = 2;
        this.spawnWave2();
      } else if (this.wave === 2) {
        this.wave = 3;
        this.spawnWave3();
      } else {
        this.startFinalBattle();
      }
    }

    // FINAL BATTLE
    if (this.finalBattle) {
      fill("red");

      textAlign(CENTER);
      textSize(24);

      // KEEP BULLETS ACTIVE DURING BOSS FIGHT
      updateBullets();

      return;
    }

    let aliveRatio = this.aliens.length / this.totalAliens;

    this.speed = this.baseSpeed + (1 - aliveRatio) * 3;

    let bombRate = this.baseBombRate + (1 - aliveRatio) * 0.05;

    let hitEdge = false;

    for (let alien of this.aliens) {
      alien.x += this.dir * this.speed;

      if (alien.x < 0 || alien.x > width - 40) {
        hitEdge = true;
      }

      if (alien.y >= height - 120) {
        gameOver = true;
        gameOverReason = "Aliens reached the base!";
      }
    }

    if (hitEdge) {
      this.dir *= -1;

      for (let alien of this.aliens) {
        alien.y += this.drop;
      }
    }

    for (let alien of this.aliens) {
      alien.draw();
    }

    // ALIEN SHOOTING
    if (random(1) < bombRate && this.aliens.length > 0) {
      let shooter = random(this.aliens);

      this.bombs.push(new Bomb(shooter.x + 20, shooter.y + 20));
    }

    // UPDATE BOMBS
    for (let i = this.bombs.length - 1; i >= 0; i--) {
      let bomb = this.bombs[i];

      bomb.update();
      bomb.draw();

      let removed = false;

      // BUNKER HIT
      for (let j = bunkerHill.bunkers.length - 1; j >= 0; j--) {
        let bunker = bunkerHill.bunkers[j];

        if (hit(bomb, bunker, 4, 10, bunker.w, bunker.h)) {
          bunker.takeDamage(20);

          this.bombs.splice(i, 1);

          removed = true;

          if (bunker.isDestroyed()) {
            bunkerHill.bunkers.splice(j, 1);
          }

          break;
        }
      }

      if (removed) continue;

      // PLAYER HIT
      if (
        hit(
          bomb,
          {
            x: mouseX - 25,
            y: height - 20,
          },
          4,
          10,
          50,
          12,
        )
      ) {
        this.bombs.splice(i, 1);

        lives.hit();

        continue;
      }

      if (bomb.y > height) {
        this.bombs.splice(i, 1);
      }
    }

    // BULLETS
    updateBullets();
  }
}

// ================= BULLET LOGIC =================
function updateBullets() {
  for (let i = bullets.length - 1; i >= 0; i--) {
    let bullet = bullets[i];

    bullet.update();
    bullet.draw();

    let hitSomething = false;

    // ALIEN HIT
    for (let j = army.aliens.length - 1; j >= 0; j--) {
      let alien = army.aliens[j];

      if (hit(bullet, alien, 5, 10, 40, 40)) {
        alien.hp--;

        if (alien.hp <= 0) {
          army.aliens.splice(j, 1);

          score.value += 20;
        }

        hitSomething = true;

        break;
      }
    }

    // MOTHERSHIP HIT
    if (mothership && hit(bullet, mothership, 5, 10, 80, 40)) {
      if (mothership.hit()) {
        mothership = null;
      }

      hitSomething = true;
    }

    if (hitSomething || bullet.y < 0) {
      bullets.splice(i, 1);
    }
  }
}

// ================= BUNKER =================
class Bunker {
  constructor(x, y, maxHealth = 100) {
    this.x = x;
    this.y = y;

    this.w = 125;
    this.h = 50;

    this.maxHealth = maxHealth;

    this.damage = 0;
  }

  takeDamage(amount) {
    this.damage += amount;
  }

  isDestroyed() {
    return this.damage >= this.maxHealth;
  }

  draw() {
    let healthRatio = 1 - this.damage / this.maxHealth;

    fill(55 + (1 - healthRatio) * 200, 50, 50);

    rect(this.x, this.y, this.w, this.h);
  }
}

// ================= BUNKER HILL =================
class BunkerHill {
  constructor() {
    this.bunkers = [
      new Bunker(75, height - 125, BUNKER_HEALTH),
      new Bunker(325, height - 125, BUNKER_HEALTH),
      new Bunker(575, height - 125, BUNKER_HEALTH),
    ];
  }

  draw() {
    for (let bunker of this.bunkers) {
      bunker.draw();
    }
  }
}

// ================= TANK =================
class Tank {
  draw() {
    push();

    translate(mouseX - 25, height - 20);

    scale(TANK_SCALE);

    fill("#424442");

    rect(0, 0, 100, 25);

    triangle(50, -10, 60, 0, 40, 0);

    pop();
  }
}

// ================= BOMB =================
class Bomb {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.speed = 4;
  }

  update() {
    this.y += this.speed;
  }

  draw() {
    fill("#890909");

    rect(this.x, this.y, 4, 10);
  }
}

// ================= BULLET =================
class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.speed = 7;
  }

  update() {
    this.y -= this.speed;
  }

  draw() {
    fill("white");

    rect(this.x, this.y, 4, 10);
  }
}

// ================= GLOBALS =================
let score;
let lives;
let mothership;
let army;
let bunkerHill;
let tank;

// ================= SETUP =================
function setup() {
  createCanvas(800, 600);

  bunkerHill = new BunkerHill();

  score = new Score();
  lives = new Lives();

  army = new Army();

  tank = new Tank();

  mothership = new Mothership(200, 40);
}

// ================= DRAW =================
function draw() {
  background("black");

  if (gameOver) {
    drawGameOver();
    return;
  }

  // PASSIVE SCORE
  if (millis() - lastScoreTime > 1000) {
    score.value += 10;
    lastScoreTime = millis();
  }

  if (mothership) {
    mothership.update();
    mothership.draw();
  }

  score.draw();
  lives.draw();

  army.draw();

  bunkerHill.draw();

  tank.draw();
}

// ================= GAME OVER =================
function drawGameOver() {
  background(0);

  fill("red");

  textAlign(CENTER);
  textSize(50);

  text("GAME OVER", width / 2, height / 2 - 50);

  fill("white");

  textSize(20);

  text(gameOverReason, width / 2, height / 2);

  text("Press SPACE to restart", width / 2, height / 2 + 50);

  textSize(15);

  textAlign(RIGHT);
  text(score.value, 50, 30);

  textAlign(LEFT);
  text("Score", 60, 30);
}

// ================= RESET =================
function resetGame() {
  gameOver = false;
  gameOverReason = "";

  bullets = [];

  score.value = 0;

  lives.value = STARTING_LIVES;

  bunkerHill = new BunkerHill();

  army = new Army();

  mothership = new Mothership(200, 40);
}
