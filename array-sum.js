let cl = console.log;

{
  // solution 1
  let a = [];
  for (let i = 0; i < 500; i++) {
    a.push(3);
  }

  let sum = 0;

  for (let i = 0; i < a.length; i++) {
    const element = a[i];
    sum += element;
  }

  cl("Sum of array:", sum);
}

{
  // solution 2
  let a = new Array(100).fill(3);
  let sum = a.reduce((r, e) => r + e, 0);
  cl(sum);
}
