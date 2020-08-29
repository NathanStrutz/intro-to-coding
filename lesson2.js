console.log("Hello World!");

// Phone Number
console.log("555-123-4567");
console.log(555 - 123 - 4567);

// Explaining booleans
let badAtMath = 1 > 2;
if (badAtMath) {
  throw "Crash & Burn";
}

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
console.log(x !== 4); // true
console.log((x = "Hello")); // x is now a string
console.log(x === 1 || x === "Hello"); // true
console.log(x === 1 && x === "Hello"); // false
