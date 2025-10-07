import fs from "node:fs/promises";
import crypto from "node:crypto";
import { log } from "node:console";

const start = Date.now();

const phase = (name) => log(`\n--- ${name} ---`);

const print = (msg) => {
  const elapsed = (Date.now() - start).toString().padStart(4, " ");
  log(`${elapsed}ms → ${msg}`);
};

phase("Synchronous Phase");
print("1. Script Starts");

setTimeout(() => {
  print("2. setTimeout 0s callback (timers phase)");
}, 0);

setTimeout(() => {
  print("3. setTimeout 0s callback (timers phase)");
}, 0);

setImmediate(() => {
  print("4. setImmediate callback (check phase)");
});

Promise.resolve().then(() => {
  print("5. Promise resolved callback (microtask queue)");
});

process.nextTick(() => {
  print("6. process.nextTick callback (microtask queue)");
});

fs.readFile("eventLoop.js", "utf-8").then(() => {
  print("7. fs.readFile resolved (poll phase → microtask queue)");
});

crypto.pbkdf2("a", "b", 10000, 64, "sha512", () => {
  print("8. crypto.pbkdf2 done (poll phase)");
});

print("9. Script Ends");

phase("Event Loop Begins");
