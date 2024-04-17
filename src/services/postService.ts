import { Request, Response } from "express";
import PostModel from "../models/post";

// 모든 포스트 반환
export const getAllPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await PostModel.find().exec();
    res.json(posts);
  } catch (error) {
    console.error("포스트 조회 중 오류 발생:", error);
    res.status(500).json({ message: "포스트 조회 중 오류 발생" });
  }
};

// 포스트 추가
export const addPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const owner = req.session.user;
    const { title, content, tags } = req.body as {
      title: string;
      content: string;
      tags: string[];
    };

    const newPost = new PostModel({
      owner,
      title,
      content,
      tags,
      date: new Date(),
    });

    await newPost.save(); // 새로운 포스트 저장

    res.status(201).json(newPost);
  } catch (error) {
    console.error("포스트 추가 중 오류 발생:", error);
    res.status(500).json({ message: "포스트 추가 중 오류 발생" });
  }
};

// 포스트 업데이트
export const updatePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const postId = req.params.id;
    const owner = req.session.user;
    const { title, content, tags } = req.body as {
      title: string;
      content: string;
      tags: string[];
    };

    const post = await PostModel.findById(postId);

    if (!post) {
      res.status(404).json({ message: "포스트를 찾을 수 없습니다." });
      return;
    }

    if (post.owner !== owner) {
      res.status(403).json({ message: "포스트를 업데이트할 권한이 없습니다." });
      return;
    }

    const updatedPost = await PostModel.findByIdAndUpdate(
      postId,
      { title, content, tags },
      { new: true }
    );

    if (!updatedPost) {
      res.status(404).json({ message: "포스트를 찾을 수 없습니다." });
      return;
    }

    res.json(updatedPost);
  } catch (error) {
    console.error("포스트 업데이트 중 오류 발생:", error);
    res.status(500).json({ message: "포스트 업데이트 중 오류 발생" });
  }
};

// 포스트 삭제
export const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const owner = req.session.user;
    const postId = req.params.id;

    const post = await PostModel.findById(postId);

    if (!post) {
      res.status(404).json({ message: "삭제할 포스트를 찾을 수 없습니다." });
      return;
    }

    if (post.owner !== owner) {
      res.status(403).json({ message: "포스트를 삭제할 권한이 없습니다." });
      return;
    }

    const deletedPost = await PostModel.findByIdAndDelete(postId);

    if (!deletedPost) {
      res.status(404).json({ message: "삭제할 포스트를 찾을 수 없습니다." });
      return;
    }

    res.json({ message: "포스트가 삭제되었습니다.", deletedPost });
  } catch (error) {
    console.error("포스트 삭제 중 오류 발생:", error);
    res.status(500).json({ message: "포스트 삭제 중 오류 발생" });
  }
};

// 특정 포스트 반환
export const getPostById = async (req: Request, res: Response): Promise<void> => {
  try {
    const postId = req.params.id;

    const post = await PostModel.findById(postId);

    if (!post) {
      res.status(404).json({ message: "포스트를 찾을 수 없습니다." });
      return;
    }

    res.json(post);
  } catch (error) {
    console.error("포스트 조회 중 오류 발생:", error);
    res.status(500).json({ message: "포스트 조회 중 오류 발생" });
  }
};
