let cl = console.log;

// Arrays: Accessing array elements by their index
{
  let a = ["a", "b", "c"];
  cl(a[0] === "a", a[1] === "b", a[2] === "c");
}

// Arrays: Pushing and Popping
{
  let a = [1, 2, 3];

  a.push(4);
  a.push(5);
  // a is [1, 2, 3, 4, 5]
  cl(a);

  a.pop();
  // a is [1, 2, 3, 4]
  cl(a);
}

// Arrays: Shift and Unshift
{
  let a = [1, 2, 3];

  a.unshift(8);
  a.unshift(9);
  // a is [9, 8, 1, 2, 3];
  cl("Shifted", a);

  a.shift();
  // a is [8, 1, 2, 3];
  cl("Unshifted", a);
}

// Arrays: looping
{
  let a = ["Hello", "World", "it's", "me"];
  for (let count = 0; count < a.length; count++) {
    cl(a[count]);
  }
}

// Objects: Create a new object
{
  let o = {
    name: "Nathan",
    age: 100,
  };
  cl(o);
  console.table(o);
}

// Objects: Properties in Objects
{
  let o = {};
  o.name = "Nathan";
  // by a string of the key name
  cl(o["name"]);
}
{
  let o = {};
  o.name = "Nathan";
  // by a variable of a string of the key name
  let key = "name";
  cl(o[key]);
}

let d = new Date("9/24/2020 1:23:45");
cl(d.getFullYear());
d.setFullYear(2015);
cl(d);