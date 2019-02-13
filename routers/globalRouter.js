import express from "express";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import {
  getSignup,
  postSignup,
  getLogin,
  postLogin,
  logout
} from "../controllers/userController";

const globalRouter = express.Router();

// method="get" 요청을 처리하는 컨트롤러
globalRouter.get(routes.signup, getSignup);
globalRouter.post(routes.signup, postSignup); // method가 post인 /signup 경로에서 작동

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin); // method가 post인 /login 경로에서 작동

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, logout);

export default globalRouter;
