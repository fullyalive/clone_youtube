import routes from "../routes";
// render 함수의 첫번째 인자는 template, 두 번째 인자는 템플릿에 추가할 정보가 담긴 객체

export const getSignup = (req, res) => {
  res.render("signup", { pageTitle: "회원가입" });
};

export const postSignup = (req, res) => {
  const {
    body: { name, email, password, password2 }
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("signup", { pageTitle: "회원가입" });
  } else {
    // To Do : 사용자 등록
    // To Do : 유저 로그인
    res.redirect(routes.home);
  }
};

export const login = (req, res) => res.render("login", { pageTitle: "로그인" });
export const logout = (req, res) =>
  res.render("logout", { pageTitle: "로그아웃" });
export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "프로필수정" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "비밀번호 변경" });
export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "유저정보" });
