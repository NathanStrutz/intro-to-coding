{
  let card = new Object();
  card.rank = 2;
  card.suit = "Clubs";
  card.name = "2";
  card.color = "black";

  console.log(card);
}

{
  let card = {
    rank: 2,
    suit: "Clubs",
    name: "2",
    color: "black",
  };
  console.log(card);
}

{
  class Card {
    constructor() {
      this.rank = 2;
      this.suit = "Clubs";
      this.name = "2";
      this.color = "black";
    }
  }
  let card = new Card();
  console.log(card);
}
