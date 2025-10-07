import fs from "node:fs/promises";
import crypto from "node:crypto";
import { log } from "node:console";

log("1. Script Starts");

setTimeout(() => {
  log("2. SetTimeout 0s callback (macroTask)");
}, 0);

setTimeout(() => {
  log("3. SetTimeout 0s callback (macroTask)");
}, 0);

setImmediate(() => {
  log("4. SetImmediate callback (check)");
});

Promise.resolve().then(() => {
  log("5. Promise Resolved callback (microTask)");
});

process.nextTick(() => {
  log("6. process.nextTick callback (microTask)");
});

fs.readFile("file.txt", "utf-8").then((data) => {
  log("7. fs.readFile callback (microTask)");
});

// fs.readFile("eventLoop.js", "utf-8", () => {
//   setTimeout(() => log("timeout inside I/O"), 0);
//   setImmediate(() => log("immediate inside I/O"));
// });

crypto.pbkdf2("a", "b", 10000, 64, "sha512", (err, key) => {
  if (err) throw err;
  log("8. crypto.pbkdf2 operation (CPU intensive)");
});

log("9. Script Ends");
