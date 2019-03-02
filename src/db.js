import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // .env 파일 안에 있는 정보를 불러온다. 그리고 찾은 모든 Variable들을 process.env.key에 저장한다.

mongoose.connect(process.env.MONGO_URL_PROD, {
  useNewUrlParser: true,
  useFindAndModify: false
}); // 여기서 우리에게 요청하는 것은 string으로 된 DB이다. (어디에 DB가 저장되어있는지 알려주는 것)

const db = mongoose.connection; // MongoDB와의 연결을 db로 저장

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = error => console.log(`❌ Error on DB connection:${error}`);

db.once("open", handleOpen);
db.on("error", handleError);
