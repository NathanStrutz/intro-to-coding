for (let count = 1; count <= 100; count++) {
  if (count % 3 === 0 && count % 5 === 0) {
    document.write("<h1>FizzBuzz</h1>");
  } else if (count % 3 === 0) {
    document.write("<h3>Fizz</h3>");
  } else if (count % 5 === 0) {
    document.write("<h3>Buzz</h3>");
  } else {
    document.write(`<small>${count}</small>`);
  }
}
