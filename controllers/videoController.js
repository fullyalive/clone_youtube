export const home = (req, res) => res.render("home"); // 이 함수는 자동으로 views 폴더에서 이름이 home이고 확장자가 pug인 템플릿 파일을 찾아서 보여준다.
export const search = (req, res) => res.render("search");
export const videos = (req, res) => res.render("videos");
export const videoUpload = (req, res) => res.render("videoUpload");
export const videoDetail = (req, res) => res.render("videoDetail");
export const videoEdit = (req, res) => res.render("videoEdit");
export const videoDelete = (req, res) => res.render("videoDelete");
