import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
  // locals를 추가한다. locals가 추가되면 템플릿, 컨트롤러 등 어디에서든 사용 가능
  res.locals.siteName = "Youtube";
  res.locals.routes = routes; // routes 객체 추가 : 이후 링크주소로 routes.signup 이런식으로 사용 가능
  next(); // 미들웨어가 next에 req를 전달해야 한다. app.js에서는 미들웨어가(localsMiddleware) 커넥션과 라우트들 사이에 있으니까 next()
};
