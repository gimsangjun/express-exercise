import express, { Request, Response } from "express";
import {
  getAllPosts,
  addPost,
  updatePost,
  deletePost,
  getPostById,
} from "../../services/postService";

const router = express.Router();

// GET /posts
router.get("/", async (req: Request, res: Response) => {
  try {
    await getAllPosts(req, res);
  } catch (error) {
    console.error("포스트 조회 중 오류 발생:", error);
    res.status(500).json({ message: "포스트 조회 중 오류 발생" });
  }
});

// POST /posts
router.post("/", async (req: Request, res: Response) => {
  try {
    await addPost(req, res);
  } catch (error) {
    console.error("포스트 추가 중 오류 발생:", error);
    res.status(500).json({ message: "포스트 추가 중 오류 발생" });
  }
});

// PUT /posts/:id
router.put("/:id", async (req: Request, res: Response) => {
  try {
    await updatePost(req, res);
  } catch (error) {
    console.error("포스트 업데이트 중 오류 발생:", error);
    res.status(500).json({ message: "포스트 업데이트 중 오류 발생" });
  }
});

// DELETE /posts/:id
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await deletePost(req, res);
  } catch (error) {
    console.error("포스트 삭제 중 오류 발생:", error);
    res.status(500).json({ message: "포스트 삭제 중 오류 발생" });
  }
});

// GET /posts/:id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    await getPostById(req, res);
  } catch (error) {
    console.error("포스트 조회 중 오류 발생:", error);
    res.status(500).json({ message: "포스트 조회 중 오류 발생" });
  }
});

export default router;
