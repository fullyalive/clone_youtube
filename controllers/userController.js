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

// username, password로 로그인하는 passport local Strategy
export const postLogin = passport.authenticate("local", {
  // local은 우리가 설치해준 Strategy의 이름 : username(여기서는 email)과 password를 이용
  failureRedirect: routes.login, // 로그인에 실패할경우 로그인 창으로 리다이렉트
  successRedirect: routes.home // 로그인에 성공할 경우 홈으로 리다이렉트
});

// 유저를 깃헙 인증으로 보내는 과정
export const githubLogin = passport.authenticate("github");

// 유저가 깃헙에서 돌아오는 과정
export const githubLoginCallback = async (_, __, profile, cb) => {
  // 함수의 인자를 쓰지 않을때 _, __ 이런식으로 표시
  // cb는 passport에서 제공되는 것
  const {
    _json: { id, avatar_url: avatarUrl, name, email }
  } = profile;
  try {
    const user = await User.findOne({ email }); // github에서 받은 email과 같은 email을 가진 user를 찾는다. 여기서 email은 email: email과 같음
    if (user) {
      // 만약 동일한 email을 가진 사용자를 발견하면 그 사용자의 정보를 업데이트
      user.githubId = id; // github에서 가져온 id를 User model Schema의 githubId로 할당
      user.save();
      console.log(user);
      return cb(null, user); // 첫번째 매개변수인 에러는 없음(null), 두번째는 user
    }
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.logout(); // passport에서 제공
  res.redirect(routes.home);
};

export const getMe = (req, res) => {
  res.render("userDetail", { pageTitle: "유저 정보", user: req.user }); // 유저는 로그인한 유저
};

export const userDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const user = await User.findById(id);
    res.render("userDetail", { pageTitle: "유저 정보", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "프로필수정" });

export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "비밀번호 변경" });
