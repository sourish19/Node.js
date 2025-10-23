import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/home", (req, res) => {
  res.send("Welcome Home!");
});
 
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
