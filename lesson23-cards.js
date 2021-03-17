let hands = [];

var setup = function () {
  createCanvas(1000, 800);

  let dealer = new Dealer();
  hands.push(dealer.getHand(5));
  hands.push(dealer.getHand(5));
  hands.push(dealer.getHand(5));
};

var draw = function () {
  background("forestgreen");

  for (let handIndex = 0; handIndex < hands.length; handIndex++) {
    const hand = hands[handIndex];
    for (let cardIndex = 0; cardIndex < hand.length; cardIndex++) {
      const card = hand[cardIndex];
      drawCard(card);
    }
  }
};

function drawCard(card) {
  translate(card.x || 20, card.y || 20);
  rect(150, 200);
  fill(255);
}
