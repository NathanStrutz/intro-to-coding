let cl = console.log;

let getRockPaperScissors = function() {
	let rps = ["Rock", "Paper", "Scissors"];
	let choice = Math.random() * 3;
	choice = Math.floor(choice);
	return rps[choice];
}

let match = function() {
	let p1 = getRockPaperScissors();
	let p2 = getRockPaperScissors();
	cl("Player 1 throws up", p1, "but Player 2 has", p2);
	// let winner = decideWinner1(p1, p2)
	let winner = decideWinner2(p1, p2);
	cl("The winner is... " + winner + "!");
}

let decideWinner1 = function(p1RPS, p2RPS) {
	if (p1RPS === "Rock") {
		// rock beats scissors
		if (p2RPS === "Scissors") {
			return "Player 1";
		}
		// rock loses to paper
		if (p2RPS === "Paper") {
			return "Player 2";
		}
	}
	if (p1RPS === "Paper") {
		// paper beats rock
		if (p2RPS === "Rock") {
			return "Player 1";
		}
		// paper loses to scissors
		if (p2RPS === "Scissors") {
			return "Player 2";
		}
	}
	if (p1RPS === "Scissors") {
		// scissors beats paper
		if (p2RPS === "Paper") {
			return "Player 1";
		}
		// scissors lose to rock
		if (p2RPS === "Rock") {
			return "Player 2";
		}
	}

	// Must have been a tie
	return "Nobody";
}

let decideWinner2 = function(p1RPS, p2RPS) {
	let whatBeatsWhat = {};
		whatBeatsWhat.Rock = "Scissors";
		whatBeatsWhat.Paper = "Rock";
		whatBeatsWhat.Scissors = "Paper";

	if (whatBeatsWhat[p1RPS] === p2RPS) {
		return "Player 1";
	} else if (whatBeatsWhat[p2RPS] === p1RPS) {
		return "Player 2";
	} else {
		return "Nobody";
	}
}


setTimeout(() => {
	cl("1...");
}, 0);

setTimeout(() => {
	cl("2...");
}, 500);

setTimeout(() => {
	cl("3...");
}, 1000);

setTimeout(() => {
	// cl(getRockPaperScissors());
	match();
}, 1500)

