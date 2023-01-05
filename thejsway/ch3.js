cl = console.log;
let prompt = require("prompt-sync")({ sigint: true });

{
  // Write a program that accepts a day name from the user, then shows the name of the following
  // day. Incorrect inputs must be taken into account.

  let input = prompt("Name a day: ");
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const foundDayIndex = days.findIndex((d) => d.toLowerCase() === input.trim().toLowerCase());
  if (foundDayIndex >= 0) {
    let nextDayIndex = foundDayIndex + 1;
    if (nextDayIndex > days.length - 1) {
      nextDayIndex = 0;
    }
    cl("the following day will be " + days.at(nextDayIndex));
  } else {
    cl('This program requires you to type a full day, by its name, e.g. "Monday" ');
  }
}

{
  // Write a program that accepts two numbers, then compares their values and displays an appropriate message in all cases.
  function numCompare(a, b) {
    if (a > b) {
      cl("The first number is greater", a, ">", b);
    } else if (b > a) {
      cl("The second number is greater", a, "<", b);
    } else {
      cl("Both values are the same", a, "==", b);
    }
  }
  numCompare(1, 2);
  numCompare(2, 1);
  numCompare(2, 2);
}

{
  // Take a look at the following program.
  // let nb1 = Number(prompt("Enter nb1:"));
  // let nb2 = Number(prompt("Enter nb2:"));
  // let nb3 = Number(prompt("Enter nb3:"));
  // if (nb1 > nb2) {
  //   nb1 = nb3 * 2;
  // } else {
  //   nb1++;
  //   if (nb2 > nb3) {
  //     nb1 += nb3 * 3;
  //   } else {
  //     nb1 = 0;
  //     nb3 = nb3 * 2 + nb2;
  //   }
  // }
  // console.log(nb1, nb2, nb3);
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
  // Write a program that accepts a month number (between 1 and 12), then shows the number of
  // days of that month. Leap years are excluded. Incorrect inputs must be taken into account

  const daysInAMonth = function (monthNumber) {
    const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (monthNumber < 1 || monthNumber > 12) {
      return "Error - Months range from 1 to 12";
    }
    return daysInMonths[monthNumber - 1];
  };

  cl("Days in a month, 1:", daysInAMonth(1));
  cl("Days in a month, 2:", daysInAMonth(2));
  cl("Days in a month, 3:", daysInAMonth(3));
  cl("Days in a month, 12:", daysInAMonth(12));
  cl("Days in a month, 0:", daysInAMonth(0));
  cl("Days in a month, 22:", daysInAMonth(22));
}

{
  // Write a program that asks for a time under the form of three information (hours, minutes,
  // seconds). The program calculates and shows the time one second after. Incorrect inputs must
  // be taken into account. This is not as simple as it seems… Look at the following results to see for yourself:
  // • 14h17m59s ⇒ 14h18m0s
  // • 6h59m59s ⇒ 7h0m0s
  // • 23h59m59s ⇒ 0h0m0s (midnight)
  const addOneSecond = function (h, m, s) {
    let d = new Date();
    d.setHours(h);
    d.setMinutes(m);
    d.setSeconds(s + 1);

    const fmt = new Intl.DateTimeFormat("en-us", {
      hour12: false,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    cl(fmt.format(d));
  };

  addOneSecond(1, 2, 3);
  addOneSecond(12, 59, 59);
}
