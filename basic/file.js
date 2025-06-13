const { log } = require("console");
const fs = require("fs");

// Sync     a is void
// const a = fs.writeFileSync(
//   "./syncFile.txt",
//   "Hi this file is created by fs module Synchronously"
// );
// Async     b is void
const b = fs.writeFile(
  "./asyncFile.txt",
  "Hi this file is created by fs module Asyncronously",
  (err) => {
    if (err) console.log(err);
  }
);

// console.log(a); undefined
// console.log(b); Undefined

// Sync Read File
const read = fs.readFileSync("./readFile.txt", "UTF-8");
// console.log(read);

// Async Read File    read2 is void
const read2 = fs.readFile("./readFile.txt", "utf-8", (err, result) => {
  if (err) console.log(err);
  else console.log(result);
});
// console.log(read2); undefined

const data = fs.appendFileSync(
  "./syncFile.txt",
  `${Date.now().toLocaleString()}\n`
);
