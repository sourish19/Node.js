import express from "express";

const PORT = process.env.PORT ? +process.env.PORT : 3000;

const app = express();

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "success",
    status: 200,
  });
});

app.listen(PORT, () => {
  console.log("Server running on PORT:", PORT);
});
