import { Router } from "express";
import {
  getAllUsers,
  registerUser,
  updateUser,
  deleteUser,
} from "../controllers/user.js";
import userLogs from "../middlewares/index.js";
const router = Router();

router.get("/", userLogs, getAllUsers);
router.post("/", userLogs, registerUser);
router.patch("/:id", userLogs, updateUser);
router.delete("/:id", userLogs, deleteUser);

export default router;
