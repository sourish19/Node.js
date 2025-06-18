import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      lowercase: true,
      required: true,
    },
    lastName: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
    },
    job_title: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

export default User;
