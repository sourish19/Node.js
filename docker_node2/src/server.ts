import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to / route!");
});

app.get("/home", (req, res) => {
  res.send("Welcome Home!");
});
 
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
