class Deck {
  constructor() {
    this.cards = this.buildDeck();
  }

  createCard(suit, rank) {
    let color = this.getSuitColor(suit);
    let name = this.getRankName(rank);

    let card = {
      rank,
      suit,
      name,
      color,
    };
    return card;
  }

  getRankName(rank) {
    if (rank === 11) {
      return "Jack";
    } else if (rank === 12) {
      return "Queen";
    } else if (rank === 13) {
      return "King";
    } else if (rank === 14) {
      return "Ace";
    } else {
      return rank.toString();
    }
  }

  getSuitColor(suit) {
    if (suit === "Spades" || suit === "Clubs") {
      return "black";
    } else {
      return "red";
    }
  }

  buildDeck() {
    let deck = [];
    for (let i = 2; i < 15; i++) {
      deck.push(this.createCard("Hearts", i));
      deck.push(this.createCard("Spades", i));
      deck.push(this.createCard("Diamonds", i));
      deck.push(this.createCard("Clubs", i));
    }
    return deck;
  }

  getCard() {
    let randomCardIndex = Math.random() * this.cards.length;
    let card = this.cards.splice(randomCardIndex, 1);
    return card[0];
  }
}

class Dealer {
  constructor() {
    this.getNewDeck();
  }
  getNewDeck() {
    this.deck = new Deck();
  }
  getCard() {
    return this.deck.getCard();
  }
  getHand(size = 5) {
    let hand = [];
    for (let i = 0; i < size; i++) {
      hand.push(this.getCard());
    }
    return hand;
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this.hand = null;
    this.wins = 0;
  }

  getHighestCard() {
    if (!this.hand) {
      console.log(`${this.name} doesn't have any cards!`);
    } else {
      return this.hand.reduce((highest, card) => (card.rank > highest.rank ? card : highest), this.hand[0]);
    }
  }
}

class Game {
  constructor() {
    this.dealer = new Dealer();
    this.players = [
      new Player("Nathan"),
      new Player("Alanda"),
      new Player("Samantha"),
      new Player("Jude"),
      new Player("Aubri"),
      new Player("Elly"),
    ];

    this.deal();
  }

  deal() {
    this.players.forEach((p) => (p.hand = this.dealer.getHand()));
  }

  play(beLoud = true) {
    // 1 Find the highest card
    const highestCard = this.players
      .map((p) => p.getHighestCard())
      .reduce((best, curr) => (curr.rank > best.rank ? curr : best), {
        /* rank 0 card that will be easily bested by a real card */
        rank: 0,
      });

    // 2. Find who all matches this highest card
    const winners = this.players.filter((player) => player.getHighestCard().rank === highestCard.rank);

    // 3. Increase the win count for each person
    winners.forEach((player) => player.wins++);

    if (beLoud) {
      let highCard = winners[0].getHighestCard();
      let aOrAn = function (word) {
        return ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"].includes(word[0]) ? "an" : "a";
      };
      //   a. If only one person matches, they are the winner
      //   b. If more, everyone is actually a loser
      if (winners.length === 1) {
        console.log(
          `Congratulations, ${winners[0].name} on your amazing victory with the ${highCard.name} of ${highCard.suit}!`
        );
      } else {
        let winnerNames = winners.map((p) => p.name).join(" and ");
        console.log(`It was a tie! ${winnerNames} had ${aOrAn(highCard.name)} ${highCard.name}.`);
      }
    }
  }

  playALot(times = 10) {
    for (let playCount = 0; playCount < times; playCount++) {
      this.dealer.getNewDeck();
      this.deal();
      this.play(times < 50);
    }
  }

  announceWinner() {
    // 1. Determine the number of wins that a winner won with
    const topWins = this.players.reduce((mostWins, player) => (player.wins > mostWins ? player.wins : mostWins), 0);

    // 2. Determine the player or players with that many wins
    const winners = this.players.filter((p) => p.wins === topWins);

    // 3. Congratulate the winner(s)
    if (winners.length === 1) {
      console.log(`The big winner was ${winners[0].name} with a stunnnig ${winners[0].wins} wins!`);
    } else {
      let winnerString = winners.map((w) => w.name).join(" and ");
      console.log(`It was a tie between ${winnerString} who each had ${winners[0].wins} wins!`);
    }
  }

  printWinnersTable() {
    console.log(`-------------------- WINNERS - WINNERS - WINNERS - WINNERS ---------------------`);
    console.log(`--------------------------------------------------------------------------------`);
    console.table(this.players.map((p) => ({ name: p.name, wins: p.wins })));
    console.log(`--------------------------------------------------------------------------------`);
  }
}

let game = new Game();
game.playALot(1000);
game.printWinnersTable();
game.announceWinner();
