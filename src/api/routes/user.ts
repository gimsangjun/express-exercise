import express from "express";
import { signup, login, logout, profile } from "../../services/userService";

const router = express.Router();

// POST /auth/signup
router.post("/signup", signup);

// POST /auth/login
router.post("/login", login);

// POST /auth/logout
router.post("/logout", logout);

// GET /auth/profile
router.get("/profile", profile);

export default router;
