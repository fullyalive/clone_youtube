import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose"; // 사용자 인증을 위해 username과 password를 쓰는 strategy

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  facebookId: Number,
  githubId: Number
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" }); // passport에게 어떤 필드를 username으로 쓸건지 알려줘야한다.

const model = mongoose.model("User", UserSchema);

export default model;
