import express from "express";
import "dotenv/config";
import userRoutes from "./routes/userRoute.js";
import db from "./database/db.js";

const app = express();
const PORT = process.env.PORT;

db()
  .then(() => {
    console.log("MongoDb Connected");
  })
  .catch((err) => {
    console.error("MongoDb connection failed");
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log("Server Running on PORT", PORT);
});
