import passport from "passport";
import routes from "../routes";
import User from "../models/User";

/* --- 회원가입 --- */

export const getSignup = (req, res) => {
  res.render("signup", { pageTitle: "회원가입" }); // render 함수의 첫번째 인자는 template, 두 번째 인자는 템플릿에 추가할 정보가 담긴 객체
};
export const postSignup = async (req, res, next) => {
  const {
    body: { name, email, password, password2 }
  } = req;
  if (password !== password2) {
    req.flash("error", "비밀번호가 일치하지 않습니다.");
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
      res.redirect(routes.home);
    }
  }
};

/* --- 로그인 --- */

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "로그인" });

// username, password로 로그인하는 passport local Strategy
export const postLogin = passport.authenticate("local", {
  // local은 우리가 설치해준 Strategy의 이름 : username(여기서는 email)과 password를 이용
  failureRedirect: routes.login, // 로그인에 실패할경우 로그인 창으로 리다이렉트
  successRedirect: routes.home, // 로그인에 성공할 경우 홈으로 리다이렉트
  successFlash: "로그인 성공!",
  failureFlash: "로그인에 실패했습니다. 아이디나 비밀번호를 확인해주세요."
});

/* --- 깃허브 소셜 로그인 --- */

// 유저를 깃헙 인증으로 보내는 과정
export const githubLogin = passport.authenticate("github", {
  successFlash: "로그인 성공!",
  failureFlash: "로그인에 실패했습니다."
});

// 유저가 깃헙에서 돌아오는 과정
export const githubLoginCallback = async (_, __, profile, cb) => {
  // 함수의 인자를 쓰지 않을때 _, __ 이런식으로 표시. cb는 passport에서 제공되는 것
  const {
    _json: { id, avatar_url: avatarUrl, name, email }
  } = profile;
  try {
    const user = await User.findOne({ email }); // github에서 받은 email과 같은 email을 가진 user를 찾는다. 여기서 email은 email: email과 같음
    if (user) {
      // 만약 동일한 email을 가진 사용자를 발견하면 그 사용자의 정보를 업데이트
      user.githubId = id; // github에서 가져온 id를 User model Schema의 githubId로 할당
      user.avatarUrl = avatarUrl; // 만약 깃허브 이메일과 동일한 로컬스트레티지로 가입한 유저가 있으면 깃허브 프로필 사진을 받아온다
      user.save();
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
// 인증 완료 후 홈으로 리다이렉트
export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

/* --- 페이스북 소셜 로그인 --- */

// 유저를 페이스북 인증으로 보내는 과정
export const facebookLogin = passport.authenticate("facebook", {
  successFlash: "로그인 성공!",
  failureFlash: "로그인에 실패했습니다."
});

// 유저가 페이스북에서 돌아오는 과정
export const facebookLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, name, email }
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.facebookId = id;
      user.avatarUrl = `https://graph.facebook.com/${id}/picture?type=large`; // 만약 페북 이메일과 동일한 로컬스트레티지로 가입한 유저가 있으면 깃허브 프로필 사진을 받아온다
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      facebookId: id,
      avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postFacebookLogin = (req, res) => {
  res.redirect(routes.home);
};

/* --- 로그아웃 --- */

export const logout = (req, res) => {
  req.logout(); // passport에서 제공
  req.flash("goodbye", "로그아웃");
  res.redirect(routes.home);
};

/* --- 내 정보 보기 --- */

export const getMe = async (req, res) => {
  const user = await User.findById(req.user.id).populate("videos");
  req.flash("error", "유저를 찾을 수 없습니다.");
  res.render("myProfile", { pageTitle: "내 정보", user }); // 유저는 로그인한 유저
};

/* --- 내 정보 수정 --- */

export const getEditProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "프로필수정" });

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file
  } = req; // multer에 의해 생성되는 것
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.location : req.user.avatarUrl // 새로운 avatarfile이 없으면 업데이트 하지 않도록
    });
    req.flash("success", "프로필 업데이트 성공!");
    res.redirect(routes.me);
  } catch (error) {
    req.flash("error", "프로필 업데이트에 실패했습니다.");
    res.redirect(routes.editProfile);
  }
};

/* --- 비밀번호 변경 --- */

export const getChangePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "비밀번호 변경" });

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword2 }
  } = req;
  try {
    if (newPassword !== newPassword2) {
      req.flash("error", "비밀번호가 일치하지 않습니다.");
      res.status(400);
      res.redirect(`/users${routes.changePassword}`);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(routes.me);
  } catch (error) {
    req.flash("error", "비밀번호 변경 실패");
    res.status(400);
    res.redirect(`/users${routes.changePassword}`);
  }
};

/* --- 유저 정보 --- */

export const userDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const user = await User.findById(id).populate("videos");
    res.render("userDetail", { pageTitle: "유저 정보", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};
