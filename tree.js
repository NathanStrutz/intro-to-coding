let fullTree = function () {
  let size = 12;
  for (let i = 1; i < size; i += 2) {
    let branches = "";
    for (let b = 0; b < i; b++) {
      branches += "#";
    }
    let spaces = "";
    for (let s = 0; s < size - branches.length; s += 2) {
      spaces += " ";
    }
    console.log(spaces + branches);
  }

  let spaces = "";
  for (let s = 0; s < size / 2 - 1; s++) {
    spaces += " ";
  }
  console.log(spaces + "##");
};

let tree = function () {
  for (let i = 0; i < 6; i++) {
    console.log("#".repeat(i));
  }
  console.log("#");
};

tree();
