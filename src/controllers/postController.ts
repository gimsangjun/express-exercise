interface Post {
  id: number;
  owner: string;
  title: string;
  content: string;
  tags: string[];
  date: string;
}

const posts: Post[] = [
  {
    id: 1,
    owner: "test",
    title: "awgwa",
    content: "<p>asdfawf</p>",
    tags: ["gawg", "wfwef"],
    date: "2024-04-02 12:30",
  },
  {
    id: 2,
    owner: "user1",
    title: "example title",
    content: "<p>This is an example post content.</p>",
    tags: ["example", "sample"],
    date: "2024-04-03 10:45",
  },
  {
    id: 3,
    owner: "user2",
    title: "another example",
    content: "<p>This is another example post.</p>",
    tags: ["example", "test"],
    date: "2024-04-04 15:20",
  },
  {
    id: 4,
    owner: "user3",
    title: "test post",
    content: "<p>This is a test post.</p>",
    tags: ["test", "sample"],
    date: "2024-04-05 08:55",
  },
  {
    id: 5,
    owner: "user4",
    title: "random post",
    content: "<p>This is a random post.</p>",
    tags: ["random", "post"],
    date: "2024-04-06 17:10",
  },
];

import { Request, Response } from "express";

// 모든 포스트 반환
export const getAllPosts = (req: Request, res: Response): void => {
  res.json(posts);
};

// 포스트 추가
export const addPost = (req: Request, res: Response): void => {
  const { owner, title, content, tags } = req.body as {
    owner: string;
    title: string;
    content: string;
    tags: string[];
  };

  const newPost: Post = {
    id: posts.length + 1,
    owner,
    title,
    content,
    tags,
    date: new Date().toLocaleString(),
  };

  posts.push(newPost);
  res.status(201).json(newPost);
};
