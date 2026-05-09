const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 900;
canvas.height = 600;

document.body.appendChild(canvas);

document.body.style.margin = "0";
document.body.style.background = "black";

let keys = {};

document.addEventListener("keydown", e => {
  keys[e.key] = true;

  if (e.code === "Space") {
    bullets.push({
      x: ship.x + ship.w / 2 - 2,
      y: ship.y,
      w: 4,
      h: 12
    });
  }
});

document.addEventListener("keyup", e => {
  keys[e.key] = false;
});

let ship = {
  x: 420,
  y: 540,
  w: 60,
  h: 25,
  speed: 6
};

let bullets = [];

let aliens = [];

for (let row = 0; row < 4; row++) {

  for (let col = 0; col < 9; col++) {

    aliens.push({
      x: 80 + col * 80,
      y: 60 + row * 60,
      w: 40,
      h: 40,
      alive: true
    });

  }

}

let alienDir = 1;

let score = 0;

let ended = false;

function touching(a, b) {

  return (
    a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.y + a.h > b.y
  );

}

function drawShip() {

  ctx.fillStyle = "lime";

  ctx.fillRect(ship.x, ship.y, ship.w, ship.h);

  ctx.fillRect(ship.x + 22, ship.y - 10, 16, 10);

}

function drawBullets() {

  ctx.fillStyle = "white";

  bullets.forEach((b, i) => {

    b.y -= 9;

    ctx.fillRect(b.x, b.y, b.w, b.h);

    if (b.y < -20) {
      bullets.splice(i, 1);
    }

  });

}

function drawAliens() {

  let edge = false;

  aliens.forEach(a => {

    if (!a.alive) return;

    a.x += alienDir;

    ctx.fillStyle = "red";

    ctx.fillRect(a.x, a.y, a.w, a.h);

    ctx.fillStyle = "white";

    ctx.fillRect(a.x + 8, a.y + 10, 5, 5);
    ctx.fillRect(a.x + 27, a.y + 10, 5, 5);

    ctx.fillRect(a.x + 12, a.y + 26, 15, 4);

    if (a.x <= 0 || a.x + a.w >= canvas.width) {
      edge = true;
    }

    if (a.y + a.h >= ship.y) {
      ended = true;
    }

  });

  if (edge) {

    alienDir *= -1;

    aliens.forEach(a => {
      a.y += 20;
    });

  }

}

function update() {

  if (keys["ArrowLeft"]) {
    ship.x -= ship.speed;
  }

  if (keys["ArrowRight"]) {
    ship.x += ship.speed;
  }

  if (ship.x < 0) ship.x = 0;

  if (ship.x + ship.w > canvas.width) {
    ship.x = canvas.width - ship.w;
  }

  bullets.forEach((b, bi) => {

    aliens.forEach(a => {

      if (a.alive && touching(b, a)) {

        a.alive = false;

        bullets.splice(bi, 1);

        score += 100;

      }

    });

  });

  let left = aliens.filter(a => a.alive);

  if (left.length === 0) {
    ended = "win";
  }

}

function drawScore() {

  ctx.fillStyle = "white";

  ctx.font = "25px Arial";

  ctx.fillText("Score: " + score, 20, 35);

}

function gameOverScreen() {

  ctx.fillStyle = "white";

  ctx.textAlign = "center";

  ctx.font = "60px Arial";

  if (ended === "win") {

    ctx.fillText("YOU WIN", 450, 300);

  } else {

    ctx.fillText("GAME OVER", 450, 300);

  }

}

function loop() {

  ctx.fillStyle = "black";

  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (!ended) {

    update();

    drawShip();

    drawBullets();

    drawAliens();

    drawScore();

    requestAnimationFrame(loop);

  } else {

    gameOverScreen();

  }

}

loop();