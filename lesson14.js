// Function review
let fun = function (times = 1) {
  for (let i = 0; i < times; i++) {
    console.log("on repeat...");
  }
};
fun(5);

// Math Stuff
console.log(Math.PI);
console.log(Math.floor(Math.random() * 10));

// Date Stuff
let d = new Date("12/31/2021");
d.setMinutes(200);
console.log(d);
