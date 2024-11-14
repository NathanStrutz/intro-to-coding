import { cl, title, prompt } from "./util.js";

cl("cl is a shortcut for console.log");
title("This prints out a beautiful title to keep your output organized");
title("Here's a short one");
let something = prompt("Say something: ");
cl("You said:", something);
