import express from "express";
import morgan from "morgan"; // application에서 발생하는 모든 일들을 logging하는 미들웨어
import helmet from "helmet"; // 보안을 위한 package
import cookieParser from "cookie-parser"; // session을 다루기위해 cookie에 유저정보를 저장하기 위한 package
import bodyParser from "body-parser"; // form/json을 받았을 때 그 데이터를 갖고 있는 request object에 접근하기 위한 package(body로 부터 정보를 얻는다) 
// 사용자가 웹사이트로 전달하는 정보를 검사하는 미들웨어 (아바타의 사진이나 비디오를 업로드 할 때 제목이나 댓글 같은 정보를 전달할 때 form에 담아서 업로드하기 때문)
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import routes from "./routes";

const app = express(); // express를 실행한 결과를 app 상수로 만든 것

// express의 모든 route와 connection을 다루는 것은 request, response, next를 가진다

app.use(cookieParser());
app.use(bodyParser.json()); // json을 서버가 이해할 수 있도록
app.use(bodyParser.urlencoded({ extended: true })); // urlencoded: 일반적인 html form을 전송하면 서버가 urlencoded를 이해해야한다.
app.use(helmet());
app.use(morgan("dev"));

app.use(routes.home, globalRouter); // 누가 / 경로로 접속하면 globalRouter 전체를 사용하겠다는 의미
app.use(routes.users, userRouter); // 누가 /user 경로로 접속하면 userRouter 전체를 사용하겠다는 의미
app.use(routes.videos, videoRouter); // 누가 /videos 경로로 접속하면 videoRouter 전체를 사용하겠다는 의미

export default app;
