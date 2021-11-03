let fs = require("fs");
let files = fs.readdirSync("./");

// for...in loop
for (let index in files) {
  console.log(index);
  console.log(files[index]);
}

// for...of loop
for (let file of files) {
  console.log(file);
}

// forEach higher order function loop
files.forEach((file) => console.log(file));

//
// You can also just log the entire array
// console.log(files);
//

console.log("----------------------------------------------------");

// Vertical Name
let name = "Nathan Strutz";
for (let i = 0; i < name.length; i++) {
  console.log(name[i]);
}

for (let letter of "Nathan Strutz") {
  console.log(letter);
}
