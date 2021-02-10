const passages = [
  `In the beginning was the Word, and the Word was with God, and the Word was God. He was with God in the beginning. Through him all things were made; without him nothing was made that has been made. In him was life, and that life was the light of all mankind. The light shines in the darkness, and the darkness has not overcome it. There was a man sent from God whose name was John. He came as a witness to testify concerning that light, so that through him all might believe. He himself was not the light; he came only as a witness to the light. The true light that gives light to everyone was coming into the world. He was in the world, and though the world was made through him, the world did not recognize him. He came to that which was his own, but his own did not receive him. Yet to all who did receive him, to those who believed in his name, he gave the right to become children of God children born not of natural descent, nor of human decision or a husband"s will, but born of God. The Word became flesh and made his dwelling among us. We have seen his glory, the glory of the one and only Son, who came from the Father, full of grace and truth. (John testified concerning him. He cried out, saying, “This is the one I spoke about when I said, "He who comes after me has surpassed me because he was before me."”) Out of his fullness we have all received grace in place of grace already given. For the law was given through Moses; grace and truth came through Jesus Christ. No one has ever seen God, but the one and only Son, who is himself God and is in closest relationship with the Father, has made him known.`,
  `Now when Jesus saw the crowds, he went up on a mountainside and sat down. His disciples came to him, and he began to teach them. He said: “Blessed are the poor in spirit, for theirs is the kingdom of heaven. Blessed are those who mourn, for they will be comforted. Blessed are the meek, for they will inherit the earth. Blessed are those who hunger and thirst for righteousness, for they will be filled. Blessed are the merciful, for they will be shown mercy. Blessed are the pure in heart, for they will see God. Blessed are the peacemakers, for they will be called children of God. Blessed are those who are persecuted because of righteousness, for theirs is the kingdom of heaven. Blessed are you when people insult you, persecute you and falsely say all kinds of evil against you because of me. Rejoice and be glad, because great is your reward in heaven, for in the same way they persecuted the prophets who were before you.`,
  `The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul. He guides me along the right paths for his name’s sake. Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me. You prepare a table before me in the presence of my enemies. You anoint my head with oil; my cup overflows. Surely your goodness and love will follow me all the days of my life, and I will dwell in the house of the Lord forever.`,
  `Consider it pure joy, my brothers and sisters, whenever you face trials of many kinds, because you know that the testing of your faith produces perseverance. Let perseverance finish its work so that you may be mature and complete, not lacking anything. If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you. But when you ask, you must believe and not doubt, because the one who doubts is like a wave of the sea, blown and tossed by the wind. That person should not expect to receive anything from the Lord. Such a person is double-minded and unstable in all they do. Believers in humble circumstances ought to take pride in their high position. But the rich should take pride in their humiliation since they will pass away like a wild flower. For the sun rises with scorching heat and withers the plant; its blossom falls and its beauty is destroyed. In the same way, the rich will fade away even while they go about their business.`,
  `The earth is the Lord’s, and everything in it, the world, and all who live in it; for he founded it on the seas and established it on the waters. Who may ascend the mountain of the Lord? Who may stand in his holy place? The one who has clean hands and a pure heart, who does not trust in an idol or swear by a false god. They will receive blessing from the Lord and vindication from God their Savior. Such is the generation of those who seek him, who seek your face, God of Jacob. Lift up your heads, you gates; be lifted up, you ancient doors, that the King of glory may come in. Who is this King of glory? The Lord strong and mighty, the Lord mighty in battle. Lift up your heads, you gates; lift them up, you ancient doors, that the King of glory may come in. Who is he, this King of glory? The Lord Almighty- he is the King of glory.`,
  `If I speak in the tongues of men or of angels, but do not have love, I am only a resounding gong or a clanging cymbal. If I have the gift of prophecy and can fathom all mysteries and all knowledge, and if I have a faith that can move mountains, but do not have love, I am nothing. If I give all I possess to the poor and give over my body to hardship that I may boast, but do not have love, I gain nothing. Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs. Love does not delight in evil but rejoices with the truth. It always protects, always trusts, always hopes, always perseveres. Love never fails. But where there are prophecies, they will cease; where there are tongues, they will be stilled; where there is knowledge, it will pass away. For we know in part and we prophesy in part, but when completeness comes, what is in part disappears. When I was a child, I talked like a child, I thought like a child, I reasoned like a child. When I became a man, I put the ways of childhood behind me. For now we see only a reflection as in a mirror; then we shall see face to face. Now I know in part; then I shall know fully, even as I am fully known. And now these three remain: faith, hope and love. But the greatest of these is love.`,
];
const wordList = passages[Math.floor(Math.random() * passages.length)].split(/\s+/g);

const $$ = document.querySelectorAll.bind(document);

// Add words to word-section
function addWords() {
  // Clear existing word-section
  const wordSection = $$("#word-section")[0];
  wordSection.innerHTML = "";
  $$("#typebox")[0].value = "";

  for (let index = 0; index < wordList.length; index++) {
    const wordSpan = `<span>${wordList[index]}</span>`;
    wordSection.innerHTML += wordSpan;
  }

  // Mark first word as current-word
  wordSection.firstChild.classList.add("current-word");
}

// Word Colors
const colorCurrentWord = "#dddddd";
const colorCorrectWord = "#93C572";
const colorIncorrectWord = "#e50000";

// Word Count and other data.
const wordData = {
  seconds: 60,
  correct: 0,
  incorrect: 0,
  total: 0,
  typed: 0,
};

function checkWord(word) {
  const wlen = word.value.length;
  const wval = word.value.trim();

  // How much we have of the current word.
  const current = $$(".current-word")[0];
  const currentSubstring = current.innerHTML.substring(0, wlen);

  // Check if we have any typing errors and make sure there is a real
  // word to check https://github.com/anschwa/typing-test/issues/2
  const noMatch = wval !== currentSubstring;
  const emptyWords = wval === "" || currentSubstring === "";

  if (noMatch || emptyWords) {
    current.classList.add("incorrect-word-bg");
    return false;
  } else {
    current.classList.remove("incorrect-word-bg");
    return true;
  }
}

function submitWord(word) {
  // Update current-word and keep track of correct & incorrect words
  const current = $$(".current-word")[0];

  if (checkWord(word)) {
    current.classList.remove("current-word");
    current.classList.add("correct-word-c");
    wordData.correct += 1;
  } else {
    current.classList.remove("current-word", "incorrect-word-bg");
    current.classList.add("incorrect-word-c");
    wordData.incorrect += 1;
  }

  // Update wordData
  wordData.total = wordData.correct + wordData.incorrect;

  // Make the next word the new current-word.
  current.nextSibling.classList.add("current-word");
}

function clearLine() {
  // Remove past words once you get to the next line
  const wordSection = $$("#word-section")[0];
  const current = $$(".current-word")[0];
  const previous = current.previousSibling;
  const children = $$(".correct-word-c, .incorrect-word-c").length;

  // <span>'s on the next line have a greater offsetTop value than
  // those on the top line. Remove words until the first word on the
  // second line is the fistChild of word-section.
  if (current.offsetTop > previous.offsetTop) {
    for (let i = 0; i < children; i++) {
      wordSection.removeChild(wordSection.firstChild);
    }
  }
}

let typingTimer = null;
function isTimer(seconds) {
  // BUG: page refresh with keyboard triggers onkeyup and starts timer
  const time = $$("#timer > span")[0].innerHTML;
  if (time === "0:00") {
    return false;
  }

  // Only set timer once
  if (time === "1:00" && typingTimer === null) {
    typingTimer = window.setInterval(() => {
      if (seconds <= 0) {
        window.clearInterval(typingTimer);
      } else {
        seconds -= 1;
        const timePad = seconds < 10 ? "0" + seconds : seconds; // Zero padded

        $$("#timer > span")[0].innerHTML = `0:${timePad}`;
      }
    }, 1000);
  }

  return true;
}

function calculateWPM(data) {
  const { seconds, correct, incorrect, total, typed } = data;
  const minutes = seconds / 60;
  const wpm = Math.max(0, Math.ceil((typed / 5 - incorrect) / minutes));
  const accuracy = Math.ceil((correct / total) * 100);

  const results = `
<ul id="results">
  <li>WPM: <span class="wpm-value">${wpm}</span></li>
  <li>Accuracy: <span class="wpm-value">${accuracy}%</span></li>
  <li id="results-stats">
    Total Words: <span>${total}</span> |
    Correct Words: <span>${correct}</span> |
    Incorrect Words: <span>${incorrect}</span> |
    Characters Typed: <span>${typed}</span>
  </li>
</ul>
`;

  $$("#word-section")[0].innerHTML = results;

  // Color-code accuracy
  const wpmClass = $$("li:nth-child(2) .wpm-value")[0].classList;
  if (accuracy > 80) {
    wpmClass.add("correct-word-c");
  } else {
    wpmClass.add("incorrect-word-c");
  }

  //   console.log(wordData);
}

function typingTest(e) {
  const SPACE = 32;

  // Get key code of current key pressed.
  e = e || window.event;
  const kcode = e.keyCode;
  const word = $$("#typebox")[0];

  // Check if empty (starts with space)
  if (word.value.match(/^\s/g)) {
    word.value = "";
    return;
  }

  // Display typing test results when timer runs out.
  const isGameover = !isTimer(wordData.seconds);
  if (isGameover) {
    calculateWPM(wordData);
    return;
  }

  // Otherwise, keep score when timer is on.
  checkWord(word);
  if (kcode === SPACE) {
    submitWord(word);
    clearLine();

    $$("#typebox")[0].value = "";
  }

  wordData.typed += 1;
}

function restartTest() {
  $$("#typebox")[0].value = "";
  window.location.reload();
}

addWords();
