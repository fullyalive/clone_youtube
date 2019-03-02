import dotenv from "dotenv";
import express from "express";
import morgan from "morgan"; // application에서 발생하는 모든 일들을 logging하는 미들웨어
import helmet from "helmet"; // 보안을 위한 package
import cookieParser from "cookie-parser"; // session을 다루기위해 cookie에 유저정보를 저장하기 위한 package
import bodyParser from "body-parser"; // form/json을 받았을 때 그 데이터를 갖고 있는 request object에 접근하기 위한 package(body로 부터 정보를 얻는다)
// 사용자가 웹사이트로 전달하는 정보를 검사하는 미들웨어 (아바타의 사진이나 비디오를 업로드 할 때 제목이나 댓글 같은 정보를 전달할 때 form에 담아서 업로드하기 때문)
import passport from "passport";
import mongoose from "mongoose"; // CookieStoore와 MongoDB를 연결해주는 역할을 위해
import session from "express-session";
import path from "path";
import MongoStore from "connect-mongo";
import { localsMiddleware } from "./middlewares";
import routes from "./routes";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import apiRouter from "./routers/apiRouter";

import "./passport";

dotenv.config();

const app = express(); // express를 실행한 결과를 app 상수로 만든 것

const CookieStore = MongoStore(session); // Session object를 필요로 함
// express의 모든 route와 connection을 다루는 것은 request, response, next를 가진다

app.use(helmet());
app.set("view engine", "pug"); // view engine의 설정값을 pug로 바꾼다. - 이제 렌더함수를 사용하면 pug확장자의 파일을 불러온다
app.set("views", path.join(__dirname, "views"));
app.use("/static", express.static(path.join(__dirname, "static")));
app.use(cookieParser());
app.use(bodyParser.json()); // json을 서버가 이해할 수 있도록
app.use(bodyParser.urlencoded({ extended: true })); // urlencoded: 일반적인 html form을 전송하면 서버가 urlencoded를 이해해야한다.
app.use(morgan("dev"));
app.use(
  // Express는 session을 이용함으로써 쿠키를 가질 수 있다.
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true, // session을 강제 저장
    saveUninitialized: false, // 초기화되지 않은 세션을 저장소에 저장
    store: new CookieStore({ mongooseConnection: mongoose.connection }) // 쿠키저장소에 쿠키를 저장, 이 저장소를 mongo와 연결한다.
  })
);
app.use(passport.initialize()); // cookieParser로부터 쿠키가 내려오면 passport가 쿠키를 보고 그 정보에 해당하는 사용자를 찾아준다.
// passport는 찾은 사용자의 요청을 object, 즉 req.user로 만들어준다. 그러면 그 user object를 템플릿에 추가시켜줄 수 있다.
app.use(passport.session());

app.use(localsMiddleware); // local 변수를 global하게 사용할 수 있도록

app.use(routes.home, globalRouter); // 누가 / 경로로 접속하면 globalRouter 전체를 사용하겠다는 의미
// app.user(routes.me, profileRouter); // 누가 /me 경로로 접속하면 profileRouter 전체를 사용하겠다는 의미
app.use(routes.users, userRouter); // 누가 /user 경로로 접속하면 userRouter 전체를 사용하겠다는 의미
app.use(routes.videos, videoRouter); // 누가 /videos 경로로 접속하면 videoRouter 전체를 사용하겠다는 의미
app.use(routes.api, apiRouter); // 누가 /api 경로로 접속하면 apiRouter 전체를 사용하겠다는 의미

export default app;
