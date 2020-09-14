let cl = console.log;

// 1. Three ways to define functions (there are more)
function a() {}
let b = function () {};
let c = () => {};


// 2. How to use a function
// declare it
let fun = function () {};
// call it
fun();


// 3. Functions can return one answer
let getGreeting1 = function () {
  return "Hello From a Function!";
  // Nothing happens after the return
};
let greeting1 = getGreeting1();
cl(greeting1);


// 4. Functions can take in arguments as variables
// function with argument
let getGreeting2 = function (name) {
  return "Hello " + name;
};
// Call with an argument
let greeting2 = getGreeting2("Bob");
console.log(greeting2);


// 5. Arguments are scoped
let scopeTest1 = function (z) {
  return z;
};
try {
  cl(z); // Error!
} catch {
  cl("Z was not defined");
}


// 6. Functions read variables when they execute
let scopeTest2 = function (z) {
  cl(greeting3); // ??
  return z + " Fun";
};
let greeting3 = "Hello";
let scopeResult2 = scopeTest2(greeting3);
cl(scopeResult2);
// (it logs "Hello", then "Hello Fun")


// 7. Multiple arguments are a list
let getGreeting4 = function(name, timeOfDay) {
  return "Good " + timeOfDay + ", " + name;
}
// Call with multiple arguments
let greeting4 = getGreeting4("Bob", "morning");
console.log(greeting4);


// 8. Default arguments
let getGreeting5 = function(name, timeOfDay="morning") {
  return "Good " + timeOfDay + ", " + name;
}
// Call it without the 2nd argument...
let greeting5a = getGreeting5("Bob");
cl(greeting5a);
// or call it with
let greeting5b = getGreeting5("Bob", "afternoon");
cl(greeting5b);

