const http = require("http");
const url = require("url");

const myServer = http.createServer((req, res) => {
  if (req.url == "/favicon.ico") {
    res.end();
  } else {
    const myUrl = url.parse(req.url, true);
    console.log(myUrl);
    res.end("hooo");
  }
});

myServer.listen(8000, () => {
  console.log("Server is listening on Port 8000");
});
