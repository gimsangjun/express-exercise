import express, { Request, Response } from "express";
import {
  getAllPosts,
  addPost,
  updatePost,
  deletePost,
  getPostById,
} from "../../services/postService";
import middlewares from "../middlewares";

const router = express.Router();

// GET /post
router.get("/", async (req: Request, res: Response) => {
  try {
    await getAllPosts(req, res);
  } catch (error) {
    console.error("포스트 조회 중 오류 발생:", error);
    res.status(500).json({ message: "포스트 조회 중 오류 발생" });
  }
});

// POST /post
// 로그인된 사용자만 접근할수있게 미들웨어 추가
router.post("/", middlewares.isAuth, async (req: Request, res: Response) => {
  try {
    await addPost(req, res);
  } catch (error) {
    console.error("포스트 추가 중 오류 발생:", error);
    res.status(500).json({ message: "포스트 추가 중 오류 발생" });
  }
});

// PUT /post/:id
router.put("/:id", middlewares.isAuth, async (req: Request, res: Response) => {
  try {
    await updatePost(req, res);
  } catch (error) {
    console.error("포스트 업데이트 중 오류 발생:", error);
    res.status(500).json({ message: "포스트 업데이트 중 오류 발생" });
  }
});

// DELETE /post/:id
router.delete("/:id", middlewares.isAuth, async (req: Request, res: Response) => {
  try {
    await deletePost(req, res);
  } catch (error) {
    console.error("포스트 삭제 중 오류 발생:", error);
    res.status(500).json({ message: "포스트 삭제 중 오류 발생" });
  }
});

// GET /post/:id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    await getPostById(req, res);
  } catch (error) {
    console.error("포스트 조회 중 오류 발생:", error);
    res.status(500).json({ message: "포스트 조회 중 오류 발생" });
  }
});

export default router;
