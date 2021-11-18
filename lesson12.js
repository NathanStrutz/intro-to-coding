// Adding
let add = function (num1, num2) {
  return num1 + num2;
};
console.log("Adding");
console.log("  15 =", add(5, 10));
console.log("  3210 =", add(3000, 210));

// Subtracting
let subtract = function (num1, num2) {
  return num1 - num2;
};
console.log("Subtracting");
console.log("  -5 =", subtract(5, 10));
console.log("  900 =", subtract(3000, 2100));

// Multiplying
let multiply = function (num1, num2) {
  return num1 * num2;
};
console.log("Multiplying");
console.log("  12 =", multiply(4, 3));
console.log("  625 =", multiply(25, 25));

// Dividing
let divide = function (num1, num2) {
  return num1 / num2;
};
console.log("Dividing");
console.log("  2 =", divide(10, 5));
console.log("  10 =", divide(3000, 300));

// And now, the bonus homework

// Min
let min = function (num1, num2) {
  if (num1 < num2) {
    return num1;
  } else {
    return num2;
  }
};
console.log("Min");
console.log("  5 =", min(10, 5));
console.log("  -300 =", min(-300, 300));

// Max
let max = function (num1, num2) {
  if (num1 > num2) {
    return num1;
  } else {
    return num2;
  }
};
console.log("Max");
console.log("  10 =", max(10, 5));
console.log("  300 =", max(-300, 300));

// Is Prime Number
let isPrimeNumber = function (num) {
  for (let i = 2; i < num / 2; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
};
console.log("Is Prime");
console.log("  true =", isPrimeNumber(2));
console.log("  false =", isPrimeNumber(10));
console.log("  true =", isPrimeNumber(17));
console.log("  false =", isPrimeNumber(18));
console.log("  true =", isPrimeNumber(15485863));
