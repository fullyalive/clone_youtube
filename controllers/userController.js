// render 함수의 첫번째 인자는 template, 두 번째 인자는 템플릿에 추가할 정보가 담긴 객체

export const signup = (req, res) => res.render("signup", { pageTitle: "회원가입" });
export const login = (req, res) => res.render("login", { pageTitle: "로그인" });
export const logout = (req, res) => res.render("logout", { pageTitle: "로그아웃" });
export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "프로필수정" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "비밀번호 변경" });
export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "유저정보" });
