const express = require("express");

const app = express();
const PORT = 8000;

app.get("/", (req, res) => {
  res.send(`Hi ${req.query.username}! Welcome to Home Page`);
});
app.get("/about", (req, res) => {
  res.send("This is About Page");
});
app.get("/contact", (req, res) => {
  res.send("This is Contact Page");
});
app.listen(PORT, (req, res) => {
  console.log(`Server is running on Port ${PORT}`);
});
