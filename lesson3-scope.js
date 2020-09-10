// Variable scope test

// Part 1 - create 2 variables with the same name
//          but in different scopes
let a = 1;
{
    let a = 2;
    console.log(a);
}
console.log(a);
/**
 * 
 * This one outputs 2, then 1.
 * The second declaration is in a different scope.
 * It only exists inside the curly brace area.
 */



// Part2 - Use a variable in a different scope
let b = 3;
{
    b = 4;
    console.log(b);
}
console.log(b);
/**
 * This one outputs 4, then 4 again.
 * "b" is declared once, and set twice.
 * Both log statements are after b=4.
 */



// part 3 - Can't use a variable outside its scope
{
    let c = 5;
}
console.log(c); // <-- Error!
/**
 * "c" only exists inside the inner scope
 * When you use it outside, it throws an error.
 */



// Part 4 - Can't declare it after it's used
let d = 6;
{
    console.log(d); // <-- Error here!
    let d = 7; // <!------ because of this
}
/**
 * This one also throws an error.
 * The outside "d" is used on the inside scope.
 * It can't be declared after it's used.
 */
