let sum = function (idontknow) {
  let total = 0;
  for (let index = 0; index < idontknow.length; index++) {
    const element = idontknow[index];
    total += element;
  }
  return total;
};

//    7    ,  10
let range = function (start, end) {
  let a = [];
  for (let index = start; index <= end; index++) {
    a.push(index);
  }
  return a;
};
// console.log(range(7, 10));

// let b = [];
// for (let index = 0; index < 10000; index++) {
//   b.push(Math.floor(Math.random() * 10));
// }

// let newTotal = sum(b);

// console.log(newTotal);

console.log(sum(range(1, 50)));
