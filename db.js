import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/youtube", {
  useNewUrlParser: true,
  useFindAndModify: false
}); // 여기서 우리에게 요청하는 것은 string으로 된 DB이다. (어디에 DB가 저장되어있는지 알려주는 것)

const db = mongoose.connection; // MongoDB와의 연결을 db로 저장

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = error => console.log(`❌ Error on DB connection:${error}`);

db.once("open", handleOpen);
db.on("error", handleError);