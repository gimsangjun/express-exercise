import express, { Request, Response } from "express";
import dotenv from "dotenv";
import postRouter from "./routes/post";

const app = express();
dotenv.config();

// 미들웨어 설정
app.use(express.json()); // JSON 파싱을 위한 미들웨어
app.use(express.urlencoded({ extended: true })); // URL-encoded 데이터 파싱을 위한 미들웨어
app.use(express.static("public")); // 정적 파일 제공을 위한 미들웨어

// routes/post.ts 파일을 불러와서 '/post' 경로에 연결
app.use("/post", postRouter);

// 기본 포트에서 서버 시작
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
