import mongoose from "mongoose";
import bcrypt from "bcrypt";
import UserModel from "./user"; // 다른 파일에서 정의한 UserModel import

// 초기 데이터 배열
const initialUsers = [
  {
    username: "test",
    password: "test",
  },
];

// 컬렉션 초기화 및 초기 데이터 삽입 함수
export async function initializeUsers() {
  try {
    // 컬렉션 초기화 (기존 데이터 삭제)
    await UserModel.deleteMany({});

    // 비밀번호 암호화 및 초기 데이터 삽입
    const hashedUsers = await Promise.all(
      initialUsers.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10); // 비밀번호 암호화
        return { ...user, password: hashedPassword };
      })
    );

    await UserModel.insertMany(hashedUsers);

    console.log("초기 유저 데이터 삽입이 완료되었습니다.");
  } catch (error) {
    console.error("초기 유저 데이터 삽입 중 오류가 발생했습니다:", error);
  } finally {
    // MongoDB 연결 종료
    mongoose.disconnect();
  }
}

// 초기화 함수 호출 (데이터 삽입)
// initializeUsers();
