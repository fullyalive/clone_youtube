import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos/" }); // 유저가 동영상을 업로드하면 서버에 있는 folder(video/)에 업로드

export const localsMiddleware = (req, res, next) => {
  // locals를 추가한다. locals가 추가되면 템플릿, 컨트롤러 등 어디에서든 사용 가능
  res.locals.siteName = "YouTube";
  res.locals.routes = routes; // routes 객체 추가 : 이후 링크주소로 routes.signup 이런식으로 사용 가능
  res.locals.user = {
    isAuthenticated: true,
    id: 1
  };
  next(); // 미들웨어가 next에 req를 전달해야 한다. app.js에서는 미들웨어가(localsMiddleware) 커넥션과 라우트들 사이에 있으니까 next()
};

export const uploadVideo = multerVideo.single("videoFile"); // single : 오직 하나의 파일만 upload, Name part는 videoUpload.pug의 file의 name="videoFile"에서 온 것F
