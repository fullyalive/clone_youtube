import mongoose from "mongoose";

// Video 들의 형태를 정의(Schema)
const VideoSchema = new mongoose.Schema({
  fileUrl: {
    // Video를 DB에 저장하는 게 아니라 Video의 link를 저장하는 것.
    type: String,
    required: "File Url is required" // fileUrl 값이 없는 video를 생성하면 이 error 메시지를 받는다
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  title: {
    type: String,
    required: "Title is required"
  },
  description: String,
  views: {
    type: Number,
    default: 0 // 처음 비디오가 생성되면 views = 0 이 되도록
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId, // [1, 2, 4, 7] 이런 식으로 Video와 연결된 Comment의 Id가 저장됨
      ref: "Comment"
    }
  ]
});

const model = mongoose.model("Video", VideoSchema); // 모델의 이름은 Video, video model의 schema는 VideoSchema
export default model;
