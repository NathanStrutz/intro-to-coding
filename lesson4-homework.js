let cl = console.log;

let add = function(a,b) { return a + b; };
let subtract = function(a,b) { return a - b; };
let multiply = function(a,b) { return a * b; };
let divide = function(a,b) { return a / b; };

cl( add(5,5) === 10 );
cl( add(-5,5) === 0 );
cl( add(3000,210) === 3210 );

cl( subtract(5,5) === 0 );
cl( subtract(20,10) === 10 );
cl( subtract(3000,210) === 2790 );

cl( multiply(1,4) === 4 );
cl( multiply(3,11) === 33 );
cl( multiply(123,456) === 56088 );

cl( divide(1,1) === 1 );
cl( divide(10,2) === 5 );
cl( divide(444,300) === 1.48 );
