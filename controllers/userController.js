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

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "로그인" });
export const postLogin = (req, res) => {
  // To Do : 사용자 비밀번호가 db에 있는것과 같은 것인지 체크
  // To Do : 로그인에 에러가 있으면 다시 로그인 창 표시
  res.redirect(routes.home);
};

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
