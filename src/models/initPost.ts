// 데이터 초기화할때 쓰는거
import mongoose from "mongoose";
import PostModel from "./post"; // 다른 파일에서 정의한 Post 모델 import

// 초기 데이터 배열
const initialPosts = [
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

// 컬렉션 초기화 및 초기 데이터 삽입 함수
export async function initializePosts() {
  try {
    // 컬렉션 초기화 (기존 데이터 삭제)
    await PostModel.deleteMany({});

    // 초기 데이터 삽입
    await PostModel.insertMany(initialPosts);

    console.log("초기 데이터 삽입이 완료되었습니다.");
  } catch (error) {
    console.error("초기 데이터 삽입 중 오류가 발생했습니다:", error);
  }
  // finally {
  //   // MongoDB 연결 종료
  //   mongoose.disconnect();
  // }
}

// 초기화 함수 호출 (데이터 삽입)
// initializePosts();
