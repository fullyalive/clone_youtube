// render 함수의 첫번째 인자는 template, 두 번째 인자는 템플릿에 추가할 정보가 담긴 객체

export const home = (req, res) => res.render("home", { pageTitle: "홈" }); // 이 함수는 자동으로 views 폴더에서 이름이 home이고 확장자가 pug인 템플릿 파일을 찾아서 보여준다.
export const search = (req, res) =>
  res.render("search", { pageTitle: "검색결과" });
export const videoUpload = (req, res) =>
  res.render("videoUpload", { pageTitle: "동영상 업로드" });
export const videoDetail = (req, res) =>
  res.render("videoDetail", { pageTitle: "동영상 정보" });
export const videoEdit = (req, res) =>
  res.render("videoEdit", { pageTitle: "동영상 수정" });
export const videoDelete = (req, res) =>
  res.render("videoDelete", { pageTitle: "동영상 삭제" });
