import routes from "../routes";
import Video from "../models/Video";

// render 함수의 첫번째 인자는 template, 두 번째 인자는 템플릿에 추가할 정보가 담긴 객체
export const home = async (req, res) => {
  // async : function의 특정 부분을 기다려야 할 때 사용
  try {
    const videos = await Video.find({}); // await : 다음 과정이 끝날 때까지 기다리라는 뜻
    res.render("home", { pageTitle: "홈", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "홈", videos: [] }); // error가 생기면 video는 없을 것이고 default 값으로 video는 빈 array
  }
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

export const postVideoUpload = async (req, res) => {
  // postVideoUpload function이 유저가 업로드한 file에 접근, middlewares의 multer에 의해서 파일이 아닌 url 방식으로 접근한다.
  const {
    body: { title, description },
    file: { path } // file을 form에서 받아오는 것이 아니라 multer가 생성해준 path에서 받아온다
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description
  });
  // To Do: 비디오 업로드 저장
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id); // Model.findById - mongoose의 query
    console.log(video);
    res.render("videoDetail", { pageTitle: video.title, video }); // video.title : 페이지 타이틀을 동영상 제목으로, video: video 변수를 템플릿에 전달
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getVideoEdit = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("videoEdit", { pageTitle: `{수정 | ${video.title}`, video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const postVideoEdit = async (req, res) => {
  const {
    params: { id },
    body: { title, description }
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description }); // 그냥 업데이트 하면 끝이기 떄문에 저장하지 않는다.
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const videoDelete = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    await Video.findOneAndRemove({ _id: id });
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};
