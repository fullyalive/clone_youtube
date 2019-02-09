import { videos } from "../db";
import routes from "../routes";
// render 함수의 첫번째 인자는 template, 두 번째 인자는 템플릿에 추가할 정보가 담긴 객체

export const home = (req, res) => {
  res.render("home", { pageTitle: "홈", videos });
}; // 이 함수는 자동으로 views 폴더에서 이름이 home이고 확장자가 pug인 템플릿 파일을 찾아서 보여준다.

export const search = (req, res) => {
  // 유저가 입력한 term을 가지고 오는 것 = req.query.term
  const {
    query: { term: searchingBy } // term : searchingBy 이건 term에다 searchingBy라는 이름을 주는 것이다. 이제 searchingBy는 req.query.term과 같음
  } = req; // const searchingBy = req.query.term; 예전 방식의 코딩
  res.render("search", { pageTitle: "검색결과", searchingBy, videos });
};

export const getVideoUpload = (req, res) =>
  res.render("videoUpload", { pageTitle: "동영상 업로드" });

export const postVideoUpload = (req, res) => {
  const {
    body: { file, title, description }
  } = req;
  // To Do: 비디오 업로드 저장
  res.redirect(routes.videoDetail(324393));
};

export const videoDetail = (req, res) =>
  res.render("videoDetail", { pageTitle: "동영상 정보" });

export const videoEdit = (req, res) =>
  res.render("videoEdit", { pageTitle: "동영상 수정" });

export const videoDelete = (req, res) =>
  res.render("videoDelete", { pageTitle: "동영상 삭제" });
