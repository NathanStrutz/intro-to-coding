/**
 * cl = console.log Shortcut
 */
let cl = console.log;
/**
 * Don't mess with this. It creates the smaller titles with lines
 * @param {String} str Any string text value
 */
let title = (str) => cl(`${"-".repeat(str.length)}\n${str}\n${"-".repeat(str.length)}`);
/**
 * Don't mess with this. It creates the big title with double-lines
 * @param {String} str Any string text value
 */
let bigTitle = (str) => cl(`\n${"=".repeat(str.length + 6)}\n   ${str}\n${"=".repeat(str.length + 6)}\n`);

import PromptSync from "prompt-sync";
/**
 * Prompt - replicates the browser prompt with prompt-sync. If this doesn't work, run the command "npm i"
 * It should prompt the user for input. Type your answer to pass, or press CTRL+C to cancel. The result is always a string.
 */
let prompt = PromptSync({ sigint: true });

export { cl, title, bigTitle, prompt };
