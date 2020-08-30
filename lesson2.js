console.log("Hello World!");

// Phone Number
console.log("555-123-4567");
console.log(555-123-4567);

// Are computers bad at math? let's try booleans
let badAtMath = 1 > 2;
if (badAtMath) {
  throw "Crash & Burn";
}

// Operators
let x = 1;
console.log(x++); // x is 2
console.log(x--); // x is 1
console.log(x < 1); // false
console.log(x <= 1); // true
console.log((x += 2)); // x is 3
console.log(x / 2); // 1.5
console.log(x * 2); // 6
console.log(x % 2); // 1 (remainder of 3/2)
console.log(x ** 3); // 27 (3 cubed)
console.log(x === 3); // true
console.log(x !== 3); // false
console.log(x === 1 || x === 3); // true
console.log(x === 1 && x === 3); // false
