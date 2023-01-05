cl = console.log;
let prompt = require("prompt-sync")({ sigint: true });
let title = (str) => cl(`${"-".repeat(str.length)}\n${str}\n${"-".repeat(str.length)}`);

{
  title("Dog class");
  //Complete the following program to add the dog object definition.
  class Dog {
    constructor(name = "Cranberry", species = "yorkie-poo", size = 14) {
      this.name = name;
      this.species = species;
      this.size = size;
    }
    bark() {
      if (this.size > 60) {
        return "Grrr! Grrr!";
      } else if (this.size > 20) {
        return "Woof! Woof!";
      } else {
        return "Yarf! Yarf!";
      }
    }
  }
  let dog = new Dog();
  console.log(`${dog.name} is a ${dog.species} dog measuring ${dog.size} inches`);
  console.log(`Look, a cat! ${dog.name} barks: "${dog.bark()}"`);

  // Complete the following program to add the definition of the Dog class.
  // Dogs taller than 60 emote "Grrr! Grrr!" when they bark, other ones yip "Woof! Woof!".

  const fang = new Dog("Fang", "boarhound", 75);
  console.log(`${fang.name} is a ${fang.species} dog measuring ${fang.size}`);
  console.log(`Look, a cat! ${fang.name} barks: ${fang.bark()}`);
  const snowy = new Dog("Snowy", "terrier", 22);
  console.log(`${snowy.name} is a ${snowy.species} dog measuring ${snowy.size}`);
  console.log(`Look, a cat! ${snowy.name} barks: ${snowy.bark()}`);
}
{
  title("RPG class");
  // Improve the example RPG to add character inventory management according to the following rules:
  // • A character's inventory contains a number of gold and a number of keys.
  // • Each character begins with 10 gold and 1 key.
  // • The character description must show the inventory state.
  // • When a character slays another character, the victim's inventory goes to its vanquisher.

  class Character {
    constructor(name, health, strength) {
      this.name = name;
      this.health = health;
      this.strength = strength;
      this.xp = 0; // XP is always zero for new characters
    }
    gold = 10;
    keys = 1;

    // Attack a target
    attack(target) {
      if (this.health > 0) {
        const damage = this.strength;
        console.log(`${this.name} attacks ${target.name} and causes ${damage} damage points`);
        target.health -= damage;
        if (target.health > 0) {
          console.log(`${target.name} has ${target.health} health points left`);
        } else {
          target.health = 0;
          const bonusXP = 10;
          console.log(`${this.name} eliminated ${target.name} and wins ${bonusXP} experience points`);
          this.xp += bonusXP;
          this.gold += target.gold;
          this.keys += target.keys;
        }
      } else {
        console.log(`${this.name} can't attack (they've been eliminated)`);
      }
    }
    // Return the character description
    describe() {
      return `${this.name}
HP:         ${this.health}
Strength:   ${this.strength}
Experience: ${this.xp}
Gold:       ${this.gold}
Keys:       ${this.keys}`;
    }
  }

  const aurora = new Character("Aurora", 150, 25);
  const glacius = new Character("Glacius", 130, 30);
  console.log("Welcome to the adventure! Here are our heroes:");
  console.log(aurora.describe());
  console.log(glacius.describe());
  const monster = new Character("Spike", 40, 20);
  console.log("A wild monster has appeared: it's named " + monster.name);
  monster.attack(aurora);
  monster.attack(glacius);
  aurora.attack(monster);
  glacius.attack(monster);
  console.log(aurora.describe());
  console.log(glacius.describe());
}
{
  title("Bank account class");
  // Write a program that creates three accounts: one belonging to Sean, another to Brad and the
  // third one to Georges. These accounts are stored in an array. Next, the program credits 1000 to
  // each account and shows its description.

  class Account {
    constructor(name, balance = 0) {
      this.name = name;
      this.balance = balance;
    }
    credit(amount) {
      this.balance += amount;
    }
    debit(amount) {
      this.balance -= amount;
    }
    describe() {
      return `${this.name}'s account has a balance of $${this.balance}`;
    }
  }

  let accounts = [new Account("Sean"), new Account("Brad"), new Account("Georges")];

  accounts.forEach((a) => a.credit(1000));
  accounts.forEach((a) => cl(a));
}
