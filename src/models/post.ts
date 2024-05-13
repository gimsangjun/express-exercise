import mongoose, { Document, Schema } from "mongoose";

// 포스트(Post) 인터페이스 정의
// 관계형 DB의 행
// MongoDB의 문서를 JavaScript 객체로 표현하기 위해 "Document"를 사용
interface IPost extends Document {
  owner: string;
  title: string;
  content: string;
  tags: string[];
  date: Date;
}

// 포스트(Post) 스키마 정의
// 스키마는 문서의 필드 및 각 필드의 유형을 정의하며,
// 데이터 유효성 검사(validation) 및 중첩된 문서(nested document)를 지원합니다.
// 스키마를 통해 MongoDB 문서의 구조를 정의하고, 해당 구조에 맞게 데이터를 저장하고 쿼리
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
// 스키마를 기반으로 모델을 생성합니다.
// 모델은 MongoDB 컬렉션(collection)을 나타내며, 해당 컬렉션에서 문서(document)를
// 생성, 조회, 수정, 삭제하는데 사용됩니다.
// 모델을 사용하여 MongoDB와 상호작용하며, 데이터베이스 작업을 수행함.
const PostModel = mongoose.model<IPost>("Post", PostSchema);

export default PostModel;
