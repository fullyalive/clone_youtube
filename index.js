import express from "express";
import morgan from "morgan"; // middleware
import helmet from "helmet"; // 보안을 위한 package
import cookieParser from "cookie-parser"; // session을 다루기위해 cookie에 유저정보를 저장하기 위한 package
import bodyParser from "body-parser"; // form을 받았을 때 그 데이터를 갖고 있는 request object에 접근하기 위한 package(body로 부터 정보를 얻는다)

const app = express();
const PORT = 4000;

const handleListening = () =>
  console.log(`Listening on : http://localhost:${PORT}`);

const handleHome = (req, res) => res.send("hello from home");

const handleProfile = (req, res) => {
  res.send("user profile");
};

// express의 모든 route와 connection을 다루는 것은 request, response, next를 가진다

app.use(cookieParser());
app.use(bodyParser.json()); // json을 서버가 이해할 수 있도록
app.use(bodyParser.urlencoded({ extended: true })); // urlencoded: 일반적인 html form을 전송하면 서버가 urlencoded를 이해해야한다.
app.use(helmet());
app.use(morgan("dev"));

app.get("/", handleHome);

app.get("/profile", handleProfile);

app.listen(PORT, handleListening);
