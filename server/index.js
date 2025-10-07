const http = require("http");
const fs = require("fs");
const url = require("url");

const enterLogs = (val, res, req, myUrl) => {
  const log = new Date().toLocaleString();
  fs.appendFile(
    "./userLogs.txt",
    `${log}\t${val}\tusername-${myUrl.query.myname}\n`,
    (err, data) => {
      if (err) console.log(err);
      res.end(val);
    }
  );
};

const myServer = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") {
    res.end();
  } else {
    const myUrl = url.parse(req.url, true);
    console.log(myUrl);
    switch (myUrl.pathname) {
      case "/":
        enterLogs("This is HomePage", res, req, myUrl);
        break;
      case "/about":
        enterLogs("This is About Us page", res, req, myUrl);
        break;
      case "/contact":
        enterLogs("This is Contact Us page", res, req, myUrl);
        break;
      default:
        enterLogs("402 Not Found", res, req, myUrl);
    }
  }
});

myServer.listen(8000, () => {
  console.log("server is running at port 8000");
});
