import express from "express";
import passport from "passport";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import {
  getMe,
  logout,
  getSignup,
  postSignup,
  getLogin,
  postLogin,
  githubLogin,
  postGithubLogin,
  facebookLogin,
  postFacebookLogin
} from "../controllers/userController";
import { onlyPublic, onlyPrivate } from "../middlewares"; // 사용자가 로그인 되어 있으면 signup과 login 화면을 못보도록 라우트 제한을 걸기위해서

const globalRouter = express.Router();

globalRouter.get(routes.signup, onlyPublic, getSignup); // method가 get인 /signup 경로에서 작동
globalRouter.post(routes.signup, onlyPublic, postSignup, postLogin); // method가 post인 /signup 경로에서 작동, Signup이 완료되면 username과 password 정보를 받아 바로 로그인 되도록 postLogin을 붙여준다.

globalRouter.get(routes.github, onlyPublic, githubLogin);
globalRouter.get(
  routes.githubCallback,
  onlyPublic,
  passport.authenticate("github", { failureRedirect: "/login" }),
  postGithubLogin
);

globalRouter.get(routes.facebook, onlyPublic, facebookLogin);
globalRouter.get(
  routes.facebookCallback,
  onlyPublic,
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  postFacebookLogin
);

globalRouter.get(routes.login, onlyPublic, getLogin); // method가 get인 /singup 경로에서 작동
globalRouter.post(routes.login, onlyPublic, postLogin); // method가 post인 /login 경로에서 작동

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, onlyPrivate, logout);
globalRouter.get(routes.me, getMe);

export default globalRouter;
