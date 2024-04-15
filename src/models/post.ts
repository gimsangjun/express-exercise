import mongoose, { Document, Schema } from "mongoose";

// 포스트(Post) 인터페이스 정의
// 관계형 DB의 행
interface IPost extends Document {
  owner: string;
  title: string;
  content: string;
  tags: string[];
  date: Date;
}

// 포스트(Post) 스키마 정의
// 해당 데이터가 어떻게 저장될지 정의
const PostSchema: Schema = new Schema({
  owner: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type: [String], required: true },
  date: { type: Date, required: true, default: Date.now },
});

// 포스트(Post) 모델 생성
// <IPost> - Mongoose 모델이 다루는 문서의 타입
// 첫번째 인자 : 모델의 이름, 두번째 인자 : 해당 모델이 사용할 스키마 지정
const PostModel = mongoose.model<IPost>("Post", PostSchema);

export default PostModel;
