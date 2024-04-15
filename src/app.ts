import express, { Request, Response } from "express";
import config from "./config";
import postRouter from "./api/routes/post";
import userRouter from "./api/routes/user";
import mongoose from "mongoose";
import session from "express-session";
// import cookieParser from "cookie-parser";
// import { initializeUsers } from "./models/initUser";
// import { initializePosts } from "./models/initPost";

const app = express();

// TODO: 나중에 load해야할것들이 많아지면 loaders부분 참고해서 수정.
// DB 연결
const dbURL = config.databaseURL;
mongoose.connect(dbURL);
mongoose.connection.on("connected", () => {
  console.log(`Connected to ${dbURL}`);
});
mongoose.connection.on("error", (err) => {
  console.error(`Failed to connect to ${dbURL} `, err);
});
// DB 초기화
// initializePosts();
// initializeUsers();

// 애플리케이션 종료 시, MongoDB 연결 종료
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});

// 미들웨어 설정
app.use(express.json()); // JSON 파싱을 위한 미들웨어
app.use(express.urlencoded({ extended: true })); // URL-encoded 데이터 파싱을 위한 미들웨어
app.use(express.static("public")); // 정적 파일 제공을 위한 미들웨어
// app.use(cookieParser());
app.use(
  session({
    name: "imsession",
    secret: "some-secret-example",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
// 생성한 라우터들을 연결.
app.use("/post", postRouter);
app.use("/auth", userRouter);

// 기본 포트에서 서버 시작
const port = config.port;
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
