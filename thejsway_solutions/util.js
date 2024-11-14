let cl = console.log;
let title = (str) => cl(`${"-".repeat(str.length)}\n${str}\n${"-".repeat(str.length)}`);
import PromptSync from "prompt-sync";

let prompt = PromptSync({ sigint: true });

export { cl, title, prompt };
