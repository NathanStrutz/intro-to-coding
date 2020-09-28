let cl = console.log;


// 1. Tell the date
let date = new Date();
cl("The date");
cl(date);
cl("------------------------------")

// 2. Get a random number, between 1 and 1000
let random = Math.random();
let randomTimes1k = random * 1000;
let randomInteger = Math.round(randomTimes1k);
cl("Random Number 1-1000");
cl(randomInteger);
cl("------------------------------")

// 3. Add up an array of at least 50 numbers
cl("Add an array of numbers");
// first, make an array of at least 50 items
let a = [];

for (let index = 0; index <= 100; index++) {
  a.push(index);
}
// cl(a);

// second, add up the array
let total = 0;
for (let index = 0; index < a.length; index++) {
  total = total + a[index];
}
cl("Total");
cl(total);
cl("------------------------------")
