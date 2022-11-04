// 8
console.log("Hello World!");

// 9
console.log("Nathan " + "Strutz");
console.log("123-555-1234");
console.log(123 - 555 - 1234);

// 10
let cl = console.log;
{
  let branches = "#";
  for (let index = 0; index < 7; index++) {
    cl(branches);
    branches += "#";
  }
  cl("#");
}
{
  let branches = "#";
  let leftSpace = " ".repeat(6);
  for (let index = 0; index < 5; index++) {
    cl(leftSpace + branches);
    branches += "##";
    leftSpace = " ".repeat(5 - index);
  }
  cl("     ##");
}
