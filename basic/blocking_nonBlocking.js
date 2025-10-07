const fs = require("fs");
const os = require("os");
console.log("First");
const readFile = fs.readFileSync("./readFile.txt", "utf-8");
console.log(readFile);
console.log("Second");

console.log(os.cpus().length); // Get cores
