const os = require("os");
// console.log(os.uptime());
const fs = require("fs");

console.log("Start");

fs.readFile("./readFile.txt", "utf-8", (err, data) => {
  console.log("1", data);
  fs.readFile("./readFile.txt", "utf-8", (err, data) => {
    console.log("2", data);
    fs.readFile("./readFile.txt", "utf-8", (err, data) => {
      console.log("3", data);
    });
  });
  fs.readFile("./readFile.txt", "utf-8", (err, data) => {
    console.log("4", data);
  });
});

// fs.readFile("./readFile.txt", "utf-8", (err, data) => {
//   console.log("5", data);
// });
// fs.readFile("./readFile.txt", "utf-8", (err, data) => {
//   console.log("6", data);
// });
// fs.readFile("./readFile.txt", "utf-8", (err, data) => {
//   console.log("7", data);
// });
// fs.readFile("./readFile.txt", "utf-8", (err, data) => {
//   console.log("8", data);
// });
// fs.readFile("./readFile.txt", "utf-8", (err, data) => {
//   console.log("9", data);
// });
// fs.readFile("./readFile.txt", "utf-8", (err, data) => {
//   console.log("10", data);
// });

console.log("End");
