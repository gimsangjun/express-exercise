import express from "express";
import { getAllPosts, addPost } from "../controllers/postController";

const router = express.Router();

// GET /posts
router.get("/", getAllPosts);

// POST /posts/add
router.post("/add", addPost);

export default router;
