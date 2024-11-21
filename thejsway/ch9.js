import { cl, title, bigTitle, prompt } from "./util.js";
bigTitle("Chapter 9: Understand object-oriented programming");
{
  title("Dog class");
  // Complete the following program to add the definition of the Dog class.
  // Dogs taller than 60 emote "Grrr! Grrr!" when they bark, other ones yip "Woof! Woof!".
  // TODO: define the Dog class here

  /*
    const fang = new Dog("Fang", "boarhound", 75);
    console.log(`${fang.name} is a ${fang.species} dog measuring ${fang.size}`);
    console.log(`Look, a cat! ${fang.name} barks: ${fang.bark()}`);

    const snowy = new Dog("Snowy", "terrier", 22);
    console.log(`${snowy.name} is a ${snowy.species} dog measuring ${snowy.size}`);
    console.log(`Look, a cat! ${snowy.name} barks: ${snowy.bark()}`);
  */
}
{
  title("RPG class, character inventory");
  // Improve the example RPG to add character inventory management according to the following rules:
  // • A character's inventory contains a number of gold and a number of keys.
  // • Each character begins with 10 gold and 1 key.
  // • The character description must show the inventory state.
  // • When a character slays another character, the victim's inventory goes to its vanquisher.
}
{
  title("Bank account class");
  // Let's build upon a previous account object exercise. A bank account is still defined by:
  // • A name property.
  // • A balance property, initially set to 0.
  // • A credit method adding the value passed as an argument to the account balance.
  // • A describe method returning the account description.
  //
  // Write a program that creates three accounts: one belonging to Sean, another to Brad and the third
  // one to Georges.These accounts are stored in an array.Next, the program credits 1000 to each
  // account and shows its description.
}
