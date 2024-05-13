import express, { Request, Response } from "express";
import config from "./config";
import postRouter from "./api/routes/post";
import userRouter from "./api/routes/user";
import mongoose from "mongoose";
// TODO: 현재 sesionStore.all이 먹히질않고, 라이브러리 문제(이슈탭에 있음)인데 그 개발자가 업데이트를 안해서 다른 개발자가 임시로 만든거 사용
// import connectMongoDBSession from "connect-mongodb-session-quickfix";
// import connectMongoDBSession from "connect-mongodb-session";
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

// session store 생성 : DB에 세션 데이터를 저장할 경우
// const MongoDBStore = connectMongoDBSession(session);
// const store = new MongoDBStore({
//   uri: dbURL,
//   collection: "컬렉션 이름.",
// });

// DB 초기화
// initializePosts();
// initializeUsers();

// 애플리케이션 종료 시, MongoDB 연결 종료
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});

// ---------------- 미들웨어 설정 -------------------

app.use(
  cors({
    origin: "http://localhost:3001", // 클라이언트의 origin을 명시적으로 지정
    credentials: true, // handshake과정중에 헤더에 저 옵션이 true로 설정되어 있어서 브라우저가 이를 인식하고 해당 요청에 대해 사용자의 세션 쿠키를 자동으로 포함 시킴
  })
);
// 모든 요청에 대해 CORS 허용
// app.use(cors());
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
    name: "sessionID", //쿠키의 세션ID 담을 이름 (connect.sid가 디폴트), 자동으로 담김.
    // store: store , 세션 저장소. 메모리가 디폴트.
    secret: "some-secret-example", // 쿠키 암호화 키
    resave: false, // 매 request 마다 세션을 계속 다시 저장하는 것
    saveUninitialized: false, // 세션에 데이터가 추가되기 전까지는 세션 저장소에 저장하지 않음, 즉 로그인 안한 사용자도 세션 저장소에 저장됨.
    // 쿠키 기본값 { path: '/', httpOnly: true, secure: false, maxAge: null }.
    // httpOnly : true이면 해당 쿠키는 클라이언트 측 JavaScript에서 접근할 수 없게됨
    cookie: { secure: false }, // secure 속성이 true로 되어있으면 https에서만 동작하기 떄문에, 쿠키에 세션이 담기지 않음.
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
