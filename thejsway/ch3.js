import { cl, title, bigTitle, prompt } from "./util.js";
bigTitle("Chapter 3: Add conditions");
{
  title("Following day");
  // Write a program that accepts a day name from the user, then shows the name of the following
  // day. Incorrect inputs must be taken into account.
}

{
  title("Number comparison");
  // Write a program that accepts two numbers, then compares their values and displays an appropriate message in all cases.
}

{
  title("Final values");
  // Take a look at the following program.
  /*
    let nb1 = Number(prompt("Enter nb1:"));
    let nb2 = Number(prompt("Enter nb2:"));
    let nb3 = Number(prompt("Enter nb3:"));

    if (nb1 > nb2) {
      nb1 = nb3 * 2;
    } else {
      nb1++;
      if (nb2 > nb3) {
        nb1 += nb3 * 3;
      } else {
        nb1 = 0;
        nb3 = nb3 * 2 + nb2;
      }
    }
    console.log(nb1, nb2, nb3);
  */
  // Before executing it, try to guess the final values of variables nb1, nb2 and nb3 depending on their
  // initial values. Complete the following table.
  // Initial values
  // nb1 final value
  // nb2 final value
  // nb3 final value
  // nb1=nb2=nb3=4 // 0, 2, 10
  // nb1=4,nb2=3,nb3=2 // 4, 3, 2
  // nb1=2,nb2=4,nb3=0 // 3, 4, 0
  // Check your predictions by executing the program.
}

{
  title("Number of days in a month");
  // Write a program that accepts a month number (between 1 and 12), then shows the number of
  // days of that month. Leap years are excluded. Incorrect inputs must be taken into account.
}

{
  title("Following second");
  // Write a program that asks for a time under the form of three information (hours, minutes,
  // seconds). The program calculates and shows the time one second after. Incorrect inputs must
  // be taken into account. This is not as simple as it seems… Look at the following results to see for yourself:
  // • 14h17m59s ⇒ 14h18m0s
  // • 6h59m59s ⇒ 7h0m0s
  // • 23h59m59s ⇒ 0h0m0s (midnight)
}
