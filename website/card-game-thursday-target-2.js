class VisualCard {
  constructor(card) {
    this.card = card;
  }

  x = 20;
  y = 20;
  isDragging = false;
  mouseOffsetX = 0;
  mouseOffsetY = 0;

  getIcon() {
    return {
      Hearts: "♥",
      Diamonds: "♦",
      Spades: "♠",
      Clubs: "♣",
    }[this.card.suit];
  }
  getCornerName() {
    switch (this.card.name) {
      case "Ace":
        return "A";
      case "King":
        return "K";
      case "Queen":
        return "Q";
      case "Jack":
        return "J";
      default:
        return this.card.name;
    }
  }

  maybeDragging() {
    if (mouseX > this.x && mouseX < this.x + 150 && mouseY > this.y && mouseY < this.y + 200) {
      this.isDragging = true;
      this.mouseOffsetX = this.x - mouseX;
      this.mouseOffsetY = this.y - mouseY;
    }
  }
  notDragging() {
    this.isDragging = false;
  }
  move() {
    if (this.isDragging) {
      this.x = mouseX + this.mouseOffsetX;
      this.y = mouseY + this.mouseOffsetY;
    }
  }

  draw() {
    this.move();
    push();
    {
      translate(this.x, this.y);

      fill("white");
      rect(0, 0, 150, 200, 7);

      fill(this.card.color);
      textSize(100);
      textAlign(CENTER);
      text(this.getIcon(), 75, 130);

      // The corners
      textSize(20);
      textLeading(20);
      textAlign(CENTER);

      // Top left corner
      text(this.getCornerName() + "\n" + this.getIcon(), 16, 24);

      // Rotation for the bottom-right corner
      // spin it around and have it mirror the top-left corner
      push();
      {
        translate(150, 200);
        rotate(PI * 3);
        text(this.getCornerName() + "\n" + this.getIcon(), 16, 24);
      }
      pop();
    }
    pop();
  }
}

// Get a card dealer:
let dealer = new Dealer();

let visCard1 = new VisualCard(dealer.getCard());

let visCard2 = new VisualCard(dealer.getCard());
visCard2.x = 200;

var setup = function () {
  createCanvas(1000, 800);
};
var draw = function () {
  background("forestgreen");
  visCard1.draw();
  visCard2.draw();
};

window.mousePressed = function () {
  visCard1.maybeDragging();
  visCard2.maybeDragging();
};
window.mouseReleased = function () {
  visCard1.notDragging();
  visCard2.notDragging();
};
