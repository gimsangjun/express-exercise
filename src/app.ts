import express, { Request, Response } from "express";
import config from "./config";
import postRouter from "./api/routes/post";
import userRouter from "./api/routes/user";
import mongoose from "mongoose";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
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

// ---------------- 미들웨어 설정 -------------------
// 모든 요청에 대해 CORS 허용
app.use(
  cors({
    origin: "http://localhost:3001", // 클라이언트의 origin을 명시적으로 지정
    credentials: true, // TODO: credentials 모드가 'include'인 요청을 허용 ======> 좀더 정확ㅎㅣ알아봐야할듯.
  })
);

// 특정 도메인만 CORS 허용
// app.use(cors({ origin: 'http://alloweddomain.com' }));
// 특정 도메인 및 메서드만 CORS 허용
// app.use(cors({ origin: 'http://alloweddomain.com', methods: ['GET', 'POST'] }));
// 다양한 옵션 사용법은 공식 문서를 참조하세요.
app.use(express.json()); // JSON 파싱을 위한 미들웨어
app.use(express.urlencoded({ extended: true })); // URL-encoded 데이터 파싱을 위한 미들웨어
app.use(express.static("public")); // 정적 파일 제공을 위한 미들웨어
app.use(cookieParser());
app.use(
  session({
    name: "sessionID", //세션쿠키 이름 (connect.sid가 디폴트)
    // store: 세션 저장소. 메모리가 디폴트.
    secret: "some-secret-example", // 쿠키 암호화 키
    resave: false,
    saveUninitialized: true, // 세션에 저장할 내역이 없더라도 세션을 저장할지 여부
    cookie: { secure: true }, // 그냥 express 아니면 브라우저가 session 쿠키값 자동으로 암호화함. false로 하면 암호화된 값 그대로 넘어와서 못씀.
  })
);

// 디버깅용
app.use((req: Request, res: Response, next: any) => {
  console.log("Request URL:", req.originalUrl); // 요청 URL 출력
  console.log("Request Body:", req.body); // 요청 바디(body) 출력
  console.log("Cookies:", req.cookies); // 쿠키값 출력
  next(); // 다음 미들웨어로 요청 전달
});

// 생성한 라우터들을 연결.
// 이 뒤에 있는 미들웨어는 실행이 되지 않음
// -> res.send(), res.json(), 또는 res.end()와 같은 응답 메서드를 호출하여 응답을 보내면 미들웨어에 도달하지 못할 수 있습니다.
app.use("/post", postRouter);
app.use("/auth", userRouter);

// 기본 포트에서 서버 시작
const port = config.port;
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
