// 58/158 = 37% of lines written by chatGPT

let game;
let paddle;
let ball;
let targets = [];

class Game {
    constructor() {
        this.lives = 5;
        this.score = 0;
        this.targetRows = 10;
        this.targetCols = 4;
    }

    draw() {
        fill("white");
        textSize(25);
        text(`Score: ${this.score}`, 30, height - 15);
        text(`${this.lives} :Lives`, 30, height - 45);
    }
}

class Paddle {
    constructor() {
        this.x = width / 2; // Start paddle at center
        this.y = height - 100;
        this.width = 100;
        this.height = 20;
    }

    draw() {
        fill("blue");
        this.x = mouseX; // Allows paddle movement
        rect(this.x, this.y, this.width, this.height);
    }
}

class Ball {
    constructor() {
        this.x = random(width);
        this.y = height - 100;
        this.vx = 5;
        this.vy = -5; // Make ball move upwards
        this.size = 20;
    }

    draw() {
        fill("green");
        rect(this.x, this.y, this.size, this.size);
        this.x += this.vx;
        this.y += this.vy;
        this.bounceOffWalls();
        this.bounceOffTargets();
        this.bounceOffPaddle();
    }

    bounceOffTargets() {
        for (let i = targets.length - 1; i >= 0; i--) {
            let target = targets[i];
            if (
                this.x + this.size > target.x &&
                this.x < target.x + target.width &&
                this.y + this.size > target.y &&
                this.y < target.y + target.height
            ) {
                this.vy = -this.vy;
                targets.splice(i, 1);
                game.score += 25;
                this.vx *= 1.1;
                this.vy *= 1.1;
            }
        }
    }

    bounceOffWalls() {
        if (this.x < 0 || this.x + this.size > width) {
            this.vx = -this.vx;
        }
        if (this.y < 0) {
            this.vy = -this.vy;
        }
        if (this.y + this.size > height) {
            game.lives--;
            ball = new Ball();
        }
    }

    bounceOffPaddle() {
        if (
            this.x + this.size > paddle.x &&
            this.x < paddle.x + paddle.width &&
            this.y + this.size > paddle.y &&
            this.y < paddle.y + paddle.height
        ) {
            this.vy = -Math.abs(this.vy);
        }
    }
}

class Target {
    constructor(x, y) {
        this.width = width / game.targetCols - 3;
        this.height = 35;
        this.x = x * this.width;
        this.y = y * this.height + 3;
    }

    draw() {
        fill("orange");
        rect(this.x, this.y, this.width, this.height);
    }
}

var setup = function () {
    createCanvas(windowWidth, windowHeight);
    game = new Game();
    paddle = new Paddle();
    ball = new Ball();

    for (let x = 0; x < game.targetRows; x++) {
        for (let y = 0; y <= game.targetCols; y++) {
            targets.push(new Target(x, y));
        }
    }
};

var draw = function () {
    background(66);

    if (game.lives <= 0) {
        background("red");
        textSize(50);
        textAlign(CENTER);
        fill("white");
        text("Game Over", width / 2, height / 2);
        return; // Stops drawing if lives are gone
    }

    game.draw();
    ball.draw();
    paddle.draw();

    for (let target of targets) {
        target.draw();
    }

    fill("white");
    textSize(50);
    textAlign(LEFT);
    text(`${game.lives} :Lives`, width - 150, height - 50);

    if (targets.length === 0) {
        background("purple");
        textSize(50);
        textAlign(CENTER);
        fill("orange");
        text("You Won, Congratulations!", width / 2, height / 2);
    }
};
