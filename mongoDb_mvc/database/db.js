import mongoose from "mongoose";

const db = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};

export default db;
