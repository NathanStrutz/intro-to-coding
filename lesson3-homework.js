// shortcut:
let cl = console.log;


cl("-----------------------------------");
cl("FizzBuzz - the normal, verbose solution");
for (let count = 1; count <= 100; count++) {
  if (count % 3 === 0 && count % 5 === 0) {
    console.log("FizzBuzz");
  } else if (count % 3 === 0) {
    console.log("Fizz");
  } else if (count % 5 === 0) {
    console.log("Buzz");
  } else {
    console.log(count);
  }
}

cl("-----------------------------------")
cl("FizzBuzz - the shortest one I could come up with");
cl([...Array(100)].map((_,v)=>(v%3?"":"Fizz")+(v%5?"":"Buzz")||v));



cl("-----------------------------------")
cl("Write My Name Vertically - normal solution");
let name = "Nathan Strutz";
for (let count = 0; count < name.length; count++) {
  cl(name[count]);
}

cl("-----------------------------------")
cl("Write my name vertically - in one line")
name.split("").map(v=>cl(v));



cl("-----------------------------------")
cl("Oh Christmas Tree - 2-loop solution");
for (let count1 = 1; count1 < 8; count1++) {
  let tree = "";
  for (let count2 = 1; count2 <= count1; count2++) {
    tree += "#";
  }
  cl(tree);
}

cl("-----------------------------------")
cl("Oh Christmas Tree - Samantha's solution");
for(let tree = "#"; tree.length < 8; tree += "#") {
  cl(tree);
}

cl("-----------------------------------")
cl("Oh Christmas Tree - short solution");
[...Array(7)].map((_, i) => cl("#".repeat(i+1)));

