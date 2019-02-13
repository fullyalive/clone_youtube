import dotenv from "dotenv";
import passport from "passport";
import GithubStrategy from "passport-github";
import User from "./models/User";
import { githubLoginCallback } from "./controllers/userController";
import routes from "./routes";

dotenv.config();

passport.use(User.createStrategy()); // createStrategy()는 이미 구성된 passport-local의 LocalStrategy를 생성

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`
    },
    githubLoginCallback
  )
);

passport.serializeUser(User.serializeUser()); // 쿠키에는 오직 user.id만 담아서 보내게 하는 셋업된 코드
passport.deserializeUser(User.deserializeUser()); // 쿠키정보를 받아 사용자 정보로 전환하는 셋업된 코드
