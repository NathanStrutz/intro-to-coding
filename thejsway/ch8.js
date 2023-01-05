cl = console.log;
let prompt = require("prompt-sync")({ sigint: true });
let title = (str) => cl(`${"-".repeat(str.length)}\n${str}\n${"-".repeat(str.length)}`);

{
  title("Word info");
  // Write a program that asks you for a word then shows its length, lowercase, and uppercase values.

  let describeWord = (w) =>
    cl(
      `The word ${w} has ${
        w.length
      } characters.\nHere it is lowercase: ${w.toLowerCase()}\nHere it is uppercase: ${w.toUpperCase()}`
    );
  describeWord("Butterfinger");
}
{
  title("Word info with vowel info");
  // Improve the previous program so that it also shows the number of vowels inside the word.

  let describeWord = (w) => {
    w = w.trim();
    let o = ""; // o = output
    o += `The word ${w} has ${w.length} characters.\n`;
    o += `Here it is lowercase: ${w.toLowerCase()}\n`;
    o += `Here it is uppercase: ${w.toUpperCase()}\n`;
    let al = [...w.toLowerCase()]; // aw = array of letters
    let vowelMap = al.map((l) => ["a", "e", "i", "o", "u"].includes(l));
    let vowelCount = vowelMap.reduce((a, b) => (b ? ++a : a), 0);
    o += `${w} has ${vowelCount} vowels\n`;

    cl(o);
  };
  describeWord("Butterfinger");
}
{
  title("Backwards Word");
  // Improve the previous program so that it shows the word written backwards

  let describeWord = (w) => {
    w = w.trim();
    let o = ""; // o = output
    let line = (txt) => {
      o && (o += "\n");
      o += txt;
    };

    line(`The word ${w} has ${w.length} characters.`);
    line(`Here it is lowercase: ${w.toLowerCase()}`);
    line(`Here it is uppercase: ${w.toUpperCase()}`);
    let al = [...w.toLowerCase()]; // aw = array of letters
    let vowelMap = al.map((l) => ["a", "e", "i", "o", "u"].includes(l));
    let vowelCount = vowelMap.reduce((a, b) => (b ? ++a : a), 0);
    line(`${w} has ${vowelCount} vowels`);
    let reverseWord = [...w].reduce((a, b) => b + a);
    line(`Backwards, it's: ${reverseWord}`);

    cl(o);
  };
  describeWord("Butterfinger");
  cl("");
  describeWord("pandemonium");
}
{
  title("But is it a palindrome?");
  // Improve the previous program to check if the word is a palindrome (ignoring punctuation, case, and spacing)

  let describeWord = (w) => {
    w = w.trim();
    let o = ""; // o = output
    let line = (txt) => {
      o && (o += "\n");
      o += txt;
    };
    let wordOrSentence = w.includes(" ") ? "sentence" : "word";

    line(`The ${wordOrSentence} "${w}" has ${w.length} characters.`);
    line(`Here it is lowercase: ${w.toLowerCase()}`);
    line(`Here it is uppercase: ${w.toUpperCase()}`);

    let al = [...w.toLowerCase()]; // aw = array of letters
    let vowelMap = al.map((l) => ["a", "e", "i", "o", "u"].includes(l));
    let vowelCount = vowelMap.reduce((a, b) => (b ? ++a : a), 0);
    line(`The ${wordOrSentence} has ${vowelCount} vowels.`);

    let reverseWord = [...w].reduce((a, b) => b + a);
    line(`Backwards, it's: ${reverseWord}.`);

    let allTogetherForward = [...w.toLowerCase()].reduce((a, b) => (b.match(/[a-z]/) ? a + b : a));
    let allTogetherBackward = [...allTogetherForward].reduce((a, b) => b + a);
    let isPallindrome = allTogetherForward === allTogetherBackward;
    if (isPallindrome) {
      line(`This ${wordOrSentence} is a palindrome! Cool!`);
    } else {
      line(`This ${wordOrSentence} is not a palindrome.`);
    }

    cl(o);
  };
  describeWord("Butterfinger");
  cl("");
  describeWord("Racecar");
  cl("");
  describeWord("Madam, in Eden, I'm Adam.");
}
