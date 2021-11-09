// shortcut:
let cl = console.log;


cl("-----------------------------------");
cl("FizzBuzz - the normal way");
for (let count = 1; count <= 100; count++) {
  if (count % 3 === 0 && count % 5 === 0) {
    cl("FizzBuzz");
  } else if (count % 3 === 0) {
    cl("Fizz");
  } else if (count % 5 === 0) {
    cl("Buzz");
  } else {
    cl(count);
  }
}

cl("-----------------------------------")
cl("FizzBuzz - the shortest one I could come up with");
cl([...Array(101)].map((_,v)=>(v%3?"":"Fizz")+(v%5?"":"Buzz")||v));
