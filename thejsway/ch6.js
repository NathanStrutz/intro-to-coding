cl = console.log;
let prompt = require("prompt-sync")({ sigint: true });
let title = (str) => cl(`${"-".repeat(str.length)}\n${str}\n${"-".repeat(str.length)}`);

{
  title("RPG Character");
  // Improve our example RPG program to add an experience property named xp to the character. Its
  // initial value is 0. Experience must appear in character description.

  let aurora = {
    health: 150,
    strength: 25,
    xp: 0,
    describe: () =>
      `Aurora has ${aurora.health} health points, ${aurora.strength} strength, and ${aurora.xp} experience.`,
  };
  // Aurora is harmed by an arrow
  aurora.health -= 20;
  // Aurora equips a strength necklace
  aurora.strength += 10;
  // Aurora learn a new skill
  aurora.xp += 15;
  console.log(aurora.describe());
}
{
  title("Dog");
  //Complete the following program to add the dog object definition.
  let dog = {
    name: "Cranberry",
    species: "Yorkie-poo",
    size: "14 inches",
    bark: () => "Yarf yarf!",
  };
  console.log(`${dog.name} is a ${dog.species} dog measuring ${dog.size}`);
  console.log(`Look, a cat! ${dog.name} barks: "${dog.bark()}"`);
}
{
  title("Circle object");
  // Complete the following program to add the circle object definition. Its radius value is input by the user.
  let circle = {
    rad: 5,
    circumference: () => 2 * Math.PI * circle.rad,
    area: () => Math.PI * circle.rad ** 2,
  };
  console.log(`Its circumference is ${circle.circumference()}`);
  console.log(`Its area is ${circle.area()}`);
}
{
  title("Bank account");
  // Write a program that creates an account object with the following characteristics:
  // • A name property set to “Alex”.
  // • A balance property set to 0.
  // • A credit method adding the (positive or negative) value passed as an argument to the
  // account balance.
  // • A describe method returning the account description.
  // Use this object to show its description, crediting 250, debiting 80, then show its description again.
  let account = {
    name: "Alex",
    balance: 0,
    credit: (amount) => (account.balance += amount),
    debit: (amount) => (account.balance -= amount),
    describe: () => `${account.name}'s account has a balance of $${account.balance}`,
  };
  cl(account.describe());
  account.credit(250);
  cl(account.describe());
  account.debit(80);
  cl(account.describe());
}
