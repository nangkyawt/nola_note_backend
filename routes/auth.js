import express from "express";
const router = express.Router();
import validateSignup from "../middleware/validateSignup.js";
import { login, signup } from "../controllers/auth.js";

router.post("/login", login);
router.post("/signup", validateSignup, signup);

export default router;