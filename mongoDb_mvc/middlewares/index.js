import fs from "fs";

const userLogs = (req, res, next) => {
  const date = new Date();
  const data = `\n${date.getDate()}/${date.getMonth()}/${date.getFullYear()}\t ${
    req.method
  }:\t ${req.baseUrl} `;
  fs.appendFile("./logs.txt", data, (err) => {
    console.log(err);
  });
  next();
};

export default userLogs;
