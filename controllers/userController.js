import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getSignup = (req, res) => {
  res.render("signup", { pageTitle: "회원가입" }); // render 함수의 첫번째 인자는 template, 두 번째 인자는 템플릿에 추가할 정보가 담긴 객체
};
export const postSignup = async (req, res, next) => {
  const {
    body: { name, email, password, password2 }
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("signup", { pageTitle: "회원가입" });
  } else {
    try {
      const user = await User({
        name,
        email
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "로그인" });
export const postLogin = passport.authenticate("local", {
  // local은 우리가 설치해준 Strategy의 이름 : username(여기서는 email)과 password를 이용
  failureRedirect: routes.login, // 로그인에 실패할경우 로그인 창으로 리다이렉트
  successRedirect: routes.home // 로그인에 성공할 경우 홈으로 리다이렉트
});

export const logout = (req, res) => {
  // To Do : 로그아웃 프로세스
  res.redirect(routes.home);
};

export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "프로필수정" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "비밀번호 변경" });
export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "유저정보" });
